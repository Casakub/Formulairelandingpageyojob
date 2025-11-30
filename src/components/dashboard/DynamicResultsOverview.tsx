import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  MapPin,
  Building2,
  TrendingUp,
  Download,
  Sparkles,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  Zap,
  RefreshCw,
  Database,
  Info,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { ExportManager } from './ExportManager';
import { AIAnalysisPanel } from './AIAnalysisPanel';
import { getAllResponses, type MarketResearchResponse } from '../../lib/supabase';
import { useQuestions } from '../../context/QuestionsContext';
import { toast } from 'sonner@2.0.3';

/**
 * 🎯 COMPOSANT DYNAMIQUE RÉSULTATS
 * ================================
 * Ce composant s'adapte AUTOMATIQUEMENT aux questions définies dans QuestionsContext.
 * 
 * Fonctionnalités :
 * - ✅ Lecture dynamique des questions actives
 * - ✅ Génération automatique des colonnes
 * - ✅ Filtres adaptatifs selon les types de questions
 * - ✅ Statistiques calculées dynamiquement
 * - ✅ Export avec toutes les questions
 * - ✅ Analyse IA avec contexte dynamique
 */

export function DynamicResultsOverview() {
  const { questions } = useQuestions();
  const [responses, setResponses] = useState<MarketResearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Charger les réponses
  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    setIsLoading(true);
    try {
      const result = await getAllResponses();
      
      // getAllResponses retourne { success, data, error }
      if (result.success && result.data) {
        setResponses(Array.isArray(result.data) ? result.data : []);
        toast.success(`${result.data.length} réponses chargées depuis Supabase`);
      } else {
        console.warn('Aucune réponse trouvée:', result.error);
        setResponses([]);
        toast.info('Aucune réponse disponible', {
          description: 'Remplissez le formulaire pour créer votre première réponse'
        });
      }
    } catch (error) {
      console.error('Error loading responses:', error);
      setResponses([]);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Questions visibles uniquement
  const visibleQuestions = useMemo(() => {
    return questions.filter(q => q.visible !== false);
  }, [questions]);

  // Identifier les questions qui peuvent servir de filtres
  const filterableQuestions = useMemo(() => {
    return visibleQuestions.filter(q => 
      ['select', 'radio', 'country'].includes(q.type) && 
      q.options && 
      q.options.length > 0
    );
  }, [visibleQuestions]);

  // Appliquer les filtres
  const filteredResponses = useMemo(() => {
    if (Object.keys(filters).length === 0) return responses;

    return responses.filter(response => {
      return Object.entries(filters).every(([questionId, filterValue]) => {
        if (filterValue === 'all') return true;
        
        const question = visibleQuestions.find(q => q.id === questionId);
        if (!question) return true;

        // Récupérer la valeur de la réponse pour cette question
        const responseValue = (response as any)[questionId];
        
        return responseValue === filterValue;
      });
    });
  }, [responses, filters, visibleQuestions]);

  // Calculer les statistiques dynamiques
  const stats = useMemo(() => {
    const total = filteredResponses.length;
    if (total === 0) {
      return {
        total: 0,
        byQuestion: {}
      };
    }

    const byQuestion: Record<string, any> = {};

    visibleQuestions.forEach(question => {
      const values = filteredResponses
        .map(r => (r as any)[question.id])
        .filter(v => v !== null && v !== undefined && v !== '');

      if (question.type === 'select' || question.type === 'radio' || question.type === 'country') {
        // Distribution pour les questions à choix
        const distribution: Record<string, number> = {};
        values.forEach(v => {
          distribution[v] = (distribution[v] || 0) + 1;
        });
        byQuestion[question.id] = {
          type: 'distribution',
          data: distribution,
          total: values.length
        };
      } else if (question.type === 'number') {
        // Stats pour les questions numériques
        const numbers = values.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (numbers.length > 0) {
          const sum = numbers.reduce((a, b) => a + b, 0);
          const avg = sum / numbers.length;
          const min = Math.min(...numbers);
          const max = Math.max(...numbers);
          
          byQuestion[question.id] = {
            type: 'numeric',
            data: { sum, avg, min, max, count: numbers.length }
          };
        }
      } else if (question.type === 'multiselect' || question.type === 'checkbox') {
        // Distribution pour les multi-sélections
        const distribution: Record<string, number> = {};
        values.forEach(v => {
          const items = Array.isArray(v) ? v : v.split(',').map((s: string) => s.trim());
          items.forEach((item: string) => {
            if (item) {
              distribution[item] = (distribution[item] || 0) + 1;
            }
          });
        });
        byQuestion[question.id] = {
          type: 'distribution',
          data: distribution,
          total: values.length
        };
      } else if (question.type === 'scale') {
        // Stats pour les échelles
        const numbers = values.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (numbers.length > 0) {
          const sum = numbers.reduce((a, b) => a + b, 0);
          const avg = sum / numbers.length;
          
          byQuestion[question.id] = {
            type: 'scale',
            data: { avg, count: numbers.length }
          };
        }
      }
    });

    return {
      total,
      byQuestion
    };
  }, [filteredResponses, visibleQuestions]);

  // Gérer les filtres
  const handleFilterChange = (questionId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des réponses...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-slate-900 text-2xl">📊 Analyse des Résultats</h2>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 gap-1">
              <Database className="w-3 h-3" />
              Dynamique
            </Badge>
          </div>
          <p className="text-slate-600">
            Analyse automatique basée sur {visibleQuestions.length} questions actives
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            onClick={loadResponses}
            disabled={isLoading}
            variant="outline"
            className="border-slate-300 hover:bg-slate-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button
            onClick={() => setShowAIPanel(true)}
            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Analyser avec l'IA
          </Button>
          <Button
            onClick={() => setShowExportModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres Dynamiques */}
      {filterableQuestions.length > 0 && (
        <Card className="bg-white border-slate-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-slate-900">Filtres :</span>
              </div>

              {filterableQuestions.slice(0, 3).map(question => (
                <div key={question.id} className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{question.label}</span>
                  <Select 
                    value={filters[question.id] || 'all'} 
                    onValueChange={(value) => handleFilterChange(question.id, value)}
                  >
                    <SelectTrigger className="w-[180px] bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      {question.options?.map((option, idx) => {
                        // Gérer les options qui peuvent être string ou {value, label}
                        const optionValue = typeof option === 'string' ? option : option.value || String(option);
                        const optionLabel = typeof option === 'string' ? option : option.label || String(option);
                        return (
                          <SelectItem key={`${question.id}-${optionValue}-${idx}`} value={optionValue}>
                            {optionLabel}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="w-4 h-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-white/80" />
                <TrendingUp className="w-5 h-5 text-white/60" />
              </div>
              <div className="text-3xl mb-1">{stats.total}</div>
              <div className="text-white/80 text-sm">Réponses totales</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-white/80" />
              </div>
              <div className="text-3xl mb-1">{visibleQuestions.length}</div>
              <div className="text-white/80 text-sm">Questions actives</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-violet-500 to-purple-500 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Filter className="w-8 h-8 text-white/80" />
              </div>
              <div className="text-3xl mb-1">{filterableQuestions.length}</div>
              <div className="text-white/80 text-sm">Filtres disponibles</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Database className="w-8 h-8 text-white/80" />
              </div>
              <div className="text-3xl mb-1">
                {responses.length > 0 ? Math.round((stats.total / responses.length) * 100) : 0}%
              </div>
              <div className="text-white/80 text-sm">Réponses filtrées</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Graphiques de Distribution Dynamiques */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(stats.byQuestion)
          .filter(([_, stat]) => stat.type === 'distribution')
          .slice(0, 6)
          .map(([questionId, stat], index) => {
            const question = visibleQuestions.find(q => q.id === questionId);
            if (!question) return null;

            const entries = Object.entries(stat.data).sort((a, b) => b[1] - a[1]);

            return (
              <motion.div
                key={questionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white border-slate-200 shadow-md">
                  <CardHeader className="border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-cyan-600" />
                      <CardTitle className="text-slate-900">{question.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {entries.map(([value, count]) => {
                        const percentage = ((count / stat.total) * 100).toFixed(1);
                        return (
                          <div key={value} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-900">{value}</span>
                              <span className="text-slate-600">{count} ({percentage}%)</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </div>

      {/* Statistiques Numériques */}
      {Object.entries(stats.byQuestion).some(([_, stat]) => stat.type === 'numeric' || stat.type === 'scale') && (
        <div className="grid lg:grid-cols-3 gap-6">
          {Object.entries(stats.byQuestion)
            .filter(([_, stat]) => stat.type === 'numeric' || stat.type === 'scale')
            .map(([questionId, stat]) => {
              const question = visibleQuestions.find(q => q.id === questionId);
              if (!question) return null;

              return (
                <Card key={questionId} className="bg-white border-slate-200 shadow-md">
                  <CardHeader className="border-b border-slate-200">
                    <CardTitle className="text-slate-900 text-sm">{question.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {stat.type === 'numeric' && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Moyenne</span>
                          <span className="text-slate-900">{stat.data.avg.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Min</span>
                          <span className="text-slate-900">{stat.data.min}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 text-sm">Max</span>
                          <span className="text-slate-900">{stat.data.max}</span>
                        </div>
                      </div>
                    )}
                    {stat.type === 'scale' && (
                      <div className="text-center">
                        <div className="text-4xl text-slate-900 mb-1">{stat.data.avg.toFixed(1)}</div>
                        <div className="text-slate-600 text-sm">Score moyen</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}

      {/* Tableau des Réponses */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-900">Dernières Réponses</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 text-slate-600 text-sm">Date</th>
                  {visibleQuestions.slice(0, 5).map(question => (
                    <th key={question.id} className="text-left py-3 px-4 text-slate-600 text-sm">
                      {question.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredResponses.slice(0, 10).map((response, index) => (
                  <tr key={response.id || index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 text-sm">
                      {new Date(response.created_at || '').toLocaleDateString('fr-FR')}
                    </td>
                    {visibleQuestions.slice(0, 5).map(question => {
                      const value = (response as any)[question.id];
                      return (
                        <td key={question.id} className="py-3 px-4 text-slate-900 text-sm">
                          {Array.isArray(value) ? value.join(', ') : value || '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showExportModal && (
        <ExportManager 
          onClose={() => setShowExportModal(false)}
          responses={filteredResponses}
          questions={visibleQuestions}
        />
      )}

      {showAIPanel && (
        <AIAnalysisPanel 
          onClose={() => setShowAIPanel(false)}
          responses={filteredResponses}
          questions={visibleQuestions}
        />
      )}
    </motion.div>
  );
}