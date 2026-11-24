// Нарезка длинного снимка на части: node tools/split.mjs file.png [segmentHeight]
import sharp from 'sharp';
const [file, segArg] = process.argv.slice(2);
const seg = Number(segArg || 1600);
const meta = await sharp(file).metadata();
const n = Math.ceil(meta.height / seg);
for (let i = 0; i < n; i++) {
  const top = i * seg;
  const h = Math.min(seg, meta.height - top);
  const out = file.replace('.png', `.${i}.jpg`);
  await sharp(file).extract({ left: 0, top, width: meta.width, height: h }).jpeg({ quality: 72 }).toFile(out);
  console.log(out);
}
