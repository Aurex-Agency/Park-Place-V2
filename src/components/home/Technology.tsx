"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { technology } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

/**
 * The three pieces of technology, shown one at a time. Selecting one
 * cross-fades the photograph and slides the copy, so the section reads as a
 * single considered story rather than three stacked cards.
 */
export function Technology() {
  const [active, setActive] = useState(0);
  const current = technology.items[active];

  return (
    <section className="section overflow-hidden bg-espresso text-linen">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
          {/* Copy column */}
          <div>
            <Reveal>
              <Eyebrow>{technology.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="t-h1 mt-6 !text-linen">{technology.headline}</h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-linen/70">
                {technology.intro}
              </p>
            </Reveal>

            {/* Selector */}
            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-col">
                {technology.items.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className="group relative border-t border-linen/15 py-5 text-left last:border-b"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span
                          className={`font-[family-name:var(--font-display)] text-xl transition-colors duration-500 ${
                            isActive ? "text-rose-soft" : "text-linen/70 group-hover:text-linen"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                            isActive
                              ? "rotate-45 border-rose-soft text-rose-soft"
                              : "border-linen/25 text-linen/50"
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M5 1v8M1 5h8"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="pt-4 pr-10 text-[0.925rem] leading-relaxed text-linen/65">
                              {item.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9">
                <TextLink href={technology.cta.href} className="!text-rose-soft">
                  {technology.cta.label}
                </TextLink>
              </div>
            </Reveal>
          </div>

          {/* Image column */}
          <Reveal preset="fade" className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-walnut lg:aspect-[4/4.4]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(42,30,23,0) 55%, rgba(42,30,23,0.7) 100%)",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="font-[family-name:var(--font-brand)] text-[0.7rem] uppercase tracking-[0.24em] text-rose-soft"
                  >
                    {current.name}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
