/**
 * 🇱🇻 LATVIEŠU TULKOJUMI - PRIVĀTUMA POLITIKAS LAPA
 * 
 * @version 1.0.0
 */

export const privacyLV = {
  hero: {
    badge: "Privātuma politika",
    title: "Jūsu personas datu aizsardzība",
    subtitle: "{company} mēs esam apņēmušies aizsargāt un ievērot jūsu privātumu atbilstoši Vispārīgajai datu aizsardzības regulai (GDPR).",
    lastUpdate: "Pēdējo reizi atjaunināts:"
  },

  dpo: {
    title: "Datu aizsardzības speciālists (DPO)",
    subtitle: "Jūsu prioritārā kontaktpersona jautājumos par jūsu datiem"
  },

  sections: {
    dataController: {
      title: "1. Datu pārzinis",
      intro: "Personas datu pārzinis ir:",
      location: "Bordo, Francija",
      email: "E-pasts:"
    },

    dataCollected: {
      title: "2. Apkopotie personas dati",
      intro: "Mūsu Eiropas nodarbinātības pakalpojumu ietvaros mēs apkopojam šādus datus:",
      items: [
        {
          label: "Identifikācijas dati:",
          description: "Uzvārds, vārds, e-pasts, tālrunis"
        },
        {
          label: "Profesionālie dati:",
          description: "Uzņēmums, amats, darbības nozare"
        },
        {
          label: "Kontaktinformācija:",
          description: "Pasta adrese, komunikācijas preferences"
        },
        {
          label: "Navigācijas dati:",
          description: "Sīkdatnes, IP adrese, savienojuma dati"
        }
      ]
    },

    purposes: {
      title: "3. Apstrādes mērķi",
      intro: "Jūsu dati tiek apkopoti un apstrādāti šādiem mērķiem:",
      items: [
        {
          title: "Nodarbinātības pieprasījumu pārvaldība",
          description: "Jūsu piedāvājumu pieprasījumu apstrāde un savienošana ar mūsu partneraģentūru tīklu."
        },
        {
          title: "Mūsu pakalpojumu uzlabošana",
          description: "Mūsu pakalpojumu izmantošanas analīze, lai uzlabotu jūsu lietotāja pieredzi."
        },
        {
          title: "Uzņēmējdarbības komunikācija",
          description: "Informēšana par mūsu jaunajiem pakalpojumiem un Eiropas tirgu (ar jūsu piekrišanu)."
        }
      ]
    },

    legalBasis: {
      title: "4. Apstrādes juridiskais pamats",
      intro: "Jūsu datu apstrāde balstās uz šādiem juridiskajiem pamatiem:",
      items: [
        {
          basis: "Līguma izpilde",
          description: "Apstrāde, kas nepieciešama, lai atbildētu uz jūsu nodarbinātības pieprasījumiem"
        },
        {
          basis: "Piekrišana",
          description: "Mārketinga ziņojumu sūtīšanai (jūs varat atsaukt piekrišanu jebkurā laikā)"
        },
        {
          basis: "Likumīgā interese",
          description: "Mūsu pakalpojumu uzlabošana un mūsu platformas drošība"
        }
      ]
    },

    retention: {
      title: "5. Glabāšanas termiņš",
      intro: "Mēs glabājam jūsu personas datus šādus periodus:",
      items: [
        {
          period: "3 gadi",
          description: "Potenciālo klientu un klientu dati"
        },
        {
          period: "13 mēneši",
          description: "Sīkdatnes un navigācijas dati"
        },
        {
          period: "5 gadi",
          description: "Grāmatvedības un nodokļu dokumenti"
        },
        {
          period: "{days} dienas",
          description: "Veidlapu dati (pielāgojams)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Jūsu tiesības",
      intro: "Saskaņā ar GDPR jums ir šādas tiesības:",
      items: [
        {
          title: "Piekļuves tiesības",
          description: "Saņemt jūsu personas datu kopiju"
        },
        {
          title: "Labošanas tiesības",
          description: "Labot neprecīzus vai nepilnīgus datus"
        },
        {
          title: "Dzēšanas tiesības",
          description: "Pieprasīt jūsu datu dzēšanu"
        },
        {
          title: "Ierobežošanas tiesības",
          description: "Ierobežot jūsu datu apstrādi"
        },
        {
          title: "Datu pārnesamības tiesības",
          description: "Saņemt jūsu datus strukturētā formātā"
        },
        {
          title: "Iebildumu tiesības",
          description: "Iebilst pret jūsu datu apstrādi"
        }
      ],
      footer: "Lai izmantotu savas tiesības, sazinieties ar mūsu DPO pa adresi"
    },

    security: {
      title: "7. Datu drošība",
      intro: "Mēs īstenojam atbilstošus tehniskos un organizatoriskos drošības pasākumus:",
      measures: [
        "Datu šifrēšana pārsūtīšanas un glabāšanas laikā (SSL/TLS)",
        "Ierobežota piekļuve datiem ar stingru autentifikāciju",
        "Regulāras rezerves kopijas un uzņēmējdarbības nepārtrauktības plāns",
        "Drošības auditi un regulāri atjauninājumi",
        "Personāla apmācība par labākajām GDPR praksēm"
      ]
    },

    transfers: {
      title: "8. Datu pārsūtīšana",
      intro: "Mūsu Eiropas tīkla ietvaros, kas aptver vairāk nekā 500 partneraģentūras 27 valstīs:",
      eu: {
        title: "🇪🇺 Eiropas Savienības ietvaros",
        description: "Jūsu dati var tikt pārsūtīti mūsu partneraģentūrām, kas atrodas ES/EEZ un bauda tādu pašu GDPR aizsardzības līmeni."
      },
      nonEu: {
        title: "🌍 Ārpus Eiropas Savienības",
        description: "Pārsūtīšanas gadījumā ārpus ES mēs izmantojam Eiropas Komisijas standarta līguma klauzulas (SCC), lai nodrošinātu atbilstošu aizsardzības līmeni."
      }
    },

    cookies: {
      title: "9. Sīkdatnes un izsekošanas mehānismi",
      intro: "Mūsu tīmekļa vietne izmanto sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi:",
      types: [
        {
          type: "Būtiskās sīkdatnes",
          description: "Nepieciešamas tīmekļa vietnes darbībai (sesija, drošība)",
          required: true
        },
        {
          type: "Analītiskās sīkdatnes",
          description: "Apmeklējumu mērīšana un statistika",
          required: false
        },
        {
          type: "Mārketinga sīkdatnes",
          description: "Mērķtiecīga reklāma un personalizācija",
          required: false
        }
      ],
      footer: "Jūs varat pārvaldīt sīkdatņu iestatījumus jebkurā laikā pārlūkprogrammas iestatījumos."
    },

    contact: {
      title: "10. Kontakti un sūdzības",
      intro: "Visiem jautājumiem par jūsu personas datu apstrādi:",
      dpoCard: {
        title: "Sazinieties ar mūsu DPO"
      },
      cnilCard: {
        title: "Uzraudzības iestāde",
        name: "CNIL (Francija)"
      },
      footer: "Ja uzskatāt, ka jūsu tiesības netiek ievērotas, jums ir tiesības iesniegt sūdzību Nacionālajai informātikas un brīvību komisijai (CNIL)."
    }
  },

  cta: {
    title: "Jūsu dati drošās rokās",
    description: "Jūsu personas datu aizsardzība ir mūsu prioritāte. Mēs esam apņēmušies ievērot GDPR un garantēt jūsu informācijas drošību.",
    backHome: "Atpakaļ uz sākumlapu",
    contactDpo: "Sazināties ar DPO"
  },

  badges: {
    required: "Obligāts",
    optional: "Neobligāts"
  }
};
