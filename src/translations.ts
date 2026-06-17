export type Lang = "tg" | "ru" | "en";

export interface Translation {
  navAbout: string; navSkills: string; navServices: string;
  navPortfolio: string; navWhy: string; navContact: string; navCta: string;

  heroBadge: string;
  heroDesc: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  hstatProjects: string; hstatYears: string; hstatAccess: string;
  chipSpeedLabel: string; chipSpeedVal: string;
  chipQualityLabel: string; chipQualityVal: string;
  cardName: string; cardRole: string;

  aboutLabel: string; aboutGreeting: string; aboutHeading: string;
  aboutBio: string;
  infoLocation: string; infoSpec: string; infoExp: string; infoLang: string;
  infoLocVal: string; infoSpecVal: string; infoExpVal: string; infoLangVal: string;

  skillsLabel: string; skillsTitle: string; skillsDesc: string;
  skills: Array<{ name: string; desc: string }>;

  servicesLabel: string; servicesTitle: string; servicesDesc: string;
  svWeb: string; svWebDesc: string;
  svBot: string; svBotDesc: string;
  svBack: string; svBackDesc: string;
  svMob: string; svMobDesc: string;
  svInt: string; svIntDesc: string;
  svSup: string; svSupDesc: string;
  feats: {
    landing: string; corp: string; shop: string; portf: string;
    crm: string; orders: string; news: string; api: string;
    rest: string; db: string; auto: string;
    resp: string; speed: string; ux: string;
    tw: string; pay: string; extApi: string;
    sup24: string; upd: string; backup: string;
  };
  moreBtn: string;

  portfolioLabel: string; portfolioTitle: string; portfolioDesc: string;
  pfCommercial: string; pfCommercialDesc: string; pfLive: string;
  pfBotCrm: string; pfBotCrmDesc: string;
  pfLanding: string; pfLandingDesc: string;
  pf3d: string; pfResp: string;
  pfViewBtn: string;

  whyLabel: string; whyTitle: string;
  whyItems: Array<{ title: string; desc: string; icon?: string }>;
  sstatProjects: string; sstatSatisfaction: string;
  sstatExperience: string; sstatSupport: string;

  contactLabel: string; contactTitle: string; contactDesc: string;
  contactInfoTitle: string; contactNote: string;
  contactPhone: string; contactWhatsApp: string;
  contactTelegram: string; contactBot: string;
  fieldName: string; fieldNamePh: string;
  fieldPhone: string; fieldPhonePh: string;
  fieldMsg: string; fieldMsgPh: string;
  btnSend: string; btnSending: string; formHint: string;

  footerAllRights: string; footerStatus: string;

  mWebTitle: string; mWebKicker: string;
  mWebBig1: string; mWebBig2: string; mWebBig3: string;
  mWebLead: string; mWebBadge: string;
  mWebP1: string; mWebP2: string;
  mWebF1T: string; mWebF1D: string;
  mWebF2T: string; mWebF2D: string;
  mWebF3T: string; mWebF3D: string;
  mWebF4T: string; mWebF4D: string;
  mWebSubtitle: string; mWebBuildDesc: string; mWebSample: string;

  mBotTitle: string; mBotKicker: string;
  mBotBig1: string; mBotBig2: string; mBotBig3: string;
  mBotLead: string; mBotBadge: string;
  mBotP1: string; mBotP2: string;
  mBotF1T: string; mBotF1D: string;
  mBotF2T: string; mBotF2D: string;
  mBotF3T: string; mBotF3D: string;
  mBotF4T: string; mBotF4D: string;
  mBotWarn: string; mBotSubtitle: string; mBotWhyDesc: string;

  mPortIntro: string; mPortHeading: string;
  mPortP1T: string; mPortP1D: string;
  mPortP2T: string; mPortP2D: string;
  mPortWarn: string;
  mPortP3T: string; mPortP3D: string;
  mPortClosing: string;
}

const f = {
  landing: "Лендинг", corp: "Корпоративӣ", shop: "Мағозаи онлайн", portf: "Портфолио",
  crm: "CRM бот", orders: "Қабули фармоиш", news: "Хабаррасонӣ", api: "API",
  rest: "REST API", db: "Базаи маълумот", auto: "Автоматизатсия",
  resp: "Responsive", speed: "Суръати баланд", ux: "UX қулай",
  tw: "Telegram / WhatsApp", pay: "Пардохт", extApi: "API-ҳои берунӣ",
  sup24: "Дастгирии 24/7", upd: "Навсозӣ", backup: "Backup",
};

