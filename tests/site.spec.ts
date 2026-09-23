import { expect, test } from '@playwright/test';

const channels = {
  instagram: 'https://www.instagram.com/speakup_cmty/',
  whatsapp: 'https://chat.whatsapp.com/FI9mvqI9z1CAyjZFEXLpGu',
  discord: 'https://discord.gg/azsgD8T5tP',
  linkedin: 'https://www.linkedin.com/company/speakup-cmty',
  volunteerForm: 'https://docs.google.com/forms/d/e/1FAIpQLSc-VSmezGF7007Vds1O1p270gA2M3Ez_EpJNZ2dtKs2APDg3Q/viewform',
  email: 'mailto:speakup.palmas@gmail.com',
};

for (const locale of ['pt', 'en'] as const) {
  const path = locale === 'pt' ? '/' : '/en/';
  const otherPath = locale === 'pt' ? '/en/' : '/';
  const ctaText = locale === 'pt' ? 'Fique por dentro no Instagram' : 'Stay in the loop on Instagram';

  test(`${locale}: hero, logo and Instagram CTA above the fold without JavaScript`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    const viewport = page.viewportSize()!;
    for (const locator of [page.locator('.hero-logo'), page.locator('h1'), page.locator('#inicio').getByRole('link', { name: ctaText })]) {
      const box = await locator.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
    }
    await expect(page.locator('#inicio').getByRole('link', { name: ctaText })).toHaveAttribute('href', channels.instagram);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test(`${locale}: every section and channel is in the static page`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('main h2')).toHaveCount(10);
    await expect(page.locator('.deck-progress li')).toHaveCount(11);
    await expect(page.locator('.value')).toHaveCount(5);
    await expect(page.locator('.partner-list > li')).toHaveCount(2);
    const photos = page.locator('.media-photo img');
    expect(await photos.count()).toBeGreaterThanOrEqual(6);
    expect(await page.locator('.media-track img[src*="placeholder"], .media-track img[srcset*="placeholder"]').count()).toBe(0);
    for (const image of await photos.all()) {
      await expect(image).toHaveAttribute('loading', 'lazy');
      expect((await image.getAttribute('alt'))?.length).toBeGreaterThan(10);
    }
    // Videos: a lazy local cover (decorative) inside a labelled link to YouTube; no player until a click.
    const videos = page.locator('.media-track a[data-youtube]');
    expect(await videos.count()).toBeGreaterThanOrEqual(1);
    for (const video of await videos.all()) {
      await expect(video).toHaveAttribute('href', /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
      expect((await video.getAttribute('aria-label'))?.length).toBeGreaterThan(10);
      await expect(video.locator('img')).toHaveAttribute('loading', 'lazy');
    }
    await expect(page.locator('.media-track iframe')).toHaveCount(0);
    for (const [key, href] of Object.entries(channels)) {
      await expect(page.locator(`.link-${key}`)).toHaveAttribute('href', href);
    }
    await expect(page.locator(`a[href="${channels.volunteerForm}"]`)).toHaveCount(2);
    await expect(page.locator(`a[href="${channels.email}"]`)).toHaveCount(2);
    await expect(page.getByRole('link', { name: 'Marco Netto' })).toHaveAttribute('href', 'https://tchez.dev/');
    for (const element of await page.locator('[data-reveal]').all()) await expect(element).toHaveCSS('opacity', '1');
  });

  test(`${locale}: language switcher goes to the same page in the other language`, async ({ page }) => {
    await page.goto(path);
    const switcher = page.locator('.hero-top .language-link');
    await expect(switcher).toHaveAttribute('href', otherPath);
    await switcher.click();
    await expect(page).toHaveURL(new RegExp(`${otherPath}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'en' : 'pt-BR');
  });

  test(`${locale}: keyboard focus is visible on every link`, async ({ page }) => {
    await page.goto(path);
    const focusable = page.locator('a[href]:visible, summary:visible, [tabindex="0"]:visible');
    const count = await focusable.count();
    await page.keyboard.press('Tab'); // skip link
    await expect(page.locator('.skip-link')).toBeFocused();
    for (let index = 1; index < count; index++) {
      await page.keyboard.press('Tab');
      await expect(focusable.nth(index)).toBeFocused();
      const outline = await focusable.nth(index).evaluate((element) => getComputedStyle(element).outlineStyle);
      expect(outline).not.toBe('none');
    }
  });
}

test.describe('with JavaScript', () => {
  test.use({ javaScriptEnabled: true });

  test('reduced motion: nothing animates and nothing hides', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#inicio').getByRole('link', { name: 'Fique por dentro no Instagram' }).hover();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(page.locator('.confetti-piece')).toHaveCount(0);
    const moving = await page.locator('body *').evaluateAll((elements) => elements.filter((element) => {
      const styles = [getComputedStyle(element), getComputedStyle(element, '::before'), getComputedStyle(element, '::after')];
      return styles.some((style) => style.animationName !== 'none' || style.transitionDuration.split(',').some((value) => parseFloat(value) > 0));
    }).length);
    expect(moving).toBe(0);
    for (const element of await page.locator('[data-reveal]').all()) await expect(element).toHaveCSS('opacity', '1');
  });

  test('motion: slides reveal their content and the CTA bursts confetti', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveClass(/motion/);
    await page.locator('#inicio').getByRole('link', { name: 'Stay in the loop on Instagram' }).hover();
    await expect(page.locator('.confetti-piece').first()).toBeAttached();
    const partners = page.locator('#parceiros');
    await partners.scrollIntoViewIfNeeded();
    await expect(partners.locator('[data-reveal]').first()).toHaveClass(/is-visible/);
  });
});

test.describe('deck navigation', () => {
  test.use({ javaScriptEnabled: true });

  test('index jumps to a slide and closes', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.getElementById('valores')!.scrollIntoView());
    const index = page.locator('.deck-index');
    await index.locator('summary').click();
    await index.getByRole('link', { name: 'Parceiros' }).click();
    await expect(index).not.toHaveAttribute('open', '');
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('parceiros')!.getBoundingClientRect().top))).toBeLessThan(4);
    await expect(page.locator('.deck-header')).toBeVisible();
    await expect(page.locator('[data-deck-title]')).toHaveText('Parceiros');
  });

  test('one wheel gesture moves exactly one slide, quickly, both ways', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'wheel paging is a desktop deck behavior');
    await page.goto('/');
    await page.mouse.move(700, 500);
    const top = (id: string) => page.evaluate((target) => Math.abs(document.getElementById(target)!.getBoundingClientRect().top), id);
    // A trackpad swipe: one strong event followed by a momentum tail.
    const swipe = async (dy: number) => { for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, dy * (1 - i / 12)); await page.waitForTimeout(16); } };
    const started = Date.now();
    await swipe(60);
    await expect.poll(() => top('sumario'), { timeout: 2000 }).toBeLessThan(4);
    expect(Date.now() - started).toBeLessThan(2000);
    await page.waitForTimeout(700);
    expect(await top('sumario')).toBeLessThan(4);
    await swipe(-60);
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 2000 }).toBeLessThan(4);
  });

  test('the deck locks during a slide change: extra or reversed gestures are ignored', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'wheel paging is a desktop deck behavior');
    await page.goto('/');
    const slide = () => page.evaluate(() => [...document.querySelectorAll('main > .section')].findIndex((section) => Math.abs((section as HTMLElement).offsetTop - scrollY) < 2));
    // Trackpad-rate gestures: one event per frame with decaying momentum.
    const gesture = (parts: [number, number, number][]) => page.evaluate(async (list) => {
      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      for (const [dy, count, gap] of list) {
        for (let i = 0; i < count; i++) {
          window.dispatchEvent(new WheelEvent('wheel', { deltaY: dy * (1 - i / count) + Math.sign(dy), bubbles: true, cancelable: true }));
          await wait(16);
        }
        await wait(gap);
      }
    }, parts);
    await gesture([[60, 40, 0]]);
    await expect.poll(slide, { timeout: 3000 }).toBe(1);
    await page.waitForTimeout(600);
    await gesture([[60, 20, 100], [-60, 20, 0]]);
    await page.waitForTimeout(1200);
    expect(await slide()).toBe(2);
    await gesture([[80, 8, 30], [80, 8, 30], [80, 8, 30], [80, 8, 0]]);
    await page.waitForTimeout(1200);
    expect(await slide()).toBe(3);
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1200);
    expect(await slide()).toBe(4);
  });

  test('the agenda lists every topic and jumps to it', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('#sumario a[data-slide-link]');
    await expect(links).toHaveCount(10);
    await expect(links.nth(1)).toContainText('Como funcionam os encontros');
    await page.evaluate(() => document.getElementById('sumario')!.scrollIntoView());
    await links.filter({ hasText: 'Apoie nossa comunidade' }).click();
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('voluntarios')!.getBoundingClientRect().top)), { timeout: 3000 }).toBeLessThan(4);
    await expect(page.locator('[data-deck-title]')).toHaveText('Apoie nossa comunidade');
  });

  test('carousel buttons step one item at a time, both ways, on wide screens', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'arrow buttons are checked on desktop widths');
    // Regression: at 2000px the page margin used to leak into the step math and skip items.
    await page.setViewportSize({ width: 2000, height: 1013 });
    await page.goto('/');
    await page.evaluate(() => document.getElementById('fotos')!.scrollIntoView());
    const centered = () => page.evaluate(() => {
      const track = document.querySelector<HTMLElement>('.media-track')!;
      const center = track.scrollLeft + track.clientWidth / 2;
      const items = [...track.children] as HTMLElement[];
      return items.reduce((best, item, index) =>
        Math.abs(item.offsetLeft + item.offsetWidth / 2 - center) < Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - center) ? index : best, 0);
    });
    const next = page.locator('[data-carousel-next]');
    const prev = page.locator('[data-carousel-prev]');
    await expect(prev).toBeDisabled();
    for (const expected of [1, 2, 3]) {
      await next.click();
      await expect.poll(centered).toBe(expected);
    }
    await prev.click();
    await expect.poll(centered).toBe(2);
    expect(await page.evaluate(() => document.getElementById('fotos')!.scrollLeft)).toBe(0);
  });

  test('carousel: ← → work without focusing it, the centered video plays, leaving the slide stops it', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'keyboard paging is a desktop behavior');
    await page.setViewportSize({ width: 2000, height: 1013 });
    const google: string[] = [];
    page.on('request', (request) => { if (/youtube|ytimg|googlevideo/.test(request.url())) google.push(request.url()); });
    await page.goto('/');
    await page.evaluate(() => document.getElementById('fotos')!.scrollIntoView());
    await page.waitForTimeout(1200);
    const players = page.locator('.media-track iframe');
    await expect(players).toHaveCount(0);
    expect(google).toHaveLength(0);
    await page.keyboard.press('ArrowRight'); // onto the first video: it starts by itself
    await expect(players).toHaveCount(1);
    await page.keyboard.press('ArrowRight'); // onto the next video: still exactly one player
    await expect(players).toHaveCount(1);
    await page.keyboard.press('ArrowDown'); // the deck still owns ↑ ↓ — and leaving stops the video
    await expect(page.locator('[data-deck-title]')).toHaveText('Apoie nossa comunidade');
    await expect(players).toHaveCount(0);
  });

  test('progress header appears after the hero and tracks the slide', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('.deck-header');
    await expect(header).toBeHidden();
    const top = (id: string) => page.evaluate((target) => Math.abs(document.getElementById(target)!.getBoundingClientRect().top), id);
    await page.evaluate(() => document.getElementById('valores')!.scrollIntoView());
    await expect(header).toBeVisible();
    await expect(page.locator('[data-deck-num]')).toHaveText('10');
    await expect(page.locator('[data-deck-title]')).toHaveText('Nossos valores');
    await expect(page.locator('.deck-progress li.is-done')).toHaveCount(9);
    await expect(page.locator('.deck-progress li').nth(9)).toHaveClass(/is-current/);
    await page.locator('.deck-progress a[href="#fotos"]').click();
    await expect.poll(() => top('fotos')).toBeLessThan(4);
    await expect(page.locator('[data-deck-title]')).toHaveText('Nossos encontros');
    await page.locator('.deck-progress a[href="#quem-somos"]').click();
    await expect.poll(() => top('quem-somos')).toBeLessThan(4);
    await expect(page.locator('.deck-logo')).toBeVisible();
    await page.locator('.deck-home').click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(4);
    await expect(header).toBeHidden();
  });

  test('jumping straight to the footer shows the last slide in the header', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('[data-deck-num]')).toHaveText('11');
    await expect(page.locator('[data-deck-title]')).toHaveText('Fale com a gente');
  });
});

test('404 is bilingual with working home links', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('h1')).toHaveText(/Página não encontrada\.\s*Page not found\./);
  await page.locator('main a[href="/en/"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/404.html');
  await page.locator('main a[href="/"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});
