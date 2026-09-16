import Image from "next/image";
import { associateDoctor } from "@/lib/content";
import { photos } from "@/content/photography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Dr. Rebecca McDougald: her portrait, and two photographs of her at work.
 *
 * Her name is on the sign out front, and until now it was nowhere on the site,
 * which is the kind of gap a patient notices when they arrive. The copy says
 * only what is confirmed. The photographs do most of the work: a portrait to
 * put a face to the name, and two frames of her treating patients.
 */
export function AssociateDoctor({
  eyebrow,
  tone = "light",
}: {
  eyebrow: string;
  tone?: "light" | "linen";
}) {
  const doc = associateDoctor;
  const atWork = [photos.mcdougaldWithAssistant, photos.mcdougaldLoupes];

  return (
    <section className={`section overflow-hidden ${tone === "linen" ? "bg-linen-deep" : ""}`}>
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal preset="fade" className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="arch group relative aspect-[4/5] w-full overflow-hidden bg-linen-deep shadow-[var(--shadow-md)]">
            <Image
              src={photos.mcdougaldPortrait.src}
              alt={photos.mcdougaldPortrait.alt}
              fill
              sizes="(max-width: 1024px) 80vw, 384px"
              fetchPriority="low"
              className="scale-100 object-cover object-[50%_30%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.06]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <MaskedHeading className="t-h2 mt-6" text={`Meet ${doc.name}`} />

          <Reveal delay={0.08}>
            <p className="mt-4 font-[family-name:var(--font-display-italic)] text-xl italic text-rose-deep">
              {doc.credential}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="t-lead mt-6">
              {doc.name} treats patients at Park Place Dental alongside Dr.
              Goodwin. Her name is beside his on the sign out front on North 3rd
              Street, and you will find her in the treatment rooms with the
              same team that looks after you from the moment you arrive.
            </p>
          </Reveal>

          <RevealGroup gap={0.1} delay={0.1} className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
            {atWork.map((photo) => (
              <RevealItem key={photo.src}>
                <figure>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-linen-deep shadow-[var(--shadow-sm)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 330px"
                      fetchPriority="low"
                      className="scale-100 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.9rem] leading-snug text-taupe">
                    {photo.caption}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
