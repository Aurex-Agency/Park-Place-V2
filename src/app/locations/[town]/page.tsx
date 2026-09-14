import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, findLocation } from "@/content/locations";
import { practice, doctor, testimonials } from "@/lib/content";
import { canonical } from "@/lib/site";
import { pageGraph, faqNode } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { InlineCta } from "@/components/page/InlineCta";
import { FaqSection } from "@/components/site/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return locations.map((l) => ({ town: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  const place = findLocation(town);
  if (!place) return {};
  const path = `/locations/${place.slug}`;
  return {
    title: place.title,
    description: place.metaDescription,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: place.title,
      description: place.metaDescription,
      url: path,
      type: "website",
      images: ["/opengraph-image.png"],
    },
    twitter: {
      title: place.title,
      description: place.metaDescription,
      images: ["/opengraph-image.png"],
    },
  };
}

/**
 * The patient who travels furthest, quoted on the pages about travelling.
 *
 * A real review from a real patient, already published on the site. It earns
 * its place here because it is the most direct evidence that people do drive
 * to this practice, which is the entire proposition of a location page.
 */
const travellingPatient = testimonials.find((t) =>
  t.quote.includes("90 miles"),
);

export default async function LocationPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town } = await params;
  const place = findLocation(town);
  if (!place) notFound();

  const path = `/locations/${place.slug}`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Where We Serve", href: "/locations" },
    { label: place.town },
  ];

  return (
    <>
      <JsonLd
        graph={pageGraph({
          path,
          name: place.title,
          description: place.metaDescription,
          crumbs,
        })}
      />
      <JsonLd
        graph={JSON.stringify({
          "@context": "https://schema.org",
          ...faqNode(place.faqs, path),
        }).replace(/</g, "\\u003c")}
      />

      <PageHeader
        eyebrow={`Serving ${place.county}`}
        headline={`Your dentist, / ${place.miles} miles from ${place.town}`}
        lead={place.lead}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Reveal>
              <div className="card">
                <Eyebrow>The drive</Eyebrow>
                <p className="t-h3 mt-4">{place.drive}</p>
                <p className="mt-2 text-taupe">
                  Roughly {place.miles} miles, {place.route}.
                </p>
                <hr className="my-6 border-sand" />
                <p className="text-[0.9rem] uppercase tracking-[0.09em] text-taupe">
                  The practice
                </p>
                <p className="mt-2 text-taupe">{practice.address.full}</p>
                <p className="mt-2">
                  <a
                    href={practice.phoneHref}
                    className="tap-inline font-medium text-rose-deep underline underline-offset-4"
                  >
                    {practice.phone}
                  </a>
                </p>
                <p className="mt-2 text-taupe">{practice.hours}</p>
                <p className="text-[0.9rem] text-taupe">{practice.hoursNote}</p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow as="h2">
                  What {place.town} patients come to us for
                </Eyebrow>
              </Reveal>
              <RevealGroup as="ul" gap={0.07} className="mt-8 flex flex-col gap-6">
                {place.comeFor.map((item) => (
                  <RevealItem as="li" key={item.term}>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug text-espresso">
                      {item.term}
                    </h3>
                    <p className="mt-2 text-[0.975rem] leading-relaxed text-taupe">
                      {item.text}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            {place.context.map((paragraph, i) => (
              <Reveal key={i}>
                <p className="text-taupe">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {travellingPatient && (
            <Reveal>
              <figure className="mt-12 max-w-2xl border-l-2 border-rose-deep pl-6">
                <blockquote className="font-[family-name:var(--font-display)] text-[1.15rem] leading-relaxed text-espresso">
                  {travellingPatient.quote}
                </blockquote>
                <figcaption className="mt-3 text-[0.9rem] text-taupe">
                  {travellingPatient.name}, {travellingPatient.role}
                </figcaption>
              </figure>
            </Reveal>
          )}

          <div className="mt-16">
            <Reveal>
              <Eyebrow as="h2">Most asked for from {place.town}</Eyebrow>
            </Reveal>
            <RevealGroup
              as="ul"
              gap={0.06}
              className="mt-6 flex flex-wrap gap-3"
            >
              {place.services.map((service) => (
                <RevealItem as="li" key={service.href}>
                  <Link
                    href={service.href}
                    className="btn btn-outline !px-5 !py-2.5 !text-[0.9rem]"
                  >
                    {service.label}
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="mt-16">
            <InlineCta
              heading={`Driving from ${place.town}? Tell us when you book.`}
              body="We will group what can sensibly be grouped so you are making one trip rather than three."
            />
          </div>
        </div>
      </section>

      <FaqSection
        items={place.faqs}
        eyebrow={`${place.town} Questions`}
        heading={`Questions from / ${place.town} patients`}
        showAllLink={false}
      />

      <CtaBand
        heading={`${doctor.shortName} has been caring for this region since 1982`}
        body={`Park Place Dental is at ${practice.address.full}. Call ${practice.phone} and we will find you a time.`}
      />
    </>
  );
}
