"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  frame,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { serviceCategories } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EASE, SNAP } from "@/lib/motion";

/** Spring for the preview panel. Loose enough to trail the pointer visibly. */
const FOLLOW = { stiffness: 260, damping: 32, mass: 0.7, restDelta: 0.001 };

/** Panel geometry, kept here so the clamping and the markup cannot drift. */
const PANEL_W = 168;
const PANEL_H = 212;
const PANEL_OFFSET_X = 28;
const PANEL_OFFSET_Y = 14;
/** The title column is 18rem of a 78rem shell. Clearing 42% clears it at any width. */
const TITLE_COLUMN_FRACTION = 0.42;

export function ServiceIndex() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const reduced = useReducedMotion();

  // Raw pointer position, then a spring so the panel trails rather than snaps.
  // The position is the panel's top left corner, offset up and to the right of
  // the pointer, so the panel never sits under the cursor and cannot cover the
  // row being pointed at. Both axes are clamped to the section box so it can
  // never hang outside and force the page to scroll sideways.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, FOLLOW);
  const y = useSpring(pointerY, FOLLOW);

  // Tilt the panel by how fast it is being dragged across the list.
  const rotate = useTransform(x, (latest) => {
    const lag = latest - pointerX.get();
    return Math.max(-8, Math.min(8, lag * 0.06));
  });

  // A pointer-following preview only makes sense with a real pointer. Touch
  // devices skip it entirely rather than showing a panel that cannot follow.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canHover || reduced) return;
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (event: PointerEvent) => {
      frame.read(() => {
        const rect = el.getBoundingClientRect();
        const clamp = (v: number, lo: number, hi: number) =>
          Math.max(lo, Math.min(hi, v));

        // The row title occupies the left column. Holding the panel to the
        // right of that column means it can never cover the words being
        // pointed at, whatever part of the row the pointer is over.
        const titleColumnEnd = rect.width * TITLE_COLUMN_FRACTION;

        pointerX.set(
          clamp(
            Math.max(
              event.clientX - rect.left + PANEL_OFFSET_X,
              titleColumnEnd,
            ),
            0,
            Math.max(0, rect.width - PANEL_W),
          ),
        );
        pointerY.set(
          clamp(
            event.clientY - rect.top - PANEL_H - PANEL_OFFSET_Y,
            0,
            Math.max(0, rect.height - PANEL_H),
          ),
        );
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [canHover, reduced, pointerX, pointerY]);

  // The panel is mounted as soon as we know there is a real pointer, rather
  // than on first hover, so the six preview images are already fetched by the
  // time one is needed. They are 176px wide, so the cost is negligible, and a
  // touch device never mounts them at all.
  const canPreview = canHover && !reduced;
  const isShowing = active !== null;

  return (
    <section className="section">
      <div ref={sectionRef} className="shell relative">
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

        {/* The preview panel. Decorative, so it is hidden from assistive tech. */}
        {canPreview && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              style={{ x, y, rotate }}
              initial={false}
              animate={{
                opacity: isShowing ? 1 : 0,
                scale: isShowing ? 1 : 0.82,
              }}
              transition={{ duration: isShowing ? 0.44 : 0.24, ease: SNAP }}
            >
              <div>
                <div
                  className="relative overflow-hidden rounded-[1.1rem] bg-linen-deep shadow-[var(--shadow-lg)] ring-1 ring-white/40"
                  style={{ width: PANEL_W, height: PANEL_H }}
                >
                  {serviceCategories.map((cat, i) => (
                    <motion.div
                      key={cat.slug}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: active === i ? 1 : 0,
                        scale: active === i ? 1 : 1.08,
                      }}
                      transition={{ duration: 0.5, ease: SNAP }}
                    >
                      <Image
                        src={cat.image}
                        alt=""
                        fill
                        sizes="168px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
        )}

        <RevealGroup as="ul" gap={0.07} className="relative mt-16 border-t border-sand">
          {serviceCategories.map((cat, i) => {
            const isActive = active === i;
            return (
              <RevealItem as="li" preset="riseSmall" key={cat.slug}>
                <Link
                  href={cat.slug}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive((cur) => (cur === i ? null : cur))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                  className="group relative isolate grid items-start gap-4 overflow-hidden border-b border-sand py-8 md:grid-cols-[minmax(0,18rem)_1fr_auto] md:gap-10 md:px-6"
                >
                  {/* Rose wash wipes in from the left rather than simply appearing. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 origin-left bg-rose-wash"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  />

                  {/* A rose rule rides along the bottom edge on the same sweep. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-rose"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: isActive ? 0.05 : 0 }}
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
                    className="mt-1 hidden h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-1 ring-sand md:flex"
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? "#96543f" : "rgba(0,0,0,0)",
                      color: isActive ? "#ffffff" : "#75604f",
                      scale: isActive ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.45, ease: SNAP }}
                  >
                    {/* The arrow leaves and a second one arrives, so it reads as travel. */}
                    <motion.span
                      className="flex"
                      initial={false}
                      animate={{ x: isActive ? 26 : 0 }}
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
    </section>
  );
}
