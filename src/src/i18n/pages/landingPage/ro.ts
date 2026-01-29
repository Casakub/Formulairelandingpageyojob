/**
 * 🇷🇴 TRADUCERI ROMÂNĂ - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const roLandingPage: LandingPageContent = {
  language: 'ro',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Lider în recruitarea europeană - Muncă temporară și contracte permanente în 27 de țări",
    metaDescription: "Acces la peste 500 de agenții de recrutare în 27 de țări europene. Muncă temporară, contracte permanente, detașare lucrători: YOJOB simplifică recrutarea internațională.",
    slug: "/",
    h1: "Lider în recruitarea europeană",
    ogTitle: "YOJOB - Partenerul dumneavoastră pentru recrutare în Europa",
    ogDescription: "Recrutare europeană simplificată: peste 500 de agenții, 27 de țări, toate formalitățile gestionate.",
    altTexts: {
      heroVisual: "Hartă interactivă a Europei care arată rețeaua YOJOB",
      europeMap: "Harta celor 27 de țări europene acoperite de YOJOB",
      logoFooter: "Logo YOJOB - Recrutare europeană",
    },
    aiSummary: "YOJOB este liderul francez în intermedierea de recrutare europeană, cu o rețea de peste 500 de agenții partenere în 27 de țări. Facilităm munca temporară europeană, recrutarea specializată, detașarea lucrătorilor și oferim consultanță în conformitate. Expertiza noastră permite companiilor să angajeze rapid și legal lucrători în toată Europa, cu gestionarea completă a formalităților administrative.",
    faq: [
      {
        question: "Ce este YOJOB?",
        answer: "YOJOB este un intermediar de recrutare europeană care conectează companiile franceze cu o rețea de peste 500 de agenții în 27 de țări europene pentru a facilita munca temporară, recrutarea și detașarea lucrătorilor."
      },
      {
        question: "În ce țări activați?",
        answer: "Acoperim 27 de țări din Uniunea Europeană plus Norvegia, adică o acoperire completă a Europei de Vest, Nord, Sud și Est."
      },
      {
        question: "Ce tipuri de recrutare oferiți?",
        answer: "Oferim muncă temporară europeană, recrutare pe durată determinată/nedeterminată, detașare lucrători și consultanță în conformitate pentru a asigura respectarea legislației."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Acasă",
      services: "Servicii",
      network: "Rețea",
      contact: "Contact"
    },
    cta: "Solicită o ofertă",
    survey: "Sondaj European"
  },

  // Hero Section
  hero: {
    badge: "⭐ Lider în recruitarea europeană",
    title: "Angajați în toată Europa datorită rețelei noastre de peste 500 de agenții partenere",
    subtitle: "Muncă temporară, contracte permanente, detașare: acces la cele mai bune talente europene. Gestionăm toate formalitățile pentru dumneavoastră.",
    benefits: [
      "27 de țări europene acoperite",
      "Peste 500 de agenții certificate",
      "Gestionare administrativă completă",
      "Conformitate garantată"
    ],
    ctaPrimaryLabel: "Obține o ofertă gratuită",
    ctaSecondaryLabel: "Descoperă serviciile noastre",
    stats: {
      agencies: { value: "500+", label: "agenții partenere" },
      countries: { value: "27", label: "țări europene" },
      missions: { value: "2000+", label: "misiuni de succes" }
    },
    floatingCards: {
      since: { label: "Din anul", value: "2014" },
      expertise: { value: "10 ani", label: "De expertiză de top" },
      partners: { label: "Parteneri", value: "Peste 500 de agenții certificate" },
      countries: { value: "27", label: "Țări europene" },
      certified: { value: "500+", label: "Agenții certificate" },
      activeNetwork: "Rețea activă"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Cifrele Noastre Cheie",
    title: "Expertiză recunoscută în Europa",
    items: [
      { value: "10", label: "ani de experiență", icon: "Target" },
      { value: "27", label: "țări acoperite", icon: "Globe" },
      { value: "500", label: "agenții partenere", icon: "Network" },
      { value: "2000", label: "misiuni realizate", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Serviciile Noastre",
    title: "Soluții de recrutare adaptate nevoilor dumneavoastră",
    subtitle: "Fie că căutați lucrători temporari, permanenți sau detașați, avem soluția",
    services: [
      {
        icon: "Users",
        title: "Muncă Temporară Europeană",
        description: "Angajați lucrători temporari calificați în toată Europa. Gestionăm toate formalitățile administrative.",
        linkLabel: "Aflați mai multe",
        href: "/serviciu/munca-temporara-europeana"
      },
      {
        icon: "Target",
        title: "Recrutare Specializată",
        description: "Găsiți cele mai bune talente pentru pozițiile dumneavoastră pe durată determinată/nedeterminată datorită rețelei noastre europene de experți.",
        linkLabel: "Aflați mai multe",
        href: "/serviciu/recrutare-specializata"
      },
      {
        icon: "ShieldCheck",
        title: "Consultanță și Conformitate",
        description: "Asigurați respectarea tuturor reglementărilor europene privind detașarea și mobilitatea.",
        linkLabel: "Aflați mai multe",
        href: "/serviciu/consultanta-conformitate"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Rețea Europeană",
    title: "27 de țări, peste 500 de agenții partenere certificate",
    subtitle: "Punctul nostru forte: o rețea deasă și calificată în toată Europa",
    mapLabel: "agenții partenere",
    waitlist: {
      badge: "🚀 Noutate 2025",
      title: "Marketplace de agenții europene",
      subtitle: "În curând: comparați și contactați direct agențiile din rețeaua noastră",
      features: [
        "✓ Căutare multi-criterii (țară, sector, profesie)",
        "✓ Comparare instantanee a agențiilor",
        "✓ Recenzii clienți verificate",
        "✓ Conexiune directă și securizată"
      ],
      formTitle: "Fiți printre primii!",
      formSubtitle: "Înscrieți-vă pe lista de așteptare pentru acces anticipat",
      emailPlaceholder: "adresa@email.ro",
      ctaLabel: "Alăturați-vă listei de așteptare",
      securityNote: "🔒 Datele dumneavoastră sunt în siguranță și nu vor fi niciodată partajate",
      successMessage: "Mulțumim! Sunteți înscris pe lista de așteptare. Vă vom contacta de îndată ce deschidem."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Cum funcționează",
    title: "Recrutare europeană simplificată în 4 pași",
    subtitle: "Un proces clar și eficient pentru recrutarea dumneavoastră",
    steps: [
      {
        number: "01",
        title: "Descrieți nevoia dumneavoastră",
        description: "Comunicați-ne nevoile dumneavoastră de recrutare: profesie, număr de posturi, durată, calificări necesare.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Activăm rețeaua noastră",
        description: "Agențiile noastre partenere din toată Europa identifică și selectează cele mai bune profiluri disponibile.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Validați candidații",
        description: "Primiți CV-uri preselectate și efectuați interviuri cu candidații care vă interesează.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Primiți echipa dumneavoastră",
        description: "Candidații selectați se alătură echipelor dumneavoastră. Gestionăm toate formalitățile administrative și legale.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Referințe",
    title: "Ne au încredere",
    subtitle: "Descoperiți experiențele clienților noștri",
    testimonials: [
      {
        name: "Andrei Popescu",
        position: "Director HR",
        company: "TechBuild România",
        quote: "Datorită YOJOB am reușit să angajăm 15 zidari polonezi calificați în 3 săptămâni. Serviciu profesional și eficient!",
        rating: 5,
        sector: "Construcții"
      },
      {
        name: "Elena Ionescu",
        position: "Director HR",
        company: "AgroRomânia",
        quote: "Gestionarea administrativă este o adevărată durere de cap pentru recrutarea internațională. YOJOB se ocupă de totul, este o economie de timp uriașă.",
        rating: 5,
        sector: "Agroalimentar"
      },
      {
        name: "Mihai Georgescu",
        position: "Șef de producție",
        company: "AutoParts Europa",
        quote: "Însoțire excelentă! Am găsit tehnicieni specializați în Germania pe care nu i-am fi putut recruta niciodată singuri.",
        rating: 5,
        sector: "Industrie"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Sectoare de Activitate",
    title: "Recrutăm în toate sectoarele",
    subtitle: "Rețeaua noastră acoperă toate profesiile și sectoarele industriale",
    sectors: [
      { icon: "Building2", name: "Construcții și Lucrări Publice", color: "orange" },
      { icon: "Factory", name: "Industrie", color: "blue" },
      { icon: "Tractor", name: "Agricultură", color: "green" },
      { icon: "UtensilsCrossed", name: "Restaurante și Hoteluri", color: "red" },
      { icon: "Heart", name: "Sănătate și Asistență Socială", color: "pink" },
      { icon: "Laptop", name: "Tehnologie și IT", color: "violet" },
      { icon: "Truck", name: "Logistică și Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Comerț și Distribuție", color: "green" },
      { icon: "Briefcase", name: "Servicii pentru afaceri", color: "cyan" },
      { icon: "Wrench", name: "Întreținere și Service", color: "orange" },
      { icon: "Plane", name: "Turism și Timp Liber", color: "blue" },
      { icon: "Ship", name: "Maritim și Portuar", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contactați-ne",
    title: "Gata să recrutați în Europa?",
    subtitle: "Obțineți o ofertă gratuită și personalizată în 24 de ore",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Răspuns rapid",
        description: "Ofertă în 24 de ore lucrătoare"
      },
      {
        icon: "ShieldCheck",
        title: "Fără angajament",
        description: "Gratuit și fără obligații"
      },
      {
        icon: "Users",
        title: "Suport dedicat",
        description: "Un expert la dispoziția dumneavoastră"
      },
      {
        icon: "Globe",
        title: "Acoperire europeană",
        description: "27 de țări accesibile"
      }
    ],
    form: {
      fields: {
        name: { label: "Nume complet", placeholder: "Ion Popescu" },
        email: { label: "E-mail profesional", placeholder: "ion.popescu@companie.ro" },
        phone: { label: "Telefon", placeholder: "+40 712 345 678" },
        company: { label: "Companie", placeholder: "Numele companiei dumneavoastră" },
        contactType: {
          label: "Tip de contact",
          placeholder: "Selectați profilul dumneavoastră",
          options: {
            client: "Sunt client (companie care caută angajați)",
            agency: "Sunt agenție de recrutare",
            interim: "Sunt lucrător temporar",
            other: "Altele"
          }
        },
        needType: { 
          label: "Tip de nevoie", 
          placeholder: "Selectați nevoia dumneavoastră",
          options: [
            "Muncă temporară europeană",
            "Recrutare specializată",
            "Consultanță și Conformitate",
            "Altă nevoie"
          ]
        },
        message: { label: "Descrieți nevoia dumneavoastră", placeholder: "De ex.: Căutare 10 zidari pentru un șantier de 6 luni în zona București..." }
      },
      ctaLabel: "Trimite cererea mea",
      securityNote: "🔒 Datele dumneavoastră sunt protejate și nu vor fi niciodată partajate cu terți",
      successMessage: "Mulțumim! Am primit cererea dumneavoastră și vă vom contacta în 24 de ore."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Partenerul dumneavoastră pentru recrutare în Europa"
    },
    columns: {
      services: {
        title: "Servicii",
        links: [
          { label: "Muncă Temporară Europeană", href: "/serviciu/munca-temporara-europeana" },
          { label: "Recrutare Specializată", href: "/serviciu/recrutare-specializata" },
          { label: "Detașare Lucrători", href: "/serviciu/detasare-lucratori" },
          { label: "Consultanță și Conformitate", href: "/serviciu/consultanta-conformitate" }
        ]
      },
      company: {
        title: "Companie",
        links: [
          { label: "Despre noi", href: "/despre-noi" },
          { label: "Rețeaua noastră", href: "/reteaua-noastra" },
          { label: "Sectoarele noastre", href: "/sectoarele-noastre" },
          { label: "Referințe", href: "/referinte" }
        ]
      },
      contact: {
        title: "Contact",
        address: "Bordeaux, Franța",
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
      copyright: "© 2026 YOJOB. Toate drepturile rezervate.",
      madeWith: "Creat cu ❤️ pentru a facilita recrutarea europeană",
      legalLinks: [
        { label: "Mențiuni legale", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Politica de confidențialitate", href: "/privacy" }
      ]
    }
  }
};