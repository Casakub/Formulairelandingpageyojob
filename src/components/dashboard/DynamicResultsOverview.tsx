import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  MapPin,
  Building2,
  TrendingUp,
  Download,
  Sparkles,
  Filter,
  BarChart3,
  FileText,
  RefreshCw,
  Database,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Globe,
  Factory,
  AlertTriangle,
  Lightbulb,
  Target,
  Award,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  TrendingDown,
  Zap,
  Briefcase,
  HardHat,
  PieChart as PieChartIcon
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
import { Input } from '../ui/input';
import { ExportManager } from './ExportManager';
import { AIAnalysisPanel } from './AIAnalysisPanel';
import { getAllResponses, type MarketResearchResponse } from '../../lib/supabase';
import { useQuestions } from '../../context/QuestionsContext';
import { toast } from 'sonner@2.0.3';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

/**
 * 🎯 COMPOSANT DYNAMIQUE RÉSULTATS - VERSION PREMIUM
 * ================================================
 * Refonte complète avec design professionnel pour études de marché
 */

// Couleurs du design system YOJOB
const COLORS = {
  blue: '#1E3A8A',
  cyan: '#06B6D4',
  violet: '#7C3AED',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  slate: '#64748B'
};

const CHART_COLORS = [
  '#06B6D4', // Cyan
  '#7C3AED', // Violet
  '#10B981', // Green
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#1E3A8A', // Blue
  '#EC4899', // Pink
  '#8B5CF6'  // Purple
];

