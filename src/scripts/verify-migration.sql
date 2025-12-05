-- 🔍 Script de Vérification Post-Migration
-- Exécutez ce script APRÈS avoir effectué la migration
-- pour vérifier que tout est correct

-- ═══════════════════════════════════════════════════════════
-- 1. VÉRIFICATION DES COLONNES REQUISES
-- ═══════════════════════════════════════════════════════════

DO $$
DECLARE
  v_q23_role_exists BOOLEAN;
  v_q24_evolution_exists BOOLEAN;
  v_q25_besoins_exists BOOLEAN;
  v_email_exists BOOLEAN;
  v_q23_amelioration_exists BOOLEAN;
  v_q24_priorite_exists BOOLEAN;
  v_all_ok BOOLEAN := TRUE;
BEGIN
  -- Vérifier q23_role (doit exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q23_role'
  ) INTO v_q23_role_exists;
  
  -- Vérifier q24_evolution (doit exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q24_evolution'
  ) INTO v_q24_evolution_exists;
  
  -- Vérifier q25_besoins (doit exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q25_besoins'
  ) INTO v_q25_besoins_exists;
  
  -- Vérifier email (doit exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'email'
  ) INTO v_email_exists;
  
  -- Vérifier q23_amelioration (NE doit PAS exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q23_amelioration'
  ) INTO v_q23_amelioration_exists;
  
  -- Vérifier q24_priorite (NE doit PAS exister)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q24_priorite'
  ) INTO v_q24_priorite_exists;

  -- Afficher les résultats
  RAISE NOTICE '════════════════════════════════════════════════════════';
  RAISE NOTICE '📊 VÉRIFICATION DE LA MIGRATION SQL';
  RAISE NOTICE '════════════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Colonnes qui DOIVENT exister :';
  
  IF v_q23_role_exists THEN
    RAISE NOTICE '   ✓ q23_role : Présente';
  ELSE
    RAISE NOTICE '   ✗ q23_role : MANQUANTE ❌';
    v_all_ok := FALSE;
  END IF;
  
  IF v_q24_evolution_exists THEN
    RAISE NOTICE '   ✓ q24_evolution : Présente';
  ELSE
    RAISE NOTICE '   ✗ q24_evolution : MANQUANTE ❌';
    v_all_ok := FALSE;
  END IF;
  
  IF v_q25_besoins_exists THEN
    RAISE NOTICE '   ✓ q25_besoins : Présente';
  ELSE
    RAISE NOTICE '   ✗ q25_besoins : MANQUANTE ❌';
    v_all_ok := FALSE;
  END IF;
  
  IF v_email_exists THEN
    RAISE NOTICE '   ✓ email : Présente';
  ELSE
    RAISE NOTICE '   ✗ email : MANQUANTE ❌';
    v_all_ok := FALSE;
  END IF;
  
  RAISE NOTICE '';
  RAISE NOTICE '❌ Colonnes qui NE doivent PAS exister :';
  
  IF NOT v_q23_amelioration_exists THEN
    RAISE NOTICE '   ✓ q23_amelioration : Absente (correct)';
  ELSE
    RAISE NOTICE '   ✗ q23_amelioration : PRÉSENTE (erreur) ❌';
    v_all_ok := FALSE;
  END IF;
  
  IF NOT v_q24_priorite_exists THEN
    RAISE NOTICE '   ✓ q24_priorite : Absente (correct)';
  ELSE
    RAISE NOTICE '   ✗ q24_priorite : PRÉSENTE (erreur) ❌';
    v_all_ok := FALSE;
  END IF;
  
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════';
  
  IF v_all_ok THEN
    RAISE NOTICE '🎉 SUCCÈS COMPLET ! La migration a été effectuée correctement.';
  ELSE
    RAISE NOTICE '⚠️  ATTENTION ! La migration n''est PAS complète. Voir les erreurs ci-dessus.';
  END IF;
  
  RAISE NOTICE '════════════════════════════════════════════════════════';
END $$;

-- ═══════════════════════════════════════════════════════════
-- 2. DÉTAILS DES COLONNES (TYPE, NULLABLE, DEFAULT)
-- ═══════════════════════════════════════════════════════════

