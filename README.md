# Park Place Dental

Website for Park Place Dental, 403 N 3rd St, Booneville, Mississippi.

Next.js 16 (App Router), React 19, Tailwind v4, and Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run check:copy` | Fails if an em dash reaches the copy |
| `npm run check` | Copy check, then TypeScript, then lint |

## What is here so far

- The full design system, documented at [`docs/DESIGN.md`](docs/DESIGN.md) and
  rendered as a live reference at `/style-guide`.
- The homepage, complete, with all ten sections and their motion.
- Site header, navigation and footer.
- All approved copy, ported from the live site into `src/lib/content.ts`.
- Twenty photographs from the practice, plus the logo prepared as a mask.

The interior pages are not built yet. Links to them resolve to 404 for now, so
you will see prefetch 404s in the console. That is expected at this stage.

## Where things live

```
src/
  app/
    globals.css        the design system, all tokens and primitives
    layout.tsx         fonts, metadata, local business structured data
    page.tsx           homepage composition
    style-guide/       live design system reference, noindex
  components/
    site/              header and footer
    home/              the ten homepage sections
    ui/                Button, Eyebrow, MetalMark, Reveal
  lib/
    content.ts         every word on the site, in one file
    motion.ts          shared variants, easing, viewport config
scripts/
  check-copy.mjs       the em dash guard
docs/
  DESIGN.md            the design system, written out
```

All copy lives in `src/lib/content.ts`. Components never hardcode a sentence.
Change it there and it changes everywhere.

## Two things to know before editing

**No em dashes.** House rule. `npm run check:copy` enforces it and exits
non-zero, so it can gate a deploy. It also catches en dashes used as
punctuation between words, double hyphens, and HTML em dash entities.

**The doctor is Dr. Ken Goodwin.** The current live site says Kevin on the
homepage. That is wrong, and it is corrected here.

## The hero image

The hero reads `/images/hero-entryway.jpg`.

There is currently a **placeholder** at that path, a copy of the operatory
photograph, so the layout is not empty. Drop the rendered entryway image in at
that exact filename to replace it. No code change needed.

```bash
cp ~/path/to/entryway-render.jpg public/images/hero-entryway.jpg
```

Landscape, at least 2400px wide. The hero scrim is tuned for a warm, moody
image with the light falling to the right, which is how the render is composed.

## Photographs

The twenty images in `public/images` came from the practice's shared drive and
are named for what they show. Two things worth flagging before launch:

- `smile-before-after-2.jpg` carries a visible "PicCollage" watermark.
- `goodwin-treating-patient.jpg` has a social media sticker burned into it. It
  is unused for that reason.

Both would be worth replacing with clean originals.
