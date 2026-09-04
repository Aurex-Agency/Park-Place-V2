"use client";

import { useState } from "react";

export type SubmitStatus = "idle" | "sending" | "sent" | "error";

const FALLBACK =
  "We could not send that just now. Please call the office and we will help straight away.";

/**
 * Posts a form to the site's own endpoint and tracks the three states a
 * visitor can see: sending, sent, and something went wrong.
 *
 * The server owns the wording of a validation failure, so the message shown
 * here is the one the server sent rather than a guess made in the browser.
 */
export function useSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
