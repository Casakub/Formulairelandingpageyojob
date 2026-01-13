/**
 * 🇱🇻 LATVIEŠU TULKOJUMI - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const lvLandingPage: LandingPageContent = {
  language: 'lv',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Līderis Eiropas personāla atlasē - Īslaicīgais darbs un pastāvīgi līgumi 27 valstīs",
    metaDescription: "Piekļuve vairāk nekā 500 personāla atlases aģentūrām 27 Eiropas valstīs. Īslaicīgais darbs, pastāvīgi līgumi, darbinieku nosūtīšana: YOJOB vienkāršo starptautisko personāla atlasi.",
    slug: "/",
    h1: "Līderis Eiropas personāla atlasē",
    ogTitle: "YOJOB - Jūsu partneris personāla atlasē Eiropā",
    ogDescription: "Vienkāršota Eiropas personāla atlase: vairāk nekā 500 aģentūras, 27 valstis, visas formalitātes nokārtotas.",
    altTexts: {
      heroVisual: "Interaktīva Eiropas karte, kas parāda YOJOB tīklu",
      europeMap: "27 Eiropas valstu karte, ko aptver YOJOB",
      logoFooter: "YOJOB logotips - Eiropas personāla atlase",
    },
    aiSummary: "YOJOB ir Francijas vadošais Eiropas personāla atlases starpnieks ar vairāk nekā 500 partneru aģentūru tīklu 27 valstīs. Mēs atvieglojam Eiropas īslaicīgo darbu, specializēto personāla atlasi, darbinieku nosūtīšanu un piedāvājam konsultācijas par atbilstību. Mūsu ekspertīze ļauj uzņēmumiem ātri un likumīgi pieņemt darbā darbiniekus visā Eiropā ar pilnīgu administratīvo formalitāšu pārvaldību.",
    faq: [
      {
        question: "Kas ir YOJOB?",
        answer: "YOJOB ir Eiropas personāla atlases starpnieks, kas savieno Francijas uzņēmumus ar vairāk nekā 500 aģentūru tīklu 27 Eiropas valstīs, lai atvieglotu īslaicīgo darbu, personāla atlasi un darbinieku nosūtīšanu."
      },
      {
        question: "Kurās valstīs jūs darbojaties?",
        answer: "Mēs apturam 27 Eiropas Savienības valstis plus Norvēģiju, tas ir, pilnīgu rietumu, ziemeļu, dienvidu un austrumu Eiropas pārklājumu."
      },
      {
        question: "Kāda veida personāla atlasi jūs piedāvājat?",
        answer: "Mēs piedāvājam Eiropas īslaicīgo darbu, personāla atlasi ar noteiktu/nenoteiktu termiņu līgumu, darbinieku nosūtīšanu un konsultācijas par atbilstību, lai nodrošinātu likumdošanas ievērošanu."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Sākums",
      services: "Pakalpojumi",
      network: "Tīkls",
      contact: "Kontakti"
    },
    cta: "Pieprasīt piedāvājumu"
  },

  // Hero Section
  hero: {
    badge: "⭐ Līderis Eiropas personāla atlasē",
    title: "Pieņemiet darbā visā Eiropā, pateicoties mūsu vairāk nekā 500 partneru aģentūru tīklam",
    subtitle: "Īslaicīgais darbs, pastāvīgi līgumi, nosūtīšana: piekļuve labākajiem Eiropas talantiem. Visas formalitātes kārtojam jūsu vietā.",
    benefits: [
      "27 aptvertās Eiropas valstis",
      "Vairāk nekā 500 sertificētas aģentūras",
      "Pilnīga administratīvā pārvaldība",
      "Garantēta atbilstība"
    ],
    ctaPrimaryLabel: "Saņemiet bezmaksas piedāvājumu",
    ctaSecondaryLabel: "Atklājiet mūsu pakalpojumus",
    stats: {
      agencies: { value: "500+", label: "partneru aģentūras" },
      countries: { value: "27", label: "Eiropas valstis" },
      missions: { value: "2000+", label: "veiksmīgas misijas" }
    },
    floatingCards: {
      since: { label: "Kopš", value: "2014" },
      expertise: { value: "10 gadi", label: "Vadošas ekspertīzes" },
      partners: { label: "Partneri", value: "Vairāk nekā 500 sertificētas aģentūras" },
      countries: { value: "27", label: "Eiropas valstis" },
      certified: { value: "500+", label: "Sertificētas aģentūras" },
      activeNetwork: "Aktīvs tīkls"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Mūsu Galvenie Rādītāji",
    title: "Atzīta ekspertīze Eiropā",
    items: [
      { value: "10", label: "gadu pieredze", icon: "Target" },
      { value: "27", label: "aptvertās valstis", icon: "Globe" },
      { value: "500", label: "partneru aģentūras", icon: "Network" },
      { value: "2000", label: "veiktās misijas", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Mūsu Pakalpojumi",
    title: "Personāla atlases risinājumi, pielāgoti jūsu vajadzībām",
    subtitle: "Neatkarīgi no tā, vai meklējat īslaicīgus, pastāvīgus vai nosūtītus darbiniekus, mums ir risinājums",
    services: [
      {
        icon: "Users",
        title: "Eiropas Īslaicīgais Darbs",
        description: "Pieņemiet darbā kvalificētus īslaicīgos darbiniekus visā Eiropā. Visas administratīvās formalitātes kārtojam mēs.",
        linkLabel: "Uzzināt vairāk",
        href: "/pakalpojums/eiropas-islaiclgais-darbs"
      },
      {
        icon: "Target",
        title: "Specializēta Personāla Atlase",
        description: "Atrodiet labākos talantus savām pozīcijām ar noteiktu/nenoteiktu termiņu līgumu, pateicoties mūsu Eiropas ekspertu tīklam.",
        linkLabel: "Uzzināt vairāk",
        href: "/pakalpojums/specializeta-personala-atlase"
      },
      {
        icon: "ShieldCheck",
        title: "Konsultācijas un Atbilstība",
        description: "Nodrošiniet visu Eiropas noteikumu ievērošanu attiecībā uz nosūtīšanu un mobilitāti.",
        linkLabel: "Uzzināt vairāk",
        href: "/pakalpojums/konsultacijas-atbilstlba"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Eiropas Tīkls",
    title: "27 valstis, vairāk nekā 500 sertificētas partneru aģentūras",
    subtitle: "Mūsu spēks: blīvs un kvalificēts tīkls visā Eiropā",
    mapLabel: "partneru aģentūras",
    waitlist: {
      badge: "🚀 Jaunums 2025",
      title: "Eiropas aģentūru tirgus",
      subtitle: "Drīzumā: salīdziniet un sazinieties ar aģentūrām no mūsu tīkla tieši",
      features: [
        "✓ Vairāku kritēriju meklēšana (valsts, nozare, profesija)",
        "✓ Tūlītēja aģentūru salīdzināšana",
        "✓ Pārbaudīti klientu atsauksmes",
        "✓ Tieša un droša saite"
      ],
      formTitle: "Esiet starp pirmajiem!",
      formSubtitle: "Reģistrējieties gaidīšanas sarakstā agrīnai piekļuvei",
      emailPlaceholder: "jusu@epasts.lv",
      ctaLabel: "Pievienoties gaidīšanas sarakstam",
      securityNote: "🔒 Jūsu dati ir droši un nekad netiks kopīgoti",
      successMessage: "Paldies! Esat reģistrēts gaidīšanas sarakstā. Sazināsimies ar jums, tiklīdz atvērsim."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Kā tas darbojas",
    title: "Eiropas personāla atlase, vienkāršota 4 soļos",
    subtitle: "Skaidrs un efektīvs process jūsu personāla atlasei",
    steps: [
      {
        number: "01",
        title: "Aprakstiet savu vajadzību",
        description: "Dalieties ar mums savām personāla atlases vajadzībām: profesija, amatu skaits, ilgums, nepieciešamās kvalifikācijas.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktivizējam savu tīklu",
        description: "Mūsu partneru aģentūras visā Eiropā identificē un atlasa labākos pieejamos profilus.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Apstipriniet kandidātus",
        description: "Saņemat iepriekš atlasītas CV un veicat intervijas ar kandidātiem, kas jūs interesē.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Sagaidiet savu komandu",
        description: "Atlasītie kandidāti pievienojas jūsu komandām. Kārtojam visas administratīvās un juridiskās formalitātes.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Atsauksmes",
    title: "Viņi mums uzticas",
    subtitle: "Atklājiet mūsu klientu pieredzi",
    testimonials: [
      {
        name: "Jānis Bērziņš",
        position: "Personāla direktors",
        company: "TechBuild Latvija",
        quote: "Pateicoties YOJOB, mēs spējām pieņemt darbā 15 kvalificētus poļu mūrniekus 3 nedēļu laikā. Profesionāls un efektīvs pakalpojums!",
        rating: 5,
        sector: "Būvniecība"
      },
      {
        name: "Līga Kalniņa",
        position: "Personāla direktore",
        company: "AgroLatvija",
        quote: "Administratīvā pārvaldība ir īsta galvassāpe starptautiskajā personāla atlasē. YOJOB par visu rūpējas, tas ir milzīgs laika ietaupījums.",
        rating: 5,
        sector: "Pārtikas rūpniecība"
      },
      {
        name: "Andris Liepa",
        position: "Ražošanas vadītājs",
        company: "AutoParts Europa",
        quote: "Izcila atbalsts! Atradām specializētus tehniķus Vācijā, ko paši nekad nebūtu varējuši pieņemt darbā.",
        rating: 5,
        sector: "Rūpniecība"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Darbības Nozares",
    title: "Pieņemam darbā visās nozarēs",
    subtitle: "Mūsu tīkls aptver visas profesijas un rūpniecības nozares",
    sectors: [
      { icon: "Building2", name: "Būvniecība un Sabiedriskie Darbi", color: "orange" },
      { icon: "Factory", name: "Rūpniecība", color: "blue" },
      { icon: "Tractor", name: "Lauksaimniecība", color: "green" },
      { icon: "UtensilsCrossed", name: "Ēdināšana un Viesnīcniecība", color: "red" },
      { icon: "Heart", name: "Veselības aprūpe un Sociālā aprūpe", color: "pink" },
      { icon: "Laptop", name: "Tehnoloģijas un IT", color: "violet" },
      { icon: "Truck", name: "Loģistika un Transports", color: "blue" },
      { icon: "ShoppingBag", name: "Tirdzniecība un Izplatīšana", color: "green" },
      { icon: "Briefcase", name: "Biznesa pakalpojumi", color: "cyan" },
      { icon: "Wrench", name: "Apkope un Serviss", color: "orange" },
      { icon: "Plane", name: "Tūrisms un Brīvais laiks", color: "blue" },
      { icon: "Ship", name: "Jūras un Ostu pakalpojumi", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Sazinieties ar mums",
    title: "Gatavi pieņemt darbā Eiropā?",
    subtitle: "Saņemiet bezmaksas un personalizētu piedāvājumu 24 stundu laikā",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Ātra atbilde",
        description: "Piedāvājums 24 darba stundu laikā"
      },
      {
        icon: "ShieldCheck",
        title: "Bez saistībām",
        description: "Bezmaksas un bez saistībām"
      },
      {
        icon: "Users",
        title: "Īpaša atbalsts",
        description: "Eksperts jūsu rīcībā"
      },
      {
        icon: "Globe",
        title: "Eiropas pārklājums",
        description: "27 pieejamās valstis"
      }
    ],
    form: {
      fields: {
        name: { label: "Pilns vārds", placeholder: "Jānis Bērziņš" },
        email: { label: "Darba e-pasts", placeholder: "janis.berzins@uznemums.lv" },
        phone: { label: "Tālrunis", placeholder: "+371 2123 4567" },
        company: { label: "Uzņēmums", placeholder: "Jūsu uzņēmuma nosaukums" },
        contactType: {
          label: "Kontakta veids",
          placeholder: "Izvēlieties savu profilu",
          options: {
            client: "Esmu klients (uzņēmums, kas meklē darbiniekus)",
            agency: "Esmu personāla atlases aģentūra",
            interim: "Esmu īslaicīgais darbinieks",
            other: "Cits"
          }
        },
        needType: { 
          label: "Vajadzības veids", 
          placeholder: "Izvēlieties savu vajadzību",
          options: [
            "Eiropas īslaicīgais darbs",
            "Specializēta personāla atlase",
            "Konsultācijas un Atbilstība",
            "Cita vajadzība"
          ]
        },
        message: { label: "Aprakstiet savu vajadzību", placeholder: "Piemēram: Meklējam 10 mūrniekus 6 mēnešu būvniecībai Rīgas apkārtnē..." }
      },
      ctaLabel: "Nosūtīt manu pieprasījumu",
      securityNote: "🔒 Jūsu dati ir aizsargāti un nekad netiks kopīgoti ar trešajām pusēm",
      successMessage: "Paldies! Esam saņēmuši jūsu pieprasījumu un sazināsimies ar jums 24 stundu laikā."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Jūsu partneris personāla atlasē Eiropā"
    },
    columns: {
      services: {
        title: "Pakalpojumi",
        links: [
          { label: "Eiropas Īslaicīgais Darbs", href: "/pakalpojums/eiropas-islaiclgais-darbs" },
          { label: "Specializēta Personāla Atlase", href: "/pakalpojums/specializeta-personala-atlase" },
          { label: "Darbinieku Nosūtīšana", href: "/pakalpojums/darbinieku-nosutlsana" },
          { label: "Konsultācijas un Atbilstība", href: "/pakalpojums/konsultacijas-atbilstlba" }
        ]
      },
      company: {
        title: "Uzņēmums",
        links: [
          { label: "Par mums", href: "/par-mums" },
          { label: "Mūsu tīkls", href: "/musu-tikls" },
          { label: "Mūsu nozares", href: "/musu-nozares" },
          { label: "Atsauksmes", href: "/atsauksmes" }
        ]
      },
      contact: {
        title: "Kontakti",
        address: "Bordo, Francija",
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
      copyright: "© 2025 YOJOB. Visas tiesības aizsargātas.",
      madeWith: "Izveidots ar ❤️, lai atvieglotu Eiropas personāla atlasi",
      legalLinks: [
        { label: "Juridiskā informācija", href: "/juridiska-informacija" },
        { label: "VN", href: "/cgv" },
        { label: "Konfidencialitātes politika", href: "/konfidencialitate" }
      ]
    }
  }
};
