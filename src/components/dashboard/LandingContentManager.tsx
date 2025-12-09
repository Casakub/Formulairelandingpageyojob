import { useState } from 'react';
import { motion } from 'motion/react';
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

/**
 * 🎨 Landing Content & Localisation Manager
 * Mini CMS pour gérer tous les contenus de la landing YOJOB
 */

export function LandingContentManager() {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('fr');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLang, setEditingLang] = useState<LanguageCode | null>(null);
  const [translationMetaCache, setTranslationMetaCache] = useState<Record<LanguageCode, LanguageTranslationMeta>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { translateContent } = useAITranslation();

  const currentContent = landingContent[selectedLang] || landingContent.fr;

  // Initialiser ou récupérer les métadonnées de traduction pour une langue
  const getTranslationMeta = (lang: LanguageCode): LanguageTranslationMeta => {
    if (translationMetaCache[lang]) {
      return translationMetaCache[lang];
    }

    const sourceFR = landingContent.fr;
    const existingContent = landingContent[lang];
    const meta = initializeLanguageTranslationMeta(lang, sourceFR!, existingContent);
    
    setTranslationMetaCache(prev => ({ ...prev, [lang]: meta }));
    return meta;
  };

  // Sauvegarder les métadonnées de traduction
  const saveTranslationMeta = (meta: LanguageTranslationMeta) => {
    setTranslationMetaCache(prev => ({ ...prev, [meta.languageCode]: meta }));
    // TODO: Sauvegarder en base de données
    console.log('💾 Saving translation meta:', meta);
  };

  // Traduire avec l'IA
  const handleTranslateWithAI = async (targetLang: LanguageCode) => {
    setIsTranslating(true);
    
    // Toast de démarrage
    const toastId = toast.loading(`🤖 Traduction en cours vers ${targetLang.toUpperCase()}...`, {
      description: 'Claude est en train de traduire votre contenu',
    });
    
    try {
      const sourceFR = landingContent.fr;
      if (!sourceFR) {
        throw new Error('Source content (FR) not found');
      }

      const response = await translateContent({
        sourceLang: 'fr',
        targetLang,
        sourceContent: sourceFR,
        adaptCulturally: true,
        tone: 'professional',
      });

      // Mettre à jour les métadonnées avec les propositions IA
      const meta = getTranslationMeta(targetLang);
      const updatedKeys = { ...meta.keys };

      response.translatedKeys.forEach(keyPath => {
        if (updatedKeys[keyPath]) {
          const translatedValue = getValueAtPath(response.translatedContent, keyPath);
          updatedKeys[keyPath] = {
            ...updatedKeys[keyPath],
            status: 'AI_PROPOSED' as TranslationWorkflowStatus,
            targetText: translatedValue || updatedKeys[keyPath].targetText,
            aiProposedText: translatedValue || '',
            lastModified: new Date().toISOString(),
          };
        }
      });

      const updatedMeta: LanguageTranslationMeta = {
        ...meta,
        keys: updatedKeys,
        aiProposedKeys: Object.values(updatedKeys).filter(k => k.status === 'AI_PROPOSED').length,
        lastUpdated: new Date().toISOString(),
      };

      saveTranslationMeta(updatedMeta);
      
      // Toast de succès
      toast.success(`✅ Traduction ${targetLang.toUpperCase()} terminée !`, {
        id: toastId,
        description: `${response.translatedKeys.length} clés traduites en ${(response.processingTime / 1000).toFixed(1)}s`,
        duration: 5000,
      });
      
      // Ouvrir l'éditeur automatiquement après un court délai
      setTimeout(() => {
        setEditingLang(targetLang);
      }, 500);
      
    } catch (error: any) {
      console.error('❌ Translation error:', error);
      
      // Toast d'erreur
      toast.error('❌ Erreur de traduction', {
        id: toastId,
        description: error.message || 'Une erreur est survenue lors de la traduction',
        duration: 7000,
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Helper pour obtenir une valeur depuis un chemin de clé
  function getValueAtPath(obj: any, path: string): string | undefined {
    const parts = path.split(/[.[\]]/).filter(Boolean);
    let current = obj;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return typeof current === 'string' ? current : undefined;
  }

  // Synchroniser les traductions FR et EN vers Supabase
  const handleSyncToSupabase = async () => {
    setIsSyncing(true);
    const toastId = toast.loading('🔄 Synchronisation en cours...', {
      description: 'Envoi des dernières traductions FR et EN vers Supabase',
    });

    try {
      // Import dynamique des contenus locaux
      const frModule = await import('../../content/landing/fr');
      const enModule = await import('../../content/landing/en');

      const languagesToSync = [
        { code: 'fr', content: frModule.landingContentFR, name: 'Français' },
        { code: 'en', content: enModule.landingContentEN, name: 'English' },
      ];

      let successCount = 0;
      let errorCount = 0;

      for (const lang of languagesToSync) {
        try {
          const projectId = await import('../../utils/supabase/info').then(m => m.projectId);
          const publicAnonKey = await import('../../utils/supabase/info').then(m => m.publicAnonKey);

          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${lang.code}`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: lang.content,
                translation_status: 'published',
                translated_by: 'system_sync',
                translation_progress: 100,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.text();
            console.error(`Failed to sync ${lang.code}:`, errorData);
            throw new Error(`Failed to sync ${lang.code}: ${response.statusText}`);
          }

          const result = await response.json();
          console.log(`✅ Successfully synced ${lang.code} to Supabase:`, result);
          successCount++;
        } catch (error: any) {
          console.error(`❌ Error syncing ${lang.code}:`, error);
          errorCount++;
        }
      }

      if (errorCount === 0) {
        toast.success('✅ Synchronisation réussie !', {
          id: toastId,
          description: `${successCount} langue(s) synchronisée(s) avec Supabase`,
          duration: 5000,
        });
      } else {
        toast.warning('⚠️ Synchronisation partielle', {
          id: toastId,
          description: `${successCount} réussie(s), ${errorCount} échouée(s)`,
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('❌ Sync error:', error);
      toast.error('❌ Erreur de synchronisation', {
        id: toastId,
        description: error.message || 'Une erreur est survenue',
        duration: 7000,
      });
    } finally {
      setIsSyncing(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white mb-2 flex items-center gap-3">
              <Languages className="w-8 h-8" />
              Content & Localisation Manager
            </h1>
            <p className="text-cyan-200 text-lg">
              Gérez tous les contenus de la landing page YOJOB en 23 langues
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              {SUPPORTED_LANGUAGES.filter(l => landingContent[l.code]).length} langues actives
            </Badge>
            <Button 
              onClick={handleSyncToSupabase}
              disabled={isSyncing}
              className="bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Sync to Supabase
                </>
              )}
            </Button>
            <Button className="bg-white text-blue-900 hover:bg-cyan-50">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        {/* Quick Language Selector */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Label className="text-white">Langue active :</Label>
              {SUPPORTED_LANGUAGES.slice(0, 10).map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLang === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLang(lang.code)}
                  className={
                    selectedLang === lang.code
                      ? 'bg-cyan-500 text-white border-cyan-400'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.code.toUpperCase()}
                </Button>
              ))}
              <Select value={selectedLang} onValueChange={(v) => setSelectedLang(v as LanguageCode)}>
                <SelectTrigger className="w-48 bg-white/10 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName} ({lang.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Banner - Sync Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 backdrop-blur-md border-cyan-400/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <strong>💡 Nouvelles traductions ajoutées :</strong> Les propriétés <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300">activeNetwork</code>, <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300">mapLabel</code>, <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300">formTitle/Subtitle</code>, et <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300">securityNote</code> ont été ajoutées au code local FR/EN.
                </p>
                <p className="text-cyan-200 text-sm mt-1">
                  👉 Cliquez sur <strong>&quot;Sync to Supabase&quot;</strong> ci-dessus pour synchroniser ces nouvelles traductions avec la base de données et les rendre visibles en production.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Layout - 3 Blocs */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* BLOC A - Structure des contenus (col-span-8) */}
        <div className="xl:col-span-8 space-y-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Bloc A – Structure des contenus
              </CardTitle>
              <CardDescription className="text-cyan-200">
                Éditez les textes de chaque section de la landing page
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Section Navigator */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveSection(section.id)}
                      className={
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                          : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {section.label}
                    </Button>
                  );
                })}
              </div>

              {/* Content Editor Sections */}
              <div className="space-y-6">
                {activeSection === 'hero' && <HeroEditor content={currentContent?.hero} lang={selectedLang} />}
                {activeSection === 'seo' && <SEOEditor content={currentContent?.seo} lang={selectedLang} />}
                {activeSection === 'stats' && <StatsEditor content={currentContent?.stats} lang={selectedLang} />}
                {activeSection === 'services' && <ServicesEditor content={currentContent?.services} lang={selectedLang} />}
                {activeSection === 'network' && <NetworkEditor content={currentContent?.network} lang={selectedLang} />}
                {activeSection === 'steps' && <StepsEditor content={currentContent?.steps} lang={selectedLang} />}
                {activeSection === 'testimonials' && <TestimonialsEditor content={currentContent?.testimonials} lang={selectedLang} />}
                {activeSection === 'sectors' && <SectorsEditor content={currentContent?.sectors} lang={selectedLang} />}
                {activeSection === 'ctaForm' && <CTAFormEditor content={currentContent?.ctaForm} lang={selectedLang} />}
                {activeSection === 'footer' && <FooterEditor content={currentContent?.footer} lang={selectedLang} />}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BLOC B + C - Gestion langues & SEO (col-span-4) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* BLOC B - Gestion des langues (AMÉLIORÉ) */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Bloc B – Gestion des langues
              </CardTitle>
              <CardDescription className="text-cyan-200">
                23 langues européennes - Workflow de traduction avancé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const exists = !!landingContent[lang.code];
                  const meta = exists ? getTranslationMeta(lang.code) : null;
                  const progress = meta ? meta.completionPercentage : 0;
                  
                  // Déterminer le statut workflow
                  let workflowStatus: TranslationWorkflowStatus = 'NOT_STARTED';
                  if (meta) {
                    if (meta.validatedKeys === meta.totalKeys) workflowStatus = 'VALIDATED';
                    else if (meta.inReviewKeys > 0) workflowStatus = 'IN_REVIEW';
                    else if (meta.aiProposedKeys > 0) workflowStatus = 'AI_PROPOSED';
                  }

                  const statusColors: Record<TranslationWorkflowStatus, string> = {
                    VALIDATED: 'bg-green-500/20 text-green-300 border-green-400/30',
                    IN_REVIEW: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
                    AI_PROPOSED: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
                    NOT_STARTED: 'bg-gray-500/20 text-gray-300 border-gray-400/30',
                  };

                  const statusIcons: Record<TranslationWorkflowStatus, any> = {
                    VALIDATED: CheckCircle,
                    IN_REVIEW: Clock,
                    AI_PROPOSED: Sparkles,
                    NOT_STARTED: AlertCircle,
                  };

                  const StatusIcon = statusIcons[workflowStatus];
                  
                  return (
                    <motion.div
                      key={lang.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <div className="text-white">{lang.nativeName}</div>
                            <div className="text-xs text-cyan-200">{lang.name} ({lang.code})</div>
                          </div>
                        </div>
                        <Badge className={statusColors[workflowStatus]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {workflowStatus === 'VALIDATED' ? 'Validé' : 
                           workflowStatus === 'IN_REVIEW' ? 'En révision' :
                           workflowStatus === 'AI_PROPOSED' ? 'Proposition IA' : 'Non traduit'}
                        </Badge>
                      </div>

                      {/* Barre de progression */}
                      {exists && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-cyan-300">Progression</span>
                            <span className="text-xs text-cyan-300">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-1.5 bg-white/10" />
                          {meta && (
                            <div className="flex items-center gap-2 mt-1 text-xs text-cyan-300">
                              <span>{meta.validatedKeys} / {meta.totalKeys} clés</span>
                              {meta.aiProposedKeys > 0 && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs px-1 py-0">
                                  {meta.aiProposedKeys} IA
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {exists ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setEditingLang(lang.code)}
                              className="flex-1 bg-white/5 text-white border-white/20 h-8 hover:bg-white/10"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Ouvrir l'éditeur
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleTranslateWithAI(lang.code)}
                              disabled={isTranslating}
                              className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white h-8 hover:opacity-90"
                            >
                              {isTranslating ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  IA
                                </>
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleTranslateWithAI(lang.code)}
                            disabled={isTranslating}
                            className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white h-8"
                          >
                            {isTranslating ? (
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 mr-1" />
                            )}
                            Traduire avec l'IA
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* BLOC C - SEO & IA Quick Panel */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                Bloc C – SEO & Référencement IA
              </CardTitle>
              <CardDescription className="text-cyan-200">
                Optimisation pour les moteurs de recherche et IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">Meta Title</Label>
                  <Input
                    value={currentContent?.seo?.metaTitle || ''}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="Titre SEO (60 caractères)"
                  />
                  <p className="text-xs text-cyan-300 mt-1">
                    {currentContent?.seo?.metaTitle?.length || 0} / 60
                  </p>
                </div>
                
                <div>
                  <Label className="text-white text-sm mb-2 block">Meta Description</Label>
                  <Textarea
                    value={currentContent?.seo?.metaDescription || ''}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="Description SEO (160 caractères)"
                    rows={3}
                  />
                  <p className="text-xs text-cyan-300 mt-1">
                    {currentContent?.seo?.metaDescription?.length || 0} / 160
                  </p>
                </div>

                <div>
                  <Label className="text-white text-sm mb-2 block">Résumé pour les IA (500 car.)</Label>
                  <Textarea
                    value={currentContent?.seo?.aiSummary || ''}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="Résumé clair et structuré pour les intelligences artificielles..."
                    rows={4}
                  />
                  <p className="text-xs text-cyan-300 mt-1">
                    {currentContent?.seo?.aiSummary?.length || 0} / 500
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Label className="text-white mb-2 block">FAQ Structurée</Label>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 mb-3">
                    {currentContent?.seo?.faq?.length || 0} questions
                  </Badge>
                  <Button size="sm" className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Gérer la FAQ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 📝 Section Editors (composants simplifiés)

function HeroEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  return (
    <div className="space-y-4">
      <ContentField
        label="Badge"
        keyPath={`landing.${lang}.hero.badge`}
        value={content.badge}
        placeholder="⭐ Leader du recrutement européen"
      />
      <ContentField
        label="Titre principal (H1)"
        keyPath={`landing.${lang}.hero.title`}
        value={content.title}
        placeholder="Votre partenaire pour recruter en Europe"
      />
      <ContentField
        label="Sous-titre"
        keyPath={`landing.${lang}.hero.subtitle`}
        value={content.subtitle}
        placeholder="Description du service..."
        multiline
      />
      <div>
        <Label className="text-white mb-2 block">Bénéfices (4 items)</Label>
        {content.benefits?.map((benefit: string, i: number) => (
          <ContentField
            key={i}
            label={`Bénéfice ${i + 1}`}
            keyPath={`landing.${lang}.hero.benefits[${i}]`}
            value={benefit}
            placeholder={`Bénéfice ${i + 1}`}
            compact
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ContentField
          label="CTA Primaire"
          keyPath={`landing.${lang}.hero.ctaPrimaryLabel`}
          value={content.ctaPrimaryLabel}
          placeholder="Demander un devis"
        />
        <ContentField
          label="CTA Secondaire"
          keyPath={`landing.${lang}.hero.ctaSecondaryLabel`}
          value={content.ctaSecondaryLabel}
          placeholder="Découvrir notre réseau"
        />
      </div>
    </div>
  );
}

function SEOEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  return (
    <div className="space-y-4">
      <ContentField
        label="Meta Title"
        keyPath={`landing.${lang}.seo.metaTitle`}
        value={content.metaTitle}
        placeholder="Titre pour les moteurs de recherche (60 caractères)"
      />
      <ContentField
        label="Meta Description"
        keyPath={`landing.${lang}.seo.metaDescription`}
        value={content.metaDescription}
        placeholder="Description pour les moteurs de recherche (160 caractères)"
        multiline
      />
      <ContentField
        label="Slug / URL"
        keyPath={`landing.${lang}.seo.slug`}
        value={content.slug}
        placeholder="/fr ou /en ou /de"
      />
      <ContentField
        label="H1 Principal"
        keyPath={`landing.${lang}.seo.h1`}
        value={content.h1}
        placeholder="Titre H1 de la page"
      />
      <div className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
        <Label className="text-cyan-300 mb-2 block flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Résumé pour les intelligences artificielles
        </Label>
        <Textarea
          value={content.aiSummary}
          className="bg-white/10 text-white border-white/20"
          rows={6}
          placeholder="Résumé clair et structuré de 500 caractères maximum pour optimiser le référencement par les IA (ChatGPT, Perplexity, etc.)"
        />
        <p className="text-xs text-cyan-300 mt-2">
          {content.aiSummary?.length || 0} / 500 caractères
        </p>
      </div>
    </div>
  );
}

function StatsEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  return (
    <div className="space-y-4">
      <ContentField
        label="Badge"
        keyPath={`landing.${lang}.stats.badge`}
        value={content.badge}
        placeholder="📊 Statistiques"
      />
      <ContentField
        label="Titre"
        keyPath={`landing.${lang}.stats.title`}
        value={content.title}
        placeholder="Nos réalisations"
      />
      <ContentField
        label="Sous-titre"
        keyPath={`landing.${lang}.stats.subtitle`}
        value={content.subtitle}
        placeholder="Description des statistiques..."
        multiline
      />
      
      <Label className="text-white block mt-6 mb-3">3 Statistiques</Label>
      {content.stats?.map((stat: any, i: number) => (
        <Card key={i} className="bg-white/5 border-white/10 p-4">
          <ContentField
            label={`Statistique ${i + 1} - Titre`}
            keyPath={`landing.${lang}.stats.stats[${i}].title`}
            value={stat.title}
            compact
          />
          <ContentField
            label="Description"
            keyPath={`landing.${lang}.stats.stats[${i}].description`}
            value={stat.description}
            multiline
            compact
          />
        </Card>
      ))}
    </div>
  );
}

function ServicesEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.services.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.services.title`} value={content.title} />
      <ContentField label="Sous-titre" keyPath={`landing.${lang}.services.subtitle`} value={content.subtitle} multiline />
      
      <Label className="text-white block mt-6 mb-3">3 Services</Label>
      {content.services?.map((service: any, i: number) => (
        <Card key={i} className="bg-white/5 border-white/10 p-4">
          <ContentField
            label={`Service ${i + 1} - Titre`}
            keyPath={`landing.${lang}.services.services[${i}].title`}
            value={service.title}
            compact
          />
          <ContentField
            label="Description"
            keyPath={`landing.${lang}.services.services[${i}].description`}
            value={service.description}
            multiline
            compact
          />
        </Card>
      ))}
    </div>
  );
}

function NetworkEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.network.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.network.title`} value={content.title} />
      <ContentField label="Sous-titre" keyPath={`landing.${lang}.network.subtitle`} value={content.subtitle} multiline />
      
      <Card className="bg-violet-500/10 border-violet-400/30 p-4">
        <Label className="text-violet-300 mb-3 block">Section Waitlist</Label>
        <ContentField label="Badge Waitlist" keyPath={`landing.${lang}.network.waitlist.badge`} value={content.waitlist?.badge} compact />
        <ContentField label="Titre Waitlist" keyPath={`landing.${lang}.network.waitlist.title`} value={content.waitlist?.title} compact />
        <ContentField label="Sous-titre" keyPath={`landing.${lang}.network.waitlist.subtitle`} value={content.waitlist?.subtitle} multiline compact />
      </Card>
    </div>
  );
}

function StepsEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.steps.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.steps.title`} value={content.title} />
      <Label className="text-white block mt-4 mb-3">4 Étapes</Label>
      {content.steps?.map((step: any, i: number) => (
        <Card key={i} className="bg-white/5 border-white/10 p-3">
          <ContentField label={`Étape ${i + 1} - Titre`} keyPath={`landing.${lang}.steps.steps[${i}].title`} value={step.title} compact />
          <ContentField label="Description" keyPath={`landing.${lang}.steps.steps[${i}].description`} value={step.description} multiline compact />
        </Card>
      ))}
    </div>
  );
}

function TestimonialsEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  const [testimonials, setTestimonials] = useState(content.testimonials || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Structure d'un témoignage vide
  const emptyTestimonial = {
    name: '',
    position: '',
    company: '',
    quote: '',
    rating: 5,
    sector: '',
  };
  
  const [currentTestimonial, setCurrentTestimonial] = useState(emptyTestimonial);
  
  // Ajouter un nouveau témoignage
  const handleAdd = () => {
    setCurrentTestimonial(emptyTestimonial);
    setIsAdding(true);
    setEditingIndex(null);
  };
  
  // Éditer un témoignage existant
  const handleEdit = (index: number) => {
    setCurrentTestimonial(testimonials[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };
  
  // Sauvegarder (ajouter ou modifier)
  const handleSave = () => {
    if (!currentTestimonial.name || !currentTestimonial.company || !currentTestimonial.quote) {
      alert('Veuillez remplir au minimum le nom, l\'entreprise et la citation');
      return;
    }
    
    if (isAdding) {
      setTestimonials([...testimonials, currentTestimonial]);
    } else if (editingIndex !== null) {
      const updated = [...testimonials];
      updated[editingIndex] = currentTestimonial;
      setTestimonials(updated);
    }
    
    // Réinitialiser
    setCurrentTestimonial(emptyTestimonial);
    setIsAdding(false);
    setEditingIndex(null);
    
    // TODO: Sauvegarder dans le state global et la DB
    console.log('💾 Testimonials updated:', testimonials);
  };
  
  // Annuler l'édition
  const handleCancel = () => {
    setCurrentTestimonial(emptyTestimonial);
    setIsAdding(false);
    setEditingIndex(null);
  };
  
  // Supprimer un témoignage
  const handleDelete = (index: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      const updated = testimonials.filter((_: any, i: number) => i !== index);
      setTestimonials(updated);
      // TODO: Sauvegarder dans le state global et la DB
      console.log('🗑️ Testimonial deleted');
    }
  };
  
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.testimonials.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.testimonials.title`} value={content.title} />
      <ContentField label="Sous-titre" keyPath={`landing.${lang}.testimonials.subtitle`} value={content.subtitle} multiline />
      
      {/* Liste des témoignages */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center gap-2">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
              {testimonials.length} témoignages
            </Badge>
          </Label>
          <Button
            size="sm"
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            disabled={isAdding || editingIndex !== null}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Ajouter un témoignage
          </Button>
        </div>
        
        {/* Formulaire d'ajout/édition */}
        {(isAdding || editingIndex !== null) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-green-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {isAdding ? 'Nouveau témoignage' : `Édition du témoignage #${(editingIndex || 0) + 1}`}
                </Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    className="bg-white/5 text-white border-white/20"
                  >
                    Annuler
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-green-500 text-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Sauvegarder
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-white text-xs mb-1 block">Nom *</Label>
                  <Input
                    value={currentTestimonial.name}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="Marc Durand"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Poste</Label>
                  <Input
                    value={currentTestimonial.position}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, position: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="Directeur RH"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Entreprise *</Label>
                  <Input
                    value={currentTestimonial.company}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, company: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="BTP Solutions France"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Secteur</Label>
                  <Input
                    value={currentTestimonial.sector}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, sector: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="BTP, Industrie, Agriculture..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-white text-xs mb-1 block">Citation *</Label>
                  <Textarea
                    value={currentTestimonial.quote}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, quote: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="YOJOB nous a permis de recruter 50 ouvriers qualifiés..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Note (1-5)</Label>
                  <Select
                    value={currentTestimonial.rating.toString()}
                    onValueChange={(v) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(v) })}
                  >
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ (5/5)</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ (4/5)</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ (3/5)</SelectItem>
                      <SelectItem value="2">⭐⭐ (2/5)</SelectItem>
                      <SelectItem value="1">⭐ (1/5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Liste des témoignages existants */}
        {testimonials.map((testimonial: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white">{testimonial.name}</h4>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 text-xs">
                      #{index + 1}
                    </Badge>
                    {testimonial.sector && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                        {testimonial.sector}
                      </Badge>
                    )}
                  </div>
                  <p className="text-cyan-200 text-sm">
                    {testimonial.position} - {testimonial.company}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(index)}
                    disabled={isAdding || editingIndex !== null}
                    className="bg-white/5 text-cyan-300 border-white/20 hover:bg-white/10"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(index)}
                    disabled={isAdding || editingIndex !== null}
                    className="bg-white/5 text-red-300 border-white/20 hover:bg-red-500/20"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-white text-sm italic">"{testimonial.quote}"</p>
            </Card>
          </motion.div>
        ))}
        
        {testimonials.length === 0 && !isAdding && (
          <Card className="bg-white/5 border-white/10 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-white mb-2">Aucun témoignage pour cette langue</p>
            <Button
              size="sm"
              onClick={handleAdd}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Ajouter le premier témoignage
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function SectorsEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  
  const [sectors, setSectors] = useState(content.sectors || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Icônes disponibles pour les secteurs
  const availableIcons = [
    'Building2', 'Factory', 'Tractor', 'UtensilsCrossed', 'Heart', 'Laptop',
    'Truck', 'ShoppingBag', 'Briefcase', 'Wrench', 'Plane', 'Ship'
  ];
  
  // Couleurs disponibles
  const availableColors = [
    { name: 'Orange', value: 'orange' },
    { name: 'Bleu', value: 'blue' },
    { name: 'Vert', value: 'green' },
    { name: 'Rouge', value: 'red' },
    { name: 'Rose', value: 'pink' },
    { name: 'Violet', value: 'violet' },
    { name: 'Cyan', value: 'cyan' },
    { name: 'Jaune', value: 'yellow' },
  ];
  
  // Structure d'un secteur vide
  const emptySector = {
    icon: 'Building2',
    name: '',
    color: 'blue',
  };
  
  const [currentSector, setCurrentSector] = useState(emptySector);
  
  // Map des couleurs pour l'affichage
  const colorBadgeClasses: Record<string, string> = {
    orange: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    green: 'bg-green-500/20 text-green-300 border-green-400/30',
    red: 'bg-red-500/20 text-red-300 border-red-400/30',
    pink: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  };
  
  // Ajouter un nouveau secteur
  const handleAdd = () => {
    setCurrentSector(emptySector);
    setIsAdding(true);
    setEditingIndex(null);
  };
  
  // Éditer un secteur existant
  const handleEdit = (index: number) => {
    setCurrentSector(sectors[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };
  
  // Sauvegarder (ajouter ou modifier)
  const handleSave = () => {
    if (!currentSector.name) {
      alert('Veuillez remplir le nom du secteur');
      return;
    }
    
    if (isAdding) {
      setSectors([...sectors, currentSector]);
    } else if (editingIndex !== null) {
      const updated = [...sectors];
      updated[editingIndex] = currentSector;
      setSectors(updated);
    }
    
    // Réinitialiser
    setCurrentSector(emptySector);
    setIsAdding(false);
    setEditingIndex(null);
    
    // TODO: Sauvegarder dans le state global et la DB
    console.log('💾 Sectors updated:', sectors);
  };
  
  // Annuler l'édition
  const handleCancel = () => {
    setCurrentSector(emptySector);
    setIsAdding(false);
    setEditingIndex(null);
  };
  
  // Supprimer un secteur
  const handleDelete = (index: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce secteur ?')) {
      const updated = sectors.filter((_: any, i: number) => i !== index);
      setSectors(updated);
      // TODO: Sauvegarder dans le state global et la DB
      console.log('🗑️ Sector deleted');
    }
  };
  
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.sectors.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.sectors.title`} value={content.title} />
      <ContentField label="Sous-titre" keyPath={`landing.${lang}.sectors.subtitle`} value={content.subtitle} multiline />
      
      {/* Liste des secteurs */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
              {sectors.length} secteurs
            </Badge>
          </Label>
          <Button
            size="sm"
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            disabled={isAdding || editingIndex !== null}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Ajouter un secteur
          </Button>
        </div>
        
        {/* Formulaire d'ajout/édition */}
        {(isAdding || editingIndex !== null) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-green-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {isAdding ? 'Nouveau secteur' : `Édition du secteur #${(editingIndex || 0) + 1}`}
                </Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    className="bg-white/5 text-white border-white/20"
                  >
                    Annuler
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-green-500 text-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Sauvegarder
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-white text-xs mb-1 block">Icône *</Label>
                  <Select
                    value={currentSector.icon}
                    onValueChange={(v) => setCurrentSector({ ...currentSector, icon: v })}
                  >
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Nom *</Label>
                  <Input
                    value={currentSector.name}
                    onChange={(e) => setCurrentSector({ ...currentSector, name: e.target.value })}
                    className="bg-white/10 text-white border-white/20"
                    placeholder="BTP & Construction"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs mb-1 block">Couleur *</Label>
                  <Select
                    value={currentSector.color}
                    onValueChange={(v) => setCurrentSector({ ...currentSector, color: v })}
                  >
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Liste des secteurs existants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectors.map((sector: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorBadgeClasses[sector.color] || colorBadgeClasses.blue}`}>
                      <span className="text-sm">📦</span>
                    </div>
                    <div>
                      <h4 className="text-white">{sector.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30 text-xs">
                          {sector.icon}
                        </Badge>
                        <Badge className={`${colorBadgeClasses[sector.color] || colorBadgeClasses.blue} text-xs`}>
                          {sector.color}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(index)}
                      disabled={isAdding || editingIndex !== null}
                      className="bg-white/5 text-cyan-300 border-white/20 hover:bg-white/10 h-8 w-8 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(index)}
                      disabled={isAdding || editingIndex !== null}
                      className="bg-white/5 text-red-300 border-white/20 hover:bg-red-500/20 h-8 w-8 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 text-xs">
                  #{index + 1}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {sectors.length === 0 && !isAdding && (
          <Card className="bg-white/5 border-white/10 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-white mb-2">Aucun secteur pour cette langue</p>
            <Button
              size="sm"
              onClick={handleAdd}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Ajouter le premier secteur
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function CTAFormEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  return (
    <div className="space-y-4">
      <ContentField label="Badge" keyPath={`landing.${lang}.ctaForm.badge`} value={content.badge} />
      <ContentField label="Titre" keyPath={`landing.${lang}.ctaForm.title`} value={content.title} />
      <ContentField label="CTA Label" keyPath={`landing.${lang}.ctaForm.form.ctaLabel`} value={content.form?.ctaLabel} />
    </div>
  );
}

function FooterEditor({ content, lang }: any) {
  if (!content) return <EmptyState />;
  return (
    <div className="space-y-4">
      <ContentField label="Tagline" keyPath={`landing.${lang}.footer.logo.tagline`} value={content.logo?.tagline} multiline />
      <ContentField label="Copyright" keyPath={`landing.${lang}.footer.bottom.copyright`} value={content.bottom?.copyright} />
    </div>
  );
}

// 🧩 Composants utilitaires

function ContentField({ label, keyPath, value, placeholder, multiline = false, compact = false }: any) {
  return (
    <div className={compact ? 'mb-2' : 'mb-4'}>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-white text-sm">{label}</Label>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs text-cyan-300 hover:text-cyan-200"
          onClick={() => navigator.clipboard.writeText(keyPath)}
        >
          <Copy className="w-3 h-3 mr-1" />
          {keyPath}
        </Button>
      </div>
      {multiline ? (
        <Textarea
          value={value || ''}
          readOnly
          className="bg-white/10 text-white border-white/20 cursor-not-allowed opacity-75"
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <Input
          value={value || ''}
          readOnly
          className="bg-white/10 text-white border-white/20 cursor-not-allowed opacity-75"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-yellow-400 mb-4" />
      <p className="text-white mb-2">Contenu non disponible pour cette langue</p>
      <Button className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
        <Sparkles className="w-4 h-4 mr-2" />
        Générer avec l'IA
      </Button>
    </div>
  );
}