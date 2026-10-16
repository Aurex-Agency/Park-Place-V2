import type { Metadata } from "next";
import { campaigns, phoneFor } from "@/content/campaigns";
import { practice } from "@/lib/content";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CallButton } from "@/components/campaign/CallButton";

const campaign = campaigns.emergency;
const phone = phoneFor(campaign.slug);

export const metadata: Metadata = {
  title: campaign.title,
  description: campaign.description,
  // Paid destination. /services/general-dentistry/emergency-dentistry is the
  // page that should hold the organic search.
  robots: { index: false, follow: true },
};

/* Deliberately bare. Someone holding their jaw at nine at night is scanning
   for the thing that matches their problem, then pressing call. */
const WE_TREAT = [
  "Severe toothaches",
  "Broken or chipped teeth",
  "Knocked-out teeth",
  "Lost crowns or fillings",
  "Swelling or abscess",
  "Dental trauma",
] as const;

const REASSURANCE = [
  "Walk-ins and same-day appointments when availability allows",
  "Insurance filed for you",
  "43 years of caring for Booneville families",
] as const;

/**
 * The emergency page.
 *
 * This page exists to make the telephone ring and does nothing else. There is
 * no form, no FAQ and no long copy, because a person in pain decides in about
 * ten seconds and every additional element sits between them and the call.
 * The number is above the fold on every screen size, which is the one rule
 * that cannot be traded away here.
 */
export default function Page() {
  return (
    <CampaignShell slug={campaign.slug}>
      <section className="bg-linen pt-10 pb-14 md:pt-14 md:pb-16">
        <div className="shell-narrow text-center">
          <h1 className="t-display">
            Same-Day Emergency Dental Appointments in Booneville
          </h1>
          <p className="t-lead mx-auto mt-6 max-w-[32rem]">
            Severe toothache? Broken tooth? Swelling? Call now. We keep time
            open for urgent visits every day.
          </p>

          <div className="mt-9 flex justify-center">
            <CallButton slug={campaign.slug} placement="hero" size="huge" />
          </div>

          <p className="mx-auto mt-6 max-w-[30rem] text-[0.95rem] leading-relaxed text-taupe">
            Open {practice.hours}. After-hours callers: leave a message and we
            will call you first thing in the morning.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="shell-narrow">
          <h2 className="t-h3">We treat</h2>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {WE_TREAT.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[1.05rem] text-espresso"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-deep"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-linen-deep py-12">
        <div className="shell-narrow">
          <ul className="flex flex-col gap-3">
            {REASSURANCE.map((item) => (
              <li key={item} className="text-[1rem] text-espresso">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="shell-narrow text-center">
          <p className="text-[1.05rem] text-espresso">
            Do not wait. Dental problems get worse and more expensive by the
            day.
          </p>
          <div className="mt-7 flex justify-center">
            <CallButton slug={campaign.slug} placement="footer" size="huge" />
          </div>
          <p className="mt-6 text-[0.9rem] text-taupe">
            {practice.address.full}
          </p>
          <p className="sr-only">Our telephone number is {phone.display}.</p>
        </div>
      </section>
    </CampaignShell>
  );
}
