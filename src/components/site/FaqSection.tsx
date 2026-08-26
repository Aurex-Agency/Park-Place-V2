import { faqs } from "@/content/pages";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/page/FaqList";

/**
 * Common questions, shown above the location block on every page.
 *
 * Six of the ten, with a link to the rest. The full set lives on the FAQs page
 * and so does the FAQPage structured data. Repeating all ten on thirty seven
 * pages would bury every page under the same block and hand search engines the
 * same answers thirty seven times, which helps nobody.
 */
export function FaqSection() {
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Common Questions</Eyebrow>
          </Reveal>

          <MaskedHeading
            as="h2"
            className="t-h2 mt-6"
            text="Questions we hear / most often"
          />
        </div>

        <div className="mt-12 max-w-4xl">
          <FaqList items={faqs.slice(0, 6)} />
        </div>

        <div className="mt-10">
          <Reveal>
            <TextLink href="/patient-resources/faqs">
              Read all our FAQs
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
