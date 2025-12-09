import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Upload, CheckCircle, AlertCircle, Loader2, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { useLandingContent } from '../../hooks/useLandingContent';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../../types/landingContent';

/**
 * 🔄 Composant pour migrer les traductions de la landing page
 * de localStorage vers Supabase + Traduction automatique de toutes les langues
 */

export function MigrateLandingToSupabase() {
  const { landingContent } = useLandingContent();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [migrationResults, setMigrationResults] = useState<{
    success: string[];
    errors: string[];
  } | null>(null);
  const [autoTranslate, setAutoTranslate] = useState(true);

  const handleMigration = async () => {
    setIsMigrating(true);
    setMigrationProgress(0);
    setMigrationResults(null);
    setCurrentStep('Initialisation...');

    const toastId = toast.loading('🔄 Migration et traduction en cours...', {
      description: autoTranslate ? 'Migration + traduction de toutes les langues' : 'Migration simple',
    });

    const results = {
      success: [] as string[],
      errors: [] as string[],
    };

    try {
      // Étape 1 : Migrer les langues existantes dans localStorage
      setCurrentStep('📦 Migration des langues existantes...');
      const existingLanguages = Object.keys(landingContent);
      
      for (let i = 0; i < existingLanguages.length; i++) {
        const lang = existingLanguages[i];
        const content = landingContent[lang];

        try {
          const translation_status = lang === 'fr' ? 'published' : 'draft';
          const translation_progress = lang === 'fr' ? 100 : 0;
          const translated_by = lang === 'fr' ? 'source' : 'manual';

          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${lang}`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content,
                translation_status,
                translation_progress,
                translated_by,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.success) {
            results.success.push(lang);
            console.log(`✅ ${lang.toUpperCase()} migrated successfully`);
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        } catch (error: any) {
          console.error(`❌ Error migrating ${lang}:`, error);
          results.errors.push(`${lang}: ${error.message}`);
        }

        setMigrationProgress(Math.round(((i + 1) / existingLanguages.length) * (autoTranslate ? 30 : 100)));
      }

      // Étape 2 : Traduire automatiquement les langues manquantes (si activé)
      if (autoTranslate) {
        setCurrentStep('🤖 Traduction automatique des langues manquantes...');
        
        // Charger le contenu français source
        const frResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/fr`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!frResponse.ok) {
          throw new Error('Impossible de charger le contenu français source');
        }

        const { content: frContent } = await frResponse.json();

        // Langues à traduire (toutes sauf FR et celles déjà migrées)
        const languagesToTranslate = SUPPORTED_LANGUAGES.filter(
          lang => lang.code !== 'fr' && !existingLanguages.includes(lang.code)
        );

        const totalSteps = languagesToTranslate.length;

        for (let i = 0; i < languagesToTranslate.length; i++) {
          const lang = languagesToTranslate[i];
          
          try {
            setCurrentStep(`🌍 Traduction: ${lang.flag} ${lang.nativeName}...`);

            // Traduire via Claude
            const translateResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/translate`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sourceContent: frContent,
                  sourceLang: 'fr',
                  targetLang: lang.code,
                  targetLangName: lang.nativeName,
                }),
              }
            );

            if (!translateResponse.ok) {
              const errorData = await translateResponse.json();
              throw new Error(errorData.error || `HTTP ${translateResponse.status}`);
            }

            const { content: translatedContent } = await translateResponse.json();

            // Sauvegarder la traduction
            const saveResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${lang.code}`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  content: translatedContent,
                  translation_status: 'published',
                  translation_progress: 100,
                  translated_by: 'ai',
                }),
              }
            );

            if (!saveResponse.ok) {
              throw new Error('Erreur lors de la sauvegarde');
            }

            results.success.push(lang.code);
            console.log(`✅ ${lang.code.toUpperCase()} traduit et sauvegardé`);

          } catch (error: any) {
            console.error(`❌ Erreur traduction ${lang.code}:`, error);
            results.errors.push(`${lang.code}: ${error.message}`);
          }

          // Progression : 30% migration + 70% traduction
          const progress = 30 + Math.round(((i + 1) / totalSteps) * 70);
          setMigrationProgress(progress);
        }
      }

      setMigrationResults(results);
      setCurrentStep('✅ Terminé !');

      // Toast final
      if (results.errors.length === 0) {
        toast.success('🎉 Migration et traduction réussies !', {
          id: toastId,
          description: `${results.success.length} langue(s) disponible(s) dans Supabase`,
          duration: 5000,
        });
      } else {
        toast.warning('⚠️ Opération partiellement réussie', {
          id: toastId,
          description: `${results.success.length} réussies, ${results.errors.length} échouées`,
          duration: 7000,
        });
      }

    } catch (error: any) {
      console.error('❌ Migration error:', error);
      toast.error('❌ Erreur lors de la migration', {
        id: toastId,
        description: error.message,
        duration: 7000,
      });
    } finally {
      setIsMigrating(false);
      setCurrentStep('');
    }
  };

  const languagesCount = Object.keys(landingContent).length;
  const totalLanguages = SUPPORTED_LANGUAGES.length;
  const missingLanguages = totalLanguages - languagesCount;

  return (
    <Card className="border-2 border-gradient-to-r from-cyan-200 to-purple-200 shadow-2xl bg-gradient-to-br from-white to-cyan-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              Migration & Traduction automatique
            </CardTitle>
            <CardDescription>
              Migrez vers Supabase et traduisez automatiquement toutes les langues via Claude AI
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300">
              {languagesCount} existantes
            </Badge>
            {missingLanguages > 0 && autoTranslate && (
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300">
                <Sparkles className="w-3 h-3 mr-1" />
                +{missingLanguages} à traduire
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Options de migration */}
        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              id="autoTranslate"
              checked={autoTranslate}
              onChange={(e) => setAutoTranslate(e.target.checked)}
              disabled={isMigrating}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="autoTranslate" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-900">
                  Traduire automatiquement les {missingLanguages} langues manquantes
                </span>
              </div>
              <p className="text-xs text-purple-700">
                Utilise Claude AI pour traduire toute la landing page dans les langues non encore disponibles
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1 text-purple-600">
                  <Zap className="w-3 h-3" />
                  Temps: ~{Math.ceil(missingLanguages * 0.5)} min
                </span>
                <span className="flex items-center gap-1 text-purple-600">
                  💰 Coût: ~${(missingLanguages * 0.06).toFixed(2)}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Info sur les langues */}
        {autoTranslate && missingLanguages > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 mb-3">
                  <strong>Langues qui seront traduites automatiquement :</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUPPORTED_LANGUAGES
                    .filter(lang => lang.code !== 'fr' && !Object.keys(landingContent).includes(lang.code))
                    .map(lang => (
                      <Badge key={lang.code} variant="outline" className="bg-white/70 text-blue-800 border-blue-300">
                        {lang.flag} {lang.nativeName}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Languages detected */}
        <div>
          <p className="text-sm text-slate-600 mb-2">Langues détectées dans localStorage :</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(landingContent).map((lang) => {
              const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang);
              return (
                <Badge key={lang} variant="outline" className="bg-white border-green-300 text-green-700">
                  {langInfo?.flag} {lang.toUpperCase()}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Current step indicator */}
        {isMigrating && currentStep && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-300 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
              <span className="text-sm text-cyan-900">{currentStep}</span>
            </div>
          </motion.div>
        )}

        {/* Progress bar (si migration en cours) */}
        {isMigrating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Progression globale</span>
              <span className="text-cyan-600">{migrationProgress}%</span>
            </div>
            <Progress value={migrationProgress} className="h-3" />
          </motion.div>
        )}

        {/* Résultats de la migration */}
        {migrationResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {migrationResults.success.length > 0 && (
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-900">
                    🎉 {migrationResults.success.length} langue(s) disponible(s) dans Supabase
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {migrationResults.success.map((langCode) => {
                    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
                    return (
                      <Badge key={langCode} className="bg-green-100 text-green-700 border-green-400 text-xs">
                        {langInfo?.flag} {langCode.toUpperCase()}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {migrationResults.errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-900">
                    {migrationResults.errors.length} erreur(s)
                  </span>
                </div>
                <div className="space-y-1 text-xs text-red-700">
                  {migrationResults.errors.map((error, i) => (
                    <div key={i} className="font-mono">{error}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Bouton de migration */}
        <Button
          onClick={handleMigration}
          disabled={isMigrating || languagesCount === 0}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300"
          size="lg"
        >
          {isMigrating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {currentStep || 'Migration en cours...'} {migrationProgress}%
            </>
          ) : (
            <>
              {autoTranslate && missingLanguages > 0 ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Migrer + Traduire {totalLanguages} langues
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Migrer {languagesCount} langue(s)
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </>
          )}
        </Button>

        {/* Note finale */}
        {migrationResults && migrationResults.success.length > 0 && (
          <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-sm text-cyan-900">
            <p>
              ✅ Migration terminée ! Vous pouvez maintenant recharger la page pour utiliser les
              traductions depuis Supabase.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}