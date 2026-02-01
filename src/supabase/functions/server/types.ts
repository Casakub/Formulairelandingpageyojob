/**
 * 🎯 TYPES SERVEUR
 * 
 * Types TypeScript nécessaires pour le serveur
 * (copie locale car le serveur ne peut pas importer depuis /types/ ou /src/)
 */

/**
 * Type de répondant à l'enquête
 */
export type RespondentType = 'agency' | 'client' | 'worker';

/**
 * Workflow d'automatisation
 */
export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'manual' | 'status_change' | 'schedule' | 'form_submission';
    config?: any;
  };
  conditions?: Array<{
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  }>;
  actions: Array<{
    type: 'send_email' | 'update_status' | 'create_task' | 'webhook';
    config: any;
  }>;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Template d'email pour automations
 */
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Exécution d'automation
 */
export interface AutomationRun {
  id: string;
  workflowId: string;
  prospectId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  error?: string;
  logs: AutomationLog[];
}

/**
 * Log d'automation
 */
export interface AutomationLog {
  id: string;
  runId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}
