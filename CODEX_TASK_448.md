# CODEX TASK #448 — Mahaneh Yehudah Market

**Window title:** #448 · Mahaneh Yehudah Market · Low impressions + 40-page SEO repair
**Repo:** https://github.com/n20186005-hash/mahaneyehuda
**Site:** https://mahaneyehuda.org/
**Map:** https://maps.app.goo.gl/v8vQ8S95CBASWi8r7
**Base:** main; **existing work branch:** `codex/448-mahaneyehuda-low-impressions`
**Tracking issue:** https://github.com/n20186005-hash/mahaneyehuda/issues/2
**Existing draft PR:** https://github.com/n20186005-hash/mahaneyehuda/pull/3

## Start here
Clone this repo in your **separate Codex Cloud workspace**. Read `AGENTS.md`, `README.md`, `src/data/topics.ts`, `src/components/TopicPage.astro`, `src/pages/index.astro`, `worker.mjs`, the tracking issue, and draft PR diff. Checkout the existing work branch if available. Do not start another duplicate 40-page generation task or overwrite unrelated changes. The 40 Hebrew routes already exist.

## Baseline (GSC export Aug 26–Nov 25, 2026)
- 1,606 search impressions, 5 clicks, 0.31% CTR
- Nov 1–25: 216 impressions, 0 clicks (versus Oct 534 impressions)
- Homepage 1,553 impressions; `http://` homepage 47 impressions (do not conclude redirect failure solely from this)
- 128 displayed query rows are all 0 clicks; query rows do not represent all search traffic
- `איך מגיעים לשוק מחנה יהודה` — 65 impressions, average position 17.11
- `האם שוק מחנה יהודה פתוח בשבת` — 54, 18.69
- `מתי שוק מחנה יהודה נסגר` — 49, 19.82
- `שוק מחנה יהודה ביום העצמאות` — 38, 20.97
- `חניון שוק מחנה יהודה` — 22, 36.91
- `מפה שוק מחנה יהודה` — 18, 40.67
- The pasted report's 36.56 is an **unweighted mean of daily rank values**, not a GSC site-wide position.

## Execute
1. **Audit first.** Inspect source and actual live pages, HTTP→HTTPS/www redirects, canonical, sitemap, crawlability, footer, header, Hebrew RTL, mobile and whether all 40 topic routes are published and linked. Check November traffic drop without speculating about algorithm penalties.
2. **Complete PR #3.** It already removes repeated disclaimers in secondary-page template, simplifies the footer, and adds source-backed parking details. Validate the edits against the existing design and sources. Fix any problems found. Preserve the copyright + independent disclosure on the home/footer in a clean layout, not repetitive disclaimers everywhere.
3. **Upgrade the six highest-intent old pages** (how-to-get-there, opening-hours, shabbat, friday, parking, map) with direct practical answers, verifiable details, named streets, Google Maps links and data sources. Give real useful directions and choices; don't repeat "not verified" paragraphs in lieu of answering.
4. **Upgrade all other existing topical pages** before new pages. Focus on food/coffee, street art, Nachlaot, other nearby attractions and detailed walking itineraries with time/order choices. Enrich each page using specific, sourced facts and real images where licensed. Keep tourism design aligned with homepage, complete footer, 3–5 FAQs. Avoid near-duplicate text.
5. **Technical SEO.** Validate schema and metadata (do not rely on rich-result promises for FAQPage); review links/sitemap/robots/hreflang; retain correct source-dated rating 4.6 (67,107) until verified updated data. Avoid index/crawl claims without live data.
6. **Build+QA.** Install locked dependencies, run Astro check/build and project audits, test link targets and mobile rendering. On successful validation, submit the verified changes as a reviewable PR/commits. Publish to Cloudflare only if access/authorization is available, then verify production status codes and the deployed commit. If blocked, document the exact blocker rather than saying deployed.

## Acceptance criteria
- 40 existing Hebrew topic URLs intact and their content meaningfully differentiated.
- Primary 6 low-impression pages with usable source-backed answers.
- No recurring “under review/unconfirmed/unofficial” filler in body; one truthful independent-source disclosure placed sensibly in footer.
- Consistent tourism UI across desktop/mobile; no broken styles, links, maps, images, multilingual mixing, or repeated footer stacks.
- Local or CI check/build recorded; production only called live once verified with URL + commit + deployment information.
- Issue #2 receives implementation progress, evidence and blockers.

**Report format:** changes and files; content URLs improved; tests and exact outcomes; commit/PR; deployment status; remaining blockers.
