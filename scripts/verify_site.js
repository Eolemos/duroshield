// Drives the built site headless: console errors, broken images, WebGL hero,
// the SEO signals the old site was missing, and the sector filter.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const OUT = path.join(__dirname, '..', 'output', 'site-preview');
  fs.mkdirSync(OUT, { recursive: true });
  // ES modules need a real origin; file:// trips CORS.
  const URL_ = process.env.SITE_URL || 'http://127.0.0.1:8099/index.html';

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + String(e).split('\n')[0].slice(0, 160)));

  await page.goto(URL_, { waitUntil: 'load' });
  await page.waitForTimeout(3500);

  console.log('=== ERROS ===');
  console.log(errs.length ? errs.join('\n') : '  nenhum');

  const seo = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll('h1').length,
    h1_text: (document.querySelector('h1') || {}).innerText,
    metaDesc: !!document.querySelector('meta[name="description"]'),
    ogImage: !!document.querySelector('meta[property="og:image"]'),
    favicon: !!document.querySelector('link[rel*="icon"]'),
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
    forms: document.querySelectorAll('form').length,
    imgs: document.images.length,
    imgsNoAlt: [...document.images].filter((i) => !i.alt).length,
    broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.src.split('/').pop()),
  }));
  console.log('\n=== SINAIS QUE FALTAVAM NO SITE ANTIGO ===');
  console.log('  title:      ' + seo.title);
  console.log('  <h1>:       ' + seo.h1 + ' -> "' + (seo.h1_text || '').replace(/\n/g, ' ') + '"');
  console.log('  meta desc:  ' + seo.metaDesc + '  | og:image: ' + seo.ogImage
    + '  | favicon: ' + seo.favicon);
  console.log('  JSON-LD:    ' + seo.jsonLd + '  | formularios: ' + seo.forms);
  console.log('  imagens:    ' + seo.imgs + ' (sem alt: ' + seo.imgsNoAlt + ')');
  console.log('  QUEBRADAS:  ' + (seo.broken.length ? seo.broken.join(', ') : 'nenhuma'));

  const gl = await page.evaluate(() => {
    const c = document.getElementById('membrane');
    return c && c.width > 100 ? c.width + 'x' + c.height : 'NAO INICIOU';
  });
  console.log('\n=== HERO 3D ===\n  canvas: ' + gl);

  const chips = await page.locator('.chip').count();
  const logos = await page.locator('.wall span').count();
  await page.locator('.chip', { hasText: 'Energia' }).first().click();
  await page.waitForTimeout(400);
  const shown = await page.locator('.wall span:not([hidden])').count();
  console.log('\n=== PORTFOLIO ===');
  console.log('  filtros: ' + chips + ' | logos: ' + logos + ' | apos filtrar "Energia": ' + shown);
  await page.locator('.chip').first().click();

  for (const [name, w, h] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT, name + '-hero.png') });
    await page.screenshot({ path: path.join(OUT, name + '-full.png'), fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    console.log('  ' + name.padEnd(8) + ' scroll horizontal: ' + (overflow ? 'SIM <-- BUG' : 'nao'));
  }
  await browser.close();
  console.log('\nCapturas -> ' + OUT);
})();
