import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Домен пока atg56.ru — заказчик решит позже (см. CONTENT_GAPS.md). От него canonical, hreflang и sitemap.
// Показ на GitHub Pages: SITE и BASE задаёт .github/workflows/pages.yml (https://<логин>.github.io + /<репозиторий>).
export default defineConfig({
  site: process.env.SITE || 'https://atg56.ru',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'ru', locales: { ru: 'ru-RU', en: 'en-US' } },
      filter: (page) => !page.includes('/404') && !page.includes('/lab/'),
    }),
  ],
  image: { layout: 'constrained' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
