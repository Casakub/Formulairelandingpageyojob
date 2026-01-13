/**
 * 🇸🇰 SLOVENSKÉ PREKLADY - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const skLandingPage: LandingPageContent = {
  language: 'sk',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Líder v európskom nábore - Dočasné zamestnanie a stále zmluvy v 27 krajinách",
    metaDescription: "Prístup k viac ako 500 náborovým agentúram v 27 európskych krajinách. Dočasné zamestnanie, stále zmluvy, vysielanie pracovníkov: YOJOB zjednodušuje medzinárodný nábor.",
    slug: "/",
    h1: "Líder v európskom nábore",
    ogTitle: "YOJOB - Váš partner pre nábor v Európe",
    ogDescription: "Zjednodušený európsky nábor: viac ako 500 agentúr, 27 krajín, všetky formality vybavené.",
    altTexts: {
      heroVisual: "Interaktívna mapa Európy zobrazujúca sieť YOJOB",
      europeMap: "Mapa 27 európskych krajín pokrytých YOJOB",
      logoFooter: "Logo YOJOB - Európsky nábor",
    },
    aiSummary: "YOJOB je francúzsky líder v európskom náborovom sprostredkovaní, so sieťou viac ako 500 partnerských agentúr v 27 krajinách. Uľahčujeme európske dočasné zamestnanie, špecializovaný nábor, vysielanie pracovníkov a ponúkame poradenstvo v oblasti dodržiavania predpisov. Naša odbornosť umožňuje spoločnostiam rýchlo a legálne najímať zamestnancov v celej Európe, s komplexnou správou administratívnych formalít.",
    faq: [
      {
        question: "Čo je YOJOB?",
        answer: "YOJOB je európsky náborový sprostredkovateľ, ktorý spája francúzske spoločnosti so sieťou viac ako 500 agentúr v 27 európskych krajinách za účelom uľahčenia dočasného zamestnania, náboru a vysielania pracovníkov."
      },
      {
        question: "V ktorých krajinách pôsobíte?",
        answer: "Pokrývame 27 krajín Európskej únie plus Nórsko, teda úplné pokrytie západnej, severnej, južnej a východnej Európy."
      },
      {
        question: "Aké typy náboru ponúkate?",
        answer: "Ponúkame európske dočasné zamestnanie, nábor na dobu určitú/neurčitú, vysielanie pracovníkov a poradenstvo v oblasti dodržiavania predpisov na zabezpečenie súladu s legislatívou."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Domov",
      services: "Služby",
      network: "Sieť",
      contact: "Kontakt"
    },
    cta: "Požiadať o ponuku",
    survey: "Európsky prieskum"
  },

  // Hero Section
  hero: {
    badge: "⭐ Líder v európskom nábore",
    title: "Najímajte v celej Európe vďaka našej sieti viac ako 500 partnerských agentúr",
    subtitle: "Dočasné zamestnanie, stále zmluvy, vysielanie: prístup k najlepším európskym talentom. Všetky formality vybavíme za vás.",
    benefits: [
      "27 pokrytých európskych krajín",
      "Viac ako 500 certifikovaných agentúr",
      "Komplexná administratívna správa",
      "Zaručená zhoda s predpismi"
    ],
    ctaPrimaryLabel: "Získať bezplatnú ponuku",
    ctaSecondaryLabel: "Objavte naše služby",
    stats: {
      agencies: { value: "500+", label: "partnerských agentúr" },
      countries: { value: "27", label: "európskych krajín" },
      missions: { value: "2000+", label: "úspešných zákaziek" }
    },
    floatingCards: {
      since: { label: "Od roku", value: "2014" },
      expertise: { value: "10 rokov", label: "Vedúcej odbornosti" },
      partners: { label: "Partneri", value: "Viac ako 500 certifikovaných agentúr" },
      countries: { value: "27", label: "Európskych krajín" },
      certified: { value: "500+", label: "Certifikovaných agentúr" },
      activeNetwork: "Aktívna sieť"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Naše Kľúčové Čísla",
    title: "Uznávaná odbornosť v Európe",
    items: [
      { value: "10", label: "rokov skúseností", icon: "Target" },
      { value: "27", label: "pokrytých krajín", icon: "Globe" },
      { value: "500", label: "partnerských agentúr", icon: "Network" },
      { value: "2000", label: "realizovaných zákaziek", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Naše Služby",
    title: "Náborové riešenia prispôsobené vašim potrebám",
    subtitle: "Či hľadáte dočasných, stálych alebo vyslaných zamestnancov, máme riešenie",
    services: [
      {
        icon: "Users",
        title: "Európske Dočasné Zamestnanie",
        description: "Najímajte kvalifikovaných dočasných pracovníkov v celej Európe. Vybavíme všetky administratívne formality.",
        linkLabel: "Zistiť viac",
        href: "/sluzba/europske-docasne-zamestnanie"
      },
      {
        icon: "Target",
        title: "Špecializovaný Nábor",
        description: "Nájdite najlepšie talenty pre vaše pozície na dobu určitú/neurčitú vďaka našej európskej sieti odborníkov.",
        linkLabel: "Zistiť viac",
        href: "/sluzba/specializovany-nabor"
      },
      {
        icon: "ShieldCheck",
        title: "Poradenstvo a Súlad s Predpismi",
        description: "Zabezpečte dodržiavanie všetkých európskych predpisov týkajúcich sa vysielania a mobility.",
        linkLabel: "Zistiť viac",
        href: "/sluzba/poradenstvi-sulad"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Európska Sieť",
    title: "27 krajín, viac ako 500 certifikovaných partnerských agentúr",
    subtitle: "Naša sila: hustá a kvalifikovaná sieť v celej Európe",
    mapLabel: "partnerských agentúr",
    waitlist: {
      badge: "🚀 Novinka 2025",
      title: "Trhové miesto európskych agentúr",
      subtitle: "Čoskoro: porovnajte a kontaktujte agentúry z našej siete priamo",
      features: [
        "✓ Viacnásobné vyhľadávanie (krajina, sektor, profesia)",
        "✓ Okamžité porovnanie agentúr",
        "✓ Overené recenzie zákazníkov",
        "✓ Priame a bezpečné spojenie"
      ],
      formTitle: "Buďte medzi prvými!",
      formSubtitle: "Zapíšte sa na čakaciu listinu pre skorý prístup",
      emailPlaceholder: "vas@email.sk",
      ctaLabel: "Pripojiť sa k čakacej listine",
      securityNote: "🔒 Vaše údaje sú v bezpečí a nikdy nebudú zdieľané",
      successMessage: "Ďakujeme! Ste zapísaní na čakacej listine. Budeme vás kontaktovať hneď ako otvoríme."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Ako to funguje",
    title: "Európsky nábor zjednodušený v 4 krokoch",
    subtitle: "Jasný a efektívny proces pre váš nábor",
    steps: [
      {
        number: "01",
        title: "Popíšte svoju potrebu",
        description: "Zdieľajte s nami vaše náborové potreby: profesia, počet pozícií, dĺžka trvania, požadované kvalifikácie.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktivujeme našu síť",
        description: "Naše partnerské agentúry v celej Európe identifikujú a vyberajú najlepšie dostupné profily.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Schválite kandidátov",
        description: "Obdržíte predbežne vybrané životopisy a vykonáte pohovory s kandidátmi, ktorí vás zaujímajú.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Privítajte svoj tím",
        description: "Vybraní kandidáti sa pripoja k vašim tímom. Vybavíme všetky administratívne a právne formality.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Referencie",
    title: "Dôverujú nám",
    subtitle: "Objavte skúsenosti našich zákazníkov",
    testimonials: [
      {
        name: "Peter Horváth",
        position: "Riaditeľ HR",
        company: "TechBuild Slovensko",
        quote: "Vďaka YOJOB sme dokázali najať 15 kvalifikovaných poľských murárskych pracovníkov za 3 týždne. Profesionálna a efektívna služba!",
        rating: 5,
        sector: "Stavebníctvo"
      },
      {
        name: "Lucia Kováčová",
        position: "Riaditeľka HR",
        company: "AgroSlovensko",
        quote: "Administratívna správa je skutočná bolesť hlavy pri medzinárodnom nábore. YOJOB sa postará o všetko, je to obrovská úspora času.",
        rating: 5,
        sector: "Potravinárstvo"
      },
      {
        name: "Martin Varga",
        position: "Vedúci výroby",
        company: "AutoParts Europa",
        quote: "Vynikajúci sprievod! Našli sme špecializovaných technikov v Nemecku, ktorých by sme sami nikdy nedokázali najať.",
        rating: 5,
        sector: "Priemysel"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Odvetvia činnosti",
    title: "Najímame vo všetkých odvetviach",
    subtitle: "Naša síť pokrýva všetky profesie a priemyselné odvetvia",
    sectors: [
      { icon: "Building2", name: "Stavebníctvo a Verejné Práce", color: "orange" },
      { icon: "Factory", name: "Priemysel", color: "blue" },
      { icon: "Tractor", name: "Poľnohospodárstvo", color: "green" },
      { icon: "UtensilsCrossed", name: "Stravovanie a Pohostinstvo", color: "red" },
      { icon: "Heart", name: "Zdravotníctvo a Sociálna Starostlivosť", color: "pink" },
      { icon: "Laptop", name: "Technológie a IT", color: "violet" },
      { icon: "Truck", name: "Logistika a Doprava", color: "blue" },
      { icon: "ShoppingBag", name: "Obchod a Distribúcia", color: "green" },
      { icon: "Briefcase", name: "Obchodné služby", color: "cyan" },
      { icon: "Wrench", name: "Údržba a Servis", color: "orange" },
      { icon: "Plane", name: "Cestovný Ruch a Voľný Čas", color: "blue" },
      { icon: "Ship", name: "Námorný a Prístavný", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontaktujte nás",
    title: "Pripravení najímať v Európe?",
    subtitle: "Získajte bezplatnú a personalizovanú ponuku do 24 hodín",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Rýchla odpoveď",
        description: "Ponuka do 24 pracovných hodín"
      },
      {
        icon: "ShieldCheck",
        title: "Bez záväzkov",
        description: "Zadarmo a bez povinností"
      },
      {
        icon: "Users",
        title: "Vyhradená podpora",
        description: "Odborník k vašej dispozícii"
      },
      {
        icon: "Globe",
        title: "Európske pokrytie",
        description: "27 prístupných krajín"
      }
    ],
    form: {
      fields: {
        name: { label: "Celé meno", placeholder: "Ján Novák" },
        email: { label: "Firemný e-mail", placeholder: "jan.novak@firma.sk" },
        phone: { label: "Telefón", placeholder: "+421 912 345 678" },
        company: { label: "Spoločnosť", placeholder: "Názov vašej spoločnosti" },
        contactType: {
          label: "Typ kontaktu",
          placeholder: "Vyberte svoj profil",
          options: {
            client: "Som zákazník (spoločnosť hľadajúca zamestnancov)",
            agency: "Som náborová agentúra",
            interim: "Som dočasný pracovník",
            other: "Iné"
          }
        },
        needType: { 
          label: "Typ potreby", 
          placeholder: "Vyberte svoju potrebu",
          options: [
            "Európske dočasné zamestnanie",
            "Špecializovaný nábor",
            "Poradenstvo a Súlad s predpismi",
            "Iná potreba"
          ]
        },
        message: { label: "Popíšte svoju potrebu", placeholder: "Napr.: Hľadanie 10 murárskych pracovníkov na 6-mesačnú stavbu v oblasti Bratislavy..." }
      },
      ctaLabel: "Odoslať moju žiadosť",
      securityNote: "🔒 Vaše údaje sú chránené a nikdy nebudú zdieľané s tretími stranami",
      successMessage: "Ďakujeme! Obdržali sme vašu žiadosť a budeme vás kontaktovať do 24 hodín."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Váš partner pre nábor v Európe"
    },
    columns: {
      services: {
        title: "Služby",
        links: [
          { label: "Európske Dočasné Zamestnanie", href: "/sluzba/europske-docasne-zamestnanie" },
          { label: "Špecializovaný Nábor", href: "/sluzba/specializovany-nabor" },
          { label: "Vysielanie Pracovníkov", href: "/sluzba/vysilanie-pracovnikov" },
          { label: "Poradenstvo a Súlad s predpismi", href: "/sluzba/poradenstvi-sulad" }
        ]
      },
      company: {
        title: "Spoločnosť",
        links: [
          { label: "O nás", href: "/o-nas" },
          { label: "Naša síť", href: "/nasa-siet" },
          { label: "Naše odvetvia", href: "/nase-odvetvia" },
          { label: "Referencie", href: "/referencie" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Francúzsko",
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
      copyright: "© 2026 YOJOB. Všetky práva vyhradené.",
      madeWith: "Vytvorené s ❤️ pre uľahčenie európskeho náboru",
      legalLinks: [
        { label: "Právne upozornenie", href: "/pravne-upozornenie" },
        { label: "VOP", href: "/cgv" },
        { label: "Zásady ochrany osobných údajov", href: "/sukromie" }
      ]
    }
  }
};
