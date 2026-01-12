/**
 * 🇫🇮 SUOMEN KÄÄNNÖKSET - TIETOSUOJAKÄYTÄNTÖ SIVU
 * 
 * @version 1.0.0
 */

export const privacyFI = {
  hero: {
    badge: "Tietosuojakäytäntö",
    title: "Henkilötietojesi suojaus",
    subtitle: "{company}:ssa olemme sitoutuneet suojaamaan ja kunnioittamaan yksityisyyttäsi yleisen tietosuoja-asetuksen (GDPR) mukaisesti.",
    lastUpdate: "Viimeksi päivitetty:"
  },

  dpo: {
    title: "Tietosuojavastaava (DPO)",
    subtitle: "Ensisijainen yhteyshenkilösi tietoihisi liittyvissä kysymyksissä"
  },

  sections: {
    dataController: {
      title: "1. Rekisterinpitäjä",
      intro: "Henkilötietojen rekisterinpitäjä on:",
      location: "Bordeaux, Ranska",
      email: "Sähköposti:"
    },

    dataCollected: {
      title: "2. Kerätyt henkilötiedot",
      intro: "Eurooppalaisten rekrytointipalvelujemme yhteydessä keräämme seuraavat tiedot:",
      items: [
        {
          label: "Tunnistustiedot:",
          description: "Sukunimi, etunimi, sähköposti, puhelin"
        },
        {
          label: "Ammatilliset tiedot:",
          description: "Yritys, asema, toimiala"
        },
        {
          label: "Yhteystiedot:",
          description: "Postiosoite, viestintämieltymykset"
        },
        {
          label: "Selaustiedot:",
          description: "Evästeet, IP-osoite, yhteystiedot"
        }
      ]
    },

    purposes: {
      title: "3. Käsittelyn tarkoitukset",
      intro: "Tietojasi kerätään ja käsitellään seuraaviin tarkoituksiin:",
      items: [
        {
          title: "Rekrytointipyyntöjen hallinta",
          description: "Tarjouspyyntöjesi käsittely ja yhdistäminen kumppaniverkkoomme."
        },
        {
          title: "Palvelujemme parantaminen",
          description: "Palvelujemme käytön analysointi käyttökokemuksesi parantamiseksi."
        },
        {
          title: "Liiketoimintaviestintä",
          description: "Tiedottaminen uusista palveluistamme ja Euroopan markkinoistamme (suostumuksellasi)."
        }
      ]
    },

    legalBasis: {
      title: "4. Käsittelyn oikeusperuste",
      intro: "Tietojesi käsittely perustuu seuraaviin oikeusperusteisiin:",
      items: [
        {
          basis: "Sopimuksen täyttäminen",
          description: "Käsittely, joka on tarpeen rekrytointipyyntöihisi vastaamiseksi"
        },
        {
          basis: "Suostumus",
          description: "Markkinointiviestien lähettämiseen (voit peruuttaa suostumuksesi milloin tahansa)"
        },
        {
          basis: "Oikeutettu etu",
          description: "Palvelujemme parantaminen ja alustamme turvallisuus"
        }
      ]
    },

    retention: {
      title: "5. Säilytysaika",
      intro: "Säilytämme henkilötietojasi seuraavat ajanjaksot:",
      items: [
        {
          period: "3 vuotta",
          description: "Potentiaalisten asiakkaiden ja asiakkaiden tiedot"
        },
        {
          period: "13 kuukautta",
          description: "Evästeet ja selaustiedot"
        },
        {
          period: "5 vuotta",
          description: "Kirjanpito- ja veroasiakirjat"
        },
        {
          period: "{days} päivää",
          description: "Lomakkeiden tiedot (määritettävissä)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Oikeutesi",
      intro: "GDPR:n mukaan sinulla on seuraavat oikeudet:",
      items: [
        {
          title: "Oikeus päästä tietoihin",
          description: "Saada kopio henkilötiedoistasi"
        },
        {
          title: "Oikeus oikaisuun",
          description: "Korjata virheelliset tai puutteelliset tiedot"
        },
        {
          title: "Oikeus poistamiseen",
          description: "Pyytää tietojesi poistamista"
        },
        {
          title: "Oikeus rajoittamiseen",
          description: "Rajoittaa tietojesi käsittelyä"
        },
        {
          title: "Oikeus siirrettävyyteen",
          description: "Saada tietosi jäsennellyssä muodossa"
        },
        {
          title: "Oikeus vastustaa",
          description: "Vastustaa tietojesi käsittelyä"
        }
      ],
      footer: "Käyttääksesi oikeuksiasi, ota yhteyttä DPO:mme osoitteessa"
    },

    security: {
      title: "7. Tietoturva",
      intro: "Soveltamme asianmukaisia teknisiä ja organisatorisia turvatoimia:",
      measures: [
        "Tietojen salaus siirrossa ja tallennuksessa (SSL/TLS)",
        "Rajoitettu pääsy tietoihin vahvalla todennuksella",
        "Säännölliset varmuuskopiot ja liiketoiminnan jatkuvuussuunnitelma",
        "Turvallisuusauditoinnit ja säännölliset päivitykset",
        "Henkilöstön koulutus GDPR:n parhaista käytännöistä"
      ]
    },

    transfers: {
      title: "8. Tiedonsiirrot",
      intro: "Eurooppalaisen verkostomme puitteissa, jossa on yli 500 kumppanivirastoa 27 maassa:",
      eu: {
        title: "🇪🇺 Euroopan unionin sisällä",
        description: "Tietojasi voidaan siirtää kumppanivirastoillemme, jotka sijaitsevat EU/ETA-alueella ja nauttivat samaa GDPR-suojan tasoa."
      },
      nonEu: {
        title: "🌍 Euroopan unionin ulkopuolella",
        description: "EU:n ulkopuolisten siirtojen tapauksessa käytämme Euroopan komission vakiosopimuslausekkeita (SCC) asianmukaisen suojan tason varmistamiseksi."
      }
    },

    cookies: {
      title: "9. Evästeet ja seurantamekanismit",
      intro: "Verkkosivustomme käyttää evästeitä selailukokemuksesi parantamiseksi:",
      types: [
        {
          type: "Välttämättömät evästeet",
          description: "Välttämättömiä verkkosivuston toiminnalle (istunto, turvallisuus)",
          required: true
        },
        {
          type: "Analyyttiset evästeet",
          description: "Käyntien mittaus ja tilastot",
          required: false
        },
        {
          type: "Markkinointievästeet",
          description: "Kohdennettu mainonta ja personointi",
          required: false
        }
      ],
      footer: "Voit hallita evästeasetuksiasi milloin tahansa selaimesi asetuksissa."
    },

    contact: {
      title: "10. Yhteydenotto ja valitukset",
      intro: "Kaikissa henkilötietojesi käsittelyä koskevissa kysymyksissä:",
      dpoCard: {
        title: "Ota yhteyttä DPO:mme"
      },
      cnilCard: {
        title: "Valvontaviranomainen",
        name: "CNIL (Ranska)"
      },
      footer: "Jos katsot, että oikeuksiasi ei kunnioiteta, sinulla on oikeus tehdä valitus Commission Nationale de l'Informatique et des Libertés (CNIL) -viranomaiselle."
    }
  },

  cta: {
    title: "Tietosi turvallisissa käsissä",
    description: "Henkilötietojesi suojaus on prioriteettimme. Sitoudumme noudattamaan GDPR:ää ja takaamaan tietojesi turvallisuuden.",
    backHome: "Palaa etusivulle",
    contactDpo: "Ota yhteyttä DPO:hon"
  },

  badges: {
    required: "Pakollinen",
    optional: "Valinnainen"
  }
};
