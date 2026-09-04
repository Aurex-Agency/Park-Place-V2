/**
 * The one endpoint behind both website forms.
 *
 * Order of events, and the reason for it:
 *   1. Parse and validate again on the server. The browser is not a witness.
 *   2. Drop anything that filled the honeypot, and answer as though it worked.
 *      A bot that is told it failed simply tries again in a different shape.
 *   3. Send the notice to the practice and wait for it. If that fails the whole
 *      request fails, because a form that reports success while losing the
 *      submission is worse than a form that admits it is broken.
 *   4. Send the confirmation to the visitor. If that fails it is logged and the
 *      request still succeeds: the practice has the lead either way, and the
 *      visitor is better served by a missing receipt than by being told to
 *      start over on a message that did arrive.
 */
import { NextResponse } from "next/server";
import { parseSubmission, HONEYPOT_FIELD } from "@/lib/forms";
import { noticeEmail, confirmationEmail } from "@/lib/email/templates";
import { sendEmail, isEmailConfigured, CONTACT_TO } from "@/lib/email/send";

export const runtime = "nodejs";
// Nothing about a submission is cacheable or knowable ahead of time.
export const dynamic = "force-dynamic";

/**
 * A coarse throttle. Serverless instances do not share memory, so this is a
 * speed bump for naive floods rather than a real limiter. It is worth having
 * anyway: it costs nothing and it stops one script from burning the sending
 * quota in a loop. The honeypot does the heavier lifting.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long lived instance.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

const GENERIC_FAILURE =
  "We could not send that just now. Please call the office and we will help straight away.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission." },
      { status: 400 },
    );
  }

  // Silently accept and discard. Never tell a crawler which check it tripped.
  const honeypot = (body as Record<string, unknown>)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "That is a few messages in quick succession. Please give it a minute, or call the office.",
      },
      { status: 429 },
    );
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const data = parsed.data;

  if (!isEmailConfigured()) {
    console.error("[submit] RESEND_API_KEY is missing, submission not sent");
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 500 });
  }

  const notice = noticeEmail(data);
  const noticeResult = await sendEmail({
    to: CONTACT_TO,
    subject: notice.subject,
    html: notice.html,
    text: notice.text,
    // The front desk replies in one keystroke, straight to the patient.
    replyTo: data.email,
  });

  if (!noticeResult.ok) {
    console.error("[submit] notice FAILED:", noticeResult.error);
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 502 });
  }
  // Logged so any submission can be traced to a specific message in Resend
  // without having to reproduce it. "It did not arrive" is otherwise
  // impossible to tell apart from "it was never sent".
  console.log("[submit] notice sent:", noticeResult.id, "kind:", data.kind);

  const confirmation = confirmationEmail(data);
  const confirmationResult = await sendEmail({
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
    // If the patient replies to their receipt, it should reach the practice.
    replyTo: CONTACT_TO,
  });

  if (confirmationResult.ok) {
    console.log("[submit] confirmation sent:", confirmationResult.id);
  } else {
    console.error("[submit] confirmation FAILED:", confirmationResult.error);
  }

  return NextResponse.json({
    ok: true,
    confirmed: confirmationResult.ok,
    // The Resend message id, so a submission can be looked up directly.
    ref: noticeResult.id,
  });
}
