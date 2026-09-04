/**
 * A very small Resend client.
 *
 * This is one HTTP POST, so it is written as one HTTP POST rather than pulling
 * in the SDK. Nothing here has to be kept in step with a package version, and
 * it runs unchanged on any runtime that has fetch.
 *
 * Configuration, all server side. Only the key is required:
 *   RESEND_API_KEY      the sending key from the Resend dashboard
 *   CONTACT_TO_EMAIL    where submissions land, defaults to the practice inbox
 *   CONTACT_FROM_EMAIL  the verified sender, defaults to the team subdomain
 */
import { practice } from "@/lib/content";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? practice.email;

export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ??
  "Park Place Dental <support@team.parkplacedentist.com>";

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export type Email = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(email: Email): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY is not set" };

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.replyTo ? { reply_to: [email.replyTo] } : {}),
      }),
      // A visitor is staring at a spinner. Give up rather than hang.
      signal: AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : "Network error",
    };
  }

  const raw = await response.text();
  const payload = (() => {
    try {
      return JSON.parse(raw) as { id?: string; message?: string; name?: string };
    } catch {
      return null;
    }
  })();

  // TEMPORARY DIAGNOSTIC. Records exactly what was asked of Resend and exactly
  // what came back, so a submission that reports success can be checked
  // against the provider rather than taken on trust. Remove once the missing
  // messages are accounted for.
  console.log(
    "[resend]",
    JSON.stringify({
      key: key.slice(0, 11),
      keyLength: key.length,
      from: CONTACT_FROM,
      to: email.to,
      subject: email.subject,
      status: response.status,
      quota: response.headers.get("x-resend-monthly-quota"),
      body: raw.slice(0, 400),
    }),
  );

  if (!response.ok) {
    return {
      ok: false,
      error: payload?.message ?? `Resend responded ${response.status}`,
    };
  }

  return { ok: true, id: payload?.id ?? "unknown" };
}
