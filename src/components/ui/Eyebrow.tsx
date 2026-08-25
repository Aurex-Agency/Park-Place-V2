import type { ReactNode } from "react";

/**
 * Small tracked caps set in the brand serif, with a short metal rule.
 * Used to label every section, the way the reference site does.
 */
export function Eyebrow({
  children,
  align = "left",
  rule = true,
}: {
  children: ReactNode;
  align?: "left" | "center";
  rule?: boolean;
}) {
  return (
    <p
      className={`t-eyebrow flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {rule && (
        <span
          aria-hidden="true"
          className="metal-rule animate-glint block h-px w-8 shrink-0"
        />
      )}
      {children}
      {rule && align === "center" && (
        <span
          aria-hidden="true"
          className="metal-rule animate-glint block h-px w-8 shrink-0"
        />
      )}
    </p>
  );
}
