// Единый цветокор фотографий: src/assets/photos (оригиналы Unsplash) → src/assets/graded.
// Тёплый свет, приглушённая насыщенность, чёрное садится на тёплый графит (#14130F),
// чтобы разнородный сток читался как одна съёмка. Источники — source/photo-sources.txt.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src/assets/photos';
const OUT = 'src/assets/graded';
await mkdir(OUT, { recursive: true });

// чуть тёплая матрица: красный канал +, синий −
const warm = [
  [1.04, 0.02, 0.0],
  [0.01, 1.0, 0.0],
  [0.0, 0.03, 0.9],
];

// холодные кадры (голубое небо, бетон, белые вагоны) — греем сильнее, чтобы встали в «один вечер»
const warmer = [
  [1.1, 0.1, 0.0],
  [0.04, 0.84, 0.04],
  [0.0, 0.1, 0.55],
];
const COLD = new Set(['silos-gold.jpg', 'hopper-steppe.jpg', 'elevator-concrete.jpg']);

for (const f of (await readdir(SRC)).filter((f) => f.endsWith('.jpg'))) {
  const crop = f.startsWith('crop-');
  const img = sharp(path.join(SRC, f))
    .modulate({ saturation: crop ? 0.86 : COLD.has(f) ? 0.6 : 0.8 })
    .recomb(COLD.has(f) ? warmer : warm)
    // поднимаем чёрную точку до графита и слегка гасим пересветы
    .linear(crop ? 0.94 : 0.9, crop ? 6 : 8)
    .gamma(crop ? 1.0 : 1.08);
  await img.jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, f));
  console.log('graded', f);
}
