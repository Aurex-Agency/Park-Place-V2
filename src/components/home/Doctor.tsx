import Image from "next/image";
import { doctor, doctorSection } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { CountUp } from "@/components/ui/CountUp";

export function Doctor() {
  return (
    <section className="section">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        {/* Portrait in a full arch, the strongest nod to the column mark */}
        <Reveal preset="fade" className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="arch group relative aspect-[4/5] w-full overflow-hidden bg-linen-deep">
            <Image
              src={doctor.portrait}
              alt={`${doctor.name}, dentist at Park Place Dental in Booneville`}
              fill
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="scale-100 object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.06]"
            />
          </div>

          {/* Years of service, set as a metal medallion */}
          <div className="absolute -right-4 bottom-8 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center shadow-[var(--shadow-md)] ring-1 ring-sand/60">
            <span className="metal-text font-[family-name:var(--font-display)] text-3xl leading-none">
              <CountUp value="43" />
            </span>
            <span className="mt-1 font-[family-name:var(--font-brand)] text-[0.75rem] uppercase tracking-[0.14em] text-taupe">
              Years of
              <br />
              Care
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>{doctorSection.eyebrow}</Eyebrow>
          </Reveal>

          <MaskedHeading className="t-h1 mt-6" text="Expert Care, / Trusted Results" />

          <Reveal delay={0.1}>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl italic text-rose-deep">
              {doctorSection.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="t-lead mt-6">{doctorSection.body}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <blockquote className="mt-8 border-l-2 border-rose-soft pl-6">
              <p className="font-[family-name:var(--font-display)] text-lg leading-relaxed text-espresso">
                Originally from Booneville, Dr. Goodwin returned to his hometown
                with a passion for serving those around him.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href={doctorSection.cta.href} variant="outline">
                Meet {doctor.shortName}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
