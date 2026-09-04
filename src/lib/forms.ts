/**
 * Shape and validation for everything the website can submit.
 *
 * Both forms share one endpoint, so they share one vocabulary. The browser
 * sends a `kind` and the server decides what that kind is allowed to contain.
 * Nothing here trusts the client: the same parse runs again on the server,
 * because required attributes in the markup are a courtesy to the visitor and
 * not a guarantee to us.
 */

export type SubmissionKind = "contact" | "appointment";

export type ContactSubmission = {
  kind: "contact";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type AppointmentSubmission = {
  kind: "appointment";
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  newPatient: string;
  reason: string;
  notes: string;
};

export type Submission = ContactSubmission | AppointmentSubmission;

/**
 * The field a real person never sees and a crawler nearly always fills.
 *
 * The name is deliberately meaningless. This was called "company" with a
 * matching label, which browser autofill recognised and filled from the
 * visitor's saved profile, so genuine submissions were being classified as
 * bot traffic and thrown away. Anything a browser can recognise is unusable
 * here: no name, label, id or autocomplete value that maps to a real world
 * field.
 */
export const HONEYPOT_FIELD = "pp_verify";

/** Longest we will accept for each field, in characters. */
const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  subject: 120,
  message: 4000,
  date: 40,
  time: 40,
  newPatient: 20,
  reason: 120,
  notes: 4000,
} as const;

export type ParseResult =
  | { ok: true; data: Submission }
  | { ok: false; error: string };

/**
 * Control characters come out. They are what lets someone forge an extra mail
 * header or fake a section break inside the body of the message. Newlines are
 * the exception, and only where a field is genuinely multi line.
 */
function stripControl(value: string, keepNewlines: boolean): string {
  return value.replace(/\p{Cc}/gu, (ch) => (keepNewlines && ch === "\n" ? ch : ""));
}

/** A multi line field: a message or a note. */
function text(raw: unknown, limit: number): string {
  if (typeof raw !== "string") return "";
  return stripControl(raw, true).trim().slice(0, limit);
}

/** A single line field: a name, an address, a chosen option. */
function line(raw: unknown, limit: number): string {
  if (typeof raw !== "string") return "";
  return stripControl(raw, false).trim().slice(0, limit);
}

/**
 * Deliberately loose. The job is to catch a typo and to refuse anything that
 * cannot be an address, not to adjudicate the RFC. Rejecting a valid but
 * unusual address costs the practice a patient, which is the worse mistake.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);
}

/** A phone number, once the way people actually write one is allowed for. */
function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function parseSubmission(raw: unknown): ParseResult {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "We could not read that submission." };
  }
  const body = raw as Record<string, unknown>;

  const name = line(body.name, LIMITS.name);
  const email = line(body.email, LIMITS.email);
  const phone = line(body.phone, LIMITS.phone);

  if (name.length < 2) return { ok: false, error: "Please tell us your name." };
  if (!looksLikeEmail(email)) return { ok: false, error: "Please check your email address." };

  if (body.kind === "appointment") {
    if (!looksLikePhone(phone)) {
      return { ok: false, error: "Please give us a phone number we can reach you on." };
    }
    return {
      ok: true,
      data: {
        kind: "appointment",
        name,
        email,
        phone,
        date: line(body.date, LIMITS.date),
        time: line(body.time, LIMITS.time),
        newPatient: line(body.newPatient, LIMITS.newPatient),
        reason: line(body.reason, LIMITS.reason),
        notes: text(body.notes, LIMITS.notes),
      },
    };
  }

  if (body.kind === "contact") {
    const message = text(body.message, LIMITS.message);
    if (message.length < 2) return { ok: false, error: "Please add a message." };
    if (phone && !looksLikePhone(phone)) {
      return { ok: false, error: "Please check that phone number." };
    }
    return {
      ok: true,
      data: {
        kind: "contact",
        name,
        email,
        phone,
        subject: line(body.subject, LIMITS.subject),
        message,
      },
    };
  }

  return { ok: false, error: "We could not read that submission." };
}

/**
 * A date input hands over `2026-09-15`. That is fine for a machine and poor
 * for the person at the front desk reading it at a glance, so it is written
 * out. Built from the parts rather than parsed as a string, because parsing
 * `2026-09-15` gives midnight UTC, which in central time is the day before.
 */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Addressing someone by their full name reads like a form letter. */
export function firstName(name: string): string {
  return name.split(/\s+/)[0] || name;
}

/**
 * The one description of a submission that every email is built from, so the
 * notice the practice receives and the confirmation the patient receives can
 * never fall out of step.
 */
export function describe(data: Submission): {
  title: string;
  noticeSubject: string;
  rows: Array<[string, string]>;
  longFieldLabel: string;
  longFieldValue: string;
} {
  if (data.kind === "appointment") {
    return {
      title: "Appointment request",
      noticeSubject: `Appointment request from ${data.name}`,
      rows: [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Preferred date", data.date ? formatDate(data.date) : "No preference given"],
        ["Preferred time", data.time || "No preference given"],
        ["New patient", data.newPatient || "Not answered"],
        ["Reason for visit", data.reason || "Not given"],
      ],
      longFieldLabel: "Anything else we should know",
      longFieldValue: data.notes,
    };
  }

  return {
    title: "Website message",
    noticeSubject: data.subject
      ? `Website message from ${data.name} about ${data.subject.toLowerCase()}`
      : `Website message from ${data.name}`,
    rows: [
      ["Name", data.name],
      ["Phone", data.phone || "Not given"],
      ["Email", data.email],
      ["Subject", data.subject || "Not given"],
    ],
    longFieldLabel: "Message",
    longFieldValue: data.message,
  };
}
