"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts a figure up when it scrolls into view.
 *
 * Only runs when the value is a plain number. "VA" and anything else is
 * printed as is, so the component can be used across a mixed set of figures
 * without the caller special casing them.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const numeric = /^\d+$/.test(value);
  const target = numeric ? Number(value) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || !numeric) return;

    if (reduced || !inView) {
      if (reduced) el.textContent = value;
      return;
    }

    // Years read better counting from a near value than from zero.
    const from = target > 1900 ? target - 40 : 0;
    const controls = animate(from, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, numeric, reduced, target, value, duration]);

  if (!numeric) {
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    // Tabular figures keep every digit the same width, so a number counting
    // up cannot nudge the layout around it.
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {/* Static value first so it is correct before hydration and in search results. */}
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  );
}
