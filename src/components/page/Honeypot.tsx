import { HONEYPOT_FIELD } from "@/lib/forms";

/**
 * A field no person ever sees and most crawlers fill in anyway.
 *
 * It is taken out of the accessibility tree and out of the tab order, so it is
 * invisible to a screen reader and to a keyboard, not merely painted off the
 * edge of the page.
 *
 * The name and the label are deliberately meaningless. An earlier version
 * used "Company", which browser autofill filled from the visitor's saved
 * profile, and every one of those submissions was thrown away as bot traffic.
 * `autoComplete="off"` did not prevent it, and is not enough on its own:
 * browsers also read the field name, the id and the nearby label text.
 */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      className="absolute h-px w-px overflow-hidden opacity-0"
      style={{ left: "-9999px", top: "auto" }}
    >
      <label htmlFor={HONEYPOT_FIELD}>Leave this field blank</label>
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
