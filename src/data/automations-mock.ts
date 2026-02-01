import type { 
  AutomationWorkflow, 
  AutomationRun, 
  EmailTemplate, 
  EmailMessage,
  WorkflowTemplate,
  SMTPSettings,
  AutomationLog
} from '../types/automations';

// Templates d'emails pré-configurés
export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-waitlist-welcome',
    name: 'Waitlist - Bienvenue',
    description: 'Premier email envoyé aux inscrits à la waitlist marketplace',
    subject: '🎉 Bienvenue sur la liste d\'attente YoJob !',
    body_html: `
      <p>Bonjour {{name}},</p>
      <p>Merci de votre intérêt pour notre future marketplace européenne de recrutement !</p>
      <p>Vous êtes désormais inscrit(e) et serez parmi les premiers à découvrir la plateforme lors de son lancement en 2025.</p>
      <p><strong>Ce que vous allez adorer :</strong></p>
      <ul>
        <li>✓ Accès à 500+ agences dans 27 pays</li>
        <li>✓ Comparaison instantanée des offres</li>
        <li>✓ Avis vérifiés et mise en relation directe</li>
      </ul>
      <p>À très bientôt,<br>L'équipe YoJob</p>
    `,
    body_text: 'Bonjour {{name}}, merci de votre inscription à notre waitlist...',
    variables: ['{{name}}', '{{email}}', '{{country}}'],
    category: 'waitlist',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 142,
  },
  {
    id: 'tpl-waitlist-value',
    name: 'Waitlist - Proposition de valeur',
    description: 'J+2 - Mise en avant des bénéfices',
    subject: 'Comment YoJob va révolutionner votre recrutement européen',
    body_html: `
      <p>Bonjour {{name}},</p>
      <p>Vous avez rejoint notre waitlist il y a 2 jours. Aujourd'hui, nous voulions partager avec vous comment YoJob va transformer le recrutement européen.</p>
      <p><strong>Le problème actuel :</strong></p>
      <p>Recruter à l'international est complexe : barrières linguistiques, conformité légale, agences peu fiables...</p>
      <p><strong>Notre solution :</strong></p>
      <p>Une marketplace unique qui centralise 500+ agences vérifiées, avec comparaison instantanée et garanties de conformité.</p>
      <p>🎯 <strong>Cas client :</strong> Une entreprise BTP a recruté 15 soudeurs polonais en 72h via notre réseau.</p>
      <p>Restez connecté(e) !<br>L'équipe YoJob</p>
    `,
    body_text: 'Bonjour {{name}}, découvrez comment YoJob révolutionne le recrutement...',
    variables: ['{{name}}', '{{company}}'],
    category: 'waitlist',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 98,
  },
  {
    id: 'tpl-agency-qualification',
    name: 'Agence ETT - Qualification',
    description: 'Email de qualification pour agences partenaires',
    subject: 'YoJob - Qualifions votre candidature',
    body_html: `
      <p>Bonjour {{name}},</p>
      <p>Merci pour votre intérêt à rejoindre le réseau YoJob en tant qu'agence partenaire.</p>
      <p>Pour avancer, nous aurions besoin de quelques informations complémentaires :</p>
      <ul>
        <li>Votre zone géographique de couverture</li>
        <li>Vos secteurs de spécialisation</li>
        <li>Votre volume de placements annuel</li>
        <li>Vos certifications / agréments</li>
      </ul>
      <p>Pouvons-nous organiser un call de 15 minutes cette semaine ?</p>
      <p>Répondez simplement à cet email avec vos disponibilités.</p>
      <p>Cordialement,<br>{{sender_name}}<br>YoJob Partnership Team</p>
    `,
    body_text: 'Bonjour {{name}}, qualifions votre candidature agence...',
    variables: ['{{name}}', '{{company}}', '{{country}}', '{{sender_name}}'],
    category: 'agency',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 67,
  },
  {
    id: 'tpl-client-followup',
    name: 'Client - Relance devis',
    description: 'Relance après envoi de devis',
    subject: 'Suite à votre demande de recrutement',
    body_html: `
      <p>Bonjour {{name}},</p>
      <p>Je reviens vers vous concernant votre besoin en recrutement {{need_type}} pour {{company}}.</p>
      <p>Avez-vous eu l'occasion de consulter notre proposition envoyée le {{quote_date}} ?</p>
      <p>Je reste disponible pour :</p>
      <ul>
        <li>Répondre à vos questions</li>
        <li>Ajuster l'offre à vos contraintes</li>
        <li>Organiser un point téléphonique</li>
      </ul>
      <p>N'hésitez pas à me contacter directement au {{phone}} ou via cet email.</p>
      <p>Cordialement,<br>{{sender_name}}</p>
    `,
    body_text: 'Bonjour {{name}}, suite à votre demande...',
    variables: ['{{name}}', '{{company}}', '{{need_type}}', '{{quote_date}}', '{{phone}}', '{{sender_name}}'],
    category: 'client',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 45,
  },
];

