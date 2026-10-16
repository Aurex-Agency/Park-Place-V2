import type { Metadata } from "next";
import Image from "next/image";
import { campaigns, phoneFor } from "@/content/campaigns";
import { photos } from "@/content/photography";
import { practice } from "@/lib/content";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CallButton } from "@/components/campaign/CallButton";
import { GoogleReviewsSection } from "@/components/campaign/GoogleReviewsSection";
import { FormSection } from "@/components/campaign/FormSection";

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
 * This page exists to make the telephone ring. The number is above the fold on
 * every screen size, and the call button appears twice before anything else is
 * asked of anyone: that is the rule that cannot be traded away here.
 *
 * The call back form sits last, after both call buttons, and is deliberately
 * not offered as an alternative to ringing. It is for the visitor the button
 * cannot help, reading at nine at night or already having rung with no answer.
 * It does not ask for an email address, because somebody asking to be
 * telephoned should not have to supply one.
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

      {/*
        Photographs begin here rather than in the hero.

        An image above the call button would push it down the screen, and on a
        360 by 640 phone that is the difference between a visitor seeing the
        number and having to scroll for it. Everything below the fold is
        lazy loaded, so none of it competes for bandwidth with the first paint
        on the connection of someone sitting in a car park in pain.
      */}
      <section className="bg-white py-14 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="t-h3">We treat</h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-1">
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

          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]">
            <Image
              src={photos.goodwinWithAssistant.src}
              alt={photos.goodwinWithAssistant.alt}
              width={photos.goodwinWithAssistant.width}
              height={photos.goodwinWithAssistant.height}
              loading="lazy"
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      <section className="bg-linen-deep py-12">
        <div className="shell grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-10">
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full md:h-40 md:w-40">
            <Image
              src={photos.frontDeskPhone.src}
              alt={photos.frontDeskPhone.alt}
              width={photos.frontDeskPhone.width}
              height={photos.frontDeskPhone.height}
              loading="lazy"
              sizes="160px"
              className="h-full w-full object-cover"
            />
          </div>
          <ul className="flex flex-col gap-3">
            {REASSURANCE.map((item) => (
              <li key={item} className="text-[1rem] text-espresso">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The heading describes what the reviews are about, not how quickly anyone
          will be seen. The practice keeps time open; it cannot promise a slot,
          and a heading is not the place to imply one. */}
      <GoogleReviewsSection
        page="emergency"
        heading="What patients say about urgent visits"
      />

      <section className="bg-white py-14 md:py-16">
        <div className="shell-narrow text-center">
          <p className="text-[1.05rem] text-espresso">
            Do not wait. Dental problems get worse and more expensive by the
            day.
          </p>
          <div className="mt-7 flex justify-center">
            <CallButton slug={campaign.slug} placement="closing" size="huge" />
          </div>
          <figure className="mx-auto mt-10 max-w-xl">
            <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]">
              <Image
                src={photos.exteriorBuilding.src}
                alt={photos.exteriorBuilding.alt}
                width={photos.exteriorBuilding.width}
                height={photos.exteriorBuilding.height}
                loading="lazy"
                sizes="(min-width: 768px) 36rem, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            {/* Someone driving over in pain is looking for a building, not a
                postcode. The photograph is the useful half of this. */}
            <figcaption className="mt-4 text-[0.9rem] text-taupe">
              {practice.address.full}
            </figcaption>
          </figure>
          <p className="sr-only">Our telephone number is {phone.display}.</p>
        </div>
      </section>

      <FormSection campaign={campaign} />
    </CampaignShell>
  );
}
