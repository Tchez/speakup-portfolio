# SPEC 001 — SpeakUp Community site v1 on speakup.tchez.dev

- **Status:** done — live at `https://speakup.tchez.dev` since 2026-09-23 (repo `Tchez/speakup-portfolio`). This SPEC describes the site **as built**; "History" records what changed from the first draft and why.
- **Created:** 2026-09-22 · **Revised:** 2026-09-23
- **Reuse:** this is the reference SPEC for similar sites (a community, project or event presented as a bilingual slide deck on a `*.tchez.dev` subdomain). Start from "Reusing this SPEC for another site" at the end.
- **Depends on:** none. Stack, CI, validation and tests mirror the sibling repo `~/projects/personal/portfolio`.

## Goal

When someone in Brazil searches things like **"praticar inglês Palmas"**, **"comunidade de inglês"** or **"conversação em inglês grátis Tocantins"**, they find **`https://speakup.tchez.dev`**: a clean, professional, colorful site that works like a **slide deck** and shows in seconds what SpeakUp Community is — a **free, non-profit English conversation community** — and sends each kind of visitor to the right next step: **future participants → follow on Instagram** (where every meetup is announced), **volunteers → the sign-up form**, **partners → email**. Visually it's SpeakUp's own identity: bright, friendly, animated, but calm and restrained.

Most visitors never reach the end, so **the slides are ordered by priority**: what a future participant needs comes first, background (who we are, mission, values) comes last.

## Context

