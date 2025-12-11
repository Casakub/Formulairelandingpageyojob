/**
 * 🌍 TRADUCTIONS EUROPÉENNES (20 LANGUES)
 * 
 * DE, ES, IT, PT, NL, PL, RO, BG, HU, CZ, SK, HR, SL, LT, LV, EE, EL, SV, DA, FI
 * 
 * Traductions professionnelles natives pour l'enquête de marché YoJob
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import type { TranslationSet } from './translations-complete';

/**
 * 🇩🇪 GERMAN (DE)
 */
export const de: TranslationSet = {
  nav: {
    section1: 'Profil',
    section2: 'Erfahrung',
    section3: 'Bedürfnisse',
    section4: 'Interesse',
    section5: 'Vision',
    section6: 'Kontakt',
  },
  common: {
    oui: 'Ja',
    non: 'Nein',
    autre: 'Andere',
    loading: 'Laden...',
    submit: 'Senden',
    next: 'Weiter',
    previous: 'Zurück',
    skip: 'Überspringen',
    required: 'Erforderlich',
    optional: 'Optional',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Name Ihrer Agentur',
        client: 'Name Ihres Unternehmens',
        worker: 'Ihr Vor- und Nachname',
      },
      placeholder: {
        agency: 'Z.B.: Staffing Europe Solutions',
        client: 'Z.B.: Meine Firma GmbH',
        worker: 'Z.B.: Max Mustermann',
      },
    },
    q2_annee: {
      label: 'Gründungsjahr',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Gründungsjahr Ihres Unternehmens',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Ihre Staatsangehörigkeit',
      placeholder: 'Z.B.: Polnisch',
    },
    q3_taille: {
      label: {
        agency: 'Größe Ihrer Agentur',
        client: 'Größe Ihres Unternehmens',
      },
      options: {
        '1-9': '1-9 Mitarbeiter',
        '10-49': '10-49 Mitarbeiter',
        '50-249': '50-249 Mitarbeiter',
        '250+': '250+ Mitarbeiter',
      },
    },
    q3_experience: {
      label: 'Jahre Erfahrung in der Zeitarbeit',
      options: {
        '<1': 'Weniger als 1 Jahr',
        '1-3': '1-3 Jahre',
        '3-5': '3-5 Jahre',
        '5-10': '5-10 Jahre',
        '10+': 'Mehr als 10 Jahre',
      },
    },
    q4_secteurs: {
      label: {
        agency: 'Branchen',
        client: 'Branchen',
      },
      description: 'Wählen Sie alle relevanten Branchen',
      options: {
        btp: 'Bauwesen',
        industrie: 'Industrie',
        logistique: 'Logistik',
        hotellerie: 'Gastgewerbe',
        sante: 'Gesundheitswesen',
        agriculture: 'Landwirtschaft',
        tech: 'Tech/IT',
        autres: 'Andere',
      },
    },
    q4_metiers: {
      label: 'Ausgeübte Berufe',
      description: 'Wählen Sie alle Ihre Berufe',
      options: {
        btp: 'Bauwesen',
        industrie: 'Industrie',
        logistique: 'Logistik',
        hotellerie: 'Gastgewerbe',
        sante: 'Gesundheitswesen',
        agriculture: 'Landwirtschaft',
        tech: 'Tech/IT',
        autres: 'Andere',
      },
    },
    q5_pays: {
      label: {
        agency: 'Land, in dem Ihre Agentur registriert ist',
        client: 'Land, in dem Ihr Unternehmen tätig ist',
        worker: 'Ihr aktuelles Wohnsitzland',
      },
      placeholder: 'Wählen Sie ein Land',
    },
    q6_volume: {
      label: {
        agency: 'Jährliches Volumen entsandter Arbeitnehmer',
        client: 'Anzahl der Zeitarbeitskräfte pro Jahr',
        worker: 'Häufigkeit der Einsätze',
      },
      options: {
        agency: {
          '0-50': '0-50 Arbeitnehmer',
          '51-200': '51-200 Arbeitnehmer',
          '201-500': '201-500 Arbeitnehmer',
          '500+': 'Mehr als 500',
        },
        client: {
          '0-50': '0-50 Zeitarbeiter',
          '51-200': '51-200 Zeitarbeiter',
          '201-500': '201-500 Zeitarbeiter',
          '500+': 'Mehr als 500',
        },
        worker: {
          '1-2': '1-2 Einsätze/Jahr',
          '3-5': '3-5 Einsätze/Jahr',
          '6-10': '6-10 Einsätze/Jahr',
          '10+': 'Mehr als 10/Jahr',
        },
      },
    },
    q7_origine: {
      label: 'Herkunftsland der entsandten Arbeitnehmer',
      description: 'Wählen Sie alle Herkunftsländer',
    },
    q7_exp_detachement: {
      label: 'Haben Sie bereits europäische Entsendung genutzt?',
      options: {
        oui: 'Ja, regelmäßig',
        occasionnel: 'Ja, gelegentlich',
        envisage: 'Nein, aber in Erwägung gezogen',
        non: 'Nein, nicht interessiert',
      },
    },
    q7_travail_etranger: {
      label: 'Haben Sie bereits im Ausland gearbeitet?',
      options: {
        oui: 'Ja',
        non: 'Nein',
      },
    },
    q24_email: {
      label: 'Geschäftliche E-Mail',
      placeholder: 'ihre@email.de',
    },
    q25_telephone: {
      label: 'Telefon',
      placeholder: '+49 30 12345678',
    },
    q28_demo: {
      label: 'Möchten Sie eine personalisierte Demo?',
      options: {
        oui: 'Ja, kontaktieren Sie mich',
        plus_tard: 'Vielleicht später',
        non: 'Nein danke',
      },
    },
    q29_early_access: {
      label: 'Interessiert an frühem Zugang (Beta)?',
      options: {
        oui: 'Ja, auf jeden Fall!',
        informe: 'Halten Sie mich auf dem Laufenden',
        non: 'Nein',
      },
    },
    q30_commentaires: {
      label: 'Kommentare oder Vorschläge',
      placeholder: 'Teilen Sie Ihre Ideen, Fragen, Anmerkungen...',
      description: 'Optional',
    },
  },
};

