import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, CheckCircle, Loader2, AlertTriangle, Languages, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Props {
  onComplete?: () => void;
}

export function CompleteTranslationsSeeder({ onComplete }: Props) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSeed = async () => {
    if (!confirm('🚀 Cette action va créer les 18 textes manquants avec TOUTES les traductions (23 langues) déjà complétées.\n\nContinuer ?')) {
      return;
    }

    try {
      setIsSeeding(true);
      setResult(null);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-complete-translations`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Seeding failed: ${errorText}`);
      }

      const data = await response.json();
      setResult(data);

      if (data.success && onComplete) {
        onComplete();
      }
    } catch (error: any) {
      console.error('Error seeding complete translations:', error);
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3), transparent)',
            'radial-gradient(circle at 80% 50%, rgba(52, 211, 153, 0.3), transparent)',
            'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3), transparent)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                🎯 Seed Complet (18 textes × 23 langues)
              </CardTitle>
              <p className="text-sm text-emerald-700 mt-1">
                Injection instantanée des traductions complètes (sans API Claude)
              </p>
            </div>
          </div>

          <Badge variant="outline" className="bg-white/50 border-emerald-300 text-emerald-700">
            <Zap className="w-3 h-3 mr-1" />
            Rapide
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Description */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-emerald-200"
          >
            <p className="text-sm text-emerald-900 mb-3">
              <strong>Ce seed va créer :</strong>
            </p>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">•</span>
                <span><strong>18 textes</strong> manquants (section 6, confirmation, boutons)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">•</span>
                <span><strong>23 langues</strong> par texte (français + 22 langues européennes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">•</span>
                <span><strong>414 traductions</strong> au total (18 × 23)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">•</span>
                <span><strong>Traductions pré-faites</strong> - aucune API nécessaire !</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-700">
              <span className="flex items-center gap-1">
                <Languages className="w-3 h-3" />
                EN, DE, ES, IT, PL, RO, NL, PT, CS, HU, SV, BG, EL, SK, DA, FI, HR, LT, LV, SL, ET, NO
              </span>
            </div>
          </motion.div>
        )}

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              rounded-lg p-4 border-2
              ${result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
              }
            `}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm mb-2 ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                  <strong>{result.message || (result.success ? 'Seed terminé !' : 'Erreur lors du seed')}</strong>
                </p>
                
                {result.stats && (
                  <div className="space-y-1 text-xs text-green-700">
                    <div className="flex justify-between">
                      <span>Textes créés :</span>
                      <strong>{result.stats.textsCreated}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Textes ignorés (déjà existants) :</span>
                      <strong>{result.stats.textsSkipped}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Traductions ajoutées :</span>
                      <strong>{result.stats.translationsAdded}</strong>
                    </div>
                    {result.stats.errors > 0 && (
                      <div className="flex justify-between text-red-700">
                        <span>Erreurs :</span>
                        <strong>{result.stats.errors}</strong>
                      </div>
                    )}
                  </div>
                )}

                {result.error && (
                  <p className="text-xs text-red-700 mt-2">
                    {result.error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          whileHover={!isSeeding ? { scale: 1.02 } : {}}
          whileTap={!isSeeding ? { scale: 0.98 } : {}}
        >
          <Button
            onClick={handleSeed}
            disabled={isSeeding}
            className={`
              w-full relative overflow-hidden group rounded-lg py-6
              ${result?.success
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl transition-all
            `}
          >
            {/* Shimmer effect */}
            {!isSeeding && !result?.success && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}

            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSeeding ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Injection en cours...</span>
                </>
              ) : result?.success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Seed terminé avec succès !</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>🚀 Injecter les 414 traductions (~5 secondes)</span>
                </>
              )}
            </span>
          </Button>
        </motion.div>

        {/* Info Footer */}
        {!result && (
          <div className="text-xs text-emerald-600 bg-white/50 rounded-lg p-3 border border-emerald-200">
            <p className="flex items-center gap-2">
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span>
                <strong>Avantage :</strong> Aucune API Claude requise, injection instantanée, 100% fiable !
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
