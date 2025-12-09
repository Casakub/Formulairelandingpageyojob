import type { QuestionTranslationData, UITextTranslationData, CountryLanguageMapping } from './i18n-api';

/**
 * Seed data pour tester le système i18n
 * Ces données peuvent être importées via l'interface d'import/export
 */

export const SEED_QUESTION_TRANSLATIONS: QuestionTranslationData[] = [
  {
    questionId: 'q1',
    translations: {
      fr: { text: 'Dans quel pays est située votre agence ?', status: 'validated' },
      en: { text: 'In which country is your agency located?', status: 'validated' },
      de: { text: 'In welchem Land befindet sich Ihre Agentur?', status: 'validated' },
      es: { text: '¿En qué país se encuentra su agence?', status: 'validated' },
      pl: { text: 'W jakim kraju znajduje się Państwa agencja?', status: 'validated' },
      it: { text: 'In quale paese si trova la vostra agenzia?', status: 'auto-mcp' },
      pt: { text: 'Em que país está localizada a sua agência?', status: 'auto-mcp' },
      nl: { text: 'In welk land is uw bureau gevestigd?', status: 'auto-api' }
    }
  },
  {
    questionId: 'q2',
    translations: {
      fr: { text: 'Combien d\'intérimaires gérez-vous par mois en moyenne ?', status: 'validated' },
      en: { text: 'How many temporary workers do you manage on average per month?', status: 'validated' },
      de: { text: 'Wie viele Zeitarbeitnehmer verwalten Sie durchschnittlich pro Monat?', status: 'validated' },
      es: { text: '¿Cuántos trabajadores temporales gestiona en promedio por mes?', status: 'validated' },
      pl: { text: 'Ilu pracowników tymczasowych zarządza się średnio miesięcznie?', status: 'validated' },
      it: { text: 'Quanti lavoratori temporanei gestite in media al mese?', status: 'auto-mcp' },
      pt: { text: 'Quantos trabalhadores temporários você gerencia em média por mês?', status: 'auto-mcp' },
      nl: { text: 'Hoeveel uitzendkrachten beheert u gemiddeld per maand?', status: 'auto-api' }
    }
  },
  {
    questionId: 'q5',
    translations: {
      fr: { text: 'Envoyez-vous déjà des intérimaires dans d\'autres pays européens ?', status: 'validated' },
      en: { text: 'Do you already send temporary workers to other European countries?', status: 'validated' },
      de: { text: 'Entsenden Sie bereits Zeitarbeitnehmer in andere europäische Länder?', status: 'validated' },
      es: { text: '¿Ya envía trabajadores temporales a otros países europeos?', status: 'auto-mcp' },
      pl: { text: 'Czy już wysyłają Państwo pracowników tymczasowych do innych krajów europejskich?', status: 'auto-mcp' },
      it: { text: 'Inviate già lavoratori temporanei in altri paesi europei?', status: 'auto-api' }
    }
  },
  {
    questionId: 'q12',
    translations: {
      fr: { text: 'Quels sont vos principaux défis dans le détachement européen ?', status: 'validated' },
      en: { text: 'What are your main challenges in European posting?', status: 'validated' },
      de: { text: 'Was sind Ihre Hauptprobleme bei der Entsendung nach Europa?', status: 'validated' },
      es: { text: '¿Cuáles son sus principales desafíos en el desplazamiento europeo?', status: 'auto-mcp' },
      pl: { text: 'Jakie są Państwa główne wyzwania w delegowaniu europejskim?', status: 'auto-api' }
    }
  },
  {
    questionId: 'q18',
    translations: {
      fr: { text: 'Quel budget mensuel seriez-vous prêt à investir pour une plateforme de gestion européenne ?', status: 'validated' },
      en: { text: 'What monthly budget would you be willing to invest for a European management platform?', status: 'validated' },
      de: { text: 'Welches monatliche Budget wären Sie bereit, für eine europäische Verwaltungsplattform zu investieren?', status: 'auto-mcp' },
      pl: { text: 'Jaki miesięczny budżet byliby Państwo gotowi zainwestować w europejską platformę zarządzania?', status: 'auto-api' }
    }
  },
  {
    questionId: 'q25',
    translations: {
      fr: { text: 'Email professionnel (pour recevoir les résultats de l\'étude)', status: 'validated' },
      en: { text: 'Professional email (to receive study results)', status: 'validated' },
      de: { text: 'Geschäftliche E-Mail (um Studienergebnisse zu erhalten)', status: 'validated' },
      es: { text: 'Correo electrónico profesional (para recibir los resultados del estudio)', status: 'auto-mcp' },
      pl: { text: 'E-mail służbowy (aby otrzymać wyniki badania)', status: 'auto-mcp' },
      it: { text: 'Email professionale (per ricevere i risultati dello studio)', status: 'auto-api' }
    }
  }
];

