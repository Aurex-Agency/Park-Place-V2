import Image from "next/image";
import { teamPortraits } from "@/content/photography";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The team, one arch each.
 *
 * Alternate portraits sit lower on wide screens, so a row of them reads as
 * people standing together rather than a grid of passport photos. The offset
 * lives on an inner wrapper, not on the revealed item, so it composes with the
 * entrance instead of fighting it for the same property. Row spacing on wide
 * screens is larger than that offset, or a lowered portrait runs into the top
 * of the row beneath it.
 *
 * Rows are centred rather than gridded, so a count that does not divide evenly
 * (eleven, today) ends on a centred short row instead of a hole at the end.
 *
 * Each image is requested at the width it is drawn, around 190px on a desktop,
 * so the whole set costs roughly what one header photograph does.
 */
export function TeamPortraits({ className = "" }: { className?: string }) {
  return (
    <RevealGroup
      as="ul"
      gap={0.05}
      className={`flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-5 lg:gap-y-20 lg:pb-12 ${className}`}
    >
      {teamPortraits.map((person, i) => (
        <RevealItem
          as="li"
          preset="riseSmall"
          key={person.src}
          className="w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-6.25rem)/6)]"
        >
          <figure className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
            <div className="arch group relative aspect-[4/5] w-full overflow-hidden bg-linen-deep shadow-[var(--shadow-sm)] ring-1 ring-sand/50">
              <Image
                src={person.src}
                alt={person.name ?? person.alt}
                fill
                sizes="(max-width: 640px) 31vw, (max-width: 1024px) 23vw, 190px"
                fetchPriority="low"
                className="scale-100 object-cover object-[50%_30%] transition-transform duration-[1100ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.06]"
              />
            </div>
            {person.name && (
              <figcaption className="mt-3 text-center">
                <span className="block font-[family-name:var(--font-display)] text-[1.05rem] text-espresso">
                  {person.name}
                </span>
                {person.role && (
                  <span className="mt-0.5 block text-[0.85rem] text-taupe">
                    {person.role}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
