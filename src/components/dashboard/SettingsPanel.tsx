import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Info, 
  Shield,
  ExternalLink,
  XCircle,
  Zap,
  DollarSign,
  CreditCard,
  Target,
  Users,
  TrendingUp,
  Bug,
  Trash2,
  Database,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MigrateLandingToSupabase } from './MigrateLandingToSupabase';
import { QuickDiagnostic } from './QuickDiagnostic';

export function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [overridesDebug, setOverridesDebug] = useState<any>(null);
  const [isLoadingOverrides, setIsLoadingOverrides] = useState(false);
  const [isImportingTranslations, setIsImportingTranslations] = useState(false);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.configured) {
          setIsConfigured(true);
          setSavedKey(result.keyPreview || 'sk-ant-api03-••••••••');
        }
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez saisir une clé API');
      return;
    }

    if (!apiKey.startsWith('sk-ant-api03-')) {
      toast.error('Format de clé invalide. La clé doit commencer par "sk-ant-api03-"');
      return;
    }

    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ apiKey })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save API key');
      }

      const result = await response.json();
      
      setIsConfigured(true);
      setSavedKey(result.keyPreview);
      setApiKey('');
      
      toast.success('✅ Clé API sauvegardée avec succès !');
      
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('❌ Erreur lors de la sauvegarde: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    } finally {
      setIsLoading(false);
    }
  };

  const testApiKey = async () => {
    setIsTesting(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/test-anthropic`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Connexion Claude réussie !', {
          description: `Modèle: ${result.model || 'claude-3-5-sonnet-20241022'}`,
          duration: 5000
        });
      } else {
        // Check if it's a credit balance error
        const isCreditError = result.error?.includes('credit balance') || result.error?.includes('crédits');
        
        toast.error('❌ Test échoué', {
          description: result.error || 'Erreur inconnue',
          duration: isCreditError ? 10000 : 6000, // Longer duration for credit errors
          action: isCreditError ? {
            label: 'Recharger →',
            onClick: () => window.open('https://console.anthropic.com/settings/plans', '_blank')
          } : undefined
        });
      }
      
    } catch (error) {
      console.error('Error testing API key:', error);
      toast.error('❌ Erreur lors du test de connexion');
    } finally {
      setIsTesting(false);
    }
  };

  const deleteApiKey = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer la clé API ?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        setIsConfigured(false);
        setSavedKey(null);
        toast.success('Clé API supprimée');
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  };

  const loadOverrides = async () => {
    setIsLoadingOverrides(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/overrides-debug`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setOverridesDebug(result);
        console.log('🐛 [SettingsPanel] Overrides debug:', result);
      }
    } catch (error) {
      console.error('Error loading overrides:', error);
      toast.error('Erreur lors du chargement des overrides');
    } finally {
      setIsLoadingOverrides(false);
    }
  };

  const deleteOverrides = async () => {
    if (!confirm('⚠️ ATTENTION : Cette action va supprimer TOUS les overrides en base de données.\n\nCela ne touchera PAS les traductions, mais réinitialisera toutes les modifications de questions faites via le dashboard.\n\nÊtes-vous sûr de vouloir continuer ?')) {
      return;
    }

    setIsLoadingOverrides(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/delete-all-overrides`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        setOverridesDebug(null);
        toast.success('✅ Tous les overrides ont été supprimés !', {
          description: 'Rechargez la page pour voir les changements.'
        });
      } else {
        throw new Error('Failed to delete overrides');
      }
    } catch (error) {
      console.error('Error deleting overrides:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoadingOverrides(false);
    }
  };

  const importClientWorkerTranslations = async () => {
    if (!confirm('📦 IMPORT DES TRADUCTIONS CLIENT & WORKER\n\nCette action va importer toutes les traductions françaises et internationales pour les profils Client et Worker (Section 2 - Détachement).\n\nCela inclut :\n- q5_localisation (Pays entreprise)\n- q6_volume_client (Volume intérimaires)\n- q8_nationalites (Nationalités)\n- Et toutes les autres questions client/worker\n\nContinuer ?')) {
      return;
    }

    setIsImportingTranslations(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-client-worker-translations`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success('✅ Traductions importées avec succès !', {
          description: `${result.stats?.imported || 0} traductions ajoutées en base de données`,
          duration: 6000
        });
        console.log('📦 Import result:', result);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing translations:', error);
      toast.error('❌ Erreur lors de l\'import des traductions', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setIsImportingTranslations(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Bannière info si non configuré */}
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Configuration requise</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pour activer l'analyse IA automatique, vous devez d'abord configurer votre clé API Anthropic. 
                Suivez les étapes ci-dessous pour obtenir votre clé et profiter de l'analyse complète de vos données.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header avec status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-slate-900">Configuration & Debug</h2>
            <p className="text-slate-600">Analyse IA & Diagnostic système</p>
          </div>
        </div>
        
        {isConfigured ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2 text-sm shadow-lg shadow-green-500/10">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              API Configurée
            </Badge>
          </motion.div>
        ) : (
          <Badge variant="outline" className="border-orange-500/30 text-orange-600 bg-orange-500/5 px-4 py-2 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Configuration requise
          </Badge>
        )}
      </motion.div>

      {/* Grid 2 colonnes */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Colonne gauche - Configuration principale */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Diagnostic Rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.01 }}
          >
            <QuickDiagnostic />
          </motion.div>

          {/* 🐛 DEBUG OVERRIDES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <CardHeader className="border-b border-orange-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Bug className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-900">Debug Overrides</CardTitle>
                      <CardDescription>Diagnostiquer les problèmes de traduction</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadOverrides}
                    disabled={isLoadingOverrides}
                    className="border-orange-500/30 hover:bg-orange-500/10 text-orange-600"
                  >
                    {isLoadingOverrides ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Chargement...
                      </>
                    ) : (
                      'Analyser'
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {!overridesDebug ? (
                  <div className="text-center py-8">
                    <Bug className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <p className="text-slate-600 mb-4">
                      Cliquez sur "Analyser" pour vérifier les overrides en base de données
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Résumé */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <p className="text-sm text-slate-600 mb-1">Total overrides</p>
                        <p className="text-2xl text-blue-700">{overridesDebug.count || 0}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                        <p className="text-sm text-slate-600 mb-1">Labels anglais</p>
                        <p className="text-2xl text-red-700">{overridesDebug.problematicCount || 0}</p>
                      </div>
                    </div>

                    {/* Liste des overrides problématiques */}
                    {overridesDebug.problematicCount > 0 && (
                      <div className="max-h-64 overflow-y-auto border border-red-200 rounded-xl p-4 bg-red-50/50">
                        <p className="text-sm text-slate-700 mb-3">
                          <strong>Overrides avec labels anglais :</strong>
                        </p>
                        <div className="space-y-2">
                          {overridesDebug.problematicOverrides.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 bg-white rounded-lg border border-red-200 text-xs">
                              <code className="text-red-700 font-mono">{item.id}</code>
                              {item.label && (
                                <div className="mt-1 text-slate-600">
                                  <span className="font-semibold">Label:</span> {item.label}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="destructive"
                        onClick={deleteOverrides}
                        disabled={isLoadingOverrides || overridesDebug.count === 0}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer tous les overrides
                      </Button>
                    </div>

                    <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <strong>💡 Note:</strong> La suppression des overrides ne touchera PAS les traductions. Elle réinitialisera seulement les modifications de structure faites via le dashboard Questions.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 📦 IMPORT TRADUCTIONS CLIENT & WORKER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-cyan-200 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
              <CardHeader className="border-b border-cyan-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Maintenance Traductions</CardTitle>
                    <CardDescription>Importer les traductions Client & Worker</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                    <div className="flex items-start gap-3 mb-3">
                      <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-900 mb-1">
                          <strong>Traductions manquantes détectées</strong>
                        </p>
                        <p className="text-xs text-slate-600">
                          Les questions Client et Worker de la Section 2 (Détachement) nécessitent des traductions françaises pour s'afficher correctement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-slate-700">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q5_localisation (Pays entreprise)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q6_volume_client (Volume intérimaires)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q8_nationalites (Nationalités)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        + toutes les autres questions client/worker
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-900">Ce qui sera importé</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      <p>• Traductions FR + 22 langues européennes</p>
                      <p>• Questions Client (18 items)</p>
                      <p>• Questions Worker (15 items)</p>
                      <p>• Options de réponses incluses</p>
                    </div>
                  </div>

                  <Button
                    onClick={importClientWorkerTranslations}
                    disabled={isImportingTranslations}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    size="lg"
                  >
                    {isImportingTranslations ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Import en cours...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Importer les traductions
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-slate-500 p-3 bg-green-50 rounded-lg border border-green-200">
                    <strong>✅ Sécurisé:</strong> L'import utilise "upsert" - les traductions existantes seront mises à jour, pas de duplication.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card principale - Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Clé API Anthropic</CardTitle>
                    <CardDescription>Configurez votre accès à l'API Claude</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Clé actuelle (si configurée) */}
                {isConfigured && savedKey && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <Label className="text-slate-700 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      Clé API actuelle
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={savedKey}
                        disabled
                        className="bg-slate-50 border-slate-200 text-slate-600 font-mono flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testApiKey}
                        disabled={isTesting}
                        className="border-green-500/30 hover:bg-green-500/10 text-green-600 whitespace-nowrap px-4"
                      >
                        {isTesting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Test...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Tester
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={deleteApiKey}
                        disabled={isLoading}
                        className="border-red-500/30 hover:bg-red-500/10 text-red-500 px-3"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="h-px bg-slate-200 my-6" />
                  </motion.div>
                )}

                {/* Formulaire d'ajout/mise à jour */}
                <div className="space-y-4">
                  <Label htmlFor="apiKey" className="text-slate-700 flex items-center gap-2">
                    {isConfigured ? (
                      <>
                        <span className="text-lg">🔄</span> Mettre à jour la clé API
                      </>
                    ) : (
                      <>
                        <span className="text-lg">➕</span> Ajouter une clé API
                      </>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-ant-api03-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono focus:border-cyan-400 focus:ring-cyan-400/20"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading && apiKey.trim()) {
                          saveApiKey();
                        }
                      }}
                    />
                    {apiKey.trim() && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {apiKey.startsWith('sk-ant-api03-') ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Format requis : <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">sk-ant-api03-...</code>
                  </p>
                </div>

                <Button
                  onClick={saveApiKey}
                  disabled={isLoading || !apiKey.trim()}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg shadow-violet-500/30"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sauvegarde en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {isConfigured ? 'Mettre à jour la clé' : 'Sauvegarder la clé'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guide pas à pas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-md hover:shadow-lg hover:border-cyan-300 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-600" />
                  Comment obtenir une clé API ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { step: 1, text: 'Créez un compte sur', link: 'console.anthropic.com', url: 'https://console.anthropic.com/' },
                    { step: 2, text: 'Naviguez vers la section "API Keys"' },
                    { step: 3, text: 'Cliquez sur "Create Key"' },
                    { step: 4, text: 'Copiez la clé générée (commence par sk-ant-api03-)' },
                    { step: 5, text: 'Collez-la dans le champ ci-dessus et sauvegardez' },
                    { step: 6, text: 'Testez la connexion pour confirmer' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-sm shadow-md">
                        {item.step}
                      </div>
                      <p className="text-slate-700 pt-0.5">
                        {item.text}{' '}
                        {item.link && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-700 underline inline-flex items-center gap-1"
                          >
                            {item.link}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Colonne droite - Informations */}
        <div className="space-y-6">
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-violet-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  Analyses IA
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  { icon: Target, label: 'TAM/SAM/SOM', color: 'text-blue-500' },
                  { icon: Users, label: 'Personas client', color: 'text-cyan-500' },
                  { icon: TrendingUp, label: 'Opportunités', color: 'text-violet-500' },
                  { icon: CheckCircle2, label: 'Recommandations', color: 'text-green-500' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-slate-700">{item.label}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Tarification
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                    <p className="text-xs text-slate-600 mb-1">Input</p>
                    <p className="text-slate-900">$3</p>
                    <p className="text-xs text-slate-500">/ 1M tokens</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
                    <p className="text-xs text-slate-600 mb-1">Output</p>
                    <p className="text-slate-900">$15</p>
                    <p className="text-xs text-slate-500">/ 1M tokens</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-900">Par analyse</span>
                  </div>
                  <p className="text-2xl text-green-700 mb-1">~0.02€</p>
                  <p className="text-xs text-green-600">Budget 10€ ≈ 500 analyses</p>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    $5 offerts à l'inscription
                  </p>
                  <p className="flex items-center gap-1">
                    <Info className="w-3 h-3 text-blue-500" />
                    Carte bleue requise
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recharger les crédits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <CardHeader className="border-b border-orange-100">
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  Recharger vos crédits
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-700 mb-1">
                      Si vous voyez l'erreur <span className="font-mono text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">credit balance is too low</span>
                    </p>
                    <p className="text-xs text-slate-600">
                      Votre compte Anthropic n'a plus de crédits suffisants.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs">
                      1
                    </div>
                    <p className="text-slate-700 text-sm pt-0.5">
                      Allez sur{' '}
                      <a 
                        href="https://console.anthropic.com/settings/plans" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 underline inline-flex items-center gap-1"
                      >
                        Plans & Billing
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs">
                      2
                    </div>
                    <p className="text-slate-700 text-sm pt-0.5">
                      Cliquez sur "Buy credits" ou "Add payment method"
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs">
                      3
                    </div>
                    <p className="text-slate-700 text-sm pt-0.5">
                      Ajoutez des crédits (recommandé : $10 minimum)
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs">
                      4
                    </div>
                    <p className="text-slate-700 text-sm pt-0.5">
                      Revenez ici et testez à nouveau la connexion
                    </p>
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://console.anthropic.com/settings/plans', '_blank')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Ouvrir Plans & Billing
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info sécurité */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 shadow-md hover:shadow-lg hover:border-slate-400 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm text-slate-900">Stockage sécurisé</p>
                    <p className="text-xs text-slate-600">
                      Votre clé est chiffrée et stockée dans Supabase KV Store. Elle n'est jamais exposée au frontend.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}