/**
 * The one endpoint behind both website forms.
 *
 * Order of events, and the reason for it:
 *   1. Reject the obvious bots: a filled honeypot, a missing or forged form
 *      token, a flood from one address, or a message that is plainly a sales
 *      pitch. Each rejection is logged and answered honestly.
 *   2. Parse and validate on the server. The browser is not a witness.
 *   3. Send the notice to the practice and wait for it. If that fails the whole
 *      request fails, because a form that reports success while losing the
 *      submission is worse than a form that admits it is broken.
 *   4. Send the confirmation to the visitor. If that fails it is logged and the
 *      request still succeeds: the practice has the lead either way, and the
 *      visitor is better served by a missing receipt than by being told to
 *      start over on a message that did arrive.
 *
 * One rule governs all of the spam handling: never answer a rejection with a
 * fake success. An earlier version did, and when browser autofill started
 * tripping the honeypot, real enquiries vanished while the sender was told it
 * had worked. A person who is wrongly turned away must be able to see it and
 * pick up the phone, so every block returns an error that says so.
 */
import { NextResponse } from "next/server";
import { parseSubmission, HONEYPOT_FIELD } from "@/lib/forms";
import { verifyFormToken, isTokenConfigured } from "@/lib/formToken";
import { assessSubmission } from "@/lib/spam";
import { practice } from "@/lib/content";
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

/**
 * One honest answer for every block, and a log line naming the actual reason.
 *
 * The visitor is told plainly that it did not go through and is given the
 * phone number, so a wrongly blocked person has a way through. The specific
 * reason stays in the log: a bot that learns which check it tripped simply
 * comes back in a different shape.
 */
function reject(reason: string) {
  console.warn("[submit] rejected:", reason);
  return NextResponse.json(
    {
      ok: false,
      error: `We could not accept that message. Please call the office on ${practice.phone} and we will help straight away.`,
    },
    { status: 400 },
  );
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

  /*
   * The honeypot rejects again.
   *
   * It briefly only flagged, because its field was named "company" and browser
   * autofill was filling it, so blocking on it threw away real enquiries. The
   * field is now named and labelled so that nothing can recognise it, which
   * makes a filled honeypot a genuine bot signal once more. Flagging alone was
   * never a stable answer: it delivered every bot straight to the practice.
   */
  const honeypot = (body as Record<string, unknown>)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return reject("honeypot");
  }

  /*
   * The form token proves the page was actually loaded. A script that POSTs
   * straight at this endpoint has no token and cannot forge one. If the secret
   * is missing the check is skipped rather than failing closed, because a
   * configuration slip must never cost a patient.
   */
  if (isTokenConfigured()) {
    const verdict = verifyFormToken((body as Record<string, unknown>)?.formToken);
    if (verdict !== "ok") return reject(`token:${verdict}`);
  } else {
    console.error("[submit] FORM_TOKEN_SECRET is not set, token check skipped");
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

  const assessment = assessSubmission(data);
  if (assessment.reject) {
    return reject(`content:${assessment.reasons.join("|")}`);
  }

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
