import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, seoFor } from "@/content/seo";
import {
  locations,
  alsoServing,
  locationsHub,
  distanceBands,
  type Location,
} from "@/content/locations";
import { practice } from "@/lib/content";
import { pageGraph } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PATH = "/locations";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "Serving North Mississippi",
  description:
    "The towns Park Place Dental sees patients from, and roughly what the drive looks like from each.",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Where We Serve" }];

/**
 * Towns bucketed by how far they are, because "how far is it" is the only
 * question a visitor arrives at this page with. `locations` is already sorted
 * by distance, so each band is a slice rather than a sort.
 */
function group(): { label: string; note: string; places: Location[] }[] {
  let from = 0;
  return distanceBands
    .map((band) => {
      const places = locations.filter(
        (l) => l.miles > from - 1 && l.miles <= band.max,
      );
      from = band.max + 1;
      return { label: band.label, note: band.note, places };
    })
    .filter((band) => band.places.length > 0);
}

export default function Page() {
  const meta = seoFor(PATH, { title: "", description: "" });
  const bands = group();

  return (
    <>
      <JsonLd
        graph={pageGraph({
          path: PATH,
          name: meta.title,
          description: meta.description,
          crumbs,
        })}
      />

      <PageHeader
        eyebrow={locationsHub.eyebrow}
        headline={locationsHub.headline}
        lead={locationsHub.lead}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          {bands.map((band, bandIndex) => (
            <div key={band.label} className={bandIndex > 0 ? "mt-20" : ""}>
              <Reveal>
                <Eyebrow as="h2">{band.label}</Eyebrow>
              </Reveal>
              <Reveal>
                <p className="mt-3 max-w-xl text-[0.975rem] text-taupe">
                  {band.note}
                </p>
              </Reveal>

              <RevealGroup
                as="ul"
                gap={0.07}
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {band.places.map((place) => (
                  <RevealItem as="li" key={place.slug} className="group h-full">
                    <Link
                      href={`/locations/${place.slug}`}
                      className="card flex h-full translate-y-0 flex-col transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-lg)]"
                    >
                      <h3 className="t-h3 transition-colors duration-[450ms] group-hover:text-rose-deep">
                        {place.town}
                      </h3>
                      <p className="mt-2 text-[0.9rem] font-medium text-rose-deep">
                        {place.home
                          ? "Where the practice is"
                          : `${place.miles} miles · ${place.drive}`}
                      </p>
                      <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                        {place.home
                          ? `${place.county}. Directions, parking and what a first visit looks like.`
                          : `${place.county}. The drive is ${place.route}.`}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.925rem] font-medium text-rose-deep">
                        {place.home ? "Find the office" : "What patients come for"}
                        <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                          <ArrowRight className="absolute translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                          <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                        </span>
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}

          <Reveal>
            <p className="mt-20 max-w-2xl text-taupe">
              We also regularly see patients from{" "}
              {alsoServing.slice(0, -1).join(", ")} and {alsoServing.slice(-1)}.
              There is one practice, at {practice.address.full}, and everything
              is made and repaired in that building. If your town is not on this
              page, call{" "}
              <a
                href={practice.phoneHref}
                className="font-medium text-rose-deep underline underline-offset-4"
              >
                {practice.phone}
              </a>{" "}
              and we will tell you honestly whether the drive is worth it.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="However far you are driving, we will try to make it one trip"
        body={`Tell the front desk how far you are coming when you book and we will group what can sensibly be grouped. Call ${practice.phone}.`}
      />
    </>
  );
}
