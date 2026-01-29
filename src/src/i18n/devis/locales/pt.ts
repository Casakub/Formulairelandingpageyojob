/**
 * 🇵🇹 TRADUÇÕES PORTUGUESAS - FORMULÁRIO DE ORÇAMENTO
 * 
 * Traduções completas em português para o formulário de pedido de orçamento
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const pt: DevisTranslations = {
  // === COMUM ===
  common: {
    next: "Seguinte",
    previous: "Anterior",
    submit: "Enviar",
    required: "*",
    optional: "(opcional)",
    loading: "A carregar...",
    error: "Erro",
    success: "Sucesso",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    confirm: "Confirmar",
    euro: "€",
    perHour: "/h",
    perMonth: "/mês",
    perDay: "/dia",
    persons: "pessoa(s)",
    hours: "hora(s)",
    days: "dia(s)",
    months: "meses",
    year: "ano(s)",
  },

  // === NAVEGAÇÃO ===
  navigation: {
    back: "Voltar",
    stepOf: "Passo {step} de {total}",
    steps: {
      entreprise: {
        title: "Empresa",
        badge: "🏢 A sua empresa",
      },
      contact: {
        title: "Contacto",
        badge: "👤 O seu contacto",
      },
      besoins: {
        title: "Necessidades",
        badge: "💼 As suas necessidades",
      },
      conditions: {
        title: "Condições",
        badge: "📋 Condições",
      },
      candidats: {
        title: "Candidatos",
        badge: "👷 Perfil procurado",
      },
      recapitulatif: {
        title: "Resumo",
        badge: "✅ Resumo",
      },
    },
  },

  // === VALIDAÇÃO ===
  validation: {
    fillRequired: "Por favor, preencha todos os campos obrigatórios",
    selectRegion: "Por favor, selecione uma região",
    addAtLeastOnePosition: "Por favor, adicione pelo menos uma posição",
    invalidEmail: "Por favor, introduza um endereço de email válido",
    invalidPhone: "Por favor, introduza um número de telefone válido",
    invalidSIRET: "Por favor, introduza um número SIRET válido (14 dígitos)",
    dateRequired: "Por favor, introduza a data de início",
    missionLocationRequired: "Por favor, introduza o local da missão",
  },

  // === MENSAGENS ===
  messages: {
    success: {
      quoteSent: "Orçamento enviado com sucesso!",
      redirecting: "A redirecionar...",
    },
    error: {
      submitError: "Erro ao enviar o orçamento",
      genericError: "Ocorreu um erro",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Pedido de orçamento | YOJOB",
    pageDescription: "Peça um orçamento para as suas necessidades de pessoal temporário europeu.",
  },

  // === PASSO 1: EMPRESA ===
  step1: {
    title: "Informações da empresa",
    subtitle: "Introduza as informações legais da sua empresa utilizadora.",
    fields: {
      pays: {
        label: "País",
        placeholder: "Selecione um país",
      },
      raisonSociale: {
        label: "Denominação social",
        placeholder: "Ex: YOJOB SAS",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 dígitos",
        helper: "Número de identificação do seu estabelecimento",
      },
      codeAPE: {
        label: "Código APE/NAF",
        placeholder: "Ex: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "NIF Intracomunitário",
        placeholder: "Ex: PT123456789",
      },
      adresse: {
        label: "Morada completa",
        placeholder: "Número e nome da rua",
      },
      codePostal: {
        label: "Código postal",
        placeholder: "Ex: 1000-001",
      },
      ville: {
        label: "Cidade",
        placeholder: "Ex: Lisboa",
      },
      region: {
        label: "Região/Estado",
        placeholder: "Selecione uma região",
        placeholderOtherCountry: "Ex: Bavaria, Catalunha, Lombardia...",
      },
      siteInternet: {
        label: "Website",
        placeholder: "https://www.exemplo.pt",
      },
    },
    infoMessage: "✓ Estas informações serão utilizadas para gerar o seu orçamento personalizado",
  },

  // === PASSO 2: CONTACTO ===
  step2: {
    title: "Pessoa de contacto",
    subtitle: "Quem será o seu interlocutor privilegiado para este projeto?",
    fields: {
      civilite: {
        label: "Tratamento",
        options: {
          m: "Sr.",
          mme: "Sra.",
        },
      },
      nom: {
        label: "Apelido",
        placeholder: "Ex: Silva",
      },
      prenom: {
        label: "Nome",
        placeholder: "Ex: João",
      },
      fonction: {
        label: "Função",
        placeholder: "Ex: Responsável RH",
      },
      email: {
        label: "Email profissional",
        placeholder: "joao.silva@empresa.pt",
      },
      telephone: {
        label: "Telefone",
        placeholder: "+351 912 345 678",
      },
    },
  },

  // === PASSO 3: NECESSIDADES ===
  step3: {
    title: "As suas necessidades de recrutamento",
    subtitle: "Descreva os perfis procurados e as suas condições.",
    profileLabel: "Perfil",
    addProfile: "Adicionar um perfil adicional",
    removeProfile: "Eliminar este perfil",
    loadingConfig: "A carregar a configuração...",
    missingRegionWarning: "⚠️ Por favor, selecione a sua região no passo 1 para visualizar os salários automaticamente.",
    fields: {
      secteur: {
        label: "Sector de atividade",
        placeholder: "Selecione um sector",
      },
      convention: {
        label: "Convenção coletiva",
        placeholder: "Automático segundo o sector",
      },
      poste: {
        label: "Posição procurada",
        placeholder: "Selecione uma posição",
      },
      classification: {
        label: "Classificação / Qualificação",
        placeholder: "Selecione uma classificação",
      },
      quantite: {
        label: "Número de pessoas",
        placeholder: "Ex: 5",
        helper: "Quantas pessoas para esta posição?",
      },
      salaireBrut: {
        label: "Salário bruto mensal",
        placeholder: "Ex: 2500",
        helper: "Salário bruto na base de 151,67h/mês",
      },
      nationalite: {
        label: "Nacionalidade dos trabalhadores",
        placeholder: "Selecione um país",
        helper: "A nacionalidade influencia o coeficiente de tarifa da agência",
      },
    },
    ajouterPoste: "Adicionar outra posição",
    supprimerPoste: "Eliminar esta posição",
    posteNumero: "Posição",
    coefficientInfo: {
      title: "💡 Coeficiente agência aplicado",
      base: "Coef. base",
      facteurPays: "Fator país",
      final: "Coeficiente final",
    },
    summary: {
      title: "Remuneração do trabalhador",
      salaireBrutMensuel: "Salário bruto mensal",
      tauxHoraireBrut: "Taxa horária bruta",
      baseMensuelle: "(Base 151,67h/mês segundo convenção coletiva)",
    },
  },

  // === PASSO 4: CONDIÇÕES ===
  step4: {
    title: "Condições de trabalho",
    subtitle: "Especifique as condições de emprego e os benefícios propostos.",
    dateError: "A data de fim deve ser posterior à data de início",
    fields: {
      dateDebut: {
        label: "Data de início desejada",
        placeholder: "DD/MM/AAAA",
      },
      dateFin: {
        label: "Data de fim prevista",
        placeholder: "DD/MM/AAAA",
        helper: "Deixe em branco se duração indeterminada",
      },
      baseHoraire: {
        label: "Base horária mensal",
        placeholder: "Ex: 151,67",
        helper: "Base legal França: 151,67h/mês (35h/semana)",
      },
      lieuxMission: {
        label: "Locais da missão",
        placeholder: "Ex: Lisboa Centro, Porto Zona 3, Faro...",
      },
      periodeEssai: {
        label: "Período experimental",
        placeholder: "Selecione uma duração",
        options: {
          '2': '2 dias',
          '3': '3 dias',
          '5': '5 dias',
          '15': '15 dias',
        },
      },
      motifRecours: {
        label: "Motivo do recurso ao trabalho temporário",
        placeholder: "Selecione um motivo",
        options: {
          accroissement: "Aumento temporário de atividade",
          remplacement: "Substituição trabalhador ausente",
          saisonnier: "Trabalhos sazonais",
          exportation: "Encomenda excecional para exportação",
          autre: "Outro (a especificar)",
        },
      },
      delaiPaiement: {
        label: "Prazo de pagamento desejado",
        placeholder: "Selecione um prazo",
        options: {
          reception: "Pagamento à receção",
          j30: "30 dias",
          j45: "45 dias",
          j60: "60 dias",
        },
      },
    },
    hebergement: {
      title: "Alojamento",
      chargeEU: {
        label: "Alojamento a cargo da empresa utilizadora",
        helper: "Se NÃO: suplemento horário de +3,50 €/h será faturado pela agência",
      },
      supplementWarning: "⚠️ Um suplemento de +3,50 €/h será aplicado porque o alojamento não está a cargo",
      commentaire: {
        label: "Detalhes sobre o alojamento",
        placeholder: "Tipo de alojamento, morada, condições particulares...",
      },
    },
    transport: {
      title: "Transporte Local",
      chargeETT: {
        label: "Transporte local a cargo da agência",
        helper: "Se SIM: suplemento horário de +1,50 €/h será faturado",
      },
      supplementInfo: "✓ Um suplemento de +1,50 €/h será aplicado para cobrir as despesas de transporte local",
    },
    repas: {
      title: "Refeições",
      options: {
        restaurant: "Restaurante da empresa / Vales de refeição",
        panier: "Cesta de refeição (faturado ao dia)",
        nonConcerne: "Não aplicável",
      },
      montantInfo: "📋 Montante da cesta de refeição: {montant} / dia trabalhado (faturado separadamente)",
      montantNonDefini: "⚠️ Montante não definido para este país/região",
    },
    sections: {
      hebergement: {
        title: "Alojamento",
        chargeEU: {
          label: "Alojamento a cargo da empresa utilizadora",
          helper: "Se NÃO: suplemento horário de +3,50 €/h será faturado pela agência",
          options: {
            oui: "Sim, fornecido por EU",
            non: "Não, a cargo do trabalhador",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo de alojamento",
            options: {
              hotel: "Hotel",
              appartement: "Apartamento",
              foyer: "Residência",
              autre: "Outro",
            },
          },
          adresse: {
            label: "Morada do alojamento",
            placeholder: "Morada completa do alojamento",
          },
        },
      },
      transportInternational: {
        title: "Transporte internacional (país de origem ↔ França)",
        chargeEU: {
          label: "Transporte a cargo da empresa utilizadora",
          helper: "Viagens entre o país de origem e o local da missão",
          options: {
            oui: "Sim, fornecido por EU",
            non: "Não, a cargo do trabalhador",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo de transporte",
            options: {
              avion: "Avião",
              train: "Comboio",
              bus: "Autocarro",
              covoiturage: "Partilha de carro organizada",
            },
          },
          frequence: {
            label: "Frequência das viagens",
            options: {
              allerRetour: "Ida-volta inicial apenas",
              hebdomadaire: "Semanal",
              mensuel: "Mensal",
            },
          },
        },
      },
      transportLocal: {
        title: "Transporte local",
        chargeETT: {
          label: "Transporte local a cargo da agência",
          helper: "Se SIM: suplemento horário de +1,50 €/h será faturado",
          options: {
            oui: "Sim, a cargo da agência",
            non: "Não, a cargo do trabalhador",
          },
        },
        detailsETT: {
          type: {
            label: "Tipo de transporte",
            options: {
              vehicule: "Veículo da empresa",
              transport: "Transportes públicos",
              velo: "Bicicleta",
            },
          },
        },
      },
      repas: {
        title: "Refeições",
        type: {
          label: "Tipo de refeição",
          options: {
            restaurant: "Restaurante da empresa / Vales de refeição",
            panier: "Cesta de refeição (faturado ao dia)",
            nonConcerne: "Não aplicável",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Orçamento diário",
            placeholder: "Montante em €",
          },
        },
        detailsPanier: {
          info: "A cesta de refeição será faturada separadamente por dia trabalhado",
        },
      },
    },
  },

  // === PASSO 5: CANDIDATOS ===
  step5: {
    title: "Perfil dos candidatos",
    subtitle: "Defina as competências e requisitos específicos.",
    sections: {
      experience: {
        title: "Experiência profissional",
        obligatoire: {
          label: "Experiência obrigatória",
        },
        annees: {
          label: "Anos de experiência mínimos",
          placeholder: "Ex: 3",
          options: {
            '0-1': "Iniciante (0-1 ano)",
            '1-3': "Intermédio (1-3 anos)",
            '3-5': "Confirmado (3-5 anos)",
            '5+': "Especialista (5 anos e mais)",
          },
        },
        competences: {
          label: "Competências técnicas exigidas",
          placeholder: "Ex: Alvenaria, cofragem, leitura de plantas, soldadura TIG...",
        },
      },
      formation: {
        title: "Formação",
        obligatoire: {
          label: "Formação obrigatória",
        },
        type: {
          label: "Tipo de formação",
          placeholder: "Ex: CAP Alvenaria, CACES R489...",
        },
      },
      travailRisque: {
        title: "Trabalho de risco",
        active: {
          label: "Trabalho de risco específico",
        },
        precisions: {
          label: "Precisões sobre os riscos",
          placeholder: "Ex: Trabalho em altura, manipulação de cargas pesadas...",
        },
      },
      langues: {
        title: "Competências linguísticas",
        francais: {
          label: "Nível de francês exigido",
          placeholder: "Selecione um nível",
          options: {
            a1: "A1 - Principiante",
            a2: "A2 - Elementar",
            b1: "B1 - Intermédio",
            b2: "B2 - Intermédio avançado",
            c1: "C1 - Avançado",
            c2: "C2 - Domínio",
            natif: "Língua materna",
          },
        },
        autres: {
          label: "Outras línguas úteis",
          placeholder: "Ex: Inglês (B1), Alemão (A2)...",
        },
        languageNames: {
          francais: "Francês",
          anglais: "Inglês",
          portugais: "Português",
          espagnol: "Espanhol",
          italien: "Italiano",
          autre: "Outro",
        },
        levels: {
          'non-requis': "Não exigido",
          'A1': "A1 - Principiante",
          'A2': "A2 - Elementar",
          'B1': "B1 - Intermédio",
          'B2': "B2 - Avançado",
          'C1': "C1 - Autónomo",
          'C2': "C2 - Domínio",
        },
      },
      permis: {
        title: "Carta de condução",
        requis: {
          label: "Carta exigida",
          options: {
            aucun: "Nenhuma carta exigida",
            b: "Carta B (automóvel)",
            c: "Carta C (pesados)",
            ce: "Carta CE (pesados + reboque)",
            d: "Carta D (transporte de pessoas)",
          },
        },
        categorie: {
          label: "Categoria de carta",
          placeholder: "Ex: B, C, CE...",
        },
      },
      outillage: {
        title: "Pequenas ferramentas",
        requis: {
          label: "Ferramentas pessoais exigidas",
        },
        type: {
          label: "Tipo de ferramentas",
          placeholder: "Ex: Martelo, nível, metro, colher...",
        },
      },
      epi: {
        title: "Equipamentos de proteção individual (EPI)",
        infoLegale: "ℹ️ Segundo a regulamentação, o empregador deve fornecer os EPI adaptados aos riscos do posto.",
        selectionCount: "✓ {count} EPI selecionado(s)",
        fournis: {
          label: "EPI fornecidos pela empresa",
          helper: "Capacete, calçado de segurança, luvas, etc.",
          options: {
            oui: "Sim, fornecidos por EU",
            non: "Não, a cargo do trabalhador",
          },
        },
        liste: {
          label: "Lista dos EPI necessários",
          placeholder: "Ex: Capacete, calçado S3, luvas anticorte, arnês...",
        },
        items: {
          casque: "Capacete de segurança",
          lunettes: "Óculos de segurança",
          protections_auditives: "Proteções auditivas",
          gants: "Luvas de proteção",
          chaussures: "Calçado de segurança",
          harnais: "Arnês de segurança",
          vetements: "Roupa de trabalho",
          masque: "Máscara respiratória",
          protection_faciale: "Proteção facial",
          vetements_visibilite: "Roupa de alta visibilidade",
        },
      },
      autresExigences: {
        title: "Outros requisitos",
        label: "Requisitos específicos adicionais",
        placeholder: "Ex: Habilitações elétricas, CACES, disponibilidade fim de semana, trabalho em altura...",
      },
    },
  },

  // === RESUMO ===
  recapitulatif: {
    title: "Resumo do seu pedido",
    subtitle: "Verifique as informações antes de enviar o seu pedido de orçamento.",
    acceptConditionsError: "Por favor, aceite as condições antes de continuar",
    entreprise: {
      title: "Empresa",
      raisonSociale: "Denominação social",
      siret: "SIRET",
      pays: "País",
      ville: "Cidade",
      region: "Região/Estado",
    },
    contact: {
      title: "Contacto",
      nomPrenom: "Nome e apelido",
      email: "Email",
      telephone: "Telefone",
      fonction: "Função",
    },
    postes: {
      title: "Posições solicitadas",
      coeffETT: "📊 Coeficiente agência aplicado",
      coeffBase: "Coef. base",
      facteurPays: "Fator país",
      supplementsHoraires: "✨ Suplementos horários (incluídos na taxa)",
      hebergement: "✓ Alojamento",
      transport: "✓ Transporte local",
      panierRepas: "🍽️ Cesta de refeição (faturado ao dia)",
      baseHoraire: "📅 Base horária: {heures}h/mês (horas extraordinárias detetadas)",
      heuresNormales: "Horas normais (0-35h/sem)",
      heuresSup25: "Horas extra +25% (36ª-43ª h)",
      heuresSup50: "Horas extra +50% (44ª+ h)",
      sousTotal: "Subtotal mão de obra (por pessoa)",
      tauxHoraireBrut: "Taxa horária bruta",
      tauxETTFinal: "Taxa agência final",
      coutMensuel: "Custo mensal total",
    },
    conditions: {
      title: "Condições da missão",
      dateDebut: "Data de início",
      dateFin: "Data de fim",
      dureeEstimee: "Duração estimada",
      lieuMission: "Local da missão",
      mois: "meses",
    },
    majorations: {
      title: "Ajustamentos tarifários da missão",
      total: "Total de ajustamentos",
      notSet: "Não definido",
    },
    totaux: {
      mensuelHT: "Total mensal s/IVA",
      mensuelTTC: "Total mensal c/IVA",
      totalMission: "Custo total da missão",
    },
    noteLegale: "ℹ️ Esta estimativa é fornecida a título indicativo. A tarifa definitiva será confirmada após validação pela nossa equipa e pela agência parceira selecionada.",
    acceptConditions: {
      text: "Aceito que os meus dados sejam tratados em conformidade com a",
      lien: "política de privacidade",
    },
    boutonEnvoi: {
      texte: "Enviar o meu pedido de orçamento",
      enCours: "Envio em curso...",
    },
    footer: "✓ Resposta em 24h úteis • ✓ Sem compromisso",
  },

  // === ERROS ===
  errors: {
    required: "Este campo é obrigatório",
    invalidEmail: "Endereço de email inválido",
    invalidSIRET: "SIRET inválido (14 dígitos necessários)",
    invalidPhone: "Número de telefone inválido",
    minValue: "O valor deve ser maior ou igual a {min}",
    maxValue: "O valor deve ser menor ou igual a {max}",
    genericError: "Ocorreu um erro. Por favor, tente novamente.",
    loadingError: "Erro ao carregar os dados",
    submitError: "Erro ao enviar o pedido",
  },

  // === SECTORES & PROFISSÕES ===
  secteurs: {
    batiment: {
      label: "Construção Civil",
      convention: "Convenção coletiva nacional operários construção civil (3193)",
      postes: {
        macon: "Pedreiro",
        coffreur: "Cofragem",
        ferrailleur: "Armador de ferro",
        carreleur: "Ladrilhador",
        platrier: "Estucador",
        peintre: "Pintor",
        plombier: "Canalizador",
        electricien: "Eletricista",
        couvreur: "Telhador",
        menuisier: "Carpinteiro",
        chef_equipe_batiment: "Chefe de equipa",
        chef_chantier: "Chefe de obra",
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
      convention: "Convenção coletiva da metalurgia (3109)",
      postes: {
        soudeur: "Soldador",
        chaudronnier: "Caldeireiro",
        tuyauteur: "Tubista",
        tourneur: "Torneiro",
        fraiseur: "Fresador",
        usineur: "Operador CNC",
        mecanicien_industriel: "Mecânico industrial",
        monteur: "Montador",
        controleur_qualite: "Controlador de qualidade",
        ajusteur: "Ajustador",
        chef_equipe_metallurgie: "Chefe de equipa",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
        niveau_5: "Nível V",
      },
    },
    tp: {
      label: "Obras Públicas",
      convention: "Convenção coletiva nacional obras públicas (3005)",
      postes: {
        conducteur_engins: "Operador de máquinas",
        terrassier: "Escavador",
        canalisateur: "Canalizador",
        constructeur_routes: "Construtor de estradas",
        coffreur_bancheur: "Cofragem",
        macon_vrd: "Pedreiro VRD",
        chef_equipe_tp: "Chefe de equipa OP",
        manoeuvre_tp: "Servente OP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelaria",
      convention: "Convenção coletiva hotelaria-restauração (3292)",
      postes: {
        receptionniste: "Rececionista",
        femme_chambre: "Empregada de andares",
        agent_entretien: "Agente de limpeza",
        bagagiste: "Bagageiro",
        concierge: "Porteiro",
        night_audit: "Night auditor",
        gouvernante: "Governanta",
        chef_reception: "Chefe de receção",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
        niveau_5: "Nível V",
      },
    },
    restauration: {
      label: "Restauração",
      convention: "Convenção coletiva hotelaria-restauração (3292)",
      postes: {
        cuisinier: "Cozinheiro",
        commis_cuisine: "Ajudante de cozinha",
        chef_partie: "Chef de parte",
        serveur: "Empregado de mesa",
        barman: "Barman",
        plongeur: "Lavador de loiça",
        chef_rang: "Chefe de mesa",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Chef de cozinha",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
        niveau_5: "Nível V",
      },
    },
    plasturgie: {
      label: "Plásticos",
      convention: "Convenção coletiva dos plásticos (0292)",
      postes: {
        operateur_injection: "Operador de injeção",
        operateur_extrusion: "Operador de extrusão",
        regleur: "Ajustador",
        operateur_thermoformage: "Operador de termoformação",
        controleur_qualite_plasturgie: "Controlador de qualidade",
        technicien_maintenance: "Técnico de manutenção",
        chef_equipe_plasturgie: "Chefe de equipa",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
      },
    },
    automobile_carrosserie: {
      label: "Automóvel & Chapa",
      convention: "Convenção coletiva reparação automóvel (1090)",
      postes: {
        carrossier: "Bate-chapas",
        peintre_automobile: "Pintor automóvel",
        mecanicien_auto: "Mecânico auto",
        electricien_auto: "Eletricista auto",
        chef_atelier: "Chefe de oficina",
        controleur_technique: "Controlador técnico",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
      },
    },
    sylviculture: {
      label: "Silvicultura",
      convention: "Convenção coletiva da agricultura (7501)",
      postes: {
        bucheron: "Lenhador",
        elagueur: "Podador",
        conducteur_engins_forestiers: "Operador de máquinas florestais",
        chef_equipe_sylviculture: "Chefe de equipa silvicultura",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
      },
    },
    cartonnerie: {
      label: "Cartão",
      convention: "Convenção coletiva indústria transformação (3107)",
      postes: {
        operateur_production: "Operador de produção",
        conducteur_ligne: "Condutor de linha",
        regleur_cartonnerie: "Ajustador",
        chef_equipe_cartonnerie: "Chefe de equipa",
      },
      classifications: {
        niveau_1: "Nível I",
        niveau_2: "Nível II",
        niveau_3: "Nível III",
        niveau_4: "Nível IV",
      },
    },
    autre: {
      label: "Outro",
      convention: "A definir segundo a atividade",
      postes: {
        autre_poste: "Outra posição (a especificar)",
      },
      classifications: {
        a_definir: "A definir",
      },
    },
  },

  // === PAÍSES EUROPEUS ===
  pays: {
    france: "França",
    allemagne: "Alemanha",
    autriche: "Áustria",
    belgique: "Bélgica",
    bulgarie: "Bulgária",
    croatie: "Croácia",
    chypre: "Chipre",
    danemark: "Dinamarca",
    espagne: "Espanha",
    estonie: "Estónia",
    finlande: "Finlândia",
    grece: "Grécia",
    hongrie: "Hungria",
    irlande: "Irlanda",
    italie: "Itália",
    lettonie: "Letónia",
    lituanie: "Lituânia",
    luxembourg: "Luxemburgo",
    malte: "Malta",
    pays_bas: "Países Baixos",
    pologne: "Polónia",
    portugal: "Portugal",
    republique_tcheque: "República Checa",
    roumanie: "Roménia",
    slovaquie: "Eslováquia",
    slovenie: "Eslovénia",
    suede: "Suécia",
  },

  // === PÁGINA RESUMO ORÇAMENTO (ASSINATURA) ===
  pageRecap: {
    header: {
      title: "Resumo do orçamento",
      exportPDF: "Exportar PDF",
      loading: "A carregar o orçamento...",
      notFound: "Orçamento não encontrado",
    },
    statut: {
      signe: "Assinado",
      nouveau: "Novo",
    },
    dates: {
      creeLe: "Criado a",
      a: "às",
      signeLe: "Assinado a",
      derniereModification: "Última modificação:",
    },
    entreprise: {
      title: "Informações da empresa",
      raisonSociale: "Denominação social",
      siret: "SIRET",
      codeAPE: "Código APE",
      tvaIntracommunautaire: "NIF Intracomunitário",
      adresse: "Morada",
      siteInternet: "Website",
    },
    contact: {
      title: "Pessoa de contacto",
      nomComplet: "Nome completo",
      fonction: "Função",
      email: "Email",
      telephonePortable: "Telemóvel",
      telephoneFixe: "Telefone fixo",
    },
    postes: {
      title: "Posições a preencher",
      nationalite: "Nacionalidade",
      salaireBrut: "Salário bruto",
      tauxHoraireBrut: "Taxa horária bruta",
      coefficientETT: "Coeficiente agência",
      tauxETT: "Taxa agência",
    },
    conditions: {
      title: "Condições de trabalho",
      dateDebut: "Data de início",
      dateFin: "Data de fim",
      periodeEssai: "Período experimental",
      baseHoraire: "Base horária",
      heuresMois: "h/mês",
      lieuxMission: "Locais da missão",
      motifRecours: "Motivo do recurso",
    },
    exigences: {
      title: "Requisitos candidatos",
      experience: "Experiência",
      competences: "Competências",
      langues: "Línguas",
      permis: "Cartas",
      epi: "EPI",
    },
    calculs: {
      title: "Cálculos tarifários",
      salaireBrut: "Salário bruto",
      coefficientETT: "Coeficiente agência",
      tauxHoraireBrut: "Taxa horária bruta",
      tauxETT: "Taxa agência",
      baseHoraire: "Base horária",
      coutMensuel: "Custo mensal",
      duree: "Duração",
      coutTotal: "Custo total",
    },
    signature: {
      title: "Assinatura eletrónica",
      intro: "Confirmo que li e aceito as condições deste orçamento.",
      nomComplet: {
        label: "Nome completo",
        placeholder: "João Silva",
      },
      email: {
        label: "Email de confirmação",
        placeholder: "joao.silva@empresa.pt",
      },
      checkbox: "Aceito os termos e condições gerais de venda",
      boutonSigner: "Assinar eletronicamente",
      enCours: "Assinatura em curso...",
      succes: "✓ Orçamento assinado com sucesso!",
      erreur: "Erro ao assinar. Por favor, tente novamente.",
    },
    actions: {
      modifier: "Modificar o orçamento",
      telecharger: "Descarregar PDF",
      partager: "Partilhar",
    },
  },
};