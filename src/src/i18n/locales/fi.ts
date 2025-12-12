/**
 * 🇫🇮 TRADUCTIONS FINNOISES (FI)
 * 
 * Traductions complètes pour le finnois
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const fi: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profiili',
    section2: 'Kokemus',
    section3: 'Tarpeet',
    section4: 'Kiinnostus',
    section5: 'Visio',
    section6: 'Yhteystiedot',
    dashboard: 'Hallintapaneeli',
    back_to_site: 'Takaisin sivustolle',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Hallintapaneeli',
    tabs: {
      overview: 'Yleiskatsaus',
      results: 'Tulokset',
      questions: 'Kysymykset',
      translations: 'Käännökset',
      export: 'Vienti',
      integrations: 'Integraatiot',
      cms: 'CMS-lomake',
      settings: 'Asetukset',
      prospects: 'Potentiaaliset asiakkaat',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Uusi',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Kirjaudu ulos',
      back_to_survey: 'Takaisin kyselyyn',
      toggle_sidebar: 'Supista/Laajenna',
    },
    user: {
      welcome: 'Tervetuloa',
      logged_in_as: 'Kirjautunut sisään',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profiili',
      description: '4 kysymystä • 2 min',
    },
    2: {
      title: 'Kokemus',
      description: '7 kysymystä • 3 min',
    },
    3: {
      title: 'Tarpeet',
      description: '6 kysymystä • 2 min',
    },
    4: {
      title: 'Kiinnostus YoJobiin',
      description: '6 kysymystä • 3 min',
    },
    5: {
      title: 'Tulevaisuuden visio',
      description: '2 kysymystä • 1 min',
    },
    6: {
      title: 'Yhteystiedot',
      description: '1 kysymys • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Yrityksenne profiili',
        description: 'Kerro meille toimistostasi ja sen osaamisesta',
      },
      client: {
        title: '📋 Yrityksenne profiili',
        description: 'Kerro meille yrityksestäsi ja rekrytointitarpeista',
      },
      worker: {
        title: '📋 Profiilisi',
        description: 'Kerro meille ammatillisesta taustastasi',
      },
    },
    2: {
      agency: {
        title: '💼 Lähettämistoiminta',
        description: 'Kokemuksesi työntekijöiden lähettämisestä',
      },
      client: {
        title: '💼 Rekrytointikokemuksesi',
        description: 'Nykyinen rekrytointisi ja vuokratyö',
      },
      worker: {
        title: '💼 Vuokratyökokemuksesi',
        description: 'Matkasi toimiston työntekijänä',
      },
    },
    3: {
      agency: {
        title: '🎯 Tarpeet ja työkalut',
        description: 'Haasteesi ja nykyiset ratkaisut',
      },
      client: {
        title: '🎯 Nykyiset tarpeesi',
        description: 'Haasteet ja odotukset rekrytoinnissa',
      },
      worker: {
        title: '🎯 Odotuksesi',
        description: 'Mikä on sinulle tärkeää tehtävässä',
      },
    },
    4: {
      agency: {
        title: '⭐ Kiinnostus eurooppalaista alustaa kohtaan',
        description: 'Tutustu innovatiiviseen markkinavisoomme',
      },
      client: {
        title: '⭐ Kiinnostus eurooppalaista alustaa kohtaan',
        description: 'Innovatiivinen ratkaisu tarpeisiisi',
      },
      worker: {
        title: '⭐ Kiinnostuksesi alustaan',
        description: 'Alusta helpompaan tehtävien hakuun',
      },
    },
    5: {
      agency: {
        title: '🔮 Tulevaisuuden visio',
        description: 'Budjetti ja kehitysnäkymät',
      },
      client: {
        title: '🔮 Tulevaisuuden prioriteettisi',
        description: 'Budjetti ja rekrytointistrategia',
      },
      worker: {
        title: '🔮 Tavoitteesi',
        description: 'Tulevat ammatilliset projektisi',
      },
    },
    6: {
      agency: {
        title: '📧 Pysy yhteydessä',
        description: 'Vastaanota tutkimustulokset ja pysy ajan tasalla',
      },
      client: {
        title: '📧 Pysy yhteydessä',
        description: 'Vastaanota tulokset ja suosituksemme',
      },
      worker: {
        title: '📧 Pysy yhteydessä',
        description: 'Vastaanota tulokset ja mahdollisuudet',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Markkinatutkimus',
  },
  
  // Hero
  hero: {
    title: 'Markkinakysely',
    subtitle: 'Auta meitä ymmärtämään tarpeitasi paremmin',
    description: 'Tämä kysely kestää noin 10-15 minuuttia. Vastauksesi auttavat meitä luomaan toimialallesi räätälöidyn ratkaisun.',
    cta_start: 'Aloita kysely',
    cta_dashboard: 'Avaa hallintapaneeli',
    badge: 'Eurooppalainen markkinatutkimus',
    stat: {
      countries: '27 eurooppalaista maata',
      questions: 'kysymystä',
      benchmark: 'Hanki 2025-vertailuarvo',
      insights: 'Eksklusiiviset markkinatiedot',
      opportunities: 'Ensisijainen pääsy töihin',
    },
    footer: {
      info: 'kysymystä • Anonyymi • GDPR-yhteensopiva',
      anonymous: 'Anonyymi',
      gdpr: 'GDPR-yhteensopiva',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kuka olet?',
    subtitle: 'Valitse profiilisi kysymysten mukauttamiseksi',
    agency: 'Työvoimatoimisto',
    agency_description: 'Olet vuokratyö- tai lähettämistoimisto',
    client: 'Asiakas',
    client_description: 'Olet yritys, joka palkkaa toimiston työntekijöitä',
    worker: 'Toimiston työntekijä',
    worker_description: 'Olet toimiston työntekijä tai lähetetty työntekijä',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Eurooppalainen markkinatutkimus - Työllisyys ja Vuokratyö',
    title: 'Jaa kokemuksesi Euroopan markkinoilta',
    subtitle: 'Valitse profiilisi kyselyn aloittamiseksi',
    cta: 'Napsauta aloittaaksesi →',
    trust: {
      secure: 'Turvalliset tiedot',
      languages: '{count} kieltä saatavilla',
      languages_suffix: 'kieltä saatavilla',
      anonymous: 'Anonyymi ja luottamuksellinen',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Työvoimatoimisto',
      description: 'Olet eurooppalainen vuokratyötoimisto. Jaa lähettämiskokemuksesi.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Asiakas',
      description: 'Palkkaat toimiston työntekijöitä. Jaa tarpeesi ja odotuksesi.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Toimiston työntekijä',
      description: 'Työskentelet toimiston työntekijänä. Jaa kokemuksesi kentältä.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Edellinen',
    next: 'Seuraava',
    submit: 'Lähetä vastaukset',
    submitting: 'Lähetetään...',
    back: 'Takaisin',
    start: 'Aloita',
  },
  
  // Confirmation
  confirmation: {
    title: 'Kiitos osallistumisestasi!',
    subtitle: 'Vastauksesi on tallennettu onnistuneesti',
    message: 'Analysoimme parhaillaan kaikkia vastauksia luodaksemme ratkaisun, joka on täysin räätälöity tarpeisiisi.',
    cta_back: 'Takaisin etusivulle',
    cta_dashboard: 'Näytä hallintapaneeli',
  },
  
  // Progress
  progress: {
    section: 'Osio',
    question: 'Kysymys',
    section_completed: 'Osio valmis',
    questions_remaining: '{count} kysymystä jäljellä',
    time_remaining: 'Noin {time} jäljellä',
  },
  
  // Common translations
  common: {
    oui: 'Kyllä',
    non: 'Ei',
    autre: 'Muu',
    loading: 'Ladataan...',
    submit: 'Lähetä',
    next: 'Seuraava',
    previous: 'Edellinen',
    skip: 'Ohita',
    save: 'Tallenna',
    cancel: 'Peruuta',
    close: 'Sulje',
    required: 'Pakollinen',
    optional: 'Valinnainen',
    error: 'Virhe',
    success: 'Onnistui',
    completed: 'Valmis',
    inProgress: 'Käynnissä',
    notStarted: 'Ei aloitettu',
    profileAgency: 'Työvoimatoimisto',
    profileClient: 'Asiakas',
    profileWorker: 'Toimiston työntekijä',
  },
  
  // Sectors
  sectors: {
    btp: 'Rakentaminen',
    industrie: 'Teollisuus',
    logistique: 'Logistiikka',
    hotellerie: 'Vieraanvaraisuus',
    sante: 'Terveydenhuolto',
    agriculture: 'Maatalous',
    tech: 'Teknologia/IT',
    autres: 'Muu',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions FI
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nimi',
      placeholder: 'Organisaation nimi tai koko nimesi',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Perustamisvuosi',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Yrityksesi perustamisvuosi',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Kansallisuutesi',
      placeholder: 'esim.: puolalainen, romanialainen...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisaation koko',
      options: {
        '1-9': '1-9 työntekijää',
        '10-49': '10-49 työntekijää',
        '50-249': '50-249 työntekijää',
        '250+': '250+ työntekijää',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Vuokratyökokemuksen vuodet',
      options: {
        '<1': 'Alle 1 vuosi',
        '1-3': '1-3 vuotta',
        '3-5': '3-5 vuotta',
        '5-10': '5-10 vuotta',
        '10+': 'Yli 10 vuotta',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Pääsektorit',
      description: 'Valitse kaikki asiaankuuluvat sektorit',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Ammattisi',
      description: 'Valitse kaikki ammattisi',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Toimistosi maa',
      placeholder: 'esim.: Puola',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Maa, jossa yrityksesi toimii',
      placeholder: 'esim.: Ranska',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Maat, joissa olet työskennellyt toimiston työntekijänä',
      placeholder: 'esim.: Ranska, Saksa, Belgia...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Vuotuinen lähetettyjen työntekijöiden määrä',
      options: {
        '0': 'Ei vielä yhtään',
        '1-50': '1-50 työntekijää',
        '51-200': '51-200 työntekijää',
        '201-500': '201-500 työntekijää',
        '500+': 'Yli 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Kuinka monta toimiston työntekijää palkkaatte vuosittain?',
      options: {
        '0': 'Ei yhtään tällä hetkellä',
        '1-10': '1-10 henkilöä',
        '11-50': '11-50 henkilöä',
        '51-200': '51-200 henkilöä',
        '200+': '200+ henkilöä',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Kuinka usein työskentelet toimiston työntekijänä?',
      options: {
        permanent: 'Säännöllisesti (koko vuoden)',
        saisonnier: 'Kausittain (tietyt kuukaudet)',
        occasionnel: 'Satunnaisesti',
        jamais: 'En vielä koskaan (etsin)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Mistä lähetetyt työntekijäsi tulevat?',
      placeholder: 'esim.: Puola, Romania, Bulgaria...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Kohdemaat',
      description: 'Maat, joihin lähetät työntekijöitä',
      placeholder: 'esim.: Ranska, Saksa, Belgia, Alankomaat...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Palkkaamiesi toimiston työntekijöiden kansallisuudet',
      placeholder: 'esim.: puolalainen, romanialainen, bulgarialainen...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Suurin haasteesi kansainvälisessä lähettämisessä',
      options: {
        admin: 'Hallinnollinen monimutkaisuus (A1, SIPSI...)',
        conformite: 'Sääntöjen noudattaminen useissa maissa',
        cout: 'Hallinnointikustannukset ja aika',
        langues: 'Kieliesteet',
        autre: 'Muu',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Suurin haasteesi eurooppalaisten toimiston työntekijöiden kanssa',
      options: {
        trouver: 'Luotettavien toimistojen löytäminen',
        conformite: 'Juridinen noudattaminen',
        qualite: 'Laatu/taidot',
        cout: 'Liian korkeat kustannukset',
        langues: 'Viestintä / Kielet',
        autre: 'Muu',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Suurin haasteesi vuokratyössä ulkomailla',
      options: {
        admin: 'Hallinnollinen paperityö',
        langue: 'Kielimuurit',
        logement: 'Asunnon löytäminen',
        transport: 'Liikenne',
        salaire: 'Maksu-/palkkakysymykset',
        autre: 'Muu',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Täsmennä suurin haasteesi',
      placeholder: 'Kuvaile suurinta haastettasi...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Miten hallitsette lähettämishakemuksia tänään?',
      options: {
        interne: 'Sisäinen tiimi',
        externe: 'Ulkoinen palveluntarjoaja',
        mixte: 'Sekoitettu lähestymistapa',
        manuel: 'Manuaalinen hallinta',
        logiciel: 'Erikoistunut ohjelmisto',
        manuel: 'Manuaalisesti (Excel, Word...)',
        logiciel_interne: 'Sisäinen ohjelmisto',
        prestataire: 'Ulkoinen palveluntarjoaja',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kuinka monta työvoimatoimistoa käytätte?',
      options: {
        '0': 'Ei yhtään',
        '1': '1 toimisto',
        '2-3': '2-3 toimistoa',
        '4-10': '4-10 toimistoa',
        '10+': 'Yli 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Miten palkkaatte toimiston työntekijöitä?',
      options: {
        agence_fr: 'Ranskalaiset työvoimatoimistot',
        agence_euro: 'Eurooppalaiset työvoimatoimistot',
        direct: 'Suora palkkaus',
        mixte: 'Sekoitettu',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Miten etsit vuokratyötä?',
      options: {
        agence: 'Työvoimatoimistojen kautta',
        bouche: 'Suositus',
        internet: 'Verkkotyöportaalit',
        direct: 'Suora hakemus',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Kuinka monen toimiston kanssa teet yhteistyötä?',
      options: {
        '1': 'Vain 1 toimisto',
        '2-3': '2-3 toimistoa',
        '4-10': '4-10 toimistoa',
        '10+': 'Yli 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Oletko saanut sakkoja tai tapauksia liittyen lähettämisen noudattamiseen?',
      description: 'Vastauksesi pysyy anonyyminä',
      options: {
        jamais: 'Ei, ei koskaan',
        rarement: 'Harvoin (1-2 kertaa)',
        parfois: 'Joskus (3-5 kertaa)',
        souvent: 'Usein (6+ kertaa)',
        oui_souvent: 'Kyllä, usein',
        oui_rare: 'Kyllä, satunnaisesti',
        non: 'Ei',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Tarkastatteko työvoimatoimistojen juridisen noudattamisen?',
      options: {
        oui_systematique: 'Kyllä, systemaattisesti',
        oui_parfois: 'Kyllä, joskus',
        non: 'Ei',
        ne_sait_pas: 'En tiedä',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Oletko kokenut ongelmia vuokratyössä ulkomailla?',
      options: {
        oui_graves: 'Kyllä, vakavia ongelmia',
        oui_mineurs: 'Kyllä, pieniä ongelmia',
        non: 'Ei',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Onko teillä budjettia ulkoisille palveluille lähettämisen hallintaan?',
      options: {
        oui_important: 'Kyllä, merkittävä',
        oui_modere: 'Kyllä, kohtalainen',
        non: 'Ei',
        ne_sait_pas: 'En tiedä',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Mitkä ovat tärkeimmät kriteerit työvoimatoimiston valinnassa?',
      description: 'Valitse useita vaihtoehtoja',
    },
    
    // Q12 : Budget client (CLIENT) - Version intérim
    q12_budget_client: {
      label: 'Vuosibudjetti vuokratyöhön',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        inconnu: 'En tiedä',
      },
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Kuinka tyytyväinen olet nykyisiin työoloihisi?',
      options: {
        tres_satisfait: 'Erittäin tyytyväinen',
        satisfait: 'Tyytyväinen',
        neutre: 'Neutraali',
        insatisfait: 'Tyytymätön',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Lähettämistehtäviesi keskimääräinen kesto',
      options: {
        '<1mois': 'Alle 1 kuukausi',
        '1-3mois': '1-3 kuukautta',
        '3-6mois': '3-6 kuukautta',
        '6-12mois': '6-12 kuukautta',
        '12+mois': 'Yli 12 kuukautta',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Mikä on vuosibudjettinne vuokratyöhön?',
      options: {
        '<50k': 'Alle €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Yli €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Suosimasi tehtävän kesto',
      options: {
        court: 'Lyhyt (< 3 kuukautta)',
        moyen: 'Keskipitkä (3-6 kuukautta)',
        long: 'Pitkä (> 6 kuukautta)',
        indifferent: 'Ei väliä',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Olisitko kiinnostunut eurooppalaisesta alustasta palvelujesi tarjoamiseen?',
      description: 'Markkinapaikka näkyvyytesi lisäämiseksi',
      options: {
        tres_interesse: 'Erittäin kiinnostunut',
        interesse: 'Kiinnostunut',
        neutre: 'Neutraali',
        pas_interesse: 'Ei kiinnostunut',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Olisitko kiinnostunut alustasta eurooppalaisten toimistojen helpoksi löytämiseksi?',
      options: {
        tres_interesse: 'Erittäin kiinnostunut',
        interesse: 'Kiinnostunut',
        neutre: 'Neutraali',
        pas_interesse: 'Ei kiinnostunut',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Olisitko kiinnostunut alustasta tehtävien hakuun?',
      options: {
        tres_interesse: 'Erittäin kiinnostunut',
        interesse: 'Kiinnostunut',
        neutre: 'Neutraali',
        pas_interesse: 'Ei kiinnostunut',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Mitkä ominaisuudet olisivat hyödyllisimpiä?',
      description: 'Valitse useita vaihtoehtoja',
      options: {
        marketplace: 'Palvelujen markkinapaikka',
        admin: 'Automatisoitu hallinto',
        conformite: 'Noudattamisen tarkistukset',
        payment: 'Integroidut maksut',
        support: 'Monikielinen tuki',
        autre: 'Muu',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Mitkä ominaisuudet olisivat hyödyllisimpiä?',
      description: 'Valitse useita vaihtoehtoja',
      options: {
        comparaison: 'Toimistojen vertailu',
        avis: 'Vahvistetut arvostelut',
        suivi: 'Tehtävien seuranta',
        documentation: 'Keskitetty dokumentaatio',
        facturation: 'Laskujen hallinta',
        autre: 'Muu',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Mitkä ominaisuudet olisivat hyödyllisimpiä?',
      description: 'Valitse useita vaihtoehtoja',
      options: {
        recherche: 'Edistynyt tehtävien haku',
        alertes: 'Ilmoitukset uusista tehtävistä',
        documents: 'Asiakirjojen hallinta',
        avis: 'Toimistojen arvioinnit',
        support: 'Monikielinen tuki',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Mikä olisi suurin esteesi tällaisen alustan käytölle?',
      options: {
        cout: 'Kustannukset',
        complexite: 'Liian monimutkainen',
        confiance: 'Luottamuksen puute',
        changement: 'En halua muuttaa',
        aucun: 'Ei esteitä',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Mikä olisi suurin esteesi?',
      options: {
        cout: 'Kustannukset',
        confiance: 'Luottamus toimistoihin',
        complexite: 'Liian monimutkainen',
        aucun: 'Ei esteitä',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Mikä olisi suurin esteesi?',
      options: {
        complexite: 'Liian monimutkainen',
        confiance: 'Luottamus alustaan',
        acces: 'Pääsy teknologiaan',
        aucun: 'Ei esteitä',
        autre: 'Muu',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Mikä hinnoittelumalli vaikuttaa sinulle sopivimmalta?',
      options: {
        commission: 'Palkkio per tehtävä',
        abonnement: 'Kuukausitilaus',
        freemium: 'Ilmainen + premium-ominaisuudet',
        autre: 'Muu',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Mitä palveluita arvostat eniten?',
      description: 'Valitse useita vaihtoehtoja',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Mitä palveluita arvostat eniten?',
      description: 'Valitse useita vaihtoehtoja',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Suosittelisitko tällaista alustaa kollegoille?',
      options: {
        certainement: 'Ehdottomasti',
        probablement: 'Todennäköisesti',
        peut_etre: 'Ehkä',
        probablement_pas: 'Todennäköisesti ei',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Suosittelisitko tällaista ratkaisua?',
      options: {
        certainement: 'Ehdottomasti',
        probablement: 'Todennäköisesti',
        peut_etre: 'Ehkä',
        probablement_pas: 'Todennäköisesti ei',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Suosittelisitko tällaista alustaa?',
      options: {
        certainement: 'Ehdottomasti',
        probablement: 'Todennäköisesti',
        peut_etre: 'Ehkä',
        probablement_pas: 'Todennäköisesti ei',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Haluaisitko osallistua beeta-vaiheeseen?',
      options: {
        oui_immediat: 'Kyllä, heti',
        oui_plus_tard: 'Kyllä, mutta myöhemmin',
        non: 'Ei',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Haluaisitko osallistua testaukseen?',
      options: {
        oui_immediat: 'Kyllä, heti',
        oui_plus_tard: 'Kyllä, mutta myöhemmin',
        non: 'Ei',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Haluaisitko osallistua testaukseen?',
      options: {
        oui_immediat: 'Kyllä, heti',
        oui_plus_tard: 'Kyllä, mutta myöhemmin',
        non: 'Ei',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Miten näet lähettämistoimintasi seuraavan 3 vuoden aikana?',
      options: {
        forte_croissance: 'Voimakas kasvu',
        croissance: 'Kohtalainen kasvu',
        stable: 'Vakaa',
        decroissance: 'Lasku',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Miten näet vuokratyötarpeidesi kehityksen?',
      options: {
        hausse: 'Nousu',
        stable: 'Vakaa',
        baisse: 'Lasku',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Mitkä ovat projektisi tulevina kuukausina?',
      options: {
        meme_secteur: 'Jatkaa samalla sektorilla',
        changer_secteur: 'Vaihtaa sektoria',
        se_former: 'Kouluttautua',
        entrepreneur: 'Ryhtyä yrittäjäksi',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Aiotteko lisätä budjettia ulkoisille palveluille?',
      options: {
        oui_beaucoup: 'Kyllä, merkittävästi',
        oui_peu: 'Kyllä, hieman',
        non: 'Ei',
        ne_sait_pas: 'En tiedä',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Aiotteko lisätä rekrytointibudjettia?',
      options: {
        oui_beaucoup: 'Kyllä, merkittävästi',
        oui_peu: 'Kyllä, hieman',
        non: 'Ei',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Oletko valmis muuttamaan työn vuoksi?',
      options: {
        oui_europe: 'Kyllä, minne tahansa Eurooppaan',
        oui_proche: 'Kyllä, naapurimaihin',
        non: 'Ei, vain omassa maassani',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'Sähköposti (valinnainen)',
      placeholder: 'sinun@email.fi',
      description: 'Tulosten ja projektin tietojen vastaanottamiseksi',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Yrityksen sähköposti (valinnainen)',
      placeholder: 'yhteystiedot@sinuntoimisto.fi',
      description: 'Tulosten ja eksklusiivisen pääsyn vastaanottamiseksi alustalle',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Yrityksen sähköposti (valinnainen)',
      placeholder: 'yhteystiedot@sinun-yritys.fi',
      description: 'Tarpeisiisi räätälöityjen suositusten vastaanottamiseksi',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'Sähköposti (valinnainen)',
      placeholder: 'sinun@email.fi',
      description: 'Profiiliisi sopivien mahdollisuuksien vastaanottamiseksi',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Puhelin (valinnainen)',
      placeholder: '+358 40 123 4567',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Lisäkommentit tai ehdotukset',
      placeholder: 'Jaa ideasi, odotuksesi tai erityiset tarpeesi...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Markkinanäkymä seuraavien 3 vuoden aikana',
      placeholder: 'Jaa näkemyksesi...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Muut tarpeet tai ehdotukset',
      placeholder: 'Ehdotuksesi kiinnostavat meitä...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Yrityksen puhelinnumero',
      placeholder: '+358 40 123 4567',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Etunimi',
      placeholder: 'Etunimesi',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Sukunimi',
      placeholder: 'Sukunimesi',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'Y-tunnus (valinnainen)',
      placeholder: '1234567-8',
      description: 'Rikastuttamiseen PRH/YTJ kautta',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'Sähköposti',
      placeholder: 'sinun.email@esimerkki.fi',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Hyväksyn yhteydenoton uudelleen',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Haluaisin saada tutkimusraportin',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Hinta',
    },
    critere_qualite: {
      label: 'Profiilin laatu',
    },
    critere_rapidite: {
      label: 'Vastausnopeus',
    },
    critere_conformite: {
      label: 'Juridinen noudattaminen',
    },
    critere_flexibilite: {
      label: 'Joustavuus',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Henkilökohtainen tuki',
    },
    service_garantie: {
      label: 'Korvaustakuu',
    },
    service_formation: {
      label: 'Ennakkokoulutus',
    },
    service_gestion: {
      label: 'Hallinnollinen käsittely',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Koulutukset ja sertifikaatit',
    },
    service_logement: {
      label: 'Apu asumisessa',
    },
    service_transport: {
      label: 'Kuljetustuki',
    },
    service_administratif: {
      label: 'Hallinnollinen tuki',
    },
  },
};