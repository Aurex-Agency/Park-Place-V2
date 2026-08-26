import type { Block } from "@/content/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Renders the block model used by every interior page.
 *
 * Four shapes cover the whole site: running prose, a plain list, a set of
 * defined terms, and a numbered sequence. Keeping the vocabulary this small is
 * what stops thirty pages drifting into thirty layouts.
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-14 md:gap-20">
      {blocks.map((block, i) => (
        <section key={i}>
          {"heading" in block && block.heading && (
            <Reveal>
              <h2 className="t-h2 max-w-2xl">{block.heading}</h2>
            </Reveal>
          )}

          {block.kind === "prose" && (
            <div className="mt-6 flex max-w-2xl flex-col gap-5">
              {block.body.map((text, j) => (
                <Reveal key={j} delay={j * 0.04}>
                  <p className="text-taupe">{text}</p>
                </Reveal>
              ))}
            </div>
          )}

          {block.kind === "list" && (
            <div className="mt-6 max-w-2xl">
              {block.intro && (
                <Reveal>
                  <p className="mb-6 text-taupe">{block.intro}</p>
                </Reveal>
              )}
              <RevealGroup as="ul" gap={0.06} className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <RevealItem
                    as="li"
                    preset="riseSmall"
                    key={item}
                    className="flex items-start gap-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 rounded-full bg-rose"
                    />
                    <span className="text-taupe">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}

          {(block.kind === "terms" || block.kind === "steps") && (
            <div className="mt-6">
              {block.intro && (
                <Reveal>
                  <p className="mb-8 max-w-2xl text-taupe">{block.intro}</p>
                </Reveal>
              )}
              <RevealGroup
                as="ul"
                gap={0.07}
                className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
              >
                {block.items.map((item, j) => (
                  <RevealItem as="li" key={item.term} className="flex gap-5">
                    {block.kind === "steps" && (
                      <span
                        aria-hidden="true"
                        className="metal-text mt-[0.1em] shrink-0 font-[family-name:var(--font-display)] text-2xl leading-none"
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                    )}
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug text-espresso">
                        {item.term}
                      </h3>
                      <p className="mt-2 text-[0.975rem] leading-relaxed text-taupe">
                        {item.text}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
