"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honours the reader's reduced motion setting across every animation on the
 * site, not just the handful that ask about it themselves.
 *
 * The reduced motion rule in globals.css can only reach CSS animations and
 * transitions. Everything built on Motion is driven from JavaScript, so that
 * rule never touched it, and Motion's own default is `reducedMotion: "never"`.
 * The result was a site whose accessibility statement promised that animation
 * stops while ninety odd elements on the homepage alone still slid and faded
 * into place. Three components asked `useReducedMotion` individually; the
 * twenty seven files using `Reveal` did not.
 *
 * `reducedMotion="user"` reads the operating system setting and, for anyone
 * who has asked for less movement, holds transform and layout animations at
 * their destination value while still allowing opacity to animate. That last
 * part matters more than it sounds: content that starts at `opacity: 0` and is
 * revealed on scroll still becomes visible. Nothing is hidden by switching
 * motion off, which is the failure this whole file exists to avoid.
 *
 * Children are passed through as a prop, so the tree below stays server
 * rendered. Only the context provider itself runs on the client.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
