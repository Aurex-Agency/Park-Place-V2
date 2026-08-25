import type { Variants, Transition } from "motion/react";

/**
 * Motion language for Park Place Dental.
 *
 * The reference site moves like an editorial magazine: things settle into
 * place rather than bounce. Everything here uses one long ease-out curve so
 * the whole site shares a single sense of weight.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const settle: Transition = {
  duration: 0.85,
  ease: EASE,
};

/** Standard section entrance. Content lifts a short distance and fades up. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: settle },
};

/** Same, but shorter travel. For dense lists and small elements. */
export const riseInSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE } },
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
