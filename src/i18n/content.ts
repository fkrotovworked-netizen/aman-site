// Все тексты сайта. Факты — из брифа заказчика (source/brief-aman-2026-11.md).
// Чего нет — нейтральная формулировка и строка в CONTENT_GAPS.md.
// Новый язык: скопируйте словарь `en`, переведите и добавьте в `dict` (тип Dict проверит, что все ключи на месте).
import type { Lang } from './routes';

type Market = { id: string; name: string; short?: string; status?: string; text?: string };

const ru = {
  lang: 'ru',
  htmlLang: 'ru',
  locale: 'ru_RU',
  brand: 'Оренбург АгроАльянс',
  logo: { name: 'АгроАльянс', sub: 'Оренбург' },
  slogan: 'От поля до мировых сельскохозяйственных рынков',
  skip: 'К содержанию',
  nav: {
    commodities: 'Продукция',
    buy: 'Закупаем',
    sell: 'Продаём',
    markets: 'Рынки',
    logistics: 'Логистика',
    about: 'О компании',
    contact: 'Контакты',
    home: 'Главная',
    privacy: 'Политика конфиденциальности',
  },
  menu: 'Меню',
  close: 'Закрыть',
  langSwitch: { label: 'Язык', other: 'EN', otherFull: 'English' },
  cta: {
    quote: 'Запросить цену',
    quoteLong: 'Получить предложение',
    call: 'Позвонить',
    whatsapp: 'WhatsApp',
    viber: 'Viber',
    commodities: 'Вся продукция',
    contact: 'Связаться с нами',
    sell: 'Предложить урожай',
    logistics: 'Как мы работаем',
    markets: 'География поставок',
  },
  reply: 'Рассчитаем стоимость, условия поставки и логистику',
  footer: {
    tagline: 'Закупка, оптовая продажа и экспорт зерновых и масличных культур. Россия, Казахстан, Узбекистан, Таджикистан, Афганистан.',
    sitemap: 'Разделы',
    contacts: 'Связь',
    rights: 'Все права защищены',
    credits: 'Фото на сайте — иллюстрации (Unsplash)',
  },

  quote: {
    title: 'Запрос предложения',
    crop: 'Культура',
    cropAny: 'Выберите культуру',
    volume: 'Объём, т',
    volumePh: 'например, 500',
    dest: 'Пункт назначения',
    destAny: 'Куда поставить',
    submit: 'Получить предложение',
  },

  // направления для форм (куда поставить)
  regions: {
    ru: 'Россия',
    kz: 'Казахстан',
    uz: 'Узбекистан',
    tj: 'Таджикистан',
    af: 'Афганистан',
    ir: 'Иран',
    cn: 'Китай',
    other: 'Другая страна',
  } as Record<string, string>,

  home: {
    title: 'Оренбург АгроАльянс — закупка, продажа и экспорт зерновых и масличных культур',
    description:
      'Торгово-экспортная компания из Оренбурга. Закупаем зерновые и масличные культуры у сельхозпроизводителей, продаём оптом по России и экспортируем в Казахстан, Узбекистан, Таджикистан и Афганистан.',
    heroTitle: ['От поля —', 'до мировых', 'аграрных рынков'],
    heroText:
      '«Оренбург АгроАльянс» — торгово-экспортная компания. Закупаем зерновые и масличные культуры у сельхозпроизводителей, продаём оптом и организуем поставки до конечного покупателя.',
    heroSecondary: 'Смотреть продукцию',
    heroCaption: 'Оренбург',

    ledgerTitle: 'Закупаем урожай у производителей, формируем партии и доводим их до покупателя — в России и за рубежом.',
    // тот же заголовок с местами для фото-вставок между словами (0 — колосья, 1 — вагоны, 2 — элеватор)
    ledgerParts: ['Закупаем урожай', 0, 'у производителей, формируем партии', 1, 'и доводим их до покупателя —', 2, 'в России и за рубежом.'] as (string | number)[],
    ledger: [
      { k: 'Продукция', v: 'Зерновые и масличные культуры, кормовые смеси, продукты переработки' },
      { k: 'Закупка', v: 'Напрямую у сельхозпроизводителей — партии под потребности покупателя' },
      { k: 'Логистика', v: 'Автомобильные и железнодорожные перевозки, элеваторы и пункты погрузки' },
      { k: 'Качество', v: 'Проверка качественных показателей и оформление документов' },
      { k: 'Экспорт', v: 'Международные контракты, транспортные и сопроводительные документы' },
      { k: 'Условия', v: 'Разные объёмы, базисы поставки и условия оплаты' },
      { k: 'География', v: 'Россия, Казахстан, Узбекистан, Таджикистан, Афганистан' },
    ],

    cropsTitle: 'Зерновые и масличные культуры',
    cropsText: 'Формируем партии под потребности покупателя. Класс, качественные показатели и объём — по запросу.',

    marketsTitle: 'Из Оренбурга — по России и на экспорт',
    marketsText:
      'Работаем с регионами России и экспортируем в Казахстан, Узбекистан, Таджикистан и Афганистан. Иран и Китай — следующие направления.',

    logisticsTitle: 'Организуем перевозки — по дороге и по рельсам',
    logisticsText:
      'Автомобильные и железнодорожные перевозки, работа с элеваторами и пунктами погрузки, сопровождение внешнеторговых контрактов — от производителя до конечного покупателя.',
    logisticsPoints: ['Автомобильные перевозки', 'Железнодорожные отгрузки', 'Элеваторы и пункты погрузки', 'Сопровождение контрактов'],

    sidesTitle: 'Две стороны одной сделки',
    buyers: {
      title: 'Покупателям',
      text: 'Оптовые поставки по России и на экспорт. Подберём культуру, объём и базис, организуем транспорт и документы.',
      cta: 'Что продаём',
    },
    farmers: {
      title: 'Сельхозпроизводителям',
      text: 'Закупаем зерновые и масличные культуры напрямую у хозяйств. Перевозку и погрузку организуем сами.',
      cta: 'Что закупаем',
    },

    finalTitle: 'Обсудим поставку',
    finalText: 'Напишите, какая культура, объём и пункт назначения, — рассчитаем стоимость, условия поставки и логистику.',
  },

  commodities: {
    title: 'Продукция — зерновые и масличные культуры',
    description:
      'Пшеница продовольственная 3–5 класса и фуражная, ячмень продовольственный, фуражный и пивоваренный, кукуруза, нут, рожь, овёс, подсолнечник, рапс, лён масличный, кормовые зерновые смеси. Опт и экспорт.',
    h1: 'Продукция',
    intro:
      'Зерновые и масличные культуры, кормовые смеси и продукты переработки. Класс, качественные показатели, объём и базис поставки согласуем под каждую партию.',
    specs: 'Характеристики — по запросу',
    request: 'Запросить',
    noPhoto: 'Фото — по запросу',
    bottomTitle: 'Нужна культура, которой нет в списке?',
    bottomText: 'Напишите — уточним, сможем ли закупить и поставить её.',
  },

  // общий шаблон «Закупаем» / «Продаём» (src/views/Trade.astro)
  buy: {
    title: 'Закупаем зерновые и масличные культуры у сельхозпроизводителей',
    description:
      'Прямые закупки пшеницы, ячменя, кукурузы, нута, ржи, овса, подсолнечника, рапса и льна у сельхозпроизводителей Оренбургской области, Башкортостана, Самарской области, Татарстана и других регионов России.',
    h1: 'Закупаем',
    intro: 'Покупаем зерновые и масличные культуры напрямую у сельхозтоваропроизводителей и сами организуем вывоз.',
    argTitle: 'Напрямую у хозяйства, вывоз — на нас',
    pair: [
      { t: 'Прямые закупки', d: 'Работаем с сельхозтоваропроизводителями и формируем партии под потребности покупателей.' },
      { t: 'Транспорт и погрузка', d: 'Организуем автомобильные и железнодорожные перевозки, работаем с элеваторами и пунктами погрузки.' },
    ],
    sheetTitle: 'Условия закупки',
    rows: [
      { t: 'Регионы', d: 'Оренбургская область, Республика Башкортостан, Самарская область, Республика Татарстан и другие регионы России.' },
      { t: 'Объёмы', d: 'От отдельных автомобильных партий до крупных железнодорожных поставок.' },
      { t: 'Качество', d: 'Организуем проверку качественных показателей и оформление необходимых документов.' },
      { t: 'Расчёты', d: 'Прозрачные условия, конкурентоспособные цены и своевременное исполнение обязательств.' },
    ],
    listTitle: 'Что закупаем',
    cta: 'Предложить урожай',
  },

  sell: {
    title: 'Продаём зерновые и масличные культуры — опт и экспорт',
    description:
      'Оптовые поставки пшеницы, ячменя, кукурузы, нута, ржи, овса, подсолнечника, рапса и льна по России и на экспорт — в Казахстан, Узбекистан, Таджикистан и Афганистан. Автомобильный и железнодорожный транспорт.',
    h1: 'Продаём',
    intro: 'Оптовые поставки зерновых и масличных культур по России и на экспорт — от производителя до конечного покупателя.',
    argTitle: 'Партия под ваши объём, качество и сроки',
    pair: [
      { t: 'Гибкие условия', d: 'Рассматриваем различные объёмы, базисы поставки и условия оплаты.' },
      { t: 'Экспортная компетенция', d: 'Работаем с международными контрактами, транспортными и сопроводительными документами.' },
    ],
    sheetTitle: 'Условия поставки',
    rows: [
      { t: 'Объёмы', d: 'Отдельные автомобильные партии и крупные железнодорожные поставки. Опыт контрактов — от нескольких сотен до нескольких тысяч тонн.' },
      { t: 'Направления', d: 'Россия, Казахстан, Узбекистан, Таджикистан, Афганистан. Иран и Китай — развиваем.' },
      { t: 'Качество', d: 'Проверка качественных показателей продукции и оформление необходимых документов.' },
      { t: 'Подход', d: 'Подбираем решение с учётом объёмов, сроков, качества и географии поставок.' },
    ],
    listTitle: 'Что продаём',
    cta: 'Запросить цену',
  },

  markets: {
    title: 'Рынки — Россия, Казахстан, Узбекистан, Таджикистан, Афганистан',
    description:
      'География компании «Оренбург АгроАльянс»: регионы России и экспорт в Казахстан, Узбекистан, Таджикистан и Афганистан. Иран — перспективное направление, Китай — развиваемое.',
    h1: 'Рынки',
    intro:
      'Работаем из Оренбурга: экспортируем и организуем логистику автомобильным и железнодорожным транспортом.',
    hub: 'Оренбург — офис компании',
    mapAria: 'Карта: Россия, Казахстан, Узбекистан, Таджикистан, Афганистан, Иран и Китай; в центре — Оренбург',
    list: [
      { id: 'ru', name: 'Россия', text: 'Оренбургская область, Республика Башкортостан, Самарская область, Республика Татарстан и другие регионы.' },
      { id: 'kz', name: 'Казахстан' },
      { id: 'uz', name: 'Узбекистан' },
      { id: 'tj', name: 'Таджикистан' },
      { id: 'af', name: 'Афганистан' },
      { id: 'ir', name: 'Иран', status: 'перспективное направление' },
      { id: 'cn', name: 'Китай', status: 'развиваемое направление' },
    ] as Market[],
    note: 'География расширяется в зависимости от потребностей покупателей и возможностей поставщиков. Базис и маршрут обсуждаем под каждую сделку.',
  },

  logistics: {
    title: 'Логистика и порядок сотрудничества — от заявки до расчётов',
    description:
      'Как работает «Оренбург АгроАльянс»: заявка, коммерческое предложение, согласование, договор, организация поставки автомобильным и железнодорожным транспортом, исполнение обязательств.',
    h1: 'Логистика и поставки',
    intro:
      'Организуем поставку от производителя до конечного покупателя: транспорт, погрузку, документы и расчёты.',
    stepsTitle: 'Порядок сотрудничества',
    steps: [
      { t: 'Обращение', d: 'Вы направляете заявку: продукция, объём, качество и пункт назначения.' },
      { t: 'Коммерческое предложение', d: 'Рассчитываем стоимость продукции, условия поставки и логистику.' },
      { t: 'Согласование', d: 'Согласовываем качество, цену, объём, сроки и порядок оплаты.' },
      { t: 'Договор', d: 'Подписываем контракт и необходимые спецификации.' },
      { t: 'Организация поставки', d: 'Формируем партию, организуем транспорт, погрузку и оформление документов.' },
      { t: 'Исполнение', d: 'Контролируем отгрузку, сопровождаем поставку и проводим окончательные взаиморасчёты.' },
    ],
    modesTitle: 'Два вида транспорта',
    road: { t: 'Автомобильный', d: 'Отдельные автомобильные партии — гибко по срокам и объёму.' },
    rail: { t: 'Железнодорожный', d: 'Крупные железнодорожные поставки — для больших объёмов и дальних направлений.' },
    sheetTitle: 'По каждой партии',
    sheet: [
      { k: 'Качество', v: 'Проверка качественных показателей продукции' },
      { k: 'Погрузка', v: 'Взаимодействие с элеваторами и пунктами погрузки' },
      { k: 'Документы', v: 'Транспортные, сопроводительные и другие необходимые документы' },
      { k: 'Расчёты', v: 'Окончательные взаиморасчёты после исполнения поставки' },
    ],
  },

  about: {
    title: 'О компании — «Оренбург АгроАльянс», Оренбург',
    description:
      'ООО «Оренбург АгроАльянс» — торгово-экспортная компания из Оренбурга: закупка, оптовая реализация и экспорт зерновых и масличных культур, организация перевозок, сопровождение внешнеторговых контрактов.',
    h1: 'О компании',
    lead: 'Объединяем сельхозпроизводителей, переработчиков и покупателей',
    text: [
      '«Оренбург АгроАльянс» — российская торгово-экспортная компания. Занимаемся оптовыми закупками, реализацией и организацией поставок зерновых и масличных культур.',
      'Наша задача — прозрачные условия сотрудничества, конкурентоспособные цены и своевременное исполнение контрактных обязательств.',
    ],
    principlesTitle: 'Чем занимаемся',
    principles: [
      { t: 'Закупка', d: 'Зерновые и масличные культуры — непосредственно у сельхозпроизводителей.' },
      { t: 'Оптовая реализация', d: 'Продажа сельскохозяйственной продукции оптом.' },
      { t: 'Экспорт', d: 'Экспорт зерновых и масличных культур.' },
      { t: 'Перевозки', d: 'Организация автомобильных и железнодорожных перевозок.' },
      { t: 'Контракты', d: 'Сопровождение внешнеторговых контрактов.' },
      { t: 'Поставки', d: 'Организация поставок от производителя до конечного покупателя.' },
    ],
    scaleTitle: 'Масштаб',
    scale: [
      { k: 'Основана', v: '2026', d: 'год создания компании' },
      { k: 'Партии', v: 'Авто и ж/д', d: 'от отдельных машин до крупных железнодорожных поставок' },
      { k: 'Контракты', v: 'Сотни — тысячи тонн', d: 'опыт организации контрактов на партии зерна' },
      { k: 'Цель', v: '100 000 т', d: 'в год — стратегическая цель по торговому обороту' },
    ],
    officeTitle: 'Офис',
    mapLink: 'Открыть на карте',
  },

  contact: {
    title: 'Контакты — «Оренбург АгроАльянс», Оренбург',
    description:
      'Телефон, WhatsApp и Viber компании «Оренбург АгроАльянс». Офис: Оренбург, Красная площадь, 3/8. Заявка на покупку или продажу зерновых и масличных культур.',
    h1: 'Контакты',
    lead: 'Расскажите о поставке: продукция, объём, качество и пункт назначения',
    phoneLabel: 'Телефон',
    messengersLabel: 'Мессенджеры',
    addressLabel: 'Офис',
    form: {
      title: 'Запрос предложения',
      role: 'Вы',
      roleBuyer: 'Покупатель',
      roleSupplier: 'Сельхозпроизводитель',
      name: 'Имя и фамилия',
      company: 'Компания',
      email: 'Рабочая почта',
      phone: 'Телефон',
      contactHint: 'Укажите почту или телефон — хотя бы одно',
      country: 'Страна',
      crop: 'Культура',
      cropAny: 'Выберите культуру',
      volume: 'Объём, т',
      message: 'Сообщение',
      messagePh: 'Качество, базис, сроки, пункт назначения',
      consent: 'Согласен на обработку персональных данных',
      consentLink: 'политика',
      submit: 'Отправить запрос',
      sending: 'Отправляем…',
      required: 'Заполните поле',
      invalidEmail: 'Проверьте адрес почты',
      invalidPhone: 'Проверьте номер',
      needContact: 'Нужна почта или телефон',
      needConsent: 'Без согласия отправить не получится',
      sentTitle: 'Запрос отправлен',
      sentText: 'Мы свяжемся с вами, рассчитаем стоимость и условия поставки.',
      errorText: 'Не удалось отправить. Позвоните или напишите в WhatsApp — заявка не потеряется.',
      offlineTitle: 'Онлайн-отправка пока не подключена',
      offlineText: 'Текст заявки уже собран — отправьте его в WhatsApp одним нажатием или скопируйте.',
      offlineWa: 'Отправить в WhatsApp',
      offlineCopy: 'Скопировать текст',
      copied: 'Скопировано',
      back: 'Изменить заявку',
      waIntro: 'Заявка с сайта «Оренбург АгроАльянс»',
    },
  },

  privacy: {
    title: 'Политика конфиденциальности',
    description: 'Политика обработки персональных данных ООО «Оренбург АгроАльянс».',
    h1: 'Политика конфиденциальности',
  },

  notFound: {
    title: 'Страница не найдена',
    h1: 'Такой страницы нет',
    text: 'Возможно, адрес изменился после обновления сайта. Начните с главной или посмотрите продукцию.',
  },
};

