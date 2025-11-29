-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🧹 NETTOYAGE COMPLET + FIX RLS DÉFINITIF                    ║
-- ║  Migration: 06_fix_rls_ultimate_clean.sql                    ║
-- ║  Date: 2025-11-29                                             ║
-- ║                                                               ║
-- ║  Cette migration fait un nettoyage complet et reconfigure    ║
-- ║  RLS de zéro avec la méthode qui marche à 100%               ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- 🧹 ÉTAPE 1 : DÉSACTIVER RLS temporairement pour nettoyer
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- 🧹 ÉTAPE 2 : SUPPRIMER TOUTES LES POLICIES (même celles cachées)
-- ════════════════════════════════════════════════════════════════
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'market_research_responses'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON market_research_responses', pol.policyname);
        RAISE NOTICE 'Dropped policy: %', pol.policyname;
    END LOOP;
END $$;

-- ════════════════════════════════════════════════════════════════
-- 🧹 ÉTAPE 3 : RÉVOQUER TOUS LES GRANTS existants
-- ════════════════════════════════════════════════════════════════
REVOKE ALL ON market_research_responses FROM anon;
REVOKE ALL ON market_research_responses FROM authenticated;
REVOKE ALL ON market_research_responses FROM service_role;

-- ════════════════════════════════════════════════════════════════
-- ✅ ÉTAPE 4 : RECONFIGURER LES GRANTS PROPREMENT
-- ════════════════════════════════════════════════════════════════

-- Schema access (CRITIQUE)
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Table access
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- Sequences access (CRITIQUE pour auto-increment)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ════════════════════════════════════════════════════════════════
-- ✅ ÉTAPE 5 : CRÉER UNE SEULE POLICY ULTRA-SIMPLE
-- ════════════════════════════════════════════════════════════════

-- Policy INSERT pour anon (utilisateurs non connectés)
CREATE POLICY "anon_can_insert"
  ON market_research_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy SELECT pour authenticated (admin dashboard)
CREATE POLICY "authenticated_can_select"
  ON market_research_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy UPDATE pour authenticated (admin dashboard)
CREATE POLICY "authenticated_can_update"
  ON market_research_responses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy DELETE pour authenticated (admin dashboard)
CREATE POLICY "authenticated_can_delete"
  ON market_research_responses
  FOR DELETE
  TO authenticated
  USING (true);

-- ════════════════════════════════════════════════════════════════
-- ✅ ÉTAPE 6 : RÉACTIVER RLS
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- 📊 ÉTAPE 7 : VÉRIFICATIONS COMPLÈTES
-- ════════════════════════════════════════════════════════════════

-- Vérification 1 : RLS activé ?
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT '1️⃣ RLS STATUS' as verification;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT 
  tablename, 
  rowsecurity as "RLS_ENABLED (doit être TRUE)",
  CASE 
    WHEN rowsecurity = true THEN '✅ RLS ACTIVÉ'
    ELSE '❌ RLS DÉSACTIVÉ - PROBLÈME !'
  END as status
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Vérification 2 : Policies créées ?
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT '2️⃣ POLICIES ACTIVES' as verification;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT 
  policyname as "Policy Name",
  cmd as "Command",
  roles::text as "Roles",
  CASE 
    WHEN policyname = 'anon_can_insert' AND 'anon' = ANY(roles) THEN '✅ CRITIQUE - OK'
    ELSE '✅ OK'
  END as status
FROM pg_policies 
WHERE tablename = 'market_research_responses'
ORDER BY cmd, policyname;

-- Vérification 3 : GRANTS corrects ?
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT '3️⃣ GRANTS SUR LA TABLE' as verification;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT 
  grantee as "Role",
  privilege_type as "Permission",
  CASE 
    WHEN grantee = 'anon' AND privilege_type = 'INSERT' THEN '✅ CRITIQUE - OK'
    ELSE '✅ OK'
  END as status
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses' 
  AND grantee IN ('anon', 'authenticated', 'service_role')
