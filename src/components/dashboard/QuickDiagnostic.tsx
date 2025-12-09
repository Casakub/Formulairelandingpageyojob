import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, Loader2, Zap, DollarSign, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

/**
 * 🔍 Diagnostic rapide pour vérifier que tout est prêt pour la traduction
 */

export function QuickDiagnostic() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{
    apiKey: boolean | null;
    credits: boolean | null;
    frContent: boolean | null;
    supabaseTable: boolean | null;
  }>({
    apiKey: null,
    credits: null,
    frContent: null,
    supabaseTable: null,
  });

  const handleDiagnostic = async () => {
    setIsChecking(true);
    const newResults = {
      apiKey: false,
      credits: false,
      frContent: false,
      supabaseTable: false,
    };

    try {
      // Test 1 : Vérifier la clé API
      try {
        const apiResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        const apiData = await apiResponse.json();
        newResults.apiKey = apiData.configured === true;
      } catch (e) {
        newResults.apiKey = false;
      }

      // Test 2 : Tester les crédits
      if (newResults.apiKey) {
        try {
          const testResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/test-anthropic`,
            {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            }
          );
          const testData = await testResponse.json();
          newResults.credits = testData.success === true;
        } catch (e) {
          newResults.credits = false;
        }
      }

      // Test 3 : Vérifier le contenu FR
      try {
        const frResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/fr`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        const frData = await frResponse.json();
        newResults.frContent = frData.exists === true && !!frData.content;
      } catch (e) {
        newResults.frContent = false;
      }

      // Test 4 : Vérifier la table Supabase
      try {
        const tableResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/languages`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        const tableData = await tableResponse.json();
        newResults.supabaseTable = tableData.success === true;
      } catch (e) {
        newResults.supabaseTable = false;
      }

      setResults(newResults);

      // Toast résumé
      const allGood = Object.values(newResults).every(v => v === true);
      if (allGood) {
        toast.success('✅ Tout est prêt !', {
          description: 'Vous pouvez lancer la traduction automatique',
          duration: 5000,
        });
      } else {
        toast.warning('⚠️ Certains problèmes détectés', {
          description: 'Consultez les résultats ci-dessous',
          duration: 7000,
        });
      }

    } catch (error: any) {
      console.error('Diagnostic error:', error);
      toast.error('❌ Erreur lors du diagnostic', {
        description: error.message,
      });
    } finally {
      setIsChecking(false);
    }
  };

  const StatusBadge = ({ status }: { status: boolean | null }) => {
    if (status === null) {
      return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-300">Non testé</Badge>;
    }
    if (status === true) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-400">
          <CheckCircle className="w-3 h-3 mr-1" />
          OK
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-700 border-red-400">
        <AlertCircle className="w-3 h-3 mr-1" />
        Erreur
      </Badge>
    );
  };

  const hasRun = Object.values(results).some(v => v !== null);
  const allGood = hasRun && Object.values(results).every(v => v === true);
  const hasErrors = hasRun && Object.values(results).some(v => v === false);

  return (
    <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Diagnostic Rapide
          </CardTitle>
          {hasRun && (
            <Badge className={allGood ? 'bg-green-500/20 text-green-700 border-green-400' : 'bg-orange-500/20 text-orange-700 border-orange-400'}>
              {allGood ? '✅ Prêt' : '⚠️ À corriger'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600">
          Vérifiez que tout est configuré avant de lancer la traduction automatique.
        </p>

        {/* Résultats */}
        {hasRun && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* API Key */}
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${results.apiKey ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm text-slate-900">Clé API Anthropic</p>
                  <p className="text-xs text-slate-500">
                    {results.apiKey ? 'Configurée' : 'Non configurée - Ajoutez votre clé dans Paramètres'}
                  </p>
                </div>
              </div>
              <StatusBadge status={results.apiKey} />
            </div>

            {/* Credits */}
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${results.credits ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm text-slate-900">Crédits Anthropic</p>
                  <p className="text-xs text-slate-500">
                    {results.credits ? 'Suffisants pour la traduction' : 'Crédits insuffisants - Rechargez votre compte'}
                  </p>
                </div>
              </div>
              <StatusBadge status={results.credits} />
            </div>

            {/* FR Content */}
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${results.frContent ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm text-slate-900">Contenu français source</p>
                  <p className="text-xs text-slate-500">
                    {results.frContent ? 'Disponible dans Supabase' : 'Non trouvé - Migrez d\'abord le français'}
                  </p>
                </div>
              </div>
              <StatusBadge status={results.frContent} />
            </div>

            {/* Supabase Table */}
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${results.supabaseTable ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm text-slate-900">Table landing_translations</p>
                  <p className="text-xs text-slate-500">
                    {results.supabaseTable ? 'Table accessible' : 'Table introuvable ou inaccessible'}
                  </p>
                </div>
              </div>
              <StatusBadge status={results.supabaseTable} />
            </div>
          </motion.div>
        )}

        {/* Actions si erreurs */}
        {hasErrors && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-orange-50 border border-orange-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <p className="text-sm text-orange-900">
                  <strong>Actions à faire :</strong>
                </p>

                {!results.apiKey && (
                  <div className="text-sm text-orange-800">
                    1️⃣ Ajoutez votre clé API Anthropic dans la section ci-dessous
                  </div>
                )}

                {results.apiKey && !results.credits && (
                  <div className="text-sm text-orange-800">
                    2️⃣ Rechargez vos crédits Anthropic
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 text-xs"
                      onClick={() => window.open('https://console.anthropic.com/settings/plans', '_blank')}
                    >
                      <DollarSign className="w-3 h-3 mr-1" />
                      Recharger
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}

                {!results.frContent && (
                  <div className="text-sm text-orange-800">
                    3️⃣ Migrez d'abord le contenu français en décochant "Traduire automatiquement"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Message de succès */}
        {allGood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-green-900 mb-1">
                  🎉 <strong>Tout est prêt !</strong>
                </p>
                <p className="text-xs text-green-700">
                  Vous pouvez lancer la migration et la traduction automatique en toute sécurité.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bouton */}
        <Button
          onClick={handleDiagnostic}
          disabled={isChecking}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
          size="lg"
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Diagnostic en cours...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              {hasRun ? 'Relancer le diagnostic' : 'Lancer le diagnostic'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
