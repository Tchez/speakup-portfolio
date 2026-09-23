# SpeakUp site working agreement

Read this file, `README.md` and `docs/specs/001-speakup-site.md` before changing the site. Follow any applicable `AGENTS.md` as well.

## Stack and commands

- Astro 7, strict TypeScript, static output, Node 22.12+ in the Node 22 release line (`.nvmrc`). Mirrors the sibling `~/projects/personal/portfolio`.
- `npm ci`, `npm run dev`, `npm run check`, `npm run build`, `npm run validate`, `npm run preview`, `npm test`.
- Browser tests need a running preview; set `PLAYWRIGHT_BASE_URL` for a non-default port (e.g. `npm run preview -- --host 127.0.0.1 --port 4331` then `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4331 npm test`). Tests run with JavaScript off by default; the motion tests opt in.
- `npm run assets` regenerates `public/og-{pt,en}.png`, `favicon.png` and `apple-touch-icon.png` from the official logo (needs Playwright Chromium, `CHROME_PATH`, or a local Brave).
- GitHub Actions (`.github/workflows/deploy.yml`) builds PRs to `main`; only pushes to `main` deploy to GitHub Pages.
- **Never commit or push unless asked.**

## Architecture

- Portuguese is the default at `/`; English at `/en/`. No automatic locale redirect. Both homes render `src/components/Home.astro`.
- All copy (PT + EN), channel URLs, partners and the `media` list (photos + videos) live in `src/data/site.ts`. `**text**` in copy renders as a red keyword via `rich()`.
- `src/layouts/Base.astro` owns head metadata, hreflang, Open Graph, the `NGO` + `WebSite` JSON-LD and the conditional Cloudflare beacon (`PUBLIC_CF_ANALYTICS_TOKEN`, a repository **variable**; unset means no beacon).
- Colors are sampled from the logo (`src/styles/tokens.css`). Raw blue/red are decorative only; text surfaces use the `-deep` / `-text` shades, which pass WCAG AA. Check contrast when adding a color pairing.
- Fonts are self-hosted via `@fontsource`, inferred from the Canva materials (owner to confirm). **One role per typeface** — keep it that way: Poppins 800 for headings, big numbers and the signature; Montserrat for all running text, buttons and chips; Bebas Neue only for `.label` (short uppercase labels, red on light / white on dark).
- **Icons:** Tabler Icons (`@tabler/icons`, MIT) via `Icon.astro`, which inlines the SVG at build time — real brand glyphs (Instagram, WhatsApp, Discord, LinkedIn) in one line style. Never hand-draw brand icons; add new ones by importing another Tabler SVG.
- **One of each component:** `.card` (white, light border, shadow), `.button` (red pill), `.slide-title` (h2 + short red bar), `.label`, `.lead`, `.note` — all in `src/styles/global.css`. Don't add per-section variants. Sizes are fluid tokens (`--text-*` in `tokens.css`) so slides scale up on large monitors.
- **Restrained palette:** the hero is grey with the only two blobs; other slides are white or `section-blue`. Navy is the footer and body text only. At most one red keyword (`**…**`) per paragraph. No extra decorative motifs.
- **Slide order is by priority** — most visitors stop early, so what a future participant needs comes first and background comes last: Início → Sumário (agenda) → Encontros → Por que participar → Nossos encontros → Apoie nossa comunidade → Parceiros → Quem somos → Missão → Valores → Contato. `slides` in `Home.astro` must match the DOM order; the Sumário list is built from it. No stats slide: numbers go stale (removed 2026-09-23 by the owner).
- **Media carousel** (`MediaCarousel.astro`, slide "Nossos encontros"): a horizontal scroll-snap strip of `media` items — photos (4:3) and YouTube videos (9:16 Shorts or 16:9) at one shared height. Videos are a **facade** (local cover + play button): nothing from YouTube loads on page load; without JS the facade is a link to the video. The player (`youtube-nocookie.com`) starts when the visitor clicks a cover **or navigates onto a video** (◀ ▶, ← →, swipe) — never on page load, never under reduced motion — and only one plays at a time; moving off it or leaving the slide stops it. Autoplay after navigation is the owner's call (2026-09-23), a deliberate relaxation of the SPEC's "no autoplay". ← → page the strip whenever its slide covers the middle of the screen (↑ ↓ stay with the deck). Never embed Instagram (Meta script, tracking, login wall). Only the cover thumbnail comes from `i.ytimg.com` unless a local `poster` is set. Horizontal gestures stay in the strip; the deck only pages on vertical input.
- Gotcha: grid children default to `min-width: auto`, so wide content stretches a slide and scrolls it sideways inside its `overflow: hidden`. `.section > * { min-width: 0 }` prevents it — keep it.
- **Statement slides** (`Statement.astro`: Quem somos, Nossa missão): one idea per slide — red `.label` with the section name, one large `h2` statement, one supporting paragraph. Use this pattern for any new "about"-type content instead of packing several ideas into one slide.
- The strip height follows the screen (`--h: clamp(220px, 100svh - 500px, 580px)`) so the slide fits one screen; the deck also treats slides up to 40px taller than the screen as fitting.
- **The page is a deck.** `slides` in `Home.astro` defines the order (it feeds the index, the counter and the logo's turns). Each `.section` fills the screen. On desktop (≥1024 × 640) the deck script owns paging: wheel, trackpad and keys (arrows, PageUp/Down, Space, Home/End) move exactly one slide with a fixed-duration scroll animation (`goTo`: 1.1 s to/from the hero so the logo flight is visible, 0.7 s otherwise). While a change runs the deck is **locked** — extra, reversed or momentum input is ignored until the slide has arrived, 150 ms have passed and input has been quiet for 250 ms. Slides taller than the screen scroll natively until their edge; free scrolling (scrollbar) settles on the nearest slide. Phones scroll freely.
- CSS `scroll-snap-type` applies **only without JS** (`html:not(.js)`): with JS it would re-snap to its own last target after a programmatic scroll and yank the page back a slide.
- **Progress header** (`.deck-header`, end of `Home.astro`, JS-only): a floating horizontal bar hidden on the hero that slides in from the next slide on. Left to right: docked logo (links to the hero) → slide number + name → progress segments (clickable, done / current / upcoming) → icon-only Instagram and `Índice` buttons. On phones the segments run along the bar's bottom edge, starting after the docked logo. Keep fixed buttons icon-only. The footer counts as the last slide for the header.
- **Mobile (< 1024px) is an adaptation, not a copy:** one column, the CTA after the content it sums up (e.g. the meetups facts), full-width section CTAs (`display: block` so a wrapped label keeps its icon on the first line), the media strip edge to edge with the next item peeking in, and compact list rows. Check every slide at 390px wide after any layout change.
- **Docked logo:** the hero → header transition is **scroll-linked, not timed**: `render()` maps the scroll position (0 at the top, 1 when the hero logo would have scrolled out) to the flying logo's position/size/turn and to the header's `--reveal`, so it tracks the page exactly in both directions. The flight start is pinned to the top edge so the logo never leaves the screen. Between later slides the logo turns 360° in the direction of travel (Web Animations API). The static hero `<img>` stays the source of truth without JS or with reduced motion. Don't reintroduce time-based flights here — they fight the scroll and land on stale positions.
- Everything is in server-rendered HTML. JavaScript arms the reveal (the `motion` class it sets itself; content re-reveals each time a slide re-enters), the confetti and the deck controls. An inline head script sets `js` / `on-hero`. Under `prefers-reduced-motion: reduce` nothing animates or hides and the controls jump instantly.
- Gotcha: the CSS minifier folds `animation-timeline` into the `animation` shorthand (invalid). Keep the timeline in a separate, more specific rule (see `.section.section-blue`).
- `scripts/validate-build.mjs` checks metadata, JSON-LD, channels, sitemap, CNAME, the logo hash and forbidden strings, and **fails while any `placeholder-*` photo is in the build**.

## Identity rules

- Name: **SpeakUp Community** (short SpeakUp). Never "SpeakUp Palmas". Instagram **`@speakup_cmty`** only.
- Logo: the official `public/speakup-round.png`, byte-identical to the owner's file (hash pinned in the validation script). Never redraw, recolor, trace or imitate it; ask the owner for other variants.
- Copy is PT-BR with English as seasoning; signature **"Let's SpeakUp!"**. Use only facts from SPEC 001.
- Founder credit: **Marco Netto** → `https://tchez.dev/`. Never the full legal name.
- No participant or volunteer personal data. Photos need descriptive `alt` text without names.
- Partners are text cards unless the owner supplies logo files.
- Out of scope: internal org docs, next-meetup date, forms or data collection, extra tracking, cookie banners.
