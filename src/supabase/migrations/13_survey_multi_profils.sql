-- =============================================================================
-- MIGRATION: SYSTÈME D'ENQUÊTE MULTI-PROFILS
-- =============================================================================
-- 
-- Cette migration ajoute le support de 3 types de répondants :
-- - Agences ETT (agency)
-- - Entreprises clientes (client)
-- - Travailleurs intérimaires (worker)
--
-- Modifications:
-- 1. Ajout colonne respondent_type dans market_research_responses
-- 2. Ajout colonne survey_response_id dans prospects
-- 3. Ajout colonne synced_to_prospect dans market_research_responses
-- 4. Migration données existantes (agency par défaut)
-- 5. Index de performance
-- =============================================================================

-- 1. Ajouter colonne respondent_type dans market_research_responses
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'respondent_type'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN respondent_type VARCHAR(20) DEFAULT 'agency';
    
    COMMENT ON COLUMN market_research_responses.respondent_type IS 
    'Type de répondant: agency, client, ou worker';
  END IF;
END $$;

-- 2. Ajouter colonne survey_response_id dans prospects
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'prospects' 
    AND column_name = 'survey_response_id'
  ) THEN
    ALTER TABLE prospects 
    ADD COLUMN survey_response_id UUID REFERENCES market_research_responses(id) ON DELETE SET NULL;
    
    COMMENT ON COLUMN prospects.survey_response_id IS 
    'ID de la réponse d''enquête associée (si applicable)';
  END IF;
END $$;

-- 3. Ajouter colonne synced_to_prospect dans market_research_responses
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'synced_to_prospect'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN synced_to_prospect BOOLEAN DEFAULT FALSE;
    
    COMMENT ON COLUMN market_research_responses.synced_to_prospect IS 
    'Indique si cette réponse a été synchronisée vers la table prospects';
  END IF;
END $$;

-- 4. Migrer les données existantes
-- Toutes les réponses existantes sont de type 'agency' par défaut
UPDATE market_research_responses 
SET respondent_type = 'agency' 
WHERE respondent_type IS NULL;

-- 5. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_market_research_respondent_type 
ON market_research_responses(respondent_type);

CREATE INDEX IF NOT EXISTS idx_market_research_synced_to_prospect 
ON market_research_responses(synced_to_prospect);

CREATE INDEX IF NOT EXISTS idx_prospects_survey_response 
ON prospects(survey_response_id);

CREATE INDEX IF NOT EXISTS idx_prospects_type_source 
ON prospects(type, source);

-- 6. Créer une vue pour faciliter les jointures prospects <-> enquêtes
CREATE OR REPLACE VIEW prospects_with_survey AS
SELECT 
  p.*,
  m.respondent_type as survey_respondent_type,
  m.interest_level as survey_interest_level,
  m.country as survey_country,
  m.created_at as survey_submitted_at,
  -- Données de l'enquête (colonnes spécifiques au lieu de JSON)
  m.q1_nom,
  m.q2_annee,
  m.q3_taille,
  m.q4_secteurs,
  m.q5_pays,
  m.q18_score as survey_interest_score,
  m.q21_budget_mensuel as survey_budget,
  m.email as survey_email
FROM prospects p
LEFT JOIN market_research_responses m ON p.survey_response_id = m.id;

COMMENT ON VIEW prospects_with_survey IS 
'Vue combinant les prospects et leurs réponses d''enquête associées';

-- 7. Ajouter une fonction pour obtenir les statistiques par profil
CREATE OR REPLACE FUNCTION get_survey_stats_by_respondent_type()
RETURNS TABLE (
  respondent_type VARCHAR(20),
  total_responses BIGINT,
  avg_interest_score NUMERIC,
  synced_to_crm BIGINT,
  not_synced BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.respondent_type,
    COUNT(*) as total_responses,
    AVG(m.q18_score) as avg_interest_score,
    COUNT(*) FILTER (WHERE m.synced_to_prospect = TRUE) as synced_to_crm,
    COUNT(*) FILTER (WHERE m.synced_to_prospect = FALSE OR m.synced_to_prospect IS NULL) as not_synced
  FROM market_research_responses m
  GROUP BY m.respondent_type;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_survey_stats_by_respondent_type() IS 
'Retourne des statistiques sur les enquêtes par type de répondant';

-- 8. Log de migration
DO $$
BEGIN
  RAISE NOTICE '✅ Migration 13_survey_multi_profils.sql appliquée avec succès';
  RAISE NOTICE '   → respondent_type ajouté à market_research_responses';
  RAISE NOTICE '   → survey_response_id ajouté à prospects';
  RAISE NOTICE '   → synced_to_prospect ajouté à market_research_responses';
  RAISE NOTICE '   → Index de performance créés';
  RAISE NOTICE '   → Vue prospects_with_survey créée';
  RAISE NOTICE '   → Fonction get_survey_stats_by_respondent_type() créée';
END $$;