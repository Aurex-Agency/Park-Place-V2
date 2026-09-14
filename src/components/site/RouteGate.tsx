"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides a site-wide section on the routes that already own that content.
 *
 * The FAQ block and the location block live in the layout so no page can be
 * built without them. The FAQs page and the contact page already carry those
 * sections in full, so they opt out here rather than showing them twice.
 */
export function RouteGate({
  hideOn,
  hidePrefixes = [],
  children,
}: {
  hideOn: string[];
  /**
   * Whole sections that carry their own version of this block.
   *
   * Every service, location and article page now has questions specific to
   * what it is about, which is worth far more than the same six questions
   * repeated underneath it. Listing prefixes rather than routes means a new
   * service page opts out by existing, with nothing to remember.
   */
  hidePrefixes?: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (hideOn.includes(pathname)) return null;
  if (hidePrefixes.some((prefix) => pathname.startsWith(prefix))) return null;
  return <>{children}</>;
}
