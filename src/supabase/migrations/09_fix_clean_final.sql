-- ══════════════════════════════════════════════════════════════════
-- 🔧 FIX CLEAN FINAL - Nettoie TOUT puis reconfigure
-- ══════════════════════════════════════════════════════════════════

-- 1️⃣ DÉSACTIVER RLS
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- 2️⃣ SUPPRIMER **TOUTES** LES POLICIES (même les nouvelles)
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_public_insert" ON market_research_responses;
DROP POLICY IF EXISTS "allow_anon_insert" ON market_research_responses;
DROP POLICY IF EXISTS "Enable insert for anon" ON market_research_responses;
DROP POLICY IF EXISTS "Allow public inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_public_insert_ultimate" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_all" ON market_research_responses;
DROP POLICY IF EXISTS "anon_can_insert" ON market_research_responses;
DROP POLICY IF EXISTS "anon_can_select" ON market_research_responses;
DROP POLICY IF EXISTS "authenticated_all_access" ON market_research_responses;

-- 3️⃣ NETTOYER les GRANTS
REVOKE ALL ON market_research_responses FROM anon;
REVOKE ALL ON market_research_responses FROM authenticated;

-- 4️⃣ RE-GRANTER proprement
GRANT SELECT, INSERT ON market_research_responses TO anon;
GRANT ALL ON market_research_responses TO authenticated;

-- 5️⃣ RÉACTIVER RLS
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- 6️⃣ CRÉER 3 POLICIES PROPRES
CREATE POLICY "anon_insert_policy"
  ON market_research_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_policy"
  ON market_research_responses
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "authenticated_full_access"
  ON market_research_responses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ✅ VÉRIFICATIONS
SELECT '✅ RLS Status' as check_type, 
       CASE WHEN rowsecurity THEN 'ACTIVÉ ✓' ELSE 'DÉSACTIVÉ ✗' END as result
FROM pg_tables 
WHERE tablename = 'market_research_responses';

SELECT '✅ Policies' as check_type, 
       count(*)::text || ' policies créées' as result
FROM pg_policies 
WHERE tablename = 'market_research_responses';

SELECT '✅ GRANTS' as check_type,
       grantee || ': ' || string_agg(privilege_type, ', ' ORDER BY privilege_type) as result
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
AND grantee IN ('anon', 'authenticated')
GROUP BY grantee;
