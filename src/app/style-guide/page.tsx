import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, TextLink } from "@/components/ui/Button";
import { MetalMark, MetalLockup } from "@/components/ui/MetalMark";

export const metadata: Metadata = {
  title: "Design System",
  description: "The colour, type, motion and component system for Park Place Dental.",
  robots: { index: false, follow: false },
};

const neutrals = [
  { name: "White", token: "--color-white", hex: "#FFFFFF", use: "Card and panel surfaces" },
  { name: "Linen", token: "--color-linen", hex: "#FAF6F2", use: "Page canvas. Never pure white" },
  { name: "Linen Deep", token: "--color-linen-deep", hex: "#F2EAE2", use: "Alternating section band" },
  { name: "Blush", token: "--color-blush", hex: "#F8E9E2", use: "Rose tinted wash" },
  { name: "Sand", token: "--color-sand", hex: "#E2D6CA", use: "Hairlines and borders" },
  { name: "Sand Deep", token: "--color-sand-deep", hex: "#CBB9A8", use: "Outline button borders" },
];

const browns = [
  { name: "Espresso", token: "--color-espresso", hex: "#2A1E17", use: "Headlines and primary text", ratio: "15.06" },
  { name: "Walnut", token: "--color-walnut", hex: "#4A3729", use: "Footer and dark surfaces", ratio: "10.45" },
  { name: "Taupe", token: "--color-taupe", hex: "#75604F", use: "Body copy on light grounds", ratio: "5.51" },
  { name: "Taupe Light", token: "--color-taupe-light", hex: "#8B7566", use: "Decorative and large type only", ratio: "4.04" },
];

const roses = [
  { name: "Rose", token: "--color-rose", hex: "#B87A68", use: "Flat accent, icons, large type", ratio: "3.24" },
  { name: "Rose Deep", token: "--color-rose-deep", hex: "#96543F", use: "Accent text, primary buttons", ratio: "5.37" },
  { name: "Rose Soft", token: "--color-rose-soft", hex: "#E7C4B6", use: "Accents on flat dark surfaces", ratio: "6.94" },
  { name: "Rose Mist", token: "--color-rose-mist", hex: "#F0D5C9", use: "Accents over photography", ratio: "5.11" },
  { name: "Rose Wash", token: "--color-rose-wash", hex: "#FBF0EB", use: "Tinted card backgrounds", ratio: "1.05" },
];

