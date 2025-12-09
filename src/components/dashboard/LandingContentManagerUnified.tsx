import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  Globe,
  FileText,
  Languages,
  Search,
  Edit,
  Save,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  Copy,
  Database,
  Zap,
  BarChart3,
  RefreshCw,
  X,
  Upload,
  Info,
  ArrowRight,
  Workflow,
  Settings,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { SUPPORTED_LANGUAGES, type LanguageCode, type TranslationStatus } from '../../types/landingContent';
import { landingContent } from '../../content/landing';
import { TranslationEditor } from './TranslationEditor';
import { Progress } from '../ui/progress';
import type { LanguageTranslationMeta, TranslationWorkflowStatus } from '../../types/translationWorkflow';
import { initializeLanguageTranslationMeta, calculateLanguageProgress } from '../../types/translationWorkflow';
import { useAITranslation } from '../../services/aiTranslationService';
import { BulkTranslationUploader } from './BulkTranslationUploader';

/**
 * 🌍 Landing Content Manager - Version Unifiée
 * 
 * Hub central pour TOUTES les opérations de contenu landing page :
 * 
 * 1️⃣ Édition FR Source : Modifier le contenu français d'origine
 * 2️⃣ Traductions Multilingues : Gérer 23 langues avec IA ou upload
 * 3️⃣ Synchronisation : Publier vers Supabase en 1 clic
 * 
 * Workflow recommandé :
 * FR Source → Traduire (IA ou Upload) → Sync to Supabase → Live ! 🚀
 */

// Import des composants d'édition
import { LandingContentEditor } from './LandingContentEditor';

type TabType = 'multilingual' | 'source' | 'sync';

