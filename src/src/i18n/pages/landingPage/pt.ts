/**
 * 🇵🇹 TRADUÇÕES PORTUGUESAS - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const ptLandingPage: LandingPageContent = {
  language: 'pt',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Líder no recrutamento europeu - Trabalho temporário e contratos permanentes em 27 países",
    metaDescription: "Acesso a mais de 500 agências de recrutamento em 27 países europeus. Trabalho temporário, contratos permanentes, destacamento de pessoal: YOJOB simplifica o seu recrutamento internacional.",
    slug: "/",
    h1: "Líder no recrutamento europeu",
    ogTitle: "YOJOB - O seu parceiro para recrutamento na Europa",
    ogDescription: "Recrutamento europeu simplificado: mais de 500 agências, 27 países, todas as formalidades tratadas.",
    altTexts: {
      heroVisual: "Mapa interativo da Europa mostrando a rede YOJOB",
      europeMap: "Mapa dos 27 países europeus cobertos pela YOJOB",
      logoFooter: "Logotipo YOJOB - Recrutamento europeu",
    },
    aiSummary: "A YOJOB é líder francesa em intermediação de recrutamento europeu, com uma rede de mais de 500 agências parceiras em 27 países. Facilitamos o trabalho temporário europeu, recrutamento especializado, destacamento de pessoal e oferecemos consultoria em conformidade regulamentar. A nossa experiência permite às empresas recrutar de forma rápida e legal em toda a Europa, com gestão completa das formalidades administrativas.",
    faq: [
      {
        question: "O que é a YOJOB?",
        answer: "A YOJOB é um intermediário de recrutamento europeu que conecta empresas francesas a uma rede de mais de 500 agências em 27 países europeus para facilitar o trabalho temporário, recrutamento e destacamento de pessoal."
      },
      {
        question: "Em que países operam?",
        answer: "Cobrimos os 27 países da União Europeia mais a Noruega, ou seja, uma cobertura completa da Europa Ocidental, do Norte, do Sul e do Leste."
      },
      {
        question: "Que tipos de recrutamento oferecem?",
        answer: "Oferecemos trabalho temporário europeu, recrutamento a prazo/permanente, destacamento de pessoal e consultoria em conformidade para garantir o cumprimento da regulamentação."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Início",
      services: "Serviços",
      network: "Rede",
      blog: "Blog",
      contact: "Contacto"
    },
    cta: "Pedir orçamento",
    survey: "Inquérito Europeu"
  },

  // Hero Section
  hero: {
    badge: "⭐ Líder no recrutamento europeu",
    title: "Recrute em toda a Europa graças à nossa rede de mais de 500 agências parceiras",
    subtitle: "Trabalho temporário, contratos permanentes, destacamento: acesso aos melhores talentos europeus. Tratamos de todas as formalidades por si.",
    benefits: [
      "27 países europeus cobertos",
      "Mais de 500 agências certificadas",
      "Gestão administrativa completa",
      "Conformidade garantida"
    ],
    ctaPrimaryLabel: "Obter orçamento gratuito",
    ctaSecondaryLabel: "Descubra os nossos serviços",
    stats: {
      agencies: { value: "500+", label: "agências parceiras" },
      countries: { value: "27", label: "países europeus" },
      missions: { value: "2000+", label: "missões bem-sucedidas" }
    },
    floatingCards: {
      since: { label: "Desde", value: "2014" },
      expertise: { value: "10 anos", label: "De experiência líder" },
      partners: { label: "Parceiros", value: "Mais de 500 agências certificadas" },
      countries: { value: "27", label: "Países europeus" },
      certified: { value: "500+", label: "Agências certificadas" },
      activeNetwork: "Rede ativa"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Os Nossos Números Chave",
    title: "Uma experiência reconhecida na Europa",
    items: [
      { value: "10", label: "anos de experiência", icon: "Target" },
      { value: "27", label: "países cobertos", icon: "Globe" },
      { value: "500", label: "agências parceiras", icon: "Network" },
      { value: "2000", label: "missões realizadas", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Os Nossos Serviços",
    title: "Soluções de recrutamento adaptadas às suas necessidades",
    subtitle: "Quer esteja à procura de pessoal temporário, permanente ou destacado, temos a solução",
    services: [
      {
        icon: "Users",
        title: "Trabalho Temporário Europeu",
        description: "Recrute pessoal temporário qualificado em toda a Europa. Tratamos de todas as formalidades administrativas.",
        linkLabel: "Saiba mais",
        href: "/servico/trabalho-temporario-europeu"
      },
      {
        icon: "Target",
        title: "Recrutamento Especializado",
        description: "Encontre os melhores talentos para as suas posições permanentes/temporárias graças à nossa rede europeia de especialistas.",
        linkLabel: "Saiba mais",
        href: "/servico/recrutamento-especializado"
      },
      {
        icon: "ShieldCheck",
        title: "Consultoria e Conformidade",
        description: "Garanta o cumprimento de toda a regulamentação europeia em matéria de destacamento e mobilidade.",
        linkLabel: "Saiba mais",
        href: "/servico/consultoria-conformidade"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Rede Europeia",
    title: "27 países, mais de 500 agências parceiras certificadas",
    subtitle: "A nossa força: uma rede densa e qualificada em toda a Europa",
    mapLabel: "agências parceiras",
    waitlist: {
      badge: "🚀 Novidade 2025",
      title: "Marketplace de agências europeias",
      subtitle: "Em breve: compare e contacte diretamente as agências da nossa rede",
      features: [
        "✓ Pesquisa multicritério (país, setor, profissão)",
        "✓ Comparação instantânea de agências",
        "✓ Avaliações de clientes verificadas",
        "✓ Ligação direta e segura"
      ],
      formTitle: "Seja um dos primeiros!",
      formSubtitle: "Inscreva-se na lista de espera para acesso antecipado",
      emailPlaceholder: "seu@email.pt",
      ctaLabel: "Junte-se à lista de espera",
      securityNote: "🔒 Os seus dados estão seguros e nunca serão partilhados",
      successMessage: "Obrigado! Está inscrito na lista de espera. Contactá-lo-emos assim que abrirmos."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Como funciona",
    title: "Recrutamento europeu simplificado em 4 passos",
    subtitle: "Um processo claro e eficaz para o seu recrutamento",
    steps: [
      {
        number: "01",
        title: "Descreva a sua necessidade",
        description: "Partilhe connosco as suas necessidades de recrutamento: profissão, número de posições, duração, qualificações exigidas.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Ativamos a nossa rede",
        description: "As nossas agências parceiras em toda a Europa identificam e selecionam os melhores perfis disponíveis.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Valide os candidatos",
        description: "Receba os CVs pré-selecionados e realize entrevistas com os candidatos que lhe interessam.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Receba a sua equipa",
        description: "Os candidatos selecionados juntam-se às suas equipas. Tratamos de todas as formalidades administrativas e legais.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Testemunhos",
    title: "Confiam em nós",
    subtitle: "Descubra as experiências dos nossos clientes",
    testimonials: [
      {
        name: "João Silva",
        position: "Diretor de RH",
        company: "TechBuild Portugal",
        quote: "Graças à YOJOB, conseguimos recrutar 15 pedreiros polacos qualificados em 3 semanas. Um serviço profissional e eficaz!",
        rating: 5,
        sector: "Construção"
      },
      {
        name: "Sofia Santos",
        position: "Diretora de RH",
        company: "AgroPortugal",
        quote: "A gestão administrativa é uma verdadeira dor de cabeça quando se recruta internacionalmente. A YOJOB trata de tudo, é uma enorme poupança de tempo.",
        rating: 5,
        sector: "Agroalimentar"
      },
      {
        name: "Miguel Costa",
        position: "Responsável de Produção",
        company: "AutoParts Europa",
        quote: "Acompanhamento excelente! Encontrámos técnicos especializados na Alemanha que nunca teríamos conseguido recrutar sozinhos.",
        rating: 5,
        sector: "Indústria"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Setores de atividade",
    title: "Recrutamos em todos os setores",
    subtitle: "A nossa rede cobre todas as profissões e indústrias",
    sectors: [
      { icon: "Building2", name: "Construção & Obras Públicas", color: "orange" },
      { icon: "Factory", name: "Indústria", color: "blue" },
      { icon: "Tractor", name: "Agricultura", color: "green" },
      { icon: "UtensilsCrossed", name: "Restauração e Hotelaria", color: "red" },
      { icon: "Heart", name: "Saúde e Social", color: "pink" },
      { icon: "Laptop", name: "Tecnologia e TI", color: "violet" },
      { icon: "Truck", name: "Logística e Transportes", color: "blue" },
      { icon: "ShoppingBag", name: "Comércio e Distribuição", color: "green" },
      { icon: "Briefcase", name: "Serviços às empresas", color: "cyan" },
      { icon: "Wrench", name: "Manutenção e Assistência", color: "orange" },
      { icon: "Plane", name: "Turismo e Lazer", color: "blue" },
      { icon: "Ship", name: "Marítimo e Portuário", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contacte-nos",
    title: "Pronto para recrutar na Europa?",
    subtitle: "Obtenha um orçamento gratuito e personalizado em 24 horas",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Resposta rápida",
        description: "Orçamento em 24 horas úteis"
      },
      {
        icon: "ShieldCheck",
        title: "Sem compromisso",
        description: "Gratuito e sem obrigações"
      },
      {
        icon: "Users",
        title: "Acompanhamento dedicado",
        description: "Um especialista à sua disposição"
      },
      {
        icon: "Globe",
        title: "Cobertura europeia",
        description: "27 países acessíveis"
      }
    ],
    form: {
      fields: {
        name: { label: "Nome completo", placeholder: "João Silva" },
        email: { label: "Email profissional", placeholder: "joao.silva@empresa.pt" },
        phone: { label: "Telefone", placeholder: "+351 91 234 56 78" },
        company: { label: "Empresa", placeholder: "Nome da sua empresa" },
        contactType: {
          label: "Tipo de contacto",
          placeholder: "Selecione o seu perfil",
          options: {
            client: "Sou um cliente (empresa à procura de pessoal)",
            agency: "Sou uma agência de recrutamento",
            interim: "Sou um trabalhador temporário",
            other: "Outro"
          }
        },
        needType: { 
          label: "Tipo de necessidade", 
          placeholder: "Selecione a sua necessidade",
          options: [
            "Trabalho temporário europeu",
            "Recrutamento especializado",
            "Consultoria e Conformidade",
            "Outra necessidade"
          ]
        },
        message: { label: "Descreva a sua necessidade", placeholder: "Ex: Procura de 10 pedreiros para uma obra de 6 meses na região de Lisboa..." }
      },
      ctaLabel: "Enviar o meu pedido",
      securityNote: "🔒 Os seus dados estão protegidos e nunca serão partilhados com terceiros",
      successMessage: "Obrigado! Recebemos o seu pedido e contactá-lo-emos em 24 horas."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "O seu parceiro para recrutamento na Europa"
    },
    columns: {
      services: {
        title: "Serviços",
        links: [
          { label: "Trabalho Temporário Europeu", href: "/servico/trabalho-temporario-europeu" },
          { label: "Recrutamento Especializado", href: "/servico/recrutamento-especializado" },
          { label: "Destacamento de Pessoal", href: "/servico/destacamento-pessoal" },
          { label: "Consultoria e Conformidade", href: "/servico/consultoria-conformidade" }
        ]
      },
      company: {
        title: "Empresa",
        links: [
          { label: "Sobre nós", href: "/sobre-nos" },
          { label: "A nossa rede", href: "/a-nossa-rede" },
          { label: "Os nossos setores", href: "/os-nossos-setores" },
          { label: "Testemunhos", href: "/testemunhos" }
        ]
      },
      contact: {
        title: "Contacto",
        address: "Bordéus, França",
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
      copyright: "© 2026 YOJOB. Todos os direitos reservados.",
      madeWith: "Feito com ❤️ para facilitar o recrutamento europeu",
      legalLinks: [
        { label: "Aviso legal", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Política de privacidade", href: "/privacy" }
      ]
    }
  }
};