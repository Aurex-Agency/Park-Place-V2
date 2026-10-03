# October 2026 search and patient growth implementation

This PR preserves the 63 existing sitemap URLs and adds four patient decision guides. It starts from main after PR #12, retaining the September articles and existing GA4 events.

## Delivered in the site

- Revised all 14 town pages. Every page states that care is at the Booneville office. Removed unverified distances, drive times, competitor comparisons, invented patient patterns and single-dentist claims. Town-specific map links use the actual office address; existing service links remain.
- Refreshed the seven original articles and added practical planning questions to the three September guides. Existing slugs and publication dates stay intact; substantive edits carry October 2 modification dates. Editorial updates do not claim a new clinician review.
- Added guides about visiting without insurance, bleeding gums and cleaning options, root canal versus extraction, and whitening versus veneers. Practice authorship, citations, existing approved site photography, relevant links, metadata, sitemap inclusion and related guides are wired into the existing renderer. Clinical approval is still a release task; no clinician approval is claimed in this PR.
- Connected guides from service pages, town pages, financing and new-patient information. Comparison tables now support either two or three columns, and empty FAQ sections are omitted.
- Clarified urgent appointment availability, laboratory limitations and facial scanning versus dental imaging. Removed the unsupported endodontic specialist claim and distinguished the periodontal overview from the treatment page.
- Made breadcrumb items carry canonical URLs, including the final item. Removed unverified coordinates and the claimed service radius; the verified address and map link remain.
- Preserved existing `generate_lead`, `lead_failed` and `call_started` events. Added a guard against resubmitting a form already accepted in the same mounted form. The existing pending-request guard remains. This is client deduplication, not server idempotency or a count of booked patients.
- Prepared permanent, path-preserving redirects for both old-domain hostnames. They activate only when the legacy hosts are routed to this deployment. Current-domain requests do not match.
- IndexNow now requires explicitly named changed paths or a deliberate `--all`; a command without arguments does not send an unchanged sitemap.

## Review before merging and deploying

The practice should review the clinical and operational copy, appointment hours and publication dates. The current footer and shared office data still say Monday to Friday 8:30 to 5:00, with Friday hours varying; no evening opening is promised. No new fees, financing products, patient reviews or clinician credentials have been invented. Existing testimonials elsewhere on the site remain unchanged and still need source verification by the practice.

All four guides become public when this branch is merged and deployed. The practice may release them together or split deployment by article. The clinical review checkbox below is a release check, not a claim that it has happened.

- [ ] Clinician/editor reviews the four new guides and substantive legacy changes.
- [ ] Manager confirms current hours, services, clinician availability and published payment information.
- [ ] Confirm deployment date matches new article publication dates; change them if release is later.

## External work this repository cannot complete

### Legacy domain migration

The old site currently runs on another host. The Next.js redirect rules do not change its DNS, TLS or responses until it reaches this deployment. Before changing routing, export the old sitemap and backlink landing URLs and map them to useful current pages. The known homepage and `/contact-us` routes have direct equivalents. Same-path rules preserve other URLs; add explicit mappings for any renamed old paths above the catch-all. Do not send all old content to the homepage.

After mapping, configure the legacy domain and www hostname on the appropriate host with valid TLS. Test HTTP/HTTPS and www/non-www, representative deep links and query handling. Keep the old domain and redirects operating for at least a year. Verify both domain properties and use Search Console's migration process where applicable. Do not disable the old host until replacement routing is verified.

### Measurement and indexing

1. GA4 already has code for `generate_lead`. Confirm the deployed tag and one successful request using a coordinated test with the practice; the local checks use mocks and send no emails. Confirm failed requests do not count as leads. Mark `generate_lead` as a key event in property 553389000 if not already configured. Report phone clicks separately from connected calls and appointments. Send no patient fields or treatment descriptions to analytics.
2. Verify production sitemap has 67 canonical URLs after deployment. Inspect the new articles and selected location/service pages using current URL Inspection. Submit changed URLs with IndexNow only after they are live; Google does not use IndexNow.
3. Investigate the breadcrumb issue with a live test and validate after Google sees the fix. The September 20 indexing report is stale relative to the performance export; do not treat its discovered/crawled examples as current failures without inspection.
4. Use the Google Generative AI beta report available in this account alongside ordinary search reporting. It currently exposes impressions; do not equate them with clicks or appointments or add overlapping impressions across reports.
5. Confirm Google Business Profile, Bing Places and authoritative directory name/address/phone/domain details. Keep one real office; no fictional branches. Verify review sources and request reviews neutrally without incentives or selective solicitation.
6. Obtain Bing Webmaster Tools and old-domain Search Console data. These were not connected for this implementation. Retain the private account exports locally; they are intentionally excluded from the PR.

## Validation

- `npm run check`: copy policy, TypeScript and ESLint.
- `npm run test:seo`: route/image relationships, article counts and table shape, truthful review markup, GA4 payload limits, concurrent/accepted/failed form behavior, legacy host matching.
- `NEXT_PUBLIC_SITE_URL=https://parkplacedentist.com npm run build`: production static generation.
- Start with `npx next start -p 3009`, then `npm run verify:seo`: every sitemap URL, titles, H1s, canonicals, robots, breadcrumbs, real 404 and host-conditioned HTTP redirects.

These checks do not establish ranking improvement, live email delivery, third-party account configuration or external domain migration completion. Compare complete reporting periods and qualified inquiries after deployment.
