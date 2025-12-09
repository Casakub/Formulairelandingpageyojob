-- ============================================
-- 🚀 YOJOB PROSPECTS CRM - MIGRATION SQL
-- ============================================
-- Copier-coller ce script dans Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Exécuter
-- ============================================

-- 1. Table principale des prospects
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Classification
  type VARCHAR(50) NOT NULL DEFAULT 'contact',
  source VARCHAR(100) NOT NULL DEFAULT 'landing_contact',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  
  -- Informations de contact
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  
  -- Localisation
  country_code VARCHAR(10),
  language_code VARCHAR(10),
  
  -- Détails métier
  sector VARCHAR(100),
  need_type VARCHAR(100),
  message TEXT,
  
  -- Champs personnalisés (flexible!)
  custom_fields JSONB DEFAULT '{}'::jsonb,
  
  -- Gestion commerciale
  responsible_user_id UUID,
  responsible_name VARCHAR(100),
  next_action_date DATE,
  next_action_type VARCHAR(50),
  next_action_label VARCHAR(255),
  
  -- Scoring
  score INTEGER DEFAULT 0,
  priority VARCHAR(20) DEFAULT 'medium',
  
  -- Flags
  is_archived BOOLEAN DEFAULT false,
  is_newsletter_subscribed BOOLEAN DEFAULT false,
  
  -- Contrainte email
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Index pour performances
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE UNIQUE INDEX IF NOT EXISTS uq_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_prospects_type ON prospects(type);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_created_at ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_country ON prospects(country_code);
CREATE INDEX IF NOT EXISTS idx_prospects_responsible ON prospects(responsible_user_id);
CREATE INDEX IF NOT EXISTS idx_prospects_archived ON prospects(is_archived) WHERE is_archived = false;

-- 3. Table des actions (historique)
CREATE TABLE IF NOT EXISTS prospect_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  action_type VARCHAR(50) NOT NULL,
  action_label VARCHAR(255),
  action_description TEXT,
  
  user_id UUID,
  user_name VARCHAR(100),
  
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_prospect_actions_prospect ON prospect_actions(prospect_id);
CREATE INDEX IF NOT EXISTS idx_prospect_actions_created_at ON prospect_actions(created_at DESC);

-- 4. Table des notes internes
CREATE TABLE IF NOT EXISTS prospect_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  content TEXT NOT NULL,
  author_id UUID,
  author_name VARCHAR(100) NOT NULL,
  
  is_pinned BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_prospect_notes_prospect ON prospect_notes(prospect_id);
CREATE INDEX IF NOT EXISTS idx_prospect_notes_created_at ON prospect_notes(created_at DESC);

-- 5. Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_prospects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prospects_updated_at_trigger ON prospects;
CREATE TRIGGER prospects_updated_at_trigger
  BEFORE UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_prospects_updated_at();

DROP TRIGGER IF EXISTS prospect_notes_updated_at_trigger ON prospect_notes;
CREATE TRIGGER prospect_notes_updated_at_trigger
  BEFORE UPDATE ON prospect_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_prospects_updated_at();

-- 6. Vue pour statistiques en temps réel
CREATE OR REPLACE VIEW prospect_stats AS
SELECT 
  COUNT(*) FILTER (WHERE is_archived = false) as total_active,
  COUNT(*) FILTER (WHERE type = 'client' AND is_archived = false) as total_clients,
  COUNT(*) FILTER (WHERE type = 'agency' AND is_archived = false) as total_agencies,
  COUNT(*) FILTER (WHERE type = 'interim' AND is_archived = false) as total_interims,
  COUNT(*) FILTER (WHERE type = 'waitlist' AND is_archived = false) as total_waitlist,
  COUNT(*) FILTER (WHERE status = 'new' AND is_archived = false) as total_new,
  COUNT(*) FILTER (WHERE status = 'qualified' AND is_archived = false) as total_qualified,
  COUNT(*) FILTER (WHERE status = 'won' AND is_archived = false) as total_won,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as total_this_month
FROM prospects;

