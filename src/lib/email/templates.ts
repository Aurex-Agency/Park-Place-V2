/**
 * The two emails this website sends.
 *
 * Email clients are not browsers. There is no stylesheet, no grid, and no
 * confidence that any given rule survives, so everything here is a table with
 * inline styles. The palette is the site palette and the display face falls
 * back to Georgia, which is the closest thing to Zodiak that is present on
 * essentially every machine.
 */
import { practice, doctor } from "@/lib/content";
import { describe, firstName, type Submission } from "@/lib/forms";
import { PRODUCTION_URL } from "@/lib/site";

const LINEN = "#faf6f2";
const ESPRESSO = "#2a1e17";
const TAUPE = "#75604f";
const ROSE_DEEP = "#96543f";
const SAND = "#e2d6ca";
const WHITE = "#ffffff";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** User input goes into HTML, so it is escaped without exception. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps the line breaks someone typed into a message. */
function escMultiline(value: string): string {
  return esc(value).replace(/\n/g, "<br />");
}

/**
 * The hidden line that a mail client shows next to the subject. Without one it
 * shows the first words of the body, which is rarely the useful part.
 */
function preheader(copy: string): string {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${esc(
    copy,
  )}</div>`;
}

function detailRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid ${SAND};font-family:${SANS};font-size:13px;color:${TAUPE};width:170px;vertical-align:top;">${esc(
          label,
        )}</td>
        <td style="padding:11px 0;border-bottom:1px solid ${SAND};font-family:${SANS};font-size:15px;color:${ESPRESSO};vertical-align:top;">${esc(
          value,
        )}</td>
      </tr>`,
    )
    .join("");
}

function longField(label: string, value: string): string {
  if (!value) return "";
  return `
    <p style="margin:26px 0 8px;font-family:${SANS};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${TAUPE};">${esc(
      label,
    )}</p>
    <div style="font-family:${SANS};font-size:15px;line-height:1.65;color:${ESPRESSO};background-color:${LINEN};border-radius:12px;padding:16px 18px;">${escMultiline(
      value,
    )}</div>`;
}

