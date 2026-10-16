import type { Metadata } from "next";
import Image from "next/image";
import { campaigns } from "@/content/campaigns";
import { photos } from "@/content/photography";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { TrustBar } from "@/components/campaign/TrustBar";
import { FormSection } from "@/components/campaign/FormSection";
import { GoogleReviewsSection } from "@/components/campaign/GoogleReviewsSection";

const campaign = campaigns["smile-makeover"];

export const metadata: Metadata = {
  title: campaign.title,
  description: campaign.description,
  // Paid destination. /services/cosmetic-dentistry holds the organic search.
  robots: { index: false, follow: true },
};

/*
 * The practice's only two before and after cases.
 *
 * Both originals carry a PIC COLLAGE watermark across the lower photograph,
 * which is not something to put in front of someone deciding whether to spend
 * four figures on their smile. These are trimmed copies with the badge cropped
 * away; the originals are untouched beside them. Each caption names the
 * treatment the practice's own service pages attribute to that case, so
 * nothing here claims a procedure that was not performed.
 */
const GALLERY = [
  {
    src: "/images/smile-before-after-1-clean.jpg",
    alt: "Before and after a professional whitening case at Park Place Dental",
    caption: "Professional whitening",
  },
  {
    src: "/images/smile-before-after-2-clean.jpg",
    alt: "Before and after a smile makeover at Park Place Dental",
    caption: "Full smile makeover",
  },
] as const;

const MENU = [
  {
    title: "Porcelain Veneers",
    text: "Correct chips, stains, gaps and misalignment.",
  },
  {
    title: "Professional Whitening",
    text: "Dramatically brighter in one visit.",
  },
  {
    title: "Full Smile Makeover",
    text: "A complete plan combining treatments, designed in 3D.",
  },
] as const;

export default function Page() {
  return (
    <CampaignShell slug={campaign.slug}>
      <CampaignHero
        slug={campaign.slug}
        headline="Free Smile Makeover Consultation in Booneville"
        subheadline="See your new smile in 3D before treatment begins. Veneers, whitening and full smile makeovers, designed with RAYFace facial scanning."
        secondaryLabel="Book My Free Consultation"
        photo={photos.appreciatedFrame}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          <h2 className="t-h2 text-center">Real Patients, Real Results</h2>
          <div className="mx-auto mt-11 grid max-w-4xl gap-8 sm:grid-cols-2">
            {GALLERY.map((item) => (
              <figure key={item.src}>
                <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1439}
                    height={1673}
                    loading="lazy"
                    sizes="(min-width: 640px) 44vw, 100vw"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-4 text-center text-[0.9rem] text-taupe">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 md:py-20">
        <div className="shell">
          <h2 className="t-h2 text-center">What Is Possible</h2>
          <div className="mt-11 grid gap-7 md:grid-cols-3">
            {MENU.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-sm)]"
              >
                <h3 className="t-h3">{item.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-taupe">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="t-h2">Preview Your New Smile Before We Start</h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-taupe">
              Our RAYFace scanner captures a detailed 3D view of your face and
              smile, so we design results that look natural and balanced, and
              you see the plan before any treatment begins. It is like
              test-driving your new smile.
            </p>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]">
            <Image
              src={photos.restorationDesign.src}
              alt={photos.restorationDesign.alt}
              width={photos.restorationDesign.width}
              height={photos.restorationDesign.height}
              loading="lazy"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      <GoogleReviewsSection page="smile-makeover" tone="deep" />
      <TrustBar />
      <FormSection campaign={campaign} />
    </CampaignShell>
  );
}
