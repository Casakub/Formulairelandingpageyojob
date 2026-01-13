/**
 * 🇸🇮 SLOVENŠČINA PREVODI - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const slLandingPage: LandingPageContent = {
  language: 'sl',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Vodilni v evropskem zaposlovanju - Začasno delo in stalne pogodbe v 27 državah",
    metaDescription: "Dostop do več kot 500 agencij za zaposlovanje v 27 evropskih državah. Začasno delo, stalne pogodbe, napotitev delavcev: YOJOB poenostavlja mednarodno zaposlovanje.",
    slug: "/",
    h1: "Vodilni v evropskem zaposlovanju",
    ogTitle: "YOJOB - Vaš partner za zaposlovanje v Evropi",
    ogDescription: "Poenostavljeno evropsko zaposlovanje: več kot 500 agencij, 27 držav, vse formalnosti urejene.",
    altTexts: {
      heroVisual: "Interaktivni zemljevid Evrope, ki prikazuje YOJOB mrežo",
      europeMap: "Zemljevid 27 evropskih držav, ki jih pokriva YOJOB",
      logoFooter: "YOJOB logotip - Evropsko zaposlovanje",
    },
    aiSummary: "YOJOB je francoski vodilni v evropskem posredovanju za zaposlovanje, z mrežo več kot 500 partnerskih agencij v 27 državah. Olajšujemo evropsko začasno delo, specializirano zaposlovanje, napotitev delavcev in nudimo svetovanje o skladnosti. Naša strokovnost omogoča podjetjem, da hitro in zakonito zaposlujejo delavce po vsej Evropi, s popolnim upravljanjem administrativnih formalnosti.",
    faq: [
      {
        question: "Kaj je YOJOB?",
        answer: "YOJOB je evropski posrednik za zaposlovanje, ki povezuje francoska podjetja z mrežo več kot 500 agencij v 27 evropskih državah, da olajša začasno delo, zaposlovanje in napotitev delavcev."
      },
      {
        question: "V katerih državah delujete?",
        answer: "Pokrivamo 27 držav Evropske unije plus Norveško, torej popolno pokritost zahodne, severne, južne in vzhodne Evrope."
      },
      {
        question: "Katere vrste zaposlovanja nudite?",
        answer: "Nudimo evropsko začasno delo, zaposlovanje za določen/nedoločen čas, napotitev delavcev in svetovanje o skladnosti, da zagotovimo spoštovanje zakonodaje."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Domov",
      services: "Storitve",
      network: "Mreža",
      contact: "Kontakt"
    },
    cta: "Zahtevajte ponudbo"
  },

  // Hero Section
  hero: {
    badge: "⭐ Vodilni v evropskem zaposlovanju",
    title: "Zaposlujte po vsej Evropi zahvaljujoč naši mreži več kot 500 partnerskih agencij",
    subtitle: "Začasno delo, stalne pogodbe, napotitev: dostop do najboljših evropskih talentov. Vse formalnosti urejamo za vas.",
    benefits: [
      "27 pokritih evropskih držav",
      "Več kot 500 certificiranih agencij",
      "Popolno administrativno upravljanje",
      "Zagotovljena skladnost"
    ],
    ctaPrimaryLabel: "Pridobite brezplačno ponudbo",
    ctaSecondaryLabel: "Odkrijte naše storitve",
    stats: {
      agencies: { value: "500+", label: "partnerskih agencij" },
      countries: { value: "27", label: "evropskih držav" },
      missions: { value: "2000+", label: "uspešnih misij" }
    },
    floatingCards: {
      since: { label: "Od", value: "2014" },
      expertise: { value: "10 let", label: "Vodilne strokovnosti" },
      partners: { label: "Partnerji", value: "Več kot 500 certificiranih agencij" },
      countries: { value: "27", label: "Evropskih držav" },
      certified: { value: "500+", label: "Certificiranih agencij" },
      activeNetwork: "Aktivna mreža"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Naše Ključne Številke",
    title: "Priznana strokovnost v Evropi",
    items: [
      { value: "10", label: "let izkušenj", icon: "Target" },
      { value: "27", label: "pokritih držav", icon: "Globe" },
      { value: "500", label: "partnerskih agencij", icon: "Network" },
      { value: "2000", label: "izvedenih misij", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Naše Storitve",
    title: "Rešitve za zaposlovanje, prilagojene vašim potrebam",
    subtitle: "Ne glede na to, ali iščete začasne, stalne ali napotene delavce, imamo rešitev",
    services: [
      {
        icon: "Users",
        title: "Evropsko Začasno Delo",
        description: "Zaposlujte kvalificirane začasne delavce po vsej Evropi. Vse administrativne formalnosti urejamo mi.",
        linkLabel: "Izvedi več",
        href: "/storitev/evropsko-zacasno-delo"
      },
      {
        icon: "Target",
        title: "Specializirano Zaposlovanje",
        description: "Poiščite najboljše talente za svoje pozicije za določen/nedoločen čas zahvaljujoč naši evropski mreži strokovnjakov.",
        linkLabel: "Izvedi več",
        href: "/storitev/specializirano-zaposlovanje"
      },
      {
        icon: "ShieldCheck",
        title: "Svetovanje in Skladnost",
        description: "Zagotovite spoštovanje vseh evropskih predpisov v zvezi z napotitvijo in mobilnostjo.",
        linkLabel: "Izvedi več",
        href: "/storitev/svetovanje-skladnost"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Evropska Mreža",
    title: "27 držav, več kot 500 certificiranih partnerskih agencij",
    subtitle: "Naša moč: gosta in kvalificirana mreža po vsej Evropi",
    mapLabel: "partnerskih agencij",
    waitlist: {
      badge: "🚀 Novost 2025",
      title: "Trg evropskih agencij",
      subtitle: "Kmalu: primerjajte in kontaktirajte agencije iz naše mreže neposredno",
      features: [
        "✓ Večkriterijsko iskanje (država, sektor, poklic)",
        "✓ Takojšnja primerjava agencij",
        "✓ Preverjene ocene strank",
        "✓ Neposredna in varna povezava"
      ],
      formTitle: "Bodite med prvimi!",
      formSubtitle: "Prijavite se na seznam čakajočih za zgodnji dostop",
      emailPlaceholder: "vas@email.si",
      ctaLabel: "Pridružite se seznamu čakajočih",
      securityNote: "🔒 Vaši podatki so varni in ne bodo nikoli posredovani",
      successMessage: "Hvala! Prijavljeni ste na seznam čakajočih. Kontaktirali vas bomo takoj, ko odpremo."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Kako deluje",
    title: "Evropsko zaposlovanje, poenostavljeno v 4 korakih",
    subtitle: "Jasen in učinkovit proces za vaše zaposlovanje",
    steps: [
      {
        number: "01",
        title: "Opišite svojo potrebo",
        description: "Delite z nami svoje potrebe po zaposlovanju: poklic, število pozicij, trajanje, potrebne kvalifikacije.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktiviramo našo mrežo",
        description: "Naše partnerske agencije po vsej Evropi identificirajo in izbirajo najboljše razpoložljive profile.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Odobrite kandidate",
        description: "Prejmete predhodno izbrane življenjepise in opravite razgovore s kandidati, ki vas zanimajo.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Pozdravite svojo ekipo",
        description: "Izbrani kandidati se pridružijo vašim ekipam. Urejamo vse administrativne in pravne formalnosti.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Reference",
    title: "Zaupajo nam",
    subtitle: "Odkrijte izkušnje naših strank",
    testimonials: [
      {
        name: "Marko Novak",
        position: "Direktor kadrov",
        company: "TechBuild Slovenija",
        quote: "Zahvaljujoč YOJOB smo uspeli zaposliti 15 kvalificiranih poljskih zidarjev v 3 tednih. Profesionalna in učinkovita storitev!",
        rating: 5,
        sector: "Gradbeništvo"
      },
      {
        name: "Ana Kovač",
        position: "Direktorica kadrov",
        company: "AgroSlovenija",
        quote: "Administrativno upravljanje je prava glavobol pri mednarodnem zaposlovanju. YOJOB skrbi za vse, to je ogromna prihranek časa.",
        rating: 5,
        sector: "Živilska industrija"
      },
      {
        name: "Janez Horvat",
        position: "Vodja proizvodnje",
        company: "AutoParts Europa",
        quote: "Odlična podpora! Našli smo specializirane tehnike v Nemčiji, ki jih sami nikoli ne bi mogli zaposliti.",
        rating: 5,
        sector: "Industrija"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Sektorji Dejavnosti",
    title: "Zaposlujemo v vseh sektorjih",
    subtitle: "Naša mreža pokriva vse poklice in industrijske sektorje",
    sectors: [
      { icon: "Building2", name: "Gradbeništvo in Javna Dela", color: "orange" },
      { icon: "Factory", name: "Industrija", color: "blue" },
      { icon: "Tractor", name: "Kmetijstvo", color: "green" },
      { icon: "UtensilsCrossed", name: "Gostinstvo in Hotelirstvo", color: "red" },
      { icon: "Heart", name: "Zdravstvo in Socialna Skrb", color: "pink" },
      { icon: "Laptop", name: "Tehnologija in IT", color: "violet" },
      { icon: "Truck", name: "Logistika in Prevoz", color: "blue" },
      { icon: "ShoppingBag", name: "Trgovina in Distribucija", color: "green" },
      { icon: "Briefcase", name: "Poslovne storitve", color: "cyan" },
      { icon: "Wrench", name: "Vzdrževanje in Servis", color: "orange" },
      { icon: "Plane", name: "Turizem in Prosti Čas", color: "blue" },
      { icon: "Ship", name: "Pomorski in Pristaniški", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontaktirajte nas",
    title: "Pripravljeni zaposlovati v Evropi?",
    subtitle: "Pridobite brezplačno in personalizirano ponudbo v 24 urah",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Hiter odgovor",
        description: "Ponudba v 24 delovnih urah"
      },
      {
        icon: "ShieldCheck",
        title: "Brez obveznosti",
        description: "Brezplačno in brez obvez"
      },
      {
        icon: "Users",
        title: "Namenjena podpora",
        description: "Strokovnjak na vaši razpolago"
      },
      {
        icon: "Globe",
        title: "Evropska pokritost",
        description: "27 dostopnih držav"
      }
    ],
    form: {
      fields: {
        name: { label: "Polno ime", placeholder: "Marko Novak" },
        email: { label: "Poslovna e-pošta", placeholder: "marko.novak@podjetje.si" },
        phone: { label: "Telefon", placeholder: "+386 31 234 567" },
        company: { label: "Podjetje", placeholder: "Ime vašega podjetja" },
        contactType: {
          label: "Vrsta stika",
          placeholder: "Izberite svoj profil",
          options: {
            client: "Stranka sem (podjetje, ki išče zaposlene)",
            agency: "Agencija za zaposlovanje sem",
            interim: "Začasni delavec sem",
            other: "Drugo"
          }
        },
        needType: { 
          label: "Vrsta potrebe", 
          placeholder: "Izberite svojo potrebo",
          options: [
            "Evropsko začasno delo",
            "Specializirano zaposlovanje",
            "Svetovanje in Skladnost",
            "Druga potreba"
          ]
        },
        message: { label: "Opišite svojo potrebo", placeholder: "Npr.: Iskanje 10 zidarjev za 6-mesečno gradnjo v okolici Ljubljane..." }
      },
      ctaLabel: "Pošljite mojo zahtevo",
      securityNote: "🔒 Vaši podatki so zaščiteni in ne bodo nikoli posredovani tretjim osebam",
      successMessage: "Hvala! Prejeli smo vašo zahtevo in vas bomo kontaktirali v 24 urah."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Vaš partner za zaposlovanje v Evropi"
    },
    columns: {
      services: {
        title: "Storitve",
        links: [
          { label: "Evropsko Začasno Delo", href: "/storitev/evropsko-zacasno-delo" },
          { label: "Specializirano Zaposlovanje", href: "/storitev/specializirano-zaposlovanje" },
          { label: "Napotitev Delavcev", href: "/storitev/napotitev-delavcev" },
          { label: "Svetovanje in Skladnost", href: "/storitev/svetovanje-skladnost" }
        ]
      },
      company: {
        title: "Podjetje",
        links: [
          { label: "O nas", href: "/o-nas" },
          { label: "Naša mreža", href: "/nasa-mreza" },
          { label: "Naši sektorji", href: "/nasi-sektorji" },
          { label: "Reference", href: "/reference" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Francija",
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
      copyright: "© 2025 YOJOB. Vse pravice pridržane.",
      madeWith: "Narejeno z ❤️ za olajšanje evropskega zaposlovanja",
      legalLinks: [
        { label: "Pravno obvestilo", href: "/pravno-obvestilo" },
        { label: "SPS", href: "/cgv" },
        { label: "Politika zasebnosti", href: "/zasebnost" }
      ]
    }
  }
};