/**
 * 🇪🇸 SPANISH (ES)
 */
export const es: TranslationSet = {
  nav: {
    section1: 'Perfil',
    section2: 'Experiencia',
    section3: 'Necesidades',
    section4: 'Interés',
    section5: 'Visión',
    section6: 'Contacto',
  },
  common: {
    oui: 'Sí',
    non: 'No',
    autre: 'Otro',
    loading: 'Cargando...',
    submit: 'Enviar',
    next: 'Siguiente',
    previous: 'Anterior',
    skip: 'Saltar',
    required: 'Obligatorio',
    optional: 'Opcional',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nombre de su agencia',
        client: 'Nombre de su empresa',
        worker: 'Su nombre y apellidos',
      },
      placeholder: {
        agency: 'Ej.: Staffing Europe Solutions',
        client: 'Ej.: Mi Empresa S.L.',
        worker: 'Ej.: Juan García',
      },
    },
    q2_annee: {
      label: 'Año de fundación',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Año de fundación de su empresa',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Su nacionalidad',
      placeholder: 'Ej.: Polaca',
    },
    q3_taille: {
      label: {
        agency: 'Tamaño de su agencia',
        client: 'Tamaño de su empresa',
      },
      options: {
        '1-9': '1-9 empleados',
        '10-49': '10-49 empleados',
        '50-249': '50-249 empleados',
        '250+': '250+ empleados',
      },
    },
    q3_experience: {
      label: 'Años de experiencia en trabajo temporal',
      options: {
        '<1': 'Menos de 1 año',
        '1-3': '1-3 años',
        '3-5': '3-5 años',
        '5-10': '5-10 años',
        '10+': 'Más de 10 años',
      },
    },
    q4_secteurs: {
      label: {
        agency: 'Sectores de actividad',
        client: 'Sectores de actividad',
      },
      description: 'Seleccione todos los sectores relevantes',
      options: {
        btp: 'Construcción',
        industrie: 'Industria',
        logistique: 'Logística',
        hotellerie: 'Hostelería',
        sante: 'Salud',
        agriculture: 'Agricultura',
        tech: 'Tech/IT',
        autres: 'Otros',
      },
    },
    q4_metiers: {
      label: 'Oficios ejercidos',
      description: 'Seleccione todos sus oficios',
      options: {
        btp: 'Construcción',
        industrie: 'Industria',
        logistique: 'Logística',
        hotellerie: 'Hostelería',
        sante: 'Salud',
        agriculture: 'Agricultura',
        tech: 'Tech/IT',
        autres: 'Otros',
      },
    },
    q5_pays: {
      label: {
        agency: 'País donde está registrada su agencia',
        client: 'País donde opera su empresa',
        worker: 'Su país de residencia actual',
      },
      placeholder: 'Seleccione un país',
    },
    q24_email: {
      label: 'Correo electrónico profesional',
      placeholder: 'su@email.es',
    },
    q25_telephone: {
      label: 'Teléfono',
      placeholder: '+34 91 123 4567',
    },
    q28_demo: {
      label: '¿Desea una demostración personalizada?',
      options: {
        oui: 'Sí, contáctenme',
        plus_tard: 'Quizás más tarde',
        non: 'No gracias',
      },
    },
    q29_early_access: {
      label: '¿Interesado en acceso anticipado (beta)?',
      options: {
        oui: '¡Sí, absolutamente!',
        informe: 'Manténganme informado',
        non: 'No',
      },
    },
    q30_commentaires: {
      label: 'Comentarios o sugerencias',
      placeholder: 'Comparta sus ideas, preguntas, observaciones...',
      description: 'Opcional',
    },
  },
};

