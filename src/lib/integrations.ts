/**
 * HELPERS POUR GÉRER LES INTÉGRATIONS
 * ====================================
 * Fonctions pour CRUD des intégrations depuis le dashboard
 */

import { supabase } from './supabase';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface Integration {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  type: 'api' | 'webhook' | 'mcp' | 'database';
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  description: string;
  config: {
    url?: string;
    apiKey?: string;
    method?: string;
    headers?: Record<string, string>;
    retryEnabled?: boolean;
    maxRetries?: number;
    rateLimit?: number;
    timeout?: number;
  };
  oauth?: {
    provider?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    scopes?: string[];
  };
  stats?: {
    totalCalls: number;
    successCalls: number;
    errorCalls: number;
    avgResponseTime: number;
    lastCallAt?: string;
  };
  last_sync?: string;
  deleted_at?: string;
}

/**
 * Récupérer toutes les intégrations actives
 */
export async function getAllIntegrations(): Promise<Integration[]> {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching integrations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Créer une nouvelle intégration
 */
export async function createIntegration(integration: Omit<Integration, 'id' | 'created_at' | 'updated_at'>): Promise<Integration> {
  const { data, error } = await supabase
    .from('integrations')
    .insert([integration])
    .select()
    .single();

  if (error) {
    console.error('Error creating integration:', error);
    throw error;
  }

  return data;
}

/**
 * Mettre à jour une intégration
 */
export async function updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration> {
  const { data, error } = await supabase
    .from('integrations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating integration:', error);
    throw error;
  }

  return data;
}

/**
 * Supprimer une intégration (soft delete)
 */
export async function deleteIntegration(id: string): Promise<void> {
  const { error } = await supabase
    .from('integrations')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error deleting integration:', error);
    throw error;
  }
}

/**
 * Tester une intégration
 */
export async function testIntegration(integration: Integration): Promise<any> {
  const supabaseUrl = `https://${projectId}.supabase.co`;
  
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/make-server-10092a63/integrations/test`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(integration)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Test failed');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error testing integration:', error);
    throw error;
  }
}

/**
 * Récupérer les logs d'une intégration
 */
export async function getIntegrationLogs(integrationId: string, limit = 50) {
  const { data, error } = await supabase
    .from('integration_logs')
    .select('*')
    .eq('integration_id', integrationId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching integration logs:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les statistiques globales des intégrations
 */
export async function getIntegrationsStats() {
  const integrations = await getAllIntegrations();
  
  const totalIntegrations = integrations.length;
  const activeIntegrations = integrations.filter(i => i.status === 'connected').length;
  
  const totalCalls = integrations.reduce((sum, i) => sum + (i.stats?.totalCalls || 0), 0);
  const successCalls = integrations.reduce((sum, i) => sum + (i.stats?.successCalls || 0), 0);
  const errorCalls = integrations.reduce((sum, i) => sum + (i.stats?.errorCalls || 0), 0);
  
  const avgResponseTime = integrations.reduce((sum, i) => sum + (i.stats?.avgResponseTime || 0), 0) / totalIntegrations || 0;
  
  return {
    totalIntegrations,
    activeIntegrations,
    inactiveIntegrations: totalIntegrations - activeIntegrations,
    totalCalls,
    successCalls,
    errorCalls,
    successRate: totalCalls > 0 ? (successCalls / totalCalls) * 100 : 0,
    avgResponseTime: Math.round(avgResponseTime)
  };
}
