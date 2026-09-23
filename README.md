# SpeakUp Community

The [website](https://speakup.tchez.dev) of **SpeakUp Community**, a free, non-profit English conversation community from Palmas – TO, Brazil.

[![Deploy](https://github.com/Tchez/speakup-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Tchez/speakup-portfolio/actions/workflows/deploy.yml)

<a href="https://speakup.tchez.dev"><img src="public/og-pt.png" alt="SpeakUp Community — free English conversation community in Palmas, Tocantins. Click to open the site." width="100%"></a>

## About

SpeakUp holds monthly in-person meetups where anyone, at any level, practices English in a relaxed, judgment-free setting, with debates, games and group activities. The best way to learn English is to practice it.

The site works like a slide deck, in Portuguese ([speakup.tchez.dev](https://speakup.tchez.dev/)) and English ([speakup.tchez.dev/en](https://speakup.tchez.dev/en/)):

- how the meetups work and why to join;
- photos and videos of past editions;
- how to volunteer and who our partners are;
- who we are, our mission and values, and every way to reach us.

**Let's SpeakUp!** Follow [@speakup_cmty](https://www.instagram.com/speakup_cmty/) for the next meetup.

## Repository

```
src/
  data/site.ts      all the text (PT + EN), links, partners, photos and videos
  components/       the slides, the photo/video carousel, icons
  layouts/          page head: SEO, social previews, structured data
  pages/            / (PT), /en/, 404, llms.txt
  assets/           meetup photos and video covers
  styles/           colors, fonts and shared styles
public/             logo, social preview images, robots.txt, CNAME
scripts/            build checks, image generation, Lighthouse audit
tests/              browser tests (desktop and mobile)
docs/specs/         the SPEC: what the site is, why, and its history
```

## Running it locally

Needs Node 22.

```sh
npm ci            # install
npm run dev       # local dev server
npm run build     # build the static site into dist/
npm test          # browser tests
```

Changes go through a pull request to `main`; merging publishes the site on GitHub Pages.

---

Created by [Marco Netto](https://tchez.dev/).
