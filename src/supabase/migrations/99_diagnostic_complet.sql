-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🔍 DIAGNOSTIC COMPLET - POURQUOI RLS NE FONCTIONNE PAS ?    ║
-- ║  Migration: 99_diagnostic_complet.sql                        ║
-- ║  Date: 2025-11-29                                             ║
-- ║                                                               ║
-- ║  Exécutez ce fichier pour avoir un diagnostic complet        ║
-- ║  de la configuration RLS et des permissions                  ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- 1. VÉRIFIER L'ÉTAT DE RLS
-- ════════════════════════════════════════════════════════════════
SELECT 
  '1. État de RLS' as "Vérification",
  tablename, 
  rowsecurity as "RLS Activé"
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- ════════════════════════════════════════════════════════════════
-- 2. LISTER TOUTES LES POLICIES
-- ════════════════════════════════════════════════════════════════
SELECT 
  '2. Policies' as "Vérification",
  policyname as "Policy Name",
  roles as "Rôles",
  cmd as "Command",
  permissive as "Permissive",
  qual as "USING Expression",
  with_check as "WITH CHECK Expression"
FROM pg_policies
WHERE tablename = 'market_research_responses'
ORDER BY policyname;

-- ════════════════════════════════════════════════════════════════
-- 3. VÉRIFIER LES GRANTS (Permissions de table)
-- ════════════════════════════════════════════════════════════════
SELECT 
  '3. GRANTS' as "Vérification",
  grantee as "Rôle", 
  privilege_type as "Permission"
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
  AND grantee IN ('anon', 'authenticated', 'service_role', 'public')
ORDER BY grantee, privilege_type;

-- ════════════════════════════════════════════════════════════════
-- 4. VÉRIFIER LES GRANTS SUR LE SCHEMA
-- ════════════════════════════════════════════════════════════════
SELECT 
  '4. Schema Permissions' as "Vérification",
  grantee as "Rôle",
  privilege_type as "Permission sur Schema"
FROM information_schema.usage_privileges
WHERE object_schema = 'public'
  AND grantee IN ('anon', 'authenticated', 'service_role', 'public')
ORDER BY grantee;

-- ════════════════════════════════════════════════════════════════
-- 5. VÉRIFIER LES SÉQUENCES (pour auto-increment)
-- ════════════════════════════════════════════════════════════════
SELECT 
  '5. Séquences' as "Vérification",
  grantee as "Rôle",
  privilege_type as "Permission Séquence"
FROM information_schema.usage_privileges
WHERE object_name LIKE 'market_research_responses%'
  AND grantee IN ('anon', 'authenticated', 'service_role', 'public')
ORDER BY grantee;

-- ════════════════════════════════════════════════════════════════
-- 6. TESTER L'INSERTION DIRECTE (en tant que service_role)
-- ════════════════════════════════════════════════════════════════
-- Cette insertion devrait TOUJOURS fonctionner car service_role bypass RLS
INSERT INTO market_research_responses (
  response_id, q1_nom, q2_annee, q3_taille, q4_secteurs, q5_pays, q6_volume,
  q7_origine, q8_destinations, q9_defi, q9_autre, q10_gestion, q11_incidents,
  q12_budget, q13_manque_gagner, q14_risques, q15_probleme, q16_erp, q16_autre,
  q17_migration, q18_score, q19_features, q20_prix, q21_budget_mensuel,
  q22_mvp, q23_role, q24_evolution, q25_besoins, email, autorise_contact, souhaite_rapport
) VALUES (
  'DIAG-' || floor(random() * 1000000)::text,
  'Test Diagnostic', '2020', '10-50', ARRAY['Test'], 'France', '50-100',
  'France', 'Espagne', 'Test', '', 'Manuel', 'Non', '5000', '10000',
  'Test', 'Test problème', 'Excel', '', 'Prêt', 8, ARRAY['Test feature'],
  'Mensuel', '500', 'Oui', 'Test', 'Test evolution', 'Test besoins',
  'diagnostic@test.com', true, true
) RETURNING response_id, created_at;

-- Si ça fonctionne, vous verrez le response_id → RLS bypass OK pour service_role

-- ════════════════════════════════════════════════════════════════
-- 7. VÉRIFIER LA STRUCTURE DE LA TABLE
-- ════════════════════════════════════════════════════════════════
SELECT 
  '7. Structure Table' as "Vérification",
  column_name as "Colonne",
  data_type as "Type",
  is_nullable as "Nullable",
  column_default as "Défaut"
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
  AND column_name IN ('id', 'created_at', 'response_id', 'email')
ORDER BY ordinal_position;

-- ════════════════════════════════════════════════════════════════
-- 8. COMPTER LES LIGNES EXISTANTES
-- ════════════════════════════════════════════════════════════════
SELECT 
  '8. Données' as "Vérification",
  COUNT(*) as "Nombre de réponses"
FROM market_research_responses;

-- ════════════════════════════════════════════════════════════════
-- 📊 INTERPRÉTATION DES RÉSULTATS
-- ════════════════════════════════════════════════════════════════
-- 
-- ✅ CE QU'IL FAUT VOIR:
-- 
-- 1. État de RLS
--    → rowsecurity = true (si RLS activé) ou false (si désactivé)
-- 
-- 2. Policies
--    → Au moins 1 policy pour INSERT avec anon ou public
--    → Example: allow_anon_inserts avec rôle {anon} ou {public}
-- 
-- 3. GRANTS
--    → anon doit avoir au minimum: INSERT
--    → authenticated doit avoir: SELECT, INSERT, UPDATE, DELETE
--    → Si vous ne voyez PAS "anon" → C'EST LE PROBLÈME !
-- 
-- 4. Schema Permissions
--    → anon doit avoir USAGE sur schema public
--    → Si absent → Les rôles ne peuvent pas accéder au schema
-- 
-- 5. Séquences
--    → anon doit avoir USAGE sur les séquences
--    → Nécessaire pour l'auto-increment de l'ID
-- 
-- 6. Test d'insertion
--    → Si ça fonctionne → service_role OK, le problème est bien RLS
--    → Si ça échoue → Problème de structure de table
-- 
-- 7. Structure Table
--    → id doit avoir un défaut (auto-increment)
--    → created_at doit avoir un défaut (now())
-- 
-- 8. Données
--    → Nombre de réponses déjà enregistrées
-- 
-- ════════════════════════════════════════════════════════════════
-- 🚨 PROBLÈMES COURANTS
-- ════════════════════════════════════════════════════════════════
-- 
-- PROBLÈME 1: anon n'apparaît pas dans les GRANTS
-- → Solution: GRANT INSERT ON market_research_responses TO anon;
-- 
-- PROBLÈME 2: anon n'a pas USAGE sur schema public
-- → Solution: GRANT USAGE ON SCHEMA public TO anon;
-- 
-- PROBLÈME 3: anon n'a pas USAGE sur les séquences
-- → Solution: GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
-- 
-- PROBLÈME 4: Aucune policy ne permet INSERT pour anon
-- → Solution: Créer une policy FOR INSERT TO anon WITH CHECK (true);
-- 
-- PROBLÈME 5: Les policies existent mais utilisent auth.role() qui ne fonctionne pas
-- → Solution: Utiliser TO anon directement au lieu de WITH CHECK (auth.role() = 'anon')
-- 
-- ════════════════════════════════════════════════════════════════
