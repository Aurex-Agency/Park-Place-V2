import type { Metadata } from "next";
import { campaigns } from "@/content/campaigns";
import { photos } from "@/content/photography";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { TrustBar } from "@/components/campaign/TrustBar";
import { FormSection } from "@/components/campaign/FormSection";
import { GoogleReviewsSection } from "@/components/campaign/GoogleReviewsSection";

const campaign = campaigns.implants;

export const metadata: Metadata = {
  title: campaign.title,
  description: campaign.description,
  /*
    Not indexed, on purpose.

    This is a destination for paid traffic. The practice already ranks a real
    service page at /services/restorative-dentistry/dental-implants, and a
    second page aimed at the same search would compete with it rather than add
    to it. Advertising does not need an indexed page, so the organic one keeps
    the search term to itself.
  */
  robots: { index: false, follow: true },
};

/** What the free consultation actually involves. Four steps, no padding. */
const CONSULTATION_STEPS = [
  "A 3D scan of your smile and facial structure with the RAYFace scanner",
  "A look at your options: single implant, implant supported bridge, or dentures",
  "An honest answer on whether you are a candidate, including bone health",
  "A clear cost breakdown, including what insurance may cover",
] as const;

export default function Page() {
  return (
    <CampaignShell slug={campaign.slug}>
      <CampaignHero
        slug={campaign.slug}
        headline="Missing a Tooth? Get a Free 3D Implant Consultation in Booneville"
        subheadline="See your new smile before treatment even starts with RAYFace 3D facial scanning, which very few practices in the region offer."
        secondaryLabel="Book My Free Consultation"
        photo={photos.implantPlanning}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="shell-narrow">
          <h2 className="t-h2">Your Implant Crown Is Made In Our Own Lab</h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-taupe">
            Most dental offices send your implant crown to an outside lab and
            you wait weeks for a temporary. At Park Place Dental, our in-house
            lab designs and crafts your crown on-site, for a faster, more
            precise fit. One office, one team, one visit for much of the
            process.
          </p>
        </div>
      </section>

      <section className="bg-linen py-16 md:py-20">
        <div className="shell-narrow">
          <h2 className="t-h2">What Happens at Your Free Consultation</h2>
          <ol className="mt-9 flex flex-col gap-5">
            {CONSULTATION_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-deep font-[family-name:var(--font-display)] text-[1rem] text-white"
                >
                  {i + 1}
                </span>
                <span className="text-[1.05rem] leading-relaxed text-espresso">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[0.95rem] leading-relaxed text-taupe">
            Dental implants are designed to last for decades with good care.
            What is right for you depends on your own bone health and bite,
            which is exactly what the consultation is for.
          </p>
        </div>
      </section>

      <TrustBar />

      <GoogleReviewsSection page="implants" />

      <FormSection campaign={campaign} />
    </CampaignShell>
  );
}
