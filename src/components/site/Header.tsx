"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, practice } from "@/lib/content";
import { BrandLockup } from "@/components/ui/MetalMark";
import { Button } from "@/components/ui/Button";
import { EASE, SNAP } from "@/lib/motion";

export function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // The bar floats over the hero, then settles into a frosted pill.
  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 24);
  });

  return (
    <>
      {/* Utility strip. Carries the phone number above everything else. */}
      <div className="hidden bg-walnut text-linen md:block">
        <div className="shell flex h-10 items-center justify-between text-[0.875rem]">
          <p className="tracking-[0.04em] text-linen/80">
            {practice.address.full}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-linen/80">{practice.hours}</p>
            <a
              href={practice.phoneHref}
              className="font-medium text-rose-soft transition-colors hover:text-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </div>

      {/*
        The header keeps a constant height. It used to animate its padding,
        which changed its box in normal flow, so crossing the condense
        threshold shifted every following element up by 16px. Now only paint
        properties change, and the condensed look comes from a transform on
        the brand, which does not touch layout.
      */}
      <header
        className="sticky top-0 z-50 py-4"
        style={{
          backgroundColor: condensed ? "rgba(250, 246, 242, 0.82)" : "rgba(250, 246, 242, 0)",
          backdropFilter: condensed ? "blur(14px) saturate(1.4)" : "none",
          WebkitBackdropFilter: condensed ? "blur(14px) saturate(1.4)" : "none",
          boxShadow: condensed
            ? "0 1px 0 rgba(226, 214, 202, 0.9), 0 12px 30px rgba(74, 55, 41, 0.05)"
            : "none",
          transition:
            "background-color .45s ease, box-shadow .45s ease, backdrop-filter .45s ease",
        }}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Link href="/" aria-label="Park Place Dental home" className="shrink-0">
            <motion.span
              className="block origin-left"
              initial={false}
              animate={{ scale: condensed ? 0.9 : 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <BrandLockup />
            </motion.span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.children.length ? item.label : null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.975rem] text-espresso/85 transition-colors hover:text-rose-deep"
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                      <path
                        d="M1 1l3.5 3.5L8 1"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>

                <AnimatePresence>
                  {openMenu === item.label && item.children.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="absolute left-0 top-full w-64 pt-3"
                    >
                      <div className="overflow-hidden rounded-[1.1rem] bg-white p-2 shadow-[var(--shadow-md)] ring-1 ring-sand/70">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-[0.7rem] px-4 py-2.5 text-[0.95rem] text-espresso/85 transition-colors hover:bg-rose-wash hover:text-rose-deep"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/book-an-appointment"
              variant="primary"
              className="hidden !px-6 !py-3 text-[0.95rem] sm:inline-flex"
            >
              Book an appointment
            </Button>

            <button
              type="button"
              onClick={() => {
                setMobileOpen((v) => !v);
                setOpenSection(null);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[var(--shadow-sm)] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-espresso"
                  animate={mobileOpen ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-espresso"
                  animate={mobileOpen ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-linen pt-28 pb-16 lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col gap-1">
              {nav.map((item, i) => {
                const isOpen = openSection === item.label;
                const hasChildren = item.children.length > 0;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-sand/70"
                  >
                    {/* A section with pages under it opens them. A section
                        without any is just a link. */}
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setOpenSection(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-section-${i}`}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="t-h3">{item.label}</span>
                        <motion.span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-sand"
                          initial={false}
                          animate={{
                            rotate: isOpen ? 45 : 0,
                            backgroundColor: isOpen ? "#96543f" : "rgba(0,0,0,0)",
                            color: isOpen ? "#ffffff" : "#75604f",
                          }}
                          transition={{ duration: 0.4, ease: SNAP }}
                        >
                          <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M5 1v8M1 5h8"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </motion.span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="t-h3 block py-5"
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasChildren && (
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`mobile-section-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pb-4">
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-2.5 text-[0.975rem] font-medium text-rose-deep"
                              >
                                All {item.label.toLowerCase()}
                              </Link>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2.5 text-[0.975rem] text-taupe"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/book-an-appointment" variant="primary">
                  Book an appointment
                </Button>
                <Button href={practice.phoneHref} variant="outline">
                  Call {practice.phone}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
