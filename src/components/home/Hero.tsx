"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero, practice } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { EASE, lineMask } from "@/lib/motion";

/** Splits a headline so each line can be masked and revealed separately. */
const HEADLINE_LINES = ["Transform Your Smile", "with Expert Care"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // The photograph drifts slower than the page, which gives the section depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-espresso"
    >
      {/* Photograph */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Warm scrim. Brown rather than black, so the light stays golden. */}
      {/* Vertical scrim. Weighted to the bottom, where the copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,30,23,0.45) 0%, rgba(42,30,23,0.18) 30%, rgba(42,30,23,0.60) 68%, rgba(42,30,23,0.90) 100%)",
        }}
      />

      {/* A second scrim from the left, only where the layout is wide enough
          for the copy to sit beside the photograph rather than beneath it.
          Stacking both on a phone crushes the image to a flat brown. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(42,30,23,0.52) 0%, rgba(42,30,23,0.22) 45%, rgba(42,30,23,0) 74%)",
        }}
      />

      <motion.div
        className="shell relative z-10 w-full pb-24 pt-40 md:pb-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            className="t-eyebrow flex items-center gap-3 !text-rose-soft"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="metal-rule animate-glint block h-px w-10 shrink-0"
            />
            {hero.eyebrow}
          </motion.p>

          {/* Headline, revealed line by line from behind a mask */}
          <h1 className="t-display mt-6 !text-linen [&>span]:-my-[0.045em]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.09em]">
                <motion.span
                  className="block"
                  variants={lineMask}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.65 + i * 0.12, duration: 1.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-linen/85 md:text-[1.15rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={practice.phoneHref} variant="ghost">
              Call {practice.phone}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:right-10 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="font-[family-name:var(--font-brand)] text-[0.62rem] uppercase tracking-[0.3em] text-linen/60">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-linen/25">
          <motion.span
            className="absolute inset-x-0 block h-4 bg-rose-soft"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
