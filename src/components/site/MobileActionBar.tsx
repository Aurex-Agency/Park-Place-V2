"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { practice } from "@/lib/content";

/**
 * Call and book, pinned to the bottom of every page on small screens.
 *
 * Sits above the iOS home indicator through safe-area-inset-bottom, and the
 * body carries matching padding so the bar never covers the end of the page.
 *
 * It hides on the booking page, where the whole screen is already the booking
 * form and a floating button pointing at it would be noise.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/book-an-appointment") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-linen/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch gap-2.5 px-4 py-3">
        <a
          href={practice.phoneHref}
          className="btn btn-outline flex-1 whitespace-nowrap !bg-white !px-4 !text-[0.875rem]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M14.5 11.3v2a1.3 1.3 0 0 1-1.5 1.3 13 13 0 0 1-5.6-2 12.8 12.8 0 0 1-4-4 13 13 0 0 1-2-5.7A1.3 1.3 0 0 1 2.7 1.5h2a1.3 1.3 0 0 1 1.3 1.2c.1.6.2 1.3.5 1.9a1.3 1.3 0 0 1-.3 1.4l-.9.8a10.7 10.7 0 0 0 4 4l.9-.9a1.3 1.3 0 0 1 1.4-.3c.6.3 1.2.4 1.8.5a1.3 1.3 0 0 1 1.2 1.3Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Call
        </a>

        <Link
          href="/book-an-appointment"
          className="btn btn-primary flex-[1.6] whitespace-nowrap !px-4 !text-[0.875rem]"
        >
          Request an appointment
        </Link>
      </div>
    </div>
  );
}
