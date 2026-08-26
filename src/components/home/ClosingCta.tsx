import Image from "next/image";
import { closingCta, practice } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { MetalMark } from "@/components/ui/MetalMark";

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso py-28 text-linen md:py-36">
      <Image
        src={closingCta.image}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,30,23,0.88) 0%, rgba(42,30,23,0.78) 50%, rgba(42,30,23,0.94) 100%)",
        }}
      />

      <div className="shell text-center">
        <Reveal preset="fade">
          <div className="flex justify-center">
            <MetalMark size={62} />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 flex justify-center">
            <Eyebrow align="center" tone="dark">{closingCta.eyebrow}</Eyebrow>
          </div>
        </Reveal>

        <MaskedHeading
          className="t-h1 mx-auto mt-6 max-w-2xl !text-linen"
          text="Ready to Smile / with Confidence?"
        />

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-linen/70">
            {closingCta.body}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Button href={closingCta.primaryCta.href} variant="primary">
              {closingCta.primaryCta.label}
            </Button>
            <Button href={practice.phoneHref} variant="ghost">
              Call {practice.phone}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-10 text-[0.925rem] text-linen/70">
            {practice.address.full}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
