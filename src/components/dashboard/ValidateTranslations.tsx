import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Loader2, FileSearch } from 'lucide-react';
import { fullClientWorkerTranslations, EUROPEAN_LANGUAGES } from '../../data/translations-client-worker-full';

interface ValidationResult {
  isValid: boolean;
  totalKeys: number;
  totalLanguages: number;
  totalTranslations: number;
  missingTranslations: Array<{
    textId: string;
    language: string;
  }>;
  emptyTranslations: Array<{
    textId: string;
    language: string;
  }>;
  stats: {
    commonQuestions: number;
    clientQuestions: number;
    workerQuestions: number;
    options: number;
  };
}

export function ValidateTranslations() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateTranslations = () => {
    setIsValidating(true);

    // Simuler un petit délai pour l'effet visuel
    setTimeout(() => {
      const result: ValidationResult = {
        isValid: true,
        totalKeys: 0,
        totalLanguages: EUROPEAN_LANGUAGES.length,
        totalTranslations: 0,
        missingTranslations: [],
        emptyTranslations: [],
        stats: {
          commonQuestions: 0,
          clientQuestions: 0,
          workerQuestions: 0,
          options: 0,
        },
      };

      // Parcourir toutes les traductions
      fullClientWorkerTranslations.translations.forEach((item) => {
        result.totalKeys++;

        // Compter par catégorie
        if (item.textId.includes('question.common')) {
          if (item.textId.includes('.label')) {
            result.stats.commonQuestions++;
          } else if (item.textId.includes('.option')) {
            result.stats.options++;
          }
        } else if (item.textId.includes('question.client')) {
          result.stats.clientQuestions++;
        } else if (item.textId.includes('question.worker')) {
          result.stats.workerQuestions++;
        }

        // Vérifier chaque langue
        EUROPEAN_LANGUAGES.forEach((lang) => {
          const translation = item.translations[lang];

          if (!translation) {
            result.missingTranslations.push({
              textId: item.textId,
              language: lang,
            });
            result.isValid = false;
          } else if (translation.trim() === '') {
            result.emptyTranslations.push({
              textId: item.textId,
              language: lang,
            });
            result.isValid = false;
          } else {
            result.totalTranslations++;
          }
        });
      });

      setValidationResult(result);
      setIsValidating(false);
    }, 800);
  };

  useEffect(() => {
    // Valider automatiquement au chargement
    validateTranslations();
  }, []);

  const getStatusColor = () => {
    if (!validationResult) return 'gray';
    if (validationResult.isValid) return 'green';
    return 'red';
  };

  const getStatusIcon = () => {
    if (!validationResult) return <Loader2 className="w-6 h-6 animate-spin text-gray-500" />;
    if (validationResult.isValid) return <CheckCircle className="w-6 h-6 text-green-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  const getStatusText = () => {
    if (!validationResult) return 'Validation en cours...';
    if (validationResult.isValid) return '✅ Toutes les traductions sont complètes';
    return '❌ Des traductions sont manquantes ou vides';
  };

  return (
    <Card className={`border-${getStatusColor()}-200 bg-gradient-to-br from-${getStatusColor()}-50 to-${getStatusColor()}-100/50`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="w-6 h-6 text-blue-600" />
              Validation des traductions CLIENT & WORKER
            </CardTitle>
            <CardDescription>
              Vérification automatique de la complétude des traductions dans 23 langues européennes
            </CardDescription>
          </div>
          {validationResult && (
            <Badge 
              className={
                validationResult.isValid
                  ? 'bg-green-500/20 text-green-700 border-green-400/30'
                  : 'bg-red-500/20 text-red-700 border-red-400/30'
              }
            >
              {validationResult.isValid ? 'Valide' : 'Incomplet'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statut principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-white rounded-lg border-2 border-dashed"
          style={{ 
            borderColor: validationResult?.isValid ? '#10B981' : validationResult ? '#EF4444' : '#9CA3AF' 
          }}
        >
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div className="flex-1">
              <div className={`${validationResult?.isValid ? 'text-green-700' : 'text-red-700'}`}>
                {getStatusText()}
              </div>
              {validationResult && (
                <div className="text-xs text-slate-600 mt-1">
                  {validationResult.totalTranslations} traductions vérifiées sur {validationResult.totalKeys} × {validationResult.totalLanguages} = {validationResult.totalKeys * validationResult.totalLanguages} attendues
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistiques détaillées */}
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl text-blue-600">{validationResult.stats.commonQuestions}</div>
                <div className="text-xs text-slate-600">Questions communes</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-cyan-200">
                <div className="text-2xl text-cyan-600">{validationResult.stats.clientQuestions}</div>
                <div className="text-xs text-slate-600">Questions CLIENT</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-violet-200">
                <div className="text-2xl text-violet-600">{validationResult.stats.workerQuestions}</div>
                <div className="text-xs text-slate-600">Questions WORKER</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl text-amber-600">{validationResult.stats.options}</div>
                <div className="text-xs text-slate-600">Options secteurs</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Détails des langues */}
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-white rounded-lg border border-slate-200"
          >
            <div className="text-sm text-slate-700 mb-3">
              📊 Couverture linguistique : {validationResult.totalLanguages} langues européennes
            </div>
            <div className="flex flex-wrap gap-2">
              {EUROPEAN_LANGUAGES.map((lang) => {
                const langMissing = validationResult.missingTranslations.filter(m => m.language === lang).length;
                const langEmpty = validationResult.emptyTranslations.filter(e => e.language === lang).length;
                const hasIssues = langMissing > 0 || langEmpty > 0;

                return (
                  <Badge
                    key={lang}
                    variant="outline"
                    className={
                      hasIssues
                        ? 'border-red-300 text-red-700 bg-red-50'
                        : 'border-green-300 text-green-700 bg-green-50'
                    }
                  >
                    {lang.toUpperCase()}
                    {hasIssues && (
                      <span className="ml-1 text-xs">({langMissing + langEmpty})</span>
                    )}
                  </Badge>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Traductions manquantes */}
        {validationResult && validationResult.missingTranslations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <XCircle className="w-5 h-5" />
              <span>Traductions manquantes : {validationResult.missingTranslations.length}</span>
            </div>
            <details className="text-xs text-red-600">
              <summary className="cursor-pointer">Voir le détail</summary>
              <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                {validationResult.missingTranslations.slice(0, 20).map((item, i) => (
                  <li key={i} className="font-mono">
                    • {item.textId} - {item.language.toUpperCase()}
                  </li>
                ))}
                {validationResult.missingTranslations.length > 20 && (
                  <li className="text-slate-500">... et {validationResult.missingTranslations.length - 20} autres</li>
                )}
              </ul>
            </details>
          </motion.div>
        )}

        {/* Traductions vides */}
        {validationResult && validationResult.emptyTranslations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-amber-50 rounded-lg border border-amber-200"
          >
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Traductions vides : {validationResult.emptyTranslations.length}</span>
            </div>
            <details className="text-xs text-amber-600">
              <summary className="cursor-pointer">Voir le détail</summary>
              <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                {validationResult.emptyTranslations.slice(0, 20).map((item, i) => (
                  <li key={i} className="font-mono">
                    • {item.textId} - {item.language.toUpperCase()}
                  </li>
                ))}
                {validationResult.emptyTranslations.length > 20 && (
                  <li className="text-slate-500">... et {validationResult.emptyTranslations.length - 20} autres</li>
                )}
              </ul>
            </details>
          </motion.div>
        )}

        {/* Résumé de validation */}
        {validationResult && validationResult.isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span>Validation réussie - Prêt pour l&apos;import</span>
            </div>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{validationResult.totalKeys} clés de traduction validées</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{validationResult.totalLanguages} langues européennes complètes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{validationResult.totalTranslations} traductions professionnelles vérifiées</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>
                  {validationResult.stats.commonQuestions} questions communes + {validationResult.stats.clientQuestions} CLIENT + {validationResult.stats.workerQuestions} WORKER + {validationResult.stats.options} options
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bouton de re-validation */}
        <Button
          onClick={validateTranslations}
          disabled={isValidating}
          variant="outline"
          className="w-full"
        >
          {isValidating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Validation en cours...
            </>
          ) : (
            <>
              <FileSearch className="w-4 h-4 mr-2" />
              Re-valider les traductions
            </>
          )}
        </Button>

        {/* Info */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
          <strong>💡 Note :</strong> Cette validation vérifie que toutes les questions CLIENT et WORKER ont des traductions complètes dans les 27 langues européennes avant l&apos;importation dans la base de données.
        </div>
      </CardContent>
    </Card>
  );
}