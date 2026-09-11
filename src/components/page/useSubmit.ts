"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SubmitStatus = "idle" | "sending" | "sent" | "error";

const FALLBACK =
  "We could not send that just now. Please call the office and we will help straight away.";

/** Long enough to clear the server's minimum form age, with room to spare. */
const TOKEN_SETTLE_MS = 2_300;

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
  const token = useRef<string | null>(null);

  const loadToken = useCallback(async () => {
    try {
      const response = await fetch("/api/form-token", { cache: "no-store" });
      const data = (await response.json()) as { token?: string | null };
      if (typeof data?.token === "string" && data.token) {
        token.current = data.token;
      }
    } catch {
      // Retried on submit.
    }
  }, []);

  useEffect(() => {
    void loadToken();
  }, [loadToken]);

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus("sending");
    setError(null);

    if (!token.current) {
      await loadToken();
      // On this rare path the token is brand new, and the server rejects a
      // form that was answered faster than a person could type. Wait it out
      // rather than be turned away for it.
      await new Promise((resolve) => setTimeout(resolve, TOKEN_SETTLE_MS));
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formToken: token.current }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error ?? FALLBACK);
        setStatus("error");
        return false;
      }

      setStatus("sent");
      return true;
    } catch {
      setError(FALLBACK);
      setStatus("error");
      return false;
    }
  }

  return { status, error, submit };
}
