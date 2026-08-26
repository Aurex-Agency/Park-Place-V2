import { practice } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MetalMark } from "@/components/ui/MetalMark";

/** The closing call to action every interior page ends on. */
export function CtaBand({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="bg-espresso py-24 text-linen md:py-28">
      <div className="shell text-center">
        <Reveal preset="fade">
          <div className="flex justify-center">
            <MetalMark size={54} />
          </div>
        </Reveal>

        <MaskedHeading
          className="t-h2 mx-auto mt-8 max-w-2xl !text-linen"
          text={heading}
        />

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-linen/75">
            {body}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/book-an-appointment" variant="primary">
              Book an appointment
            </Button>
            <Button href={practice.phoneHref} variant="ghost">
              Call {practice.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
