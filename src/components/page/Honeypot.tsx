import { HONEYPOT_FIELD } from "@/lib/forms";

/**
 * A field no person ever sees and most crawlers fill in anyway. Anything that
 * arrives with it filled is discarded on the server.
 *
 * It is taken out of the accessibility tree and out of the tab order, so it is
 * invisible to a screen reader and to a keyboard, not merely painted off the
 * edge of the page.
 */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      className="absolute h-px w-px overflow-hidden opacity-0"
      style={{ left: "-9999px", top: "auto" }}
    >
      <label htmlFor={HONEYPOT_FIELD}>Company</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
