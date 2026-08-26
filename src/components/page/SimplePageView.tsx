import type { SimplePage } from "@/content/pages";
import type { Crumb } from "@/components/page/PageHeader";
import { PageHeader } from "@/components/page/PageHeader";
import { Blocks } from "@/components/page/Blocks";
import { CtaBand } from "@/components/page/CtaBand";

/** Renders any page that is a header, a stack of blocks and a closing band. */
export function SimplePageView({
  page,
  crumbs,
  children,
}: {
  page: SimplePage;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <>
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
