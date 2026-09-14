import type { PostBlock } from "@/content/posts";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Renders an article body.
 *
 * This is deliberately a slightly wider vocabulary than `Blocks`, which serves
 * the service pages. Articles need two shapes those pages do not: a callout,
 * for the thing a reader must not miss, and a comparison table, because a
 * genuine side-by-side is both the clearest way to answer a "this or that"
 * question and the structure AI search systems extract most reliably.
 *
 * Headings are h2 and the items beneath them h3, which keeps the outline of a
 * long article honest. The page's own h1 is the article title.
 */
export function PostBlocks({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-14 md:gap-16">
      {blocks.map((block, i) => (
        <section key={i}>
          {"heading" in block && block.heading && (
            <Reveal>
              <h2 className="t-h2 max-w-2xl">{block.heading}</h2>
            </Reveal>
          )}

          {"intro" in block && block.intro && (
            <Reveal>
              <p className="mt-5 max-w-2xl text-taupe">{block.intro}</p>
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
            <RevealGroup
              as="ul"
              gap={0.06}
              className="mt-6 flex max-w-2xl flex-col gap-3"
            >
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
          )}

          {(block.kind === "terms" || block.kind === "steps") && (
            <RevealGroup
              as="ul"
              gap={0.07}
              className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2"
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
          )}

          {block.kind === "callout" && (
            <Reveal>
              <aside className="mt-2 max-w-2xl rounded-[var(--radius-card)] border-l-[3px] border-rose-deep bg-rose-wash p-6 md:p-7">
                <h2 className="font-semibold text-espresso">{block.heading}</h2>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-taupe">
                  {block.body}
                </p>
              </aside>
            </Reveal>
          )}

          {block.kind === "table" && (
            <Reveal>
              {/*
                The table scrolls inside its own container rather than pushing
                the page sideways on a phone. A comparison is worth nothing if
                half of it is off the screen.
              */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <thead>
                    <tr>
                      {block.columns.map((column, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="border-b border-sand-deep pb-3 pr-6 text-[0.8rem] uppercase tracking-[0.08em] text-taupe"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row[0]}>
                        <th
                          scope="row"
                          className="border-b border-sand py-3.5 pr-6 align-top font-medium text-espresso"
                        >
                          {row[0]}
                        </th>
                        <td className="border-b border-sand py-3.5 pr-6 align-top text-[0.975rem] text-taupe">
                          {row[1]}
                        </td>
                        <td className="border-b border-sand py-3.5 align-top text-[0.975rem] text-taupe">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}
        </section>
      ))}
    </div>
  );
}
