import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata, seoFor } from "@/content/seo";
import { postsByDate } from "@/content/posts";
import { practice, doctor } from "@/lib/content";
import { pageGraph } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PATH = "/patient-resources/blog";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "Dental Health Articles",
  description:
    "Plain-English answers to the dental questions we hear most, written by Dr. Ken Goodwin.",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Patient Resources", href: "/patient-resources" },
  { label: "Articles" },
];

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Page() {
  const meta = seoFor(PATH, { title: "", description: "" });
  const [lead, ...rest] = postsByDate;

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
        eyebrow="Patient Resources"
        headline="Straight answers / to real questions"
        lead={[
          `Articles written and reviewed by ${doctor.name}, who has practised dentistry in Booneville since 1982. No filler, no ten-tips lists: these are the questions patients actually ask us, answered properly.`,
          "If yours is not here, call the office and ask. We would rather talk it through than have you guess.",
        ]}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          {/* The most recent article is given the room it deserves rather than
              being one card among several. */}
          <Reveal>
            <Link
              href={`/patient-resources/blog/${lead.slug}`}
              className="group grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="t-eyebrow text-rose-deep">
                  Latest · {lead.topic}
                </p>
                <h2 className="t-h2 mt-4 text-balance transition-colors duration-[450ms] group-hover:text-rose-deep">
                  {lead.title}
                </h2>
                <p className="mt-5 text-taupe">{lead.summary}</p>
                <p className="mt-5 text-[0.875rem] text-taupe">
                  <time dateTime={lead.published}>
                    {formatDate(lead.published)}
                  </time>
                  {" · "}
                  {lead.readingMinutes} min read
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-rose-deep">
                  Read the article
                  <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                    <ArrowRight className="absolute translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                    <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <RevealGroup
            as="ul"
            gap={0.07}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((post) => (
              <RevealItem as="li" key={post.slug} className="group h-full">
                <Link
                  href={`/patient-resources/blog/${post.slug}`}
                  className="card flex h-full translate-y-0 flex-col transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-lg)]"
                >
                  <p className="t-eyebrow text-rose-deep">{post.topic}</p>
                  <h2 className="t-h3 mt-3 text-[1.1rem] transition-colors duration-[450ms] group-hover:text-rose-deep">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-taupe">
                    {post.summary}
                  </p>
                  <p className="mt-6 text-[0.85rem] text-taupe">
                    {post.readingMinutes} min read
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        heading="A question none of these answered?"
        body={`Call us on ${practice.phone}. ${practice.hours}.`}
      />
    </>
  );
}
