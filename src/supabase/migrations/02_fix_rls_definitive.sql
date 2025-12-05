-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🔧 FIX DÉFINITIF ERREUR RLS - YOJOB MARKET RESEARCH         ║
-- ║  Migration: 02_fix_rls_definitive.sql                        ║
-- ║  Date: 2025-11-29                                             ║
-- ║  Temps estimé: 1 minute                                       ║
-- ║                                                               ║
-- ║  INSTRUCTIONS:                                                ║
-- ║  1. Aller sur https://supabase.com/dashboard                  ║
-- ║  2. Projet: vhpbmckgxtdyxdwhmdxy                             ║
-- ║  3. SQL Editor → New Query                                   ║
-- ║  4. Copier-coller TOUT ce fichier                            ║
-- ║  5. Cliquer sur RUN (ou Ctrl+Enter)                          ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 1 : Désactiver temporairement RLS (pour nettoyage)
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 2 : Supprimer toutes les anciennes policies défectueuses
-- ════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_reads" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_updates" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_deletes" ON market_research_responses;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 3 : Donner les permissions GRANT nécessaires
-- ════════════════════════════════════════════════════════════════

-- Autoriser les utilisateurs anonymes (formulaire public) à INSERT
GRANT INSERT ON market_research_responses TO anon;

-- Autoriser les utilisateurs authentifiés (dashboard admin) à tout faire
GRANT SELECT, INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;

-- Le service_role (Supabase backend) a déjà tous les droits, mais on s'assure
GRANT ALL ON market_research_responses TO service_role;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 4 : Recréer les policies avec la syntaxe correcte
-- ════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────
-- Policy 1: Permettre à TOUS d'insérer (formulaire public)
-- ─────────────────────────────────────────────────────────────────
-- ⚠️ CHANGEMENT CLÉ: Utiliser "public" au lieu de "anon, authenticated"
-- En PostgreSQL/Supabase, "public" = TOUS les rôles (anon + authenticated)
-- C'est plus robuste et standard que la syntaxe "TO anon, authenticated"

CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO public  -- ✅ "public" = anon + authenticated + tous les autres rôles
  WITH CHECK (true);  -- Aucune restriction sur l'insertion

-- ─────────────────────────────────────────────────────────────────
-- Policy 2: Permettre aux users authentifiés de lire (dashboard)
-- ─────────────────────────────────────────────────────────────────
CREATE POLICY "allow_authenticated_reads"
  ON market_research_responses
  FOR SELECT
  TO authenticated
  USING (true);  -- Peut lire toutes les lignes

-- ─────────────────────────────────────────────────────────────────
-- Policy 3: Permettre aux users authentifiés de mettre à jour
-- ─────────────────────────────────────────────────────────────────
CREATE POLICY "allow_authenticated_updates"
  ON market_research_responses
  FOR UPDATE
  TO authenticated
  USING (true)  -- Peut modifier toutes les lignes
  WITH CHECK (true);  -- Aucune restriction sur les nouvelles valeurs

-- ─────────────────────────────────────────────────────────────────
-- Policy 4: Permettre aux users authentifiés de supprimer
-- ─────────────────────────────────────────────────────────────────
CREATE POLICY "allow_authenticated_deletes"
  ON market_research_responses
  FOR DELETE
  TO authenticated
  USING (true);  -- Peut supprimer toutes les lignes

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 5 : Réactiver RLS
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 6 : Vérification automatique (affichage des policies)
-- ════════════════════════════════════════════════════════════════
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'market_research_responses'
ORDER BY policyname;

-- ════════════════════════════════════════════════════════════════
-- ✅ RÉSULTAT ATTENDU DANS LES RESULTS
-- ════════════════════════════════════════════════════════════════
-- Vous devriez voir exactement 4 policies :
--
-- ┌──────────────────────────────┬─────────────────┬────────┐
-- │ policyname                   │ roles           │ cmd    │
-- ├──────────────────────────────┼─────────────────┼────────┤
-- │ allow_authenticated_deletes  │ {authenticated} │ DELETE │
-- │ allow_authenticated_reads    │ {authenticated} │ SELECT │
-- │ allow_authenticated_updates  │ {authenticated} │ UPDATE │
-- │ allow_public_inserts         │ {public}        │ INSERT │ ⚠️ IMPORTANT
-- └──────────────────────────────┴─────────────────┴────────┘
--
-- ⚠️ LA LIGNE CRITIQUE: "allow_public_inserts" avec roles = {public}
--
-- Si vous voyez {public} dans la colonne "roles" → ✅ C'EST BON !
-- Si vous voyez {anon,authenticated} → ❌ La syntaxe n'a pas marché
--
-- ════════════════════════════════════════════════════════════════

