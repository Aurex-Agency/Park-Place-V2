import type { SimplePage } from "@/content/pages";
import type { Crumb } from "@/components/page/PageHeader";
import { PageHeader } from "@/components/page/PageHeader";
import { Blocks } from "@/components/page/Blocks";
import { CtaBand } from "@/components/page/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { pageGraph } from "@/lib/schema";
import { seoFor } from "@/content/seo";

/**
 * Renders any page that is a header, a stack of blocks and a closing band.
 *
 * It also emits that page's structured data. Putting it here rather than in
 * every route file means a new page is described the moment it exists, with
 * nothing to remember and nothing to copy wrongly.
 */
export function SimplePageView({
  page,
  crumbs,
  path,
  medical = false,
  children,
}: {
  page: SimplePage;
  crumbs: Crumb[];
  /** The route this page is served at, used for canonical @ids. */
  path?: string;
  /** True for pages about a treatment or health topic. */
  medical?: boolean;
  children?: React.ReactNode;
}) {
  const meta = path
    ? seoFor(path, { title: page.title, description: page.metaDescription })
    : null;

  return (
    <>
      {path && meta && (
        <JsonLd
          graph={pageGraph({
            path,
            name: meta.title,
            description: meta.description,
            crumbs,
            medical,
            primaryImage: page.image,
          })}
        />
      )}

      <PageHeader
        eyebrow={page.eyebrow}
        headline={page.headline}
        lead={page.lead}
        image={page.image}
        imageAlt={page.imageAlt}
        crumbs={crumbs}
      />

      {page.blocks.length > 0 && (
        <div className="section">
          <div className="shell">
            <Blocks blocks={page.blocks} />

          </div>
        </div>
      )}

      {children}

      <CtaBand heading={page.closing.heading} body={page.closing.body} />
    </>
  );
}
