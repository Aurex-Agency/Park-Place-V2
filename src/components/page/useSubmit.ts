"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

export type SubmitStatus = "idle" | "sending" | "sent" | "error";

const FALLBACK =
  "We could not send that just now. Please call the office and we will help straight away.";

/** Long enough to clear the server's minimum form age, with room to spare. */
const TOKEN_SETTLE_MS = 2_300;

/**
 * When a token is old enough to be replaced before it is used.
 *
 * The server stops honouring one after four hours. A form left open on a desk
 * all morning would therefore be refused at the moment it is finally sent, and
 * the person would be told to telephone instead, which is the one outcome this
 * whole path exists to avoid. Well under the server's limit, so a token is
 * replaced long before it can expire.
 */
const TOKEN_STALE_MS = 45 * 60 * 1000;

/**
 * Counts an outcome, carrying nothing a person typed.
 *
 * Which form it was and whether it worked is the whole payload. Names, phone
 * numbers, email addresses and messages stay between the browser and the
 * practice's own endpoint, which is the only place they belong.
 */
function report(
  event: "lead_submitted" | "lead_failed",
  payload: Record<string, unknown>,
  extra: Record<string, string | number | boolean>,
) {
  const kind = typeof payload.kind === "string" ? payload.kind : "unknown";
  try {
    track(event, { kind, ...extra });
  } catch {
    // Measurement must never be the reason a submission path breaks.
  }
}

/**
 * Posts a form to the site's own endpoint and tracks the three states a
 * visitor can see: sending, sent, and something went wrong.
 *
 * It also collects the form token on mount. The token proves to the server
 * that a real page was loaded, which is what keeps scripted spam out. If that
 * request fails it is retried at submit time rather than abandoned, because a
 * momentary network problem must not cost the practice an enquiry.
 *
 * The server owns the wording of a validation failure, so the message shown
 * here is the one the server sent rather than a guess made in the browser.
 */
export function useSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  /**
   * Whether the visitor's own copy went out. The practice has the enquiry
   * either way, so this never changes the outcome, only whether we promise
   * someone an email that was never sent.
   */
  const [confirmed, setConfirmed] = useState(true);
  const token = useRef<string | null>(null);
  const mintedAt = useRef<number>(0);

  const loadToken = useCallback(async () => {
    try {
      const response = await fetch("/api/form-token", { cache: "no-store" });
      const data = (await response.json()) as { token?: string | null };
      if (typeof data?.token === "string" && data.token) {
        token.current = data.token;
        mintedAt.current = Date.now();
      }
    } catch {
      // Retried on submit.
    }
  }, []);

  const isStale = useCallback(
    () => !token.current || Date.now() - mintedAt.current > TOKEN_STALE_MS,
    [],
  );

  useEffect(() => {
    void loadToken();

    /*
     * A phone puts a background tab to sleep rather than closing it. Someone
     * who opens the booking page, takes a call and comes back an hour later is
     * the ordinary case, not the unusual one, so the token is replaced when
     * the page is looked at again.
     */
    function onVisible() {
      if (document.visibilityState === "visible" && isStale()) void loadToken();
    }

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadToken, isStale]);

  async function post(payload: Record<string, unknown>) {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, formToken: token.current }),
    });

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string; retry?: boolean; confirmed?: boolean }
      | null;

    return { response, result };
  }

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus("sending");
    setError(null);
    setConfirmed(true);

    const hadNoToken = !token.current;
    if (isStale()) {
      await loadToken();
      if (hadNoToken) {
        // On this rare path the token is brand new, and the server rejects a
        // form that was answered faster than a person could type. Wait it out
        // rather than be turned away for it.
        await new Promise((resolve) => setTimeout(resolve, TOKEN_SETTLE_MS));
      }
    }

    try {
      let { response, result } = await post(payload);

      /*
       * The server will ask for a second attempt when, and only when, the
       * token it was given was genuine but had aged out. Nothing the visitor
       * typed is lost: the same payload goes again behind a fresh token.
       */
      if (!response.ok && result?.retry) {
        await loadToken();
        await new Promise((resolve) => setTimeout(resolve, TOKEN_SETTLE_MS));
        ({ response, result } = await post(payload));
      }

      if (!response.ok || !result?.ok) {
        /*
         * A failed enquiry is the event worth counting. Nobody watches a
         * server log, and until this was here a run of failures looked
         * exactly like a quiet week. Only the kind of form and the status
         * code are sent: nothing anyone typed leaves the browser.
         */
        report("lead_failed", payload, { status: response.status });
        setError(result?.error ?? FALLBACK);
        setStatus("error");
        return false;
      }

      report("lead_submitted", payload, { confirmed: result.confirmed !== false });
      setConfirmed(result.confirmed !== false);
      setStatus("sent");
      return true;
    } catch {
      report("lead_failed", payload, { status: 0 });
      setError(FALLBACK);
      setStatus("error");
      return false;
    }
  }

  return { status, error, confirmed, submit };
}
