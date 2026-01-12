/**
 * 🇸🇪 SVENSKA ÖVERSÄTTNINGAR - INTEGRITETSPOLICY SIDA
 * 
 * @version 1.0.0
 */

export const privacySV = {
  hero: {
    badge: "Integritetspolicy",
    title: "Skydd av dina personuppgifter",
    subtitle: "På {company} är vi engagerade i att skydda och respektera din integritet i enlighet med den allmänna dataskyddsförordningen (GDPR).",
    lastUpdate: "Senast uppdaterad:"
  },

  dpo: {
    title: "Dataskyddsombud (DPO)",
    subtitle: "Din föredragna kontaktperson för frågor om dina uppgifter"
  },

  sections: {
    dataController: {
      title: "1. Personuppgiftsansvarig",
      intro: "Den personuppgiftsansvarige är:",
      location: "Bordeaux, Frankrike",
      email: "E-post:"
    },

    dataCollected: {
      title: "2. Personuppgifter som samlas in",
      intro: "Inom ramen för våra europeiska rekryteringstjänster samlar vi in följande uppgifter:",
      items: [
        {
          label: "Identifieringsuppgifter:",
          description: "Efternamn, förnamn, e-post, telefon"
        },
        {
          label: "Yrkesuppgifter:",
          description: "Företag, position, verksamhetsområde"
        },
        {
          label: "Kontaktuppgifter:",
          description: "Postadress, kommunikationspreferenser"
        },
        {
          label: "Navigeringsdata:",
          description: "Cookies, IP-adress, anslutningsdata"
        }
      ]
    },

    purposes: {
      title: "3. Behandlingsändamål",
      intro: "Dina uppgifter samlas in och behandlas för följande ändamål:",
      items: [
        {
          title: "Hantering av rekryteringsförfrågningar",
          description: "Behandling av dina offertförfrågningar och koppling till vårt nätverk av partnerbyråer."
        },
        {
          title: "Förbättring av våra tjänster",
          description: "Analys av användningen av våra tjänster för att förbättra din användarupplevelse."
        },
        {
          title: "Affärskommunikation",
          description: "Information om våra nya tjänster och den europeiska marknaden (med ditt samtycke)."
        }
      ]
    },

    legalBasis: {
      title: "4. Rättslig grund för behandling",
      intro: "Behandlingen av dina uppgifter baseras på följande rättsliga grunder:",
      items: [
        {
          basis: "Fullgörande av avtal",
          description: "Behandling som är nödvändig för att svara på dina rekryteringsförfrågningar"
        },
        {
          basis: "Samtycke",
          description: "För att skicka marknadsföringsmeddelanden (du kan återkalla ditt samtycke när som helst)"
        },
        {
          basis: "Berättigat intresse",
          description: "Förbättring av våra tjänster och säkerhet för vår plattform"
        }
      ]
    },

    retention: {
      title: "5. Lagringsperiod",
      intro: "Vi lagrar dina personuppgifter under följande perioder:",
      items: [
        {
          period: "3 år",
          description: "Prospekt- och kunddata"
        },
        {
          period: "13 månader",
          description: "Cookies och navigeringsdata"
        },
        {
          period: "5 år",
          description: "Bokförings- och skattehandlingar"
        },
        {
          period: "{days} dagar",
          description: "Formulärdata (konfigurerbar)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Dina rättigheter",
      intro: "Enligt GDPR har du följande rättigheter:",
      items: [
        {
          title: "Rätt till tillgång",
          description: "Få en kopia av dina personuppgifter"
        },
        {
          title: "Rätt till rättelse",
          description: "Rätta felaktiga eller ofullständiga uppgifter"
        },
        {
          title: "Rätt till radering",
          description: "Begära radering av dina uppgifter"
        },
        {
          title: "Rätt till begränsning",
          description: "Begränsa behandlingen av dina uppgifter"
        },
        {
          title: "Rätt till dataportabilitet",
          description: "Få dina uppgifter i ett strukturerat format"
        },
        {
          title: "Rätt att göra invändningar",
          description: "Invända mot behandlingen av dina uppgifter"
        }
      ],
      footer: "För att utöva dina rättigheter, kontakta vårt DPO på"
    },

    security: {
      title: "7. Datasäkerhet",
      intro: "Vi tillämpar lämpliga tekniska och organisatoriska säkerhetsåtgärder:",
      measures: [
        "Kryptering av data vid överföring och lagring (SSL/TLS)",
        "Begränsad åtkomst till data med stark autentisering",
        "Regelbundna säkerhetskopior och affärskontinuitetsplan",
        "Säkerhetsrevisioner och regelbundna uppdateringar",
        "Utbildning av personal om bästa GDPR-praxis"
      ]
    },

    transfers: {
      title: "8. Dataöverföringar",
      intro: "Inom ramen för vårt europeiska nätverk med över 500 partnerbyråer i 27 länder:",
      eu: {
        title: "🇪🇺 Inom Europeiska unionen",
        description: "Dina uppgifter kan överföras till våra partnerbyråer som är belägna i EU/EES och åtnjuter samma nivå av GDPR-skydd."
      },
      nonEu: {
        title: "🌍 Utanför Europeiska unionen",
        description: "Vid överföringar utanför EU använder vi Europeiska kommissionens standardavtalsklausuler (SCC) för att säkerställa en lämplig skyddsnivå."
      }
    },

    cookies: {
      title: "9. Cookies och spårningsmekanismer",
      intro: "Vår webbplats använder cookies för att förbättra din surfupplevelse:",
      types: [
        {
          type: "Nödvändiga cookies",
          description: "Nödvändiga för webbplatsens funktion (session, säkerhet)",
          required: true
        },
        {
          type: "Analytiska cookies",
          description: "Mätning av besök och statistik",
          required: false
        },
        {
          type: "Marknadsföringscookies",
          description: "Riktad reklam och personalisering",
          required: false
        }
      ],
      footer: "Du kan hantera dina cookie-inställningar när som helst i din webbläsares inställningar."
    },

    contact: {
      title: "10. Kontakt och klagomål",
      intro: "För alla frågor om behandlingen av dina personuppgifter:",
      dpoCard: {
        title: "Kontakta vårt DPO"
      },
      cnilCard: {
        title: "Tillsynsmyndighet",
        name: "CNIL (Frankrike)"
      },
      footer: "Om du anser att dina rättigheter inte respekteras har du rätt att lämna in ett klagomål till Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "Dina uppgifter i säkra händer",
    description: "Skyddet av dina personuppgifter är vår prioritet. Vi förbinder oss att respektera GDPR och garantera säkerheten för din information.",
    backHome: "Tillbaka till startsidan",
    contactDpo: "Kontakta DPO"
  },

  badges: {
    required: "Obligatorisk",
    optional: "Valfri"
  }
};
