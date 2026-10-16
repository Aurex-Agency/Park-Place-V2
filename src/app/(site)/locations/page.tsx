import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, seoFor } from "@/content/seo";
import {
  locations,
  locationsHub,
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
    "Plan a visit to our Booneville dental office from communities across North Mississippi.",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Where We Serve" }];

function group(): { label: string; note: string; places: Location[] }[] {
  return [{ label: "Find your town", note: "Appointments take place at our Booneville office.", places: [...locations].sort((a, b) => Number(Boolean(b.home)) - Number(Boolean(a.home)) || a.town.localeCompare(b.town)) }];
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
                          : "Care at our Booneville office"}
                      </p>
                      <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                        {place.home
                          ? `${place.county}. Office address, map directions and first-visit planning.`
                          : place.visitFocus}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.925rem] font-medium text-rose-deep">
                        {place.home ? "Find the office" : "Plan your visit"}
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


        </div>
      </section>

      <CtaBand
        heading="Confirm your appointment before travelling"
        body={`Tell the team where you are coming from and ask about appointment length and follow-up visits. Call ${practice.phone}.`}
      />
    </>
  );
}