export const SEED_UI_TEXTS: UITextTranslationData[] = [
  {
    textId: 'button.next',
    key: 'button.next',
    category: 'buttons',
    translations: {
      fr: { text: 'Suivant', status: 'validated' },
      en: { text: 'Next', status: 'validated' },
      de: { text: 'Weiter', status: 'validated' },
      es: { text: 'Siguiente', status: 'validated' },
      pl: { text: 'Dalej', status: 'validated' },
      it: { text: 'Avanti', status: 'auto-mcp' },
      pt: { text: 'Próximo', status: 'auto-mcp' },
      nl: { text: 'Volgende', status: 'auto-api' }
    }
  },
  {
    textId: 'button.previous',
    key: 'button.previous',
    category: 'buttons',
    translations: {
      fr: { text: 'Précédent', status: 'validated' },
      en: { text: 'Previous', status: 'validated' },
      de: { text: 'Zurück', status: 'validated' },
      es: { text: 'Anterior', status: 'validated' },
      pl: { text: 'Poprzedni', status: 'validated' },
      it: { text: 'Precedente', status: 'auto-mcp' },
      pt: { text: 'Anterior', status: 'auto-mcp' },
      nl: { text: 'Vorige', status: 'auto-api' }
    }
  },
  {
    textId: 'button.submit',
    key: 'button.submit',
    category: 'buttons',
    translations: {
      fr: { text: 'Envoyer mes réponses', status: 'validated' },
      en: { text: 'Submit my answers', status: 'validated' },
      de: { text: 'Meine Antworten senden', status: 'validated' },
      es: { text: 'Enviar mis respuestas', status: 'auto-mcp' },
      pl: { text: 'Wyślij moje odpowiedzi', status: 'auto-mcp' },
      it: { text: 'Invia le mie risposte', status: 'auto-api' }
    }
  },
  {
    textId: 'label.required',
    key: 'label.required',
    category: 'form',
    translations: {
      fr: { text: 'Obligatoire', status: 'validated' },
      en: { text: 'Required', status: 'validated' },
      de: { text: 'Erforderlich', status: 'validated' },
      es: { text: 'Obligatorio', status: 'validated' },
      pl: { text: 'Wymagane', status: 'validated' },
      it: { text: 'Obbligatorio', status: 'auto-mcp' },
      pt: { text: 'Obrigatório', status: 'auto-mcp' },
      nl: { text: 'Verplicht', status: 'auto-api' }
    }
  },
  {
    textId: 'nav.section1',
    key: 'nav.section1',
    category: 'navigation',
    translations: {
      fr: { text: 'Profil de votre agence', status: 'validated' },
      en: { text: 'Your agency profile', status: 'validated' },
      de: { text: 'Ihr Agenterprofil', status: 'validated' },
      es: { text: 'Perfil de su agencia', status: 'auto-mcp' },
      pl: { text: 'Profil Twojej agencji', status: 'auto-mcp' }
    }
  },
  {
    textId: 'nav.section2',
    key: 'nav.section2',
    category: 'navigation',
    translations: {
      fr: { text: 'Détachement européen', status: 'validated' },
      en: { text: 'European posting', status: 'validated' },
      de: { text: 'Europäische Entsendung', status: 'validated' },
      es: { text: 'Desplazamiento europeo', status: 'auto-mcp' },
      pl: { text: 'Delegowanie europejskie', status: 'auto-api' }
    }
  },
  {
    textId: 'nav.section3',
    key: 'nav.section3',
    category: 'navigation',
    translations: {
      fr: { text: 'Vos besoins', status: 'validated' },
      en: { text: 'Your needs', status: 'validated' },
      de: { text: 'Ihre Bedürfnisse', status: 'validated' },
      es: { text: 'Sus necesidades', status: 'auto-mcp' }
    }
  },
  {
    textId: 'nav.section4',
    key: 'nav.section4',
    category: 'navigation',
    translations: {
      fr: { text: 'Votre intérêt pour YoJob', status: 'validated' },
      en: { text: 'Your interest in YoJob', status: 'validated' },
      de: { text: 'Ihr Interesse an YoJob', status: 'auto-mcp' }
    }
  },
  {
    textId: 'nav.section5',
    key: 'nav.section5',
    category: 'navigation',
    translations: {
      fr: { text: 'Vision du futur', status: 'validated' },
      en: { text: 'Vision of the future', status: 'validated' },
      de: { text: 'Zukunftsvision', status: 'auto-api' }
    }
  },
  {
    textId: 'nav.section6',
    key: 'nav.section6',
    category: 'navigation',
    translations: {
      fr: { text: 'Restons en contact', status: 'validated' },
      en: { text: 'Stay in touch', status: 'validated' },
      de: { text: 'Bleiben Sie in Kontakt', status: 'auto-mcp' }
    }
  },
  {
    textId: 'section1.description',
    key: 'section1.description',
    category: 'descriptions',
    translations: {
      fr: { text: '4 questions • 2 min', status: 'validated' },
      en: { text: '4 questions • 2 min', status: 'validated' },
      de: { text: '4 Fragen • 2 Min', status: 'validated' },
      es: { text: '4 preguntas • 2 min', status: 'auto-mcp' },
      pl: { text: '4 pytania • 2 min', status: 'auto-api' }
    }
  },
  {
    textId: 'section2.description',
    key: 'section2.description',
    category: 'descriptions',
    translations: {
      fr: { text: '7 questions • 3 min', status: 'validated' },
      en: { text: '7 questions • 3 min', status: 'validated' },
      de: { text: '7 Fragen • 3 Min', status: 'validated' },
      es: { text: '7 preguntas • 3 min', status: 'auto-mcp' }
    }
  },
  {
    textId: 'section3.description',
    key: 'section3.description',
    category: 'descriptions',
    translations: {
      fr: { text: '6 questions • 2 min', status: 'validated' },
      en: { text: '6 questions • 2 min', status: 'validated' },
      de: { text: '6 Fragen • 2 Min', status: 'auto-api' }
    }
  },
  {
    textId: 'section4.description',
    key: 'section4.description',
    category: 'descriptions',
    translations: {
      fr: { text: '6 questions • 3 min', status: 'validated' },
      en: { text: '6 questions • 3 min', status: 'validated' }
    }
  },
  {
    textId: 'section5.description',
    key: 'section5.description',
    category: 'descriptions',
    translations: {
      fr: { text: '2 questions • 1 min', status: 'validated' },
      en: { text: '2 questions • 1 min', status: 'validated' }
    }
  },
  {
    textId: 'section6.description',
    key: 'section6.description',
    category: 'descriptions',
    translations: {
      fr: { text: '1 question • 1 min', status: 'validated' },
      en: { text: '1 question • 1 min', status: 'validated' }
    }
  }
];

