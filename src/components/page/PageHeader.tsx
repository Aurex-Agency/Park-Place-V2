import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { practice } from "@/lib/content";

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
  cta = true,
}: {
  eyebrow: string;
  headline: string;
  lead?: string | string[];
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  note?: string;
  /** Set false on pages that are themselves the booking step. */
  cta?: boolean;
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
            {/*
              Above the fold, entrances run in CSS rather than through Motion.

              Reveal starts its children at opacity zero and brings them in
              after hydration. On fifty interior pages that made the lead
              paragraph below the Largest Contentful Paint element, measured at
              4.3s with all of it render delay. These are the pages the search
              work points at, so they could least afford it.
            */}
            <div className="page-in">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <MaskedHeading as="h1" className="t-h1 mt-6" text={headline} />

            {paragraphs.map((text, i) => (
              <p key={i} className="page-in page-in-1 t-lead mt-5">
                {text}
              </p>
            ))}

            {note && (
              <p className="page-in page-in-2 mt-7 inline-block rounded-[1rem] bg-white px-5 py-3.5 text-[0.95rem] text-espresso shadow-[var(--shadow-sm)] ring-1 ring-sand/70">
                {note}
              </p>
            )}

            {cta && (
              <div className="page-in page-in-3 mt-9 flex flex-wrap items-center gap-3">
                <Button href="/book-an-appointment" variant="primary">
                  Book an appointment
                </Button>
                <Button href={practice.phoneHref} variant="ghost">
                  Call {practice.phone}
                </Button>
              </div>
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
