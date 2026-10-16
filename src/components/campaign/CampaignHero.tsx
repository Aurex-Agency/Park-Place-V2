import Image from "next/image";
import type { Photo } from "@/content/photography";
import { CallButton } from "@/components/campaign/CallButton";

/**
 * The top of a landing page.
 *
 * Message match is the whole job here: the headline carries the same words as
 * the advertisement that paid for the visit, because a visitor who cannot see
 * what they clicked on within a second leaves. Both calls to action sit above
 * the fold on a phone, and the telephone one comes first.
 */
export function CampaignHero({
  slug,
  headline,
  subheadline,
  secondaryLabel,
  photo,
  priority = true,
}: {
  slug: string;
  headline: string;
  subheadline: string;
  secondaryLabel: string;
  photo: Photo;
  priority?: boolean;
}) {
  return (
    <section className="bg-linen">
      <div className="shell grid gap-10 pt-12 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <h1 className="t-display">{headline}</h1>
          <p className="t-lead mt-6 max-w-[34rem]">{subheadline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton slug={slug} placement="hero" />
            <a
              href="#request"
              className="btn btn-outline w-full justify-center px-7 py-4 text-[1.05rem] sm:w-auto"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-md)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority={priority}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
