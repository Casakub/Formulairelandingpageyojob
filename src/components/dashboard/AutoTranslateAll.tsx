import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles, Loader2, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

interface AutoTranslateResult {
  success: boolean;
  message: string;
  stats?: {
    total: number;
    translated: number;
    errors: number;
  };
}

interface Props {
  totalTexts: number;
  completionRate: number;
  missingCount: number;
}

export function AutoTranslateAll({ totalTexts, completionRate, missingCount }: Props) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<AutoTranslateResult | null>(null);
  const [progress, setProgress] = useState(0);

  const targetLanguages = EUROPEAN_LANGUAGES.filter(lang => lang.code !== 'fr');

  const handleAutoTranslate = async () => {
    if (!confirm(`⚠️ Cette action va traduire ${missingCount} traductions manquantes dans ${targetLanguages.length} langues via Claude AI.\n\nCela peut prendre plusieurs minutes. Continuer ?`)) {
      return;
    }

    try {
      setIsTranslating(true);
      setResult(null);
      setProgress(0);

      toast.info('🤖 Auto-traduction en cours...', {
        description: `${missingCount} traductions à générer`
      });

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

      console.log('📊 Translations loaded:', {
        questions: questionTranslations.length,
        uiTexts: uiTextTranslations.length,
        total: allTexts.length
      });

      let translatedCount = 0;
      let errorCount = 0;

      // Process each text
      for (let i = 0; i < allTexts.length; i++) {
        const text = allTexts[i];
        const frenchText = text.translations?.fr?.text;

        if (!frenchText) {
          console.warn(`⚠️ No French text for ${text.textId}`);
          continue;
        }

        setProgress(Math.round(((i + 1) / allTexts.length) * 100));

        // Check which languages are missing
        const missingLanguages = targetLanguages.filter(lang => {
          const translation = text.translations?.[lang.code];
          return !translation || !translation.text;
        });

        if (missingLanguages.length === 0) {
          continue; // Already fully translated
        }

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
                autoStore: true // Automatically store translations
              })
            }
          );

          if (translateResponse.ok) {
            const result = await translateResponse.json();
            translatedCount += result.stats.successful;
            if (result.stats.failed > 0) {
              errorCount += result.stats.failed;
            }
            console.log(`✅ Translated ${text.textId}: ${result.stats.successful}/${result.stats.total} languages`);
          } else {
            errorCount++;
            const errorText = await translateResponse.text();
            console.error(`❌ Failed to translate ${text.textId}:`, errorText);
          }

          // Small delay between texts (the batch endpoint already has delays between languages)
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
          console.error(`❌ Error translating ${text.textId}:`, error);
          errorCount++;
        }
      }

      setResult({
        success: errorCount === 0,
        message: `✅ Auto-traduction terminée !`,
        stats: {
          total: missingCount,
          translated: translatedCount,
          errors: errorCount
        }
      });

      toast.success('🎉 Auto-traduction terminée !', {
        description: `${translatedCount} traductions générées • ${errorCount} erreurs`
      });

    } catch (error: any) {
      console.error('Error auto-translating:', error);
      toast.error('Erreur lors de l\'auto-traduction', {
        description: error.message
      });
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setIsTranslating(false);
      setProgress(0);
    }
  };

  if (completionRate >= 100) {
    return null; // Don't show if already complete
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="text-purple-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          ✨ Auto-Traduction Intelligence Artificielle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-800 mb-3">
            <strong>Claude AI peut traduire automatiquement toutes les traductions manquantes</strong>
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <p className="text-xs text-purple-600 mb-1">Traductions manquantes</p>
              <p className="text-2xl font-mono text-purple-900">{missingCount}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <p className="text-xs text-purple-600 mb-1">Langues cibles</p>
              <p className="text-2xl font-mono text-purple-900">{targetLanguages.length}</p>
            </div>
          </div>

          <Button
            onClick={handleAutoTranslate}
            disabled={isTranslating}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-700 hover:via-pink-700 hover:to-violet-700 text-white shadow-lg"
          >
            {isTranslating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Traduction en cours... {progress}%
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Auto-traduire tout avec Claude AI
              </>
            )}
          </Button>

          {isTranslating && (
            <div className="mt-3">
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-purple-700 mt-2 text-center">
                Traduction en cours... Veuillez patienter
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className={`rounded-lg p-4 border ${
            result.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium mb-2 ${
                  result.success ? 'text-green-900' : 'text-orange-900'
                }`}>
                  {result.message}
                </p>
                
                {result.stats && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/50 rounded px-2 py-1.5">
                      <p className="text-xs text-slate-600">Total</p>
                      <p className="text-sm font-mono text-slate-900">{result.stats.total}</p>
                    </div>
                    <div className="bg-white/50 rounded px-2 py-1.5">
                      <p className="text-xs text-slate-600">Traduites</p>
                      <p className="text-sm font-mono text-green-700">{result.stats.translated}</p>
                    </div>
                    <div className="bg-white/50 rounded px-2 py-1.5">
                      <p className="text-xs text-slate-600">Erreurs</p>
                      <p className="text-sm font-mono text-red-700">{result.stats.errors}</p>
                    </div>
                  </div>
                )}

                {result.success && (
                  <p className="text-xs text-green-800 mt-3">
                    ✅ Rechargez la page pour voir les nouvelles traductions !
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <Sparkles className="w-3 h-3 inline mr-1" />
            <strong>Comment ça marche :</strong> Claude AI traduit chaque texte français dans toutes les langues manquantes, en respectant le contexte et les nuances culturelles de chaque pays européen.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