SELECT 
  column_name as "Colonne",
  data_type as "Type",
  CASE 
    WHEN is_nullable = 'YES' THEN '✓ Optionnel'
    ELSE '✗ Requis'
  END as "Nullable",
  COALESCE(column_default, 'Aucun') as "Valeur par défaut"
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
  AND column_name IN ('q23_role', 'q24_evolution', 'q25_besoins', 'email')
ORDER BY column_name;

-- ═══════════════════════════════════════════════════════════
-- 3. VÉRIFICATION DES INDEX
-- ═══════════════════════════════════════════════════════════

SELECT 
  indexname as "Nom de l'index",
  indexdef as "Définition"
FROM pg_indexes
WHERE tablename = 'market_research_responses'
  AND indexname = 'idx_market_research_email';

-- ═══════════════════════════════════════════════════════════
-- 4. COMPTAGE TOTAL DES COLONNES
-- ═══════════════════════════════════════════════════════════

DO $$
DECLARE
  v_column_count INTEGER;
BEGIN
  SELECT COUNT(*) 
  FROM information_schema.columns
  WHERE table_name = 'market_research_responses'
  INTO v_column_count;
  
  RAISE NOTICE '';
  RAISE NOTICE '📊 Statistiques de la table :';
  RAISE NOTICE '   Total colonnes : % colonnes', v_column_count;
  
  IF v_column_count >= 30 THEN
    RAISE NOTICE '   Statut : ✅ Structure complète';
  ELSE
    RAISE NOTICE '   Statut : ⚠️  Colonnes manquantes possibles';
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════
-- 5. LISTE COMPLÈTE DES COLONNES QUESTIONS (Q1-Q26)
-- ═══════════════════════════════════════════════════════════

SELECT 
  column_name as "Colonne Question",
  CASE 
    WHEN column_name LIKE 'q1_%' OR column_name LIKE 'q2_%' 
      OR column_name LIKE 'q3_%' OR column_name LIKE 'q4_%' OR column_name LIKE 'q5_%' THEN 'Section 1'
    WHEN column_name LIKE 'q6_%' OR column_name LIKE 'q7_%' 
      OR column_name LIKE 'q8_%' OR column_name LIKE 'q9_%' 
      OR column_name LIKE 'q10_%' OR column_name LIKE 'q11_%' THEN 'Section 2'
    WHEN column_name LIKE 'q12_%' OR column_name LIKE 'q13_%' 
      OR column_name LIKE 'q14_%' OR column_name LIKE 'q15_%' 
      OR column_name LIKE 'q16_%' OR column_name LIKE 'q17_%' THEN 'Section 3'
    WHEN column_name LIKE 'q18_%' OR column_name LIKE 'q19_%' 
      OR column_name LIKE 'q20_%' OR column_name LIKE 'q21_%' 
      OR column_name LIKE 'q22_%' OR column_name LIKE 'q23_%' THEN 'Section 4'
    WHEN column_name LIKE 'q24_%' OR column_name LIKE 'q25_%' THEN 'Section 5'
    WHEN column_name = 'email' THEN 'Section 6'
    ELSE 'Autre'
  END as "Section",
  data_type as "Type"
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
  AND (
    column_name ~ '^q[0-9]+_' 
    OR column_name = 'email'
  )
ORDER BY 
  CASE 
    WHEN column_name ~ '^q([0-9]+)_' THEN 
      CAST(substring(column_name from '^q([0-9]+)_') AS INTEGER)
    WHEN column_name = 'email' THEN 99
    ELSE 100
  END;

-- ═══════════════════════════════════════════════════════════
-- FIN DU SCRIPT DE VÉRIFICATION
-- ═══════════════════════════════════════════════════════════

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════';
  RAISE NOTICE '✅ Vérification terminée !';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Prochaines étapes :';
  RAISE NOTICE '   1. Vérifiez que toutes les colonnes requises existent';
  RAISE NOTICE '   2. Testez le formulaire avec les 26 questions';
  RAISE NOTICE '   3. Soumettez une réponse de test';
  RAISE NOTICE '   4. Vérifiez dans le dashboard que tout s''affiche';
  RAISE NOTICE '';
  RAISE NOTICE '📚 Documentation : /MIGRATION_RAPIDE.md';
  RAISE NOTICE '════════════════════════════════════════════════════════';
END $$;
