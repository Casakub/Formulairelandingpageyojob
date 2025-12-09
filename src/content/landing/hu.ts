import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇭🇺 YOJOB Landing Page Content - Magyar
 * Professzionális fordítás franciából
 */

export const landingContentHU: LandingPageContent = {
  language: 'hu',
  
  seo: {
    metaTitle: 'YOJOB - Európai Kiküldetési Platform | 27 Ország',
    metaDescription: 'Központosítsa európai kiküldetési eljárásait. Biztonságos digitális széf, online adminisztratív eljárások és állásajánlat-kezelés. 500+ partnercég 27 országban.',
    slug: '/',
    h1: 'Az Ön mindent egyben platformja az európai kiküldetéshez',
    ogTitle: 'YOJOB - Egyszerűsített Munkavállalói Kiküldetés Európában',
    ogDescription: 'Kezelje kiküldetési eljárásait a YOJOB-bal: garantált megfelelés, 500+ partnercég, 27 európai ország.',
    altTexts: {
      heroVisual: 'Interaktív Európa-térkép, amely bemutatja a YOJOB hálózatát 500+ ügynökséggel 27 országban',
      europeMap: 'Európa térképe a YOJOB által lefedett 27 országgal',
      logoFooter: 'YOJOB Logó - Európai Kiküldetési Platform',
    },
    aiSummary: 'A YOJOB egy európai platform, amely a munkavállalók kiküldetésére szakosodott. Központosítja az összes dokumentumot és adminisztratív eljárást egy biztonságos digitális széfben. A vállalatok kezelhetik az állásajánlatokat, elkészíthetik a kiküldetési dossziékat és biztosíthatják a jogi megfelelést 27 európai országban 500+ partnercég hálózatán keresztül.',
    faq: [
      {
        question: 'Mi az a YOJOB?',
        answer: 'A YOJOB egy európai platform a toborzás közvetítésére és a munkavállalók kiküldetésének kezelésére. Vállalatokat kötünk össze több mint 500 partnercéggel 27 európai országban.',
      },
      {
        question: 'Mely országokban működik a YOJOB?',
        answer: 'A YOJOB 27 európai országot fed le: Franciaország, Németország, Spanyolország, Olaszország, Lengyelország, Románia, Hollandia, Belgium, Portugália, Csehország, Magyarország, Svédország, Ausztria, Bulgária, Dánia, Finnország, Szlovákia, Írország, Horvátország, Litvánia, Szlovénia, Lettország, Észtország, Ciprus, Luxemburg, Málta és Görögország.',
      },
      {
        question: 'Hogyan működik a digitális széf?',
        answer: 'Digitális széfünk központosítja az összes kiküldetési dokumentumot (A1, szerződések, igazolások) egy biztonságos térben, amely 24/7 elérhető.',
      },
      {
        question: 'A YOJOB garantálja a jogi megfelelést?',
        answer: 'Igen, a YOJOB integrálja a munkavállalók kiküldetésére vonatkozó európai szabályokat. Platformunk végigvezeti Önt a kötelező eljárásokon.',
      },
      {
        question: 'Hogyan tehetek közzé állásajánlatot a YOJOB-on?',
        answer: '2026-tól közzéteheti állásajánlatait közvetlenül piacterünkön.',
      },
      {
        question: 'Mennyibe kerül a YOJOB platform?',
        answer: 'A YOJOB különböző csomagokat kínál, amelyek alkalmazkodnak az Ön igényeihez. Lépjen kapcsolatba velünk személyre szabott ajánlatért.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Kezdőlap',
      services: 'Szolgáltatások',
      network: 'Hálózatunk',
      contact: 'Kapcsolat',
    },
    cta: 'Ajánlatkérés',
  },

  hero: {
    badge: '⭐ Vezető az európai toborzásban',
    title: 'Az Ön partnere az európai toborzáshoz',
    subtitle: 'Hozzáférés 500+ munkaerő-közvetítő ügynökség hálózatához 27 országban. Egyszerűsítse európai toborzását egy tapasztalt és megbízható közvetítővel.',
    benefits: [
      'Központosított és biztonságos dossziék',
      'Online adminisztratív eljárások',
      'Állásajánlatok kezelése',
      'Többországos megfelelés',
    ],
    ctaPrimaryLabel: 'Ajánlatkérés',
    ctaSecondaryLabel: 'Fedezze fel a hálózatot',
    stats: {
      agencies: { value: '500+', label: 'partnercég' },
      countries: { value: '27', label: 'európai ország' },
      missions: { value: '2000+', label: 'sikeres küldetés' },
    },
    floatingCards: {
      since: { label: 'Óta', value: '2014' },
      expertise: { value: '10 év', label: 'Vezető szakértelem' },
      partners: { label: 'Partnerek', value: '500+ tanúsított ügynökség' },
      countries: { value: '27', label: 'Európai ország' },
      certified: { value: '500+', label: 'Tanúsított ügynökség' },
      activeNetwork: 'Aktív hálózat',
    },
  },

  stats: {
    badge: '📊 Kulcsszámaink',
    title: 'Elismert szakértelem Európában',
    items: [
      { value: '10+', label: 'év tapasztalat', icon: 'Target' },
      { value: '27', label: 'lefedett ország', icon: 'Globe' },
      { value: '500+', label: 'partnercég', icon: 'Network' },
      { value: '2000+', label: 'megvalósított küldetés', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Szolgáltatásaink',
    title: 'Az Ön igényeihez igazított megoldások',
    subtitle: 'Végigkísérjük Önt minden európai toborzási eljárásban.',
    services: [
      {
        icon: 'Users',
        title: 'Európai időszakos foglalkoztatás',
        description: 'Ideiglenes munkaerő toborzása egész Európában a formalitások teljes kezelésével.',
        linkLabel: 'Tudjon meg többet',
      },
      {
        icon: 'Target',
        title: 'Specializált toborzás',
        description: 'Találja meg a szükséges tehetségeket szakmai szakértők hálózatunknak köszönhetően.',
        linkLabel: 'Tudjon meg többet',
      },
      {
        icon: 'ShieldCheck',
        title: 'Tanácsadás és megfelelés',
        description: 'Győződjön meg róla, hogy megfelel az összes európai kiküldetési szabálynak.',
        linkLabel: 'Tudjon meg többet',
      },
    ],
  },

  network: {
    badge: '🌍 Európai Hálózat',
    title: 'Egész Európát lefedő hálózat',
    subtitle: 'Több mint 500 partnercég 27 országban, hogy minden toborzási igényét kielégítse.',
    mapLabel: 'partnercég',
    waitlist: {
      badge: '✨ Újdonság 2026',
      title: 'Az Ön mindent egyben platformja az európai kiküldetéshez',
      subtitle: 'Központosítsa az összes kiküldetési dokumentumot és adatot egy biztonságos térben. Végezze el adminisztratív eljárásait közvetlenül online, és kezelje állásajánlatait egyetlen felületről.',
      features: [
        'Központosított és biztonságos dossziék',
        'Online adminisztratív eljárások',
        'Állásajánlatok kezelése',
        'Többországos megfelelés',
      ],
      formTitle: 'Legyen az elsők között!',
      formSubtitle: 'Iratkozzon fel a várólistára és kapjon elsőbbségi hozzáférést',
      emailPlaceholder: 'Az Ön üzleti email címe',
      ctaLabel: 'Csatlakozzon a várólistához',
      securityNote: '🔒 Az Ön adatai biztonságban vannak és soha nem lesznek megosztva.',
      successMessage: 'Köszönjük! Feliratkozott a várólistára.',
    },
  },

  steps: {
    badge: '🎯 Hogyan működik',
    title: 'Egyszerű és hatékony folyamat',
    subtitle: '4 lépésben találja meg a szükséges tehetségeket egész Európában.',
    steps: [
      {
        number: '01',
        title: 'Írja le igényét',
        description: 'Ossza meg velünk toborzási igényeit: profilok, készségek, helyszín és időtartam.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktiváljuk hálózatunkat',
        description: 'Partnercégeink egész Európában keresik a legjobb jelölteket az Ön számára.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Hagyja jóvá a jelölteket',
        description: 'Bemutatjuk Önnek a minősített profilok válogatását, amelyeket értékelhet.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Fogadja csapatát',
        description: 'Kezeljük az összes adminisztratív formalitást, hogy Ön a lényegre koncentrálhasson.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Vélemények',
    title: 'Ők megbíznak bennünk',
    subtitle: 'Fedezze fel ügyfeleink visszajelzéseit egész Európából.',
    testimonials: [
      {
        name: 'Nagy János',
        position: 'HR igazgató',
        company: 'Építőipar Magyarország',
        quote: 'A YOJOB lehetővé tette számunkra, hogy 50 képzett munkást toborozzunk Lengyelországban mindössze 3 hét alatt. Jelentős időmegtakarítás és kifogástalan adminisztratív kezelés.',
        rating: 5,
        sector: 'Építőipar',
      },
      {
        name: 'Kovács Mária',
        position: 'Mobilitási vezető',
        company: 'IndusTech Németország',
        quote: 'A YOJOB európai hálózata lenyűgöző. Sikerült kibővítenünk működésünket 5 országban szakértői támogatással minden lépésben.',
        rating: 5,
        sector: 'Ipar',
      },
      {
        name: 'Antonio Silva',
        position: 'Ügyvezető igazgató',
        company: 'AgriPro Portugália',
        quote: 'Végre egy megoldás, amely valóban leegyszerűsíti a határokon átnyúló toborzást. Garantált megfelelés és betartott határidők.',
        rating: 5,
        sector: 'Mezőgazdaság',
      },
    ],
  },

  sectors: {
    badge: '🏭 Tevékenységi szektorok',
    title: 'Minden szektorban működünk',
    subtitle: 'Szakértelmünk minden európai tevékenységi szektorra kiterjed.',
    sectors: [
      { icon: 'Building2', name: 'Építőipar és munkálatok', color: 'orange' },
      { icon: 'Factory', name: 'Ipar és logisztika', color: 'blue' },
      { icon: 'Tractor', name: 'Mezőgazdaság és szőlészet', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Vendéglátás és éttermek', color: 'red' },
      { icon: 'Heart', name: 'Egészségügy és orvostudomány', color: 'pink' },
      { icon: 'Laptop', name: 'Szolgáltatások és IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Lépjen kapcsolatba velünk',
    title: 'Készen áll a toborzásra Európában?',
    subtitle: 'Mondja el nekünk projektjét, és kapjon személyre szabott ajánlatot 24 órán belül.',
    benefits: [
      {
        icon: 'Users',
        title: 'Személyre szabott támogatás',
        description: 'Dedikált szakértő a projektjéhez',
      },
      {
        icon: 'ShieldCheck',
        title: 'Garantált megfelelés',
        description: 'Minden szabály betartása',
      },
      {
        icon: 'Globe',
        title: 'Európai lefedettség',
        description: '27 ország azonnal elérhető',
      },
      {
        icon: 'CheckCircle',
        title: 'Maximális reakcióidő',
        description: 'Válasz 24 munkaidőn belül',
      },
    ],
    form: {
      fields: {
        name: { label: 'Teljes név', placeholder: 'Nagy János' },
        email: { label: 'Üzleti email', placeholder: 'nagy.janos@ceg.hu' },
        phone: { label: 'Telefon', placeholder: '+36 1 234 5678' },
        company: { label: 'Cég', placeholder: 'Az Ön cégének neve' },
        needType: { label: 'Igény típusa', placeholder: 'Válasszon igény típust' },
        message: { label: 'Írja le igényét', placeholder: 'Mondja el nekünk európai toborzási projektjéről...' },
      },
      ctaLabel: 'Kérés elküldése',
      securityNote: '🔒 Az Ön adatai biztonságban vannak és soha nem lesznek megosztva.',
      successMessage: 'Köszönjük! 24 órán belül felvesszük Önnel a kapcsolatot.',
    },
  },

  footer: {
    logo: {
      tagline: 'Az Ön megbízható partnere az európai toborzáshoz',
    },
    columns: {
      services: {
        title: 'Szolgáltatások',
        links: [
          { label: 'Európai időszakos foglalkoztatás', href: '#interim' },
          { label: 'Specializált toborzás', href: '#recrutement' },
          { label: 'Tanácsadás és megfelelés', href: '#conseil' },
          { label: 'Munkavállalók kiküldetése', href: '#detachement' },
        ],
      },
      company: {
        title: 'Cég',
        links: [
          { label: 'Rólunk', href: '#about' },
          { label: 'Hálózatunk', href: '#reseau' },
          { label: 'Szektoraink', href: '#secteurs' },
          { label: 'Vélemények', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Kapcsolat',
        address: '123 Avenue de l\'Europe, 75001 Párizs, Franciaország',
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
      copyright: '© 2026 YOJOB. Minden jog fenntartva. Készült ❤️-tel Európában.',
      legalLinks: [
        { label: 'Jogi nyilatkozat', href: '#mentions' },
        { label: 'Adatvédelem', href: '#privacy' },
        { label: 'Feltételek', href: '#cgv' },
      ],
    },
  },
};
