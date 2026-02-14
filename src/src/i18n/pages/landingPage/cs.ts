/**
 * 🇨🇿 ČESKÉ PŘEKLADY - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const csLandingPage: LandingPageContent = {
  language: 'cs',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Lídr v evropském náboru - Agenturní zaměstnání a stálé smlouvy ve 27 zemích",
    metaDescription: "Přístup k více než 500 náborovým agenturám ve 27 evropských zemích. Agenturní zaměstnání, stálé smlouvy, vysílání pracovníků: YOJOB zjednodušuje mezinárodní nábor.",
    slug: "/",
    h1: "Lídr v evropském náboru",
    ogTitle: "YOJOB - Váš partner pro nábor v Evropě",
    ogDescription: "Zjednodušený evropský nábor: více než 500 agentur, 27 zemí, všechny formality vyřízeny.",
    altTexts: {
      heroVisual: "Interaktivní mapa Evropy zobrazující síť YOJOB",
      europeMap: "Mapa 27 evropských zemí pokrytých YOJOB",
      logoFooter: "Logo YOJOB - Evropský nábor",
    },
    aiSummary: "YOJOB je francouzský lídr v evropském náboru, se sítí více než 500 partnerských agentur ve 27 zemích. Usnadňujeme evropské agenturní zaměstnání, specializovaný nábor, vysílání pracovníků a nabízíme poradenství v oblasti dodržování předpisů. Naše odbornost umožňuje společnostem rychle a legálně najímat zaměstnance v celé Evropě, s kompletní správou administrativních formalit.",
    faq: [
      {
        question: "Co je YOJOB?",
        answer: "YOJOB je evropský náborový zprostředkovatel, který propojuje francouzské společnosti se sítí více než 500 agentur ve 27 evropských zemích za účelem usnadnění agenturního zaměstnání, náboru a vysílání pracovníků."
      },
      {
        question: "Ve kterých zemích působíte?",
        answer: "Pokrýváme 27 zemí Evropské unie plus Norsko, tedy úplné pokrytí západní, severní, jižní a východní Evropy."
      },
      {
        question: "Jaké typy náboru nabízíte?",
        answer: "Nabízíme evropské agenturní zaměstnání, nábor na dobu určitou/neurčitou, vysílání pracovníků a poradenství v oblasti dodržování předpisů, abychom zajistili soulad s legislativou."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Domů",
      services: "Služby",
      network: "Síť",
      blog: "Blog",
      contact: "Kontakt"
    },
    cta: "Požádat o nabídku",
    survey: "Evropský průzkum"
  },

  // Hero Section
  hero: {
    badge: "⭐ Lídr v evropském náboru",
    title: "Najímejte v celé Evropě díky naší síti více než 500 partnerských agentur",
    subtitle: "Agenturní zaměstnání, stálé smlouvy, vysílání: přístup k nejlepším evropským talentům. Všechny formality vyřídíme za vás.",
    benefits: [
      "27 pokrytých evropských zemí",
      "Více než 500 certifikovaných agentur",
      "Kompletní administrativní správa",
      "Zaručená shoda s předpisy"
    ],
    ctaPrimaryLabel: "Získat bezplatnou nabídku",
    ctaSecondaryLabel: "Objevte naše služby",
    stats: {
      agencies: { value: "500+", label: "partnerských agentur" },
      countries: { value: "27", label: "evropských zemí" },
      missions: { value: "2000+", label: "úspěšných zakázek" }
    },
    floatingCards: {
      since: { label: "Od roku", value: "2014" },
      expertise: { value: "10 let", label: "Vedoucí odbornosti" },
      partners: { label: "Partneři", value: "Více než 500 certifikovaných agentur" },
      countries: { value: "27", label: "Evropských zemí" },
      certified: { value: "500+", label: "Certifikovaných agentur" },
      activeNetwork: "Aktivní síť"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Naše Klíčová Čísla",
    title: "Uznávaná odbornost v Evropě",
    items: [
      { value: "10", label: "let zkušeností", icon: "Target" },
      { value: "27", label: "pokrytých zemí", icon: "Globe" },
      { value: "500", label: "partnerských agentur", icon: "Network" },
      { value: "2000", label: "realizovaných zakázek", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Naše Služby",
    title: "Náborová řešení přizpůsobená vašim potřebám",
    subtitle: "Ať hledáte dočasné, stálé nebo vyslané zaměstnance, máme řešení",
    services: [
      {
        icon: "Users",
        title: "Evropské Agenturní Zaměstnání",
        description: "Najímejte kvalifikované dočasné pracovníky v celé Evropě. Vyřídíme všechny administrativní formality.",
        linkLabel: "Zjistit více",
        href: "/sluzba/evropske-agenturni-zamestnani"
      },
      {
        icon: "Target",
        title: "Specializovaný Nábor",
        description: "Najděte nejlepší talenty pro vaše pozice na dobu určitou/neurčitou díky naší evropské síti odborníků.",
        linkLabel: "Zjistit více",
        href: "/sluzba/specializovany-nabor"
      },
      {
        icon: "ShieldCheck",
        title: "Poradenství a Shoda s Předpisy",
        description: "Zajistěte dodržování všech evropských předpisů týkajících se vysílání a mobility.",
        linkLabel: "Zjistit více",
        href: "/sluzba/poradenstvi-shoda"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Evropská Síť",
    title: "27 zemí, více než 500 certifikovaných partnerských agentur",
    subtitle: "Naše síla: hustá a kvalifikovaná síť v celé Evropě",
    mapLabel: "partnerských agentur",
    waitlist: {
      badge: "🚀 Novinka 2025",
      title: "Tržiště evropských agentur",
      subtitle: "Již brzy: porovnejte a kontaktujte agentury z naší sítě přímo",
      features: [
        "✓ Vícekriteriální vyhledávání (země, sektor, profese)",
        "✓ Okamžité porovnání agentur",
        "✓ Ověřené recenze zákazníků",
        "✓ Přímé a bezpečné spojení"
      ],
      formTitle: "Buďte mezi prvními!",
      formSubtitle: "Zapište se na čekací listinu pro včasný přístup",
      emailPlaceholder: "vas@email.cz",
      ctaLabel: "Připojit se k čekací listině",
      securityNote: "🔒 Vaše údaje jsou v bezpečí a nikdy nebudou sdíleny",
      successMessage: "Děkujeme! Jste zapsáni na čekací listině. Budeme vás kontaktovat, jakmile otevřeme."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Jak to funguje",
    title: "Evropský nábor zjednodušený ve 4 krocích",
    subtitle: "Jasný a efektivní proces pro váš nábor",
    steps: [
      {
        number: "01",
        title: "Popište svou potřebu",
        description: "Sdělte nám své náborové potřeby: profese, počet pozic, délka trvání, požadované kvalifikace.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktivujeme naši síť",
        description: "Naše partnerské agentury v celé Evropě identifikují a vybírají nejlepší dostupné profily.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Schvalte kandidáty",
        description: "Obdržíte předvybrané životopisy a provedete pohovory s kandidáty, kteří vás zajímají.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Přivítejte svůj tým",
        description: "Vybraní kandidáti se připojí k vašim týmům. Vyřídíme všechny administrativní a právní formality.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Reference",
    title: "Důvěřují nám",
    subtitle: "Objevte zkušenosti našich zákazníků",
    testimonials: [
      {
        name: "Petr Novák",
        position: "Ředitel HR",
        company: "TechBuild Česko",
        quote: "Díky YOJOB jsme dokázali najmout 15 kvalifikovaných polských zedníků za 3 týdny. Profesionální a efektivní služba!",
        rating: 5,
        sector: "Stavebnictví"
      },
      {
        name: "Jana Svobodová",
        position: "Ředitelka HR",
        company: "AgroČesko",
        quote: "Administrativní správa je skutečná bolest hlavy při mezinárodním náboru. YOJOB se postará o všechno, je to obrovská úspora času.",
        rating: 5,
        sector: "Potravinářství"
      },
      {
        name: "Martin Dvořák",
        position: "Vedoucí výroby",
        company: "AutoParts Europa",
        quote: "Vynikající doprovod! Našli jsme specializované techniky v Německu, které bychom sami nikdy nedokázali najmout.",
        rating: 5,
        sector: "Průmysl"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Odvětví činnosti",
    title: "Najímáme ve všech odvětvích",
    subtitle: "Naše síť pokrývá všechny profese a průmyslová odvětví",
    sectors: [
      { icon: "Building2", name: "Stavebnictví a Veřejné Práce", color: "orange" },
      { icon: "Factory", name: "Průmysl", color: "blue" },
      { icon: "Tractor", name: "Zemědělství", color: "green" },
      { icon: "UtensilsCrossed", name: "Stravování a Pohostinství", color: "red" },
      { icon: "Heart", name: "Zdravotnictví a Sociální Péče", color: "pink" },
      { icon: "Laptop", name: "Technologie a IT", color: "violet" },
      { icon: "Truck", name: "Logistika a Doprava", color: "blue" },
      { icon: "ShoppingBag", name: "Obchod a Distribuce", color: "green" },
      { icon: "Briefcase", name: "Obchodní služby", color: "cyan" },
      { icon: "Wrench", name: "Údržba a Servis", color: "orange" },
      { icon: "Plane", name: "Cestovní Ruch a Volný Čas", color: "blue" },
      { icon: "Ship", name: "Námořní a Přístavní", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontaktujte nás",
    title: "Připraveni najmout v Evropě?",
    subtitle: "Získejte bezplatnou a personalizovanou nabídku do 24 hodin",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Rychlá odpověď",
        description: "Nabídka do 24 pracovních hodin"
      },
      {
        icon: "ShieldCheck",
        title: "Bez závazků",
        description: "Zdarma a bez povinností"
      },
      {
        icon: "Users",
        title: "Vyhrazená podpora",
        description: "Odborník k vaší dispozici"
      },
      {
        icon: "Globe",
        title: "Evropské pokrytí",
        description: "27 přístupných zemí"
      }
    ],
    form: {
      fields: {
        name: { label: "Celé jméno", placeholder: "Jan Novák" },
        email: { label: "Firemní e-mail", placeholder: "jan.novak@firma.cz" },
        phone: { label: "Telefon", placeholder: "+420 123 456 789" },
        company: { label: "Společnost", placeholder: "Název vaší společnosti" },
        contactType: {
          label: "Typ kontaktu",
          placeholder: "Vyberte svůj profil",
          options: {
            client: "Jsem zákazník (společnost hledající zaměstnance)",
            agency: "Jsem náborová agentura",
            interim: "Jsem agenturní pracovník",
            other: "Jiné"
          }
        },
        needType: { 
          label: "Typ potřeby", 
          placeholder: "Vyberte svou potřebu",
          options: [
            "Evropské agenturní zaměstnání",
            "Specializovaný nábor",
            "Poradenství a Shoda s předpisy",
            "Jiná potřeba"
          ]
        },
        message: { label: "Popište svou potřebu", placeholder: "Např.: Hledání 10 zedníků na 6měsíční stavbu v oblasti Prahy..." }
      },
      ctaLabel: "Odeslat mou žádost",
      securityNote: "🔒 Vaše údaje jsou chráněny a nikdy nebudou sdíleny s třetími stranami",
      successMessage: "Děkujeme! Obdrželi jsme vaši žádost a budeme vás kontaktovat do 24 hodin."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Váš partner pro nábor v Evropě"
    },
    columns: {
      services: {
        title: "Služby",
        links: [
          { label: "Evropské Agenturní Zaměstnání", href: "/sluzba/evropske-agenturni-zamestnani" },
          { label: "Specializovaný Nábor", href: "/sluzba/specializovany-nabor" },
          { label: "Vysílání Pracovníků", href: "/sluzba/vysilani-pracovniku" },
          { label: "Poradenství a Shoda s předpisy", href: "/sluzba/poradenstvi-shoda" }
        ]
      },
      company: {
        title: "Společnost",
        links: [
          { label: "O nás", href: "/o-nas" },
          { label: "Naše síť", href: "/nase-sit" },
          { label: "Naše odvětví", href: "/nase-odvetvi" },
          { label: "Reference", href: "/reference" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Francie",
        phone: "+33 6 50 62 25 24",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2026 YOJOB. Všechna práva vyhrazena.",
      madeWith: "Vytvořeno s ❤️ pro usnadnění evropského náboru",
      legalLinks: [
        { label: "Právní upozornění", href: "/legal" },
        { label: "VOP", href: "/cgv" },
        { label: "Zásady ochrany osobních údajů", href: "/privacy" }
      ]
    }
  }
};