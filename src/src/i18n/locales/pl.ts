/**
 * 🇵🇱 POLSKIE TŁUMACZENIA (PL)
 * 
 * Oparte na systemie tłumaczeń angielskich
 * Baza: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T11:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const pl: TranslationBundle = {
  // Dziedziczy z FR dla brakujących kluczy
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
      cms: 'CMS Formularza',
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
    1: {
      title: 'Profil agencji',
      description: '4 pytania • 2 min',
    },
    2: {
      title: 'Delegowanie',
      description: '7 pytań • 3 min',
    },
    3: {
      title: 'Potrzeby',
      description: '6 pytań • 2 min',
    },
    4: {
      title: 'Zainteresowanie YoJob',
      description: '6 pytań • 3 min',
    },
    5: {
      title: 'Wizja przyszłości',
      description: '2 pytania • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 pytanie • 1 min',
    },
  },
  
  // Sekcje dostosowane do profilu
  sectionContent: {
    1: {
      agency: {
        title: '📋 Profil Twojej agencji',
        description: 'Opowiedz nam o swojej agencji pracy tymczasowej i swoim doświadczeniu',
      },
      client: {
        title: '📋 Profil Twojej firmy',
        description: 'Opowiedz nam o swojej firmie i potrzebach kadrowych',
      },
      worker: {
        title: '📋 Twój profil',
        description: 'Opowiedz nam o swojej ścieżce zawodowej',
      },
    },
    2: {
      agency: {
        title: '💼 Doświadczenie w delegowaniu',
        description: 'Twoja działalność w zakresie delegowania pracowników',
      },
      client: {
        title: '💼 Twoje doświadczenie w rekrutacji',
        description: 'Twoje obecne praktyki rekrutacyjne i pracy tymczasowej',
      },
      worker: {
        title: '💼 Twoje doświadczenie w pracy tymczasowej',
        description: 'Twoja droga w pracy tymczasowej',
      },
    },
    3: {
      agency: {
        title: '🎯 Potrzeby i narzędzia',
        description: 'Twoje obecne wyzwania i rozwiązania',
      },
      client: {
        title: '🎯 Twoje aktualne potrzeby',
        description: 'Wyzwania i oczekiwania w rekrutacji',
      },
      worker: {
        title: '🎯 Twoje oczekiwania',
        description: 'Co jest dla Ciebie ważne w zleceniu',
      },
    },
    4: {
      agency: {
        title: '⭐ Zainteresowanie platformą europejską',
        description: 'Odkryj naszą wizję innowacyjnego marketplace',
      },
      client: {
        title: '⭐ Zainteresowanie platformą europejską',
        description: 'Innowacyjne rozwiązanie dla Twoich potrzeb',
      },
      worker: {
        title: '⭐ Twoje zainteresowanie platformą',
        description: 'Platforma do łatwego znajdowania zleceń',
      },
    },
    5: {
      agency: {
        title: '🔮 Wizja przyszłości',
        description: 'Budżet i perspektywy rozwoju',
      },
      client: {
        title: '🔮 Twoje przyszłe priorytety',
        description: 'Budżet i strategia rekrutacyjna',
      },
      worker: {
        title: '🔮 Twoje cele',
        description: 'Twoje przyszłe projekty zawodowe',
      },
    },
    6: {
      agency: {
        title: '📧 Pozostańmy w kontakcie',
        description: 'Otrzymaj wyniki badania i bądź na bieżąco',
      },
      client: {
        title: '📧 Pozostańmy w kontakcie',
        description: 'Otrzymaj wyniki i nasze rekomendacje',
      },
      worker: {
        title: '📧 Pozostańmy w kontakcie',
        description: 'Otrzymuj wyniki i możliwości',
      },
    },
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
    description: 'Ta ankieta zajmuje około 10-15 minut. Twoje odpowiedzi pomogą nam stworzyć rozwiązanie dostosowane do Twojego sektora.',
    cta_start: 'Rozpocznij ankietę',
    cta_dashboard: 'Przejdź do panelu',
    badge: 'Europejskie badanie rynku',
    stat: {
      countries: '27 krajów europejskich',
      questions: 'pytania',
      benchmark: 'Otrzymaj benchmark 2025',
      insights: 'Ekskluzywne dane rynkowe',
      opportunities: 'Priorytetowy dostęp do ofert',
    },
    footer: {
      info: 'pytania • Anonimowo • Zgodnie z RODO',
      anonymous: 'Anonimowo',
      gdpr: 'Zgodnie z RODO',
    },
    cta: {
      start: 'Rozpocznij ankietę',
      dashboard: 'Przejdź do panelu',
    },
  },
  
  // Typ respondenta
  respondent_type: {
    title: 'Kim jesteś?',
    subtitle: 'Wybierz profil, aby dostosować pytania',
    agency: 'Agencja pracy tymczasowej',
    agency_description: 'Jesteś agencją pracy tymczasowej lub rekrutacyjną',
    client: 'Firma klient',
    client_description: 'Jesteś firmą korzystającą z pracowników tymczasowych',
    worker: 'Pracownik tymczasowy',
    worker_description: 'Jesteś pracownikiem tymczasowym lub delegowanym',
  },
  
  // Selektor respondenta
  selector: {
    badge: '🌍 Europejskie badanie rynku - Rekrutacja & Praca tymczasowa',
    title: 'Podziel się swoim doświadczeniem na rynku europejskim',
    subtitle: 'Wybierz profil, aby rozpocząć ankietę',
    cta: 'Kliknij, aby rozpocząć →',
    trust: {
      secure: 'Dane zabezpieczone',
      languages: '{count} dostępnych języków',
      languages_suffix: 'dostępnych języków',
      anonymous: 'Anonimowo i poufnie',
    },
  },
  
  // Profile respondentów dla kart
  respondent: {
    agency: {
      label: 'Agencja pracy tymczasowej',
      description: 'Jesteś europejską agencją pracy tymczasowej. Podziel się swoim doświadczeniem w delegowaniu.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Firma klient',
      description: 'Zatrudniasz pracowników tymczasowych. Podziel się swoimi potrzebami i oczekiwaniami.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Pracownik tymczasowy',
      description: 'Pracujesz jako tymczasowy. Podziel się swoim doświadczeniem w terenie.',
      estimatedTime: '10 min',
    },
  },
  
  // Przyciski
  button: {
    previous: 'Wstecz',
    next: 'Dalej',
    submit: 'Wyślij odpowiedzi',
    submitting: 'Wysyłanie...',
    back: 'Wstecz',
    start: 'Start',
  },
  
  // Potwierdzenie
  confirmation: {
    title: 'Dziękujemy za udział!',
    subtitle: 'Twoje odpowiedzi zostały pomyślnie zapisane',
    message: 'Analizujemy wszystkie odpowiedzi, aby stworzyć rozwiązanie idealnie dopasowane do Twoich potrzeb.',
    cta_back: 'Powrót do strony głównej',
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
    submit: 'Wyślij',
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
    completed: 'Ukończono',
    inProgress: 'W trakcie',
    notStarted: 'Nie rozpoczęto',
    profileAgency: 'Agencja pracy tymczasowej',
    profileClient: 'Klient',
    profileWorker: 'Pracownik tymczasowy',
    score_not_interested: 'Niezainteresowany',
    score_very_interested: 'Bardzo zainteresowany',
  },
  
  // Sektory
  sectors: {
    btp: 'Budownictwo',
    industrie: 'Przemysł',
    logistique: 'Logistyka',
    hotellerie: 'Hotelarstwo-Gastronomia',
    sante: 'Zdrowie',
    agriculture: 'Rolnictwo',
    tech: 'Tech/IT',
    autres: 'Inne',
  },
  
  // Pytania
  questions: {
    // Q1: Nazwa
    q1_nom: {
      label: 'Nazwa',
      placeholder: 'Nazwa organizacji lub Twoje pełne imię i nazwisko',
    },
    
    // Q2: Rok założenia (AGENCJA)
    q2_annee: {
      label: 'Rok założenia',
      placeholder: '2015',
    },
    
    // Q2: Rok założenia (KLIENT)
    q2_annee_client: {
      label: 'Rok założenia Twojej firmy',
      placeholder: '2010',
    },
    
    // Q2: Narodowość (PRACOWNIK)
    q2_nationalite: {
      label: 'Twoja narodowość',
      placeholder: 'Np: Polska, Rumuńska...',
    },
    
    // Q3: Wielkość (AGENCJA/KLIENT)
    q3_taille: {
      label: 'Wielkość firmy',
      options: {
        '1-9': '1-9 pracowników',
        '10-49': '10-49 pracowników',
        '50-249': '50-249 pracowników',
        '250+': '250+ pracowników',
      },
    },
    
    // Q3: Doświadczenie (PRACOWNIK)
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
    
    // Q4: Sektory
    q4_secteurs: {
      label: 'Główne sektory',
      description: 'Wybierz wszystkie odpowiednie sektory',
    },
    
    // Q4: Zawody (PRACOWNIK)
    q4_metiers: {
      label: 'Twoje zawody',
      description: 'Wybierz wszystkie swoje zawody',
    },
    
    // Q5: Kraj (AGENCJA)
    q5_pays: {
      label: 'Kraj Twojej agencji',
      placeholder: 'Np: Polska',
    },
    
    // Q5: Lokalizacja (KLIENT)
    q5_localisation: {
      label: 'Kraj, w którym działa Twoja firma',
      placeholder: 'Np: Francja',
    },
    
    // Q5: Kraj pracy (PRACOWNIK)
    q5_pays_travail: {
      label: 'Kraje, w których pracowałeś jako pracownik tymczasowy',
      placeholder: 'Np: Francja, Niemcy, Belgia...',
    },
    
    // Q6: Wolumen (AGENCJA)
    q6_volume: {
      label: 'Roczny wolumen delegowanych pracowników',
      options: {
        '0': 'Jeszcze nie',
        '1-50': '1-50 pracowników',
        '51-200': '51-200 pracowników',
        '201-500': '201-500 pracowników',
        '500+': 'Ponad 500',
      },
    },
    
    // Q6: Wolumen klient (KLIENT)
    q6_volume_client: {
      label: 'Ilu pracowników tymczasowych zatrudniasz rocznie?',
      options: {
        '0': 'Obecnie brak pracowników',
        '1-10': '1-10 osób',
        '11-50': '11-50 osób',
        '51-200': '51-200 osób',
        '200+': '200+ osób',
      },
    },
    
    // Q6: Częstotliwość (PRACOWNIK)
    q6_frequence: {
      label: 'Jak często pracujesz tymczasowo?',
      options: {
        permanent: 'Regularnie (cały rok)',
        saisonnier: 'Sezonowo (niektóre miesiące)',
        occasionnel: 'Okazjonalnie',
        jamais: 'Jeszcze nigdy (szukam)',
      },
    },
    
    // Sekcja 2 - Delegowanie/Doświadczenie
    
    // Q7: Pochodzenie (AGENCJA)
    q7_origine: {
      label: 'Skąd pochodzą Twoi delegowani pracownicy?',
      placeholder: 'Np: Polska, Rumunia, Bułgaria...',
    },
    
    // Q8: Destynacje (AGENCJA)
    q8_destinations: {
      label: 'Kraje docelowe',
      description: 'Kraje, do których delegujesz pracowników',
      placeholder: 'Np: Francja, Niemcy, Belgia, Holandia...',
    },
    
    // Q8: Narodowości (KLIENT)
    q8_nationalites: {
      label: 'Narodowości pracowników tymczasowych, których zatrudniasz',
      placeholder: 'Np: Polska, Rumuńska, Bułgarska...',
    },
    
    // Q9: Wyzwanie (AGENCJA)
    q9_defi: {
      label: 'Twoje główne wyzwanie w delegowaniu międzynarodowym',
      options: {
        admin: 'Złożoność administracyjna (A1, SIPSI...)',
        conformite: 'Zgodność prawna w wielu krajach',
        cout: 'Koszty i czas administracyjny',
        langues: 'Bariery językowe',
        autre: 'Inne',
      },
    },
    
    // Q9: Wyzwanie klient (KLIENT)
    q9_defi_client: {
      label: 'Twoje główne wyzwanie z europejskimi pracownikami tymczasowymi',
      options: {
        trouver: 'Znalezienie zaufanych agencji',
        conformite: 'Zgodność prawna',
        qualite: 'Jakość/kompetencje',
        cout: 'Zbyt wysokie koszty',
        langues: 'Komunikacja / Języki',
        autre: 'Inne',
      },
    },
    
    // Q9: Wyzwanie pracownik (PRACOWNIK)
    q9_defi_worker: {
      label: 'Twoje główne wyzwanie w pracy tymczasowej za granicą',
      options: {
        admin: 'Dokumenty administracyjne',
        langue: 'Bariera językowa',
        logement: 'Znalezienie zakwaterowania',
        transport: 'Transport',
        salaire: 'Problemy z wypłatą/wynagrodzeniem',
        autre: 'Inne',
      },
    },
    
    // Q9: Inne
    q9_autre: {
      label: 'Proszę określić swoje główne wyzwanie',
      placeholder: 'Opisz swoje główne wyzwanie...',
    },
    
    // Q10: Zarządzanie (AGENCJA)
    q10_gestion: {
      label: 'Jak dzisiaj zarządzasz deklaracjami delegowania?',
      options: {
        manuel: 'Ręcznie (Excel, Word...)',
        logiciel_interne: 'Wewnętrzne oprogramowanie',
        prestataire: 'Zewnętrzny dostawca',
        mixte: 'Podejście mieszane',
      },
    },
    
    // Q10: Agencje (KLIENT)
    q10_agences: {
      label: 'Ile agencji pracy tymczasowej wykorzystujesz?',
      options: {
        '0': 'Żadna',
        '1': '1 agencja',
        '2-3': '2-3 agencje',
        '4-10': '4-10 agencji',
        '10+': 'Ponad 10',
      },
    },
    
    // Q10: Proces (KLIENT)
    q10_processus: {
      label: 'Jak rekrutujesz pracowników tymczasowych?',
      options: {
        agence_fr: 'Francuskie agencje pracy tymczasowej',
        agence_euro: 'Europejskie agencje pracy tymczasowej',
        direct: 'Rekrutacja bezpośrednia',
        mixte: 'Mieszane',
      },
    },
    
    // Q10: Agencja (PRACOWNIK)
    q10_agence: {
      label: 'Jak znajdujesz pracę tymczasową?',
      options: {
        agence: 'Poprzez agencje pracy tymczasowej',
        bouche: 'Poczta pantoflowa',
        internet: 'Internetowe tablice ogłoszeń o pracę',
        direct: 'Bezpośrednia aplikacja',
      },
    },
    
    // Q10ter: Wykorzystywane agencje (PRACOWNIK)
    q10_agences_worker: {
      label: 'Z iloma agencjami pracujesz?',
      options: {
        '1': 'Tylko 1 agencja',
        '2-3': '2-3 agencje',
        '4-10': '4-10 agencji',
        '10+': 'Ponad 10',
      },
    },
    
    // Q11: Incydenty (AGENCJA)
    q11_incidents: {
      label: 'Czy miałeś kary lub incydenty związane ze zgodnością delegowania?',
      description: 'Twoja odpowiedź pozostanie anonimowa',
      options: {
        oui_souvent: 'Tak, często',
        oui_rare: 'Tak, okazjonalnie',
        non: 'Nie',
      },
    },
    
    // Q11: Zgodność (KLIENT)
    q11_conformite: {
      label: 'Czy weryfikujesz zgodność prawną agencji pracy tymczasowej?',
      options: {
        oui_systematique: 'Tak, systematycznie',
        oui_parfois: 'Tak, czasami',
        non: 'Nie',
        ne_sait_pas: 'Nie wiem',
      },
    },
    
    // Q11: Problemy (PRACOWNIK)
    q11_problemes: {
      label: 'Czy miałeś problemy z pracą tymczasową za granicą?',
      options: {
        oui_graves: 'Tak, poważne problemy',
        oui_mineurs: 'Tak, drobne problemy',
        non: 'Nie',
      },
    },
    
    // Q12: Budżet (AGENCJA)
    q12_budget: {
      label: 'Roczny budżet na zarządzanie delegowaniem',
      options: {
        '0': 'Brak przydzielonego budżetu',
        '1-5k': '1 000 € - 5 000 €',
        '5-20k': '5 000 € - 20 000 €',
        '20-50k': '20 000 € - 50 000 €',
        '50k+': 'Ponad 50 000 €',
      },
    },
    
    // Q12: Budżet klient (KLIENT)
    q12_budget_client: {
      label: 'Roczny budżet na pracę tymczasową',
      options: {
        '0-50k': '0 € - 50 000 €',
        '50-200k': '50 000 € - 200 000 €',
        '200-500k': '200 000 € - 500 000 €',
        '500k+': '500 000 €+',
        'inconnu': 'Nie wiem',
      },
    },
    
    // Q12: Satysfakcja (KLIENT)
    q12_satisfaction: {
      label: 'Satysfakcja z obecnych agencji pracy tymczasowej',
      options: {
        tres_satisfait: 'Bardzo zadowolony',
        satisfait: 'Zadowolony',
        neutre: 'Neutralny',
        insatisfait: 'Niezadowolony',
      },
    },
    
    // Q12: Wynagrodzenie (PRACOWNIK)
    q12_salaire: {
      label: 'Czy jesteś zadowolony z wynagrodzenia z pracy tymczasowej?',
      options: {
        '<1500': 'Poniżej 1 500 €',
        '1500-2500': '1 500 € - 2 500 €',
        '2500-3500': '2 500 € - 3 500 €',
        '3500+': '3 500 €+',
      },
    },
    
    // Q13: Utracone przychody (AGENCJA)
    q13_manque_gagner: {
      label: 'Jaki procent przychodów tracisz z powodu złożoności administracyjnej?',
      options: {
        'non': 'Nie, niezbyt wiele',
        'faible': 'Tak, mało (< 5% CA)',
        'moyen': 'Tak, średnio (5-15% CA)',
        'important': 'Tak, znacząco (> 15% CA)',
      },
    },
    
    // Q13: Satysfakcja (KLIENT)
    q13_satisfaction: {
      label: 'Satysfakcja z obecnych agencji pracy tymczasowej',
      options: {
        'tres_satisfait': 'Bardzo zadowolony',
        'satisfait': 'Zadowolony',
        'neutre': 'Neutralny',
        'insatisfait': 'Niezadowolony',
        'tres_insatisfait': 'Bardzo niezadowolony',
      },
    },
    
    // Q13: Satysfakcja pracownik (PRACOWNIK)
    q13_satisfaction_worker: {
      label: 'Satysfakcja z obecnych agencji pracy tymczasowej',
      options: {
        'tres_satisfait': 'Bardzo zadowolony',
        'satisfait': 'Zadowolony',
        'neutre': 'Neutralny',
        'insatisfait': 'Niezadowolony',
        'tres_insatisfait': 'Bardzo niezadowolony',
      },
    },
    
    // Sekcja 3 - Potrzeby
    
    // Q14: Zagrożenia (AGENCJA)
    q14_risques: {
      label: 'Twoje główne obawy',
      description: 'Wybierz wszystkie odpowiednie',
      options: {
        amendes: 'Grzywny i kary',
        reputation: 'Reputacja / Wizerunek',
        penal: 'Odpowiedzialność karna',
        delais: 'Opóźnienia w misjach',
        clients: 'Utrata klientów',
        aucun: 'Brak poważnego ryzyka',
        sanctions: 'Kary i sankcje',
        conformite: 'Zgodność w wielu krajach',
        cout: 'Koszty administracyjne',
        documentation: 'Zarządzanie dokumentami',
        responsabilite: 'Odpowiedzialność karna',
        perte_clients: 'Utrata klientów',
      },
    },
    
    // Q14: Potrzeby (KLIENT)
    q14_besoins_client: {
      label: 'Twoje główne potrzeby',
      description: 'Wybierz wszystkie odpowiednie',
      options: {
        fiabilite: 'Znalezienie niezawodnych agencji',
        conformite: 'Zgodność prawna',
        qualite: 'Jakość/kompetencje',
        cout: 'Koszty',
        disponibilite: 'Dostępność kandydatów',
        aucun: 'Brak poważnych potrzeb',
      },
    },
    
    // Q14: Oczekiwania (PRACOWNIK)
    q14_attentes: {
      label: 'Twoje oczekiwania wobec pracy tymczasowej za granicą',
      description: 'Wybierz wszystkie odpowiednie',
      options: {
        salaire: 'Lepsze wynagrodzenie',
        conditions: 'Lepsze warunki pracy',
        stabilite: 'Stabilność',
        experience: 'Doświadczenie międzynarodowe',
        logement: 'Pomoc w zakwaterowaniu',
        aucun: 'Brak szczególnych oczekiwań',
      },
    },
    
    // Q14_risques_client opcje
    q14_risques_client: {
      label: 'Twoje główne obawy',
      description: 'Wybierz wszystkie odpowiednie',
      options: {
        conformite: 'Zgodność prawna',
        qualite: 'Jakość/kompetencje',
        communication: 'Komunikacja/języki',
        cout: 'Nieoczekiwane koszty',
        disponibilite: 'Dostępność kandydatów',
        aucun: 'Brak poważnych obaw',
      },
    },
    
    // Q14_risques_worker opcje
    q14_risques_worker: {
      label: 'Jakie problemy napotykasz najczęściej?',
      description: 'Wybierz wszystkie odpowiednie',
      options: {
        paiement: 'Opóźnienia w płatnościach',
        conditions: 'Złe warunki',
        contrat: 'Nierespektowane umowy',
        logement: 'Niewystarczające zakwaterowanie',
        communication: 'Problemy komunikacyjne',
        aucun: 'Brak poważnych problemów',
      },
    },
    
    // Q15: Problem
    q15_probleme: {
      label: 'Jaki problem chcesz rozwiązać w pierwszej kolejności?',
      placeholder: 'Opisz swój priorytetowy problem...',
    },
    
    // Q15: Potrzeby klient (KLIENT)
    q15_besoins_client: {
      label: 'Jakie są Twoje priorytetowe potrzeby?',
      placeholder: 'Np: Szybkie znalezienie, lepsza jakość, ceny...',
    },
    
    // Q15: Ulepszenia (PRACOWNIK)
    q15_ameliorations: {
      label: 'Co chciałbyś poprawić w swoich zleceniach?',
      placeholder: 'Np: Wynagrodzenie, zakwaterowanie, wsparcie, stabilność...',
    },
    
    // Q16: ERP (AGENCJA)
    q16_erp: {
      label: 'Czy używasz ERP/oprogramowania do zarządzania?',
      options: {
        oui: 'Tak',
        non: 'Nie',
      },
    },
    
    // Q16: Nazwa ERP
    q16_nom_erp: {
      label: 'Jakie oprogramowanie/ERP?',
      placeholder: 'Np: SAP, Odoo, własne...',
    },
    
    // Q16: Kryteria (KLIENT)
    q16_criteres: {
      label: 'Twoje główne kryteria wyboru agencji pracy tymczasowej',
      description: 'Wybierz top 3',
    },
    
    // Q16: Ulepszenie (PRACOWNIK)
    q16_amelioration: {
      label: 'Co poprawiłoby Twoje doświadczenie pracy tymczasowej?',
      description: 'Wybierz wszystkie odpowiednie',
    },
    
    // Q17: Migracja (AGENCJA)
    q17_migration: {
      label: 'Czy jesteś gotów zmienić swoje narzędzia pracy?',
      options: {
        oui: 'Tak, bez problemu',
        conditions: 'Tak, pod pewnymi warunkami',
        difficile: 'Trudne, ale możliwe',
        non: 'Nie, nie ma możliwości',
        oui_rapidement: 'Tak, natychmiast',
        oui_progressivement: 'Tak, stopniowo',
        non_satisfait: 'Nie, zadowolony z obecnych narzędzi',
        non_peur: 'Nie, obawa przed zmianą',
      },
    },
    
    // Q17: Budżet (KLIENT)
    q17_budget: {
      label: 'Miesięczny budżet na platformę rekrutacyjną pracy tymczasowej',
      options: {
        '0': 'Nie jestem gotów płacić',
        '1-100': '1 € - 100 €/miesiąc',
        '100-500': '100 € - 500 €/miesiąc',
        '500-1000': '500 € - 1 000 €/miesiąc',
        '1000+': 'Ponad 1 000 €/miesiąc',
      },
    },
    
    // Q17: Platforma (PRACOWNIK)
    q17_plateforme: {
      label: 'Czy korzystałbyś z platformy do znajdowania pracy tymczasowej za granicą?',
      options: {
        oui_certainement: 'Tak, na pewno',
        oui_probablement: 'Tak, prawdopodobnie',
        peut_etre: 'Może',
        non: 'Nie',
      },
    },
    
    // Sekcja 4 - Zainteresowanie YoJob
    
    // Q18: Ocena
    q18_score: {
      label: 'Jak bardzo jesteś zainteresowany europejskim marketplace delegowania?',
      description: 'Oceń od 1 (w ogóle nie zainteresowany) do 10 (bardzo zainteresowany)',
    },
    
    // Q19: Funkcje (AGENCJA)
    q19_features: {
      label: 'Najbardziej interesujące funkcje',
      description: 'Wybierz top 3 priorytety',
      options: {
        sipsi: 'Automatyczna deklaracja SIPSI',
        a1: 'Zarządzanie certyfikatami A1',
        conformite: 'Panel zgodności',
        alertes: 'Alerty i odnowienia',
        documents: 'Centralizacja dokumentów',
        marketplace: 'Marketplace agencji',
        support: 'Wielojęzyczne wsparcie eksperckie',
        api: 'Integracja API (ERP)',
      },
    },
    
    // Q19: Funkcje KLIENT
    q19_features_client: {
      label: 'Najbardziej interesujące funkcje',
      description: 'Wybierz wszystkie, które Cię interesują',
      options: {
        recherche: 'Wyszukiwanie niezawodnych agencji',
        comparaison: 'Porównanie cena/jakość',
        avis: 'Zweryfikowane opinie',
        conformite: 'Gwarancja zgodności',
        support: 'Dedykowane wsparcie',
        facturation: 'Scentralizowane fakturowanie',
        suivi: 'Śledzenie w czasie rzeczywistym',
      },
    },
    
    // Q19: Funkcje PRACOWNIK
    q19_features_worker: {
      label: 'Najbardziej interesujące funkcje',
      description: 'Wybierz wszystkie, które Cię interesują',
      options: {
        recherche: 'Wyszukiwanie ofert pracy',
        avis: 'Opinie o agencjach',
        logement: 'Pomoc w zakwaterowaniu',
        paiement: 'Bezpieczna płatność',
        support: 'Wsparcie w moim języku',
        documents: 'Pomoc z dokumentami administracyjnymi',
        formation: 'Programy szkoleniowe',
      },
    },
    
    // Q20: Cena
    q20_prix: {
      label: 'Preferowany model cenowy',
      options: {
        mensuel: 'Stały abonament miesięczny',
        usage: 'Pay-as-you-go (płatność za użycie)',
        annuel: 'Plan roczny (zniżka)',
        gratuit: 'Darmowy dla pracowników',
      },
    },
    
    // Q21: Budżet miesięczny
    q21_budget_mensuel: {
      label: 'Miesięczny budżet na kompletne rozwiązanie SaaS',
      options: {
        '0-100': '0 € - 100 €/miesiąc',
        '100-300': '100 € - 300 €/miesiąc',
        '300-500': '300 € - 500 €/miesiąc',
        '500-1000': '500 € - 1 000 €/miesiąc',
        '1000+': 'Ponad 1 000 €/miesiąc',
      },
    },
    
    // Q22: MVP
    q22_mvp: {
      label: 'Czy chciałbyś przetestować wczesną wersję (MVP)?',
      options: {
        oui_gratuit: 'Tak, bezpłatnie',
        oui_reduc: 'Tak, ze zniżką',
        peut_etre: 'Może, zależy od funkcji',
        non: 'Nie, nie jestem zainteresowany',
      },
    },
    
    // Sekcja 5 - Wizja Przyszłości
    
    // Q23: Rola
    q23_role: {
      label: 'Jak widzisz swoją rolę na europejskim marketplace?',
      options: {
        decideur: 'Ostateczny decydent',
        influenceur: 'Influencer / rekomendacja',
        utilisateur: 'Użytkownik końcowy',
        autre: 'Inne',
      },
    },
    
    // Q24: Rozwój
    q24_evolution: {
      label: 'Twoje plany ekspansji międzynarodowej',
      options: {
        oui_rapide: 'Tak, w ciągu 6 miesięcy',
        oui_lent: 'Tak, w ciągu 1-2 lat',
        maintien: 'Utrzymanie obecnych krajów',
        reduction: 'Zmniejszenie zakresu międzynarodowego',
      },
    },
    
    // Q25: Potrzeby
    q25_besoins: {
      label: 'Dodatkowe potrzeby lub komentarze',
      placeholder: 'Podziel się więcej feedbackiem lub potrzebami...',
    },
    
    // Sekcja 6 - Kontakt
    
    // Q26: Telefon służbowy
    q26_phone: {
      label: 'Numer telefonu służbowego',
      placeholder: '+48 123 456 789',
    },
    
    // Q27: Imię
    q27_firstname: {
      label: 'Imię',
      placeholder: 'Twoje imię',
    },
    
    // Q28: Nazwisko
    q28_lastname: {
      label: 'Nazwisko',
      placeholder: 'Twoje nazwisko',
    },
    
    // Q29: SIRET/SIREN
    q29_siret: {
      label: 'SIRET lub SIREN (opcjonalnie)',
      placeholder: '123 456 789 00012',
      description: 'Do wzbogacenia danych przez Pappers/Société.com',
    },
    
    // Q29: Email
    q29_email: {
      label: 'Email służbowy',
      placeholder: 'email@firma.pl',
    },
    
    // Email (dla kompatybilności)
    email: {
      label: 'Twój email',
      placeholder: 'twoj.email@przyklad.pl',
    },
    
    // Q30: Optin
    q30_optin: {
      label: 'Chcę otrzymywać wyniki badania i aktualizacje YoJob',
      options: {
        oui: 'Tak, informujcie mnie',
        non: 'Nie, dziękuję',
      },
    },
    
    // Zgoda na kontakt
    autorise_contact: {
      label: 'Zgadzam się na ponowny kontakt',
    },
    
    // Raport z badania
    souhaite_rapport: {
      label: 'Chciałbym otrzymać raport z badania',
    },
  },
  
  // Login
  login: {
    title: 'Logowanie Administratora',
    email: 'Email',
    password: 'Hasło',
    submit: 'Zaloguj się',
    error: 'Nieprawidłowy email lub hasło',
  },
  
  // Błędy
  errors: {
    required: 'To pole jest wymagane',
    email: 'Nieprawidłowy email',
    phone: 'Nieprawidłowy numer telefonu',
    min_length: 'Minimum {min} znaków',
    max_length: 'Maksimum {max} znaków',
    network: 'Błąd sieci. Spróbuj ponownie.',
    unknown: 'Wystąpił błąd. Spróbuj ponownie.',
  },
};