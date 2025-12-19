import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇪🇸 Contenido de la landing page YOJOB - Versión Española
 * Traducido profesionalmente desde el francés
 */

export const landingContentES: LandingPageContent = {
  language: 'es',
  
  seo: {
    metaTitle: 'YOJOB - Plataforma europea de desplazamiento de personal | 27 países',
    metaDescription: 'Centralice sus trámites de desplazamiento europeo. Cofre fuerte digital seguro, trámites administrativos en línea y gestión de ofertas de empleo. 500+ agencias asociadas en 27 países.',
    slug: '/',
    h1: 'Su plataforma todo en uno del desplazamiento europeo',
    ogTitle: 'YOJOB - Desplazamiento de personal simplificado en Europa',
    ogDescription: 'Gestione sus trámites de desplazamiento con YOJOB: conformidad garantizada, 500+ agencias asociadas, 27 países europeos.',
    altTexts: {
      heroVisual: 'Mapa interactivo de Europa mostrando la red YOJOB de 500+ agencias en 27 países',
      europeMap: 'Mapa de Europa con los 27 países cubiertos por YOJOB',
      logoFooter: 'Logo YOJOB - Plataforma europea de desplazamiento',
    },
    aiSummary: 'YOJOB es una plataforma europea especializada en el desplazamiento de personal. Centraliza todos los documentos y trámites administrativos en un cofre fuerte digital seguro. Las empresas pueden gestionar sus ofertas de empleo, preparar los expedientes de desplazamiento y asegurar la conformidad legal en 27 países europeos a través de una red de 500+ agencias asociadas. La plataforma simplifica el reclutamiento europeo y garantiza la conformidad social.',
    faq: [
      {
        question: '¿Qué es YOJOB?',
        answer: 'YOJOB es una plataforma europea de intermediación en reclutamiento y gestión del desplazamiento de personal. Conectamos las empresas con más de 500 agencias asociadas en 27 países europeos.',
      },
      {
        question: '¿En qué países opera YOJOB?',
        answer: 'YOJOB cubre 27 países europeos: Francia, Alemania, España, Italia, Polonia, Rumanía, Países Bajos, Bélgica, Portugal, República Checa, Hungría, Suecia, Austria, Bulgaria, Dinamarca, Finlandia, Eslovaquia, Irlanda, Croacia, Lituania, Eslovenia, Letonia, Estonia, Chipre, Luxemburgo, Malta y Grecia.',
      },
      {
        question: '¿Cómo funciona el cofre fuerte digital?',
        answer: 'Nuestro cofre fuerte digital centraliza todos sus documentos de desplazamiento (A1, contratos, justificantes) en un espacio seguro accesible 24/7. Puede preparar sus expedientes, seguir los trámites en curso y archivar el conjunto de sus operaciones de desplazamiento.',
      },
      {
        question: 'YOJOB garantiza la conformidad legal?',
        answer: 'Sí, YOJOB integra las regulaciones europeas sobre el desplazamiento de trabajadores. Nuestra plataforma le guía en los trámites obligatorios y se asegura de que sus expedientes respeten las exigencias legales de cada país.',
      },
      {
        question: '¿Cómo publicar una oferta de empleo en YOJOB?',
        answer: 'A partir de 2026, podrá publicar sus ofertas de empleo directamente en nuestro marketplace. Nuestras 500+ agencias asociadas podrán responder y proponerle candidatos cualificados adaptados a sus necesidades.',
      },
      {
        question: '¿Cuál es el coste de la plataforma YOJOB?',
        answer: 'YOJOB propone diferentes fórmulas adaptadas a sus necesidades. Contáctenos a través del formulario para obtener un presupuesto personalizado en función de su volumen de actividad y de los servicios deseados.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      network: 'Nuestra red',
      contact: 'Contacto',
    },
    cta: 'Solicitar presupuesto',
  },

  hero: {
    badge: '⭐ Líder del reclutamiento europeo',
    title: 'Su socio para reclutar en Europa',
    subtitle: 'Acceda a una red de 500+ agencias de empleo en 27 países. Simplifique su reclutamiento europeo con un intermediario experto y de confianza.',
    benefits: [
      'Expedientes centralizados y seguros',
      'Trámites administrativos en línea',
      'Gestión de ofertas de empleo',
      'Conformidad multi-países',
    ],
    ctaPrimaryLabel: 'Solicitar presupuesto',
    ctaSecondaryLabel: 'Descubrir nuestra red',
    stats: {
      agencies: { value: '500+', label: 'agencias asociadas' },
      countries: { value: '27', label: 'países europeos' },
      missions: { value: '2000+', label: 'misiones exitosas' },
    },
    floatingCards: {
      since: { label: 'Desde', value: '2014' },
      expertise: { value: '10 años', label: 'De experiencia líder' },
      partners: { label: 'Socios', value: '500+ agencias certificadas' },
      countries: { value: '27', label: 'Países europeos' },
      certified: { value: '500+', label: 'Agencias certificadas' },
      activeNetwork: 'Red activa',
    },
  },

  stats: {
    badge: '📊 Nuestras cifras clave',
    title: 'Una experiencia reconocida en Europa',
    items: [
      { value: '10+', label: 'años de experiencia', icon: 'Target' },
      { value: '27', label: 'países cubiertos', icon: 'Globe' },
      { value: '500+', label: 'agencias asociadas', icon: 'Network' },
      { value: '2000+', label: 'misiones realizadas', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Nuestros servicios',
    title: 'Soluciones adaptadas a sus necesidades',
    subtitle: 'Le acompañamos en todos sus trámites de reclutamiento europeo.',
    services: [
      {
        icon: 'Users',
        title: 'Trabajo temporal europeo',
        description: 'Reclutamiento de personal temporal en toda Europa con gestión completa de las formalidades.',
        linkLabel: 'Saber más',
        href: '/services/interim-europeen',
      },
      {
        icon: 'Target',
        title: 'Reclutamiento especializado',
        description: 'Encuentre los talentos que necesita gracias a nuestra red de expertos sectoriales.',
        linkLabel: 'Saber más',
        href: '/services/recrutement-specialise',
      },
      {
        icon: 'ShieldCheck',
        title: 'Consultoría & Conformidad',
        description: 'Asegúrese de respetar todas las regulaciones europeas en materia de desplazamiento.',
        linkLabel: 'Saber más',
        href: '/services/conseil-conformite',
      },
    ],
  },

  network: {
    badge: '🌍 Red Europea',
    title: 'Una red que cubre toda Europa',
    subtitle: 'Más de 500 agencias asociadas en 27 países para responder a todas sus necesidades de reclutamiento.',
    mapLabel: 'agencias asociadas',
    waitlist: {
      badge: '✨ Novedad 2026',
      title: 'Su plataforma todo en uno del desplazamiento europeo',
      subtitle: 'Centralice todos sus documentos y datos de desplazamiento en un espacio seguro. Realice sus trámites administrativos directamente en línea y gestione sus ofertas de empleo desde una interfaz única. Simplifique su conformidad y gane un tiempo precioso.',
      features: [
        'Expedientes centralizados y seguros',
        'Trámites administrativos en línea',
        'Gestión de ofertas de empleo',
        'Conformidad multi-países',
      ],
      formTitle: '¡Sea de los primeros!',
      formSubtitle: 'Inscríbase en la lista de espera y reciba un acceso prioritario',
      emailPlaceholder: 'Su dirección de correo profesional',
      ctaLabel: 'Unirse a la lista de espera',
      securityNote: '🔒 Sus datos están seguros y nunca serán compartidos.',
      successMessage: '¡Gracias! Está inscrito en la lista de espera.',
    },
  },

  steps: {
    badge: '🎯 Cómo funciona',
    title: 'Un proceso simple y eficaz',
    subtitle: 'En 4 etapas, encuentre los talentos que necesita en toda Europa.',
    steps: [
      {
        number: '01',
        title: 'Describa su necesidad',
        description: 'Compártanos sus necesidades de reclutamiento: perfiles, competencias, localización y duración.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Activamos nuestra red',
        description: 'Nuestras agencias asociadas en toda Europa buscan los mejores candidatos para usted.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Valide los candidatos',
        description: 'Le presentamos una selección de perfiles cualificados que puede evaluar.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Acoja a su equipo',
        description: 'Nos encargamos de todas las formalidades administrativas para que pueda concentrarse en lo esencial.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Testimonios',
    title: 'Confían en nosotros',
    subtitle: 'Descubra los testimonios de nuestros clientes en toda Europa.',
    testimonials: [
      {
        name: 'Marc Durand',
        position: 'Director de RRHH',
        company: 'BTP Solutions France',
        quote: 'YOJOB nos permitió reclutar 50 obreros cualificados en Polonia en solo 3 semanas. Un ahorro de tiempo considerable y una gestión administrativa impecable.',
        rating: 5,
        sector: 'BTP',
      },
      {
        name: 'Sophie Martin',
        position: 'Responsable de Movilidad',
        company: 'IndusTech Germany',
        quote: 'La red europea de YOJOB es impresionante. Pudimos extender nuestras operaciones en 5 países con un acompañamiento experto en cada etapa.',
        rating: 5,
        sector: 'Industrie',
      },
      {
        name: 'Antonio Silva',
        position: 'CEO',
        company: 'AgriPro Portugal',
        quote: 'Por fin una solución que simplifica realmente el reclutamiento transfronterizo. La conformidad está garantizada y los plazos respetados.',
        rating: 5,
        sector: 'Agriculture',
      },
    ],
  },

  sectors: {
    badge: '🏭 Sectores de actividad',
    title: 'Intervenimos en todos los sectores',
    subtitle: 'Nuestra experiencia cubre el conjunto de los ámbitos de actividad europeos.',
    sectors: [
      { icon: 'Building2', name: 'Construcción & Obras', color: 'orange' },
      { icon: 'Factory', name: 'Industria & Logística', color: 'blue' },
      { icon: 'Tractor', name: 'Agricultura & Viticultura', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Hostelería & Restauración', color: 'red' },
      { icon: 'Heart', name: 'Sanidad & Medicina', color: 'pink' },
      { icon: 'Laptop', name: 'Terciario & TI', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Contáctenos',
    title: '¿Listo para reclutar en Europa?',
    subtitle: 'Háblenos de su proyecto y reciba un presupuesto personalizado en 24h.',
    benefits: [
      {
        icon: 'Users',
        title: 'Acompañamiento personalizado',
        description: 'Un experto dedicado para su proyecto',
      },
      {
        icon: 'ShieldCheck',
        title: 'Conformidad garantizada',
        description: 'Respeto de todas las regulaciones',
      },
      {
        icon: 'Globe',
        title: 'Cobertura europea',
        description: '27 países accesibles inmediatamente',
      },
      {
        icon: 'CheckCircle',
        title: 'Reactividad máxima',
        description: 'Respuesta en 24h laborables',
      },
    ],
    form: {
      fields: {
        name: { label: 'Nombre completo', placeholder: 'Juan García' },
        email: { label: 'Correo profesional', placeholder: 'juan.garcia@empresa.es' },
        phone: { label: 'Teléfono', placeholder: '+34 6 12 34 56 78' },
        company: { label: 'Empresa', placeholder: 'Nombre de su empresa' },
        needType: { label: 'Tipo de necesidad', placeholder: 'Seleccione un tipo de necesidad' },
        message: { label: 'Describa su necesidad', placeholder: 'Descríbanos su proyecto de reclutamiento europeo...' },
      },
      ctaLabel: 'Enviar mi solicitud',
      securityNote: '🔒 Sus datos están seguros y nunca serán compartidos.',
      successMessage: '¡Gracias! Le contactaremos en 24h.',
    },
  },

  footer: {
    logo: {
      tagline: 'Su socio de confianza para el reclutamiento europeo',
    },
    columns: {
      services: {
        title: 'Servicios',
        links: [
          { label: 'Trabajo temporal europeo', href: '/services/interim-europeen' },
          { label: 'Reclutamiento especializado', href: '/services/recrutement-specialise' },
          { label: 'Consultoría & Conformidad', href: '/services/conseil-conformite' },
          { label: 'Desplazamiento de personal', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Empresa',
        links: [
          { label: 'Acerca de', href: '#about' },
          { label: 'Nuestra red', href: '#reseau' },
          { label: 'Nuestros sectores', href: '#secteurs' },
          { label: 'Testimonios', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Contacto',
        address: '123 Avenue de l\'Europe, 75001 París, Francia',
        phone: '+33 1 23 45 67 89',
        email: 'contact@yojob.fr',
      },
    },
    social: {
      linkedin: 'https://linkedin.com/company/yojob',
      twitter: 'https://twitter.com/yojob',
      facebook: 'https://facebook.com/yojob',
    },
    bottom: {
      copyright: '© 2026 YOJOB. Todos los derechos reservados. Hecho con ❤️ en Europa.',
      legalLinks: [
        { label: 'Aviso legal', href: '#mentions' },
        { label: 'Política de privacidad', href: '#privacy' },
        { label: 'CGV', href: '#cgv' },
      ],
    },
  },
};