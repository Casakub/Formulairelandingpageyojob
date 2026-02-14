/**
 * 🇪🇸 TRADUCCIONES ESPAÑOLAS - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const esLandingPage: LandingPageContent = {
  language: 'es',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Líder en reclutamiento europeo - Trabajo temporal y contratos fijos en 27 países",
    metaDescription: "Acceda a más de 500 agencias de reclutamiento en 27 países europeos. Trabajo temporal, contratos fijos, desplazamiento de personal: YOJOB simplifica sus contrataciones internacionales.",
    slug: "/",
    h1: "Líder en reclutamiento europeo",
    ogTitle: "YOJOB - Su socio de reclutamiento en Europa",
    ogDescription: "Reclutamiento europeo simplificado: más de 500 agencias, 27 países, todos los trámites gestionados.",
    altTexts: {
      heroVisual: "Mapa interactivo de Europa mostrando la red YOJOB",
      europeMap: "Mapa de los 27 países europeos cubiertos por YOJOB",
      logoFooter: "Logo YOJOB - Reclutamiento europeo",
    },
    aiSummary: "YOJOB es el líder francés en intermediación de reclutamiento europeo, con una red de más de 500 agencias asociadas en 27 países. Facilitamos el trabajo temporal europeo, el reclutamiento especializado, el desplazamiento de personal y ofrecemos asesoramiento en cumplimiento normativo. Nuestra experiencia permite a las empresas reclutar rápida y legalmente en toda Europa, con una gestión completa de las formalidades administrativas.",
    faq: [
      {
        question: "¿Qué es YOJOB?",
        answer: "YOJOB es un intermediario de reclutamiento europeo que conecta empresas francesas con una red de más de 500 agencias en 27 países europeos para facilitar el trabajo temporal, el reclutamiento y el desplazamiento de personal."
      },
      {
        question: "¿En qué países operan?",
        answer: "Cubrimos los 27 países de la Unión Europea más Noruega, es decir, una cobertura completa de Europa Occidental, del Norte, del Sur y del Este."
      },
      {
        question: "¿Qué tipos de reclutamiento ofrecen?",
        answer: "Ofrecemos trabajo temporal europeo, reclutamiento en contratos fijos/temporales, desplazamiento de personal y asesoramiento en cumplimiento normativo para garantizar el respeto de las regulaciones."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      network: "Red",
      blog: "Blog",
      contact: "Contacto"
    },
    cta: "Solicitar presupuesto",
    survey: "Encuesta Europea"
  },

  // Hero Section
  hero: {
    badge: "⭐ Líder en reclutamiento europeo",
    title: "Reclute en toda Europa gracias a nuestra red de más de 500 agencias asociadas",
    subtitle: "Trabajo temporal, contratos fijos, desplazamiento: acceda al mejor talento europeo. Gestionamos todos los trámites por usted.",
    benefits: [
      "27 países europeos cubiertos",
      "Más de 500 agencias certificadas",
      "Gestión administrativa completa",
      "Cumplimiento garantizado"
    ],
    ctaPrimaryLabel: "Obtener un presupuesto gratuito",
    ctaSecondaryLabel: "Descubrir nuestros servicios",
    stats: {
      agencies: { value: "500+", label: "agencias asociadas" },
      countries: { value: "27", label: "países europeos" },
      missions: { value: "2000+", label: "misiones exitosas" }
    },
    floatingCards: {
      since: { label: "Desde", value: "2014" },
      expertise: { value: "10 años", label: "De experiencia líder" },
      partners: { label: "Socios", value: "Más de 500 agencias certificadas" },
      countries: { value: "27", label: "Países europeos" },
      certified: { value: "500+", label: "Agencias certificadas" },
      activeNetwork: "Red activa"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Nuestras Cifras Clave",
    title: "Una experiencia reconocida en Europa",
    items: [
      { value: "10", label: "años de experiencia", icon: "Target" },
      { value: "27", label: "países cubiertos", icon: "Globe" },
      { value: "500", label: "agencias asociadas", icon: "Network" },
      { value: "2000", label: "misiones realizadas", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Nuestros Servicios",
    title: "Soluciones de reclutamiento adaptadas a sus necesidades",
    subtitle: "Ya sea que busque personal temporal, permanente o desplazado, tenemos la solución",
    services: [
      {
        icon: "Users",
        title: "Trabajo Temporal Europeo",
        description: "Reclute personal temporal cualificado en toda Europa. Gestionamos todas las formalidades administrativas.",
        linkLabel: "Saber más",
        href: "/servicio/trabajo-temporal-europeo"
      },
      {
        icon: "Target",
        title: "Reclutamiento Especializado",
        description: "Encuentre los mejores talentos para sus puestos en contratos fijos/temporales gracias a nuestra red europea de expertos.",
        linkLabel: "Saber más",
        href: "/servicio/reclutamiento-especializado"
      },
      {
        icon: "ShieldCheck",
        title: "Asesoría y Cumplimiento",
        description: "Asegúrese de respetar todas las regulaciones europeas en materia de desplazamiento y movilidad.",
        linkLabel: "Saber más",
        href: "/servicio/asesoria-cumplimiento"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Red Europea",
    title: "27 países, más de 500 agencias asociadas certificadas",
    subtitle: "Nuestra fortaleza: una red densa y cualificada en toda Europa",
    mapLabel: "agencias asociadas",
    waitlist: {
      badge: "🚀 Novedad 2025",
      title: "Marketplace de agencias europeas",
      subtitle: "Próximamente: compare y contacte directamente las agencias de nuestra red",
      features: [
        "✓ Búsqueda multicriterio (país, sector, profesión)",
        "✓ Comparación instantánea de agencias",
        "✓ Opiniones de clientes verificadas",
        "✓ Conexión directa y segura"
      ],
      formTitle: "¡Sea de los primeros!",
      formSubtitle: "Inscríbase en la lista de espera para acceder en primicia",
      emailPlaceholder: "su@email.com",
      ctaLabel: "Unirse a la lista de espera",
      securityNote: "🔒 Sus datos están seguros y nunca serán compartidos",
      successMessage: "¡Gracias! Está inscrito en la lista de espera. Le contactaremos en cuanto abramos."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Cómo funciona",
    title: "Reclutamiento europeo simplificado en 4 pasos",
    subtitle: "Un proceso claro y eficaz para sus contrataciones",
    steps: [
      {
        number: "01",
        title: "Describa su necesidad",
        description: "Comparta con nosotros sus necesidades de reclutamiento: profesión, número de puestos, duración, cualificaciones requeridas.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Activamos nuestra red",
        description: "Nuestras agencias asociadas en toda Europa identifican y seleccionan los mejores perfiles disponibles.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Valide los candidatos",
        description: "Recibe los CV preseleccionados y realiza las entrevistas con los candidatos que le interesan.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Dé la bienvenida a su equipo",
        description: "Los candidatos seleccionados se unen a sus equipos. Gestionamos todas las formalidades administrativas y legales.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Testimonios",
    title: "Confían en nosotros",
    subtitle: "Descubra las experiencias de nuestros clientes",
    testimonials: [
      {
        name: "Pedro García",
        position: "Director de RRHH",
        company: "TechBuild España",
        quote: "Gracias a YOJOB, pudimos contratar 15 albañiles polacos cualificados en 3 semanas. ¡Un servicio profesional y eficaz!",
        rating: 5,
        sector: "Construcción"
      },
      {
        name: "Sofía Martínez",
        position: "Directora de RRHH",
        company: "AgroEspaña",
        quote: "La gestión administrativa es un verdadero quebradero de cabeza cuando se contrata internacionalmente. YOJOB se ocupa de todo, es un ahorro de tiempo enorme.",
        rating: 5,
        sector: "Agroalimentario"
      },
      {
        name: "Marcos López",
        position: "Responsable de Producción",
        company: "AutoParts Europa",
        quote: "¡Excelente acompañamiento! Encontramos técnicos especializados en Alemania que nunca habríamos podido contratar solos.",
        rating: 5,
        sector: "Industria"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Sectores de actividad",
    title: "Reclutamos en todos los sectores",
    subtitle: "Nuestra red cubre todas las profesiones e industrias",
    sectors: [
      { icon: "Building2", name: "Construcción y Obras", color: "orange" },
      { icon: "Factory", name: "Industria", color: "blue" },
      { icon: "Tractor", name: "Agricultura", color: "green" },
      { icon: "UtensilsCrossed", name: "Hostelería-Restauración", color: "red" },
      { icon: "Heart", name: "Salud y Social", color: "pink" },
      { icon: "Laptop", name: "Tecnología e IT", color: "violet" },
      { icon: "Truck", name: "Logística y Transporte", color: "blue" },
      { icon: "ShoppingBag", name: "Comercio y Distribución", color: "green" },
      { icon: "Briefcase", name: "Servicios empresariales", color: "cyan" },
      { icon: "Wrench", name: "Mantenimiento y SAT", color: "orange" },
      { icon: "Plane", name: "Turismo y Ocio", color: "blue" },
      { icon: "Ship", name: "Marítimo y Portuario", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contáctenos",
    title: "¿Listo para contratar en Europa?",
    subtitle: "Obtenga un presupuesto gratuito y personalizado en 24h",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Respuesta rápida",
        description: "Presupuesto en 24h laborables"
      },
      {
        icon: "ShieldCheck",
        title: "Sin compromiso",
        description: "Gratuito y sin obligación"
      },
      {
        icon: "Users",
        title: "Acompañamiento dedicado",
        description: "Un experto a su disposición"
      },
      {
        icon: "Globe",
        title: "Cobertura europea",
        description: "27 países accesibles"
      }
    ],
    form: {
      fields: {
        name: { label: "Nombre completo", placeholder: "Juan Pérez" },
        email: { label: "Email profesional", placeholder: "juan.perez@empresa.es" },
        phone: { label: "Teléfono", placeholder: "+34 6 12 34 56 78" },
        company: { label: "Empresa", placeholder: "Nombre de su empresa" },
        contactType: {
          label: "Tipo de contacto",
          placeholder: "Seleccione su perfil",
          options: {
            client: "Soy un cliente (empresa que busca personal)",
            agency: "Soy una agencia de reclutamiento",
            interim: "Soy un trabajador temporal",
            other: "Otro"
          }
        },
        needType: { 
          label: "Tipo de necesidad", 
          placeholder: "Seleccione su necesidad",
          options: [
            "Trabajo temporal europeo",
            "Reclutamiento especializado",
            "Asesoría y Cumplimiento",
            "Otra necesidad"
          ]
        },
        message: { label: "Describa su necesidad", placeholder: "Ej: Búsqueda de 10 albañiles para una obra de 6 meses en la región de Madrid..." }
      },
      ctaLabel: "Enviar mi solicitud",
      securityNote: "🔒 Sus datos están protegidos y nunca serán compartidos con terceros",
      successMessage: "¡Gracias! Hemos recibido su solicitud y le contactaremos en 24h."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Su socio de reclutamiento en Europa"
    },
    columns: {
      services: {
        title: "Servicios",
        links: [
          { label: "Trabajo Temporal Europeo", href: "/servicio/trabajo-temporal-europeo" },
          { label: "Reclutamiento Especializado", href: "/servicio/reclutamiento-especializado" },
          { label: "Desplazamiento de Personal", href: "/servicio/desplazamiento-personal" },
          { label: "Asesoría y Cumplimiento", href: "/servicio/asesoria-cumplimiento" }
        ]
      },
      company: {
        title: "Empresa",
        links: [
          { label: "Acerca de", href: "/acerca-de" },
          { label: "Nuestra red", href: "/nuestra-red" },
          { label: "Nuestros sectores", href: "/nuestros-sectores" },
          { label: "Testimonios", href: "/testimonios" }
        ]
      },
      contact: {
        title: "Contacto",
        address: "Burdeos, Francia",
        phone: "+33 6 50 62 25 24",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2026 YOJOB. Todos los derechos reservados.",
      madeWith: "Hecho con ❤️ para facilitar el reclutamiento europeo",
      legalLinks: [
        { label: "Aviso legal", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Política de privacidad", href: "/privacy" }
      ]
    }
  }
};