// Языки и адреса страниц. Новый язык: код в `langs`, адреса в `paths`, словарь в content.ts,
// обёртки в src/pages/<код>/ и локаль в astro.config.mjs. Виды (src/views) не меняются.
export type Lang = 'ru' | 'en';
export const langs: Lang[] = ['ru', 'en'];

export type PageKey =
  | 'home'
  | 'commodities'
  | 'buy'
  | 'sell'
  | 'markets'
  | 'logistics'
  | 'about'
  | 'contact'
  | 'privacy';

const paths: Record<Lang, Record<PageKey, string>> = {
  ru: {
    home: '/',
    commodities: '/produkciya/',
    buy: '/zakupaem/',
    sell: '/prodaem/',
    markets: '/rynki/',
    logistics: '/logistika/',
    about: '/o-kompanii/',
    contact: '/kontakty/',
    privacy: '/politika-konfidencialnosti/',
  },
  en: {
    home: '/en/',
    commodities: '/en/commodities/',
    buy: '/en/we-buy/',
    sell: '/en/we-sell/',
    markets: '/en/markets/',
    logistics: '/en/logistics/',
    about: '/en/about/',
    contact: '/en/contact/',
    privacy: '/en/privacy/',
  },
};

// На GitHub Pages сайт лежит в подпапке (/<репозиторий>/) — приставляем base ко всем адресам.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (lang: Lang, page: PageKey) => BASE + paths[lang][page];
/** Путь к файлу из public/ с учётом base. */
export const asset = (file: string) => `${BASE}/${file}`;

/** Страницы в навигации. «Закупаем» и «Продаём» — сразу после продукции: две аудитории сайта. */
export const navPages: PageKey[] = ['commodities', 'buy', 'sell', 'markets', 'logistics', 'about', 'contact'];
