# Park Place Dental

Website for Park Place Dental, 403 N 3rd St, Booneville, Mississippi.

Production domain: **parkplacedentist.com**. The practice's previous site is at
parkplace-dental.com, which is where the approved copy was ported from.

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

## What is here

All 37 pages, the full design system, and every link on the site resolving.

- The design system, documented at [`docs/DESIGN.md`](docs/DESIGN.md) and
  rendered as a live reference at `/style-guide`.
- The homepage, complete, with all ten sections and their motion.
- Every interior page: five service categories, fourteen treatment pages,
  three about pages, the technology page, new patient pages, patient
  resources, contact, booking, and the legal pages.
- A sitemap and robots file generated from the same data the pages are built
  from, so a new service cannot ship without appearing in both.
- All approved copy, ported from the live site.
- Twenty photographs from the practice, plus the logo prepared as a mask.

### How the pages are built

Interior pages are data, not markup. `src/content/services.ts` and
`src/content/pages.ts` hold the copy as a small block vocabulary: running
prose, a plain list, defined terms, a numbered sequence. `Blocks.tsx` renders
those four shapes, and `SimplePageView.tsx` composes a header, blocks and a
closing band.

Keeping the vocabulary that small is deliberate. It is what stops thirty pages
drifting into thirty layouts, and it means a copy change is a text edit rather
than a component edit. The service routes are dynamic with
`generateStaticParams`, so adding a treatment is one entry in the data file and
it appears in the navigation, the category page, the sibling links and the
sitemap at once.

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

## Domain and absolute URLs

Canonical tags, the share card image, the sitemap and robots all resolve their
origin through `src/lib/site.ts`. Nothing hardcodes a domain in a page.

| Where | Origin used |
| --- | --- |
| Production | `https://parkplacedentist.com` |
| Preview | that deployment's own URL |
| Local | `http://localhost:3000` |

Previews deliberately stay on their own URL. A preview whose share card points
at production shows the production image, not the build being reviewed.

`NEXT_PUBLIC_SITE_URL` overrides all of it. Set it in Vercel if you need to pin
the origin, for example to keep production on the vercel.app URL while DNS for
the real domain is still propagating.

Two things worth doing at launch, both outside this repository:

- Point parkplacedentist.com at the Vercel project.
- 301 redirect the old parkplace-dental.com to the matching page here, so the
  years of history on the old domain follow the practice across rather than
  competing with the new site.

## Two things to know before editing

**No em dashes.** House rule. `npm run check:copy` enforces it and exits
non-zero, so it can gate a deploy. It also catches en dashes used as
punctuation between words, double hyphens, and HTML em dash entities.

**The doctor is Dr. Ken Goodwin.** The current live site says Kevin on the
homepage. That is wrong, and it is corrected here.

## The hero image

The entryway render is in place at `public/images/hero-entryway.png`.

It is kept as a PNG because the image is mostly dark with wide, smooth
gradients, which is where a re-encoded JPEG would band. Next serves AVIF and
WebP from it either way.

The file is 1672px wide, which is its native size. The srcset is capped there
so Next does not upscale. If a larger export exists it is worth dropping in,
since 1672px is a little soft on a high density desktop display. Same filename,
no code change.

The hero layout is tuned to this specific frame. If the image is ever swapped
for a different composition, re-check the copy against it. There is a note in
[`docs/DESIGN.md`](docs/DESIGN.md) explaining how the safe text zone was
measured.

## Photographs

The twenty images in `public/images` came from the practice's shared drive and
are named for what they show. Two things worth flagging before launch:

- `smile-before-after-2.jpg` carries a visible "PicCollage" watermark.
- `goodwin-treating-patient.jpg` has a social media sticker burned into it. It
  is unused for that reason.

Both would be worth replacing with clean originals.
