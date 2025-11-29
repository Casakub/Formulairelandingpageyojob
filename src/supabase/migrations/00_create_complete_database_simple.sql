-- ═══════════════════════════════════════════════════════════════════════
-- YoJob Market Study - Complete Database Schema (Version Simple)
-- ═══════════════════════════════════════════════════════════════════════
-- Version: 1.0.1
-- Date: 29 Novembre 2025
-- Description: Schéma complet pour l'étude de marché YoJob (26 questions)
-- Note: Version sans bloc DO$$ pour compatibilité maximale
-- ═══════════════════════════════════════════════════════════════════════

-- Drop existing table if exists (clean start)
DROP TABLE IF EXISTS market_research_responses CASCADE;

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: market_research_responses
-- ═══════════════════════════════════════════════════════════════════════

CREATE TABLE market_research_responses (
  -- Primary Key & Timestamps
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  response_id TEXT NOT NULL UNIQUE,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 1: Profil Agence (4 questions)
  -- ═══════════════════════════════════════════════════════════════════════
  
  q1_nom TEXT NOT NULL,
  q2_annee TEXT NOT NULL,
  q3_taille TEXT NOT NULL,
  q4_secteurs TEXT[] NOT NULL,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 2: Expérience Détachement (7 questions)
  -- ═══════════════════════════════════════════════════════════════════════
  
  q5_pays TEXT NOT NULL,
  q6_volume TEXT NOT NULL,
  q7_origine TEXT NOT NULL,
  q8_destinations TEXT NOT NULL,
  q9_defi TEXT NOT NULL,
  q9_autre TEXT,
  q10_gestion TEXT NOT NULL,
  q11_incidents TEXT NOT NULL,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 3: Besoins & Outils (6 questions)
  -- ═══════════════════════════════════════════════════════════════════════
  
  q12_budget TEXT NOT NULL,
  q13_manque_gagner TEXT NOT NULL,
  q14_risques TEXT NOT NULL,
  q15_probleme TEXT NOT NULL,
  q16_erp TEXT NOT NULL,
  q16_autre TEXT,
  q17_migration TEXT NOT NULL,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 4: Intérêt Plateforme YoJob (6 questions)
  -- ═══════════════════════════════════════════════════════════════════════
  
  q18_score INTEGER NOT NULL CHECK (q18_score >= 0 AND q18_score <= 10),
  q19_features TEXT[] NOT NULL,
  q20_prix TEXT NOT NULL,
  q21_budget_mensuel TEXT NOT NULL,
  q22_mvp TEXT NOT NULL,
  q23_role TEXT NOT NULL,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 5: Vision Future (2 questions)
  -- ═══════════════════════════════════════════════════════════════════════
  
  q24_evolution TEXT NOT NULL,
  q25_besoins TEXT,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- SECTION 6: Contact (1 question + autorisations)
  -- ═══════════════════════════════════════════════════════════════════════
  
  email TEXT NOT NULL,
  autorise_contact BOOLEAN DEFAULT false,
  souhaite_rapport BOOLEAN DEFAULT false,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- METADATA ENRICHIE (calculée automatiquement par triggers)
  -- ═══════════════════════════════════════════════════════════════════════
  
  country TEXT,
  sector TEXT,
  company_size INTEGER,
  detachment_experience TEXT,
  interest_level TEXT,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- TRACKING & ANALYTICS
  -- ═══════════════════════════════════════════════════════════════════════
  
  ip_address TEXT,
  user_agent TEXT,
  completion_time INTEGER,
  referrer TEXT,
  language TEXT DEFAULT 'fr',
  device_type TEXT,
  
  -- ═══════════════════════════════════════════════════════════════════════
  -- CONSTRAINTS
  -- ═══════════════════════════════════════════════════════════════════════
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_response_id CHECK (length(response_id) > 0)
);

-- ═══════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════