/* =============== TAJIK =============== */
const tg: Translation = {
  navAbout: "Дар бораи ман", navSkills: "Маҳоратҳо", navServices: "Хизматҳо",
  navPortfolio: "Портфолио", navWhy: "Чаро ман", navContact: "Тамос", navCta: "Коргузорӣ",

  heroBadge: "Барномасоз аз Тоҷикистон",
  heroDesc: "Ман вебсайтҳои муосир ва ботҳои Telegram месозам, ки барои соҳибкорон ва одамон арзиши ҳақиқӣ медиҳанд. Ҳар лоиҳа — эҷод ва масъулият.",
  heroCtaPrimary: "Дидани лоиҳаҳо →",
  heroCtaSecondary: "Тамос гирифтан",
  hstatProjects: "Лоиҳаҳо", hstatYears: "Соли таҷриба", hstatAccess: "Дастрасӣ",
  chipSpeedLabel: "Суръат", chipSpeedVal: "99%",
  chipQualityLabel: "Сифат", chipQualityVal: "A+",
  cardName: "Розиков Аличон", cardRole: "Developer · Tajikistan",

  aboutLabel: "01 · Дар бораи ман", aboutGreeting: "— Биёед шинос шавем",
  aboutHeading: "Ҳалли рақамии босифат барои тиҷорат ва шахс",
  aboutBio: "Ман бо забонҳои Python, JavaScript, HTML ва CSS кор мекунам. Вебсайтҳо ва телеграм ботҳо месозам, ки кори муштариёнамро осон ва самаранок мекунанд. Ба сифат, амният ва осонии истифода диққати махсус медиҳам.",
  infoLocation: "Ҷойгиршавӣ", infoSpec: "Тахассус", infoExp: "Таҷриба", infoLang: "Забонҳо",
  infoLocVal: "Тоҷикистон", infoSpecVal: "Full-Stack Developer", infoExpVal: "3+ сол",
  infoLangVal: "Тоҷикӣ · Русӣ · Англисӣ",

  skillsLabel: "02 · Маҳоратҳо", skillsTitle: "Технологияҳои ман",
  skillsDesc: "Абзорҳое, ки ман бо онҳо лоиҳаҳои пурқувват месозам.",
  skills: [
    { name: "Python", desc: "Backend, автоматизатсия, ботҳо ва скриптҳо." },
    { name: "JavaScript", desc: "Интерактивӣ ва логикаи саҳифаҳои веб." },
    { name: "HTML5", desc: "Сохтор ва семантикаи саҳифаҳои веб." },
    { name: "CSS3", desc: "Дизайни респонсив ва аниматсияҳо." },
    { name: "Telegram API", desc: "Ботҳои касбӣ барои бизнес ва шахс." },
    { name: "Базаи маълумот", desc: "SQLite, PostgreSQL ва кор бо API." },
  ],

  servicesLabel: "03 · Хизматҳо", servicesTitle: "Чӣ пешниҳод мекунам",
  servicesDesc: "Хизматҳои касбӣ барои бизнес, стартапҳо ва лоиҳаҳои шахсӣ.",
  svWeb: "Сохтани вебсайт", svWebDesc: "Вебсайтҳои замонавӣ, зебо ва респонсив барои ҳар навъ корхона.",
  svBot: "Ботҳои Telegram", svBotDesc: "Автоматизатсияи пурраи тиҷорат бо ботҳои интеллектуалӣ.",
  svBack: "Backend бо Python", svBackDesc: "Серверҳои боэътимод, API-ҳо ва коркарди маълумот.",
  svMob: "Дизайни мобилӣ", svMobDesc: "Адаптивӣ барои телефон, планшет ва ҳамаи экранҳо.",
  svInt: "Интегратсияҳо", svIntDesc: "Пайваст бо API, базаҳои маълумот ва хизматҳои дигар.",
  svSup: "Дастгирӣ ва такмил", svSupDesc: "Нигоҳдории лоиҳаҳои омода ва такмили функционал.",
  feats: f,
  moreBtn: "Муфассал →",

  portfolioLabel: "04 · Портфолио", portfolioTitle: "Лоиҳаҳои ман",
  portfolioDesc: "Намунаҳои воқеии корҳои анҷомёфта.",
  pfCommercial: "RemontTJ — Сайти тиҷоратӣ",
  pfCommercialDesc: "Аввалин вебсайти сохтаам — ширкати сохтмон ва таъмир",
  pfLive: "Live ✓",
  pfBotCrm: "@tajik_construction_crm_bot",
  pfBotCrmDesc: "⚠ Ҳозир дар сервер фаъол нест — намунаи кор",
  pfLanding: "Лендингҳо ва порталҳо",
  pfLandingDesc: "Сайтҳои шахсӣ ва лендингҳо барои соҳибкорон",
  pf3d: "3D Design", pfResp: "Responsive",
  pfViewBtn: "Сайти RemontTJ-ро бинед →",

  whyLabel: "05 · Чаро ман", whyTitle: "Чаро маро интихоб кунед",
  whyItems: [
    { title: "Муоширати доимӣ", desc: "Ҳамеша дар тамос ҳастам ва дар ҳар марҳилаи кор ҳисобот медиҳам." },
    { title: "Муҳлати дақиқ", desc: "Корҳоро сари вақт ва мувофиқи нақша месупорам." },
    { title: "Ҳалли инфиродӣ", desc: "Ҳар лоиҳаро аз сифр месозам, на аз қолибҳои омода." },
    { title: "Дастгирии пурра", desc: "Пас аз супоридан низ шуморо дастгирӣ мекунам." },
  ],
  sstatProjects: "Лоиҳаҳо", sstatSatisfaction: "Қаноатмандӣ",
  sstatExperience: "Соли таҷриба", sstatSupport: "Дастгирӣ",

  contactLabel: "06 · Тамос", contactTitle: "Биёед якҷоя кор кунем",
  contactDesc: "Барои муҳокимаи лоиҳа ё пурсиш бо ман тамос гиред. Дар 24 соат ҷавоб медиҳам.",
  contactInfoTitle: "Маълумоти тамос", contactNote: "Ман барои ҳар як лоиҳа ва ҳамкорӣ омодаам.",
  contactPhone: "Телефон", contactWhatsApp: "WhatsApp",
  contactTelegram: "Telegram", contactBot: "Намунаи боти ман",
  fieldName: "Номи шумо", fieldNamePh: "Номи худро нависед",
  fieldPhone: "Телефон", fieldPhonePh: "+992 ...",
  fieldMsg: "Паём", fieldMsgPh: "Дар бораи лоиҳаи худ нависед...",
  btnSend: "Фиристодан тариқи Telegram →", btnSending: "Кушодани Telegram...",
  formHint: "Паёми шумо ба Telegram-и ман мерасад",

  footerAllRights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд", footerStatus: "Дар дастрасӣ · Кори фаъол",

  mWebTitle: "🌐 Сохтани вебсайтҳо", mWebKicker: "Website Development",
  mWebBig1: "Сайти зебо,", mWebBig2: "суръатнок", mWebBig3: "ва фурӯшанда",
  mWebLead: "Вебсайт чеҳраи рақамии бизнеси шумо аст. Ман онро тавре месозам, ки муштарӣ бовар кунад, тамос гирад ва ба харид наздик шавад.",
  mWebBadge: "Responsive · SEO · 3D UI",
  mWebP1: "Сохтани вебсайтҳои замонавӣ яке аз самтҳои асосии кори ман аст. Ман барои соҳибкорон ва шахсони алоҳида вебсайтҳои зебо, суръатнок ва пурқувват месозам, ки натиҷаҳои воқеӣ медиҳанд. Вебсайт имрӯз воситаи асосии фурӯш ва муошират аст.",
  mWebP2: "Ҳар лоиҳаро бо диққати махсус ба таҷрибаи корбар, суръат, амният ва оптимизатсия месозам. Сайти шумо дар компютер ва телефон якхела зебо хоҳад буд.",
  mWebF1T: "Дизайни муосир", mWebF1D: "Намуди премиум, ранги неонӣ ва сохтори фаҳмо.",
  mWebF2T: "Суръати баланд", mWebF2D: "Сайт зуд бор мешавад ва интизорӣ намекунад.",
  mWebF3T: "Мобилӣ ва компютер", mWebF3D: "Дар ҳама экранҳо зебо ва қулай.",
  mWebF4T: "Тамоси зуд", mWebF4D: "Пайваст бо Telegram, WhatsApp ва дигар хизматҳо.",
  mWebSubtitle: "Барои шумо чӣ месозам?",
  mWebBuildDesc: "Лендингҳои фурӯшӣ, сайтҳои корпоративӣ, портфолио, системаҳои фармоиш ва пардохт. Вебсайтҳои ман фоидаоваранд.",
  mWebSample: "Намунаи аввалин вебсайти ман:",

  mBotTitle: "🤖 Ботҳои Telegram", mBotKicker: "Telegram Automation",
  mBotBig1: "Бот барои", mBotBig2: "автоматизатсия", mBotBig3: "ва фоида",
  mBotLead: "Боти Telegram метавонад фармоиш қабул кунад, муштариро сабт намояд, ҳисобот диҳад ва корро осон кунад.",
  mBotBadge: "CRM · Orders · API",
  mBotP1: "Ботҳои Telegram яке аз самтҳои муҳими кори ман аст. Ман ботҳоеро месозам, ки воқеан кор мекунанд ва фоида меоранд.",
  mBotP2: "Ботҳои ман фармоиш қабул мекунанд, маълумот ҷамъ мекунанд, базаро идора мекунанд ва бо дигар системаҳо пайваст мешаванд.",
  mBotF1T: "Фармоиш 24/7", mBotF1D: "Муштарӣ шабу рӯз фармоиш медиҳад.",
  mBotF2T: "Идораи муштариён", mBotF2D: "Ном, рақам ва ҳолати кор дар як ҷо.",
  mBotF3T: "Пайвастшавӣ", mBotF3D: "Бот бо базаи маълумот ва API пайваст мешавад.",
  mBotF4T: "Ҷавоби интеллектуалӣ", mBotF4D: "Бот саволҳоро қабул ва равандҳоро автоматӣ мекунад.",
  mBotWarn: "⚠ Бот @tajik_construction_crm_bot ҳозир дар сервер фаъол нест — намунаи кор.",
  mBotSubtitle: "Чаро боти Telegram муфид аст?",
  mBotWhyDesc: "Автоматизатсия вақт сарфа мекунад, хатогиро кам мекунад ва имкони фиристодани хабар ба ҳама муштариён медиҳад.",

  mPortIntro: "Дар ин бахш лоиҳаҳои анҷомшудаи ман оварда шудаанд.",
  mPortHeading: "Лоиҳаҳои асосӣ:",
  mPortP1T: "1. Сайти RemontTJ",
  mPortP1D: "Сайти пурраи тиҷоратӣ барои ширкати сохтмон ва таъмир. Дизайни муосир, хизматҳо, галерея.",
  mPortP2T: "2. @tajik_construction_crm_bot",
  mPortP2D: "Боти идоракунии муштариён: қабули фармоиш, маълумот ва ҳисобот.",
  mPortWarn: "⚠ Бот ҳозир дар сервер фаъол нест — намунаи кор.",
  mPortP3T: "3. Лендингҳо ва портфолиоҳо",
  mPortP3D: "Сайтҳои яксаҳифа барои блогерҳо ва стартапҳо бо 3D.",
  mPortClosing: "Ҳар лоиҳа барои ман — эҷод ва масъулият аст.",
};

