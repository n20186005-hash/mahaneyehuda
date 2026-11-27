# AGENTS.md — Mahane Yehuda Market (#448)

## Project
- Repository: `n20186005-hash/mahaneyehuda`
- Live site: https://mahaneyehuda.org/
- Attraction: Mahaneh Yehudah Market, Agripas St 90, Jerusalem, Israel; map: https://maps.app.goo.gl/v8vQ8S95CBASWi8r7
- Stack: Astro + Tailwind CSS + TypeScript; static Cloudflare Workers assets; package manager pnpm. See `package.json` and `README.md` for exact versions and build/deploy commands.
- Current published/default `main` has 40 Hebrew topic routes from commit `0170550`. Work in the dedicated issue/branch context and preserve every existing URL, paragraph of value, link, and published photo unless carefully justified.

## Goal
Improve low-search-impression pages and visitors' decision-making quality. This is **not** a volume-based page generation task. Issue: https://github.com/n20186005-hash/mahaneyehuda/issues/2 ; draft PR: https://github.com/n20186005-hash/mahaneyehuda/pull/3.

## Editing standards
1. Preserve the homepage travel design and image gallery; make every secondary page match the homepage design (hero, type, spacing, cards, navigation, footer, mobile).
2. Source each factual claim about opening hours, kosher certification, parking, entry, transport, prices, or business operating hours. Do not invent details, real reviews, first-person visits, photo locations, or exact walking times.
3. Answer the visitor's question directly. Avoid front-end filler such as "待审核/待确认/非官方" repeated throughout page bodies. Keep **one brief independent-third-party disclosure in the footer**; keep short, relevant caveats only for operational facts that genuinely vary. Never falsely claim official affiliation.
4. Keep sources/photo credits in a separate clearly named page or section (not a wall of links in homepage footer). Respect photo licenses and original assets. For new destinations, add 1–5 location-matching, licensed real photos if available; otherwise use placeholders rather than mismatched images.
5. Topic pages should be substantive and differentiated, not a skeletal restatement of generic content. Include specific history/culture, basic information, hours, access, food, photography, suggested routes, local context, 3–5 distinct FAQs, and topic-specific Google Maps links when applicable. Adapt sections to their real search intent.
6. Language: all current pages are Hebrew with RTL. Keep Hebrew complete and fluent. If additional language routes are later authorized, translate paragraph-by-paragraph; languages do not count as new destinations.
7. The front-end must not show unprocessed Markdown, implementation comments, unsubstantiated E-E-A-T notes, or contradictory ratings. Preserve rating 4.6 and supplied count 67,107 until a newer verifiable snapshot is provided, and disclose source/date.
8. SEO: semantic headings, useful page titles/descriptions, self-canonical HTTPS, redirects for HTTP/www as configured, valid sitemap and robots, accurate structured data and internal links; do not promise FAQ rich results.
9. Avoid creating duplicate pages: existing topics may already have `/visit/opening-hours/`, `/visit/friday/`, `/visit/parking/`, etc. Prefer improving existing pages or combining overlapping intents.
10. Do not prematurely mark complete, tested, pushed to main, deployed or indexed. Report exact commits, commands, output, URLs checked, and outstanding blockers.

## Tests and rollout
Run `corepack pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`, `pnpm audit`, `pnpm audit:language` (if defined) and inspect generated paths/sitemap. Run visual desktop/mobile checks if browser preview is available. If local environment cannot complete these, use GitHub Actions or Cloudflare builds and report the limitation honestly.

Keep work isolated on `codex/448-mahaneyehuda-low-impressions` or a new issue-specific branch. Avoid edits to other sites. Prepare a reviewable PR; do not claim that production was updated until merge/deploy and production checks succeed.