/**
 * 🇮🇹 ITALIAN (IT)
 */
export const it: TranslationSet = {
  nav: {
    section1: 'Profilo',
    section2: 'Esperienza',
    section3: 'Esigenze',
    section4: 'Interesse',
    section5: 'Visione',
    section6: 'Contatto',
  },
  common: {
    oui: 'Sì',
    non: 'No',
    autre: 'Altro',
    loading: 'Caricamento...',
    submit: 'Invia',
    next: 'Avanti',
    previous: 'Indietro',
    skip: 'Salta',
    required: 'Obbligatorio',
    optional: 'Opzionale',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nome della sua agenzia',
        client: 'Nome della sua azienda',
        worker: 'Il suo nome e cognome',
      },
      placeholder: {
        agency: 'Es.: Staffing Europe Solutions',
        client: 'Es.: La Mia Società S.r.l.',
        worker: 'Es.: Mario Rossi',
      },
    },
    q2_annee: {
      label: 'Anno di fondazione',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Anno di fondazione della sua azienda',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'La sua nazionalità',
      placeholder: 'Es.: Polacca',
    },
    q3_taille: {
      label: {
        agency: 'Dimensione della sua agenzia',
        client: 'Dimensione della sua azienda',
      },
      options: {
        '1-9': '1-9 dipendenti',
        '10-49': '10-49 dipendenti',
        '50-249': '50-249 dipendenti',
        '250+': '250+ dipendenti',
      },
    },
    q3_experience: {
      label: 'Anni di esperienza nel lavoro temporaneo',
      options: {
        '<1': 'Meno di 1 anno',
        '1-3': '1-3 anni',
        '3-5': '3-5 anni',
        '5-10': '5-10 anni',
        '10+': 'Più di 10 anni',
      },
    },
    q4_secteurs: {
      label: {
        agency: 'Settori di attività',
        client: 'Settori di attività',
      },
      description: 'Selezionare tutti i settori pertinenti',
      options: {
        btp: 'Edilizia',
        industrie: 'Industria',
        logistique: 'Logistica',
        hotellerie: 'Ristorazione',
        sante: 'Sanità',
        agriculture: 'Agricoltura',
        tech: 'Tech/IT',
        autres: 'Altri',
      },
    },
    q24_email: {
      label: 'Email professionale',
      placeholder: 'tua@email.it',
    },
    q25_telephone: {
      label: 'Telefono',
      placeholder: '+39 02 1234567',
    },
    q28_demo: {
      label: 'Desidera una demo personalizzata?',
      options: {
        oui: 'Sì, contattatemi',
        plus_tard: 'Forse più tardi',
        non: 'No grazie',
      },
    },
    q29_early_access: {
      label: 'Interessato all\'accesso anticipato (beta)?',
      options: {
        oui: 'Sì, assolutamente!',
        informe: 'Tenetemi informato',
        non: 'No',
      },
    },
    q30_commentaires: {
      label: 'Commenti o suggerimenti',
      placeholder: 'Condivida le sue idee, domande, osservazioni...',
      description: 'Opzionale',
    },
  },
};

/**
 * 🇵🇹 PORTUGUESE (PT)
 */
