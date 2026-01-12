/**
 * 🇵🇹 TRADUÇÕES PORTUGUESAS - CONDIÇÕES GERAIS DE VENDA (CGV)
 * 
 * @version 1.0.0
 */

export const cgvPT = {
  hero: {
    badge: "Documento B2B - Contratual",
    title: "Condições Gerais de Venda",
    subtitle: "CGV aplicáveis a Empresas Utilizadoras (EU) e Agências ETT parceiras",
    effectiveDate: "Versão em vigor desde 19 de dezembro de 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Intermediário / Corretor comercial"
    },
    eu: {
      title: "Empresa Utilizadora (EU)",
      description: "Cliente final que recebe a mão de obra"
    },
    ett: {
      title: "Agência ETT",
      description: "Parceiro de recrutamento"
    }
  },

  sections: {
    article0: {
      title: "Artigo 0 - Identidade do prestador",
      fields: {
        legalForm: "Forma jurídica",
        legalFormValue: "Empresa Individual (EI)",
        manager: "Gerente",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "NIF intracomunitário",
        vatValue: "FR79447862764",
        address: "Morada",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Contacto",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Seguro RC Profissional",
        description: "A YOJOB dispõe de um seguro de responsabilidade civil profissional que cobre as consequências pecuniárias da sua responsabilidade relacionadas com as suas prestações."
      }
    },

    article1: {
      title: "Artigo 1 - Definições",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Intermediário/corretor comercial que assegura a prospeção, qualificação, coordenação e formalização de propostas comerciais entre EU e ETT."
        },
        eu: {
          term: "Empresa Utilizadora (EU)",
          definition: "Empresa cliente final que recebe a mão de obra colocada à disposição por uma ETT parceira."
        },
        ett: {
          term: "ETT / Agência parceira",
          definition: "Agência de trabalho temporário que efetua o recrutamento, a contratação e a organização da colocação à disposição de pessoal."
        },
        profile: {
          term: "Perfil",
          definition: "Candidato ou trabalhador temporário apresentado por uma ETT a uma EU através da intermediação da YOJOB."
        },
        mission: {
          term: "Missão",
          definition: "Necessidade de recrutamento expressa pela EU (profissão, volume, datas, local, requisitos específicos)."
        },
        proposition: {
          term: "Proposta tripartida",
          definition: "Proposta comercial e administrativa estruturada pela YOJOB e validada pela EU e pela ETT (assinatura ou acordo escrito)."
        },
        handover: {
          term: "Transferência",
          definition: "Momento em que a ETT se torna o interlocutor principal da EU após dupla validação EU + ETT."
        },
        insurer: {
          term: "Seguradora de crédito",
          definition: "Organismo de seguro de crédito (COFACE, Allianz Trade, etc.) que intervém na análise do risco cliente e na concessão de linhas de crédito."
        }
      }
    },

    article2: {
      title: "Artigo 2 - Objeto",
      intro: "As presentes CGV regulam as prestações da YOJOB que consistem principalmente em:",
      steps: {
        step1: {
          title: "Prospetar e qualificar",
          description: "Identificar e qualificar Empresas Utilizadoras com necessidades de recrutamento europeu"
        },
        step2: {
          title: "Apresentar oportunidades",
          description: "Transmitir as oportunidades qualificadas às ETT parceiras correspondentes"
        },
        step3: {
          title: "Estruturar a proposta",
          description: "Elaborar uma proposta comercial detalhada (perímetro, coordenação, elementos administrativos)"
        },
        step4: {
          title: "Organizar a transferência",
          description: "Assegurar a transição para a ETT após a assinatura para a execução (recrutamento, colocação à disposição, faturação)"
        }
      },
      yojobRole: {
        title: "Papel da YOJOB",
        description: "A YOJOB atua exclusivamente como intermediário. A ETT é responsável pelo recrutamento, pela colocação à disposição, pela conformidade empregador e pela faturação à EU, salvo estipulação expressa em contrário no contrato."
      }
    },

    article3: {
      title: "Artigo 3 - Documentos contratuais e hierarquia",
      intro: "Em caso de contradição entre os documentos, aplica-se a seguinte ordem de prioridade:",
      hierarchy: {
        rank1: {
          title: "Contrato particular / Condições específicas",
          subtitle: "Parceria ou aporte de negócios personalizado"
        },
        rank2: {
          title: "Proposta tripartida / Orçamento / Encomenda",
          subtitle: "Documento assinado pelas partes"
        },
        rank3: {
          title: "Condições Gerais de Venda (CGV)",
          subtitle: "Este documento"
        },
        rank4: {
          title: "Anexos",
          subtitle: "SLA, DPA, processos, checklists, etc."
        }
      }
    },

    article4: {
      title: "Artigo 4 - Esquemas contratuais",
      intro: "O esquema aplicável é especificado na proposta ou no contrato. A YOJOB pode intervir segundo 3 modelos:",
      schemes: {
        schemaB: {
          label: "Esquema B",
          badge: "Principal",
          title: "ETT cliente da YOJOB",
          description: "A YOJOB é remunerada pela ETT a título de aporte de negócios (comissão mensal e/ou prémio de sucesso)"
        },
        schemaA: {
          label: "Esquema A",
          badge: "Opcional",
          title: "EU cliente da YOJOB",
          description: "A YOJOB fatura à EU serviços adicionais (coordenação reforçada, assistência documental alargada)"
        },
        schemaC: {
          label: "Esquema C",
          badge: "Misto",
          title: "Remuneração combinada",
          description: "A YOJOB é remunerada pela ETT (Esquema B) E fatura serviços adicionais à EU (Esquema A)"
        }
      }
    },

    article5: {
      title: "Artigo 5 - Processo e transferência",
      phase1: {
        title: "5.1 Fase prévia (comercial e coordenação)",
        intro: "A YOJOB assegura:",
        items: [
          "Prospeção e qualificação da Empresa Utilizadora",
          "Recolha dos elementos necessários para a Missão",
          "Transmissão da necessidade a uma ou várias ETT parceiras",
          "Coordenação até à conclusão da proposta tripartida"
        ]
      },
      phase2: {
        title: "5.2 Desencadeador da transferência",
        intro: "A \"transferência\" ocorre aquando do cumprimento de duas condições cumulativas:",
        conditions: [
          "Assinatura/acordo escrito da EU sobre a proposta",
          "Aceitação/validação da ETT (capacidade, condições, conformidade, risco)"
        ],
        consequences: "A partir desse momento, a ETT torna-se o interlocutor principal para: recrutamento, contratos, onboarding, colocação à disposição, salários, obrigações de destacamento, faturação e cobrança EU."
      },
      phase3: {
        title: "5.3 Assistência residual (se prevista)",
        description: "A YOJOB pode permanecer como suporte (coordenação/qualidade) dentro do perímetro acordado na proposta ou no contrato."
      }
    },

    article6: {
      title: "Artigo 6 - Condições financeiras e modalidades de pagamento",
      section1: {
        title: "6.1 Princípio: prazos \"seletivos\" caso a caso",
        intro: "Tendo em conta as práticas do setor (seguro de crédito, risco cliente, organização de faturação), as condições de pagamento são definidas caso a caso na proposta/contrato aplicável.",
        modalitiesTitle: "As modalidades podem incluir:",
        modalities: [
          "Pagamento à receção",
          "Pagamento antecipado / adiantamento",
          "Faturação semanal",
          "Garantias (depósito, limitação de linha de crédito)"
        ],
        legalLimit: "Quando é concedido um prazo de pagamento \"a prazo\", são respeitados os limites legais: 60 dias a partir da data de emissão da fatura, ou 45 dias fim de mês se estipulado."
      },
      section2: {
        title: "6.2 Grelha padrão — EU \"de risco\"",
        intro: "A classificação do risco é determinada a partir de 3 fontes cumulativas:",
        sources: {
          insurer: {
            title: "Seguradora de crédito",
            description: "Cobertura/linha de crédito/condições"
          },
          score: {
            title: "Pontuação interna ETT",
            description: "Política de risco e cobrança"
          },
          history: {
            title: "Histórico de pagamentos",
            description: "Comportamento e exposição"
          }
        },
        primacy: "Primazia: em caso de contradição, a decisão da seguradora de crédito prevalece sobre os outros sinais.",
        levelsTitle: "Níveis de risco e condições de pagamento",
        levels: {
          r0: {
            level: "R0",
            title: "Padrão",
            trigger: "Seguradora: coberto / linha de crédito OK; Pontuação ETT: A/B; Histórico: bom (0 incidentes)",
            conditions: "Mensal + prazo negociado (ex. 30d) dentro do limite legal",
            safeguards: "Linha de crédito padrão"
          },
          r1: {
            level: "R1",
            title: "Vigiado",
            trigger: "Seguradora: linha de crédito limitada; Pontuação ETT: B/C; Histórico: atrasos moderados",
            conditions: "À receção OU adiantamento 30-50% + saldo à receção",
            safeguards: "Linha de crédito limitada + revisão semanal"
          },
          r2: {
            level: "R2",
            title: "Reforçado",
            trigger: "Seguradora: cobertura parcial insuficiente; Pontuação ETT: C/D; Histórico: atrasos significativos",
            conditions: "Semanal à receção OU adiantamento 50-70% + ajuste semanal",
            safeguards: "Início por lotes (volume limitado)"
          },
          r3: {
            level: "R3",
            title: "Crítico",
            trigger: "Seguradora: RECUSA / não segurável; Pontuação ETT: D; Histórico: incidentes graves",
            conditions: "Pagamento 100% antecipado (ou recusa de início)",
            safeguards: "Início condicionado ao pagamento; paragem em caso de desvio"
          }
        },
        transparency: {
          title: "Transparência e aceitação",
          description: "A Proposta tripartida especifica o nível (R0/R1/R2/R3), o modo de faturação e a condição de pagamento. A assinatura/aceitação da proposta equivale à aceitação destas modalidades."
        },
        adjustment: {
          title: "Cláusula de ajuste dinâmico",
          description: "Em caso de evolução do risco (descida da linha de crédito da seguradora, atrasos, incidentes), a ETT pode rever as condições de pagamento para os períodos seguintes, após notificação à EU, respeitando o contrato aplicável."
        }
      },
      section3: {
        title: "6.3 Atrasos de pagamento",
        intro: "Em caso de atraso numa fatura emitida pela YOJOB (Esquema A ou faturação ETT→YOJOB):",
        penalties: [
          "Juros de mora exigíveis sem aviso prévio, segundo a taxa prevista no contrato ou o quadro legal aplicável",
          "Indemnização forfetária de cobrança: 40 € por fatura não paga",
          "Possível suspensão das prestações após notificação escrita"
        ]
      }
    },

    article7: {
      title: "Artigo 7 - Obrigações da Empresa Utilizadora (EU)",
      intro: "A EU compromete-se a:",
      obligations: [
        "Fornecer uma necessidade exata e completa, e cooperar ativamente (feedback, validações, planeamento)",
        "Transmitir os requisitos de segurança e as modalidades de acesso ao local",
        "Respeitar a confidencialidade das informações (ETT, perfis, condições comerciais)",
        "Reconhecer que o recrutamento, a colocação à disposição e a faturação de mão de obra são da responsabilidade da ETT (salvo esquema diferente por escrito)",
        "Respeitar as condições de pagamento definidas na proposta tripartida"
      ]
    },

    article8: {
      title: "Artigo 8 - Obrigações e remuneração da ETT parceira",
      section1: {
        title: "8.1 Comissão mensal (aporte de negócios)",
        intro: "A ETT deve à YOJOB uma comissão calculada sobre o montante líquido faturado pela ETT à EU relativamente às missões provenientes da YOJOB.",
        details: {
          rate: {
            label: "Taxa de comissão",
            value: "Variável segundo contrato (ex. 3-8%)"
          },
          base: {
            label: "Base de cálculo",
            value: "Montante líquido faturado EU (missões YOJOB)"
          },
          rhythm: {
            label: "Ritmo de faturação",
            value: "Mensal"
          },
          deadline: {
            label: "Prazo de pagamento",
            value: "Desde a receção do pagamento da EU, sem demora"
          }
        }
      },
      section2: {
        title: "8.2 Prémio de sucesso \"colocação\"",
        intro: "Para certas missões, um prémio de sucesso pode acrescer à comissão mensal:",
        items: {
          trigger: {
            label: "Facto gerador",
            value: "Fim do período experimental aplicável (ver art. 9), sem rutura imputável ao Perfil"
          },
          exigibility: {
            label: "Exigibilidade",
            value: "Pagamento integral imediato aquando da emissão da fatura YOJOB"
          },
          amount: {
            label: "Montante",
            value: "Variável segundo contrato (ex. % do salário anual bruto ou montante forfetário)"
          }
        }
      },
      section3: {
        title: "8.3 Reportagem",
        intro: "A ETT fornece à YOJOB, com frequência acordada (ex. mensal):",
        items: [
          "Lista das missões YOJOB (EU, local, datas, volumes)",
          "Montante líquido associado por missão",
          "Elementos justificativos razoáveis",
          "Respeito do RGPD e do segredo comercial"
        ]
      }
    },

    article9: {
      title: "Artigo 9 - Período experimental regulamentar",
      section1: {
        title: "9.1 Princípio",
        description: "O período experimental aplicável é o previsto pelos documentos contratuais (ETT↔EU e/ou ETT↔Perfil) e pela regulamentação/acordos aplicáveis. Não pode exceder as durações máximas autorizadas."
      },
      section2: {
        title: "9.2 Destacamento / Trabalho temporário (contrato de missão)",
        intro: "O contrato de missão pode incluir um período experimental fixado por acordo; na sua falta, está limitado a:",
        durations: [
          { duration: "2 dias", condition: "Contrato ≤ 1 mês" },
          { duration: "3 dias", condition: "1 mês < contrato ≤ 2 meses" },
          { duration: "5 dias", condition: "Contrato > 2 meses" }
        ]
      },
      section3: {
        title: "9.3 Recrutamento (duração indeterminada/assimilado) — Limite legal",
        intro: "Para um contrato de duração indeterminada, a duração máxima do período experimental é nomeadamente:",
        durations: [
          { duration: "2 meses", condition: "Operários / Empregados", color: "green" },
          { duration: "3 meses", condition: "Quadros intermédios / Técnicos", color: "blue" },
          { duration: "4 meses", condition: "Quadros", color: "violet" }
        ],
        note: "Segundo as regras aplicáveis e eventual renovação enquadrada pela lei."
      }
    },

    article10: {
      title: "Artigo 10 - Não contorno — Duração 24 meses",
      intro: "Durante a relação contratual e durante 24 meses após a última colocação em relação (ETT e/ou Perfil), as partes proíbem-se de todo o contorno:",
      actors: {
        eu: "Interdição para a EU de contratar diretamente com uma ETT introduzida pela YOJOB (ou através de entidade ligada) contornando a YOJOB, salvo acordo escrito.",
        ett: "Interdição para a ETT de contornar a remuneração YOJOB sobre uma EU/oportunidade proveniente da YOJOB, salvo acordo escrito."
      },
      penalty: {
        title: "Cláusula penal",
        description: "Em caso de violação desta cláusula de não contorno, a parte incumpridora compromete-se a pagar à YOJOB uma indemnização forfetária cujo montante é especificado no contrato (ou equivalente a uma percentagem das somas geradas/estimadas), sem prejuízo das indemnizações complementares."
      }
    },

    article11: {
      title: "Artigo 11 - Responsabilidade e limitações",
      items: {
        obligation: {
          title: "Obrigação de meios",
          description: "A YOJOB compromete-se a colocar em prática todos os meios necessários para realizar as suas prestações de intermediação, sem garantia de resultado."
        },
        nonResponsibility: {
          title: "Não responsabilidade ETT/Perfis",
          description: "A YOJOB não é responsável pelos atos, omissões ou incumprimentos da ETT, dos Perfis recrutados, nem pelas decisões de crédito/seguro."
        },
        cap: {
          title: "Limitação",
          description: "Salvo falta grave ou dolo, a responsabilidade da YOJOB está limitada ao montante líquido recebido relativamente ao contrato em causa durante os últimos 12 meses."
        },
        indirect: {
          title: "Danos indiretos excluídos",
          description: "A YOJOB não pode ser responsabilizada pelos danos indiretos (perda de exploração, lucro cessante, perda de clientela, etc.)."
        }
      }
    },

    article12: {
      title: "Artigo 12 - Confidencialidade",
      intro: "As partes comprometem-se a manter confidenciais todas as informações trocadas no âmbito da sua colaboração.",
      items: [
        "As informações confidenciais incluem os dados comerciais, técnicos, financeiros e estratégicos",
        "A obrigação de confidencialidade perdura durante toda a duração da relação contratual e 5 anos após a sua cessação",
        "As informações não podem ser divulgadas a terceiros sem acordo prévio escrito",
        "As partes devem tomar todas as medidas necessárias para proteger a confidencialidade das informações"
      ]
    },

    article13: {
      title: "Artigo 13 - Dados pessoais (RGPD)",
      intro: "As trocas de dados pessoais estão estritamente limitadas aos dados necessários para a execução das prestações (contactos, necessidades, perfis de candidatos).",
      cards: {
        compliance: {
          title: "Conformidade RGPD",
          description: "O tratamento de dados pessoais é efetuado em conformidade com o RGPD e a lei de Proteção de Dados.",
          linkText: "Política de confidencialidade"
        },
        dpo: {
          title: "Contacto DPO",
          description: "Para qualquer pedido relativo aos seus dados pessoais ou ao exercício dos seus direitos RGPD."
        }
      },
      dpaNote: "Um DPA (Data Processing Agreement) pode ser anexado se necessário segundo a natureza das trocas de dados."
    },

    article14: {
      title: "Artigo 14 - Duração e resolução",
      items: {
        duration: {
          title: "Duração",
          description: "A duração da relação contratual é a definida no contrato ou proposta tripartida aceite."
        },
        earlyTermination: {
          title: "Resolução antecipada",
          description: "Pré-aviso de 30 dias (ou duração acordada no contrato) + pagamento das somas devidas (incluindo comissões/prémios de sucesso se atingido o facto gerador)."
        },
        breach: {
          title: "Resolução por incumprimento",
          description: "Em caso de incumprimento grave das obrigações: notificação + prazo de regularização de 15 dias. Na falta de regularização, resolução de pleno direito."
        }
      }
    },

    article15: {
      title: "Artigo 15 - Força maior",
      intro: "As partes não poderão ser responsabilizadas se o incumprimento ou o atraso na execução das suas obrigações for devido a um caso de força maior no sentido da jurisprudência francesa.",
      examplesTitle: "Constituem nomeadamente casos de força maior:",
      examples: [
        "Catástrofes naturais, inundações, incêndios",
        "Guerras, atentados, motins",
        "Greves gerais, bloqueios de transportes",
        "Falhas de redes (telecomunicações, eletricidade)",
        "Epidemias, pandemias",
        "Medidas sanitárias governamentais"
      ],
      suspension: "Em caso de força maior, as obrigações ficam suspensas durante a duração do evento, após notificação à outra parte."
    },

    article16: {
      title: "Artigo 16 - Direito aplicável e litígios",
      sections: {
        law: {
          title: "Direito aplicável",
          description: "As presentes CGV estão sujeitas ao direito francês."
        },
        amicable: {
          title: "Tentativa amigável prévia",
          description: "Em caso de litígio, as partes comprometem-se a procurar uma solução amigável antes de toda a ação judicial. O cliente pode recorrer a uma mediação convencional ou a qualquer outro modo alternativo de resolução de diferendos."
        },
        jurisdiction: {
          title: "Jurisdição competente",
          description: "Na falta de resolução amigável, todo o litígio é da competência exclusiva dos tribunais da sede social da YOJOB, salvo regra imperativa contrária."
        }
      }
    },

    article17: {
      title: "Artigo 17 - Modificação das CGV",
      intro: "A YOJOB reserva-se o direito de modificar a qualquer momento as presentes CGV.",
      items: [
        "As CGV aplicáveis são as vigentes na data de aceitação da proposta/contrato",
        "As modificações não têm efeito retroativo sobre os contratos em curso de execução, salvo acordo expresso escrito das partes",
        "A última versão das CGV pode ser consultada a qualquer momento no site da YOJOB"
      ]
    }
  },

  cta: {
    title: "Questões sobre as nossas CGV?",
    description: "A nossa equipa jurídica e comercial está à sua disposição para qualquer esclarecimento sobre estas Condições Gerais de Venda.",
    backHome: "Voltar ao início",
    contactUs: "Contacte-nos"
  },

  footer: {
    copyright: "© {year} {company} — Empresa Individual. Todos os direitos reservados.",
    links: {
      legal: "Aviso legal",
      privacy: "Privacidade",
      cgv: "CGV"
    }
  },

  badges: {
    main: "Principal",
    optional: "Opcional",
    mixed: "Misto"
  },

  common: {
    back: "Voltar",
    triggers: "Desencadeadores",
    conditions: "Condições",
    safeguards: "Salvaguardas"
  }
};
