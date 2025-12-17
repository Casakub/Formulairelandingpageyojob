/**
 * 🇭🇷 TRADUCTIONS CROATES (HR)
 * 
 * Traductions complètes pour le croate
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const hr: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Iskustvo',
    section3: 'Potrebe',
    section4: 'Interes',
    section5: 'Vizija',
    section6: 'Kontakt',
    dashboard: 'Nadzorna ploča',
    back_to_site: 'Povratak na web',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Nadzorna ploča',
    tabs: {
      overview: 'Pregled',
      results: 'Rezultati',
      questions: 'Pitanja',
      translations: 'Prijevodi',
      export: 'Izvoz',
      integrations: 'Integracije',
      cms: 'CMS obrazac',
      settings: 'Postavke',
      prospects: 'Potencijalni klijenti',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Novo',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Odjava',
      back_to_survey: 'Povratak na anketu',
      toggle_sidebar: 'Sažmi/Proširi',
    },
    user: {
      welcome: 'Dobrodošli',
      logged_in_as: 'Prijavljeni kao',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profil',
      description: '4 pitanja • 2 min',
    },
    2: {
      title: 'Iskustvo',
      description: '7 pitanja • 3 min',
    },
    3: {
      title: 'Potrebe',
      description: '6 pitanja • 2 min',
    },
    4: {
      title: 'Interes za YoJob',
      description: '6 pitanja • 3 min',
    },
    5: {
      title: 'Buduća vizija',
      description: '2 pitanja • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 pitanje • 1 min',
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Istraživanje tržišta',
  },
  
  // Hero
  hero: {
    title: 'Anketa o tržištu',
    subtitle: 'Pomozite nam bolje razumjeti vaše potrebe',
    description: 'Ova anketa traje približno 10-15 minuta. Vaši odgovori pomoći će nam stvoriti rješenje prilagođeno vašoj industriji.',
    cta_start: 'Započni anketu',
    cta_dashboard: 'Otvori nadzornu ploču',
    badge: 'Europska studija tržišta',
    stat: {
      countries: '27 europskih zemalja',
      questions: 'pitanja',
      benchmark: 'Dobijte benchmark 2025',
      insights: 'Ekskluzivni uvidi u tržište',
      opportunities: 'Prioritetni pristup poslovima',
    },
    footer: {
      info: 'pitanja • Anonimno • GDPR usklađeno',
      anonymous: 'Anonimno',
      gdpr: 'GDPR usklađeno',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Tko ste vi?',
    subtitle: 'Odaberite svoj profil za prilagodbu pitanja',
    agency: 'Agencija za zapošljavanje',
    agency_description: 'Vi ste agencija za privremeno zapošljavanje ili upućivanje',
    client: 'Klijent',
    client_description: 'Vi ste tvrtka koja zapošljava agencijske radnike',
    worker: 'Agencijski radnik',
    worker_description: 'Vi ste agencijski ili upućeni radnik',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europska studija tržišta - Zapošljavanje & Privremeni rad',
    title: 'Podijelite svoje iskustvo s europskim tržištem',
    subtitle: 'Odaberite svoj profil za početak ankete',
    cta: 'Kliknite za početak →',
    trust: {
      secure: 'Sigurni podaci',
      languages: '{count} dostupnih jezika',
      languages_suffix: 'dostupnih jezika',
      anonymous: 'Anonimno & povjerljivo',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Agencija za zapošljavanje',
      description: 'Vi ste europska agencija za privremeno zapošljavanje. Podijelite svoje iskustvo upućivanja.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klijent',
      description: 'Zapošljavate agencijske radnike. Podijelite svoje potrebe i očekivanja.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agencijski radnik',
      description: 'Radite kao agencijski radnik. Podijelite svoje iskustvo s terena.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Prethodno',
    next: 'Sljedeće',
    submit: 'Pošalji odgovore',
    submitting: 'Slanje...',
    back: 'Natrag',
    start: 'Početak',
  },
  
  // Confirmation
  confirmation: {
    title: 'Hvala vam na sudjelovanju! 🙏',
    subtitle: 'Vaši odgovori uspješno su spremljeni',
    message: 'Trenutno analiziramo sve odgovore kako bismo stvorili rješenje savršeno prilagođeno vašim potrebama.',
    cta_back: 'Natrag na početnu stranicu',
    cta_dashboard: 'Pogledaj Dashboard',
    description: 'Vaše mišljenje je vrijedno i pomaže oblikovati budućnost YoJob.',
    cta: 'Natrag na YoJob web',
    
    reward: {
      report: {
        title: 'Izvješće "Trendovi 2025"',
        description: 'Poslano za 3 tjedna'
      },
      earlyaccess: {
        title: 'Rani pristup YoJob',
        description: 'Top 100 sudionika'
      }
    },
    
    thanks: {
      title: '🎁 Kao zahvalu za sudjelovanje:',
      item1: '• Ekskluzivno izvješće "Trendovi delegiranja 2025"',
      item2: '• Top 100 sudionika = 3 mjeseca besplatnog pristupa YoJobu (vrijednost 500€)'
    }
  },
  
  // Progress
  progress: {
    section: 'Odjeljak',
    question: 'Pitanje',
    section_completed: 'Odjeljak završen',
    questions_remaining: '{count} preostalih pitanja',
    time_remaining: 'Otprilike {time} preostalo',
  },
  
  // Common translations
  common: {
    oui: 'Da',
    non: 'Ne',
    autre: 'Ostalo',
    loading: 'Učitavanje...',
    submit: 'Pošalji',
    next: 'Sljedeće',
    previous: 'Prethodno',
    skip: 'Preskoči',
    save: 'Spremi',
    cancel: 'Otkaži',
    close: 'Zatvori',
    required: 'Obavezno',
    optional: 'Neobavezno',
    error: 'Greška',
    success: 'Uspjeh',
    completed: 'Završeno',
    inProgress: 'U tijeku',
    notStarted: 'Nije započeto',
    profileAgency: 'Agencija za zapošljavanje',
    profileClient: 'Klijent',
    profileWorker: 'Agencijski radnik',
    score_not_interested: 'Nije me zainteresiran',
    score_very_interested: 'Vrlo me zanima',
  },
  
  // Sectors
  sectors: {
    btp: 'Građevinarstvo',
    industrie: 'Industrija',
    logistique: 'Logistika',
    hotellerie: 'Ugostiteljstvo',
    sante: 'Zdravstvo',
    agriculture: 'Poljoprivreda',
    tech: 'Tech/IT',
    autres: 'Ostalo',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions HR
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Naziv',
      placeholder: 'Naziv organizacije ili vaše puno ime',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Godina osnivanja',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Godina osnivanja vaše tvrtke',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaša nacionalnost',
      placeholder: 'npr.: poljska, rumunjska...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Veličina organizacije',
      options: {
        '1-9': '1-9 zaposlenika',
        '10-49': '10-49 zaposlenika',
        '50-249': '50-249 zaposlenika',
        '250+': '250+ zaposlenika',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Godine iskustva privremenog rada',
      options: {
        '<1': 'Manje od 1 godine',
        '1-3': '1-3 godine',
        '3-5': '3-5 godina',
        '5-10': '5-10 godina',
        '10+': 'Više od 10 godina',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Glavni sektori',
      description: 'Odaberite sve relevantne sektore',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaša zanimanja',
      description: 'Odaberite sva vaša zanimanja',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Država vaše agencije',
      placeholder: 'npr.: Poljska',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Država u kojoj vaša tvrtka posluje',
      placeholder: 'npr.: Francuska',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Države u kojima ste radili kao agencijski radnik',
      placeholder: 'npr.: Francuska, Njemačka, Belgija...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Godišnji obujam upućenih radnika',
      options: {
        '0': 'Još nijedan',
        '1-50': '1-50 radnika',
        '51-200': '51-200 radnika',
        '201-500': '201-500 radnika',
        '500+': 'Više od 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Koliko agencijskih radnika zapošljavate godišnje?',
      options: {
        '0': 'Trenutno nijednog',
        '1-10': '1-10 osoba',
        '11-50': '11-50 osoba',
        '51-200': '51-200 osoba',
        '200+': '200+ osoba',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Koliko često radite kao agencijski radnik?',
      options: {
        permanent: 'Redovito (cijelu godinu)',
        saisonnier: 'Sezonski (određeni mjeseci)',
        occasionnel: 'Povremeno',
        jamais: 'Nikada (tražim)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Odakle dolaze vaši upućeni radnici?',
      placeholder: 'npr.: Poljska, Rumunjska, Bugarska...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Odredišne države',
      description: 'Države u koje upućujete radnike',
      placeholder: 'npr.: Francuska, Njemačka, Belgija, Nizozemska...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nacionalnosti agencijskih radnika koje zapošljavate',
      placeholder: 'npr.: poljska, rumunjska, bugarska...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Vaš glavni izazov s međunarodnim upućivanjem',
      options: {
        admin: 'Administrativna složenost (A1, SIPSI...)',
        conformite: 'Usklađenost s propisima u više zemalja',
        cout: 'Troškovi i vrijeme upravljanja',
        langues: 'Jezične barijere',
        autre: 'Ostalo',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Vaš glavni izazov s europskim agencijskim radnicima',
      options: {
        trouver: 'Pronalaženje pouzdanih agencija',
        conformite: 'Pravna usklađenost',
        qualite: 'Kvaliteta/vještine',
        cout: 'Previsoki troškovi',
        langues: 'Komunikacija / Jezici',
        autre: 'Ostalo',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Glavni izazov u vašim angažmanima',
      options: {
        trouver: 'Pronalaženje angažmana',
        admin: 'Administrativna papirnata administracija',
        logement: 'Smještaj / Nastanitev',
        langue: 'Lokalni jezik',
        paiement: 'Plaćanja / Plaća',
        autre: 'Ostalo',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Navedite svoj glavni izazov',
      placeholder: 'Opišite svoj glavni izazov...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Kako danas upravljate prijavama za upućivanje?',
      options: {
        interne: 'Interni tim',
        externe: 'Vanjski pružatelj usluga',
        mixte: 'Mješoviti pristup',
        manuel: 'Ručno upravljanje',
        logiciel: 'Specijalizirani softver',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Koliko agencija za zapošljavanje koristite?',
      options: {
        '0': 'Nijednu',
        '1': '1 agenciju',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencija',
        '10+': 'Više od 10',
      },
    },

    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'S koliko agencija surađujete?',
      options: {
        '1': 'Samo 1 agencija',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencija',
        '10+': 'Više od 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Jeste li imali kazne ili incidente vezane uz usklađenost s propisima o upućivanju?',
      description: 'Vaš odgovor ostaje anoniman',
      options: {
        jamais: 'Ne, nikada',
        rarement: 'Rijetko (1-2 puta)',
        parfois: 'Ponekad (3-5 puta)',
        souvent: 'Često (6+ puta)',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Godišnji proračun dodijeljen administrativnom upravljanju upućivanja',
      options: {
        '0-5k': '0-5 000 € / godina',
        '5-15k': '5 000-15 000 € / godina',
        '15-30k': '15 000-30 000 € / godina',
        '30k+': '30 000+ € / godina',
        'inconnu': 'Ne znam',
      },
    },

    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Godišnji proračun za privremeni rad',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Ne znam',
      },
    },

    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Prosječna mjesečna plaća vaših angažmana',
      options: {
        '<1500': 'Manje od 1 500 €',
        '1500-2500': '1 500-2 500 €',
        '2500-3500': '2 500-3 500 €',
        '3500+': '3 500+ €',
      },
    },

    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Koliki postotak prihoda je izgubljen zbog administrativne složenosti?',
      options: {
        'non': 'Ne, ne zapravo',
        'faible': 'Da, nisko (< 5% prihoda)',
        'moyen': 'Da, srednje (5-15% prihoda)',
        'important': 'Da, značajno (> 15% prihoda)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Zadovoljstvo s vašim trenutnim agencijama',
      options: {
        'tres_satisfait': 'Vrlo zadovoljan',
        'satisfait': 'Zadovoljan',
        'neutre': 'Neutralan',
        'insatisfait': 'Malo zadovoljan',
        'tres_insatisfait': 'Vrlo nezadovoljan',
      },
    },

    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Zadovoljstvo s vašim trenutnim agencijama',
      options: {
        'tres_satisfait': 'Vrlo zadovoljan',
        'satisfait': 'Zadovoljan',
        'neutre': 'Neutralan',
        'insatisfait': 'Malo zadovoljan',
        'tres_insatisfait': 'Vrlo nezadovoljan',
      },
    },

    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Vaše glavne brige',
      description: 'Odaberite sve relevantne opcije',
      options: {
        amendes: 'Kazne i sankcije',
        reputation: 'Reputacija / Imidž',
        penal: 'Krivična odgovornost',
        delais: 'Kašnjenja misija',
        clients: 'Gubitak klijenata',
        aucun: 'Nema značajnih rizika',
      },
    },

    // Q14 : Risques client (CLIENT)
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Koji rizici vas najviše brinu?',
      description: 'Odaberite sve relevantne opcije',
      options: {
        conformite: 'Nepoštivanje propisa',
        qualite: 'Nedovoljna kvaliteta',
        fiabilite: 'Pouzdanost agencija',
        cout: 'Neočekivani troškovi',
        disponibilite: 'Dostupnost kandidata',
        aucun: 'Nema značajnih briga',
      },
    },

    // Q14 : Risques worker (WORKER)
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'S kojim se problemima najčešće susrećete?',
      description: 'Odaberite sve relevantne opcije',
      options: {
        paiement: 'Kašnjenje plaća',
        conditions: 'Loši uvjeti',
        contrat: 'Nepoštivanje ugovora',
        logement: 'Neadekvatan smještaj',
        communication: 'Problemi s komunikacijom',
        aucun: 'Nema velikih problema',
      },
    },
    
    // Q15 : Problème (AGENCY)
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Koji problem biste željeli riješiti kao prvi?',
      placeholder: 'Opišite svoj prioritetni problem...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Koje su vaše prioritetne potrebe?',
      placeholder: 'Npr.: Brzo pronaći, bolja kvaliteta, cijene...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Što biste željeli poboljšati na svojim angažmanima?',
      placeholder: 'Npr.: Plaća, smještaj, podrška, stabilnost...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Koristite li ERP/softver za upravljanje?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Drugi',
        aucun: 'Bez ERP-a',
      },
    },

    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Koji softver/ERP?',
      placeholder: 'Npr.: SAP, Odoo, vlastiti...',
    },

    // Q16 : Autre ERP (précision)
    q16_autre: {
      label: 'Navedite svoj ERP',
      placeholder: 'Naziv softvera...',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      label: 'Jeste li spremni promijeniti svoje radne alate?',
      options: {
        oui: 'Da, bez problema',
        conditions: 'Da, pod određenim uvjetima',
        difficile: 'Teško, ali otvoren',
        non: 'Ne, nezamislivo',
      },
    },
    
    // Section 4 - Intérêt YoJob

    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Koliko vas zanima europsko tržište za upućivanje?',
      description: 'Ocijenite od 1 (nije me zainteresiran) do 10 (vrlo me zanima)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Najzanimljivije funkcionalnosti',
      description: 'Odaberite svoje top 3 prioritete',
      options: {
        sipsi: 'Automatska prijava SIPSI',
        a1: 'Upravljanje certifikatom A1',
        conformite: 'Nadzorna ploča usklađenosti',
        alertes: 'Upozorenja i obnove',
        documents: 'Centralizacija dokumenata',
        marketplace: 'Tržište agencija',
        support: 'Višejezična stručna podrška',
        api: 'API integracija (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Najzanimljivije funkcionalnosti',
      description: 'Odaberite sve koje vas zanimaju',
      options: {
        recherche: 'Pronalaženje pouzdanih agencija',
        comparaison: 'Usporedba cijene/kvalitete',
        avis: 'Provjerene recenzije',
        conformite: 'Jamstvo usklađenosti',
        support: 'Namjenska podrška',
        facturation: 'Centralizirana fakturacija',
        suivi: 'Praćenje u stvarnom vremenu',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Najzanimljivije funkcionalnosti',
      description: 'Odaberite sve koje vas zanimaju',
      options: {
        recherche: 'Pronalaženje posla',
        avis: 'Ocjene agencija',
        logement: 'Pomoć sa smještajem',
        paiement: 'Sigurna plaćanja',
        support: 'Podrška na mom jeziku',
        documents: 'Pomoć s administrativnim dokumentima',
        formation: 'Programi obuke',
      },
    },

    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Preferirani cjenovni model',
      options: {
        mensuel: 'Fiksna mjesečna pretplata',
        usage: 'Plaćanje po korištenju',
        annuel: 'Godišnji plan (popust)',
        gratuit: 'Besplatno za radnike',
      },
    },

    // Q21 : Budget mensuel (AGENCY & CLIENT)
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mjesečni proračun za kompletno SaaS rješenje',
      options: {
        '0-100': '0-100 €/mjesec',
        '100-300': '100-300 €/mjesec',
        '300-500': '300-500 €/mjesec',
        '500-1000': '500-1 000 €/mjesec',
        '1000+': 'Više od 1 000 €/mjesec',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Biste li željeli testirati ranu verziju (MVP)?',
      options: {
        oui_gratuit: 'Da, besplatno',
        oui_reduc: 'Da, s popustom',
        peut_etre: 'Možda, ovisi o funkcionalnostima',
        non: 'Ne, nisam zainteresiran',
      },
    },

    // Q23 : Rôle (AGENCY & CLIENT)
    q23_role: {
      label: 'Kako vidite svoju ulogu na europskom tržištu?',
      options: {
        decideur: 'Konačni donositelj odluka',
        influenceur: 'Utjecajnik / Preporuka',
        utilisateur: 'Krajnji korisnik',
        autre: 'Ostalo',
      },
    },

    // Section 5 - Vision Future

    // Q24 : Évolution (AGENCY & CLIENT)
    q24_evolution: {
      label: 'Vizija tržišta u sljedeće 3 godine',
      placeholder: 'Podijelite svoju viziju...',
    },

    // Q24 : Aspirations (WORKER)
    q24_aspirations: {
      label: 'Vaše buduće profesionalne težnje',
      placeholder: 'Npr.: Stalni ugovor, povratak u zemlju, obrazovanje...',
    },

    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Druge potrebe ili prijedlozi',
      placeholder: 'Vaši prijedlozi nas zanimaju...',
    },

    // Section 6 - Contact

    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Poslovni telefon',
      placeholder: '+385 1 234 5678',
    },

    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Ime',
      placeholder: 'Vaše ime',
    },

    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Prezime',
      placeholder: 'Vaše prezime',
    },

    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'OIB (neobavezno)',
      placeholder: '12345678901',
      description: 'Za obogaćivanje preko sudskog registra',
    },

    // Q30 : Email professionnel (ALL)
    email: {
      label: 'Email',
      placeholder: 'vas.email@primjer.hr',
    },

    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Pristajem da me ponovno kontaktirate',
    },

    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Želio/la bih primiti izvještaj studije',
    },
  },
};