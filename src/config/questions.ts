export interface Question {
  id: string;
  section: number;
  order: number;
  code: string;
  type: 'text' | 'textarea' | 'radio' | 'multi-select' | 'number' | 'email' | 'score';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: Array<{ value: string; label: string; icon?: string }>;
  visible: boolean;
  conditional?: {
    dependsOn: string;
    showWhen: string;
  };
  
  // 🆕 MULTI-PROFILS SUPPORT (optionnel pour backward compatibility)
  visibleFor?: ('agency' | 'client' | 'worker')[]; // Par défaut: ['agency']
  category?: 'profile' | 'experience' | 'needs' | 'interest' | 'vision' | 'contact'; // Catégorie de la question
}

export const DEFAULT_QUESTIONS: Question[] = [
  // ========== SECTION 1: Profil Agence ==========
  {
    id: 'q1',
    section: 1,
    order: 1,
    code: 'q1_nom',
    type: 'text',
    label: 'Nom de l\'agence',
    placeholder: 'Ex: CEA Personalmanagement',
    required: true,
    visible: true
  },
  {
    id: 'q2',
    section: 1,
    order: 2,
    code: 'q2_annee',
    type: 'number',
    label: 'Année de création',
    placeholder: 'Ex: 2010',
    required: true,
    visible: true
  },
  {
    id: 'q3',
    section: 1,
    order: 3,
    code: 'q3_taille',
    type: 'radio',
    label: 'Taille de l\'agence',
    required: true,
    visible: true,
    options: [
      { value: '1-5', label: '1-5 personnes', icon: '👤' },
      { value: '6-50', label: '6-50 personnes', icon: '👥' },
      { value: '51-250', label: '51-250 personnes', icon: '🏢' },
      { value: '250+', label: '250+ personnes', icon: '🏛️' }
    ]
  },
  {
    id: 'q4',
    section: 1,
    order: 4,
    code: 'q4_secteurs',
    type: 'multi-select',
    label: 'Principaux secteurs d\'activité',
    required: true,
    visible: true,
    options: [
      { value: 'btp', label: 'BTP / Construction', icon: '🏗️' },
      { value: 'industrie', label: 'Industrie manufacturière', icon: '⚙️' },
      { value: 'logistique', label: 'Logistique / Transport', icon: '🚚' },
      { value: 'hotellerie', label: 'Hôtellerie / Restauration', icon: '🍽️' },
      { value: 'sante', label: 'Santé / Médical', icon: '⚕️' },
      { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
      { value: 'services', label: 'Services aux entreprises', icon: '💼' },
      { value: 'autre', label: 'Autre', icon: '📌' }
    ]
  },

  // ========== SECTION 2: Détachement ==========
  {
    id: 'q5',
    section: 2,
    order: 1,
    code: 'q5_pays',
    type: 'text',
    label: 'Pays d\'origine de votre agence',
    placeholder: 'Ex: Pologne',
    required: true,
    visible: true
  },
  {
    id: 'q6',
    section: 2,
    order: 2,
    code: 'q6_volume',
    type: 'radio',
    label: 'Volume annuel de détachements',
    required: true,
    visible: true,
    options: [
      { value: '0', label: 'Aucun (pas encore)', icon: '⭕' },
      { value: '1-50', label: '1-50 travailleurs', icon: '📊' },
      { value: '51-200', label: '51-200 travailleurs', icon: '📈' },
      { value: '201-500', label: '201-500 travailleurs', icon: '🚀' },
      { value: '500+', label: '500+ travailleurs', icon: '⭐' }
    ]
  },
  {
    id: 'q7',
    section: 2,
    order: 3,
    code: 'q7_origine',
    type: 'text',
    label: 'Principaux pays d\'origine de vos travailleurs détachés',
    placeholder: 'Ex: Pologne, Ukraine, Roumanie',
    required: false,
    visible: true
  },
  {
    id: 'q8',
    section: 2,
    order: 4,
    code: 'q8_destinations',
    type: 'textarea',
    label: 'Principaux pays de destination (où vous détachez)',
    placeholder: 'Ex: France, Allemagne, Belgique, Pays-Bas...',
    required: true,
    visible: true
  },
  {
    id: 'q9',
    section: 2,
    order: 5,
    code: 'q9_defi',
    type: 'radio',
    label: 'Principal défi du détachement européen',
    required: true,
    visible: true,
    options: [
      { value: 'admin', label: 'Complexité administrative (A1, SIPSI...)', icon: '📋' },
      { value: 'conformite', label: 'Conformité légale multiples pays', icon: '⚖️' },
      { value: 'cout', label: 'Coûts et temps de gestion', icon: '💰' },
      { value: 'langues', label: 'Barrières linguistiques', icon: '🌐' },
      { value: 'autre', label: 'Autre', icon: '❓' }
    ]
  },
  {
    id: 'q9_autre',
    section: 2,
    order: 6,
    code: 'q9_autre',
    type: 'text',
    label: 'Précisez votre principal défi',
    placeholder: 'Décrivez votre défi...',
    required: false,
    visible: true,
    conditional: {
      dependsOn: 'q9_defi',
      showWhen: 'autre'
    }
  },
  {
    id: 'q10',
    section: 2,
    order: 7,
    code: 'q10_gestion',
    type: 'radio',
    label: 'Comment gérez-vous actuellement vos détachements ?',
    required: true,
    visible: true,
    options: [
      { value: 'interne', label: 'Équipe interne dédiée', icon: '👥' },
      { value: 'externe', label: 'Prestataire externe / Cabinet', icon: '🏢' },
      { value: 'mixte', label: 'Mixte (interne + externe)', icon: '🔄' },
      { value: 'manuel', label: 'Gestion manuelle (Excel, emails)', icon: '📊' },
      { value: 'logiciel', label: 'Logiciel spécialisé', icon: '💻' }
    ]
  },
  {
    id: 'q11',
    section: 2,
    order: 8,
    code: 'q11_incidents',
    type: 'radio',
    label: 'Avez-vous déjà eu des incidents de conformité ?',
    required: true,
    visible: true,
    options: [
      { value: 'jamais', label: 'Non, jamais', icon: '✅' },
      { value: 'rarement', label: 'Rarement (1-2 fois)', icon: '⚠️' },
      { value: 'parfois', label: 'Parfois (3-5 fois)', icon: '🔴' },
      { value: 'souvent', label: 'Souvent (6+ fois)', icon: '🚨' }
    ]
  },

  // ========== SECTION 3: Besoins ==========
  {
    id: 'q12',
    section: 3,
    order: 1,
    code: 'q12_budget',
    type: 'radio',
    label: 'Budget actuel pour la gestion du détachement',
    required: true,
    visible: true,
    options: [
      { value: '0-5k', label: '0-5 000 € / an', icon: '💵' },
      { value: '5-15k', label: '5 000-15 000 € / an', icon: '💰' },
      { value: '15-30k', label: '15 000-30 000 € / an', icon: '💸' },
      { value: '30k+', label: '30 000+ € / an', icon: '🏦' },
      { value: 'inconnu', label: 'Je ne sais pas', icon: '❓' }
    ]
  },
  {
    id: 'q13',
    section: 3,
    order: 2,
    code: 'q13_manque_gagner',
    type: 'radio',
    label: 'Estimez-vous avoir un manque à gagner dû aux contraintes du détachement ?',
    required: true,
    visible: true,
    options: [
      { value: 'non', label: 'Non, pas vraiment', icon: '✅' },
      { value: 'faible', label: 'Oui, faible (< 5% CA)', icon: '📉' },
      { value: 'moyen', label: 'Oui, moyen (5-15% CA)', icon: '📊' },
      { value: 'important', label: 'Oui, important (> 15% CA)', icon: '🔴' }
    ]
  },
  {
    id: 'q14',
    section: 3,
    order: 3,
    code: 'q14_risques',
    type: 'multi-select',
    label: 'Quels risques vous préoccupent le plus ?',
    required: true,
    visible: true,
    options: [
      { value: 'amendes', label: 'Amendes et sanctions', icon: '💸' },
      { value: 'reputation', label: 'Réputation / Image', icon: '🏆' },
      { value: 'penal', label: 'Responsabilité pénale', icon: '⚖️' },
      { value: 'delais', label: 'Retards dans les missions', icon: '⏰' },
      { value: 'clients', label: 'Perte de clients', icon: '📉' },
      { value: 'aucun', label: 'Aucun risque majeur', icon: '✅' }
    ]
  },
  {
    id: 'q15',
    section: 3,
    order: 4,
    code: 'q15_probleme',
    type: 'textarea',
    label: 'Quel est votre plus gros problème aujourd\'hui avec le détachement ?',
    placeholder: 'Décrivez en quelques phrases...',
    required: true,
    visible: true
  },
  {
    id: 'q16',
    section: 3,
    order: 5,
    code: 'q16_erp',
    type: 'radio',
    label: 'Utilisez-vous un ERP ou logiciel de gestion ?',
    required: true,
    visible: true,
    options: [
      { value: 'sage', label: 'Sage', icon: '📘' },
      { value: 'sap', label: 'SAP', icon: '🔷' },
      { value: 'cegid', label: 'Cegid', icon: '📗' },
      { value: 'bullhorn', label: 'Bullhorn / ATS spécialisé', icon: '🎯' },
      { value: 'autre', label: 'Autre', icon: '💼' },
      { value: 'aucun', label: 'Aucun ERP', icon: '❌' }
    ]
  },
  {
    id: 'q16_autre',
    section: 3,
    order: 6,
    code: 'q16_autre',
    type: 'text',
    label: 'Précisez votre ERP',
    placeholder: 'Nom du logiciel...',
    required: false,
    visible: true,
    conditional: {
      dependsOn: 'q16_erp',
      showWhen: 'autre'
    }
  },
  {
    id: 'q17',
    section: 3,
    order: 7,
    code: 'q17_migration',
    type: 'radio',
    label: 'Seriez-vous prêt à migrer vers une nouvelle solution ?',
    required: true,
    visible: true,
    options: [
      { value: 'oui', label: 'Oui, sans problème', icon: '✅' },
      { value: 'conditions', label: 'Oui, sous conditions', icon: '⚠️' },
      { value: 'difficile', label: 'Difficile, mais ouvert', icon: '🤔' },
      { value: 'non', label: 'Non, pas envisageable', icon: '❌' }
    ]
  },

  // ========== SECTION 4: Intérêt YoJob ==========
  {
    id: 'q18',
    section: 4,
    order: 1,
    code: 'q18_score',
    type: 'score',
    label: 'Sur une échelle de 1 à 10, quelle est votre intérêt pour une plateforme YoJob qui simplifie le détachement européen ?',
    required: true,
    visible: true
  },
  {
    id: 'q19',
    section: 4,
    order: 2,
    code: 'q19_features',
    type: 'multi-select',
    label: 'Quelles fonctionnalités vous intéressent le plus ?',
    required: true,
    visible: true,
    options: [
      { value: 'sipsi', label: 'Déclaration SIPSI automatisée', icon: '🤖' },
      { value: 'a1', label: 'Gestion certificats A1', icon: '📜' },
      { value: 'conformite', label: 'Dashboard conformité multi-pays', icon: '📊' },
      { value: 'alertes', label: 'Alertes & renouvellements', icon: '🔔' },
      { value: 'documents', label: 'Centralisation documents', icon: '📁' },
      { value: 'marketplace', label: 'Marketplace agences européennes', icon: '🛒' },
      { value: 'support', label: 'Support expert multilingue', icon: '💬' },
      { value: 'api', label: 'Intégration API (ERP)', icon: '🔌' }
    ]
  },
  {
    id: 'q20',
    section: 4,
    order: 3,
    code: 'q20_prix',
    type: 'radio',
    label: 'Quel modèle de tarification préféreriez-vous ?',
    required: true,
    visible: true,
    options: [
      { value: 'mensuel', label: 'Abonnement mensuel fixe', icon: '📆' },
      { value: 'detache', label: 'Prix par travailleur détaché', icon: '👤' },
      { value: 'usage', label: 'Pay-as-you-go (à l\'usage)', icon: '💳' },
      { value: 'annuel', label: 'Forfait annuel (avec réduction)', icon: '🎁' }
    ]
  },
  {
    id: 'q21',
    section: 4,
    order: 4,
    code: 'q21_budget_mensuel',
    type: 'radio',
    label: 'Quel budget mensuel seriez-vous prêt à investir ?',
    required: true,
    visible: true,
    options: [
      { value: '0-100', label: '0-100 € / mois', icon: '💵' },
      { value: '100-300', label: '100-300 € / mois', icon: '💰' },
      { value: '300-500', label: '300-500 € / mois', icon: '💸' },
      { value: '500-1000', label: '500-1 000 € / mois', icon: '💎' },
      { value: '1000+', label: '1 000+ € / mois', icon: '🏦' }
    ]
  },
  {
    id: 'q22',
    section: 4,
    order: 5,
    code: 'q22_mvp',
    type: 'radio',
    label: 'Seriez-vous prêt à tester un MVP (version beta) de YoJob ?',
    required: true,
    visible: true,
    options: [
      { value: 'oui_gratuit', label: 'Oui, gratuitement', icon: '🎁' },
      { value: 'oui_reduc', label: 'Oui, avec réduction', icon: '💰' },
      { value: 'peut_etre', label: 'Peut-être, selon features', icon: '🤔' },
      { value: 'non', label: 'Non, pas intéressé', icon: '❌' }
    ]
  },
  {
    id: 'q23',
    section: 4,
    order: 6,
    code: 'q23_role',
    type: 'radio',
    label: 'Quel est votre rôle dans la décision d\'achat ?',
    required: true,
    visible: true,
    options: [
      { value: 'decideur', label: 'Décideur final', icon: '👑' },
      { value: 'influenceur', label: 'Influenceur / Recommandation', icon: '🎯' },
      { value: 'utilisateur', label: 'Utilisateur final', icon: '👤' },
      { value: 'autre', label: 'Autre', icon: '❓' }
    ]
  },

  // ========== SECTION 5: Vision Future ==========
  {
    id: 'q24',
    section: 5,
    order: 1,
    code: 'q24_evolution',
    type: 'textarea',
    label: 'Comment voyez-vous évoluer le marché du détachement dans les 3 prochaines années ?',
    placeholder: 'Partagez votre vision...',
    required: true,
    visible: true
  },
  {
    id: 'q25',
    section: 5,
    order: 2,
    code: 'q25_besoins',
    type: 'textarea',
    label: 'Y a-t-il d\'autres besoins ou suggestions que vous aimeriez partager ?',
    placeholder: 'Vos suggestions nous intéressent...',
    required: false,
    visible: true
  },

  // ========== SECTION 6: Contact ==========
  {
    id: 'q26',
    section: 6,
    order: 1,
    code: 'email',
    type: 'email',
    label: 'Email professionnel',
    placeholder: 'votre.email@agence.com',
    required: true,
    visible: true
  }
];