-- =============================================================================
-- MIGRATION 16: AJOUTER COLONNES CLIENT ET WORKER
-- =============================================================================
--
-- Cette migration ajoute toutes les colonnes manquantes pour supporter
-- les 3 types de répondants (agency, client, worker) dans la table
-- market_research_responses.
--
-- Basé sur le schéma complet défini dans :
-- - /config/survey-questions-COMPLETE.ts
-- - /lib/survey-response-schema.ts
--
-- Version: 3.0.0
-- Date: 11 Décembre 2024
-- =============================================================================

-- 1. Ajouter colonne language (pour les traductions)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'language'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN language VARCHAR(5) DEFAULT 'fr';
    
    COMMENT ON COLUMN market_research_responses.language IS 
    'Langue de la réponse (fr, en, de, es, it, etc.)';
  END IF;
END $$;

-- =============================================================================
-- SECTION 1: PROFIL - Colonnes supplémentaires
-- =============================================================================

-- q4_metiers (WORKER uniquement - équivalent de q4_secteurs)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q4_metiers'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q4_metiers TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q4_metiers IS 
    'Métiers exercés (WORKER) - équivalent de q4_secteurs pour workers';
  END IF;
END $$;

-- =============================================================================
-- SECTION 2: EXPÉRIENCE - Colonnes CLIENT et WORKER
-- =============================================================================

