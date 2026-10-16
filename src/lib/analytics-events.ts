/** Minimal GA4 events. No form fields, treatment reasons or free text. */
type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

function send(name: string, parameters: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    // The production layout installs this queue before hydration, even while
    // the external GA script is still waiting for idle time. Previews omit it.
    (window as AnalyticsWindow).gtag?.("event", name, parameters);
  } catch {
    // Analytics must never interrupt submitting a request or starting a call.
  }
}

export function trackLeadOutcome(
  outcome: "lead_submitted" | "lead_failed",
  kind: string,
  status?: unknown,
) {
  /* "campaign" is as granular as this gets: which kind of form, never which
     landing page, and never anything a visitor typed. The page itself is
     already in the GA4 pageview, so naming it again here would add exposure
     without adding information. */
  const allowedKinds = ["appointment", "contact", "campaign"];
  const form_type = allowedKinds.includes(kind) ? kind : "unknown";
  if (outcome === "lead_submitted") {
    send("generate_lead", { form_type });
  } else {
    send("lead_failed", {
      form_type,
      status: typeof status === "number" && Number.isInteger(status) ? status : 0,
    });
  }
}

export function trackPhoneClick(placement: string) {
  /* The landing pages put the same number in several places, and which one
     gets pressed is the point of measuring. Still a closed list: a placement
     that is not on it becomes "page". */
  const allowed = ["header", "footer", "mobile", "page", "hero", "form", "confirmation"];
  // Preserve the existing event name for historical continuity. A telephone
  // link click does not establish that a call connected or a patient booked.
  send("call_started", { placement: allowed.includes(placement) ? placement : "page" });
}