// Workflows pré-configurés
export const MOCK_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-waitlist-nurture',
    name: 'Waitlist - Nurturing 4 étapes',
    description: 'Séquence automatique pour les inscrits waitlist : J+0 welcome, J+2 value, J+7 case study, J+14 dernier rappel',
    status: 'active',
    trigger: {
      type: 'prospect_created',
      config: {},
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'waitlist' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-waitlist-welcome',
          subject: '🎉 Bienvenue sur la liste d\'attente YoJob !',
        },
      },
      {
        id: 'step-2',
        type: 'send_email',
        delay_minutes: 2880, // 2 jours
        config: {
          template_id: 'tpl-waitlist-value',
          subject: 'Comment YoJob va révolutionner votre recrutement européen',
        },
      },
      {
        id: 'step-3',
        type: 'send_email',
        delay_minutes: 10080, // 7 jours
        config: {
          subject: '📊 Cas client : 15 soudeurs recrutés en 72h',
          body: 'Success story...',
        },
      },
      {
        id: 'step-4',
        type: 'send_email',
        delay_minutes: 20160, // 14 jours
        config: {
          subject: '⏰ Dernière chance - Lancement imminent',
          body: 'Dernier rappel avant lancement...',
        },
      },
    ],
    stats: {
      total_runs: 142,
      success_runs: 138,
      failed_runs: 4,
      conversion_rate: 12.7,
    },
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-agency-qualification',
    name: 'Agence ETT - Qualification + Call',
    description: 'Workflow de qualification des agences : email qualification J+0, relance J+3, création tâche "Call" J+5',
    status: 'active',
    trigger: {
      type: 'prospect_created',
      config: {},
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'agency' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-agency-qualification',
          subject: 'YoJob - Qualifions votre candidature',
        },
      },
      {
        id: 'step-2',
        type: 'send_email',
        delay_minutes: 4320, // 3 jours
        config: {
          subject: 'Relance - Rejoindre le réseau YoJob',
          body: 'Avez-vous pu consulter notre email précédent ?',
        },
        branch_on_condition: {
          type: 'response_received',
          operator: 'equals',
          value: 'false',
        },
      },
      {
        id: 'step-3',
        type: 'create_task',
        delay_minutes: 7200, // 5 jours
        config: {
          task_title: 'Appeler agence pour qualification',
          task_type: 'call',
        },
      },
      {
        id: 'step-4',
        type: 'change_status',
        delay_minutes: 7200,
        config: {
          new_status: 'qualified',
        },
      },
    ],
    stats: {
      total_runs: 67,
      success_runs: 65,
      failed_runs: 2,
      conversion_rate: 38.8,
    },
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-client-followup',
    name: 'Client - Relance devis',
    description: 'Relance automatique après envoi devis : J+2 reminder, J+5 dernière relance, J+7 création tâche call',
    status: 'active',
    trigger: {
      type: 'status_changed',
      config: {
        status_to: 'qualified',
      },
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'client' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 2880, // 2 jours
        config: {
          template_id: 'tpl-client-followup',
          subject: 'Suite à votre demande de recrutement',
        },
      },
      {
        id: 'step-2',
        type: 'send_email',
        delay_minutes: 7200, // 5 jours total
        config: {
          subject: 'Dernière relance - Votre projet de recrutement',
          body: 'Dernier rappel concernant votre besoin...',
        },
      },
      {
        id: 'step-3',
        type: 'create_task',
        delay_minutes: 10080, // 7 jours
        config: {
          task_title: 'Appeler client - Clôture devis',
          task_type: 'call',
        },
      },
    ],
    stats: {
      total_runs: 45,
      success_runs: 43,
      failed_runs: 2,
      conversion_rate: 26.7,
    },
    created_at: '2024-11-25T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-inactivity-reactivation',
    name: 'Réactivation - Inactivité 30 jours',
    description: 'Workflow déclenché après 30 jours sans activité sur un prospect',
    status: 'paused',
    trigger: {
      type: 'inactivity',
      config: {
        days_inactive: 30,
      },
    },
    conditions: [
      { type: 'status', operator: 'not_equals', value: 'converted' },
      { type: 'status', operator: 'not_equals', value: 'lost' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          subject: 'On vous a perdu de vue... 🔍',
          body: 'Bonjour, cela fait un moment que nous n\'avons pas échangé...',
        },
      },
      {
        id: 'step-2',
        type: 'add_tag',
        delay_minutes: 0,
        config: {
          tag_name: 'Réactivation',
        },
      },
    ],
    stats: {
      total_runs: 23,
      success_runs: 21,
      failed_runs: 2,
      conversion_rate: 8.7,
    },
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z',
    created_by: 'admin',
  },
];

