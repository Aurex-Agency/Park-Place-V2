import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { testimonials } from "@/lib/content";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description:
    "What patients in Booneville and the surrounding communities say about Park Place Dental.",
  alternates: { canonical: canonical("/patient-resources/reviews-testimonials") },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Resources"
        headline="Hearing from real patients / makes all the difference"
        lead={[
          "Choosing a dentist is a big decision, and hearing from real patients can make all the difference. At Park Place Dental, we are proud to serve patients in Booneville and surrounding communities with care that is comfortable, honest, and high-quality.",
          "Our patients value the time we take to listen, explain their options, and deliver results that feel both natural and long-lasting.",
        ]}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Patient Resources", href: "/patient-resources" },
          { label: "Reviews & Testimonials" },
        ]}
      />

      <div className="section">
        <div className="shell">
          <RevealGroup
            as="ul"
            gap={0.08}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((item) => (
              <RevealItem as="li" key={item.name} className="h-full">
                <figure className="m-0 flex h-full flex-col rounded-[1.25rem] bg-white p-8 shadow-[var(--shadow-sm)] ring-1 ring-sand/60">
                  <blockquote className="flex-1">
                    <p className="text-[1.0125rem] leading-relaxed text-taupe">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-7">
                    <span className="block font-[family-name:var(--font-display)] text-lg leading-tight text-espresso">
                      {item.name}
                    </span>
                    <span className="mt-1.5 block font-[family-name:var(--font-brand)] text-[0.8rem] uppercase tracking-[0.2em] text-rose-deep">
                      {item.role}
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <CtaBand
        heading="Ready to experience the difference?"
        body="If you are looking for a dental team in Booneville you can trust, we would love to welcome you. Contact Park Place Dental or request an appointment online today."
      />
    </>
  );
}
