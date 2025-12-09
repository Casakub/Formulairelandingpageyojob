import { createClient } from "npm:@supabase/supabase-js@2.39.3";

/**
 * 🔌 INTÉGRATIONS CRM EXTERNES
 * Webhooks sortants vers HubSpot, Salesforce, n8n, etc.
 */

interface Integration {
  id: string;
  name: string;
  type: 'hubspot' | 'salesforce' | 'n8n' | 'webhook' | 'zapier';
  enabled: boolean;
  config: {
    webhookUrl?: string;
    apiKey?: string;
    accessToken?: string;
    instance?: string;
    [key: string]: any;
  };
}

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * Envoyer vers HubSpot
 */
async function sendToHubSpot(prospect: any, config: any) {
  if (!config.accessToken) {
    throw new Error("HubSpot access token not configured");
  }

  const [firstName, ...lastNameParts] = (prospect.name || '').split(' ');

  const hubSpotContact = {
    properties: {
      email: prospect.email,
      firstname: firstName || '',
      lastname: lastNameParts.join(' ') || '',
      phone: prospect.phone || '',
      company: prospect.company || '',
      country: prospect.country_code || '',
      industry: prospect.sector || '',
      hs_lead_status: mapStatusToHubSpot(prospect.status),
      lead_source: prospect.source,
      message: prospect.message || '',
      yojob_prospect_id: prospect.id,
      yojob_type: prospect.type,
      yojob_score: prospect.score || 0,
    },
  };

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hubSpotContact),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot API error: ${error}`);
  }

  return await response.json();
}

/**
 * Envoyer vers Salesforce
 */
async function sendToSalesforce(prospect: any, config: any) {
  if (!config.accessToken || !config.instance) {
    throw new Error("Salesforce credentials not configured");
  }

  const [firstName, ...lastNameParts] = (prospect.name || prospect.email).split(' ');

  const salesforceLead = {
    FirstName: firstName || '',
    LastName: lastNameParts.join(' ') || prospect.email,
    Email: prospect.email,
    Phone: prospect.phone || '',
    Company: prospect.company || 'Unknown',
    Country: prospect.country_code || '',
    Industry: prospect.sector || '',
    Status: mapStatusToSalesforce(prospect.status),
    LeadSource: prospect.source,
    Description: prospect.message || '',
    YoJob_Prospect_ID__c: prospect.id,
    YoJob_Type__c: prospect.type,
    YoJob_Score__c: prospect.score || 0,
  };

  const response = await fetch(
    `https://${config.instance}.salesforce.com/services/data/v58.0/sobjects/Lead`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salesforceLead),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Salesforce API error: ${error}`);
  }

  return await response.json();
}

/**
 * Envoyer vers n8n
 */
async function sendToN8n(prospect: any, config: any) {
  if (!config.webhookUrl) {
    throw new Error("n8n webhook URL not configured");
  }

  const payload = {
    event: 'prospect.created',
    timestamp: new Date().toISOString(),
    prospect: {
      id: prospect.id,
      type: prospect.type,
      source: prospect.source,
      status: prospect.status,
      name: prospect.name,
      email: prospect.email,
      phone: prospect.phone,
      company: prospect.company,
      country: prospect.country_code,
      sector: prospect.sector,
      need_type: prospect.need_type,
      message: prospect.message,
      score: prospect.score,
      priority: prospect.priority,
      created_at: prospect.created_at,
      custom_fields: prospect.custom_fields,
    },
  };

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`n8n webhook error: ${error}`);
  }

  return { success: true, status: response.status };
}

/**
 * Envoyer vers Zapier / Webhook générique
 */
async function sendToWebhook(prospect: any, config: any) {
  if (!config.webhookUrl) {
    throw new Error("Webhook URL not configured");
  }

  const payload = {
    prospect_id: prospect.id,
    type: prospect.type,
    source: prospect.source,
    status: prospect.status,
    name: prospect.name,
    email: prospect.email,
    phone: prospect.phone,
    company: prospect.company,
    country: prospect.country_code,
    sector: prospect.sector,
    need_type: prospect.need_type,
    message: prospect.message,
    score: prospect.score,
    priority: prospect.priority,
    created_at: prospect.created_at,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Ajouter l'API key si fournie
  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Webhook error: ${error}`);
  }

  return { success: true, status: response.status };
}

/**
 * Déclencher toutes les intégrations actives pour un prospect
 */
export async function triggerProspectIntegrations(prospectId: string) {
  const supabase = getSupabaseClient();

  // Récupérer le prospect
  const { data: prospect, error: prospectError } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", prospectId)
    .single();

  if (prospectError || !prospect) {
    throw new Error("Prospect not found");
  }

  // Récupérer les intégrations actives
  const { data: integrations } = await supabase
    .from("integrations")
    .select("*")
    .eq("enabled", true)
    .eq("trigger_on", "prospect_created");

  if (!integrations || integrations.length === 0) {
    return { triggered: 0, results: [] };
  }

  const results = [];

  for (const integration of integrations) {
    try {
      let result;

      switch (integration.type) {
        case 'hubspot':
          result = await sendToHubSpot(prospect, integration.config);
          break;
        case 'salesforce':
          result = await sendToSalesforce(prospect, integration.config);
          break;
        case 'n8n':
          result = await sendToN8n(prospect, integration.config);
          break;
        case 'webhook':
        case 'zapier':
          result = await sendToWebhook(prospect, integration.config);
          break;
        default:
          throw new Error(`Unknown integration type: ${integration.type}`);
      }

      results.push({
        integration: integration.name,
        type: integration.type,
        success: true,
        result,
      });

      // Logger l'action
      await supabase.from("prospect_actions").insert({
        prospect_id: prospectId,
        action_type: "integration",
        action_label: `Envoyé vers ${integration.name}`,
        action_description: `Intégration ${integration.type} déclenchée avec succès`,
        user_name: "Système",
        metadata: { integration_id: integration.id },
      });
    } catch (error) {
      console.error(`Error with integration ${integration.name}:`, error);
      results.push({
        integration: integration.name,
        type: integration.type,
        success: false,
        error: error.message,
      });
    }
  }

  return {
    triggered: results.filter((r) => r.success).length,
    total: integrations.length,
    results,
  };
}

/**
 * Helper: Mapper statut YoJob → HubSpot
 */
function mapStatusToHubSpot(status: string): string {
  const mapping: Record<string, string> = {
    new: 'NEW',
    qualified: 'OPEN',
    'follow-up': 'IN_PROGRESS',
    proposal: 'IN_PROGRESS',
    won: 'CONNECTED',
    lost: 'UNQUALIFIED',
  };
  return mapping[status] || 'NEW';
}

/**
 * Helper: Mapper statut YoJob → Salesforce
 */
function mapStatusToSalesforce(status: string): string {
  const mapping: Record<string, string> = {
    new: 'Open - Not Contacted',
    qualified: 'Working - Contacted',
    'follow-up': 'Working - Contacted',
    proposal: 'Nurturing',
    won: 'Closed - Converted',
    lost: 'Closed - Not Converted',
  };
  return mapping[status] || 'Open - Not Contacted';
}
