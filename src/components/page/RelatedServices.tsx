import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** The other treatments in a category, shown at the foot of a detail page. */
export function RelatedServices({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: { title: string; href: string; lead: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="section bg-linen-deep">
      <div className="shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <RevealGroup
          as="ul"
          gap={0.07}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <RevealItem as="li" key={item.href} className="h-full">
              <Link
                href={item.href}
                className="card group flex h-full translate-y-0 flex-col transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
              >
                <h3 className="t-h3 transition-colors duration-[450ms] group-hover:text-rose-deep">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-taupe">
                  {item.lead}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.925rem] font-medium text-rose-deep">
                  Learn more
                  <span className="relative flex h-3.5 w-3.5 overflow-hidden">
                    <ArrowRight className="absolute translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-5" />
                    <ArrowRight className="absolute -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0" />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
