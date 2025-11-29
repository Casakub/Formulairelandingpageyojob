-- ═══════════════════════════════════════════════════════════════════════
-- CORRECTION URGENTE : RLS Policy pour Insertions Publiques
-- ═══════════════════════════════════════════════════════════════════════
-- Date: 29 Novembre 2024
-- Problème: Les insertions publiques étaient bloquées par RLS
-- Solution: Ajouter "TO anon, authenticated" à la policy
-- ═══════════════════════════════════════════════════════════════════════

-- Étape 1: Supprimer l'ancienne policy
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;

-- Étape 2: Recréer la policy avec la bonne configuration
CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Étape 3: Vérifier que les permissions GRANT sont toujours là
GRANT INSERT ON market_research_responses TO anon;
GRANT SELECT, UPDATE, DELETE ON market_research_responses TO authenticated;
GRANT ALL ON market_research_responses TO service_role;

-- ═══════════════════════════════════════════════════════════════════════
-- VÉRIFICATION
-- ═══════════════════════════════════════════════════════════════════════

-- Afficher les policies actives
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'market_research_responses';

-- ═══════════════════════════════════════════════════════════════════════
-- RÉSULTAT ATTENDU
-- ═══════════════════════════════════════════════════════════════════════
-- Vous devriez voir :
-- - allow_public_inserts avec roles = {anon, authenticated} et cmd = INSERT
-- - allow_authenticated_reads avec roles = {authenticated, service_role} et cmd = SELECT
-- - allow_authenticated_updates avec roles = {authenticated, service_role} et cmd = UPDATE  
-- - allow_authenticated_deletes avec roles = {authenticated, service_role} et cmd = DELETE
-- ═══════════════════════════════════════════════════════════════════════
