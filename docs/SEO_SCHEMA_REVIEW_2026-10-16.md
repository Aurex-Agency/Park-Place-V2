# SEO and schema review, 2026-10-16

Removed the fixed Friday 08:30-17:00 structured-data hours because the visible practice record says Friday hours may vary. Retained confirmed Monday-Thursday hours and the visible Friday note.

Based on the verified Vercel production source `main` at `33daa6d0e558`. Reviewed existing SEO work before making this focused follow-up.

Validation: npm run check; SEO tests; production-domain build; 67-page HTTP SEO verification. The built-page validator parsed 143 JSON-LD blocks across 77 HTML files using the official Schema.org vocabulary and found no issues in the implemented checks. Representative homepage checks at desktop and mobile widths found no horizontal overflow, with primary conversion paths present. No production lead was submitted.

Remaining dependencies: Practice should confirm Friday scheduling. New clinical claims, credentials and treatment descriptions require clinician review.

This PR is independently reviewable. After release, recrawl production and recheck Search Console; local validation does not guarantee Google indexing or rich-result display.
