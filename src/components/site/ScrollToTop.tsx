"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Puts every new page at the top.
 *
 * The router restores scroll on its own, but this site sets
 * scroll-behavior: smooth on the root, which turns that restore into an
 * animation that can be interrupted mid flight or land part way down. Jumping
 * explicitly, with smooth behaviour suppressed for the duration, means a new
 * page always starts at the beginning.
 *
 * Going back is the exception. Someone twelve treatments down the services
 * list who opens one and returns expects to find their place, not the top of
 * the page and a scroll to do again, and a visitor made to do that twice
 * stops opening things. So a backward or forward step through history is left
 * to the browser, which knows where they were; only a fresh navigation is
 * pinned to the top. The smooth scrolling that made restoration unreliable is
 * still suppressed either way.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const poppedHistory = useRef(false);

  useEffect(() => {
    function onPopState() {
      poppedHistory.current = true;
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // popstate fires before the route change reaches this effect, so the flag
    // is already set by the time the pathname it describes arrives.
    if (poppedHistory.current) {
      poppedHistory.current = false;
      return;
    }

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
