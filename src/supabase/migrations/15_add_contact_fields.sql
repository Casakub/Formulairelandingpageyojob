-- =============================================================================
-- MIGRATION 15: Ajout des champs de contact enrichis
-- =============================================================================
-- Date: 10 Décembre 2024
-- Description: Ajoute téléphone, prénom, nom et SIRET pour qualification prospects
-- Table cible: market_research_responses
-- =============================================================================

-- ✅ Ajouter les nouvelles colonnes à la table market_research_responses
DO $$ 
BEGIN
  -- q26_phone: Téléphone professionnel
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q26_phone'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q26_phone TEXT;
    
    COMMENT ON COLUMN market_research_responses.q26_phone IS 
    'Téléphone professionnel du répondant (agency/client uniquement)';
  END IF;

  -- q27_firstname: Prénom
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q27_firstname'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q27_firstname TEXT;
    
    COMMENT ON COLUMN market_research_responses.q27_firstname IS 
    'Prénom du répondant (tous profils)';
  END IF;

  -- q28_lastname: Nom
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q28_lastname'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q28_lastname TEXT;
    
    COMMENT ON COLUMN market_research_responses.q28_lastname IS 
    'Nom du répondant (tous profils)';
  END IF;

  -- q29_siret: SIRET/SIREN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q29_siret'
  ) THEN
    ALTER TABLE market_research_responses 
    ADD COLUMN q29_siret TEXT;
    
    COMMENT ON COLUMN market_research_responses.q29_siret IS 
    'Numéro SIRET/SIREN pour enrichissement Pappers/Société.com (optionnel, agency/client)';
  END IF;
END $$;

-- ✅ Créer un index sur SIRET pour recherches rapides via API Pappers
CREATE INDEX IF NOT EXISTS idx_market_research_siret 
ON market_research_responses(q29_siret) 
WHERE q29_siret IS NOT NULL AND q29_siret != '';

-- ✅ Créer un index composite pour recherches par nom complet
CREATE INDEX IF NOT EXISTS idx_market_research_fullname 
ON market_research_responses(q27_firstname, q28_lastname) 
WHERE q27_firstname IS NOT NULL AND q28_lastname IS NOT NULL;

-- ✅ Créer un index sur téléphone pour dédoublonnage
CREATE INDEX IF NOT EXISTS idx_market_research_phone 
ON market_research_responses(q26_phone) 
WHERE q26_phone IS NOT NULL AND q26_phone != '';

-- ✅ Vérification finale
DO $$ 
DECLARE
  missing_columns TEXT[];
  col_count INTEGER := 0;
BEGIN
  -- Compter les colonnes créées
  SELECT COUNT(*) INTO col_count
  FROM information_schema.columns 
  WHERE table_name = 'market_research_responses' 
  AND column_name IN ('q26_phone', 'q27_firstname', 'q28_lastname', 'q29_siret');

  IF col_count = 4 THEN
    RAISE NOTICE '✅ Migration 15 réussie: 4 colonnes de contact ajoutées';
    RAISE NOTICE '   - q26_phone (téléphone professionnel)';
    RAISE NOTICE '   - q27_firstname (prénom)';
    RAISE NOTICE '   - q28_lastname (nom)';
    RAISE NOTICE '   - q29_siret (SIRET/SIREN)';
    RAISE NOTICE '✅ 3 index créés pour optimisation';
  ELSE
    -- Identifier les colonnes manquantes
    SELECT ARRAY_AGG(col) INTO missing_columns
    FROM (
      SELECT unnest(ARRAY['q26_phone', 'q27_firstname', 'q28_lastname', 'q29_siret']) AS col
      EXCEPT
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'market_research_responses' 
      AND column_name IN ('q26_phone', 'q27_firstname', 'q28_lastname', 'q29_siret')
    ) AS missing;
    
    RAISE EXCEPTION '❌ Migration 15 incomplète: Colonnes manquantes = %', missing_columns;
  END IF;
END $$;
