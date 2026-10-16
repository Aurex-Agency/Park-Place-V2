import { PatientGuides } from "@/components/page/PatientGuides";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, findLocation } from "@/content/locations";
import { practice } from "@/lib/content";
import { canonical } from "@/lib/site";
import { locationGraph } from "@/lib/schema";
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
      images: ["/opengraph-image.jpg"],
    },
    twitter: {
      title: place.title,
      description: place.metaDescription,
      images: ["/opengraph-image.jpg"],
    },
  };
}


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

  /* Booneville is where the practice is, so every phrase built around travel
     has to be rewritten rather than reused. */
  const headline =
    place.headline ?? `Dental care for / ${place.town} patients`;
  const driveLabel = "Plan your visit";
  const directionsHeading = place.home
    ? "Getting to the office"
    : `Directions from ${place.town}`;

  return (
    <>
      <JsonLd
        graph={locationGraph({
          path,
          name: place.title,
          description: place.metaDescription,
          crumbs,
          town: place.town,
          county: place.county,
          zip: place.zip,
          nearby: place.nearby,
          faqs: place.faqs,
        })}
      />

      <PageHeader
        eyebrow={place.home ? "Our Booneville Office" : `Serving ${place.county}`}
        headline={headline}
        lead={place.lead}
        crumbs={crumbs}
        image="/images/exterior-sign.jpg"
        imageAlt={`The Park Place Dental sign at ${practice.address.street} in Booneville, Mississippi`}
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Reveal>
              <div className="card">
                <Eyebrow>{driveLabel}</Eyebrow>
                <p className="t-h3 mt-4">Our Booneville office</p>
                <p className="mt-2 text-taupe">
                  Check the route from your starting address before travelling.
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
                <p className="mt-5">
                  <a
                    href={place.directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-inline text-[0.925rem] font-medium text-rose-deep underline underline-offset-4"
                  >
                    Get directions in Google Maps
                  </a>
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow as="h2">
                  {place.home
                    ? "What being the local practice means"
                    : `Planning care from ${place.town}`}
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
            <Reveal>
              <Eyebrow as="h2">{directionsHeading}</Eyebrow>
            </Reveal>
            <RevealGroup
              as="ol"
              gap={0.06}
              className="mt-8 flex flex-col gap-5"
            >
              {place.directions.map((step, i) => (
                <RevealItem as="li" key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-wash text-[0.85rem] font-medium text-rose-deep ring-1 ring-sand"
                  >
                    {i + 1}
                  </span>
                  <p className="text-[0.975rem] leading-relaxed text-taupe">
                    {step}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>


          <div className="mt-16">
            <Reveal>
              <Eyebrow as="h2">
                {place.home
                  ? "Explore care in Booneville"
                  : `Care to discuss when visiting from ${place.town}`}
              </Eyebrow>
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
              heading={
                place.home
                  ? "Booking is a phone call or a form, whichever suits."
                  : `Driving from ${place.town}? Tell us when you book.`
              }
              body={
                place.home
                  ? "For a dental emergency, call the office to discuss availability. An online request does not confirm an appointment time."
                  : "Tell the team where you are travelling from and ask which appointments can be combined. We will confirm a plan before you set out."
              }
            />
          </div>
        </div>
      </section>

      <PatientGuides servicePaths={place.services.map((service) => service.href)} />

      <FaqSection
        items={place.faqs}
        eyebrow={`${place.town} Questions`}
        heading={`Questions from / ${place.town} patients`}
        showAllLink={false}
      />

      <CtaBand
        heading="Meet our team at the Booneville office"
        body={`Park Place Dental is at ${practice.address.full}. Call ${practice.phone} to discuss appointment availability.`}
      />
    </>
  );
}
