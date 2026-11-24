// Факты о компании — из брифа заказчика (source/brief-aman-2026-11.md).
// Телефон, мессенджеры и Метрика пока со старого сайта atg56.ru — заказчик пришлёт новые (CONTENT_GAPS.md).
export const company = {
  legalRu: 'ООО «Оренбург АгроАльянс»',
  legalEn: 'Orenburg AgroAlliance LLC',
  brandRu: 'Оренбург АгроАльянс',
  brandEn: 'Orenburg AgroAlliance',
  founded: 2026,
  phone: '+7 922 877-77-27',
  phoneDisplay: '+7 (922) 877-77-27',
  phoneHref: 'tel:+79228777727',
  whatsapp: 'https://wa.me/79228777727',
  viber: 'viber://chat?number=%2B79228777727',
  // «3/8, 5» — как в брифе; что такое «5» (офис или этаж) — уточнить
  streetRu: 'Красная площадь, 3/8, 5',
  streetEn: '3/8 Krasnaya Ploshchad, 5',
  addressRu: 'Оренбург, Красная площадь, 3/8, 5',
  addressEn: '3/8 Krasnaya Ploshchad, 5, Orenburg, Russia',
  city: { ru: 'Оренбург', en: 'Orenburg' },
  // координаты города (для подписей на горизонте и карте), не точка офиса
  coords: { lat: 51.7682, lon: 55.0969, label: '51.77° N · 55.10° E' },
  mapLink: `https://yandex.ru/maps/?text=${encodeURIComponent('Оренбург, Красная площадь, 3/8')}`,
  metrika: 54298371,
} as const;
