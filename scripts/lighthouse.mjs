import { existsSync } from 'node:fs';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

// Run with a preview up (npm run build && npm run preview): npm run audit
// Mobile Lighthouse on both homes against the SPEC 001 bar. Set AUDIT_URL to audit another host (e.g. production)
// and CHROME_PATH for a custom Chromium; otherwise a local Brave or the system Chrome is used.
const base = process.env.AUDIT_URL ?? 'http://127.0.0.1:4331';
const targets = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 100 };
const brave = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const chromePath = process.env.CHROME_PATH ?? (existsSync(brave) ? brave : undefined);

const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ['--headless=new'] });
let failed = false;
try {
  for (const path of ['/', '/en/']) {
    const { lhr } = await lighthouse(`${base}${path}`, { port: chrome.port, onlyCategories: Object.keys(targets), output: 'json' });
    const scores = Object.entries(targets).map(([key, min]) => {
      const score = Math.round((lhr.categories[key].score ?? 0) * 100);
      if (score < min) failed = true;
      return `${key} ${score}${score < min ? ` (< ${min})` : ''}`;
    });
    console.log(`${path}: ${scores.join(' · ')}`);
  }
} finally {
  await chrome.kill();
}
if (failed) {
  console.error('Lighthouse is below the SPEC 001 bar (performance 90, accessibility 95, best practices 95, SEO 100).');
  process.exit(1);
}
