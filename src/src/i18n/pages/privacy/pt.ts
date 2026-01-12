/**
 * 🇵🇹 TRADUÇÕES PORTUGUESAS - PÁGINA POLÍTICA DE PRIVACIDADE
 * 
 * @version 1.0.0
 */

export const privacyPT = {
  hero: {
    badge: "Política de Privacidade",
    title: "Proteção dos seus dados pessoais",
    subtitle: "Na {company}, comprometemo-nos a proteger e respeitar a sua privacidade de acordo com o Regulamento Geral de Proteção de Dados (RGPD).",
    lastUpdate: "Última atualização:"
  },

  dpo: {
    title: "Encarregado de Proteção de Dados (DPO)",
    subtitle: "O seu interlocutor privilegiado para qualquer questão relacionada com os seus dados"
  },

  sections: {
    dataController: {
      title: "1. Responsável pelo tratamento",
      intro: "O responsável pelo tratamento de dados pessoais é:",
      location: "Bordéus, França",
      email: "Email:"
    },

    dataCollected: {
      title: "2. Dados pessoais recolhidos",
      intro: "Recolhemos os seguintes dados no âmbito dos nossos serviços de recrutamento europeu:",
      items: [
        {
          label: "Dados de identificação:",
          description: "Nome, apelido, email, telefone"
        },
        {
          label: "Dados profissionais:",
          description: "Empresa, função, setor de atividade"
        },
        {
          label: "Dados de contacto:",
          description: "Morada postal, preferências de comunicação"
        },
        {
          label: "Dados de navegação:",
          description: "Cookies, endereço IP, dados de conexão"
        }
      ]
    },

    purposes: {
      title: "3. Finalidades do tratamento",
      intro: "Os seus dados são recolhidos e tratados para as seguintes finalidades:",
      items: [
        {
          title: "Gestão de pedidos de recrutamento",
          description: "Processar os seus pedidos de orçamento e colocá-lo em contacto com a nossa rede de agências parceiras."
        },
        {
          title: "Melhoria dos nossos serviços",
          description: "Analisar a utilização dos nossos serviços para melhorar a sua experiência de utilizador."
        },
        {
          title: "Comunicação comercial",
          description: "Informá-lo sobre os nossos novos serviços e o nosso marketplace europeu (com o seu consentimento)."
        }
      ]
    },

    legalBasis: {
      title: "4. Base legal do tratamento",
      intro: "O tratamento dos seus dados baseia-se nas seguintes bases legais:",
      items: [
        {
          basis: "Execução do contrato",
          description: "Tratamento necessário para responder aos seus pedidos de recrutamento"
        },
        {
          basis: "Consentimento",
          description: "Para o envio de comunicações de marketing (pode retirar o seu consentimento a qualquer momento)"
        },
        {
          basis: "Interesse legítimo",
          description: "Melhoria dos nossos serviços e segurança da nossa plataforma"
        }
      ]
    },

    retention: {
      title: "5. Período de conservação",
      intro: "Conservamos os seus dados pessoais durante os seguintes períodos:",
      items: [
        {
          period: "3 anos",
          description: "Dados de prospects e clientes"
        },
        {
          period: "13 meses",
          description: "Cookies e dados de navegação"
        },
        {
          period: "5 anos",
          description: "Documentos contabilísticos e fiscais"
        },
        {
          period: "{days} dias",
          description: "Dados de formulários (configurável)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Os seus direitos",
      intro: "De acordo com o RGPD, dispõe dos seguintes direitos:",
      items: [
        {
          title: "Direito de acesso",
          description: "Obter uma cópia dos seus dados pessoais"
        },
        {
          title: "Direito de retificação",
          description: "Corrigir os seus dados inexatos ou incompletos"
        },
        {
          title: "Direito ao apagamento",
          description: "Solicitar a eliminação dos seus dados"
        },
        {
          title: "Direito à limitação",
          description: "Limitar o tratamento dos seus dados"
        },
        {
          title: "Direito à portabilidade",
          description: "Receber os seus dados num formato estruturado"
        },
        {
          title: "Direito de oposição",
          description: "Opor-se ao tratamento dos seus dados"
        }
      ],
      footer: "Para exercer os seus direitos, contacte o nosso DPO no endereço"
    },

    security: {
      title: "7. Segurança dos dados",
      intro: "Implementamos medidas de segurança técnicas e organizacionais apropriadas:",
      measures: [
        "Encriptação de dados em trânsito e em repouso (SSL/TLS)",
        "Acesso restrito aos dados através de autenticação forte",
        "Backups regulares e plano de continuidade de negócio",
        "Auditorias de segurança e atualizações regulares",
        "Formação do pessoal em boas práticas RGPD"
      ]
    },

    transfers: {
      title: "8. Transferências de dados",
      intro: "No âmbito da nossa rede europeia de mais de 500 agências parceiras em 27 países:",
      eu: {
        title: "🇪🇺 Dentro da União Europeia",
        description: "Os seus dados podem ser transferidos para as nossas agências parceiras situadas na UE/EEE, que beneficiam do mesmo nível de proteção do RGPD."
      },
      nonEu: {
        title: "🌍 Fora da União Europeia",
        description: "Em caso de transferência para fora da UE, utilizamos as Cláusulas Contratuais Tipo (CCT) da Comissão Europeia para garantir um nível de proteção adequado."
      }
    },

    cookies: {
      title: "9. Cookies e rastreadores",
      intro: "O nosso site utiliza cookies para melhorar a sua experiência de navegação:",
      types: [
        {
          type: "Cookies essenciais",
          description: "Necessários para o funcionamento do site (sessão, segurança)",
          required: true
        },
        {
          type: "Cookies analíticos",
          description: "Medição de audiência e estatísticas de visitas",
          required: false
        },
        {
          type: "Cookies de marketing",
          description: "Publicidade direcionada e personalização",
          required: false
        }
      ],
      footer: "Pode gerir as suas preferências de cookies a qualquer momento através das definições do seu navegador."
    },

    contact: {
      title: "10. Contacto e reclamação",
      intro: "Para qualquer questão sobre o tratamento dos seus dados pessoais:",
      dpoCard: {
        title: "Contacte o nosso DPO"
      },
      cnilCard: {
        title: "Autoridade de controlo",
        name: "CNIL (França)"
      },
      footer: "Se considerar que os seus direitos não são respeitados, tem o direito de apresentar uma reclamação junto da Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "Os seus dados em segurança",
    description: "A proteção dos seus dados pessoais é a nossa prioridade. Comprometemo-nos a respeitar o RGPD e a garantir a segurança da sua informação.",
    backHome: "Voltar ao início",
    contactDpo: "Contactar o DPO"
  },

  badges: {
    required: "Obrigatório",
    optional: "Opcional"
  }
};
