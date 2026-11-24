// Проверка ссылок по собранному сайту (dist/), без сети.
// Внутренние href/src/srcset, canonical, hreflang и og:url должны вести на существующий файл,
// якоря #id — на существующий id. Внешние ссылки только перечисляются (их сеть не проверяет).
// Запуск: npm run build && npm run links   (код выхода 1, если есть битые ссылки)
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://atg56.ru'; // как site в astro.config.mjs
const SKIP_PAGES = ['/lab/']; // черновая лаборатория — убрать вместе со страницей перед публикацией

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const exists = async (p) => !!(await stat(p).catch(() => null));

// /a/b/ → dist/a/b/index.html; /x.jpg → dist/x.jpg
async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean.endsWith('/')) return exists(path.join(DIST, clean, 'index.html'));
  if (await exists(path.join(DIST, clean))) return true;
  return false;
}

const pages = (await walk(DIST)).filter((f) => !SKIP_PAGES.some((s) => f.includes(s.replaceAll('/', path.sep))));
const ids = new Map();
const texts = new Map();
for (const f of pages) {
  const html = await readFile(f, 'utf8');
  texts.set(f, html);
  ids.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const pageUrl = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/index\.html$/, '');

const broken = [];
const external = new Map();
let checked = 0;

for (const [f, html] of texts) {
  const from = pageUrl(f);
  const refs = [];
  for (const m of html.matchAll(/\s(href|src|content)="([^"]*)"/g)) {
    const [, attr, val] = m;
    if (attr === 'content' && !val.startsWith(SITE)) continue; // content= только для og:url/og:image
    refs.push(val);
  }
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) refs.push(...m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));

  for (let ref of refs) {
    if (!ref || ref.startsWith('data:') || ref.startsWith('javascript:')) continue;
    if (/^(mailto|tel|viber|whatsapp):/i.test(ref)) continue;
    if (ref.startsWith(SITE)) ref = ref.slice(SITE.length) || '/';
    if (/^https?:\/\//.test(ref) || ref.startsWith('//')) {
      external.set(ref, (external.get(ref) ?? 0) + 1);
      continue;
    }
    checked++;
    if (ref.startsWith('#')) {
      if (ref.length > 1 && !ids.get(f).has(decodeURIComponent(ref.slice(1)))) broken.push([from, ref, 'нет такого id']);
      continue;
    }
    const abs = new URL(ref, `http://x${from}`).pathname;
    if (!(await resolve(abs))) {
      broken.push([from, ref, 'нет файла']);
      continue;
    }
    const hash = ref.split('#')[1];
    if (hash && abs.endsWith('/')) {
      const target = path.join(DIST, decodeURIComponent(abs), 'index.html');
      if (ids.has(target) && !ids.get(target).has(hash)) broken.push([from, ref, 'нет такого id на странице']);
    }
  }
}

console.log(`Страниц: ${pages.length}, внутренних ссылок проверено: ${checked}`);
console.log(`Внешние ссылки (не проверяются без сети): ${external.size}`);
for (const [u, n] of [...external].sort()) console.log(`  ${u}  ×${n}`);
if (broken.length) {
  console.log(`\nБИТЫЕ ССЫЛКИ: ${broken.length}`);
  for (const [from, ref, why] of broken) console.log(`  ${from}  →  ${ref}  (${why})`);
  process.exit(1);
}
console.log('\nБитых внутренних ссылок нет.');
