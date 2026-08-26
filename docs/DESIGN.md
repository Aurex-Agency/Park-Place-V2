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
| `--color-rose-soft` | `#E7C4B6` | on walnut 6.94:1 | Accents on flat dark surfaces |
| `--color-rose-mist` | `#F0D5C9` | over the hero photo 5.11:1 | Accents over photography |
| `--color-rose-wash` | `#FBF0EB` | surface | Tinted card backgrounds |

`--color-rose-soft` clears 4.5:1 against the flat walnut of the footer, but not
against the brightest part of the hero photograph. `--color-rose-mist` is the
over-image variant. The rule is simple: flat ground uses soft, photography uses
mist.

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

**`--metal-rose-hairline`** draws rules that do structural work: the edge of a
service row, the top of a technology row, the divider above the footer.

It is not used as decoration beside a label. There was a short stroke next to
every eyebrow for a while and it had to go: a little dash floating beside a
tracked-caps label is one of the most worn tells of a generated layout, and the
capitals carry the job on their own. The travelling glint that lived on those
strokes went with them, since nothing else wanted it.

The test for whether a rule belongs is whether it is doing something. An edge,
a division, a boundary: keep. A flourish beside a word: cut.

### How the mark is rendered

`public/images/logo-mark.png` and `logo-lockup.png` are flat silhouettes cut
from the practice's printed logo. They are applied as CSS masks and the metal
gradient is painted behind them, so one asset carries any size and any finish.
`MetalMark` and `MetalLockup` in `src/components/ui/MetalMark.tsx` take a
`finish` of `metal`, `espresso` or `linen`.

---

## Typography

Three families, each with exactly one job.

Two families, both self-hosted variable fonts from Fontshare under the ITF
Free Font License. One file each covers the whole weight range, so adding a
weight later costs no extra download, and nothing is fetched from Fontshare at
runtime.

**Zodiak** carries the voice: every headline, the eyebrow labels, the pull
quotes and the counting figures. Used at weight 400, never bolded, on the
principle borrowed from the reference: an editorial serif at a single weight
reads as literary and settled, and bolding it makes it shout.

**Plus Jakarta Sans** does the functional work: body copy, navigation, buttons
and forms.

The header wordmark is no longer type at all. It is the practice's own
lettering, masked from their logo art, because no substitute matches a real
wordmark and that art was already on disk.

Zodiak sets wider than the previous display face, so the display scale came
down a step when it landed. Anything that changes the type has to be followed
by a check that the authored headline breaks still hold.

### Scale

| Class | Size | Weight | Use |
| --- | --- | --- | --- |
| `.t-display` | `clamp(2.35rem, 4.5vw, 4rem)` | 500 | Hero only |
| `.t-h1` | `clamp(2rem, 4.1vw, 3.15rem)` | 500 | Section headlines |
| `.t-h2` | `clamp(1.6rem, 3vw, 2.3rem)` | 500 | Sub-sections |
| `.t-h3` | `clamp(1.35rem, 2vw, 1.65rem)` | 500 | Card titles |
| `.t-eyebrow` | 13px, 0.2em tracking | 600 | Section labels |
| `.t-lead` | `clamp(1.15rem, 1.45vw, 1.35rem)` | 460 | Section intros |
| body | 18px | 480 | Everything else |

Headlines are set at 500 rather than 400. The single weight rule came from the
reference site, not from this brand, and Zodiak at 500 still reads editorial
rather than loud. Both families are variable, so a weight costs no download.

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

Two curves, two jobs.

`EASE`, `cubic-bezier(0.16, 1, 0.3, 1)`, is a long ease out for entrances.
Things arrive and settle.

`SNAP`, `cubic-bezier(0.165, 0.84, 0.44, 1)`, is ease out quart, for hovers and
micro-interactions. It leaves quickly and lands sooner, which is what makes a
hover feel answered rather than sleepy. This is the curve the reference site
uses for every one of its own micro-interactions, at 0.32s and 0.44s.

