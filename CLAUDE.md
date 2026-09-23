# SpeakUp site working agreement

Read this file and `docs/specs/001-speakup-site.md` before changing the site. `README.md` is the public front page of the repo (what SpeakUp is, the OG image, the link); keep development detail here and in the SPEC. Follow any applicable `AGENTS.md` as well.

## Stack and commands

- Astro 7, strict TypeScript, static output, Node 22.12+ in the Node 22 release line (`.nvmrc`). Mirrors the sibling `~/projects/personal/portfolio`.
- `npm ci` · `npm run dev` · `npm run check` · `npm run build` · `npm run validate` · `npm run preview` (always `127.0.0.1:4331`; 4321 is taken by the portfolio) · `npm test` · `npm run audit` · `npm run assets`.
- `npm test` serves the last build itself (Playwright `webServer`, reusing a running preview), so build first. `PLAYWRIGHT_BASE_URL` points it at another host. Tests run with JavaScript off by default; the deck and motion tests opt in. Desktop (1440 px) and mobile (375 px) projects.
- `npm run audit` runs mobile Lighthouse on `/` and `/en/` against the SPEC bar and fails below it; needs a running preview, or `AUDIT_URL=https://speakup.tchez.dev` for production.
- `npm run assets` regenerates `public/og-{pt,en}.png`, `favicon.png` and `apple-touch-icon.png` from the official logo (needs Playwright Chromium, `CHROME_PATH`, or a local Brave).

## Workflow

- Branches: work on `develop`, open a PR to `main`. `.github/workflows/deploy.yml` runs install → `astro check` → build → validate on every PR; merging to `main` also deploys to GitHub Pages. `main` requires a PR and the `build` check; neither branch can be deleted or force-pushed.
- **Never commit or push unless asked.**

## Editing content

- Everything the owner edits lives in `src/data/site.ts`: PT and EN copy, channel URLs, partners and the carousel `media` (in display order). `/llms.txt` follows automatically.
- **Photo:** add it to `src/assets/photos/` (any aspect ratio). Convert HEIC first (`sips -s format jpeg in.heic --out out.jpg`) and **strip EXIF/GPS** before committing — the repo is public. `alt` in `pt` and `en` describes the scene and never names people.
- **Video:** upload to YouTube (unlisted is fine), save its vertical cover to `src/assets/videos/` (`https://i.ytimg.com/vi/<id>/oar2.jpg`, or `oar1.jpg` if that 404s), add `{ type: 'video', youtubeId, orientation, poster, title }`.
- `PUBLIC_CF_ANALYTICS_TOKEN` (an Actions repository **variable**) turns on the Cloudflare Web Analytics beacon; unset means none.

## External links to the site

If the domain ever changes, update: the Instagram `@speakup_cmty` bio, the LinkedIn page's website field, the Discord server description, the WhatsApp group description, the SpeakUp card on the `tchez.dev` portfolio, event material that prints a link (`speakup-automations`, Drive templates, certificates, feedback forms), and the Search Console and Bing Webmaster properties.

## Architecture

- Portuguese is the default at `/`; English at `/en/`. No automatic locale redirect. Both homes render `src/components/Home.astro`; `src/pages/404.astro` is bilingual.
- **One data file:** all copy (PT + EN), channel URLs, partners and the `media` list live in `src/data/site.ts`. `**text**` in copy renders as a keyword via `rich()` (at most one per paragraph).
- `src/layouts/Base.astro` owns head metadata, hreflang, Open Graph, the `NGO` + `WebSite` JSON-LD and the conditional Cloudflare beacon (`PUBLIC_CF_ANALYTICS_TOKEN`, a repository **variable**; unset means no beacon).
- Components: `Home.astro` (every slide, the deck header and the deck script), `Statement.astro` (statement slides), `MediaCarousel.astro`, `Icon.astro`, `LanguageLink.astro`.
- Everything is in server-rendered HTML; the page is complete without JavaScript. An inline head script sets `js` / `on-hero`; JavaScript arms the reveal (`motion` class), the confetti and the deck controls. Under `prefers-reduced-motion: reduce` nothing animates or hides and the controls jump instantly.

## Design system

- Colors are sampled from the logo (`src/styles/tokens.css`). Raw blue/red are decorative only; text surfaces use the `-deep` / `-text` shades, which pass WCAG AA. Never red text on blue. Check contrast when adding a color pairing.
- **Restrained palette:** the hero is grey with the only two blobs; other slides are white or `section-blue`. Navy is the footer and body text only. No extra decorative motifs.
- Fonts are self-hosted via `@fontsource`, inferred from the Canva materials (owner to confirm). **One role per typeface:** Poppins 800 for headings, big numbers and the signature; Montserrat for running text, buttons and lists; Bebas Neue only for `.label` (short uppercase labels, red on light / white on dark).
- **One of each component** in `src/styles/global.css`: `.card`, `.button` (red pill), `.slide-title` (h2 + short red bar), `.label`, `.lead`. Don't add per-section variants. Sizes are fluid tokens (`--text-*`) so slides scale up on large monitors. No forced early line breaks: `.lead` runs to 80ch and titles balance.
- **Icons:** Tabler Icons (`@tabler/icons`, MIT) via `Icon.astro`, which inlines the SVG at build time — real brand glyphs in one line style. Never hand-draw icons; add one by importing another Tabler SVG.
- **Statement slides** (`Statement.astro`: Quem somos, Nossa missão): label, one large `h2` statement, one paragraph. Use this for any new "about"-type content instead of packing ideas into one slide.

