import { insurance } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Accepted carriers, laid out as a static grid.
 *
 * This was a scrolling marquee and it could not work. Eleven carriers is a
 * track about 1457px wide, so on any display wider than that the loop seam is
 * on screen and the same carrier appears twice at once, which reads as a data
 * error. No amount of padding closes a gap that is over a thousand pixels on a
 * large display.
 *
 * It is also the wrong behaviour for the content. The single job of this list
 * is letting a patient find their own insurer, and moving text is harder to
 * scan than still text. The motion now lives in how the list arrives.
 */
export function Insurance() {
  return (
    <section className="section bg-linen-deep py-20">
      <div className="shell text-center">
        <Reveal>
          <Eyebrow align="center">{insurance.eyebrow}</Eyebrow>
        </Reveal>

        <MaskedHeading
          className="t-h2 mx-auto mt-6 max-w-2xl"
          text="We accept most / major insurance plans"
        />

        <Reveal delay={0.1}>
          <p className="t-lead mx-auto mt-5 max-w-2xl">{insurance.body}</p>
        </Reveal>

        <RevealGroup
          as="ul"
          gap={0.045}
          delay={0.06}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3"
        >
          {insurance.carriers.map((carrier) => (
            <RevealItem as="li" preset="riseSmall" key={carrier}>
              <span className="block cursor-default whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-[0.875rem] text-taupe shadow-[var(--shadow-sm)] ring-1 ring-transparent transition-[transform,box-shadow,color] duration-[420ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:text-espresso hover:shadow-[var(--shadow-md)] hover:ring-sand">
                {carrier}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12">
          <Reveal delay={0.06}>
            <TextLink href={insurance.cta.href}>{insurance.cta.label}</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