/* =============== RUSSIAN =============== */
const ru: Translation = {
  navAbout: "Обо мне", navSkills: "Навыки", navServices: "Услуги",
  navPortfolio: "Портфолио", navWhy: "Почему я", navContact: "Контакты", navCta: "Заказать",

  heroBadge: "Разработчик из Таджикистана",
  heroDesc: "Я создаю современные сайты и Telegram-ботов, приносящих реальную ценность бизнесу и людям. Каждый проект — творчество и ответственность.",
  heroCtaPrimary: "Смотреть проекты →",
  heroCtaSecondary: "Связаться",
  hstatProjects: "Проектов", hstatYears: "Лет опыта", hstatAccess: "Доступ",
  chipSpeedLabel: "Скорость", chipSpeedVal: "99%",
  chipQualityLabel: "Качество", chipQualityVal: "A+",
  cardName: "Розиков Аличон", cardRole: "Developer · Tajikistan",

  aboutLabel: "01 · Обо мне", aboutGreeting: "— Давайте знакомиться",
  aboutHeading: "Качественные цифровые решения для бизнеса",
  aboutBio: "Работаю с Python, JavaScript, HTML и CSS. Создаю сайты и Telegram-ботов, упрощающие работу клиентов. Особое внимание уделяю качеству, безопасности и удобству.",
  infoLocation: "Местоположение", infoSpec: "Специализация", infoExp: "Опыт", infoLang: "Языки",
  infoLocVal: "Таджикистан", infoSpecVal: "Full-Stack Developer", infoExpVal: "3+ лет",
  infoLangVal: "Таджикский · Русский · Английский",

  skillsLabel: "02 · Навыки", skillsTitle: "Мои технологии",
  skillsDesc: "Инструменты, с помощью которых я создаю мощные проекты.",
  skills: [
    { name: "Python", desc: "Backend, автоматизация, боты и скрипты." },
    { name: "JavaScript", desc: "Интерактивность и логика веб-страниц." },
    { name: "HTML5", desc: "Структура и семантика веб-страниц." },
    { name: "CSS3", desc: "Адаптивный дизайн и анимации." },
    { name: "Telegram API", desc: "Профессиональные боты для бизнеса." },
    { name: "Базы данных", desc: "SQLite, PostgreSQL и работа с API." },
  ],

  servicesLabel: "03 · Услуги", servicesTitle: "Что я предлагаю",
  servicesDesc: "Профессиональные услуги для бизнеса, стартапов и личных проектов.",
  svWeb: "Создание сайтов", svWebDesc: "Современные, красивые и адаптивные сайты для любой компании.",
  svBot: "Telegram-боты", svBotDesc: "Полная автоматизация бизнеса интеллектуальными ботами.",
  svBack: "Backend на Python", svBackDesc: "Надёжные серверы, API и обработка данных.",
  svMob: "Мобильный дизайн", svMobDesc: "Адаптивность под телефон, планшет и все экраны.",
  svInt: "Интеграции", svIntDesc: "Подключение к API, базам данных и сервисам.",
  svSup: "Поддержка", svSupDesc: "Поддержка готовых проектов и доработка функционала.",
  feats: {
    landing: "Лендинг", corp: "Корпоративный", shop: "Интернет-магазин", portf: "Портфолио",
    crm: "CRM-бот", orders: "Приём заказов", news: "Рассылки", api: "API",
    rest: "REST API", db: "База данных", auto: "Автоматизация",
    resp: "Адаптивность", speed: "Высокая скорость", ux: "Удобный UX",
    tw: "Telegram / WhatsApp", pay: "Платежи", extApi: "Внешние API",
    sup24: "Поддержка 24/7", upd: "Обновления", backup: "Резервные копии",
  },
  moreBtn: "Подробнее →",

  portfolioLabel: "04 · Портфолио", portfolioTitle: "Мои проекты",
  portfolioDesc: "Реальные примеры выполненных работ.",
  pfCommercial: "RemontTJ — Бизнес-сайт",
  pfCommercialDesc: "Мой первый сайт — строительная и ремонтная компания",
  pfLive: "Работает ✓",
  pfBotCrm: "@tajik_construction_crm_bot",
  pfBotCrmDesc: "⚠ Временно не на сервере — пример работы",
  pfLanding: "Лендинги и порталы",
  pfLandingDesc: "Личные сайты и лендинги для предпринимателей",
  pf3d: "3D-дизайн", pfResp: "Адаптив",
  pfViewBtn: "Смотреть сайт RemontTJ →",

  whyLabel: "05 · Почему я", whyTitle: "Почему выбирают меня",
  whyItems: [
    { title: "Постоянная связь", desc: "Всегда на связи и сообщаю на каждом этапе." },
    { title: "Соблюдение сроков", desc: "Сдаю работы вовремя и по договорённому плану." },
    { title: "Индивидуальный подход", desc: "Каждый проект с нуля, не из шаблонов." },
    { title: "Полная поддержка", desc: "Поддерживаю проект и после сдачи." },
  ],
  sstatProjects: "Проектов", sstatSatisfaction: "Удовлетворённость",
  sstatExperience: "Лет опыта", sstatSupport: "Поддержка",

  contactLabel: "06 · Контакты", contactTitle: "Давайте работать вместе",
  contactDesc: "Свяжитесь для обсуждения проекта. Отвечаю в течение 24 часов.",
  contactInfoTitle: "Контактная информация", contactNote: "Готов к любому проекту.",
  contactPhone: "Телефон", contactWhatsApp: "WhatsApp",
  contactTelegram: "Telegram", contactBot: "Пример моего бота",
  fieldName: "Ваше имя", fieldNamePh: "Введите ваше имя",
  fieldPhone: "Телефон", fieldPhonePh: "+992 ...",
  fieldMsg: "Сообщение", fieldMsgPh: "Напишите о вашем проекте...",
  btnSend: "Отправить через Telegram →", btnSending: "Открытие Telegram...",
  formHint: "Ваше сообщение придёт в мой Telegram",

  footerAllRights: "Все права защищены", footerStatus: "В сети · Работаю",

  mWebTitle: "🌐 Создание сайтов", mWebKicker: "Website Development",
  mWebBig1: "Красивый,", mWebBig2: "быстрый", mWebBig3: "и продающий",
  mWebLead: "Сайт — это цифровое лицо бизнеса. Я создаю его так, чтобы клиент поверил, связался и сделал заказ.",
  mWebBadge: "Адаптив · SEO · 3D UI",
  mWebP1: "Создание современных сайтов — одно из основных направлений моей работы. Для предпринимателей и частных лиц я создаю красивые, быстрые и мощные сайты.",
  mWebP2: "Каждый проект создаю с вниманием к пользовательскому опыту, скорости и безопасности. Ваш сайт будет одинаково красив на компьютере и телефоне.",
  mWebF1T: "Современный дизайн", mWebF1D: "Премиальный вид, неоновые цвета и понятная структура.",
  mWebF2T: "Высокая скорость", mWebF2D: "Сайт загружается быстро и не заставляет ждать.",
  mWebF3T: "Мобильный и десктоп", mWebF3D: "Одинаково красиво на всех экранах.",
  mWebF4T: "Быстрая связь", mWebF4D: "Подключение Telegram, WhatsApp и других сервисов.",
  mWebSubtitle: "Что я создам для вас?",
  mWebBuildDesc: "Продающие лендинги, корпоративные сайты, портфолио, системы заказов и оплаты.",
  mWebSample: "Пример моего первого сайта:",

  mBotTitle: "🤖 Telegram-боты", mBotKicker: "Telegram Automation",
  mBotBig1: "Боты для", mBotBig2: "автоматизации", mBotBig3: "и прибыли",
  mBotLead: "Telegram-бот принимает заказы, регистрирует клиентов и упрощает повседневную работу.",
  mBotBadge: "CRM · Заказы · API",
  mBotP1: "Telegram-боты — одно из важнейших направлений моей работы. Я создаю ботов, реально работающих и приносящих пользу.",
  mBotP2: "Мои боты принимают заказы, регистрируют клиентов, собирают данные и подключаются к другим системам.",
  mBotF1T: "Заказы 24/7", mBotF1D: "Клиент заказывает днём и ночью, бот сохраняет данные.",
  mBotF2T: "Управление клиентами", mBotF2D: "Имя, телефон и статус работы в одной системе.",
  mBotF3T: "Интеграция", mBotF3D: "Бот подключается к базе данных, сайту, API.",
  mBotF4T: "Умные ответы", mBotF4D: "Бот отвечает на вопросы и автоматизирует процессы.",
  mBotWarn: "⚠ @tajik_construction_crm_bot не активен на сервере — пример работы.",
  mBotSubtitle: "Почему полезен Telegram-бот?",
  mBotWhyDesc: "Автоматизация экономит время, уменьшает ошибки и позволяет отправлять сообщения всем клиентам сразу.",

  mPortIntro: "В этом разделе представлены выполненные проекты.",
  mPortHeading: "Основные проекты:",
  mPortP1T: "1. Сайт RemontTJ",
  mPortP1D: "Полноценный бизнес-сайт для строительной компании. Современный дизайн, услуги, галерея.",
  mPortP2T: "2. @tajik_construction_crm_bot",
  mPortP2D: "Бот управления клиентами: приём заказов, хранение данных и отчёты.",
  mPortWarn: "⚠ Бот не на сервере — только пример работы.",
  mPortP3T: "3. Лендинги и портфолио",
  mPortP3D: "Одностраничные сайты для блогеров и стартапов с 3D-анимацией.",
  mPortClosing: "Каждый проект — творчество и ответственность.",
};

