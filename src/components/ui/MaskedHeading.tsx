"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE, lineMask } from "@/lib/motion";

/**
 * A headline whose lines rise out from behind a mask as the section arrives.
 *
 * The trigger watches the heading itself, not the moving spans. Each span
 * starts translated a full line below its own overflow-hidden mask, so it is
 * clipped out of rendering entirely. An IntersectionObserver on the span would
 * therefore never report it as visible, whileInView would never fire, and the
 * line would stay hidden forever. Observing the unclipped parent avoids that
 * deadlock.
 *
 * The text is split on an explicit separator rather than by measuring wrapped
 * lines, so the break points are a typographic decision rather than whatever
 * the viewport happens to produce. Pass the copy with " / " between lines.
 *
 * The whole string is exposed through aria-label and the visible spans are
 * hidden, so a screen reader hears one clean sentence instead of fragments.
 *
 * Reduced motion is enforced in CSS, not here. useReducedMotion returns the
 * server value on the hydration render and does not schedule a re-render, so a
 * structural branch on it can stay on the animated path forever and leave every
 * heading translated out of sight. The stylesheet pins these spans back to
 * their resting position, which nothing can defeat. The branch below is kept
 * because it produces cleaner markup whenever it does resolve in time.
 */
export function MaskedHeading({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const lines = text.split(" / ");
  const plain = lines.join(" ");

  if (reduced) {
    return <Tag className={className}>{plain}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} aria-label={plain}>
      {lines.map((line, i) => (
        <span
          key={line + i}
          aria-hidden="true"
          className="block overflow-hidden py-[0.06em] [&:not(:first-child)]:-mt-[0.12em]"
        >
          <motion.span
            data-line-mask=""
            className="block"
            variants={lineMask}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              duration: 0.95,
              ease: EASE,
              delay: delay + i * 0.085,
            }}
          >
            {/* Trailing space collapses visually in a block, but keeps the
                heading's textContent a properly spaced sentence for anything
                reading the DOM rather than the accessible name. */}
            {line}
            {i < lines.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
