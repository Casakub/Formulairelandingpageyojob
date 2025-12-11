-- 🚀 QUICK FIX : Rafraîchir le Schema Cache
-- Copie-colle ce script dans Supabase SQL Editor et exécute
-- Date: 11 Décembre 2024

-- ============================================
-- ÉTAPE 1 : DIAGNOSTIC
-- ============================================

SELECT '📊 ÉTAPE 1/4 : Vérification de la table...' as status;

-- Vérifier que la table existe
DO $$
DECLARE
  table_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'translations_10092a63'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✅ Table translations_10092a63 trouvée !';
  ELSE
    RAISE EXCEPTION '❌ ERREUR : Table translations_10092a63 INTROUVABLE ! Exécute d''abord la migration 17.';
  END IF;
END $$;

-- Compter les données
SELECT 
  '✅ Total traductions: ' || COUNT(*) || ' | Langues: ' || COUNT(DISTINCT language) as info
FROM translations_10092a63;

-- Afficher quelques exemples
SELECT '📝 Exemples de traductions:' as info;
SELECT language, key, LEFT(value, 50) as value_preview 
FROM translations_10092a63 
ORDER BY language, key
LIMIT 5;

-- ============================================
-- ÉTAPE 2 : VÉRIFIER LES PERMISSIONS
-- ============================================

SELECT '🔐 ÉTAPE 2/4 : Vérification des permissions...' as status;

-- Vérifier RLS
SELECT 
  CASE 
    WHEN relrowsecurity THEN '✅ RLS activé'
    ELSE '❌ RLS désactivé (PROBLÈME !)'
  END as rls_status
FROM pg_class 
WHERE relname = 'translations_10092a63';

-- Vérifier les policies
SELECT '📋 Policies RLS:' as info;
SELECT 
  policyname,
  CASE 
    WHEN cmd = 'SELECT' THEN '✅ SELECT'
    WHEN cmd = 'ALL' THEN '✅ ALL'
    ELSE cmd
  END as commande
FROM pg_policies 
WHERE tablename = 'translations_10092a63';

-- ============================================
-- ÉTAPE 3 : FORCER LE REFRESH DU CACHE
-- ============================================

SELECT '🔄 ÉTAPE 3/4 : Refresh du schema cache...' as status;

-- Méthode 1 : NOTIFY
NOTIFY pgrst, 'reload schema';

-- Méthode 2 : pg_notify
SELECT pg_notify('pgrst', 'reload config');

-- Méthode 3 : Force la réanalyse de la table
ANALYZE translations_10092a63;

SELECT '✅ Schema cache rafraîchi !' as status;

-- ============================================
-- ÉTAPE 4 : CONFIRMATION
-- ============================================

SELECT '🎉 ÉTAPE 4/4 : Récapitulatif' as status;

SELECT 
  '✅ Table existe: translations_10092a63' as check_1,
  '✅ Données présentes: ' || COUNT(*) as check_2,
  '✅ Langues disponibles: ' || COUNT(DISTINCT language) as check_3,
  '✅ Schema cache rafraîchi' as check_4
FROM translations_10092a63;

-- ============================================
-- INSTRUCTIONS SUIVANTES
-- ============================================

SELECT 
  '⏳ ATTENDS 30 SECONDES puis rafraîchis ton app (F5)' as instruction_1,
  '🧪 Ensuite ouvre /test-translations-system.html pour vérifier' as instruction_2,
  '✅ L''erreur devrait avoir disparu !' as instruction_3;
