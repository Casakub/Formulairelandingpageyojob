/**
 * 🇷🇴 TRADUCERI ROMÂNĂ - PAGINA POLITICĂ DE CONFIDENȚIALITATE
 * 
 * @version 1.0.0
 */

export const privacyRO = {
  hero: {
    badge: "Politica de confidențialitate",
    title: "Protecția datelor dumneavoastră personale",
    subtitle: "La {company}, ne angajăm să protejăm și să respectăm confidențialitatea dumneavoastră în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).",
    lastUpdate: "Ultima actualizare:"
  },

  dpo: {
    title: "Responsabil cu Protecția Datelor (DPO)",
    subtitle: "Contactul dumneavoastră privilegiat pentru întrebările legate de datele dumneavoastră"
  },

  sections: {
    dataController: {
      title: "1. Operatorul de Date",
      intro: "Operatorul datelor cu caracter personal este:",
      location: "Bordeaux, Franța",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Date Personale Colectate",
      intro: "În cadrul serviciilor noastre europene de recrutare, colectăm următoarele date:",
      items: [
        {
          label: "Date de identificare:",
          description: "Nume, prenume, e-mail, telefon"
        },
        {
          label: "Date profesionale:",
          description: "Companie, funcție, sector de activitate"
        },
        {
          label: "Date de contact:",
          description: "Adresă poștală, preferințe de comunicare"
        },
        {
          label: "Date de navigare:",
          description: "Cookie-uri, adresă IP, date de conexiune"
        }
      ]
    },

    purposes: {
      title: "3. Scopurile Prelucrării",
      intro: "Datele dumneavoastră sunt colectate și prelucrate în următoarele scopuri:",
      items: [
        {
          title: "Gestionarea solicitărilor de recrutare",
          description: "Procesarea cererilor dumneavoastră de ofertă și conectarea cu rețeaua noastră de agenții partenere."
        },
        {
          title: "Îmbunătățirea serviciilor noastre",
          description: "Analiza utilizării serviciilor noastre pentru îmbunătățirea experienței dumneavoastră."
        },
        {
          title: "Comunicare comercială",
          description: "Informarea despre noile noastre servicii și marketplace-ul nostru european (cu consimțământul dumneavoastră)."
        }
      ]
    },

    legalBasis: {
      title: "4. Baza Legală a Prelucrării",
      intro: "Prelucrarea datelor dumneavoastră se bazează pe următoarele temeiuri juridice:",
      items: [
        {
          basis: "Executarea contractului",
          description: "Prelucrare necesară pentru răspunsul la solicitările dumneavoastră de recrutare"
        },
        {
          basis: "Consimțământ",
          description: "Pentru trimiterea de comunicări de marketing (puteți retrage consimțământul oricând)"
        },
        {
          basis: "Interest legitim",
          description: "Îmbunătățirea serviciilor noastre și securitatea platformei noastre"
        }
      ]
    },

    retention: {
      title: "5. Durata de Păstrare",
      intro: "Păstrăm datele dumneavoastră personale pentru următoarele perioade:",
      items: [
        {
          period: "3 ani",
          description: "Date ale potențialilor clienți și clienți"
        },
        {
          period: "13 luni",
          description: "Cookie-uri și date de navigare"
        },
        {
          period: "5 ani",
          description: "Documente contabile și fiscale"
        },
        {
          period: "{days} zile",
          description: "Date din formulare (configurabil)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Drepturile Dumneavoastră",
      intro: "Conform GDPR, beneficiați de următoarele drepturi:",
      items: [
        {
          title: "Dreptul de acces",
          description: "Obținerea unei copii a datelor dumneavoastră personale"
        },
        {
          title: "Dreptul de rectificare",
          description: "Corectarea datelor incorecte sau incomplete"
        },
        {
          title: "Dreptul la ștergere",
          description: "Solicitarea ștergerii datelor dumneavoastră"
        },
        {
          title: "Dreptul la restricționare",
          description: "Restricționarea prelucrării datelor dumneavoastră"
        },
        {
          title: "Dreptul la portabilitate",
          description: "Primirea datelor dumneavoastră într-un format structurat"
        },
        {
          title: "Dreptul de opoziție",
          description: "Opoziție la prelucrarea datelor dumneavoastră"
        }
      ],
      footer: "Pentru exercitarea drepturilor dumneavoastră, contactați DPO-ul nostru la"
    },

    security: {
      title: "7. Securitatea Datelor",
      intro: "Implementăm măsuri tehnice și organizatorice adecvate de securitate:",
      measures: [
        "Criptarea datelor în tranzit și în repaus (SSL/TLS)",
        "Acces limitat la date cu autentificare puternică",
        "Backup-uri regulate și plan de continuitate a activității",
        "Audituri de securitate și actualizări regulate",
        "Formare a personalului pe cele mai bune practici GDPR"
      ]
    },

    transfers: {
      title: "8. Transferuri de Date",
      intro: "În cadrul rețelei noastre europene de peste 500 de agenții partenere în 27 de țări:",
      eu: {
        title: "🇪🇺 În cadrul Uniunii Europene",
        description: "Datele dumneavoastră pot fi transferate către agențiile noastre partenere situate în UE/SEE, care beneficiază de același nivel de protecție GDPR."
      },
      nonEu: {
        title: "🌍 În afara Uniunii Europene",
        description: "În cazul transferurilor în afara UE, utilizăm Clauzele Contractuale Standard (SCC) ale Comisiei Europene pentru a asigura un nivel adecvat de protecție."
      }
    },

    cookies: {
      title: "9. Cookie-uri și Mecanisme de Urmărire",
      intro: "Site-ul nostru utilizează cookie-uri pentru îmbunătățirea experienței dumneavoastră de navigare:",
      types: [
        {
          type: "Cookie-uri esențiale",
          description: "Indispensabile pentru funcționarea site-ului (sesiune, securitate)",
          required: true
        },
        {
          type: "Cookie-uri analitice",
          description: "Măsurarea traficului și statistici",
          required: false
        },
        {
          type: "Cookie-uri de marketing",
          description: "Publicitate țintită și personalizare",
          required: false
        }
      ],
      footer: "Puteți gestiona preferințele dumneavoastră privind cookie-urile oricând în setările browser-ului."
    },

    contact: {
      title: "10. Contact și Reclamație",
      intro: "Pentru orice întrebare privind prelucrarea datelor dumneavoastră personale:",
      dpoCard: {
        title: "Contactați DPO-ul nostru"
      },
      cnilCard: {
        title: "Autoritate de supraveghere",
        name: "CNIL (Franța)"
      },
      footer: "Dacă considerați că drepturile dumneavoastră nu sunt respectate, aveți dreptul de a depune o reclamație la Comisia Națională pentru Informatică și Libertăți (CNIL)."
    }
  },

  cta: {
    title: "Datele dumneavoastră în mâini sigure",
    description: "Protecția datelor dumneavoastră personale este prioritatea noastră. Ne angajăm să respectăm GDPR și să garantăm securitatea informațiilor dumneavoastră.",
    backHome: "Înapoi la pagina principală",
    contactDpo: "Contactați DPO"
  },

  badges: {
    required: "Obligatoriu",
    optional: "Opțional"
  }
};
