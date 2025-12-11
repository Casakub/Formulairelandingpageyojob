import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, CheckCircle, AlertTriangle, Zap, Globe, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { getQuestionsByProfile } from '../../config/survey-questions';

interface SeedProgress {
  current: number;
  total: number;
  currentQuestion: string;
  currentLanguage: string;
  status: 'idle' | 'translating' | 'saving' | 'complete' | 'error';
}

interface SeedResult {
  totalQuestions: number;
  totalTranslations: number;
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
  duration: number;
}

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
];

interface Props {
  onComplete?: () => void;
}

export function SmartSeedTranslations({ onComplete }: Props) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState<SeedProgress>({
    current: 0,
    total: 0,
    currentQuestion: '',
    currentLanguage: '',
    status: 'idle'
  });
  const [result, setResult] = useState<SeedResult | null>(null);

  const handleSeed = async () => {
    const agencyQuestions = getQuestionsByProfile('agency');
    const clientQuestions = getQuestionsByProfile('client');
    const workerQuestions = getQuestionsByProfile('worker');
    
    const allQuestions = [
      ...agencyQuestions.map(q => ({ ...q, profile: 'agency' })),
      ...clientQuestions.map(q => ({ ...q, profile: 'client' })),
      ...workerQuestions.map(q => ({ ...q, profile: 'worker' }))
    ];

    // Déduplication par ID
    const uniqueQuestions = Array.from(
      new Map(allQuestions.map(q => [q.id, q])).values()
    );

    const totalTranslations = uniqueQuestions.length * LANGUAGES.length;

    const confirmMessage = `🤖 GÉNÉRATION INTELLIGENTE DES TRADUCTIONS

Cette action va utiliser Claude AI pour créer automatiquement TOUTES les traductions manquantes dans les 22 langues européennes.

📊 Questions à traduire :
• ${agencyQuestions.length} questions AGENCY
• ${clientQuestions.length} questions CLIENT
• ${workerQuestions.length} questions WORKER
• ${uniqueQuestions.length} questions uniques

🌍 Langues cibles : ${LANGUAGES.length} langues
${LANGUAGES.slice(0, 10).map(l => `${l.flag} ${l.code.toUpperCase()}`).join(' • ')}
... et ${LANGUAGES.length - 10} autres

🎯 Total à générer : ~${totalTranslations} traductions

⚡ Fonctionnement :
• Traduction intelligente via Claude AI
• Respect du contexte (agences ETT, recrutement)
• Traduction des labels, placeholders et options
• Sauvegarde automatique dans la base

⏱️ Temps estimé : 2-3 minutes

Voulez-vous continuer ?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    const startTime = Date.now();

    try {
      setIsSeeding(true);
      setProgress({
        current: 0,
        total: uniqueQuestions.length,
        currentQuestion: '',
        currentLanguage: '',
        status: 'translating'
      });

      toast.info('🤖 Démarrage de la traduction IA...', {
        description: `${uniqueQuestions.length} questions × ${LANGUAGES.length} langues`
      });

      // Appeler l'API de seed intelligent
      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63`;
      
      const response = await fetch(`${API_BASE}/seed/smart-translations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          questions: uniqueQuestions,
          languages: LANGUAGES.map(l => l.code),
          mode: 'create-missing' // Ne créer que les traductions manquantes
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const seedResult = await response.json();

      const duration = Math.round((Date.now() - startTime) / 1000);

      setResult({
        ...seedResult,
        duration
      });

      setProgress({
        current: uniqueQuestions.length,
        total: uniqueQuestions.length,
        currentQuestion: '',
        currentLanguage: '',
        status: 'complete'
      });

      toast.success('✅ Traductions générées avec succès !', {
        description: `${seedResult.created} créées, ${seedResult.updated} mises à jour en ${duration}s`
      });

      if (onComplete) {
        onComplete();
      }

    } catch (error: any) {
      console.error('❌ [SmartSeed] Error:', error);
      
      setProgress(prev => ({ ...prev, status: 'error' }));
      
      toast.error('❌ Erreur lors de la génération', {
        description: error.message
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const progressPercentage = progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  return (
    <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          🤖 Génération Intelligente des Traductions
        </CardTitle>
        <CardDescription>
          Utilise Claude AI pour créer automatiquement toutes les traductions manquantes dans 22 langues
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/60 rounded-lg border border-violet-200">
            <div className="text-2xl text-violet-600">
              {getQuestionsByProfile('agency').length + getQuestionsByProfile('client').length + getQuestionsByProfile('worker').length}
            </div>
            <div className="text-xs text-slate-600">Questions totales</div>
          </div>
          <div className="p-3 bg-white/60 rounded-lg border border-pink-200">
            <div className="text-2xl text-pink-600">{LANGUAGES.length}</div>
            <div className="text-xs text-slate-600">Langues cibles</div>
          </div>
        </div>

        {/* Langues supportées */}
        <div className="p-4 bg-white/60 rounded-lg border border-violet-200">
          <div className="text-sm text-slate-700 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Langues supportées :
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <Badge
                key={lang.code}
                variant="outline"
                className="border-violet-300 text-violet-700 bg-violet-50 text-xs"
              >
                {lang.flag} {lang.code.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress */}
        {isSeeding && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 bg-white/80 rounded-lg border border-violet-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Progression</span>
                <span className="text-sm text-violet-600">
                  {progress.current} / {progress.total}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="mt-2 text-xs text-slate-600">
                {progress.status === 'translating' && (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Traduction en cours avec Claude AI...
                  </span>
                )}
                {progress.status === 'saving' && (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Sauvegarde dans la base de données...
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 rounded-lg border-2 border-green-200"
          >
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span>✅ Traductions générées avec succès !</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Créées :</span>
                <span className="text-green-700">{result.created}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Mises à jour :</span>
                <span className="text-blue-700">{result.updated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Ignorées :</span>
                <span className="text-slate-500">{result.skipped}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Durée :</span>
                <span className="text-violet-700">{result.duration}s</span>
              </div>
            </div>
            {result.errors.length > 0 && (
              <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-200">
                <div className="text-xs text-amber-700">
                  ⚠️ {result.errors.length} erreur(s) détectée(s)
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Features */}
        <div className="p-3 bg-white/40 rounded-lg border border-violet-200 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-violet-700">
            <Zap className="w-3 h-3" />
            <span>Traduction intelligente contextuelle</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-violet-700">
            <Languages className="w-3 h-3" />
            <span>22 langues européennes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-violet-700">
            <CheckCircle className="w-3 h-3" />
            <span>Labels + placeholders + options</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-violet-700">
            <Sparkles className="w-3 h-3" />
            <span>Powered by Claude AI</span>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={handleSeed}
          disabled={isSeeding}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
          size="lg"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Génération en cours... {progressPercentage}%
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              🚀 Lancer la génération IA
            </>
          )}
        </Button>

        {/* Warning */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
          <strong>💡 Note importante :</strong>
          <ul className="ml-4 mt-1 space-y-1">
            <li>• Les traductions existantes ne seront PAS écrasées</li>
            <li>• Seules les traductions manquantes seront créées</li>
            <li>• Claude AI traduit en respectant le contexte métier</li>
            <li>• Vous pourrez toujours modifier les traductions manuellement après</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}