export const pt: TranslationSet = {
  nav: {
    section1: 'Perfil',
    section2: 'Experiência',
    section3: 'Necessidades',
    section4: 'Interesse',
    section5: 'Visão',
    section6: 'Contacto',
  },
  common: {
    oui: 'Sim',
    non: 'Não',
    autre: 'Outro',
    loading: 'Carregando...',
    submit: 'Enviar',
    next: 'Seguinte',
    previous: 'Anterior',
    skip: 'Saltar',
    required: 'Obrigatório',
    optional: 'Opcional',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nome da sua agência',
        client: 'Nome da sua empresa',
        worker: 'O seu nome completo',
      },
      placeholder: {
        agency: 'Ex.: Staffing Europe Solutions',
        client: 'Ex.: A Minha Empresa Lda.',
        worker: 'Ex.: João Silva',
      },
    },
    q2_annee: {
      label: 'Ano de fundação',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Ano de fundação da sua empresa',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'A sua nacionalidade',
      placeholder: 'Ex.: Polaca',
    },
    q3_taille: {
      label: {
        agency: 'Dimensão da sua agência',
        client: 'Dimensão da sua empresa',
      },
      options: {
        '1-9': '1-9 funcionários',
        '10-49': '10-49 funcionários',
        '50-249': '50-249 funcionários',
        '250+': '250+ funcionários',
      },
    },
    q3_experience: {
      label: 'Anos de experiência em trabalho temporário',
      options: {
        '<1': 'Menos de 1 ano',
        '1-3': '1-3 anos',
        '3-5': '3-5 anos',
        '5-10': '5-10 anos',
        '10+': 'Mais de 10 anos',
      },
    },
    q24_email: {
      label: 'Email profissional',
      placeholder: 'seu@email.pt',
    },
    q25_telephone: {
      label: 'Telefone',
      placeholder: '+351 21 123 4567',
    },
    q28_demo: {
      label: 'Gostaria de uma demonstração personalizada?',
      options: {
        oui: 'Sim, contactem-me',
        plus_tard: 'Talvez mais tarde',
        non: 'Não obrigado',
      },
    },
    q29_early_access: {
      label: 'Interessado em acesso antecipado (beta)?',
      options: {
        oui: 'Sim, absolutamente!',
        informe: 'Mantenham-me informado',
        non: 'Não',
      },
    },
    q30_commentaires: {
      label: 'Comentários ou sugestões',
      placeholder: 'Partilhe as suas ideias, questões, observações...',
      description: 'Opcional',
    },
  },
};

/**
 * 🇳🇱 DUTCH (NL)
 */
export const nl: TranslationSet = {
  nav: {
    section1: 'Profiel',
    section2: 'Ervaring',
    section3: 'Behoeften',
    section4: 'Interesse',
    section5: 'Visie',
    section6: 'Contact',
  },
  common: {
    oui: 'Ja',
    non: 'Nee',
    autre: 'Anders',
    loading: 'Laden...',
    submit: 'Verzenden',
    next: 'Volgende',
    previous: 'Vorige',
    skip: 'Overslaan',
    required: 'Verplicht',
    optional: 'Optioneel',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Naam van uw bureau',
        client: 'Naam van uw bedrijf',
        worker: 'Uw voor- en achternaam',
      },
      placeholder: {
        agency: 'Bijv.: Staffing Europe Solutions',
        client: 'Bijv.: Mijn Bedrijf B.V.',
        worker: 'Bijv.: Jan de Vries',
      },
    },
    q2_annee: {
      label: 'Oprichtingsjaar',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Oprichtingsjaar van uw bedrijf',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Uw nationaliteit',
      placeholder: 'Bijv.: Pools',
    },
    q3_taille: {
      label: {
        agency: 'Grootte van uw bureau',
        client: 'Grootte van uw bedrijf',
      },
      options: {
        '1-9': '1-9 werknemers',
        '10-49': '10-49 werknemers',
        '50-249': '50-249 werknemers',
        '250+': '250+ werknemers',
      },
    },
    q3_experience: {
      label: 'Jaren ervaring in uitzendwerk',
      options: {
        '<1': 'Minder dan 1 jaar',
        '1-3': '1-3 jaar',
        '3-5': '3-5 jaar',
        '5-10': '5-10 jaar',
        '10+': 'Meer dan 10 jaar',
      },
    },
    q24_email: {
      label: 'Zakelijk e-mailadres',
      placeholder: 'uw@email.nl',
    },
    q25_telephone: {
      label: 'Telefoon',
      placeholder: '+31 20 123 4567',
    },
    q28_demo: {
      label: 'Wilt u een gepersonaliseerde demo?',
      options: {
        oui: 'Ja, neem contact met mij op',
        plus_tard: 'Misschien later',
        non: 'Nee bedankt',
      },
    },
    q29_early_access: {
      label: 'Geïnteresseerd in vroege toegang (beta)?',
      options: {
        oui: 'Ja, absoluut!',
        informe: 'Houd me op de hoogte',
        non: 'Nee',
      },
    },
    q30_commentaires: {
      label: 'Opmerkingen of suggesties',
      placeholder: 'Deel uw ideeën, vragen, opmerkingen...',
      description: 'Optioneel',
    },
  },
};

/**
 * 🇵🇱 POLISH (PL)
 */
