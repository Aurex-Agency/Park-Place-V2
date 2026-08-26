"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, SNAP } from "@/lib/motion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Questions open one at a time.
 *
 * Each control is a real button with aria-expanded and aria-controls, and the
 * answer keeps its own id, so the relationship is exposed rather than implied
 * by position.
 */
export function FaqList({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <RevealGroup as="ul" gap={0.05} className="border-t border-sand">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <RevealItem as="li" preset="riseSmall" key={item.q}>
            <div className="border-b border-sand">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                >
                  <motion.span
                    className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug"
                    initial={false}
                    animate={{ color: isOpen ? "#96543f" : "#2a1e17" }}
                    transition={{ duration: 0.4, ease: SNAP }}
                  >
                    {item.q}
                  </motion.span>

                  <motion.span
                    aria-hidden="true"
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-sand"
                    initial={false}
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      backgroundColor: isOpen ? "#96543f" : "rgba(0,0,0,0)",
                      color: isOpen ? "#ffffff" : "#75604f",
                    }}
                    transition={{ duration: 0.45, ease: SNAP }}
                  >
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M5 1v8M1 5h8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 pr-12 text-taupe">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
