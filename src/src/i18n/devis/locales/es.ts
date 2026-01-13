/**
 * 🇪🇸 TRADUCCIONES ESPAÑOLAS - FORMULARIO DE PRESUPUESTO
 * 
 * Traducciones completas en español para el formulario de presupuesto
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const es: DevisTranslations = {
  // === COMÚN ===
  common: {
    next: "Siguiente",
    previous: "Anterior",
    submit: "Enviar",
    required: "*",
    optional: "(opcional)",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    confirm: "Confirmar",
    euro: "€",
    perHour: "/h",
    perMonth: "/mes",
    perDay: "/día",
    persons: "persona(s)",
    hours: "hora(s)",
    days: "día(s)",
    months: "meses",
    year: "año(s)",
  },

  // === NAVEGACIÓN ===
  navigation: {
    back: "Atrás",
    stepOf: "Paso {step} de {total}",
    steps: {
      entreprise: {
        title: "Empresa",
        badge: "🏢 Su empresa",
      },
      contact: {
        title: "Contacto",
        badge: "👤 Su contacto",
      },
      besoins: {
        title: "Necesidades",
        badge: "💼 Sus necesidades",
      },
      conditions: {
        title: "Condiciones",
        badge: "📋 Condiciones",
      },
      candidats: {
        title: "Candidatos",
        badge: "👷 Perfil buscado",
      },
      recapitulatif: {
        title: "Resumen",
        badge: "✅ Resumen",
      },
    },
  },

  // === VALIDACIÓN ===
  validation: {
    fillRequired: "Por favor, rellene todos los campos obligatorios",
    selectRegion: "Por favor, seleccione una región",
    addAtLeastOnePosition: "Por favor, añada al menos un puesto",
    invalidEmail: "Por favor, introduzca una dirección de correo electrónico válida",
    invalidPhone: "Por favor, introduzca un número de teléfono válido",
    invalidSIRET: "Por favor, introduzca un número SIRET válido (14 dígitos)",
    dateRequired: "Por favor, introduzca la fecha de inicio",
    missionLocationRequired: "Por favor, introduzca el lugar de misión",
  },

  // === MENSAJES ===
  messages: {
    success: {
      quoteSent: "¡Presupuesto enviado con éxito!",
      redirecting: "Redirigiendo...",
    },
    error: {
      submitError: "Error al enviar el presupuesto",
      genericError: "Ha ocurrido un error",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Solicitud de presupuesto | YOJOB",
    pageDescription: "Solicite un presupuesto para sus necesidades de personal temporal europeo.",
  },

  // === PASO 1: EMPRESA ===
  step1: {
    title: "Información de la Empresa",
    subtitle: "Introduzca la información legal de su empresa.",
    fields: {
      pays: {
        label: "País",
        placeholder: "Seleccione un país",
      },
      raisonSociale: {
        label: "Razón Social",
        placeholder: "ej. YOJOB S.L.",
      },
      siret: {
        label: "Número de Registro Mercantil",
        placeholder: "Número de registro",
        helper: "Su identificador de registro empresarial",
      },
      codeAPE: {
        label: "Código de Actividad Empresarial",
        placeholder: "ej. 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Número de IVA",
        placeholder: "ej. ES12345678Z",
      },
      adresse: {
        label: "Dirección Completa",
        placeholder: "Número y nombre de la calle",
      },
      codePostal: {
        label: "Código Postal",
        placeholder: "ej. 28001",
      },
      ville: {
        label: "Ciudad",
        placeholder: "ej. Madrid",
      },
      region: {
        label: "Región/Comunidad Autónoma",
        placeholder: "Seleccione una región",
        placeholderOtherCountry: "ej. Baviera, Cataluña, Lombardía...",
      },
      siteInternet: {
        label: "Sitio Web",
        placeholder: "https://www.ejemplo.es",
      },
    },
    infoMessage: "✓ Esta información se utilizará para generar su presupuesto personalizado",
  },

  // === PASO 2: CONTACTO ===
  step2: {
    title: "Persona de Contacto",
    subtitle: "¿Quién será el contacto principal para este proyecto?",
    fields: {
      civilite: {
        label: "Tratamiento",
        options: {
          m: "Sr.",
          mme: "Sra.",
        },
      },
      nom: {
        label: "Apellidos",
        placeholder: "ej. García",
      },
      prenom: {
        label: "Nombre",
        placeholder: "ej. Juan",
      },
      fonction: {
        label: "Cargo",
        placeholder: "ej. Director de RRHH",
      },
      email: {
        label: "Email Profesional",
        placeholder: "juan.garcia@empresa.es",
      },
      telephone: {
        label: "Teléfono",
        placeholder: "+34 91 123 45 67",
      },
    },
  },

  // === PASO 3: NECESIDADES ===
  step3: {
    title: "Defina sus Necesidades",
    subtitle: "Describa con precisión los puestos que busca.",
    fields: {
      secteur: {
        label: "Sector de Actividad",
        placeholder: "Seleccione un sector",
      },
      convention: {
        label: "Convenio Colectivo",
        placeholder: "Automático según el sector",
      },
      poste: {
        label: "Puesto",
        placeholder: "Seleccione un puesto",
      },
      classification: {
        label: "Clasificación / Cualificación",
        placeholder: "Seleccione una clasificación",
      },
      quantite: {
        label: "Número de Personas",
        placeholder: "ej. 5",
        helper: "¿Cuántas personas para este puesto?",
      },
      salaireBrut: {
        label: "Salario Bruto Mensual",
        placeholder: "ej. 2500",
        helper: "Salario bruto basado en 151,67h/mes",
      },
      nationalite: {
        label: "Nacionalidad de los Trabajadores",
        placeholder: "Seleccione un país",
        helper: "La nacionalidad impacta el coeficiente de precio de la agencia",
      },
    },
    ajouterPoste: "Añadir Otro Puesto",
    supprimerPoste: "Eliminar Este Puesto",
    posteNumero: "Puesto",
    coefficientInfo: {
      title: "💡 Coeficiente de Agencia Aplicado",
      base: "Coef. base",
      facteurPays: "Factor país",
      final: "Coeficiente final",
    },
  },

  // === PASO 4: CONDICIONES ===
  step4: {
    title: "Condiciones de Trabajo",
    subtitle: "Especifique las condiciones de empleo y beneficios ofrecidos.",
    fields: {
      dateDebut: {
        label: "Fecha de Inicio Deseada",
        placeholder: "DD/MM/AAAA",
      },
      dateFin: {
        label: "Fecha de Fin Prevista",
        placeholder: "DD/MM/AAAA",
        helper: "Dejar en blanco si la duración es indefinida",
      },
      baseHoraire: {
        label: "Horas Mensuales",
        placeholder: "ej. 151,67",
        helper: "Base legal en Francia: 151,67h/mes (35h/semana)",
      },
      lieuxMission: {
        label: "Lugares de Misión",
        placeholder: "ej. París 15, Lyon 3, Marsella...",
      },
    },
    sections: {
      hebergement: {
        title: "Alojamiento",
        chargeEU: {
          label: "Alojamiento proporcionado por la empresa cliente",
          helper: "Si NO: se cobrará un suplemento por hora de +3,50 €/h por parte de la agencia",
          options: {
            oui: "Sí, proporcionado por el cliente",
            non: "No, responsabilidad de la agencia",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo de Alojamiento",
            options: {
              hotel: "Hotel",
              appartement: "Apartamento",
              foyer: "Residencia",
              autre: "Otro",
            },
          },
          adresse: {
            label: "Dirección del Alojamiento",
            placeholder: "Dirección completa",
          },
        },
      },
      transportInternational: {
        title: "Transporte Internacional (país de origen ↔ Francia)",
        chargeEU: {
          label: "Transporte proporcionado por la empresa cliente",
          helper: "Viajes entre el país de origen y el lugar de la misión",
          options: {
            oui: "Sí, proporcionado por el cliente",
            non: "No, responsabilidad del trabajador",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo de Transporte",
            options: {
              avion: "Avión",
              train: "Tren",
              bus: "Autobús",
              covoiturage: "Viaje compartido organizado",
            },
          },
          frequence: {
            label: "Frecuencia de Viajes",
            options: {
              allerRetour: "Solo ida y vuelta inicial",
              hebdomadaire: "Semanal",
              mensuel: "Mensual",
            },
          },
        },
      },
      transportLocal: {
        title: "Transporte Local (en el lugar de la misión)",
        chargeETT: {
          label: "Transporte local proporcionado por la agencia",
          helper: "Si SÍ: se cobrará un suplemento por hora de +1,50 €/h",
          options: {
            oui: "Sí, proporcionado por la agencia",
            non: "No",
          },
        },
        detailsETT: {
          type: {
            label: "Tipo de Transporte",
            options: {
              vehicule: "Vehículo de servicio",
              transport: "Abono de transporte público",
              velo: "Bicicleta/Patinete",
            },
          },
        },
      },
      repas: {
        title: "Comidas",
        type: {
          label: "Solución de Comidas",
          options: {
            restaurant: "Comedor de empresa / Vales comida",
            panier: "Comida preparada (facturada por día)",
            nonConcerne: "No aplicable",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Presupuesto Diario",
            placeholder: "ej. 12,00",
          },
        },
        detailsPanier: {
          info: "La comida preparada se facturará por separado por día trabajado según la tarifa del país de origen",
        },
      },
    },
  },

  // === PASO 5: CANDIDATOS ===
  step5: {
    title: "Perfil del Candidato",
    subtitle: "Defina las habilidades y requisitos específicos.",
    sections: {
      experience: {
        title: "Experiencia Profesional",
        annees: {
          label: "Años Mínimos de Experiencia",
          placeholder: "Seleccione un nivel",
          options: {
            '0-1': "Principiante (0-1 año)",
            '1-3': "Intermedio (1-3 años)",
            '3-5': "Experimentado (3-5 años)",
            '5+': "Experto (5+ años)",
          },
        },
        competences: {
          label: "Habilidades Técnicas Requeridas",
          placeholder: "ej. Albañilería, encofrado, lectura de planos, soldadura TIG...",
        },
      },
      langues: {
        title: "Habilidades Lingüísticas",
        francais: {
          label: "Nivel de Francés Requerido",
          placeholder: "Seleccione un nivel",
          options: {
            a1: "A1 - Principiante",
            a2: "A2 - Elemental",
            b1: "B1 - Intermedio",
            b2: "B2 - Intermedio Alto",
            c1: "C1 - Avanzado",
            c2: "C2 - Dominio",
            natif: "Nativo",
          },
        },
        autres: {
          label: "Otros Idiomas Útiles",
          placeholder: "ej. Inglés (B1), Alemán (A2)...",
        },
        // Nombres de idiomas
        languageNames: {
          francais: "Francés",
          anglais: "Inglés",
          portugais: "Portugués",
          espagnol: "Español",
          italien: "Italiano",
          autre: "Otro",
        },
        // Niveles de idioma
        levels: {
          'non-requis': "No requerido",
          'A1': "A1 - Principiante",
          'A2': "A2 - Elemental",
          'B1': "B1 - Intermedio",
          'B2': "B2 - Avanzado",
          'C1': "C1 - Autónomo",
          'C2': "C2 - Dominio",
        },
      },
      permis: {
        title: "Licencia de Conducir",
        requis: {
          label: "Licencia Requerida",
          options: {
            aucun: "No se requiere licencia",
            b: "Permiso B (coche)",
            c: "Permiso C (camión)",
            ce: "Permiso CE (camión + remolque)",
            d: "Permiso D (transporte de pasajeros)",
          },
        },
        categorie: {
          label: "Categoría de licencia",
          placeholder: "ej. B, C, CE...",
        },
      },
      outillage: {
        title: "Herramientas pequeñas",
        requis: {
          label: "Herramientas personales requeridas",
        },
        type: {
          label: "Tipo de herramientas",
          placeholder: "ej. Martillo, nivel, cinta métrica, paleta...",
        },
      },
      epi: {
        title: "Equipo de Protección Individual (EPI)",
        infoLegale: "ℹ️ Según la normativa, el empleador debe proporcionar EPI adaptado a los riesgos del puesto.",
        selectionCount: "✓ {count} EPI seleccionado(s)",
        fournis: {
          label: "EPI proporcionado por la empresa",
          helper: "Casco, zapatos de seguridad, guantes, etc.",
          options: {
            oui: "Sí, proporcionado por el cliente",
            non: "No, responsabilidad del trabajador",
          },
        },
        liste: {
          label: "Lista de EPI Requeridos",
          placeholder: "ej. Casco, zapatos S3, guantes anticorte, arnés...",
        },
        // Artículos EPI
        items: {
          casque: "Casco de seguridad",
          lunettes: "Gafas de seguridad",
          protections_auditives: "Protección auditiva",
          gants: "Guantes de protección",
          chaussures: "Zapatos de seguridad",
          harnais: "Arnés de seguridad",
          vetements: "Ropa de trabajo",
          masque: "Máscara respiratoria",
          protection_faciale: "Protección facial",
          vetements_visibilite: "Ropa de alta visibilidad",
        },
      },
      autresExigences: {
        title: "Otros Requisitos",
        label: "Requisitos Específicos Adicionales",
        placeholder: "ej. Certificaciones eléctricas, licencia de carretilla, disponibilidad fines de semana, trabajo en altura...",
      },
    },
  },

  // === RESUMEN ===
  recapitulatif: {
    title: "Resumen de su Solicitud",
    subtitle: "Revise la información antes de enviar su solicitud de presupuesto.",
    acceptConditionsError: "Por favor, acepte las condiciones antes de continuar",
    entreprise: {
      title: "Empresa",
      raisonSociale: "Razón Social",
      siret: "Número de Registro",
      pays: "País",
      ville: "Ciudad",
      region: "Región/Comunidad",
    },
    contact: {
      title: "Contacto",
      nomPrenom: "Nombre",
      email: "Email",
      telephone: "Teléfono",
      fonction: "Cargo",
    },
    postes: {
      title: "Puestos Solicitados",
      coeffETT: "📊 Coeficiente de Agencia Aplicado",
      coeffBase: "Coef. base",
      facteurPays: "Factor país",
      supplementsHoraires: "✨ Suplementos por Hora (incluidos en la tarifa)",
      hebergement: "✓ Alojamiento",
      transport: "✓ Transporte local",
      panierRepas: "🍽️ Comida preparada (facturada por día)",
      baseHoraire: "📅 Horas mensuales: {heures}h/mes (horas extras detectadas)",
      heuresNormales: "Horas normales (0-35h/sem)",
      heuresSup25: "Horas extras +25% (36ª-43ª h)",
      heuresSup50: "Horas extras +50% (44ª+ h)",
      sousTotal: "Subtotal de mano de obra (por persona)",
      tauxHoraireBrut: "Tarifa horaria bruta",
      tauxETTFinal: "Tarifa final de agencia",
      coutMensuel: "Coste mensual total",
    },
    conditions: {
      title: "Condiciones de la Misión",
      dateDebut: "Fecha de inicio",
      dateFin: "Fecha de fin",
      dureeEstimee: "Duración estimada",
      lieuMission: "Lugar de la misión",
      mois: "meses",
    },
    totaux: {
      mensuelHT: "Total Mensual (sin IVA)",
      mensuelTTC: "Total Mensual (con IVA)",
      totalMission: "Coste Total de la Misión",
    },
    noteLegale: "ℹ️ Esta estimación es indicativa. El precio final se confirmará después de la validación por nuestro equipo y la agencia asociada seleccionada.",
    acceptConditions: {
      text: "Acepto que mis datos sean procesados de acuerdo con la",
      lien: "política de privacidad",
    },
    boutonEnvoi: {
      texte: "Enviar mi Solicitud de Presupuesto",
      enCours: "Enviando...",
    },
    footer: "✓ Respuesta en 24 horas laborables • ✓ Sin compromiso",
  },

  // === ERRORES ===
  errors: {
    required: "Este campo es obligatorio",
    invalidEmail: "Dirección de email inválida",
    invalidSIRET: "Número de registro inválido",
    invalidPhone: "Número de teléfono inválido",
    minValue: "El valor debe ser mayor o igual a {min}",
    maxValue: "El valor debe ser menor o igual a {max}",
    genericError: "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
    loadingError: "Error al cargar los datos",
    submitError: "Error al enviar la solicitud",
  },

  // === SECTORES & PROFESIONES ===
  secteurs: {
    batiment: {
      label: "Construcción",
      convention: "Convenio colectivo nacional obreros de construcción (3193)",
      postes: {
        macon: "Albañil",
        coffreur: "Encofrador",
        ferrailleur: "Ferrallista",
        carreleur: "Solador",
        platrier: "Yesero",
        peintre: "Pintor",
        plombier: "Fontanero",
        electricien: "Electricista",
        couvreur: "Techador",
        menuisier: "Carpintero",
        chef_equipe_batiment: "Jefe de equipo",
        chef_chantier: "Jefe de obra",
      },
      classifications: {
        n1p1: "N1P1",
        n1p2: "N1P2",
        n2p1: "N2P1",
        n2p2: "N2P2",
        n3p1: "N3P1",
        n3p2: "N3P2",
        n4p1: "N4P1",
        n4p2: "N4P2",
      },
    },
    metallurgie: {
      label: "Metalurgia",
      convention: "Convenio colectivo de metalurgia (3109)",
      postes: {
        soudeur: "Soldador",
        chaudronnier: "Calderero",
        tuyauteur: "Tubero",
        tourneur: "Tornero",
        fraiseur: "Fresador",
        usineur: "Mecanizador",
        mecanicien_industriel: "Mecánico industrial",
        monteur: "Montador",
        controleur_qualite: "Inspector de calidad",
        ajusteur: "Ajustador",
        chef_equipe_metallurgie: "Jefe de equipo",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    tp: {
      label: "Obras Públicas",
      convention: "Convenio colectivo nacional obras públicas (3005)",
      postes: {
        conducteur_engins: "Operador de maquinaria",
        terrassier: "Peón",
        canalisateur: "Pocero",
        constructeur_routes: "Constructor de carreteras",
        coffreur_bancheur: "Encofrador",
        macon_vrd: "Albañil VRD",
        chef_equipe_tp: "Jefe de equipo OP",
        manoeuvre_tp: "Peón OP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelería",
      convention: "Convenio colectivo hostelería-restauración (3292)",
      postes: {
        receptionniste: "Recepcionista",
        femme_chambre: "Camarera de pisos",
        agent_entretien: "Personal de limpieza",
        bagagiste: "Botones",
        concierge: "Conserje",
        night_audit: "Auditor nocturno",
        gouvernante: "Gobernanta",
        chef_reception: "Jefe de recepción",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    restauration: {
      label: "Restauración",
      convention: "Convenio colectivo hostelería-restauración (3292)",
      postes: {
        cuisinier: "Cocinero",
        commis_cuisine: "Ayudante de cocina",
        chef_partie: "Chef de parte",
        serveur: "Camarero",
        barman: "Barman",
        plongeur: "Lavaplatos",
        chef_rang: "Jefe de rango",
        maitre_hotel: "Maître",
        second_cuisine: "Segundo de cocina",
        chef_cuisine: "Jefe de cocina",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    plasturgie: {
      label: "Industria del Plástico",
      convention: "Convenio colectivo industria del plástico (0292)",
      postes: {
        operateur_injection: "Operador de inyección",
        operateur_extrusion: "Operador de extrusión",
        regleur: "Regulador",
        operateur_thermoformage: "Operador de termoformado",
        controleur_qualite_plasturgie: "Inspector de calidad",
        technicien_maintenance: "Técnico de mantenimiento",
        chef_equipe_plasturgie: "Jefe de equipo",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    automobile_carrosserie: {
      label: "Automóvil y Carrocería",
      convention: "Convenio colectivo reparación automóvil (1090)",
      postes: {
        carrossier: "Chapista",
        peintre_automobile: "Pintor de automóviles",
        mecanicien_auto: "Mecánico de automóviles",
        electricien_auto: "Electricista de automóviles",
        chef_atelier: "Jefe de taller",
        controleur_technique: "Inspector técnico",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    sylviculture: {
      label: "Silvicultura",
      convention: "Convenio colectivo agricultura (7501)",
      postes: {
        bucheron: "Leñador",
        elagueur: "Podador",
        conducteur_engins_forestiers: "Operador de maquinaria forestal",
        chef_equipe_sylviculture: "Jefe de equipo silvicultura",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    cartonnerie: {
      label: "Industria del Cartón",
      convention: "Convenio colectivo industria de transformación (3107)",
      postes: {
        operateur_production: "Operador de producción",
        conducteur_ligne: "Conductor de línea",
        regleur_cartonnerie: "Regulador",
        chef_equipe_cartonnerie: "Jefe de equipo",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    autre: {
      label: "Otro",
      convention: "A definir según actividad",
      postes: {
        autre_poste: "Otro puesto (especificar)",
      },
      classifications: {
        a_definir: "Por definir",
      },
    },
  },
};