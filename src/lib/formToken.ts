import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * A signed, timestamped token minted when a form is rendered and handed back
 * when it is submitted.
 *
 * Most form spam is a script POSTing straight at the endpoint. It never loads
 * the page, so it never asks for a token, and it cannot forge one without the
 * server secret. That single check removes the bulk of it at no cost to a
 * visitor, who never sees any of this.
 *
 * The age of the token is also the age of the form. A submission that arrives
 * a fraction of a second after the form was drawn was not typed by a person.
 */

const MIN_AGE_MS = 2_000;
const MAX_AGE_MS = 4 * 60 * 60 * 1000;

function secret(): string | null {
  return process.env.FORM_TOKEN_SECRET || null;
}

/**
 * Whether token checking is usable at all.
 *
 * If the secret is missing this returns false and the caller skips the check
 * rather than rejecting every submission. A configuration slip should cost the
 * practice some spam, never a real patient.
 */
export function isTokenConfigured(): boolean {
  return secret() !== null;
}

function sign(issued: string, key: string): string {
  return createHmac("sha256", key).update(issued).digest("base64url");
}

export function mintFormToken(now: number = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const issued = String(now);
  return `${issued}.${sign(issued, key)}`;
}

export type TokenVerdict =
  | "ok"
  | "unconfigured"
  | "missing"
  | "malformed"
  | "bad-signature"
  | "too-fast"
  | "expired";

export function verifyFormToken(
  token: unknown,
  now: number = Date.now(),
): TokenVerdict {
  const key = secret();
  if (!key) return "unconfigured";
  if (typeof token !== "string" || token === "") return "missing";

  const parts = token.split(".");
  if (parts.length !== 2) return "malformed";

  const [issued, provided] = parts;
  if (!/^\d{10,15}$/.test(issued)) return "malformed";

  const expected = sign(issued, key);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "bad-signature";

  const age = now - Number(issued);
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