Nothing springs except the pointer-following preview, where a spring is the
point.

Built on Motion (`motion/react`), following the patterns in the Motion codex
for `whileInView` and `useScroll`.

| Behaviour | Spec |
| --- | --- |
| Section entrance | opacity 0 to 1, y 28 to 0, 850ms, once, at 25 percent visibility |
| Stagger | 90ms between children |
| Headline | each line masked by `overflow: hidden` and slid up from beneath over 1100ms |
| Hero photograph | parallax, see below |
| Section images | uncover with a `clip-path` inset tied to scroll |
| Smile gallery | the two cases drift in opposite directions |
| Header | frosts past 24px of scroll. Its height never changes |
| Insurance band | 48 second marquee, masked at both edges |
| Testimonials | three columns drifting up at 34, 39 and 44 seconds, masked top and bottom, paused on hover |
| Buttons | lift 2px over 400ms |
| Text links | rule draws in from the left, retracts to the right |

Primitives live in `src/lib/motion.ts` and `src/components/ui/Reveal.tsx`. Use
`<Reveal>`, `<RevealGroup>` and `<RevealItem>` rather than hand rolling
variants, so the timing stays consistent as pages are added.

### Hero parallax

The photograph travels down as the page travels up, so it reads as moving
slower than everything around it. Two rules make it safe.

**The layer must be taller than the section.** It is 130% tall with 15% of
slack above and below. A layer sized exactly to the section pulls its own top
edge into view the moment it moves, showing a band of bare background under the
header. That was a real bug here: at 800px of scroll the layer's top edge had
separated from the section's by 111px. The gap is now asserted at every scroll
position rather than trusted.

**Depth comes from the difference between layers, not from one big move.** The
image travels 12% of the layer, roughly 0.84 of page speed, and gains a slow
push in from scale 1 to 1.08. The copy moves the other way, up 26%, and fades
out by 62% of the section. Buying a stronger effect by making the layer taller
would upscale a 1672px render and soften the hero from the first frame, so the
extra depth is taken from the foreground instead, where it is free.

Scaling up only ever adds coverage, which is why the push in needs no slack of
its own.

### Headline reveals

Every section headline rises out from behind a mask, one line at a time, 85ms
apart. Lines are split on an explicit separator rather than by measuring the
wrap, so the break points are a typographic decision.

The trigger watches the heading, not the moving spans. Each span starts
translated a full line below its own `overflow-hidden` mask, so it is clipped
out of rendering entirely. An `IntersectionObserver` on the span itself never
reports it visible, `whileInView` never fires, and the line stays hidden
forever. This is a real deadlock that shipped hidden headings across the whole
homepage before it was caught. Observe the unclipped parent.

### The two showcase hovers

**Comprehensive Care Under One Roof.** Pointing at a row springs a photograph
of that service to the pointer and trails it, tilting slightly with the speed
of the move. Underneath, a rose wash and a rose rule wipe in from the left, the
title and body shift right, the service chips lift in sequence, the index
numeral brightens, and the arrow leaves its circle while a second arrives.

The preview only renders where `(hover: hover) and (pointer: fine)` matches. A
panel that chases a pointer is meaningless on a touch screen, so it is not
built there at all rather than shown and left stranded.

**Advanced Dental Technology.** Selection drives the copy, so the section stays
keyboard and screen reader friendly. Hover only previews the photograph, which
is decorative, so pointing at a row shows it without committing and leaving
restores the selected one. Photographs wipe in behind a clip path rather than
cross-fading, so a change of row reads as a deliberate change of slide.

### Counting figures

The proof points and the years medallion count up when they scroll into view.
Years count from a near value rather than zero. Figures are set in tabular
numerals so a number counting up cannot nudge the layout, and the static value
is rendered first so it is correct before hydration and in search results.

### Marquees

