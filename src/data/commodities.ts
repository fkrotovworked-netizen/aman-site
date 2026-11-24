// Культуры — по брифу заказчика (source/brief-aman-2026-11.md, раздел «Продукция»).
// Группы и порядок — как в брифе (нут заказчик относит к зерновым).
// Характеристики (влажность, протеин, сорность) не выдумываем: «по запросу».
// Фото — иллюстрации (сток), а не партии компании. Для овса, рапса и дополнительных направлений фото пока нет.
import type { ImageMetadata } from 'astro';
import wheat from '@/assets/graded/crop-wheat.jpg';
import barley from '@/assets/graded/crop-barley.jpg';
import rye from '@/assets/graded/crop-rye.jpg';
import corn from '@/assets/graded/crop-corn.jpg';
import chickpea from '@/assets/graded/crop-chickpea.jpg';
import sunflower from '@/assets/graded/crop-sunflower.jpg';
import flax from '@/assets/graded/crop-flax.jpg';

export type Group = 'grain' | 'oil' | 'extra';

export interface Commodity {
  id: string;
  group: Group;
  name: { ru: string; en: string };
  note?: { ru: string; en: string };
  photo?: ImageMetadata;
  photoAlt?: { ru: string; en: string };
}

export const groups: { id: Group; ru: string; en: string }[] = [
  { id: 'grain', ru: 'Зерновые', en: 'Grains' },
  { id: 'oil', ru: 'Масличные', en: 'Oilseeds' },
  { id: 'extra', ru: 'Дополнительно', en: 'Also available' },
];

export const commodities: Commodity[] = [
  {
    id: 'wheat',
    group: 'grain',
    name: { ru: 'Пшеница', en: 'Wheat' },
    note: { ru: 'продовольственная 3, 4 и 5 класса, фуражная', en: 'milling grades 3, 4 and 5; feed' },
    photo: wheat,
    photoAlt: { ru: 'Зерно пшеницы крупным планом', en: 'Wheat grain, close-up' },
  },
  {
    id: 'barley',
    group: 'grain',
    name: { ru: 'Ячмень', en: 'Barley' },
    note: { ru: 'продовольственный, фуражный, пивоваренный', en: 'food, feed and malting' },
    photo: barley,
    photoAlt: { ru: 'Колос и зерно ячменя', en: 'Barley ear and grain' },
  },
  {
    id: 'corn',
    group: 'grain',
    name: { ru: 'Кукуруза', en: 'Corn' },
    photo: corn,
    photoAlt: { ru: 'Зерно кукурузы', en: 'Corn kernels' },
  },
  {
    id: 'chickpea',
    group: 'grain',
    name: { ru: 'Нут', en: 'Chickpeas' },
    photo: chickpea,
    photoAlt: { ru: 'Сухой нут', en: 'Dry chickpeas' },
  },
  {
    id: 'rye',
    group: 'grain',
    name: { ru: 'Рожь', en: 'Rye' },
    photo: rye,
    photoAlt: { ru: 'Зерно ржи', en: 'Rye grain' },
  },
  {
    id: 'oats',
    group: 'grain',
    name: { ru: 'Овёс', en: 'Oats' },
  },
  {
    id: 'sunflower',
    group: 'oil',
    name: { ru: 'Подсолнечник', en: 'Sunflower seeds' },
    photo: sunflower,
    photoAlt: { ru: 'Семена подсолнечника', en: 'Sunflower seeds' },
  },
  {
    id: 'rapeseed',
    group: 'oil',
    name: { ru: 'Рапс', en: 'Rapeseed' },
  },
  {
    id: 'flax',
    group: 'oil',
    name: { ru: 'Лён масличный', en: 'Oilseed flax' },
    photo: flax,
    photoAlt: { ru: 'Семена льна', en: 'Flaxseed' },
  },
  {
    id: 'feed-mix',
    group: 'extra',
    name: { ru: 'Кормовые зерновые смеси', en: 'Feed grain mixes' },
  },
  {
    id: 'processed',
    group: 'extra',
    name: { ru: 'Продукты переработки', en: 'Processed products' },
    note: { ru: 'сельскохозяйственных культур — по согласованию', en: 'from agricultural crops, by agreement' },
  },
];
