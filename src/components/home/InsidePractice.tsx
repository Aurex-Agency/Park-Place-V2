import Image from "next/image";
import { photos, type Photo } from "@/content/photography";
import { practice } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

/**
 * A walk through the building, before the reader has to make the trip.
 *
 * Anxious patients say that not knowing what to expect is most of it, and a
 * first visit to a new office is all unknowns. So this is the building from
 * the street, the room you wait in, the desk you check in at, and a treatment
 * room, in roughly the order you meet them.
 *
 * On wide screens it is a four column mosaic with fixed row heights, so every
 * photograph crops to a known shape and nothing shifts as they load. Below
 * that it falls back to two columns at each photograph's own proportions.
 *
 * Captions sit on a scrim at the base of each photograph. Linen on that scrim
 * measures above 7:1 regardless of what is behind it, which a caption laid
 * straight onto a bright window or a white chair would not.
 */
type Tile = {
  photo: Photo;
  /** Placement in the wide grid. */
  area: string;
  /** Shape below the wide breakpoint. */
  mobile: string;
  sizes: string;
  position?: string;
};

const tiles: Tile[] = [
  {
    photo: photos.exteriorBuilding,
    area: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3",
    mobile: "col-span-2 aspect-[4/3]",
    sizes: "(max-width: 1024px) 92vw, 50vw",
    position: "object-[40%_60%]",
  },
  {
    photo: photos.waitingRoom,
    area: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
    mobile: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 46vw, 25vw",
  },
  {
    photo: photos.frontDeskPhone,
    area: "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-3",
    mobile: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 46vw, 25vw",
    position: "object-[50%_30%]",
  },
  {
    photo: photos.refreshmentBar,
    area: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5",
    mobile: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 46vw, 25vw",
  },
  {
    photo: photos.appreciatedFrame,
    area: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-5",
    mobile: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 46vw, 25vw",
  },
  {
    photo: photos.operatoryWindow,
    area: "lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-5",
    mobile: "col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-[3/4]",
    sizes: "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw",
    position: "object-[50%_60%]",
  },
];

export function InsidePractice() {
  return (
    <section className="section overflow-hidden bg-espresso text-linen">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow tone="dark">Step Inside</Eyebrow>
            </Reveal>
            <MaskedHeading
              className="t-h1 mt-6 !text-linen"
              text="See Where You Will Be / Before You Arrive"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-linen/75">
              A first visit is easier when nothing about it is a surprise. This
              is the building on North 3rd Street, the room you will wait in,
              the desk you will check in at, and one of the rooms where your
              care happens.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          gap={0.07}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4 lg:grid-rows-[repeat(4,10.5rem)] xl:grid-rows-[repeat(4,11.5rem)]"
        >
          {tiles.map(({ photo, area, mobile, sizes, position }) => (
            <RevealItem
              key={photo.src}
              preset="fade"
              className={`${mobile} ${area} lg:aspect-auto`}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-[1.1rem] bg-walnut">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={sizes}
                  fetchPriority="low"
                  className={`scale-100 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05] ${position ?? ""}`}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(42,30,23,0) 0%, rgba(42,30,23,0.78) 100%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-0 p-4 text-[0.875rem] font-medium text-linen transition-[translate] duration-[500ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-1 sm:p-5">
                  {photo.caption}
                </figcaption>
              </figure>
            </RevealItem>
          ))}

          {/* The one tile that is not a photograph: where the building is. */}
          <RevealItem
            preset="fade"
            className="col-span-2 sm:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5"
          >
            <div className="flex h-full flex-col justify-center rounded-[1.1rem] bg-walnut p-6 ring-1 ring-linen/10">
              <p className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug text-linen">
                {practice.address.street}
                <br />
                {practice.address.city}, {practice.address.region}
              </p>
              <div className="mt-3">
                <TextLink href={practice.mapsHref} className="!text-rose-mist text-[0.95rem]">
                  Get directions
                </TextLink>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
