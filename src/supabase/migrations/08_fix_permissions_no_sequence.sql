-- ══════════════════════════════════════════════════════════════════
-- 🔧 FIX ULTIMATE V2 - PERMISSIONS POSTGRES + RLS (Sans séquence)
-- ══════════════════════════════════════════════════════════════════
-- Version corrigée qui ne dépend pas de la séquence
-- ══════════════════════════════════════════════════════════════════

-- 1️⃣ DÉSACTIVER RLS temporairement
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- 2️⃣ SUPPRIMER TOUTES les policies existantes
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_public_insert" ON market_research_responses;
DROP POLICY IF EXISTS "allow_anon_insert" ON market_research_responses;
DROP POLICY IF EXISTS "Enable insert for anon" ON market_research_responses;
DROP POLICY IF EXISTS "Allow public inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_public_insert_ultimate" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_all" ON market_research_responses;

-- 3️⃣ RÉVOQUER puis RE-GRANTER les permissions
REVOKE ALL ON market_research_responses FROM anon;
REVOKE ALL ON market_research_responses FROM authenticated;

-- 4️⃣ GRANTER les permissions DE BASE
GRANT SELECT ON market_research_responses TO anon;
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT ON market_research_responses TO authenticated;
GRANT INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;

-- 5️⃣ GRANTER ALL PRIVILEGES (pour être sûr)
GRANT ALL PRIVILEGES ON TABLE market_research_responses TO postgres;

-- 6️⃣ RÉACTIVER RLS
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- 7️⃣ CRÉER POLICY ULTRA-PERMISSIVE pour anon (INSERT seulement)
CREATE POLICY "anon_can_insert"
  ON market_research_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 8️⃣ POLICY pour anon (SELECT - pour vérifier les données)
CREATE POLICY "anon_can_select"
  ON market_research_responses
  FOR SELECT
  TO anon
  USING (true);

-- 9️⃣ POLICY pour authenticated (ALL - admin)
CREATE POLICY "authenticated_all_access"
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
  CASE WHEN rowsecurity THEN '🟢 RLS ACTIVÉ' ELSE '🔴 RLS DÉSACTIVÉ' END as status
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Vérifier les policies
SELECT 
  policyname,
  cmd as operation,
  roles,
  '✅' as status
FROM pg_policies 
WHERE tablename = 'market_research_responses'
ORDER BY policyname;

-- Vérifier les GRANTS
SELECT 
  grantee as role,
  string_agg(privilege_type, ', ' ORDER BY privilege_type) as permissions,
  '✅' as status
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
AND grantee IN ('anon', 'authenticated', 'postgres')
GROUP BY grantee
ORDER BY grantee;

-- ══════════════════════════════════════════════════════════════════
-- 📊 RÉSULTATS ATTENDUS
-- ══════════════════════════════════════════════════════════════════
-- RLS: 🟢 ACTIVÉ
-- 
-- Policies (3):
--   ✅ anon_can_insert (INSERT, anon)
--   ✅ anon_can_select (SELECT, anon)
--   ✅ authenticated_all_access (ALL, authenticated)
--
-- GRANTS:
--   ✅ anon: INSERT, SELECT
--   ✅ authenticated: DELETE, INSERT, SELECT, UPDATE
--   ✅ postgres: (all)
-- ══════════════════════════════════════════════════════════════════
