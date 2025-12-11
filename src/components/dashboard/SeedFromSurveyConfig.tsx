import { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Loader2, CheckCircle, AlertTriangle, Database, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner';
import { useQuestions } from '../../context/QuestionsContext';

interface Props {
  onComplete?: () => void;
}

interface SeedReport {
  totalQuestions: number;
  totalTranslations: number;
  created: number;
  updated: number;
  errors: number;
  details: {
    agency: number;
    client: number;
    worker: number;
  };
}

export function SeedFromSurveyConfig({ onComplete }: Props) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [report, setReport] = useState<SeedReport | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Get questions from context
  const { questions } = useQuestions();
  
  // Filter by profile
  const agencyQuestions = questions.filter(q => q.visibleFor?.includes('agency'));
  const clientQuestions = questions.filter(q => q.visibleFor?.includes('client'));
  const workerQuestions = questions.filter(q => q.visibleFor?.includes('worker'));

  const totalQuestionsInConfig = questions.length;
  const estimatedTranslations = totalQuestionsInConfig * 3; // FR + EN + DE

  const handleSeed = async () => {
    const confirmMessage = `🌱 SEED AUTOMATIQUE DEPUIS CONFIGURATION

Cette action va créer automatiquement TOUTES les traductions FR/EN/DE pour TOUTES les questions définies dans survey-questions-COMPLETE.ts

📊 Questions détectées :
• ${agencyQuestions.length} questions AGENCY
• ${clientQuestions.length} questions CLIENT  
• ${workerQuestions.length} questions WORKER
• ${totalQuestionsInConfig} questions TOTAL

🎯 Traductions à créer :
• ~${estimatedTranslations} traductions (${totalQuestionsInConfig} × 3 langues)

⚙️ Fonctionnement :
• Détection automatique de TOUTES les questions
• Extraction des labels/placeholders/descriptions
• Création des traductions FR/EN/DE
• Format unifié i18n:question:*

⏱️ Temps estimé : 10-15 secondes

Voulez-vous continuer ?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setIsSeeding(true);
      setReport(null);

      toast.info('🤖 Détection des questions...', {
        description: `${totalQuestionsInConfig} questions trouvées`
      });

      // Préparer les données de seed
      const seedData = prepareSeedData();

      console.log(`🌱 [SeedFromConfig] Seed data prepared:`, {
        totalItems: seedData.length,
        sample: seedData.slice(0, 3)
      });

      // Appeler la route de seed
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-from-survey-config`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ seedData })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ [SeedFromConfig] Seed complete:', result);

      setReport(result);

      toast.success('✅ Seed terminé avec succès !', {
        description: `${result.created} créées, ${result.updated} mises à jour`
      });

      if (onComplete) {
        setTimeout(onComplete, 1000);
      }

    } catch (error: any) {
      console.error('❌ [SeedFromConfig] Error:', error);
      toast.error('Erreur lors du seed', {
        description: error.message
      });
    } finally {
      setIsSeeding(false);
    }
  };

  // Préparer les données de seed à partir de la configuration
  const prepareSeedData = () => {
    const seedData: any[] = [];

    questions.forEach(question => {
      // Question principale
      seedData.push({
        key: `i18n:question:${question.code}`,
        value: {
          translations: {
            fr: {
              label: question.label || '',
              placeholder: question.placeholder || '',
              status: 'validated'
            },
            en: {
              label: translateToEnglish(question.label || ''),
              placeholder: question.placeholder ? translateToEnglish(question.placeholder) : '',
              status: 'auto-generated'
            },
            de: {
              label: translateToGerman(question.label || ''),
              placeholder: question.placeholder ? translateToGerman(question.placeholder) : '',
              status: 'auto-generated'
            }
          }
        }
      });

      // Options si présentes
      if (question.options && question.options.length > 0) {
        question.options.forEach(option => {
          seedData.push({
            key: `i18n:question:${question.code}.options.${option.value}`,
            value: {
              translations: {
                fr: {
                  label: option.label,
                  status: 'validated'
                },
                en: {
                  label: translateToEnglish(option.label),
                  status: 'auto-generated'
                },
                de: {
                  label: translateToGerman(option.label),
                  status: 'auto-generated'
                }
              }
            }
          });
        });
      }
    });

    return seedData;
  };

  // Traductions simplifiées (mock pour l'instant)
  const translateToEnglish = (text: string): string => {
    // TODO: Utiliser l'API de traduction automatique
    // Pour l'instant, on retourne le texte français avec un marqueur
    return `[EN] ${text}`;
  };

  const translateToGerman = (text: string): string => {
    // TODO: Utiliser l'API de traduction automatique
    // Pour l'instant, on retourne le texte français avec un marqueur
    return `[DE] ${text}`;
  };

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="text-green-900 flex items-center gap-2">
          <Database className="w-5 h-5" />
          🌱 Seed automatique depuis configuration
        </CardTitle>
        <p className="text-sm text-green-700">
          Crée automatiquement TOUTES les traductions FR/EN/DE à partir de survey-questions-COMPLETE.ts
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistiques de détection */}
        <div className="bg-white/60 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Questions AGENCY</span>
            <Badge variant="outline" className="bg-blue-100 border-blue-300 text-blue-700">
              {agencyQuestions.length}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Questions CLIENT</span>
            <Badge variant="outline" className="bg-purple-100 border-purple-300 text-purple-700">
              {clientQuestions.length}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Questions WORKER</span>
            <Badge variant="outline" className="bg-orange-100 border-orange-300 text-orange-700">
              {workerQuestions.length}
            </Badge>
          </div>
          <div className="border-t pt-2 flex items-center justify-between">
            <span className="text-sm text-slate-900">Total détecté</span>
            <Badge className="bg-green-600 text-white">
              {totalQuestionsInConfig} questions
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Traductions à créer</span>
            <span className="text-slate-900">~{estimatedTranslations}</span>
          </div>
        </div>

        {/* Avantages */}
        <div className="bg-white/40 rounded-lg p-3 space-y-1.5">
          <p className="text-xs text-green-800">✅ Détection automatique</p>
          <p className="text-xs text-green-800">✅ Toutes les questions incluses</p>
          <p className="text-xs text-green-800">✅ Format unifié i18n:question:*</p>
          <p className="text-xs text-green-800">✅ FR validé + EN/DE auto-générés</p>
        </div>

        {/* Button */}
        <Button
          onClick={handleSeed}
          disabled={isSeeding}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
          size="lg"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Seed en cours...
            </>
          ) : (
            <>
              <Sprout className="w-5 h-5 mr-2" />
              Lancer le seed automatique
            </>
          )}
        </Button>

        {/* Report */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 border-2 border-green-200 space-y-3"
          >
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Seed terminé avec succès !</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 rounded p-2">
                <p className="text-2xl text-green-700">{report.created}</p>
                <p className="text-xs text-green-600">Créées</p>
              </div>
              <div className="bg-blue-50 rounded p-2">
                <p className="text-2xl text-blue-700">{report.updated}</p>
                <p className="text-xs text-blue-600">Mises à jour</p>
              </div>
              <div className="bg-slate-50 rounded p-2">
                <p className="text-2xl text-slate-700">{report.totalTranslations}</p>
                <p className="text-xs text-slate-600">Total</p>
              </div>
            </div>

            {report.errors > 0 && (
              <div className="flex items-center gap-2 text-orange-700 bg-orange-50 rounded p-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{report.errors} erreurs détectées</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full"
            >
              {showDetails ? 'Masquer' : 'Voir'} les détails
            </Button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 text-sm"
              >
                <div className="bg-blue-50 rounded p-2">
                  <p className="text-blue-700">🏢 AGENCY : {report.details.agency} traductions</p>
                </div>
                <div className="bg-purple-50 rounded p-2">
                  <p className="text-purple-700">🏭 CLIENT : {report.details.client} traductions</p>
                </div>
                <div className="bg-orange-50 rounded p-2">
                  <p className="text-orange-700">👷 WORKER : {report.details.worker} traductions</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            💡 <strong>Note :</strong> Ce seed détecte automatiquement toutes les questions dans survey-questions-COMPLETE.ts et crée leurs traductions FR/EN/DE. Les traductions EN et DE sont marquées "auto-generated" et peuvent être validées manuellement après.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}