export function LandingContentManagerUnified() {
  const [activeTab, setActiveTab] = useState<TabType>('multilingual');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('fr');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLang, setEditingLang] = useState<LanguageCode | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { translateWithAI, isTranslating } = useAITranslation();

  // Meta data pour le suivi des traductions
  const [translationMeta, setTranslationMeta] = useState<Record<string, LanguageTranslationMeta>>(() => {
    const saved = localStorage.getItem('yojob_translation_meta');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse translation meta:', e);
      }
    }
    return {};
  });

  const saveTranslationMeta = (meta: LanguageTranslationMeta) => {
    const updated = { ...translationMeta, [meta.lang]: meta };
    setTranslationMeta(updated);
    localStorage.setItem('yojob_translation_meta', JSON.stringify(updated));
  };

  const getTranslationMeta = (lang: LanguageCode): LanguageTranslationMeta => {
    if (translationMeta[lang]) {
      return translationMeta[lang];
    }
    // Initialiser avec le contenu FR source et le contenu existant si disponible
    const sourceContent = landingContent.fr;
    const existingContent = landingContent[lang];
    return initializeLanguageTranslationMeta(lang, sourceContent, existingContent);
  };

  // Synchronisation globale vers Supabase
  const handleSyncToSupabase = async () => {
    setIsSyncing(true);
    
    toast.info('🔄 Synchronisation en cours...', {
      description: 'Upload de toutes les traductions vers Supabase',
      duration: 3000,
    });

    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      let successCount = 0;
      let errorCount = 0;

      // Synchroniser toutes les langues disponibles dans landingContent
      for (const [langCode, content] of Object.entries(landingContent)) {
        if (!content) continue;

        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${langCode}`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content,
                translation_status: 'published',
                translation_progress: 100,
                translated_by: 'manual_sync',
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to sync ${langCode}: ${response.statusText}`);
          }

          successCount++;
          console.log(`✅ Synced ${langCode} to Supabase`);
        } catch (error) {
          console.error(`❌ Error syncing ${langCode}:`, error);
          errorCount++;
        }
      }

      // Clear cache
      try {
        localStorage.removeItem('yojob_landing_translations_cache');
        localStorage.removeItem('yojob_landing_content');
        console.log('✅ Cache cleared successfully');
      } catch (e) {
        console.warn('Failed to clear cache:', e);
      }

      // Toast final
      if (errorCount === 0) {
        toast.success(`✅ ${successCount} langues synchronisées !`, {
          description: 'Toutes les traductions sont maintenant disponibles sur la landing page',
          duration: 6000,
          action: {
            label: 'Voir Landing',
            onClick: () => window.open('/', '_blank'),
          },
        });
      } else {
        toast.warning(`⚠️ Sync partiel : ${successCount} OK, ${errorCount} erreurs`, {
          description: 'Consultez la console pour plus de détails',
          duration: 6000,
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('❌ Erreur lors de la synchronisation', {
        description: error instanceof Error ? error.message : 'Erreur inconnue',
        duration: 6000,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Traduction IA d'une langue
  const handleTranslateWithAI = async (targetLang: LanguageCode) => {
    try {
      const result = await translateWithAI(targetLang);
      
      if (result.success) {
        const meta = getTranslationMeta(targetLang);
        const updatedMeta: LanguageTranslationMeta = {
          ...meta,
          workflowStatus: 'completed',
          translationProgress: 100,
          lastTranslationDate: new Date().toISOString(),
        };
        saveTranslationMeta(updatedMeta);
        
        toast.success(`✅ Traduction ${targetLang.toUpperCase()} terminée !`, {
          description: 'N\'oubliez pas de synchroniser vers Supabase',
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error('❌ Erreur lors de la traduction', {
        description: error instanceof Error ? error.message : 'Erreur inconnue',
      });
    }
  };

  // Sections de la landing
  const sections = [
    { id: 'seo', label: 'SEO & Meta', icon: Search, color: 'blue' },
    { id: 'hero', label: 'Hero', icon: Sparkles, color: 'violet' },
    { id: 'stats', label: 'Statistiques', icon: Database, color: 'cyan' },
    { id: 'services', label: 'Services', icon: Zap, color: 'purple' },
    { id: 'network', label: 'Réseau Européen', icon: Globe, color: 'cyan' },
    { id: 'steps', label: 'Comment ça marche', icon: CheckCircle, color: 'green' },
    { id: 'testimonials', label: 'Témoignages', icon: FileText, color: 'orange' },
    { id: 'sectors', label: 'Secteurs', icon: FileText, color: 'blue' },
    { id: 'ctaForm', label: 'Formulaire CTA', icon: FileText, color: 'violet' },
    { id: 'footer', label: 'Footer', icon: FileText, color: 'gray' },
  ];

  // Si l'éditeur est ouvert
  if (editingLang) {
    const meta = getTranslationMeta(editingLang);
    return (
      <TranslationEditor
        targetLang={editingLang}
        translationMeta={meta}
        onClose={() => setEditingLang(null)}
        onSave={(updatedMeta) => {
          saveTranslationMeta(updatedMeta);
          setEditingLang(null);
        }}
        onTranslateWithAI={() => handleTranslateWithAI(editingLang)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Global */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-2 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-600" />
              Landing Page - Hub de Gestion
            </h1>
            <p className="text-gray-600 text-lg">
              Édition, traduction et publication en 23 langues européennes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              {Object.keys(landingContent).length} langues disponibles
            </Badge>
            
            <Button 
              onClick={handleSyncToSupabase}
              disabled={isSyncing}
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Synchronisation...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Sync to Supabase
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bandeau d'information du workflow */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                  <Workflow className="w-4 h-4" />
                  Workflow recommandé
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                    <span>Éditer FR Source</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs">2</span>
                    <span>Traduire (IA ou Upload)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs">3</span>
                    <span>Sync to Supabase</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Live ! 🚀</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Onglets principaux */}
      <Card className="border-gray-200 bg-white shadow-sm">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
          <CardHeader className="border-b border-gray-200">
            <TabsList className="bg-gray-100 border border-gray-200 grid grid-cols-3">
              <TabsTrigger 
                value="multilingual" 
                className="data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm"
              >
                <Languages className="w-4 h-4 mr-2" />
                Traductions Multilingues
              </TabsTrigger>
              <TabsTrigger 
                value="source" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Edit className="w-4 h-4 mr-2" />
                Édition FR Source
              </TabsTrigger>
              <TabsTrigger 
                value="sync" 
                className="data-[state=active]:bg-white data-[state=active]:text-cyan-600 data-[state=active]:shadow-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import/Sync
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Onglet 1 : Traductions Multilingues */}
              <TabsContent value="multilingual" className="mt-0">
                {activeTab === 'multilingual' && (
                  <motion.div
                    key="multilingual-tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Description */}
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-gray-900 mb-1">Gestion multilingue</h3>
                          <p className="text-gray-700 text-sm">
                            Éditez les traductions pour chaque langue, utilisez l'IA pour traduire automatiquement, 
                            ou gérez le workflow de traduction section par section.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Grille des langues */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const meta = getTranslationMeta(lang.code);
                        const hasContent = !!landingContent[lang.code];
                        const progress = hasContent ? 100 : meta.translationProgress;

                        return (
                          <motion.div
                            key={lang.code}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group"
                          >
                            <Card className={`border transition-all shadow-sm hover:shadow-md ${
                              hasContent 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-gray-200 bg-white hover:border-violet-300'
                            }`}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-3xl">{lang.flag}</span>
                                    <div>
                                      <h4 className="text-gray-900">{lang.name}</h4>
                                      <p className="text-gray-500 text-xs">{lang.nativeName}</p>
                                    </div>
                                  </div>
                                  {hasContent && (
                                    <Badge className="bg-green-100 text-green-700 border-green-200">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Publiée
                                    </Badge>
                                  )}
                                </div>

                                {/* Progress bar */}
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-600">Progression</span>
                                    <span className="text-xs text-gray-700">{progress}%</span>
                                  </div>
                                  <Progress value={progress} className="h-2" />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingLang(lang.code)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Éditer
                                  </Button>
                                  {lang.code !== 'fr' && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleTranslateWithAI(lang.code)}
                                      disabled={isTranslating}
                                      className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
                                    >
                                      <Sparkles className="w-3 h-3 mr-1" />
                                      IA
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              {/* Onglet 2 : Édition FR Source */}
              <TabsContent value="source" className="mt-0">
                {activeTab === 'source' && (
                  <motion.div
                    key="source-tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Description */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Edit className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-gray-900 mb-1">Contenu français source</h3>
                          <p className="text-gray-700 text-sm">
                            Éditez le contenu français d'origine qui servira de base pour toutes les traductions. 
                            Les modifications ici ne déclencheront pas automatiquement les retraductions.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Intégration de l'éditeur FR */}
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                      <LandingContentEditor />
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              {/* Onglet 3 : Import/Sync */}
              <TabsContent value="sync" className="mt-0">
                {activeTab === 'sync' && (
                  <motion.div
                    key="sync-tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Description */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-gray-900 mb-1">Import & Synchronisation</h3>
                          <p className="text-gray-700 text-sm">
                            Uploadez en masse des traductions générées par Claude (fichiers TypeScript), 
                            ou synchronisez toutes les traductions locales vers Supabase.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bulk Upload Component */}
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                      <BulkTranslationUploader />
                    </div>

                    {/* Synchronisation globale */}
                    <Card className="bg-gradient-to-br from-cyan-50 to-green-50 border border-cyan-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <Database className="w-5 h-5 text-cyan-600" />
                          Synchronisation Globale
                        </CardTitle>
                        <CardDescription className="text-gray-700">
                          Publiez toutes les traductions vers Supabase en un seul clic
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-900 mb-1">
                              <strong>{Object.keys(landingContent).length} langues</strong> prêtes à être synchronisées
                            </p>
                            <p className="text-gray-700 text-sm">
                              Toutes les traductions locales seront envoyées vers la base de données Supabase
                            </p>
                          </div>
                          <Button
                            size="lg"
                            onClick={handleSyncToSupabase}
                            disabled={isSyncing}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          >
                            {isSyncing ? (
                              <>
                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                Synchronisation...
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 mr-2" />
                                Synchroniser Maintenant
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
            </AnimatePresence>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}