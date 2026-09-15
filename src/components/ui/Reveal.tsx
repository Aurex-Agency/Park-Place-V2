"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Scroll entrances, without Motion.
 *
 * This component is used in thirty three files, which made it the single
 * largest reason Motion shipped on every route. Measured on production, script
 * evaluation was 920ms of main thread on the homepage and the two chunks
 * carrying the animation library took 664ms and 629ms between them. That cost
 * lands inside the window that decides Largest Contentful Paint, on a page
 * whose animations are three fades and a lift.
 *
 * So the same entrances now run as CSS transitions, driven by one
 * IntersectionObserver per revealed block. The API is unchanged: every caller
 * still asks for a preset, a delay and an element, and the movement is the
 * same curve and the same distances as the Motion variants it replaces.
 *
 * The visible state is the default and the hidden state is opt-in, gated on
 * `data-js` which a tiny script in the document head sets. A browser that
 * never runs the script, or runs it and then fails, shows the content rather
 * than a blank page: the previous implementation left everything at opacity
 * zero in that case, which is the failure mode this file is built to avoid.
 */

type Preset = "rise" | "riseSmall" | "fade";

/**
 * Hides the element, then reveals it when enough of it is on screen.
 *
 * `amount` matches the viewport thresholds the Motion version used: a quarter
 * of a single block, but only fifteen percent of a group, because groups are
 * tall by nature and waiting for a quarter of a ten item list leaves it blank
 * well after the reader has arrived at it.
 */
function useReveal<T extends HTMLElement>(amount: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealState = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.revealState = "shown";
          observer.disconnect();
        }
      },
      { threshold: amount },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return ref;
}

/** Reveals a block once as it scrolls into view. */
export function Reveal({
  children,
  preset = "rise",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useReveal<HTMLElement>(0.25);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      data-reveal={preset}
      data-reveal-state="hidden"
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps a group so its children reveal in sequence.
 *
 * The stagger is a per-child transition delay rather than a parent that walks
 * its children, so the group only needs one observer no matter how many items
 * it holds.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const ref = useReveal<HTMLElement>(0.15);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      data-reveal-group=""
      data-reveal-state="hidden"
      style={
        {
          "--reveal-gap": `${gap}s`,
          ...(delay ? { "--reveal-delay": `${delay}s` } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/** A child of `RevealGroup`. Its timing comes from the group. */
export function RevealItem({
  children,
  className,
  preset = "rise",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag className={className} data-reveal={preset}>
      {children}
    </Tag>
  );
}
