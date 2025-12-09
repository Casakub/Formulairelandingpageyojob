-- =====================================================
-- MIGRATION 12: PROSPECTS CRM SYSTEM
-- =====================================================
-- Système complet de gestion des prospects depuis la landing page
-- Connecte les formulaires (waitlist + contact) au dashboard

-- Table principale des prospects
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Type et source
  type VARCHAR(50) NOT NULL DEFAULT 'contact', -- 'contact', 'waitlist', 'agency', 'interim'
  source VARCHAR(100) NOT NULL DEFAULT 'landing_contact', -- 'landing_contact', 'landing_waitlist', 'manual', 'import'
  status VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new', 'qualified', 'follow-up', 'proposal', 'won', 'lost'
  
  -- Informations principales
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  
  -- Localisation
  country_code VARCHAR(10), -- 'FR', 'DE', 'PL', etc.
  language_code VARCHAR(10), -- 'fr', 'en', 'de', etc.
  
  -- Secteur et besoin
  sector VARCHAR(100), -- 'BTP', 'Industrie', 'Logistique', etc.
  need_type VARCHAR(100), -- 'Intérim européen', 'Recrutement', 'Conformité', etc.
  message TEXT,
  
  -- Données flexibles (JSON pour futures évolutions)
  custom_fields JSONB DEFAULT '{}'::jsonb,
  
  -- Suivi
  responsible_user_id UUID, -- ID de l'admin responsable
  responsible_name VARCHAR(100), -- Nom/initiales du responsable
  next_action_date DATE,
  next_action_type VARCHAR(50), -- 'call', 'email', 'meeting', 'proposal'
  next_action_label VARCHAR(255),
  
  -- Scoring et priorité
  score INTEGER DEFAULT 0, -- Score de qualification (0-100)
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  
  -- Flags
  is_archived BOOLEAN DEFAULT false,
  is_newsletter_subscribed BOOLEAN DEFAULT false,
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index pour performances
CREATE INDEX idx_prospects_email ON prospects(email);
CREATE INDEX idx_prospects_type ON prospects(type);
CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_source ON prospects(source);
CREATE INDEX idx_prospects_created_at ON prospects(created_at DESC);
CREATE INDEX idx_prospects_country ON prospects(country_code);
CREATE INDEX idx_prospects_responsible ON prospects(responsible_user_id);
CREATE INDEX idx_prospects_archived ON prospects(is_archived) WHERE is_archived = false;

-- Table des actions/interactions avec les prospects
CREATE TABLE IF NOT EXISTS prospect_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Type d'action
  action_type VARCHAR(50) NOT NULL, -- 'call', 'email', 'meeting', 'note', 'status_change', 'form_submit'
  action_label VARCHAR(255),
  action_description TEXT,
  
  -- Métadonnées
  user_id UUID, -- Admin qui a effectué l'action
  user_name VARCHAR(100),
  
  -- Données supplémentaires
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_prospect_actions_prospect ON prospect_actions(prospect_id);
CREATE INDEX idx_prospect_actions_created_at ON prospect_actions(created_at DESC);

-- Table des notes internes
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

CREATE INDEX idx_prospect_notes_prospect ON prospect_notes(prospect_id);
CREATE INDEX idx_prospect_notes_created_at ON prospect_notes(created_at DESC);

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_prospects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prospects_updated_at_trigger
  BEFORE UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_prospects_updated_at();

-- Fonction pour auto-détecter le type de prospect
CREATE OR REPLACE FUNCTION auto_detect_prospect_type(
  p_source VARCHAR,
  p_company VARCHAR,
  p_need_type VARCHAR
)
RETURNS VARCHAR AS $$
BEGIN
  -- Si c'est la waitlist, c'est un prospect général
  IF p_source = 'landing_waitlist' THEN
    RETURN 'waitlist';
  END IF;
  
  -- Si l'entreprise contient certains mots-clés
  IF p_company IS NOT NULL THEN
    IF p_company ~* 'agence|manpower|adecco|randstad|interim' THEN
      RETURN 'agency';
    ELSIF p_need_type ~* 'intérimaire|worker|travailleur' THEN
      RETURN 'interim';
    ELSE
      RETURN 'client';
    END IF;
  END IF;
  
  -- Par défaut
  RETURN 'contact';
