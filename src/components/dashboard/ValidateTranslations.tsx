import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Loader2, FileSearch, Database, Layers } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { SURVEY_QUESTIONS, getQuestionsByProfile } from '../../config/survey-questions';

interface ProfileStats {
  questionsInConfig: number;
  translationsInDB: number;
  expectedTranslations: number;
  missingTranslations: number;
  languages: string[];
  missingByLanguage: { [lang: string]: number };
  questionsWithoutTranslations: string[];
  translationsWithoutQuestions: string[];
}

interface DiagnosticResult {
  timestamp: string;
  agency: ProfileStats;
  client: ProfileStats;
  worker: ProfileStats;
  totalQuestionsInConfig: number;
  totalTranslations: number;
  globalIssues: string[];
  languagesInDB: string[];
}

export function ValidateTranslations() {
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('🔍 Début du diagnostic...');

      if (!supabase) {
        throw new Error('Supabase client non initialisé');
      }

      // 1. Utiliser les questions de la configuration directement
      console.log('📋 Chargement des questions depuis la configuration...');
      const agencyQuestions = getQuestionsByProfile('agency');
      const clientQuestions = getQuestionsByProfile('client');
      const workerQuestions = getQuestionsByProfile('worker');
      
      console.log(`📊 Questions AGENCY depuis config: ${agencyQuestions.length}`);
      console.log(`📊 Questions CLIENT depuis config: ${clientQuestions.length}`);
      console.log(`📊 Questions WORKER depuis config: ${workerQuestions.length}`);

      // 2. Récupérer toutes les traductions depuis l'API i18n
      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63`;
      
      const translationsResponse = await fetch(`${API_BASE}/i18n/questions`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!translationsResponse.ok) {
        throw new Error(`Erreur API traductions: ${translationsResponse.statusText}`);
      }

      const translationsData = await translationsResponse.json();
      console.log('📊 Traductions récupérées:', translationsData);
      console.log('📊 Nombre de traductions:', translationsData.translations?.length || 0);

      // 3. Analyser par profil
      const analyzeProfile = (
        profileType: 'AGENCY' | 'CLIENT' | 'WORKER',
        profileQuestions: any[]
      ): ProfileStats => {
        const questionIds = profileQuestions.map((q: any) => q.id);
        console.log(`📋 IDs Questions ${profileType}:`, questionIds.slice(0, 5), '...');

        // Traductions pour ce profil (chercher par questionId)
        const profileTranslations: any[] = [];
        const languagesSet = new Set<string>();

        if (translationsData.translations && Array.isArray(translationsData.translations)) {
          translationsData.translations.forEach((translation: any) => {
            // Le questionId dans translations correspond à l'id de la question
            if (questionIds.includes(translation.questionId)) {
              profileTranslations.push(translation);
              
              // Extraire toutes les langues disponibles
              if (translation.translations && typeof translation.translations === 'object') {
                Object.keys(translation.translations).forEach(lang => {
                  languagesSet.add(lang);
                });
              }
            }
          });
        }

        const languages = Array.from(languagesSet);
        console.log(`🌍 Langues ${profileType}:`, languages);
        console.log(`📊 Traductions ${profileType}:`, profileTranslations.length);

        // Calculer les stats
        const expectedPerLanguage = profileQuestions.length;
        const expectedTotal = expectedPerLanguage * languages.length;

        // Traductions manquantes par langue
        const missingByLanguage: { [lang: string]: number } = {};
        languages.forEach(lang => {
          // Compter les questions qui ont une traduction dans cette langue
          const translatedQuestionIds = new Set<string>();
          profileTranslations.forEach(t => {
            if (t.translations?.[lang]?.label) {
              translatedQuestionIds.add(t.questionId);
            }
          });
          
          const missing = expectedPerLanguage - translatedQuestionIds.size;
          if (missing > 0) {
            missingByLanguage[lang] = missing;
          }
        });

        // Questions sans traductions
        const translatedQuestionIds = new Set(profileTranslations.map(t => t.questionId));
        const questionsWithoutTranslations = questionIds.filter((id: string) => !translatedQuestionIds.has(id));

        // Calculer les traductions manquantes (nombre total attendu - nombre présent)
        const uniqueTranslations = new Set<string>();
        profileTranslations.forEach(t => {
          if (t.translations) {
            Object.keys(t.translations).forEach(lang => {
              if (t.translations[lang]?.label) {
                uniqueTranslations.add(`${t.questionId}_${lang}`);
              }
            });
          }
        });

        return {
          questionsInConfig: profileQuestions.length,
          translationsInDB: profileTranslations.length,
          expectedTranslations: expectedTotal,
          missingTranslations: Math.max(0, expectedTotal - uniqueTranslations.size),
          languages,
          missingByLanguage,
          questionsWithoutTranslations,
          translationsWithoutQuestions: [],
        };
      };

      const agencyStats = analyzeProfile('AGENCY', agencyQuestions);
      const clientStats = analyzeProfile('CLIENT', clientQuestions);
      const workerStats = analyzeProfile('WORKER', workerQuestions);

      // 4. Langues globales
      const allLanguages = new Set([
        ...agencyStats.languages,
        ...clientStats.languages,
        ...workerStats.languages,
      ]);

      // 5. Problèmes globaux
      const globalIssues: string[] = [];

      if (agencyStats.questionsInConfig === 0) {
        globalIssues.push('❌ AUCUNE question AGENCY trouvée dans la configuration');
      }
      if (clientStats.questionsInConfig === 0) {
        globalIssues.push('❌ AUCUNE question CLIENT trouvée dans la configuration');
      }
      if (workerStats.questionsInConfig === 0) {
        globalIssues.push('❌ AUCUNE question WORKER trouvée dans la configuration');
      }

      if (agencyStats.translationsInDB === 0) {
        globalIssues.push('⚠️ AUCUNE traduction AGENCY trouvée dans la base');
      }
      if (clientStats.translationsInDB === 0) {
        globalIssues.push('⚠️ AUCUNE traduction CLIENT trouvée dans la base');
      }
      if (workerStats.translationsInDB === 0) {
        globalIssues.push('⚠️ AUCUNE traduction WORKER trouvée dans la base');
      }

      if (allLanguages.size === 0) {
        globalIssues.push('🚨 AUCUNE langue trouvée dans les traductions');
      } else if (allLanguages.size < 3) {
        globalIssues.push(`⚠️ Seulement ${allLanguages.size} langue(s) trouvée(s): ${Array.from(allLanguages).join(', ')}`);
      }

      // Vérifier les questions orphelines
      agencyStats.questionsWithoutTranslations.forEach(qId => {
        globalIssues.push(`🔴 Question AGENCY "${qId}" n'a AUCUNE traduction`);
      });
      clientStats.questionsWithoutTranslations.forEach(qId => {
        globalIssues.push(`🔴 Question CLIENT "${qId}" n'a AUCUNE traduction`);
      });
      workerStats.questionsWithoutTranslations.forEach(qId => {
        globalIssues.push(`🔴 Question WORKER "${qId}" n'a AUCUNE traduction`);
      });

      const totalQuestions = agencyQuestions.length + clientQuestions.length + workerQuestions.length;

      const result: DiagnosticResult = {
        timestamp: new Date().toISOString(),
        agency: agencyStats,
        client: clientStats,
        worker: workerStats,
        totalQuestionsInConfig: totalQuestions,
        totalTranslations: (translationsData.translations?.length || 0),
        globalIssues,
        languagesInDB: Array.from(allLanguages),
      };

      console.log('✅ Diagnostic terminé:', result);
      setDiagnosticResult(result);

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('❌ Erreur lors du diagnostic:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Lancer le diagnostic automatiquement au chargement
    runDiagnostic();
  }, []);

  const getGlobalStatus = () => {
    if (!diagnosticResult) return 'loading';
    if (diagnosticResult.globalIssues.length > 0) return 'error';
    if (
      diagnosticResult.agency.missingTranslations === 0 &&
      diagnosticResult.client.missingTranslations === 0 &&
      diagnosticResult.worker.missingTranslations === 0
    ) return 'success';
    return 'warning';
  };

  const status = getGlobalStatus();

  return (
    <Card className={`border-2 ${
      status === 'success' ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100/50' :
      status === 'error' ? 'border-red-200 bg-gradient-to-br from-red-50 to-red-100/50' :
      status === 'warning' ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50' :
      'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              🔍 Diagnostic Complet
            </CardTitle>
            <CardDescription>
              Analyse en temps réel des questions et traductions dans la base de données (AGENCY + CLIENT + WORKER)
            </CardDescription>
          </div>
          {diagnosticResult && (
            <Badge 
              className={
                status === 'success'
                  ? 'bg-green-500/20 text-green-700 border-green-400/30'
                  : status === 'error'
                  ? 'bg-red-500/20 text-red-700 border-red-400/30'
                  : 'bg-amber-500/20 text-amber-700 border-amber-400/30'
              }
            >
              {status === 'success' ? '✅ Complet' : status === 'error' ? '❌ Problèmes' : '⚠️ Incomplet'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              <span>Erreur: {error}</span>
            </div>
          </motion.div>
        )}

        {/* Statut principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-white rounded-lg border-2 border-dashed"
          style={{ 
            borderColor: 
              status === 'success' ? '#10B981' : 
              status === 'error' ? '#EF4444' : 
              status === 'warning' ? '#F59E0B' : 
              '#9CA3AF' 
          }}
        >
          <div className="flex items-center gap-3">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            ) : status === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : status === 'error' ? (
              <XCircle className="w-6 h-6 text-red-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            )}
            <div className="flex-1">
              <div className={`${
                status === 'success' ? 'text-green-700' : 
                status === 'error' ? 'text-red-700' : 
                'text-amber-700'
              }`}>
                {isAnalyzing ? 'Analyse en cours...' :
                 status === 'success' ? '✅ Toutes les traductions sont présentes' :
                 status === 'error' ? '❌ Problèmes critiques détectés' :
                 '⚠️ Traductions incomplètes'}
              </div>
              {diagnosticResult && (
                <div className="text-xs text-slate-600 mt-1">
                  {diagnosticResult.totalQuestionsInConfig} questions • {diagnosticResult.totalTranslations} traductions • {diagnosticResult.languagesInDB.length} langues
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Vue d'ensemble */}
        {diagnosticResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl text-blue-600">{diagnosticResult.totalQuestionsInConfig}</div>
                <div className="text-xs text-slate-600">Questions totales</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-cyan-200">
                <div className="text-2xl text-cyan-600">{diagnosticResult.totalTranslations}</div>
                <div className="text-xs text-slate-600">Traductions totales</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-violet-200">
                <div className="text-2xl text-violet-600">{diagnosticResult.languagesInDB.length}</div>
                <div className="text-xs text-slate-600">Langues configurées</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl text-amber-600">{diagnosticResult.globalIssues.length}</div>
                <div className="text-xs text-slate-600">Problèmes détectés</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Langues détectées */}
        {diagnosticResult && diagnosticResult.languagesInDB.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 bg-white rounded-lg border border-slate-200"
          >
            <div className="text-sm text-slate-700 mb-3">
              🌍 Langues trouvées :
            </div>
            <div className="flex flex-wrap gap-2">
              {diagnosticResult.languagesInDB.sort().map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  className="border-blue-300 text-blue-700 bg-blue-50"
                >
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </div>
            {diagnosticResult.languagesInDB.length < 3 && (
              <div className="mt-3 text-xs text-amber-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Attention : seulement {diagnosticResult.languagesInDB.length} langue(s) configurée(s). Les formulaires nécessitent FR, EN et DE minimum.</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats par profil */}
        {diagnosticResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Détails par profil :</span>
            </div>

            {/* AGENCY */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white">AGENCES ETT</Badge>
                  <span className="text-sm text-blue-700">
                    {diagnosticResult.agency.questionsInConfig} questions
                  </span>
                </div>
                {diagnosticResult.agency.missingTranslations > 0 && (
                  <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50">
                    {diagnosticResult.agency.missingTranslations} manquantes
                  </Badge>
                )}
              </div>
              <div className="text-xs text-blue-600 space-y-1">
                <div>✓ {diagnosticResult.agency.translationsInDB} traductions présentes</div>
                <div>→ {diagnosticResult.agency.expectedTranslations} attendues ({diagnosticResult.agency.questionsInConfig} × {diagnosticResult.agency.languages.length} langues)</div>
                {diagnosticResult.agency.questionsWithoutTranslations.length > 0 && (
                  <div className="text-red-600">
                    ⚠️ {diagnosticResult.agency.questionsWithoutTranslations.length} question(s) sans aucune traduction
                  </div>
                )}
                {Object.keys(diagnosticResult.agency.missingByLanguage).length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-amber-700">Manquantes par langue</summary>
                    <ul className="ml-4 mt-1">
                      {Object.entries(diagnosticResult.agency.missingByLanguage).map(([lang, count]) => (
                        <li key={lang}>{lang.toUpperCase()}: {count} manquante(s)</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>

            {/* CLIENT */}
            <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-lg border border-violet-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-violet-600 text-white">CLIENTS/Entreprises</Badge>
                  <span className="text-sm text-violet-700">
                    {diagnosticResult.client.questionsInConfig} questions
                  </span>
                </div>
                {diagnosticResult.client.missingTranslations > 0 && (
                  <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50">
                    {diagnosticResult.client.missingTranslations} manquantes
                  </Badge>
                )}
              </div>
              <div className="text-xs text-violet-600 space-y-1">
                <div>✓ {diagnosticResult.client.translationsInDB} traductions présentes</div>
                <div>→ {diagnosticResult.client.expectedTranslations} attendues ({diagnosticResult.client.questionsInConfig} × {diagnosticResult.client.languages.length} langues)</div>
                {diagnosticResult.client.questionsWithoutTranslations.length > 0 && (
                  <div className="text-red-600">
                    ⚠️ {diagnosticResult.client.questionsWithoutTranslations.length} question(s) sans aucune traduction
                  </div>
                )}
                {Object.keys(diagnosticResult.client.missingByLanguage).length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-amber-700">Manquantes par langue</summary>
                    <ul className="ml-4 mt-1">
                      {Object.entries(diagnosticResult.client.missingByLanguage).map(([lang, count]) => (
                        <li key={lang}>{lang.toUpperCase()}: {count} manquante(s)</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>

            {/* WORKER */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-white">INTÉRIMAIRES</Badge>
                  <span className="text-sm text-green-700">
                    {diagnosticResult.worker.questionsInConfig} questions
                  </span>
                </div>
                {diagnosticResult.worker.missingTranslations > 0 && (
                  <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50">
                    {diagnosticResult.worker.missingTranslations} manquantes
                  </Badge>
                )}
              </div>
              <div className="text-xs text-green-600 space-y-1">
                <div>✓ {diagnosticResult.worker.translationsInDB} traductions présentes</div>
                <div>→ {diagnosticResult.worker.expectedTranslations} attendues ({diagnosticResult.worker.questionsInConfig} × {diagnosticResult.worker.languages.length} langues)</div>
                {diagnosticResult.worker.questionsWithoutTranslations.length > 0 && (
                  <div className="text-red-600">
                    ⚠️ {diagnosticResult.worker.questionsWithoutTranslations.length} question(s) sans aucune traduction
                  </div>
                )}
                {Object.keys(diagnosticResult.worker.missingByLanguage).length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-amber-700">Manquantes par langue</summary>
                    <ul className="ml-4 mt-1">
                      {Object.entries(diagnosticResult.worker.missingByLanguage).map(([lang, count]) => (
                        <li key={lang}>{lang.toUpperCase()}: {count} manquante(s)</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Problèmes globaux */}
        {diagnosticResult && diagnosticResult.globalIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2 text-red-700 mb-3">
              <XCircle className="w-5 h-5" />
              <span>🚨 Problèmes détectés ({diagnosticResult.globalIssues.length})</span>
            </div>
            <ul className="space-y-2 text-xs text-red-600">
              {diagnosticResult.globalIssues.slice(0, 10).map((issue, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
              {diagnosticResult.globalIssues.length > 10 && (
                <li className="text-slate-500 italic">
                  ... et {diagnosticResult.globalIssues.length - 10} autre(s) problème(s)
                </li>
              )}
            </ul>
          </motion.div>
        )}

        {/* Succès */}
        {diagnosticResult && status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span>✅ Toutes les traductions sont complètes !</span>
            </div>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>AGENCY: {diagnosticResult.agency.questionsInConfig} questions × {diagnosticResult.agency.languages.length} langues = {diagnosticResult.agency.translationsInDB} traductions ✓</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>CLIENT: {diagnosticResult.client.questionsInConfig} questions × {diagnosticResult.client.languages.length} langues = {diagnosticResult.client.translationsInDB} traductions ✓</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>WORKER: {diagnosticResult.worker.questionsInConfig} questions × {diagnosticResult.worker.languages.length} langues = {diagnosticResult.worker.translationsInDB} traductions ✓</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bouton de re-analyse */}
        <Button
          onClick={runDiagnostic}
          disabled={isAnalyzing}
          variant="outline"
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              🔄 Re-lancer le diagnostic
            </>
          )}
        </Button>

        {/* Info */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
          <strong>💡 Ce diagnostic :</strong>
          <ul className="ml-4 mt-1 space-y-1">
            <li>• Analyse les tables <code className="bg-blue-100 px-1 rounded">survey_questions</code> et <code className="bg-blue-100 px-1 rounded">survey_translations</code></li>
            <li>• Vérifie que chaque question a des traductions dans toutes les langues configurées</li>
            <li>• Identifie les questions orphelines et les traductions manquantes</li>
            <li>• Te dit exactement pourquoi les formulaires ne sont pas traduits</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}