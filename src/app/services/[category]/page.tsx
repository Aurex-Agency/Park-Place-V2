import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceCategories, findCategory } from "@/content/services";
import { canonical } from "@/lib/site";
import { PageHeader } from "@/components/page/PageHeader";
import { CtaBand } from "@/components/page/CtaBand";
import { RelatedServices } from "@/components/page/RelatedServices";
import { InlineCta } from "@/components/page/InlineCta";

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
  return {
    title: found.title,
    description: found.metaDescription,
    alternates: { canonical: canonical(`/services/${found.slug}`) },
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

  return (
    <>
      <PageHeader
        eyebrow={found.eyebrow}
        headline={found.title.replace(" ", " / ")}
        lead={[...found.lead]}
        image={found.image}
        imageAlt={found.imageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: found.title },
        ]}
      />

      <RelatedServices
        eyebrow={`Our ${found.title} Services`}
        items={found.children.map((child) => ({
          title: child.title,
          href: `/services/${found.slug}/${child.slug}`,
          lead: child.lead,
        }))}
      />

      <div className="shell pb-20 pt-20">
        <InlineCta
          heading={`Questions about ${found.title.toLowerCase()}?`}
          body="Our team is glad to talk it through before you commit to anything."
        />
      </div>

      <CtaBand heading={found.closing.heading} body={found.closing.body} />
    </>
  );
}
