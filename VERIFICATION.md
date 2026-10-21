# Local verification — 20 October 2026

Required versions are pinned in package.json and the lockfile. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`, `pnpm audit`, `pnpm audit:language`, `node scripts/verify-output.mjs` and `node scripts/behavior-test.mjs`.

The output verifier checks all five Hebrew RTL HTML pages, four original sitemap routes, unique page structure/metadata, local asset references, exact visible/schema FAQ agreement, explicit image source/licence records and absence of stale live-weather/foreign-image references. Behavior tests exercise redirects with query preservation, ASSETS 404 propagation and consent refusal/withdrawal/regrant/storage failures.

Worker configuration uses the existing Cloudflare project name identified by its official repository build check, `mahaneyehuda`, with a local `ASSETS` binding. A dry-run or local HTTP success does not establish production readiness or deployment. The prior base-commit Cloudflare failure is historical, not a verdict on this source.

Actual browser checks, desktop/mobile geometry and menu interaction, image loading, exact target build readiness, production domain/HTTP/www/TLS and live 404 verification remain release-coordinator gates. Source/CSS presence or VM tests do not substitute for those observations.
