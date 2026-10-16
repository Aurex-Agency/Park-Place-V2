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
  const form_type = kind === "appointment" || kind === "contact" ? kind : "unknown";
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
  const allowed = ["header", "footer", "mobile", "page"];
  // Preserve the existing event name for historical continuity. A telephone
  // link click does not establish that a call connected or a patient booked.
  send("call_started", { placement: allowed.includes(placement) ? placement : "page" });
}
