"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
  headingLevel: Heading = "h3",
}: {
  items: readonly { q: string; a: string }[];
  /**
   * The level the questions sit at.
   *
   * In the section that appears at the foot of most pages they follow that
   * section's own h2, so h3 is right. On the FAQs page itself the questions
   * are the page's top level content and there is no h2 above them, so the
   * default would skip a level.
   */
  headingLevel?: "h2" | "h3";
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <RevealGroup as="ul" gap={0.05} className="border-t border-sand">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <RevealItem as="li" preset="riseSmall" key={item.q}>
            <div className="border-b border-sand">
              <Heading>
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
              </Heading>

              {/*
                Every answer stays in the document, open or closed.

                This used to mount only the open one, which meant that of five
                answers on a page, four were absent from the served HTML. They
                were present in the structured data and nowhere else, so the
                page read as far thinner than it is to anything that does not
                run the accordion. Animating the height of an element that is
                always there costs nothing and puts the words back.
              */}
              <motion.div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
                /* Taken out of the tab order and the accessibility tree while
                   closed, so a keyboard or screen reader user is not walked
                   through answers to questions they have not opened. */
                inert={!isOpen}
              >
                <p className="max-w-2xl pb-8 pr-12 text-taupe">{item.a}</p>
              </motion.div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
