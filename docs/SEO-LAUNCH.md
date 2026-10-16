# Patient search growth: September 2026

## What this change addresses

The September 25 audit found a technically accessible site with 60 sitemap URLs, but limited search visibility and no GA4 key events in the inspected report. This release adds three patient decision guides, stronger local service headings, contextual discovery links, corrected About-page breadcrumbs, and GA4 events for successful requests. It preserves existing URLs and redirects.

The aim is qualified calls and appointment requests from Booneville and nearby communities. More impressions or visits alone are not evidence of more patients. This release cannot guarantee search positions, AI citations or a traffic multiplier.

## Why these three articles

| Article path after `/patient-resources/blog/` | Search intent and differentiation | Next step |
| --- | --- | --- |
| `broken-denture-repair-reline-replacement` | A broken or loose denture and what happens next. Distinguishes repair, fit and replacement rather than duplicating the existing implant-supported denture comparison. | Call for assessment; dentures service page. |
| `same-day-vs-traditional-crowns` | Comparing crown workflows and time away from work. Explains suitability and appointment planning rather than repeating the existing lab overview. | Crown consultation; crowns and bridges service page. |
| `implants-bridges-partial-dentures` | Comparing missing-tooth options before choosing treatment. Connects existing implant costs and denture articles to a broader decision. | Restorative consultation and relevant service pages. |

These are intent hypotheses grounded in the practice's services and lab, not measured keyword-volume claims. The observed GSC data supports local dentist demand and early implant-cost impressions; it does not establish volume for each new topic. Evaluate the articles separately after they are indexed. Keep the existing service pages as the primary local treatment landing pages.

Each guide has a direct answer, comparison table, questions to bring to an appointment, visible primary-source links, FAQs, original practice images, relevant service links and an appointment CTA. Articles are server-rendered and added automatically to the sitemap and blog index. Homepage, relevant service and location pages link to the guides; related articles use topic and service relevance.

New articles are attributed to Park Place Dental. They do not claim Dr. Goodwin reviewed or authored new material. A clinician should review clinical wording before publication, and only an actual review should produce a reviewer attribution/date. Existing article authorship is preserved; a content edit no longer automatically claims a new clinical review.

## Research sources

Patient-education references checked September 25, 2026 and linked next to relevant article content:

- [ADA: crowns](https://www.mouthhealthy.org/all-topics-a-z/crowns) and [Cleveland Clinic: dental crowns](https://my.clevelandclinic.org/health/treatments/10923-dental-crowns): indications and same-day versus conventional workflow.
- [American College of Prosthodontists: relined dentures](https://www.gotoapro.org/relined-dentures/) and [denture questions](https://www.gotoapro.org/dentures-faq/): fit assessment, repairs and replacement.
- [ADA: partial dentures](https://www.mouthhealthy.org/all-topics-a-z/dentures-partial) and [NHS: dentures](https://www.nhs.uk/tests-and-treatments/dentures/): professional repairs and bringing broken parts.
- [ADA: implants](https://www.mouthhealthy.org/all-topics-a-z/implants), [ADA: bridges](https://www.mouthhealthy.org/all-topics-a-z/bridges), [Cleveland Clinic: bridges](https://my.clevelandclinic.org/health/treatments/10921-dental-bridges), and [Leeds Teaching Hospitals: partial dentures](https://www.leedsth.nhs.uk/patients/resources/removable-partial-dentures/): support, planning and care distinctions.

No fabricated treatment prices, turnaround guarantees, reviews, search volumes or additional clinic locations are introduced. The existing implant estimate article also removes an unsupported claim that in-house work eliminates a laboratory fee.

## Measurement after deployment

Repository changes cannot activate a GA4 property setting or validate a GSC issue. Complete these steps on the production deployment:

1. Check GA4 property `553389000`, tag `G-DRM0YMY3XZ`. Confirm one `generate_lead` event after an explicitly coordinated successful test request. Do not submit a real appointment casually as a test. Confirm a failed request produces `lead_failed`, not `generate_lead`.
2. Mark `generate_lead` as a key event. It means the endpoint accepted the request, not that the practice booked or completed a visit. `form_type` is limited to appointment/contact/unknown. Do not add names, email addresses, phone numbers, treatment reasons or message text to event parameters.
3. Keep `call_started` as the existing telephone-link click metric. It does not measure connected calls. Report form requests and phone clicks separately; do not sum them as unique patients. The small GA initializer now queues early interactions while the remote tag loads lazily. Previews continue to omit analytics.
4. Check production form delivery and recipient confirmation with the office. Email credentials, provider delivery and production configuration were not exercised by local tests. Duplicate simultaneous submissions are guarded on the client; this is not server-side idempotency.
5. In GSC, confirm the canonical non-www sitemap contains 63 URLs. Inspect the three new articles and request indexing once available. Validate the About-page breadcrumb fix after Google's live test sees the deployment. Keep tracking the previously discovered but unindexed location pages; do not repeatedly submit them or treat normal redirects/assets as content errors.
6. Compare complete 28-day periods for organic landing-page sessions, engagement, successful requests and phone clicks. In GSC separate branded/nonbranded queries, service/location/article pages and relevant locations. Track available AI search impressions alongside clicks and leads; referral traffic alone cannot measure all AI exposure.

## Older website and local authority

The older `parkplace-dental.com` site remains outside this repository change. When retiring it, map its useful URLs to the closest equivalent on `parkplacedentist.com`, deploy permanent redirects on the old host, and retain control of the domain. Simply taking the old site offline would lose visitors and any transferable link signals. Test every mapping before changing DNS or hosting.

After the new production pages are live, confirm the Google Business Profile website/appointment links, category, hours and address with the practice; keep important directory entries consistent. These external account changes are not part of this PR. Avoid new listings that imply offices in nearby towns: the office is in Booneville.

## Validation and rollback

Run from the repository root using Node 24 and Python 3:

```sh
npm run check
node --test tests/analytics-events.test.mjs
VERCEL_ENV=production npx next build --webpack
python3 tests/check-built-seo.py
```

The default Turbopack build was blocked locally by an OS port-binding restriction during CSS processing, including on retry with elevated tool access. The Webpack production build passed with all 74 generated routes. The production build command in package.json remains unchanged; the deployment build must also pass before merging.

The generated-output check verifies 63 sitemap pages, one H1 each, unique titles/descriptions, matching production canonicals, indexability, required breadcrumb URLs, article images, new editorial attribution, contextual guide links and internal destinations. Four event tests cover success/failure mapping, allowed parameters, missing/blocked analytics and the early event queue. Desktop and phone-sized browser previews were checked. These checks do not establish Google indexing, rich-result eligibility, live email delivery or field Core Web Vitals.

Rollback is a normal revert of this PR. Existing paths and their redirects are retained. Do not remove newly published article URLs later without choosing appropriate redirects.
