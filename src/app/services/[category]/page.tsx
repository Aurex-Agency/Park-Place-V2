import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceCategories, findCategory } from "@/content/services";
import { canonical } from "@/lib/site";
import { seoFor } from "@/content/seo";
import { serviceFaqs } from "@/content/service-faqs";
import { serviceGraph } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { FaqSection } from "@/components/site/FaqSection";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { RelatedServices } from "@/components/page/RelatedServices";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = findCategory(category);
  if (!found) return {};
  const path = `/services/${found.slug}`;
  const meta = seoFor(path, {
    title: found.title,
    description: found.metaDescription,
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = findCategory(category);
  if (!found) notFound();

  const path = `/services/${found.slug}`;
  const meta = seoFor(path, {
    title: found.title,
    description: found.metaDescription,
  });
  const faqs = serviceFaqs[found.slug] ?? [];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: found.title },
  ];

  return (
    <>
      <JsonLd
        graph={serviceGraph({
          path,
          name: meta.title,
          description: meta.description,
          crumbs,
          primaryImage: found.image,
          serviceName: found.title,
          serviceType: found.title,
          faqs,
        })}
      />

      <PageHeader
        eyebrow={found.eyebrow}
        headline={found.title.replace(" ", " / ")}
        lead={[...found.lead]}
        image={found.image}
        imageAlt={found.imageAlt}
        crumbs={crumbs}
      />

      <RelatedServices
        eyebrow={`Our ${found.title} Services`}
        items={found.children.map((child) => ({
          title: child.title,
          href: `/services/${found.slug}/${child.slug}`,
          lead: child.lead,
        }))}
      />

      {faqs.length > 0 && (
        <FaqSection
          items={faqs}
          eyebrow={`${found.title} Questions`}
          heading={`Questions about / ${found.title.toLowerCase()}`}
        />
      )}

      <CtaBand heading={found.closing.heading} body={found.closing.body} />
    </>
  );
}
