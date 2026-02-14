/**
 * 🇭🇺 MAGYAR FORDÍTÁSOK - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const huLandingPage: LandingPageContent = {
  language: 'hu',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Vezető az európai toborzásban - Kölcsönzött és állandó munkaszerződések 27 országban",
    metaDescription: "Hozzáférés több mint 500 toborzó ügynökséghez 27 európai országban. Kölcsönzött munka, állandó szerződések, munkavállalók kiküldetése: a YOJOB egyszerűsíti a nemzetközi toborzást.",
    slug: "/",
    h1: "Vezető az európai toborzásban",
    ogTitle: "YOJOB - Az Ön partnere az európai toborzásban",
    ogDescription: "Egyszerűsített európai toborzás: több mint 500 ügynökség, 27 ország, minden formalitás elvégezve.",
    altTexts: {
      heroVisual: "Interaktív európai térkép, amely a YOJOB hálózatát mutatja",
      europeMap: "A YOJOB által lefedett 27 európai ország térképe",
      logoFooter: "YOJOB logó - Európai toborzás",
    },
    aiSummary: "A YOJOB francia vezető az európai toborzási közvetítésben, több mint 500 partneri ügynökség hálózatával 27 országban. Megkönnyítjük az európai kölcsönzött munkát, a szakosodott toborzást, a munkavállalók kiküldetését, és tanácsadást nyújtunk a megfelelőség terén. Szakértelmünk lehetővé teszi a vállalatok számára, hogy gyorsan és legálisan alkalmazzanak munkavállalókat egész Európában, a teljes adminisztratív formalitások kezelésével.",
    faq: [
      {
        question: "Mi az a YOJOB?",
        answer: "A YOJOB egy európai toborzási közvetítő, amely összeköti a francia vállalatokat több mint 500 ügynökség hálózatával 27 európai országban a kölcsönzött munka, toborzás és munkavállalók kiküldetésének megkönnyítése érdekében."
      },
      {
        question: "Mely országokban működnek?",
        answer: "Lefedünk 27 Európai Uniós országot plusz Norvégiát, vagyis teljes lefedettséget biztosítunk Nyugat-, Észak-, Dél- és Kelet-Európában."
      },
      {
        question: "Milyen típusú toborzást kínálnak?",
        answer: "Európai kölcsönzött munkát, határozott/határozatlan idejű toborzást, munkavállalók kiküldetését és megfelelőségi tanácsadást kínálunk a jogszabályoknak való megfelelés biztosítása érdekében."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Kezdőlap",
      services: "Szolgáltatások",
      network: "Hálózat",
      blog: "Blog",
      contact: "Kapcsolat"
    },
    cta: "Ajánlatkérés",
    survey: "Európai Felmérés"
  },

  // Hero Section
  hero: {
    badge: "⭐ Vezető az európai toborzásban",
    title: "Alkalmazzon egész Európában több mint 500 partneri ügynökségünk hálózatának köszönhetően",
    subtitle: "Kölcsönzött munka, állandó szerződések, kiküldetés: hozzáférés a legjobb európai tehetségekhez. Minden formalitást elvégzünk Önnek.",
    benefits: [
      "27 lefedett európai ország",
      "Több mint 500 tanúsított ügynökség",
      "Teljes adminisztratív kezelés",
      "Garantált megfelelőség"
    ],
    ctaPrimaryLabel: "Ingyenes ajánlat kérése",
    ctaSecondaryLabel: "Fedezze fel szolgáltatásainkat",
    stats: {
      agencies: { value: "500+", label: "partneri ügynökség" },
      countries: { value: "27", label: "európai ország" },
      missions: { value: "2000+", label: "sikeres megbízás" }
    },
    floatingCards: {
      since: { label: "Alapítva", value: "2014" },
      expertise: { value: "10 év", label: "Vezető szakértelem" },
      partners: { label: "Partnerek", value: "Több mint 500 tanúsított ügynökség" },
      countries: { value: "27", label: "Európai ország" },
      certified: { value: "500+", label: "Tanúsított ügynökség" },
      activeNetwork: "Aktív hálózat"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Legfontosabb Számok",
    title: "Elismert szakértelem Európában",
    items: [
      { value: "10", label: "év tapasztalat", icon: "Target" },
      { value: "27", label: "lefedett ország", icon: "Globe" },
      { value: "500", label: "partneri ügynökség", icon: "Network" },
      { value: "2000", label: "megvalósított megbízás", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Szolgáltatásaink",
    title: "Az Ön igényeihez igazított toborzási megoldások",
    subtitle: "Akár ideiglenes, állandó vagy kiküldött munkavállalókat keres, van megoldásunk",
    services: [
      {
        icon: "Users",
        title: "Európai Kölcsönzött Munka",
        description: "Alkalmazzon képzett ideiglenes munkavállalókat egész Európában. Elvégezzük az összes adminisztratív formalitást.",
        linkLabel: "További információ",
        href: "/szolgaltatas/europai-kolcsonzott-munka"
      },
      {
        icon: "Target",
        title: "Szakosodott Toborzás",
        description: "Találja meg a legjobb tehetségeket határozott/határozatlan idejű pozícióira európai szakértői hálózatunk segítségével.",
        linkLabel: "További információ",
        href: "/szolgaltatas/szakosodott-toborzas"
      },
      {
        icon: "ShieldCheck",
        title: "Tanácsadás és Megfelelőség",
        description: "Biztosítsa az összes európai előírásnak való megfelelést a kiküldetéssel és mobilitással kapcsolatban.",
        linkLabel: "További információ",
        href: "/szolgaltatas/tanacsadas-megfelelos"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Európai Hálózat",
    title: "27 ország, több mint 500 tanúsított partneri ügynökség",
    subtitle: "Erősségünk: sűrű és képzett hálózat egész Európában",
    mapLabel: "partneri ügynökség",
    waitlist: {
      badge: "🚀 Újdonság 2025",
      title: "Európai ügynökségek piactere",
      subtitle: "Hamarosan: hasonlítsa össze és lépjen kapcsolatba hálózatunkból közvetlenül az ügynökségekkel",
      features: [
        "✓ Többszempontú keresés (ország, szektor, szakma)",
        "✓ Azonnali ügynökség-összehasonlítás",
        "✓ Ellenőrzött ügyfélvélemények",
        "✓ Közvetlen és biztonságos kapcsolat"
      ],
      formTitle: "Legyen az elsők között!",
      formSubtitle: "Iratkozzon fel a várólistára a korai hozzáférésért",
      emailPlaceholder: "az@email.hu",
      ctaLabel: "Csatlakozás a várólistához",
      securityNote: "🔒 Adatai biztonságban vannak és soha nem kerülnek megosztásra",
      successMessage: "Köszönjük! Feliratkozott a várólistára. Felvesszük Önnel a kapcsolatot, amint megnyitunk."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Hogyan működik",
    title: "Európai toborzás egyszerűsítve 4 lépésben",
    subtitle: "Világos és hatékony folyamat a toborzásához",
    steps: [
      {
        number: "01",
        title: "Írja le igényét",
        description: "Ossza meg velünk toborzási igényeit: szakma, pozíciók száma, időtartam, szükséges képesítések.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktiváljuk hálózatunkat",
        description: "Partneri ügynökségeink egész Európában azonosítják és válogatják a legjobb elérhető profilokat.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Hagyja jóvá a jelölteket",
        description: "Előválogatott önéletrajzokat kap, és interjút készít az Önt érdeklő jelöltekkel.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Üdvözölje csapatát",
        description: "A kiválasztott jelöltek csatlakoznak csapataihoz. Elvégezzük az összes adminisztratív és jogi formalitást.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Referenciák",
    title: "Megbíznak bennünk",
    subtitle: "Fedezze fel ügyfeleink tapasztalatait",
    testimonials: [
      {
        name: "Nagy Péter",
        position: "HR igazgató",
        company: "TechBuild Magyarország",
        quote: "A YOJOB-nak köszönhetően 15 képzett lengyel kőművest tudtunk alkalmazni 3 hét alatt. Professzionális és hatékony szolgáltatás!",
        rating: 5,
        sector: "Építőipar"
      },
      {
        name: "Kovács Katalin",
        position: "HR igazgató",
        company: "AgroMagyarország",
        quote: "Az adminisztratív kezelés igazi fejfájás a nemzetközi toborzásnál. A YOJOB mindenről gondoskodik, óriási időmegtakarítás.",
        rating: 5,
        sector: "Élelmiszeripari"
      },
      {
        name: "Tóth István",
        position: "Gyártási vezető",
        company: "AutoParts Europa",
        quote: "Kiváló kísérés! Szakosodott technikusokat találtunk Németországban, akiket egyedül soha nem tudtunk volna alkalmazni.",
        rating: 5,
        sector: "Ipar"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Tevékenységi Ágazatok",
    title: "Alkalmazunk minden ágazatban",
    subtitle: "Hálózatunk minden szakmát és ipari ágazatot lefed",
    sectors: [
      { icon: "Building2", name: "Építőipar és Közmunkák", color: "orange" },
      { icon: "Factory", name: "Ipar", color: "blue" },
      { icon: "Tractor", name: "Mezőgazdaság", color: "green" },
      { icon: "UtensilsCrossed", name: "Vendéglátás és Szállodaipar", color: "red" },
      { icon: "Heart", name: "Egészségügy és Szociális Gondozás", color: "pink" },
      { icon: "Laptop", name: "Technológia és IT", color: "violet" },
      { icon: "Truck", name: "Logisztika és Szállítás", color: "blue" },
      { icon: "ShoppingBag", name: "Kereskedelem és Forgalmazás", color: "green" },
      { icon: "Briefcase", name: "Üzleti szolgáltatások", color: "cyan" },
      { icon: "Wrench", name: "Karbantartás és Szerviz", color: "orange" },
      { icon: "Plane", name: "Turizmus és Szabadidő", color: "blue" },
      { icon: "Ship", name: "Tengeri és Kikötői", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Lépjen kapcsolatba velünk",
    title: "Készen áll az európai alkalmazásra?",
    subtitle: "Kapjon ingyenes és személyre szabott ajánlatot 24 órán belül",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Gyors válasz",
        description: "Ajánlat 24 munkaidő órán belül"
      },
      {
        icon: "ShieldCheck",
        title: "Kötelezettség nélkül",
        description: "Ingyenes és kötelezettségek nélkül"
      },
      {
        icon: "Users",
        title: "Kijelölt támogatás",
        description: "Szakértő az Ön rendelkezésére"
      },
      {
        icon: "Globe",
        title: "Európai lefedettség",
        description: "27 elérhető ország"
      }
    ],
    form: {
      fields: {
        name: { label: "Teljes név", placeholder: "Nagy János" },
        email: { label: "Vállalati e-mail", placeholder: "nagy.janos@ceg.hu" },
        phone: { label: "Telefon", placeholder: "+36 20 123 4567" },
        company: { label: "Vállalat", placeholder: "Vállalata neve" },
        contactType: {
          label: "Kapcsolat típusa",
          placeholder: "Válassza ki profilját",
          options: {
            client: "Ügyfél vagyok (munkavállalókat kereső vállalat)",
            agency: "Toborzó ügynökség vagyok",
            interim: "Ideiglenes munkavállaló vagyok",
            other: "Egyéb"
          }
        },
        needType: { 
          label: "Igény típusa", 
          placeholder: "Válassza ki igényét",
          options: [
            "Európai kölcsönzött munka",
            "Szakosodott toborzás",
            "Tanácsadás és Megfelelőség",
            "Egyéb igény"
          ]
        },
        message: { label: "Írja le igényét", placeholder: "Pl.: 10 kőműves keresése 6 hónapos építkezéshez Budapest környékén..." }
      },
      ctaLabel: "Kérés elküldése",
      securityNote: "🔒 Adatai védettek és soha nem kerülnek megosztásra harmadik felekkel",
      successMessage: "Köszönjük! Megkaptuk kérését és 24 órán belül felvesszük Önnel a kapcsolatot."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Az Ön partnere az európai toborzásban"
    },
    columns: {
      services: {
        title: "Szolgáltatások",
        links: [
          { label: "Európai Kölcsönzött Munka", href: "/szolgaltatas/europai-kolcsonzott-munka" },
          { label: "Szakosodott Toborzás", href: "/szolgaltatas/szakosodott-toborzas" },
          { label: "Munkavállalók Kiküldetése", href: "/szolgaltatas/munkavallalok-kikuldetes" },
          { label: "Tanácsadás és Megfelelőség", href: "/szolgaltatas/tanacsadas-megfelelos" }
        ]
      },
      company: {
        title: "Vállalat",
        links: [
          { label: "Rólunk", href: "/rolunk" },
          { label: "Hálózatunk", href: "/halozatunk" },
          { label: "Ágazataink", href: "/agazataink" },
          { label: "Referenciák", href: "/referenciak" }
        ]
      },
      contact: {
        title: "Kapcsolat",
        address: "Bordeaux, Franciaország",
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
      copyright: "© 2026 YOJOB. Minden jog fenntartva.",
      madeWith: "❤️-tel készült az európai toborzás megkönnyítésére",
      legalLinks: [
        { label: "Jogi nyilatkozat", href: "/legal" },
        { label: "ÁSZF", href: "/cgv" },
        { label: "Adatvédelmi irányelvek", href: "/privacy" }
      ]
    }
  }
};