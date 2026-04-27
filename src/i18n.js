import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        category: "Category",
        contact: "Contact",
        about: "About",
        signup: "Sign Up",
        search: "What are you looking for?",
      },

      auth: {
        loginBtn: "Log in",
      },

      flashSales: {
        today: "Today’s",
        title: "Flash Sales",
        loading: "Loading...",
        addToCart: "Add To Cart",
      },

      about: {
        breadcrumb: {
          home: "Home",
          about: "About",
        },
        story: {
          title: "Our Story",
          desc1: "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.",
          desc2: "Exclusive has more than 1 million products to offer, growing very fast. Exclusive offers a diverse assortment in categories ranging from consumer goods and lifestyle products.",
        },
        stats: {
          sellers: "Sellers active on our site",
          sales: "Monthly Product Sale",
          customers: "Customers active on our site",
          annual: "Annual gross sale on our site",
        },
        team: {
          tom: "Founder & Chairman",
          emma: "Managing Director",
          will: "Product Designer",
        },
      },

      footer: {
        subscribe: "Subscribe",
        discount: "Get 10% off your first order",
        enterEmail: "Enter your email",
        support: "Support",
        account: "Account",
        cart: "Cart",
        wishlist: "Wishlist",
        shop: "Shop",
        quickLink: "Quick Link",
        privacy: "Privacy Policy",
        terms: "Terms Of Use",
        faq: "FAQ",
        contact: "Contact",
        social: "Social",
      },

      promo: {
        categories: "Categories",
        title: "Enhance Your Music Experience",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        buyNow: "Buy Now",
      },

      bestSelling: {
        subtitle: "This Month",
        title: "Best Selling Products",
        viewAll: "View All",
      },

      explore: {
        subtitle: "Our Products",
        title: "Explore Our Products",
        viewAll: "View All Products",
      },

      featured: {
        subtitle: "Featured",
        title: "New Arrival",
        shopNow: "Shop Now",
        ps5: {
          title: "PlayStation 5",
          desc: "Black and White version of the PS5 coming out on sale.",
        },
        womens: {
          title: "Women’s Collections",
          desc: "Featured woman collections that give you another vibe.",
        },
        speakers: {
          title: "Speakers",
          desc: "Amazon wireless speakers",
        },
        perfume: {
          title: "Perfume",
          desc: "GUCCI INTENSE OUD EDP",
        },
      },

      services: {
        delivery: {
          title: "FREE AND FAST DELIVERY",
          desc: "Free delivery for all orders over $140",
        },
        customerService: {
          title: "24/7 CUSTOMER SERVICE",
          desc: "Friendly 24/7 customer support",
        },
        guarantee: {
          title: "MONEY BACK GUARANTEE",
          desc: "We return money within 30 days",
        },
      },

      home: {
        browseByCategory: "Browse By Category",
        hero: {
          iphone: "iPhone 14 Series",
          discount: "Up to 10% off Voucher",
        },
        categories: {
          womansFashion: "Woman’s Fashion",
          mensFashion: "Men’s Fashion",
          electronics: "Electronics",
          homeLifestyle: "Home & Lifestyle",
          medicine: "Medicine",
          sportsOutdoor: "Sports & Outdoor",
          babysToys: "Baby’s & Toys",
          groceriesPets: "Groceries & Pets",
          healthBeauty: "Health & Beauty",
        },
      },
    },
  },

  ru: {
    translation: {
      nav: {
        home: "Главная",
        category: "Категория",
        contact: "Контакты",
        about: "О нас",
        signup: "Регистрация",
        search: "Что вы ищете?",
      },

      auth: {
        loginBtn: "Войти",
      },

      flashSales: {
        today: "Сегодня",
        title: "Горячие скидки",
        loading: "Загрузка...",
        addToCart: "Добавить в корзину",
      },

      about: {
        breadcrumb: {
          home: "Главная",
          about: "О нас",
        },
        story: {
          title: "Наша история",
          desc1: "Основанный в 2015 году, Exclusive — ведущий онлайн-магазин Южной Азии с активным присутствием в Бангладеш. Благодаря широкому набору маркетинговых, аналитических и сервисных решений, Exclusive объединяет 10 500 продавцов, 300 брендов и обслуживает 3 миллиона клиентов по всему региону.",
          desc2: "Exclusive предлагает более 1 миллиона товаров и очень быстро растет. Магазин предлагает широкий ассортимент товаров в разных категориях потребительских и lifestyle-продуктов.",
        },
        stats: {
          sellers: "Продавцов активно на нашем сайте",
          sales: "Продаж товаров в месяц",
          customers: "Покупателей активно на нашем сайте",
          annual: "Годовой валовый оборот на сайте",
        },
        team: {
          tom: "Основатель и председатель",
          emma: "Управляющий директор",
          will: "Дизайнер продукта",
        },
      },

      footer: {
        subscribe: "Подписка",
        discount: "Скидка 10% на первый заказ",
        enterEmail: "Введите email",
        support: "Поддержка",
        account: "Аккаунт",
        cart: "Корзина",
        wishlist: "Избранное",
        shop: "Магазин",
        quickLink: "Быстрые ссылки",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования",
        faq: "FAQ",
        contact: "Контакты",
        social: "Соцсети",
      },

      promo: {
        categories: "Категории",
        title: "Улучшите свой музыкальный опыт",
        days: "Дни",
        hours: "Часы",
        minutes: "Мин",
        seconds: "Сек",
        buyNow: "Купить",
      },

      bestSelling: {
        subtitle: "Этот месяц",
        title: "Лучшие продажи",
        viewAll: "Смотреть все",
      },

      explore: {
        subtitle: "Наши товары",
        title: "Изучите наши товары",
        viewAll: "Все товары",
      },

      featured: {
        subtitle: "Новинки",
        title: "Новые поступления",
        shopNow: "Купить",
        ps5: {
          title: "PlayStation 5",
          desc: "Черно-белая версия PS5 уже в продаже.",
        },
        womens: {
          title: "Женская коллекция",
          desc: "Новая женская коллекция для яркого образа.",
        },
        speakers: {
          title: "Колонки",
          desc: "Беспроводные колонки Amazon",
        },
        perfume: {
          title: "Парфюм",
          desc: "GUCCI INTENSE OUD EDP",
        },
      },

      services: {
        delivery: {
          title: "БЕСПЛАТНАЯ И БЫСТРАЯ ДОСТАВКА",
          desc: "Бесплатная доставка для заказов от $140",
        },
        customerService: {
          title: "24/7 ПОДДЕРЖКА",
          desc: "Дружелюбная поддержка 24/7",
        },
        guarantee: {
          title: "ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ",
          desc: "Возврат денег в течение 30 дней",
        },
      },

      home: {
        browseByCategory: "По категориям",
        hero: {
          iphone: "Серия iPhone 14",
          discount: "До 10% скидка ваучером",
        },
        categories: {
          womansFashion: "Женская мода",
          mensFashion: "Мужская мода",
          electronics: "Электроника",
          homeLifestyle: "Дом и стиль",
          medicine: "Медицина",
          sportsOutdoor: "Спорт и отдых",
          babysToys: "Детям и игрушки",
          groceriesPets: "Продукты и питомцы",
          healthBeauty: "Красота и здоровье",
        },
      },
    },
  },

  tj: {
    translation: {
      nav: {
        home: "Асосӣ",
        category: "Категория",
        contact: "Тамос",
        about: "Дар бораи мо",
        signup: "Бақайдгирӣ",
        search: "Чиро ҷустуҷӯ доред?",
      },

      auth: {
        loginBtn: "Ворид шудан",
      },

      flashSales: {
        today: "Имрӯз",
        title: "Тахфифҳои зуд",
        loading: "Бор шуда истодааст...",
        addToCart: "Ба сабад",
      },

      about: {
        breadcrumb: {
          home: "Асосӣ",
          about: "Дар бораи мо",
        },
        story: {
          title: "Қиссаи мо",
          desc1: "Exclusive соли 2015 таъсис ёфта, яке аз бузургтарин маркетплейсҳои онлайнии Осиёи Ҷанубӣ мебошад, ки дар Бангладеш фаъол аст. Бо дастгирии васеи маркетинг, маълумот ва ҳалли хизматрасонӣ, Exclusive дорои 10 500 фурӯшанда, 300 бренд буда, ба 3 миллион муштарӣ дар минтақа хизмат мерасонад.",
          desc2: "Exclusive зиёда аз 1 миллион маҳсулот пешниҳод мекунад ва хеле босуръат рушд мекунад. Ин платформа интихоби васеи маҳсулотро дар категорияҳои гуногуни маишӣ ва lifestyle пешниҳод менамояд.",
        },
        stats: {
          sellers: "Фурӯшандагони фаъол дар сайти мо",
          sales: "Фурӯши моҳонаи маҳсулот",
          customers: "Муштариёни фаъол дар сайти мо",
          annual: "Фурӯши умумии солона дар сайти мо",
        },
        team: {
          tom: "Муассис ва роҳбар",
          emma: "Директори иҷроия",
          will: "Дизайнери маҳсулот",
        },
      },

      footer: {
        subscribe: "Обуна",
        discount: "Барои фармоиши аввал 10% тахфиф",
        enterEmail: "Email-ро нависед",
        support: "Дастгирӣ",
        account: "Аккаунт",
        cart: "Сабад",
        wishlist: "Избранное",
        shop: "Мағоза",
        quickLink: "Ссылкаҳои зуд",
        privacy: "Сиёсати махфият",
        terms: "Шартҳои истифода",
        faq: "FAQ",
        contact: "Тамос",
        social: "Иҷтимоӣ",
      },

      promo: {
        categories: "Категорияҳо",
        title: "Таҷрибаи мусиқии худро беҳтар кунед",
        days: "Рӯз",
        hours: "Соат",
        minutes: "Дақ",
        seconds: "Сон",
        buyNow: "Харидан",
      },

      bestSelling: {
        subtitle: "Ин моҳ",
        title: "Маҳсулоти серфурӯш",
        viewAll: "Ҳамааш",
      },

      explore: {
        subtitle: "Маҳсулоти мо",
        title: "Маҳсулотро бинед",
        viewAll: "Ҳамаи маҳсулот",
      },

      featured: {
        subtitle: "Нав",
        title: "Маҳсулоти нав",
        shopNow: "Харидан",
        ps5: {
          title: "PlayStation 5",
          desc: "Версияи сиёҳу сафеди PS5 ба фурӯш баромад.",
        },
        womens: {
          title: "Коллексияи занона",
          desc: "Коллексияи занона барои услуби дигар.",
        },
        speakers: {
          title: "Колонкаҳо",
          desc: "Колонкаҳои бесими Amazon",
        },
        perfume: {
          title: "Атр",
          desc: "GUCCI INTENSE OUD EDP",
        },
      },

      services: {
        delivery: {
          title: "РАСОНИШИ РОЙГОН ВА ЗУД",
          desc: "Барои ҳамаи фармоишҳо аз $140 боло",
        },
        customerService: {
          title: "24/7 ХИЗМАТРАСОНӢ",
          desc: "Дастгирии дӯстона 24/7",
        },
        guarantee: {
          title: "КАФОЛАТИ БАРГАРДОНИ ПУЛ",
          desc: "Дар давоми 30 рӯз пул баргардонда мешавад",
        },
      },

      home: {
        browseByCategory: "Аз рӯи категория",
        hero: {
          iphone: "Силсилаи iPhone 14",
          discount: "То 10% тахфиф",
        },
        categories: {
          womansFashion: "Модаи занона",
          mensFashion: "Модаи мардона",
          electronics: "Электроника",
          homeLifestyle: "Хона ва зиндагӣ",
          medicine: "Дору",
          sportsOutdoor: "Спорт ва истироҳат",
          babysToys: "Бачагона ва бозича",
          groceriesPets: "Хӯрокворӣ ва ҳайвонот",
          healthBeauty: "Саломатӣ ва зебоӣ",
        },
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n