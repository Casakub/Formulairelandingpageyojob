/**
 * 🇪🇸 TRADUCCIONES ESPAÑOLAS - PÁGINA POLÍTICA DE PRIVACIDAD
 * 
 * @version 1.0.0
 */

export const privacyES = {
  hero: {
    badge: "Política de Privacidad",
    title: "Protección de sus datos personales",
    subtitle: "En {company}, nos comprometemos a proteger y respetar su privacidad de acuerdo con el Reglamento General de Protección de Datos (RGPD).",
    lastUpdate: "Última actualización:"
  },

  dpo: {
    title: "Delegado de Protección de Datos (DPO)",
    subtitle: "Su interlocutor privilegiado para cualquier pregunta relacionada con sus datos"
  },

  sections: {
    dataController: {
      title: "1. Responsable del tratamiento",
      intro: "El responsable del tratamiento de datos de carácter personal es:",
      location: "Burdeos, Francia",
      email: "Correo electrónico:"
    },

    dataCollected: {
      title: "2. Datos personales recopilados",
      intro: "Recopilamos los siguientes datos en el marco de nuestros servicios de reclutamiento europeo:",
      items: [
        {
          label: "Datos de identificación:",
          description: "Nombre, apellido, correo electrónico, teléfono"
        },
        {
          label: "Datos profesionales:",
          description: "Empresa, función, sector de actividad"
        },
        {
          label: "Datos de contacto:",
          description: "Dirección postal, preferencias de comunicación"
        },
        {
          label: "Datos de navegación:",
          description: "Cookies, dirección IP, datos de conexión"
        }
      ]
    },

    purposes: {
      title: "3. Finalidades del tratamiento",
      intro: "Sus datos se recopilan y procesan para las siguientes finalidades:",
      items: [
        {
          title: "Gestión de solicitudes de reclutamiento",
          description: "Procesar sus solicitudes de presupuesto y ponerle en contacto con nuestra red de agencias asociadas."
        },
        {
          title: "Mejora de nuestros servicios",
          description: "Analizar el uso de nuestros servicios para mejorar su experiencia de usuario."
        },
        {
          title: "Comunicación comercial",
          description: "Informarle de nuestros nuevos servicios y de nuestro marketplace europeo (con su consentimiento)."
        }
      ]
    },

    legalBasis: {
      title: "4. Base legal del tratamiento",
      intro: "El tratamiento de sus datos se basa en las siguientes bases legales:",
      items: [
        {
          basis: "Ejecución del contrato",
          description: "Tratamiento necesario para responder a sus solicitudes de reclutamiento"
        },
        {
          basis: "Consentimiento",
          description: "Para el envío de comunicaciones de marketing (puede retirar su consentimiento en cualquier momento)"
        },
        {
          basis: "Interés legítimo",
          description: "Mejora de nuestros servicios y seguridad de nuestra plataforma"
        }
      ]
    },

    retention: {
      title: "5. Período de conservación",
      intro: "Conservamos sus datos personales durante los siguientes períodos:",
      items: [
        {
          period: "3 años",
          description: "Datos de prospectos y clientes"
        },
        {
          period: "13 meses",
          description: "Cookies y datos de navegación"
        },
        {
          period: "5 años",
          description: "Documentos contables y fiscales"
        },
        {
          period: "{days} días",
          description: "Datos de formularios (configurable)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Sus derechos",
      intro: "De conformidad con el RGPD, usted dispone de los siguientes derechos:",
      items: [
        {
          title: "Derecho de acceso",
          description: "Obtener una copia de sus datos personales"
        },
        {
          title: "Derecho de rectificación",
          description: "Corregir sus datos inexactos o incompletos"
        },
        {
          title: "Derecho de supresión",
          description: "Solicitar la eliminación de sus datos"
        },
        {
          title: "Derecho de limitación",
          description: "Limitar el tratamiento de sus datos"
        },
        {
          title: "Derecho a la portabilidad",
          description: "Recibir sus datos en un formato estructurado"
        },
        {
          title: "Derecho de oposición",
          description: "Oponerse al tratamiento de sus datos"
        }
      ],
      footer: "Para ejercer sus derechos, contacte con nuestro DPO en la dirección"
    },

    security: {
      title: "7. Seguridad de los datos",
      intro: "Implementamos medidas de seguridad técnicas y organizativas apropiadas:",
      measures: [
        "Cifrado de datos en tránsito y en reposo (SSL/TLS)",
        "Acceso restringido a los datos mediante autenticación fuerte",
        "Copias de seguridad regulares y plan de continuidad del negocio",
        "Auditorías de seguridad y actualizaciones regulares",
        "Formación del personal en buenas prácticas del RGPD"
      ]
    },

    transfers: {
      title: "8. Transferencias de datos",
      intro: "En el marco de nuestra red europea de más de 500 agencias asociadas en 27 países:",
      eu: {
        title: "🇪🇺 Dentro de la Unión Europea",
        description: "Sus datos pueden transferirse a nuestras agencias asociadas situadas en la UE/EEE, que se benefician del mismo nivel de protección del RGPD."
      },
      nonEu: {
        title: "🌍 Fuera de la Unión Europea",
        description: "En caso de transferencia fuera de la UE, utilizamos las Cláusulas Contractuales Tipo (CCT) de la Comisión Europea para garantizar un nivel de protección adecuado."
      }
    },

    cookies: {
      title: "9. Cookies y rastreadores",
      intro: "Nuestro sitio utiliza cookies para mejorar su experiencia de navegación:",
      types: [
        {
          type: "Cookies esenciales",
          description: "Necesarias para el funcionamiento del sitio (sesión, seguridad)",
          required: true
        },
        {
          type: "Cookies analíticas",
          description: "Medición de audiencia y estadísticas de visitas",
          required: false
        },
        {
          type: "Cookies de marketing",
          description: "Publicidad dirigida y personalización",
          required: false
        }
      ],
      footer: "Puede gestionar sus preferencias de cookies en cualquier momento a través de la configuración de su navegador."
    },

    contact: {
      title: "10. Contacto y reclamación",
      intro: "Para cualquier pregunta sobre el tratamiento de sus datos personales:",
      dpoCard: {
        title: "Contacte con nuestro DPO"
      },
      cnilCard: {
        title: "Autoridad de control",
        name: "CNIL (Francia)"
      },
      footer: "Si considera que no se respetan sus derechos, tiene derecho a presentar una reclamación ante la Comisión Nacional de Informática y Libertades (CNIL)."
    }
  },

  cta: {
    title: "Sus datos en seguridad",
    description: "La protección de sus datos personales es nuestra prioridad. Nos comprometemos a respetar el RGPD y a garantizar la seguridad de su información.",
    backHome: "Volver al inicio",
    contactDpo: "Contactar con el DPO"
  },

  badges: {
    required: "Obligatorio",
    optional: "Opcional"
  }
};
