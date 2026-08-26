import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";

export type Crumb = { label: string; href?: string };

/**
 * The header every interior page opens with.
 *
 * Headline lines are authored with " / " so the break points are a decision
 * rather than an accident of viewport width, exactly as on the homepage.
 */
export function PageHeader({
  eyebrow,
  headline,
  lead,
  image,
  imageAlt,
  crumbs = [],
  note,
}: {
  eyebrow: string;
  headline: string;
  lead?: string | string[];
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  note?: string;
}) {
  const paragraphs = Array.isArray(lead) ? lead : lead ? [lead] : [];

  return (
    <header className="relative overflow-hidden bg-linen-deep pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="shell">
        {crumbs.length > 0 && (
          <Reveal preset="fade">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-taupe">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-rose-deep"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-espresso">
                        {crumb.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && (
                      <span aria-hidden="true" className="text-sand-deep">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div
          className={
            image
              ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
              : "max-w-3xl"
          }
        >
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <MaskedHeading as="h1" className="t-h1 mt-6" text={headline} />

            {paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.1 + i * 0.04}>
                <p className="t-lead mt-5">{text}</p>
              </Reveal>
            ))}

            {note && (
              <Reveal delay={0.18}>
                <p className="mt-7 inline-block rounded-[1rem] bg-white px-5 py-3.5 text-[0.95rem] text-espresso shadow-[var(--shadow-sm)] ring-1 ring-sand/70">
                  {note}
                </p>
              </Reveal>
            )}
          </div>

          {image && (
            <Reveal preset="fade">
              <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-linen lg:aspect-[5/6]">
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
