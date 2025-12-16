/**
 * 🇵🇱 POLSKIE TŁUMACZENIA (PL)
 *
 * Pełne tłumaczenie polskie
 * Baza: en.ts (taka sama struktura)
 *
 * @version 2.0.0
 * @created 2024-12-12T11:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const pl: TranslationBundle = {
  // Dziedziczy brakujące klucze z FR
  ...fr,

  // Nawigacja
  nav: {
    section1: 'Profil',
    section2: 'Doświadczenie',
    section3: 'Potrzeby',
    section4: 'Zainteresowanie',
    section5: 'Wizja',
    section6: 'Kontakt',
    dashboard: 'Panel',
    back_to_site: 'Powrót do strony',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Panel',
    tabs: {
      overview: 'Przegląd',
      results: 'Wyniki',
      questions: 'Pytania',
      translations: 'Tłumaczenia',
      export: 'Eksport',
      integrations: 'Integracje',
      cms: 'Formularz CMS',
      settings: 'Ustawienia',
      prospects: 'Potencjalni klienci',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nowe',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Wyloguj',
      back_to_survey: 'Powrót do ankiety',
      toggle_sidebar: 'Zwiń/Rozwiń',
    },
    user: {
      welcome: 'Witaj',
      logged_in_as: 'Zalogowany jako',
    },
  },

  // Sekcje
  section: {
    1: { title: 'Profil agencji', description: '4 pytania • 2 min' },
    2: { title: 'Delegowanie', description: '7 pytań • 3 min' },
    3: { title: 'Potrzeby', description: '6 pytań • 2 min' },
    4: { title: 'Zainteresowanie YoJob', description: '6 pytań • 3 min' },
    5: { title: 'Wizja przyszłości', description: '2 pytania • 1 min' },
    6: { title: 'Kontakt', description: '1 pytanie • 1 min' },
  },

  // Nagłówek
  header: {
    title: 'YoJob',
    subtitle: 'Badanie rynku',
  },

  // Hero
  hero: {
    title: 'Ankieta rynkowa',
    subtitle: 'Pomóż nam lepiej zrozumieć Twoje potrzeby',
    description:
      'Ta ankieta zajmuje około 10-15 minut. Twoje odpowiedzi pomogą nam stworzyć rozwiązanie dostosowane do Twojej branży.',
    cta_start: 'Rozpocznij ankietę',
    cta_dashboard: 'Otwórz panel',
    badge: 'Europejskie badanie rynku',
    stat: {
      countries: '27 krajów europejskich',
      questions: 'pytania',
      benchmark: 'Otrzymaj benchmark 2025',
      insights: 'Ekskluzywne dane rynkowe',
      opportunities: 'Priorytetowy dostęp do ofert pracy',
    },
    footer: {
      info: 'pytania • Anonimowo • Zgodność z RODO',
      anonymous: 'Anonimowo',
      gdpr: 'Zgodne z RODO',
    },
  },

  // Typ respondenta
  respondent_type: {
    title: 'Kim jesteś?',
    subtitle: 'Wybierz swój profil, aby dostosować pytania',
    agency: 'Agencja pracy',
    agency_description: 'Jesteś agencją pracy tymczasowej lub delegującą',
    client: 'Firma-klient',
    client_description: 'Jesteś firmą zatrudniającą pracowników tymczasowych',
    worker: 'Pracownik tymczasowy',
    worker_description: 'Jesteś pracownikiem tymczasowym lub delegowanym',
  },

  // Wybór profilu
  selector: {
    badge: '🌍 Europejskie badanie rynku – Rekrutacja i praca tymczasowa',
    title: 'Podziel się swoim doświadczeniem na rynku europejskim',
    subtitle: 'Wybierz profil, aby rozpocząć ankietę',
    cta: 'Kliknij, aby rozpocząć →',
    trust: {
      secure: 'Bezpieczne dane',
      languages: '{count} dostępnych języków',
      languages_suffix: 'dostępnych języków',
      anonymous: 'Anonimowo i poufnie',
    },
  },

  // Profile kart
  respondent: {
    agency: {
      label: 'Agencja pracy',
      description:
        'Jesteś europejską agencją pracy tymczasowej. Podziel się doświadczeniem w delegowaniu.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Firma-klient',
      description:
        'Zatrudniasz pracowników tymczasowych. Podziel się swoimi potrzebami i oczekiwaniami.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Pracownik tymczasowy',
      description: 'Pracujesz jako pracownik tymczasowy. Podziel się doświadczeniem z terenu.',
      estimatedTime: '10 min',
    },
  },

  // Przyciski
  button: {
    previous: 'Poprzednie',
    next: 'Następne',
    submit: 'Prześlij odpowiedzi',
    submitting: 'Wysyłanie...',
    back: 'Wstecz',
    start: 'Start',
  },

  // Potwierdzenie
  confirmation: {
    title: 'Dziękujemy za udział!',
    subtitle: 'Twoje odpowiedzi zostały zapisane',
    message:
      'Analizujemy wszystkie odpowiedzi, aby stworzyć rozwiązanie idealnie dopasowane do Twoich potrzeb.',
    cta_back: 'Powrót na stronę główną',
    cta_dashboard: 'Zobacz panel',
  },

  // Postęp
  progress: {
    section: 'Sekcja',
    question: 'Pytanie',
    section_completed: 'Sekcja ukończona',
    questions_remaining: '{count} pytań pozostało',
    time_remaining: 'Około {time} pozostało',
  },

  // Wspólne tłumaczenia
  common: {
    oui: 'Tak',
    non: 'Nie',
    autre: 'Inne',
    loading: 'Ładowanie...',
    submit: 'Prześlij',
    next: 'Dalej',
    previous: 'Wstecz',
    skip: 'Pomiń',
    save: 'Zapisz',
    cancel: 'Anuluj',
    close: 'Zamknij',
    required: 'Wymagane',
    optional: 'Opcjonalne',
    error: 'Błąd',
    success: 'Sukces',
    completed: 'Ukończone',
    inProgress: 'W toku',
    notStarted: 'Nierozpoczęte',
    profileAgency: 'Agencja pracy',
    profileClient: 'Firma-klient',
    profileWorker: 'Pracownik tymczasowy',
    score_not_interested: 'Nie zainteresowany',
    score_very_interested: 'Bardzo zainteresowany',
  },

  // Sektory
  sectors: {
    btp: 'Budownictwo',
    industrie: 'Przemysł',
    logistique: 'Logistyka',
    hotellerie: 'Hotelarstwo',
    sante: 'Opieka zdrowotna',
    agriculture: 'Rolnictwo',
    tech: 'Tech/IT',
    autres: 'Inne',
  },

  // Pytania – dziedziczy z FR, następnie nadpisuje tłumaczeniami PL
  questions: {
    ...fr.questions,

    // Q1 : Nazwa
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nazwa',
      placeholder: 'Nazwa organizacji lub pełne imię i nazwisko',
    },

    // Q2 : Rok założenia (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Rok założenia',
      placeholder: '2015',
    },

    // Q2 : Rok założenia (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Rok założenia Twojej firmy',
      placeholder: '2010',
    },

    // Q2 : Narodowość (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Twoja narodowość',
      placeholder: 'Np.: polska, rumuńska...',
    },

    // Q3 : Wielkość (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Wielkość organizacji',
      options: {
        '1-9': '1-9 pracowników',
        '10-49': '10-49 pracowników',
        '50-249': '50-249 pracowników',
        '250+': '250+ pracowników',
      },
    },

    // Q3 : Doświadczenie (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Lata doświadczenia w pracy tymczasowej',
      options: {
        '<1': 'Mniej niż 1 rok',
        '1-3': '1-3 lata',
        '3-5': '3-5 lat',
        '5-10': '5-10 lat',
        '10+': 'Ponad 10 lat',
      },
    },

    // Q4 : Sektory
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Główne sektory działalności',
      description: 'Wybierz wszystkie właściwe sektory',
    },

    // Q4 : Zawody (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Twoje zawody',
      description: 'Wybierz wszystkie swoje zawody',
    },

    // Q5 : Kraj (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Kraj Twojej agencji',
      placeholder: 'Np.: Polska',
    },

    // Q5 : Lokalizacja (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Kraj, w którym działa Twoja firma',
      placeholder: 'Np.: Francja',
    },

    // Q5 : Kraje pracy (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Kraje, w których pracowałeś jako pracownik tymczasowy',
      placeholder: 'Np.: Francja, Niemcy, Belgia...',
    },

    // Q6 : Wolumen (AGENCY)
    q6_volume: {
      label: 'Roczny wolumen delegowanych pracowników',
      options: {
        '0': 'Jeszcze żadnych',
        '1-50': '1-50 pracowników',
        '51-200': '51-200 pracowników',
        '201-500': '201-500 pracowników',
        '500+': 'Ponad 500',
      },
    },

    // Q6 : Wolumen klienta (CLIENT)
    q6_volume_client: {
      label: 'Ilu pracowników tymczasowych zatrudniasz rocznie?',
      options: {
        '0': 'Obecnie żadnych',
        '1-10': '1-10 osób',
        '11-50': '11-50 osób',
        '51-200': '51-200 osób',
        '200+': '200+ osób',
      },
    },

    // Q6 : Częstotliwość (WORKER)
    q6_frequence: {
      label: 'Jak często pracujesz jako pracownik tymczasowy?',
      options: {
        permanent: 'Regularnie (cały rok)',
        saisonnier: 'Sezonowo (niektóre miesiące)',
        occasionnel: 'Okazjonalnie',
        jamais: 'Nigdy jeszcze (szukam)',
      },
    },

    // Q7 : Pochodzenie (AGENCY)
    q7_origine: {
      label: 'Skąd pochodzą Twoi delegowani pracownicy?',
      placeholder: 'Np.: Polska, Rumunia, Bułgaria...',
    },

    // Q8 : Destynacje (AGENCY)
    q8_destinations: {
      label: 'Kraje docelowe',
      description: 'Kraje, do których delegujesz pracowników',
      placeholder: 'Np.: Francja, Niemcy, Belgia, Holandia...',
    },

    // Q8 : Narodowości (CLIENT)
    q8_nationalites: {
      label: 'Narodowości pracowników tymczasowych, których zatrudniasz',
      placeholder: 'Np.: Polacy, Rumuni, Bułgarzy...',
    },

    // Q9 : Wyzwanie (AGENCY)
    q9_defi: {
      label: 'Twoje główne wyzwanie w delegowaniu międzynarodowym',
      options: {
        admin: 'Złożoność administracyjna (A1, SIPSI...)',
        conformite: 'Zgodność prawną w wielu krajach',
        cout: 'Koszty i czas zarządzania',
        langues: 'Bariery językowe',
        autre: 'Inne',
      },
    },

    // Q9 : Wyzwanie klienta (CLIENT)
    q9_defi_client: {
      label: 'Twoje główne wyzwanie z europejskimi pracownikami tymczasowymi',
      options: {
        trouver: 'Znalezienie wiarygodnych agencji',
        conformite: 'Zgodność z prawem',
        qualite: 'Jakość/umiejętności',
        cout: 'Zbyt wysokie koszty',
        langues: 'Komunikacja / Języki',
        autre: 'Inne',
      },
    },

    // Q9 : Wyzwanie pracownika (WORKER)
    q9_defi_worker: {
      label: 'Twoje główne wyzwanie w zleceniach',
      options: {
        trouver: 'Znalezienie zleceń',
        admin: 'Formalności administracyjne',
        logement: 'Zakwaterowanie / Mieszkanie',
        langue: 'Język lokalny',
        paiement: 'Płatności / Wynagrodzenie',
        autre: 'Inne',
      },
    },

    // Q9 : Inne
    q9_autre: {
      label: 'Określ swoje główne wyzwanie',
      placeholder: 'Opisz swoje główne wyzwanie...',
    },

    // Q10 : Zarządzanie (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Jak dziś zarządzasz deklaracjami delegowania?',
      options: {
        interne: 'Zespół wewnętrzny',
        externe: 'Zewnętrzny usługodawca',
        mixte: 'Podejście mieszane',
        manuel: 'Zarządzanie ręczne',
        logiciel: 'Specjalistyczne oprogramowanie',
      },
    },

    // Q10 : Agencje (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Ile agencji pracy tymczasowej używasz?',
      options: {
        '0': 'Żadnej',
        '1': '1 agencja',
        '2-3': '2-3 agencje',
        '4-10': '4-10 agencji',
        '10+': 'Ponad 10',
      },
    },

    // Q10 : Proces (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Jak rekrutujesz pracowników tymczasowych?',
      options: {
        agence_fr: 'Francuskie agencje pracy tymczasowej',
        agence_euro: 'Europejskie agencje pracy tymczasowej',
        direct: 'Rekrutacja bezpośrednia',
        mixte: 'Mieszane',
      },
    },

    // Q10 : Agencja (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Jak znajdujesz pracę tymczasową?',
      options: {
        agence: 'Przez agencje pracy tymczasowej',
        bouche: 'Polecenia',
        internet: 'Internetowe portale pracy',
        direct: 'Aplikacja bezpośrednia',
      },
    },

    // Q10ter : Używane agencje (WORKER)
    q10_agences_worker: {
      label: 'Z iloma agencjami współpracujesz?',
      options: {
        '1': 'Tylko 1 agencja',
        '2-3': '2-3 agencje',
        '4-10': '4-10 agencji',
        '10+': 'Ponad 10',
      },
    },

    // Q11 : Incydenty (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Czy napotkałeś kary lub incydenty związane z zgodnością delegowania?',
      description: 'Twoja odpowiedź pozostaje anonimowa',
      options: {
        jamais: 'Nie, nigdy',
        rarement: 'Rzadko (1-2 razy)',
        parfois: 'Czasami (3-5 razy)',
        souvent: 'Często (6+ razy)',
      },
    },

    // Q11 : Zgodność (CLIENT)
    q11_conformite: {
      label: 'Czy weryfikujesz zgodność prawną agencji pracy tymczasowej?',
      options: {
        oui_systematique: 'Tak, systematycznie',
        oui_parfois: 'Tak, czasami',
        non: 'Nie',
        ne_sait_pas: 'Nie wiem',
      },
    },

    // Q11 : Problemy (WORKER)
    q11_problemes: {
      label: 'Czy doświadczyłeś problemów z pracą tymczasową za granicą?',
      options: {
        oui_graves: 'Tak, poważne problemy',
        oui_mineurs: 'Tak, drobne problemy',
        non: 'Nie',
      },
    },

    // Q12 : Budżet (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Roczny budżet przeznaczony na administrację delegowań',
      options: {
        '0-5k': '€0-5 000 / rok',
        '5-15k': '€5 000-15 000 / rok',
        '15-30k': '€15 000-30 000 / rok',
        '30k+': '€30 000+ / rok',
        inconnu: 'Nie wiem',
      },
    },

    // Q12 : Budżet klienta (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Roczny budżet na pracę tymczasową',
      options: {
        '0-50k': '€0 - €50 000',
        '50-200k': '€50 000 - €200 000',
        '200-500k': '€200 000 - €500 000',
        '500k+': '€500 000+',
        'inconnu': 'Nie wiem',
      },
    },

    // Q12 : Satysfakcja (CLIENT)
    q12_satisfaction: {
      label: 'Satysfakcja z obecnych agencji pracy tymczasowej',
      options: {
        tres_satisfait: 'Bardzo zadowolony',
        satisfait: 'Zadowolony',
        neutre: 'Neutralny',
        insatisfait: 'Niezadowolony',
      },
    },

    // Q12 : Wynagrodzenie (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Czy jesteś zadowolony ze swojej płacy z pracy tymczasowej?',
      options: {
        '<1500': 'Mniej niż €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },

    // Q13 : Utracone przychody (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Jaki procent przychodów traci się z powodu złożoności administracyjnej?',
      options: {
        'non': 'Nie, nie bardzo',
        'faible': 'Tak, niski (< 5% przychodów)',
        'moyen': 'Tak, średni (5-15% przychodów)',
        'important': 'Tak, znaczący (> 15% przychodów)',
      },
    },

    // Q13 : Satysfakcja (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satysfakcja z obecnych agencji pracy tymczasowej',
      options: {
        'tres_satisfait': 'Bardzo zadowolony',
        'satisfait': 'Zadowolony',
        'neutre': 'Neutralny',
        'insatisfait': 'Niezadowolony',
        'tres_insatisfait': 'Bardzo niezadowolony',
      },
    },

    // Q13 : Satysfakcja pracownika (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Satysfakcja z obecnych agencji',
      options: {
        'tres_satisfait': 'Bardzo zadowolony',
        'satisfait': 'Zadowolony',
        'neutre': 'Neutralny',
        'insatisfait': 'Niezadowolony',
        'tres_insatisfait': 'Bardzo niezadowolony',
      },
    },

    // Q14 : Ryzyka (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Główne obawy',
      description: 'Wybierz wszystkie pasujące opcje',
      options: {
        amendes: 'Kary i sankcje',
        reputation: 'Reputacja / Wizerunek',
        penal: 'Odpowiedzialność karna',
        delais: 'Opóźnienia zadań',
        clients: 'Utrata klientów',
        aucun: 'Brak poważnych ryzyk',
      },
    },

    // Q14 : Potrzeby (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Główne potrzeby',
      description: 'Wybierz wszystkie pasujące opcje',
      options: {
        fiabilite: 'Znalezienie wiarygodnych agencji',
        conformite: 'Zgodność z prawem',
        qualite: 'Jakość/umiejętności',
        cout: 'Koszty',
        disponibilite: 'Dostępność kandydatów',
        aucun: 'Brak istotnych potrzeb',
      },
    },

    // Q14 : Oczekiwania (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Oczekiwania wobec pracy za granicą',
      description: 'Wybierz wszystkie pasujące opcje',
      options: {
        salaire: 'Lepsze wynagrodzenie',
        conditions: 'Lepsze warunki pracy',
        stabilite: 'Stabilność',
        experience: 'Doświadczenie międzynarodowe',
        logement: 'Pomoc w zakwaterowaniu',
        aucun: 'Brak szczególnych oczekiwań',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Główne obawy',
      description: 'Wybierz wszystkie pasujące opcje',
      options: {
        conformite: 'Zgodność z prawem',
        qualite: 'Jakość/umiejętności',
        communication: 'Komunikacja/Języki',
        cout: 'Nieoczekiwane koszty',
        disponibilite: 'Dostępność kandydatów',
        aucun: 'Brak istotnych obaw',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Jakie problemy napotykasz najczęściej?',
      description: 'Wybierz wszystkie pasujące opcje',
      options: {
        paiement: 'Opóźnienia w płatnościach',
        conditions: 'Złe warunki',
        contrat: 'Nieprzestrzeganie umów',
        logement: 'Niewłaściwe zakwaterowanie',
        communication: 'Problemy komunikacyjne',
        aucun: 'Brak poważnych problemów',
      },
    },

    // Q15 : Problem
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Jaki problem chcesz rozwiązać jako pierwszy?',
      placeholder: 'Opisz swój priorytetowy problem...',
    },

    // Q15 : Potrzeby klienta (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Jakie są Twoje priorytetowe potrzeby?',
      placeholder: 'Np.: znaleźć szybko, lepsza jakość, ceny...',
    },

    // Q15 : Ulepszenia (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Co chciałbyś poprawić w swoich zleceniach?',
      placeholder: 'Np.: Wynagrodzenie, zakwaterowanie, wsparcie, stabilność...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Czy używasz oprogramowania ERP/zarządzającego?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Inne',
        aucun: 'Brak ERP',
      },
    },

    // Q16 : Nazwa ERP
    q16_nom_erp: {
      label: 'Jakie oprogramowanie/ERP?',
      placeholder: 'Np.: SAP, Odoo, własne...',
    },

    // Q16 : Kryteria (CLIENT)
    q16_criteres: {
      label: 'Twoje główne kryteria wyboru agencji',
      description: 'Wybierz swoje top 3',
    },

    // Q16 : Ulepszenia (WORKER)
    q16_amelioration: {
      label: 'Co poprawiłoby Twoje doświadczenie w pracy tymczasowej?',
      description: 'Wybierz wszystkie pasujące opcje',
    },

    // Q17 : Migracja (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Czy jesteś gotów zmienić swoje narzędzia pracy?',
      options: {
        oui: 'Tak, bez problemu',
        conditions: 'Tak, pod pewnymi warunkami',
        difficile: 'Trudne, ale możliwe',
        non: 'Nie, niemożliwe',
      },
    },

    // Q17 : Budżet (CLIENT)
    q17_budget: {
      label: 'Miesięczny budżet na platformę rekrutacji tymczasowej',
      options: {
        '0': 'Nie zamierzam płacić',
        '1-100': '€1 - €100/mies.',
        '100-500': '€100 - €500/mies.',
        '500-1000': '€500 - €1 000/mies.',
        '1000+': 'Ponad €1 000/mies.',
      },
    },

    // Q17 : Platforma (WORKER)
    q17_plateforme: {
      label: 'Czy użyłbyś platformy do szukania pracy tymczasowej za granicą?',
      options: {
        oui_certainement: 'Tak, na pewno',
        oui_probablement: 'Tak, prawdopodobnie',
        peut_etre: 'Może',
        non: 'Nie',
      },
    },

    // Q18 : Ocena
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Na ile interesuje Cię europejski marketplace delegowań?',
      description: 'Oceń od 1 (nie interesuje) do 10 (bardzo interesuje)',
    },

    // Q19 : Funkcje (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Najciekawsze funkcje',
      description: 'Wybierz swoje 3 priorytety',
      options: {
        sipsi: 'Automatyczna deklaracja SIPSI',
        a1: 'Zarządzanie certyfikatem A1',
        conformite: 'Panel zgodności',
        alertes: 'Alerty i odnowienia',
        documents: 'Centralizacja dokumentów',
        marketplace: 'Marketplace agencji',
        support: 'Wielojęzyczne wsparcie ekspertów',
        api: 'Integracja API (ERP)',
      },
    },

    // Q19 : Funkcje (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Najciekawsze funkcje',
      description: 'Wybierz wszystkie, które Cię interesują',
      options: {
        recherche: 'Wyszukiwanie wiarygodnych agencji',
        comparaison: 'Porównanie ceny/jakości',
        avis: 'Zweryfikowane opinie',
        conformite: 'Gwarancja zgodności',
        support: 'Dedykowane wsparcie',
        facturation: 'Centralne fakturowanie',
        suivi: 'Śledzenie w czasie rzeczywistym',
      },
    },

    // Q19 : Funkcje (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Najciekawsze funkcje',
      description: 'Wybierz wszystkie, które Cię interesują',
      options: {
        recherche: 'Wyszukiwanie pracy',
        avis: 'Opinie o agencjach',
        logement: 'Pomoc w zakwaterowaniu',
        paiement: 'Bezpieczne płatności',
        support: 'Wsparcie w moim języku',
        documents: 'Pomoc z dokumentami',
        formation: 'Programy szkoleniowe',
      },
    },

    // Q20 : Cena
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Preferowany model cenowy',
      options: {
        mensuel: 'Stała miesięczna subskrypcja',
        usage: 'Płatność za użycie',
        annuel: 'Plan roczny (zniżka)',
        gratuit: 'Darmowe dla pracowników',
      },
    },

    // Q21 : Budżet miesięczny
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Miesięczny budżet na pełne rozwiązanie SaaS',
      options: {
        '0-100': '€0 - €100/mies.',
        '100-300': '€100 - €300/mies.',
        '300-500': '€300 - €500/mies.',
        '500-1000': '€500 - €1 000/mies.',
        '1000+': 'Ponad €1 000/mies.',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Czy chcesz przetestować wczesną wersję (MVP)?',
      options: {
        oui_gratuit: 'Tak, za darmo',
        oui_reduc: 'Tak, z rabatem',
        peut_etre: 'Może, zależy od funkcji',
        non: 'Nie, nie interesuje mnie',
      },
    },

    // Sekcja 5 – Wizja przyszłości
    q23_role: {
      label: 'Jak widzisz swoją rolę na europejskim rynku?',
      options: {
        decideur: 'Ostateczny decydent',
        influenceur: 'Osoba wpływająca / rekomendująca',
        utilisateur: 'Użytkownik końcowy',
        autre: 'Inne',
      },
    },

    q24_evolution: {
      label: 'Twoje plany ekspansji międzynarodowej',
      options: {
        oui_rapide: 'Tak, w ciągu 6 miesięcy',
        oui_lent: 'Tak, w ciągu 1-2 lat',
        maintien: 'Utrzymać obecne kraje',
        reduction: 'Zmniejszyć zasięg międzynarodowy',
      },
    },

    q24_aspirations: {
      label: 'Twoje przyszłe aspiracje zawodowe',
      placeholder: 'Np.: stały kontrakt, powrót do kraju, szkolenie...',
    },

    q25_besoins: {
      label: 'Inne potrzeby lub komentarze',
      placeholder: 'Podziel się innymi uwagami lub potrzebami...',
    },

    // Sekcja 6 – Kontakt
    q26_phone: {
      label: 'Służbowy numer telefonu',
      placeholder: '+48 600 123 456',
    },

    q27_firstname: {
      label: 'Imię',
      placeholder: 'Twoje imię',
    },

    q28_lastname: {
      label: 'Nazwisko',
      placeholder: 'Twoje nazwisko',
    },

    q29_siret: {
      label: 'NIP/REGON (opcjonalnie)',
      placeholder: '1234567890',
      description: 'Do wzbogacenia danych przez rejestry',
    },

    email: {
      label: 'Twój e-mail',
      placeholder: 'twoj.email@przyklad.pl',
    },

    autorise_contact: {
      label: 'Zgadzam się na ponowny kontakt',
    },

    souhaite_rapport: {
      label: 'Chcę otrzymać raport z badania',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T11:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Polish (PL) Complete Translation',
    _locale: 'pl-PL',
    _completeness: 100,
  },
};
