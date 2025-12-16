import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Globe, Sparkles, FileText, Languages, Info, Settings, CheckCircle, Upload, Wrench } from 'lucide-react';
import { LandingContentManagerUnified } from './LandingContentManagerUnified';
import { SurveyTranslationDashboard } from './SurveyTranslationDashboard';
import { setTranslationProvider } from '../../services/aiTranslationService';
import { TranslationProvider } from '../../contexts/TranslationContext';
import { AutoUploadTranslations } from './AutoUploadTranslations';
import { UploadHeroTranslations } from './UploadHeroTranslations';
import { UploadProgressTranslations } from './UploadProgressTranslations';
import { PushTranslationsButton } from '../PushTranslationsButton';

/**
 * 🌍 Unified Translation Manager
 * Gestionnaire centralisé pour TOUTES les traductions de l'application
 * - Traductions du formulaire d'enquête (27 000 agences)
 * - Traductions de la landing page YOJOB (23 langues)
 */

type TranslationType = 'survey' | 'landing';
type AIProvider = 'claude' | 'mock';

export function UnifiedTranslationManager() {
  const [activeType, setActiveType] = useState<TranslationType>('landing');
  const [aiProvider, setAIProvider] = useState<AIProvider>('claude');

  const handleProviderChange = (provider: AIProvider) => {
    setAIProvider(provider);
    setTranslationProvider(provider);
  };

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur de provider IA */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-2xl p-6 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white mb-1">Centre de traduction unifié</h1>
              <p className="text-cyan-100">
                Gérez toutes les traductions de l'application depuis une seule interface
              </p>
            </div>
          </div>

          {/* Provider AI Selector */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-cyan-100">Moteur IA :</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={aiProvider === 'claude' ? 'default' : 'outline'}
                      onClick={() => handleProviderChange('claude')}
                      className={
                        aiProvider === 'claude'
                          ? 'bg-white text-violet-600 hover:bg-cyan-50'
                          : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                      }
                    >
                      Claude 3.5 Sonnet
                    </Button>
                    <Button
                      size="sm"
                      variant={aiProvider === 'mock' ? 'default' : 'outline'}
                      onClick={() => handleProviderChange('mock')}
                      className={
                        aiProvider === 'mock'
                          ? 'bg-white text-violet-600 hover:bg-cyan-50'
                          : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                      }
                    >
                      Mode Test
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-white mb-1">
              {aiProvider === 'claude' ? (
                <>
                  <strong>Mode Claude activé</strong> - Les traductions seront effectuées par
                  Claude 3.5 Sonnet (haute qualité, adaptation culturelle)
                </>
              ) : (
                <>
                  <strong>Mode Test activé</strong> - Les traductions sont simulées (préfixe [LANG])
                </>
              )}
            </p>
            <p className="text-cyan-100 text-xs">
              {aiProvider === 'claude'
                ? 'Coût estimé : ~$0.02 par langue complète (landing) • Clé API : ANTHROPIC_API_KEY'
                : 'Gratuit • Parfait pour tester le workflow sans consommer de crédits API'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-violet-500 to-purple-600 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-white/80" />
                <Badge className="bg-white/20 text-white border-0">Formulaire</Badge>
              </div>
              <h3 className="text-white text-3xl mb-1">27 000+</h3>
              <p className="text-violet-100">Agences européennes ciblées</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-8 h-8 text-white/80" />
                <Badge className="bg-white/20 text-white border-0">Landing</Badge>
              </div>
              <h3 className="text-white text-3xl mb-1">23</h3>
              <p className="text-cyan-100">Langues européennes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="w-8 h-8 text-white/80" />
                <Badge className="bg-white/20 text-white border-0">IA</Badge>
              </div>
              <h3 className="text-white text-3xl mb-1">{aiProvider === 'claude' ? '98%' : 'Test'}</h3>
              <p className="text-green-100">
                {aiProvider === 'claude' ? 'Fiabilité Claude' : 'Mode simulation'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Onglets principaux */}
      <Card className="border-slate-200 shadow-xl">
        <Tabs value={activeType} onValueChange={(v) => setActiveType(v as TranslationType)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-6 h-6 text-violet-600" />
                  Gestionnaire de traductions
                </CardTitle>
                <CardDescription>
                  Choisissez le type de contenu à traduire ci-dessous
                </CardDescription>
              </div>

              <TabsList className="bg-slate-100">
                <TabsTrigger value="landing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                  <Globe className="w-4 h-4 mr-2" />
                  Landing Page
                </TabsTrigger>
                <TabsTrigger value="survey" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Formulaire d'enquête
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          <CardContent>
            <TabsContent value="landing" className="mt-0">
              <AnimatePresence mode="wait">
                {activeType === 'landing' && (
                  <motion.div
                    key="landing-tab-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-slate-900 mb-1">Landing Page YOJOB</h4>
                          <p className="text-slate-600 text-sm">
                            Gérez tous les textes de votre landing page en 23 langues européennes avec
                            traduction IA avancée, adaptation culturelle et workflow de validation.
                          </p>
                        </div>
                      </div>
                    </div>
                    <LandingContentManagerUnified />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="survey" className="mt-0">
              <AnimatePresence mode="wait">
                {activeType === 'survey' && (
                  <motion.div
                    key="survey-tab-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SurveyTranslationDashboard />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Footer d'aide */}
      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                Besoin d'aide ?
                <Badge className="bg-green-500/20 text-green-700 border-green-400/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Documentation disponible
                </Badge>
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <strong>Mode Claude :</strong> Nécessite ANTHROPIC_API_KEY dans les variables d'environnement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <strong>Workflow :</strong> IA génère → Vous validez → Export automatique
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <strong>Coûts :</strong> ~$0.02 par langue (landing) • ~$0.01 par langue (formulaire)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========== SECTION OUTILS DE GESTION ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg">
          <CardHeader className="border-b border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  🔧 Outils de gestion des traductions
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                    <Upload className="w-3 h-3 mr-1" />
                    Upload & Push
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Uploadez et déployez vos traductions vers le système i18n
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <UploadHeroTranslations />
              <UploadProgressTranslations />
              <AutoUploadTranslations />
              <PushTranslationsButton />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}