END;
$$ LANGUAGE plpgsql;

-- Données de test (pour développement)
INSERT INTO prospects (
  type, source, status, name, email, phone, company,
  country_code, sector, need_type, message,
  responsible_name, next_action_date, next_action_type, next_action_label,
  custom_fields
) VALUES
  (
    'client', 'landing_contact', 'qualified',
    'Jean Leblanc', 'j.leblanc@bouygues-btp.fr', '+33 1 44 20 10 00', 'Bouygues BTP',
    'FR', 'BTP', 'Intérim européen',
    'Projet de recrutement de 50 ouvriers BTP pour un chantier en Pologne',
    'JD', CURRENT_DATE + INTERVAL '5 days', 'call', 'Appel de suivi commercial',
    '{"utm_source": "google", "utm_campaign": "btp-2024"}'::jsonb
  ),
  (
    'agency', 'manual', 'follow-up',
    'Marie Schmidt', 'm.schmidt@manpower-europe.de', '+49 30 1234567', 'Manpower Europe',
    'DE', 'Multi-secteurs', 'Partenariat agence',
    'Intéressé par un partenariat pour détachement de travailleurs',
    'ML', CURRENT_DATE + INTERVAL '6 days', 'email', 'Envoyer proposition de partenariat',
    '{}'::jsonb
  ),
  (
    'interim', 'landing_contact', 'new',
    'Pavel Novak', 'pavel.novak@gmail.com', '+420 777 123 456', NULL,
    'CZ', 'Logistique', 'Recherche mission',
    'Chauffeur routier expérimenté cherche mission en France',
    'SC', CURRENT_DATE + INTERVAL '8 days', 'meeting', 'Entretien téléphonique',
    '{}'::jsonb
  ),
  (
    'waitlist', 'landing_waitlist', 'new',
    'Sophie Martin', 's.martin@vinci-construction.fr', NULL, 'Vinci Construction',
    'ES', 'BTP', NULL,
    NULL,
    NULL, NULL, NULL, NULL,
    '{"interested_in": "marketplace", "notification_preferences": "email"}'::jsonb
  )
ON CONFLICT DO NOTHING;

-- Actions historiques pour les prospects de test
INSERT INTO prospect_actions (prospect_id, action_type, action_label, action_description, user_name)
SELECT 
  id,
  'form_submit',
  'Soumission formulaire de contact',
  'Soumission initiale depuis la landing page',
  'Système'
FROM prospects
WHERE source = 'landing_contact'
ON CONFLICT DO NOTHING;

-- Notes pour le premier prospect
INSERT INTO prospect_notes (prospect_id, content, author_name)
SELECT 
  id,
  'Projet de recrutement de 50 ouvriers BTP pour un chantier en Pologne. Budget conséquent. Contact : M. Leblanc (DRH). À rappeler impérativement avant fin décembre.',
  'Jean Dupont'
FROM prospects
WHERE email = 'j.leblanc@bouygues-btp.fr'
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) - Désactivé pour simplifier l'accès admin
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_notes ENABLE ROW LEVEL SECURITY;

-- Politique : Admin peut tout faire
CREATE POLICY "Admin full access on prospects" ON prospects
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on prospect_actions" ON prospect_actions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on prospect_notes" ON prospect_notes
  FOR ALL USING (true) WITH CHECK (true);

-- Vue pour statistiques rapides
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

COMMENT ON TABLE prospects IS 'Prospects collectés depuis la landing page (waitlist + contact) et autres sources';
COMMENT ON TABLE prospect_actions IS 'Historique des actions et interactions avec les prospects';
COMMENT ON TABLE prospect_notes IS 'Notes internes sur les prospects';
COMMENT ON VIEW prospect_stats IS 'Statistiques en temps réel pour le dashboard';
