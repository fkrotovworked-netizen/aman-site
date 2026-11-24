// OG-картинки 1200×630 из hero + надпись. Запуск: node scripts/og.mjs
import sharp from 'sharp';
const W = 1200, H = 630;
const items = {
  ru: { t1: 'От поля — до мировых', t2: 'аграрных рынков', brand: 'ОРЕНБУРГ АГРОАЛЬЯНС', sub: 'Закупка, опт и экспорт зерновых и масличных · Оренбург' },
  en: { t1: 'From the field to world', t2: 'agricultural markets', brand: 'ORENBURG AGROALLIANCE', sub: 'Grain and oilseed sourcing, wholesale and export · Orenburg' },
};
for (const [lang, s] of Object.entries(items)) {
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0e0d0a" stop-opacity=".82"/><stop offset=".65" stop-color="#0e0d0a" stop-opacity=".2"/><stop offset="1" stop-color="#0e0d0a" stop-opacity="0"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="72" y="96" font-family="Menlo, monospace" font-size="20" letter-spacing="3" fill="#dca751">${s.brand}</text>
  <text x="72" y="380" font-family="Georgia, serif" font-size="68" fill="#f2ece0">${s.t1}</text>
  <text x="72" y="460" font-family="Georgia, serif" font-style="italic" font-size="68" fill="#f0d49a">${s.t2}</text>
  <text x="72" y="560" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#c2b7a1">${s.sub}</text>
</svg>`;
  await sharp('src/assets/graded/hero-sunset.jpg')
    .resize(W, H, { fit: 'cover', position: 'left' })
    .composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`public/og-${lang}.jpg`);
  console.log('ok', lang);
}