The testimonial columns are a CSS animation rather than a JS loop, so they run
on the compositor and the reduced motion rule switches them off without any
per-component work.

The list is rendered twice and translated by -50%. For the seam to be
invisible, that translate has to land on exactly one period. A list of four
cards with three gaps is 4c + 3g tall, so -50% is 2c + 1.5g, while the real
period is 2c + 2g. The list is short by half a gap and jumps every cycle. The
fix is one gap of padding on the trailing edge, which makes the height 4c + 4g
so -50% is exactly 2c + 2g. The testimonial columns carry it, and the
mismatch is measured in the checks.

The accepted carriers used to scroll the same way and it could not work.
Eleven carriers is a track about 1457px wide, so on any display wider than that
the loop seam is on screen and the same carrier appears twice at once, which
reads as a data error rather than a loop. On a 2560px display over a thousand
pixels of the set repeats. No amount of padding closes that gap. It is also the
wrong behaviour for the content, since the one job of that list is letting a
patient find their own insurer and moving text is harder to scan than still
text. It is now a static wrapped grid and the motion lives in how it arrives.

Testimonial columns pause on hover and on focus within, so a review can be
read. The duplicated set is `aria-hidden`, so screen readers hear each review
once.

### Sections that must be on every page live in the layout

The FAQ block and the location block are rendered by the root layout, not by
each page. A page cannot be added without them, which is the point: coverage by
construction rather than coverage by discipline.

The two routes that already own that content, the FAQs page and the contact
page, opt out through a small route gate rather than showing it twice.

The site-wide FAQ block carries six of the ten questions and links to the rest.
All ten on thirty seven pages would bury every page under the same block and
hand search engines the same answers thirty seven times. The FAQPage structured
data stays on the FAQs page alone for the same reason.

### Ask more than once

Every interior page carries a call to action in the header, one in the middle
of the copy, one in the closing band, and one beside the map. Between seven and
eleven booking or calling links per page. A reader who is convinced part way
down should never have to scroll to find the ask.

The booking page suppresses its own header call to action, since inviting
somebody to book on the page where they are already booking is noise.

### Interior pages are data

Every interior page is a header, a stack of blocks and a closing band. The
blocks come in four shapes only: running prose, a plain list, defined terms,
and a numbered sequence. Thirty seven pages share them.

Resist adding a fifth shape. Each one multiplies across every page that might
use it, and a page that needs something genuinely new is usually a page whose
copy has not been thought through yet.

### Colour on dark sections is not the same colour

`--color-rose-deep` reads at 5.37:1 on linen and 2.80:1 on espresso. An eyebrow
that is correct on a light section is a contrast failure on a dark one. That is
why `Eyebrow` takes a named `tone` rather than a colour class: the decision is
which ground the component is standing on, and naming it that way makes the
wrong choice hard to make by accident.

The same trap caught two figures. Fading a numeral to 35 percent opacity put it
at 1.65:1, and an inactive row numeral at 40 percent white on espresso sat at
3.55:1. Both now shift colour rather than fade. If a state change needs to be
quieter, move the colour, do not thin it.

### Transitions must name the property that actually changes

Tailwind v4 compiles `-translate-y-2` to the `translate` property and `scale-*`
to `scale`, not to `transform`. A transition list naming only `transform` never
animates them, so the element snaps to its hover position while whatever else
is in the list animates around it. That is what a broken hover looks like: not
missing, just wrong.

Worse, `translate: none` and `scale: none` are not interpolable with a length
or a number. Even with the property correctly named, an element with no resting
value jumps. Every hover that moves or scales carries an explicit
`translate-y-0` or `scale-100` at rest so the pair can be interpolated.

Both faults were live at once on the service cards. The check is to record
computed values across the transition and count the distinct ones: fewer than
about three means it snapped.

### Font variables belong on the html element

