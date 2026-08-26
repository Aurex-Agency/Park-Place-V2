import { testimonials, testimonialsSection } from "@/lib/content";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

type Testimonial = (typeof testimonials)[number];

/**
 * Three columns of reviews drifting upward at slightly different speeds.
 *
 * The loop is a CSS animation on a list rendered twice. The second copy is the
 * seam: once the first copy has travelled its own height, the animation resets
 * and the second copy is already sitting exactly where the first began, so the
 * cut is invisible. That duplicate is decorative, so it is hidden from
 * assistive technology.
 *
 * No portraits on the cards. The practice photography is candid rather than
 * headshots, and cropping patients into avatars would look like stock.
 */
function Column({
  items,
  duration,
  className = "",
}: {
  items: readonly Testimonial[];
  duration: number;
  className?: string;
}) {
  return (
    <div className={`marquee-column ${className}`}>
      <ul
        /* pb-6 matches gap-6. Without it the loop is half a gap short and
           visibly jumps on every cycle. */
        className="animate-marquee-y m-0 flex list-none flex-col gap-6 p-0 pb-6"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((pass) =>
          items.map((item) => (
            <li
              key={`${pass}-${item.name}`}
              aria-hidden={pass === 1 ? "true" : undefined}
              className="group w-full max-w-sm"
            >
              <figure className="m-0 translate-y-0 rounded-[1.25rem] bg-white p-8 shadow-[var(--shadow-sm)] ring-1 ring-sand/60 transition-[translate,scale,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[var(--shadow-lg)]">
                <blockquote>
                  <p className="text-[1.0125rem] leading-relaxed text-taupe">
                    {item.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-7">
                  <span className="block font-[family-name:var(--font-display)] text-lg leading-tight text-espresso">
                    {item.name}
                  </span>
                  <span className="mt-1.5 block font-[family-name:var(--font-brand)] text-[0.72rem] uppercase tracking-[0.2em] text-rose-deep">
                    {item.role}
                  </span>
                </figcaption>
              </figure>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export function Testimonials() {
  // Six reviews across three columns, so nothing repeats side by side.
  const columns = [
    { items: testimonials.slice(0, 2), duration: 34 },
    { items: testimonials.slice(2, 4), duration: 44, className: "hidden md:block" },
    { items: testimonials.slice(4, 6), duration: 39, className: "hidden lg:block" },
  ];

  return (
    <section className="section overflow-hidden bg-linen-deep">
      <div className="shell">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Reveal>
            <p className="rounded-full bg-white/70 px-4 py-1.5 font-[family-name:var(--font-brand)] text-[0.75rem] font-medium uppercase tracking-[0.24em] text-rose-deep ring-1 ring-sand">
              {testimonialsSection.badge}
            </p>
          </Reveal>

          <MaskedHeading
            className="t-h1 mt-7"
            text="Hearing from real / patients can make / all the difference"
          />

          <Reveal delay={0.1}>
            <p className="t-lead mt-5">{testimonialsSection.body}</p>
          </Reveal>
        </div>

        <Reveal preset="fade" className="mt-16">
          <div className="marquee-mask-y flex max-h-[38rem] justify-center gap-6 overflow-hidden">
            {columns.map((col, i) => (
              <Column
                key={i}
                items={col.items}
                duration={col.duration}
                className={col.className}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <Reveal delay={0.06}>
            <TextLink href={testimonialsSection.cta.href}>
              {testimonialsSection.cta.label}
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
