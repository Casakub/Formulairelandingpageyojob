/**
 * 🇭🇷 HRVATSKI PRIJEVODI - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const hrLandingPage: LandingPageContent = {
  language: 'hr',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Lider u europskom zapošljavanju - Privremeni rad i stalni ugovori u 27 zemalja",
    metaDescription: "Pristup s više od 500 agencija za zapošljavanje u 27 europskih zemalja. Privremeni rad, stalni ugovori, upućivanje radnika: YOJOB pojednostavljuje međunarodno zapošljavanje.",
    slug: "/",
    h1: "Lider u europskom zapošljavanju",
    ogTitle: "YOJOB - Vaš partner za zapošljavanje u Europi",
    ogDescription: "Pojednostavljeno europsko zapošljavanje: više od 500 agencija, 27 zemalja, sve formalnosti riješene.",
    altTexts: {
      heroVisual: "Interaktivna karta Europe koja prikazuje YOJOB mrežu",
      europeMap: "Karta 27 europskih zemalja koje pokriva YOJOB",
      logoFooter: "YOJOB logo - Europsko zapošljavanje",
    },
    aiSummary: "YOJOB je francuski lider u europskom posredovanju za zapošljavanje, s mrežom od više od 500 partnerskih agencija u 27 zemalja. Olakšavamo europski privremeni rad, specijalizirano zapošljavanje, upućivanje radnika i nudimo savjetovanje o usklađenosti. Naša stručnost omogućuje tvrtkama da brzo i legalno zapošljavaju radnike širom Europe, s kompletnim upravljanjem administrativnim formalnostima.",
    faq: [
      {
        question: "Što je YOJOB?",
        answer: "YOJOB je europski posrednik za zapošljavanje koji povezuje francuske tvrtke s mrežom od više od 500 agencija u 27 europskih zemalja kako bi olakšao privremeni rad, zapošljavanje i upućivanje radnika."
      },
      {
        question: "U kojim zemljama djelujete?",
        answer: "Pokrivamo 27 zemalja Europske unije plus Norvešku, odnosno potpuno pokrivanje zapadne, sjeverne, južne i istočne Europe."
      },
      {
        question: "Koje vrste zapošljavanja nudite?",
        answer: "Nudimo europski privremeni rad, zapošljavanje na određeno/neodređeno vrijeme, upućivanje radnika i savjetovanje o usklađenosti kako bismo osigurali poštivanje zakonodavstva."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Početna",
      services: "Usluge",
      network: "Mreža",
      blog: "Blog",
      contact: "Kontakt"
    },
    cta: "Zatražite ponudu",
    survey: "Europska anketa"
  },

  // Hero Section
  hero: {
    badge: "⭐ Lider u europskom zapošljavanju",
    title: "Zapošljavajte diljem Europe zahvaljujući našoj mreži od više od 500 partnerskih agencija",
    subtitle: "Privremeni rad, stalni ugovori, upućivanje: pristup najboljim europskim talentima. Sve formalnosti rješavamo za vas.",
    benefits: [
      "27 pokrivenih europskih zemalja",
      "Više od 500 certificiranih agencija",
      "Potpuno administrativno upravljanje",
      "Zajamčena usklađenost"
    ],
    ctaPrimaryLabel: "Dobijte besplatnu ponudu",
    ctaSecondaryLabel: "Otkrijte naše usluge",
    stats: {
      agencies: { value: "500+", label: "partnerskih agencija" },
      countries: { value: "27", label: "europskih zemalja" },
      missions: { value: "2000+", label: "uspješnih misija" }
    },
    floatingCards: {
      since: { label: "Od", value: "2014" },
      expertise: { value: "10 godina", label: "Vodeće stručnosti" },
      partners: { label: "Partneri", value: "Više od 500 certificiranih agencija" },
      countries: { value: "27", label: "Europskih zemalja" },
      certified: { value: "500+", label: "Certificiranih agencija" },
      activeNetwork: "Aktivna mreža"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Naši Ključni Brojevi",
    title: "Priznata stručnost u Europi",
    items: [
      { value: "10", label: "godina iskustva", icon: "Target" },
      { value: "27", label: "pokrivenih zemalja", icon: "Globe" },
      { value: "500", label: "partnerskih agencija", icon: "Network" },
      { value: "2000", label: "realiziranih misija", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Naše Usluge",
    title: "Rješenja za zapošljavanje prilagođena vašim potrebama",
    subtitle: "Bilo da tražite privremene, stalne ili upućene radnike, imamo rješenje",
    services: [
      {
        icon: "Users",
        title: "Europski Privremeni Rad",
        description: "Zapošljavajte kvalificirane privremene radnike diljem Europe. Rješavamo sve administrativne formalnosti.",
        linkLabel: "Saznajte više",
        href: "/usluga/europski-privremeni-rad"
      },
      {
        icon: "Target",
        title: "Specijalizirano Zapošljavanje",
        description: "Pronađite najbolje talente za svoje pozicije na određeno/neodređeno vrijeme zahvaljujući našoj europskoj mreži stručnjaka.",
        linkLabel: "Saznajte više",
        href: "/usluga/specijalizirano-zaposljavanje"
      },
      {
        icon: "ShieldCheck",
        title: "Savjetovanje i Usklađenost",
        description: "Osigurajte poštivanje svih europskih propisa koji se odnose na upućivanje i mobilnost.",
        linkLabel: "Saznajte više",
        href: "/usluga/savjetovanje-uskladjenost"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europska Mreža",
    title: "27 zemalja, više od 500 certificiranih partnerskih agencija",
    subtitle: "Naša snaga: gusta i kvalificirana mreža diljem Europe",
    mapLabel: "partnerskih agencija",
    waitlist: {
      badge: "🚀 Novost 2025",
      title: "Tržište europskih agencija",
      subtitle: "Uskoro: usporedite i kontaktirajte agencije iz naše mreže izravno",
      features: [
        "✓ Višekriterijsko pretraživanje (zemlja, sektor, zanimanje)",
        "✓ Trenutna usporedba agencija",
        "✓ Provjerene recenzije klijenata",
        "✓ Izravna i sigurna veza"
      ],
      formTitle: "Budite među prvima!",
      formSubtitle: "Prijavite se na popis čekanja za rani pristup",
      emailPlaceholder: "vas@email.hr",
      ctaLabel: "Pridružite se popisu čekanja",
      securityNote: "🔒 Vaši podaci su sigurni i nikada neće biti dijeljeni",
      successMessage: "Hvala! Prijavljeni ste na popis čekanja. Kontaktirat ćemo vas čim otvorimo."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Kako funkcionira",
    title: "Europsko zapošljavanje pojednostavljeno u 4 koraka",
    subtitle: "Jasan i učinkovit proces za vaše zapošljavanje",
    steps: [
      {
        number: "01",
        title: "Opišite svoju potrebu",
        description: "Podijelite s nama svoje potrebe za zapošljavanjem: zanimanje, broj pozicija, trajanje, potrebne kvalifikacije.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktiviramo našu mrežu",
        description: "Naše partnerske agencije diljem Europe identificiraju i biraju najbolje dostupne profile.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Odobrite kandidate",
        description: "Primate predbilježene životopise i provodite intervjue s kandidatima koji vas zanimaju.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Dočekajte svoj tim",
        description: "Odabrani kandidati pridružuju se vašim timovima. Rješavamo sve administrativne i pravne formalnosti.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Reference",
    title: "Vjeruju nam",
    subtitle: "Otkrijte iskustva naših klijenata",
    testimonials: [
      {
        name: "Marko Horvat",
        position: "Direktor HR-a",
        company: "TechBuild Hrvatska",
        quote: "Zahvaljujući YOJOB-u uspjeli smo zaposliti 15 kvalificiranih poljskih zidara za 3 tjedna. Profesionalna i učinkovita usluga!",
        rating: 5,
        sector: "Građevinarstvo"
      },
      {
        name: "Ana Kovačević",
        position: "Direktorica HR-a",
        company: "AgroHrvatska",
        quote: "Administrativno upravljanje je prava glavobolja kod međunarodnog zapošljavanja. YOJOB se brine o svemu, to je ogromna ušteda vremena.",
        rating: 5,
        sector: "Prehrambena industrija"
      },
      {
        name: "Ivan Novak",
        position: "Voditelj proizvodnje",
        company: "AutoParts Europa",
        quote: "Izvrsna podrška! Pronašli smo specijalizirane tehničare u Njemačkoj koje sami nikada ne bismo mogli zaposliti.",
        rating: 5,
        sector: "Industrija"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Sektori Djelatnosti",
    title: "Zapošljavamo u svim sektorima",
    subtitle: "Naša mreža pokriva sva zanimanja i industrijske sektore",
    sectors: [
      { icon: "Building2", name: "Građevinarstvo i Javni Radovi", color: "orange" },
      { icon: "Factory", name: "Industrija", color: "blue" },
      { icon: "Tractor", name: "Poljoprivreda", color: "green" },
      { icon: "UtensilsCrossed", name: "Ugostiteljstvo i Hotelijerstvo", color: "red" },
      { icon: "Heart", name: "Zdravstvo i Socijalna Skrb", color: "pink" },
      { icon: "Laptop", name: "Tehnologija i IT", color: "violet" },
      { icon: "Truck", name: "Logistika i Prijevoz", color: "blue" },
      { icon: "ShoppingBag", name: "Trgovina i Distribucija", color: "green" },
      { icon: "Briefcase", name: "Poslovne usluge", color: "cyan" },
      { icon: "Wrench", name: "Održavanje i Servis", color: "orange" },
      { icon: "Plane", name: "Turizam i Slobodno Vrijeme", color: "blue" },
      { icon: "Ship", name: "Pomorski i Lučki", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontaktirajte nas",
    title: "Spremni zapošljavati u Europi?",
    subtitle: "Dobijte besplatnu i personaliziranu ponudu u roku od 24 sata",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Brz odgovor",
        description: "Ponuda u roku od 24 radna sata"
      },
      {
        icon: "ShieldCheck",
        title: "Bez obveza",
        description: "Besplatno i bez obaveza"
      },
      {
        icon: "Users",
        title: "Posvećena podrška",
        description: "Stručnjak na vašoj raspolaganju"
      },
      {
        icon: "Globe",
        title: "Europska pokrivenost",
        description: "27 dostupnih zemalja"
      }
    ],
    form: {
      fields: {
        name: { label: "Puno ime", placeholder: "Marko Horvat" },
        email: { label: "Poslovna e-pošta", placeholder: "marko.horvat@tvrtka.hr" },
        phone: { label: "Telefon", placeholder: "+385 91 234 5678" },
        company: { label: "Tvrtka", placeholder: "Naziv vaše tvrtke" },
        contactType: {
          label: "Vrsta kontakta",
          placeholder: "Odaberite svoj profil",
          options: {
            client: "Klijent sam (tvrtka koja traži zaposlenike)",
            agency: "Agencija za zapošljavanje sam",
            interim: "Privremeni radnik sam",
            other: "Ostalo"
          }
        },
        needType: { 
          label: "Vrsta potrebe", 
          placeholder: "Odaberite svoju potrebu",
          options: [
            "Europski privremeni rad",
            "Specijalizirano zapošljavanje",
            "Savjetovanje i Usklađenost",
            "Druga potreba"
          ]
        },
        message: { label: "Opišite svoju potrebu", placeholder: "Npr.: Traženje 10 zidara za 6-mjesečnu gradnju u području Zagreba..." }
      },
      ctaLabel: "Pošaljite moj upit",
      securityNote: "🔒 Vaši podaci su zaštićeni i nikada neće biti dijeljeni s trećim stranama",
      successMessage: "Hvala! Primili smo vaš upit i kontaktirat ćemo vas u roku od 24 sata."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Vaš partner za zapošljavanje u Europi"
    },
    columns: {
      services: {
        title: "Usluge",
        links: [
          { label: "Europski Privremeni Rad", href: "/usluga/europski-privremeni-rad" },
          { label: "Specijalizirano Zapošljavanje", href: "/usluga/specijalizirano-zaposljavanje" },
          { label: "Upućivanje Radnika", href: "/usluga/upucivanje-radnika" },
          { label: "Savjetovanje i Usklađenost", href: "/usluga/savjetovanje-uskladjenost" }
        ]
      },
      company: {
        title: "Tvrtka",
        links: [
          { label: "O nama", href: "/o-nama" },
          { label: "Naša mreža", href: "/nasa-mreza" },
          { label: "Naši sektori", href: "/nasi-sektori" },
          { label: "Reference", href: "/reference" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Francuska",
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
      copyright: "© 2026 YOJOB. Sva prava pridržana.",
      madeWith: "Izrađeno s ❤️ kako bi se olakšalo europsko zapošljavanje",
      legalLinks: [
        { label: "Pravne napomene", href: "/legal" },
        { label: "OUP", href: "/cgv" },
        { label: "Politika privatnosti", href: "/privacy" }
      ]
    }
  }
};