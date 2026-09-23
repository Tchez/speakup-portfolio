import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

// Run with Node 22: npm run assets
// Builds the 1200×630 share images and favicons from the official logo, which is
// embedded at its native 520×520 size and never altered. Set CHROME_PATH for a
// custom Chromium; otherwise Playwright Chromium or a local Brave is used.
const root = new URL('../', import.meta.url);
const output = new URL('public/', root);
const logoPath = new URL('speakup-round.png', output);

const file = async (path) => (await readFile(new URL(path, root))).toString('base64');

async function browserPath() {
  const candidates = [
    process.env.CHROME_PATH,
    chromium.executablePath(),
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ].filter(Boolean);
  for (const path of candidates) {
    try {
      await access(path);
      return path;
    } catch {
      // Try the next local browser.
    }
  }
  throw new Error('Install Playwright Chromium (npx playwright install chromium) or set CHROME_PATH to a Chromium browser.');
}

const [logo, poppins, montserrat, bebas] = await Promise.all([
  file('public/speakup-round.png'),
  file('node_modules/@fontsource/poppins/files/poppins-latin-800-normal.woff2'),
  file('node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2'),
  file('node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2'),
]);

const browser = await chromium.launch({ executablePath: await browserPath() });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const [locale, badge, headline, place] of [
    ['pt', '100% gratuito', 'Comunidade de conversação em inglês', 'Encontros mensais · Palmas – TO'],
    ['en', '100% free', 'English conversation community', 'Monthly meetups · Palmas – TO, Brazil'],
  ]) {
    await page.setContent(`<!doctype html>
<html lang="${locale === 'pt' ? 'pt-BR' : 'en'}"><head><meta charset="utf-8"><style>
@font-face { font-family: Display; src: url(data:font/woff2;base64,${poppins}); font-weight: 800; }
@font-face { font-family: Body; src: url(data:font/woff2;base64,${montserrat}); font-weight: 100 900; }
@font-face { font-family: Condensed; src: url(data:font/woff2;base64,${bebas}); }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; background: #E7E7E7; color: #14364E; font-family: Body; }
.blob { position: absolute; border-radius: 58% 42% 55% 45% / 45% 55% 45% 55%; }
.blue { width: 380px; height: 380px; background: #2B90D8; top: -170px; left: -150px; }
.red { width: 320px; height: 320px; background: #EF1F22; bottom: -150px; right: -110px; }
.hatch { position: absolute; width: 200px; height: 90px; right: 120px; top: 44px; background: repeating-linear-gradient(-45deg, #EF1F22 0 8px, transparent 8px 18px); }
.logo { position: absolute; left: 50px; top: 55px; width: 520px; height: 520px; }
main { position: absolute; left: 610px; right: 60px; top: 150px; }
.badge { display: inline-block; background: #D0181C; color: #fff; font: 44px/1 Condensed; letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 16px 4px; border-radius: 8px; }
h1 { font: 800 50px/1.1 Display; margin: 26px 0 22px; }
p { font: 600 24px/1.4 Body; letter-spacing: .3px; }
.sign { margin-top: 26px; color: #1F6FB2; font: 800 30px/1 Display; }
</style></head><body>
<div class="blob blue"></div><div class="blob red"></div><div class="hatch"></div>
<img class="logo" src="data:image/png;base64,${logo}" alt="">
<main><span class="badge">${badge}</span><h1>${headline}</h1><p>${place}</p><p class="sign">Let’s SpeakUp!</p></main>
</body></html>`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode()));
    });
    await page.screenshot({ path: fileURLToPath(new URL(`og-${locale}.png`, output)) });
  }
} finally {
  await browser.close();
}

for (const [filename, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  await sharp(fileURLToPath(logoPath)).resize(size, size).png().toFile(fileURLToPath(new URL(filename, output)));
}

for (const filename of ['og-pt.png', 'og-en.png', 'favicon.png', 'apple-touch-icon.png']) {
  const { width, height } = await sharp(fileURLToPath(new URL(filename, output))).metadata();
  process.stdout.write(`${filename}: ${width}×${height}\n`);
}
