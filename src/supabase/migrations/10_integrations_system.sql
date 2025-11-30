-- =====================================================
-- MIGRATION 10: SYSTÈME D'INTÉGRATIONS AUTOMATIQUES
-- =====================================================
-- Créé le: 2024-11-30
-- Description: Table pour stocker les configurations d'intégrations
--              (Google Sheets, n8n, Notion, webhooks, etc.)
-- =====================================================

-- 1. Créer la table integrations
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Configuration de base
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('api', 'webhook', 'mcp', 'database')),
  status TEXT NOT NULL DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  icon TEXT NOT NULL DEFAULT '🔗',
  description TEXT,
  
  -- Configuration technique (JSON)
  config JSONB NOT NULL DEFAULT '{}',
  
  -- OAuth (optionnel)
  oauth JSONB,
  
  -- Statistiques
  stats JSONB NOT NULL DEFAULT '{
    "totalCalls": 0,
    "successCalls": 0,
    "errorCalls": 0,
    "avgResponseTime": 0,
    "lastCallAt": null
  }'::jsonb,
  
  -- Dernière synchronisation
  last_sync TIMESTAMPTZ,
  
  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- 2. Index pour performance
CREATE INDEX IF NOT EXISTS idx_integrations_status ON integrations(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_integrations_type ON integrations(type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_integrations_created_at ON integrations(created_at DESC);

-- 3. Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_integrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_integrations_updated_at();

-- 4. Table pour les logs d'intégrations
CREATE TABLE IF NOT EXISTS integration_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Référence
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  response_id UUID, -- Référence à market_research_responses
  
  -- Détails de l'appel
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'retrying', 'pending')),
  method TEXT,
  url TEXT,
  status_code INTEGER,
  duration_ms INTEGER,
  
  -- Payload & Response
  request_payload JSONB,
  response_payload JSONB,
  error_message TEXT,
  
  -- Retry
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3
);

-- 5. Index pour logs
CREATE INDEX IF NOT EXISTS idx_integration_logs_integration_id ON integration_logs(integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_logs_response_id ON integration_logs(response_id);
CREATE INDEX IF NOT EXISTS idx_integration_logs_status ON integration_logs(status);
CREATE INDEX IF NOT EXISTS idx_integration_logs_created_at ON integration_logs(created_at DESC);

-- 6. RLS Policies pour integrations
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Authenticated users peuvent tout faire
CREATE POLICY authenticated_integrations_full_access ON integrations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anon peut lire (pour déclencher les intégrations)
CREATE POLICY anon_integrations_select ON integrations
  FOR SELECT
  TO anon
  USING (deleted_at IS NULL AND status = 'connected');

-- 7. RLS Policies pour integration_logs
ALTER TABLE integration_logs ENABLE ROW LEVEL SECURITY;

-- Authenticated users peuvent tout voir
CREATE POLICY authenticated_logs_select ON integration_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Anon peut insérer (pour logger les déclenchements)
CREATE POLICY anon_logs_insert ON integration_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 8. GRANTS
GRANT SELECT ON integrations TO anon;
GRANT ALL ON integrations TO authenticated;

GRANT INSERT ON integration_logs TO anon;
GRANT SELECT ON integration_logs TO authenticated;

-- 9. Fonction helper pour incrémenter les stats
CREATE OR REPLACE FUNCTION increment_integration_stats(
  p_integration_id UUID,
  p_success BOOLEAN,
  p_response_time INTEGER
)
RETURNS void AS $$
DECLARE
  v_stats JSONB;
  v_total INTEGER;
  v_success INTEGER;
  v_error INTEGER;
  v_avg NUMERIC;
BEGIN
  -- Récupérer les stats actuelles
  SELECT stats INTO v_stats FROM integrations WHERE id = p_integration_id;
  
  -- Extraire les valeurs
  v_total := COALESCE((v_stats->>'totalCalls')::INTEGER, 0) + 1;
  v_success := COALESCE((v_stats->>'successCalls')::INTEGER, 0) + CASE WHEN p_success THEN 1 ELSE 0 END;
  v_error := COALESCE((v_stats->>'errorCalls')::INTEGER, 0) + CASE WHEN NOT p_success THEN 1 ELSE 0 END;
  
  -- Calculer nouvelle moyenne
  v_avg := (
    COALESCE((v_stats->>'avgResponseTime')::NUMERIC, 0) * (v_total - 1) + p_response_time
  ) / v_total;
  
  -- Mettre à jour
  UPDATE integrations
  SET 
    stats = jsonb_build_object(
      'totalCalls', v_total,
      'successCalls', v_success,
      'errorCalls', v_error,
      'avgResponseTime', v_avg,
      'lastCallAt', NOW()
    ),
    last_sync = NOW()
  WHERE id = p_integration_id;
END;
$$ LANGUAGE plpgsql;

-- 10. Insérer des exemples (optionnel - commenté pour production)
/*
INSERT INTO integrations (name, type, status, icon, description, config) VALUES
(
  'Google Sheets Example',
  'api',
  'disconnected',
  '📊',
  'Envoyer automatiquement les réponses vers Google Sheets',
  '{
    "url": "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Sheet1!A1:append",
    "method": "POST",
    "retryEnabled": true,
    "maxRetries": 3,
    "timeout": 30000
  }'::jsonb
),
(
  'n8n Webhook Example',
  'webhook',
  'disconnected',
  '🤖',
  'Workflow automation avec n8n',
  '{
    "url": "https://your-n8n-instance.com/webhook/your-webhook-id",
    "method": "POST",
    "retryEnabled": true,
    "maxRetries": 3
  }'::jsonb
);
*/

-- =====================================================
-- FIN MIGRATION 10
-- =====================================================
