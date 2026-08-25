import Link from "next/link";
import { serviceCategories } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** The full service map, laid out as a quiet editorial index. */
export function ServiceIndex() {
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Comprehensive Care Under One Roof</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1 mt-6">
              A full spectrum of care, rare for a practice this close to home
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mt-5">
              From preventive care to advanced procedures like dental implants,
              root canals, and veneers, Park Place Dental is equipped to handle
              all your dental needs.
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ul" gap={0.07} className="mt-16 border-t border-sand">
          {serviceCategories.map((cat) => (
            <RevealItem as="li" preset="riseSmall" key={cat.slug}>
              <Link
                href={cat.slug}
                className="group grid items-start gap-4 border-b border-sand py-8 transition-colors duration-500 hover:bg-rose-wash/60 md:grid-cols-[minmax(0,18rem)_1fr_auto] md:gap-10 md:px-4"
              >
                <h3 className="t-h3 transition-colors duration-500 group-hover:text-rose-deep">
                  {cat.title}
                </h3>

                <div>
                  <p className="text-[0.95rem] leading-relaxed text-taupe">
                    {cat.blurb}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white px-3.5 py-1.5 text-[0.75rem] tracking-[0.02em] text-taupe ring-1 ring-sand/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-11 w-11 items-center justify-center rounded-full text-taupe ring-1 ring-sand transition-all duration-500 group-hover:bg-rose-deep group-hover:text-white group-hover:ring-rose-deep md:flex"
                >
                  <ArrowRight className="transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
