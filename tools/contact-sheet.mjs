// Contact sheet of Unsplash candidates: node tools/contact-sheet.mjs out.jpg id1 id2 ...
// ids are "photo-XXXX" file names from images.unsplash.com
import sharp from 'sharp';
const [out, ...ids] = process.argv.slice(2);
const W = 360, H = 240, cols = 4;
const tiles = await Promise.all(ids.map(async (id, i) => {
  const r = await fetch(`https://images.unsplash.com/${id}?w=${W * 2}&q=60&fm=jpg`);
  const buf = Buffer.from(await r.arrayBuffer());
  const img = await sharp(buf).resize(W, H, { fit: 'cover' }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="${H}"><rect width="34" height="26" fill="black"/><text x="6" y="19" font-size="18" fill="white" font-family="Helvetica">${i}</text></svg>`);
  return sharp(img).composite([{ input: label }]).jpeg().toBuffer();
}));
const rows = Math.ceil(tiles.length / cols);
await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: '#222' } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * W, top: Math.floor(i / cols) * H })))
  .jpeg({ quality: 70 }).toFile(out);
console.log('ok', out);
