-- ═══════════════════════════════════════════════════════════════════════
-- Migration: Ajouter le support multi-profils (Agency, Client, Worker)
-- ═══════════════════════════════════════════════════════════════════════
-- Version: 1.0.0
-- Date: 10 Décembre 2024
-- Description: Ajoute respondent_type pour gérer 3 types d'enquêtes
-- ═══════════════════════════════════════════════════════════════════════

-- Ajouter la colonne respondent_type à la table existante
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS respondent_type VARCHAR(20) DEFAULT 'agency' CHECK (respondent_type IN ('agency', 'client', 'worker'));

-- Créer un index pour optimiser les requêtes par profil
CREATE INDEX IF NOT EXISTS idx_respondent_type ON market_research_responses(respondent_type);

-- Mettre à jour les réponses existantes (toutes sont des agences)
UPDATE market_research_responses 
SET respondent_type = 'agency' 
WHERE respondent_type IS NULL;

-- Créer une vue pour les statistiques par profil
CREATE OR REPLACE VIEW respondent_stats AS
SELECT 
  respondent_type,
  COUNT(*) as total_responses,
  COUNT(DISTINCT country) as countries_covered,
  AVG(CASE WHEN q18_score IS NOT NULL THEN q18_score ELSE NULL END) as avg_interest_score
FROM market_research_responses
GROUP BY respondent_type;

-- Commentaires pour documentation
COMMENT ON COLUMN market_research_responses.respondent_type IS 'Type de répondant: agency (agence ETT), client (entreprise), worker (intérimaire)';
COMMENT ON VIEW respondent_stats IS 'Vue statistique regroupant les réponses par type de répondant';
