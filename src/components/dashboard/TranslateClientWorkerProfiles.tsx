import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, HardHat, Loader2, CheckCircle, AlertTriangle, Zap, Languages, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';
import { getQuestionsByProfile } from '../../config/survey-questions';

interface Props {
  onComplete?: () => void;
}

interface TranslationProgress {
  profile: 'client' | 'worker';
  currentQuestion: number;
  totalQuestions: number;
  questionId: string;
  languagesCompleted: number;
  totalLanguages: number;
}

export function TranslateClientWorkerProfiles({ onComplete }: Props) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState<TranslationProgress | null>(null);
  const [result, setResult] = useState<any>(null);

  // Get questions for client and worker profiles
  const clientQuestions = getQuestionsByProfile('client');
  const workerQuestions = getQuestionsByProfile('worker');
  
  // Get unique questions (some are shared between profiles)
  const allQuestions = [...clientQuestions, ...workerQuestions];
  const uniqueQuestionIds = [...new Set(allQuestions.map(q => q.id))];
  
  // Calculate total translations needed
  const targetLanguages = EUROPEAN_LANGUAGES.filter(lang => lang.code !== 'fr');
  const totalTranslations = uniqueQuestionIds.length * targetLanguages.length;

  const handleTranslate = async () => {
    const confirmMessage = `🌍 Cette action va traduire automatiquement TOUTES les questions des profils CLIENT et WORKER dans ${targetLanguages.length} langues européennes.

📊 Statistiques :
• Questions Client : ${clientQuestions.length}
• Questions Worker : ${workerQuestions.length}
• Questions uniques : ${uniqueQuestionIds.length}
• Langues cibles : ${targetLanguages.length}
• Total traductions : ~${totalTranslations}

⏱️ Temps estimé : 2-3 minutes

Voulez-vous continuer ?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setIsTranslating(true);
      setResult(null);

      toast.info('🤖 Traduction automatique démarrée...', {
        description: `${uniqueQuestionIds.length} questions × ${targetLanguages.length} langues`
      });

      let totalTranslated = 0;
      let totalErrors = 0;
      const processedQuestions: string[] = [];

      // Process each unique question
      for (let i = 0; i < uniqueQuestionIds.length; i++) {
        const questionId = uniqueQuestionIds[i];
        const question = allQuestions.find(q => q.id === questionId);
        
        if (!question) continue;

        // Determine which profile this question belongs to (for progress display)
        const belongsToClient = clientQuestions.some(q => q.id === questionId);
        const currentProfile = belongsToClient ? 'client' : 'worker';

        // Update progress
        setProgress({
          profile: currentProfile,
          currentQuestion: i + 1,
          totalQuestions: uniqueQuestionIds.length,
          questionId: questionId,
          languagesCompleted: 0,
          totalLanguages: targetLanguages.length
        });

        // Get the French text (source)
        const sourceText = question.labelFallback;

        console.log(`📝 Translating question ${i + 1}/${uniqueQuestionIds.length}: ${questionId} (${currentProfile})`);

        try {
          // Call auto-translate-batch endpoint
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/auto-translate-batch`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify({
                textId: questionId,
                sourceText: sourceText,
                sourceLanguage: 'fr',
                targetLanguages: targetLanguages.map(lang => lang.code),
                category: 'question',
                autoStore: true // Automatically store in database
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            totalTranslated += data.stats.successful;
            totalErrors += data.stats.failed;
            processedQuestions.push(questionId);

            console.log(`✅ ${questionId}: ${data.stats.successful}/${data.stats.total} languages translated`);

            // Update progress with languages completed
            setProgress(prev => prev ? {
              ...prev,
              languagesCompleted: data.stats.successful
            } : null);
          } else {
            const errorText = await response.text();
            console.error(`❌ Failed to translate ${questionId}:`, errorText);
            totalErrors += targetLanguages.length;
          }

          // Small delay between questions to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 300));

        } catch (error) {
          console.error(`❌ Error translating ${questionId}:`, error);
          totalErrors += targetLanguages.length;
        }
      }

      // Success!
      setResult({
        success: totalErrors === 0,
        message: totalErrors === 0 
          ? '🎉 Traduction complète réussie !' 
          : `⚠️ Traduction terminée avec quelques erreurs`,
        stats: {
          questionsProcessed: processedQuestions.length,
          totalQuestions: uniqueQuestionIds.length,
          translationsCreated: totalTranslated,
          errors: totalErrors,
          clientQuestions: clientQuestions.length,
          workerQuestions: workerQuestions.length,
          languages: targetLanguages.length
        }
      });

      toast.success('✅ Traduction terminée !', {
        description: `${totalTranslated} traductions créées • ${totalErrors} erreurs`
      });

      if (onComplete) {
        onComplete();
      }

    } catch (error: any) {
      console.error('Error translating profiles:', error);
      toast.error('❌ Erreur lors de la traduction', {
        description: error.message
      });
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setIsTranslating(false);
      setProgress(null);
    }
  };

  return (
    <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.4), transparent)',
            'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4), transparent)',
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.4), transparent)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-1">
              <Briefcase className="w-5 h-5 text-violet-600" />
              <HardHat className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-violet-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Traduire Profils CLIENT & WORKER
              </CardTitle>
              <p className="text-sm text-violet-700 mt-1">
                Traduction automatique IA de toutes les questions manquantes
              </p>
            </div>
          </div>

          <Badge variant="outline" className="bg-white/50 border-violet-300 text-violet-700">
            <Languages className="w-3 h-3 mr-1" />
            {targetLanguages.length} langues
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Stats Overview */}
        {!result && !isTranslating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-violet-200"
          >
            <p className="text-sm text-violet-900 mb-3">
              <strong>📋 Questions à traduire :</strong>
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Client Profile */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-3 border border-violet-200">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-violet-600" />
                  <p className="text-xs text-violet-700">Clients/Entreprises</p>
                </div>
                <p className="text-2xl text-violet-900">{clientQuestions.length}</p>
                <p className="text-xs text-violet-600 mt-1">questions</p>
              </div>

              {/* Worker Profile */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="w-4 h-4 text-purple-600" />
                  <p className="text-xs text-purple-700">Intérimaires</p>
                </div>
                <p className="text-2xl text-purple-900">{workerQuestions.length}</p>
                <p className="text-xs text-purple-600 mt-1">questions</p>
              </div>
            </div>

            {/* Total calculations */}
            <div className="bg-white/70 rounded-lg p-3 border border-violet-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-violet-700">Questions uniques :</span>
                <strong className="text-violet-900">{uniqueQuestionIds.length}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-violet-700">Langues cibles :</span>
                <strong className="text-violet-900">{targetLanguages.length}</strong>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-violet-200">
                <span className="text-violet-700">Total traductions :</span>
                <strong className="text-violet-900">~{totalTranslations}</strong>
              </div>
            </div>

            <div className="mt-3 text-xs text-violet-600 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 flex-shrink-0" />
                <span>
                  Les questions <strong>déjà traduites pour les agences ETT</strong> ne seront pas retraduites. Seules les nouvelles questions et champs manquants seront traduits.
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Progress Display */}
        {isTranslating && progress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-violet-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {progress.profile === 'client' ? (
                  <Briefcase className="w-5 h-5 text-violet-600" />
                ) : (
                  <HardHat className="w-5 h-5 text-purple-600" />
                )}
                <span className="text-sm text-violet-900">
                  {progress.profile === 'client' ? 'Client' : 'Worker'} • Question {progress.currentQuestion}/{progress.totalQuestions}
                </span>
              </div>
              <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-300">
                {Math.round((progress.currentQuestion / progress.totalQuestions) * 100)}%
              </Badge>
            </div>

            <p className="text-xs text-violet-700 mb-2 font-mono">
              {progress.questionId}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-violet-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${(progress.currentQuestion / progress.totalQuestions) * 100}%` }}
              />
            </div>

            <p className="text-xs text-violet-600 mt-2 text-center">
              Traduction en cours... {progress.languagesCompleted}/{progress.totalLanguages} langues
            </p>
          </motion.div>
        )}

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 border-2 ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm mb-3 ${result.success ? 'text-green-900' : 'text-orange-900'}`}>
                  <strong>{result.message}</strong>
                </p>
                
                {result.stats && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/50 rounded-lg px-3 py-2">
                      <p className="text-xs text-slate-600">Questions traitées</p>
                      <p className="text-lg text-slate-900">{result.stats.questionsProcessed}/{result.stats.totalQuestions}</p>
                    </div>
                    <div className="bg-white/50 rounded-lg px-3 py-2">
                      <p className="text-xs text-slate-600">Langues</p>
                      <p className="text-lg text-slate-900">{result.stats.languages}</p>
                    </div>
                    <div className="bg-white/50 rounded-lg px-3 py-2">
                      <p className="text-xs text-slate-600">Traductions créées</p>
                      <p className="text-lg text-green-700">{result.stats.translationsCreated}</p>
                    </div>
                    <div className="bg-white/50 rounded-lg px-3 py-2">
                      <p className="text-xs text-slate-600">Erreurs</p>
                      <p className={`text-lg ${result.stats.errors > 0 ? 'text-red-700' : 'text-green-700'}`}>
                        {result.stats.errors}
                      </p>
                    </div>
                  </div>
                )}

                {result.success && (
                  <p className="text-xs text-green-800 mt-3 bg-green-100 rounded-lg p-2">
                    ✅ Rechargez la page pour voir les nouvelles traductions dans le dashboard !
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          whileHover={!isTranslating ? { scale: 1.02 } : {}}
          whileTap={!isTranslating ? { scale: 0.98 } : {}}
        >
          <Button
            onClick={handleTranslate}
            disabled={isTranslating}
            className={`
              w-full relative overflow-hidden group rounded-xl py-6
              ${result?.success
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-xl hover:shadow-2xl transition-all
            `}
          >
            {/* Shimmer effect */}
            {!isTranslating && !result?.success && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}

            <span className="relative z-10 flex items-center justify-center gap-3">
              {isTranslating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Traduction en cours...</span>
                </>
              ) : result?.success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Traduction terminée avec succès !</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>🚀 Traduire avec Claude AI (~2-3 min)</span>
                </>
              )}
            </span>
          </Button>
        </motion.div>

        {/* Info Footer */}
        {!result && !isTranslating && (
          <div className="text-xs text-violet-700 bg-white/50 rounded-lg p-3 border border-violet-200">
            <p className="flex items-center gap-2 mb-2">
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span>
                <strong>Technologie :</strong> Claude AI (Anthropic) avec optimisation contextuelle multi-langue
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Languages className="w-3 h-3 flex-shrink-0" />
              <span className="text-[10px]">
                EN, DE, ES, IT, NL, PT, PL, CS, SK, HU, RO, BG, HR, SL, ET, LV, LT, EL, SV, DA, FI, NO
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