-- ════════════════════════════════════════════════════════════════
-- 📊 VÉRIFICATIONS SUPPLÉMENTAIRES (optionnel)
-- ════════════════════════════════════════════════════════════════

-- Vérifier que RLS est bien activé
SELECT 
  schemaname,
  tablename, 
  rowsecurity as "RLS activé"
FROM pg_tables 
WHERE tablename = 'market_research_responses';
-- Attendu: RLS activé = true

-- Vérifier les permissions GRANT
SELECT 
  grantee as "Rôle", 
  string_agg(privilege_type, ', ' ORDER BY privilege_type) as "Permissions"
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
  AND grantee IN ('anon', 'authenticated', 'service_role')
GROUP BY grantee
ORDER BY grantee;
-- Attendu:
--   anon          → INSERT
--   authenticated → DELETE, INSERT, SELECT, UPDATE
--   service_role  → DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE

-- ════════════════════════════════════════════════════════════════
-- 🧪 TEST D'INSERTION (optionnel - décommenter pour tester)
-- ════════════════════════════════════════════════════════════════
-- Décommentez les lignes ci-dessous pour tester une insertion directe
-- Si ça fonctionne, votre formulaire fonctionnera aussi !

/*
INSERT INTO market_research_responses (
  response_id, 
  q1_nom, 
  q2_annee, 
  q3_taille, 
  q4_secteurs,
  q5_pays,
  q6_volume,
  q7_origine,
  q8_destinations,
  q9_defi,
  q9_autre,
  q10_gestion,
  q11_incidents,
  q12_budget,
  q13_manque_gagner,
  q14_risques,
  q15_probleme,
  q16_erp,
  q16_autre,
  q17_migration,
  q18_score,
  q19_features,
  q20_prix,
  q21_budget_mensuel,
  q22_mvp,
  q23_role,
  q24_evolution,
  q25_besoins,
  email,
  autorise_contact,
  souhaite_rapport
) VALUES (
  'TEST-' || floor(random() * 1000000)::text,
  'Test Agency SQL Migration',
  '2010',
  '10-50 salariés',
  ARRAY['BTP', 'Industrie'],
  'France',
  '50-100 par an',
  'France, Allemagne',
  'Espagne, Portugal',
  'Conformité légale',
  '',
  'Manuel (Excel/Word)',
  'Oui, occasionnellement',
  '5 000 - 10 000 €',
  '10 000 - 20 000 €',
  'Conformité',
  'Gestion multi-pays complexe',
  'Autre',
  'Custom ERP',
  'Prêt à migrer maintenant',
  9,
  ARRAY['Gestion multi-pays', 'Automatisation documents'],
  'Abonnement mensuel/annuel',
  '500 - 1 000 €',
  'Oui, absolument',
  'Dirigeant/Gérant',
  'Expansion vers nouveaux pays',
  'Automatisation complète des processus',
  'test.migration@yojob.fr',
  true,
  true
) RETURNING response_id, q1_nom, email, created_at;

-- Si vous voyez le résultat avec le response_id → ✅ SUCCÈS !
*/

-- ════════════════════════════════════════════════════════════════
-- 📝 NOTES TECHNIQUES
-- ════════════════════════════════════════════════════════════════
-- 
-- Pourquoi "TO public" au lieu de "TO anon, authenticated" ?
-- ─────────────────────────────────────────────────────────────────
-- En PostgreSQL, le rôle "public" est un rôle spécial qui représente
-- TOUS les utilisateurs. C'est l'équivalent de "tout le monde".
-- 
-- Dans Supabase:
--   - "anon" = utilisateurs non authentifiés (formulaire public)
--   - "authenticated" = utilisateurs authentifiés (dashboard admin)
--   - "public" = anon + authenticated + tous les autres rôles
-- 
-- La syntaxe "TO anon, authenticated" peut causer des problèmes
-- avec certaines versions de PostgreSQL ou configurations RLS.
-- "TO public" est plus standard et robuste.
-- 
-- ════════════════════════════════════════════════════════════════
-- 🎯 APRÈS CE FIX
-- ════════════════════════════════════════════════════════════════
-- 
-- ✅ Le formulaire public pourra soumettre (rôle "anon")
-- ✅ Le dashboard admin pourra lire/modifier/supprimer (rôle "authenticated")
-- ✅ Plus d'erreur "42501 - row-level security policy"
-- 
-- ════════════════════════════════════════════════════════════════
