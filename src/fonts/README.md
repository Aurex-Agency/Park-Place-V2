# Fonts

Both families are self-hosted variable fonts from [Fontshare](https://www.fontshare.com),
licensed under the ITF Free Font License (a copy sits beside them in
`ITF-Free-Font-License.txt`), which permits self-hosting for commercial use.

| File | Family | Axes | Size |
| --- | --- | --- | --- |
| `Zodiak-Variable.woff2` | Zodiak | weight 100 to 900 | 37 KB |
| `Zodiak-VariableItalic.woff2` | Zodiak italic | weight 100 to 900 | 44 KB |
| `PlusJakartaSans-Variable.woff2` | Plus Jakarta Sans | weight 200 to 800 | 59 KB |

One variable file per family covers every weight the site uses, so adding a
weight later costs no extra download. They are wired up in `src/app/layout.tsx`
through `next/font/local`, which fingerprints and serves them from our own
origin. Nothing is fetched from Fontshare at runtime.
