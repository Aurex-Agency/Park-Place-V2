"use client";

import { useEffect, useRef } from "react";
import { practice } from "@/lib/content";
import { Button } from "@/components/ui/Button";

/**
 * What replaces a form once it has been sent.
 *
 * A single line of text under a submit button is easy to miss, particularly on
 * a phone where it can sit below the fold. Taking the form away and putting a
 * panel in its place makes the outcome impossible to misread.
 *
 * The panel takes focus when it appears. A tall form collapsing into a short
 * panel leaves the page scrolled past the answer, and a keyboard or screen
 * reader user is otherwise left wherever the submit button used to be.
 */
export function FormSuccess({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = panel.current;
    if (!node) return;
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      ref={panel}
      role="status"
      tabIndex={-1}
      className="rounded-[var(--radius-card)] border border-rose-soft bg-rose-wash p-8 md:p-10"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-deep"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10.5l4 4 8-9"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="t-h3 mt-6">{heading}</h3>
      <p className="mt-3 text-taupe">{body}</p>
      <p className="mt-3 text-[0.9rem] text-taupe">
        We have emailed you a copy for your records. If it is not there in a few
        minutes, please check your spam folder.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button href={practice.phoneHref} variant="primary">
          Call {practice.phone}
        </Button>
        <Button href="/" variant="outline">
          Back to the homepage
        </Button>
      </div>
    </div>
  );
}
