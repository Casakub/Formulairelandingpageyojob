/**
 * 🇪🇸 TRADUCCIONES ESPAÑOLAS (ESPAÑA)
 * 
 * Traducción completa para español europeo
 * Cobertura: Interfaz, navegación, todas las preguntas de la encuesta
 * 
 * @version 2.0.0
 * @locale es-ES
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const es: TranslationBundle = {
  // Hereda de FR para las claves faltantes
  ...fr,
  
  // Navegación
  nav: {
    section1: 'Perfil',
    section2: 'Experiencia',
    section3: 'Necesidades',
    section4: 'Interés',
    section5: 'Visión',
    section6: 'Contacto',
    dashboard: 'Panel',
    back_to_site: 'Volver al sitio',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Panel',
    tabs: {
      overview: 'Descripción general',
      results: 'Resultados',
      questions: 'Preguntas',
      translations: 'Traducciones',
      export: 'Exportar',
      integrations: 'Integraciones',
      cms: 'CMS del Formulario',
      settings: 'Configuración',
      prospects: 'Prospectos',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nuevo',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Cerrar sesión',
      back_to_survey: 'Volver a la encuesta',
      toggle_sidebar: 'Contraer/Expandir',
    },
    user: {
      welcome: 'Bienvenido',
      logged_in_as: 'Conectado como',
    },
  },
  
  // Secciones
  section: {
    1: {
      title: 'Perfil de la Agencia',
      description: '4 preguntas • 2 min',
    },
    2: {
      title: 'Desplazamiento',
      description: '7 preguntas • 3 min',
    },
    3: {
      title: 'Necesidades',
      description: '6 preguntas • 2 min',
    },
    4: {
      title: 'Interés YoJob',
      description: '6 preguntas • 3 min',
    },
    5: {
      title: 'Visión Futura',
      description: '2 preguntas • 1 min',
    },
    6: {
      title: 'Contacto',
      description: '1 pregunta • 1 min',
    },
  },
  
  // Secciones adaptadas por perfil
  header: {
    title: 'YoJob',
    subtitle: 'Estudio de mercado',
  },
  
  hero: {
    title: 'Encuesta de mercado',
    subtitle: 'Ayúdenos a comprender mejor sus necesidades',
    description: 'Esta encuesta toma aproximadamente 10-15 minutos. Sus respuestas nos permitirán crear una solución adaptada a su sector.',
    cta_start: 'Iniciar la encuesta',
    cta_dashboard: 'Acceder al Panel',
    badge: 'Estudio de mercado europeo',
    stat: {
      countries: '27 países europeos',
      questions: 'preguntas',
      benchmark: 'Reciba el benchmark 2025',
      insights: 'Insights de mercado exclusivos',
      opportunities: 'Acceso prioritario a ofertas',
    },
    footer: {
      info: 'preguntas • Anónimo • Conforme RGPD',
      anonymous: 'Anónimo',
      gdpr: 'Conforme RGPD',
    },
  },
  
  respondent_type: {
    title: '¿Quién es usted?',
    subtitle: 'Seleccione su perfil para personalizar las preguntas',
    agency: 'Agencia ETT',
    agency_description: 'Usted es una agencia de trabajo temporal',
    client: 'Empresa Cliente',
    client_description: 'Usted es una empresa que contrata trabajadores temporales',
    worker: 'Trabajador Temporal',
    worker_description: 'Usted es un trabajador temporal o desplazado',
  },
  
  selector: {
    badge: '🌍 Estudio de mercado europeo - Contratación & Trabajo Temporal',
    title: 'Comparta su experiencia del mercado europeo',
    subtitle: 'Seleccione su perfil para iniciar la encuesta',
    cta: 'Haga clic para comenzar →',
    trust: {
      secure: 'Datos seguros',
      languages: '{count} idiomas disponibles',
      languages_suffix: 'idiomas disponibles',
      anonymous: 'Anónimo y confidencial',
    },
  },
  
  respondent: {
    agency: {
      label: 'Agencia de trabajo temporal',
      description: 'Usted es una agencia ETT europea. Comparta su experiencia de desplazamiento.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Empresa cliente',
      description: 'Usted contrata trabajadores temporales. Comparta sus necesidades y expectativas.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Trabajador temporal',
      description: 'Usted trabaja temporalmente. Comparta su experiencia sobre el terreno.',
      estimatedTime: '10 min',
    },
  },
  
  // Botones
  button: {
    previous: 'Anterior',
    next: 'Siguiente',
    submit: 'Enviar mis respuestas',
    submitting: 'Enviando...',
    back: 'Volver',
    start: 'Comenzar',
  },
  
  // Confirmación
  confirmation: {
    title: '¡Gracias por su participación!',
    subtitle: 'Sus respuestas han sido registradas con éxito',
    message: 'Estamos analizando actualmente todas las respuestas para crear una solución perfectamente adaptada a sus necesidades.',
    cta_back: 'Volver al inicio',
    cta_dashboard: 'Ver el Panel',
  },
  
  // Progreso
  progress: {
    section: 'Sección',
    question: 'Pregunta',
    section_completed: 'Sección completada',
    questions_remaining: '{count} preguntas restantes',
    time_remaining: 'Aproximadamente {time} restante',
  },
  
  section1: {
    description: '4 preguntas • 2 min',
  },
  section2: {
    description: '7 preguntas • 3 min',
  },
  section3: {
    description: '6 preguntas • 2 min',
  },
  section4: {
    description: '6 preguntas • 3 min',
  },
  section5: {
    description: '2 preguntas • 1 min',
  },
  section6: {
    description: '1 pregunta • 1 min',
  },
  
  // Traducciones comunes
  common: {
    oui: 'Sí',
    non: 'No',
    autre: 'Otro',
    loading: 'Cargando...',
    submit: 'Enviar',
    next: 'Siguiente',
    previous: 'Anterior',
    skip: 'Omitir',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    required: 'Obligatorio',
    optional: 'Opcional',
    error: 'Error',
    success: 'Éxito',
    completed: 'Completado',
    inProgress: 'En progreso',
    notStarted: 'No iniciado',
    profileAgency: 'Agencia ETT',
    profileClient: 'Cliente',
    profileWorker: 'Trabajador Temporal',
    score_not_interested: 'No interesado',
    score_very_interested: 'Muy interesado',
  },
  
  // Sectores
  sectors: {
    btp: 'Construcción',
    industrie: 'Industria',
    logistique: 'Logística',
    hotellerie: 'Hostelería',
    sante: 'Salud',
    agriculture: 'Agricultura',
    tech: 'Tecnología/IT',
    autres: 'Otros',
  },
  
  // Preguntas - hereda de FR luego sobrescribe con traducciones ES
  questions: {
    ...fr.questions,
    
    // Q1 : Nombre
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nombre',
      placeholder: 'Nombre de la organización o su nombre completo',
    },
    
    // Q2 : Año creación (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Año de creación',
      placeholder: '2015',
    },
    
    // Q2 : Año creación (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Año de creación de su empresa',
      placeholder: '2010',
    },
    
    // Q2 : Nacionalidad (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Su nacionalidad',
      placeholder: 'Ej: Polaca, Rumana...',
    },
    
    // Q3 : Tamaño (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Tamaño de la organización',
      options: {
        '1-9': '1-9 empleados',
        '10-49': '10-49 empleados',
        '50-249': '50-249 empleados',
        '250+': '250+ empleados',
      },
    },
    
    // Q3 : Experiencia (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Años de experiencia en trabajo temporal',
      options: {
        '<1': 'Menos de 1 año',
        '1-3': '1-3 años',
        '3-5': '3-5 años',
        '5-10': '5-10 años',
        '10+': 'Más de 10 años',
      },
    },
    
    // Q4 : Sectores
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Principales sectores de actividad',
      description: 'Seleccione todos los sectores relevantes',
    },
    
    // Q4 : Oficios (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Sus oficios',
      description: 'Seleccione todos sus oficios',
    },
    
    // Q5 : País (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'País de su agencia',
      placeholder: 'Ej: Polonia',
    },
    
    // Q5 : Localización (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'País donde opera su empresa',
      placeholder: 'Ej: Francia',
    },
    
    // Q5 : País trabajo (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Países donde ha trabajado como trabajador temporal',
      placeholder: 'Ej: Francia, Alemania, Bélgica...',
    },
    
    // Q6 : Volumen (AGENCY)
    q6_volume: {
      label: 'Volumen anual de trabajadores desplazados',
      options: {
        '0': 'Ninguno todavía',
        '1-50': '1-50 trabajadores',
        '51-200': '51-200 trabajadores',
        '201-500': '201-500 trabajadores',
        '500+': 'Más de 500',
      },
    },
    
    // Q6 : Volumen cliente (CLIENT)
    q6_volume_client: {
      label: '¿Cuántos trabajadores temporales emplea por año?',
      options: {
        '0': 'Ninguno actualmente',
        '1-10': '1-10 personas',
        '11-50': '11-50 personas',
        '51-200': '51-200 personas',
        '200+': '200+ personas',
      },
    },
    
    // Q6 : Frecuencia (WORKER)
    q6_frequence: {
      label: '¿Con qué frecuencia trabaja como temporal?',
      options: {
        permanent: 'Regularmente (todo el año)',
        saisonnier: 'Estacional (ciertos meses)',
        occasionnel: 'Ocasionalmente',
        jamais: 'Nunca todavía (buscando)',
      },
    },
    
    // Sección 2 - Desplazamiento/Experiencia
    
    // Q7 : Origen (AGENCY)
    q7_origine: {
      label: '¿De dónde son sus trabajadores desplazados?',
      placeholder: 'Ej: Polonia, Rumanía, Bulgaria...',
    },
    
    // Q8 : Destinos (AGENCY)
    q8_destinations: {
      label: 'Países de destino',
      description: 'Países donde desplaza trabajadores',
      placeholder: 'Ej: Francia, Alemania, Bélgica, Países Bajos...',
    },
    
    // Q8 : Nacionalidades (CLIENT)
    q8_nationalites: {
      label: 'Nacionalidades de los trabajadores temporales que emplea',
      placeholder: 'Ej: Polacos, Rumanos, Búlgaros...',
    },
    
    // Q9 : Desafío (AGENCY)
    q9_defi: {
      label: 'Su principal desafío con el desplazamiento internacional',
      options: {
        admin: 'Complejidad administrativa (A1, SIPSI...)',
        conformite: 'Conformidad legal multipaís',
        cout: 'Costes y tiempo de gestión',
        langues: 'Barreras lingüísticas',
        autre: 'Otro',
      },
    },
    
    // Q9 : Desafío cliente (CLIENT)
    q9_defi_client: {
      label: 'Su principal desafío con trabajadores temporales europeos',
      options: {
        trouver: 'Encontrar agencias fiables',
        conformite: 'Conformidad legal',
        qualite: 'Calidad/competencias',
        cout: 'Costes demasiado altos',
        langues: 'Comunicación / Idiomas',
        autre: 'Otro',
      },
    },
    
    // Q9 : Desafío trabajador (WORKER)
    q9_defi_worker: {
      label: 'Su principal desafío con trabajo temporal en el extranjero',
      options: {
        admin: 'Trámites administrativos',
        langue: 'Barrera del idioma',
        logement: 'Encontrar alojamiento',
        transport: 'Transporte',
        salaire: 'Problemas de pago/salario',
        autre: 'Otro',
      },
    },
    
    // Q9 : Otro
    q9_autre: {
      label: 'Por favor especifique su principal desafío',
      placeholder: 'Describa su principal desafío...',
    },
    
    // Q10 : Gestión (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: '¿Cómo gestiona las declaraciones de desplazamiento hoy?',
      options: {
        interne: 'Equipo interno',
        externe: 'Proveedor externo',
        mixte: 'Enfoque mixto',
        manuel: 'Gestión manual',
        logiciel: 'Software especializado',
      },
    },
    
    // Q10 : Agencias (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: '¿Cuántas agencias de trabajo temporal utiliza?',
      options: {
        '0': 'Ninguna',
        '1': '1 agencia',
        '2-3': '2-3 agencias',
        '4-10': '4-10 agencias',
        '10+': 'Más de 10',
      },
    },
    
    // Q10 : Proceso (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: '¿Cómo contrata trabajadores temporales?',
      options: {
        agence_fr: 'Agencias francesas de trabajo temporal',
        agence_euro: 'Agencias europeas de trabajo temporal',
        direct: 'Contratación directa',
        mixte: 'Mixto',
      },
    },
    
    // Q10 : Agencia (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: '¿Cómo encuentra trabajo temporal?',
      options: {
        agence: 'A través de agencias de trabajo temporal',
        bouche: 'Boca a boca',
        internet: 'Portales de empleo online',
        direct: 'Solicitud directa',
      },
    },
    
    // Q10ter : Agencias utilizadas (WORKER)
    q10_agences_worker: {
      label: '¿Con cuántas agencias trabaja?',
      options: {
        '1': 'Solo 1 agencia',
        '2-3': '2-3 agencias',
        '4-10': '4-10 agencias',
        '10+': 'Más de 10',
      },
    },
    
    // Q11 : Incidentes (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: '¿Ha enfrentado sanciones o incidentes relacionados con conformidad de desplazamiento?',
      description: 'Su respuesta permanece anónima',
      options: {
        jamais: 'No, nunca',
        rarement: 'Raramente (1-2 veces)',
        parfois: 'A veces (3-5 veces)',
        souvent: 'A menudo (6+ veces)',
      },
    },
    
    // Q11 : Conformidad (CLIENT)
    q11_conformite: {
      label: '¿Verifica la conformidad legal de las agencias de trabajo temporal?',
      options: {
        oui_systematique: 'Sí, sistemáticamente',
        oui_parfois: 'Sí, a veces',
        non: 'No',
        ne_sait_pas: 'No sé',
      },
    },
    
    // Q11 : Problemas (WORKER)
    q11_problemes: {
      label: '¿Ha tenido problemas con trabajo temporal en el extranjero?',
      options: {
        oui_graves: 'Sí, problemas graves',
        oui_mineurs: 'Sí, problemas menores',
        non: 'No',
      },
    },
    
    // Q12 : Presupuesto (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Presupuesto anual asignado a la gestión administrativa de desplazamiento',
      options: {
        '0-5k': '€0-5.000 / año',
        '5-15k': '€5.000-15.000 / año',
        '15-30k': '€15.000-30.000 / año',
        '30k+': 'Más de €30.000 / año',
        inconnu: 'No lo sé',
      },
    },
    
    // Q12 : Presupuesto cliente (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Presupuesto anual dedicado al trabajo temporal',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'No sé',
      },
    },
    
    // Q12 : Satisfacción (CLIENT)
    q12_satisfaction: {
      label: 'Satisfacción con las agencias de trabajo temporal actuales',
      options: {
        tres_satisfait: 'Muy satisfecho',
        satisfait: 'Satisfecho',
        neutre: 'Neutral',
        insatisfait: 'Insatisfecho',
      },
    },
    
    // Q12 : Salario (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: '¿Está satisfecho con su salario de trabajo temporal?',
      options: {
        '<1500': 'Menos de €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },
    
    // Q13 : Pérdida de ingresos (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: '¿Qué porcentaje de ingresos se pierde debido a la complejidad administrativa?',
      options: {
        'non': 'No, en realidad no',
        'faible': 'Sí, baja (< 5% ingresos)',
        'moyen': 'Sí, media (5-15% ingresos)',
        'important': 'Sí, significativa (> 15% ingresos)',
      },
    },
    
    // Q13 : Satisfacción (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satisfacción con sus agencias de trabajo temporal actuales',
      options: {
        'tres_satisfait': 'Muy satisfecho',
        'satisfait': 'Satisfecho',
        'neutre': 'Neutral',
        'insatisfait': 'Insatisfecho',
        'tres_insatisfait': 'Muy insatisfecho',
      },
    },
    
    // Q13 : Satisfacción trabajador (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Satisfacción con sus agencias de trabajo temporal actuales',
      options: {
        'tres_satisfait': 'Muy satisfecho',
        'satisfait': 'Satisfecho',
        'neutre': 'Neutral',
        'insatisfait': 'Insatisfecho',
        'tres_insatisfait': 'Muy insatisfecho',
      },
    },
    
    // Sección 3 - Necesidades
    
    // Q14 : Riesgos (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Sus principales preocupaciones',
      description: 'Seleccione todas las que apliquen',
      options: {
        amendes: 'Multas y sanciones',
        reputation: 'Reputación / Imagen',
        penal: 'Responsabilidad penal',
        delais: 'Retrasos en misiones',
        clients: 'Pérdida de clientes',
        aucun: 'Sin riesgo importante',
      },
    },
    
    // Q14 : Necesidades (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Sus principales necesidades',
      description: 'Seleccione todas las que apliquen',
      options: {
        fiabilite: 'Encontrar agencias fiables',
        conformite: 'Conformidad legal',
        qualite: 'Calidad/competencias',
        cout: 'Costes',
        disponibilite: 'Disponibilidad de candidatos',
        aucun: 'Sin gran necesidad',
      },
    },
    
    // Q14 : Expectativas (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Sus expectativas para trabajo temporal en el extranjero',
      description: 'Seleccione todas las que apliquen',
      options: {
        salaire: 'Mejor salario',
        conditions: 'Mejores condiciones de trabajo',
        stabilite: 'Estabilidad',
        experience: 'Experiencia internacional',
        logement: 'Asistencia con alojamiento',
        aucun: 'Sin expectativas particulares',
      },
    },
    
    // Q14_riesgos_cliente opciones
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Sus principales preocupaciones',
      description: 'Seleccione todas las que apliquen',
      options: {
        conformite: 'Conformidad legal',
        qualite: 'Calidad/competencias',
        communication: 'Comunicación/Idiomas',
        cout: 'Costes inesperados',
        disponibilite: 'Disponibilidad de candidatos',
        aucun: 'Sin grandes preocupaciones',
      },
    },
    
    // Q14_riesgos_trabajador opciones
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: '¿Qué problemas encuentra más frecuentemente?',
      description: 'Seleccione todos los que apliquen',
      options: {
        paiement: 'Retrasos en pagos',
        conditions: 'Malas condiciones',
        contrat: 'Contratos no respetados',
        logement: 'Alojamiento inadecuado',
        communication: 'Problemas de comunicación',
        aucun: 'Sin grandes problemas',
      },
    },
    
    // Q15 : Problema
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: '¿Qué problema le gustaría resolver primero?',
      placeholder: 'Describa su problema prioritario...',
    },
    
    // Q15 : Necesidades cliente (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: '¿Cuáles son sus necesidades prioritarias?',
      placeholder: 'Ej: Encontrar rápidamente, mejor calidad, precios...',
    },
    
    // Q15 : Mejoras (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: '¿Qué le gustaría mejorar en sus misiones?',
      placeholder: 'Ej: Salario, alojamiento, apoyo, estabilidad...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: '¿Utiliza software de gestión ERP?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Otro',
        aucun: 'Ningún ERP',
      },
    },
    
    // Q16 : Nombre ERP
    q16_nom_erp: {
      label: '¿Qué software/ERP?',
      placeholder: 'Ej: SAP, Odoo, personalizado...',
    },
    
    // Q16 : Criterios (CLIENT)
    q16_criteres: {
      label: 'Sus principales criterios de selección para agencias de trabajo temporal',
      description: 'Seleccione sus 3 principales',
    },
    
    // Q16 : Mejora (WORKER)
    q16_amelioration: {
      label: '¿Qué mejoraría su experiencia de trabajo temporal?',
      description: 'Seleccione todas las que apliquen',
    },
    
    // Q17 : Migración (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: '¿Está listo para cambiar sus herramientas de trabajo?',
      options: {
        oui: 'Sí, sin problema',
        conditions: 'Sí, bajo condiciones',
        difficile: 'Difícil, pero abierto',
        non: 'No, no es concebible',
      },
    },
    
    // Q17 : Presupuesto (CLIENT)
    q17_budget: {
      label: 'Presupuesto mensual para una plataforma de contratación temporal',
      options: {
        '0': 'No dispuesto a pagar',
        '1-100': '€1 - €100/mes',
        '100-500': '€100 - €500/mes',
        '500-1000': '€500 - €1.000/mes',
        '1000+': 'Más de €1.000/mes',
      },
    },
    
    // Q17 : Plataforma (WORKER)
    q17_plateforme: {
      label: '¿Usaría una plataforma para encontrar trabajo temporal en el extranjero?',
      options: {
        oui_certainement: 'Sí, definitivamente',
        oui_probablement: 'Sí, probablemente',
        peut_etre: 'Quizás',
        non: 'No',
      },
    },
    
    // Sección 4 - Interés YoJob
    
    // Q18 : Puntuación
    q18_score: {
      ...fr.questions.q18_score,
      label: '¿Cuál es su interés en un marketplace europeo de desplazamiento?',
      description: 'Califique de 1 (no interesado) a 10 (muy interesado)',
    },
    
    // Q19 : Características (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Características más interesantes',
      description: 'Seleccione sus 3 principales prioridades',
      options: {
        sipsi: 'Declaración SIPSI automática',
        a1: 'Gestión de certificado A1',
        conformite: 'Panel de conformidad',
        alertes: 'Alertas y renovaciones',
        documents: 'Centralización de documentos',
        marketplace: 'Marketplace de agencias',
        support: 'Soporte multilingüe especializado',
        api: 'Integración API (ERP)',
      },
    },
    
    // Q19 : Características CLIENTE
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Características más interesantes',
      description: 'Seleccione todas las que le interesan',
      options: {
        recherche: 'Buscar agencias fiables',
        comparaison: 'Comparación precio/calidad',
        avis: 'Reseñas verificadas',
        conformite: 'Garantía de conformidad',
        support: 'Soporte dedicado',
        facturation: 'Facturación centralizada',
        suivi: 'Seguimiento en tiempo real',
      },
    },
    
    // Q19 : Características TRABAJADOR
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Características más interesantes',
      description: 'Seleccione todas las que le interesan',
      options: {
        recherche: 'Búsqueda de empleo',
        avis: 'Reseñas de agencias',
        logement: 'Asistencia con alojamiento',
        paiement: 'Pago seguro',
        support: 'Soporte en mi idioma',
        documents: 'Ayuda con documentos administrativos',
        formation: 'Programas de formación',
      },
    },
    
    // Q20 : Precio
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Modelo de precios preferido',
      options: {
        mensuel: 'Suscripción mensual fija',
        usage: 'Pago por uso',
        annuel: 'Plan anual (descuento)',
        gratuit: 'Gratuito para trabajadores',
      },
    },
    
    // Q21 : Presupuesto mensual
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Presupuesto mensual para una solución SaaS completa',
      options: {
        '0-100': '€0 - €100/mes',
        '100-300': '€100 - €300/mes',
        '300-500': '€300 - €500/mes',
        '500-1000': '€500 - €1.000/mes',
        '1000+': 'Más de €1.000/mes',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: '¿Le gustaría probar una versión inicial (MVP)?',
      options: {
        oui_gratuit: 'Sí, gratuitamente',
        oui_reduc: 'Sí, con descuento',
        peut_etre: 'Quizás, depende de las características',
        non: 'No, no interesado',
      },
    },
    
    // Sección 5 - Visión Futura
    
    // Q23 : Rol
    q23_role: {
      label: '¿Cómo ve su rol en el marketplace europeo?',
      options: {
        decideur: 'Decisor final',
        influenceur: 'Influencer / Recomendación',
        utilisateur: 'Usuario final',
        autre: 'Otro',
      },
    },
    
    // Q24 : Evolución
    q24_evolution: {
      label: 'Sus planes de expansión internacional',
      options: {
        oui_rapide: 'Sí, en 6 meses',
        oui_lent: 'Sí, en 1-2 años',
        maintien: 'Mantener países actuales',
        reduction: 'Reducir alcance internacional',
      },
    },
    
    // Q25 : Necesidades
    q25_besoins: {
      label: 'Otras necesidades o comentarios',
      placeholder: 'Comparta cualquier otro comentario o necesidad...',
    },
    
    // Sección 6 - Contacto
    
    // Q26 : Teléfono profesional
    q26_phone: {
      label: 'Número de teléfono profesional',
      placeholder: '+34 612 345 678',
    },
    
    // Q27 : Nombre
    q27_firstname: {
      label: 'Nombre',
      placeholder: 'Su nombre',
    },
    
    // Q28 : Apellido
    q28_lastname: {
      label: 'Apellido',
      placeholder: 'Su apellido',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'SIRET o SIREN (opcional)',
      placeholder: '123 456 789 00012',
      description: 'Para enriquecimiento vía Pappers/Société.com',
    },
    
    // Q30 : Email
    email: {
      label: 'Su email',
      placeholder: 'su.email@ejemplo.es',
    },
    
    // Q31 : Autorización contacto
    autorise_contact: {
      label: 'Acepto ser contactado nuevamente',
    },
    
    // Q32 : Informe de estudio
    souhaite_rapport: {
      label: 'Me gustaría recibir el informe del estudio',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Spanish (ES) Complete Translation',
    _locale: 'es-ES',
    _completeness: 100,
  },
};
