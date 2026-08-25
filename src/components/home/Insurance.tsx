import { insurance } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Carriers scroll past in a slow, continuous band. */
export function Insurance() {
  const carriers = [...insurance.carriers, ...insurance.carriers];

  return (
    <section className="section-sm bg-linen-deep py-20">
      <div className="shell text-center">
        <Reveal>
          <Eyebrow align="center">{insurance.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-h2 mx-auto mt-6 max-w-2xl">{insurance.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mx-auto mt-5 max-w-2xl">{insurance.body}</p>
        </Reveal>
      </div>

      <Reveal preset="fade" className="mt-14">
        <div className="marquee-mask relative flex overflow-hidden">
          <ul
            className="animate-marquee flex shrink-0 items-center gap-3"
            style={{ ["--marquee-duration" as string]: "48s" }}
          >
            {carriers.map((carrier, i) => (
              <li
                key={`${carrier}-${i}`}
                aria-hidden={i >= insurance.carriers.length}
                className="whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-[0.875rem] text-taupe shadow-[var(--shadow-sm)]"
              >
                {carrier}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="shell mt-12 text-center">
        <Reveal delay={0.06}>
          <TextLink href={insurance.cta.href}>{insurance.cta.label}</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
