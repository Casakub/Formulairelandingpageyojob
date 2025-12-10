/**
 * 💡 PROFILE INSIGHTS
 * 
 * Génère des insights automatiques et des recommandations
 * selon le type de profil et les données collectées
 */

import { motion } from 'motion/react';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { MarketResearchResponse } from '../../lib/supabase';

interface ProfileInsightsProps {
  responses: MarketResearchResponse[];
  profileType: 'all' | 'agency' | 'client' | 'worker';
}

interface Insight {
  type: 'success' | 'warning' | 'info' | 'opportunity';
  title: string;
  description: string;
  metric?: string;
}

export function ProfileInsights({ responses, profileType }: ProfileInsightsProps) {
  const insights: Insight[] = [];

  // ========== INSIGHTS GLOBAUX ==========
  if (profileType === 'all') {
    const totalResponses = responses.length;
    const agencyCount = responses.filter(r => r.respondent_type === 'agency').length;
    const clientCount = responses.filter(r => r.respondent_type === 'client').length;
    const workerCount = responses.filter(r => r.respondent_type === 'worker').length;

    // Insight répartition
    const dominant = Math.max(agencyCount, clientCount, workerCount);
    let dominantType = '';
    if (dominant === agencyCount) dominantType = 'agences ETT';
    else if (dominant === clientCount) dominantType = 'clients';
    else dominantType = 'intérimaires';

    insights.push({
      type: 'info',
      title: 'Répartition des profils',
      description: `Les ${dominantType} représentent ${Math.round((dominant / totalResponses) * 100)}% des réponses (${dominant}/${totalResponses})`,
      metric: `${Math.round((dominant / totalResponses) * 100)}%`
    });

    // Insight intérêt global
    const highInterest = responses.filter(r => r.q18_score >= 4).length;
    const interestRate = Math.round((highInterest / totalResponses) * 100);
    
    if (interestRate >= 60) {
      insights.push({
        type: 'success',
        title: 'Fort engagement global',
        description: `${interestRate}% des répondants montrent un fort intérêt (score 4-5/5)`,
        metric: `${highInterest} personnes`
      });
    } else if (interestRate < 30) {
      insights.push({
        type: 'warning',
        title: 'Intérêt à améliorer',
        description: `Seulement ${interestRate}% montrent un fort intérêt. Revoir la proposition de valeur.`,
        metric: `${highInterest} personnes`
      });
    }

    // Insight géographique
    const countryCount: Record<string, number> = {};
    responses.forEach(r => {
      const country = r.country || 'Non spécifié';
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    const topCountry = Object.entries(countryCount).sort((a, b) => b[1] - a[1])[0];
    
    if (topCountry && topCountry[1] > totalResponses * 0.4) {
      insights.push({
        type: 'opportunity',
        title: 'Concentration géographique',
        description: `${topCountry[0]} concentre ${Math.round((topCountry[1] / totalResponses) * 100)}% des réponses. Opportunité de cibler ce marché.`,
        metric: `${topCountry[1]} réponses`
      });
    }
  }

  // ========== INSIGHTS AGENCES ETT ==========
  if (profileType === 'agency') {
    const totalAgencies = responses.length;

    // Expérience détachement
    const withExperience = responses.filter(r => 
      r.q6_volume && r.q6_volume !== 'Pas encore'
    ).length;
    const experienceRate = Math.round((withExperience / totalAgencies) * 100);

    if (experienceRate >= 70) {
      insights.push({
        type: 'success',
        title: 'Marché mature',
        description: `${experienceRate}% des agences ont déjà une expérience en détachement transfrontalier`,
        metric: `${withExperience} agences`
      });
    } else {
      insights.push({
        type: 'opportunity',
        title: 'Potentiel d\'évangélisation',
        description: `${100 - experienceRate}% des agences n'ont pas encore fait de détachement. Grosse opportunité de formation.`,
        metric: `${totalAgencies - withExperience} agences`
      });
    }

    // Budget
    const withBudget = responses.filter(r => 
      r.q21_budget_mensuel && r.q21_budget_mensuel !== 'Non spécifié'
    ).length;
    
    if (withBudget > totalAgencies * 0.5) {
      insights.push({
        type: 'success',
        title: 'Budget identifié',
        description: `${Math.round((withBudget / totalAgencies) * 100)}% des agences ont un budget mensuel défini pour ce type de solution`,
        metric: `${withBudget} agences`
      });
    }

    // Score moyen
    const avgScore = responses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / totalAgencies;
    
    if (avgScore >= 4) {
      insights.push({
        type: 'success',
        title: 'Très forte appétence',
        description: `Score moyen de ${avgScore.toFixed(1)}/5. Les agences ETT sont très intéressées par la solution`,
        metric: `${avgScore.toFixed(1)}/5`
      });
    } else if (avgScore < 3) {
      insights.push({
        type: 'warning',
        title: 'Intérêt modéré',
        description: `Score moyen de ${avgScore.toFixed(1)}/5. Revoir le positionnement pour les agences ETT`,
        metric: `${avgScore.toFixed(1)}/5`
      });
    }
  }

  // ========== INSIGHTS CLIENTS ==========
  if (profileType === 'client') {
    const totalClients = responses.length;

    // Budget disponible
    const budgetCount: Record<string, number> = {};
    responses.forEach(r => {
      const budget = r.q21_budget_mensuel || 'Non spécifié';
      budgetCount[budget] = (budgetCount[budget] || 0) + 1;
    });
    const topBudget = Object.entries(budgetCount).sort((a, b) => b[1] - a[1])[0];

    if (topBudget && topBudget[0].includes('1000')) {
      insights.push({
        type: 'success',
        title: 'Budget élevé',
        description: `La majorité des clients ont un budget > 1000€/mois. Potentiel de CA élevé.`,
        metric: `${topBudget[1]} clients`
      });
    }

    // Taille entreprise
    const sizes = responses
      .map(r => parseInt(r.q3_taille?.match(/\d+/)?.[0] || '0'))
      .filter(s => s > 0);
    const avgSize = sizes.length > 0 
      ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length)
      : 0;

    if (avgSize >= 100) {
      insights.push({
        type: 'opportunity',
        title: 'Grandes entreprises',
        description: `Taille moyenne de ${avgSize} salariés. Cibler les comptes stratégiques.`,
        metric: `${avgSize} employés`
      });
    } else if (avgSize < 50) {
      insights.push({
        type: 'info',
        title: 'PME/TPE',
        description: `Taille moyenne de ${avgSize} salariés. Adapter l'offre aux petites structures.`,
        metric: `${avgSize} employés`
      });
    }

    // Score d'intérêt
    const avgScore = responses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / totalClients;
    
    if (avgScore >= 4) {
      insights.push({
        type: 'success',
        title: 'Forte demande',
        description: `Score moyen de ${avgScore.toFixed(1)}/5. Les clients sont très demandeurs de cette solution`,
        metric: `${avgScore.toFixed(1)}/5`
      });
    }
  }

  // ========== INSIGHTS INTÉRIMAIRES ==========
  if (profileType === 'worker') {
    const totalWorkers = responses.length;

    // Motivation
    const highMotivation = responses.filter(r => r.q18_score >= 4).length;
    const motivationRate = Math.round((highMotivation / totalWorkers) * 100);

    if (motivationRate >= 60) {
      insights.push({
        type: 'success',
        title: 'Forte motivation',
        description: `${motivationRate}% des intérimaires sont très motivés pour des missions à l'étranger`,
        metric: `${highMotivation} personnes`
      });
    } else if (motivationRate < 30) {
      insights.push({
        type: 'warning',
        title: 'Freins à identifier',
        description: `Seulement ${motivationRate}% sont très motivés. Identifier les freins (langue, mobilité, etc.)`,
        metric: `${highMotivation} personnes`
      });
    }

    // Secteurs recherchés
    const sectorCount: Record<string, number> = {};
    responses.forEach(r => {
      const sector = r.sector || 'Non spécifié';
      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    });
    const topSector = Object.entries(sectorCount).sort((a, b) => b[1] - a[1])[0];

    if (topSector && topSector[1] > totalWorkers * 0.3) {
      insights.push({
        type: 'opportunity',
        title: 'Secteur dominant',
        description: `${topSector[0]} attire ${Math.round((topSector[1] / totalWorkers) * 100)}% des intérimaires. Concentrer les offres.`,
        metric: `${topSector[1]} personnes`
      });
    }

    // Potentiel de conversion
    const readyToGo = responses.filter(r => 
      r.q18_score >= 4 && r.autorise_contact
    ).length;
    
    if (readyToGo > 0) {
      insights.push({
        type: 'success',
        title: 'Leads qualifiés',
        description: `${readyToGo} intérimaires sont très intéressés ET acceptent d'être contactés`,
        metric: `${readyToGo} leads`
      });
    }
  }

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'opportunity': return Target;
      default: return Lightbulb;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'success': return 'from-green-500 to-emerald-500';
      case 'warning': return 'from-orange-500 to-amber-500';
      case 'opportunity': return 'from-violet-500 to-purple-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getInsightBadge = (type: Insight['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-orange-100 text-orange-700';
      case 'opportunity': return 'bg-violet-100 text-violet-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  if (insights.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Insights & Recommandations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            const color = getInsightColor(insight.type);
            const badgeColor = getInsightBadge(insight.type);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-900">{insight.title}</h4>
                    {insight.metric && (
                      <Badge className={badgeColor}>{insight.metric}</Badge>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm">{insight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