-- q7_exp_detachement (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q7_exp_detachement'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q7_exp_detachement TEXT;
    
    COMMENT ON COLUMN market_research_responses.q7_exp_detachement IS 
    'Expérience de détachement (CLIENT)';
  END IF;
END $$;

-- q7_travail_etranger (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q7_travail_etranger'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q7_travail_etranger TEXT;
    
    COMMENT ON COLUMN market_research_responses.q7_travail_etranger IS 
    'A travaillé à l''étranger (WORKER)';
  END IF;
END $$;

-- q8_pays_origine_client (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q8_pays_origine_client'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q8_pays_origine_client TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q8_pays_origine_client IS 
    'Pays d''origine des intérimaires (CLIENT)';
  END IF;
END $$;

-- q8_pays_travailles (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q8_pays_travailles'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q8_pays_travailles TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q8_pays_travailles IS 
    'Pays où le travailleur a travaillé (WORKER)';
  END IF;
END $$;

-- q9_freins (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q9_freins'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q9_freins TEXT;
    
    COMMENT ON COLUMN market_research_responses.q9_freins IS 
    'Freins au détachement (CLIENT)';
  END IF;
END $$;

-- q9_satisfaction (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q9_satisfaction'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q9_satisfaction INTEGER;
    
    COMMENT ON COLUMN market_research_responses.q9_satisfaction IS 
    'Niveau de satisfaction (WORKER) - 1 à 10';
  END IF;
END $$;

-- q10_delai (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q10_delai'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q10_delai TEXT;
    
    COMMENT ON COLUMN market_research_responses.q10_delai IS 
    'Délai acceptable pour recruter (CLIENT)';
  END IF;
END $$;

-- q10_difficultes (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q10_difficultes'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q10_difficultes TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q10_difficultes IS 
    'Difficultés rencontrées (WORKER)';
  END IF;
END $$;

-- =============================================================================
-- SECTION 3: BESOINS - Colonnes CLIENT et WORKER
-- =============================================================================

-- q11_certifications (AGENCY)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q11_certifications'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q11_certifications TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q11_certifications IS 
    'Certifications détenues (AGENCY)';
  END IF;
END $$;

-- q11_budget_client (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q11_budget_client'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q11_budget_client TEXT;
    
    COMMENT ON COLUMN market_research_responses.q11_budget_client IS 
    'Budget annuel intérim (CLIENT)';
  END IF;
END $$;

-- q11_ameliorations (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q11_ameliorations'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q11_ameliorations TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q11_ameliorations IS 
    'Améliorations souhaitées (WORKER)';
  END IF;
END $$;

-- q12_documents (AGENCY)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q12_documents'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q12_documents TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q12_documents IS 
    'Documents gérés (AGENCY)';
  END IF;
END $$;

-- q12_criteres (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q12_criteres'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q12_criteres TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q12_criteres IS 
    'Critères de sélection agence (CLIENT)';
  END IF;
END $$;

-- q12_langues (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q12_langues'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q12_langues TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q12_langues IS 
    'Langues parlées (WORKER)';
  END IF;
END $$;

-- q13_conformite_agency (AGENCY)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q13_conformite_agency'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q13_conformite_agency TEXT;
    
    COMMENT ON COLUMN market_research_responses.q13_conformite_agency IS 
    'Gestion de la conformité (AGENCY)';
  END IF;
END $$;

-- q13_conformite_client (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q13_conformite_client'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q13_conformite_client TEXT;
    
    COMMENT ON COLUMN market_research_responses.q13_conformite_client IS 
    'Gestion de la conformité (CLIENT)';
  END IF;
END $$;

-- q13_competences (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q13_competences'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q13_competences TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q13_competences IS 
    'Compétences principales (WORKER)';
  END IF;
END $$;

-- q15_budget_conformite (AGENCY)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q15_budget_conformite'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q15_budget_conformite TEXT;
    
    COMMENT ON COLUMN market_research_responses.q15_budget_conformite IS 
    'Budget conformité (AGENCY)';
  END IF;
END $$;

-- q15_partenaire (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q15_partenaire'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q15_partenaire TEXT;
    
    COMMENT ON COLUMN market_research_responses.q15_partenaire IS 
    'Partenaire actuel (CLIENT)';
  END IF;
END $$;

-- q15_support_souhaite (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q15_support_souhaite'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q15_support_souhaite TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q15_support_souhaite IS 
    'Support souhaité (WORKER)';
  END IF;
END $$;

-- q16_cout_recrutement (CLIENT)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q16_cout_recrutement'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q16_cout_recrutement TEXT;
    
    COMMENT ON COLUMN market_research_responses.q16_cout_recrutement IS 
    'Coût moyen de recrutement (CLIENT)';
  END IF;
END $$;

-- q16_agence_actuelle (WORKER)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q16_agence_actuelle'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q16_agence_actuelle TEXT;
    
    COMMENT ON COLUMN market_research_responses.q16_agence_actuelle IS 
    'Agence ETT actuelle (WORKER)';
  END IF;
END $$;

-- =============================================================================
-- SECTION 4: INTÉRÊT - Colonnes partagées
-- =============================================================================

-- q17_features (remplace q19_features de l'ancien système)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q17_features'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q17_features TEXT[];
    
    COMMENT ON COLUMN market_research_responses.q17_features IS 
    'Fonctionnalités importantes (TOUS)';
  END IF;
END $$;

-- q19_prix (remplace q20_prix)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q19_prix'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q19_prix TEXT;
    
    COMMENT ON COLUMN market_research_responses.q19_prix IS 
    'Fourchette de prix acceptable (TOUS)';
  END IF;
END $$;

-- q20_concurrents
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q20_concurrents'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q20_concurrents TEXT;
    
    COMMENT ON COLUMN market_research_responses.q20_concurrents IS 
    'Concurrents connus (TOUS)';
  END IF;
END $$;

-- q21_recommandation
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q21_recommandation'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q21_recommandation TEXT;
    
    COMMENT ON COLUMN market_research_responses.q21_recommandation IS 
    'Probabilité de recommandation (TOUS)';
  END IF;
END $$;

-- =============================================================================
-- SECTION 5: VISION - Colonnes partagées
-- =============================================================================

-- q22_vision (remplace q24_evolution)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q22_vision'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q22_vision TEXT;
    
    COMMENT ON COLUMN market_research_responses.q22_vision IS 
    'Vision du marché à 3 ans (TOUS)';
  END IF;
END $$;

-- q23_besoins (remplace q25_besoins)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q23_besoins'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q23_besoins TEXT;
    
    COMMENT ON COLUMN market_research_responses.q23_besoins IS 
    'Autres besoins (TOUS)';
  END IF;
END $$;

-- =============================================================================
-- SECTION 6: CONTACT - Colonnes supplémentaires
-- =============================================================================

-- Renommer q26_phone en q25_telephone (si existe)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q26_phone'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q25_telephone'
  ) THEN
    ALTER TABLE market_research_responses 
    RENAME COLUMN q26_phone TO q25_telephone;
  END IF;
END $$;

-- q24_email (déjà existe comme 'email')
-- q25_telephone (créé ci-dessus ou existe déjà)

-- q26_siret
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q26_siret'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q26_siret TEXT;
    
    COMMENT ON COLUMN market_research_responses.q26_siret IS 
    'Numéro SIRET (TOUS)';
  END IF;
END $$;

-- q27_linkedin
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q27_linkedin'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q27_linkedin TEXT;
    
    COMMENT ON COLUMN market_research_responses.q27_linkedin IS 
    'Profil LinkedIn (TOUS)';
  END IF;
END $$;

-- q28_demo
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q28_demo'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q28_demo TEXT;
    
    COMMENT ON COLUMN market_research_responses.q28_demo IS 
    'Souhait de démo (TOUS)';
  END IF;
END $$;

-- q29_early_access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q29_early_access'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q29_early_access TEXT;
    
    COMMENT ON COLUMN market_research_responses.q29_early_access IS 
    'Intérêt early access (TOUS)';
  END IF;
END $$;

-- q30_commentaires
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q30_commentaires'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q30_commentaires TEXT;
    
    COMMENT ON COLUMN market_research_responses.q30_commentaires IS 
    'Commentaires libres (TOUS)';
  END IF;
END $$;

-- =============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_market_research_language 
ON market_research_responses(language);

CREATE INDEX IF NOT EXISTS idx_market_research_q18_score 
ON market_research_responses(q18_score);

CREATE INDEX IF NOT EXISTS idx_market_research_respondent_language 
ON market_research_responses(respondent_type, language);

-- =============================================================================
-- LOG DE MIGRATION
-- =============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Migration 16_add_client_worker_columns.sql appliquée avec succès';
  RAISE NOTICE '   → Colonne language ajoutée';
  RAISE NOTICE '   → ~40 colonnes CLIENT/WORKER ajoutées';
  RAISE NOTICE '   → Indexes de performance créés';
  RAISE NOTICE '   → Table market_research_responses prête pour les 3 profils';
END $$;
