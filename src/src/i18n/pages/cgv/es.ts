/**
 * 🇪🇸 TRADUCCIONES ESPAÑOLAS - CONDICIONES GENERALES DE VENTA (CGV)
 * 
 * @version 1.0.0
 */

export const cgvES = {
  hero: {
    badge: "Documento B2B - Contractual",
    title: "Condiciones Generales de Venta",
    subtitle: "CGV aplicables a Empresas Usuarias (EU) y Agencias ETT asociadas",
    effectiveDate: "Versión vigente desde el 19 de diciembre de 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Intermediario / Corredor comercial"
    },
    eu: {
      title: "Empresa Usuaria (EU)",
      description: "Cliente final que recibe la mano de obra"
    },
    ett: {
      title: "Agencia ETT",
      description: "Socio de reclutamiento"
    }
  },

  sections: {
    article0: {
      title: "Artículo 0 - Identidad del prestador",
      fields: {
        legalForm: "Forma jurídica",
        legalFormValue: "Empresa Individual (EI)",
        manager: "Gerente",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "NIF intracomunitario",
        vatValue: "FR79447862764",
        address: "Dirección",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Contacto",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Seguro RC Profesional",
        description: "YOJOB dispone de un seguro de responsabilidad civil profesional que cubre las consecuencias pecuniarias de su responsabilidad en relación con sus prestaciones."
      }
    },

    article1: {
      title: "Artículo 1 - Definiciones",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Intermediario/corredor comercial que asegura la prospección, calificación, coordinación y formalización de propuestas comerciales entre EU y ETT."
        },
        eu: {
          term: "Empresa Usuaria (EU)",
          definition: "Empresa cliente final que recibe la mano de obra puesta a disposición por una ETT asociada."
        },
        ett: {
          term: "ETT / Agencia asociada",
          definition: "Agencia de trabajo temporal que realiza el reclutamiento, la contratación y la organización de la puesta a disposición de personal."
        },
        profile: {
          term: "Perfil",
          definition: "Candidato o trabajador temporal presentado por una ETT a una EU a través de la intermediación de YOJOB."
        },
        mission: {
          term: "Misión",
          definition: "Necesidad de reclutamiento expresada por la EU (oficio, volumen, fechas, lugar, requisitos específicos)."
        },
        proposition: {
          term: "Propuesta tripartita",
          definition: "Propuesta comercial y administrativa estructurada por YOJOB y validada por la EU y la ETT (firma o acuerdo escrito)."
        },
        handover: {
          term: "Traspaso",
          definition: "Momento en que la ETT se convierte en el interlocutor principal de la EU tras doble validación EU + ETT."
        },
        insurer: {
          term: "Asegurador de crédito",
          definition: "Organismo de seguro de crédito (COFACE, Allianz Trade, etc.) que interviene en el análisis del riesgo cliente y la concesión de líneas de crédito."
        }
      }
    },

    article2: {
      title: "Artículo 2 - Objeto",
      intro: "Las presentes CGV regulan las prestaciones de YOJOB que consisten principalmente en:",
      steps: {
        step1: {
          title: "Prospectar y calificar",
          description: "Identificar y calificar Empresas Usuarias con necesidades de reclutamiento europeo"
        },
        step2: {
          title: "Presentar oportunidades",
          description: "Transmitir las oportunidades calificadas a las ETT asociadas correspondientes"
        },
        step3: {
          title: "Estructurar la propuesta",
          description: "Elaborar una propuesta comercial detallada (perímetro, coordinación, elementos administrativos)"
        },
        step4: {
          title: "Organizar el traspaso",
          description: "Asegurar la transición hacia la ETT tras la firma para la ejecución (reclutamiento, puesta a disposición, facturación)"
        }
      },
      yojobRole: {
        title: "Papel de YOJOB",
        description: "YOJOB actúa exclusivamente como intermediario. La ETT es responsable del reclutamiento, la puesta a disposición, el cumplimiento empleador y la facturación a la EU, salvo estipulación expresa en contrario en el contrato."
      }
    },

    article3: {
      title: "Artículo 3 - Documentos contractuales y jerarquía",
      intro: "En caso de contradicción entre los documentos, se aplica el siguiente orden de prioridad:",
      hierarchy: {
        rank1: {
          title: "Contrato particular / Condiciones específicas",
          subtitle: "Asociación o aportación de negocios personalizada"
        },
        rank2: {
          title: "Propuesta tripartita / Presupuesto / Pedido",
          subtitle: "Documento firmado por las partes"
        },
        rank3: {
          title: "Condiciones Generales de Venta (CGV)",
          subtitle: "Este documento"
        },
        rank4: {
          title: "Anexos",
          subtitle: "SLA, DPA, procesos, checklists, etc."
        }
      }
    },

    article4: {
      title: "Artículo 4 - Esquemas contractuales",
      intro: "El esquema aplicable se especifica en la propuesta o el contrato. YOJOB puede intervenir según 3 modelos:",
      schemes: {
        schemaB: {
          label: "Esquema B",
          badge: "Principal",
          title: "ETT cliente de YOJOB",
          description: "YOJOB es remunerado por la ETT en concepto de aportación de negocios (comisión mensual y/o prima de éxito)"
        },
        schemaA: {
          label: "Esquema A",
          badge: "Opcional",
          title: "EU cliente de YOJOB",
          description: "YOJOB factura a la EU servicios adicionales (coordinación reforzada, asistencia documental extendida)"
        },
        schemaC: {
          label: "Esquema C",
          badge: "Mixto",
          title: "Remuneración combinada",
          description: "YOJOB es remunerado por la ETT (Esquema B) Y factura servicios adicionales a la EU (Esquema A)"
        }
      }
    },

    article5: {
      title: "Artículo 5 - Proceso y traspaso",
      phase1: {
        title: "5.1 Fase previa (comercial y coordinación)",
        intro: "YOJOB asegura:",
        items: [
          "Prospección y calificación de la Empresa Usuaria",
          "Recopilación de los elementos necesarios para la Misión",
          "Transmisión de la necesidad a una o varias ETT asociadas",
          "Coordinación hasta la finalización de la propuesta tripartita"
        ]
      },
      phase2: {
        title: "5.2 Desencadenante del traspaso",
        intro: "El \"traspaso\" se produce al cumplirse dos condiciones acumulativas:",
        conditions: [
          "Firma/acuerdo escrito de la EU sobre la propuesta",
          "Aceptación/validación de la ETT (capacidad, condiciones, cumplimiento, riesgo)"
        ],
        consequences: "A partir de ese momento, la ETT se convierte en el interlocutor principal para: reclutamiento, contratos, onboarding, puesta a disposición, nómina, obligaciones de desplazamiento, facturación y cobro EU."
      },
      phase3: {
        title: "5.3 Asistencia residual (si está prevista)",
        description: "YOJOB puede permanecer como soporte (coordinación/calidad) dentro del perímetro acordado en la propuesta o el contrato."
      }
    },

    article6: {
      title: "Artículo 6 - Condiciones financieras y modalidades de pago",
      section1: {
        title: "6.1 Principio: plazos \"selectivos\" caso por caso",
        intro: "Teniendo en cuenta las prácticas del sector (seguro de crédito, riesgo cliente, organización de facturación), las condiciones de pago se definen caso por caso en la propuesta/contrato aplicable.",
        modalitiesTitle: "Las modalidades pueden incluir:",
        modalities: [
          "Pago al recibo",
          "Pago anticipado / anticipo",
          "Facturación semanal",
          "Garantías (depósito, limitación de línea de crédito)"
        ],
        legalLimit: "Cuando se concede un plazo de pago \"a plazo\", se respetan los límites legales: 60 días a partir de la fecha de emisión de la factura, o 45 días fin de mes si se estipula."
      },
      section2: {
        title: "6.2 Escala estándar — EU \"de riesgo\"",
        intro: "La clasificación del riesgo se determina a partir de 3 fuentes acumulativas:",
        sources: {
          insurer: {
            title: "Asegurador de crédito",
            description: "Cobertura/línea de crédito/condiciones"
          },
          score: {
            title: "Puntuación interna ETT",
            description: "Política de riesgo y cobro"
          },
          history: {
            title: "Historial de pagos",
            description: "Comportamiento y exposición"
          }
        },
        primacy: "Primacía: en caso de contradicción, la decisión del asegurador de crédito prevalece sobre las demás señales.",
        levelsTitle: "Niveles de riesgo y condiciones de pago",
        levels: {
          r0: {
            level: "R0",
            title: "Estándar",
            trigger: "Asegurador: cubierto / línea de crédito OK; Puntuación ETT: A/B; Historial: bueno (0 incidencias)",
            conditions: "Mensual + plazo negociado (ej. 30d) dentro del límite legal",
            safeguards: "Línea de crédito estándar"
          },
          r1: {
            level: "R1",
            title: "Vigilado",
            trigger: "Asegurador: línea de crédito limitada; Puntuación ETT: B/C; Historial: retrasos moderados",
            conditions: "Al recibo O anticipo 30-50% + saldo al recibo",
            safeguards: "Línea de crédito limitada + revisión semanal"
          },
          r2: {
            level: "R2",
            title: "Reforzado",
            trigger: "Asegurador: cobertura parcial insuficiente; Puntuación ETT: C/D; Historial: retrasos significativos",
            conditions: "Semanal al recibo O anticipo 50-70% + ajuste semanal",
            safeguards: "Inicio por lotes (volumen limitado)"
          },
          r3: {
            level: "R3",
            title: "Crítico",
            trigger: "Asegurador: RECHAZO / no asegurable; Puntuación ETT: D; Historial: incidencias graves",
            conditions: "Pago 100% anticipado (o rechazo de inicio)",
            safeguards: "Inicio condicionado al pago; parada si hay desviación"
          }
        },
        transparency: {
          title: "Transparencia y aceptación",
          description: "La Propuesta tripartita especifica el nivel (R0/R1/R2/R3), el modo de facturación y la condición de pago. La firma/aceptación de la propuesta equivale a la aceptación de estas modalidades."
        },
        adjustment: {
          title: "Cláusula de ajuste dinámico",
          description: "En caso de evolución del riesgo (bajada de línea de crédito del asegurador, retrasos, incidencias), la ETT puede revisar las condiciones de pago para los períodos siguientes, tras notificación a la EU, respetando el contrato aplicable."
        }
      },
      section3: {
        title: "6.3 Retrasos de pago",
        intro: "En caso de retraso en una factura emitida por YOJOB (Esquema A o facturación ETT→YOJOB):",
        penalties: [
          "Intereses de demora exigibles sin recordatorio, según el tipo previsto en el contrato o el marco legal aplicable",
          "Indemnización forfetaria de cobro: 40 € por factura impagada",
          "Posible suspensión de las prestaciones tras notificación escrita"
        ]
      }
    },

    article7: {
      title: "Artículo 7 - Obligaciones de la Empresa Usuaria (EU)",
      intro: "La EU se compromete a:",
      obligations: [
        "Proporcionar una necesidad exacta y completa, y cooperar activamente (comentarios, validaciones, planificación)",
        "Transmitir los requisitos de seguridad y las modalidades de acceso al lugar",
        "Respetar la confidencialidad de las informaciones (ETT, perfiles, condiciones comerciales)",
        "Reconocer que el reclutamiento, la puesta a disposición y la facturación de mano de obra son responsabilidad de la ETT (salvo esquema diferente por escrito)",
        "Respetar las condiciones de pago definidas en la propuesta tripartita"
      ]
    },

    article8: {
      title: "Artículo 8 - Obligaciones y remuneración de la ETT asociada",
      section1: {
        title: "8.1 Comisión mensual (aportación de negocios)",
        intro: "La ETT debe a YOJOB una comisión calculada sobre el importe neto facturado por la ETT a la EU en relación con las misiones procedentes de YOJOB.",
        details: {
          rate: {
            label: "Tasa de comisión",
            value: "Variable según contrato (ej. 3-8%)"
          },
          base: {
            label: "Base de cálculo",
            value: "Importe neto facturado EU (misiones YOJOB)"
          },
          rhythm: {
            label: "Ritmo de facturación",
            value: "Mensual"
          },
          deadline: {
            label: "Plazo de pago",
            value: "Desde la recepción del pago de la EU, sin demora"
          }
        }
      },
      section2: {
        title: "8.2 Prima de éxito \"colocación\"",
        intro: "Para ciertas misiones, una prima de éxito puede añadirse a la comisión mensual:",
        items: {
          trigger: {
            label: "Hecho generador",
            value: "Fin del período de prueba aplicable (ver art. 9), sin ruptura imputable al Perfil"
          },
          exigibility: {
            label: "Exigibilidad",
            value: "Pago íntegro inmediato en la emisión de la factura YOJOB"
          },
          amount: {
            label: "Importe",
            value: "Variable según contrato (ej. % del salario anual bruto o importe forfetario)"
          }
        }
      },
      section3: {
        title: "8.3 Reporte",
        intro: "La ETT proporciona a YOJOB, con frecuencia acordada (ej. mensual):",
        items: [
          "Lista de las misiones YOJOB (EU, lugar, fechas, volúmenes)",
          "Importe neto asociado por misión",
          "Elementos justificativos razonables",
          "Respeto del RGPD y del secreto de negocios"
        ]
      }
    },

    article9: {
      title: "Artículo 9 - Período de prueba reglamentario",
      section1: {
        title: "9.1 Principio",
        description: "El período de prueba aplicable es el previsto por los documentos contractuales (ETT↔EU y/o ETT↔Perfil) y por la normativa/acuerdos aplicables. No puede exceder las duraciones máximas autorizadas."
      },
      section2: {
        title: "9.2 Desplazamiento / Trabajo temporal (contrato de misión)",
        intro: "El contrato de misión puede incluir un período de prueba fijado por acuerdo; en su defecto, está limitado a:",
        durations: [
          { duration: "2 días", condition: "Contrato ≤ 1 mes" },
          { duration: "3 días", condition: "1 mes < contrato ≤ 2 meses" },
          { duration: "5 días", condition: "Contrato > 2 meses" }
        ]
      },
      section3: {
        title: "9.3 Reclutamiento (indefinido/asimilado) — Límite legal",
        intro: "Para un contrato indefinido, la duración máxima del período de prueba es en particular:",
        durations: [
          { duration: "2 meses", condition: "Obreros / Empleados", color: "green" },
          { duration: "3 meses", condition: "Mandos intermedios / Técnicos", color: "blue" },
          { duration: "4 meses", condition: "Ejecutivos", color: "violet" }
        ],
        note: "Según las reglas aplicables y eventual renovación enmarcada por la ley."
      }
    },

    article10: {
      title: "Artículo 10 - No elusión — Duración 24 meses",
      intro: "Durante la relación contractual y durante 24 meses después de la última puesta en relación (ETT y/o Perfil), las partes se prohíben toda elusión:",
      actors: {
        eu: "Prohibición de contratar directamente con una ETT introducida por YOJOB (o a través de entidad vinculada) eludiendo a YOJOB, salvo acuerdo escrito.",
        ett: "Prohibición de eludir la remuneración YOJOB sobre una EU/oportunidad procedente de YOJOB, salvo acuerdo escrito."
      },
      penalty: {
        title: "Cláusula penal",
        description: "En caso de violación de esta cláusula de no elusión, la parte incumplidora se compromete a abonar a YOJOB una indemnización forfetaria cuyo importe se especifica en el contrato (o equivalente a un porcentaje de las sumas generadas/estimadas), sin perjuicio de los daños y perjuicios complementarios."
      }
    },

    article11: {
      title: "Artículo 11 - Responsabilidad y limitaciones",
      items: {
        obligation: {
          title: "Obligación de medios",
          description: "YOJOB se compromete a poner en práctica todos los medios necesarios para realizar sus prestaciones de intermediación, sin garantía de resultado."
        },
        nonResponsibility: {
          title: "No responsabilidad ETT/Perfiles",
          description: "YOJOB no es responsable de los actos, omisiones o incumplimientos de la ETT, de los Perfiles reclutados, ni de las decisiones de crédito/seguro."
        },
        cap: {
          title: "Limitación",
          description: "Salvo falta grave o dolo, la responsabilidad de YOJOB está limitada al importe neto percibido en relación con el contrato afectado durante los últimos 12 meses."
        },
        indirect: {
          title: "Daños indirectos excluidos",
          description: "YOJOB no puede ser considerado responsable de los daños indirectos (pérdida de explotación, lucro cesante, pérdida de clientela, etc.)."
        }
      }
    },

    article12: {
      title: "Artículo 12 - Confidencialidad",
      intro: "Las partes se comprometen a mantener confidenciales todas las informaciones intercambiadas en el marco de su colaboración.",
      items: [
        "Las informaciones confidenciales incluyen los datos comerciales, técnicos, financieros y estratégicos",
        "La obligación de confidencialidad perdura durante toda la duración de la relación contractual y 5 años después de su cese",
        "Las informaciones no pueden ser divulgadas a terceros sin acuerdo previo escrito",
        "Las partes deben tomar todas las medidas necesarias para proteger la confidencialidad de las informaciones"
      ]
    },

    article13: {
      title: "Artículo 13 - Datos personales (RGPD)",
      intro: "Los intercambios de datos personales están estrictamente limitados a los datos necesarios para la ejecución de las prestaciones (contactos, necesidades, perfiles de candidatos).",
      cards: {
        compliance: {
          title: "Conformidad RGPD",
          description: "El tratamiento de datos personales se efectúa conforme al RGPD y a la ley de Informática y Libertades.",
          linkText: "Política de confidencialidad"
        },
        dpo: {
          title: "Contacto DPO",
          description: "Para cualquier solicitud relativa a sus datos personales o al ejercicio de sus derechos RGPD."
        }
      },
      dpaNote: "Un DPA (Data Processing Agreement) puede ser anexado si es necesario según la naturaleza de los intercambios de datos."
    },

    article14: {
      title: "Artículo 14 - Duración y rescisión",
      items: {
        duration: {
          title: "Duración",
          description: "La duración de la relación contractual es la definida en el contrato o propuesta tripartita aceptada."
        },
        earlyTermination: {
          title: "Rescisión anticipada",
          description: "Preaviso de 30 días (o duración acordada en el contrato) + pago de las sumas debidas (incluidas comisiones/primas de éxito si se alcanza el hecho generador)."
        },
        breach: {
          title: "Rescisión por incumplimiento",
          description: "En caso de incumplimiento grave de las obligaciones: requerimiento + plazo de subsanación de 15 días. A falta de regularización, rescisión de pleno derecho."
        }
      }
    },

    article15: {
      title: "Artículo 15 - Fuerza mayor",
      intro: "Las partes no podrán ser consideradas responsables si el incumplimiento o el retraso en la ejecución de sus obligaciones se debe a un caso de fuerza mayor en el sentido de la jurisprudencia francesa.",
      examplesTitle: "Constituyen en particular casos de fuerza mayor:",
      examples: [
        "Catástrofes naturales, inundaciones, incendios",
        "Guerras, atentados, disturbios",
        "Huelgas generales, bloqueos de transportes",
        "Fallos de redes (telecomunicaciones, electricidad)",
        "Epidemias, pandemias",
        "Medidas sanitarias gubernamentales"
      ],
      suspension: "En caso de fuerza mayor, las obligaciones quedan suspendidas durante la duración del evento, tras notificación a la otra parte."
    },

    article16: {
      title: "Artículo 16 - Derecho aplicable y litigios",
      sections: {
        law: {
          title: "Derecho aplicable",
          description: "Las presentes CGV están sometidas al derecho francés."
        },
        amicable: {
          title: "Intento amistoso previo",
          description: "En caso de litigio, las partes se comprometen a buscar una solución amistosa antes de toda acción judicial. El cliente puede recurrir a una mediación convencional o a cualquier otro modo alternativo de resolución de diferencias."
        },
        jurisdiction: {
          title: "Jurisdicción competente",
          description: "A falta de resolución amistosa, todo litigio es de la competencia exclusiva de los tribunales del domicilio social de YOJOB, salvo regla imperativa contraria."
        }
      }
    },

    article17: {
      title: "Artículo 17 - Modificación de las CGV",
      intro: "YOJOB se reserva el derecho de modificar en cualquier momento las presentes CGV.",
      items: [
        "Las CGV aplicables son las vigentes en la fecha de aceptación de la propuesta/contrato",
        "Las modificaciones no tienen efecto retroactivo sobre los contratos en curso de ejecución, salvo acuerdo expreso escrito de las partes",
        "La última versión de las CGV puede consultarse en cualquier momento en el sitio web de YOJOB"
      ]
    }
  },

  cta: {
    title: "¿Preguntas sobre nuestras CGV?",
    description: "Nuestro equipo jurídico y comercial está a su disposición para cualquier aclaración sobre estas Condiciones Generales de Venta.",
    backHome: "Volver al inicio",
    contactUs: "Contáctenos"
  },

  footer: {
    copyright: "© {year} {company} — Empresa Individual. Todos los derechos reservados.",
    links: {
      legal: "Aviso legal",
      privacy: "Privacidad",
      cgv: "CGV"
    }
  },

  badges: {
    main: "Principal",
    optional: "Opcional",
    mixed: "Mixto"
  },

  common: {
    back: "Volver",
    triggers: "Desencadenantes",
    conditions: "Condiciones",
    safeguards: "Salvaguardias"
  }
};
