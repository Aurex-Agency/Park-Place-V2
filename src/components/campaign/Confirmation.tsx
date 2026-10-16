"use client";

import { useSearchParams } from "next/navigation";
import { practice } from "@/lib/content";
import { phoneFor } from "@/content/campaigns";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CallButton } from "@/components/campaign/CallButton";

/**
 * What a visitor sees after sending a landing page form.
 *
 * A confirmation page rather than an inline message, for two reasons. It is
 * the only place to set the expectation that matters, which is when somebody
 * will ring, and a page load is something Google Ads can count, which an
 * inline state change is not.
 */
export function Confirmation() {
  const params = useSearchParams();
  const slug = params.get("from") ?? "";
  const phone = phoneFor(slug);

  return (
    <CampaignShell slug={slug}>
      <section className="section">
        <div className="shell-narrow">
          <div className="rounded-[var(--radius-card)] border border-rose-soft bg-rose-wash p-8 text-center md:p-12">
            <span
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-deep"
            >
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10.5l4 4 8-9"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h1 className="t-h1 mt-7">Thank you, we have your request</h1>

            <p className="mt-5 text-[1.1rem] leading-relaxed text-espresso">
              We will call you within one business hour to schedule.
            </p>
            <p className="mt-4 text-taupe">
              We answer during office hours, {practice.hours}. If you sent this
              in the evening or over a weekend, you will hear from us first
              thing on the next working day.
            </p>

            <div className="mt-9">
              <p className="text-[0.95rem] font-medium text-espresso">
                Would rather not wait?
              </p>
              <div className="mt-4 flex justify-center">
                <CallButton slug={slug} placement="confirmation" />
              </div>
            </div>

            <p className="mt-8 text-[0.875rem] text-taupe">
              {practice.address.full}
              <br />
              <a
                href={phone.href}
                data-call-placement="confirmation-text"
                className="tap-inline font-medium text-rose-deep underline underline-offset-4"
              >
                {phone.display}
              </a>
            </p>
          </div>
        </div>
      </section>
    </CampaignShell>
  );
}