export const pl: TranslationSet = {
  nav: {
    section1: 'Profil',
    section2: 'Doświadczenie',
    section3: 'Potrzeby',
    section4: 'Zainteresowanie',
    section5: 'Wizja',
    section6: 'Kontakt',
  },
  common: {
    oui: 'Tak',
    non: 'Nie',
    autre: 'Inne',
    loading: 'Ładowanie...',
    submit: 'Wyślij',
    next: 'Dalej',
    previous: 'Wstecz',
    skip: 'Pomiń',
    required: 'Wymagane',
    optional: 'Opcjonalne',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nazwa Twojej agencji',
        client: 'Nazwa Twojej firmy',
        worker: 'Twoje imię i nazwisko',
      },
      placeholder: {
        agency: 'Np.: Staffing Europe Solutions',
        client: 'Np.: Moja Firma Sp. z o.o.',
        worker: 'Np.: Jan Kowalski',
      },
    },
    q2_annee: {
      label: 'Rok założenia',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Rok założenia Twojej firmy',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Twoja narodowość',
      placeholder: 'Np.: Polska',
    },
    q3_taille: {
      label: {
        agency: 'Wielkość Twojej agencji',
        client: 'Wielkość Twojej firmy',
      },
      options: {
        '1-9': '1-9 pracowników',
        '10-49': '10-49 pracowników',
        '50-249': '50-249 pracowników',
        '250+': '250+ pracowników',
      },
    },
    q3_experience: {
      label: 'Lata doświadczenia w pracy tymczasowej',
      options: {
        '<1': 'Mniej niż 1 rok',
        '1-3': '1-3 lata',
        '3-5': '3-5 lat',
        '5-10': '5-10 lat',
        '10+': 'Ponad 10 lat',
      },
    },
    q4_secteurs: {
      label: {
        agency: 'Sektory działalności',
        client: 'Sektory działalności',
      },
      description: 'Wybierz wszystkie odpowiednie sektory',
      options: {
        btp: 'Budownictwo',
        industrie: 'Przemysł',
        logistique: 'Logistyka',
        hotellerie: 'Hotelarstwo',
        sante: 'Opieka zdrowotna',
        agriculture: 'Rolnictwo',
        tech: 'Tech/IT',
        autres: 'Inne',
      },
    },
    q24_email: {
      label: 'Email służbowy',
      placeholder: 'twoj@email.pl',
    },
    q25_telephone: {
      label: 'Telefon',
      placeholder: '+48 22 123 4567',
    },
    q28_demo: {
      label: 'Czy chciałbyś otrzymać spersonalizowaną prezentację?',
      options: {
        oui: 'Tak, skontaktujcie się ze mną',
        plus_tard: 'Może później',
        non: 'Nie, dziękuję',
      },
    },
    q29_early_access: {
      label: 'Zainteresowany wczesnym dostępem (beta)?',
      options: {
        oui: 'Tak, zdecydowanie!',
        informe: 'Proszę informować mnie',
        non: 'Nie',
      },
    },
    q30_commentaires: {
      label: 'Komentarze lub sugestie',
      placeholder: 'Podziel się swoimi pomysłami, pytaniami, uwagami...',
      description: 'Opcjonalne',
    },
  },
};

/**
 * 🇷🇴 ROMANIAN (RO)
 */
export const ro: TranslationSet = {
  nav: {
    section1: 'Profil',
    section2: 'Experiență',
    section3: 'Nevoi',
    section4: 'Interes',
    section5: 'Viziune',
    section6: 'Contact',
  },
  common: {
    oui: 'Da',
    non: 'Nu',
    autre: 'Altul',
    loading: 'Se încarcă...',
    submit: 'Trimite',
    next: 'Următorul',
    previous: 'Anterior',
    skip: 'Omite',
    required: 'Obligatoriu',
    optional: 'Opțional',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Numele agenției dvs.',
        client: 'Numele companiei dvs.',
        worker: 'Prenumele și numele dvs.',
      },
      placeholder: {
        agency: 'Ex.: Staffing Europe Solutions',
        client: 'Ex.: Compania Mea S.R.L.',
        worker: 'Ex.: Ion Popescu',
      },
    },
    q2_annee: {
      label: 'Anul înființării',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Anul înființării companiei dvs.',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Naționalitatea dvs.',
      placeholder: 'Ex.: Poloneză',
    },
    q3_taille: {
      label: {
        agency: 'Dimensiunea agenției dvs.',
        client: 'Dimensiunea companiei dvs.',
      },
      options: {
        '1-9': '1-9 angajați',
        '10-49': '10-49 angajați',
        '50-249': '50-249 angajați',
        '250+': '250+ angajați',
      },
    },
    q3_experience: {
      label: 'Ani de experiență în muncă temporară',
      options: {
        '<1': 'Mai puțin de 1 an',
        '1-3': '1-3 ani',
        '3-5': '3-5 ani',
        '5-10': '5-10 ani',
        '10+': 'Peste 10 ani',
      },
    },
    q24_email: {
      label: 'Email profesional',
      placeholder: 'email@dvs.ro',
    },
    q25_telephone: {
      label: 'Telefon',
      placeholder: '+40 21 123 4567',
    },
    q28_demo: {
      label: 'Doriți o demonstrație personalizată?',
      options: {
        oui: 'Da, contactați-mă',
        plus_tard: 'Poate mai târziu',
        non: 'Nu, mulțumesc',
      },
    },
    q29_early_access: {
      label: 'Interesat de acces anticipat (beta)?',
      options: {
        oui: 'Da, absolut!',
        informe: 'Ține-mă la curent',
        non: 'Nu',
      },
    },
    q30_commentaires: {
      label: 'Comentarii sau sugestii',
      placeholder: 'Împărtășiți ideile, întrebările, observațiile dvs...',
      description: 'Opțional',
    },
  },
};

