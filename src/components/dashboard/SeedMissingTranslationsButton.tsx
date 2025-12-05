import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Loader2, Sparkles, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SeedResult {
  success: boolean;
  message?: string;
  stats?: {
    added: number;
    skipped: number;
    errors: number;
    total: number;
  };
  details?: any[];
  nextSteps?: string[];
  error?: string;
}

export function SeedMissingTranslationsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-missing-translations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
        toast.success(`✅ ${data.stats.added} nouveaux textes ajoutés !`, {
          description: `Section 6 (5) + Toast (2) + Confirmation (10) + Bouton (1) = ${data.stats.total} textes`,
          duration: 6000
        });
      } else {
        setResult(data);
        toast.error('❌ Erreur lors du seeding', {
          description: data.error || 'Erreur inconnue'
        });
      }
    } catch (error: any) {
      console.error('Seed error:', error);
      toast.error('❌ Erreur de connexion', {
        description: error.message
      });
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Card */}
      <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-slate-900 font-semibold mb-1">
                  Ajouter les Traductions Manquantes
                </h3>
                <p className="text-sm text-slate-600">
                  Ajoute automatiquement <strong>18 textes UI</strong> en français (Section 6, Toast, Confirmation & Bouton)
                </p>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-slate-600">5 textes Section 6</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-slate-600">2 textes Toast</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-600">10 textes Confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-600">1 texte Bouton</span>
                </div>
              </div>

              {/* Button */}
              <Button
                onClick={handleSeed}
                disabled={isSeeding}
                className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ajouter les 18 textes FR
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={`border-2 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${result.success ? 'bg-green-500' : 'bg-red-500'}`}>
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h4 className={`font-semibold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                      {result.success ? '✅ Seeding Réussi !' : '❌ Erreur'}
                    </h4>

                    {result.success && result.stats && (
                      <>
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-3">
                          <div className="p-3 rounded-lg bg-white border border-green-200">
                            <div className="text-2xl font-bold text-green-600">{result.stats.added}</div>
                            <div className="text-xs text-slate-600">Ajoutés</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-amber-200">
                            <div className="text-2xl font-bold text-amber-600">{result.stats.skipped}</div>
                            <div className="text-xs text-slate-600">Existants</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-red-200">
                            <div className="text-2xl font-bold text-red-600">{result.stats.errors}</div>
                            <div className="text-xs text-slate-600">Erreurs</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{result.stats.total}</div>
                            <div className="text-xs text-slate-600">Total</div>
                          </div>
                        </div>

                        {/* Next Steps */}
                        {result.nextSteps && result.nextSteps.length > 0 && (
                          <div className="p-4 rounded-lg bg-white border border-green-200">
                            <h5 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-green-500" />
                              Prochaines Étapes
                            </h5>
                            <ul className="text-sm text-slate-600 space-y-1">
                              {result.nextSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {!result.success && result.error && (
                      <div className="p-3 rounded-lg bg-white border border-red-200">
                        <p className="text-sm text-red-700">{result.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
