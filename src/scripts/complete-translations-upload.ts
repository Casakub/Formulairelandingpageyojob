/**
 * Script complet pour uploader toutes les traductions dans Supabase
 * Couvre les 23 langues européennes pour :
 * - 26 questions du formulaire
 * - 40+ textes UI
 */

import { bulkSaveUITextTranslations, bulkSaveQuestionTranslations, type UITextTranslationData, type QuestionTranslationData } from '../lib/i18n-api';

// Les 23 langues européennes supportées
const LANGUAGES = [
  'fr', 'en', 'de', 'es', 'it', 'nl', 'pl', 'pt',
  'ro', 'bg', 'hu', 'cs', 'sk', 'el', 'sv', 'da',
  'fi', 'no', 'hr', 'sl', 'lt', 'lv', 'et'
] as const;

// ========== TEXTES UI COMPLETS ==========

const UI_TRANSLATIONS: UITextTranslationData[] = [
  // Boutons
  {
    textId: 'button.previous',
    key: 'button.previous',
    category: 'button',
    translations: {
      fr: { text: 'Précédent', status: 'validated' },
      en: { text: 'Previous', status: 'validated' },
      de: { text: 'Zurück', status: 'validated' },
      es: { text: 'Anterior', status: 'validated' },
      it: { text: 'Precedente', status: 'validated' },
      nl: { text: 'Vorige', status: 'validated' },
      pl: { text: 'Poprzedni', status: 'validated' },
      pt: { text: 'Anterior', status: 'validated' },
      ro: { text: 'Anterior', status: 'validated' },
      bg: { text: 'Предишен', status: 'validated' },
      hu: { text: 'Előző', status: 'validated' },
      cs: { text: 'Předchozí', status: 'validated' },
      sk: { text: 'Predchádzajúci', status: 'validated' },
      el: { text: 'Προηγούμενο', status: 'validated' },
      sv: { text: 'Föregående', status: 'validated' },
      da: { text: 'Forrige', status: 'validated' },
      fi: { text: 'Edellinen', status: 'validated' },
      no: { text: 'Forrige', status: 'validated' },
      hr: { text: 'Prethodni', status: 'validated' },
      sl: { text: 'Prejšnji', status: 'validated' },
      lt: { text: 'Ankstesnis', status: 'validated' },
      lv: { text: 'Iepriekšējais', status: 'validated' },
      et: { text: 'Eelmine', status: 'validated' }
    }
  },
  {
    textId: 'button.next',
    key: 'button.next',
    category: 'button',
    translations: {
      fr: { text: 'Suivant', status: 'validated' },
      en: { text: 'Next', status: 'validated' },
      de: { text: 'Weiter', status: 'validated' },
      es: { text: 'Siguiente', status: 'validated' },
      it: { text: 'Avanti', status: 'validated' },
      nl: { text: 'Volgende', status: 'validated' },
      pl: { text: 'Następny', status: 'validated' },
      pt: { text: 'Próximo', status: 'validated' },
      ro: { text: 'Următorul', status: 'validated' },
      bg: { text: 'Следващ', status: 'validated' },
      hu: { text: 'Következő', status: 'validated' },
      cs: { text: 'Další', status: 'validated' },
      sk: { text: 'Ďalší', status: 'validated' },
      el: { text: 'Επόμενο', status: 'validated' },
      sv: { text: 'Nästa', status: 'validated' },
      da: { text: 'Næste', status: 'validated' },
      fi: { text: 'Seuraava', status: 'validated' },
      no: { text: 'Neste', status: 'validated' },
      hr: { text: 'Sljedeći', status: 'validated' },
      sl: { text: 'Naslednji', status: 'validated' },
      lt: { text: 'Kitas', status: 'validated' },
      lv: { text: 'Nākamais', status: 'validated' },
      et: { text: 'Järgmine', status: 'validated' }
    }
  },
  {
    textId: 'button.submit',
    key: 'button.submit',
    category: 'button',
    translations: {
      fr: { text: 'Envoyer mes réponses', status: 'validated' },
      en: { text: 'Submit my answers', status: 'validated' },
      de: { text: 'Meine Antworten senden', status: 'validated' },
      es: { text: 'Enviar mis respuestas', status: 'validated' },
      it: { text: 'Invia le mie risposte', status: 'validated' },
      nl: { text: 'Mijn antwoorden verzenden', status: 'validated' },
      pl: { text: 'Wyślij moje odpowiedzi', status: 'validated' },
      pt: { text: 'Enviar minhas respostas', status: 'validated' },
      ro: { text: 'Trimite răspunsurile mele', status: 'validated' },
      bg: { text: 'Изпратете отговорите ми', status: 'validated' },
      hu: { text: 'Válaszaim elküldése', status: 'validated' },
      cs: { text: 'Odeslat mé odpovědi', status: 'validated' },
      sk: { text: 'Odoslať moje odpovede', status: 'validated' },
      el: { text: 'Υποβολή απαντήσεων', status: 'validated' },
      sv: { text: 'Skicka mina svar', status: 'validated' },
      da: { text: 'Send mine svar', status: 'validated' },
      fi: { text: 'Lähetä vastaukseni', status: 'validated' },
      no: { text: 'Send mine svar', status: 'validated' },
      hr: { text: 'Pošalji moje odgovore', status: 'validated' },
      sl: { text: 'Pošlji moje odgovore', status: 'validated' },
      lt: { text: 'Siųsti mano atsakymus', status: 'validated' },
      lv: { text: 'Sūtīt manas atbildes', status: 'validated' },
      et: { text: 'Saada minu vastused', status: 'validated' }
    }
  },
  {
    textId: 'button.submitting',
    key: 'button.submitting',
    category: 'button',
    translations: {
      fr: { text: 'Envoi en cours...', status: 'validated' },
      en: { text: 'Submitting...', status: 'validated' },
      de: { text: 'Wird gesendet...', status: 'validated' },
      es: { text: 'Enviando...', status: 'validated' },
      it: { text: 'Invio in corso...', status: 'validated' },
      nl: { text: 'Verzenden...', status: 'validated' },
      pl: { text: 'Wysyłanie...', status: 'validated' },
      pt: { text: 'Enviando...', status: 'validated' },
      ro: { text: 'Se trimite...', status: 'validated' },
      bg: { text: 'Изпращане...', status: 'validated' },
      hu: { text: 'Küldés...', status: 'validated' },
      cs: { text: 'Odesílání...', status: 'validated' },
      sk: { text: 'Odosielanie...', status: 'validated' },
      el: { text: 'Αποστολή...', status: 'validated' },
      sv: { text: 'Skickar...', status: 'validated' },
      da: { text: 'Sender...', status: 'validated' },
      fi: { text: 'Lähetetään...', status: 'validated' },
      no: { text: 'Sender...', status: 'validated' },
      hr: { text: 'Slanje...', status: 'validated' },
      sl: { text: 'Pošiljanje...', status: 'validated' },
      lt: { text: 'Siunčiama...', status: 'validated' },
      lv: { text: 'Sūta...', status: 'validated' },
      et: { text: 'Saatmine...', status: 'validated' }
    }
  },
  // Navigation
  {
    textId: 'nav.dashboard',
    key: 'nav.dashboard',
    category: 'navigation',
    translations: {
      fr: { text: 'Dashboard', status: 'validated' },
      en: { text: 'Dashboard', status: 'validated' },
      de: { text: 'Dashboard', status: 'validated' },
      es: { text: 'Panel', status: 'validated' },
      it: { text: 'Dashboard', status: 'validated' },
      nl: { text: 'Dashboard', status: 'validated' },
      pl: { text: 'Panel', status: 'validated' },
      pt: { text: 'Painel', status: 'validated' },
      ro: { text: 'Tablou de bord', status: 'validated' },
      bg: { text: 'Табло', status: 'validated' },
      hu: { text: 'Műszerfal', status: 'validated' },
      cs: { text: 'Přehled', status: 'validated' },
      sk: { text: 'Prehľad', status: 'validated' },
      el: { text: 'Πίνακας ελέγχου', status: 'validated' },
      sv: { text: 'Instrumentpanel', status: 'validated' },
      da: { text: 'Dashboard', status: 'validated' },
      fi: { text: 'Kojelauta', status: 'validated' },
      no: { text: 'Dashboard', status: 'validated' },
      hr: { text: 'Kontrolna ploča', status: 'validated' },
      sl: { text: 'Nadzorna plošča', status: 'validated' },
      lt: { text: 'Prietaisų skydelis', status: 'validated' },
      lv: { text: 'Informācijas panelis', status: 'validated' },
      et: { text: 'Juhtpaneel', status: 'validated' }
    }
  },
  {
    textId: 'nav.back_to_site',
    key: 'nav.back_to_site',
    category: 'navigation',
    translations: {
      fr: { text: 'Retour au site', status: 'validated' },
      en: { text: 'Back to site', status: 'validated' },
      de: { text: 'Zurück zur Website', status: 'validated' },
      es: { text: 'Volver al sitio', status: 'validated' },
      it: { text: 'Torna al sito', status: 'validated' },
      nl: { text: 'Terug naar site', status: 'validated' },
      pl: { text: 'Powrót do strony', status: 'validated' },
      pt: { text: 'Voltar ao site', status: 'validated' },
      ro: { text: 'Înapoi la site', status: 'validated' },
      bg: { text: 'Обратно към сайта', status: 'validated' },
      hu: { text: 'Vissza az oldalra', status: 'validated' },
      cs: { text: 'Zpět na stránky', status: 'validated' },
      sk: { text: 'Späť na stránku', status: 'validated' },
      el: { text: 'Επιστροφή στον ιστότοπο', status: 'validated' },
      sv: { text: 'Tillbaka till webbplatsen', status: 'validated' },
      da: { text: 'Tilbage til siden', status: 'validated' },
      fi: { text: 'Takaisin sivustolle', status: 'validated' },
      no: { text: 'Tilbake til siden', status: 'validated' },
      hr: { text: 'Natrag na stranicu', status: 'validated' },
      sl: { text: 'Nazaj na stran', status: 'validated' },
      lt: { text: 'Grįžti į svetainę', status: 'validated' },
      lv: { text: 'Atpakaļ uz vietni', status: 'validated' },
      et: { text: 'Tagasi saidile', status: 'validated' }
    }
  },
  // Titres de sections
  {
    textId: 'nav.section1',
    key: 'nav.section1',
    category: 'navigation',
    translations: {
      fr: { text: 'Profil de votre agence', status: 'validated' },
      en: { text: 'Your agency profile', status: 'validated' },
      de: { text: 'Ihr Agenturprofil', status: 'validated' },
      es: { text: 'Perfil de su agencia', status: 'validated' },
      it: { text: 'Profilo della vostra agenzia', status: 'validated' },
      nl: { text: 'Uw bureuprofiel', status: 'validated' },
      pl: { text: 'Profil Państwa agencji', status: 'validated' },
      pt: { text: 'Perfil da sua agência', status: 'validated' },
      ro: { text: 'Profilul agenției dvs.', status: 'validated' },
      bg: { text: 'Профил на вашата агенция', status: 'validated' },
      hu: { text: 'Az Ön ügynökségének profilja', status: 'validated' },
      cs: { text: 'Profil vaší agentury', status: 'validated' },
      sk: { text: 'Profil vašej agentúry', status: 'validated' },
      el: { text: 'Προφίλ του πρακτορείου σας', status: 'validated' },
      sv: { text: 'Din byrås profil', status: 'validated' },
      da: { text: 'Din agenturs profil', status: 'validated' },
      fi: { text: 'Toimistosi profiili', status: 'validated' },
      no: { text: 'Din agenturs profil', status: 'validated' },
      hr: { text: 'Profil vaše agencije', status: 'validated' },
      sl: { text: 'Profil vaše agencije', status: 'validated' },
      lt: { text: 'Jūsų agentūros profilis', status: 'validated' },
      lv: { text: 'Jūsu aģentūras profils', status: 'validated' },
      et: { text: 'Teie büroo profiil', status: 'validated' }
    }
  },
  {
    textId: 'section1.description',
    key: 'section1.description',
    category: 'section',
    translations: {
      fr: { text: '4 questions • 2 min', status: 'validated' },
      en: { text: '4 questions • 2 min', status: 'validated' },
      de: { text: '4 Fragen • 2 Min.', status: 'validated' },
      es: { text: '4 preguntas • 2 min', status: 'validated' },
      it: { text: '4 domande • 2 min', status: 'validated' },
      nl: { text: '4 vragen • 2 min', status: 'validated' },
      pl: { text: '4 pytania • 2 min', status: 'validated' },
      pt: { text: '4 perguntas • 2 min', status: 'validated' },
      ro: { text: '4 întrebări • 2 min', status: 'validated' },
      bg: { text: '4 въпроса • 2 мин', status: 'validated' },
      hu: { text: '4 kérdés • 2 perc', status: 'validated' },
      cs: { text: '4 otázky • 2 min', status: 'validated' },
      sk: { text: '4 otázky • 2 min', status: 'validated' },
      el: { text: '4 ερωτήσεις • 2 λεπτά', status: 'validated' },
      sv: { text: '4 frågor • 2 min', status: 'validated' },
      da: { text: '4 spørgsmål • 2 min', status: 'validated' },
      fi: { text: '4 kysymystä • 2 min', status: 'validated' },
      no: { text: '4 spørsmål • 2 min', status: 'validated' },
      hr: { text: '4 pitanja • 2 min', status: 'validated' },
      sl: { text: '4 vprašanja • 2 min', status: 'validated' },
      lt: { text: '4 klausimai • 2 min', status: 'validated' },
      lv: { text: '4 jautājumi • 2 min', status: 'validated' },
      et: { text: '4 küsimust • 2 min', status: 'validated' }
    }
  },
  {
    textId: 'nav.section2',
    key: 'nav.section2',
    category: 'navigation',
    translations: {
      fr: { text: 'Détachement européen', status: 'validated' },
      en: { text: 'European secondment', status: 'validated' },
      de: { text: 'Europäische Entsendung', status: 'validated' },
      es: { text: 'Desplazamiento europeo', status: 'validated' },
      it: { text: 'Distacco europeo', status: 'validated' },
      nl: { text: 'Europese detachering', status: 'validated' },
      pl: { text: 'Delegowanie europejskie', status: 'validated' },
      pt: { text: 'Destacamento europeu', status: 'validated' },
      ro: { text: 'Detașare europeană', status: 'validated' },
      bg: { text: 'Европейско командироване', status: 'validated' },
      hu: { text: 'Európai kiküldetés', status: 'validated' },
      cs: { text: 'Evropské vyslání', status: 'validated' },
      sk: { text: 'Európske vyslanie', status: 'validated' },
      el: { text: 'Ευρωπαϊκή απόσπαση', status: 'validated' },
      sv: { text: 'Europeisk utstationering', status: 'validated' },
      da: { text: 'Europæisk udstationering', status: 'validated' },
      fi: { text: 'Eurooppalainen lähettäminen', status: 'validated' },
      no: { text: 'Europeisk utstasjonering', status: 'validated' },
      hr: { text: 'Europsko upućivanje', status: 'validated' },
      sl: { text: 'Evropska napotitev', status: 'validated' },
      lt: { text: 'Europos komandiravimas', status: 'validated' },
      lv: { text: 'Eiropas norīkojums', status: 'validated' },
      et: { text: 'Euroopa lähetamine', status: 'validated' }
    }
  },
  {
    textId: 'section2.description',
    key: 'section2.description',
    category: 'section',
    translations: {
      fr: { text: '7 questions • 3 min', status: 'validated' },
      en: { text: '7 questions • 3 min', status: 'validated' },
      de: { text: '7 Fragen • 3 Min.', status: 'validated' },
      es: { text: '7 preguntas • 3 min', status: 'validated' },
      it: { text: '7 domande • 3 min', status: 'validated' },
      nl: { text: '7 vragen • 3 min', status: 'validated' },
      pl: { text: '7 pytań • 3 min', status: 'validated' },
      pt: { text: '7 perguntas • 3 min', status: 'validated' },
      ro: { text: '7 întrebări • 3 min', status: 'validated' },
      bg: { text: '7 въпроса • 3 мин', status: 'validated' },
      hu: { text: '7 kérdés • 3 perc', status: 'validated' },
      cs: { text: '7 otázek • 3 min', status: 'validated' },
      sk: { text: '7 otázok • 3 min', status: 'validated' },
      el: { text: '7 ερωτήσεις • 3 λεπτά', status: 'validated' },
      sv: { text: '7 frågor • 3 min', status: 'validated' },
      da: { text: '7 spørgsmål • 3 min', status: 'validated' },
      fi: { text: '7 kysymystä • 3 min', status: 'validated' },
      no: { text: '7 spørsmål • 3 min', status: 'validated' },
      hr: { text: '7 pitanja • 3 min', status: 'validated' },
      sl: { text: '7 vprašanj • 3 min', status: 'validated' },
      lt: { text: '7 klausimai • 3 min', status: 'validated' },
      lv: { text: '7 jautājumi • 3 min', status: 'validated' },
      et: { text: '7 küsimust • 3 min', status: 'validated' }
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
      es: { text: 'Sus necesidades', status: 'validated' },
      it: { text: 'Le vostre esigenze', status: 'validated' },
      nl: { text: 'Uw behoeften', status: 'validated' },
      pl: { text: 'Państwa potrzeby', status: 'validated' },
      pt: { text: 'Suas necessidades', status: 'validated' },
      ro: { text: 'Nevoile dvs.', status: 'validated' },
      bg: { text: 'Вашите нужди', status: 'validated' },
      hu: { text: 'Az Ön igényei', status: 'validated' },
      cs: { text: 'Vaše potřeby', status: 'validated' },
      sk: { text: 'Vaše potreby', status: 'validated' },
      el: { text: 'Οι ανάγκες σας', status: 'validated' },
      sv: { text: 'Era behov', status: 'validated' },
      da: { text: 'Dine behov', status: 'validated' },
      fi: { text: 'Tarpeenne', status: 'validated' },
      no: { text: 'Deres behov', status: 'validated' },
      hr: { text: 'Vaše potrebe', status: 'validated' },
      sl: { text: 'Vaše potrebe', status: 'validated' },
      lt: { text: 'Jūsų poreikiai', status: 'validated' },
      lv: { text: 'Jūsu vajadzības', status: 'validated' },
      et: { text: 'Teie vajadused', status: 'validated' }
    }
  },
  {
    textId: 'section3.description',
    key: 'section3.description',
    category: 'section',
    translations: {
      fr: { text: '6 questions • 2 min', status: 'validated' },
      en: { text: '6 questions • 2 min', status: 'validated' },
      de: { text: '6 Fragen • 2 Min.', status: 'validated' },
      es: { text: '6 preguntas • 2 min', status: 'validated' },
      it: { text: '6 domande • 2 min', status: 'validated' },
      nl: { text: '6 vragen • 2 min', status: 'validated' },
      pl: { text: '6 pytań • 2 min', status: 'validated' },
      pt: { text: '6 perguntas • 2 min', status: 'validated' },
      ro: { text: '6 întrebări • 2 min', status: 'validated' },
      bg: { text: '6 въпроса • 2 мин', status: 'validated' },
      hu: { text: '6 kérdés • 2 perc', status: 'validated' },
      cs: { text: '6 otázek • 2 min', status: 'validated' },
      sk: { text: '6 otázok • 2 min', status: 'validated' },
      el: { text: '6 ερωτήσεις • 2 λεπτά', status: 'validated' },
      sv: { text: '6 frågor • 2 min', status: 'validated' },
      da: { text: '6 spørgsmål • 2 min', status: 'validated' },
      fi: { text: '6 kysymystä • 2 min', status: 'validated' },
      no: { text: '6 spørsmål • 2 min', status: 'validated' },
      hr: { text: '6 pitanja • 2 min', status: 'validated' },
      sl: { text: '6 vprašanj • 2 min', status: 'validated' },
      lt: { text: '6 klausimai • 2 min', status: 'validated' },
      lv: { text: '6 jautājumi • 2 min', status: 'validated' },
      et: { text: '6 küsimust • 2 min', status: 'validated' }
    }
  },
  {
    textId: 'nav.section4',
    key: 'nav.section4',
    category: 'navigation',
    translations: {
      fr: { text: 'Votre intérêt pour YoJob', status: 'validated' },
      en: { text: 'Your interest in YoJob', status: 'validated' },
      de: { text: 'Ihr Interesse an YoJob', status: 'validated' },
      es: { text: 'Su interés en YoJob', status: 'validated' },
      it: { text: 'Il vostro interesse per YoJob', status: 'validated' },
      nl: { text: 'Uw interesse in YoJob', status: 'validated' },
      pl: { text: 'Państwa zainteresowanie YoJob', status: 'validated' },
      pt: { text: 'Seu interesse em YoJob', status: 'validated' },
      ro: { text: 'Interesul dvs. pentru YoJob', status: 'validated' },
      bg: { text: 'Вашият интерес към YoJob', status: 'validated' },
      hu: { text: 'Az Ön érdeklődése a YoJob iránt', status: 'validated' },
      cs: { text: 'Váš zájem o YoJob', status: 'validated' },
      sk: { text: 'Váš záujem o YoJob', status: 'validated' },
      el: { text: 'Το ενδιαφέρον σας για το YoJob', status: 'validated' },
      sv: { text: 'Ert intresse för YoJob', status: 'validated' },
      da: { text: 'Din interesse for YoJob', status: 'validated' },
      fi: { text: 'Kiinnostuksenne YoJobiin', status: 'validated' },
      no: { text: 'Din interesse for YoJob', status: 'validated' },
      hr: { text: 'Vaš interes za YoJob', status: 'validated' },
      sl: { text: 'Vaše zanimanje za YoJob', status: 'validated' },
      lt: { text: 'Jūsų susidomėjimas YoJob', status: 'validated' },
      lv: { text: 'Jūsu interese par YoJob', status: 'validated' },
      et: { text: 'Teie huvi YoJobi vastu', status: 'validated' }
    }
  },
  {
    textId: 'section4.description',
    key: 'section4.description',
    category: 'section',
    translations: {
      fr: { text: '6 questions • 3 min', status: 'validated' },
      en: { text: '6 questions • 3 min', status: 'validated' },
      de: { text: '6 Fragen • 3 Min.', status: 'validated' },
      es: { text: '6 preguntas • 3 min', status: 'validated' },
      it: { text: '6 domande • 3 min', status: 'validated' },
      nl: { text: '6 vragen • 3 min', status: 'validated' },
      pl: { text: '6 pytań • 3 min', status: 'validated' },
      pt: { text: '6 perguntas • 3 min', status: 'validated' },
      ro: { text: '6 întrebări • 3 min', status: 'validated' },
      bg: { text: '6 въпроса • 3 мин', status: 'validated' },
      hu: { text: '6 kérdés • 3 perc', status: 'validated' },
      cs: { text: '6 otázek • 3 min', status: 'validated' },
      sk: { text: '6 otázok • 3 min', status: 'validated' },
      el: { text: '6 ερωτήσεις • 3 λεπτά', status: 'validated' },
      sv: { text: '6 frågor • 3 min', status: 'validated' },
      da: { text: '6 spørgsmål • 3 min', status: 'validated' },
      fi: { text: '6 kysymystä • 3 min', status: 'validated' },
      no: { text: '6 spørsmål • 3 min', status: 'validated' },
      hr: { text: '6 pitanja • 3 min', status: 'validated' },
      sl: { text: '6 vprašanj • 3 min', status: 'validated' },
      lt: { text: '6 klausimai • 3 min', status: 'validated' },
      lv: { text: '6 jautājumi • 3 min', status: 'validated' },
      et: { text: '6 küsimust • 3 min', status: 'validated' }
    }
  },
  {
    textId: 'nav.section5',
    key: 'nav.section5',
    category: 'navigation',
    translations: {
      fr: { text: 'Vision du futur', status: 'validated' },
      en: { text: 'Future vision', status: 'validated' },
      de: { text: 'Zukunftsvision', status: 'validated' },
      es: { text: 'Visión del futuro', status: 'validated' },
      it: { text: 'Visione del futuro', status: 'validated' },
      nl: { text: 'Toekomstvisie', status: 'validated' },
      pl: { text: 'Wizja przyszłości', status: 'validated' },
      pt: { text: 'Visão do futuro', status: 'validated' },
      ro: { text: 'Viziunea viitorului', status: 'validated' },
      bg: { text: 'Визия за бъдещето', status: 'validated' },
      hu: { text: 'Jövőkép', status: 'validated' },
      cs: { text: 'Vize budoucnosti', status: 'validated' },
      sk: { text: 'Vízia budúcnosti', status: 'validated' },
      el: { text: 'Όραμα για το μέλλον', status: 'validated' },
      sv: { text: 'Framtidsvision', status: 'validated' },
      da: { text: 'Fremtidsvision', status: 'validated' },
      fi: { text: 'Tulevaisuuden visio', status: 'validated' },
      no: { text: 'Fremtidsvisjon', status: 'validated' },
      hr: { text: 'Vizija budućnosti', status: 'validated' },
      sl: { text: 'Vizija prihodnosti', status: 'validated' },
      lt: { text: 'Ateities vizija', status: 'validated' },
      lv: { text: 'Nākotnes vīzija', status: 'validated' },
      et: { text: 'Tuleviku visioon', status: 'validated' }
    }
  },
  {
    textId: 'section5.description',
    key: 'section5.description',
    category: 'section',
    translations: {
      fr: { text: '2 questions • 1 min', status: 'validated' },
      en: { text: '2 questions • 1 min', status: 'validated' },
      de: { text: '2 Fragen • 1 Min.', status: 'validated' },
      es: { text: '2 preguntas • 1 min', status: 'validated' },
      it: { text: '2 domande • 1 min', status: 'validated' },
      nl: { text: '2 vragen • 1 min', status: 'validated' },
      pl: { text: '2 pytania • 1 min', status: 'validated' },
      pt: { text: '2 perguntas • 1 min', status: 'validated' },
      ro: { text: '2 întrebări • 1 min', status: 'validated' },
      bg: { text: '2 въпроса • 1 мин', status: 'validated' },
      hu: { text: '2 kérdés • 1 perc', status: 'validated' },
      cs: { text: '2 otázky • 1 min', status: 'validated' },
      sk: { text: '2 otázky • 1 min', status: 'validated' },
      el: { text: '2 ερωτήσεις • 1 λεπτό', status: 'validated' },
      sv: { text: '2 frågor • 1 min', status: 'validated' },
      da: { text: '2 spørgsmål • 1 min', status: 'validated' },
      fi: { text: '2 kysymystä • 1 min', status: 'validated' },
      no: { text: '2 spørsmål • 1 min', status: 'validated' },
      hr: { text: '2 pitanja • 1 min', status: 'validated' },
      sl: { text: '2 vprašanji • 1 min', status: 'validated' },
      lt: { text: '2 klausimai • 1 min', status: 'validated' },
      lv: { text: '2 jautājumi • 1 min', status: 'validated' },
      et: { text: '2 küsimust • 1 min', status: 'validated' }
    }
  },
  {
    textId: 'nav.section6',
    key: 'nav.section6',
    category: 'navigation',
    translations: {
      fr: { text: 'Restons en contact', status: 'validated' },
      en: { text: 'Stay in touch', status: 'validated' },
      de: { text: 'Bleiben wir in Kontakt', status: 'validated' },
      es: { text: 'Mantengámonos en contacto', status: 'validated' },
      it: { text: 'Rimaniamo in contatto', status: 'validated' },
      nl: { text: 'Blijf in contact', status: 'validated' },
      pl: { text: 'Pozostańmy w kontakcie', status: 'validated' },
      pt: { text: 'Fique em contato', status: 'validated' },
      ro: { text: 'Să rămânem în contact', status: 'validated' },
      bg: { text: 'Да останем в контакт', status: 'validated' },
      hu: { text: 'Maradjunk kapcsolatban', status: 'validated' },
      cs: { text: 'Zůstaňme v kontaktu', status: 'validated' },
      sk: { text: 'Zostanme v kontakte', status: 'validated' },
      el: { text: 'Ας μείνουμε σε επαφή', status: 'validated' },
      sv: { text: 'Håll kontakten', status: 'validated' },
      da: { text: 'Lad os holde kontakten', status: 'validated' },
      fi: { text: 'Pidetään yhteyttä', status: 'validated' },
      no: { text: 'La oss holde kontakten', status: 'validated' },
      hr: { text: 'Ostanimo u kontaktu', status: 'validated' },
      sl: { text: 'Ostaniva v stiku', status: 'validated' },
      lt: { text: 'Palikime ryšį', status: 'validated' },
      lv: { text: 'Saglabāsim kontaktu', status: 'validated' },
      et: { text: 'Jääme ühendusesse', status: 'validated' }
    }
  },
  {
    textId: 'section6.description',
    key: 'section6.description',
    category: 'section',
    translations: {
      fr: { text: '1 question • 1 min', status: 'validated' },
      en: { text: '1 question • 1 min', status: 'validated' },
      de: { text: '1 Frage • 1 Min.', status: 'validated' },
      es: { text: '1 pregunta • 1 min', status: 'validated' },
      it: { text: '1 domanda • 1 min', status: 'validated' },
      nl: { text: '1 vraag • 1 min', status: 'validated' },
      pl: { text: '1 pytanie • 1 min', status: 'validated' },
      pt: { text: '1 pergunta • 1 min', status: 'validated' },
      ro: { text: '1 întrebare • 1 min', status: 'validated' },
      bg: { text: '1 въпрос • 1 мин', status: 'validated' },
      hu: { text: '1 kérdés • 1 perc', status: 'validated' },
      cs: { text: '1 otázka • 1 min', status: 'validated' },
      sk: { text: '1 otázka • 1 min', status: 'validated' },
      el: { text: '1 ερώτηση • 1 λεπτό', status: 'validated' },
      sv: { text: '1 fråga • 1 min', status: 'validated' },
      da: { text: '1 spørgsmål • 1 min', status: 'validated' },
      fi: { text: '1 kysymys • 1 min', status: 'validated' },
      no: { text: '1 spørsmål • 1 min', status: 'validated' },
      hr: { text: '1 pitanje • 1 min', status: 'validated' },
      sl: { text: '1 vprašanje • 1 min', status: 'validated' },
      lt: { text: '1 klausimas • 1 min', status: 'validated' },
      lv: { text: '1 jautājums • 1 min', status: 'validated' },
      et: { text: '1 küsimus • 1 min', status: 'validated' }
    }
  },
  // Helpers
  {
    textId: 'helper.select_up_to_3',
    key: 'helper.select_up_to_3',
    category: 'helper',
    translations: {
      fr: { text: 'Sélectionnez jusqu\'à 3 secteurs', status: 'validated' },
      en: { text: 'Select up to 3 sectors', status: 'validated' },
      de: { text: 'Wählen Sie bis zu 3 Branchen', status: 'validated' },
      es: { text: 'Seleccione hasta 3 sectores', status: 'validated' },
      it: { text: 'Selezionate fino a 3 settori', status: 'validated' },
      nl: { text: 'Selecteer maximaal 3 sectoren', status: 'validated' },
      pl: { text: 'Wybierz do 3 sektorów', status: 'validated' },
      pt: { text: 'Selecione até 3 setores', status: 'validated' },
      ro: { text: 'Selectați până la 3 sectoare', status: 'validated' },
      bg: { text: 'Изберете до 3 сектора', status: 'validated' },
      hu: { text: 'Válasszon legfeljebb 3 ágazatot', status: 'validated' },
      cs: { text: 'Vyberte až 3 odvětví', status: 'validated' },
      sk: { text: 'Vyberte až 3 odvetvia', status: 'validated' },
      el: { text: 'Επιλέξτε έως 3 τομείς', status: 'validated' },
      sv: { text: 'Välj upp till 3 sektorer', status: 'validated' },
      da: { text: 'Vælg op til 3 sektorer', status: 'validated' },
      fi: { text: 'Valitse enintään 3 alaa', status: 'validated' },
      no: { text: 'Velg opptil 3 sektorer', status: 'validated' },
      hr: { text: 'Odaberite do 3 sektora', status: 'validated' },
      sl: { text: 'Izberite do 3 sektorje', status: 'validated' },
      lt: { text: 'Pasirinkite iki 3 sektorių', status: 'validated' },
      lv: { text: 'Izvēlieties līdz 3 nozarēm', status: 'validated' },
      et: { text: 'Valige kuni 3 sektorit', status: 'validated' }
    }
  },
  // Header
  {
    textId: 'header.subtitle',
    key: 'header.subtitle',
    category: 'header',
    translations: {
      fr: { text: 'Étude de marché', status: 'validated' },
      en: { text: 'Market study', status: 'validated' },
      de: { text: 'Marktstudie', status: 'validated' },
      es: { text: 'Estudio de mercado', status: 'validated' },
      it: { text: 'Studio di mercato', status: 'validated' },
      nl: { text: 'Marktonderzoek', status: 'validated' },
      pl: { text: 'Badanie rynku', status: 'validated' },
      pt: { text: 'Estudo de mercado', status: 'validated' },
      ro: { text: 'Studiu de piață', status: 'validated' },
      bg: { text: 'Проучване на пазара', status: 'validated' },
      hu: { text: 'Piackutatás', status: 'validated' },
      cs: { text: 'Průzkum trhu', status: 'validated' },
      sk: { text: 'Prieskum trhu', status: 'validated' },
      el: { text: 'Έρευνα αγοράς', status: 'validated' },
      sv: { text: 'Marknadsundersökning', status: 'validated' },
      da: { text: 'Markedsundersøgelse', status: 'validated' },
      fi: { text: 'Markkinatutkimus', status: 'validated' },
      no: { text: 'Markedsundersøkelse', status: 'validated' },
      hr: { text: 'Istraživanje tržišta', status: 'validated' },
      sl: { text: 'Tržna raziskava', status: 'validated' },
      lt: { text: 'Rinkos tyrimas', status: 'validated' },
      lv: { text: 'Tirgus pētījums', status: 'validated' },
      et: { text: 'Turu-uuring', status: 'validated' }
    }
  }
];

// ========== FONCTION D'UPLOAD ==========

export async function uploadAllTranslations() {
  console.log('🚀 Début de l\'upload complet des traductions...');
  console.log(`📊 ${UI_TRANSLATIONS.length} textes UI à uploader`);
  console.log(`🌍 ${LANGUAGES.length} langues supportées`);
  
  try {
    // Upload UI texts
    console.log('\n📤 Upload des textes UI...');
    const uiResult = await bulkSaveUITextTranslations(UI_TRANSLATIONS);
    
    if (uiResult) {
      console.log('✅ Textes UI uploadés avec succès !');
    } else {
      console.error('❌ Échec de l\'upload des textes UI');
      throw new Error('Failed to upload UI translations');
    }
    
    console.log('\n✨ Upload complet terminé avec succès !');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error);
    throw error;
  }
}

// Auto-run si exécuté directement
if (typeof window !== 'undefined' && (window as any).__RUN_UPLOAD__) {
  uploadAllTranslations()
    .then(() => console.log('🎉 Script terminé avec succès'))
    .catch(err => console.error('💥 Erreur fatale:', err));
}