### What SpeakUp Community is (source of truth for all copy — use these facts only)
- **Positioning:** SpeakUp is a **complement** to school, courses and self-study — the place to **practice** what you learn — never an alternative to classes. Language schools are partners (Wizard), so copy must never set SpeakUp against classes or schools. Key message: *the best way to learn English is to practice it, and you can do that without leaving Palmas*.
- **Mission (PT):** **Fazer as pessoas falarem inglês.** Criar oportunidades para praticar inglês gratuitamente, com interações reais, sem precisar sair do Brasil, ganhar confiança e criar conexões. Sempre num ambiente agradável e livre de julgamentos.
- **Published "who we are" text (PT, use its wording as-is; the site splits it into a statement + paragraph):** *Somos uma comunidade gratuita e sem fins lucrativos. Organizamos encontros voltados para a prática da conversação em inglês. Aqui, aprendemos juntos, compartilhamos experiências e nos apoiamos no aprendizado do idioma diariamente!*
- **Retired lines — never use:** the old one-liner *"uma comunidade para tirar o inglês da sala de aula e colocar em prática"* (it doesn't say what SpeakUp is and reads as anti-school) and the old slogan *"Transforme seu inglês, amplie seu mundo!"*.
- **Values:**
  - **Acolhimento** — criar um ambiente em que as pessoas se sintam confortáveis para participar, independentemente do nível de inglês.
  - **Respeito** — respeitar diferenças culturais, opiniões e os limites de cada participante.
  - **Colaboração** — incentivar a troca de conhecimentos e a ajuda mútua entre os participantes.
  - **Acessibilidade** — reduzir barreiras que dificultem a participação das pessoas na comunidade.
  - **Diversidade** — valorizar diferentes experiências, culturas e formas de expressão.
- **Why take part (owner's "Por que participar?" post):** praticar e melhorar seu inglês, ganhar horas complementares, ganhar confiança para se comunicar, fazer novas amizades, destacar-se profissionalmente, expandir suas oportunidades. **Anyone can take part — no level required.**
- **Meetups:** in person, **once a month**, **usually at Bee Cool Hostel** in Palmas – TO (not a fixed venue). Free. A relaxed setting with **debates, games and group activities**; you can come without knowing anyone and meet lots of people. **Themed editions** exist: **SpookUp** (Halloween) and the **Summer Edition**. Each meetup's date, time and place are announced on Instagram — the site **does not** show a date (it would go stale; see Out). The Remote Edition is on standby and not mentioned.
- **Certificate:** participants get a **certificate of participation for complementary hours ("horas complementares")**. The site says "Horas complementares · certificado de participação" and **does not state a number of hours**. Volunteering also earns complementary hours (no number either).
- **Volunteering:** volunteers make the meetups happen — creating activities and games, helping with organization and logistics and, above all, **marketing**. No fixed commitment (help when and as much as you can); you gain hands-on experience, practice English and build your network, and earn complementary hours.
- **Numbers:** **not shown on the site** — attendance and meetup counts change constantly and go stale.
- **Partners (two, text cards; Wizard first — the most important partnership):**
  - **Wizard Palmas** (official name on certificates: "Wizard by Pearson Palmas") — language school. **Discounted enrollment and course fees for people who come through SpeakUp** (the key differentiator, highlighted), issues the complementary-hours certificates, supports themed events such as SpookUp (Halloween).
  - **Bee Cool Hostel** — where most in-person meetups take place; **discounts on drinks and food** for SpeakUp participants.
  - Text cards only unless the owner supplies partner logo files. Never download, recreate or approximate a partner's logo.
- **Media (owner-supplied):** meetup photos (HEIC → JPEG, EXIF/GPS stripped) and meetup videos on YouTube as Shorts (1st, 4th, 16th and 17th meetups, SpookUp, the Dublin international edition).

### Identity rules (non-negotiable)
- The name is **SpeakUp Community** (short: SpeakUp). **Never "SpeakUp Palmas".** Instagram handle **`@speakup_cmty`** — never the old handles `@speakup_palmas` or `@SPEAKUP_BR`. The one exception is the YouTube channel name, which YouTube won't let the owner change (see "Resolved after launch").
- **Logo:** use the **official file only** — `public/speakup-round.png`, byte-identical to the owner's `speakup-round.png` (the circular "SpeakUp · COMMUNITY" logo). Never redraw, recolor, re-typeset, trace to SVG, or generate a "similar" logo. If a layout needs another variant, stop and ask the owner. Some older materials show a "SpeakUp PALMAS" logo — never use that one.
- Copy voice: **PT-BR body**, English only as seasoning (`Let's SpeakUp!`). Signature: **"Let's SpeakUp!"**. No advanced-English jargon. **No em dashes in visible copy** — use commas, colons or a new sentence (the `<title>` separator is the only exception).
- Founder credit, where it appears (footer / structured data): **Marco Netto** (`https://tchez.dev/`). Never his full legal name or "Marco Antônio".
- No personal data of participants or volunteers on the site (names, phones). Meetup photos and videos are allowed — authorization is collected at every meetup. `alt` text and video labels describe the scene and never name anyone.

### Channels (exact URLs)
| Channel | URL | Role on the site |
|---|---|---|
| Instagram | `https://www.instagram.com/speakup_cmty/` | **Primary CTA** for participants |
| WhatsApp group | `https://chat.whatsapp.com/FI9mvqI9z1CAyjZFEXLpGu` | Contact slide |
| Discord | `https://discord.gg/azsgD8T5tP` | Contact slide |
| LinkedIn page | `https://www.linkedin.com/company/speakup-cmty` | Contact slide |
| Volunteer form | `https://docs.google.com/forms/d/e/1FAIpQLSc-VSmezGF7007Vds1O1p270gA2M3Ez_EpJNZ2dtKs2APDg3Q/viewform` | Volunteer CTA |
| Partnerships email | `speakup.palmas@gmail.com` | Partner CTA (`mailto:`) |

### Domain setup
- `tchez.dev` is registered and DNS-hosted at **Cloudflare**. Sibling sites already on GitHub Pages: `tchez.dev` (portfolio), `blog.tchez.dev`, `placar.tchez.dev` — all CNAME/A to GitHub Pages, **"DNS only" (grey cloud)**, which GitHub needs to issue HTTPS certificates.
- Search Console has a **Domain property** `sc-domain:tchez.dev` covering every subdomain.

## Scope

**In:**
1. **Astro** at the repo root, **static output**, **GitHub Pages** via **GitHub Actions**, Node 22 — mirroring `~/projects/personal/portfolio` (`astro.config.mjs`, `.nvmrc`, `package.json` scripts, `.github/workflows/deploy.yml`, `scripts/validate-build.mjs`, `playwright.config.ts` + `tests/`).
2. **Languages:** **Portuguese is the default at `/`**, English at **`/en/`**. Visible switcher to the same page in the other language. No automatic language redirect.
3. **A slide deck per language** (each slide at least one screen tall), in this order:
   1. **Início (hero)** — official logo; label "SpeakUp Community · Palmas – TO"; title **"Uma comunidade para praticar inglês sem pressão e sem julgamentos."**; two short points: "Encontros mensais e **gratuitos**" and "Todos os níveis são bem-vindos"; CTA **"Fique por dentro no Instagram"** (EN: "Stay in the loop on Instagram").
   2. **Sumário** — "O que você encontra aqui": every other slide, numbered and clickable, in two even columns on desktop.
   3. **Como funcionam os encontros** — short text on the relaxed setting (debates, games and group activities; come without knowing anyone, meet lots of people, make mistakes without fear) + CTA to the next meetup on Instagram; highlights: 1× por mês (usually at Bee Cool Hostel), 100% gratuito, Todos os níveis, Edições temáticas (SpookUp, Summer Edition), **Horas complementares · certificado de participação**.
   4. **Por que participar?** — opens with "A melhor forma de aprender inglês é praticando, e dá para fazer isso sem sair de Palmas." and highlights **"Qualquer pessoa pode participar"** (any level, whether you study at school, in a course or on your own); the six benefits; CTA "Quero participar" → Instagram.
   5. **Nossos encontros** — "Fotos e vídeos de encontros passados": a horizontal carousel of photos and YouTube videos (see item 11).
   6. **Apoie nossa comunidade** — the volunteering text above + CTA "Quero ser voluntário" → volunteer form.
   7. **Parceiros** — Wizard Palmas and Bee Cool Hostel cards (role label + perks, the Wizard discount highlighted) + "Quer ser parceiro do SpeakUp?" with **CTA → `mailto:speakup.palmas@gmail.com`**.
   8. **Quem somos** — statement slide from the published text.
   9. **Nossa missão** — statement slide: "Fazer as pessoas falarem inglês." + the mission paragraph, key words in plain bold.
   10. **Nossos valores** — the five values.
   11. **Fale com a gente** — Instagram, WhatsApp, Discord, LinkedIn, volunteer form, partnership email as airy rows in two columns (the agenda's visual language) — real brand icon (Tabler Icons, MIT), channel name, full one-line description (e.g. "WhatsApp · Grupo da comunidade"), arrow; no URLs or addresses, no lead line; then the footer: `Let's SpeakUp!`, "Criado por Marco Netto" linking `https://tchez.dev/`, language switcher.
4. **Content in one data file** (`src/data/site.ts`): all copy PT + EN, channel URLs, partners and the media list, so the owner edits one place. EN copy is a faithful translation of the PT.
5. **SEO:**
   - Titles — PT: `SpeakUp Community — Comunidade gratuita para praticar inglês em Palmas (TO)`; EN: `SpeakUp Community — Free English conversation community in Palmas, Brazil`. Descriptions (~150 chars) naturally including *praticar inglês, comunidade, conversação, Palmas, Tocantins* (EN equivalents).
   - `<html lang="pt-BR">` / `lang="en"`, canonical per page, hreflang `pt-BR`, `en`, `x-default` → the PT URL.
   - Open Graph + Twitter card: `og:image` 1200×630 PNG built with the **untouched official logo** on the site palette (`scripts/generate-assets.mjs`). `og:locale` `pt_BR` / `en_US`.
   - JSON-LD on both homes: `NGO` — `name: "SpeakUp Community"`, `alternateName: "SpeakUp"`, `url`, `logo` (absolute URL), `description`, `foundingDate: "2025-01"`, `founder: { "@type": "Person", "name": "Marco Netto", "url": "https://tchez.dev/" }`, `address: { "@type": "PostalAddress", "addressLocality": "Palmas", "addressRegion": "TO", "addressCountry": "BR" }`, `areaServed: "Palmas, Tocantins, Brasil"`, `email: "speakup.palmas@gmail.com"`, `sameAs: [Instagram, LinkedIn page]`. Plus `WebSite` with `inLanguage`.
   - `@astrojs/sitemap` with i18n; `public/robots.txt` pointing at `https://speakup.tchez.dev/sitemap-index.xml`; a bilingual `404.astro` (`noindex`); `public/CNAME` with `speakup.tchez.dev`.
   - **AI discoverability** (same policy as the sibling `placar`, its SPEC 009): `robots.txt` allows every crawler and names the AI ones explicitly — `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Google-Extended` — training bots included, since the site is public promotion with no personal data. `/llms.txt` ([llmstxt.org](https://llmstxt.org): one H1, a summary blockquote, then sections) is generated at build time by `src/pages/llms.txt.ts` from `src/data/site.ts`, PT first with a nested "In English" section, so it can never drift from the page. It's a convention, not a guarantee: what actually puts the site in AI answers is being indexed by Google and Bing.
6. **Analytics:** Cloudflare Web Analytics beacon rendered only when `PUBLIC_CF_ANALYTICS_TOKEN` is set at build time (GitHub Actions repository **variable**).
7. **CI/CD:** PR → `main` runs install, `astro check`, build, `validate`; push → `main` also uploads `dist/` and deploys through a separate `github-pages` environment job (`pages: write`, `id-token: write`, concurrency `pages`). Pinned: `actions/checkout@v4`, `actions/setup-node@v4` (22), `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
8. **Build validation** (`scripts/validate-build.mjs`): metadata/hreflang/canonical/JSON-LD per page; all six channels; the "Horas complementares" certificate line; the official logo's SHA-256 (byte-identical); **fails if any `placeholder-*` media is in the build**; fails on "SpeakUp Palmas", "@speakup_palmas", "SPEAKUP_BR", "Marco Antônio", "Martins", "Porto" anywhere in `dist/`; fails if `robots.txt` stops allowing an AI crawler or `llms.txt` loses its shape or its links.
9. **Deck navigation (desktop ≥ 1024 × 640):** wheel, trackpad and keys (↑ ↓, PageUp/PageDown, Space, Home/End) move **exactly one slide** with a fixed-duration animation (≈1.1 s to/from the hero, ≈0.7 s otherwise). While a change runs the deck is **locked**: extra, reversed or momentum input is ignored until the slide has arrived and input has been quiet. Slides a few pixels taller than the screen still page normally; genuinely taller slides scroll inside until their edge. Phones scroll freely. Without JS, native CSS scroll-snap is the fallback. *(Owner decision: this intentionally relaxes the original "no scroll hijacking" rule.)*
10. **Progress header (JS only):** a floating bar hidden on the hero that slides in with the scroll: docked logo (back to the hero) → slide number + name → clickable progress segments → icon-only Instagram and index (`Índice`) buttons. The hero logo flies into the header with the scroll position (scroll-linked, both directions) and turns once per slide change.
11. **Media carousel ("Nossos encontros"):** a curated set of highlights, not a per-meetup feed. Horizontal strip of photos (natural aspect ratio) and YouTube Shorts (9:16) at one shared height that follows the screen height, so the slide fits one screen. ◀ ▶ buttons, ← → keys whenever the slide is on screen (↑ ↓ stay with the deck), swipe. Videos are a **facade** with a local cover: **nothing loads from YouTube on page load**; the privacy-enhanced player (`youtube-nocookie.com`) starts when the visitor clicks a cover **or navigates onto a video**, only one plays at a time, and moving off it or leaving the slide stops it. No autoplay on page load or under reduced motion; on iOS the player starts muted (Safari's policy), with unmute and full screen in YouTube's controls; without JS each cover links to the video. *(Owner decision: autoplay after the visitor's own navigation relaxes the original "no autoplay" rule.)* Never embed Instagram (Meta script, tracking, login wall).
12. **Accessibility & motion:** semantic landmarks, one `h1`, visible focus, keyboard reachable, WCAG AA contrast (never red text on the blue field — use a red tag with white text or white text with a red accent instead). Everything visible without JS; every animation off under `prefers-reduced-motion: reduce`.
13. **Repo docs and tooling:** `README.md` is the public front page for anyone who finds the repo (the OG image, the link, what SpeakUp is, what's on the site, credits), with no development detail; `CLAUDE.md` is the working agreement (commands, workflow, content editing, architecture, gotchas, the list of external links to the site). `npm test` runs Playwright on desktop 1440 px + mobile 375 px with JS off by default and starts the preview itself; `npm run audit` runs Lighthouse against the bar in the acceptance criteria.
14. **Mobile (< 1024 px) is an adaptation, not a copy of desktop:** one column; the CTA after the content it sums up; full-width section CTAs whose icon stays on the first line when the label wraps; the media strip edge to edge with the next item peeking in and its height capped by the width; compact agenda, benefit and index rows; the header's progress runs along its bottom edge after the logo.

**Out:**
- Org structure (Heads/Leads/ADMs/areas), post templates, operations, internal docs — internal, never on the site.
- A numbers/stats slide (goes stale).
- Next-meetup date/countdown block and its automation (future SPEC), the Remote Edition (on standby), a history/timeline section, FAQ, a blog/news section.
- Other partners (IFTO, Afya, Ulbra, Love Intercâmbios) — can be added later via the data file.
- Instagram embeds; forms or any data collection on the site itself; cookies/consent banners; other tracking.
- Changes to DNS, other repos, the YouTube channel or the vault — the owner does those.

## Design

The look comes from SpeakUp's own Instagram/Canva materials.

- **Colors:** sampled from the official logo — blue `#2B90D8`, red `#EF1F22`, navy `#14364E`, light grey `#E7E7E7`. The raw blue and red fail AA for white body text, so text surfaces use darker shades (blue `#1F6FB2`, red `#D0181C`, blue text `#1B67A6`, red text `#C4161B`). **Restrained palette:** the hero is grey with the only two decorative blobs; every other slide is white or blue; navy is reserved for body text and the footer; red is for highlights, buttons and small accents.
- **Type — one role per typeface** (confirmed by the owner): Poppins 800 for headings and the signature; Montserrat for all running text, buttons and lists; Bebas Neue only for short uppercase labels. Sizes are fluid, so slides don't look small on large monitors. The script "SpeakUp" lettering exists **only inside the logo image**.
- **One of each component:** card, red pill button, slide title with a short red bar, label, lead paragraph. Keywords in running text are red bold on white slides and white bold with a red underline on blue slides (plain bold on the mission slide). No forced early line breaks: lead text runs up to ~80 characters per line and titles use the full width with balanced breaks.
- **Statement slides** (Quem somos, Nossa missão): one idea per slide — label, one large statement, one supporting paragraph.
- **Motion — light and purposeful:** each slide's content rises in, in reading order, when the slide arrives (again on re-entry); blue slides open from a rounded card to full bleed; the hero blobs drift slowly; a small confetti burst on the hero Instagram CTA; the scroll-linked logo flight; one logo turn per slide change. No 3D. All of it off under reduced motion.
- **Layout:** mobile-first — most visitors come from Instagram on a phone. The hero shows the logo, title and Instagram CTA without scrolling on a 375 px screen.

## Launch runbook (executed 2026-09-23)

Steps marked **(Claude)** were run with `gh` after the owner approved them; the rest need the owner's accounts. For the next site, replace the repo name and domain.

1. ✅ **GitHub repo (Claude):** public `Tchez/speakup-portfolio`, website field, wiki and projects off, topics.
   ```sh
   gh repo create Tchez/<repo> --public --description "…" --homepage https://<sub>.tchez.dev --disable-wiki
   gh repo edit Tchez/<repo> --enable-projects=false --add-topic <topics>
   git remote add origin https://github.com/Tchez/<repo>.git
   ```
2. ✅ **First push (owner):** `main` and `develop`. The first run on `main` builds but fails at deploy until Pages exists; re-run it after step 3.
3. ✅ **Pages + environment (Claude):** Pages from GitHub Actions, custom domain, only `main` may deploy.
   ```sh
   gh api -X POST repos/Tchez/<repo>/pages -f build_type=workflow
   gh api -X PUT repos/Tchez/<repo>/pages -f cname=<sub>.tchez.dev
   gh api -X PUT repos/Tchez/<repo>/environments/github-pages --input - <<< '{"deployment_branch_policy":{"protected_branches":false,"custom_branch_policies":true}}'
   gh api -X POST repos/Tchez/<repo>/environments/github-pages/deployment-branch-policies -f name=main -f type=branch
   ```
4. ✅ **Branch protection (Claude), like `brain-blog`:** `main` requires a PR (0 approvals) and the `build` check, no deletion, no force-push, admins may bypass; `develop` no deletion, no force-push.
   ```sh
   gh api -X PUT repos/Tchez/<repo>/branches/main/protection --input - <<< '{"required_status_checks":{"strict":false,"checks":[{"context":"build","app_id":15368}]},"enforce_admins":false,"required_pull_request_reviews":{"required_approving_review_count":0},"restrictions":null,"allow_force_pushes":false,"allow_deletions":false}'
   gh api -X PUT repos/Tchez/<repo>/branches/develop/protection --input - <<< '{"required_status_checks":null,"enforce_admins":false,"required_pull_request_reviews":null,"restrictions":null,"allow_force_pushes":false,"allow_deletions":false}'
   gh run rerun <first-run-id> --failed
   ```
5. ✅ **DNS (owner, Cloudflare):** `CNAME <sub> → tchez.github.io`, **DNS only** (grey cloud). Check `dig <sub>.tchez.dev +short`.
6. ✅ **HTTPS (owner):** Settings → Pages → after "DNS check successful" and the certificate, tick **Enforce HTTPS**. Check `/`, `/en/`, `/robots.txt`, `/llms.txt`, `/sitemap-index.xml` return 200 and `http://` redirects.
7. ✅ **Search Console (owner):** add a **URL-prefix** property `https://speakup.tchez.dev/` (verified through the `sc-domain:tchez.dev` domain property; same pattern as `blog.` and `placar.`), submit `sitemap-index.xml`, URL Inspection → Request indexing for `/` and `/en/`. Optionally link the Instagram account in Search Console's channel section.
8. ✅ **Bing Webmaster Tools (owner):** import the site from Search Console and submit the sitemap. Bing's index also feeds ChatGPT and Copilot answers.
9. **Cloudflare Web Analytics (optional, owner):** add the site → set `PUBLIC_CF_ANALYTICS_TOKEN` as an Actions **variable** → re-run the deploy. Not set at launch.
10. ✅ **Links (owner):** every external link that points to SpeakUp updated (list in `CLAUDE.md`).
11. ✅ **Share preview (owner):** LinkedIn Post Inspector and WhatsApp show the OG image and title.
12. **Follow-up (owner, 1–2 weeks):** Search Console → Pages shows `/` and `/en/` indexed; ask ChatGPT, Claude, Gemini and Perplexity (web search on) about a free English conversation group in Palmas and note whether SpeakUp is cited.

## Acceptance criteria

- [x] `npm run build` produces `index.html` (PT), `en/index.html`, `404.html`, `sitemap-index.xml`, `robots.txt`, `CNAME`
- [x] Each page: unique title/description with the target terms, `lang`, canonical, hreflang `pt-BR` / `en` / `x-default`
- [x] `NGO` + `WebSite` JSON-LD present with the fields above; founder is Marco Netto → `https://tchez.dev/`
- [x] OG image 1200×630 with the untouched official logo; previews correctly in LinkedIn Post Inspector and WhatsApp
- [x] The logo file in `public/` is byte-identical to the official `speakup-round.png`
- [x] No "SpeakUp Palmas", old handles, or the founder's full name anywhere in `dist/`
- [x] All six channel CTAs present and pointing at the exact URLs in "Channels"; the build fails while any placeholder media remains
- [x] Certificate shown as "Horas complementares · certificado de participação" with no number of hours; volunteering "also earns complementary hours" with no number
- [x] Hero, logo and Instagram CTA visible without scrolling on a 375 px screen
- [x] All content present with JavaScript disabled; nothing animates or hides under `prefers-reduced-motion: reduce`
- [x] Deck: one slide per wheel/trackpad gesture or key press on desktop, locked during a change; the carousel's ◀ ▶ and ← → step one item at a time at every width
- [x] No request to YouTube/Google before a visitor clicks or navigates onto a video; one player at a time; leaving the slide stops it
- [x] Lighthouse mobile on `/` and `/en/`: **SEO 100, Accessibility ≥ 95, Best Practices ≥ 95, Performance ≥ 90** *(production at launch: 100 / 100 / 100 / 100; `npm run audit`)*
- [x] Every slide checked at 390 px (mobile adaptations above), 1440 px and 2000 px with no horizontal scroll
- [x] `robots.txt` allows the AI crawlers; `/llms.txt` served and generated from the data file; sitemap lists `/` and `/en/`
- [x] Live on `https://speakup.tchez.dev` over HTTPS; PRs to `main` build only, merges deploy; branch protection on `main` and `develop`
- [x] Photos optimized, lazy-loaded, EXIF stripped; `alt` text descriptive, no names
- [x] `README.md` presents the project to visitors; `CLAUDE.md` and this SPEC hold everything needed to work on it; external links updated
- [x] `old/` never reached the public repo; it lives in the owner's vault

## Resolved after launch (owner, 2026-09-23)

- **YouTube identity:** the channel can't be renamed (YouTube blocks it) and stays "SpeakUp Palmas"; accepted, since YouTube is only the video host for the carousel. The name shows inside the player only after a click.
- **Wizard:** the public name is **Wizard Palmas** (official: "Wizard by Pearson Palmas"); the short one fits better, like Marco Netto. The discount is published.
- **Fonts, UI and UX:** confirmed as they are, and the default for future templates and similar sites.
- **iPhone videos:** the design worked but a video didn't start by itself and showed no full-screen control. iOS Safari only autoplays a cross-origin player when muted, so on iOS the player starts muted; YouTube's own controls then offer unmute and full screen. *(Check on a real iPhone.)*
- **Carousel updates:** the carousel is a curated set of highlights (starting with Halloween), not a per-meetup feed; new meetups are posted on Instagram, not added to the site.
- **Cloudflare Web Analytics:** moved to the owner's someday backlog; the site already supports it.
- **Vault:** updated with the site's copy (mission, values, one-liner, partners, channels); a full review of the SpeakUp vault is a dated task on the owner's side.

## History

- **2026-09-22 — first draft:** a one-page site with a stats slide, no scroll hijacking and no autoplay.
- **2026-09-23 — owner's slide-by-slide review.** What changed from the draft and why:
  - **Positioning:** the old one-liner "tirar o inglês da sala de aula" read as anti-school while Wizard is a partner, so SpeakUp is now framed as a complement to classes; new hero title and points.
  - **Structure:** one page → a slide deck ordered by priority, with a Sumário and statement slides; background slides moved to the end.
  - **Removed:** the stats slide (numbers go stale), the "complement, not substitute" slide (merged into "Por que participar?"), Love Intercâmbios, and a "Copiar e-mail" button that was tried and looked off.
  - **Rules relaxed by the owner:** desktop paging with a lock (was "no scroll hijacking") and autoplay after the visitor navigates onto a video (was "no autoplay").
  - **Copy and facts:** owner-written texts for volunteering, mission and the five values; Bee Cool as the usual (not fixed) venue; certificate without a number of hours; partner perks with the Wizard discount first.
  - **Style:** fewer colors and motifs, bigger type, no forced line breaks, no em dashes, real brand icons (Tabler) instead of hand-drawn ones.
  - **Mobile pass:** the adaptations in Scope item 14, plus a header bug (the footer showed "01 Início").
  - **Launch:** AI discoverability (`robots.txt`, `llms.txt`), repo and Pages via `gh`, owner-side DNS, HTTPS, Search Console, Bing and links; repo audit (dead code removed, `npm run audit`, docs reorganized). The old internal-docs archive `old/` never reached the public repo; it lives in the owner's vault.

## Reusing this SPEC for another site

Copy this file as `docs/specs/001-<slug>.md` in the new repo, run the `spec-interview` skill with the vault notes, and replace everything site-specific. What carries over as-is, what to replace, and what this project learned.

### Carries over (the pattern)
- **Stack and repo shape:** Astro static, strict TS, Node 22, `@fontsource`, `@astrojs/sitemap`; `src/data/site.ts` as the single content file; `Base.astro` (SEO head, JSON-LD, conditional Cloudflare beacon); the deploy workflow; `scripts/validate-build.mjs`, `scripts/generate-assets.mjs`, `scripts/lighthouse.mjs`; Playwright desktop + mobile with JS off by default.
- **The deck:** priority-ordered slides, the Sumário built from `slides`, desktop paging with a lock, the scroll-linked docked logo, the progress header, statement slides, the reveal-on-arrival motion, reduced-motion and no-JS fallbacks.
- **The media carousel:** facade videos (nothing loads before a click or navigation), natural-ratio photos, keyboard and swipe.
- **Discoverability:** canonical + hreflang, JSON-LD, OG images from the untouched logo, AI-crawler `robots.txt`, generated `llms.txt`, Search Console URL-prefix + Bing import.
- **Launch runbook** above, with `gh` commands.
- **Docs split:** `README.md` presents the project (OG image, link, what it is); `CLAUDE.md` is for working on it; the SPEC is the what, why and history.

The fonts, UI and UX of this site are the owner-approved default for new templates: change the palette and logo, keep the system.

### Replace per site
- Facts, positioning, copy and retired lines (from the vault, via `spec-interview`); channels; partners; media.
- Palette (sample it from the logo and derive AA text shades), fonts (from the brand materials), logo file and its pinned hash, forbidden identity strings in the validation script.
- Domain, repo name, JSON-LD type (`NGO` here; `Organization`, `Event` or `SoftwareApplication` elsewhere), target search terms.

### Ask the owner up front (each was decided mid-review here)
- **Slide order by priority** and which slides exist: a stats slide? (Removed here: numbers go stale.) A next-event date? (Out here: it goes stale; the date lives on Instagram.)
- **Positioning conflicts with partners** (here: "take English out of the classroom" read as anti-school while a language school is a partner).
- **Interaction:** deck paging with a lock, and autoplay after navigation, both relax "no scroll hijacking" / "no autoplay"; get an explicit yes.
- **Which partners are listed and in what order,** and what each partner is OK with publishing (discounts).
- **Media:** photos (HEIC → JPEG, strip EXIF/GPS) and videos (YouTube, unlisted is fine, with a local cover). Never Instagram embeds.
- **Voice rules:** em dashes, English seasoning, signature line, retired slogans.

### Lessons learned
- **Review slide by slide in the browser** with the owner, at 1440, 2000 and 390 px. Most changes came from seeing it, not from the SPEC.
- **Restraint wins:** fewer colors and motifs, one of each component, bigger type on large screens, no forced line breaks, red text never on blue.
- **Use a real icon library** (Tabler, inlined at build time). Hand-drawn brand icons looked fake.
- **Mobile needs its own pass** after desktop is approved: CTA order, full-width buttons, carousel peek, compact lists, a header bug (the footer counted as no slide) that only showed on phones.
- **Technical gotchas** (also in `CLAUDE.md`): `.section > * { min-width: 0 }`; CSS scroll-snap only without JS; keep `animation-timeline` out of the `animation` shorthand; `position: relative` on the carousel track for `offsetLeft`; a 40 px tolerance so slides that are barely taller than the screen still page; time-based logo flights fight the scroll, so make them scroll-linked.
- **Keep internal docs out of public repos from the first commit:** the old archive nearly shipped in the first commit here.
- **Commit identity is public:** set `git config user.name` to the public name before the first commit.