export const SEED_COUNTRY_LANGUAGES: CountryLanguageMapping[] = [
  { countryCode: 'FR', languages: ['fr', 'en'] },
  { countryCode: 'DE', languages: ['de', 'en'] },
  { countryCode: 'ES', languages: ['es', 'en'] },
  { countryCode: 'IT', languages: ['it', 'en'] },
  { countryCode: 'PL', languages: ['pl', 'en'] },
  { countryCode: 'PT', languages: ['pt', 'en'] },
  { countryCode: 'NL', languages: ['nl', 'en'] },
  { countryCode: 'BE', languages: ['fr', 'nl', 'en'] },
  { countryCode: 'AT', languages: ['de', 'en'] },
  { countryCode: 'CH', languages: ['de', 'fr', 'it', 'en'] },
  { countryCode: 'CZ', languages: ['cs', 'en'] },
  { countryCode: 'SK', languages: ['cs', 'en'] },
  { countryCode: 'HU', languages: ['en'] },
  { countryCode: 'RO', languages: ['en'] },
  { countryCode: 'BG', languages: ['en'] },
  { countryCode: 'GR', languages: ['en'] },
  { countryCode: 'HR', languages: ['en'] },
  { countryCode: 'SI', languages: ['en'] },
  { countryCode: 'EE', languages: ['en'] },
  { countryCode: 'LV', languages: ['en'] },
  { countryCode: 'LT', languages: ['en'] },
  { countryCode: 'SE', languages: ['en'] },
  { countryCode: 'DK', languages: ['en'] },
  { countryCode: 'FI', languages: ['en'] },
  { countryCode: 'NO', languages: ['en', 'no'] },
  { countryCode: 'IE', languages: ['en'] },
  { countryCode: 'LU', languages: ['fr', 'de', 'en'] }
];

/**
 * Export complet pour import JSON
 */
export const FULL_SEED_DATA = {
  version: '1.0',
  exportDate: new Date().toISOString(),
  data: {
    questions: SEED_QUESTION_TRANSLATIONS,
    uiTexts: SEED_UI_TEXTS,
    countries: SEED_COUNTRY_LANGUAGES
  },
  stats: {
    questionsCount: SEED_QUESTION_TRANSLATIONS.length,
    uiTextsCount: SEED_UI_TEXTS.length,
    countriesCount: SEED_COUNTRY_LANGUAGES.length
  }
};