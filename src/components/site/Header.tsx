"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { nav, practice } from "@/lib/content";
import { BrandLockup } from "@/components/ui/MetalMark";
import { Button } from "@/components/ui/Button";
import { EASE, SNAP } from "@/lib/motion";

export function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // The menu remembers which route it was opened on rather than storing a
  // bare boolean. A change of route therefore closes it by definition, with no
  // effect to keep in sync and nothing to forget. Links close it explicitly as
  // well, which covers tapping through to the page you are already on.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const mobileOpen = openedAt !== null && openedAt === pathname;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Set when the menu is closed by keyboard, so focus is handed back to the
  // button that opened it rather than being dropped on the document.
  const returnFocus = useRef(false);

  const closeMenu = useCallback(() => {
    setOpenedAt(null);
    setOpenSection(null);
  }, []);

  const openMobileMenu = useCallback(() => {
    setOpenedAt(pathname);
    setOpenSection(null);
  }, [pathname]);

  // The bar floats over the hero, then settles into a frosted pill.
  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 24);
  });

  /*
   * While the mobile menu is open it is the whole screen, so the page behind
   * it does not scroll. Without this, flicking a finger over a gap in the menu
   * scrolls the article underneath and the reader loses their place in it for
   * no reason they can see.
   */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /*
   * Everything the keyboard needs from an open dialog: escape closes it, tab
   * stays inside it, and focus starts in it rather than back on the button.
   * Without the first of those the only way out is to find the close control
   * by touch; without the second, tabbing walks invisibly through the page
   * lying underneath.
   */
  useEffect(() => {
    if (!mobileOpen) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        returnFocus.current = true;
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // The toggle sits outside the panel, so it is treated as the step before
      // the first item and the step after the last one.
      if (event.shiftKey && (active === first || active === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    if (mobileOpen || !returnFocus.current) return;
    returnFocus.current = false;
    toggleRef.current?.focus();
  }, [mobileOpen]);

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
            {nav.map((item) => {
              const hasChildren = item.children.length > 0;
              const isOpen = openMenu === item.label;
              const panelId = `nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}
                  /*
                    Focus leaving the group closes it. `focusout` is used rather
                    than `blur` because it is the one that bubbles, so moving
                    between the trigger and the items inside the panel does not
                    read as leaving.
                  */
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setOpenMenu((current) => (current === item.label ? null : current));
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && isOpen) setOpenMenu(null);
                  }}
                >
                  <span className="flex items-center">
                    <Link
                      href={item.href}
                      className="flex items-center rounded-full py-2.5 pl-4 text-[0.975rem] text-espresso/85 transition-colors hover:text-rose-deep"
                      onClick={() => setOpenMenu(null)}
                    >
                      {item.label}
                    </Link>

                    {/*
                      The chevron is a real button, not decoration on a link.

                      These panels used to open on hover and nothing else, so
                      the pages inside them could not be reached from the
                      keyboard at all. Splitting the two jobs is what fixes it:
                      the label still goes to the section's own page, and the
                      chevron beside it opens the list. That also gives the
                      state somewhere honest to live, which is what a screen
                      reader reads out of aria-expanded.
                    */}
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${item.label.toLowerCase()} pages`}
                        /*
                          Hovering the item has already opened the panel by the
                          time a mouse clicks the chevron, so a plain toggle
                          closed the menu under the pointer. A pointer click
                          opens. Enter and Space arrive with a detail of 0 and
                          still toggle, which is what the keyboard needs.
                        */
                        onClick={(event) =>
                          setOpenMenu(
                            event.detail > 0 ? item.label : isOpen ? null : item.label,
                          )
                        }
                        className="flex items-center rounded-full py-2.5 pl-1.5 pr-4 text-espresso/85 transition-colors hover:text-rose-deep"
                      >
                        <motion.svg
                          width="9"
                          height="6"
                          viewBox="0 0 9 6"
                          fill="none"
                          aria-hidden="true"
                          initial={false}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.28, ease: SNAP }}
                        >
                          <path
                            d="M1 1l3.5 3.5L8 1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </button>
                    ) : (
                      <span className="pr-4" />
                    )}
                  </span>

                  <AnimatePresence>
                    {isOpen && hasChildren && (
                      <motion.div
                        id={panelId}
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
                              onClick={() => setOpenMenu(null)}
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
              );
            })}
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
              ref={toggleRef}
              type="button"
              onClick={() => (mobileOpen ? closeMenu() : openMobileMenu())}
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
            ref={panelRef}
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
                        onClick={closeMenu}
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
                                onClick={closeMenu}
                                className="py-2.5 text-[0.975rem] font-medium text-rose-deep"
                              >
                                All {item.label.toLowerCase()}
                              </Link>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={closeMenu}
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
                <Button
                  href="/book-an-appointment"
                  variant="primary"
                  onClick={closeMenu}
                >
                  Book an appointment
                </Button>
                <Button
                  href={practice.phoneHref}
                  variant="outline"
                  onClick={closeMenu}
                >
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
