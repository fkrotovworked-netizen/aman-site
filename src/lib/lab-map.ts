// Данные для трёх концептов карты на странице /lab/ (черновик, не в продакшене).
// Всё считается при сборке: в браузер уходят готовые точки/контуры, без d3.
import { geoNaturalEarth1, geoContains, geoBounds, geoPath, geoGraticule10, geoInterpolate } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import type { Feature, Geometry } from 'geojson';
import { ORENBURG } from './map';

type R = 'ru' | 'cis' | 'europe' | 'africa' | 'asia' | 'other';
const CIS = ['398', '860', '417', '762', '795', '112', '051', '031', '498'];
const EUROPE = ['578', '752', '246', '208', '352', '826', '372', '250', '724', '620', '380', '276', '056', '528', '442', '756', '040', '203', '703', '616', '348', '705', '191', '070', '688', '499', '807', '008', '300', '100', '642', '804', '440', '428', '233', '196'];
const AFRICA = ['012', '024', '204', '072', '854', '108', '120', '140', '148', '178', '180', '384', '262', '818', '226', '232', '231', '266', '270', '288', '324', '624', '404', '426', '430', '434', '450', '454', '466', '478', '504', '508', '516', '562', '566', '646', '686', '694', '706', '710', '728', '729', '748', '834', '768', '788', '800', '732', '894', '716'];
const ASIA = ['004', '050', '064', '096', '116', '156', '268', '356', '360', '364', '368', '376', '392', '400', '408', '410', '414', '418', '422', '458', '496', '104', '524', '512', '586', '275', '608', '634', '682', '144', '760', '158', '764', '626', '792', '784', '704', '887'];
const regionOf = (id?: string, name = ''): R => {
  if (id === '643') return 'ru';
  if (id && CIS.includes(id)) return 'cis';
  if (id && EUROPE.includes(id)) return 'europe';
  if (id && AFRICA.includes(id)) return 'africa';
  if (id && ASIA.includes(id)) return 'asia';
  return ({ 'N. Cyprus': 'europe', Somaliland: 'africa', Kosovo: 'europe' } as Record<string, R>)[name] ?? 'other';
};
export const ANCHORS: Record<Exclude<R, 'other'>, [number, number]> = {
  ru: [92, 61],
  cis: [67, 46],
  europe: [14, 49],
  africa: [19, 7],
  asia: [104, 31],
};
const REG = ['ru', 'cis', 'europe', 'africa', 'asia', 'other'] as const;

function countries() {
  const fc = feature(world as any, (world as any).objects.countries) as unknown as { features: Feature<Geometry, { name: string }>[] };
  return fc.features.map((f) => ({ f, region: regionOf(f.id as string, f.properties.name), b: geoBounds(f) }));
}
function hit(cs: ReturnType<typeof countries>, ll: [number, number]) {
  const [lon, lat] = ll;
  for (const c of cs) {
    const [[w, s], [e, n]] = c.b;
    const inLon = w <= e ? lon >= w && lon <= e : lon >= w || lon <= e;
    if (!inLon || lat < s || lat > n) continue;
    if (geoContains(c.f, ll)) return c.region;
  }
  return null;
}

const W = 1000;
const H = 640;
function flatProjection() {
  return geoNaturalEarth1()
    .rotate([-58, 0])
    .fitExtent([[10, 10], [W - 10, H - 10]], { type: 'MultiPoint', coordinates: [[-18, 70], [-18, -35], [148, 70], [148, -35], [20, 74]] } as any);
}

/** A: плоские точки с регионом и расстоянием до Оренбурга (для волны света) */
export function flatDots(step = 7) {
  const cs = countries().filter((c) => c.region !== 'other');
  const pr = flatProjection();
  const [hx, hy] = pr(ORENBURG)!;
  const dots: number[] = []; // x, y, regionIndex, dist — плоский массив
  for (let y = step / 2; y < H; y += step) {
    const off = (Math.round(y / step) % 2) * (step / 2);
    for (let x = step / 2 + off; x < W; x += step) {
      const ll = pr.invert!([x, y]) as [number, number] | null;
      if (!ll) continue;
      const r = hit(cs, ll);
      if (!r) continue;
      dots.push(+x.toFixed(1), +y.toFixed(1), REG.indexOf(r), Math.round(Math.hypot(x - hx, y - hy)));
    }
  }
  const arcs = (Object.keys(ANCHORS) as (keyof typeof ANCHORS)[]).map((r) => {
    const interp = geoInterpolate(ORENBURG, ANCHORS[r]);
    const pts = Array.from({ length: 41 }, (_, i) => pr(interp(i / 40))!);
    // приподнять дугу: прибавляем «высоту» по синусу к y
    const len = Math.hypot(pts[40][0] - pts[0][0], pts[40][1] - pts[0][1]);
    const lifted = pts.map(([x, y], i) => [x, y - Math.sin((Math.PI * i) / 40) * len * 0.22]);
    return { r, pts: lifted.map(([x, y]) => [+x.toFixed(1), +y.toFixed(1)]) };
  });
  return { w: W, h: H, hub: [+hx.toFixed(1), +hy.toFixed(1)], dots, arcs };
}

/** B: точки суши на сфере (lon, lat, регион) — для вращающегося глобуса */
export function globeDots(stepDeg = 1.9) {
  const cs = countries();
  const out: number[] = [];
  for (let lat = -58; lat <= 80; lat += stepDeg) {
    const k = Math.max(1, Math.round(360 / (stepDeg / Math.cos((lat * Math.PI) / 180))));
    const dl = 360 / k;
    for (let i = 0; i < k; i++) {
      const lon = -180 + i * dl + (Math.round(lat / stepDeg) % 2) * (dl / 2);
      const r = hit(cs, [lon, lat]);
      if (r) out.push(+lon.toFixed(2), +lat.toFixed(2), REG.indexOf(r));
    }
  }
  return { dots: out, hub: ORENBURG, anchors: ANCHORS };
}

/** C: контуры стран по регионам + сетка — «гравюра» */
export function engraving() {
  const cs = countries().filter((c) => c.region !== 'other');
  const pr = flatProjection();
  const path = geoPath(pr);
  const byRegion: Record<string, string> = {};
  for (const r of REG.slice(0, 5)) byRegion[r] = cs.filter((c) => c.region === r).map((c) => path(c.f) ?? '').join('');
  const grat = path(geoGraticule10()) ?? '';
  const [hx, hy] = pr(ORENBURG)!;
  const labels = (Object.keys(ANCHORS) as (keyof typeof ANCHORS)[]).map((r) => {
    const [x, y] = pr(ANCHORS[r])!;
    return { r, x: +x.toFixed(1), y: +y.toFixed(1) };
  });
  const arcs = labels.map(({ r, x, y }) => {
    const dx = x - hx;
    const dy = y - hy;
    const len = Math.hypot(dx, dy);
    let nx = -dy / len;
    let ny = dx / len;
    if (ny > 0) {
      nx = -nx;
      ny = -ny;
    }
    const cx = (hx + x) / 2 + nx * len * 0.22;
    const cy = (hy + y) / 2 + ny * len * 0.22;
    return { r, d: `M${hx.toFixed(1)} ${hy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x} ${y}` };
  });
  return { w: W, h: H, byRegion, grat, hub: [+hx.toFixed(1), +hy.toFixed(1)], labels, arcs };
}
