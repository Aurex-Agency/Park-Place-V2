import Image from "next/image";
import Link from "next/link";
import { featuredServices } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function FeaturedServices() {
  return (
    <section className="section bg-linen-deep">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Top-Rated Care, Comprehensive Services</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1 mt-6">
              Everything You Need for a Healthy, Beautiful Smile
            </h2>
          </Reveal>
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
                className="card card-lift group flex h-full flex-col !p-0 overflow-hidden"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-linen-deep">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="t-h3">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-taupe">
                    {service.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-rose-deep">
                    Learn more
                    <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
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
