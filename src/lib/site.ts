/**
 * The canonical origin for absolute URLs: share card images, canonical tags,
 * the sitemap, and robots.
 *
 * Production is the practice's own domain. Previews stay on their own
 * deployment URL, because a preview whose share card points at the production
 * host shows the production image, not the build you are reviewing.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL, to pin it explicitly or to test a change.
 *   2. The production domain, on production deployments.
 *   3. The current deployment URL, on previews.
 *   4. localhost, in development.
 */
export const PRODUCTION_URL = "https://parkplacedentist.com";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** An absolute URL for a route, for canonical tags. */
export function canonical(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}
