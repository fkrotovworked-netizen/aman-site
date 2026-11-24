// Полноразмерные снимки страниц в системном Chrome.
// node tools/shots.mjs [--origin=http://localhost:4321] [--w=1440,390] [--full] [--wait=2600] [--scroll=y] /path/ ...
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const args = process.argv.slice(2);
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1] || d;
const origin = opt('origin', 'http://localhost:4321');
const widths = opt('w', '1440,390').split(',').map(Number);
const wait = Number(opt('wait', '2600'));
const scroll = Number(opt('scroll', '0'));
const full = args.includes('--full');
const rm = args.includes('--rm');
const paths = args.filter((a) => !a.startsWith('--'));
if (!paths.length) paths.push('/');

const heights = { 1920: 1080, 1440: 900, 1280: 800, 1024: 768, 768: 1024, 390: 844, 360: 740 };
await mkdir('tools/shots', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: heights[w] || 900 },
    deviceScaleFactor: 1,
    reducedMotion: rm ? 'reduce' : 'no-preference',
    isMobile: w < 768,
    hasTouch: w < 768,
  });
  for (const p of paths) {
    const page = await ctx.newPage();
    page.on('console', (m) => m.type() === 'error' && errors.push(`${p}@${w}: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`${p}@${w}: ${e.message}`));
    await page.goto(origin + p, { waitUntil: 'networkidle' });
    if (full) {
      // прокрутить до конца, чтобы сработали ленивые картинки и появления
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
        window.scrollTo(0, 0);
      });
    }
    if (scroll) await page.evaluate((y) => window.scrollTo(0, y), scroll);
    await page.waitForTimeout(wait);
    const name = `${p.replace(/\//g, '_') || 'home'}-${w}${scroll ? '-s' + scroll : ''}${full ? '-full' : ''}.png`.replace(/^_/, '');
    await page.screenshot({ path: `tools/shots/${name}`, fullPage: full });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log('shot', name, overflow > 0 ? `HORIZONTAL OVERFLOW ${overflow}px` : '');
    await page.close();
  }
  await ctx.close();
}
await browser.close();
if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.join('\n'));
