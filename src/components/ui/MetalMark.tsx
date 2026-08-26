/**
 * The Park Place column, filled with polished rose gold.
 *
 * The logo art is a flat silhouette, so it is used as a CSS mask and the
 * metal gradient is painted behind it. That keeps one asset working at any
 * size and in any finish.
 */
export function MetalMark({
  size = 40,
  className = "",
  finish = "metal",
}: {
  size?: number;
  className?: string;
  finish?: "metal" | "espresso" | "linen";
}) {
  const background =
    finish === "metal"
      ? "var(--metal-rose)"
      : finish === "linen"
        ? "var(--color-linen)"
        : "var(--color-espresso)";

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width: size,
        height: size * (350 / 803),
        background,
        backgroundSize: finish === "metal" ? "200% 100%" : undefined,
        backgroundPosition: finish === "metal" ? "30% 0" : undefined,
        WebkitMaskImage: "url(/images/logo-mark.png)",
        maskImage: "url(/images/logo-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** The full stacked lockup: column, wordmark, column. */
export function MetalLockup({
  width = 180,
  className = "",
  finish = "metal",
}: {
  width?: number;
  className?: string;
  finish?: "metal" | "espresso" | "linen";
}) {
  const background =
    finish === "metal"
      ? "var(--metal-rose-wide)"
      : finish === "linen"
        ? "var(--color-linen)"
        : "var(--color-espresso)";

  return (
    <span
      role="img"
      aria-label="Park Place Dental"
      className={className}
      style={{
        display: "block",
        width,
        height: width * (1065 / 803),
        background,
        WebkitMaskImage: "url(/images/logo-lockup.png)",
        maskImage: "url(/images/logo-lockup.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/**
 * Horizontal lockup for the header: the column beside the wordmark.
 *
 * The wordmark is the practice's own lettering, masked from their logo art,
 * rather than a typeface chosen to resemble it. No substitute matches a real
 * wordmark, and this one is already on disk.
 */
export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Park Place Dental"
      className={`flex items-center gap-3 ${className}`}
    >
      <MetalMark size={54} />
      <span
        aria-hidden="true"
        style={{
          display: "block",
          width: 132,
          height: 132 * (295 / 782),
          background: "var(--color-espresso)",
          WebkitMaskImage: "url(/images/logo-wordmark.png)",
          maskImage: "url(/images/logo-wordmark.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
        }}
      />
    </span>
  );
}
