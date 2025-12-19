import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇸🇰 YOJOB Landing Page Content - Slovenčina
 * Profesionálny preklad z francúzštiny
 */

export const landingContentSK: LandingPageContent = {
  language: 'sk',
  
  seo: {
    metaTitle: 'YOJOB - Európska platforma pre vyslanie pracovníkov | 27 krajín',
    metaDescription: 'Centralizujte svoje európske procedúry vyslania. Zabezpečený digitálny trezor, online administratívne procedúry a správa pracovných ponúk. 500+ partnerských agentúr v 27 krajinách.',
    slug: '/',
    h1: 'Vaša všetko-v-jednom platforma pre európske vyslanie',
    ogTitle: 'YOJOB - Zjednodušené vyslanie pracovníkov v Európe',
    ogDescription: 'Spravujte svoje procedúry vyslania s YOJOB: garantovaný súlad, 500+ partnerských agentúr, 27 európskych krajín.',
    altTexts: {
      heroVisual: 'Interaktívna mapa Európy zobrazujúca sieť YOJOB s 500+ agentúrami v 27 krajinách',
      europeMap: 'Mapa Európy s 27 krajinami pokrytými YOJOB',
      logoFooter: 'Logo YOJOB - Európska platforma pre vyslanie',
    },
    aiSummary: 'YOJOB je európska platforma špecializujúca sa na vyslanie pracovníkov. Centralizuje všetky dokumenty a administratívne procedúry v zabezpečenom digitálnom trezore. Spoločnosti môžu spravovať pracovné ponuky, pripravovať zložky vyslania a zabezpečiť právny súlad v 27 európskych krajinách prostredníctvom siete 500+ partnerských agentúr.',
    faq: [
      {
        question: 'Čo je YOJOB?',
        answer: 'YOJOB je európska platforma pre sprostredkovanie náboru a správu vyslania pracovníkov. Spojujeme spoločnosti s viac ako 500 partnerskými agentúrami v 27 európskych krajinách.',
      },
      {
        question: 'V ktorých krajinách YOJOB pôsobí?',
        answer: 'YOJOB pokrýva 27 európskych krajín: Francúzsko, Nemecko, Španielsko, Taliansko, Poľsko, Rumunsko, Holandsko, Belgicko, Portugalsko, Česká republika, Maďarsko, Švédsko, Rakúsko, Bulharsko, Dánsko, Fínsko, Slovensko, Írsko, Chorvátsko, Litva, Slovinsko, Lotyšsko, Estónsko, Cyprus, Luxembursko, Malta a Grécko.',
      },
      {
        question: 'Ako funguje digitálny trezor?',
        answer: 'Náš digitálny trezor centralizuje všetky vaše dokumenty vyslania (A1, zmluvy, doklady) v zabezpečenom priestore prístupnom 24/7.',
      },
      {
        question: 'Zaručuje YOJOB právny súlad?',
        answer: 'Áno, YOJOB integruje európske predpisy o vyslaní pracovníkov. Naša platforma vás prevedie povinnými procedúrami.',
      },
      {
        question: 'Ako môžem zverejniť pracovnú ponuku na YOJOB?',
        answer: 'Od roku 2026 budete môcť zverejňovať svoje pracovné ponuky priamo na našom marketplace.',
      },
      {
        question: 'Koľko stojí platforma YOJOB?',
        answer: 'YOJOB ponúka rôzne balíčky prispôsobené vašim potrebám. Kontaktujte nás pre personalizovanú ponuku.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Domov',
      services: 'Služby',
      network: 'Naša sieť',
      contact: 'Kontakt',
    },
    cta: 'Požiadať o ponuku',
  },

  hero: {
    badge: '⭐ Líder v európskom nábore',
    title: 'Váš partner pre nábor v Európe',
    subtitle: 'Prístup k sieti 500+ pracovných agentúr v 27 krajinách. Zjednodušte si európsky nábor so skúseným a dôveryhodným sprostredkovateľom.',
    benefits: [
      'Centralizované a zabezpečené zložky',
      'Online administratívne procedúry',
      'Správa pracovných ponúk',
      'Viacštátny súlad',
    ],
    ctaPrimaryLabel: 'Požiadať o ponuku',
    ctaSecondaryLabel: 'Objavte sieť',
    stats: {
      agencies: { value: '500+', label: 'partnerských agentúr' },
      countries: { value: '27', label: 'európskych krajín' },
      missions: { value: '2000+', label: 'úspešných misií' },
    },
    floatingCards: {
      since: { label: 'Od', value: '2014' },
      expertise: { value: '10 rokov', label: 'Vedúcej odbornosti' },
      partners: { label: 'Partneri', value: '500+ certifikovaných agentúr' },
      countries: { value: '27', label: 'Európskych krajín' },
      certified: { value: '500+', label: 'Certifikovaných agentúr' },
      activeNetwork: 'Aktívna sieť',
    },
  },

  stats: {
    badge: '📊 Naše kľúčové údaje',
    title: 'Uznávaná odbornosť v Európe',
    items: [
      { value: '10+', label: 'rokov skúseností', icon: 'Target' },
      { value: '27', label: 'pokrytých krajín', icon: 'Globe' },
      { value: '500+', label: 'partnerských agentúr', icon: 'Network' },
      { value: '2000+', label: 'realizovaných misií', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Naše služby',
    title: 'Riešenia prispôsobené vašim potrebám',
    subtitle: 'Sprevádzame vás vo všetkých vašich európskych náborových procedúrach.',
    services: [
      {
        icon: 'Users',
        title: 'Európska agentúrna práca',
        description: 'Nábor dočasného personálu v celej Európe s úplnou správou formalít.',
        linkLabel: 'Zistiť viac',
      },
      {
        icon: 'Target',
        title: 'Špecializovaný nábor',
        description: 'Nájdite talenty, ktoré potrebujete, vďaka našej sieti odvetvových expertov.',
        linkLabel: 'Zistiť viac',
      },
      {
        icon: 'ShieldCheck',
        title: 'Poradenstvo a súlad',
        description: 'Uistite sa, že dodržiavate všetky európske predpisy o vyslaní.',
        linkLabel: 'Zistiť viac',
      },
    ],
  },

  network: {
    badge: '🌍 Európska sieť',
    title: 'Sieť pokrývajúca celú Európu',
    subtitle: 'Viac ako 500 partnerských agentúr v 27 krajinách pre splnenie všetkých vašich náborových potrieb.',
    mapLabel: 'partnerských agentúr',
    waitlist: {
      badge: '✨ Novinka 2026',
      title: 'Vaša všetko-v-jednom platforma pre európske vyslanie',
      subtitle: 'Centralizujte všetky svoje dokumenty a údaje o vyslaní v zabezpečenom priestore. Vykonávajte svoje administratívne procedúry priamo online a spravujte svoje pracovné ponuky z jedného rozhrania.',
      features: [
        'Centralizované a zabezpečené zložky',
        'Online administratívne procedúry',
        'Správa pracovných ponúk',
        'Viacštátny súlad',
      ],
      formTitle: 'Buďte medzi prvými!',
      formSubtitle: 'Zaregistrujte sa na čakaciu listinu a získajte prioritný prístup',
      emailPlaceholder: 'Vaša profesionálna e-mailová adresa',
      ctaLabel: 'Pripojiť sa k čakacej listine',
      securityNote: '🔒 Vaše údaje sú zabezpečené a nikdy nebudú zdieľané.',
      successMessage: 'Ďakujeme! Ste na čakacej listine.',
    },
  },

  steps: {
    badge: '🎯 Ako to funguje',
    title: 'Jednoduchý a efektívny proces',
    subtitle: 'V 4 krokoch nájdite talenty, ktoré potrebujete v celej Európe.',
    steps: [
      {
        number: '01',
        title: 'Opíšte svoju potrebu',
        description: 'Zdieľajte s nami svoje náborové potreby: profily, zručnosti, umiestnenie a trvanie.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktivujeme našu sieť',
        description: 'Naše partnerské agentúry v celej Európe hľadajú najlepších kandidátov pre vás.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Schváľte kandidátov',
        description: 'Predložíme vám výber kvalifikovaných profilov, ktoré môžete vyhodnotiť.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Privítajte svoj tím',
        description: 'Spravujeme všetky administratívne formality, aby ste sa mohli sústrediť na podstatu.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Referencie',
    title: 'Dôverujú nám',
    subtitle: 'Objavte spätnú väzbu našich klientov z celej Európy.',
    testimonials: [
      {
        name: 'Ján Novák',
        position: 'HR riaditeľ',
        company: 'Stavebníctvo Slovensko',
        quote: 'YOJOB nám umožnil najať 50 kvalifikovaných pracovníkov v Poľsku za pouhé 3 týždne. Výrazná úspora času a bezchybná administratívna správa.',
        rating: 5,
        sector: 'Stavebníctvo',
      },
      {
        name: 'Mária Nováková',
        position: 'Vedúca mobility',
        company: 'IndusTech Nemecko',
        quote: 'Európska sieť YOJOB je pôsobivá. Podarilo sa nám rozšíriť naše operácie do 5 krajín s odbornou podporou v každom kroku.',
        rating: 5,
        sector: 'Priemysel',
      },
      {
        name: 'Antonio Silva',
        position: 'Výkonný riaditeľ',
        company: 'AgriPro Portugalsko',
        quote: 'Konečne riešenie, ktoré skutočne zjednodušuje cezhraničný nábor. Garantovaný súlad a dodržané termíny.',
        rating: 5,
        sector: 'Poľnohospodárstvo',
      },
    ],
  },

  sectors: {
    badge: '🏭 Odvetvia činnosti',
    title: 'Pôsobíme vo všetkých odvetviach',
    subtitle: 'Naša odbornosť pokrýva všetky európske odvetvia činnosti.',
    sectors: [
      { icon: 'Building2', name: 'Stavebníctvo a práce', color: 'orange' },
      { icon: 'Factory', name: 'Priemysel a logistika', color: 'blue' },
      { icon: 'Tractor', name: 'Poľnohospodárstvo a vinohradníctvo', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Pohostinstvo a reštaurácie', color: 'red' },
      { icon: 'Heart', name: 'Zdravotníctvo a medicína', color: 'pink' },
      { icon: 'Laptop', name: 'Služby a IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Kontaktujte nás',
    title: 'Ste pripravení na nábor v Európe?',
    subtitle: 'Povedzte nám o svojom projekte a získajte personalizovanú ponuku do 24 hodín.',
    benefits: [
      {
        icon: 'Users',
        title: 'Personalizovaný sprievod',
        description: 'Vyhradený expert pre váš projekt',
      },
      {
        icon: 'ShieldCheck',
        title: 'Garantovaný súlad',
        description: 'Dodržiavanie všetkých predpisov',
      },
      {
        icon: 'Globe',
        title: 'Európske pokrytie',
        description: '27 krajín okamžite dostupných',
      },
      {
        icon: 'CheckCircle',
        title: 'Maximálna reaktivita',
        description: 'Odpoveď do 24 pracovných hodín',
      },
    ],
    form: {
      fields: {
        name: { label: 'Celé meno', placeholder: 'Ján Novák' },
        email: { label: 'Profesionálny e-mail', placeholder: 'jan.novak@firma.sk' },
        phone: { label: 'Telefón', placeholder: '+421 2 1234 5678' },
        company: { label: 'Spoločnosť', placeholder: 'Názov vašej spoločnosti' },
        needType: { label: 'Typ potreby', placeholder: 'Vyberte typ potreby' },
        message: { label: 'Opíšte svoju potrebu', placeholder: 'Povedzte nám o svojom európskom náborovom projekte...' },
      },
      ctaLabel: 'Odoslať žiadosť',
      securityNote: '🔒 Vaše údaje sú zabezpečené a nikdy nebudú zdieľané.',
      successMessage: 'Ďakujeme! Ozveme sa vám do 24 hodín.',
    },
  },

  footer: {
    logo: {
      tagline: 'Váš dôveryhodný partner pre európsky nábor',
    },
    columns: {
      services: {
        title: 'Služby',
        links: [
          { label: 'Európska agentúrna práca', href: '/services/interim-europeen' },
          { label: 'Špecializovaný nábor', href: '/services/recrutement-specialise' },
          { label: 'Poradenstvo a zhoda', href: '/services/conseil-conformite' },
          { label: 'Vysielanie pracovníkov', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Spoločnosť',
        links: [
          { label: 'O nás', href: '#about' },
          { label: 'Naša sieť', href: '#reseau' },
          { label: 'Naše odvetvia', href: '#secteurs' },
          { label: 'Referencie', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Kontakt',
        address: '123 Avenue de l\'Europe, 75001 Paríž, Francúzsko',
        phone: '+33 1 23 45 67 89',
        email: 'contact@yojob.fr',
      },
    },
    social: {
      linkedin: 'https://linkedin.com/company/yojob',
      twitter: 'https://twitter.com/yojob',
      facebook: 'https://facebook.com/yojob',
    },
    bottom: {
      copyright: '© 2026 YOJOB. Všetky práva vyhradené. Vytvorené s ❤️ v Európe.',
      legalLinks: [
        { label: 'Právne upozornenie', href: '#mentions' },
        { label: 'Súkromie', href: '#privacy' },
        { label: 'Podmienky', href: '#cgv' },
      ],
    },
  },
};