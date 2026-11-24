// Точечная карта рынков. Считается на этапе сборки — в браузер уходит готовый SVG
// (по path на каждую страну из брифа + тусклый фон остальной суши) и точки дуг, без JS-библиотек.
// Этот же SVG — статичный кадр без JS; скрипт MarketMap читает из него точки и рисует свет на canvas.
// Страны и их статус — из брифа заказчика (source/brief-aman-2026-11.md, «География»).
import { geoNaturalEarth1, geoContains, geoBounds, geoInterpolate } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import type { Feature, Geometry } from 'geojson';

/** Направления по порядку брифа. 'ru' — внутренний рынок, остальные — экспорт. */
export const REGIONS = ['ru', 'kz', 'uz', 'tj', 'af', 'ir', 'cn'] as const;
export type Region = (typeof REGIONS)[number];
/** Иран — перспективное направление, Китай — развиваемое: на карте тише и пунктиром. */
export const PROSPECT: Region[] = ['ir', 'cn'];

const ISO: Record<Region, string> = { ru: '643', kz: '398', uz: '860', tj: '762', af: '004', ir: '364', cn: '156' };
const byIso = Object.fromEntries(Object.entries(ISO).map(([r, id]) => [id, r])) as Record<string, Region>;

export const ORENBURG: [number, number] = [55.0969, 51.7682];

// Концы дуг. Для России — Казань: Татарстан, Самара и Башкортостан лежат по пути к ней от Оренбурга.
// Для стран — середина территории на карте, а не город и не маршрут.
const ANCHORS: Record<Region, [number, number]> = {
  ru: [49.1, 55.8],
  kz: [68, 48.5],
  uz: [63.5, 41.4],
  tj: [71, 38.7],
  af: [66, 33.8],
  ir: [54, 32.5],
  cn: [103, 35],
};

export function buildMap(width = 1000, height = 640, step = 7) {
  const topo = world as unknown as Parameters<typeof feature>[0];
  const fc = feature(topo, (world as any).objects.countries) as unknown as { features: Feature<Geometry, { name: string }>[] };
  const countries = fc.features
    .map((f) => ({ f, region: (byIso[f.id as string] ?? 'ctx') as Region | 'ctx', b: geoBounds(f) }))
    // сначала страны брифа — на границах точка достаётся им, а не соседу
    .sort((a, b) => Number(a.region === 'ctx') - Number(b.region === 'ctx'));

  // в кадре — от Поволжья до восточного Китая, от Арктики до Персидского залива
  const projection = geoNaturalEarth1()
    .rotate([-80, 0])
    .fitExtent(
      [
        [10, 10],
        [width - 10, height - 10],
      ],
      { type: 'MultiPoint', coordinates: [[28, 70], [28, 22], [128, 72], [128, 22]] } as any,
    );

  const paths: Record<Region | 'ctx', string[]> = { ru: [], kz: [], uz: [], tj: [], af: [], ir: [], cn: [], ctx: [] };
  for (let y = step / 2; y < height; y += step) {
    // шахматный сдвиг рядов — сетка читается как ткань, а не как клетка
    const offset = (Math.round(y / step) % 2) * (step / 2);
    for (let x = step / 2 + offset; x < width; x += step) {
      const ll = projection.invert!([x, y]);
      if (!ll) continue;
      const [lon, lat] = ll;
      for (const c of countries) {
        const [[w, s], [e, n]] = c.b;
        const inLon = w <= e ? lon >= w && lon <= e : lon >= w || lon <= e;
        if (!inLon || lat < s || lat > n) continue;
        if (geoContains(c.f, ll)) {
          paths[c.region].push(`M${x.toFixed(1)} ${y.toFixed(1)}h0`);
          break;
        }
      }
    }
  }
  const hub = projection(ORENBURG)!;
  // дуги: большой круг от Оренбурга к концу, приподнятый по синусу — читается как полёт
  const N = 40;
  const arcs = Object.fromEntries(
    REGIONS.map((r) => {
      const interp = geoInterpolate(ORENBURG, ANCHORS[r]);
      const raw = Array.from({ length: N + 1 }, (_, i) => projection(interp(i / N))!);
      const len = Math.hypot(raw[N][0] - raw[0][0], raw[N][1] - raw[0][1]);
      const pts = raw.map(([x, y], i) => [+x.toFixed(1), +(y - Math.sin((Math.PI * i) / N) * len * 0.22).toFixed(1)]);
      const d = 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L');
      return [r, { d, pts, x: pts[N][0], y: pts[N][1] }];
    }),
  ) as Record<Region, { d: string; pts: number[][]; x: number; y: number }>;
  return {
    arcs,
    width,
    height,
    step,
    hub: { x: +hub[0].toFixed(1), y: +hub[1].toFixed(1) },
    paths: Object.fromEntries(Object.entries(paths).map(([k, v]) => [k, v.join('')])) as Record<Region | 'ctx', string>,
  };
}