export type Dict = typeof ru;

const en: Dict = {
  lang: 'en',
  htmlLang: 'en',
  locale: 'en_US',
  brand: 'Orenburg AgroAlliance',
  logo: { name: 'AgroAlliance', sub: 'Orenburg' },
  slogan: 'From the field to world agricultural markets',
  skip: 'Skip to content',
  nav: {
    commodities: 'Commodities',
    buy: 'We buy',
    sell: 'We sell',
    markets: 'Markets',
    logistics: 'Logistics',
    about: 'About',
    contact: 'Contact',
    home: 'Home',
    privacy: 'Privacy policy',
  },
  menu: 'Menu',
  close: 'Close',
  langSwitch: { label: 'Language', other: 'RU', otherFull: 'Русский' },
  cta: {
    quote: 'Request a quote',
    quoteLong: 'Get an offer',
    call: 'Call',
    whatsapp: 'WhatsApp',
    viber: 'Viber',
    commodities: 'All commodities',
    contact: 'Contact our team',
    sell: 'Offer your harvest',
    logistics: 'How we work',
    markets: 'Where we supply',
  },
  reply: 'We will calculate the price, delivery terms and logistics',
  footer: {
    tagline: 'Sourcing, wholesale and export of grains and oilseeds. Russia, Kazakhstan, Uzbekistan, Tajikistan, Afghanistan.',
    sitemap: 'Pages',
    contacts: 'Contact',
    rights: 'All rights reserved',
    credits: 'Photos are illustrative (Unsplash)',
  },

  quote: {
    title: 'Request an offer',
    crop: 'Commodity',
    cropAny: 'Choose a commodity',
    volume: 'Volume, t',
    volumePh: 'e.g. 500',
    dest: 'Destination',
    destAny: 'Where to deliver',
    submit: 'Get an offer',
  },

  regions: {
    ru: 'Russia',
    kz: 'Kazakhstan',
    uz: 'Uzbekistan',
    tj: 'Tajikistan',
    af: 'Afghanistan',
    ir: 'Iran',
    cn: 'China',
    other: 'Another country',
  },

  home: {
    title: 'Orenburg AgroAlliance — sourcing, wholesale and export of grains and oilseeds',
    description:
      'A trading and export company from Orenburg, Russia. We buy grains and oilseeds from farmers, sell wholesale across Russia and export to Kazakhstan, Uzbekistan, Tajikistan and Afghanistan.',
    heroTitle: ['From the field', 'to world', 'agricultural markets'],
    heroText:
      'Orenburg AgroAlliance is a trading and export company. We buy grains and oilseeds directly from farmers, sell wholesale and organise delivery all the way to the end buyer.',
    heroSecondary: 'View commodities',
    heroCaption: 'Orenburg',

    ledgerTitle: 'We buy the harvest from producers, build lots and bring them to the buyer — in Russia and abroad.',
    ledgerParts: ['We buy the harvest', 0, 'from producers, build lots', 1, 'and bring them to the buyer —', 2, 'in Russia and abroad.'] as (string | number)[],
    ledger: [
      { k: 'Products', v: 'Grains and oilseeds, feed mixes, processed products' },
      { k: 'Sourcing', v: 'Directly from farmers — lots built to the buyer’s needs' },
      { k: 'Logistics', v: 'Road and rail transport, elevators and loading points' },
      { k: 'Quality', v: 'Quality testing and the required documentation' },
      { k: 'Export', v: 'International contracts, transport and shipping documents' },
      { k: 'Terms', v: 'Various volumes, delivery bases and payment terms' },
      { k: 'Geography', v: 'Russia, Kazakhstan, Uzbekistan, Tajikistan, Afghanistan' },
    ],

    cropsTitle: 'Grains and oilseeds',
    cropsText: 'Lots built to the buyer’s needs. Grade, quality parameters and volume on request.',

    marketsTitle: 'From Orenburg — across Russia and for export',
    marketsText: 'We work with regions of Russia and export to Kazakhstan, Uzbekistan, Tajikistan and Afghanistan. Iran and China are our next markets.',

    logisticsTitle: 'We organise transport — by road and by rail',
    logisticsText:
      'Road and rail transport, work with elevators and loading points, support of foreign trade contracts — from the producer to the end buyer.',
    logisticsPoints: ['Road transport', 'Rail shipments', 'Elevators and loading points', 'Contract support'],

    sidesTitle: 'Two sides of one deal',
    buyers: {
      title: 'For buyers',
      text: 'Wholesale supply across Russia and for export. We match the commodity, volume and basis, and arrange transport and documents.',
      cta: 'What we sell',
    },
    farmers: {
      title: 'For farmers',
      text: 'We buy grains and oilseeds directly from farms. Transport and loading are on us.',
      cta: 'What we buy',
    },

    finalTitle: "Let's discuss a supply contract",
    finalText: 'Tell us the commodity, volume and destination — we will calculate the price, delivery terms and logistics.',
  },

  commodities: {
    title: 'Commodities — grains and oilseeds',
    description:
      'Milling wheat grades 3–5 and feed wheat, food, feed and malting barley, corn, chickpeas, rye, oats, sunflower seeds, rapeseed, oilseed flax, feed grain mixes. Wholesale and export.',
    h1: 'Commodities',
    intro:
      'Grains and oilseeds, feed mixes and processed products. Grade, quality parameters, volume and delivery basis are agreed for each lot.',
    specs: 'Specifications on request',
    request: 'Request',
    noPhoto: 'Photos on request',
    bottomTitle: 'Looking for a commodity not on the list?',
    bottomText: "Write to us — we'll check whether we can source and deliver it.",
  },

  buy: {
    title: 'We buy grains and oilseeds from farmers',
    description:
      'Direct purchase of wheat, barley, corn, chickpeas, rye, oats, sunflower seeds, rapeseed and flax from farmers in the Orenburg region, Bashkortostan, the Samara region, Tatarstan and other regions of Russia.',
    h1: 'We buy',
    intro: 'We buy grains and oilseeds directly from agricultural producers and organise the pick-up ourselves.',
    argTitle: 'Straight from the farm, transport on us',
    pair: [
      { t: 'Direct purchasing', d: 'We work with agricultural producers and build lots to our buyers’ needs.' },
      { t: 'Transport and loading', d: 'We organise road and rail transport and work with elevators and loading points.' },
    ],
    sheetTitle: 'Purchasing terms',
    rows: [
      { t: 'Regions', d: 'Orenburg region, Republic of Bashkortostan, Samara region, Republic of Tatarstan and other regions of Russia.' },
      { t: 'Volumes', d: 'From single truckloads to large rail shipments.' },
      { t: 'Quality', d: 'We arrange quality testing and the required documentation.' },
      { t: 'Payment', d: 'Transparent terms, competitive prices and timely performance of obligations.' },
    ],
    listTitle: 'What we buy',
    cta: 'Offer your harvest',
  },

  sell: {
    title: 'We sell grains and oilseeds — wholesale and export',
    description:
      'Wholesale supply of wheat, barley, corn, chickpeas, rye, oats, sunflower seeds, rapeseed and flax across Russia and for export to Kazakhstan, Uzbekistan, Tajikistan and Afghanistan. Road and rail transport.',
    h1: 'We sell',
    intro: 'Wholesale supply of grains and oilseeds across Russia and for export — from the producer to the end buyer.',
    argTitle: 'A lot built to your volume, quality and timing',
    pair: [
      { t: 'Flexible terms', d: 'We consider various volumes, delivery bases and payment terms.' },
      { t: 'Export expertise', d: 'We work with international contracts, transport and shipping documents.' },
    ],
    sheetTitle: 'Supply terms',
    rows: [
      { t: 'Volumes', d: 'Single truckloads and large rail shipments. Contract experience from several hundred to several thousand tonnes.' },
      { t: 'Destinations', d: 'Russia, Kazakhstan, Uzbekistan, Tajikistan, Afghanistan. Iran and China are being developed.' },
      { t: 'Quality', d: 'Quality testing and the required documentation.' },
      { t: 'Approach', d: 'Solutions tailored to volume, timing, quality and destination.' },
    ],
    listTitle: 'What we sell',
    cta: 'Request a quote',
  },

  markets: {
    title: 'Markets — Russia, Kazakhstan, Uzbekistan, Tajikistan, Afghanistan',
    description:
      'Where Orenburg AgroAlliance works: regions of Russia and export to Kazakhstan, Uzbekistan, Tajikistan and Afghanistan. Iran is a prospective market, China is being developed.',
    h1: 'Markets',
    intro: 'We work from Orenburg, Russia: we export and organise logistics by road and rail.',
    hub: 'Orenburg — company office',
    mapAria: 'Map: Russia, Kazakhstan, Uzbekistan, Tajikistan, Afghanistan, Iran and China; Orenburg in the centre',
    list: [
      { id: 'ru', name: 'Russia', text: 'Orenburg region, Republic of Bashkortostan, Samara region, Republic of Tatarstan and other regions.' },
      { id: 'kz', name: 'Kazakhstan' },
      { id: 'uz', name: 'Uzbekistan' },
      { id: 'tj', name: 'Tajikistan' },
      { id: 'af', name: 'Afghanistan' },
      { id: 'ir', name: 'Iran', status: 'prospective market' },
      { id: 'cn', name: 'China', status: 'market in development' },
    ],
    note: 'Our geography grows with the needs of buyers and the capacity of suppliers. Delivery basis and route are agreed for each deal.',
  },

  logistics: {
    title: 'Logistics and how we work — from request to settlement',
    description:
      'How Orenburg AgroAlliance works: request, commercial offer, agreement, contract, delivery by road and rail, performance of obligations.',
    h1: 'Supply & logistics',
    intro: 'We organise supply from the producer to the end buyer: transport, loading, documents and settlement.',
    stepsTitle: 'How we work together',
    steps: [
      { t: 'Request', d: 'You send a request: commodity, volume, quality and destination.' },
      { t: 'Commercial offer', d: 'We calculate the price of the product, delivery terms and logistics.' },
      { t: 'Agreement', d: 'We agree on quality, price, volume, timing and payment terms.' },
      { t: 'Contract', d: 'We sign the contract and the required specifications.' },
      { t: 'Delivery set-up', d: 'We build the lot and arrange transport, loading and documentation.' },
      { t: 'Performance', d: 'We control the shipment, follow the delivery through and make the final settlement.' },
    ],
    modesTitle: 'Two modes of transport',
    road: { t: 'Road', d: 'Single truckloads — flexible on timing and volume.' },
    rail: { t: 'Rail', d: 'Large rail shipments — for big volumes and long distances.' },
    sheetTitle: 'For every lot',
    sheet: [
      { k: 'Quality', v: 'Testing of the product’s quality parameters' },
      { k: 'Loading', v: 'Work with elevators and loading points' },
      { k: 'Documents', v: 'Transport, shipping and other required documents' },
      { k: 'Settlement', v: 'Final settlement once the delivery is complete' },
    ],
  },

  about: {
    title: 'About — Orenburg AgroAlliance, Orenburg',
    description:
      'Orenburg AgroAlliance LLC is a trading and export company from Orenburg, Russia: sourcing, wholesale and export of grains and oilseeds, transport, support of foreign trade contracts.',
    h1: 'About',
    lead: 'We bring together farmers, processors and buyers',
    text: [
      'Orenburg AgroAlliance is a Russian trading and export company. We specialise in wholesale purchasing, sale and supply of grains and oilseeds.',
      'Our job is to give clients transparent terms, competitive prices and timely performance of contract obligations.',
    ],
    principlesTitle: 'What we do',
    principles: [
      { t: 'Sourcing', d: 'Grains and oilseeds — directly from agricultural producers.' },
      { t: 'Wholesale', d: 'Wholesale of agricultural products.' },
      { t: 'Export', d: 'Export of grains and oilseeds.' },
      { t: 'Transport', d: 'Road and rail transport.' },
      { t: 'Contracts', d: 'Support of foreign trade contracts.' },
      { t: 'Supply', d: 'Delivery from the producer to the end buyer.' },
    ],
    scaleTitle: 'Scale',
    scale: [
      { k: 'Founded', v: '2026', d: 'year the company was established' },
      { k: 'Lots', v: 'Road and rail', d: 'from single trucks to large rail shipments' },
      { k: 'Contracts', v: 'Hundreds to thousands of tonnes', d: 'experience organising grain contracts' },
      { k: 'Goal', v: '100,000 t', d: 'a year — strategic target for trading volume' },
    ],
    officeTitle: 'Office',
    mapLink: 'Open in maps',
  },

  contact: {
    title: 'Contact — Orenburg AgroAlliance, Orenburg',
    description:
      'Phone, WhatsApp and Viber for Orenburg AgroAlliance. Office: 3/8 Krasnaya Ploshchad, Orenburg, Russia. Request to buy or sell grains and oilseeds.',
    h1: 'Contact',
    lead: 'Tell us about the supply: commodity, volume, quality and destination',
    phoneLabel: 'Phone',
    messengersLabel: 'Messengers',
    addressLabel: 'Office',
    form: {
      title: 'Request an offer',
      role: 'You are',
      roleBuyer: 'Buyer',
      roleSupplier: 'Farmer / producer',
      name: 'Full name',
      company: 'Company',
      email: 'Business email',
      phone: 'Phone',
      contactHint: 'Email or phone — at least one',
      country: 'Country',
      crop: 'Commodity',
      cropAny: 'Choose a commodity',
      volume: 'Volume, t',
      message: 'Message',
      messagePh: 'Quality, delivery basis, timing, destination',
      consent: 'I agree to the processing of my personal data',
      consentLink: 'policy',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'Please fill this in',
      invalidEmail: 'Check the email address',
      invalidPhone: 'Check the number',
      needContact: 'Email or phone is required',
      needConsent: 'Consent is required to send',
      sentTitle: 'Request sent',
      sentText: 'We will contact you with the price and delivery terms.',
      errorText: "Couldn't send. Please call or message us on WhatsApp — your request won't be lost.",
      offlineTitle: 'Online sending is not connected yet',
      offlineText: 'Your request is ready — send it to WhatsApp in one tap or copy it.',
      offlineWa: 'Send via WhatsApp',
      offlineCopy: 'Copy text',
      copied: 'Copied',
      back: 'Edit request',
      waIntro: 'Request from the Orenburg AgroAlliance website',
    },
  },

  privacy: {
    title: 'Privacy policy',
    description: 'Personal data processing policy of Orenburg AgroAlliance LLC.',
    h1: 'Privacy policy',
  },

  notFound: {
    title: 'Page not found',
    h1: 'This page does not exist',
    text: 'The address may have changed with the new website. Start from the home page or browse our commodities.',
  },
};

export const dict: Record<Lang, Dict> = { ru, en };
export const t = (lang: Lang) => dict[lang];
