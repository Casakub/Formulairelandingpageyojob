import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇨🇿 YOJOB Landing Page Content - Čeština
 * Profesionální překlad z francouzštiny
 */

export const landingContentCS: LandingPageContent = {
  language: 'cs',
  
  seo: {
    metaTitle: 'YOJOB - Evropská platforma pro vyslání pracovníků | 27 zemí',
    metaDescription: 'Centralizujte své evropské procedury vyslání. Zabezpečený digitální trezor, online administrativní procedury a správa pracovních nabídek. 500+ partnerských agentur ve 27 zemích.',
    slug: '/',
    h1: 'Vaše vše-v-jednom platforma pro evropské vyslání',
    ogTitle: 'YOJOB - Zjednodušené vyslání pracovníků v Evropě',
    ogDescription: 'Spravujte své procedury vyslání s YOJOB: garantovaná shoda, 500+ partnerských agentur, 27 evropských zemí.',
    altTexts: {
      heroVisual: 'Interaktivní mapa Evropy zobrazující síť YOJOB s 500+ agenturami ve 27 zemích',
      europeMap: 'Mapa Evropy se 27 zeměmi pokrytými YOJOB',
      logoFooter: 'Logo YOJOB - Evropská platforma pro vyslání',
    },
    aiSummary: 'YOJOB je evropská platforma specializující se na vyslání pracovníků. Centralizuje všechny dokumenty a administrativní procedury v zabezpečeném digitálním trezoru. Společnosti mohou spravovat pracovní nabídky, připravovat složky vyslání a zajistit právní soulad ve 27 evropských zemích prostřednictvím sítě 500+ partnerských agentur.',
    faq: [
      {
        question: 'Co je YOJOB?',
        answer: 'YOJOB je evropská platforma pro zprostředkování náboru a správu vyslání pracovníků. Spojujeme společnosti s více než 500 partnerskými agenturami ve 27 evropských zemích.',
      },
      {
        question: 'Ve kterých zemích YOJOB působí?',
        answer: 'YOJOB pokrývá 27 evropských zemí: Francie, Německo, Španělsko, Itálie, Polsko, Rumunsko, Nizozemsko, Belgie, Portugalsko, Česká republika, Maďarsko, Švédsko, Rakousko, Bulharsko, Dánsko, Finsko, Slovensko, Irsko, Chorvatsko, Litva, Slovinsko, Lotyšsko, Estonsko, Kypr, Lucembursko, Malta a Řecko.',
      },
      {
        question: 'Jak funguje digitální trezor?',
        answer: 'Náš digitální trezor centralizuje všechny vaše dokumenty vyslání (A1, smlouvy, doklady) v zabezpečeném prostoru přístupném 24/7.',
      },
      {
        question: 'Zaručuje YOJOB právní soulad?',
        answer: 'Ano, YOJOB integruje evropské předpisy o vyslání pracovníků. Naše platforma vás provede povinnými procedurami.',
      },
      {
        question: 'Jak mohu zveřejnit pracovní nabídku na YOJOB?',
        answer: 'Od roku 2026 budete moci zveřejňovat své pracovní nabídky přímo na našem marketplace.',
      },
      {
        question: 'Kolik stojí platforma YOJOB?',
        answer: 'YOJOB nabízí různé balíčky přizpůsobené vašim potřebám. Kontaktujte nás pro personalizovanou nabídku.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Domů',
      services: 'Služby',
      network: 'Naše síť',
      contact: 'Kontakt',
    },
    cta: 'Požádat o nabídku',
  },

  hero: {
    badge: '⭐ Lídr v evropském náboru',
    title: 'Váš partner pro nábor v Evropě',
    subtitle: 'Přístup k síti 500+ pracovních agentur ve 27 zemích. Zjednodušte si evropský nábor s zkušeným a důvěryhodným zprostředkovatelem.',
    benefits: [
      'Centralizované a zabezpečené složky',
      'Online administrativní procedury',
      'Správa pracovních nabídek',
      'Vícestátní shoda',
    ],
    ctaPrimaryLabel: 'Požádat o nabídku',
    ctaSecondaryLabel: 'Objevte síť',
    stats: {
      agencies: { value: '500+', label: 'partnerských agentur' },
      countries: { value: '27', label: 'evropských zemí' },
      missions: { value: '2000+', label: 'úspěšných misí' },
    },
    floatingCards: {
      since: { label: 'Od', value: '2014' },
      expertise: { value: '10 let', label: 'Vedoucí odbornosti' },
      partners: { label: 'Partneři', value: '500+ certifikovaných agentur' },
      countries: { value: '27', label: 'Evropských zemí' },
      certified: { value: '500+', label: 'Certifikovaných agentur' },
      activeNetwork: 'Aktivní síť',
    },
  },

  stats: {
    badge: '📊 Naše klíčové údaje',
    title: 'Uznávaná odbornost v Evropě',
    items: [
      { value: '10+', label: 'let zkušeností', icon: 'Target' },
      { value: '27', label: 'pokrytých zemí', icon: 'Globe' },
      { value: '500+', label: 'partnerských agentur', icon: 'Network' },
      { value: '2000+', label: 'realizovaných misí', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Naše služby',
    title: 'Řešení přizpůsobená vašim potřebám',
    subtitle: 'Doprovázíme vás ve všech vašich evropských náborových procedurách.',
    services: [
      {
        icon: 'Users',
        title: 'Evropská agenturní zaměstnání',
        description: 'Nábor dočasného personálu v celé Evropě s úplnou správou formalit.',
        linkLabel: 'Zjistit více',
      },
      {
        icon: 'Target',
        title: 'Specializovaný nábor',
        description: 'Najděte talenty, které potřebujete, díky naší síti odvětvových expertů.',
        linkLabel: 'Zjistit více',
      },
      {
        icon: 'ShieldCheck',
        title: 'Poradenství a shoda',
        description: 'Ujistěte se, že dodržujete všechny evropské předpisy o vyslání.',
        linkLabel: 'Zjistit více',
      },
    ],
  },

  network: {
    badge: '🌍 Evropská síť',
    title: 'Síť pokrývající celou Evropu',
    subtitle: 'Více než 500 partnerských agentur ve 27 zemích pro splnění všech vašich náborových potřeb.',
    mapLabel: 'partnerských agentur',
    waitlist: {
      badge: '✨ Novinka 2026',
      title: 'Vaše vše-v-jednom platforma pro evropské vyslání',
      subtitle: 'Centralizujte všechny své dokumenty a údaje o vyslání v zabezpečeném prostoru. Provádějte své administrativní procedury přímo online a spravujte své pracovní nabídky z jednoho rozhraní.',
      features: [
        'Centralizované a zabezpečené složky',
        'Online administrativní procedury',
        'Správa pracovních nabídek',
        'Vícestátní shoda',
      ],
      formTitle: 'Buďte mezi prvními!',
      formSubtitle: 'Zaregistrujte se na čekací listinu a získejte prioritní přístup',
      emailPlaceholder: 'Vaše profesionální e-mailová adresa',
      ctaLabel: 'Připojit se k čekací listině',
      securityNote: '🔒 Vaše údaje jsou zabezpečené a nikdy nebudou sdíleny.',
      successMessage: 'Děkujeme! Jste na čekací listině.',
    },
  },

  steps: {
    badge: '🎯 Jak to funguje',
    title: 'Jednoduchý a efektivní proces',
    subtitle: 'Ve 4 krocích najděte talenty, které potřebujete v celé Evropě.',
    steps: [
      {
        number: '01',
        title: 'Popište svou potřebu',
        description: 'Sdělte nám své náborové potřeby: profily, dovednosti, umístění a trvání.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktivujeme naši síť',
        description: 'Naše partnerské agentury v celé Evropě hledají nejlepší kandidáty pro vás.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Schvalte kandidáty',
        description: 'Předložíme vám výběr kvalifikovaných profilů, které můžete vyhodnotit.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Přivítejte svůj tým',
        description: 'Spravujeme všechny administrativní formality, abyste se mohli soustředit na podstatu.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Reference',
    title: 'Důvěřují nám',
    subtitle: 'Objevte zpětnou vazbu našich klientů z celé Evropy.',
    testimonials: [
      {
        name: 'Jan Novák',
        position: 'HR ředitel',
        company: 'Stavebnictví Česko',
        quote: 'YOJOB nám umožnil najmout 50 kvalifikovaných pracovníků v Polsku za pouhé 3 týdny. Významná úspora času a bezchybná administrativní správa.',
        rating: 5,
        sector: 'Stavebnictví',
      },
      {
        name: 'Marie Nováková',
        position: 'Vedoucí mobility',
        company: 'IndusTech Německo',
        quote: 'Evropská síť YOJOB je působivá. Podařilo se nám rozšířit naše operace do 5 zemí s odbornou podporou v každém kroku.',
        rating: 5,
        sector: 'Průmysl',
      },
      {
        name: 'Antonio Silva',
        position: 'Výkonný ředitel',
        company: 'AgriPro Portugalsko',
        quote: 'Konečně řešení, které skutečně zjednodušuje přeshraniční nábor. Garantovaná shoda a dodržené termíny.',
        rating: 5,
        sector: 'Zemědělství',
      },
    ],
  },

  sectors: {
    badge: '🏭 Odvětví činnosti',
    title: 'Působíme ve všech odvětvích',
    subtitle: 'Naše odbornost pokrývá všechna evropská odvětví činnosti.',
    sectors: [
      { icon: 'Building2', name: 'Stavebnictví a práce', color: 'orange' },
      { icon: 'Factory', name: 'Průmysl a logistika', color: 'blue' },
      { icon: 'Tractor', name: 'Zemědělství a vinařství', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Pohostinství a restaurace', color: 'red' },
      { icon: 'Heart', name: 'Zdravotnictví a medicína', color: 'pink' },
      { icon: 'Laptop', name: 'Služby a IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Kontaktujte nás',
    title: 'Jste připraveni nabírat v Evropě?',
    subtitle: 'Řekněte nám o svém projektu a získejte personalizovanou nabídku do 24 hodin.',
    benefits: [
      {
        icon: 'Users',
        title: 'Personalizovaný doprovod',
        description: 'Vyhrazený expert pro váš projekt',
      },
      {
        icon: 'ShieldCheck',
        title: 'Garantovaná shoda',
        description: 'Dodržování všech předpisů',
      },
      {
        icon: 'Globe',
        title: 'Evropské pokrytí',
        description: '27 zemí okamžitě dostupných',
      },
      {
        icon: 'CheckCircle',
        title: 'Maximální reaktivita',
        description: 'Odpověď do 24 pracovních hodin',
      },
    ],
    form: {
      fields: {
        name: { label: 'Celé jméno', placeholder: 'Jan Novák' },
        email: { label: 'Profesionální e-mail', placeholder: 'jan.novak@firma.cz' },
        phone: { label: 'Telefon', placeholder: '+420 123 456 789' },
        company: { label: 'Společnost', placeholder: 'Název vaší společnosti' },
        needType: { label: 'Typ potřeby', placeholder: 'Vyberte typ potřeby' },
        message: { label: 'Popište svou potřebu', placeholder: 'Řekněte nám o svém evropském náborovém projektu...' },
      },
      ctaLabel: 'Odeslat žádost',
      securityNote: '🔒 Vaše údaje jsou zabezpečené a nikdy nebudou sdíleny.',
      successMessage: 'Děkujeme! Ozveme se vám do 24 hodin.',
    },
  },

  footer: {
    logo: {
      tagline: 'Váš důvěryhodný partner pro evropský nábor',
    },
    columns: {
      services: {
        title: 'Služby',
        links: [
          { label: 'Evropská agenturní zaměstnání', href: '/services/interim-europeen' },
          { label: 'Specializovaný nábor', href: '/services/recrutement-specialise' },
          { label: 'Poradenství a shoda', href: '/services/conseil-conformite' },
          { label: 'Vyslání pracovníků', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Společnost',
        links: [
          { label: 'O nás', href: '#about' },
          { label: 'Naše síť', href: '#reseau' },
          { label: 'Naše odvětví', href: '#secteurs' },
          { label: 'Reference', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Kontakt',
        address: '123 Avenue de l\'Europe, 75001 Paříž, Francie',
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
      copyright: '© 2026 YOJOB. Všechna práva vyhrazena. Vytvořeno s ❤️ v Evropě.',
      legalLinks: [
        { label: 'Právní upozornění', href: '#mentions' },
        { label: 'Soukromí', href: '#privacy' },
        { label: 'Podmínky', href: '#cgv' },
      ],
    },
  },
};