"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE, lineMask } from "@/lib/motion";

/**
 * A headline whose lines rise out from behind a mask as the section arrives.
 *
 * Lines are authored with " / " between them rather than measured from the
 * wrap, so the break points are a typographic decision. Those decisions only
 * hold while there is room for them, so below the medium breakpoint the
 * authored breaks are dropped and the whole heading animates as one block that
 * wraps naturally. Otherwise a narrow screen produces an authored break and an
 * automatic break in the same headline, which rags badly.
 *
 * The trigger watches the heading, not the moving spans. Each span starts
 * translated a full line below its own overflow-hidden mask, so it is clipped
 * out of rendering entirely. An IntersectionObserver on the span would never
 * report it visible, whileInView would never fire, and the line would stay
 * hidden forever. Observing the unclipped parent avoids that deadlock.
 *
 * Reduced motion is enforced in CSS, not here. useReducedMotion returns the
 * server value on the hydration render and does not schedule a re-render, so a
 * structural branch on it can stay on the animated path and leave every
 * heading translated out of sight. The stylesheet pins these spans back to
 * their resting position, which nothing can defeat.
 */
function Line({
  text,
  index,
  delay,
  inView,
}: {
  text: string;
  index: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="block overflow-hidden py-[0.06em] [&:not(:first-child)]:-mt-[0.12em]"
    >
      <motion.span
        data-line-mask=""
        className="block"
        variants={lineMask}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.95, ease: EASE, delay: delay + index * 0.085 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

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
      {/* Narrow: one block, wrapping wherever it needs to. */}
      <span className="md:hidden">
        <Line text={plain} index={0} delay={delay} inView={inView} />
      </span>

      {/* Wide enough for the authored breaks to hold. */}
      <span className="hidden md:block">
        {lines.map((line, i) => (
          <Line
            key={line + i}
            text={line + (i < lines.length - 1 ? " " : "")}
            index={i}
            delay={delay}
            inView={inView}
          />
        ))}
      </span>
    </Tag>
  );
}
