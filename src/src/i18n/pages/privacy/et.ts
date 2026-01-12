/**
 * 🇪🇪 EESTI TÕLKED - PRIVAATSUSPOLIITIKA LEHT
 * 
 * @version 1.0.0
 */

export const privacyET = {
  hero: {
    badge: "Privaatsuspoliitika",
    title: "Teie isikuandmete kaitse",
    subtitle: "{company}'s oleme pühendunud teie privaatsuse kaitsmisele ja austamisele vastavalt Üldisele Andmekaitse Määrusele (GDPR).",
    lastUpdate: "Viimati uuendatud:"
  },

  dpo: {
    title: "Andmekaitsespetsialist (DPO)",
    subtitle: "Teie eelistatud kontaktisik teie andmetega seotud küsimuste jaoks"
  },

  sections: {
    dataController: {
      title: "1. Vastutav töötleja",
      intro: "Isikuandmete vastutav töötleja on:",
      location: "Bordeaux, Prantsusmaa",
      email: "E-post:"
    },

    dataCollected: {
      title: "2. Kogutud isikuandmed",
      intro: "Meie Euroopa tööhõive teenuste raames kogume järgmisi andmeid:",
      items: [
        {
          label: "Identifitseerimisandmed:",
          description: "Perekonnanimi, eesnimi, e-post, telefon"
        },
        {
          label: "Kutsealased andmed:",
          description: "Ettevõte, ametikoht, tegevusala"
        },
        {
          label: "Kontaktandmed:",
          description: "Postiaadress, suhtluseelistused"
        },
        {
          label: "Navigeerimisandmed:",
          description: "Küpsised, IP-aadress, ühendusandmed"
        }
      ]
    },

    purposes: {
      title: "3. Töötlemise eesmärgid",
      intro: "Teie andmeid kogutakse ja töödeldakse järgmistel eesmärkidel:",
      items: [
        {
          title: "Tööhõive päringute haldamine",
          description: "Teie pakkumise päringute töötlemine ja ühendamine meie partneragentuuride võrgustikuga."
        },
        {
          title: "Meie teenuste parandamine",
          description: "Meie teenuste kasutamise analüüsimine teie kasutajakogemuse parandamiseks."
        },
        {
          title: "Ärisuhtlus",
          description: "Teavitamine meie uutest teenustest ja Euroopa turust (teie nõusolekul)."
        }
      ]
    },

    legalBasis: {
      title: "4. Töötlemise õiguslik alus",
      intro: "Teie andmete töötlemine põhineb järgmistel õiguslikel alustel:",
      items: [
        {
          basis: "Lepingu täitmine",
          description: "Teie tööhõive päringutele vastamiseks vajalik töötlemine"
        },
        {
          basis: "Nõusolek",
          description: "Turundusteadete saatmiseks (saate nõusoleku igal ajal tagasi võtta)"
        },
        {
          basis: "Õigustatud huvi",
          description: "Meie teenuste parandamine ja meie platvormi turvalisus"
        }
      ]
    },

    retention: {
      title: "5. Säilitamise tähtaeg",
      intro: "Säilitame teie isikuandmeid järgmistel perioodidel:",
      items: [
        {
          period: "3 aastat",
          description: "Potentsiaalsete klientide ja klientide andmed"
        },
        {
          period: "13 kuud",
          description: "Küpsised ja navigeerimisandmed"
        },
        {
          period: "5 aastat",
          description: "Raamatupidamis- ja maksudokumendid"
        },
        {
          period: "{days} päeva",
          description: "Vormide andmed (reguleeritav)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Teie õigused",
      intro: "GDPR-i kohaselt on teil järgmised õigused:",
      items: [
        {
          title: "Juurdepääsuõigus",
          description: "Teie isikuandmete koopia saamine"
        },
        {
          title: "Parandusõigus",
          description: "Ebatäpsete või mittetäielike andmete parandamine"
        },
        {
          title: "Kustutamisõigus",
          description: "Teie andmete kustutamise taotlemine"
        },
        {
          title: "Piiramise õigus",
          description: "Teie andmete töötlemise piiramine"
        },
        {
          title: "Andmete ülekandmise õigus",
          description: "Teie andmete saamine struktureeritud vormingus"
        },
        {
          title: "Vastuväite õigus",
          description: "Vastuväide teie andmete töötlemisele"
        }
      ],
      footer: "Oma õiguste kasutamiseks võtke ühendust meie DPO-ga aadressil"
    },

    security: {
      title: "7. Andmeturve",
      intro: "Rakendame asjakohaseid tehnilisi ja korralduslikke turvameetmeid:",
      measures: [
        "Andmete krüpteerimine ülekandmisel ja salvestamisel (SSL/TLS)",
        "Piiratud juurdepääs andmetele tugeva autentimisega",
        "Regulaarsed varukoopiaid ja äritegevuse jätkuvuse kava",
        "Turvaauditid ja regulaarsed uuendused",
        "Töötajate koolitus GDPR-i parimatest tavadest"
      ]
    },

    transfers: {
      title: "8. Andmete edastamine",
      intro: "Meie Euroopa võrgustiku raames, mis hõlmab üle 500 partneragentuuri 27 riigis:",
      eu: {
        title: "🇪🇺 Euroopa Liidu piires",
        description: "Teie andmeid võidakse edastada meie partneragentuuridele, mis asuvad EL/EMP-s ja naudivad sama GDPR-i kaitse taset."
      },
      nonEu: {
        title: "🌍 Väljaspool Euroopa Liitu",
        description: "EL-ist väljaspool edastamise korral kasutame Euroopa Komisjoni standardseid lepingutingimusi (SCC), et tagada asjakohane kaitse tase."
      }
    },

    cookies: {
      title: "9. Küpsised ja jälgimismehhanismid",
      intro: "Meie veebisait kasutab küpsiseid teie sirvimiskogemuse parandamiseks:",
      types: [
        {
          type: "Hädavajalikud küpsised",
          description: "Veebisaidi toimimiseks hädavajalikud (seanss, turvalisus)",
          required: true
        },
        {
          type: "Analüütilised küpsised",
          description: "Külastuste arvu mõõtmine ja statistika",
          required: false
        },
        {
          type: "Turundusküpsised",
          description: "Sihitud reklaam ja isikupärastamine",
          required: false
        }
      ],
      footer: "Saate oma küpsiste seadeid igal ajal hallata brauseri seadetes."
    },

    contact: {
      title: "10. Kontakt ja kaebus",
      intro: "Kõigi teie isikuandmete töötlemisega seotud küsimuste korral:",
      dpoCard: {
        title: "Võtke ühendust meie DPO-ga"
      },
      cnilCard: {
        title: "Järelevalveasutus",
        name: "CNIL (Prantsusmaa)"
      },
      footer: "Kui leiate, et teie õigusi ei austatata, on teil õigus esitada kaebus Riiklikule Informaatika- ja Vabadusekomisjonile (CNIL)."
    }
  },

  cta: {
    title: "Teie andmed on turvaliselt kaitstud",
    description: "Teie isikuandmete kaitse on meie prioriteet. Oleme pühendunud GDPR-i järgimisele ja teie teabe turvalisuse tagamisele.",
    backHome: "Tagasi avalehele",
    contactDpo: "Võtke ühendust DPO-ga"
  },

  badges: {
    required: "Kohustuslik",
    optional: "Valikuline"
  }
};
