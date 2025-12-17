/**
 * 🇵🇹 TRADUÇÕES PORTUGUESAS (PORTUGAL)
 * 
 * Tradução completa para português europeu
 * Cobertura: Interface, navegação, todas as perguntas do inquérito
 * 
 * @version 2.0.0
 * @locale pt-PT
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const pt: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Perfil',
    section2: 'Experiência',
    section3: 'Necessidades',
    section4: 'Interesse',
    section5: 'Visão',
    section6: 'Contacto',
    dashboard: 'Painel',
    back_to_site: 'Voltar ao site',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Painel',
    tabs: {
      overview: 'Visão Geral',
      results: 'Resultados',
      questions: 'Perguntas',
      translations: 'Traduções',
      export: 'Exportar',
      integrations: 'Integrações',
      cms: 'CMS do Formulário',
      settings: 'Definições',
      prospects: 'Potenciais Clientes',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Novo',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Sair',
      back_to_survey: 'Voltar ao inquérito',
      toggle_sidebar: 'Recolher/Expandir',
    },
    user: {
      welcome: 'Bem-vindo',
      logged_in_as: 'Autenticado como',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Perfil da Agência',
      description: '4 perguntas • 2 min',
    },
    2: {
      title: 'Destacamento',
      description: '7 perguntas • 3 min',
    },
    3: {
      title: 'Necessidades',
      description: '6 perguntas • 2 min',
    },
    4: {
      title: 'Interesse YoJob',
      description: '6 perguntas • 3 min',
    },
    5: {
      title: 'Visão Futura',
      description: '2 perguntas • 1 min',
    },
    6: {
      title: 'Contacto',
      description: '1 pergunta • 1 min',
    },
  },
  
  header: {
    title: 'YoJob',
    subtitle: 'Estudo de mercado',
  },
  
  hero: {
    title: 'Inquérito de mercado',
    subtitle: 'Ajude-nos a compreender melhor as suas necessidades',
    description: 'Este inquérito demora cerca de 10-15 minutos. As suas respostas permitir-nos-ão criar uma solução adaptada ao seu sector.',
    cta_start: 'Iniciar o inquérito',
    cta_dashboard: 'Aceder ao Painel',
    badge: 'Estudo de mercado europeu',
    stat: {
      countries: '27 países europeus',
      questions: 'perguntas',
      benchmark: 'Receba o benchmark 2025',
      insights: 'Insights de mercado exclusivos',
      opportunities: 'Acesso prioritário a ofertas',
    },
    footer: {
      info: 'perguntas • Anónimo • Conforme RGPD',
      anonymous: 'Anónimo',
      gdpr: 'Conforme RGPD',
    },
  },
  
  respondent_type: {
    title: 'Quem é você?',
    subtitle: 'Selecione o seu perfil para personalizar as perguntas',
    agency: 'Agência ETT',
    agency_description: 'Você é uma agência de trabalho temporário',
    client: 'Empresa Cliente',
    client_description: 'Você é uma empresa que contrata trabalhadores temporários',
    worker: 'Trabalhador Temporário',
    worker_description: 'Você é um trabalhador temporário ou destacado',
  },
  
  selector: {
    badge: '🌍 Estudo de mercado europeu - Recrutamento & Trabalho Temporário',
    title: 'Partilhe a sua experiência do mercado europeu',
    subtitle: 'Selecione o seu perfil para iniciar o inquérito',
    cta: 'Clique para começar →',
    trust: {
      secure: 'Dados seguros',
      languages: '{count} idiomas disponíveis',
      languages_suffix: 'idiomas disponíveis',
      anonymous: 'Anónimo & confidencial',
    },
  },
  
  respondent: {
    agency: {
      label: 'Agência de trabalho temporário',
      description: 'Você é uma agência ETT europeia. Partilhe a sua experiência de destacamento.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Empresa cliente',
      description: 'Você recruta trabalhadores temporários. Partilhe as suas necessidades e expectativas.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Trabalhador temporário',
      description: 'Você trabalha temporariamente. Partilhe a sua experiência no terreno.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Anterior',
    next: 'Seguinte',
    submit: 'Enviar as minhas respostas',
    submitting: 'A enviar...',
    back: 'Voltar',
    start: 'Começar',
  },
  
  // Confirmation
  confirmation: {
    title: 'Obrigado pela sua participação! 🙏',
    subtitle: 'As suas respostas foram registadas com sucesso',
    message: 'Estamos atualmente a analisar todas as respostas para criar uma solução perfeitamente adaptada às suas necessidades.',
    cta_back: 'Voltar ao início',
    cta_dashboard: 'Ver o Painel',
    description: 'A sua opinião é valiosa e contribui para moldar o futuro do YoJob.',
    cta: 'Voltar ao site YoJob',
    
    reward: {
      report: {
        title: 'Relatório "Tendências 2025"',
        description: 'Enviado em 3 semanas'
      },
      earlyaccess: {
        title: 'Acesso Antecipado YoJob',
        description: 'Top 100 participantes'
      }
    },
    
    thanks: {
      title: '🎁 Como agradecimento pela sua participação:',
      item1: '• Relatório exclusivo "Tendências do destacamento 2025"',
      item2: '• Top 100 participantes = 3 meses de acesso gratuito ao YoJob (valor 500€)'
    }
  },
  
  // Progress
  progress: {
    section: 'Secção',
    question: 'Pergunta',
    section_completed: 'Secção concluída',
    questions_remaining: '{count} perguntas restantes',
    time_remaining: 'Cerca de {time} restante',
  },
  
  section1: {
    description: '4 perguntas • 2 min',
  },
  section2: {
    description: '7 perguntas • 3 min',
  },
  section3: {
    description: '6 perguntas • 2 min',
  },
  section4: {
    description: '6 perguntas • 3 min',
  },
  section5: {
    description: '2 perguntas • 1 min',
  },
  section6: {
    description: '1 pergunta • 1 min',
  },
  
  // Common translations
  common: {
    oui: 'Sim',
    non: 'Não',
    autre: 'Outro',
    loading: 'Carregando...',
    submit: 'Enviar',
    next: 'Próximo',
    previous: 'Anterior',
    skip: 'Pular',
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    required: 'Obrigatório',
    optional: 'Opcional',
    error: 'Erro',
    success: 'Sucesso',
    completed: 'Concluído',
    inProgress: 'Em progresso',
    notStarted: 'Não iniciado',
    profileAgency: 'Agência de trabalho temporário',
    profileClient: 'Cliente',
    profileWorker: 'Trabalhador temporário',
    score_not_interested: 'Não interessado',
    score_very_interested: 'Muito interessado',
  },
  
  // Sectors
  sectors: {
    btp: 'Construção',
    industrie: 'Indústria',
    logistique: 'Logística',
    hotellerie: 'Hotelaria',
    sante: 'Saúde',
    agriculture: 'Agricultura',
    tech: 'Tecnologia/IT',
    autres: 'Outros',
  },
  
  // Questions - hérite de FR puis surcharge avec traduções PT
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nome',
      placeholder: 'Nome da organização ou o seu nome completo',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Ano de criação',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Ano de criação da sua empresa',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'A sua nacionalidade',
      placeholder: 'Ex: Polaca, Romena...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Dimensão da organização',
      options: {
        '1-9': '1-9 colaboradores',
        '10-49': '10-49 colaboradores',
        '50-249': '50-249 colaboradores',
        '250+': '250+ colaboradores',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Anos de experiência em trabalho temporário',
      options: {
        '<1': 'Menos de 1 ano',
        '1-3': '1-3 anos',
        '3-5': '3-5 anos',
        '5-10': '5-10 anos',
        '10+': 'Mais de 10 anos',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Principais sectores de atividade',
      description: 'Selecione todos os sectores relevantes',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'As suas profissões',
      description: 'Selecione todas as suas profissões',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'País da sua agência',
      placeholder: 'Ex: Polónia',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'País onde opera a sua empresa',
      placeholder: 'Ex: França',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Países onde trabalhou como trabalhador temporário',
      placeholder: 'Ex: França, Alemanha, Bélgica...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Volume anual de trabalhadores destacados',
      options: {
        '0': 'Nenhum ainda',
        '1-50': '1-50 trabalhadores',
        '51-200': '51-200 trabalhadores',
        '201-500': '201-500 trabalhadores',
        '500+': 'Mais de 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Quantos trabalhadores temporários emprega por ano?',
      options: {
        '0': 'Nenhum atualmente',
        '1-10': '1-10 pessoas',
        '11-50': '11-50 pessoas',
        '51-200': '51-200 pessoas',
        '200+': '200+ pessoas',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Com que frequência trabalha como temporário?',
      options: {
        permanent: 'Regularmente (todo o ano)',
        saisonnier: 'Sazonal (certos meses)',
        occasionnel: 'Ocasionalmente',
        jamais: 'Nunca ainda (à procura)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'De onde são os seus trabalhadores destacados?',
      placeholder: 'Ex: Polónia, Roménia, Bulgária...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Países de destino',
      description: 'Países para onde destaca trabalhadores',
      placeholder: 'Ex: França, Alemanha, Bélgica, Países Baixos...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nacionalidades dos trabalhadores temporários que emprega',
      placeholder: 'Ex: Polacos, Romenos, Búlgaros...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'O seu principal desafio com o destacamento internacional',
      options: {
        admin: 'Complexidade administrativa (A1, SIPSI...)',
        conformite: 'Conformidade legal multi-país',
        cout: 'Custos e tempo de gestão',
        langues: 'Barreiras linguísticas',
        autre: 'Outro',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'O seu principal desafio com trabalhadores temporários europeus',
      options: {
        trouver: 'Encontrar agências fiáveis',
        conformite: 'Conformidade legal',
        qualite: 'Qualidade/competências',
        cout: 'Custos demasiado elevados',
        langues: 'Comunicação / Línguas',
        autre: 'Outro',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'O seu principal desafio com trabalho temporário no estrangeiro',
      options: {
        trouver: 'Encontrar missões',
        admin: 'Burocracia administrativa',
        langue: 'Barreira linguística',
        logement: 'Encontrar alojamento',
        paiement: 'Problemas de pagamento/salário',
        autre: 'Outro',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Por favor especifique o seu principal desafio',
      placeholder: 'Descreva o seu principal desafio...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Como gere as declarações de destacamento hoje?',
      options: {
        interne: 'Equipa interna',
        externe: 'Prestador externo',
        mixte: 'Abordagem mista',
        manuel: 'Gestão manual',
        logiciel: 'Software especializado',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Quantas agências de trabalho temporário utiliza?',
      options: {
        '0': 'Nenhuma',
        '1': '1 agência',
        '2-3': '2-3 agências',
        '4-10': '4-10 agências',
        '10+': 'Mais de 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Como recruta trabalhadores temporários?',
      options: {
        agence_fr: 'Agências francesas de trabalho temporário',
        agence_euro: 'Agências europeias de trabalho temporário',
        direct: 'Recrutamento direto',
        mixte: 'Misto',
      },
    },
    
    // Q10 : Agência (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Como você encontra trabalho temporário?',
      options: {
        agence: 'Através de agências de trabalho temporário',
        bouche: 'Boca a boca',
        internet: 'Portais de emprego online',
        direct: 'Candidatura direta',
      },
    },
    
    // Q10ter : Agências utilizadas (WORKER)
    q10_agences_worker: {
      label: 'Com quantas agências você trabalha?',
      options: {
        '1': 'Apenas 1 agência',
        '2-3': '2-3 agências',
        '4-10': '4-10 agências',
        '10+': 'Mais de 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Já enfrentou penalizações ou incidentes relacionados com conformidade de destacamento?',
      description: 'A sua resposta permanece anónima',
      options: {
        jamais: 'Não, nunca',
        rarement: 'Raramente (1-2 vezes)',
        parfois: 'Às vezes (3-5 vezes)',
        souvent: 'Frequentemente (6+ vezes)',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Verifica a conformidade legal das agências de trabalho temporário?',
      options: {
        oui_systematique: 'Sim, sistematicamente',
        oui_parfois: 'Sim, às vezes',
        non: 'Não',
        ne_sait_pas: 'Não sei',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Já teve problemas com trabalho temporário no estrangeiro?',
      options: {
        oui_graves: 'Sim, problemas graves',
        oui_mineurs: 'Sim, problemas menores',
        non: 'Não',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Orçamento anual alocado à gestão administrativa de destacamento',
      options: {
        '0-5k': '€0-5.000 / ano',
        '5-15k': '€5.000-15.000 / ano',
        '15-30k': '€15.000-30.000 / ano',
        '30k+': '€30.000+ / ano',
        inconnu: 'Não sei',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Orçamento anual dedicado ao trabalho temporário',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Não sei',
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Satisfação com as agências de trabalho temporário atuais',
      options: {
        tres_satisfait: 'Muito satisfeito',
        satisfait: 'Satisfeito',
        neutre: 'Neutro',
        insatisfait: 'Insatisfeito',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Está satisfeito com o seu salário de trabalho temporário?',
      options: {
        '<1500': 'Menos de €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Que percentagem de receita é perdida devido à complexidade administrativa?',
      options: {
        'non': 'Não, não realmente',
        'faible': 'Sim, baixa (< 5% receita)',
        'moyen': 'Sim, média (5-15% receita)',
        'important': 'Sim, significativa (> 15% receita)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satisfação com as suas agências de trabalho temporário atuais',
      options: {
        'tres_satisfait': 'Muito satisfeito',
        'satisfait': 'Satisfeito',
        'neutre': 'Neutro',
        'insatisfait': 'Insatisfeito',
        'tres_insatisfait': 'Muito insatisfeito',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Satisfação com as suas agências de trabalho temporário atuais',
      options: {
        'tres_satisfait': 'Muito satisfeito',
        'satisfait': 'Satisfeito',
        'neutre': 'Neutro',
        'insatisfait': 'Insatisfeito',
        'tres_insatisfait': 'Muito insatisfeito',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'As suas principais preocupações',
      description: 'Selecione todas as que se aplicam',
      options: {
        amendes: 'Multas e sanções',
        reputation: 'Reputação / Imagem',
        penal: 'Responsabilidade criminal',
        delais: 'Atrasos nas missões',
        clients: 'Perda de clientes',
        aucun: 'Nenhum risco maior',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'As suas principais necessidades',
      description: 'Selecione todas as que se aplicam',
      options: {
        fiabilite: 'Encontrar agências fiáveis',
        conformite: 'Conformidade legal',
        qualite: 'Qualidade/competências',
        cout: 'Custos',
        disponibilite: 'Disponibilidade de candidatos',
        aucun: 'Sem grande necessidade',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'As suas expectativas para trabalho temporário no estrangeiro',
      description: 'Selecione todas as que se aplicam',
      options: {
        salaire: 'Melhor salário',
        conditions: 'Melhores condições de trabalho',
        stabilite: 'Estabilidade',
        experience: 'Experiência internacional',
        logement: 'Assistência com alojamento',
        aucun: 'Sem expectativas particulares',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'As suas principais preocupações',
      description: 'Selecione todas as que se aplicam',
      options: {
        conformite: 'Conformidade legal',
        qualite: 'Qualidade/competências',
        communication: 'Comunicação/Línguas',
        cout: 'Custos inesperados',
        disponibilite: 'Disponibilidade de candidatos',
        aucun: 'Sem grandes preocupações',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Que problemas encontra mais frequentemente?',
      description: 'Selecione todos os que se aplicam',
      options: {
        paiement: 'Atrasos de pagamento',
        conditions: 'Más condições',
        contrat: 'Contratos não respeitados',
        logement: 'Alojamento inadequado',
        communication: 'Problemas de comunicação',
        aucun: 'Sem grandes problemas',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Que problema gostaria de resolver primeiro?',
      placeholder: 'Descreva o seu problema prioritário...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Quais são as suas necessidades prioritárias?',
      placeholder: 'Ex: Encontrar rapidamente, melhor qualidade, preços...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'O que gostaria de melhorar nas suas missões?',
      placeholder: 'Ex: Salário, alojamento, apoio, estabilidade...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Utiliza software de gestão ERP?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Outro',
        aucun: 'Nenhum ERP',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Que software/ERP?',
      placeholder: 'Ex: SAP, Odoo, personalizado...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Os seus principais critérios de seleção para agências de trabalho temporário',
      description: 'Selecione os seus 3 principais',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'O que melhoraria a sua experiência de trabalho temporário?',
      description: 'Selecione todas as que se aplicam',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Está pronto para mudar as suas ferramentas de trabalho?',
      options: {
        oui: 'Sim, sem problema',
        conditions: 'Sim, sob condições',
        difficile: 'Difícil, mas aberto',
        non: 'Não, não é concebível',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Orçamento mensal para uma plataforma de recrutamento temporário',
      options: {
        '0': 'Não disposto a pagar',
        '1-100': '€1 - €100/mês',
        '100-500': '€100 - €500/mês',
        '500-1000': '€500 - €1.000/mês',
        '1000+': 'Mais de €1.000/mês',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Usaria uma plataforma para encontrar trabalho temporário no estrangeiro?',
      options: {
        oui_certainement: 'Sim, definitivamente',
        oui_probablement: 'Sim, provavelmente',
        peut_etre: 'Talvez',
        non: 'Não',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Qual é o seu interesse num marketplace europeu de destacamento?',
      description: 'Avalie de 1 (não interessado) a 10 (muito interessado)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Funcionalidades mais interessantes',
      description: 'Selecione as suas 3 principais prioridades',
      options: {
        sipsi: 'Declaração SIPSI automática',
        a1: 'Gestão de certificado A1',
        conformite: 'Painel de conformidade',
        alertes: 'Alertas & renovações',
        documents: 'Centralização de documentos',
        marketplace: 'Marketplace de agências',
        support: 'Suporte multilingue especializado',
        api: 'Integração API (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Funcionalidades mais interessantes',
      description: 'Selecione todas as que lhe interessam',
      options: {
        recherche: 'Procurar agências fiáveis',
        comparaison: 'Comparação preço/qualidade',
        avis: 'Avaliações verificadas',
        conformite: 'Garantia de conformidade',
        support: 'Suporte dedicado',
        facturation: 'Faturação centralizada',
        suivi: 'Acompanhamento em tempo real',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Funcionalidades mais interessantes',
      description: 'Selecione todas as que lhe interessam',
      options: {
        recherche: 'Procura de emprego',
        avis: 'Avaliações de agências',
        logement: 'Assistência com alojamento',
        paiement: 'Pagamento seguro',
        support: 'Suporte na minha língua',
        documents: 'Ajuda com documentos administrativos',
        formation: 'Programas de formação',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Modelo de preços preferido',
      options: {
        mensuel: 'Subscrição mensal fixa',
        usage: 'Pagamento por utilização',
        annuel: 'Plano anual (desconto)',
        gratuit: 'Gratuito para trabalhadores',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Orçamento mensal para uma solução SaaS completa',
      options: {
        '0-100': '€0 - €100/mês',
        '100-300': '€100 - €300/mês',
        '300-500': '€300 - €500/mês',
        '500-1000': '€500 - €1.000/mês',
        '1000+': 'Mais de €1.000/mês',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Gostaria de testar uma versão inicial (MVP)?',
      options: {
        oui_gratuit: 'Sim, gratuitamente',
        oui_reduc: 'Sim, com desconto',
        peut_etre: 'Talvez, depende das funcionalidades',
        non: 'Não, não interessado',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Como vê o seu papel no marketplace europeu?',
      options: {
        decideur: 'Decisor final',
        influenceur: 'Influenciador / Recomendação',
        utilisateur: 'Utilizador final',
        autre: 'Outro',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Os seus planos de expansão internacional',
      options: {
        oui_rapide: 'Sim, dentro de 6 meses',
        oui_lent: 'Sim, dentro de 1-2 anos',
        maintien: 'Manter os países atuais',
        reduction: 'Reduzir o âmbito internacional',
      },
    },
    
    // Q24bis : Aspirações (WORKER)
    q24_aspirations: {
      label: 'As suas aspirações profissionais futuras',
      placeholder: 'Ex.: contrato permanente, regresso ao país, formação...',
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Outras necessidades ou comentários',
      placeholder: 'Partilhe qualquer outro feedback ou necessidades...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Número de telefone profissional',
      placeholder: '+351 912 345 678',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Primeiro nome',
      placeholder: 'O seu primeiro nome',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Apelido',
      placeholder: 'O seu apelido',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'SIRET ou SIREN (opcional)',
      placeholder: '123 456 789 00012',
      description: 'Para enriquecimento via Pappers/Société.com',
    },
    
    // Q30 : Email
    email: {
      label: 'O seu email',
      placeholder: 'seu.email@exemplo.pt',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Concordo em ser contactado novamente',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Gostaria de receber o relatório do estudo',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Portuguese (PT) Complete Translation',
    _locale: 'pt-PT',
    _completeness: 100,
  },
};