CREATE INDEX idx_market_research_created_at ON market_research_responses(created_at DESC);
CREATE INDEX idx_market_research_updated_at ON market_research_responses(updated_at DESC);
CREATE INDEX idx_market_research_response_id ON market_research_responses(response_id);
CREATE INDEX idx_market_research_email ON market_research_responses(email);
CREATE INDEX idx_market_research_country ON market_research_responses(country);
CREATE INDEX idx_market_research_sector ON market_research_responses(sector);
CREATE INDEX idx_market_research_interest_level ON market_research_responses(interest_level);
CREATE INDEX idx_market_research_company_size ON market_research_responses(company_size);
CREATE INDEX idx_market_research_score ON market_research_responses(q18_score DESC);
CREATE INDEX idx_market_research_language ON market_research_responses(language);
CREATE INDEX idx_market_research_country_sector ON market_research_responses(country, sector);
CREATE INDEX idx_market_research_interest_country ON market_research_responses(interest_level, country);

-- ═══════════════════════════════════════════════════════════════════════
-- TRIGGER: Updated_at automatique
-- ═══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_market_research_updated_at
  BEFORE UPDATE ON market_research_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════
-- FONCTION UTILITAIRE: Calcul du niveau d'intérêt
-- ═══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION calculate_interest_level(score INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF score >= 0 AND score <= 3 THEN 
    RETURN 'faible';
  ELSIF score >= 4 AND score <= 6 THEN 
    RETURN 'moyen';
  ELSIF score >= 7 AND score <= 10 THEN 
    RETURN 'élevé';
  ELSE 
    RETURN 'invalide';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ═══════════════════════════════════════════════════════════════════════
-- TRIGGER: Enrichissement automatique des métadonnées
-- ═══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION enrich_market_research_metadata()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculer interest_level
  NEW.interest_level = calculate_interest_level(NEW.q18_score);
  
  -- Extraire country
  NEW.country = NEW.q5_pays;
  
  -- Extraire sector (premier secteur du tableau)
  IF array_length(NEW.q4_secteurs, 1) > 0 THEN
    NEW.sector = NEW.q4_secteurs[1];
  END IF;
  
  -- Calculer company_size (valeur numérique approximative)
  CASE NEW.q3_taille
    WHEN '1-10' THEN NEW.company_size = 10;
    WHEN '11-50' THEN NEW.company_size = 50;
    WHEN '51-250' THEN NEW.company_size = 250;
    WHEN '250+' THEN NEW.company_size = 500;
    ELSE NEW.company_size = 0;
  END CASE;
  
  -- Extraire detachment_experience
  NEW.detachment_experience = NEW.q7_origine;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enrich_metadata_on_insert
  BEFORE INSERT ON market_research_responses
  FOR EACH ROW
  EXECUTE FUNCTION enrich_market_research_metadata();

CREATE TRIGGER enrich_metadata_on_update
  BEFORE UPDATE ON market_research_responses
  FOR EACH ROW
  EXECUTE FUNCTION enrich_market_research_metadata();

-- ═══════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Permettre les insertions publiques (formulaire)
CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Lecture réservée aux utilisateurs authentifiés (dashboard)
CREATE POLICY "allow_authenticated_reads"
  ON market_research_responses
  FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy 3: Mise à jour réservée aux utilisateurs authentifiés
CREATE POLICY "allow_authenticated_updates"
  ON market_research_responses
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy 4: Suppression réservée aux utilisateurs authentifiés
CREATE POLICY "allow_authenticated_deletes"
  ON market_research_responses
  FOR DELETE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════════════════
-- PERMISSIONS
-- ═══════════════════════════════════════════════════════════════════════

GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT, UPDATE, DELETE ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- ═══════════════════════════════════════════════════════════════════════
-- COMMENTAIRES
-- ═══════════════════════════════════════════════════════════════════════

COMMENT ON TABLE market_research_responses IS 'Stocke les réponses de l''étude de marché auprès des 27,000 agences ETT européennes';

-- Section 1
COMMENT ON COLUMN market_research_responses.q1_nom IS 'Section 1 Q1: Nom de l''agence';
COMMENT ON COLUMN market_research_responses.q2_annee IS 'Section 1 Q2: Année de création';
COMMENT ON COLUMN market_research_responses.q3_taille IS 'Section 1 Q3: Taille de l''agence';
COMMENT ON COLUMN market_research_responses.q4_secteurs IS 'Section 1 Q4: Secteurs d''activité';

-- Section 2
COMMENT ON COLUMN market_research_responses.q5_pays IS 'Section 2 Q1: Pays d''origine';
COMMENT ON COLUMN market_research_responses.q6_volume IS 'Section 2 Q2: Volume annuel de détachements';
COMMENT ON COLUMN market_research_responses.q7_origine IS 'Section 2 Q3: Détachements depuis votre pays';
COMMENT ON COLUMN market_research_responses.q8_destinations IS 'Section 2 Q4: Pays de destination';
COMMENT ON COLUMN market_research_responses.q9_defi IS 'Section 2 Q5: Plus grand défi du détachement';
COMMENT ON COLUMN market_research_responses.q10_gestion IS 'Section 2 Q6: Comment gérez-vous actuellement';
COMMENT ON COLUMN market_research_responses.q11_incidents IS 'Section 2 Q7: Fréquence des incidents/litiges';

-- Section 3
COMMENT ON COLUMN market_research_responses.q12_budget IS 'Section 3 Q1: Budget mensuel actuel détachement';
COMMENT ON COLUMN market_research_responses.q13_manque_gagner IS 'Section 3 Q2: Estimation du manque à gagner';
COMMENT ON COLUMN market_research_responses.q14_risques IS 'Section 3 Q3: Niveau de préoccupation risques légaux';
COMMENT ON COLUMN market_research_responses.q15_probleme IS 'Section 3 Q4: Principal problème à résoudre';
COMMENT ON COLUMN market_research_responses.q16_erp IS 'Section 3 Q5: ERP/logiciel utilisé';
COMMENT ON COLUMN market_research_responses.q17_migration IS 'Section 3 Q6: Prêt à migrer vers nouvelle solution';

-- Section 4
COMMENT ON COLUMN market_research_responses.q18_score IS 'Section 4 Q1: Score d''intérêt (0-10)';
COMMENT ON COLUMN market_research_responses.q19_features IS 'Section 4 Q2: Fonctionnalités les plus importantes';
COMMENT ON COLUMN market_research_responses.q20_prix IS 'Section 4 Q3: Fourchette de prix acceptable';
COMMENT ON COLUMN market_research_responses.q21_budget_mensuel IS 'Section 4 Q4: Budget mensuel acceptable';
COMMENT ON COLUMN market_research_responses.q22_mvp IS 'Section 4 Q5: Intérêt pour tester le MVP';
COMMENT ON COLUMN market_research_responses.q23_role IS 'Section 4 Q6: Rôle dans la décision d''achat';

-- Section 5
COMMENT ON COLUMN market_research_responses.q24_evolution IS 'Section 5 Q1: Vision du marché dans 3 ans';
COMMENT ON COLUMN market_research_responses.q25_besoins IS 'Section 5 Q2: Autres besoins ou suggestions (optionnel)';

-- Section 6
COMMENT ON COLUMN market_research_responses.email IS 'Section 6 Q1: Email professionnel';
COMMENT ON COLUMN market_research_responses.autorise_contact IS 'Autorisation de contact ultérieur';
COMMENT ON COLUMN market_research_responses.souhaite_rapport IS 'Souhaite recevoir le rapport final';

-- Metadata
COMMENT ON COLUMN market_research_responses.interest_level IS 'Niveau d''intérêt calculé automatiquement: faible, moyen, élevé';
COMMENT ON COLUMN market_research_responses.company_size IS 'Taille de l''entreprise (valeur numérique approximative)';

-- ═══════════════════════════════════════════════════════════════════════
-- FIN DE LA MIGRATION
-- ═══════════════════════════════════════════════════════════════════════
