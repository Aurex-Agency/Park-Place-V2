"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Puts every new page at the top.
 *
 * The router restores scroll on its own, but this site sets
 * scroll-behavior: smooth on the root, which turns that restore into an
 * animation that can be interrupted mid flight or land part way down. Jumping
 * explicitly, with smooth behaviour suppressed for the duration, means a new
 * page always starts at the beginning.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // A hash link is a request to go somewhere specific. Leave it alone.
    if (window.location.hash) return;

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}
