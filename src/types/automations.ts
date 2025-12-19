// Types pour le système d'automatisation YoJob

export type TriggerType = 
  | 'prospect_created'
  | 'status_changed'
  | 'tag_added'
  | 'inactivity'
  | 'scheduled'
  | 'event_reached';

export type ConditionType = 
  | 'prospect_type'
  | 'country'
  | 'source'
  | 'status'
  | 'tag_has'
  | 'response_received';

export type ActionType = 
  | 'send_email'
  | 'create_task'
  | 'update_prospect'
  | 'send_webhook'
  | 'add_tag'
  | 'change_status'
  | 'notify_team';

export type WorkflowStatus = 'active' | 'draft' | 'paused' | 'archived';
export type RunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type EmailStatus = 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced' | 'failed';

export interface AutomationTrigger {
  type: TriggerType;
  config: {
    status_from?: string;
    status_to?: string;
    tag_name?: string;
    days_inactive?: number;
    schedule_cron?: string; // "0 9 * * 1-5" = tous les jours ouvrés à 9h
  };
}

export interface AutomationCondition {
  type: ConditionType;
  operator: 'equals' | 'not_equals' | 'contains' | 'in';
  value: string | string[];
}

export interface AutomationStep {
  id: string;
  type: ActionType;
  delay_minutes?: number; // 0 = immédiat, 2880 = 2 jours
  config: {
    // Email
    template_id?: string;
    subject?: string;
    body?: string;
    
    // Task
    task_title?: string;
    task_type?: string;
    
    // Update prospect
    field_name?: string;
    field_value?: string;
    
    // Webhook
    webhook_url?: string;
    webhook_method?: 'POST' | 'GET';
    webhook_headers?: Record<string, string>;
    
    // Tag
    tag_name?: string;
    
    // Status
    new_status?: string;
    
    // Notification
    message?: string;
    notify_users?: string[];
  };
  branch_on_condition?: AutomationCondition; // Si condition = true, exécute ce step
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  steps: AutomationStep[];
  stats: {
    total_runs: number;
    success_runs: number;
    failed_runs: number;
    conversion_rate: number; // % de prospects convertis
  };
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface AutomationRun {
  id: string;
  workflow_id: string;
  workflow_name: string;
  prospect_id: string;
  prospect_name: string;
  prospect_email: string;
  status: RunStatus;
  current_step: number;
  total_steps: number;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
  metadata: {
    emails_sent: number;
    tasks_created: number;
    webhooks_called: number;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body_html: string;
  body_text: string;
  variables: string[]; // ['{{name}}', '{{company}}', '{{country}}']
  category: 'waitlist' | 'agency' | 'client' | 'followup' | 'custom';
  language: 'fr' | 'en';
  created_at: string;
  updated_at: string;
  usage_count: number;
}

export interface EmailMessage {
  id: string;
  prospect_id: string;
  prospect_email: string;
  template_id: string | null;
  template_name: string | null;
  workflow_run_id: string | null;
  subject: string;
  body_html: string;
  status: EmailStatus;
  sent_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  replied_at: string | null;
  bounced_at: string | null;
  error_message: string | null;
  metadata: {
    opens_count: number;
    clicks_count: number;
    user_agent: string | null;
  };
}

export interface AutomationLog {
  id: string;
  workflow_id: string;
  run_id: string;
  step_id: string;
  action_type: ActionType;
  status: 'success' | 'error' | 'skipped';
  message: string;
  payload: any;
  error_details: string | null;
  created_at: string;
}

export interface SMTPSettings {
  host: string;
  port: number;
  secure: boolean; // TLS/SSL
  user: string;
  password_encrypted: string;
  from_name: string;
  from_email: string;
  reply_to: string | null;
  bcc: string | null;
  daily_limit: number;
  hourly_limit: number;
  quiet_hours_start: string; // "22:00"
  quiet_hours_end: string; // "08:00"
  working_days_only: boolean;
  signature_html: string;
  unsubscribe_footer: string;
  last_test_at: string | null;
  last_test_status: 'success' | 'failed' | null;
}

// Séquences pré-configurées (templates de workflows)
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'waitlist' | 'agency' | 'client' | 'reactivation';
  icon: string;
  color: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  steps: Omit<AutomationStep, 'id'>[]; // Sans ID car généré à la création
  estimated_duration_days: number;
}