/* =============== ENGLISH =============== */
const en: Translation = {
  navAbout: "About", navSkills: "Skills", navServices: "Services",
  navPortfolio: "Portfolio", navWhy: "Why Me", navContact: "Contact", navCta: "Hire Me",

  heroBadge: "Developer from Tajikistan",
  heroDesc: "I build modern websites and Telegram bots that deliver real value to businesses and people. Every project is creativity and responsibility.",
  heroCtaPrimary: "View Projects →",
  heroCtaSecondary: "Get In Touch",
  hstatProjects: "Projects", hstatYears: "Years", hstatAccess: "Access",
  chipSpeedLabel: "Speed", chipSpeedVal: "99%",
  chipQualityLabel: "Quality", chipQualityVal: "A+",
  cardName: "Rozikov Alichon", cardRole: "Developer · Tajikistan",

  aboutLabel: "01 · About Me", aboutGreeting: "— Let's get to know each other",
  aboutHeading: "Quality digital solutions for business and people",
  aboutBio: "I work with Python, JavaScript, HTML and CSS. I build websites and Telegram bots that make clients' work easier and more efficient.",
  infoLocation: "Location", infoSpec: "Specialization", infoExp: "Experience", infoLang: "Languages",
  infoLocVal: "Tajikistan", infoSpecVal: "Full-Stack Developer", infoExpVal: "3+ years",
  infoLangVal: "Tajik · Russian · English",

  skillsLabel: "02 · Skills", skillsTitle: "My Technologies",
  skillsDesc: "The tools I use to build powerful projects.",
  skills: [
    { name: "Python", desc: "Backend, automation, bots and scripts." },
    { name: "JavaScript", desc: "Interactivity and web page logic." },
    { name: "HTML5", desc: "Structure and semantics of web pages." },
    { name: "CSS3", desc: "Responsive design and animations." },
    { name: "Telegram API", desc: "Professional bots for business." },
    { name: "Databases", desc: "SQLite, PostgreSQL and API work." },
  ],

  servicesLabel: "03 · Services", servicesTitle: "What I Offer",
  servicesDesc: "Professional services for businesses, startups and personal projects.",
  svWeb: "Web Development", svWebDesc: "Modern, beautiful and responsive websites.",
  svBot: "Telegram Bots", svBotDesc: "Full business automation with intelligent bots.",
  svBack: "Python Backend", svBackDesc: "Reliable servers, APIs and data processing.",
  svMob: "Mobile Design", svMobDesc: "Adaptive for phone, tablet and all screens.",
  svInt: "Integrations", svIntDesc: "Connect with APIs, databases and services.",
  svSup: "Support & Improvement", svSupDesc: "Maintenance and feature enhancements.",
  feats: {
    landing: "Landing", corp: "Corporate", shop: "E-commerce", portf: "Portfolio",
    crm: "CRM Bot", orders: "Order Taking", news: "Broadcasts", api: "API",
    rest: "REST API", db: "Database", auto: "Automation",
    resp: "Responsive", speed: "High Speed", ux: "Smooth UX",
    tw: "Telegram / WhatsApp", pay: "Payments", extApi: "External APIs",
    sup24: "24/7 Support", upd: "Updates", backup: "Backup",
  },
  moreBtn: "Learn more →",

  portfolioLabel: "04 · Portfolio", portfolioTitle: "My Projects",
  portfolioDesc: "Real examples of completed work.",
  pfCommercial: "RemontTJ — Business Website",
  pfCommercialDesc: "My first website — construction and repair company",
  pfLive: "Live ✓",
  pfBotCrm: "@tajik_construction_crm_bot",
  pfBotCrmDesc: "⚠ Not on server — work example",
  pfLanding: "Landings & Portals",
  pfLandingDesc: "Personal websites and landings for entrepreneurs",
  pf3d: "3D Design", pfResp: "Responsive",
  pfViewBtn: "View RemontTJ website →",

  whyLabel: "05 · Why Me", whyTitle: "Why Choose Me",
  whyItems: [
    { title: "Constant Communication", desc: "Always in touch, providing reports at every stage." },
    { title: "Accurate Deadlines", desc: "I deliver work on time according to the plan." },
    { title: "Individual Approach", desc: "Every project is built from scratch, not templates." },
    { title: "Full Support", desc: "I continue to support you after the project is delivered." },
  ],
  sstatProjects: "Projects", sstatSatisfaction: "Satisfaction",
  sstatExperience: "Years", sstatSupport: "Support",

  contactLabel: "06 · Contact", contactTitle: "Let's Work Together",
  contactDesc: "Contact me to discuss your project. I respond within 24 hours.",
  contactInfoTitle: "Contact Information", contactNote: "Ready for any project.",
  contactPhone: "Phone", contactWhatsApp: "WhatsApp",
  contactTelegram: "Telegram", contactBot: "Example of my bot",
  fieldName: "Your name", fieldNamePh: "Enter your name",
  fieldPhone: "Phone", fieldPhonePh: "+992 ...",
  fieldMsg: "Message", fieldMsgPh: "Write about your project...",
  btnSend: "Send via Telegram →", btnSending: "Opening Telegram...",
  formHint: "Your message goes directly to my Telegram",

  footerAllRights: "All rights reserved", footerStatus: "Online · Active",

  mWebTitle: "🌐 Web Development", mWebKicker: "Website Development",
  mWebBig1: "Beautiful,", mWebBig2: "fast", mWebBig3: "and selling",
  mWebLead: "A website is the digital face of your business. I build it so clients trust, contact and buy.",
  mWebBadge: "Responsive · SEO · 3D UI",
  mWebP1: "Building modern websites is one of my core areas. For entrepreneurs and individuals I create beautiful, fast and powerful sites that deliver real results.",
  mWebP2: "Every project is built with attention to user experience, speed, security and optimization.",
  mWebF1T: "Modern Design", mWebF1D: "Premium look, neon colors and clear structure.",
  mWebF2T: "High Performance", mWebF2D: "The site loads fast and never keeps users waiting.",
  mWebF3T: "Mobile & Desktop", mWebF3D: "Equally beautiful on phone, tablet and monitor.",
  mWebF4T: "Quick Contact", mWebF4D: "Integration with Telegram, WhatsApp and other services.",
  mWebSubtitle: "What can I build for you?",
  mWebBuildDesc: "Selling landings, corporate sites, portfolios, order and payment systems.",
  mWebSample: "Example of my first website:",

  mBotTitle: "🤖 Telegram Bots", mBotKicker: "Telegram Automation",
  mBotBig1: "Bots for", mBotBig2: "automation", mBotBig3: "and profit",
  mBotLead: "A Telegram bot can take orders, register clients, send reports and simplify daily work.",
  mBotBadge: "CRM · Orders · API",
  mBotP1: "Telegram bots are one of the most important areas of my work. I build bots that actually work and bring great value.",
  mBotP2: "My bots take orders, register customers, collect data and connect to other systems.",
  mBotF1T: "24/7 Orders", mBotF1D: "Customers order day and night, the bot stores all data.",
  mBotF2T: "Client Management", mBotF2D: "Name, phone, request and status stored in one system.",
  mBotF3T: "Integration", mBotF3D: "Bot connects to databases, websites and APIs.",
  mBotF4T: "Intelligent Answers", mBotF4D: "The bot can answer questions and automate processes.",
  mBotWarn: "⚠ @tajik_construction_crm_bot is currently inactive — kept as a work example.",
  mBotSubtitle: "Why is a Telegram bot useful?",
  mBotWhyDesc: "Automation saves time, reduces errors, never loses data and allows mass messaging.",

  mPortIntro: "This section shows some of my completed projects.",
  mPortHeading: "Main projects:",
  mPortP1T: "1. RemontTJ Website",
  mPortP1D: "A full business website for a construction company with modern design and services.",
  mPortP2T: "2. @tajik_construction_crm_bot",
  mPortP2D: "Client management bot: order taking, data storage and reports.",
  mPortWarn: "⚠ Bot is not on server — work example only.",
  mPortP3T: "3. Landings & Portfolios",
  mPortP3D: "One-page sites for bloggers and startups with 3D animations.",
  mPortClosing: "Every project is creativity and responsibility for me.",
};

export const translations: Record<Lang, Translation> = { tg, ru, en };
export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "tg", label: "ТЧ", flag: "🇹🇯" },
  { code: "ru", label: "РУ", flag: "🇷🇺" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];
