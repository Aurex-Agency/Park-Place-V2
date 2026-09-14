import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceCategories, findService } from "@/content/services";
import { canonical } from "@/lib/site";
import { seoFor } from "@/content/seo";
import { serviceFaqs } from "@/content/service-faqs";
import { serviceDepth } from "@/content/service-depth";
import { serviceGraph, faqNode } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { FaqSection } from "@/components/site/FaqSection";
import { PageHeader } from "@/components/page/PageHeader";
import { Blocks } from "@/components/page/Blocks";
import { CtaBand } from "@/components/page/CtaBand";
import { RelatedServices } from "@/components/page/RelatedServices";
import { InlineCta } from "@/components/page/InlineCta";

export function generateStaticParams() {
  return serviceCategories.flatMap((c) =>
    c.children.map((s) => ({ category: c.slug, service: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}): Promise<Metadata> {
  const { category, service } = await params;
  const found = findService(category, service);
  if (!found) return {};
  const path = `/services/${category}/${found.service.slug}`;
  const meta = seoFor(path, {
    title: found.service.title,
    description: found.service.metaDescription,
  });
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      images: ["/opengraph-image.png"],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { category, service } = await params;
  const found = findService(category, service);
  if (!found) notFound();

  const { category: cat, service: item } = found;
  if (!cat) notFound();

  const siblings = cat.children.filter((c) => c.slug !== item.slug);

  const path = `/services/${cat.slug}/${item.slug}`;
  const meta = seoFor(path, {
    title: item.title,
    description: item.metaDescription,
  });
  const faqs = serviceFaqs[item.slug] ?? [];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: cat.title, href: `/services/${cat.slug}` },
    { label: item.title },
  ];

  return (
    <>
      <JsonLd
        graph={serviceGraph({
          path,
          name: meta.title,
          description: meta.description,
          crumbs,
          primaryImage: item.image,
          serviceName: item.title,
          serviceType: `${cat.title}: ${item.title}`,
        })}
      />
      {faqs.length > 0 && (
        <JsonLd
          graph={JSON.stringify({
            "@context": "https://schema.org",
            ...faqNode(faqs, path),
          }).replace(/</g, "\\u003c")}
        />
      )}

      <PageHeader
        eyebrow={cat.title}
        headline={item.title}
        lead={item.lead}
        image={item.image}
        imageAlt={item.imageAlt}
        note={item.note}
        crumbs={crumbs}
      />

      <div className="section">
        <div className="shell">
          {/* The page's own copy, then the depth added for the pages that have
              to compete on more than a description. */}
          <Blocks blocks={[...item.blocks, ...(serviceDepth[item.slug] ?? [])]} />

          <div className="mt-16">
            <InlineCta
              heading={`Ready to talk about ${item.title.toLowerCase()}?`}
              body="Book online in under a minute, or call the office and we will find you a time."
            />
          </div>
        </div>
      </div>

      {faqs.length > 0 && (
        <FaqSection
          items={faqs}
          eyebrow={`${item.title} Questions`}
          heading={`Questions about / ${item.title.toLowerCase()}`}
        />
      )}

      <RelatedServices
        eyebrow={`More ${cat.title}`}
        items={siblings.map((s) => ({
          title: s.title,
          href: `/services/${cat.slug}/${s.slug}`,
          lead: s.lead,
        }))}
      />

      <CtaBand heading={item.closing.heading} body={item.closing.body} />
    </>
  );
}