// Abbreviated versions for remaining languages (BG, HU, CZ, SK, HR, SL, LT, LV, EE, EL, SV, DA, FI)
// Each follows the same pattern with native translations

export const bg: TranslationSet = {
  nav: { section1: 'Профил', section2: 'Опит', section3: 'Нужди', section4: 'Интерес', section5: 'Визия', section6: 'Контакт' },
  common: { oui: 'Да', non: 'Не', autre: 'Друго', loading: 'Зареждане...', submit: 'Изпрати', next: 'Напред', previous: 'Назад', skip: 'Пропусни', required: 'Задължително', optional: 'По избор' },
  questions: {
    q1_nom: { label: { agency: 'Име на вашата агенция', client: 'Име на вашата компания', worker: 'Вашето име и фамилия' }, placeholder: { agency: 'Напр.: Staffing Europe Solutions', client: 'Напр.: Моята Компания ООД', worker: 'Напр.: Иван Иванов' } },
    q24_email: { label: 'Професионален имейл', placeholder: 'vashemail@bg' },
    q25_telephone: { label: 'Телефон', placeholder: '+359 2 123 4567' },
  },
};

export const hu: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Tapasztalat', section3: 'Igények', section4: 'Érdeklődés', section5: 'Vízió', section6: 'Kapcsolat' },
  common: { oui: 'Igen', non: 'Nem', autre: 'Egyéb', loading: 'Betöltés...', submit: 'Küldés', next: 'Következő', previous: 'Előző', skip: 'Kihagyás', required: 'Kötelező', optional: 'Opcionális' },
  questions: {
    q1_nom: { label: { agency: 'Az ügynökség neve', client: 'A cég neve', worker: 'Az Ön neve' }, placeholder: { agency: 'Pl.: Staffing Europe Solutions', client: 'Pl.: Az Én Cégem Kft.', worker: 'Pl.: Nagy János' } },
    q24_email: { label: 'Üzleti e-mail', placeholder: 'email@cim.hu' },
    q25_telephone: { label: 'Telefon', placeholder: '+36 1 123 4567' },
  },
};

export const cz: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Zkušenosti', section3: 'Potřeby', section4: 'Zájem', section5: 'Vize', section6: 'Kontakt' },
  common: { oui: 'Ano', non: 'Ne', autre: 'Jiné', loading: 'Načítání...', submit: 'Odeslat', next: 'Další', previous: 'Předchozí', skip: 'Přeskočit', required: 'Povinné', optional: 'Volitelné' },
  questions: {
    q1_nom: { label: { agency: 'Název vaší agentury', client: 'Název vaší společnosti', worker: 'Vaše jméno a příjmení' }, placeholder: { agency: 'Např.: Staffing Europe Solutions', client: 'Např.: Má Firma s.r.o.', worker: 'Např.: Jan Novák' } },
    q24_email: { label: 'Firemní e-mail', placeholder: 'vas@email.cz' },
    q25_telephone: { label: 'Telefon', placeholder: '+420 2 1234 5678' },
  },
};

export const sk: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Skúsenosti', section3: 'Potreby', section4: 'Záujem', section5: 'Vízia', section6: 'Kontakt' },
  common: { oui: 'Áno', non: 'Nie', autre: 'Iné', loading: 'Načítavam...', submit: 'Odoslať', next: 'Ďalej', previous: 'Späť', skip: 'Preskočiť', required: 'Povinné', optional: 'Voliteľné' },
  questions: {
    q1_nom: { label: { agency: 'Názov vašej agentúry', client: 'Názov vašej spoločnosti', worker: 'Vaše meno a priezvisko' }, placeholder: { agency: 'Napr.: Staffing Europe Solutions', client: 'Napr.: Moja Firma s.r.o.', worker: 'Napr.: Ján Novák' } },
    q24_email: { label: 'Firemný e-mail', placeholder: 'vas@email.sk' },
    q25_telephone: { label: 'Telefón', placeholder: '+421 2 1234 5678' },
  },
};

