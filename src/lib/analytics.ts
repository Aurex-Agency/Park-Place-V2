/**
 * Google Analytics configuration.
 *
 * The measurement ID is not a secret: it is visible in the page source of
 * every site that uses one, which is why it sits here rather than in an
 * environment variable.
 */
export const GA_MEASUREMENT_ID = "G-DRM0YMY3XZ";

/**
 * Whether to load it.
 *
 * Production only, by default. A preview deployment is a copy of the site that
 * the two of us click through while reviewing a branch, and every one of those
 * clicks would otherwise land in the practice's own reporting as though a
 * patient had made it. Small numbers matter here: a practice in a town of eight
 * thousand does not get enough traffic for that noise to average out.
 *
 * `VERCEL_ENV` is read at build time, which is when this decision is made,
 * because the root layout is statically rendered. It is the same check
 * `lib/site.ts` already uses to pick the canonical origin.
 *
 * To measure a preview build as well, set `NEXT_PUBLIC_GA_IN_PREVIEW=true` on
 * that deployment rather than editing this file.
 */
export const analyticsEnabled =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_GA_IN_PREVIEW === "true";
