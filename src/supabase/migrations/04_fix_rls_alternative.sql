-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🔧 FIX RLS ALTERNATIF - APPROCHE JWT                        ║
-- ║  Migration: 04_fix_rls_alternative.sql                       ║
-- ║  Date: 2025-11-29                                             ║
-- ║                                                               ║
-- ║  Cette approche utilise auth.role() pour vérifier            ║
-- ║  explicitement le rôle du client Supabase                    ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 1 : Désactiver RLS temporairement
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 2 : Supprimer toutes les policies existantes
-- ════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_reads" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_updates" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_deletes" ON market_research_responses;
DROP POLICY IF EXISTS "allow_anon_inserts" ON market_research_responses;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 3 : GRANTS (s'assurer que les permissions sont bonnes)
-- ════════════════════════════════════════════════════════════════
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT ALL ON market_research_responses TO anon;
GRANT ALL ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- Permissions sur la séquence (pour l'auto-increment de l'ID)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 4 : Créer des policies avec vérification explicite du rôle
-- ════════════════════════════════════════════════════════════════

-- Policy 1: Insertion pour role 'anon' (formulaire public)
-- Utilise auth.role() pour vérifier explicitement le rôle JWT
CREATE POLICY "allow_anon_inserts"
  ON market_research_responses
  FOR INSERT
  WITH CHECK (
    auth.role() = 'anon' OR auth.role() = 'authenticated' OR auth.role() = 'service_role'
  );

-- Policy 2: Lecture pour authenticated (dashboard)
CREATE POLICY "allow_authenticated_reads"
  ON market_research_responses
  FOR SELECT
  USING (
    auth.role() = 'authenticated' OR auth.role() = 'service_role'
  );

-- Policy 3: Update pour authenticated
CREATE POLICY "allow_authenticated_updates"
  ON market_research_responses
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy 4: Delete pour authenticated
CREATE POLICY "allow_authenticated_deletes"
  ON market_research_responses
  FOR DELETE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 5 : Réactiver RLS
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 6 : Vérifications
-- ════════════════════════════════════════════════════════════════

-- Vérifier RLS
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'market_research_responses';

-- Vérifier les policies
SELECT policyname, roles, cmd FROM pg_policies WHERE tablename = 'market_research_responses' ORDER BY policyname;

-- Vérifier les grants
SELECT grantee, privilege_type FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses' 
  AND grantee IN ('anon', 'authenticated', 'service_role')
ORDER BY grantee, privilege_type;

-- ════════════════════════════════════════════════════════════════
-- 📝 NOTES
-- ════════════════════════════════════════════════════════════════
-- 
-- Cette approche utilise auth.role() qui retourne le rôle JWT
-- du client Supabase actuel:
--   - 'anon' pour les utilisateurs non connectés (formulaire)
--   - 'authenticated' pour les utilisateurs connectés (dashboard)
--   - 'service_role' pour les opérations backend
-- 
-- C'est plus explicite que "TO public" ou "TO anon, authenticated"
-- et devrait résoudre le problème.
-- ════════════════════════════════════════════════════════════════
