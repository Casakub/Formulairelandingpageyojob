import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Star, CheckCircle, Calendar, Globe, Target, Award, Languages, Eye, Rocket, Database, Activity, Clock, MapPin, Building2, Zap, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScoreDistributionChart } from './ScoreDistributionChart';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { fetchI18nStats } from '../../lib/i18n-api';
import { LanguagePreview } from './LanguagePreview';
import { getAllResponses, type MarketResearchResponse } from '../../lib/supabase';
import { getIntegrationsStats } from '../../lib/integrations';
import { toast } from 'sonner@2.0.3';
import { AutoUploadTranslations } from './AutoUploadTranslations';
import { UploadHeroTranslations } from './UploadHeroTranslations';
import { UploadProgressTranslations } from './UploadProgressTranslations';

export function DashboardOverview() {
  const [showLanguagePreview, setShowLanguagePreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [responses, setResponses] = useState<MarketResearchResponse[]>([]);
  const [integrationStats, setIntegrationStats] = useState<any>(null);
  
  const [i18nStats, setI18nStats] = useState<{
    questions: { total: number; validated: number; progress: number };
    ui: { total: number; validated: number; progress: number };
    countries: number;
  } | null>(null);

  // Charger toutes les données
  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      // Charger les réponses
      const responsesResult = await getAllResponses();
      // getAllResponses retourne { success, data, error }
      if (responsesResult.success && responsesResult.data) {
        setResponses(Array.isArray(responsesResult.data) ? responsesResult.data : []);
      } else {
        setResponses([]);
      }

      // Charger les stats i18n
      const i18n = await fetchI18nStats();
      setI18nStats(i18n);

      // Charger les stats des intégrations
      const integrations = await getIntegrationsStats();
      setIntegrationStats(integrations);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Erreur lors du chargement des données');
      // En cas d'erreur, s'assurer que responses est un tableau vide
      setResponses([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
    toast.success('Données actualisées');
  }

  // Calculs des statistiques en temps réel
  const totalResponses = responses.length;
  const totalTarget = 27000;
  const progressPercentage = Math.round((totalResponses / totalTarget) * 100 * 10) / 10;

  // Calculer le taux de complétion moyen (basé sur les champs remplis)
  const calculateCompletionRate = (response: MarketResearchResponse) => {
    const totalFields = 26; // 26 questions au total
    const filledFields = Object.values(response).filter(val => val !== null && val !== '' && val !== undefined).length;
    return (filledFields / totalFields) * 100;
  };
  const averageCompletion = responses.length > 0
    ? Math.round(responses.reduce((sum, r) => sum + calculateCompletionRate(r), 0) / responses.length)
    : 0;

  // Calculer le score moyen (basé sur interest_level)
  const calculateScore = (interestLevel: string | null) => {
    const scoreMap: Record<string, number> = {
      'Très intéressé': 10,
      'Intéressé': 7,
      'Peut-être': 5,
      'Pas intéressé': 2
    };
    return scoreMap[interestLevel || ''] || 5;
  };
  const averageScore = responses.length > 0
    ? (responses.reduce((sum, r) => sum + calculateScore(r.interest_level), 0) / responses.length).toFixed(1)
    : '0.0';

  // Compter les "Prêts pour MVP" (Très intéressé + Intéressé)
  const readyForMVP = responses.filter(r => 
    r.interest_level === 'Très intéressé' || r.interest_level === 'Intéressé'
  ).length;
  const readyPercentage = responses.length > 0
    ? Math.round((readyForMVP / responses.length) * 100)
    : 0;

  // Réponses aujourd'hui
  const today = new Date().toISOString().split('T')[0];
  const responsesToday = responses.filter(r => 
    r.created_at?.startsWith(today)
  ).length;

  // Dernière réponse
  const lastResponse = responses.length > 0 
    ? responses.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())[0]
    : null;
  
  const getTimeAgo = (date: string | null) => {
    if (!date) return 'Jamais';
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  // Top pays
  const countryCount: Record<string, number> = {};
  responses.forEach(r => {
    const country = r.country || 'Non spécifié';
    countryCount[country] = (countryCount[country] || 0) + 1;
  });
  const topCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, count]) => ({
      country,
      count,
      percentage: Math.round((count / totalResponses) * 100)
    }));

  // Top secteurs
  const sectorCount: Record<string, number> = {};
  responses.forEach(r => {
    const sector = r.sector || 'Non spécifié';
    sectorCount[sector] = (sectorCount[sector] || 0) + 1;
  });
  const topSectors = Object.entries(sectorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([sector, count]) => ({
      sector,
      count,
      percentage: Math.round((count / totalResponses) * 100)
    }));

  const stats = [
    {
      label: 'Réponses totales',
      value: totalResponses.toLocaleString('fr-FR'),
      subtitle: `/${totalTarget.toLocaleString('fr-FR')}`,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      progress: progressPercentage
    },
    {
      label: 'Taux de complétion',
      value: `${averageCompletion}%`,
      subtitle: 'Objectif: 70%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      progress: averageCompletion
    },
    {
      label: 'Score moyen',
      value: averageScore,
      subtitle: '/10',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      progress: parseFloat(averageScore) * 10
    },
    {
      label: 'Prêts pour MVP',
      value: readyForMVP.toLocaleString('fr-FR'),
      subtitle: `${readyPercentage}% des répondants`,
      icon: Rocket,
      color: 'from-violet-500 to-purple-500',
      progress: readyPercentage
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header avec bouton refresh */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-1">Vue d'ensemble</h1>
          <p className="text-slate-600 text-sm">
            Dernière mise à jour: {lastResponse ? getTimeAgo(lastResponse.created_at) : 'Aucune donnée'}
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                  <div className="text-cyan-600 text-xs">{stat.subtitle}</div>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stat.progress, 100)}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Secteurs */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-600" />
              Réponses par secteur
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topSectors.length > 0 ? (
              <div className="space-y-4">
                {topSectors.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-700">{item.sector}</span>
                      <span className="text-cyan-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-violet-600" />
              Réponses par pays
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCountries.length > 0 ? (
              <div className="space-y-4">
                {topCountries.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-slate-700 text-sm">{item.country}</span>
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                        />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-slate-900">{item.count}</div>
                      <div className="text-slate-500 text-xs">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Score Distribution - New Component */}
      <ScoreDistributionChart />

      {/* Quick Stats */}
      <div className="mt-8 grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 text-cyan-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">+{responsesToday}</div>
            <div className="text-slate-600 text-sm">Réponses aujourd'hui</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Globe className="w-8 h-8 text-violet-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">{topCountries.length}</div>
            <div className="text-slate-600 text-sm">Pays représentés</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Database className="w-8 h-8 text-green-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">{integrationStats?.activeIntegrations || 0}</div>
            <div className="text-slate-600 text-sm">Intégrations actives</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-orange-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">{integrationStats?.successRate?.toFixed(0) || 0}%</div>
            <div className="text-slate-600 text-sm">Taux de succès intégrations</div>
          </CardContent>
        </Card>
      </div>

      {/* Dernières réponses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Dernières réponses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {responses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-slate-600 text-sm">Date</th>
                      <th className="text-left py-3 px-4 text-slate-600 text-sm">Agence</th>
                      <th className="text-left py-3 px-4 text-slate-600 text-sm">Pays</th>
                      <th className="text-left py-3 px-4 text-slate-600 text-sm">Secteur</th>
                      <th className="text-left py-3 px-4 text-slate-600 text-sm">Intérêt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses
                      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
                      .slice(0, 10)
                      .map((response, index) => (
                        <tr key={response.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-slate-600 text-sm">
                            {getTimeAgo(response.created_at)}
                          </td>
                          <td className="py-3 px-4 text-slate-900 text-sm">
                            {response.q1_nom || 'Non renseigné'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 text-sm">
                            {response.country || 'Non spécifié'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 text-sm">
                            {response.sector || 'Non spécifié'}
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                response.interest_level === 'Très intéressé' 
                                  ? 'bg-green-100 text-green-700'
                                  : response.interest_level === 'Intéressé'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-700'
                              }
                            >
                              {response.interest_level || 'Non spécifié'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Aucune réponse disponible</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* I18n Stats Widget */}
      {i18nStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-violet-50 border-blue-200 shadow-lg">
            <CardHeader className="border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Traductions multilingues</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">8 langues • {i18nStats.countries} pays configurés</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowLanguagePreview(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Prévisualiser
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Questions Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Questions du formulaire</span>
                    <Badge className="bg-blue-100 text-blue-700">
                      {i18nStats.questions.validated}/{i18nStats.questions.total}
                    </Badge>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${i18nStats.questions.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    {i18nStats.questions.progress}% complété
                  </div>
                </div>

                {/* UI Texts Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Textes d'interface</span>
                    <Badge className="bg-violet-100 text-violet-700">
                      {i18nStats.ui.validated}/{i18nStats.ui.total}
                    </Badge>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${i18nStats.ui.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    {i18nStats.ui.progress}% complété
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Language Preview Modal */}
      {showLanguagePreview && (
        <LanguagePreview onClose={() => setShowLanguagePreview(false)} />
      )}

      {/* Upload Translations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h2 className="text-slate-900 mb-4">Gestion des traductions</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
          <UploadHeroTranslations />
          <UploadProgressTranslations />
          <AutoUploadTranslations />
        </div>
      </motion.div>
    </motion.div>
  );
}