export function DynamicResultsOverview() {
  const { questions } = useQuestions();
  const [responses, setResponses] = useState<MarketResearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedProfile, setSelectedProfile] = useState<string>('all'); // Nouveau filtre profil

  // Charger les réponses
  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    setIsLoading(true);
    try {
      const result = await getAllResponses();
      
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

  // Questions filtrables
  const filterableQuestions = useMemo(() => {
    return visibleQuestions.filter(q => 
      ['select', 'radio', 'country'].includes(q.type) && 
      q.options && 
      q.options.length > 0
    );
  }, [visibleQuestions]);

  // Appliquer filtres + recherche + PROFIL
  const filteredResponses = useMemo(() => {
    let result = responses;

    // ✅ NOUVEAU : Filtre par profil
    if (selectedProfile !== 'all') {
      result = result.filter(response => response.respondent_type === selectedProfile);
    }

    // Filtres
    if (Object.keys(filters).length > 0) {
      result = result.filter(response => {
        return Object.entries(filters).every(([questionId, filterValue]) => {
          if (filterValue === 'all') return true;
          const responseValue = (response as any)[questionId];
          return responseValue === filterValue;
        });
      });
    }

    // Recherche
    if (searchTerm) {
      result = result.filter(response => {
        const searchLower = searchTerm.toLowerCase();
        return Object.values(response).some(value => 
          String(value).toLowerCase().includes(searchLower)
        );
      });
    }

    return result;
  }, [responses, filters, searchTerm, selectedProfile]);

  // Calculer statistiques dynamiques
  const stats = useMemo(() => {
    const total = filteredResponses.length;
    if (total === 0) {
      return {
        total: 0,
        byQuestion: {},
        topCountries: [],
        topSectors: []
      };
    }

    const byQuestion: Record<string, any> = {};

    visibleQuestions.forEach(question => {
      const values = filteredResponses
        .map(r => (r as any)[question.id])
        .filter(v => v !== null && v !== undefined && v !== '');

      if (question.type === 'select' || question.type === 'radio' || question.type === 'country') {
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
        const distribution: Record<string, number> = {};
        values.forEach(v => {
          // Gestion robuste des différents types de valeurs
          let items: string[] = [];
          if (Array.isArray(v)) {
            items = v;
          } else if (typeof v === 'string') {
            items = v.split(',').map((s: string) => s.trim());
          } else if (v && typeof v === 'object') {
            // Si c'est un objet, essayer de le convertir en array
            items = Object.values(v).filter(Boolean).map(String);
          } else if (v) {
            // Dernier recours : convertir en string
            items = [String(v)];
          }
          
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

    // Top pays
    const countryQuestion = visibleQuestions.find(q => q.type === 'country');
    const topCountries = countryQuestion && byQuestion[countryQuestion.id]
      ? Object.entries(byQuestion[countryQuestion.id].data)
          .sort((a, b) => (b[1] as number) - (a[1] as number))
          .slice(0, 3)
          .map(([country, count]) => ({ country, count: count as number }))
      : [];

    // Top secteurs (si question secteur existe)
    const sectorQuestion = visibleQuestions.find(q => 
      q.id.includes('secteur') || q.label.toLowerCase().includes('secteur')
    );
    const topSectors = sectorQuestion && byQuestion[sectorQuestion.id]
      ? Object.entries(byQuestion[sectorQuestion.id].data)
          .sort((a, b) => (b[1] as number) - (a[1] as number))
          .slice(0, 3)
          .map(([sector, count]) => ({ sector, count: count as number }))
      : [];

    return {
      total,
      byQuestion,
      topCountries,
      topSectors
    };
  }, [filteredResponses, visibleQuestions]);

  // Générer insights automatiques
  const insights = useMemo(() => {
    if (filteredResponses.length === 0) return [];

    const result = [];

    // Insight 1: Tendance principale (pays dominant)
    if (stats.topCountries.length > 0) {
      const topCountry = stats.topCountries[0];
      const percentage = Math.round((topCountry.count / stats.total) * 100);
      result.push({
        type: 'trend',
        icon: TrendingUp,
        color: COLORS.cyan,
        title: 'Tendance géographique',
        message: `${topCountry.country} représente ${percentage}% des réponses (${topCountry.count} agences)`
      });
    }

    // Insight 2: Opportunité (secteur le plus actif)
    if (stats.topSectors.length > 0) {
      const topSector = stats.topSectors[0];
      result.push({
        type: 'opportunity',
        icon: Zap,
        color: COLORS.green,
        title: 'Opportunité sectorielle',
        message: `Le secteur "${topSector.sector}" montre le plus d'intérêt avec ${topSector.count} réponses`
      });
    }

    // Insight 3: Alerte (taux de réponse)
    const totalPossible = responses.length;
    const responseRate = Math.round((stats.total / totalPossible) * 100);
    if (responseRate < 50) {
      result.push({
        type: 'alert',
        icon: AlertTriangle,
        color: COLORS.orange,
        title: 'Point d\'attention',
        message: `Taux de réponse de ${responseRate}% - Envisagez une relance pour plus de données`
      });
    }

    // Insight 4: Recommandation (score moyen si existe)
    const scoreQuestion = visibleQuestions.find(q => q.type === 'scale');
    if (scoreQuestion && stats.byQuestion[scoreQuestion.id]) {
      const avgScore = stats.byQuestion[scoreQuestion.id].data.avg;
      result.push({
        type: 'recommendation',
        icon: Lightbulb,
        color: COLORS.violet,
        title: 'Recommandation',
        message: `Score moyen de ${avgScore.toFixed(1)}/10 - ${avgScore >= 7 ? 'Excellent potentiel de conversion' : 'Améliorez votre proposition de valeur'}`
      });
    }

    return result;
  }, [stats, filteredResponses, responses, visibleQuestions]);

  // Gestion des filtres
  const handleFilterChange = (questionId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all') || searchTerm !== '';
  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all').length + (searchTerm ? 1 : 0);

  // Toggle expansion d'une card
  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des résultats...</p>
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
      {/* ========== 1. HEADER ========== */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-slate-900">📊 Analyse des Résultats</h2>
            <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-300 gap-1">
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
            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Analyser avec l'IA
          </Button>
          <Button
            onClick={() => setShowExportModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* ========== 2. CARDS PRINCIPALES (CONSERVÉES) ========== */}
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

      {/* ========== 3. FILTRES AVANCÉS ========== */}
      {filterableQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header filtres */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                      <Filter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Filtres avancés</h3>
                      <p className="text-slate-600 text-sm">
                        Affinez votre analyse avec les filtres disponibles
                      </p>
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Réinitialiser ({activeFiltersCount})
                    </Button>
                  )}
                </div>

                {/* Barre de recherche */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans les réponses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                {/* Filtres par question */}
                <div className="grid md:grid-cols-3 gap-4">
                  {filterableQuestions.slice(0, 6).map(question => (
                    <div key={question.id} className="space-y-2">
                      <label className="text-sm text-slate-700">{question.label}</label>
                      <Select 
                        value={filters[question.id] || 'all'} 
                        onValueChange={(value) => handleFilterChange(question.id, value)}
                      >
                        <SelectTrigger className="bg-white border-slate-200 hover:border-cyan-400 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                              Tous
                            </span>
                          </SelectItem>
                          {question.options?.map((option, idx) => {
                            const optionValue = typeof option === 'string' ? option : option.value || String(option);
                            const optionLabel = typeof option === 'string' ? option : option.label || String(option);
                            return (
                              <SelectItem key={`${question.id}-${optionValue}-${idx}`} value={optionValue}>
                                <span className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                  {optionLabel}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ========== 4. VUE D'ENSEMBLE GÉOGRAPHIQUE ========== */}
      {(stats.topCountries.length > 0 || stats.topSectors.length > 0) && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Pays */}
          {stats.topCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-900">Top 3 Pays</CardTitle>
                      <p className="text-slate-600 text-sm">Répartition géographique des réponses</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats.topCountries.map((item, index) => {
                      const percentage = Math.round((item.count / stats.total) * 100);
                      const colors = [COLORS.cyan, COLORS.blue, COLORS.violet];
                      return (
                        <motion.div
                          key={item.country}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                                style={{ backgroundColor: colors[index] }}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <div className="text-slate-900">{item.country}</div>
                                <div className="text-slate-600 text-sm">{item.count} réponses</div>
                              </div>
                            </div>
                            <div className="text-2xl" style={{ color: colors[index] }}>
                              {percentage}%
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: colors[index] }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Top Secteurs */}
          {stats.topSectors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-900">Top 3 Secteurs</CardTitle>
                      <p className="text-slate-600 text-sm">Secteurs les plus représentés</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats.topSectors.map((item, index) => {
                      const percentage = Math.round((item.count / stats.total) * 100);
                      const colors = [COLORS.green, COLORS.orange, COLORS.violet];
                      return (
                        <motion.div
                          key={item.sector}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                                style={{ backgroundColor: colors[index] }}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <div className="text-slate-900">{item.sector}</div>
                                <div className="text-slate-600 text-sm">{item.count} réponses</div>
                              </div>
                            </div>
                            <div className="text-2xl" style={{ color: colors[index] }}>
                              {percentage}%
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: colors[index] }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* ========== 5. INSIGHTS AUTOMATIQUES ========== */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 shadow-lg">
            <CardHeader className="border-b border-violet-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">Insights Automatiques</CardTitle>
                  <p className="text-slate-600 text-sm">Analyse intelligente de vos données</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="bg-white rounded-xl p-4 border-2 border-transparent hover:border-violet-300 transition-all cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                          style={{ backgroundColor: insight.color + '20' }}
                        >
                          <Icon className="w-5 h-5" style={{ color: insight.color }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-slate-900 text-sm mb-1">{insight.title}</h4>
                          <p className="text-slate-600 text-xs leading-relaxed">{insight.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ========== 6. GRAPHIQUES PROFESSIONNELS ========== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(stats.byQuestion)
          .filter(([_, stat]) => stat.type === 'distribution')
          .slice(0, 4)
          .map(([questionId, stat], index) => {
            const question = visibleQuestions.find(q => q.id === questionId);
            if (!question) return null;

            const chartData = Object.entries(stat.data)
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .slice(0, 8)
              .map(([name, value], i) => ({
                name,
                value: value as number,
                percentage: Math.round(((value as number) / stat.total) * 100),
                fill: CHART_COLORS[i % CHART_COLORS.length]
              }));

            // Alterner entre PieChart et BarChart
            const useBar = index % 2 === 1;

            return (
              <motion.div
                key={questionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                        {useBar ? (
                          <BarChart3 className="w-4 h-4 text-white" />
                        ) : (
                          <Target className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-slate-900 text-sm">{question.label}</CardTitle>
                        <p className="text-slate-600 text-xs">{stat.total} réponses</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {useBar ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                          />
                          <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-3">
                                    <p className="text-slate-900 mb-1">{data.name}</p>
                                    <p className="text-cyan-600">
                                      <strong>{data.value}</strong> réponses ({data.percentage}%)
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percentage }) => `${percentage}%`}
                            outerRadius={100}
                            innerRadius={60}
                            dataKey="value"
                            animationDuration={1000}
                          >
                            {chartData.map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-3">
                                    <p className="text-slate-900 mb-1">{data.name}</p>
                                    <p className="text-cyan-600">
                                      <strong>{data.value}</strong> réponses ({data.percentage}%)
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}

                    {/* Légende personnalisée */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                      {chartData.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          />
                          <span className="text-slate-700 text-xs truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </div>

      {/* ========== 7. STATISTIQUES NUMÉRIQUES ========== */}
      {Object.entries(stats.byQuestion).some(([_, stat]) => stat.type === 'numeric' || stat.type === 'scale') && (
        <div className="grid lg:grid-cols-3 gap-6">
          {Object.entries(stats.byQuestion)
            .filter(([_, stat]) => stat.type === 'numeric' || stat.type === 'scale')
            .map(([questionId, stat], index) => {
              const question = visibleQuestions.find(q => q.id === questionId);
              if (!question) return null;

              return (
                <motion.div
                  key={questionId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-lg hover:shadow-xl transition-all">
                    <CardHeader className="border-b border-slate-200 bg-white/50">
                      <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-orange-500" />
                        {question.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {stat.type === 'numeric' && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                            <span className="text-slate-600 text-sm">Moyenne</span>
                            <span className="text-slate-900 text-xl">{stat.data.avg.toFixed(2)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <span className="text-slate-600 text-xs block mb-1">Min</span>
                              <span className="text-slate-900">{stat.data.min}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <span className="text-slate-600 text-xs block mb-1">Max</span>
                              <span className="text-slate-900">{stat.data.max}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {stat.type === 'scale' && (
                        <div className="text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="#E2E8F0"
                                strokeWidth="12"
                                fill="none"
                              />
                              <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="url(#gradient-scale)"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${(stat.data.avg / 10) * 351.86} 351.86`}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient id="gradient-scale" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={COLORS.cyan} />
                                  <stop offset="100%" stopColor={COLORS.violet} />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl text-slate-900">{stat.data.avg.toFixed(1)}</div>
                                <div className="text-slate-600 text-xs">/ 10</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-slate-600 text-sm">{stat.data.count} réponses</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      )}

      {/* ========== 8. RÉPONSES EN CARDS GRID ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">Réponses détaillées</CardTitle>
                  <p className="text-slate-600 text-sm">
                    {filteredResponses.length} réponse{filteredResponses.length > 1 ? 's' : ''} trouvée{filteredResponses.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {filteredResponses.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Aucune réponse ne correspond à vos critères</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResponses.slice(0, 12).map((response, index) => {
                  const isExpanded = expandedCards.has(response.id || String(index));
                  const displayQuestions = isExpanded 
                    ? visibleQuestions 
                    : visibleQuestions.slice(0, 3);

                  return (
                    <motion.div
                      key={response.id || index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                      {/* Badge date */}
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(response.created_at || '').toLocaleDateString('fr-FR')}
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          #{index + 1}
                        </Badge>
                      </div>

                      {/* Contenu */}
                      <div className="p-4 space-y-3">
                        {displayQuestions.map(question => {
                          const value = (response as any)[question.id];
                          if (!value) return null;

                          return (
                            <div key={question.id} className="bg-white rounded-lg p-3 shadow-sm">
                              <div className="text-slate-600 text-xs mb-1">{question.label}</div>
                              <div className="text-slate-900 text-sm">
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </div>
                            </div>
                          );
                        })}

                        {/* Bouton expand/collapse */}
                        {visibleQuestions.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCard(response.id || String(index))}
                            className="w-full text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-1" />
                                Voir moins
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-1" />
                                Voir tout ({visibleQuestions.length - 3} de plus)
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination info */}
            {filteredResponses.length > 12 && (
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-600 text-sm mb-3">
                  Affichage de 12 sur {filteredResponses.length} réponses
                </p>
                <Button
                  variant="outline"
                  className="border-cyan-300 text-cyan-600 hover:bg-cyan-50"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Charger plus de réponses
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ========== MODALS ========== */}
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