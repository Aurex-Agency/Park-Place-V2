# Park Place Dental, design system

Booneville, Mississippi. Built for the site at `parkplace-dental.com`.

The brief was the layout, motion and editorial calm of
[augusthealth.com](https://www.augusthealth.com), recoloured to white, brown
and rose gold, and warmed up into something that reads like a hometown
practice rather than a healthcare startup.

---

## The idea in one line

Warm linen canvas, brown ink, and rose gold as the only accent, appearing flat
for everyday work and polished for the brand moments.

Three decisions carry the whole system:

1. **The canvas is never pure white.** Linen `#FAF6F2` under everything, with
   white reserved for cards that need to lift off it. Pure white reads clinical,
   which is the exact feeling a dental practice needs to avoid.
2. **The ink is never black.** Espresso `#2A1E17` for headlines, taupe
   `#75604F` for body. Brown text on a warm ground feels like print.
3. **Shadows are warm.** Every shadow is tinted `rgba(74, 55, 41, …)`. A cool
   grey shadow on a warm canvas is the single fastest way to make a page look
   like a template.

The practice already had a mark, an Ionic column set above and below Roman
capitals. That column is the source of two things: the metallic rose gold
finish, and the arch shape used on photography throughout the site.

---

## Colour

Contrast ratios are measured against the linen canvas. Anything used for body
copy clears 4.5:1. Anything below that is restricted to large display type or
pure decoration, and the style guide states which is which.

### Neutrals

| Token | Hex | Role |
| --- | --- | --- |
| `--color-white` | `#FFFFFF` | Card and panel surfaces |
| `--color-linen` | `#FAF6F2` | Page canvas |
| `--color-linen-deep` | `#F2EAE2` | Alternating section band |
| `--color-blush` | `#F8E9E2` | Rose tinted wash |
| `--color-sand` | `#E2D6CA` | Hairlines and borders |
| `--color-sand-deep` | `#CBB9A8` | Outline button borders |

### Browns, the ink

| Token | Hex | On linen | Role |
| --- | --- | --- | --- |
| `--color-espresso` | `#2A1E17` | 15.06:1 | Headlines and primary text |
| `--color-walnut` | `#4A3729` | 10.45:1 | Footer and dark sections |
| `--color-taupe` | `#75604F` | 5.51:1 | Body copy |
| `--color-taupe-light` | `#8B7566` | 4.04:1 | Decoration and large type only |

`--color-taupe-light` is the brown of the printed logo. It fails AA at body
sizes, so it is deliberately not a text colour. This was caught during the
build: the first palette used it for all body copy and it failed at 4.04:1.

### Rose gold, the accent

| Token | Hex | On linen | Role |
| --- | --- | --- | --- |
| `--color-rose` | `#B87A68` | 3.24:1 | Flat accent, icons, large type |
| `--color-rose-deep` | `#96543F` | 5.37:1 | Accent text, primary buttons |
| `--color-rose-soft` | `#E7C4B6` | on walnut 6.94:1 | Accents on dark grounds |
| `--color-rose-wash` | `#FBF0EB` | surface | Tinted card backgrounds |

Rose gold is the only accent in the system. There is no secondary colour, no
semantic green or red. When something needs emphasis it gets rose, weight, or
space, and nothing else.

---

## Polished rose gold

The brief asked for rose gold that looks like the finish on a good watch. A
two stop gradient will not do that. Real polished metal shows banded
reflections of its environment, with a narrow near-white specular highlight
where it catches a light.

There are two ramps, and the difference matters:

**`--metal-rose`**, the display ramp. Fourteen stops, including a near-white
band at 25 percent. Used for the mark, for surfaces, and for very large type on
dark grounds.

**`--metal-rose-text`**, the type ramp. The bright stops of the display ramp
disappear against linen, so this variant caps its lightest value at `#B8735A`,
which holds 3.46:1 on linen and 3.72:1 on white. Used for every metal filled
figure and numeral on the site.

The style guide page renders both side by side so the reason for the split is
visible rather than asserted.

**`--metal-rose-hairline`** draws the short rule beside every eyebrow and the
divider in the footer. A slow glint travels across it on a 7 second loop, and
stops completely under reduced motion.

An early version of the hairline faded to transparent at both ends. At the
32px width used beside an eyebrow that produced two visible strokes, which
read as a pair of dashes. It is now solid across its width.

### How the mark is rendered

`public/images/logo-mark.png` and `logo-lockup.png` are flat silhouettes cut
from the practice's printed logo. They are applied as CSS masks and the metal
gradient is painted behind them, so one asset carries any size and any finish.
`MetalMark` and `MetalLockup` in `src/components/ui/MetalMark.tsx` take a
`finish` of `metal`, `espresso` or `linen`.

---

## Typography

Three families, each with exactly one job.

**Cinzel** for brand labels only. It is a Roman capital face and it matches the
lettering in the practice's own wordmark. Used at 12px with 0.24em tracking for
every eyebrow and footer column heading. Never for anything longer than four
words.

**Source Serif 4** at weight 400 for every headline. It is never bolded, on the
principle borrowed from the reference: an editorial serif used at a single
weight reads as literary and settled, and bolding it makes it shout.

**DM Sans** at 400 and 500 for body copy, navigation, buttons and forms.

### Scale

| Class | Size | Line height | Use |
| --- | --- | --- | --- |
| `.t-display` | `clamp(2.75rem, 6.2vw, 5rem)` | 1.06 | Hero only |
| `.t-h1` | `clamp(2.25rem, 4.6vw, 3.5rem)` | 1.08 | Section headlines |
| `.t-h2` | `clamp(1.75rem, 3.2vw, 2.5rem)` | 1.14 | Sub-sections |
| `.t-h3` | `clamp(1.3rem, 2vw, 1.6rem)` | 1.25 | Card titles |
| `.t-eyebrow` | 12px, 0.24em tracking | | Section labels |
| `.t-lead` | `clamp(1.06rem, 1.35vw, 1.25rem)` | 1.62 | Section intros |
| body | 17px | 1.65 | Everything else |

---

## Layout

- Base unit 8px.
- `.shell` is 78rem (1248px) with 24px gutters, rising to 40px at `md`.
- `.section` is 120px block padding on desktop, 72px on small screens.
- Cards are 2rem padding, 1.25rem radius.
- Anything interactive is a full pill.
- Photography uses `.arch` (a rounded top on square feet) or `.arch-full`.
  The arch is the column silhouette applied to images, and it is what keeps the
  site from reading as a straight recolour of the reference.

---

## Motion

One easing curve across the entire site, `cubic-bezier(0.16, 1, 0.3, 1)`. A
long ease out: quick to leave, slow to arrive. Content settles rather than
bounces. Nothing springs.

Built on Motion (`motion/react`), following the patterns in the Motion codex
for `whileInView` and `useScroll`.

| Behaviour | Spec |
| --- | --- |
| Section entrance | opacity 0 to 1, y 28 to 0, 850ms, once, at 25 percent visibility |
| Stagger | 90ms between children |
| Headline | each line masked by `overflow: hidden` and slid up from beneath over 1100ms |
| Hero photograph | drifts to 16 percent of scroll, copy drifts to 38 percent and fades out |
| Section images | uncover with a `clip-path` inset tied to scroll |
| Smile gallery | the two cases drift in opposite directions |
| Header | condenses and frosts past 24px of scroll |
| Insurance band | 48 second marquee, masked at both edges |
| Buttons | lift 2px over 400ms |
| Text links | rule draws in from the left, retracts to the right |

Primitives live in `src/lib/motion.ts` and `src/components/ui/Reveal.tsx`. Use
`<Reveal>`, `<RevealGroup>` and `<RevealItem>` rather than hand rolling
variants, so the timing stays consistent as pages are added.

### Reduced motion

Under `prefers-reduced-motion: reduce`, every animation and transition is cut to
0.01ms, the marquee and the glint stop entirely, and smooth scrolling is turned
off. This is handled once in `globals.css` and needs no per-component work.

---

## Writing

**No em dashes.** House rule, no exceptions. Rewrite with a comma, a full stop,
or a conjunction. The near misses count too: en dashes used as punctuation
between words, double hyphens, and the HTML em dash entities.

`npm run check:copy` enforces this across the repository and exits non-zero, so
it can gate a build. It checks dash characters everywhere, and checks double
hyphens in prose only, since CSS custom properties legitimately use two.

The live site's approved copy contained eight em dashes. All of them were
rewritten during the port. One patient review contained a double hyphen, which
became a comma.

**The doctor is Dr. Ken Goodwin.** The live homepage says Kevin. His own bio
page says Ken. Ken is correct.

**Voice.** Warm and plain. This is a practice with 43 years behind it in a town
of 8,000 people. The copy says what it does and leaves the superlatives alone.

---

## What the reference gave us, and what we changed

Kept from August Health: the editorial serif at a single weight, the generous
vertical rhythm, the pill geometry, the warm non-white canvas, the concentrated
use of one accent, the tinted-shadow depth model, and the calm scroll-triggered
reveals.

Changed for Park Place: indigo and violet became rose gold and brown; the
circular portrait halos became architectural arches drawn from the practice's
column mark; the SaaS product screenshots became real photographs of the team
and the office; and the accent gained a polished metal treatment, which the
reference does not have at all.
