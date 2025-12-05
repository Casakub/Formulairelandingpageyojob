import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { AlertTriangle, Copy, CheckCircle, ExternalLink, Terminal, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function FixRLSPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [isFixApplied, setIsFixApplied] = useState(false);

  const fixSQL = `-- 🔧 FIX RLS - Autoriser les insertions publiques
-- Date: 29 Novembre 2024
-- Temps estimé: 30 secondes

-- Étape 1: Supprimer l'ancienne policy
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;

-- Étape 2: Recréer avec le fix (TO anon, authenticated)
CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Étape 3: Vérifier les permissions
GRANT INSERT ON market_research_responses TO anon;

-- ✅ C'est tout ! Testez maintenant votre formulaire.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fixSQL);
    setIsCopied(true);
    toast.success('SQL copié dans le presse-papier !', {
      description: 'Collez-le dans Supabase SQL Editor',
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  const openSupabaseSQLEditor = () => {
    // Récupérer le project ID depuis l'environnement si disponible
    const projectId = 'vhpbmckgxtdyxdwhmdxy'; // À remplacer dynamiquement si nécessaire
    window.open(`https://supabase.com/dashboard/project/${projectId}/sql/new`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <Card className="border-2 border-red-200 bg-white shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">🚨 Fix Erreur RLS</CardTitle>
                  <CardDescription className="text-red-100">
                    Solution pour "new row violates row-level security policy"
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Explication du problème */}
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Le Problème
                </h3>
                <p className="text-red-700 text-sm mb-2">
                  Votre base de données bloque les soumissions du formulaire car la <strong>policy RLS</strong> (Row Level Security) 
                  ne spécifie pas explicitement les rôles autorisés.
                </p>
                <code className="block bg-red-100 p-2 rounded text-xs text-red-800 mt-2">
                  ❌ Error: new row violates row-level security policy for table "market_research_responses"
                </code>
              </div>

              {/* La solution */}
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  La Solution (2 minutes)
                </h3>
                <p className="text-green-700 text-sm mb-3">
                  Exécutez le script SQL ci-dessous pour ajouter la clause <code className="bg-green-100 px-1 rounded">TO anon, authenticated</code> à la policy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium">Temps estimé: 30 secondes</span>
                  </div>
                </div>
              </div>

              {/* Instructions étape par étape */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6" />
                  Instructions en 3 Étapes
                </h3>

                <div className="space-y-4">
                  {/* Étape 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Ouvrir Supabase SQL Editor</h4>
                      <Button
                        onClick={openSupabaseSQLEditor}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ouvrir SQL Editor
                      </Button>
                    </div>
                  </div>

                  {/* Étape 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Copier le SQL</h4>
                      <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm text-green-400 font-mono whitespace-pre">
{fixSQL}
                        </pre>
                      </div>
                      <Button
                        onClick={copyToClipboard}
                        className="mt-3 w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2 text-white" />
                            SQL Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copier le SQL
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Étape 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Coller et Exécuter</h4>
                      <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                        <li>Collez le SQL dans l'éditeur Supabase</li>
                        <li>Cliquez sur le bouton <strong>"Run"</strong> (ou Ctrl+Enter)</li>
                        <li>Attendez la confirmation de succès ✅</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vérification */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-lg border-2 border-violet-200">
                <h3 className="font-semibold text-violet-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Vérification
                </h3>
                <p className="text-violet-700 text-sm mb-3">
                  Après avoir exécuté le SQL :
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFixApplied}
                      onChange={(e) => {
                        setIsFixApplied(e.target.checked);
                        if (e.target.checked) {
                          toast.success('Parfait ! Testez maintenant le formulaire', {
                            description: 'Allez sur / et soumettez une réponse',
                          });
                        }
                      }}
                      className="w-4 h-4 rounded border-violet-300"
                    />
                    <span className="text-violet-700">J'ai exécuté le SQL avec succès</span>
                  </label>
                </div>

                {isFixApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300"
                  >
                    <p className="text-sm text-green-800 mb-3">
                      ✅ Excellent ! Maintenant testez votre formulaire :
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={() => window.location.href = '/'}
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                      >
                        Tester le Formulaire
                      </Button>
                      <Button
                        onClick={() => window.location.href = '/dashboard'}
                        size="sm"
                        variant="outline"
                      >
                        Aller au Dashboard
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Aide supplémentaire */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">❓ Besoin d'Aide ?</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Si le problème persiste après avoir appliqué le fix :
                </p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>Vérifiez que le SQL s'est exécuté sans erreur</li>
                  <li>Actualisez la page du formulaire (F5)</li>
                  <li>Ouvrez la console (F12) pour voir les erreurs détaillées</li>
                  <li>Consultez le guide complet : <code className="bg-slate-200 px-1 rounded">/🚨_FIX_ERREUR_RLS.md</code></li>
                </ul>
              </div>

              {/* Actions rapides */}
              <div className="flex gap-3 flex-wrap justify-center pt-4 border-t">
                <Button
                  onClick={() => window.location.href = '/deploy-database'}
                  variant="outline"
                >
                  Retour au Déploiement
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400"
                >
                  Retour au Formulaire
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
