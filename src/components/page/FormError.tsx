"use client";

import { useEffect, useRef } from "react";
import { practice } from "@/lib/content";

/**
 * What a visitor sees when a submission did not go through.
 *
 * This used to be a line of small taupe text at the foot of the form, styled
 * exactly like the note about not sending medical details that sits there the
 * rest of the time. A failure therefore looked identical to the resting state:
 * the button said "Send message" again, one grey line quietly changed, and on
 * a phone that line was often below the fold. Someone whose enquiry had just
 * been refused had every reason to believe it had been sent. A form that loses
 * a patient quietly is worse than one that is visibly broken.
 *
 * So the failure is given the same weight the success is given: a panel, and
 * focus. It takes focus on appearing, which moves a keyboard or screen reader
 * user to the explanation rather than leaving them on a button whose label
 * did not change, and it is announced as an alert.
 *
 * The panel does not replace the form. Everything typed stays on screen and
 * can be sent again, because asking someone to write it out a second time is
 * how the second attempt is lost too.
 *
 * There is no red here. The palette has one accent and the design system says
 * so: emphasis comes from weight and space, not from a colour borrowed for
 * the occasion. That also keeps the meaning off colour alone, which is what
 * WCAG asks for anyway.
 */
export function FormError({ message }: { message: string }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = panel.current;
    if (!node) return;
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={panel}
      role="alert"
      tabIndex={-1}
      className="rounded-[var(--radius-card)] border-2 border-rose-deep bg-blush p-6 md:p-7"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-deep"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 4.5v4.2M8 11.4h.01"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <div>
          <p className="font-semibold text-espresso">
            Your message was not sent
          </p>
          <p className="mt-1.5 text-[0.95rem] text-taupe">{message}</p>
          <p className="mt-3 text-[0.95rem] text-taupe">
            Nothing you typed has been lost. You can try again, or call us on{" "}
            <a
              href={practice.phoneHref}
              className="tap-inline font-semibold text-rose-deep underline underline-offset-4"
            >
              {practice.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
