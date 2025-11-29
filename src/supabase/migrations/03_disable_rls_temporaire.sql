-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🚨 SOLUTION TEMPORAIRE - DÉSACTIVER RLS                      ║
-- ║  Migration: 03_disable_rls_temporaire.sql                    ║
-- ║  Date: 2025-11-29                                             ║
-- ║                                                               ║
-- ║  ⚠️ ATTENTION: Cette solution désactive complètement RLS      ║
-- ║  pour permettre le test. À RÉACTIVER après debug !            ║
-- ║                                                               ║
-- ║  INSTRUCTIONS:                                                ║
-- ║  1. Copier-coller ce fichier dans Supabase SQL Editor        ║
-- ║  2. Exécuter (RUN)                                           ║
-- ║  3. Tester le formulaire                                     ║
-- ║  4. Si ça fonctionne → Le problème est bien RLS              ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- DÉSACTIVER RLS COMPLÈTEMENT (temporaire pour debug)
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- VÉRIFICATION
-- ════════════════════════════════════════════════════════════════
SELECT 
  tablename, 
  rowsecurity as "RLS activé"
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Résultat attendu: RLS activé = false

-- ════════════════════════════════════════════════════════════════
-- ⚠️ IMPORTANT
-- ════════════════════════════════════════════════════════════════
-- Avec RLS désactivé, TOUT LE MONDE peut lire/écrire dans la table.
-- Ceci est acceptable pour un formulaire public en phase de test.
-- 
-- ✅ AVANTAGES:
--    - Le formulaire fonctionnera immédiatement
--    - Permet d'isoler le problème (on saura que c'est bien RLS)
--    - Simplifie le debug
-- 
-- ❌ INCONVÉNIENTS:
--    - Pas de protection des données (acceptable pour un formulaire public)
--    - Le dashboard admin n'a pas besoin d'auth pour lire (à corriger plus tard)
-- 
-- 📝 TODO APRÈS TEST:
--    - Si ça fonctionne, on sait que le problème vient de la config RLS
--    - On pourra alors créer une policy plus permissive ou investiguer
--      pourquoi le rôle "anon" n'est pas reconnu
-- ════════════════════════════════════════════════════════════════