export const hr: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Iskustvo', section3: 'Potrebe', section4: 'Interes', section5: 'Vizija', section6: 'Kontakt' },
  common: { oui: 'Da', non: 'Ne', autre: 'Ostalo', loading: 'Učitavanje...', submit: 'Pošalji', next: 'Dalje', previous: 'Natrag', skip: 'Preskoči', required: 'Obavezno', optional: 'Opcionalno' },
  questions: {
    q1_nom: { label: { agency: 'Naziv vaše agencije', client: 'Naziv vaše tvrtke', worker: 'Vaše ime i prezime' }, placeholder: { agency: 'Npr.: Staffing Europe Solutions', client: 'Npr.: Moja Tvrtka d.o.o.', worker: 'Npr.: Ivan Horvat' } },
    q24_email: { label: 'Poslovna e-pošta', placeholder: 'vas@email.hr' },
    q25_telephone: { label: 'Telefon', placeholder: '+385 1 123 4567' },
  },
};

export const sl: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Izkušnje', section3: 'Potrebe', section4: 'Zanimanje', section5: 'Vizija', section6: 'Kontakt' },
  common: { oui: 'Da', non: 'Ne', autre: 'Drugo', loading: 'Nalaganje...', submit: 'Pošlji', next: 'Naprej', previous: 'Nazaj', skip: 'Preskoči', required: 'Obvezno', optional: 'Izbirno' },
  questions: {
    q1_nom: { label: { agency: 'Ime vaše agencije', client: 'Ime vašega podjetja', worker: 'Vaše ime in priimek' }, placeholder: { agency: 'Npr.: Staffing Europe Solutions', client: 'Npr.: Moje Podjetje d.o.o.', worker: 'Npr.: Janez Novak' } },
    q24_email: { label: 'Poslovna e-pošta', placeholder: 'vas@email.si' },
    q25_telephone: { label: 'Telefon', placeholder: '+386 1 123 4567' },
  },
};

export const lt: TranslationSet = {
  nav: { section1: 'Profilis', section2: 'Patirtis', section3: 'Poreikiai', section4: 'Susidomėjimas', section5: 'Vizija', section6: 'Kontaktai' },
  common: { oui: 'Taip', non: 'Ne', autre: 'Kita', loading: 'Kraunama...', submit: 'Siųsti', next: 'Kitas', previous: 'Atgal', skip: 'Praleisti', required: 'Privaloma', optional: 'Neprivaloma' },
  questions: {
    q1_nom: { label: { agency: 'Jūsų agentūros pavadinimas', client: 'Jūsų įmonės pavadinimas', worker: 'Jūsų vardas ir pavardė' }, placeholder: { agency: 'Pvz.: Staffing Europe Solutions', client: 'Pvz.: Mano Įmonė UAB', worker: 'Pvz.: Jonas Jonaitis' } },
    q24_email: { label: 'Darbo el. paštas', placeholder: 'jusu@email.lt' },
    q25_telephone: { label: 'Telefonas', placeholder: '+370 5 123 4567' },
  },
};

export const lv: TranslationSet = {
  nav: { section1: 'Profils', section2: 'Pieredze', section3: 'Vajadzības', section4: 'Interese', section5: 'Vīzija', section6: 'Kontakti' },
  common: { oui: 'Jā', non: 'Nē', autre: 'Cits', loading: 'Ielādē...', submit: 'Nosūtīt', next: 'Tālāk', previous: 'Atpakaļ', skip: 'Izlaist', required: 'Obligāts', optional: 'Izvēles' },
  questions: {
    q1_nom: { label: { agency: 'Jūsu aģentūras nosaukums', client: 'Jūsu uzņēmuma nosaukums', worker: 'Jūsu vārds un uzvārds' }, placeholder: { agency: 'Piemēram: Staffing Europe Solutions', client: 'Piemēram: Mans Uzņēmums SIA', worker: 'Piemēram: Jānis Bērziņš' } },
    q24_email: { label: 'Darba e-pasts', placeholder: 'jusu@email.lv' },
    q25_telephone: { label: 'Tālrunis', placeholder: '+371 6 123 4567' },
  },
};

export const ee: TranslationSet = {
  nav: { section1: 'Profiil', section2: 'Kogemus', section3: 'Vajadused', section4: 'Huvi', section5: 'Visioon', section6: 'Kontakt' },
  common: { oui: 'Jah', non: 'Ei', autre: 'Muu', loading: 'Laadimine...', submit: 'Saada', next: 'Edasi', previous: 'Tagasi', skip: 'Jäta vahele', required: 'Kohustuslik', optional: 'Valikuline' },
  questions: {
    q1_nom: { label: { agency: 'Teie agentuuri nimi', client: 'Teie ettevõtte nimi', worker: 'Teie ees- ja perekonnanimi' }, placeholder: { agency: 'Nt: Staffing Europe Solutions', client: 'Nt: Minu Ettevõte OÜ', worker: 'Nt: Jaan Tamm' } },
    q24_email: { label: 'Töö e-post', placeholder: 'teie@email.ee' },
    q25_telephone: { label: 'Telefon', placeholder: '+372 6 123 456' },
  },
};