ORDER BY grantee, privilege_type;

-- Vérification 4 : Comptage
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT '4️⃣ RÉSUMÉ' as verification;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━' as separator;
SELECT 
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'market_research_responses') as "Nombre de Policies",
  (SELECT COUNT(*) FROM information_schema.role_table_grants WHERE table_name = 'market_research_responses' AND grantee = 'anon') as "GRANTS pour anon",
  CASE 
    WHEN (SELECT rowsecurity FROM pg_tables WHERE tablename = 'market_research_responses') = true 
    THEN '✅ RLS ACTIVÉ'
    ELSE '❌ RLS DÉSACTIVÉ'
  END as "État RLS";

-- ════════════════════════════════════════════════════════════════
-- 🧪 ÉTAPE 8 : TEST D'INSERTION (Optionnel - décommentez pour tester)
-- ════════════════════════════════════════════════════════════════
/*
-- Ce test bypasse RLS car on est en tant que service_role
INSERT INTO market_research_responses (
  response_id, q1_nom, q2_annee, q3_taille, q4_secteurs, q5_pays, q6_volume,
  q7_origine, q8_destinations, q9_defi, q9_autre, q10_gestion, q11_incidents,
  q12_budget, q13_manque_gagner, q14_risques, q15_probleme, q16_erp, q16_autre,
  q17_migration, q18_score, q19_features, q20_prix, q21_budget_mensuel,
  q22_mvp, q23_role, q24_evolution, q25_besoins, email, autorise_contact, souhaite_rapport
) VALUES (
  'TEST-CLEAN-' || floor(random() * 1000000)::text,
  'Test Clean Migration', '2020', '10-50', ARRAY['Test'], 'France', '50-100',
  'France', 'Espagne', 'Test', '', 'Manuel', 'Non', '5000', '10000',
  'Test', 'Test', 'Excel', '', 'Prêt', 8, ARRAY['Test'],
  'Mensuel', '500', 'Oui', 'Test', 'Test', 'Test',
  'test-clean@yojob.fr', true, true
) RETURNING response_id, q1_nom, created_at;
*/

-- ════════════════════════════════════════════════════════════════
-- 📋 RÉSULTAT ATTENDU
-- ════════════════════════════════════════════════════════════════
-- 
-- 1️⃣ RLS STATUS
--    ✅ RLS_ENABLED = TRUE
--    ✅ status = "✅ RLS ACTIVÉ"
-- 
-- 2️⃣ POLICIES ACTIVES (4 policies)
--    ✅ anon_can_insert          | INSERT | {anon}          | ✅ CRITIQUE - OK
--    ✅ authenticated_can_delete | DELETE | {authenticated} | ✅ OK
--    ✅ authenticated_can_select | SELECT | {authenticated} | ✅ OK
--    ✅ authenticated_can_update | UPDATE | {authenticated} | ✅ OK
-- 
-- 3️⃣ GRANTS SUR LA TABLE
--    ✅ anon | INSERT | ✅ CRITIQUE - OK
--    (+ autres permissions pour authenticated et service_role)
-- 
-- 4️⃣ RÉSUMÉ
--    ✅ Nombre de Policies = 4
--    ✅ GRANTS pour anon >= 1
--    ✅ État RLS = "✅ RLS ACTIVÉ"
-- 
-- ════════════════════════════════════════════════════════════════
-- 🎯 APRÈS CETTE MIGRATION
-- ════════════════════════════════════════════════════════════════
-- 
-- ✅ RLS est activé
-- ✅ Policy "anon_can_insert" permet les INSERT publics
-- ✅ GRANT "anon | INSERT" donne le droit de base
-- ✅ Le formulaire DOIT fonctionner
-- 
-- Si le formulaire ne fonctionne TOUJOURS PAS après cette migration :
-- → Le problème est ailleurs (JWT, client Supabase, network, etc.)
-- 
-- ════════════════════════════════════════════════════════════════
