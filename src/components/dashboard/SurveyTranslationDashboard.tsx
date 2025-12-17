/**
 * 📊 TABLEAU DE BORD DES TRADUCTIONS SURVEY
 * 
 * Affiche l'état de complétion des traductions du formulaire d'enquête
 * avec analyse automatique des écarts entre la source et les traductions
 * 
 * @version 1.0.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Briefcase, 
  HardHat,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles
} from 'lucide-react';
import { Input } from '../ui/input';
import {
  analyzeAllLanguages,
  analyzeLanguage,
  filterMissingKeysByProfile,
  groupMissingKeysByQuestion,
  SUPPORTED_LANGUAGES,
  type GlobalAnalysis,
  type LanguageAnalysis,
  type ExpectedTranslationKey
} from '../../utils/surveyTranslationAnalyzer';
import { SURVEY_QUESTIONS } from '../../config/survey-questions-COMPLETE';
import type { SupportedLanguage } from '../../src/i18n/types';

// Import tous les bundles de traduction
import * as translationBundles from '../../src/i18n/locales';

interface SurveyTranslationDashboardProps {
  onTranslationUpdate?: () => void;
}

export function SurveyTranslationDashboard({ onTranslationUpdate }: SurveyTranslationDashboardProps) {
  const [globalAnalysis, setGlobalAnalysis] = useState<GlobalAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<'all' | 'agency' | 'client' | 'worker'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Charger l'analyse au montage
  useEffect(() => {
    async function loadAnalysis() {
      setIsLoading(true);
      try {
        console.log('🔍 [SurveyTranslationDashboard] Chargement des bundles de traduction...');
        
        // Créer le mapping des bundles avec gestion d'erreur par bundle
        const bundles: Record<SupportedLanguage, any> = {} as any;
        
        const languagesToLoad: Array<{ code: SupportedLanguage; bundle: any }> = [
          { code: 'fr', bundle: translationBundles.fr },
          { code: 'en', bundle: translationBundles.en },
          { code: 'de', bundle: translationBundles.de },
          { code: 'es', bundle: translationBundles.es },
          { code: 'it', bundle: translationBundles.it },
          { code: 'pt', bundle: translationBundles.pt },
          { code: 'nl', bundle: translationBundles.nl },
          { code: 'pl', bundle: translationBundles.pl },
          { code: 'ro', bundle: translationBundles.ro },
          { code: 'bg', bundle: translationBundles.bg },
          { code: 'hu', bundle: translationBundles.hu },
          { code: 'cz', bundle: translationBundles.cz },
          { code: 'sk', bundle: translationBundles.sk },
          { code: 'hr', bundle: translationBundles.hr },
          { code: 'sl', bundle: translationBundles.sl },
          { code: 'lt', bundle: translationBundles.lt },
          { code: 'lv', bundle: translationBundles.lv },
          { code: 'ee', bundle: translationBundles.ee },
          { code: 'el', bundle: translationBundles.el },
          { code: 'sv', bundle: translationBundles.sv },
          { code: 'da', bundle: translationBundles.da },
          { code: 'fi', bundle: translationBundles.fi },
        ];
        
        // Charger chaque bundle avec vérification
        for (const { code, bundle } of languagesToLoad) {
          try {
            if (!bundle) {
              console.error(`❌ [SurveyTranslationDashboard] Bundle ${code} est undefined/null`);
              continue;
            }
            bundles[code] = bundle;
            console.log(`✅ [SurveyTranslationDashboard] Bundle ${code} chargé:`, Object.keys(bundle));
          } catch (error) {
            console.error(`❌ [SurveyTranslationDashboard] Erreur lors du chargement du bundle ${code}:`, error);
          }
        }

        console.log('📦 [SurveyTranslationDashboard] Bundles chargés avec succès:', Object.keys(bundles));
        
        if (Object.keys(bundles).length === 0) {
          throw new Error('Aucun bundle de traduction n\'a pu être chargé');
        }
        
        const analysis = await analyzeAllLanguages(bundles);
        console.log('✅ [SurveyTranslationDashboard] Analyse terminée:', {
          totalQuestions: analysis.totalQuestions,
          totalKeys: analysis.totalKeys,
          languagesCount: analysis.languages.length,
          averageCompleteness: analysis.averageCompleteness
        });
        
        setGlobalAnalysis(analysis);
      } catch (error) {
        console.error('❌ ❌ Error loading translations:', error instanceof Error ? error : new Error(String(error)));
        console.error('📋 Error details:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : 'No stack trace',
          name: error instanceof Error ? error.name : typeof error,
          error: error
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalysis();
  }, []);

  // Langue sélectionnée pour détails
  const selectedLanguageAnalysis = useMemo(() => {
    if (!selectedLanguage || !globalAnalysis) return null;
    const analysis = globalAnalysis.languages.find(l => l.language === selectedLanguage);
    console.log('🔍 [SurveyTranslationDashboard] Langue sélectionnée:', selectedLanguage, 'Analysis:', analysis);
    return analysis;
  }, [selectedLanguage, globalAnalysis]);

  // Filtrer les clés manquantes par profil
  const filteredMissingKeys = useMemo(() => {
    if (!selectedLanguageAnalysis) return [];
    if (selectedProfile === 'all') return selectedLanguageAnalysis.missingKeys;
    return filterMissingKeysByProfile(selectedLanguageAnalysis.missingKeys, selectedProfile);
  }, [selectedLanguageAnalysis, selectedProfile]);

  // Grouper par question
  const missingKeysByQuestion = useMemo(() => {
    return groupMissingKeysByQuestion(filteredMissingKeys);
  }, [filteredMissingKeys]);

  // Recherche dans les questions
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return Object.keys(missingKeysByQuestion);
    
    const query = searchQuery.toLowerCase();
    return Object.keys(missingKeysByQuestion).filter(qId => {
      const question = SURVEY_QUESTIONS.find(q => q.id === qId);
      if (!question) return false;
      
      return (
        question.id.toLowerCase().includes(query) ||
        question.labelFallback.toLowerCase().includes(query) ||
        question.fieldName.toLowerCase().includes(query)
      );
    });
  }, [missingKeysByQuestion, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-cyan-500 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600">Analyse des traductions en cours...</p>
        </div>
      </div>
    );
  }

  if (!globalAnalysis) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-slate-600">Impossible de charger l'analyse des traductions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 🎯 Vue d'ensemble globale */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-600" />
            Vue d'ensemble des traductions
          </CardTitle>
          <CardDescription>
            Analyse automatique basée sur survey-questions-COMPLETE.ts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Stat 1: Questions totales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Questions totales</p>
                  <p className="text-2xl text-slate-900 mt-1">{globalAnalysis.totalQuestions}</p>
                </div>
                <FileText className="w-8 h-8 text-cyan-500" />
              </div>
            </motion.div>

            {/* Stat 2: Clés de traduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Clés à traduire</p>
                  <p className="text-2xl text-slate-900 mt-1">{globalAnalysis.totalKeys}</p>
                </div>
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
            </motion.div>

            {/* Stat 3: Complétion moyenne */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Complétion moyenne</p>
                  <p className="text-2xl text-slate-900 mt-1">{globalAnalysis.averageCompleteness}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

            {/* Stat 4: Langues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-purple-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Langues supportées</p>
                  <p className="text-2xl text-slate-900 mt-1">{SUPPORTED_LANGUAGES.length}</p>
                </div>
                <Globe className="w-8 h-8 text-purple-500" />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* 📊 Liste des langues avec progression */}
      <Card>
        <CardHeader>
          <CardTitle>Progression par langue</CardTitle>
          <CardDescription>
            Cliquez sur une langue pour voir les détails des traductions manquantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalAnalysis.languages
              .sort((a, b) => b.completeness - a.completeness)
              .map((lang, index) => (
                <motion.button
                  key={lang.language}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    console.log('🖱️ [SurveyTranslationDashboard] Clic sur langue:', lang.language);
                    setSelectedLanguage(lang.language);
                    // Scroll vers les détails après un court délai
                    setTimeout(() => {
                      const detailsElement = document.getElementById('language-details');
                      if (detailsElement) {
                        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className={`cursor-pointer text-left p-4 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105 ${
                    selectedLanguage === lang.language
                      ? 'border-cyan-500 bg-cyan-50 shadow-cyan-200 shadow-md'
                      : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-slate-900">{lang.languageName}</span>
                    </div>
                    <Badge
                      variant={lang.completeness === 100 ? 'default' : 'secondary'}
                      className={
                        lang.completeness === 100
                          ? 'bg-green-500'
                          : lang.completeness >= 80
                          ? 'bg-cyan-500'
                          : lang.completeness >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }
                    >
                      {lang.completeness}%
                    </Badge>
                  </div>

                  {/* Barre de progression */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.completeness}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className={`h-2 rounded-full ${
                        lang.completeness === 100
                          ? 'bg-green-500'
                          : lang.completeness >= 80
                          ? 'bg-cyan-500'
                          : lang.completeness >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>

                  <p className="text-xs text-slate-600">
                    {lang.translatedKeys} / {lang.totalKeys} clés traduites
                  </p>

                  {/* Stats par profil */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Agence: {lang.byProfile.agency.completeness}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Client: {lang.byProfile.client.completeness}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <HardHat className="w-3 h-3 mr-1" />
                      Worker: {lang.byProfile.worker.completeness}%
                    </Badge>
                  </div>
                </motion.button>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* 🔍 Détails de la langue sélectionnée */}
      {selectedLanguageAnalysis && (
        <Card className="border-cyan-300" id="language-details">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedLanguageAnalysis.flag}</span>
                Détails : {selectedLanguageAnalysis.languageName}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLanguage(null)}
              >
                Fermer
              </Button>
            </div>
            <CardDescription>
              {selectedLanguageAnalysis.missingKeys.length === 0 ? (
                <span className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Toutes les traductions sont complètes ! 🎉
                </span>
              ) : (
                <span className="text-yellow-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {selectedLanguageAnalysis.missingKeys.length} clé(s) manquante(s)
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filtres par profil */}
            <Tabs value={selectedProfile} onValueChange={(v) => setSelectedProfile(v as any)}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">
                  Tous ({selectedLanguageAnalysis.missingKeys.length})
                </TabsTrigger>
                <TabsTrigger value="agency">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Agence ({filterMissingKeysByProfile(selectedLanguageAnalysis.missingKeys, 'agency').length})
                </TabsTrigger>
                <TabsTrigger value="client">
                  <Users className="w-4 h-4 mr-1" />
                  Client ({filterMissingKeysByProfile(selectedLanguageAnalysis.missingKeys, 'client').length})
                </TabsTrigger>
                <TabsTrigger value="worker">
                  <HardHat className="w-4 h-4 mr-1" />
                  Worker ({filterMissingKeysByProfile(selectedLanguageAnalysis.missingKeys, 'worker').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Barre de recherche */}
            {filteredMissingKeys.length > 0 && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher une question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Liste des questions avec clés manquantes */}
            {filteredMissingKeys.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-600">
                  Aucune traduction manquante pour ce profil !
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuestions.map((questionId) => {
                  const question = SURVEY_QUESTIONS.find(q => q.id === questionId);
                  const missingKeys = missingKeysByQuestion[questionId];
                  const isExpanded = expandedQuestion === questionId;

                  if (!question) return null;

                  return (
                    <motion.div
                      key={questionId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedQuestion(isExpanded ? null : questionId)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{question.id}</Badge>
                          <span className="text-slate-900">{question.labelFallback}</span>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {missingKeys.length} clé(s)
                          </Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="p-4 bg-white border-t border-slate-200"
                        >
                          <div className="space-y-2">
                            {missingKeys.map((key, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 p-2 bg-yellow-50 rounded border border-yellow-200"
                              >
                                <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-slate-900 font-mono break-all">
                                    {key.fullKey}
                                  </p>
                                  <p className="text-xs text-slate-600 mt-1">
                                    Type: {key.keyType}
                                    {key.optionValue && ` (option: ${key.optionValue})`}
                                  </p>
                                  <div className="flex gap-1 mt-2">
                                    {key.profiles.map(profile => (
                                      <Badge key={profile} variant="outline" className="text-xs">
                                        {profile}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Clés orphelines */}
            {selectedLanguageAnalysis.orphanKeys.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-900 mb-2">
                      ⚠️ {selectedLanguageAnalysis.orphanKeys.length} clé(s) orpheline(s) détectée(s)
                    </h4>
                    <p className="text-sm text-red-700 mb-3">
                      Ces traductions existent dans le fichier de langue mais n'ont pas de question correspondante dans survey-questions-COMPLETE.ts
                    </p>
                    <div className="space-y-1">
                      {selectedLanguageAnalysis.orphanKeys.slice(0, 5).map((key, idx) => (
                        <p key={idx} className="text-xs text-red-800 font-mono bg-red-100 p-2 rounded">
                          {key}
                        </p>
                      ))}
                      {selectedLanguageAnalysis.orphanKeys.length > 5 && (
                        <p className="text-xs text-red-600 mt-2">
                          ... et {selectedLanguageAnalysis.orphanKeys.length - 5} autre(s)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 💡 Info box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-blue-900">Comment fonctionne cette analyse ?</h4>
              <p className="text-sm text-blue-800">
                Ce tableau de bord compare automatiquement le fichier source <code className="bg-blue-100 px-1 rounded">config/survey-questions-COMPLETE.ts</code> avec tous les fichiers de traduction dans <code className="bg-blue-100 px-1 rounded">src/i18n/locales/</code>.
              </p>
              <p className="text-sm text-blue-800">
                Les clés manquantes sont détectées en temps réel. Pour ajouter une traduction manquante, éditez manuellement le fichier de langue correspondant dans <code className="bg-blue-100 px-1 rounded">src/i18n/locales/[langue].ts</code>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}