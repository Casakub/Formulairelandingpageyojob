/**
 * 🇭🇺 MAGYAR FORDÍTÁS (MAGYARORSZÁG)
 * 
 * Teljes magyar nyelvű fordítás
 * Lefedettség: Felület, navigáció, összes kérdés a felmérésből
 * 
 * @version 2.0.0
 * @locale hu-HU
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const hu: TranslationBundle = {
  // Örökli a FR-ből a hiányzó kulcsokat
  ...fr,
  
  // Navigáció
  nav: {
    section1: 'Profil',
    section2: 'Tapasztalat',
    section3: 'Igények',
    section4: 'Érdeklődés',
    section5: 'Jövőkép',
    section6: 'Kapcsolat',
    dashboard: 'Irányítópult',
    back_to_site: 'Vissza az oldalra',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Kezelői irányítópult',
    tabs: {
      overview: 'Áttekintés',
      results: 'Eredmények',
      questions: 'Kérdések',
      translations: 'Fordítások',
      export: 'Exportálás',
      integrations: 'Integrációk',
      cms: 'Űrlap CMS',
      settings: 'Beállítások',
      prospects: 'Potenciális ügyfelek',
    },
    badges: {
      hub: '⭐ Központ',
      new: '🆕 Új',
      beta: '🧪 Béta',
    },
    actions: {
      logout: 'Kilépés',
      back_to_survey: 'Vissza a felméréshez',
      toggle_sidebar: 'Oldalsáv összecsukása/kinyitása',
    },
    user: {
      welcome: 'Üdvözöljük',
      logged_in_as: 'Bejelentkezve mint',
    },
  },
  
  // Szekciók
  section: {
    1: {
      title: 'Ügynökség profilja',
      description: '4 kérdés • 2 perc',
    },
    2: {
      title: 'Kiküldetés',
      description: '7 kérdés • 3 perc',
    },
    3: {
      title: 'Igények',
      description: '6 kérdés • 2 perc',
    },
    4: {
      title: 'Érdeklődés a YoJob iránt',
      description: '6 kérdés • 3 perc',
    },
    5: {
      title: 'Jövőbeli jövőkép',
      description: '2 kérdés • 1 perc',
    },
    6: {
      title: 'Kapcsolat',
      description: '1 kérdés • 1 perc',
    },
  },
  
  // Szekciók tartalma profil szerint
  sectionContent: {
    1: {
      agency: {
        title: '📋 Az Ön ügynökségének profilja',
        description: 'Mondja el nekünk a munkaerő-kölcsönzési ügynökségéről és tapasztalatairól',
      },
      client: {
        title: '📋 Vállalata profilja',
        description: 'Mondja el nekünk a vállalatáról és toborzási igényeiről',
      },
      worker: {
        title: '📋 Az Ön profilja',
        description: 'Mondja el nekünk szakmai múltjáról',
      },
    },
    2: {
      agency: {
        title: '💼 Kiküldetési tapasztalat',
        description: 'Az Ön munkavállalói kiküldetési tevékenysége',
      },
      client: {
        title: '💼 Az Ön toborzási tapasztalata',
        description: 'Jelenlegi toborzási és munkaerő-kölcsönzési gyakorlatai',
      },
      worker: {
        title: '💼 Az Ön munkaerő-kölcsönzési tapasztalata',
        description: 'Az Ön útja az ideiglenes munkában',
      },
    },
    3: {
      agency: {
        title: '🎯 Igények és eszközök',
        description: 'Az Ön kihívásai és jelenlegi megoldásai',
      },
      client: {
        title: '🎯 Az Ön jelenlegi igényei',
        description: 'Kihívások és elvárások a toborzásban',
      },
      worker: {
        title: '🎯 Az Ön elvárásai',
        description: 'Mi fontos Önnek egy megbízásban',
      },
    },
    4: {
      agency: {
        title: '✨ Érdeklődés a YoJob iránt',
        description: 'Mit keres egy digitális megoldásban',
      },
      client: {
        title: '✨ Érdeklődés a YoJob iránt',
        description: 'Funkciók és prioritások',
      },
      worker: {
        title: '✨ Érdeklődés a YoJob iránt',
        description: 'Mi könnyítené meg az Ön álláskeresését',
      },
    },
    5: {
      agency: {
        title: '🔮 Jövőbeli jövőkép',
        description: 'Az Ön tervei és ambíciói',
      },
      client: {
        title: '🔮 Jövőbeli jövőkép',
        description: 'Az Ön fejlesztési projektjei',
      },
      worker: {
        title: '🔮 Jövőbeli jövőkép',
        description: 'Az Ön szakmai projektjei',
      },
    },
    6: {
      agency: {
        title: '📬 Kapcsolattartási információk',
        description: 'Hogy kapcsolatba léphessünk Önnel és elküldhessük az eredményeket',
      },
      client: {
        title: '📬 Kapcsolattartási információk',
        description: 'Hogy kapcsolatba léphessünk Önnel és elküldhessük az eredményeket',
      },
      worker: {
        title: '📬 Kapcsolattartási információk',
        description: 'Hogy kapcsolatba léphessünk Önnel és elküldhessük az eredményeket',
      },
    },
  },
  
  header: {
    title: 'YoJob',
    subtitle: 'Piaci felmérés',
  },
  
  hero: {
    title: 'Piaci felmérés',
    subtitle: 'Segítsen nekünk jobban megérteni az Ön igényeit',
    description: 'Ez a felmérés körülbelül 10-15 percet vesz igénybe. Az Ön válaszai lehetővé teszik számunkra, hogy az Ön szektorához igazított megoldást hozzunk létre.',
    cta_start: 'Felmérés indítása',
    cta_dashboard: 'Hozzáférés az irányítópulthoz',
    badge: 'Európai piaci felmérés',
    stat: {
      countries: '27 európai ország',
      questions: 'kérdés',
      benchmark: 'Kapjon 2025-ös benchmarkot',
      insights: 'Exkluzív piaci elemzések',
      opportunities: 'Elsőbbségi hozzáférés az ajánlatokhoz',
    },
    footer: {
      info: 'kérdés • Névtelen • GDPR megfelelő',
      anonymous: 'Névtelen',
      gdpr: 'GDPR megfelelő',
    },
  },
  
  respondent_type: {
    title: 'Ön kicsoda?',
    subtitle: 'Válassza ki a profilját a kérdések személyre szabásához',
    agency: 'Munkaerő-kölcsönző ügynökség',
    agency_description: 'Ön munkaerő-kölcsönző ügynökség',
    client: 'Ügyfél vállalat',
    client_description: 'Ön ideiglenes munkavállalókat alkalmazó vállalat',
    worker: 'Ideiglenes munkavállaló',
    worker_description: 'Ön ideiglenes vagy kiküldött munkavállaló',
  },
  
  selector: {
    badge: '🌍 Európai piaci felmérés - Toborzás és munkaerő-kölcsönzés',
    title: 'Ossza meg tapasztalatait az európai piacon',
    subtitle: 'Válassza ki a profilját a felmérés megkezdéséhez',
    cta: 'Kattintson a kezdéshez →',
    trust: {
      secure: 'Biztonságos adatok',
      languages: '{count} elérhető nyelv',
      languages_suffix: 'elérhető nyelv',
      anonymous: 'Névtelen és bizalmas',
    },
  },
  
  respondent: {
    agency: {
      label: 'Munkaerő-kölcsönző ügynökség',
      description: 'Ön európai munkaerő-kölcsönző ügynökség. Ossza meg tapasztalatait a kiküldetésről.',
      estimatedTime: '15 perc',
    },
    client: {
      label: 'Ügyfél vállalat',
      description: 'Ön ideiglenes munkavállalókat alkalmaz. Ossza meg igényeit és elvárásait.',
      estimatedTime: '10 perc',
    },
    worker: {
      label: 'Ideiglenes munkavállaló',
      description: 'Ön ideiglenes munkavállalóként dolgozik. Ossza meg terepi tapasztalatait.',
      estimatedTime: '10 perc',
    },
  },
  
  // Gombok
  button: {
    previous: 'Előző',
    next: 'Következő',
    submit: 'Válaszok elküldése',
    submitting: 'Küldés...',
    back: 'Vissza',
    start: 'Kezdés',
  },
  
  // Megerősítés
  confirmation: {
    title: 'Köszönjük a részvételt!',
    subtitle: 'Az Ön válaszait sikeresen rögzítettük',
    message: 'Jelenleg minden választ elemzünk, hogy az Ön igényeihez tökéletesen igazított megoldást hozzunk létre.',
    cta_back: 'Vissza a kezdőlapra',
    cta_dashboard: 'Irányítópult megtekintése',
  },
  
  // Haladás
  progress: {
    section: 'Szekció',
    question: 'Kérdés',
    section_completed: 'A szekció befejezve',
    questions_remaining: '{count} kérdés maradt',
    time_remaining: 'Körülbelül {time} maradt',
  },
  
  section1: {
    description: '4 kérdés • 2 perc',
  },
  section2: {
    description: '7 kérdés • 3 perc',
  },
  section3: {
    description: '6 kérdés • 2 perc',
  },
  section4: {
    description: '6 kérdés • 3 perc',
  },
  section5: {
    description: '2 kérdés • 1 perc',
  },
  section6: {
    description: '1 kérdés • 1 perc',
  },
  
  // Általános fordítások
  common: {
    oui: 'Igen',
    non: 'Nem',
    autre: 'Egyéb',
    loading: 'Betöltés...',
    submit: 'Küldés',
    next: 'Következő',
    previous: 'Előző',
    skip: 'Kihagyás',
    save: 'Mentés',
    cancel: 'Mégse',
    close: 'Bezárás',
    required: 'Kötelező',
    optional: 'Opcionális',
    error: 'Hiba',
    success: 'Sikeres',
    completed: 'Befejezve',
    inProgress: 'Folyamatban',
    notStarted: 'Nem kezdődött el',
    profileAgency: 'Munkaerő-kölcsönző ügynökség',
    profileClient: 'Ügyfél vállalat',
    profileWorker: 'Ideiglenes munkavállaló',
    score_not_interested: 'Nem érdekel',
    score_very_interested: 'Nagyon érdekel',
  },
  
  // Szektorok
  sectors: {
    btp: 'Építőipar',
    industrie: 'Ipar',
    logistique: 'Logisztika',
    hotellerie: 'Vendéglátás',
    sante: 'Egészségügy',
    agriculture: 'Mezőgazdaság',
    tech: 'Technológia/IT',
    autres: 'Egyéb',
  },
  
  // Kérdések - örökli a FR-ből, majd felülírja HU fordításokkal
  questions: {
    ...fr.questions,
    
    // Q1: Név
    q1_nom: {
      label: 'Név',
      placeholder: 'Szervezet neve vagy az Ön teljes neve',
    },
    
    // Q2: Alapítás éve (AGENCY)
    q2_annee: {
      label: 'Alapítás éve',
      placeholder: '2015',
    },
    
    // Q2: Alapítás éve (CLIENT)
    q2_annee_client: {
      label: 'Vállalatának alapítási éve',
      placeholder: '2010',
    },
    
    // Q2: Állampolgárság (WORKER)
    q2_nationalite: {
      label: 'Az Ön állampolgársága',
      placeholder: 'Pl.: Magyar, Román...',
    },
    
    // Q3: Méret (AGENCY/CLIENT)
    q3_taille: {
      label: 'A szervezet mérete',
      options: {
        '1-9': '1-9 alkalmazott',
        '10-49': '10-49 alkalmazott',
        '50-249': '50-249 alkalmazott',
        '250+': '250+ alkalmazott',
      },
    },
    
    // Q3: Tapasztalat (WORKER)
    q3_experience: {
      label: 'Évek tapasztalata az ideiglenes munkában',
      options: {
        '<1': 'Kevesebb mint 1 év',
        '1-3': '1-3 év',
        '3-5': '3-5 év',
        '5-10': '5-10 év',
        '10+': 'Több mint 10 év',
      },
    },
    
    // Q4: Szektorok
    q4_secteurs: {
      label: 'Fő tevékenységi szektorok',
      description: 'Válasszon ki minden vonatkozó szektort',
    },
    
    // Q4: Foglalkozások (WORKER)
    q4_metiers: {
      label: 'Az Ön foglalkozásai',
      description: 'Válasszon ki minden foglalkozását',
    },
    
    // Q5: Ország (AGENCY)
    q5_pays: {
      label: 'Az Ön ügynökségének országa',
      placeholder: 'Pl.: Magyarország',
    },
    
    // Q5: Helyszín (CLIENT)
    q5_localisation: {
      label: 'Ország, ahol a vállalata működik',
      placeholder: 'Pl.: Magyarország',
    },
    
    // Q5: Munka országa (WORKER)
    q5_pays_travail: {
      label: 'Országok, ahol ideiglenes munkavállalóként dolgozott',
      placeholder: 'Pl.: Németország, Franciaország, Belgium...',
    },
    
    // Q6: Mennyiség (AGENCY)
    q6_volume: {
      label: 'Éves kiküldött munkavállalók száma',
      options: {
        '0': 'Még nincs',
        '1-50': '1-50 munkavállaló',
        '51-200': '51-200 munkavállaló',
        '201-500': '201-500 munkavállaló',
        '500+': 'Több mint 500',
      },
    },
    
    // Q6: Mennyiség ügyfél (CLIENT)
    q6_volume_client: {
      label: 'Hány ideiglenes munkavállalót alkalmaz évente?',
      options: {
        '0': 'Jelenleg nincs',
        '1-10': '1-10 fő',
        '11-50': '11-50 fő',
        '51-200': '51-200 fő',
        '200+': '200+ fő',
      },
    },
    
    // Q6: Gyakoriság (WORKER)
    q6_frequence: {
      label: 'Milyen gyakran dolgozik ideiglenes munkavállalóként?',
      options: {
        permanent: 'Rendszeresen (egész évben)',
        saisonnier: 'Szezonálisan (bizonyos hónapokban)',
        occasionnel: 'Alkalmanként',
        jamais: 'Még soha (keresgélek)',
      },
    },
    
    // Szekció 2 - Kiküldetés/Tapasztalat
    
    // Q7: Származás (AGENCY)
    q7_origine: {
      label: 'Honnan jönnek a kiküldött munkavállalói?',
      placeholder: 'Pl.: Magyarország, Románia, Lengyelország...',
    },
    
    // Q8: Célországok (AGENCY)
    q8_destinations: {
      label: 'Célországok',
      description: 'Országok, ahova munkavállalókat küld',
      placeholder: 'Pl.: Németország, Franciaország, Belgium, Hollandia...',
    },
    
    // Q8: Állampolgárságok (CLIENT)
    q8_nationalites: {
      label: 'Az Ön által alkalmazott ideiglenes munkavállalók nemzetiségei',
      placeholder: 'Pl.: Magyar, Román, Lengyel...',
    },
    
    // Q9: Kihívás (AGENCY)
    q9_defi: {
      label: 'Fő kihívása a nemzetközi kiküldetéssel',
      options: {
        admin: 'Adminisztratív bonyolultság (A1, SIPSI...)',
        conformite: 'Jogi megfelelés több országban',
        cout: 'Kezelési költségek és idő',
        langues: 'Nyelvi korlátok',
        autre: 'Egyéb',
      },
    },
    
    // Q9: Kihívás ügyfél (CLIENT)
    q9_defi_client: {
      label: 'Fő kihívása az európai ideiglenes munkavállalókkal',
      options: {
        trouver: 'Megbízható ügynökségek megtalálása',
        conformite: 'Jogi megfelelés',
        qualite: 'Minőség/kompetenciák',
        cout: 'Túl magas költségek',
        langues: 'Kommunikáció / Nyelvek',
        autre: 'Egyéb',
      },
    },
    
    // Q9: Kihívás munkavállaló (WORKER)
    q9_defi_worker: {
      label: 'Fő kihívása a külföldön végzett ideiglenes munkával',
      options: {
        admin: 'Adminisztratív eljárások',
        langue: 'Nyelvi korlát',
        logement: 'Szállás megtalálása',
        transport: 'Közlekedés',
        salaire: 'Fizetési/bér problémák',
        autre: 'Egyéb',
      },
    },
    
    // Q9: Egyéb
    q9_autre: {
      label: 'Kérjük, részletezze fő kihívását',
      placeholder: 'Írja le elsődleges kihívását...',
    },
    
    // Q10: Kezelés (AGENCY)
    q10_gestion: {
      label: 'Hogyan kezeli a kiküldetési nyilatkozatokat ma?',
      options: {
        manuel: 'Kézileg (Excel, Word...)',
        logiciel_interne: 'Belső szoftver',
        prestataire: 'Külső szolgáltató',
        mixte: 'Vegyes megközelítés',
      },
    },
    
    // Q10: Ügynökségek (CLIENT)
    q10_agences: {
      label: 'Hány munkaerő-kölcsönző ügynökséget használ?',
      options: {
        '0': 'Nincs',
        '1': '1 ügynökség',
        '2-3': '2-3 ügynökség',
        '4-10': '4-10 ügynökség',
        '10+': 'Több mint 10',
      },
    },
    
    // Q10: Folyamat (CLIENT)
    q10_processus: {
      label: 'Hogyan toboroz ideiglenes munkavállalókat?',
      options: {
        agence_fr: 'Francia munkaerő-kölcsönző ügynökségek',
        agence_euro: 'Európai munkaerő-kölcsönző ügynökségek',
        direct: 'Közvetlen toborzás',
        mixte: 'Vegyes',
      },
    },
    
    // Q10: Ügynökség (WORKER)
    q10_agence: {
      label: 'Hogyan talál ideiglenes munkát?',
      options: {
        agence: 'Munkaerő-kölcsönző ügynökségeken keresztül',
        bouche: 'Szóbeli ajánlás',
        internet: 'Online álláshirdetési platformok',
        direct: 'Közvetlen jelentkezés',
      },
    },
    
    // Q10ter: Használt ügynökségek (WORKER)
    q10_agences_worker: {
      label: 'Hány ügynökséggel dolgozik?',
      options: {
        '1': 'Csak 1 ügynökség',
        '2-3': '2-3 ügynökség',
        '4-10': '4-10 ügynökség',
        '10+': 'Több mint 10',
      },
    },
    
    // Q11: Incidensek (AGENCY)
    q11_incidents: {
      label: 'Szembesült már szankciókkal vagy incidensekkel a kiküldetési megfeleléssel kapcsolatban?',
      description: 'Az Ön válasza névtelen marad',
      options: {
        oui_souvent: 'Igen, gyakran',
        oui_rare: 'Igen, néha',
        non: 'Nem',
      },
    },
    
    // Q11: Megfelelés (CLIENT)
    q11_conformite: {
      label: 'Ellenőrzi a munkaerő-kölcsönző ügynökségek jogi megfelelését?',
      options: {
        oui_systematique: 'Igen, rendszeresen',
        oui_parfois: 'Igen, néha',
        non: 'Nem',
        ne_sait_pas: 'Nem tudom',
      },
    },
    
    // Q11: Problémák (WORKER)
    q11_problemes: {
      label: 'Volt már problémája a külföldön végzett ideiglenes munkával?',
      options: {
        oui_graves: 'Igen, súlyos problémák',
        oui_mineurs: 'Igen, kisebb problémák',
        non: 'Nem',
      },
    },
    
    // Q12: Költségvetés (AGENCY)
    q12_budget: {
      label: 'A kiküldetés adminisztratív kezelésére szánt éves költségvetés',
      options: {
        '0': 'Nincs külön elkülönítve',
        '1-5k': '€1,000 - €5,000',
        '5-20k': '€5,000 - €20,000',
        '20-50k': '€20,000 - €50,000',
        '50k+': 'Több mint €50,000',
      },
    },
    
    // Q12: Költségvetés ügyfél (CLIENT)
    q12_budget_client: {
      label: 'A munkaerő-kölcsönzésre szánt éves költségvetés',
      options: {
        '0-50k': '€0 - €50,000',
        '50-200k': '€50,000 - €200,000',
        '200-500k': '€200,000 - €500,000',
        '500k+': '€500,000+',
        'inconnu': 'Nem tudom',
      },
    },
    
    // Q12: Elégedettség (CLIENT)
    q12_satisfaction: {
      label: 'Elégedettség a jelenlegi munkaerő-kölcsönző ügynökségekkel',
      options: {
        tres_satisfait: 'Nagyon elégedett',
        satisfait: 'Elégedett',
        neutre: 'Semleges',
        insatisfait: 'Elégedetlen',
      },
    },
    
    // Q12: Fizetés (WORKER)
    q12_salaire: {
      label: 'Elégedett az ideiglenes munkájából származó fizetésével?',
      options: {
        '<1500': 'Kevesebb mint €1,500',
        '1500-2500': '€1,500 - €2,500',
        '2500-3500': '€2,500 - €3,500',
        '3500+': '€3,500+',
      },
    },
    
    // Q13: Elmulasztott nyereség (AGENCY)
    q13_manque_gagner: {
      label: 'Hány százalék bevételt veszít el az adminisztratív bonyolultság miatt?',
      options: {
        'non': 'Nem, nem pontosan',
        'faible': 'Igen, alacsony (< 5% bevétel)',
        'moyen': 'Igen, közepes (5-15% bevétel)',
        'important': 'Igen, jelentős (> 15% bevétel)',
      },
    },
    
    // Q13: Elégedettség (CLIENT)
    q13_satisfaction: {
      label: 'Elégedettség a jelenlegi munkaerő-kölcsönző ügynökségeivel',
      options: {
        'tres_satisfait': 'Nagyon elégedett',
        'satisfait': 'Elégedett',
        'neutre': 'Semleges',
        'insatisfait': 'Elégedetlen',
        'tres_insatisfait': 'Nagyon elégedetlen',
      },
    },
    
    // Q13: Elégedettség munkavállaló (WORKER)
    q13_satisfaction_worker: {
      label: 'Elégedettség a jelenlegi munkaerő-kölcsönző ügynökségeivel',
      options: {
        'tres_satisfait': 'Nagyon elégedett',
        'satisfait': 'Elégedett',
        'neutre': 'Semleges',
        'insatisfait': 'Elégedetlen',
        'tres_insatisfait': 'Nagyon elégedetlen',
      },
    },
    
    // Szekció 3 - Igények
    
    // Q14: Kockázatok (AGENCY)
    q14_risques: {
      label: 'Fő aggályai',
      description: 'Válasszon ki minden vonatkozót',
      options: {
        amendes: 'Bírságok és szankciók',
        reputation: 'Hírnév / Imázs',
        penal: 'Büntetőjogi felelősség',
        delais: 'Megbízások késései',
        clients: 'Ügyfelek elvesztése',
        aucun: 'Nincs jelentős kockázat',
        sanctions: 'Szankciók/büntetések',
        conformite: 'Megfelelés több országban',
        cout: 'Adminisztratív költségek',
        documentation: 'Dokumentumkezelés',
      },
    },
    
    // Q14: Igények (CLIENT)
    q14_besoins_client: {
      label: 'Fő igényei',
      description: 'Válasszon ki minden vonatkozót',
      options: {
        fiabilite: 'Megbízható ügynökségek megtalálása',
        conformite: 'Jogi megfelelés',
        qualite: 'Minőség/kompetenciák',
        cout: 'Költségek',
        disponibilite: 'Jelöltek rendelkezésre állása',
        aucun: 'Nincs jelentős igény',
      },
    },
    
    // Q14: Elvárások (WORKER)
    q14_attentes: {
      label: 'Elvárásai a külföldön végzett ideiglenes munkával kapcsolatban',
      description: 'Válasszon ki minden vonatkozót',
      options: {
        salaire: 'Jobb fizetés',
        conditions: 'Jobb munkakörülmények',
        stabilite: 'Stabilitás',
        experience: 'Nemzetközi tapasztalat',
        logement: 'Segítség a szállással',
        aucun: 'Nincs különleges elvárás',
      },
    },
    
    // Q14_kockázatok_ügyfél opciók
    q14_risques_client: {
      label: 'Fő aggályai',
      description: 'Válasszon ki minden vonatkozót',
      options: {
        conformite: 'Jogi megfelelés',
        qualite: 'Minőség/kompetenciák',
        communication: 'Kommunikáció/Nyelvek',
        cout: 'Váratlan költségek',
        disponibilite: 'Jelöltek rendelkezésre állása',
        aucun: 'Nincs jelentős aggály',
      },
    },
    
    // Q14_kockázatok_munkavállaló opciók
    q14_risques_worker: {
      label: 'Mely problémákkal szembesül leggyakrabban?',
      description: 'Válasszon ki minden vonatkozót',
      options: {
        paiement: 'Fizetési késések',
        conditions: 'Rossz körülmények',
        contrat: 'Be nem tartott szerződések',
        logement: 'Nem megfelelő szállás',
        communication: 'Kommunikációs problémák',
        aucun: 'Nincs jelentős probléma',
      },
    },
    
    // Q15: Probléma
    q15_probleme: {
      label: 'Melyik problémát szeretné elsőként megoldani?',
      placeholder: 'Írja le elsődleges problémáját...',
    },
    
    // Q15: Igények ügyfél (CLIENT)
    q15_besoins_client: {
      label: 'Mik az Ön elsődleges igényei?',
      placeholder: 'Pl.: Gyors találatok, jobb minőség, árak...',
    },
    
    // Q15: Fejlesztések (WORKER)
    q15_ameliorations: {
      label: 'Mit szeretne javítani a megbízásaiban?',
      placeholder: 'Pl.: Fizetés, szállás, támogatás, stabilitás...',
    },
    
    // Q16: ERP (AGENCY)
    q16_erp: {
      label: 'Használ ERP menedzsment szoftvert?',
      options: {
        oui: 'Igen',
        non: 'Nem',
      },
    },
    
    // Q16: ERP neve
    q16_nom_erp: {
      label: 'Melyik szoftvert/ERP-t?',
      placeholder: 'Pl.: SAP, Odoo, egyedi...',
    },
    
    // Q16: Kritériumok (CLIENT)
    q16_criteres: {
      label: 'Fő kritériumai a munkaerő-kölcsönző ügynökségek kiválasztásához',
      description: 'Válassza ki a 3 legfontosabbat',
    },
    
    // Q16: Fejlesztés (WORKER)
    q16_amelioration: {
      label: 'Mi javítaná az ideiglenes munka tapasztalatát?',
      description: 'Válasszon ki minden vonatkozót',
    },
    
    // Q17: Migráció (AGENCY)
    q17_migration: {
      label: 'Hajlandó lenne lecserélni munkavégzési eszközeit?',
      options: {
        oui_rapidement: 'Igen, azonnal',
        oui_progressivement: 'Igen, fokozatosan',
        non_satisfait: 'Nem, elégedett vagyok a jelenlegi eszközökkel',
        non_peur: 'Nem, félek a változástól',
      },
    },
    
    // Q17: Költségvetés (CLIENT)
    q17_budget: {
      label: 'Havi költségvetés egy ideiglenes toborzási platformra',
      options: {
        '0': 'Nem vagyok hajlandó fizetni',
        '1-100': '€1 - €100/hó',
        '100-500': '€100 - €500/hó',
        '500-1000': '€500 - €1,000/hó',
        '1000+': 'Több mint €1,000/hó',
      },
    },
    
    // Q17: Platform (WORKER)
    q17_plateforme: {
      label: 'Használna egy platformot külföldön ideiglenes munka találásához?',
      options: {
        oui_certainement: 'Igen, biztosan',
        oui_probablement: 'Igen, valószínűleg',
        peut_etre: 'Talán',
        non: 'Nem',
      },
    },
    
    // Szekció 4 - Érdeklődés a YoJob iránt
    
    // Q18: Pontszám
    q18_score: {
      label: 'Mennyire érdekli Önt egy európai kiküldetési marketplace?',
      description: 'Értékelje 1-től (nem érdekel) 10-ig (nagyon érdekel)',
    },
    
    // Q19: Funkciók (AGENCY)
    q19_features: {
      label: 'Legérdekesebb funkciók',
      description: 'Válassza ki a 3 legfontosabb prioritását',
      options: {
        sipsi: 'Automatikus SIPSI nyilatkozat',
        a1: 'A1 tanúsítvány kezelés',
        conformite: 'Megfelelési irányítópult',
        alertes: 'Emlékeztetők és megújítások',
        documents: 'Dokumentumok központosítása',
        marketplace: 'Ügynökségi marketplace',
        support: 'Szakosodott többnyelvű támogatás',
        api: 'API integráció (ERP)',
      },
    },
    
    // Q19: Funkciók ÜGYFÉL
    q19_features_client: {
      label: 'Legérdekesebb funkciók',
      description: 'Válasszon ki minden érdeklődésit',
      options: {
        recherche: 'Megbízható ügynökségek keresése',
        comparaison: 'Ár/minőség összehasonlítás',
        avis: 'Ellenőrzött értékelések',
        conformite: 'Megfelelési garancia',
        support: 'Dedikált támogatás',
        facturation: 'Központosított számlázás',
        suivi: 'Valós idejű nyomon követés',
      },
    },
    
    // Q19: Funkciók MUNKAVÁLLALÓ
    q19_features_worker: {
      label: 'Legérdekesebb funkciók',
      description: 'Válasszon ki minden érdeklődésit',
      options: {
        recherche: 'Álláskeresés',
        avis: 'Ügynökségi értékelések',
        logement: 'Segítség a szállással',
        paiement: 'Biztonságos fizetés',
        support: 'Támogatás anyanyelvemen',
        documents: 'Segítség az adminisztratív dokumentumokkal',
        formation: 'Képzési programok',
      },
    },
    
    // Q20: Ár
    q20_prix: {
      label: 'Előnyben részesített árazási modell',
      options: {
        mensuel: 'Fix havi előfizetés',
        usage: 'Használat alapú fizetés',
        annuel: 'Éves terv (kedvezmény)',
        gratuit: 'Ingyenes munkavállalóknak',
      },
    },
    
    // Q21: Havi költségvetés
    q21_budget_mensuel: {
      label: 'Havi költségvetés egy átfogó SaaS megoldásra',
      options: {
        '0-100': '€0 - €100/hó',
        '100-300': '€100 - €300/hó',
        '300-500': '€300 - €500/hó',
        '500-1000': '€500 - €1,000/hó',
        '1000+': 'Több mint €1,000/hó',
      },
    },
    
    // Q22: MVP
    q22_mvp: {
      label: 'Szeretne tesztelni egy kezdeti verziót (MVP)?',
      options: {
        oui_gratuit: 'Igen, ingyenesen',
        oui_reduc: 'Igen, kedvezménnyel',
        peut_etre: 'Talán, függ a funkcióktól',
        non: 'Nem, nem érdekel',
      },
    },
    
    // Q23: Határidő
    q23_delai: {
      label: 'Mikor szeretne kezdeni?',
      options: {
        'immediat': 'Azonnal',
        '1-3mois': '1-3 hónapon belül',
        '3-6mois': '3-6 hónapon belül',
        '6-12mois': '6-12 hónapon belül',
        'plus_tard': 'Később',
      },
    },
    
    // Szekció 5 - Jövőbeli jövőkép
    
    // Q23: Szerep
    q23_role: {
      label: 'Hogyan látja szerepét egy európai marketplace-ben?',
      options: {
        decideur: 'Végleges döntéshozó',
        influenceur: 'Befolyásoló / Ajánló',
        utilisateur: 'Végfelhasználó',
        autre: 'Egyéb',
      },
    },
    
    // Q24: Fejlődés
    q24_evolution: {
      label: 'Tervei a nemzetközi terjeszkedésre',
      options: {
        oui_rapide: 'Igen, 6 hónapon belül',
        oui_lent: 'Igen, 1-2 éven belül',
        maintien: 'Jelenlegi országok megtartása',
        reduction: 'Nemzetközi kiterjedés csökkentése',
      },
    },
    
    // Q25: Igények
    q25_besoins: {
      label: 'Egyéb igények vagy megjegyzések',
      placeholder: 'Osszon meg bármilyen egyéb visszajelzést vagy igényt...',
    },
    
    // Szekció 6 - Kapcsolat
    
    // Q26: Szolgálati telefon
    q26_phone: {
      label: 'Szolgálati telefonszám',
      placeholder: '+36 30 123 4567',
    },
    
    // Q27: Keresztnév
    q27_firstname: {
      label: 'Keresztnév',
      placeholder: 'Az Ön keresztneve',
    },
    
    // Q28: Vezetéknév
    q28_lastname: {
      label: 'Vezetéknév',
      placeholder: 'Az Ön vezetékneve',
    },
    
    // Q29: SIRET/SIREN
    q29_siret: {
      label: 'SIRET vagy SIREN (opcionális)',
      placeholder: '123 456 789 00012',
      description: 'Pappers/Société.com keresztül történő gazdagításhoz',
    },
    
    // Q30: E-mail
    email: {
      label: 'Az Ön e-mailje',
      placeholder: 'az.on.email@pelda.hu',
    },
    
    // Q31: Kapcsolatfelvételi engedély
    autorise_contact: {
      label: 'Elfogadom, hogy újra kapcsolatba lépjenek velem',
    },
    
    // Q32: Felmérési jelentés
    souhaite_rapport: {
      label: 'Szeretném megkapni a felmérési jelentést',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-12T12:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Hungarian (HU) Complete Translation',
    _locale: 'hu-HU',
    _completeness: 100,
  },
};