// Runs récents
export const MOCK_AUTOMATION_RUNS: AutomationRun[] = [
  {
    id: 'run-001',
    workflow_id: 'wf-waitlist-nurture',
    workflow_name: 'Waitlist - Nurturing 4 étapes',
    prospect_id: 'p-001',
    prospect_name: 'Marie Dubois',
    prospect_email: 'marie.dubois@exemple.fr',
    status: 'running',
    current_step: 2,
    total_steps: 4,
    started_at: '2024-12-16T14:30:00Z',
    completed_at: null,
    error_message: null,
    metadata: {
      emails_sent: 2,
      tasks_created: 0,
      webhooks_called: 0,
    },
  },
  {
    id: 'run-002',
    workflow_id: 'wf-agency-qualification',
    workflow_name: 'Agence ETT - Qualification + Call',
    prospect_id: 'p-002',
    prospect_name: 'Recrut Pro SARL',
    prospect_email: 'contact@recrutpro.de',
    status: 'completed',
    current_step: 4,
    total_steps: 4,
    started_at: '2024-12-10T09:00:00Z',
    completed_at: '2024-12-15T16:45:00Z',
    error_message: null,
    metadata: {
      emails_sent: 2,
      tasks_created: 1,
      webhooks_called: 0,
    },
  },
  {
    id: 'run-003',
    workflow_id: 'wf-client-followup',
    workflow_name: 'Client - Relance devis',
    prospect_id: 'p-003',
    prospect_name: 'BTP Solutions',
    prospect_email: 'rh@btpsolutions.fr',
    status: 'failed',
    current_step: 1,
    total_steps: 3,
    started_at: '2024-12-18T10:00:00Z',
    completed_at: '2024-12-18T10:01:00Z',
    error_message: 'SMTP error: Connection timeout',
    metadata: {
      emails_sent: 0,
      tasks_created: 0,
      webhooks_called: 0,
    },
  },
];

// Logs d'exécution
export const MOCK_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'log-001',
    workflow_id: 'wf-waitlist-nurture',
    run_id: 'run-001',
    step_id: 'step-1',
    action_type: 'send_email',
    status: 'success',
    message: 'Email "Bienvenue sur la liste d\'attente" envoyé avec succès',
    payload: {
      to: 'marie.dubois@exemple.fr',
      subject: '🎉 Bienvenue sur la liste d\'attente YoJob !',
      template_id: 'tpl-waitlist-welcome',
    },
    error_details: null,
    created_at: '2024-12-16T14:30:05Z',
  },
  {
    id: 'log-002',
    workflow_id: 'wf-waitlist-nurture',
    run_id: 'run-001',
    step_id: 'step-2',
    action_type: 'send_email',
    status: 'success',
    message: 'Email "Proposition de valeur" envoyé avec succès',
    payload: {
      to: 'marie.dubois@exemple.fr',
      subject: 'Comment YoJob va révolutionner votre recrutement européen',
    },
    error_details: null,
    created_at: '2024-12-18T14:30:05Z',
  },
  {
    id: 'log-003',
    workflow_id: 'wf-client-followup',
    run_id: 'run-003',
    step_id: 'step-1',
    action_type: 'send_email',
    status: 'error',
    message: 'Échec envoi email - timeout SMTP',
    payload: {
      to: 'rh@btpsolutions.fr',
    },
    error_details: 'SMTP server not responding after 30s timeout',
    created_at: '2024-12-18T10:01:00Z',
  },
];

