"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MetalMark } from "@/components/ui/MetalMark";
import { EASE } from "@/lib/motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = testimonials[index];

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-linen-deep">
      <div className="shell">
        <Reveal>
          <Eyebrow align="center">Testimonial</Eyebrow>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl text-center">
          {/* Quote mark, set in metal */}
          <span aria-hidden="true" className="flex justify-center">
            <MetalMark size={54} />
          </span>

          <div className="relative mt-2 min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-espresso sm:text-2xl">
                  {current.quote}
                </p>
                <footer className="mt-7">
                  <cite className="font-[family-name:var(--font-brand)] text-[0.72rem] uppercase not-italic tracking-[0.24em] text-rose-deep">
                    {current.name}
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-espresso shadow-[var(--shadow-sm)] transition-all duration-500 hover:shadow-[var(--shadow-md)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M13 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-1">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                  aria-current={i === index}
                  className="group flex h-6 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-7 bg-rose-deep"
                        : "w-1.5 bg-sand-deep group-hover:bg-taupe-light"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-espresso shadow-[var(--shadow-sm)] transition-all duration-500 hover:shadow-[var(--shadow-md)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