function Swatch({
  name,
  token,
  hex,
  use,
  ratio,
}: {
  name: string;
  token: string;
  hex: string;
  use: string;
  ratio?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1rem] bg-white shadow-[var(--shadow-sm)] ring-1 ring-sand/60">
      <div className="h-20 w-full" style={{ backgroundColor: hex }} />
      <div className="p-4">
        <p className="font-[family-name:var(--font-display)] text-lg">{name}</p>
        <p className="mt-1 font-mono text-[0.72rem] uppercase text-taupe">{hex}</p>
        <p className="font-mono text-[0.68rem] text-taupe">{token}</p>
        <p className="mt-2 text-[0.78rem] leading-snug text-taupe">{use}</p>
        {ratio && (
          <p className="mt-2 text-[0.7rem] text-taupe">
            On linen: <span className="font-medium text-espresso">{ratio}:1</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-b border-sand py-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-taupe">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="pt-16 pb-32">
      {/* Masthead */}
      <header className="shell border-b border-sand pb-16">
        <Eyebrow>Design System</Eyebrow>
        <h1 className="t-h1 mt-6 max-w-3xl">
          Park Place Dental, a warm hometown system built on white, brown and
          rose gold
        </h1>
        <p className="t-lead mt-6 max-w-2xl">
          The canvas is warm linen rather than pure white, the ink is brown
          rather than black, and rose gold is the only accent. It appears flat
          for everyday work and polished for the brand moments.
        </p>
      </header>

      {/* Brand mark */}
      <section className="shell pt-20">
        <h2 className="t-h2">The mark</h2>
        <p className="t-lead mt-4 max-w-2xl">
          The Ionic column is the practice&rsquo;s existing mark. It is rendered
          as a CSS mask, so a single asset carries any size and any finish. The
          arch used on photographs throughout the site is drawn from the same
          idea.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white p-10 shadow-[var(--shadow-sm)]">
            <MetalLockup width={120} />
            <p className="t-caption mt-6">Polished, on light</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[1.25rem] bg-walnut p-10">
            <MetalLockup width={120} />
            <p className="t-caption mt-6 !text-linen/60">Polished, on walnut</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 rounded-[1.25rem] bg-linen-deep p-10">
            <MetalMark size={110} />
            <MetalMark size={70} finish="espresso" />
            <p className="t-caption">Mark, polished and flat</p>
          </div>
        </div>
      </section>

      {/* Colour */}
      <section className="shell pt-20">
        <h2 className="t-h2">Colour</h2>
        <p className="t-lead mt-4 max-w-2xl">
          Contrast ratios are measured against the linen canvas. Everything used
          for body copy clears 4.5:1. Anything below that is reserved for large
          display type or decoration.
        </p>

        <h3 className="t-h3 mt-12">Neutrals</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {neutrals.map((c) => (
            <Swatch key={c.hex} {...c} />
          ))}
        </div>

        <h3 className="t-h3 mt-12">Browns, the ink</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {browns.map((c) => (
            <Swatch key={c.hex} {...c} />
          ))}
        </div>

        <h3 className="t-h3 mt-12">Rose gold, the accent</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {roses.map((c) => (
            <Swatch key={c.hex} {...c} />
          ))}
        </div>
      </section>

      {/* Polished metal */}
      <section className="shell pt-20">
        <h2 className="t-h2">Polished rose gold</h2>
        <p className="t-lead mt-4 max-w-2xl">
          A believable metal needs banded reflections rather than a two stop
          fade. Narrow near-white stops act as the specular highlight that reads
          as a watch case catching a light. There are two ramps: a bright one
          for surfaces and large display type, and a darker one for text, since
          the bright stops disappear against linen.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] bg-white p-8 shadow-[var(--shadow-sm)]">
            <p className="t-caption">--metal-rose, display ramp</p>
            <div
              className="mt-4 h-24 w-full rounded-[0.9rem]"
              style={{ backgroundImage: "var(--metal-rose)" }}
            />
            <p className="metal-text-bright mt-6 font-[family-name:var(--font-display)] text-6xl leading-none">
              43 Years
            </p>
            <p className="mt-3 text-[0.8rem] text-taupe">
              Surfaces, the mark, and very large type on dark grounds.
            </p>
          </div>

          <div className="rounded-[1.25rem] bg-white p-8 shadow-[var(--shadow-sm)]">
            <p className="t-caption">--metal-rose-text, type ramp</p>
            <div
              className="mt-4 h-24 w-full rounded-[0.9rem]"
              style={{ backgroundImage: "var(--metal-rose-text)" }}
            />
            <p className="metal-text mt-6 font-[family-name:var(--font-display)] text-6xl leading-none">
              43 Years
            </p>
            <p className="mt-3 text-[0.8rem] text-taupe">
              Every stop stays at or below 3.46:1 on linen, so figures stay
              legible.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.25rem] bg-white p-8 shadow-[var(--shadow-sm)]">
          <p className="t-caption">--metal-rose-hairline, rules</p>
          <hr className="metal-rule animate-glint mt-5" />
          <p className="mt-4 text-[0.8rem] text-taupe">
            Used for section rules and the short stroke beside every eyebrow. A
            slow glint travels across it, and stops entirely under reduced
            motion.
          </p>
        </div>
      </section>

      {/* Type */}
      <section className="shell pt-20">
        <h2 className="t-h2">Typography</h2>
        <p className="t-lead mt-4 max-w-2xl">
          Three families, each with one job. Cinzel echoes the Roman capitals in
          the wordmark and is used for brand labels only. Source Serif carries
          every headline at weight 400 and is never bolded. DM Sans does all the
          functional work.
        </p>

        <div className="mt-10">
          <Row label="Cinzel / brand">
            <p className="t-eyebrow">Welcome to Park Place Dental</p>
            <p className="mt-3 text-[0.78rem] text-taupe">
              12px, 500, 0.24em tracking, uppercase. Eyebrows and footer column
              headings.
            </p>
          </Row>

          <Row label="Display / 400">
            <p className="t-display">Transform Your Smile</p>
            <p className="mt-3 text-[0.78rem] text-taupe">
              clamp(2.75rem, 6.2vw, 5rem), line height 1.06. Hero only.
            </p>
          </Row>

          <Row label="H1 / 400">
            <p className="t-h1">Your Trusted Dentist in Booneville</p>
            <p className="mt-3 text-[0.78rem] text-taupe">
              clamp(2.25rem, 4.6vw, 3.5rem), line height 1.08.
            </p>
          </Row>

          <Row label="H2 / 400">
            <p className="t-h2">Where Quality Care Meets Comfortable Dentistry</p>
          </Row>

          <Row label="H3 / 400">
            <p className="t-h3">Same-Day Crowns</p>
          </Row>

          <Row label="Lead">
            <p className="t-lead max-w-xl">
              Our in-house dental lab allows us to design and craft restorations
              on-site, so patients spend less time waiting.
            </p>
          </Row>

          <Row label="Body">
            <p className="max-w-xl text-taupe">
              Regular dental cleanings and exams are essential for maintaining
              optimal oral health. Our hygienists use the latest tools to ensure
              your teeth are clean and free of plaque.
            </p>
          </Row>

          <Row label="Caption">
            <p className="t-caption">Before and after</p>
          </Row>
        </div>
      </section>

      {/* Components */}
      <section className="shell pt-20">
        <h2 className="t-h2">Components</h2>

        <div className="mt-10">
          <Row label="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#" variant="primary">
                Book an appointment
              </Button>
              <Button href="#" variant="outline">
                Meet Dr. Goodwin
              </Button>
              <Button href="#" variant="ghost">
                Call (662) 728-8171
              </Button>
            </div>
            <p className="mt-4 text-[0.78rem] text-taupe">
              Full pill radius. Lift of 2px on hover over 400ms.
            </p>
          </Row>

          <Row label="Text link">
            <TextLink href="#">More about us</TextLink>
            <p className="mt-4 text-[0.78rem] text-taupe">
              The rule draws in from the left on hover and retracts to the right
              on exit.
            </p>
          </Row>

          <Row label="Eyebrow">
            <Eyebrow>Advanced Dental Technology</Eyebrow>
          </Row>

          <Row label="Card">
            <div className="card card-lift max-w-sm">
              <h3 className="t-h3">Dental Implants</h3>
              <p className="mt-3 text-[0.9rem] text-taupe">
                Permanent, lifelike implants produced in our in-house lab for a
                faster, more precise fit.
              </p>
            </div>
          </Row>

          <Row label="Arch image">
            <div className="flex flex-wrap items-end gap-6">
              <figure>
                <div className="arch relative h-56 w-44 overflow-hidden bg-linen-deep">
                  <Image
                    src="/images/dr-ken-goodwin-portrait.jpg"
                    alt="Dr. Ken Goodwin"
                    fill
                    sizes="176px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="t-caption mt-3">Arch</figcaption>
              </figure>
              <figure>
                <div className="arch-full relative h-44 w-44 overflow-hidden bg-linen-deep">
                  <Image
                    src="/images/team-group-porch.jpg"
                    alt="The Park Place Dental team"
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="t-caption mt-3">Full round</figcaption>
              </figure>
            </div>
            <p className="mt-4 text-[0.78rem] text-taupe">
              The arch is the column silhouette applied to photography.
            </p>
          </Row>

          <Row label="Shadows">
            <div className="flex flex-wrap gap-6">
              {(["sm", "md", "lg"] as const).map((s) => (
                <div
                  key={s}
                  className="flex h-24 w-32 items-center justify-center rounded-[1rem] bg-white text-[0.78rem] text-taupe"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                >
                  shadow {s}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.78rem] text-taupe">
              Warm brown tint, rgba(74, 55, 41). Never cool grey.
            </p>
          </Row>
        </div>
      </section>

      {/* Motion */}
      <section className="shell pt-20">
        <h2 className="t-h2">Motion</h2>
        <p className="t-lead mt-4 max-w-2xl">
          Everything shares one curve so the whole site moves with a single
          sense of weight. Content settles rather than bounces.
        </p>

        <div className="mt-10">
          <Row label="Easing">
            <p className="font-mono text-[0.85rem] text-espresso">
              cubic-bezier(0.16, 1, 0.3, 1)
            </p>
            <p className="mt-3 text-[0.78rem] text-taupe">
              A long ease out. Fast to start, slow to arrive.
            </p>
          </Row>

          <Row label="Section entrance">
            <p className="text-[0.9rem] text-taupe">
              Opacity 0 to 1, y 28px to 0, over 850ms. Fires once, at 25 percent
              visibility.
            </p>
          </Row>

          <Row label="Stagger">
            <p className="text-[0.9rem] text-taupe">
              90ms between children. Used for card grids, service rows and the
              proof point figures.
            </p>
          </Row>

          <Row label="Headline">
            <p className="text-[0.9rem] text-taupe">
              Each line sits inside an overflow mask and slides up from beneath
              it over 1100ms, which reads as typesetting rather than a fade.
            </p>
          </Row>

          <Row label="Scroll linked">
            <p className="text-[0.9rem] text-taupe">
              Hero photograph drifts to 16 percent while the copy drifts to 38
              percent and fades. Section images uncover with a clip path. The
              smile gallery pair drifts in opposite directions.
            </p>
          </Row>

          <Row label="Reduced motion">
            <p className="text-[0.9rem] text-taupe">
              Under prefers-reduced-motion every animation and transition is
              reduced to 0.01ms, the marquee and the glint stop, and smooth
              scrolling is switched off.
            </p>
          </Row>
        </div>
      </section>

      {/* Layout */}
      <section className="shell pt-20">
        <h2 className="t-h2">Layout and spacing</h2>
        <div className="mt-10">
          <Row label="Base unit">
            <p className="text-[0.9rem] text-taupe">8px</p>
          </Row>
          <Row label="Shell">
            <p className="text-[0.9rem] text-taupe">
              Max width 78rem, 1248px. Gutters of 24px, rising to 40px from the
              medium breakpoint.
            </p>
          </Row>
          <Row label="Section rhythm">
            <p className="text-[0.9rem] text-taupe">
              120px block padding on desktop, 72px on small screens.
            </p>
          </Row>
          <Row label="Radius">
            <p className="text-[0.9rem] text-taupe">
              Pill for anything interactive. 1.25rem for cards. The arch for
              photography.
            </p>
          </Row>
        </div>
      </section>

      {/* Writing */}
      <section className="shell pt-20">
        <h2 className="t-h2">Writing</h2>
        <div className="mt-10">
          <Row label="No em dashes">
            <p className="text-[0.9rem] text-taupe">
              House rule, no exceptions. Rewrite with a comma, a full stop, or a
              conjunction. A check script enforces this across the whole
              repository.
            </p>
          </Row>
          <Row label="The doctor">
            <p className="text-[0.9rem] text-taupe">
              Dr. Ken Goodwin. The old site says Kevin on the homepage. It is
              wrong.
            </p>
          </Row>
          <Row label="Voice">
            <p className="text-[0.9rem] text-taupe">
              Warm and plain. This is a hometown practice with 43 years behind
              it, so the copy states what it does and leaves the superlatives
              alone.
            </p>
          </Row>
        </div>
      </section>
    </div>
  );
}
