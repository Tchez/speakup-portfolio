# SPEC 001 — SpeakUp Community site v1 on speakup.tchez.dev

- **Status:** implemented locally (2026-09-23), revised after the owner's slide-by-slide review — see "Revision log". Not committed or deployed yet.
- **Created:** 2026-09-22 · **Revised:** 2026-09-23
- **Depends on:** none. Reference implementation for stack, CI, validation and tests: the sibling repo `~/projects/personal/portfolio` (the `tchez.dev` portfolio, same owner, same stack, already built).

## Goal

When someone in Brazil searches things like **"praticar inglês Palmas"**, **"comunidade de inglês"** or **"conversação em inglês grátis Tocantins"**, they find **`https://speakup.tchez.dev`**: a clean, professional, colorful site that works like a **slide deck** and shows in seconds what SpeakUp Community is — a **free, non-profit English conversation community** — and sends each kind of visitor to the right next step: **future participants → follow on Instagram** (where every meetup is announced), **volunteers → the sign-up form**, **partners → email**. Visually it's SpeakUp's own identity: bright, friendly, animated, but calm and restrained.

Most visitors never reach the end, so **the slides are ordered by priority**: what a future participant needs comes first, background (who we are, mission, values) comes last.

## Context

### What SpeakUp Community is (source of truth for all copy — use these facts only)
- **Positioning:** SpeakUp is a **complement** to school, courses and self-study — the place to **practice** what you learn — never an alternative to classes. Language schools are partners (Wizard), so copy must never set SpeakUp against classes or schools. Key message: *the best way to learn English is to practice it, and you can do that without leaving Palmas*.
- **Mission (PT):** **Fazer as pessoas falarem inglês.** Criar oportunidades para praticar inglês gratuitamente, com interações reais, sem precisar sair do Brasil, ganhar confiança e criar conexões. Sempre num ambiente agradável e livre de julgamentos.
- **Published "who we are" text (PT, use its wording as-is; the site splits it into a statement + paragraph):** *Somos uma comunidade gratuita e sem fins lucrativos. Organizamos encontros voltados para a prática da conversação em inglês. Aqui, aprendemos juntos, compartilhamos experiências e nos apoiamos no aprendizado do idioma diariamente!*
- **Retired lines — never use:** the old one-liner *"uma comunidade para tirar o inglês da sala de aula e colocar em prática"* (it doesn't say what SpeakUp is and reads as anti-school) and the old slogan *"Transforme seu inglês, amplie seu mundo!"*.
- **Values (owner, 2026-09-23 — replaces the earlier seven):**
  - **Acolhimento** — criar um ambiente em que as pessoas se sintam confortáveis para participar, independentemente do nível de inglês.
  - **Respeito** — respeitar diferenças culturais, opiniões e os limites de cada participante.
  - **Colaboração** — incentivar a troca de conhecimentos e a ajuda mútua entre os participantes.
  - **Acessibilidade** — reduzir barreiras que dificultem a participação das pessoas na comunidade.
  - **Diversidade** — valorizar diferentes experiências, culturas e formas de expressão.
- **Why take part (owner's "Por que participar?" post):** praticar e melhorar seu inglês, ganhar horas complementares, ganhar confiança para se comunicar, fazer novas amizades, destacar-se profissionalmente, expandir suas oportunidades. **Anyone can take part — no level required.**
- **Meetups:** in person, **once a month**, **usually at Bee Cool Hostel** in Palmas – TO (not a fixed venue). Free. A relaxed setting with **debates, games and group activities**; you can come without knowing anyone and meet lots of people. **Themed editions** exist: **SpookUp** (Halloween) and the **Summer Edition**. Each meetup's date, time and place are announced on Instagram — the site **does not** show a date (it would go stale; see Out). The Remote Edition is on standby and not mentioned.
- **Certificate:** participants get a **certificate of participation for complementary hours ("horas complementares")**. The site says "Horas complementares · certificado de participação" and **does not state a number of hours**. Volunteering also earns complementary hours (no number either).
- **Volunteering:** volunteers make the meetups happen — creating activities and games, helping with organization and logistics and, above all, **marketing**. No fixed commitment (help when and as much as you can); you gain hands-on experience, practice English and build your network, and earn complementary hours.
- **Numbers:** **not shown on the site** (owner, 2026-09-23). Attendance, meetup counts and volunteer counts change constantly and would go stale; "50+ people" was a peak, not an average.
- **Partners (two, text cards; Wizard first — the most important partnership):**
  - **Wizard Palmas** (official name on certificates: "Wizard by Pearson Palmas") — language school. **Discounted enrollment and course fees for people who come through SpeakUp** (the key differentiator, highlighted), issues the complementary-hours certificates, supports themed events such as SpookUp (Halloween).
  - **Bee Cool Hostel** — where most in-person meetups take place; **discounts on drinks and food** for SpeakUp participants.
  - **Love Intercâmbios** is no longer listed (owner, 2026-09-23). The Dublin international edition (December 2025) still appears in the media carousel.
  - Text cards only unless the owner supplies partner logo files. Never download, recreate or approximate a partner's logo.
- **Media (owner-supplied):** meetup photos (converted from HEIC, EXIF/GPS stripped before committing) and meetup videos uploaded to YouTube as Shorts (vertical), including the 1st, 4th, 16th and 17th meetups, SpookUp and the Dublin edition.

### Identity rules (non-negotiable)
- The name is **SpeakUp Community** (short: SpeakUp). **Never "SpeakUp Palmas".** Instagram handle **`@speakup_cmty`** — never the old handles `@speakup_palmas` or `@SPEAKUP_BR`. The same applies to the YouTube channel's display name and video titles (see Open questions).
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
   - `@astrojs/sitemap` with i18n; `public/robots.txt` pointing at `https://speakup.tchez.dev/sitemap-index.xml`; a bilingual `404.astro`; `public/CNAME` with `speakup.tchez.dev`.
6. **Analytics:** Cloudflare Web Analytics beacon rendered only when `PUBLIC_CF_ANALYTICS_TOKEN` is set at build time (GitHub Actions repository **variable**).
7. **CI/CD:** PR → `main` runs install, `astro check`, build, `validate`; push → `main` also uploads `dist/` and deploys through a separate `github-pages` environment job (`pages: write`, `id-token: write`, concurrency `pages`). Pinned: `actions/checkout@v4`, `actions/setup-node@v4` (22), `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
8. **Build validation** (`scripts/validate-build.mjs`): metadata/hreflang/canonical/JSON-LD per page; all six channels; the "Horas complementares" certificate line; the official logo's SHA-256 (byte-identical); **fails if any `placeholder-*` media is in the build**; fails on "SpeakUp Palmas", "@speakup_palmas", "SPEAKUP_BR", "Marco Antônio", "Martins", "Porto" anywhere in `dist/`.
9. **Deck navigation (desktop ≥ 1024 × 640):** wheel, trackpad and keys (↑ ↓, PageUp/PageDown, Space, Home/End) move **exactly one slide** with a fixed-duration animation (≈1.1 s to/from the hero, ≈0.7 s otherwise). While a change runs the deck is **locked**: extra, reversed or momentum input is ignored until the slide has arrived and input has been quiet. Slides a few pixels taller than the screen still page normally; genuinely taller slides scroll inside until their edge. Phones scroll freely. Without JS, native CSS scroll-snap is the fallback. *(Owner decision: this intentionally relaxes the original "no scroll hijacking" rule.)*
10. **Progress header (JS only):** a floating bar hidden on the hero that slides in with the scroll: docked logo (back to the hero) → slide number + name → clickable progress segments → icon-only Instagram and index (`Índice`) buttons. The hero logo flies into the header with the scroll position (scroll-linked, both directions) and turns once per slide change.
11. **Media carousel ("Nossos encontros"):** horizontal strip of photos (natural aspect ratio) and YouTube Shorts (9:16) at one shared height that follows the screen height, so the slide fits one screen. ◀ ▶ buttons, ← → keys whenever the slide is on screen (↑ ↓ stay with the deck), swipe. Videos are a **facade** with a local cover: **nothing loads from YouTube on page load**; the privacy-enhanced player (`youtube-nocookie.com`) starts when the visitor clicks a cover **or navigates onto a video**, only one plays at a time, and moving off it or leaving the slide stops it. No autoplay on page load or under reduced motion; without JS each cover links to the video. *(Owner decision: autoplay after the visitor's own navigation relaxes the original "no autoplay" rule.)* Never embed Instagram (Meta script, tracking, login wall).
12. **Accessibility & motion:** semantic landmarks, one `h1`, visible focus, keyboard reachable, WCAG AA contrast (never red text on the blue field — use a red tag with white text or white text with a red accent instead). Everything visible without JS; every animation off under `prefers-reduced-motion: reduce`.
13. **Repo docs:** `CLAUDE.md` (stack, commands, architecture, identity rules, "never commit/push unless asked") and `README.md` (keeps the "After `speakup.tchez.dev` goes live — update every link" checklist and explains how to add photos and videos).

**Out:**
- Org structure (Heads/Leads/ADMs/areas), post templates, operations, internal docs — internal, never on the site.
- A numbers/stats slide (goes stale — owner, 2026-09-23).
- Next-meetup date/countdown block and its automation (future SPEC), the Remote Edition (on standby), a history/timeline section, FAQ, a blog/news section.
- Other outreach partners (IFTO, Afya, Ulbra) and Love Intercâmbios — can be added later via the data file.
- Instagram embeds; forms or any data collection on the site itself; cookies/consent banners; other tracking.
- Changes to DNS, other repos, the YouTube channel or the vault — the owner does those.
- Deleting `old/` (the owner does it). Committing or pushing.

## Design

The look comes from SpeakUp's own Instagram/Canva materials. Font names are **inferred from images — confirm against the owner's Canva**.

- **Colors:** sampled from the official logo — blue `#2B90D8`, red `#EF1F22`, navy `#14364E`, light grey `#E7E7E7`. The raw blue and red fail AA for white body text, so text surfaces use darker shades (blue `#1F6FB2`, red `#D0181C`, blue text `#1B67A6`, red text `#C4161B`). **Restrained palette:** the hero is grey with the only two decorative blobs; every other slide is white or blue; navy is reserved for body text and the footer; red is for highlights, buttons and small accents.
- **Type — one role per typeface:** Poppins 800 for headings and the signature; Montserrat for all running text, buttons and lists; Bebas Neue only for short uppercase labels. Sizes are fluid, so slides don't look small on large monitors. The script "SpeakUp" lettering exists **only inside the logo image**.
- **One of each component:** card, red pill button, slide title with a short red bar, label, lead paragraph. Keywords in running text are red bold on white slides and white bold with a red underline on blue slides (plain bold on the mission slide). No forced early line breaks: lead text runs up to ~80 characters per line and titles use the full width with balanced breaks.
- **Statement slides** (Quem somos, Nossa missão): one idea per slide — label, one large statement, one supporting paragraph.
- **Motion — light and purposeful:** each slide's content rises in, in reading order, when the slide arrives (again on re-entry); blue slides open from a rounded card to full bleed; the hero blobs drift slowly; a small confetti burst on the hero Instagram CTA; the scroll-linked logo flight; one logo turn per slide change. No 3D. All of it off under reduced motion.
- **Layout:** mobile-first — most visitors come from Instagram on a phone. The hero shows the logo, title and Instagram CTA without scrolling on a 375 px screen.

## Launch runbook (owner, by hand — in this order)

1. **GitHub repo** `Tchez/speakup-portfolio` (public); push `main` + `develop`; website field `https://speakup.tchez.dev`.
2. **Branch protection** like the siblings: `main` requires a PR + the `build` check, no deletion, no force-push (admin bypass allowed); `develop` no deletion, no force-push.
3. **Pages:** Settings → Pages → Source **GitHub Actions**; Settings → Environments → `github-pages` → allow `main`.
4. **DNS (Cloudflare):** add `CNAME speakup → tchez.github.io`, **DNS only** (grey cloud). Check `dig speakup.tchez.dev +short`.
5. **First deploy:** PR `develop → main`, green check, merge.
6. **Custom domain:** Settings → Pages → `speakup.tchez.dev` → after "DNS check successful", tick **Enforce HTTPS** once the certificate is issued.
7. **Search Console:** add URL-prefix property `https://speakup.tchez.dev/` (verified through the domain property); submit `https://speakup.tchez.dev/sitemap-index.xml`; request indexing for `/` and `/en/`.
7b. **Bing Webmaster Tools:** add the site by importing it from Search Console (no extra verification) and submit the sitemap; Bing's index also feeds ChatGPT and Copilot answers. After a few days, ask ChatGPT, Claude, Gemini and Perplexity (web search on) about a free English conversation group in Palmas and note whether SpeakUp is cited.
8. **Cloudflare Web Analytics:** add site `speakup.tchez.dev` (JS snippet) → set `PUBLIC_CF_ANALYTICS_TOKEN` as an Actions variable → re-run the deploy.
9. **Update every link that points to SpeakUp** — the checklist in `README.md` (Instagram bio, LinkedIn page, Discord, WhatsApp, the SpeakUp card on `tchez.dev`, event material).
10. Check a share preview (Instagram link sticker / WhatsApp / LinkedIn Post Inspector) for `https://speakup.tchez.dev/`.

## Acceptance criteria

- [x] `npm run build` produces `index.html` (PT), `en/index.html`, `404.html`, `sitemap-index.xml`, `robots.txt`, `CNAME`
- [x] Each page: unique title/description with the target terms, `lang`, canonical, hreflang `pt-BR` / `en` / `x-default`
- [x] `NGO` + `WebSite` JSON-LD present with the fields above; founder is Marco Netto → `https://tchez.dev/`
- [ ] OG image 1200×630 with the untouched official logo; previews correctly in LinkedIn Post Inspector *(image done; the live preview needs the deployed URL)*
- [x] The logo file in `public/` is byte-identical to the official `speakup-round.png`
- [x] No "SpeakUp Palmas", old handles, or the founder's full name anywhere in `dist/`
- [x] All six channel CTAs present and pointing at the exact URLs in "Channels"; the build fails while any placeholder media remains
- [x] Certificate shown as "Horas complementares · certificado de participação" with no number of hours; volunteering "also earns complementary hours" with no number
- [x] Hero, logo and Instagram CTA visible without scrolling on a 375 px screen
- [x] All content present with JavaScript disabled; nothing animates or hides under `prefers-reduced-motion: reduce`
- [x] Deck: one slide per wheel/trackpad gesture or key press on desktop, locked during a change; the carousel's ◀ ▶ and ← → step one item at a time at every width
- [x] No request to YouTube/Google before a visitor clicks or navigates onto a video; one player at a time; leaving the slide stops it
- [x] Lighthouse mobile on `/` and `/en/`: **SEO 100, Accessibility ≥ 95, Best Practices ≥ 95, Performance ≥ 90**
- [x] Photos optimized, lazy-loaded, EXIF stripped; `alt` text descriptive, no names
- [x] Workflow: PRs build only; pushes to `main` build and deploy
- [x] `CLAUDE.md` and `README.md` describe the real setup; README link-update checklist kept
- [ ] Nothing committed or pushed; `old/` untouched *(true today — until the owner's first commit)*

## Open questions

None block the launch.
- **YouTube identity** — the channel's display name is "SpeakUp Palmas" and the 1st and 4th meetup videos are titled "… SpeakUp Palmas"; it shows inside the player after a click. The owner renames them in YouTube Studio.
- **Wizard** — confirm the public name ("Wizard Palmas" vs the official "Wizard by Pearson Palmas") and that Wizard agrees with the enrollment/course discount being published.
- **Fonts** — confirm Poppins / Montserrat / Bebas Neue against the Canva materials.
- **Safari/iOS autoplay** — check on a real iPhone whether videos start by themselves after navigation or need a tap (browser policy).
- **Vault** — the vault notes still carry the old one-liner, the seven old values and Bee Cool as a fixed venue; the owner updates them.

## Revision log

**2026-09-23 — owner's slide-by-slide review** (decisions made by the owner while reviewing the implemented site):
- **Positioning:** retired the "tirar o inglês da sala de aula" one-liner; SpeakUp is presented as a complement to classes (Wizard is a partner). New hero title, two points (free monthly meetups, all levels), CTA "Fique por dentro no Instagram"; removed the "date and time on Instagram" note from the hero.
- **Structure:** one-page site → slide deck ordered by priority; added the Sumário slide; split "Quem somos" into statement slides (Quem somos, Nossa missão); moved background slides to the end.
- **Removed:** the "Complemento, não substituto" slide (its message now lives in "Por que participar?"), the numbers slide (goes stale), Love Intercâmbios from partners.
- **Renamed / rewritten:** "Quem pode participar?" → "Por que participar?" with benefits and "qualquer pessoa pode participar"; "Seja voluntário" → "Apoie nossa comunidade" with the owner's text (marketing, no fixed commitment, experience, networking, complementary hours); "Fotos" → "Nossos encontros" (photos + videos); new mission paragraph (free, real interactions, without leaving Brazil, welcoming and judgment-free); five new values.
- **Facts corrected:** Bee Cool is the usual, not fixed, venue; themed editions added; certificate shown as participation certificate without "3h"; partner perks added (Wizard discount first and highlighted, certificates, themed-event support; Bee Cool food and drink discounts).
- **Interaction:** progress header with docked logo; scroll-linked logo flight; one slide per gesture with a lock (relaxes "no scroll hijacking"); media carousel with YouTube Shorts and autoplay after navigation (relaxes "no autoplay").
- **Contact:** new Discord invite (`discord.gg/azsgD8T5tP`); contact slide rebuilt as airy two-column rows with real brand icons (Tabler Icons) and a description per channel, no URLs; removed "Escolha o canal que preferir". A "Copiar e-mail" button was tried next to the partnership `mailto:` and removed (owner: looked off).
- **Style:** fewer colors and motifs (blobs only on the hero; no hatching, outlined words or confetti field); no em dashes in copy; no forced early line breaks.
- **Mobile pass (2026-09-23):** on phones the meetups CTA moves below the facts; section CTAs are full width with the icon flowing on the first line when the label wraps; the media strip runs edge to edge so the next item peeks in, with its height capped by the width; tighter agenda and benefit lists; hero checks aligned in one column; the header's progress starts after the docked logo, the bar is more opaque and the index fits the screen without inner scrolling; the header shows the last slide when the footer is on screen.
- **Discoverability (2026-09-23):** `robots.txt` explicitly allows the AI crawlers (same policy as the sibling `placar`); `/llms.txt` generated from `src/data/site.ts`; validation guards both. Bing Webmaster step added to the runbook. `old/` removed from the repo (internal docs, kept only on the owner's disk and ignored).
