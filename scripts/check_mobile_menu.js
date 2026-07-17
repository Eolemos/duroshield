// The burger is the only way to navigate on a phone; if it is invisible or the
// menu does not open, the whole site is a single scroll with no wayfinding.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true,
  });
  await page.goto('http://127.0.0.1:8099/index.html', { waitUntil: 'networkidle' });

  const burger = await page.evaluate(() => {
    const b = document.querySelector('.burger');
    const r = b.getBoundingClientRect();
    const cs = getComputedStyle(b);
    return {
      display: cs.display,
      size: Math.round(r.width) + 'x' + Math.round(r.height),
      x: Math.round(r.x),
      visible: r.width > 0 && cs.visibility !== 'hidden' && cs.display !== 'none',
    };
  });
  console.log('burger:', JSON.stringify(burger));

  await page.locator('.burger').click();
  await page.waitForTimeout(600);
  const opened = await page.evaluate(() => ({
    navOpen: document.querySelector('.nav').classList.contains('open'),
    links: document.querySelectorAll('.nav.open a').length,
    aria: document.querySelector('.burger').getAttribute('aria-expanded'),
  }));
  console.log('menu aberto:', JSON.stringify(opened));

  await page.screenshot({
    path: path.join(__dirname, '..', 'output', 'site-preview', 'm-320-menu.png'),
  });
  await browser.close();
})();
