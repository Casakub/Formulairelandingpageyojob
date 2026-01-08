/**
 * 🦶 FOOTER TRANSLATIONS - SERVICES PAGES
 * 
 * Traductions du footer pour les pages de services
 * 
 * @version 1.0.0
 */

export interface FooterTranslations {
  logo: {
    tagline: string;
  };
  columns: {
    services: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    company: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    contact: {
      title: string;
    };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  bottom: {
    copyright: string;
    links: {
      privacy: string;
      legal: string;
      terms: string;
    };
  };
}

export const footerTranslations: Record<'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'el' | 'sv' | 'da' | 'fi' | 'no', FooterTranslations> = {
  fr: {
    logo: {
      tagline: 'Leader du recrutement européen. 500+ agences partenaires dans 27 pays pour connecter les talents aux opportunités.'
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'Intérim Européen', href: '/services/interim-europeen' },
          { label: 'Recrutement Spécialisé', href: '/services/recrutement-specialise' },
          { label: 'Conseil & Conformité', href: '/services/conseil-conformite' },
          { label: 'Détachement de Personnel', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Entreprise',
        links: [
          { label: 'À propos', href: '/a-propos' },
          { label: 'Notre réseau', href: '/notre-reseau' },
          { label: 'Nos secteurs', href: '/nos-secteurs' },
          { label: 'Témoignages', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, France',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Tous droits réservés.',
      links: {
        privacy: 'Politique de confidentialité',
        legal: 'Mentions légales',
        terms: 'CGV'
      }
    }
  },
  en: {
    logo: {
      tagline: 'European recruitment leader. 500+ partner agencies in 27 countries connecting talents with opportunities.'
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'European Temporary Work', href: '/services/interim-europeen' },
          { label: 'Specialized Recruitment', href: '/services/recrutement-specialise' },
          { label: 'Consulting & Compliance', href: '/services/conseil-conformite' },
          { label: 'Staff Posting', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Company',
        links: [
          { label: 'About', href: '/a-propos' },
          { label: 'Our Network', href: '/notre-reseau' },
          { label: 'Our Sectors', href: '/nos-secteurs' },
          { label: 'Testimonials', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, France',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. All rights reserved.',
      links: {
        privacy: 'Privacy Policy',
        legal: 'Legal Notice',
        terms: 'Terms & Conditions'
      }
    }
  },
  de: {
    logo: {
      tagline: 'Europäischer Rekrutierungsführer. 500+ Partneragenturen in 27 Ländern verbinden Talente mit Chancen.'
    },
    columns: {
      services: {
        title: 'Dienstleistungen',
        links: [
          { label: 'Europäische Zeitarbeit', href: '/services/interim-europeen' },
          { label: 'Spezialisierte Rekrutierung', href: '/services/recrutement-specialise' },
          { label: 'Beratung & Compliance', href: '/services/conseil-conformite' },
          { label: 'Personalentsendung', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Unternehmen',
        links: [
          { label: 'Über uns', href: '/a-propos' },
          { label: 'Unser Netzwerk', href: '/notre-reseau' },
          { label: 'Unsere Branchen', href: '/nos-secteurs' },
          { label: 'Referenzen', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Frankreich',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Alle Rechte vorbehalten.',
      links: {
        privacy: 'Datenschutzrichtlinie',
        legal: 'Impressum',
        terms: 'AGB'
      }
    }
  },
  es: {
    logo: {
      tagline: 'Líder de reclutamiento europeo. 500+ agencias asociadas en 27 países conectando talentos con oportunidades.'
    },
    columns: {
      services: {
        title: 'Servicios',
        links: [
          { label: 'Trabajo Temporal Europeo', href: '/services/interim-europeen' },
          { label: 'Reclutamiento Especializado', href: '/services/recrutement-specialise' },
          { label: 'Consultoría & Cumplimiento', href: '/services/conseil-conformite' },
          { label: 'Envío de Personal', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Empresa',
        links: [
          { label: 'Acerca de', href: '/a-propos' },
          { label: 'Nuestra Red', href: '/notre-reseau' },
          { label: 'Nuestros Sectores', href: '/nos-secteurs' },
          { label: 'Testimonios', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contacto'
      }
    },
    contact: {
      address: 'Bordeaux, Francia',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Todos los derechos reservados.',
      links: {
        privacy: 'Política de Privacidad',
        legal: 'Aviso Legal',
        terms: 'Términos y Condiciones'
      }
    }
  },
  it: {
    logo: {
      tagline: 'Leader europeo di reclutamento. 500+ agenzie partner in 27 paesi che collegano talenti con opportunità.'
    },
    columns: {
      services: {
        title: 'Servizi',
        links: [
          { label: 'Lavoro Temporaneo Europeo', href: '/services/interim-europeen' },
          { label: 'Reclutamento Specializzato', href: '/services/recrutement-specialise' },
          { label: 'Consulenza & Conformità', href: '/services/conseil-conformite' },
          { label: 'Inviare Personale', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Azienda',
        links: [
          { label: 'Chi siamo', href: '/a-propos' },
          { label: 'La nostra rete', href: '/notre-reseau' },
          { label: 'I nostre settori', href: '/nos-secteurs' },
          { label: 'Testimonianze', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contatto'
      }
    },
    contact: {
      address: 'Bordeaux, Francia',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Tutti i diritti riservati.',
      links: {
        privacy: 'Politica sulla privacy',
        legal: 'Informazioni legali',
        terms: 'Condizioni generali di vendita'
      }
    }
  },
  nl: {
    logo: {
      tagline: 'Europese reclutering leider. 500+ partnerbureaus in 27 landen verbinden talenten met mogelijkheden.'
    },
    columns: {
      services: {
        title: 'Diensten',
        links: [
          { label: 'Europese Tijdelijke Werk', href: '/services/interim-europeen' },
          { label: 'Gespecialiseerde Reclutering', href: '/services/recrutement-specialise' },
          { label: 'Advies & Conformiteit', href: '/services/conseil-conformite' },
          { label: 'Personeelsverhuizing', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Bedrijf',
        links: [
          { label: 'Over ons', href: '/a-propos' },
          { label: 'Ons Netwerk', href: '/notre-reseau' },
          { label: 'Onze Sectoren', href: '/nos-secteurs' },
          { label: 'Referenties', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, Frankrijk',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Alle rechten voorbehouden.',
      links: {
        privacy: 'Privacybeleid',
        legal: 'Juridische informatie',
        terms: 'Algemene voorwaarden'
      }
    }
  },
  pt: {
    logo: {
      tagline: 'Líder de recrutamento europeu. 500+ agências parceiras em 27 países conectando talentos com oportunidades.'
    },
    columns: {
      services: {
        title: 'Serviços',
        links: [
          { label: 'Trabalho Temporário Europeu', href: '/services/interim-europeen' },
          { label: 'Recrutamento Especializado', href: '/services/recrutement-specialise' },
          { label: 'Consultoria & Conformidade', href: '/services/conseil-conformite' },
          { label: 'Envio de Pessoal', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Empresa',
        links: [
          { label: 'Sobre nós', href: '/a-propos' },
          { label: 'Nossa Rede', href: '/notre-reseau' },
          { label: 'Nossos Setores', href: '/nos-secteurs' },
          { label: 'Depoimentos', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contato'
      }
    },
    contact: {
      address: 'Bordeaux, França',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Todos os direitos reservados.',
      links: {
        privacy: 'Política de Privacidade',
        legal: 'Aviso Legal',
        terms: 'Termos e Condições'
      }
    }
  },
  pl: {
    logo: {
      tagline: 'Lider rekrutacji europejskiej. 500+ partnerów w 27 krajach łączących talenty z okazjami.'
    },
    columns: {
      services: {
        title: 'Usługi',
        links: [
          { label: 'Tymczasowa Praca Europejska', href: '/services/interim-europeen' },
          { label: 'Specjalistyczne Rekrutowanie', href: '/services/recrutement-specialise' },
          { label: 'Konsultacje & Zgodność', href: '/services/conseil-conformite' },
          { label: 'Wysyłanie Personelu', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Firma',
        links: [
          { label: 'O nas', href: '/a-propos' },
          { label: 'Nasza Sieć', href: '/notre-reseau' },
          { label: 'Nasze Sektory', href: '/nos-secteurs' },
          { label: 'Referencje', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Francja',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Wszelkie prawa zastrzeżone.',
      links: {
        privacy: 'Polityka prywatności',
        legal: 'Informacje prawne',
        terms: 'Warunki i zasady'
      }
    }
  },
  cs: {
    logo: {
      tagline: 'Evropský vedečí v oblasti rekrutace. 500+ partnerů v 27 zemích spojujících talenty s příležitostmi.'
    },
    columns: {
      services: {
        title: 'Služby',
        links: [
          { label: 'Evropská dočasné práce', href: '/services/interim-europeen' },
          { label: 'Specializované rekrutace', href: '/services/recrutement-specialise' },
          { label: 'Poradenství & Dodržování předpisů', href: '/services/conseil-conformite' },
          { label: 'Odesílání personálu', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Společnost',
        links: [
          { label: 'O nás', href: '/a-propos' },
          { label: 'Naše síť', href: '/notre-reseau' },
          { label: 'Naše odvětví', href: '/nos-secteurs' },
          { label: 'Reference', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Francie',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Všechna práva vyhrazena.',
      links: {
        privacy: 'Zásady ochrany soukromí',
        legal: 'Právní informace',
        terms: 'Obecné podmínky'
      }
    }
  },
  sk: {
    logo: {
      tagline: 'Európsky vodca rekrutácie. 500+ partnerov v 27 krajoch spojujúcich talenty s príležitosťami.'
    },
    columns: {
      services: {
        title: 'Služby',
        links: [
          { label: 'Európska dočasná práca', href: '/services/interim-europeen' },
          { label: 'Špecializovaná rekrutácia', href: '/services/recrutement-specialise' },
          { label: 'Poradenstvo & Dodržanie predpisov', href: '/services/conseil-conformite' },
          { label: 'Odoslanie personálu', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Spoločnosť',
        links: [
          { label: 'O nás', href: '/a-propos' },
          { label: 'Naše sieť', href: '/notre-reseau' },
          { label: 'Naše odvetvia', href: '/nos-secteurs' },
          { label: 'Referencie', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Francúzsko',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Všetky práva vyhradené.',
      links: {
        privacy: 'Zásady ochrany súkromia',
        legal: 'Právne informácie',
        terms: 'Obecné podmienky'
      }
    }
  },
  hu: {
    logo: {
      tagline: 'Európai rekrutációs vezető. 500+ partnerügynökség 27 országban, amelyek összekapcsolják a talentumokat az alkalmazkodási lehetőségekkel.'
    },
    columns: {
      services: {
        title: 'Szolgáltatások',
        links: [
          { label: 'Európai ideiglenes munka', href: '/services/interim-europeen' },
          { label: 'Specializált rekrutálás', href: '/services/recrutement-specialise' },
          { label: 'Tanácsadás & Megfelelőség', href: '/services/conseil-conformite' },
          { label: 'Személyzet áthelyezése', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Cég',
        links: [
          { label: 'Rólunk', href: '/a-propos' },
          { label: 'Hálózatunk', href: '/notre-reseau' },
          { label: 'Szektoraink', href: '/nos-secteurs' },
          { label: 'Referenciák', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kapcsolat'
      }
    },
    contact: {
      address: 'Bordeaux, Francia',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Minden jog fenntartva.',
      links: {
        privacy: 'Adatvédelmi szabályzat',
        legal: 'Jogi információk',
        terms: 'Általános feltételek'
      }
    }
  },
  ro: {
    logo: {
      tagline: 'Liderul european de recrutare. 500+ agenții partener în 27 țări conectând talente cu oportunități.'
    },
    columns: {
      services: {
        title: 'Servicii',
        links: [
          { label: 'Muncă Temporară Europeană', href: '/services/interim-europeen' },
          { label: 'Recrutare Specializată', href: '/services/recrutement-specialise' },
          { label: 'Consultanță & Conformitate', href: '/services/conseil-conformite' },
          { label: 'Trimitere de Personal', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Companie',
        links: [
          { label: 'Despre noi', href: '/a-propos' },
          { label: 'Rețeaua noastră', href: '/notre-reseau' },
          { label: 'Sectoarele noastre', href: '/nos-secteurs' },
          { label: 'Testimoniale', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, Franța',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Toate drepturile rezervate.',
      links: {
        privacy: 'Politica de confidențialitate',
        legal: 'Informații legale',
        terms: 'Termeni și condiții'
      }
    }
  },
  bg: {
    logo: {
      tagline: 'Лидер на рекрутването в Европа. 500+ партньорски агенции в 27 държави, свързвайки таланти с възможности.'
    },
    columns: {
      services: {
        title: 'Услуги',
        links: [
          { label: 'Европейска временна работа', href: '/services/interim-europeen' },
          { label: 'Специализирано рекрутване', href: '/services/recrutement-specialise' },
          { label: 'Консултации & Съответствие', href: '/services/conseil-conformite' },
          { label: 'Пращане на персонал', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Компания',
        links: [
          { label: 'За нас', href: '/a-propos' },
          { label: 'Нашата мрежа', href: '/notre-reseau' },
          { label: 'Нашите сектори', href: '/nos-secteurs' },
          { label: 'Референции', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Контакт'
      }
    },
    contact: {
      address: 'Бордо, Франция',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Всички права запазени.',
      links: {
        privacy: 'Политика за поверителност',
        legal: 'Юридична информация',
        terms: 'Общи условия'
      }
    }
  },
  hr: {
    logo: {
      tagline: 'Vodeći rekruter u Europi. 500+ partnera u 27 zemlji povezujući talente s prilikama.'
    },
    columns: {
      services: {
        title: 'Usluge',
        links: [
          { label: 'Europski privremeni rad', href: '/services/interim-europeen' },
          { label: 'Specijalizirano rekrutiranje', href: '/services/recrutement-specialise' },
          { label: 'Savjetovanje & Pridržavanje', href: '/services/conseil-conformite' },
          { label: 'Slanje osoblja', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Tvrtka',
        links: [
          { label: 'O nama', href: '/a-propos' },
          { label: 'Naša mreža', href: '/notre-reseau' },
          { label: 'Naše sektore', href: '/nos-secteurs' },
          { label: 'Referenca', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Francuska',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Sva prava pridržana.',
      links: {
        privacy: 'Politika privatnosti',
        legal: 'Pravne informacije',
        terms: 'Opći uvjeti'
      }
    }
  },
  sl: {
    logo: {
      tagline: 'Voditelj evropskega rekrutiranja. 500+ partnerjev v 27 državah, ki povezujejo talente z priložnostmi.'
    },
    columns: {
      services: {
        title: 'Storitve',
        links: [
          { label: 'Evropsko začasno delo', href: '/services/interim-europeen' },
          { label: 'Posebno rekrutiranje', href: '/services/recrutement-specialise' },
          { label: 'Svetovanje & Skladnost', href: '/services/conseil-conformite' },
          { label: 'Oddajanje osebja', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Podjetje',
        links: [
          { label: 'O nas', href: '/a-propos' },
          { label: 'Naša omrežje', href: '/notre-reseau' },
          { label: 'Naše sektorje', href: '/nos-secteurs' },
          { label: 'Referenčne opise', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Francija',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Vsa pravica pridržana.',
      links: {
        privacy: 'Politika zasebnosti',
        legal: 'Pravne informacije',
        terms: 'Splošni pogoji'
      }
    }
  },
  et: {
    logo: {
      tagline: 'Eesti rekrutimise juhataja. 500+ partneriüksust 27 riigis, mis ühendavad talente võimalustega.'
    },
    columns: {
      services: {
        title: 'Teenused',
        links: [
          { label: 'Eesti ajutine töö', href: '/services/interim-europeen' },
          { label: 'Spetsialiseeritud rekrutimine', href: '/services/recrutement-specialise' },
          { label: 'Nõustus & Vastavolu', href: '/services/conseil-conformite' },
          { label: 'Töötajate saatmine', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Ettevõte',
        links: [
          { label: 'Meist', href: '/a-propos' },
          { label: 'Meie võrk', href: '/notre-reseau' },
          { label: 'Meie sektorid', href: '/nos-secteurs' },
          { label: 'Tutvustused', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Prantsusmaa',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Kõik õigused kaitstud.',
      links: {
        privacy: 'Yksityisuse poliitika',
        legal: 'Juriidilised andmed',
        terms: 'Üldtingimused'
      }
    }
  },
  lv: {
    logo: {
      tagline: 'Eiropas rekrūtēšanas līderis. 500+ partneru aģentūras 27 valstīs, kas savieno talentus ar iespējām.'
    },
    columns: {
      services: {
        title: 'Pakalpojumi',
        links: [
          { label: 'Eiropas laikam darbam', href: '/services/interim-europeen' },
          { label: 'Speciālizēts rekrūtēšana', href: '/services/recrutement-specialise' },
          { label: 'Konsultācijas & Atbilstība', href: '/services/conseil-conformite' },
          { label: 'Personāla pārsūtīšana', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Uzņēmums',
        links: [
          { label: 'Par mums', href: '/a-propos' },
          { label: 'Mūsų tīkls', href: '/notre-reseau' },
          { label: 'Mūsų sektori', href: '/nos-secteurs' },
          { label: 'Atsauksmes', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakts'
      }
    },
    contact: {
      address: 'Bordeaux, Francija',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Visas tiesības aizsargātas.',
      links: {
        privacy: 'Privātuma politika',
        legal: 'Juridiskā informācija',
        terms: 'Galvenie nosacījumi'
      }
    }
  },
  lt: {
    logo: {
      tagline: 'Europos rekrutavimo lyderis. 500+ partnerių agentūrų 27 šalyse, susiejantys talentus su galimybėmis.'
    },
    columns: {
      services: {
        title: 'Paslaugos',
        links: [
          { label: 'Europos laikinosios darbo', href: '/services/interim-europeen' },
          { label: 'Specializuotas rekrutavimas', href: '/services/recrutement-specialise' },
          { label: 'Konsultacijos & Atitikimas', href: '/services/conseil-conformite' },
          { label: 'Personalo perveikimas', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Kompanija',
        links: [
          { label: 'Apie mus', href: '/a-propos' },
          { label: 'Mūsų tinklas', href: '/notre-reseau' },
          { label: 'Mūsų sektoriai', href: '/nos-secteurs' },
          { label: 'Atsiliepimai', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontaktas'
      }
    },
    contact: {
      address: 'Bordeaux, Prancūzija',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Visos teisės saugomos.',
      links: {
        privacy: 'Privatumo politika',
        legal: 'Teisinė informacija',
        terms: 'Bendrai sąlygos'
      }
    }
  },
  el: {
    logo: {
      tagline: 'Ευρωπαϊκός οδηγός απασχόλησης. 500+ συνεργάτες εταιρειών σε 27 χώρες συνδέοντας τέχνες με ευκαιρίες.'
    },
    columns: {
      services: {
        title: 'Υπηρεσίες',
        links: [
          { label: 'Ευρωπαϊκή Προσωρινή Εργασία', href: '/services/interim-europeen' },
          { label: 'Ειδικευμένη Απασχόληση', href: '/services/recrutement-specialise' },
          { label: 'Συμβουλευτική & Συμφωνία', href: '/services/conseil-conformite' },
          { label: 'Αποστολή Προσωπικού', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Εταιρεία',
        links: [
          { label: 'Σχετικά μας', href: '/a-propos' },
          { label: 'Το Δίκτυο μας', href: '/notre-reseau' },
          { label: 'Τα Τομείδια μας', href: '/nos-secteurs' },
          { label: 'Αναφορές', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Επικοινωνία'
      }
    },
    contact: {
      address: 'Βόρδο, Γαλλία',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Όλα τα δικαιώματα διατηρούνται.',
      links: {
        privacy: 'Πολιτική Απορρήτου',
        legal: 'Νομικές Πληροφορίες',
        terms: 'Ορισμοί Κατανάλωσης'
      }
    }
  },
  sv: {
    logo: {
      tagline: 'Ledare inom europeisk rekrytering. 500+ partnerbyråer i 27 länder som kopplar ihop talanger med möjligheter.'
    },
    columns: {
      services: {
        title: 'Tjänster',
        links: [
          { label: 'Europeisk temporär arbete', href: '/services/interim-europeen' },
          { label: 'Specialiserad rekrytering', href: '/services/recrutement-specialise' },
          { label: 'Rådgivning & Konformitet', href: '/services/conseil-conformite' },
          { label: 'Personalförflyttning', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Företag',
        links: [
          { label: 'Om oss', href: '/a-propos' },
          { label: 'Vår nätverk', href: '/notre-reseau' },
          { label: 'Våra sektorer', href: '/nos-secteurs' },
          { label: 'Referenser', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Frankrike',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Alla rättigheter reserverade.',
      links: {
        privacy: 'Integritetspolicy',
        legal: 'Juridisk information',
        terms: 'Allmänna villkor'
      }
    }
  },
  da: {
    logo: {
      tagline: 'Ledende i europæisk rekruttering. 500+ partnerbyråer i 27 lande, der forbinder talent med muligheder.'
    },
    columns: {
      services: {
        title: 'Tjenester',
        links: [
          { label: 'Europæisk midlertidig arbejde', href: '/services/interim-europeen' },
          { label: 'Specialiseret rekruttering', href: '/services/recrutement-specialise' },
          { label: 'Rådgivning & Overholdelse', href: '/services/conseil-conformite' },
          { label: 'Personaleudsendelse', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Virksomhed',
        links: [
          { label: 'Om os', href: '/a-propos' },
          { label: 'Vores netværk', href: '/notre-reseau' },
          { label: 'Vores sektorer', href: '/nos-secteurs' },
          { label: 'Referencer', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Frankrig',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Alle rettigheder reserveret.',
      links: {
        privacy: 'Privatlivspolitik',
        legal: 'Juridisk information',
        terms: 'Generelle vilkår'
      }
    }
  },
  fi: {
    logo: {
      tagline: 'Euroopan rekrytointinopeuttaja. 500+ partneriyhtiötä 27 maassa yhdistäen taidot mahdollisuuksiin.'
    },
    columns: {
      services: {
        title: 'Palvelut',
        links: [
          { label: 'Eurooppalainen väliaikainen työ', href: '/services/interim-europeen' },
          { label: 'Erikoistunut rekrytointi', href: '/services/recrutement-specialise' },
          { label: 'Neuvonta & Määräytelmä', href: '/services/conseil-conformite' },
          { label: 'Henkilöstön siirtäminen', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Yritys',
        links: [
          { label: 'Meistä', href: '/a-propos' },
          { label: 'Verkostemme', href: '/notre-reseau' },
          { label: 'Alamme', href: '/nos-secteurs' },
          { label: 'Viitteet', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Yhteystiedot'
      }
    },
    contact: {
      address: 'Bordeaux, Ranska',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Kaikki oikeudet pidätetään.',
      links: {
        privacy: 'Yksityisyyspolitiikka',
        legal: 'Lainsäädännölliset tiedot',
        terms: 'Yleiset ehdot'
      }
    }
  },
  no: {
    logo: {
      tagline: 'Ledende i europeisk rekrytering. 500+ partnerbyråer i 27 land, som kobler sammen talent med muligheter.'
    },
    columns: {
      services: {
        title: 'Tjenester',
        links: [
          { label: 'Europeisk midlertidig arbeid', href: '/services/interim-europeen' },
          { label: 'Spesialisert rekrytering', href: '/services/recrutement-specialise' },
          { label: 'Rådgivning & Overholdelse', href: '/services/conseil-conformite' },
          { label: 'Personalflytting', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Bedrift',
        links: [
          { label: 'Om oss', href: '/a-propos' },
          { label: 'Vårt nettverk', href: '/notre-reseau' },
          { label: 'Våre sektorer', href: '/nos-secteurs' },
          { label: 'Referanser', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Kontakt'
      }
    },
    contact: {
      address: 'Bordeaux, Frankrike',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Alle rettigheter reservert.',
      links: {
        privacy: 'Personvernspolitikk',
        legal: 'Juridisk informasjon',
        terms: 'Generelle vilkår'
      }
    }
  }
};