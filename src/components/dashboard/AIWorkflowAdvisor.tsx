import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Zap,
  Download,
  ChevronRight,
  Brain,
  Target
} from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface WorkflowSuggestion {
  name: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  trigger: {
    type: string;
    description: string;
  };
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
    explanation: string;
  }>;
  steps: Array<{
    type: string;
    delay_minutes: number;
    description: string;
    config: any;
  }>;
  expected_results: string;
  implementation_notes: string;
}

interface AISuggestionResponse {
  success: boolean;
  analysis: string;
  suggestions: WorkflowSuggestion[];
  totalSuggestions: number;
  context?: any;
}

interface AIWorkflowAdvisorProps {
  open: boolean;
  onClose: () => void;
  onImplement: (suggestion: WorkflowSuggestion) => void;
}

const PRIORITY_CONFIG = {
  high: { bg: '#fee2e2', text: '#b91c1c', label: 'Haute', icon: Zap },
  medium: { bg: '#fef3c7', text: '#b45309', label: 'Moyenne', icon: Target },
  low: { bg: '#dbeafe', text: '#1d4ed8', label: 'Basse', icon: Lightbulb },
};

export function AIWorkflowAdvisor({ open, onClose, onImplement }: AIWorkflowAdvisorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<WorkflowSuggestion[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const requestSuggestions = async () => {
    setIsAnalyzing(true);
    setError(null);
    setSuggestions([]);
    setAnalysis('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/workflow-ai-advisor/suggest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data: AISuggestionResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la génération des suggestions');
      }

      setSuggestions(data.suggestions);
      setAnalysis(data.analysis);
      
      console.log('✨ IA Suggestions:', data);
    } catch (err: any) {
      console.error('Error requesting AI suggestions:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImplementSuggestion = async (suggestion: WorkflowSuggestion, index: number) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/workflow-ai-advisor/implement/${index}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ suggestion }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de l\'implémentation');
      }

      onImplement(suggestion);
      onClose();
    } catch (err: any) {
      console.error('Error implementing suggestion:', err);
      alert(err.message || 'Erreur lors de l\'implémentation');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header avec gradient */}
        <div className="relative bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 p-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-2">
                🤖 Conseiller IA Workflows
              </h2>
              <p className="text-white/90 text-sm">
                L'intelligence artificielle analyse votre logiciel et vous suggère des workflows parfaitement adaptés à votre contexte
              </p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-8">
          {!suggestions.length && !isAnalyzing && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl mb-6">
                <Sparkles className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">
                Prêt à découvrir de nouveaux workflows ?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Notre IA va analyser vos prospects, workflows existants, statistiques de conversion, 
                et vous suggérer 3 workflows optimisés pour augmenter vos performances.
              </p>
              
              <Button
                onClick={requestSuggestions}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Analyser et suggérer des workflows
              </Button>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Analyse de vos données</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Brain className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">IA Claude 3.5 Sonnet</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Target className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Suggestions personnalisées</p>
                </div>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">
                Analyse en cours...
              </h3>
              <p className="text-gray-600">
                L'IA analyse vos prospects, workflows et statistiques pour générer des suggestions personnalisées
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-red-900 mb-1">Erreur</h3>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                  <Button
                    onClick={requestSuggestions}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Réessayer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Analyse générale */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-purple-900 mb-2">Analyse de votre contexte</h3>
                      <p className="text-purple-800 text-sm leading-relaxed">{analysis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => {
                  const priorityConfig = PRIORITY_CONFIG[suggestion.priority];
                  const isExpanded = expandedIndex === index;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all overflow-hidden">
                        <CardContent className="p-0">
                          {/* Header */}
                          <div
                            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg text-gray-900">
                                    {suggestion.name}
                                  </h3>
                                  <Badge
                                    style={{
                                      backgroundColor: priorityConfig.bg,
                                      color: priorityConfig.text,
                                    }}
                                    className="flex items-center gap-1"
                                  >
                                    <priorityConfig.icon className="w-3 h-3" />
                                    {priorityConfig.label}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{suggestion.impact}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Zap className="w-3.5 h-3.5" />
                                  <span>Trigger: {suggestion.trigger.description}</span>
                                  <span className="mx-2">•</span>
                                  <span>{suggestion.steps.length} étape(s)</span>
                                </div>
                              </div>
                              <ChevronRight
                                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Détails (expandable) */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-gray-200"
                              >
                                <div className="p-6 space-y-4 bg-gray-50">
                                  {/* Conditions */}
                                  {suggestion.conditions && suggestion.conditions.length > 0 && (
                                    <div>
                                      <h4 className="text-sm text-gray-700 mb-2">
                                        Conditions :
                                      </h4>
                                      <div className="space-y-2">
                                        {suggestion.conditions.map((cond, i) => (
                                          <div
                                            key={i}
                                            className="p-3 bg-white rounded-lg border border-gray-200 text-sm"
                                          >
                                            <code className="text-purple-600">
                                              {cond.field} {cond.operator} "{cond.value}"
                                            </code>
                                            <p className="text-gray-600 text-xs mt-1">
                                              → {cond.explanation}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Étapes */}
                                  <div>
                                    <h4 className="text-sm text-gray-700 mb-2">
                                      Étapes du workflow :
                                    </h4>
                                    <div className="space-y-2">
                                      {suggestion.steps.map((step, i) => (
                                        <div
                                          key={i}
                                          className="p-3 bg-white rounded-lg border border-gray-200"
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-xs">
                                              {i + 1}
                                            </span>
                                            <span className="text-sm text-gray-900">
                                              {step.type.replace(/_/g, ' ')}
                                            </span>
                                            {step.delay_minutes > 0 && (
                                              <Badge className="bg-gray-100 text-gray-700 text-xs">
                                                +{step.delay_minutes}min
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-xs text-gray-600 ml-8">
                                            {step.description}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Résultats attendus */}
                                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                      <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <h4 className="text-sm text-green-900 mb-1">
                                          Résultats attendus
                                        </h4>
                                        <p className="text-sm text-green-700">
                                          {suggestion.expected_results}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Notes d'implémentation */}
                                  {suggestion.implementation_notes && (
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                      <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                          <h4 className="text-sm text-blue-900 mb-1">
                                            Notes d'implémentation
                                          </h4>
                                          <p className="text-sm text-blue-700">
                                            {suggestion.implementation_notes}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Bouton implémenter */}
                                  <div className="pt-2">
                                    <Button
                                      onClick={() => handleImplementSuggestion(suggestion, index)}
                                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl"
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      Implémenter ce workflow
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bouton pour générer de nouvelles suggestions */}
              <div className="text-center pt-4">
                <Button
                  onClick={requestSuggestions}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Générer de nouvelles suggestions
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
