import type { Submission } from "@/lib/forms";

/**
 * Content checks, applied after a submission has passed validation.
 *
 * These are deliberately conservative. A patient describing a problem is not
 * going to paste three links or write in BBCode, but they might well mention a
 * website once, so a single link on its own is never enough to reject someone.
 * Every rule here has to answer the same question: could a nervous person
 * asking about a toothache plausibly write this? If yes, it is not a rule.
 */

/** Markup in a plain text box is never a person. */
const BBCODE = /\[\s*(?:url|link|img|b|i|quote)\b[^\]]*\]/i;
const HTML_TAG = /<\s*(?:a|script|iframe|img)\b/i;

const URL = /\b(?:https?:\/\/|www\.)[^\s<>"']{2,}/gi;

/**
 * Phrases from the pitches this kind of site actually receives: search
 * rankings, web design, link building, crypto. None of them belong in a
 * message to a dentist.
 */
const PITCH_PHRASES = [
  "seo servic",
  "search engine optimi",
  "backlink",
  "guest post",
  "link building",
  "domain authority",
  "web design servic",
  "increase your traffic",
  "first page of google",
  "rank your website",
  "digital marketing agenc",
  "bulk email",
  "email list",
  "crypto",
  "bitcoin",
  "forex",
  "investment opportunit",
  "loan offer",
  "viagra",
  "casino",
  "escort",
];

export type SpamVerdict = {
  reject: boolean;
  reasons: string[];
};

function countUrls(text: string): number {
  return (text.match(URL) ?? []).length;
}

export function assessSubmission(data: Submission): SpamVerdict {
  /*
   * A campaign submission has no free text beyond the sender's name. Every
   * answer is chosen from a list the server declared, and the parser already
   * refused anything that was not on it, so there is nothing else here that a
   * sales pitch could have been typed into.
   */
  const freeText =
    data.kind === "campaign"
      ? []
      : data.kind === "appointment"
        ? [data.notes, data.reason]
        : [data.message, data.subject];

  const haystack = [data.name, ...freeText].join("\n").toLowerCase();

  const reasons: string[] = [];

  if (BBCODE.test(haystack)) reasons.push("bbcode");
  if (HTML_TAG.test(haystack)) reasons.push("html-tag");

  const urls = countUrls(haystack);
  if (urls >= 2) reasons.push(`urls:${urls}`);

  const phrases = PITCH_PHRASES.filter((p) => haystack.includes(p));
  if (phrases.length) reasons.push(`phrases:${phrases.join(",")}`);

  // A link on its own is allowed. A link next to a sales phrase is not, and
  // neither is a pitch that names two of them.
  const reject =
    reasons.includes("bbcode") ||
    reasons.includes("html-tag") ||
    urls >= 2 ||
    phrases.length >= 2 ||
    (urls >= 1 && phrases.length >= 1);

  return { reject, reasons };
}
