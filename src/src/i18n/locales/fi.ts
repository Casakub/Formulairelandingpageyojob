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
    score_not_interested: 'Ei kiinnosta',
    score_very_interested: 'Erittäin kiinnostunut',
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
      ...fr.questions.q10_gestion,
      label: 'Miten hallitsette lähettämisilmoitukset tänään?',
      options: {
        interne: 'Sisäinen tiimi',
        externe: 'Ulkoinen palveluntarjoaja',
        mixte: 'Sekamuotoinen',
        manuel: 'Manuaalinen hallinta',
        logiciel: 'Erikoistunut ohjelmisto',
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
      ...fr.questions.q11_incidents,
      label: 'Oletteko kohdanneet sakkoja tai tapauksia lähettämisen vaatimustenmukaisuudessa?',
      description: 'Vastauksesi pysyy anonyyminä',
      options: {
        jamais: 'Ei, ei koskaan',
        rarement: 'Harvoin (1-2 kertaa)',
        parfois: 'Joskus (3-5 kertaa)',
        souvent: 'Usein (6+ kertaa)',
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
      ...fr.questions.q12_budget,
      label: 'Vuotuinen budjetti lähettämisen hallintaan',
      options: {
        '0-5k': '0-5 000 € / vuosi',
        '5-15k': '5 000-15 000 € / vuosi',
        '15-30k': '15 000-30 000 € / vuosi',
        '30k+': '30 000+ € / vuosi',
        inconnu: 'En tiedä',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Vuotuinen budjetti vuokratyöhön',
      options: {
        '0-50k': '0 - 50 000 €',
        '50-200k': '50 000 - 200 000 €',
        '200-500k': '200 000 - 500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'En tiedä',
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Tyytyväisyys nykyisiin työvoimatoimistoihin',
      options: {
        tres_satisfait: 'Erittäin tyytyväinen',
        satisfait: 'Tyytyväinen',
        neutre: 'Neutraali',
        insatisfait: 'Tyytymätön',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Oletko tyytyväinen vuokratyön palkkaasi?',
      options: {
        '<1500': 'Alle 1 500 €',
        '1500-2500': '1 500 - 2 500 €',
        '2500-3500': '2 500 - 3 500 €',
        '3500+': '3 500+ €',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Kuinka suuri prosenttiosuus liikevaihdosta menetetään hallinnollisen monimutkaisuuden vuoksi?',
      options: {
        'non': 'Ei, ei juurikaan',
        'faible': 'Kyllä, pieni (< 5 % liikevaihdosta)',
        'moyen': 'Kyllä, keskitaso (5-15 % liikevaihdosta)',
        'important': 'Kyllä, merkittävä (> 15 % liikevaihdosta)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Tyytyväisyys nykyisiin toimistoihisi',
      options: {
        'tres_satisfait': 'Erittäin tyytyväinen',
        'satisfait': 'Tyytyväinen',
        'neutre': 'Neutraali',
        'insatisfait': 'Tyytymätön',
        'tres_insatisfait': 'Erittäin tyytymätön',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Tyytyväisyys nykyisiin toimistoihisi',
      options: {
        'tres_satisfait': 'Erittäin tyytyväinen',
        'satisfait': 'Tyytyväinen',
        'neutre': 'Neutraali',
        'insatisfait': 'Tyytymätön',
        'tres_insatisfait': 'Erittäin tyytymätön',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Suurimmat huolenaiheesi',
      description: 'Valitse kaikki sopivat',
      options: {
        amendes: 'Sakot ja rangaistukset',
        reputation: 'Maine / Imago',
        penal: 'Rikosoikeudellinen vastuu',
        delais: 'Tehtävien viivästykset',
        clients: 'Asiakkaiden menetys',
        aucun: 'Ei merkittävää riskiä',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Suurimmat tarpeenne',
      description: 'Valitse kaikki sopivat',
      options: {
        fiabilite: 'Luotettavien toimistojen löytäminen',
        conformite: 'Juridinen noudattaminen',
        qualite: 'Laatu/taidot',
        cout: 'Kustannukset',
        disponibilite: 'Kandidaattien saatavuus',
        aucun: 'Ei suurta tarvetta',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Odotuksesi vuokratyöstä ulkomailla',
      description: 'Valitse kaikki sopivat',
      options: {
        salaire: 'Parempi palkka',
        conditions: 'Paremmat työolosuhteet',
        stabilite: 'Stabiilisuus',
        experience: 'Kansainvälinen kokemus',
        logement: 'Asumisen tuki',
        aucun: 'Ei erityisiä odotuksia',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Suurimmat huolenaiheesi',
      description: 'Valitse kaikki sopivat',
      options: {
        conformite: 'Juridinen noudattaminen',
        qualite: 'Laatu/taidot',
        communication: 'Viestintä/Kielet',
        cout: 'Ennakoimattomat kustannukset',
        disponibilite: 'Kandidaattien saatavuus',
        aucun: 'Ei merkittäviä huolia',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Mihin ongelmiin törmäät useimmiten?',
      description: 'Valitse kaikki sopivat',
      options: {
        paiement: 'Maksuviiveet',
        conditions: 'Huonot olosuhteet',
        contrat: 'Sopimusten rikkominen',
        logement: 'Riittämätön majoitus',
        communication: 'Viestintäongelmat',
        aucun: 'Ei suuria ongelmia',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Minkä ongelman haluaisit ratkaista ensin?',
      placeholder: 'Kuvaile ensisijaista ongelmaasi...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Mitkä ovat prioriteettitarpeesi?',
      placeholder: 'Esim.: Nopea löytäminen, parempi laatu, hinnat...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Mitä haluaisit parantaa tehtävissäsi?',
      placeholder: 'Esim.: Palkka, majoitus, tuki, vakaus...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Käytättekö ERP-/hallintaohjelmistoa?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Muu',
        aucun: 'Ei ERP:tä',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Mikä ohjelmisto/ERP?',
      placeholder: 'Esim.: SAP, Odoo, räätälöity...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Tärkeimmät valintakriteerisi toimistoille',
      description: 'Valitse 3 tärkeintä',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Mikä parantaisi vuokratyökokemustasi?',
      description: 'Valitse kaikki sopivat',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Oletteko valmiita vaihtamaan työkalujanne?',
      options: {
        oui: 'Kyllä, ilman ongelmaa',
        conditions: 'Kyllä, tietyin ehdoin',
        difficile: 'Vaikeaa, mutta avoin',
        non: 'Ei, ei ole mahdollista',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Kuukausibudjetti vuokratyöalustalle',
      options: {
        '0': 'En ole valmis maksamaan',
        '1-100': '€1 - €100/kk',
        '100-500': '€100 - €500/kk',
        '500-1000': '€500 - €1 000/kk',
        '1000+': 'Yli €1 000/kk',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Käyttäisitkö alustaa vuokratyön löytämiseen ulkomailla?',
      options: {
        oui_certainement: 'Kyllä, ehdottomasti',
        oui_probablement: 'Kyllä, todennäköisesti',
        peut_etre: 'Ehkä',
        non: 'Ei',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Kuinka kiinnostunut olet eurooppalaisesta lähettämisalustasta?',
      description: 'Arvioi 1 (ei kiinnosta) - 10 (erittäin kiinnostunut)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Kiinnostavimmat ominaisuudet',
      description: 'Valitse 3 tärkeintä prioriteettia',
      options: {
        sipsi: 'Automaattinen SIPSI-ilmoitus',
        a1: 'A1-todistusten hallinta',
        conformite: 'Compliance-hallintapaneeli',
        alertes: 'Hälytykset ja uusinnat',
        documents: 'Dokumenttien keskittäminen',
        marketplace: 'Toimistojen markkinapaikka',
        support: 'Monikielinen asiantuntijatuki',
        api: 'API-integraatio (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Kiinnostavimmat ominaisuudet',
      description: 'Valitse kaikki, jotka kiinnostavat',
      options: {
        recherche: 'Luotettavien toimistojen etsintä',
        comparaison: 'Hinta/laatu -vertailu',
        avis: 'Vahvistetut arviot',
        conformite: 'Compliance-takuu',
        support: 'Oma tuki',
        facturation: 'Keskitetty laskutus',
        suivi: 'Reaaliaikainen seuranta',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Kiinnostavimmat ominaisuudet',
      description: 'Valitse kaikki, jotka kiinnostavat',
      options: {
        recherche: 'Työnhaku',
        avis: 'Toimistojen arviot',
        logement: 'Apua majoituksessa',
        paiement: 'Turvallinen maksu',
        support: 'Tuki omalla kielelläni',
        documents: 'Apua hallinnollisissa dokumenteissa',
        formation: 'Koulutusohjelmat',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Suosittu hinnoittelumalli',
      options: {
        mensuel: 'Kiinteä kuukausitilaus',
        usage: 'Pay-as-you-go (käytön mukaan)',
        annuel: 'Vuosipaketti (alennus)',
        gratuit: 'Ilmainen työntekijöille',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Kuukausibudjetti täydelliselle SaaS-ratkaisulle',
      options: {
        '0-100': '€0 - €100/kk',
        '100-300': '€100 - €300/kk',
        '300-500': '€300 - €500/kk',
        '500-1000': '€500 - €1 000/kk',
        '1000+': 'Yli €1 000/kk',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Haluaisitko testata varhaista versiota (MVP)?',
      options: {
        oui_gratuit: 'Kyllä, ilmaiseksi',
        oui_reduc: 'Kyllä, alennuksella',
        peut_etre: 'Ehkä, riippuu ominaisuuksista',
        non: 'Ei, ei kiinnosta',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Miten näet roolisi eurooppalaisella markkinalla?',
      options: {
        decideur: 'Lopullinen päättäjä',
        influenceur: 'Vaikuttaja / Suosittelija',
        utilisateur: 'Loppukäyttäjä',
        autre: 'Muu',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Kansainvälisen laajentumisen suunnitelmasi',
      options: {
        oui_rapide: 'Kyllä, 6 kuukauden sisällä',
        oui_lent: 'Kyllä, 1-2 vuoden sisällä',
        maintien: 'Pidetään nykyiset maat',
        reduction: 'Supistetaan kansainvälistä laajuutta',
      },
    },
    
    // Q24bis : Aspirations (WORKER)
    q24_aspirations: {
      label: 'Tulevat ammatilliset tavoitteesi',
      placeholder: 'Esim.: vakituinen sopimus, paluu kotimaahan, koulutus...',
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Muut tarpeet tai kommentit',
      placeholder: 'Jaa muuta palautetta tai tarpeita...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Ammatillinen puhelinnumero',
      placeholder: '+358 40 123 4567',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Etunimi',
      placeholder: 'Etunimesi',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Sukunimi',
      placeholder: 'Sukunimesi',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'Y-tunnus (valinnainen)',
      placeholder: '1234567-8',
      description: 'Tietojen rikastamiseen PRH/YTJ kautta',
    },
    
    // Q30 : Email
    email: {
      label: 'Sähköpostisi',
      placeholder: 'sinun.email@esimerkki.fi',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Hyväksyn yhteydenoton uudelleen',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Haluaisin vastaanottaa tutkimusraportin',
    },
  },
};
