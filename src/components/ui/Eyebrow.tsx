import type { ReactNode } from "react";

/**
 * Small tracked caps, used to label every section.
 *
 * There used to be a short metal dash beside the words. It went, because a
 * little decorative stroke next to a label is one of the most worn tells of a
 * generated layout, and the tracked capitals carry the job on their own. Rules
 * still exist in this system, but only where they do structural work: the edge
 * of a row, the divider above the footer.
 */
export function Eyebrow({
  children,
  align = "left",
  tone = "light",
}: {
  children: ReactNode;
  align?: "left" | "center";
  /** "dark" for sections on espresso or walnut. */
  tone?: "light" | "dark";
}) {
  // The default rose reads at 5.37:1 on linen but only 2.80:1 on espresso, so
  // dark sections take the lighter rose. Passing the wrong one is a contrast
  // failure, which is why it is a named tone rather than a colour class.
  return (
    <p
      className={`t-eyebrow ${align === "center" ? "text-center" : ""} ${
        tone === "dark" ? "!text-rose-mist" : ""
      }`}
    >
      {children}
    </p>
  );
}
