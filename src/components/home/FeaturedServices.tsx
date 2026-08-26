import Image from "next/image";
import Link from "next/link";
import { featuredServices } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

export function FeaturedServices() {
  return (
    <section className="section bg-linen-deep">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Top-Rated Care, Comprehensive Services</Eyebrow>
          </Reveal>
          <MaskedHeading
            className="t-h1 mt-6"
            text="Everything You Need for / a Healthy, / Beautiful Smile"
          />
          <Reveal delay={0.1}>
            <p className="t-lead mt-5">
              Our team is ready to provide you with the expert care you deserve.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          gap={0.1}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredServices.map((service) => (
            <RevealItem as="li" key={service.title} className="h-full">
              <Link
                href={service.slug}
                className="card group flex h-full flex-col overflow-hidden !p-0 transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-linen-deep">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.12]"
                  />
                  {/* A warm veil lifts off the photograph on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-espresso/25 opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-0"
                  />
                  {/* Rose gold hairline draws across the base of the image. */}
                  <span
                    aria-hidden="true"
                    className="metal-rule absolute inset-x-0 bottom-0 origin-left scale-x-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="t-h3 transition-[transform,color] duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-1 group-hover:text-rose-deep">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-taupe">
                    {service.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-rose-deep">
                    Learn more
                    <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                      <ArrowRight className="absolute transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                      <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                    </span>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
