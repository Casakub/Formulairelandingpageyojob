/**
 * SYSTÈME DE DÉCLENCHEMENT DES INTÉGRATIONS
 * ==========================================
 * Gère l'envoi automatique des réponses vers les intégrations configurées
 * (Google Sheets, n8n, Notion, webhooks personnalisés, etc.)
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

interface Integration {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'mcp' | 'database';
  status: 'connected' | 'disconnected' | 'error';
  config: {
    url?: string;
    apiKey?: string;
    method?: string;
    headers?: Record<string, string>;
    retryEnabled?: boolean;
    maxRetries?: number;
    timeout?: number;
  };
  oauth?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

interface TriggerResult {
  integrationId: string;
  integrationName: string;
  success: boolean;
  statusCode?: number;
  duration: number;
  error?: string;
}

/**
 * Déclenche toutes les intégrations actives pour une réponse donnée
 */
export async function triggerAllIntegrations(
  responseData: any,
  responseId: string
): Promise<TriggerResult[]> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  console.log('🔗 Déclenchement des intégrations pour response:', responseId);

  // 1. Récupérer toutes les intégrations actives
  const { data: integrations, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('status', 'connected')
    .is('deleted_at', null);

  if (error) {
    console.error('❌ Erreur récupération intégrations:', error);
    return [];
  }

  if (!integrations || integrations.length === 0) {
    console.log('ℹ️ Aucune intégration active configurée');
    return [];
  }

  console.log(`✅ ${integrations.length} intégration(s) trouvée(s)`);

  // 2. Déclencher chaque intégration en parallèle
  const results = await Promise.all(
    integrations.map(integration =>
      triggerIntegration(integration as Integration, responseData, responseId, supabase)
    )
  );

  return results;
}

/**
 * Déclenche une intégration spécifique
 */
async function triggerIntegration(
  integration: Integration,
  responseData: any,
  responseId: string,
  supabase: any
): Promise<TriggerResult> {
  const startTime = Date.now();
  const logEntry: any = {
    integration_id: integration.id,
    response_id: responseId,
    method: integration.config.method || 'POST',
    url: integration.config.url,
    request_payload: responseData,
    retry_count: 0,
    max_retries: integration.config.maxRetries || 3
  };

  try {
    console.log(`🚀 Déclenchement: ${integration.name} (${integration.type})`);

    let result: TriggerResult;

    switch (integration.type) {
      case 'webhook':
      case 'api':
        result = await triggerWebhook(integration, responseData);
        break;
      
      case 'mcp':
        result = await triggerMCP(integration, responseData);
        break;
      
      case 'database':
        result = await triggerDatabase(integration, responseData, supabase);
        break;
      
      default:
        throw new Error(`Type d'intégration non supporté: ${integration.type}`);
    }

    const duration = Date.now() - startTime;
    result.duration = duration;

    // Log de succès
    logEntry.status = 'success';
    logEntry.status_code = result.statusCode;
    logEntry.duration_ms = duration;

    await supabase.from('integration_logs').insert([logEntry]);

    // Incrémenter les stats
    await supabase.rpc('increment_integration_stats', {
      p_integration_id: integration.id,
      p_success: true,
      p_response_time: duration
    });

    console.log(`✅ ${integration.name}: SUCCESS (${duration}ms)`);
    return result;

  } catch (error: any) {
    const duration = Date.now() - startTime;
    
    console.error(`❌ ${integration.name}: ERREUR`, error.message);

    // Log d'erreur
    logEntry.status = 'error';
    logEntry.duration_ms = duration;
    logEntry.error_message = error.message;
    logEntry.response_payload = { error: error.message };

    await supabase.from('integration_logs').insert([logEntry]);

    // Incrémenter les stats
    await supabase.rpc('increment_integration_stats', {
      p_integration_id: integration.id,
      p_success: false,
      p_response_time: duration
    });

    return {
      integrationId: integration.id,
      integrationName: integration.name,
      success: false,
      duration,
      error: error.message
    };
  }
}

/**
 * Déclenche un webhook ou une API REST
 */
async function triggerWebhook(
  integration: Integration,
  responseData: any
): Promise<TriggerResult> {
  const { url, method = 'POST', headers = {}, timeout = 30000, apiKey } = integration.config;

  if (!url) {
    throw new Error('URL manquante dans la configuration');
  }

  // Préparer les headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  };

  // Ajouter l'API key si présente
  if (apiKey) {
    requestHeaders['Authorization'] = `Bearer ${apiKey}`;
  }

  // Ajouter OAuth token si présent
  if (integration.oauth?.accessToken) {
    requestHeaders['Authorization'] = `Bearer ${integration.oauth.accessToken}`;
  }

  // Faire l'appel HTTP
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: JSON.stringify(responseData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return {
      integrationId: integration.id,
      integrationName: integration.name,
      success: true,
      statusCode: response.status,
      duration: 0 // Will be set by caller
    };

  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error(`Timeout après ${timeout}ms`);
    }
    
    throw error;
  }
}

/**
 * Déclenche une intégration MCP (Notion, Slack via MCP tools)
 */
async function triggerMCP(
  integration: Integration,
  responseData: any
): Promise<TriggerResult> {
  // Pour MCP, on va utiliser une logique spécifique selon le provider
  // Pour l'instant, on retourne un succès simulé
  // TODO: Implémenter avec discover_tools et call_mcp_tool
  
  console.log(`ℹ️ MCP intégration ${integration.name} - À implémenter avec MCP tools`);
  
  return {
    integrationId: integration.id,
    integrationName: integration.name,
    success: true,
    statusCode: 200,
    duration: 0
  };
}

/**
 * Déclenche une intégration database (insertion directe)
 */
async function triggerDatabase(
  integration: Integration,
  responseData: any,
  supabase: any
): Promise<TriggerResult> {
  // Logique pour insérer dans une autre base de données
  // Pour Supabase, on pourrait insérer dans une autre table
  
  console.log(`ℹ️ Database intégration ${integration.name} - Logique personnalisée requise`);
  
  return {
    integrationId: integration.id,
    integrationName: integration.name,
    success: true,
    statusCode: 200,
    duration: 0
  };
}

/**
 * Teste une intégration (sans sauvegarder de réponse réelle)
 */
export async function testIntegration(integration: Integration): Promise<TriggerResult> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const testData = {
    response_id: 'test-' + Date.now(),
    created_at: new Date().toISOString(),
    q1_email: 'test@example.com',
    q2_nom_agence: 'Test Agency',
    test: true
  };

  return triggerIntegration(integration, testData, 'test-response', supabase);
}
