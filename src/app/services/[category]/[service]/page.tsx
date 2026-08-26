import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceCategories, findService } from "@/content/services";
import { canonical } from "@/lib/site";
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
  return {
    title: found.service.title,
    description: found.service.metaDescription,
    alternates: {
      canonical: canonical(`/services/${category}/${found.service.slug}`),
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

  return (
    <>
      <PageHeader
        eyebrow={cat.title}
        headline={item.title}
        lead={item.lead}
        image={item.image}
        imageAlt={item.imageAlt}
        note={item.note}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: cat.title, href: `/services/${cat.slug}` },
          { label: item.title },
        ]}
      />

      <div className="section">
        <div className="shell">
          <Blocks blocks={item.blocks} />

          <div className="mt-16">
            <InlineCta
              heading={`Ready to talk about ${item.title.toLowerCase()}?`}
              body="Book online in under a minute, or call the office and we will find you a time."
            />
          </div>
        </div>
      </div>

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
