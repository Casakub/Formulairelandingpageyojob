import { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle, Loader2, AlertCircle, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

interface Props {
  totalTexts: number;
  completionRate: number;
}

export function OneClickAutoSetup({ totalTexts, completionRate }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'seeding' | 'translating' | 'reloading' | 'complete' | 'error' | 'stopped'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const { refetchTranslations } = useTranslationContext();

  const addLog = (message: string) => {
    console.log(`🚀 [OneClickSetup] ${message}`);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const runFullSetup = async () => {
    setIsRunning(true);
    setCurrentStep('seeding');
    setProgress(0);
    setLogs([]);
    addLog('🚀 Démarrage du setup complet automatique...');

    try {
      // ========== STEP 1: SEED (10% progress) ==========
      addLog('📝 Étape 1/3 : Seed des 18 textes manquants...');
      setProgress(5);
      
      const seedResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-missing-translations`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!seedResponse.ok) {
        const errorText = await seedResponse.text();
        throw new Error(`Seed failed: ${errorText}`);
      }

      const seedResult = await seedResponse.json();
      addLog(`✅ Seed terminé : ${seedResult.stats?.added || 0} textes créés, ${seedResult.stats?.skipped || 0} déjà existants`);
      setProgress(10);

      // ========== STEP 2: AUTO-TRANSLATE ALL (10% → 90% progress) ==========
      setCurrentStep('translating');
      addLog('🌐 Étape 2/3 : Auto-translation de tous les textes manquants...');
      addLog('⏳ Chargement des traductions existantes...');
      setProgress(15);

      // Fetch all existing translations
      const fetchResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/translations`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!fetchResponse.ok) {
        throw new Error('Impossible de charger les traductions existantes');
      }

      const { questionTranslations, uiTextTranslations } = await fetchResponse.json();
      const allTexts = [...questionTranslations, ...uiTextTranslations];

      addLog(`📦 ${allTexts.length} textes chargés (${questionTranslations.length} questions + ${uiTextTranslations.length} UI)`);

      const targetLanguages = EUROPEAN_LANGUAGES.filter(lang => lang.code !== 'fr');
      let translatedCount = 0;
      let errorCount = 0;
      let processedTexts = 0;

      // Process each text
      for (let i = 0; i < allTexts.length; i++) {
        const text = allTexts[i];
        const frenchText = text.translations?.fr?.text;

        if (!frenchText) {
          addLog(`⚠️ Pas de texte FR pour ${text.textId}, ignoré`);
          continue;
        }

        // Map translation progress (0-100) to our progress (15-90)
        const textProgress = 15 + ((i / allTexts.length) * 75);
        setProgress(textProgress);

        // Check which languages are missing
        const missingLanguages = targetLanguages.filter(lang => {
          const translation = text.translations?.[lang.code];
          return !translation || !translation.text;
        });

        if (missingLanguages.length === 0) {
          continue; // Already fully translated
        }

        processedTexts++;
        addLog(`📊 ${text.textId}: ${missingLanguages.length} langues manquantes`);

        try {
          // Determine category
          const category = text.category || (text.textId.startsWith('q') ? 'question' : 'ui');
          
          // Call auto-translate-batch endpoint
          const translateResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/auto-translate-batch`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify({
                textId: text.textId,
                sourceText: frenchText,
                sourceLanguage: 'fr',
                targetLanguages: missingLanguages.map(lang => lang.code),
                category,
                autoStore: true
              })
            }
          );

          if (translateResponse.ok) {
            const result = await translateResponse.json();
            translatedCount += result.stats.successful;
            if (result.stats.failed > 0) {
              errorCount += result.stats.failed;
            }
            addLog(`   ✅ ${result.stats.successful}/${result.stats.total} langues traduites`);
          } else {
            errorCount++;
            const errorText = await translateResponse.text();
            addLog(`   ❌ Erreur: ${errorText.substring(0, 100)}`);
          }

          // Small delay between texts
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error: any) {
          addLog(`   ❌ Exception: ${error.message}`);
          errorCount++;
        }

        // Check if the user wants to stop
        if (shouldStop) {
          addLog('⚠️ Arrêt demandé par l\'utilisateur');
          setCurrentStep('stopped');
          setProgress(0);
          setShouldStop(false);
          return;
        }
      }

      addLog(`✅ Auto-translation terminée !`);
      addLog(`   • ${translatedCount} traductions créées avec succès`);
      addLog(`   • ${errorCount} erreurs`);
      addLog(`   • ${processedTexts} textes traités`);
      setProgress(90);

      // ========== STEP 3: RELOAD (90% → 100% progress) ==========
      setCurrentStep('reloading');
      addLog('🔄 Étape 3/3 : Rechargement des traductions...');
      setProgress(95);

      await refetchTranslations();
      
      addLog('✅ Traductions rechargées avec succès !');
      setProgress(100);

      // ========== COMPLETE ==========
      setCurrentStep('complete');
      addLog('🎉 Setup complet terminé ! Le formulaire est maintenant disponible dans 23 langues.');

    } catch (error: any) {
      console.error('❌ Setup failed:', error);
      setCurrentStep('error');
      addLog(`❌ Erreur : ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'seeding':
        return <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />;
      case 'translating':
        return <Loader2 className="w-5 h-5 animate-spin text-violet-600" />;
      case 'reloading':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-600" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'stopped':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Rocket className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'seeding':
        return 'Seed des textes en cours...';
      case 'translating':
        return 'Auto-translation en cours...';
      case 'reloading':
        return 'Rechargement des traductions...';
      case 'complete':
        return 'Setup complet terminé ! 🎉';
      case 'error':
        return 'Erreur lors du setup';
      case 'stopped':
        return 'Setup arrêté';
      default:
        return 'Setup Complet Automatique';
    }
  };

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.3), transparent)',
            'radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.3), transparent)',
            'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.3), transparent)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStepIcon()}
            <div>
              <CardTitle className="text-orange-900 flex items-center gap-2">
                {getStepTitle()}
              </CardTitle>
              <p className="text-sm text-orange-700 mt-1">
                Seed + Auto-translate + Reload en un seul clic
              </p>
            </div>
          </div>

          {currentStep === 'idle' && (
            <Badge variant="outline" className="bg-white/50 border-orange-300 text-orange-700">
              <Zap className="w-3 h-3 mr-1" />
              Nouveau
            </Badge>
          )}

          {currentStep === 'translating' && (
            <Badge variant="outline" className="bg-white/50 border-violet-300 text-violet-700">
              <Clock className="w-3 h-3 mr-1 animate-pulse" />
              ~15 min
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Description */}
        {currentStep === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200"
          >
            <p className="text-sm text-orange-900 mb-3">
              <strong>Ce setup automatique va :</strong>
            </p>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 flex-shrink-0">1.</span>
                <span>Créer les <strong>18 textes manquants</strong> en français (section 6 + autres)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 flex-shrink-0">2.</span>
                <span>Les traduire automatiquement dans <strong>22 langues</strong> via Claude API (396 traductions)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">3.</span>
                <span>Recharger toutes les traductions pour mise à jour immédiate</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-orange-200 flex items-center justify-between text-xs text-orange-700">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Durée estimée : <strong>15 minutes</strong>
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <strong>396</strong> traductions créées
              </span>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-800">Progression globale</span>
              <span className="text-orange-900 font-mono">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Logs Console */}
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-900 rounded-lg p-4 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-slate-400 font-mono">console.log</span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 font-mono text-xs">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`
                    ${log.includes('✅') ? 'text-green-400' : ''}
                    ${log.includes('❌') ? 'text-red-400' : ''}
                    ${log.includes('📊') ? 'text-cyan-400' : ''}
                    ${log.includes('🌐') ? 'text-violet-400' : ''}
                    ${log.includes('🔄') ? 'text-blue-400' : ''}
                    ${log.includes('⏳') ? 'text-yellow-400' : ''}
                    ${!log.includes('✅') && !log.includes('❌') && !log.includes('📊') && !log.includes('🌐') && !log.includes('🔄') && !log.includes('⏳') ? 'text-slate-300' : ''}
                  `}
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          whileHover={!isRunning ? { scale: 1.02 } : {}}
          whileTap={!isRunning ? { scale: 0.98 } : {}}
          className="space-y-2"
        >
          <Button
            onClick={runFullSetup}
            disabled={isRunning || currentStep === 'complete'}
            className={`
              w-full relative overflow-hidden group rounded-lg py-6
              ${currentStep === 'complete' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 hover:from-orange-600 hover:via-yellow-600 hover:to-amber-600 text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl transition-all
            `}
          >
            {/* Shimmer effect */}
            {!isRunning && currentStep !== 'complete' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}

            <span className="relative z-10 flex items-center justify-center gap-3">
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {currentStep === 'seeding' && 'Seed en cours...'}
                    {currentStep === 'translating' && 'Traduction en cours...'}
                    {currentStep === 'reloading' && 'Rechargement...'}
                  </span>
                </>
              ) : currentStep === 'complete' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Setup terminé avec succès !</span>
                </>
              ) : currentStep === 'error' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Réessayer le setup</span>
                </>
              ) : currentStep === 'stopped' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Relancer le setup</span>
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  <span>🚀 Lancer le Setup Complet (15 min)</span>
                </>
              )}
            </span>
          </Button>

          {/* Stop Button */}
          {isRunning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={() => setShouldStop(true)}
                variant="outline"
                className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 py-3"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Arrêter le processus
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Stopped Message */}
        {currentStep === 'stopped' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 mb-2">
                  <strong>Processus arrêté</strong>
                </p>
                <p className="text-xs text-yellow-700">
                  Le setup a été interrompu. Vous pouvez le relancer à tout moment.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-900 mb-2">
                  <strong>🎉 Félicitations !</strong> Votre formulaire est maintenant disponible dans 23 langues.
                </p>
                <p className="text-xs text-green-700">
                  Vous pouvez maintenant tester le formulaire en allemand, espagnol, italien, etc.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {currentStep === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-900 mb-2">
                  <strong>Erreur lors du setup automatique</strong>
                </p>
                <p className="text-xs text-red-700">
                  Consultez les logs ci-dessus pour plus de détails. Vous pouvez réessayer ou utiliser les outils individuels.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}