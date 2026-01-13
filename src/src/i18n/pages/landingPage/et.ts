/**
 * 🇪🇪 EESTI TÕLKED - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const etLandingPage: LandingPageContent = {
  language: 'et',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Liider Euroopa värbamises - Ajutöö ja püsilepingud 27 riigis",
    metaDescription: "Juurdepääs üle 500 värbamisagentuurile 27 Euroopa riigis. Ajutöö, püsilepingud, töötajate lähetamine: YOJOB lihtsustab rahvusvahelist värbamist.",
    slug: "/",
    h1: "Liider Euroopa värbamises",
    ogTitle: "YOJOB - Teie partner Euroopa värbamisel",
    ogDescription: "Lihtsustatud Euroopa värbamine: üle 500 agentuuri, 27 riiki, kõik vormistused korraldatud.",
    altTexts: {
      heroVisual: "Interaktiivne Euroopa kaart, mis näitab YOJOB võrgustikku",
      europeMap: "27 Euroopa riigi kaart, mida YOJOB katab",
      logoFooter: "YOJOB logo - Euroopa värbamine",
    },
    aiSummary: "YOJOB on Prantsuse juhtiv Euroopa värbamise vahendaja, võrgustikuga üle 500 partneragentuuri 27 riigis. Me hõlbustame Euroopa ajutööd, spetsialiseeritud värbamist, töötajate lähetamist ja pakume nõuannet vastavuse kohta. Meie ekspertteadmised võimaldavad ettevõtetel kiiresti ja seaduslikult palgata töötajaid üle kogu Euroopa, täieliku haldusvormistuse haldamisega.",
    faq: [
      {
        question: "Mis on YOJOB?",
        answer: "YOJOB on Euroopa värbamise vahendaja, mis ühendab Prantsuse ettevõtteid võrgustikuga üle 500 agentuuri 27 Euroopa riigis, et hõlbustada ajutööd, värbamist ja töötajate lähetamist."
      },
      {
        question: "Millistel riikidel te tegutsete?",
        answer: "Me katame 27 Euroopa Liidu riiki pluss Norra, st täielik lääne-, põhja-, lõuna- ja ida-Euroopa katvus."
      },
      {
        question: "Milliseid värbamise liike te pakute?",
        answer: "Me pakume Euroopa ajutööd, värbamist tähtajalise/tähtajatu lepinguga, töötajate lähetamist ja nõustamist vastavuse kohta, et tagada seadusandluse järgimine."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Avaleht",
      services: "Teenused",
      network: "Võrgustik",
      contact: "Kontakt"
    },
    cta: "Küsi pakkumist",
    survey: "Euroopa küsitlus"
  },

  // Hero Section
  hero: {
    badge: "⭐ Liider Euroopa värbamises",
    title: "Palgake üle kogu Euroopa tänu meie võrgustikule üle 500 partneragentuuri",
    subtitle: "Ajutöö, püsilepingud, lähetamine: juurdepääs parimatele Euroopa talentidele. Kõik vormistused korraldame teie eest.",
    benefits: [
      "27 kaetud Euroopa riiki",
      "Üle 500 sertifitseeritud agentuuri",
      "Täielik haldushaldus",
      "Tagatud vastavus"
    ],
    ctaPrimaryLabel: "Hangi tasuta pakkumine",
    ctaSecondaryLabel: "Avasta meie teenuseid",
    stats: {
      agencies: { value: "500+", label: "partneragentuurid" },
      countries: { value: "27", label: "Euroopa riiki" },
      missions: { value: "2000+", label: "edukat missiooni" }
    },
    floatingCards: {
      since: { label: "Alates", value: "2014" },
      expertise: { value: "10 aastat", label: "Juhtivat ekspertteadmisi" },
      partners: { label: "Partnerid", value: "Üle 500 sertifitseeritud agentuuri" },
      countries: { value: "27", label: "Euroopa riiki" },
      certified: { value: "500+", label: "Sertifitseeritud agentuurid" },
      activeNetwork: "Aktiivne võrgustik"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Meie Põhinumbrid",
    title: "Tunnustatud ekspertteadmised Euroopas",
    items: [
      { value: "10", label: "aastat kogemust", icon: "Target" },
      { value: "27", label: "kaetud riiki", icon: "Globe" },
      { value: "500", label: "partneragentuurid", icon: "Network" },
      { value: "2000", label: "teostatud missiooni", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Meie Teenused",
    title: "Värbamislahendused teie vajadustele kohandatud",
    subtitle: "Olenemata sellest, kas otsite ajutisi, püsivaid või lähetatud töötajaid, meil on lahendus",
    services: [
      {
        icon: "Users",
        title: "Euroopa Ajutöö",
        description: "Palgake kvalifitseeritud ajutöötajaid üle kogu Euroopa. Kõik haldusvormistused korraldame meie.",
        linkLabel: "Uuri lähemalt",
        href: "/teenus/euroopa-ajutoo"
      },
      {
        icon: "Target",
        title: "Spetsialiseeritud Värbamine",
        description: "Leidke parimad talendid oma tähtajaliste/tähtajatute ametikohtade jaoks tänu meie Euroopa ekspertide võrgustikule.",
        linkLabel: "Uuri lähemalt",
        href: "/teenus/spetsialiseeritud-varbamine"
      },
      {
        icon: "ShieldCheck",
        title: "Nõustamine ja Vastavus",
        description: "Tagada kõigi Euroopa määruste järgimine seoses lähetamise ja liikuvusega.",
        linkLabel: "Uuri lähemalt",
        href: "/teenus/noustamine-vastavus"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Euroopa Võrgustik",
    title: "27 riiki, üle 500 sertifitseeritud partneragentuuri",
    subtitle: "Meie jõud: tihe ja kvalifitseeritud võrgustik üle kogu Euroopa",
    mapLabel: "partneragentuurid",
    waitlist: {
      badge: "🚀 Uudsus 2025",
      title: "Euroopa agentuuride turg",
      subtitle: "Peagi: võrrelge ja võtke ühendust meie võrgustiku agentuuridega otse",
      features: [
        "✓ Mitme kriteeriumiga otsing (riik, sektor, eriala)",
        "✓ Kohene agentuuride võrdlus",
        "✓ Kontrollitud klientide hinnangud",
        "✓ Otsene ja turvaline ühendus"
      ],
      formTitle: "Olge esimeste seas!",
      formSubtitle: "Registreeruge ootelehele varaseks juurdepääsuks",
      emailPlaceholder: "teie@email.ee",
      ctaLabel: "Liitu ootelehega",
      securityNote: "🔒 Teie andmed on turvalised ega jagata kunagi",
      successMessage: "Täname! Olete ootelehele registreeritud. Võtame teiega ühendust kohe, kui avame."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Kuidas see toimib",
    title: "Euroopa värbamine, lihtsustatud 4 sammuga",
    subtitle: "Selge ja tõhus protsess teie värbamiseks",
    steps: [
      {
        number: "01",
        title: "Kirjeldage oma vajadust",
        description: "Jagage meiega oma värbamisvajadusi: eriala, ametikohtade arv, kestus, vajalikud kvalifikatsioonid.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktiveerime oma võrgustiku",
        description: "Meie partneragentuurid üle kogu Euroopa tuvastavad ja valivad välja parimad saadaolevad profiilid.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Kinnitage kandidaadid",
        description: "Saate eelvalitud elulood ja viite läbi intervjuud teid huvitavate kandidaatidega.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Tervitage oma meeskonda",
        description: "Valitud kandidaadid liituvad teie meeskondadega. Korraldame kõik haldus- ja õigusvormistused.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Viited",
    title: "Nad usaldavad meid",
    subtitle: "Avastage meie klientide kogemusi",
    testimonials: [
      {
        name: "Mati Tamm",
        position: "Personalidirektor",
        company: "TechBuild Eesti",
        quote: "Tänu YOJOB-ile suutsime palgata 15 kvalifitseeritud Poola müürsepa 3 nädalaga. Professionaalne ja tõhus teenindus!",
        rating: 5,
        sector: "Ehitus"
      },
      {
        name: "Kati Kask",
        position: "Personali direktor",
        company: "AgroEesti",
        quote: "Haldushaldus on tõeline peavalu rahvusvahelise värbamise puhul. YOJOB hoolitseb kõige eest, see on tohutu ajakokkuhoid.",
        rating: 5,
        sector: "Toiduainetetööstus"
      },
      {
        name: "Jüri Saar",
        position: "Tootmisjuht",
        company: "AutoParts Europa",
        quote: "Suurepärane tugi! Leidsime spetsialiseeritud tehnikuid Saksamaalt, keda me ise kunagi ei oleks suutnud palgata.",
        rating: 5,
        sector: "Tööstus"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Tegevussektorid",
    title: "Värbame kõigis sektorites",
    subtitle: "Meie võrgustik katab kõik ametid ja tööstussektorid",
    sectors: [
      { icon: "Building2", name: "Ehitus ja Avalikud Tööd", color: "orange" },
      { icon: "Factory", name: "Tööstus", color: "blue" },
      { icon: "Tractor", name: "Põllumajandus", color: "green" },
      { icon: "UtensilsCrossed", name: "Toitlustus ja Hotellindus", color: "red" },
      { icon: "Heart", name: "Tervishoid ja Sotsiaalhoolekanne", color: "pink" },
      { icon: "Laptop", name: "Tehnoloogia ja IT", color: "violet" },
      { icon: "Truck", name: "Logistika ja Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Kaubandus ja Jaotus", color: "green" },
      { icon: "Briefcase", name: "Äriteenused", color: "cyan" },
      { icon: "Wrench", name: "Hooldus ja Teenindus", color: "orange" },
      { icon: "Plane", name: "Turism ja Vaba Aeg", color: "blue" },
      { icon: "Ship", name: "Mere- ja Sadamateenused", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Võtke meiega ühendust",
    title: "Valmis värbama Euroopas?",
    subtitle: "Hangi tasuta ja isikupärastatud pakkumine 24 tunni jooksul",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Kiire vastus",
        description: "Pakkumine 24 tunni jooksul"
      },
      {
        icon: "ShieldCheck",
        title: "Ilma kohustuseta",
        description: "Tasuta ja ilma kohustuseta"
      },
      {
        icon: "Users",
        title: "Pühendunud tugi",
        description: "Ekspert teie käsutuses"
      },
      {
        icon: "Globe",
        title: "Euroopa katvus",
        description: "27 kättesaadavat riiki"
      }
    ],
    form: {
      fields: {
        name: { label: "Täisnimi", placeholder: "Mati Tamm" },
        email: { label: "Tööandja e-post", placeholder: "mati.tamm@ettevote.ee" },
        phone: { label: "Telefon", placeholder: "+372 5123 4567" },
        company: { label: "Ettevõte", placeholder: "Teie ettevõtte nimi" },
        contactType: {
          label: "Kontakti tüüp",
          placeholder: "Valige oma profiil",
          options: {
            client: "Olen klient (ettevõte, kes otsib töötajaid)",
            agency: "Olen värbamisagentuur",
            interim: "Olen ajutöötaja",
            other: "Muu"
          }
        },
        needType: { 
          label: "Vajaduse tüüp", 
          placeholder: "Valige oma vajadus",
          options: [
            "Euroopa ajutöö",
            "Spetsialiseeritud värbamine",
            "Nõustamine ja Vastavus",
            "Muu vajadus"
          ]
        },
        message: { label: "Kirjeldage oma vajadust", placeholder: "Nt: Otsin 10 müürsepa 6-kuuliseks ehituseks Tallinna piirkonnas..." }
      },
      ctaLabel: "Saada minu päring",
      securityNote: "🔒 Teie andmed on kaitstud ega jagata kunagi kolmandate osapooltega",
      successMessage: "Täname! Saime teie päringu kätte ja võtame teiega ühendust 24 tunni jooksul."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Teie partner Euroopa värbamisel"
    },
    columns: {
      services: {
        title: "Teenused",
        links: [
          { label: "Euroopa Ajutöö", href: "/teenus/euroopa-ajutoo" },
          { label: "Spetsialiseeritud Värbamine", href: "/teenus/spetsialiseeritud-varbamine" },
          { label: "Töötajate Lähetamine", href: "/teenus/tootajate-lahetamine" },
          { label: "Nõustamine ja Vastavus", href: "/teenus/noustamine-vastavus" }
        ]
      },
      company: {
        title: "Ettevõte",
        links: [
          { label: "Meist", href: "/meist" },
          { label: "Meie võrgustik", href: "/meie-vorgustik" },
          { label: "Meie sektorid", href: "/meie-sektorid" },
          { label: "Viited", href: "/viited" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Prantsusmaa",
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
      copyright: "© 2026 YOJOB. Kõik õigused kaitstud.",
      madeWith: "Tehtud ❤️-ga Euroopa värbamise hõlbustamiseks",
      legalLinks: [
        { label: "Juriidiline teave", href: "/juriidiline-teave" },
        { label: "ÜT", href: "/cgv" },
        { label: "Privaatsuspoliitika", href: "/privaatsus" }
      ]
    }
  }
};