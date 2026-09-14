import { faqs } from "@/content/pages";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/page/FaqList";

/**
 * Questions, shown above the location block.
 *
 * The default is six general questions, for pages with no more specific set of
 * their own. Everything that does have one passes it in: a page about dentures
 * should answer questions about dentures, not repeat the same six answers a
 * reader has already scrolled past on four other pages.
 *
 * That repetition was also the site's largest duplicate-content problem. The
 * same block appeared on thirty six of thirty seven pages, and on the thinnest
 * of them it outweighed the page's own content. Per-page questions turn the
 * same slot into unique, answerable material on every page instead.
 */
export function FaqSection({
  items = faqs.slice(0, 6),
  eyebrow = "Common Questions",
  heading = "Questions we hear / most often",
  showAllLink = true,
}: {
  items?: readonly { q: string; a: string }[];
  eyebrow?: string;
  /** A slash marks the line break in the masked heading. */
  heading?: string;
  showAllLink?: boolean;
} = {}) {
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <MaskedHeading
            as="h2"
            className="t-h2 mt-6"
            text={heading}
          />
        </div>

        <div className="mt-12 max-w-4xl">
          <FaqList items={items} />
        </div>

        {showAllLink && (
          <div className="mt-10">
            <Reveal>
              <TextLink href="/patient-resources/faqs">
                Read all our FAQs
              </TextLink>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