A custom property is substituted where it is **defined**, not where it is used.
The `--font-display` token is defined on `:root`, so if the font class that
supplies `--font-zodiak` sits on `<body>` the reference resolves against
nothing, the token computes to an invalid value, and every element on the page
silently falls back to a system font. The page still looks deliberate, which is
what makes it easy to miss. The font classes go on `<html>`.

### The service list sheen

Hovering a service wipes polished rose gold across that row, with a brighter
glint travelling over it once on entry, which is what sells it as metal rather
than a tint.

A photograph sat here through two attempts and never earned its place. As a
panel chasing the pointer it covered the words. As a ground behind the list it
was either loud enough to compete or quiet enough to be pointless. The metal is
the brand's own material, carries no subject to compete with, and stays a
surface. That is the lesson worth keeping: when a decorative layer keeps
needing to be tuned down to be tolerable, it is the wrong layer.

The sheen is held at 16 percent, and it is measured. Every text run over it
reads at exactly the same ratio as over bare linen, 15.06:1 for titles and
5.51:1 for body and chips. If a change makes it more present, run that again.

### Never let motion own visibility

A headline line starts translated a full line below its own `overflow-hidden`
mask. If the animation that brings it back never runs, the text is not merely
still, it is gone.

`useReducedMotion` cannot be trusted with that. It returns the server value on
the hydration render and does not schedule a re-render, so a component that
branches on it can stay on the animated path indefinitely. That shipped once:
every masked heading was invisible to anyone browsing with reduced motion on,
while hydration, axe and the build were all healthy.

The stylesheet now pins `[data-line-mask]` back to `transform: none` under
reduced motion. CSS cannot be defeated by hydration timing or by a library
changing its mind. The JS branch is kept because it produces cleaner markup
when it does resolve in time, but it is no longer what guarantees the text is
on screen.

The general rule: when an animation is the only thing standing between the
reader and the content, the fallback belongs in CSS.

### Reduced motion

Scroll-linked transforms are not CSS animations, so the global rule does not
reach them. The hero reads `useReducedMotion()` and drops its parallax
entirely: the image holds still and the copy stays at full opacity.

Under `prefers-reduced-motion: reduce`, every animation and transition is cut to
0.01ms, the marquee and the glint stop entirely, and smooth scrolling is turned
off. This is handled once in `globals.css` and needs no per-component work.

---

## The header

The header is sticky and sits in normal flow, so its height is part of the
document. It used to animate its padding when it condensed, which changed that
height by 16px and shifted every following element up the moment you started
scrolling. It now keeps a constant height and changes only paint properties:
background, blur and shadow. The condensed look comes from a transform on the
brand lockup, which does not touch layout.

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

## The hero

The hero photograph is a render of the entryway looking through to a treatment
room. Two things about it shaped the layout.

The wall in the render carries the practice's own etched wordmark, including
the line "Booneville, Mississippi". The hero eyebrow originally read the same
words, which put them on screen twice, so the eyebrow became "Close to Home".

The bright doorway and window sit in the centre and right of the frame. Text
placed there measured 2.59:1 against the background, and no reasonable scrim
fixed it without flattening the render. Mapping the frame band by band showed
the safe zone for light text is about 34rem wide above the floor line, and the
full width below it. So the copy column is capped at 34rem, the display size
comes down to 4.25rem, and the headline breaks to three lines. That keeps every
run over the dark left mass with no extra darkening of the image.

Narrow viewports crop hard to the centre of the frame, which is the brightest
part, so below the medium breakpoint the image is positioned at 18 percent and
the second scrim is switched off. Stacking both scrims on a phone crushed the
photograph to a flat brown.

Measured against the real rendered background, with the copy hidden and each
text box read from the DOM: eyebrow 5.11:1, headline 3.58:1 at worst, subhead
4.98:1. Headlines are 68px, so 3.0:1 is their threshold.

The render is 1672px wide natively, so the srcset is capped there rather than
letting Next upscale to 3840. A larger export would sharpen it on high density
desktop displays.

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