-- 7. Table des intégrations CRM (optionnel)
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  trigger_on VARCHAR(50) DEFAULT 'prospect_created',
  
  config JSONB DEFAULT '{}'::jsonb,
  
  last_triggered_at TIMESTAMPTZ,
  total_triggers INTEGER DEFAULT 0
);

-- 8. RLS (Row Level Security) - Tout le monde peut lire/écrire pour l'instant
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_notes ENABLE ROW LEVEL SECURITY;

-- Policies permissives (à ajuster selon vos besoins de sécurité)
DROP POLICY IF EXISTS "Enable all access for prospects" ON prospects;
CREATE POLICY "Enable all access for prospects" ON prospects
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for prospect_actions" ON prospect_actions;
CREATE POLICY "Enable all access for prospect_actions" ON prospect_actions
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for prospect_notes" ON prospect_notes;
CREATE POLICY "Enable all access for prospect_notes" ON prospect_notes
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for integrations" ON integrations;
CREATE POLICY "Enable all access for integrations" ON integrations
  FOR ALL USING (true) WITH CHECK (true);

-- 9. Données de test (optionnel - commentez si vous ne voulez pas de test)
INSERT INTO prospects (
  type, source, status, name, email, phone, company,
  country_code, language_code, sector, need_type, message,
  responsible_name, next_action_date, next_action_type, next_action_label,
  custom_fields
) VALUES
  (
    'client', 
    'landing_contact', 
    'qualified',
    'Jean Leblanc', 
    'j.leblanc@bouygues-btp.fr', 
    '+33 1 44 20 10 00', 
    'Bouygues BTP',
    'FR', 
    'fr',
    'BTP', 
    'Intérim européen',
    'Projet de recrutement de 50 ouvriers BTP pour chantier en Pologne. Démarrage prévu début janvier 2025.',
    'JD', 
    CURRENT_DATE + INTERVAL '5 days', 
    'call', 
    'Appel de suivi commercial',
    '{"utm_source": "google", "utm_campaign": "btp-2024", "test_data": true}'::jsonb
  ),
  (
    'waitlist', 
    'landing_waitlist', 
    'new',
    'Marie Dubois', 
    'marie.dubois@renault.fr', 
    '+33 1 76 84 00 00', 
    'Renault',
    'FR', 
    'fr',
    'Industrie', 
    'Marketplace 2025',
    'Intéressée par la future marketplace pour comparer les agences ETT européennes',
    NULL, 
    NULL, 
    NULL, 
    NULL,
    '{"newsletter_subscribed": true, "test_data": true}'::jsonb
  ),
  (
    'agency', 
    'manual', 
    'new',
    'Hans Schmidt', 
    'h.schmidt@manpower.de', 
    '+49 621 1234567', 
    'Manpower Deutschland',
    'DE', 
    'de',
    'Intérim', 
    'Partenariat',
    'Agence ETT allemande intéressée par un partenariat avec YoJob',
    'AA', 
    CURRENT_DATE + INTERVAL '3 days', 
    'email', 
    'Envoyer présentation partenariat',
    '{"agency_size": "500+", "test_data": true}'::jsonb
  )
ON CONFLICT (email) DO NOTHING;

-- 10. Ajouter des actions historiques pour le test
INSERT INTO prospect_actions (prospect_id, action_type, action_label, action_description, user_name)
SELECT 
  id,
  'form_submit',
  'Formulaire soumis depuis la landing page',
  'Le prospect a rempli le formulaire de contact avec le message: "' || COALESCE(message, '') || '"',
  'Système'
FROM prospects
WHERE email IN ('j.leblanc@bouygues-btp.fr', 'marie.dubois@renault.fr', 'h.schmidt@manpower.de');

-- ============================================
-- ✅ MIGRATION TERMINÉE !
-- ============================================
-- Vérification :
SELECT 'prospects' as table_name, COUNT(*) as count FROM prospects
UNION ALL
SELECT 'prospect_actions', COUNT(*) FROM prospect_actions
UNION ALL
SELECT 'prospect_notes', COUNT(*) FROM prospect_notes;

-- Afficher les stats
SELECT * FROM prospect_stats;