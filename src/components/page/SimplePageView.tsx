import type { SimplePage } from "@/content/pages";
import type { Crumb } from "@/components/page/PageHeader";
import { PageHeader } from "@/components/page/PageHeader";
import { Blocks } from "@/components/page/Blocks";
import { CtaBand } from "@/components/page/CtaBand";
import { InlineCta } from "@/components/page/InlineCta";

/** Renders any page that is a header, a stack of blocks and a closing band. */
export function SimplePageView({
  page,
  crumbs,
  children,
  inlineCta,
}: {
  page: SimplePage;
  crumbs: Crumb[];
  children?: React.ReactNode;
  inlineCta?: { heading: string; body?: string };
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

            <div className="mt-16">
              <InlineCta
                heading={inlineCta?.heading ?? "Ready when you are"}
                body={
                  inlineCta?.body ??
                  "Book online in under a minute, or call the office and we will find you a time."
                }
              />
            </div>
          </div>
        </div>
      )}

      {children}

      <CtaBand heading={page.closing.heading} body={page.closing.body} />
    </>
  );
}