// Templates de workflows (pré-configurés, prêts à être instanciés)
export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'template-waitlist',
    name: 'Nurturing Waitlist',
    description: 'Séquence de 4 emails pour engager les inscrits waitlist sur 14 jours',
    category: 'waitlist',
    icon: 'Rocket',
    color: 'from-amber-500 to-orange-500',
    trigger: {
      type: 'prospect_created',
      config: {},
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'waitlist' },
    ],
    steps: [
      {
        type: 'send_email',
        delay_minutes: 0,
        config: { template_id: 'tpl-waitlist-welcome' },
      },
      {
        type: 'send_email',
        delay_minutes: 2880,
        config: { template_id: 'tpl-waitlist-value' },
      },
      {
        type: 'send_email',
        delay_minutes: 10080,
        config: { subject: 'Case study', body: '...' },
      },
      {
        type: 'send_email',
        delay_minutes: 20160,
        config: { subject: 'Dernier rappel', body: '...' },
      },
    ],
    estimated_duration_days: 14,
  },
  {
    id: 'template-agency',
    name: 'Qualification Agence',
    description: 'Qualifiez et planifiez un call avec les agences partenaires',
    category: 'agency',
    icon: 'Briefcase',
    color: 'from-orange-500 to-red-500',
    trigger: {
      type: 'prospect_created',
      config: {},
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'agency' },
    ],
    steps: [
      {
        type: 'send_email',
        delay_minutes: 0,
        config: { template_id: 'tpl-agency-qualification' },
      },
      {
        type: 'send_email',
        delay_minutes: 4320,
        config: { subject: 'Relance', body: '...' },
      },
      {
        type: 'create_task',
        delay_minutes: 7200,
        config: { task_title: 'Call agence', task_type: 'call' },
      },
    ],
    estimated_duration_days: 5,
  },
  {
    id: 'template-client',
    name: 'Relance Devis Client',
    description: 'Relances automatiques après envoi d\'un devis',
    category: 'client',
    icon: 'Building2',
    color: 'from-blue-500 to-cyan-500',
    trigger: {
      type: 'status_changed',
      config: { status_to: 'qualified' },
    },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'client' },
    ],
    steps: [
      {
        type: 'send_email',
        delay_minutes: 2880,
        config: { template_id: 'tpl-client-followup' },
      },
      {
        type: 'send_email',
        delay_minutes: 7200,
        config: { subject: 'Dernière relance', body: '...' },
      },
      {
        type: 'create_task',
        delay_minutes: 10080,
        config: { task_title: 'Call closing', task_type: 'call' },
      },
    ],
    estimated_duration_days: 7,
  },
  {
    id: 'template-reactivation',
    name: 'Réactivation Inactifs',
    description: 'Relancez automatiquement les prospects inactifs depuis 30 jours',
    category: 'reactivation',
    icon: 'RefreshCw',
    color: 'from-purple-500 to-pink-500',
    trigger: {
      type: 'inactivity',
      config: { days_inactive: 30 },
    },
    conditions: [
      { type: 'status', operator: 'not_equals', value: 'converted' },
    ],
    steps: [
      {
        type: 'send_email',
        delay_minutes: 0,
        config: { subject: 'On vous a perdu...', body: '...' },
      },
      {
        type: 'add_tag',
        delay_minutes: 0,
        config: { tag_name: 'Réactivation' },
      },
    ],
    estimated_duration_days: 1,
  },
];

// Configuration SMTP
export const MOCK_SMTP_SETTINGS: SMTPSettings = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  user: 'contact@yojob.eu',
  password_encrypted: '••••••••••••',
  from_name: 'YoJob Team',
  from_email: 'contact@yojob.eu',
  reply_to: 'contact@yojob.eu',
  bcc: null,
  daily_limit: 500,
  hourly_limit: 50,
  quiet_hours_start: '22:00',
  quiet_hours_end: '08:00',
  working_days_only: true,
  signature_html: `
    <br><br>
    <p style="color: #6b7280; font-size: 13px;">
      —<br>
      <strong>L'équipe YoJob</strong><br>
      Recrutement européen simplifié<br>
      📧 contact@yojob.eu | 🌐 yojob.eu
    </p>
  `,
  unsubscribe_footer: `
    <p style="color: #9ca3af; font-size: 11px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
      Vous recevez cet email car vous êtes inscrit à YoJob. 
      <a href="{{unsubscribe_url}}" style="color: #06b6d4;">Se désinscrire</a>
    </p>
  `,
  last_test_at: '2024-12-18T09:30:00Z',
  last_test_status: 'success',
};
