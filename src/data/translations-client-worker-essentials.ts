/**
 * 🌍 Traductions essentielles CLIENT & WORKER
 * Traductions professionnelles pour 5 langues principales
 */

export const essentialTranslations = {
  meta: {
    description: "Traductions essentielles CLIENT & WORKER pour 5 langues principales",
    languages: ["en", "de", "es", "it", "pl"],
    profiles: ["client", "worker"],
    totalKeys: 30,
    status: "manual-professional",
    usage: "Importez ce fichier via le dashboard pour remplacer les traductions mock"
  },
  instructions: {
    dashboard: "Dashboard → Traductions → Import JSON",
    api: "POST /make-server-10092a63/translations/bulk-import",
    format: "Le système détectera automatiquement les textId et langues"
  },
  translations: [
    {
      textId: "questions.q2_annee_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Année de création de votre entreprise",
        en: "Year your company was founded",
        de: "Gründungsjahr Ihres Unternehmens",
        es: "Año de fundación de su empresa",
        it: "Anno di fondazione della vostra azienda",
        pl: "Rok założenia Twojej firmy"
      }
    },
    {
      textId: "questions.q5_localisation.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Pays de localisation de votre entreprise",
        en: "Country where your company is located",
        de: "Land, in dem sich Ihr Unternehmen befindet",
        es: "País donde se encuentra su empresa",
        it: "Paese in cui si trova la vostra azienda",
        pl: "Kraj, w którym znajduje się Twoja firma"
      }
    },
    {
      textId: "questions.q6_volume_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Combien d'intérimaires employez-vous par an ?",
        en: "How many temporary workers do you employ per year?",
        de: "Wie viele Zeitarbeiter beschäftigen Sie pro Jahr?",
        es: "¿Cuántos trabajadores temporales emplea al año?",
        it: "Quanti lavoratori temporanei impiegate all'anno?",
        pl: "Ilu pracowników tymczasowych zatrudniasz rocznie?"
      }
    },
    {
      textId: "questions.q8_nationalites.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Nationalités des intérimaires que vous employez",
        en: "Nationalities of temporary workers you employ",
        de: "Nationalitäten der Zeitarbeiter, die Sie beschäftigen",
        es: "Nacionalidades de los trabajadores temporales que emplea",
        it: "Nazionalità dei lavoratori temporanei che impiegate",
        pl: "Narodowości pracowników tymczasowych, których zatrudniasz"
      }
    },
    {
      textId: "questions.q9_defi_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Principal défi avec l'intérim européen",
        en: "Main challenge with European temporary work",
        de: "Hauptherausforderung bei europäischer Zeitarbeit",
        es: "Principal desafío con el trabajo temporal europeo",
        it: "Principale sfida con il lavoro temporaneo europeo",
        pl: "Główne wyzwanie związane z europejską pracą tymczasową"
      }
    },
    {
      textId: "questions.q10_agences.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Combien d'agences d'intérim utilisez-vous ?",
        en: "How many temporary work agencies do you use?",
        de: "Wie viele Zeitarbeitsagenturen nutzen Sie?",
        es: "¿Cuántas agencias de trabajo temporal utiliza?",
        it: "Quante agenzie di lavoro temporaneo utilizzate?",
        pl: "Z ilu agencji pracy tymczasowej korzystasz?"
      }
    },
    {
      textId: "questions.q12_budget_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Budget annuel consacré à l'intérim",
        en: "Annual budget dedicated to temporary work",
        de: "Jährliches Budget für Zeitarbeit",
        es: "Presupuesto anual dedicado al trabajo temporal",
        it: "Budget annuale dedicato al lavoro temporaneo",
        pl: "Roczny budżet przeznaczony na pracę tymczasową"
      }
    },
    {
      textId: "questions.q13_satisfaction.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Satisfaction avec vos agences actuelles",
        en: "Satisfaction with your current agencies",
        de: "Zufriedenheit mit Ihren aktuellen Agenturen",
        es: "Satisfacción con sus agencias actuales",
        it: "Soddisfazione con le vostre agenzie attuali",
        pl: "Zadowolenie z obecnych agencji"
      }
    },
    {
      textId: "questions.q14_risques_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Quels risques vous préoccupent le plus ?",
        en: "Which risks concern you most?",
        de: "Welche Risiken bereiten Ihnen am meisten Sorgen?",
        es: "¿Qué riesgos le preocupan más?",
        it: "Quali rischi vi preoccupano di più?",
        pl: "Jakie ryzyka najbardziej Cię niepokoją?"
      }
    },
    {
      textId: "questions.q15_besoins_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Quels sont vos besoins prioritaires ?",
        en: "What are your priority needs?",
        de: "Was sind Ihre prioritären Bedürfnisse?",
        es: "¿Cuáles son sus necesidades prioritarias?",
        it: "Quali sono le vostre esigenze prioritarie?",
        pl: "Jakie są Twoje priorytetowe potrzeby?"
      }
    },
    {
      textId: "questions.q19_features_client.label",
      category: "question",
      profile: "client",
      translations: {
        fr: "Fonctionnalités les plus intéressantes",
        en: "Most interesting features",
        de: "Interessanteste Funktionen",
        es: "Características más interesantes",
        it: "Funzionalità più interessanti",
        pl: "Najbardziej interesujące funkcje"
      }
    },
    {
      textId: "questions.q2_nationalite.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Votre nationalité",
        en: "Your nationality",
        de: "Ihre Nationalität",
        es: "Su nacionalidad",
        it: "La vostra nazionalità",
        pl: "Twoja narodowość"
      }
    },
    {
      textId: "questions.q3_experience.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Années d'expérience en intérim",
        en: "Years of temporary work experience",
        de: "Jahre Zeitarbeitserfahrung",
        es: "Años de experiencia en trabajo temporal",
        it: "Anni di esperienza nel lavoro temporaneo",
        pl: "Lata doświadczenia w pracy tymczasowej"
      }
    },
    {
      textId: "questions.q4_metiers.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Métiers exercés",
        en: "Jobs performed",
        de: "Ausgeübte Tätigkeiten",
        es: "Trabajos realizados",
        it: "Lavori svolti",
        pl: "Wykonywane zawody"
      }
    },
    {
      textId: "questions.q5_pays_travail.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Pays où vous avez travaillé en intérim",
        en: "Countries where you worked temporarily",
        de: "Länder, in denen Sie als Zeitarbeiter tätig waren",
        es: "Países donde ha trabajado temporalmente",
        it: "Paesi in cui avete lavorato temporaneamente",
        pl: "Kraje, w których pracowałeś tymczasowo"
      }
    },
    {
      textId: "questions.q6_frequence.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "À quelle fréquence travaillez-vous en intérim ?",
        en: "How often do you work temporarily?",
        de: "Wie oft arbeiten Sie als Zeitarbeiter?",
        es: "¿Con qué frecuencia trabaja temporalmente?",
        it: "Con che frequenza lavorate temporaneamente?",
        pl: "Jak często pracujesz tymczasowo?"
      }
    },
    {
      textId: "questions.q9_defi_worker.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Principal défi dans vos missions",
        en: "Main challenge in your assignments",
        de: "Hauptherausforderung bei Ihren Einsätzen",
        es: "Principal desafío en sus misiones",
        it: "Principale sfida nelle vostre missioni",
        pl: "Główne wyzwanie w Twoich misjach"
      }
    },
    {
      textId: "questions.q10_agences_worker.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Avec combien d'agences travaillez-vous ?",
        en: "How many agencies do you work with?",
        de: "Mit wie vielen Agenturen arbeiten Sie?",
        es: "¿Con cuántas agencias trabaja?",
        it: "Con quante agenzie lavorate?",
        pl: "Z iloma agencjami pracujesz?"
      }
    },
    {
      textId: "questions.q12_salaire.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Salaire mensuel moyen de vos missions",
        en: "Average monthly salary from your assignments",
        de: "Durchschnittliches Monatsgehalt aus Ihren Einsätzen",
        es: "Salario mensual promedio de sus misiones",
        it: "Stipendio mensile medio delle vostre missioni",
        pl: "Średnie miesięczne wynagrodzenie z Twoich misji"
      }
    },
    {
      textId: "questions.q13_satisfaction_worker.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Satisfaction avec vos agences actuelles",
        en: "Satisfaction with your current agencies",
        de: "Zufriedenheit mit Ihren aktuellen Agenturen",
        es: "Satisfacción con sus agencias actuales",
        it: "Soddisfazione con le vostre agenzie attuali",
        pl: "Zadowolenie z obecnych agencji"
      }
    },
    {
      textId: "questions.q14_risques_worker.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Quels problèmes rencontrez-vous le plus souvent ?",
        en: "Which problems do you encounter most often?",
        de: "Welche Probleme treten am häufigsten auf?",
        es: "¿Qué problemas encuentra con más frecuencia?",
        it: "Quali problemi incontrate più spesso?",
        pl: "Jakie problemy napotykasz najczęściej?"
      }
    },
    {
      textId: "questions.q15_ameliorations.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Qu'aimeriez-vous améliorer dans vos missions ?",
        en: "What would you like to improve in your assignments?",
        de: "Was würden Sie bei Ihren Einsätzen verbessern wollen?",
        es: "¿Qué le gustaría mejorar en sus misiones?",
        it: "Cosa vorreste migliorare nelle vostre missioni?",
        pl: "Co chciałbyś poprawić w swoich misjach?"
      }
    },
    {
      textId: "questions.q19_features_worker.label",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Fonctionnalités les plus intéressantes",
        en: "Most interesting features",
        de: "Interessanteste Funktionen",
        es: "Características más interesantes",
        it: "Funzionalità più interessanti",
        pl: "Najbardziej interesujące funkcje"
      }
    },
    {
      textId: "questions.q9_defi_client.options.trouver",
      category: "question",
      profile: "client",
      translations: {
        fr: "Trouver des agences fiables",
        en: "Finding reliable agencies",
        de: "Zuverlässige Agenturen finden",
        es: "Encontrar agencias fiables",
        it: "Trovare agenzie affidabili",
        pl: "Znalezienie wiarygodnych agencji"
      }
    },
    {
      textId: "questions.q9_defi_client.options.conformite",
      category: "question",
      profile: "client",
      translations: {
        fr: "Conformité légale",
        en: "Legal compliance",
        de: "Rechtliche Konformität",
        es: "Cumplimiento legal",
        it: "Conformità legale",
        pl: "Zgodność z przepisami"
      }
    },
    {
      textId: "questions.q9_defi_client.options.qualite",
      category: "question",
      profile: "client",
      translations: {
        fr: "Qualité des candidats",
        en: "Quality of candidates",
        de: "Qualität der Kandidaten",
        es: "Calidad de los candidatos",
        it: "Qualità dei candidati",
        pl: "Jakość kandydatów"
      }
    },
    {
      textId: "questions.q9_defi_worker.options.trouver",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Trouver des missions",
        en: "Finding assignments",
        de: "Einsätze finden",
        es: "Encontrar misiones",
        it: "Trovare incarichi",
        pl: "Znalezienie misji"
      }
    },
    {
      textId: "questions.q9_defi_worker.options.logement",
      category: "question",
      profile: "worker",
      translations: {
        fr: "Logement / Hébergement",
        en: "Housing / Accommodation",
        de: "Wohnung / Unterkunft",
        es: "Alojamiento",
        it: "Alloggio / Sistemazione",
        pl: "Mieszkanie / Zakwaterowanie"
      }
    },
    {
      textId: "questions.q13_satisfaction.options.tres_satisfait",
      category: "question",
      profile: "both",
      translations: {
        fr: "Très satisfait",
        en: "Very satisfied",
        de: "Sehr zufrieden",
        es: "Muy satisfecho",
        it: "Molto soddisfatto",
        pl: "Bardzo zadowolony"
      }
    },
    {
      textId: "questions.q13_satisfaction.options.satisfait",
      category: "question",
      profile: "both",
      translations: {
        fr: "Satisfait",
        en: "Satisfied",
        de: "Zufrieden",
        es: "Satisfecho",
        it: "Soddisfatto",
        pl: "Zadowolony"
      }
    }
  ]
} as const;
