import { describe, type Submission } from "@/lib/forms";

export const OFFICE_TIMEZONE = "America/Chicago";

/** Evaluate the submission instant, not the later workflow execution time. */
export function officeStatus(at: Date): "open" | "closed" {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: OFFICE_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const day = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  return ["Mon", "Tue", "Wed", "Thu"].includes(day ?? "") && hour >= 9 && hour < 17
    ? "open" : "closed";
}

export function webhookPayload(data: Submission, submissionId: string) {
  const description = describe(data);
  const [firstName, ...lastName] = data.name.split(/\s+/);
  const digits = data.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `+1${digits}`
    : digits.length === 11 && digits.startsWith("1") ? `+${digits}`
    : data.phone.startsWith("+") ? `+${digits}` : data.phone;
  return {
    first_name: firstName,
    last_name: lastName.join(" "),
    email: data.email,
    ...(phone ? { phone } : {}),
    form_source: data.kind,
    submission_id: submissionId,
    submitted_at: data.smsConsent.recordedAt,
    office_status: officeStatus(new Date(data.smsConsent.recordedAt)),
    office_timezone: OFFICE_TIMEZONE,
    sms_informational_consent: data.smsConsent.informational ? "yes" : "no",
    sms_marketing_consent: data.smsConsent.marketing ? "yes" : "no",
    consent_version: data.smsConsent.version,
    consent_source: data.smsConsent.source,
    submission_summary: [
      description.title,
      `Submission ID: ${submissionId}`,
      ...description.rows.map(([label, value]) => `${label}: ${value}`),
      `${description.longFieldLabel}: ${description.longFieldValue}`,
    ].join("\n"),
  };
}

/** Both forms reach GHL, even when neither SMS checkbox is checked. */
export async function sendToGhl(data: Submission, submissionId: string): Promise<
  { ok: true; skipped?: boolean } | { ok: false; error: string }
> {
  if (data.kind === "campaign") return { ok: true, skipped: true };
  const url = data.kind === "contact"
    ? process.env.GHL_CONTACT_WEBHOOK_URL : process.env.GHL_APPOINTMENT_WEBHOOK_URL;
  if (!url) return { ok: false, error: `Missing ${data.kind} webhook configuration` };
  try {
    const target = new URL(url);
    if (target.protocol !== "https:" || target.hostname !== "services.leadconnectorhq.com") {
      return { ok: false, error: "Invalid GHL webhook host" };
    }
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload(data, submissionId)),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });
    if (!response.ok) return { ok: false, error: `GHL HTTP ${response.status}` };
    return { ok: true };
  } catch {
    // Never log the webhook URL or patient data. Do not blindly retry an
    // ambiguous delivery: GHL may have accepted it before the timeout.
    return { ok: false, error: "GHL network error or timeout" };
  }
}
