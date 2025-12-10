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
  Briefcase,
  HardHat,
  Globe
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
import { toast } from 'sonner@2.0.3';

// Transform Supabase data to display format
interface DisplayResponse {
  id: string;
  timestamp: string;
  country: string;
  companyName: string;
  employees: number;
  sector: string;
  detachmentExperience: string;
  averageWorkers: number;
  mainCountries: string[];
  difficulties: string;
  interestedInPlatform: string;
  budget: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
}

function transformSupabaseData(responses: MarketResearchResponse[]): DisplayResponse[] {
  return responses.map(r => ({
    id: r.id || '',
    timestamp: r.created_at || new Date().toISOString(),
    country: r.country || 'Non spécifié',
    companyName: r.q1_nom || 'Non renseigné',
    employees: r.company_size || 0,
    sector: r.sector || 'Non spécifié',
    detachmentExperience: r.detachment_experience || 'Non',
    averageWorkers: parseInt(r.q6_volume?.match(/\d+/)?.[0] || '0'),
    mainCountries: r.q8_destinations?.split(',').map(c => c.trim()) || [],
    difficulties: r.q9_defi || 'Non renseigné',
    interestedInPlatform: r.interest_level || 'Non spécifié',
    budget: r.q21_budget_mensuel || 'Non renseigné',
    contact: {
      name: r.q1_nom || 'Non renseigné',
      email: r.email || 'Non renseigné',
      phone: undefined
    }
  }));
}

// Mock data for fallback / demo mode
const mockResponses: DisplayResponse[] = [
  {
    id: '1',
    timestamp: '2024-11-28T10:30:00Z',
    country: 'France',
    companyName: 'TempWork Paris',
    employees: 50,
    sector: 'BTP',
    detachmentExperience: 'Oui',
    averageWorkers: 15,
    mainCountries: ['Belgique', 'Allemagne'],
    difficulties: 'Conformité juridique, gestion des contrats',
    interestedInPlatform: 'Très intéressé',
    budget: '1000-5000€',
    contact: {
      name: 'Jean Dupont',
      email: 'jean@tempwork.fr',
      phone: '+33612345678'
    }
  },
  {
    id: '2',
    timestamp: '2024-11-28T11:15:00Z',
    country: 'Allemagne',
    companyName: 'Deutsche Zeitarbeit GmbH',
    employees: 120,
    sector: 'Industrie',
    detachmentExperience: 'Oui',
    averageWorkers: 35,
    mainCountries: ['Pologne', 'France', 'Pays-Bas'],
    difficulties: 'Barrière linguistique, coûts élevés',
    interestedInPlatform: 'Intéressé',
    budget: '5000-10000€',
    contact: {
      name: 'Hans Schmidt',
      email: 'h.schmidt@deutsche-zeit.de',
      phone: '+491234567890'
    }
  },
  {
    id: '3',
    timestamp: '2024-11-28T14:20:00Z',
    country: 'Espagne',
    companyName: 'Trabajo Temporal Madrid',
    employees: 75,
    sector: 'Hôtellerie',
    detachmentExperience: 'Non',
    averageWorkers: 0,
    mainCountries: [],
    difficulties: 'Pas encore fait, intéressé pour commencer',
    interestedInPlatform: 'Très intéressé',
    budget: '500-1000€',
    contact: {
      name: 'Maria Garcia',
      email: 'maria@trabajo-temp.es',
      phone: '+34612345678'
    }
  },
  {
    id: '4',
    timestamp: '2024-11-28T15:45:00Z',
    country: 'Belgique',
    companyName: 'Interim Solutions Bruxelles',
    employees: 90,
    sector: 'Tech',
    detachmentExperience: 'Oui',
    averageWorkers: 25,
    mainCountries: ['France', 'Pays-Bas', 'Luxembourg'],
    difficulties: 'Complexité administrative, délais longs',
    interestedInPlatform: 'Très intéressé',
    budget: '10000€+',
    contact: {
      name: 'Pierre Dubois',
      email: 'p.dubois@interim-solutions.be',
      phone: '+32498765432'
    }
  },
  {
    id: '5',
    timestamp: '2024-11-28T16:30:00Z',
    country: 'Italie',
    companyName: 'Lavoro Temporaneo Roma',
    employees: 60,
    sector: 'Agriculture',
    detachmentExperience: 'Oui',
    averageWorkers: 20,
    mainCountries: ['France', 'Espagne'],
    difficulties: 'Saisonnalité, réglementation changeante',
    interestedInPlatform: 'Intéressé',
    budget: '1000-5000€',
    contact: {
      name: 'Giuseppe Rossi',
      email: 'g.rossi@lavoro-temp.it',
      phone: '+39345678901'
    }
  }
];

