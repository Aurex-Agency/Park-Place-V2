"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Counts clicks on the practice's phone number, wherever they happen.
 *
 * Until this existed, the only conversion the site measured was the booking
 * form. Every telephone link, and there are around twenty of them across the
 * header, the footer, the mobile action bar, every page header and every
 * closing band, was an untracked `<a href="tel:">`. For a rural practice whose
 * own copy tells people to ring rather than fill in a form, that meant the
 * dominant conversion path was the invisible one, and no change to a call to
 * action could be shown to have worked.
 *
 * One delegated listener rather than a handler on each link: it catches the
 * links that already exist, the ones added later, and the ones rendered inside
 * server components that cannot take an `onClick` without becoming client
 * components themselves.
 *
 * What is recorded is the fact of the call and the page it came from. Nothing
 * a person typed goes anywhere near it.
 */
export function CallTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;

      /* Where on the page it was pressed. The mobile bar, the header and a
         page's own closing band answer different questions about intent, and
         telling them apart is the point of measuring at all. */
      const placement =
        link.getAttribute("data-call-placement") ??
        link.closest("[data-call-placement]")?.getAttribute("data-call-placement") ??
        (link.closest("header") ? "header" : null) ??
        (link.closest("footer") ? "footer" : null) ??
        "page";

      const payload = {
        placement,
        path: window.location.pathname,
      };

      try {
        track("call_started", payload);
      } catch {
        // Measurement must never be the reason a call does not connect.
      }

      try {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.("event", "call_started", payload);
      } catch {
        // As above.
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
