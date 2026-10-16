import type { Metadata } from "next";
import { campaigns } from "@/content/campaigns";
import { photos } from "@/content/photography";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { TrustBar } from "@/components/campaign/TrustBar";
import { FormSection } from "@/components/campaign/FormSection";
import { GoogleReviewsSection } from "@/components/campaign/GoogleReviewsSection";

const campaign = campaigns["new-patient-offer"];

export const metadata: Metadata = {
  title: campaign.title,
  description: campaign.description,
  // Paid destination. The practice's own new patient section holds the
  // organic search for these terms.
  robots: { index: false, follow: true },
};

/*
 * The offer is a free consultation, not a discounted price.
 *
 * A price here would be a promise the front desk has to honour at the counter,
 * and nothing goes live that they have not agreed to. If a discounted exam
 * package is signed off later, this headline and the first visit list are the
 * only two places that need to change.
 */
const FIRST_VISIT = [
  "Comprehensive exam with the doctor, not just a hygienist pass-through",
  "Full x-rays and oral health screening",
  "A clear, honest treatment plan with costs explained before anything happens",
] as const;

const WHY_FAMILIES = [
  "43+ years caring for Booneville, with some patients since the 1980s",
  "Trusted VA provider for our veteran community",
  "In-house lab means less waiting and fewer return trips",
  "Two doctors on staff, so appointments stay on schedule",
] as const;

export default function Page() {
  return (
    <CampaignShell slug={campaign.slug}>
      <CampaignHero
        slug={campaign.slug}
        headline="New Patients in Booneville: Free Consultation with Comprehensive Exam"
        subheadline="43 years of trusted family dental care, same-day crowns from our in-house lab, and a team that treats you like family. Most insurance accepted and filed for you."
        secondaryLabel="Book My First Visit"
        photo={photos.hygienistCleaning}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="shell-narrow">
          <h2 className="t-h2">What Your First Visit Includes</h2>
          <ul className="mt-8 flex flex-col gap-4">
            {FIRST_VISIT.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-deep"
                />
                <span className="text-[1.05rem] leading-relaxed text-espresso">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-linen py-16 md:py-20">
        <div className="shell">
          <h2 className="t-h2 text-center">Why Families Choose Park Place</h2>
          <ul className="mt-11 grid gap-6 sm:grid-cols-2">
            {WHY_FAMILIES.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-card)] bg-white p-6 text-[1rem] leading-relaxed text-espresso shadow-[var(--shadow-sm)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="shell-narrow">
          <h2 className="t-h2">Insurance? We File It For You.</h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-taupe">
            We accept and file most major insurance plans, and our team handles
            the paperwork. No insurance? Ask us about payment options when you
            call.
          </p>
        </div>
      </section>

      <TrustBar />

      <GoogleReviewsSection page="new-patient-offer" />

      <FormSection campaign={campaign} />
    </CampaignShell>
  );
}
