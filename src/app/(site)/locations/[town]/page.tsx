import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, findLocation } from "@/content/locations";
import { practice, doctor, testimonials } from "@/lib/content";
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

/**
 * The patient who travels furthest, quoted on the pages about travelling.
 *
 * A real review from a real patient, already published on the site. It earns
 * its place here because it is the most direct evidence that people do drive
 * to this practice, which is the entire proposition of a location page. It is
 * held back from the Booneville page, where "people drive a long way to get
 * here" is not the argument being made.
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

  /* Booneville is where the practice is, so every phrase built around travel
     has to be rewritten rather than reused. */
  const headline =
    place.headline ?? `Your dentist, / ${place.miles} miles from ${place.town}`;
  const driveLabel = place.home ? "Finding us" : "The drive";
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

      {/*
        These pages carried no photograph at all, which for a set of fourteen
        town pages is the visual signature of exactly the templated lead-gen
        content they were written to be the opposite of. The building itself is
        the right picture: it is the thing a reader is deciding whether to
        drive to, and the alt text names their town rather than repeating one
        generic caption fourteen times.
      */}
      <PageHeader
        eyebrow={place.home ? "Our Booneville Office" : `Serving ${place.county}`}
        headline={headline}
        lead={place.lead}
        crumbs={crumbs}
        image="/images/exterior-sign.jpg"
        imageAlt={
          place.home
            ? `The Park Place Dental sign outside the practice at ${practice.address.street} in Booneville, Mississippi`
            : `The Park Place Dental sign outside the Booneville practice, about ${place.miles} miles from ${place.town}, Mississippi`
        }
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Reveal>
              <div className="card">
                <Eyebrow>{driveLabel}</Eyebrow>
                <p className="t-h3 mt-4">{place.drive}</p>
                <p className="mt-2 text-taupe">
                  {place.home
                    ? place.route
                    : `Roughly ${place.miles} miles, ${place.route}.`}
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
                    href={practice.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-inline text-[0.925rem] font-medium text-rose-deep underline underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow as="h2">
                  {place.home
                    ? "What being the local practice means"
                    : `What ${place.town} patients come to us for`}
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

          {/*
            Directions are the section that most earns this page its place: the
            one part a patient may genuinely re-open in the car, and the one
            part that cannot be produced by swapping a town name.
          */}
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

          <div className="mt-16 max-w-2xl">
            {place.context.map((paragraph, i) => (
              <Reveal key={i}>
                <p className="mt-4 text-taupe first:mt-0">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {!place.home && travellingPatient && (
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
              <Eyebrow as="h2">
                {place.home
                  ? "Most asked for in Booneville"
                  : `Most asked for from ${place.town}`}
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

          {place.nearby.length > 0 && (
            <Reveal>
              <p className="mt-12 max-w-2xl text-[0.975rem] leading-relaxed text-taupe">
                Patients also come to us from{" "}
                {place.nearby.slice(0, -1).join(", ")} and{" "}
                {place.nearby.slice(-1)}, all within a few minutes of{" "}
                {place.town}. If your community is not named here, the drive is
                almost certainly still shorter than you think:{" "}
                <Link
                  href="/locations"
                  className="font-medium text-rose-deep underline underline-offset-4"
                >
                  see the whole region we serve
                </Link>
                .
              </p>
            </Reveal>
          )}

          <div className="mt-16">
            <InlineCta
              heading={
                place.home
                  ? "Booking is a phone call or a form, whichever suits."
                  : `Driving from ${place.town}? Tell us when you book.`
              }
              body={
                place.home
                  ? "We keep room in the schedule every day for urgent problems, so call the office if something has broken rather than waiting on a form."
                  : "We will group what can sensibly be grouped so you are making one trip rather than three."
              }
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
