import Image from "next/image";
import type { Photo } from "@/content/photography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * A short run of real photographs from the practice, with a heading.
 *
 * Interior pages are otherwise all words, and on a page about who treats you
 * or what the office is like, a photograph answers the question faster than a
 * paragraph can. This is deliberately not a block in the page data: blocks are
 * the shapes of copy, and this is a section that sits after them.
 *
 * Three arrangements, chosen by how many photographs there are:
 *
 *   pair     a portrait beside a landscape, bottoms aligned
 *   trio     one tall photograph beside two stacked
 *   gallery  columns at each photograph's natural shape, for six or more
 *
 * Pair and gallery draw every image at its intrinsic proportions from the
 * recorded width and height, so nothing shifts as they arrive. The trio crops
 * to fixed rows on wide screens, which is why it wants landscapes on the right.
 *
 * Every image here is fetched at low priority. These sections sit just under
 * the page header, close enough that native lazy loading starts them at once,
 * and on a throttled connection they were taking bandwidth from the header
 * photograph that decides Largest Contentful Paint.
 */
export function PhotoStory({
  eyebrow,
  heading,
  lead,
  photos,
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  photos: Photo[];
  /** "linen" for a deeper band, "dark" for espresso. */
  tone?: "light" | "linen" | "dark";
}) {
  const dark = tone === "dark";
  const band =
    tone === "dark" ? "bg-espresso text-linen" : tone === "linen" ? "bg-linen-deep" : "";
  const captionClass = `mt-3 text-[0.9rem] leading-snug ${dark ? "text-linen/70" : "text-taupe"}`;

  return (
    <section className={`section overflow-hidden ${band}`}>
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            className={`t-h2 mt-6 ${dark ? "!text-linen" : ""}`}
            text={heading}
          />
          {lead && (
            <Reveal delay={0.1}>
              <p
                className={`mt-5 text-[1.05rem] leading-relaxed ${dark ? "text-linen/75" : "t-lead"}`}
              >
                {lead}
              </p>
            </Reveal>
          )}
        </div>

        {photos.length === 2 && <Pair photos={photos} captionClass={captionClass} />}
        {photos.length === 3 && <Trio photos={photos} captionClass={captionClass} />}
        {photos.length > 3 && <Gallery photos={photos} captionClass={captionClass} dark={dark} />}
      </div>
    </section>
  );
}

function Frame({
  photo,
  sizes,
  className = "",
  fill = false,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.25rem] bg-linen-deep shadow-[var(--shadow-sm)] ${className}`}
    >
      {fill ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          fetchPriority="low"
          className="scale-100 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          fetchPriority="low"
          className="h-auto w-full scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

function Pair({ photos, captionClass }: { photos: Photo[]; captionClass: string }) {
  return (
    <RevealGroup
      gap={0.12}
      className="mt-14 grid items-end gap-6 md:grid-cols-[0.78fr_1.22fr] md:gap-8 lg:mt-16"
    >
      {photos.map((photo) => (
        <RevealItem key={photo.src}>
          <figure>
            <Frame photo={photo} sizes="(max-width: 768px) 92vw, 55vw" />
            {photo.caption && <figcaption className={captionClass}>{photo.caption}</figcaption>}
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function Trio({ photos, captionClass }: { photos: Photo[]; captionClass: string }) {
  const [tall, ...stacked] = photos;
  return (
    <RevealGroup
      gap={0.1}
      className="mt-14 grid gap-6 md:grid-cols-12 md:gap-8 lg:mt-16"
    >
      <RevealItem className="md:col-span-5">
        <figure className="flex h-full flex-col">
          <Frame
            photo={tall}
            fill
            sizes="(max-width: 768px) 92vw, 40vw"
            className="aspect-[4/5] md:aspect-auto md:flex-1"
          />
          {tall.caption && <figcaption className={captionClass}>{tall.caption}</figcaption>}
        </figure>
      </RevealItem>
      <div className="flex flex-col gap-6 md:col-span-7 md:gap-8">
        {stacked.map((photo) => (
          <RevealItem key={photo.src}>
            <figure>
              <Frame
                photo={photo}
                fill
                sizes="(max-width: 768px) 92vw, 55vw"
                className="aspect-[4/3] md:aspect-[16/10]"
              />
              {photo.caption && <figcaption className={captionClass}>{photo.caption}</figcaption>}
            </figure>
          </RevealItem>
        ))}
      </div>
    </RevealGroup>
  );
}

/**
 * CSS columns rather than a grid, so portraits and landscapes pack at their
 * own heights. Columns fill top to bottom, so the order in the data reads down
 * each column in turn rather than across rows.
 */
function Gallery({
  photos,
  captionClass,
  dark,
}: {
  photos: Photo[];
  captionClass: string;
  dark: boolean;
}) {
  // Six photographs over four columns leaves two columns short and a hole in
  // the middle of the set. Up to six, three columns; beyond that, four.
  const wide = photos.length > 6 ? "lg:columns-4" : "lg:columns-3";

  return (
    <RevealGroup
      gap={0.06}
      className={`mt-14 columns-2 gap-4 sm:gap-6 lg:mt-16 ${wide}`}
    >
      {photos.map((photo) => (
        <RevealItem key={photo.src} className="mb-6 break-inside-avoid sm:mb-8">
          <figure>
            <Frame
              photo={photo}
              sizes={photos.length > 6 ? "(max-width: 1024px) 46vw, 290px" : "(max-width: 1024px) 46vw, 390px"}
              className={dark ? "!bg-walnut" : ""}
            />
            {photo.caption && <figcaption className={captionClass}>{photo.caption}</figcaption>}
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
