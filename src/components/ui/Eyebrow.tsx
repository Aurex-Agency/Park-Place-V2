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
}: {
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <p className={`t-eyebrow ${align === "center" ? "text-center" : ""}`}>
      {children}
    </p>
  );
}
