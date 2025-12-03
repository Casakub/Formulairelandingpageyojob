import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, CheckCircle, Download, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SeedResult {
  success: boolean;
  message: string;
  stats: {
    added: number;
    skipped: number;
    errors: number;
    total: number;
  };
  details?: any[];
  nextSteps?: string[];
}

export function MissingTranslationsSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<SeedResult | null>(null);

  const handleSeedMissingTranslations = async () => {
    try {
      setIsSeeding(true);
      setSeedResult(null);
      
      toast.info('🌱 Ajout des textes UI manquants...', {
        description: '18 nouveaux textes (Section 6, Confirmation, etc.)'
      });

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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
      }

      const result: SeedResult = await response.json();
      setSeedResult(result);

      if (result.success) {
        toast.success('✅ Textes UI ajoutés avec succès !', {
          description: `${result.stats.added} nouveaux • ${result.stats.skipped} existants`
        });
      } else {
        toast.error('❌ Erreur lors du seeding');
      }

    } catch (error: any) {
      console.error('Error seeding translations:', error);
      toast.error('Erreur lors du seeding', {
        description: error.message
      });
      setSeedResult({
        success: false,
        message: error.message,
        stats: { added: 0, skipped: 0, errors: 1, total: 18 }
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          🔧 Seed : Textes UI manquants
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800 mb-3">
            <strong>Cette action va ajouter 18 textes UI manquants</strong> (en français uniquement) :
          </p>
          
          <ul className="text-xs text-blue-700 space-y-1 mb-4">
            <li>• <strong>Section 6 Contact</strong> : 5 textes (autorisations, RGPD)</li>
            <li>• <strong>Confirmation Toast</strong> : 2 textes</li>
            <li>• <strong>Confirmation Screen</strong> : 10 textes (récompenses, CTA)</li>
            <li>• <strong>Boutons</strong> : 1 texte (submitting)</li>
          </ul>

          {!seedResult && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-orange-800">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                <strong>Après le seed :</strong> Vous devrez traduire ces 18 textes dans les 22 langues (396 traductions à faire).
              </p>
            </div>
          )}

          <Button
            onClick={handleSeedMissingTranslations}
            disabled={isSeeding}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            {isSeeding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Ajout en cours...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Ajouter les 18 textes UI
              </>
            )}
          </Button>
        </div>

        {/* Results Display */}
        {seedResult && (
          <div className={`rounded-lg p-4 border ${
            seedResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              {seedResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium mb-2 ${
                  seedResult.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {seedResult.message}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/50 rounded px-3 py-2">
                    <p className="text-xs text-slate-600">Ajoutés</p>
                    <p className="text-lg font-mono text-green-700">{seedResult.stats.added}</p>
                  </div>
                  <div className="bg-white/50 rounded px-3 py-2">
                    <p className="text-xs text-slate-600">Déjà existants</p>
                    <p className="text-lg font-mono text-blue-700">{seedResult.stats.skipped}</p>
                  </div>
                </div>

                {seedResult.nextSteps && seedResult.nextSteps.length > 0 && (
                  <div className="bg-white/50 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-medium text-blue-900 mb-2">📋 Prochaines étapes :</p>
                    <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                      {seedResult.nextSteps.map((step, index) => (
                        <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress Info */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          <p className="text-xs text-cyan-800">
            💡 <strong>Astuce :</strong> Une fois les textes ajoutés, descendez un peu et utilisez le bouton <strong>"Auto-traduire tout avec Claude AI"</strong> pour traduire automatiquement les 396 traductions manquantes !
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
