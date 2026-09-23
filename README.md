# SpeakUp Portfolio

Public site for **SpeakUp Community** — a free, non-profit English conversation community from Palmas – TO — at **`speakup.tchez.dev`**. Its job is to be found on Google and send future participants to Instagram, volunteers to the sign-up form and partners to email. Internal docs (org structure, templates, operations) live in the owner's vault and Drive, **never on this site**.

## Current status (2026-09-22)

- **SPEC 001 implemented locally** ([`docs/specs/001-speakup-site.md`](docs/specs/001-speakup-site.md)): Astro static one-pager, Portuguese at `/`, English at `/en/`, bilingual 404, SEO (canonical, hreflang, Open Graph, `NGO` + `WebSite` JSON-LD, sitemap, robots), conditional Cloudflare Web Analytics and GitHub Pages CI/CD. Lighthouse mobile on both homes: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- **Media done:** the "Nossos encontros" carousel has 6 real photos and 7 YouTube Shorts; `npm run validate` passes.
- **To confirm with the owner:** the fonts (Poppins / Montserrat / Bebas Neue, inferred from the Canva materials).
- **`old/`** is the old Docusaurus archive; the owner deletes it. Only the official logo was taken from it.

## Stack

Astro 7 · TypeScript (strict) · static output · Node 22 · GitHub Pages via GitHub Actions · Playwright tests · self-hosted fonts via `@fontsource`. Stack, CI and validation mirror the sibling repo `~/projects/personal/portfolio`.

```sh
nvm use            # Node 22
npm ci
npm run dev        # local dev server
npm run check      # astro check
npm run build      # → dist/
npm run validate   # static acceptance checks on dist/
npm run preview -- --host 127.0.0.1 --port 4331
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4331 npm test
npm run assets     # regenerate OG images and favicons from the official logo
```

## Editing content

Everything the owner edits lives in **`src/data/site.ts`**: PT and EN copy, channel URLs, partners and the carousel media.

### Adding photos and videos to the carousel

All carousel items live in `media` in `src/data/site.ts`, in display order.

- **Photo:** put the file in `src/assets/photos/` (any aspect ratio; it keeps its shape). Convert HEIC to JPEG first (`sips -s format jpeg in.heic --out out.jpg`) and **strip EXIF/GPS** before committing — the repo is public. Add an entry with `alt` in `pt` and `en` that describes the scene and never names people.
- **Video:** upload to YouTube (unlisted is fine), save its vertical cover to `src/assets/videos/` (`https://i.ytimg.com/vi/<id>/oar2.jpg`, or `oar1.jpg` if that 404s) and add `{ type: 'video', youtubeId, orientation, poster, title }`. Nothing loads from YouTube until a visitor clicks play.
- Files named `placeholder-*` make `npm run validate` fail, so a stand-in can never ship by accident.

## Deploy

- PRs to `main` run install → `astro check` → build → validate.
- Pushes to `main` also upload `dist/` and deploy through the `github-pages` environment.
- `PUBLIC_CF_ANALYTICS_TOKEN` (Actions repository **variable**) turns on the Cloudflare Web Analytics beacon; unset means no beacon.
- The launch steps (GitHub repo, branch protection, Pages, Cloudflare DNS, custom domain, Search Console, analytics) are in the SPEC's "Launch runbook" and are done by hand by the owner.

## After `speakup.tchez.dev` goes live — update every link that points to SpeakUp

The community's public docs have had no public URL since they left the blog on 2026-09-22 (the old `tchez.dev/pt/notes/speakup-community/` is a permanent 404, and the Instagram bio link to it was already removed). Once the site is live, point all of these at `https://speakup.tchez.dev`:

- [ ] Instagram `@speakup_cmty` — bio link
- [ ] LinkedIn company page (`https://www.linkedin.com/company/speakup-cmty`) — website field
- [ ] Discord server (`https://discord.gg/azsgD8T5tP`) — server description / welcome or rules channel
- [ ] WhatsApp group (`https://chat.whatsapp.com/FI9mvqI9z1CAyjZFEXLpGu`) — group description
- [ ] Portfolio `tchez.dev` — the SpeakUp Community project card (today it links LinkedIn + Instagram) → add `speakup.tchez.dev` as the main link
- [ ] Any event material that prints a link (post templates, certificates, feedback forms) — check `speakup-automations` and the Drive templates for the old URL
- [ ] Search Console — add a URL-prefix property `https://speakup.tchez.dev/` (the domain property `sc-domain:tchez.dev` already covers it) and submit the sitemap
