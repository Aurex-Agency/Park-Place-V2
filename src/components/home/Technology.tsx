"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { technology } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EASE, SNAP } from "@/lib/motion";

/**
 * The three pieces of technology, shown one at a time.
 *
 * Selection is what drives the copy, so it stays keyboard and screen reader
 * friendly. Hover only previews the photograph, which is decorative, so
 * pointing at a row shows it without committing and leaving puts the selected
 * one back.
 */
export function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const shown = hovered ?? selected;
  const current = technology.items[shown];

  // The panel drifts against the page for a little depth.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={sectionRef} className="section overflow-hidden bg-espresso text-linen">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
          {/* Copy column */}
          <div>
            <Reveal>
              <Eyebrow tone="dark">{technology.eyebrow}</Eyebrow>
            </Reveal>

            <MaskedHeading
              className="t-h1 mt-6 !text-linen"
              text="Modern Dental / Technology for a / Better Experience"
            />

            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-linen/70">
                {technology.intro}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10" onPointerLeave={() => setHovered(null)}>
                {technology.items.map((item, i) => {
                  const isSelected = i === selected;
                  const isLit = i === shown;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelected(i)}
                      onPointerEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      aria-expanded={isSelected}
                      className="group relative isolate w-full overflow-hidden border-t border-linen/15 py-5 text-left last:border-b"
                    >
                      {/* A warm wash sweeps in from the left under the row. */}
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 origin-left bg-linen/[0.06]"
                        initial={false}
                        animate={{ scaleX: isLit ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      />
                      {/* A rose gold rule rides the top edge on the same sweep. */}
                      <motion.span
                        aria-hidden="true"
                        className="metal-rule absolute inset-x-0 top-0 origin-left"
                        initial={false}
                        animate={{ scaleX: isLit ? 1 : 0 }}
                        transition={{ duration: 0.65, ease: EASE, delay: isLit ? 0.04 : 0 }}
                      />

                      <span className="flex items-center gap-4 px-2">
                        {/* Only the label group slides. The control stays put, so
                            it can never be pushed into the clipped edge. */}
                        <motion.span
                          className="flex min-w-0 flex-1 items-center gap-4"
                          initial={false}
                          animate={{ x: isLit ? 10 : 0 }}
                          transition={{ duration: 0.45, ease: SNAP }}
                        >
                          <motion.span
                            aria-hidden="true"
                            className="font-[family-name:var(--font-brand)] text-[0.78rem] tracking-[0.16em]"
                            initial={false}
                            animate={{
                              color: isLit ? "#f0d5c9" : "rgba(250,246,242,0.62)",
                            }}
                            transition={{ duration: 0.4, ease: SNAP }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </motion.span>

                          <motion.span
                            className="font-[family-name:var(--font-display)] text-xl"
                            initial={false}
                            animate={{ color: isLit ? "#f0d5c9" : "rgba(250,246,242,0.72)" }}
                            transition={{ duration: 0.4, ease: SNAP }}
                          >
                            {item.name}
                          </motion.span>
                        </motion.span>

                        <motion.span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                          initial={false}
                          animate={{
                            rotate: isSelected ? 45 : 0,
                            borderColor: isLit
                              ? "rgba(240,213,201,0.9)"
                              : "rgba(250,246,242,0.25)",
                            color: isLit ? "#f0d5c9" : "rgba(250,246,242,0.5)",
                          }}
                          transition={{ duration: 0.45, ease: SNAP }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M5 1v8M1 5h8"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </motion.span>
                      </span>

                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="px-2 pt-4 pr-12 text-[1rem] leading-relaxed text-linen/65">
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
                <TextLink href={technology.cta.href} className="!text-rose-mist">
                  {technology.cta.label}
                </TextLink>
              </div>
            </Reveal>
          </div>

          {/* Image column */}
          <Reveal preset="fade" className="relative">
            <motion.div
              style={{ y: panelY }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-walnut lg:aspect-[4/4.4]"
            >
              {/* Each photograph wipes in behind a clip rather than cross-fading,
                  so switching rows reads as a deliberate change of slide. */}
              {technology.items.map((item, i) => (
                <motion.div
                  key={item.image}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    clipPath:
                      i === shown
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(0% 0% 100% 0%)",
                    scale: i === shown ? 1 : 1.12,
                  }}
                  transition={{ duration: 0.8, ease: EASE }}
                  style={{ zIndex: i === shown ? 2 : 1 }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}

              <div
                aria-hidden="true"
                className="absolute inset-0 z-[3]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(42,30,23,0) 55%, rgba(42,30,23,0.72) 100%)",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 z-[4] p-7">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.42, ease: SNAP }}
                    className="font-[family-name:var(--font-brand)] text-[0.78rem] uppercase tracking-[0.24em] text-rose-mist"
                  >
                    {current.name}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
