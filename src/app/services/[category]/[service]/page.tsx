import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceCategories, findService } from "@/content/services";
import { canonical } from "@/lib/site";
import { seoFor } from "@/content/seo";
import { serviceFaqs } from "@/content/service-faqs";
import { serviceDepth } from "@/content/service-depth";
import { serviceGraph } from "@/lib/schema";
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
      images: ["/opengraph-image.jpg"],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: ["/opengraph-image.jpg"],
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
          faqs,
        })}
      />

      <PageHeader
        eyebrow={cat.title}
        headline={item.title}
        lead={item.lead}
        image={item.image}
        imageAlt={item.imageAlt}
        note={item.note}
        crumbs={crumbs}
        callFirst={item.urgent}
      />

      <div className="section">
        <div className="shell">
          {/* The page's own copy, then the depth added for the pages that have
              to compete on more than a description. */}
          <Blocks blocks={[...item.blocks, ...(serviceDepth[item.slug] ?? [])]} />

          <div className="mt-16">
            {/* On an urgent page the heading should not imply the
                conversation can wait for a callback. */}
            <InlineCta
              callFirst={item.urgent}
              heading={
                item.urgent
                  ? "In pain now? Call the office."
                  : `Ready to talk about ${item.title.toLowerCase()}?`
              }
              body={
                item.urgent
                  ? "The phone reaches us straight away, and we hold room in every day's schedule for urgent problems. The form is here too, but it waits for a callback."
                  : "Book online in under a minute, or call the office and we will find you a time."
              }
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

      <CtaBand
        heading={item.closing.heading}
        body={item.closing.body}
        callFirst={item.urgent}
      />
    </>
  );
}
