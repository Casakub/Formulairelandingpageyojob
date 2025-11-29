-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  ✅ FIX RLS FINAL - VERSION ULTRA-SIMPLE QUI MARCHE          ║
-- ║  Migration: 05_fix_rls_final_simple.sql                      ║
-- ║  Date: 2025-11-29                                             ║
-- ║                                                               ║
-- ║  Cette version utilise l'approche la plus simple et robuste  ║
-- ║  basée sur ce qui fonctionne dans 99% des cas Supabase       ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 1 : Nettoyer toutes les policies existantes
-- ════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_anon_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_reads" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_updates" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_deletes" ON market_research_responses;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 2 : GRANTS - Donner TOUTES les permissions nécessaires
-- ════════════════════════════════════════════════════════════════

-- Permission sur le schema (CRITIQUE !)
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Permissions sur la table
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- Permissions sur les séquences (pour l'auto-increment de l'ID) - CRITIQUE !
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 3 : Créer UNE SEULE policy ultra-permissive pour INSERT
-- ════════════════════════════════════════════════════════════════

-- Policy pour anon : Autoriser TOUS les INSERT sans condition
CREATE POLICY "enable_insert_for_anon"
  ON market_research_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy pour authenticated : Autoriser TOUS les SELECT
CREATE POLICY "enable_select_for_authenticated"
  ON market_research_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy pour authenticated : Autoriser TOUS les UPDATE
CREATE POLICY "enable_update_for_authenticated"
  ON market_research_responses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy pour authenticated : Autoriser TOUS les DELETE
CREATE POLICY "enable_delete_for_authenticated"
  ON market_research_responses
  FOR DELETE
  TO authenticated
  USING (true);

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 4 : Réactiver RLS
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 5 : Vérifications
-- ════════════════════════════════════════════════════════════════

-- Vérifier que RLS est activé
SELECT 'RLS Status' as check_name, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Vérifier les policies
SELECT 'Policies' as check_name, policyname, roles::text, cmd 
FROM pg_policies 
WHERE tablename = 'market_research_responses' 
ORDER BY policyname;

-- Vérifier les GRANTS sur la table
SELECT 'Table Grants' as check_name, grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses' 
  AND grantee IN ('anon', 'authenticated')
ORDER BY grantee, privilege_type;

-- ════════════════════════════════════════════════════════════════
-- ✅ RÉSULTAT ATTENDU
-- ════════════════════════════════════════════════════════════════
-- 
-- 1. RLS Status
--    rowsecurity = true ✅
-- 
-- 2. Policies (4 policies)
--    enable_delete_for_authenticated  | {authenticated} | DELETE
--    enable_insert_for_anon           | {anon}          | INSERT ⚠️ CRITIQUE
--    enable_select_for_authenticated  | {authenticated} | SELECT
--    enable_update_for_authenticated  | {authenticated} | UPDATE
-- 
-- 3. Table Grants
--    anon          | INSERT
--    authenticated | DELETE
--    authenticated | INSERT
--    authenticated | SELECT
--    authenticated | UPDATE
-- 
-- ⚠️ Si vous NE VOYEZ PAS "anon | INSERT" dans les grants → Le problème persiste
-- 
-- ════════════════════════════════════════════════════════════════
-- 🧪 TEST (Optionnel)
-- ════════════════════════════════════════════════════════════════
-- Décommentez pour tester une insertion en tant que service_role
-- (bypass RLS, devrait toujours marcher)
/*
INSERT INTO market_research_responses (
  response_id, q1_nom, q2_annee, q3_taille, q4_secteurs, q5_pays, q6_volume,
  q7_origine, q8_destinations, q9_defi, q9_autre, q10_gestion, q11_incidents,
  q12_budget, q13_manque_gagner, q14_risques, q15_probleme, q16_erp, q16_autre,
  q17_migration, q18_score, q19_features, q20_prix, q21_budget_mensuel,
  q22_mvp, q23_role, q24_evolution, q25_besoins, email, autorise_contact, souhaite_rapport
) VALUES (
  'TEST-RLS-' || floor(random() * 1000000)::text,
  'Test RLS Réactivé', '2020', '10-50', ARRAY['Test'], 'France', '50-100',
  'France', 'Espagne', 'Test', '', 'Manuel', 'Non', '5000', '10000',
  'Test', 'Test', 'Excel', '', 'Prêt', 8, ARRAY['Test'],
  'Mensuel', '500', 'Oui', 'Test', 'Test', 'Test',
  'test-rls@yojob.fr', true, true
) RETURNING response_id;
*/

-- ════════════════════════════════════════════════════════════════
-- 📝 NOTES IMPORTANTES
-- ════════════════════════════════════════════════════════════════
-- 
-- Cette migration diffère des précédentes car elle :
-- 
-- 1. Utilise "TO anon" directement (pas "TO public", pas "auth.role()")
--    → Plus simple, plus robuste, standard Supabase
-- 
-- 2. Donne explicitement USAGE sur le schema public
--    → CRITIQUE : Sans ça, anon ne peut pas accéder aux tables
-- 
-- 3. Donne USAGE sur les séquences
--    → CRITIQUE : Sans ça, l'auto-increment de l'ID échoue
-- 
-- 4. Utilise des noms de policies clairs et descriptifs
--    → Plus facile à debugger
-- 
-- 5. WITH CHECK (true) = Aucune restriction
--    → Tout le monde peut insérer n'importe quoi (OK pour formulaire public)
-- 
-- ════════════════════════════════════════════════════════════════
