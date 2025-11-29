import { Copy, CheckCircle, Database, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useState } from 'react';

export default function FixRLSv2() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sqlFix = `-- ╔═══════════════════════════════════════════════════════════════╗
-- ║  🔧 FIX DÉFINITIF ERREUR RLS - YOJOB MARKET RESEARCH         ║
-- ║  Temps estimé: 1 minute                                       ║
-- ║  Copier-coller TOUT ce bloc dans Supabase SQL Editor         ║
-- ╚═══════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 1 : Désactiver temporairement RLS (pour test)
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses DISABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 2 : Supprimer toutes les anciennes policies
-- ════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_reads" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_updates" ON market_research_responses;
DROP POLICY IF EXISTS "allow_authenticated_deletes" ON market_research_responses;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 3 : Donner les permissions nécessaires aux rôles
-- ════════════════════════════════════════════════════════════════
-- Autoriser les utilisateurs anonymes à INSERT
GRANT INSERT ON market_research_responses TO anon;

-- Autoriser les utilisateurs authentifiés à tout faire
GRANT SELECT, INSERT, UPDATE, DELETE ON market_research_responses TO authenticated;

-- Le service_role a déjà tous les droits
GRANT ALL ON market_research_responses TO service_role;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 4 : Recréer les policies avec la syntaxe correcte
-- ════════════════════════════════════════════════════════════════

-- Policy 1: Permettre à TOUS (anon + authenticated) d'insérer
CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO public  -- ⚠️ CHANGEMENT ICI : "public" = anon + authenticated
  WITH CHECK (true);

-- Policy 2: Permettre aux users authentifiés de lire
CREATE POLICY "allow_authenticated_reads"
  ON market_research_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Permettre aux users authentifiés de mettre à jour
CREATE POLICY "allow_authenticated_updates"
  ON market_research_responses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Permettre aux users authentifiés de supprimer
CREATE POLICY "allow_authenticated_deletes"
  ON market_research_responses
  FOR DELETE
  TO authenticated
  USING (true);

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 5 : Réactiver RLS
-- ════════════════════════════════════════════════════════════════
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════
-- ÉTAPE 6 : Vérification (affichage des policies)
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
-- ✅ RÉSULTAT ATTENDU
-- ════════════════════════════════════════════════════════════════
-- Vous devriez voir 4 policies :
--
-- 1. allow_public_inserts
--    - roles: {public}
--    - cmd: INSERT
--    - with_check: true
--
-- 2. allow_authenticated_reads
--    - roles: {authenticated}
--    - cmd: SELECT
--    - qual: true
--
-- 3. allow_authenticated_updates
--    - roles: {authenticated}
--    - cmd: UPDATE
--    - qual: true, with_check: true
--
-- 4. allow_authenticated_deletes
--    - roles: {authenticated}
--    - cmd: DELETE
--    - qual: true
-- ════════════════════════════════════════════════════════════════`;

  const verificationSQL = `-- Vérifier que RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'market_research_responses';

-- Vérifier les policies
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'market_research_responses';

-- Vérifier les permissions GRANT
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'market_research_responses'
  AND grantee IN ('anon', 'authenticated', 'service_role');`;

  const testSQL = `-- Test d'insertion directe (à exécuter APRÈS le fix)
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
  'Test Agency',
  '2010',
  '10-50',
  ARRAY['BTP', 'Industrie'],
  'France',
  '50-100',
  'France, Allemagne',
  'Espagne, Portugal',
  'Conformité légale',
  '',
  'Manuel (Excel)',
  'Oui',
  '5000-10000',
  '10000-20000',
  'Conformité',
  'Gestion multi-pays complexe',
  'Autre',
  'Custom ERP',
  'Prêt',
  9,
  ARRAY['Gestion multi-pays', 'Automatisation'],
  'Abonnement',
  '500-1000',
  'Oui',
  'Dirigeant',
  'Expansion européenne',
  'Automatisation des processus',
  'test@example.com',
  true,
  true
);

-- Vérifier que ça a bien été inséré
SELECT response_id, q1_nom, email, created_at 
FROM market_research_responses 
WHERE response_id LIKE 'TEST-%'
ORDER BY created_at DESC 
LIMIT 1;`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-red-500/20 backdrop-blur-sm border border-red-500/50 px-6 py-3 rounded-full mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-red-200">Erreur RLS Détectée - Fix Immédiat Requis</span>
          </div>
          <h1 className="text-white mb-4">🔧 Fix Définitif Erreur RLS v2.0</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Solution ultra-robuste pour corriger l'erreur <code className="bg-white/10 px-2 py-1 rounded">42501 - row-level security policy</code>
          </p>
        </div>

        {/* Main Fix SQL */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Database className="w-6 h-6 text-cyan-400" />
              Étape 1 : Exécuter le Fix SQL Complet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <pre className="text-green-400 text-sm overflow-x-auto max-h-96 overflow-y-auto">
                {sqlFix}
              </pre>
              <Button
                onClick={() => copyToClipboard(sqlFix, 'main')}
                className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600"
                size="sm"
              >
                {copied === 'main' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </>
                )}
              </Button>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Instructions
              </h3>
              <ol className="text-yellow-200/80 space-y-2 text-sm">
                <li>1. Allez sur <a href="https://supabase.com/dashboard" target="_blank" className="text-cyan-400 underline">https://supabase.com/dashboard</a></li>
                <li>2. Sélectionnez votre projet : <code className="bg-white/10 px-2 py-1 rounded">vhpbmckgxtdyxdwhmdxy</code></li>
                <li>3. Menu latéral → <strong>SQL Editor</strong> → <strong>New Query</strong></li>
                <li>4. <strong>Collez TOUT le bloc SQL ci-dessus</strong></li>
                <li>5. Cliquez sur <strong>RUN</strong> (ou Ctrl+Enter)</li>
                <li>6. Attendez 2-3 secondes → Vous devriez voir <strong>Success</strong></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Verification SQL */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Étape 2 : Vérifier que le Fix a Fonctionné
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {verificationSQL}
              </pre>
              <Button
                onClick={() => copyToClipboard(verificationSQL, 'verify')}
                className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600"
                size="sm"
              >
                {copied === 'verify' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </>
                )}
              </Button>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-300 mb-2">✅ Résultat Attendu</h3>
              <div className="text-green-200/80 text-sm space-y-2">
                <p><strong>rowsecurity:</strong> true</p>
                <p><strong>Policies:</strong></p>
                <ul className="ml-4 list-disc">
                  <li>allow_public_inserts → roles: {'{public}'} → INSERT</li>
                  <li>allow_authenticated_reads → roles: {'{authenticated}'} → SELECT</li>
                  <li>allow_authenticated_updates → roles: {'{authenticated}'} → UPDATE</li>
                  <li>allow_authenticated_deletes → roles: {'{authenticated}'} → DELETE</li>
                </ul>
                <p><strong>Grants:</strong></p>
                <ul className="ml-4 list-disc">
                  <li>anon → INSERT</li>
                  <li>authenticated → SELECT, INSERT, UPDATE, DELETE</li>
                  <li>service_role → ALL</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test SQL */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Database className="w-6 h-6 text-violet-400" />
              Étape 3 (Optionnel) : Test Direct dans SQL Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <pre className="text-green-400 text-sm overflow-x-auto max-h-64 overflow-y-auto">
                {testSQL}
              </pre>
              <Button
                onClick={() => copyToClipboard(testSQL, 'test')}
                className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600"
                size="sm"
              >
                {copied === 'test' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </>
                )}
              </Button>
            </div>

            <p className="text-white/70 text-sm">
              Ce test insère une ligne directement dans Supabase SQL Editor. Si ça fonctionne, alors votre formulaire fonctionnera aussi !
            </p>
          </CardContent>
        </Card>

        {/* What Changed */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">🔍 Qu'est-ce qui a Changé ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-white/80">
              <div>
                <h4 className="text-cyan-300 mb-2">❌ Version Précédente (Bug)</h4>
                <pre className="bg-slate-900 p-3 rounded text-sm text-red-400">
{`CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated  -- ❌ Syntaxe incorrecte
  WITH CHECK (true);`}
                </pre>
              </div>

              <div>
                <h4 className="text-green-300 mb-2">✅ Nouvelle Version (Fix)</h4>
                <pre className="bg-slate-900 p-3 rounded text-sm text-green-400">
{`CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO public  -- ✅ "public" = anon + authenticated
  WITH CHECK (true);`}
                </pre>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 mb-2">💡 Explication</h4>
                <p className="text-blue-200/80 text-sm">
                  Dans PostgreSQL/Supabase, le rôle <code className="bg-white/10 px-2 py-1 rounded">public</code> représente 
                  TOUS les utilisateurs (anonymes + authentifiés). C'est équivalent à <code className="bg-white/10 px-2 py-1 rounded">anon, authenticated</code> 
                  mais avec une syntaxe plus standard et robuste.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white px-8"
          >
            Retour au Formulaire
          </Button>
        </div>
      </div>
    </div>
  );
}
