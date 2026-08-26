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
  children,
}: {
  hideOn: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (hideOn.includes(pathname)) return null;
  return <>{children}</>;
}
