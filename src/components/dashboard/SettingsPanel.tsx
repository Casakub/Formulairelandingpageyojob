import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Settings, Key, CheckCircle2, XCircle, Loader2, Sparkles, DollarSign, Info, AlertCircle, Zap, Shield, ExternalLink, Target, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

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
          description: `Modèle: ${result.model || 'claude-3-5-sonnet-20241022'}`
        });
      } else {
        toast.error('❌ Test échoué: ' + result.error);
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
            <h2 className="text-slate-900">Configuration IA</h2>
            <p className="text-slate-600">Analyse automatique avec Claude 3.5 Sonnet</p>
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
