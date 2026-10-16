/**
 * Lead reporting for the advertising landing pages.
 *
 * Google Ads needs its own conversion event or the campaigns cannot optimise
 * or be judged on cost per lead. Everything else is already handled.
 *
 * The Google Ads identifiers are not secret, which is why they sit here rather
 * than in an environment variable. Until they are filled in, the Google call
 * is skipped and the Vercel one still happens, so nothing is lost in the
 * meantime except the Ads side of the picture.
 */

/** From Google Ads, of the form "AW-123456789". */
export const GOOGLE_ADS_ID: string | null = null;

/** The conversion label for a landing page lead, from the same conversion action. */
export const GOOGLE_ADS_LEAD_LABEL: string | null = null;

export const googleAdsConfigured = Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL);

type Gtag = (...args: unknown[]) => void;

/**
 * Reports the lead to Google Ads, and only to Google Ads.
 *
 * GA4 and Vercel Analytics are already told by useSubmit, which every form on
 * the site goes through. Reporting again here counted each landing page lead
 * twice, which is worse than not counting it at all: it would have made the
 * campaigns look twice as effective as they are and skewed what the practice
 * spends.
 */
export function reportAdsConversion(campaign: string): void {
  try {
    if (!googleAdsConfigured) return;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
      campaign,
    });
  } catch {
    // Ignored on purpose.
  }
}