/** The frame every email shares: header band, white card, footer. */
function shell(options: {
  preheaderCopy: string;
  eyebrow: string;
  heading: string;
  body: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${esc(options.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:${LINEN};">
${preheader(options.preheaderCopy)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${LINEN};padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr>
          <td style="padding:0 0 22px;text-align:center;">
            <span style="font-family:${SERIF};font-size:22px;letter-spacing:0.01em;color:${ESPRESSO};">Park Place Dental</span><br />
            <span style="font-family:${SANS};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${ROSE_DEEP};">Booneville, Mississippi</span>
          </td>
        </tr>
        <tr>
          <td style="background-color:${WHITE};border-radius:18px;padding:34px 32px;border:1px solid ${SAND};">
            <p style="margin:0 0 10px;font-family:${SANS};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${ROSE_DEEP};">${esc(
              options.eyebrow,
            )}</p>
            <h1 style="margin:0 0 20px;font-family:${SERIF};font-size:26px;line-height:1.2;font-weight:500;color:${ESPRESSO};">${esc(
              options.heading,
            )}</h1>
            ${options.body}
          </td>
        </tr>
        <tr>
          <td style="padding:22px 8px 0;text-align:center;font-family:${SANS};font-size:12px;line-height:1.7;color:${TAUPE};">
            ${esc(practice.address.full)}<br />
            <a href="${practice.phoneHref}" style="color:${ROSE_DEEP};text-decoration:none;">${esc(
              practice.phone,
            )}</a>
            &nbsp;&bull;&nbsp;
            <a href="${PRODUCTION_URL}" style="color:${ROSE_DEEP};text-decoration:none;">parkplacedentist.com</a><br />
            ${esc(practice.hours)}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Every email also carries a plain text part, for clients that prefer it. */
function plain(lines: Array<string>): string {
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** What lands in the practice inbox. */
export function noticeEmail(data: Submission): {
  subject: string;
  html: string;
  text: string;
} {
  const d = describe(data);
  const received = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${detailRows(d.rows)}
    </table>
    ${longField(d.longFieldLabel, d.longFieldValue)}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
      <tr>
        <td style="background-color:${ROSE_DEEP};border-radius:12px;">
          <a href="mailto:${esc(data.email)}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:15px;font-weight:500;color:${WHITE};text-decoration:none;">Reply to ${esc(
            data.name,
          )}</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${TAUPE};">
      Received ${esc(received)} central time. Replying to this email goes
      straight back to ${esc(data.name)}. A confirmation has already been sent
      to them automatically.
    </p>`;

  const text = plain([
    d.title.toUpperCase(),
    "",
    ...d.rows.map(([label, value]) => `${label}: ${value}`),
    "",
    d.longFieldValue ? `${d.longFieldLabel}:` : "",
    d.longFieldValue,
    "",
    `Received ${received} central time.`,
    "Replying to this email goes straight back to the sender.",
  ]);

  return { subject: d.noticeSubject, html: shell({
    preheaderCopy: `${d.rows[0][1]}, ${data.phone || data.email}`,
    eyebrow: "New from the website",
    heading: d.title,
    body,
  }), text };
}

/** What lands in the visitor's inbox. */
export function confirmationEmail(data: Submission): {
  subject: string;
  html: string;
  text: string;
} {
  const d = describe(data);
  const isAppointment = data.kind === "appointment";

  const opening = isAppointment
    ? `Thank you for asking to see us, ${firstName(data.name)}. Your request is with our front desk and someone will call you shortly to confirm a time that works.`
    : `Thank you for getting in touch, ${firstName(data.name)}. Your message is with our front desk and someone will be back to you shortly.`;

  const expectation = isAppointment
    ? "We answer requests during office hours, so if you sent this in the evening or over a weekend you will hear from us the next working day. Nothing is booked until we have spoken with you."
    : "We answer messages during office hours, so if you sent this in the evening or over a weekend you will hear from us the next working day.";

  const body = `
    <p style="margin:0 0 18px;font-family:${SANS};font-size:16px;line-height:1.7;color:${ESPRESSO};">${esc(
      opening,
    )}</p>
    <p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:${TAUPE};">${esc(
      expectation,
    )}</p>

    <p style="margin:0 0 10px;font-family:${SANS};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${TAUPE};">What you sent us</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${detailRows(d.rows)}
    </table>
    ${longField(d.longFieldLabel, d.longFieldValue)}

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
      <tr>
        <td style="background-color:${ROSE_DEEP};border-radius:12px;">
          <a href="${practice.phoneHref}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:15px;font-weight:500;color:${WHITE};text-decoration:none;">Call ${esc(
            practice.phone,
          )}</a>
        </td>
      </tr>
    </table>

    <p style="margin:26px 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${TAUPE};">
      If anything is urgent or painful, please call us rather than waiting on a
      reply. Please also keep medical history, insurance numbers and payment
      details out of email, and we will take those from you over the phone or
      at your visit.
    </p>
    <p style="margin:20px 0 0;font-family:${SANS};font-size:15px;line-height:1.7;color:${ESPRESSO};">
      We look forward to seeing you.<br />
      <span style="color:${TAUPE};">${esc(doctor.name)} and the team at Park Place Dental</span>
    </p>`;

  const text = plain([
    opening,
    "",
    expectation,
    "",
    "WHAT YOU SENT US",
    ...d.rows.map(([label, value]) => `${label}: ${value}`),
    "",
    d.longFieldValue ? `${d.longFieldLabel}:` : "",
    d.longFieldValue,
    "",
    `If anything is urgent or painful, please call us on ${practice.phone} rather than waiting on a reply.`,
    "Please keep medical history, insurance numbers and payment details out of email.",
    "",
    `${practice.address.full}`,
    `${practice.phone}`,
    `${practice.hours}`,
    "",
    `${doctor.name} and the team at Park Place Dental`,
  ]);

  return {
    subject: isAppointment
      ? "We have your appointment request"
      : "We have your message",
    html: shell({
      preheaderCopy: isAppointment
        ? "Your request is with our front desk and we will call you shortly."
        : "Your message is with our front desk and we will be back to you shortly.",
      eyebrow: "Park Place Dental",
      heading: isAppointment ? "We have got your request" : "We have got your message",
      body,
    }),
    text,
  };
}