## The deck

- **Slide order is by priority** (most visitors stop early): Início → Sumário → Encontros → Por que participar → Nossos encontros → Apoie nossa comunidade → Parceiros → Quem somos → Missão → Valores → Contato. `slides` in `Home.astro` must match the DOM order; it feeds the Sumário, the index, the counter and the logo's turns. No stats slide: numbers go stale.
- Each `.section` fills the screen. On desktop (≥ 1024 × 640) the deck script owns paging: wheel, trackpad and keys (arrows, PageUp/Down, Space, Home/End) move exactly one slide with a fixed-duration scroll (`goTo`: 1.1 s to/from the hero so the logo flight is visible, 0.7 s otherwise). While a change runs the deck is **locked** until the slide has arrived, 150 ms have passed and input has been quiet for 250 ms. Slides up to 40 px taller than the screen page normally; taller ones scroll natively to their edge; free scrolling settles on the nearest slide. Phones scroll freely.
- **Progress header** (`.deck-header`, JS only): hidden on the hero, it slides in with the scroll. Docked logo (links to the hero) → slide number + name → clickable progress segments → icon-only Instagram and `Índice` buttons. On phones the segments run along the bar's bottom edge after the logo. The footer counts as the last slide.
- **Docked logo:** the hero → header flight is **scroll-linked, not timed**. `render()` maps the scroll position to the flying logo's position/size/turn and to the header's `--reveal`, so it tracks the page in both directions; its start is pinned to the top edge. Between later slides the logo turns 360° in the direction of travel. The static hero `<img>` stays the source of truth without JS or with reduced motion. Don't reintroduce time-based flights.

## Media carousel

- `MediaCarousel.astro` (slide "Nossos encontros"): a horizontal scroll-snap strip of `media` items — photos at their natural aspect ratio and YouTube videos (9:16 Shorts or 16:9) at one shared height that follows the screen (`--h`), so the slide fits one screen.
- Videos are a **facade** (local cover + play button): nothing from YouTube loads on page load; without JS the facade links to the video. The `youtube-nocookie.com` player starts when the visitor clicks a cover **or navigates onto a video** (◀ ▶, ← →, swipe) — never on page load or under reduced motion — one at a time; moving off it or leaving the slide stops it. Autoplay after navigation is the owner's call (2026-09-23).
- ← → page the strip whenever its slide covers the middle of the screen (↑ ↓ stay with the deck). Never embed Instagram (Meta script, tracking, login wall).

## Mobile

- Below 1024 px the layout is an adaptation, not a copy: one column, the CTA after the content it sums up (the meetups facts), full-width section CTAs (`display: block` so a wrapped label keeps its icon on the first line), the media strip edge to edge with the next item peeking in and its height capped by the width, compact list rows. Check every slide at 390 px after any layout change.

## Search and AI discoverability

- Sitemap (`@astrojs/sitemap` with hreflang), canonical + hreflang, JSON-LD and OG images come from `astro.config.mjs` and `Base.astro`.
- `public/robots.txt` allows every crawler and names the AI ones explicitly. `/llms.txt` is generated by `src/pages/llms.txt.ts` from `site.ts` — change the copy, not the file.

## Gotchas

- Grid children default to `min-width: auto`, so wide content (the media strip) stretches a slide and scrolls it sideways inside its `overflow: hidden`. `.section > * { min-width: 0 }` prevents it — keep it.
- CSS `scroll-snap-type` applies **only without JS** (`html:not(.js)`): with JS it re-snaps to its own last target after a programmatic scroll and yanks the page back a slide.
- The CSS minifier folds `animation-timeline` into the `animation` shorthand (invalid). Keep the timeline in a separate, more specific rule (`.section.section-blue`).
- `.media-track { position: relative }` makes items' `offsetLeft` relative to the strip; the carousel step math depends on it.
- Internal docs (org structure, templates, operations) live in the owner's vault and Drive, **never in this repo**.

## Validation

- `scripts/validate-build.mjs` checks metadata, hreflang, JSON-LD, the six channels, the certificate line, sitemap, CNAME, robots (AI crawlers allowed), `llms.txt`, the logo hash and forbidden identity strings, and **fails while any `placeholder-*` media is in the build**.

## Identity rules

- Name: **SpeakUp Community** (short SpeakUp). Instagram **`@speakup_cmty`** only.
- Logo: the official `public/speakup-round.png`, byte-identical to the owner's file (hash pinned in the validation script). Never redraw, recolor, trace or imitate it; ask the owner for other variants.
- Copy is PT-BR with English as seasoning; signature **"Let's SpeakUp!"**. No em dashes in visible copy. Use only facts from SPEC 001.
- Founder credit: **Marco Netto** → `https://tchez.dev/`. Never the full legal name.
- No participant or volunteer personal data. Photos need descriptive `alt` text without names; strip EXIF/GPS before committing.
- Partners are text cards unless the owner supplies logo files.
- Out of scope: internal org docs, next-meetup date, forms or data collection, extra tracking, cookie banners.