export const el: TranslationSet = {
  nav: { section1: 'Προφίλ', section2: 'Εμπειρία', section3: 'Ανάγκες', section4: 'Ενδιαφέρον', section5: 'Όραμα', section6: 'Επικοινωνία' },
  common: { oui: 'Ναι', non: 'Όχι', autre: 'Άλλο', loading: 'Φόρτωση...', submit: 'Αποστολή', next: 'Επόμενο', previous: 'Προηγούμενο', skip: 'Παράλειψη', required: 'Υποχρεωτικό', optional: 'Προαιρετικό' },
  questions: {
    q1_nom: { label: { agency: 'Όνομα του πρακτορείου σας', client: 'Όνομα της εταιρείας σας', worker: 'Το όνομα και επώνυμό σας' }, placeholder: { agency: 'Π.χ.: Staffing Europe Solutions', client: 'Π.χ.: Η Εταιρεία Μου Α.Ε.', worker: 'Π.χ.: Γιάννης Παπαδόπουλος' } },
    q24_email: { label: 'Επαγγελματικό email', placeholder: 'email@sas.gr' },
    q25_telephone: { label: 'Τηλέφωνο', placeholder: '+30 21 1234 5678' },
  },
};

export const sv: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Erfarenhet', section3: 'Behov', section4: 'Intresse', section5: 'Vision', section6: 'Kontakt' },
  common: { oui: 'Ja', non: 'Nej', autre: 'Annat', loading: 'Laddar...', submit: 'Skicka', next: 'Nästa', previous: 'Föregående', skip: 'Hoppa över', required: 'Obligatorisk', optional: 'Valfri' },
  questions: {
    q1_nom: { label: { agency: 'Din byrås namn', client: 'Ditt företags namn', worker: 'Ditt för- och efternamn' }, placeholder: { agency: 'T.ex.: Staffing Europe Solutions', client: 'T.ex.: Mitt Företag AB', worker: 'T.ex.: Anders Andersson' } },
    q24_email: { label: 'Professionell e-post', placeholder: 'din@email.se' },
    q25_telephone: { label: 'Telefon', placeholder: '+46 8 123 456 78' },
  },
};

export const da: TranslationSet = {
  nav: { section1: 'Profil', section2: 'Erfaring', section3: 'Behov', section4: 'Interesse', section5: 'Vision', section6: 'Kontakt' },
  common: { oui: 'Ja', non: 'Nej', autre: 'Andet', loading: 'Indlæser...', submit: 'Send', next: 'Næste', previous: 'Forrige', skip: 'Spring over', required: 'Påkrævet', optional: 'Valgfri' },
  questions: {
    q1_nom: { label: { agency: 'Dit bureaus navn', client: 'Dit virksomheds navn', worker: 'Dit for- og efternavn' }, placeholder: { agency: 'F.eks.: Staffing Europe Solutions', client: 'F.eks.: Mit Firma A/S', worker: 'F.eks.: Jens Jensen' } },
    q24_email: { label: 'Professionel e-mail', placeholder: 'din@email.dk' },
    q25_telephone: { label: 'Telefon', placeholder: '+45 12 34 56 78' },
  },
};

export const fi: TranslationSet = {
  nav: { section1: 'Profiili', section2: 'Kokemus', section3: 'Tarpeet', section4: 'Kiinnostus', section5: 'Visio', section6: 'Yhteystiedot' },
  common: { oui: 'Kyllä', non: 'Ei', autre: 'Muu', loading: 'Ladataan...', submit: 'Lähetä', next: 'Seuraava', previous: 'Edellinen', skip: 'Ohita', required: 'Pakollinen', optional: 'Valinnainen' },
  questions: {
    q1_nom: { label: { agency: 'Toimistosi nimi', client: 'Yrityksesi nimi', worker: 'Etu- ja sukunimesi' }, placeholder: { agency: 'Esim.: Staffing Europe Solutions', client: 'Esim.: Oma Yritys Oy', worker: 'Esim.: Matti Meikäläinen' } },
    q24_email: { label: 'Työsähköposti', placeholder: 'sinun@email.fi' },
    q25_telephone: { label: 'Puhelin', placeholder: '+358 9 1234 567' },
  },
};
