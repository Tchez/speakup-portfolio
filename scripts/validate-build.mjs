import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../dist/', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const site = 'https://speakup.tchez.dev/';
const expectedAnalytics = Boolean(process.env.PUBLIC_CF_ANALYTICS_TOKEN);
// SHA-256 of the official logo (old/static/img/speakup/speakup-round.png). It must ship unchanged.
const logoHash = '8d7214bdd133edf0664e3c867d66b429db76a07f7d42295cda09cd60adceb014';
const channels = [
  'https://www.instagram.com/speakup_cmty/',
  'https://chat.whatsapp.com/FI9mvqI9z1CAyjZFEXLpGu',
  'https://discord.gg/azsgD8T5tP',
  'https://www.linkedin.com/company/speakup-cmty',
  'https://docs.google.com/forms/d/e/1FAIpQLSc-VSmezGF7007Vds1O1p270gA2M3Ez_EpJNZ2dtKs2APDg3Q/viewform',
  'mailto:speakup.palmas@gmail.com',
];
const forbidden = /SpeakUp Palmas|@speakup_palmas|SPEAKUP_BR|Marco Antônio|Martins|Porto/i;
const titles = new Set();
const descriptions = new Set();

for (const [locale, path, language, ogLocale, terms, hours] of [
  ['pt', '', 'pt-BR', 'pt_BR', ['praticar inglês', 'comunidade', 'conversação', 'Palmas', 'Tocantins'], 'Horas complementares'],
  ['en', 'en/', 'en', 'en_US', ['practice English', 'community', 'conversation', 'Palmas', 'Tocantins'], 'Complementary hours'],
]) {
  const html = await read(`${path}index.html`);
  const url = `${site}${path}`;
  assert.ok(html.includes(`<html lang="${language}">`), `${locale}: document language`);
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`), `${locale}: canonical`);
  for (const [lang, href] of [['pt-BR', ''], ['en', 'en/'], ['x-default', '']]) {
    assert.ok(html.includes(`<link rel="alternate" hreflang="${lang}" href="${site}${href}">`), `${locale}: ${lang} alternate`);
  }
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  titles.add(title);
  descriptions.add(description);
  assert.ok(title?.startsWith('SpeakUp Community — '), `${locale}: title`);
  assert.ok(description.length >= 120 && description.length <= 165, `${locale}: description length ${description.length}`);
  for (const term of terms) assert.ok(description.toLowerCase().includes(term.toLowerCase()), `${locale}: description mentions "${term}"`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${locale}: one h1`);
  assert.ok(!/<meta[^>]+(?:noindex|http-equiv="refresh")/.test(html), `${locale}: indexable, no automatic redirect`);
  assert.ok(html.includes(`property="og:locale" content="${ogLocale}"`), `${locale}: og:locale`);
  assert.ok(html.includes(`property="og:image" content="${site}og-${locale}.png"`), `${locale}: og:image`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${locale}: twitter card`);
  const image = await sharp(new URL(`og-${locale}.png`, root).pathname).metadata();
  assert.deepEqual([image.width, image.height, image.format], [1200, 630, 'png'], `${locale}: og image size`);

  for (const href of channels) assert.ok(html.includes(`href="${href}"`), `${locale}: channel ${href}`);
  assert.ok(html.includes(hours), `${locale}: complementary-hours certificate`);
  assert.ok(html.includes(`href="${locale === 'pt' ? '/en/' : '/'}"`), `${locale}: language switcher`);
  assert.ok(/href="https:\/\/tchez\.dev\/"[^>]*>Marco Netto<\/a>/.test(html), `${locale}: founder credit`);
  assert.ok(html.includes('Let’s SpeakUp!'), `${locale}: signature`);

  const beacon = html.match(/<script[^>]+src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js"[^>]*>/)?.[0];
  assert.equal(Boolean(beacon), expectedAnalytics, `${locale}: conditional analytics`);
  if (beacon) {
    const data = beacon.match(/data-cf-beacon="([^"]+)"/)?.[1].replaceAll('&#34;', '"').replaceAll('&quot;', '"');
    assert.equal(JSON.parse(data).token, process.env.PUBLIC_CF_ANALYTICS_TOKEN, 'beacon uses supplied token');
  }

  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? 'null');
  assert.equal(schema['@context'], 'https://schema.org');
  const ngo = schema['@graph'].find((entity) => entity['@type'] === 'NGO');
  const website = schema['@graph'].find((entity) => entity['@type'] === 'WebSite');
  assert.equal(ngo.name, 'SpeakUp Community');
  assert.equal(ngo.alternateName, 'SpeakUp');
  assert.equal(ngo.url, site);
  assert.equal(ngo.logo, `${site}speakup-round.png`);
  assert.equal(ngo.description, description.replaceAll('&#39;', '’'));
  assert.equal(ngo.foundingDate, '2025-01');
  assert.deepEqual(ngo.founder, { '@type': 'Person', name: 'Marco Netto', url: 'https://tchez.dev/' });
  assert.deepEqual(ngo.address, { '@type': 'PostalAddress', addressLocality: 'Palmas', addressRegion: 'TO', addressCountry: 'BR' });
  assert.equal(ngo.areaServed, 'Palmas, Tocantins, Brasil');
  assert.equal(ngo.email, 'speakup.palmas@gmail.com');
  assert.deepEqual(ngo.sameAs, [channels[0], channels[3]]);
  assert.deepEqual(website.inLanguage, ['pt-BR', 'en']);
  assert.equal(website.publisher['@id'], ngo['@id']);
}
assert.equal(titles.size, 2, 'unique home titles');
assert.equal(descriptions.size, 2, 'unique home descriptions');

const sitemap = await read('sitemap-0.xml');
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [site, `${site}en/`]);
for (const language of ['pt-BR', 'en']) assert.equal((sitemap.match(new RegExp(`hreflang="${language}"`, 'g')) ?? []).length, 2);
assert.ok((await read('sitemap-index.xml')).includes(`${site}sitemap-0.xml`));
assert.ok((await read('robots.txt')).includes(`Sitemap: ${site}sitemap-index.xml`));
const robots = await read('robots.txt');
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`), `robots.txt: ${bot} must be allowed`);
assert.ok(!/Disallow: \/\s*$/m.test(robots), 'robots.txt must not disallow the whole site');
const llms = await read('llms.txt');
assert.ok(llms.startsWith('# SpeakUp Community\n\n> '), 'llms.txt: title + summary blockquote (llmstxt.org)');
for (const needle of [site, `${site}en/`, 'https://www.instagram.com/speakup_cmty/', '## In English']) assert.ok(llms.includes(needle), `llms.txt: missing ${needle}`);
assert.ok(!llms.includes('**'), 'llms.txt: markdown emphasis markers leaked from the copy');
assert.equal((await read('CNAME')).trim(), 'speakup.tchez.dev');
const notFound = await read('404.html');
assert.ok(notFound.includes('Página não encontrada.') && notFound.includes('Page not found.'), '404: bilingual');
assert.ok(notFound.includes('href="/"') && notFound.includes('href="/en/"'), '404: home links');
assert.ok(/<meta name="robots" content="noindex/.test(notFound), '404: noindex');

const logo = await readFile(new URL('speakup-round.png', root));
assert.equal(createHash('sha256').update(logo).digest('hex'), logoHash, 'official logo shipped byte-identical');

const placeholders = [];
async function scan(directory = '') {
  for (const entry of await readdir(new URL(directory, root), { withFileTypes: true })) {
    const path = `${directory}${entry.name}`;
    if (entry.isDirectory()) await scan(`${path}/`);
    else {
      if (/(?:^|\/)placeholder-[^/]*$/.test(path)) placeholders.push(path);
      if (/\.(?:html|css|js|json|xml|txt|svg)$/.test(path)) {
        const match = (await read(path)).match(forbidden);
        assert.ok(!match, `forbidden identity string "${match?.[0]}" in ${path}`);
      }
    }
  }
}
await scan();

// Last on purpose: every other check has run by the time this one fails.
if (placeholders.length) {
  process.stderr.write(`Gallery still has ${placeholders.length} placeholder image file(s) in dist/ (e.g. ${placeholders[0]}).\n`
    + 'Add the real meetup photos to src/assets/photos/ and update `media` in src/data/site.ts before shipping.\n');
  process.exit(1);
}
process.stdout.write(`Static acceptance checks passed (analytics ${expectedAnalytics ? 'enabled' : 'disabled'}).\n`);
