"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { serviceCategories } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EASE, SNAP } from "@/lib/motion";

/**
 * The service list, with the hovered category surfacing behind it.
 *
 * The photograph is not a card and not a cursor companion. It sits underneath
 * the whole list, at low opacity behind a linen wash, and lifts into view as
 * though the page were being drawn back off it. It is deliberately quiet: it
 * gives the list a sense of place without competing with the words, which are
 * the thing being read.
 *
 * Because it lives behind the copy rather than beside it, the wash above it is
 * load bearing. Every text colour in this section is still measured against
 * the composited result, not against bare linen.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section relative isolate overflow-hidden">
      {/* The revealed photograph, beneath everything. It starts below the
          heading block so the headline always sits on clean linen, and never
          climbs past a whisper of opacity. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[38%] -z-10">
        {serviceCategories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: active === i ? 0.16 : 0,
              scale: active === i ? 1 : 1.04,
            }}
            transition={{
              opacity: { duration: 0.9, ease: EASE },
              scale: { duration: 1.4, ease: EASE },
            }}
          >
            <Image
              src={cat.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* The wash that keeps the list readable and the picture in its place.
            Opaque enough that the copy never fights the photograph, open
            enough that the photograph still reads as a room. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-linen) 0%, rgba(250,246,242,0.55) 18%, rgba(250,246,242,0.45) 50%, rgba(250,246,242,0.6) 82%, var(--color-linen) 100%)",
          }}
        />
      </div>

      <div className="shell relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Comprehensive Care Under One Roof</Eyebrow>
          </Reveal>

          <MaskedHeading
            className="t-h1 mt-6"
            text="A full spectrum of / care, rare for a practice / this close to home"
          />

          <Reveal delay={0.1}>
            <p className="t-lead mt-5">
              From preventive care to advanced procedures like dental implants,
              root canals, and veneers, Park Place Dental is equipped to handle
              all your dental needs.
            </p>
          </Reveal>
        </div>

        {/* Clearing on leave lives on a plain wrapper so RevealGroup keeps its
            narrow prop surface. */}
        <div onPointerLeave={() => setActive(null)}>
        <RevealGroup as="ul" gap={0.07} className="relative mt-16 border-t border-sand">
          {serviceCategories.map((cat, i) => {
            const isActive = active === i;
            return (
              <RevealItem as="li" preset="riseSmall" key={cat.slug}>
                <Link
                  href={cat.slug}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                  className="group relative isolate grid items-start gap-4 overflow-hidden border-b border-sand py-8 md:grid-cols-[minmax(0,21rem)_1fr_auto] md:gap-10 md:px-6"
                >
                  {/* A rose rule rides the bottom edge as the row lights up. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-rose"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />

                  <motion.h3
                    className="t-h3 flex items-baseline gap-3"
                    initial={false}
                    animate={{ x: isActive ? 10 : 0 }}
                    transition={{ duration: 0.5, ease: SNAP }}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="font-[family-name:var(--font-brand)] text-[0.7rem] tracking-[0.16em] text-rose-deep"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.4, ease: SNAP }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <motion.span
                      initial={false}
                      animate={{ color: isActive ? "#96543f" : "#2a1e17" }}
                      transition={{ duration: 0.4, ease: SNAP }}
                    >
                      {cat.title}
                    </motion.span>
                  </motion.h3>

                  <motion.div
                    initial={false}
                    animate={{ x: isActive ? 10 : 0 }}
                    transition={{ duration: 0.5, ease: SNAP, delay: 0.03 }}
                  >
                    <p className="text-[0.95rem] leading-relaxed text-taupe">
                      {cat.blurb}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cat.items.map((item, j) => (
                        <motion.li
                          key={item}
                          className="rounded-full bg-white px-3.5 py-1.5 text-[0.75rem] tracking-[0.02em] text-taupe ring-1 ring-sand/70"
                          initial={false}
                          animate={
                            isActive
                              ? { y: -3, boxShadow: "var(--shadow-sm)" }
                              : { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                          }
                          transition={{
                            duration: 0.42,
                            ease: SNAP,
                            delay: isActive ? j * 0.04 : 0,
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.span
                    aria-hidden="true"
                    className="relative mt-1 hidden h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-1 ring-sand md:flex"
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? "#96543f" : "rgba(0,0,0,0)",
                      color: isActive ? "#ffffff" : "#75604f",
                    }}
                    transition={{ duration: 0.45, ease: SNAP }}
                  >
                    {/* The arrow leaves and a second one arrives, so it reads as travel. */}
                    <motion.span
                      className="absolute flex"
                      initial={false}
                      animate={{ x: isActive ? 26 : 0, opacity: isActive ? 0 : 1 }}
                      transition={{ duration: 0.45, ease: SNAP }}
                    >
                      <ArrowRight />
                    </motion.span>
                    <motion.span
                      className="absolute flex"
                      initial={false}
                      animate={{ x: isActive ? 0 : -26, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: SNAP }}
                    >
                      <ArrowRight />
                    </motion.span>
                  </motion.span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
        </div>
      </div>
    </section>
  );
}
