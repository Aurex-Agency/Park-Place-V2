"use client";

import * as motion from "motion/react-client";
import type { ReactNode } from "react";
import {
  riseIn,
  riseInSmall,
  fadeIn,
  stagger,
  viewportOnce,
  viewportEarly,
} from "@/lib/motion";

type Preset = "rise" | "riseSmall" | "fade";

const presets = { rise: riseIn, riseSmall: riseInSmall, fade: fadeIn };

/** Reveals a block once as it scrolls into view. */
export function Reveal({
  children,
  preset = "rise",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={presets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps a group so its children reveal in sequence. Children must be
 * <RevealItem> or any motion element using the same variant names.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      /* Groups are tall by nature. Requiring a quarter of a ten item list to
         be on screen leaves it blank well after the reader has reached it, so
         groups trigger earlier than single blocks do. */
      viewport={viewportEarly}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  preset = "rise",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];

  return (
    <Tag className={className} variants={presets[preset]}>
      {children}
    </Tag>
  );
}
