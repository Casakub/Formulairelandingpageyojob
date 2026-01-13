/**
 * 🇱🇹 LIETUVIŲ VERTIMAI - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const ltLandingPage: LandingPageContent = {
  language: 'lt',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Lyderė Europos įdarbinime - Laikinas darbas ir nuolatinės sutartys 27 šalyse",
    metaDescription: "Prieiga prie daugiau nei 500 įdarbinimo agentūrų 27 Europos šalyse. Laikinas darbas, nuolatinės sutartys, darbuotojų komandiravimas: YOJOB supaprastina tarptautinį įdarbinimą.",
    slug: "/",
    h1: "Lyderė Europos įdarbinime",
    ogTitle: "YOJOB - Jūsų partnerė įdarbinimui Europoje",
    ogDescription: "Supaprastintas Europos įdarbinimas: daugiau nei 500 agentūrų, 27 šalys, visos formalybės sutvarkytos.",
    altTexts: {
      heroVisual: "Interaktyvus Europos žemėlapis, rodantis YOJOB tinklą",
      europeMap: "27 Europos šalių, kurias dengia YOJOB, žemėlapis",
      logoFooter: "YOJOB logotipas - Europos įdarbinimas",
    },
    aiSummary: "YOJOB yra prancūzų lyderė Europos įdarbinimo tarpininkavime, turinti daugiau nei 500 partnerių agentūrų tinklą 27 šalyse. Mes palengviname Europos laikiną darbą, specializuotą įdarbinimą, darbuotojų komandiravimą ir teikiame konsultacijas dėl atitikties. Mūsų ekspertinės žinios leidžia įmonėms greitai ir teisėtai įdarbinti darbuotojus visoje Europoje, visiškai tvarkant administracines formalybes.",
    faq: [
      {
        question: "Kas yra YOJOB?",
        answer: "YOJOB yra Europos įdarbinimo tarpininkė, jungianti Prancūzijos įmones su daugiau nei 500 agentūrų tinklu 27 Europos šalyse, kad palengvintų laikiną darbą, įdarbinimą ir darbuotojų komandiravimą."
      },
      {
        question: "Kuriose šalyse jūs veikiate?",
        answer: "Mes dengiame 27 Europos Sąjungos šalis plius Norvegiją, tai yra visišką Vakarų, Šiaurės, Pietų ir Rytų Europos aprėptį."
      },
      {
        question: "Kokius įdarbinimo tipus jūs siūlote?",
        answer: "Mes siūlome Europos laikiną darbą, įdarbinimą su terminuota/neterminuota sutartimi, darbuotojų komandiravimą ir konsultacijas dėl atitikties, kad užtikrintume įstatymų laikymąsi."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Pradžia",
      services: "Paslaugos",
      network: "Tinklas",
      contact: "Kontaktai"
    },
    cta: "Prašyti pasiūlymo",
    survey: "Europos apklausa"
  },

  // Hero Section
  hero: {
    badge: "⭐ Lyderė Europos įdarbinime",
    title: "Įdarbinkite visoje Europoje dėka mūsų daugiau nei 500 partnerių agentūrų tinklo",
    subtitle: "Laikinas darbas, nuolatinės sutartys, komandiravimas: prieiga prie geriausių Europos talentų. Visas formalybes tvarkome už jus.",
    benefits: [
      "27 apimtos Europos šalys",
      "Daugiau nei 500 sertifikuotų agentūrų",
      "Visiškas administracinis valdymas",
      "Garantuota atitiktis"
    ],
    ctaPrimaryLabel: "Gauti nemokamą pasiūlymą",
    ctaSecondaryLabel: "Atraskite mūsų paslaugas",
    stats: {
      agencies: { value: "500+", label: "partnerių agentūros" },
      countries: { value: "27", label: "Europos šalys" },
      missions: { value: "2000+", label: "sėkmingos misijos" }
    },
    floatingCards: {
      since: { label: "Nuo", value: "2014" },
      expertise: { value: "10 metų", label: "Pirmaujančios ekspertinės žinios" },
      partners: { label: "Partneriai", value: "Daugiau nei 500 sertifikuotų agentūrų" },
      countries: { value: "27", label: "Europos šalys" },
      certified: { value: "500+", label: "Sertifikuotos agentūros" },
      activeNetwork: "Aktyvus tinklas"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Mūsų Pagrindiniai Skaičiai",
    title: "Pripažintos ekspertinės žinios Europoje",
    items: [
      { value: "10", label: "metų patirtis", icon: "Target" },
      { value: "27", label: "apimtos šalys", icon: "Globe" },
      { value: "500", label: "partnerių agentūros", icon: "Network" },
      { value: "2000", label: "įvykdytos misijos", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Mūsų Paslaugos",
    title: "Įdarbinimo sprendimai, pritaikyti jūsų poreikiams",
    subtitle: "Nesvarbu, ar ieškote laikinų, nuolatinių ar komandiruotų darbuotojų, mes turime sprendimą",
    services: [
      {
        icon: "Users",
        title: "Europos Laikinas Darbas",
        description: "Įdarbinkite kvalifikuotus laikinuosius darbuotojus visoje Europoje. Visas administracines formalybes tvarkome mes.",
        linkLabel: "Sužinoti daugiau",
        href: "/paslauga/europos-laikinas-darbas"
      },
      {
        icon: "Target",
        title: "Specializuotas Įdarbinimas",
        description: "Raskite geriausius talentus savo pareigybėms su terminuota/neterminuota sutartimi dėka mūsų Europos ekspertų tinklo.",
        linkLabel: "Sužinoti daugiau",
        href: "/paslauga/specializuotas-idarbinimas"
      },
      {
        icon: "ShieldCheck",
        title: "Konsultacijos ir Atitiktis",
        description: "Užtikrinkite visų Europos nuostatų laikymąsi, susijusį su komandiravimais ir mobilumu.",
        linkLabel: "Sužinoti daugiau",
        href: "/paslauga/konsultacijos-atitiktis"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europos Tinklas",
    title: "27 šalys, daugiau nei 500 sertifikuotų partnerių agentūrų",
    subtitle: "Mūsų jėga: tankus ir kvalifikuotas tinklas visoje Europoje",
    mapLabel: "partnerių agentūros",
    waitlist: {
      badge: "🚀 Naujiena 2025",
      title: "Europos agentūrų rinka",
      subtitle: "Netrukus: palyginkite ir susisiekite su agentūromis iš mūsų tinklo tiesiogiai",
      features: [
        "✓ Daugiakritėrė paieška (šalis, sektorius, profesija)",
        "✓ Momentinis agentūrų palyginimas",
        "✓ Patikrinti klientų atsiliepimai",
        "✓ Tiesioginė ir saugi jungtis"
      ],
      formTitle: "Būkite tarp pirmųjų!",
      formSubtitle: "Užsiregistruokite laukimo sąraše ankstyvai prieigai",
      emailPlaceholder: "jusu@pastas.lt",
      ctaLabel: "Prisijungti prie laukimo sąrašo",
      securityNote: "🔒 Jūsų duomenys yra saugūs ir niekada nebus bendrinti",
      successMessage: "Ačiū! Esate užregistruotas laukimo sąraše. Susisieksime su jumis, kai tik atidarysime."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Kaip tai veikia",
    title: "Europos įdarbinimas, supaprastintas per 4 žingsnius",
    subtitle: "Aiškus ir efektyvus procesas jūsų įdarbinimui",
    steps: [
      {
        number: "01",
        title: "Aprašykite savo poreikį",
        description: "Pasidalinkite su mumis savo įdarbinimo poreikiais: profesija, pareigybių skaičius, trukmė, reikalingos kvalifikacijos.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktyvuojame savo tinklą",
        description: "Mūsų partnerių agentūros visoje Europoje identifikuoja ir atrenka geriausius prieinamus profilius.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Patvirtinkite kandidatus",
        description: "Gaunate iš anksto atrinktas gyvenimo aprašymus ir vykdote pokalbius su kandidatais, kurie jus domina.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Pasveikinkite savo komandą",
        description: "Atrinkti kandidatai prisijungia prie jūsų komandų. Tvarkome visas administracines ir teisines formalybes.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Atsiliepimai",
    title: "Jie mumis pasitiki",
    subtitle: "Atraskite mūsų klientų patirtį",
    testimonials: [
      {
        name: "Jonas Petraitis",
        position: "Personalo direktorius",
        company: "TechBuild Lietuva",
        quote: "Dėka YOJOB sugebėjome įdarbinti 15 kvalifikuotų lenkų mūrininkų per 3 savaites. Profesionali ir efektyvi paslauga!",
        rating: 5,
        sector: "Statyba"
      },
      {
        name: "Rasa Kazlauskienė",
        position: "Personalo direktorė",
        company: "AgroLietuva",
        quote: "Administracinis valdymas yra tikra galvos skausmas tarptautiniame įdarbinime. YOJOB pasirūpina viskuo, tai didžiulis laiko sutaupymas.",
        rating: 5,
        sector: "Maisto pramonė"
      },
      {
        name: "Mindaugas Vasiliauskas",
        position: "Gamybos vadovas",
        company: "AutoParts Europa",
        quote: "Puiki pagalba! Radome specializuotus technikus Vokietijoje, kurių patys niekada nebūtume galėję įdarbinti.",
        rating: 5,
        sector: "Pramonė"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Veiklos Sektoriai",
    title: "Įdarbiname visuose sektoriuose",
    subtitle: "Mūsų tinklas apima visas profesijas ir pramonės sektorius",
    sectors: [
      { icon: "Building2", name: "Statyba ir Viešieji Darbai", color: "orange" },
      { icon: "Factory", name: "Pramonė", color: "blue" },
      { icon: "Tractor", name: "Žemės ūkis", color: "green" },
      { icon: "UtensilsCrossed", name: "Maitinimas ir Viešbučiai", color: "red" },
      { icon: "Heart", name: "Sveikatos priežiūra ir Socialinė globa", color: "pink" },
      { icon: "Laptop", name: "Technologijos ir IT", color: "violet" },
      { icon: "Truck", name: "Logistika ir Transportas", color: "blue" },
      { icon: "ShoppingBag", name: "Prekyba ir Platinimas", color: "green" },
      { icon: "Briefcase", name: "Verslo paslaugos", color: "cyan" },
      { icon: "Wrench", name: "Priežiūra ir Aptarnavimas", color: "orange" },
      { icon: "Plane", name: "Turizmas ir Laisvalaikis", color: "blue" },
      { icon: "Ship", name: "Jūrų ir Uostų paslaugos", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Susisiekite su mumis",
    title: "Pasirengę įdarbinti Europoje?",
    subtitle: "Gaukite nemokamą ir individualizuotą pasiūlymą per 24 valandas",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Greitas atsakymas",
        description: "Pasiūlymas per 24 darbo valandas"
      },
      {
        icon: "ShieldCheck",
        title: "Be įsipareigojimų",
        description: "Nemokamai ir be įsipareigojimų"
      },
      {
        icon: "Users",
        title: "Skirta pagalba",
        description: "Ekspertas jūsų žiniai"
      },
      {
        icon: "Globe",
        title: "Europos aprėptis",
        description: "27 prieinamos šalys"
      }
    ],
    form: {
      fields: {
        name: { label: "Pilnas vardas", placeholder: "Jonas Petraitis" },
        email: { label: "Darbo el. paštas", placeholder: "jonas.petraitis@imone.lt" },
        phone: { label: "Telefonas", placeholder: "+370 612 34567" },
        company: { label: "Įmonė", placeholder: "Jūsų įmonės pavadinimas" },
        contactType: {
          label: "Kontakto tipas",
          placeholder: "Pasirinkite savo profilį",
          options: {
            client: "Esu klientas (įmonė, ieškanti darbuotojų)",
            agency: "Esu įdarbinimo agentūra",
            interim: "Esu laikinas darbuotojas",
            other: "Kita"
          }
        },
        needType: { 
          label: "Poreikio tipas", 
          placeholder: "Pasirinkite savo poreikį",
          options: [
            "Europos laikinas darbas",
            "Specializuotas įdarbinimas",
            "Konsultacijos ir Atitiktis",
            "Kitas poreikis"
          ]
        },
        message: { label: "Aprašykite savo poreikį", placeholder: "Pvz.: Ieškome 10 mūrininkų 6 mėnesių statybai Vilniaus regione..." }
      },
      ctaLabel: "Siųsti mano užklausą",
      securityNote: "🔒 Jūsų duomenys yra apsaugoti ir niekada nebus bendrinti su trečiosiomis šalimis",
      successMessage: "Ačiū! Gavome jūsų užklausą ir susisieksime su jumis per 24 valandas."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Jūsų partnerė įdarbinimui Europoje"
    },
    columns: {
      services: {
        title: "Paslaugos",
        links: [
          { label: "Europos Laikinas Darbas", href: "/paslauga/europos-laikinas-darbas" },
          { label: "Specializuotas Įdarbinimas", href: "/paslauga/specializuotas-idarbinimas" },
          { label: "Darbuotojų Komandiravimas", href: "/paslauga/darbuotoju-komandiravimas" },
          { label: "Konsultacijos ir Atitiktis", href: "/paslauga/konsultacijos-atitiktis" }
        ]
      },
      company: {
        title: "Įmonė",
        links: [
          { label: "Apie mus", href: "/apie-mus" },
          { label: "Mūsų tinklas", href: "/musu-tinklas" },
          { label: "Mūsų sektoriai", href: "/musu-sektoriai" },
          { label: "Atsiliepimai", href: "/atsiliepimai" }
        ]
      },
      contact: {
        title: "Kontaktai",
        address: "Bordo, Prancūzija",
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
      copyright: "© 2026 YOJOB. Visos teisės saugomos.",
      madeWith: "Sukurta su ❤️ Europos įdarbinimo palengvinimui",
      legalLinks: [
        { label: "Teisinė informacija", href: "/teisine-informacija" },
        { label: "BS", href: "/cgv" },
        { label: "Privatumo politika", href: "/privatumas" }
      ]
    }
  }
};