import type { Variants, Transition } from "motion/react";

/**
 * Motion language for Park Place Dental.
 *
 * The reference site moves like an editorial magazine: things settle into
 * place rather than bounce. Everything here uses one long ease-out curve so
 * the whole site shares a single sense of weight.
 */

/**
 * Two curves, two jobs.
 *
 * EASE is a long ease out for entrances. Things arrive and settle.
 * SNAP is ease out quart, the curve the reference site uses for every hover
 * and micro-interaction. It is quicker off the mark and lands sooner, which is
 * what makes a hover feel responsive rather than sleepy.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const SNAP = [0.165, 0.84, 0.44, 1] as const;

export const settle: Transition = {
  duration: 0.7,
  ease: EASE,
};

export const snap: Transition = {
  duration: 0.42,
  ease: SNAP,
};

/** Standard section entrance. Content lifts a short distance and fades up. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: settle },
};

/** Same, but shorter travel. For dense lists and small elements. */
export const riseInSmall: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Cards arrive with a slight lift and settle. Used for grids. */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE } },
};

/** Parent that walks its children in one after another. */
export const stagger = (gap = 0.09, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

/**
 * Headline reveal. Each line sits inside an overflow-hidden mask and slides
 * up from beneath it, which reads as typesetting rather than a fade.
 */
export const lineMask: Variants = {
  hidden: { y: "112%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

/** A rule or underline that draws itself in from the left. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Images ease down from a slight over-scale so they feel like they land. */
export const imageSettle: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE },
  },
};

/** Shared viewport config. Animate once, trigger a little before centre. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportEarly = { once: true, amount: 0.15 } as const;
