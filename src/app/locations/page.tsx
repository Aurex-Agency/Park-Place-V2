import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, seoFor } from "@/content/seo";
import { locations, alsoServing, locationsHub } from "@/content/locations";
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

export default function Page() {
  const meta = seoFor(PATH, { title: "", description: "" });

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
          <Reveal>
            <Eyebrow as="h2">Drive times to the practice</Eyebrow>
          </Reveal>

          <RevealGroup
            as="ul"
            gap={0.07}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {locations.map((place) => (
              <RevealItem as="li" key={place.slug} className="h-full">
                <Link
                  href={`/locations/${place.slug}`}
                  className="card group flex h-full translate-y-0 flex-col transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                >
                  <h3 className="t-h3 transition-colors duration-[450ms] group-hover:text-rose-deep">
                    {place.town}
                  </h3>
                  <p className="mt-2 text-[0.9rem] font-medium text-rose-deep">
                    {place.miles} miles · {place.drive}
                  </p>
                  <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                    {place.county}. The drive is {place.route}.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.925rem] font-medium text-rose-deep">
                    What patients come for
                    <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                      <ArrowRight className="absolute translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                      <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="mt-12 max-w-2xl text-taupe">
              We also regularly see patients from{" "}
              {alsoServing.slice(0, -1).join(", ")} and {alsoServing.slice(-1)}.
              There is one practice, at {practice.address.full}, and everything
              is made and repaired in that building.
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
