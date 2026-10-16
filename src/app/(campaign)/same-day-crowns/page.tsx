import type { Metadata } from "next";
import Image from "next/image";
import { campaigns } from "@/content/campaigns";
import { photos } from "@/content/photography";
import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { TrustBar } from "@/components/campaign/TrustBar";
import { FormSection } from "@/components/campaign/FormSection";

const campaign = campaigns["same-day-crowns"];

export const metadata: Metadata = {
  title: campaign.title,
  description: campaign.description,
  // Paid destination. The organic search belongs to
  // /services/restorative-dentistry/crowns-bridges.
  robots: { index: false, follow: true },
};

/* The process is what sells this page, so each step gets a photograph of the
   actual machine rather than an icon standing in for one. */
const STEPS = [
  {
    title: "Scan",
    text: "We capture a precise 3D image of your tooth. No goopy impressions.",
    photo: photos.cbctImaging,
  },
  {
    title: "Design",
    text: "Your crown is designed on-screen and matched to your natural teeth.",
    photo: photos.restorationDesign,
  },
  {
    title: "Mill",
    text: "Our in-house lab mills your crown from quality ceramic while you wait.",
    photo: photos.millingChamber,
  },
  {
    title: "Place",
    text: "Your permanent crown is fitted and placed, often the same day.",
    photo: photos.operatoryWindow,
  },
] as const;

const WHY = [
  {
    title: "No temporary crown",
    text: "The awkward two-week plastic tooth does not exist here.",
  },
  {
    title: "One appointment",
    text: "One numbing, one visit, done.",
  },
  {
    title: "Precision fit",
    text: "Designed from a 3D scan of your actual tooth, not a mold.",
  },
] as const;

export default function Page() {
  return (
    <CampaignShell slug={campaign.slug}>
      <CampaignHero
        slug={campaign.slug}
        headline="A Crown in One Visit, Not Three Weeks"
        subheadline="Our in-house dental lab designs, mills and places your crown in a single appointment. No temporary, no second visit, no waiting."
        secondaryLabel="Book My Appointment"
        photo={photos.inlabMill}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          <h2 className="t-h2 text-center">How It Works</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <div className="relative overflow-hidden rounded-[1rem]">
                  <Image
                    src={step.photo.src}
                    alt={step.photo.alt}
                    width={step.photo.width}
                    height={step.photo.height}
                    loading="lazy"
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mt-5 flex items-baseline gap-2.5">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-[0.95rem] text-rose-deep"
                  >
                    {i + 1}
                  </span>
                  <span className="t-h3">{step.title}</span>
                </p>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-taupe">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-linen py-16 md:py-20">
        <div className="shell">
          <h2 className="t-h2 text-center">Why Patients Care</h2>
          <div className="mt-11 grid gap-7 md:grid-cols-3">
            {WHY.map((item) => (
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

      <TrustBar />
      <FormSection campaign={campaign} />
    </CampaignShell>
  );
}
