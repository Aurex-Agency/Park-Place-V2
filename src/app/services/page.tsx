import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { serviceCategories } from "@/content/services";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { ArrowRight } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "General, restorative, cosmetic and periodontal dentistry plus facial aesthetics, all under one roof in Booneville, Mississippi.",
  alternates: { canonical: canonical("/services") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comprehensive Care Under One Roof"
        headline="Everything we do, / all in one place"
        lead={[
          "We believe that dental care should go beyond just cleanings and check-ups. That is why we offer a wide range of services all under one roof.",
          "From preventive care to advanced procedures like dental implants, root canals, and veneers, Park Place Dental is equipped to handle all your dental needs.",
        ]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section">
        <div className="shell">
          <RevealGroup as="ul" gap={0.08} className="grid gap-8 md:grid-cols-2">
            {serviceCategories.map((cat) => (
              <RevealItem as="li" key={cat.slug} className="h-full">
                <Link
                  href={`/services/${cat.slug}`}
                  className="card group flex h-full translate-y-0 flex-col overflow-hidden !p-0 transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-linen-deep">
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className="scale-100 object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.08]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-espresso/25 transition-opacity duration-[600ms] group-hover:opacity-0"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h2 className="t-h3 transition-colors duration-[450ms] group-hover:text-rose-deep">
                      {cat.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                      {cat.lead[0]}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {cat.children.map((child) => (
                        <li
                          key={child.slug}
                          className="rounded-full bg-linen px-3.5 py-1.5 text-[0.82rem] text-taupe ring-1 ring-sand/70"
                        >
                          {child.title}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-7 inline-flex items-center gap-2 text-[0.925rem] font-medium text-rose-deep">
                      Explore {cat.title.toLowerCase()}
                      <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                        <ArrowRight className="absolute translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                        <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                      </span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        heading="Not sure where to start?"
        body="Contact us today to learn more about our services and how we can help you achieve the smile you have always wanted."
      />
    </>
  );
}
