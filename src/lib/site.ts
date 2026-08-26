/**
 * The canonical origin for absolute URLs: share card images, the sitemap, and
 * robots.
 *
 * Hardcoding the production domain breaks share cards on every deployment that
 * is not yet served from it, which is every preview and, until the domain is
 * pointed here, production too. The card would reference an image on a host
 * that does not serve this build.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL, when you want to pin it explicitly.
 *   2. The project's production URL, which Vercel updates to the custom domain
 *      as soon as one is attached, so this needs no edit at launch.
 *   3. The current deployment URL.
 *   4. localhost, for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
