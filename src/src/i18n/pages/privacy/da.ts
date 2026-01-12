/**
 * 🇩🇰 DANSKE OVERSÆTTELSER - PRIVATLIVSPOLITIK SIDE
 * 
 * @version 1.0.0
 */

export const privacyDA = {
  hero: {
    badge: "Privatlivspolitik",
    title: "Beskyttelse af dine personlige data",
    subtitle: "Hos {company} er vi forpligtet til at beskytte og respektere dit privatliv i overensstemmelse med den generelle databeskyttelsesforordning (GDPR).",
    lastUpdate: "Senest opdateret:"
  },

  dpo: {
    title: "Databeskyttelsesrådgiver (DPO)",
    subtitle: "Din foretrukne kontaktperson for spørgsmål om dine data"
  },

  sections: {
    dataController: {
      title: "1. Dataansvarlig",
      intro: "Den dataansvarlige er:",
      location: "Bordeaux, Frankrig",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Personlige data, der indsamles",
      intro: "Som led i vores europæiske rekrutteringstjenester indsamler vi følgende data:",
      items: [
        {
          label: "Identifikationsdata:",
          description: "Efternavn, fornavn, e-mail, telefon"
        },
        {
          label: "Professionelle data:",
          description: "Virksomhed, stilling, aktivitetsområde"
        },
        {
          label: "Kontaktdata:",
          description: "Postadresse, kommunikationspræferencer"
        },
        {
          label: "Navigationsdata:",
          description: "Cookies, IP-adresse, forbindelsesdata"
        }
      ]
    },

    purposes: {
      title: "3. Behandlingsformål",
      intro: "Dine data indsamles og behandles til følgende formål:",
      items: [
        {
          title: "Håndtering af rekrutteringsforespørgsler",
          description: "Behandling af dine tilbudsanmodninger og forbindelse til vores netværk af partnerbureauer."
        },
        {
          title: "Forbedring af vores tjenester",
          description: "Analyse af brugen af vores tjenester for at forbedre din brugeroplevelse."
        },
        {
          title: "Forretningsmæssig kommunikation",
          description: "Information om vores nye tjenester og det europæiske marked (med dit samtykke)."
        }
      ]
    },

    legalBasis: {
      title: "4. Retsgrundlag for behandling",
      intro: "Behandlingen af dine data er baseret på følgende retsgrundlag:",
      items: [
        {
          basis: "Opfyldelse af kontrakt",
          description: "Behandling nødvendig for at besvare dine rekrutteringsforespørgsler"
        },
        {
          basis: "Samtykke",
          description: "Til at sende marketingmeddelelser (du kan til enhver tid trække dit samtykke tilbage)"
        },
        {
          basis: "Legitim interesse",
          description: "Forbedring af vores tjenester og sikkerhed på vores platform"
        }
      ]
    },

    retention: {
      title: "5. Opbevaringsperiode",
      intro: "Vi opbevarer dine personlige data i følgende perioder:",
      items: [
        {
          period: "3 år",
          description: "Prospekt- og kundedata"
        },
        {
          period: "13 måneder",
          description: "Cookies og navigationsdata"
        },
        {
          period: "5 år",
          description: "Regnskabs- og skattedokumenter"
        },
        {
          period: "{days} dage",
          description: "Formulardata (konfigurerbar)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Dine rettigheder",
      intro: "I henhold til GDPR har du følgende rettigheder:",
      items: [
        {
          title: "Ret til adgang",
          description: "Få en kopi af dine personlige data"
        },
        {
          title: "Ret til berigtigelse",
          description: "Rette unøjagtige eller ufuldstændige data"
        },
        {
          title: "Ret til sletning",
          description: "Anmode om sletning af dine data"
        },
        {
          title: "Ret til begrænsning",
          description: "Begrænse behandlingen af dine data"
        },
        {
          title: "Ret til dataportabilitet",
          description: "Få dine data i et struktureret format"
        },
        {
          title: "Ret til indsigelse",
          description: "Gøre indsigelse mod behandlingen af dine data"
        }
      ],
      footer: "For at udøve dine rettigheder skal du kontakte vores DPO på"
    },

    security: {
      title: "7. Datasikkerhed",
      intro: "Vi anvender passende tekniske og organisatoriske sikkerhedsforanstaltninger:",
      measures: [
        "Kryptering af data under overførsel og opbevaring (SSL/TLS)",
        "Begrænset adgang til data med stærk autentificering",
        "Regelmæssige sikkerhedskopier og forretningskontinuitetsplan",
        "Sikkerhedsrevisioner og regelmæssige opdateringer",
        "Personaleuddannelse i bedste GDPR-praksis"
      ]
    },

    transfers: {
      title: "8. Dataoverførsler",
      intro: "Som led i vores europæiske netværk med over 500 partnerbureauer i 27 lande:",
      eu: {
        title: "🇪🇺 Inden for Den Europæiske Union",
        description: "Dine data kan overføres til vores partnerbureauer, der er beliggende i EU/EØS og nyder samme niveau af GDPR-beskyttelse."
      },
      nonEu: {
        title: "🌍 Uden for Den Europæiske Union",
        description: "I tilfælde af overførsler uden for EU bruger vi Europa-Kommissionens standardkontraktbestemmelser (SCC) for at sikre et passende beskyttelsesniveau."
      }
    },

    cookies: {
      title: "9. Cookies og sporingsmekanismer",
      intro: "Vores websted bruger cookies for at forbedre din browsing-oplevelse:",
      types: [
        {
          type: "Nødvendige cookies",
          description: "Nødvendige for webstedets funktion (session, sikkerhed)",
          required: true
        },
        {
          type: "Analytiske cookies",
          description: "Måling af besøg og statistikker",
          required: false
        },
        {
          type: "Marketing cookies",
          description: "Målrettet reklame og personalisering",
          required: false
        }
      ],
      footer: "Du kan til enhver tid administrere dine cookie-indstillinger i din browsers indstillinger."
    },

    contact: {
      title: "10. Kontakt og klager",
      intro: "For alle spørgsmål vedrørende behandlingen af dine personlige data:",
      dpoCard: {
        title: "Kontakt vores DPO"
      },
      cnilCard: {
        title: "Tilsynsmyndighed",
        name: "CNIL (Frankrig)"
      },
      footer: "Hvis du mener, at dine rettigheder ikke respekteres, har du ret til at indgive en klage til Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "Dine data i sikre hænder",
    description: "Beskyttelsen af dine personlige data er vores prioritet. Vi forpligter os til at respektere GDPR og garantere sikkerheden for dine oplysninger.",
    backHome: "Tilbage til startsiden",
    contactDpo: "Kontakt DPO"
  },

  badges: {
    required: "Obligatorisk",
    optional: "Valgfri"
  }
};