export function ResultsOverview() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedProfile, setSelectedProfile] = useState<'all' | 'agency' | 'client' | 'worker'>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [responses, setResponses] = useState<DisplayResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const [forceDemoMode, setForceDemoMode] = useState(false);
  const [hasRealData, setHasRealData] = useState(false);

  // Fetch responses from Supabase on mount
  useEffect(() => {
    loadResponses();
  }, []);

  // Reload when forceDemoMode changes
  useEffect(() => {
    if (!isLoading) {
      loadResponses();
    }
  }, [forceDemoMode]);

  const loadResponses = async () => {
    setIsLoading(true);
    try {
      // If forceDemoMode is ON, use mock data directly
      if (forceDemoMode) {
        setResponses(mockResponses);
        setUseMockData(true);
        setIsLoading(false);
        toast.info('Mode démonstration activé', {
          description: 'Utilisation des données de démonstration'
        });
        return;
      }

      // Otherwise, try to fetch real data
      const result = await getAllResponses();
      
      if (result.success && result.data && result.data.length > 0) {
        // Transform Supabase data to display format
        const transformedData = transformSupabaseData(result.data);
        setResponses(transformedData);
        setUseMockData(false);
        setHasRealData(true);
        toast.success(`${transformedData.length} réponses chargées depuis Supabase`);
      } else {
        // Fallback to mock data if no real data yet
        console.log('ℹ️ Aucune donnée Supabase, utilisation des données mock');
        setResponses(mockResponses);
        setUseMockData(true);
        setHasRealData(false);
        toast.info('Mode démonstration (automatique)', {
          description: 'Aucune réponse réelle disponible'
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des réponses:', error);
      setResponses(mockResponses);
      setUseMockData(true);
      setHasRealData(false);
      toast.warning('Données de démonstration', {
        description: 'Impossible de charger les vraies données'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered responses
  const filteredResponses = useMemo(() => {
    return responses.filter(response => {
      const countryMatch = selectedCountry === 'all' || response.country === selectedCountry;
      const sectorMatch = selectedSector === 'all' || response.sector === selectedSector;
      return countryMatch && sectorMatch;
    });
  }, [responses, selectedCountry, selectedSector]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredResponses.length;
    const withExperience = filteredResponses.filter(r => r.detachmentExperience === 'Oui').length;
    const veryInterested = filteredResponses.filter(r => r.interestedInPlatform === 'Très intéressé').length;
    const avgEmployees = Math.round(filteredResponses.reduce((sum, r) => sum + r.employees, 0) / total);
    const avgWorkers = Math.round(filteredResponses.filter(r => r.averageWorkers > 0).reduce((sum, r) => sum + r.averageWorkers, 0) / withExperience);

    // Countries distribution
    const countriesCount = filteredResponses.reduce((acc, r) => {
      acc[r.country] = (acc[r.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sectors distribution
    const sectorsCount = filteredResponses.reduce((acc, r) => {
      acc[r.sector] = (acc[r.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Budget distribution
    const budgetCount = filteredResponses.reduce((acc, r) => {
      acc[r.budget] = (acc[r.budget] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      withExperience,
      veryInterested,
      avgEmployees,
      avgWorkers,
      experienceRate: ((withExperience / total) * 100).toFixed(1),
      interestRate: ((veryInterested / total) * 100).toFixed(1),
      countriesCount,
      sectorsCount,
      budgetCount
    };
  }, [filteredResponses]);

  const allCountries = Array.from(new Set(responses.map(r => r.country))).sort();
  const allSectors = Array.from(new Set(responses.map(r => r.sector))).sort();

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
            {useMockData ? (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                Mode Démo
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 gap-1">
                <Database className="w-3 h-3" />
                Données Réelles
              </Badge>
            )}
          </div>
          <p className="text-slate-600">
            {useMockData 
              ? 'Affichage des données de démonstration' 
              : 'Vue d\'ensemble de l\'étude de marché européen'
            }
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Demo Mode Toggle - Always visible */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col">
              <Label htmlFor="demo-mode" className="text-sm text-slate-700 cursor-pointer flex items-center gap-2">
                {forceDemoMode ? (
                  <>
                    <Database className="w-4 h-4 text-orange-500" />
                    Mode Démo
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 text-green-500" />
                    Données Réelles
                  </>
                )}
              </Label>
              <span className="text-xs text-slate-500 mt-0.5">
                {forceDemoMode 
                  ? `${mockResponses.length} réponses démo` 
                  : hasRealData 
                    ? `${responses.length} réponses réelles`
                    : '0 réponse réelle'
                }
              </span>
            </div>
            <Switch
              id="demo-mode"
              checked={forceDemoMode}
              onCheckedChange={(checked) => {
                setForceDemoMode(checked);
                toast.info(checked ? 'Passage en mode démonstration' : 'Passage en mode données réelles');
              }}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>

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

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-white border-slate-200 shadow-md">
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Chargement des réponses...</p>
          </CardContent>
        </Card>
      )}

      {/* Demo Mode Info Banner */}
      {!isLoading && forceDemoMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-orange-200 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Database className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-orange-900 mb-1">Mode Démonstration Activé</h3>
                  <p className="text-orange-700 text-sm mb-3">
                    Vous visualisez actuellement des données de démonstration pour tester les fonctionnalités. 
                    {hasRealData 
                      ? ' Désactivez le mode démo pour voir vos vraies données de réponses.'
                      : ' Remplissez le formulaire pour créer de vraies réponses.'
                    }
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {hasRealData ? (
                      <>
                        <Button
                          onClick={() => setForceDemoMode(false)}
                          size="sm"
                          variant="outline"
                          className="bg-white border-orange-300 text-orange-700 hover:bg-orange-50"
                        >
                          Voir les vraies données
                        </Button>
                        <span className="text-orange-600 text-sm">
                          {mockResponses.length} réponses de démo • {responses.length} réponses réelles disponibles
                        </span>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => window.location.href = '/'}
                          size="sm"
                          variant="outline"
                          className="bg-white border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                        >
                          Remplir le formulaire
                        </Button>
                        <span className="text-orange-600 text-sm">
                          {mockResponses.length} réponses de démonstration • 0 réponse réelle
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* No Real Data Info Banner */}
      {!isLoading && !forceDemoMode && !hasRealData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <Card className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-blue-200 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-blue-900 mb-1">Aucune Réponse Réelle Pour Le Moment</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Votre base de données est configurée mais ne contient aucune réponse pour l'instant. 
                    Activez le mode démonstration pour explorer les fonctionnalités, ou remplissez le formulaire pour créer votre première réponse.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      onClick={() => setForceDemoMode(true)}
                      size="sm"
                      variant="outline"
                      className="bg-white border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Activer le mode démo
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      size="sm"
                      variant="outline"
                      className="bg-white border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Remplir le formulaire
                    </Button>
                    <span className="text-blue-600 text-sm">
                      0 réponse réelle • {mockResponses.length} réponses de démo disponibles
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      {!isLoading && (
        <>
          <Card className="bg-white border-slate-200 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-900">Filtres :</span>
                </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les pays</SelectItem>
                  {allCountries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {allSectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedCountry !== 'all' || selectedSector !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedSector('all');
                }}
                className="text-slate-600 hover:text-slate-900"
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
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
                <div className="text-white/80 text-sm">Taux</div>
              </div>
              <div className="text-3xl mb-1">{stats.experienceRate}%</div>
              <div className="text-white/80 text-sm">Ont de l'expérience</div>
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
                <Zap className="w-8 h-8 text-white/80" />
                <div className="text-white/80 text-sm">Intérêt</div>
              </div>
              <div className="text-3xl mb-1">{stats.interestRate}%</div>
              <div className="text-white/80 text-sm">Très intéressés</div>
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
                <Building2 className="w-8 h-8 text-white/80" />
                <div className="text-white/80 text-sm">Moyenne</div>
              </div>
              <div className="text-3xl mb-1">{stats.avgEmployees}</div>
              <div className="text-white/80 text-sm">Employés/agence</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Distribution Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Countries Distribution */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              <CardTitle>Répartition par Pays</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {Object.entries(stats.countriesCount)
                .sort((a, b) => b[1] - a[1])
                .map(([country, count]) => {
                  const percentage = ((count / stats.total) * 100).toFixed(1);
                  return (
                    <div key={country} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-900">{country}</span>
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

        {/* Sectors Distribution */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-600" />
              <CardTitle>Répartition par Secteur</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {Object.entries(stats.sectorsCount)
                .sort((a, b) => b[1] - a[1])
                .map(([sector, count]) => {
                  const percentage = ((count / stats.total) * 100).toFixed(1);
                  return (
                    <div key={sector} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-900">{sector}</span>
                        <span className="text-slate-600">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-600" />
              <CardTitle>Répartition des Budgets</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {Object.entries(stats.budgetCount)
                .sort((a, b) => b[1] - a[1])
                .map(([budget, count]) => {
                  const percentage = ((count / stats.total) * 100).toFixed(1);
                  return (
                    <div key={budget} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-900">{budget}</span>
                        <span className="text-slate-600">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-md">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <CardTitle>Insights Clés</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-700 text-sm">
                  <strong>{stats.withExperience}</strong> agences sur {stats.total} ont déjà de l'expérience 
                  en détachement international
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-700 text-sm">
                  <strong>{stats.veryInterested}</strong> agences sont <strong>très intéressées</strong> par 
                  la plateforme YOJOB
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-700 text-sm">
                  Les agences avec expérience détachent en moyenne <strong>{stats.avgWorkers} travailleurs</strong> par an
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-700 text-sm">
                  Taille moyenne des agences : <strong>{stats.avgEmployees} employés</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Responses */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <CardTitle>Réponses Détaillées ({filteredResponses.length})</CardTitle>
            </div>
            <Badge variant="outline" className="bg-slate-100 text-slate-700">
              <Calendar className="w-3 h-3 mr-1" />
              Dernières 24h
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-slate-900 text-sm">Date</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Pays</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Agence</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Secteur</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Employés</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Expérience</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Intérêt</th>
                  <th className="text-left p-4 text-slate-900 text-sm">Budget</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.map((response, index) => (
                  <motion.tr
                    key={response.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-slate-700 text-sm">
                      {new Date(response.timestamp).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                        {response.country}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-900 text-sm">{response.companyName}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                        {response.sector}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-700 text-sm">{response.employees}</td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          response.detachmentExperience === 'Oui'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }
                      >
                        {response.detachmentExperience}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          response.interestedInPlatform === 'Très intéressé'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }
                      >
                        {response.interestedInPlatform}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-700 text-sm">{response.budget}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
        </>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportManager
          responses={filteredResponses}
          onClose={() => setShowExportModal(false)}
          isDemoMode={useMockData}
        />
      )}

      {/* AI Analysis Panel */}
      {showAIPanel && (
        <AIAnalysisPanel
          responses={filteredResponses}
          stats={stats}
          onClose={() => setShowAIPanel(false)}
          isDemoMode={useMockData}
        />
      )}
    </motion.div>
  );
}