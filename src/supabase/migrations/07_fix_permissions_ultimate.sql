-- ══════════════════════════════════════════════════════════════════
-- 🔧 FIX ULTIMATE - PERMISSIONS POSTGRES + RLS
-- ══════════════════════════════════════════════════════════════════
-- Ce script GARANTIT que le rôle anon peut INSERT dans la table
-- Exécutez-le dans Supabase SQL Editor si le problème persiste
-- ══════════════════════════════════════════════════════════════════

-- 1️⃣ DÉSACTIVER RLS temporairement pour tester
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- 2️⃣ SUPPRIMER TOUTES les policies existantes
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_public_insert" ON market_research_responses;
DROP POLICY IF EXISTS "allow_anon_insert" ON market_research_responses;
DROP POLICY IF EXISTS "Enable insert for anon" ON market_research_responses;
DROP POLICY IF EXISTS "Allow public inserts" ON market_research_responses;

-- 3️⃣ RÉVOQUER puis RE-GRANTER les permissions (pour forcer la mise à jour)
REVOKE ALL ON market_research_responses FROM anon;
REVOKE ALL ON market_research_responses FROM authenticated;

-- 4️⃣ GRANTER les permissions explicitement
GRANT SELECT ON market_research_responses TO anon;
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT ON market_research_responses TO authenticated;
GRANT INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;

-- 5️⃣ GRANTER l'accès à la séquence (pour les IDs auto-incrémentés)
GRANT USAGE, SELECT ON SEQUENCE market_research_responses_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE market_research_responses_id_seq TO authenticated;

-- 6️⃣ VÉRIFIER que les GRANTS sont appliqués
SELECT 
  grantee, 
  privilege_type,
  '✅' as status
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
AND grantee IN ('anon', 'authenticated')
ORDER BY grantee, privilege_type;

-- 7️⃣ TEST: Essayer un INSERT en tant que anon
-- (Cette ligne va échouer car on ne peut pas changer de rôle dans SQL Editor,
--  mais elle montre la syntaxe)
-- SET ROLE anon;
-- INSERT INTO market_research_responses (response_id, q1_nom, ...) VALUES (...);
-- RESET ROLE;

-- 8️⃣ RÉACTIVER RLS
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- 9️⃣ CRÉER UNE POLICY ULTRA-PERMISSIVE pour anon
CREATE POLICY "allow_public_insert_ultimate"
  ON market_research_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 🔟 POLICY pour authenticated (admin)
CREATE POLICY "allow_authenticated_all"
  ON market_research_responses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ══════════════════════════════════════════════════════════════════
-- ✅ VÉRIFICATIONS FINALES
-- ══════════════════════════════════════════════════════════════════

-- Vérifier RLS status
SELECT 
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN '🟢 ACTIVÉ' ELSE '🔴 DÉSACTIVÉ' END as rls_status
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Vérifier les policies
SELECT 
  policyname,
  cmd,
  roles,
  '✅' as status
FROM pg_policies 
WHERE tablename = 'market_research_responses';

-- Vérifier les GRANTS
SELECT 
  grantee,
  string_agg(privilege_type, ', ') as permissions
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
AND grantee IN ('anon', 'authenticated')
GROUP BY grantee;

-- ══════════════════════════════════════════════════════════════════
-- 📊 RÉSULTATS ATTENDUS
-- ══════════════════════════════════════════════════════════════════
-- RLS Status: 🟢 ACTIVÉ
-- Policies: 
--   - allow_public_insert_ultimate (INSERT, anon)
--   - allow_authenticated_all (ALL, authenticated)
-- GRANTS:
--   - anon: SELECT, INSERT
--   - authenticated: SELECT, INSERT, UPDATE, DELETE
-- ══════════════════════════════════════════════════════════════════
