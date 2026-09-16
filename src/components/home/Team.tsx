import Image from "next/image";
import { photos } from "@/content/photography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { TeamPortraits } from "@/components/page/TeamPortraits";

/**
 * The people a patient actually spends the visit with.
 *
 * The quote is a real review, from the testimonials already on the site, and
 * it is the one that says the thing this section is here to show.
 */
export function Team() {
  const group = photos.teamGroupFour;

  return (
    <section className="section overflow-hidden bg-linen-deep">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Our Team</Eyebrow>
            </Reveal>

            <MaskedHeading className="t-h1 mt-6" text="The Faces Behind / Every Visit" />

            <Reveal delay={0.1}>
              <p className="t-lead mt-6">
                Hygienists, assistants and the front desk: the people who answer
                when you call, settle you into the chair, and see you out again.
                Some patients have known them for decades.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8">
                <TextLink href="/about-us/meet-the-team">Meet the team</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal preset="fade">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-linen shadow-[var(--shadow-md)]">
                <Image
                  src={group.src}
                  alt={group.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  fetchPriority="low"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </Reveal>

            <Reveal
              preset="riseSmall"
              delay={0.12}
              /* In flow below the photograph on small screens, where floating
                 over it would cover half the people in it. */
              className="relative z-10 -mt-10 ml-4 mr-4 max-w-[21rem] sm:ml-6 lg:absolute lg:-bottom-10 lg:-left-10 lg:m-0"
            >
              <figure className="rounded-[1.1rem] bg-white p-6 shadow-[var(--shadow-md)] ring-1 ring-sand/60">
                <blockquote>
                  <p className="font-[family-name:var(--font-display)] text-[1.1rem] leading-snug text-espresso">
                    &ldquo;Through these years, they have become like family to
                    me.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-[0.875rem] text-taupe">
                  Nelene Pannell, patient since 1987
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <TeamPortraits className="mt-20 lg:mt-28" />
      </div>
    </section>
  );
}
