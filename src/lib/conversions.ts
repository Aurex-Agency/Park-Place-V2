/**
 * Lead reporting for the advertising landing pages.
 *
 * Two destinations, deliberately. Vercel Analytics is where the practice's own
 * reporting lives and records every lead regardless of where it came from.
 * Google Ads needs its own conversion event or the campaigns cannot optimise
 * or be judged on cost per lead.
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
 * Records a lead. Safe to call from anywhere: every call is wrapped, because
 * measurement must never be the reason a patient's enquiry appears to fail.
 */
export function reportLead(campaign: string): void {
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    // A GA4 event regardless, so the practice's own funnel is complete.
    gtag?.("event", "generate_lead", { campaign });
    if (googleAdsConfigured) {
      gtag?.("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
        campaign,
      });
    }
  } catch {
    // Ignored on purpose.
  }
}
