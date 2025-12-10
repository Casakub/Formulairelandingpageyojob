/**
 * 🎯 PROFILE SPECIFIC METRICS
 * 
 * Affiche des métriques spécifiques selon le type de profil sélectionné
 * - Agences : Volume détachement, pays, taille
 * - Clients : Budget, secteur, besoins
 * - Intérimaires : Disponibilité, expérience, mobilité
 */

import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Globe, Users, Building2, Target, Zap, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { MarketResearchResponse } from '../../lib/supabase';

interface ProfileSpecificMetricsProps {
  responses: MarketResearchResponse[];
  profileType: 'agency' | 'client' | 'worker';
}

export function ProfileSpecificMetrics({ responses, profileType }: ProfileSpecificMetricsProps) {
  
  // ========== MÉTRIQUES AGENCES ETT ==========
  if (profileType === 'agency') {
    // Volume de détachement moyen
    const volumeCount: Record<string, number> = {};
    responses.forEach(r => {
      const vol = r.q6_volume || 'Non spécifié';
      volumeCount[vol] = (volumeCount[vol] || 0) + 1;
    });
    const topVolume = Object.entries(volumeCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Pays les plus actifs
    const countriesCount: Record<string, number> = {};
    responses.forEach(r => {
      const country = r.country || 'Non spécifié';
      countriesCount[country] = (countriesCount[country] || 0) + 1;
    });
    const topCountry = Object.entries(countriesCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Taille moyenne des agences
    const sizes = responses
      .map(r => parseInt(r.q3_taille?.match(/\d+/)?.[0] || '0'))
      .filter(s => s > 0);
    const avgSize = sizes.length > 0 
      ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length)
      : 0;

    // Taux d'expérience détachement
    const withExperience = responses.filter(r => 
      r.q6_volume && r.q6_volume !== 'Pas encore'
    ).length;
    const experienceRate = responses.length > 0
      ? Math.round((withExperience / responses.length) * 100)
      : 0;

    const agencyMetrics = [
      {
        label: 'Volume principal',
        value: topVolume?.[0] || 'N/A',
        subtitle: `${topVolume?.[1] || 0} agences`,
        icon: Users,
        color: 'from-orange-500 to-amber-500'
      },
      {
        label: 'Pays le plus actif',
        value: topCountry?.[0] || 'N/A',
        subtitle: `${topCountry?.[1] || 0} agences`,
        icon: Globe,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        label: 'Taille moyenne',
        value: `${avgSize}`,
        subtitle: 'salariés/agence',
        icon: Building2,
        color: 'from-violet-500 to-purple-500'
      },
      {
        label: 'Avec expérience détachement',
        value: `${experienceRate}%`,
        subtitle: `${withExperience} agences`,
        icon: Award,
        color: 'from-green-500 to-emerald-500'
      }
    ];

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencyMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all shadow-md">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg mb-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-slate-900 mb-1">{metric.value}</div>
                <div className="text-slate-600 text-sm mb-1">{metric.label}</div>
                <div className="text-orange-600 text-xs">{metric.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  // ========== MÉTRIQUES CLIENTS/ENTREPRISES ==========
  if (profileType === 'client') {
    // Budget moyen
    const budgetCount: Record<string, number> = {};
    responses.forEach(r => {
      const budget = r.q21_budget_mensuel || 'Non spécifié';
      budgetCount[budget] = (budgetCount[budget] || 0) + 1;
    });
    const topBudget = Object.entries(budgetCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Secteur dominant
    const sectorCount: Record<string, number> = {};
    responses.forEach(r => {
      const sector = r.sector || 'Non spécifié';
      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    });
    const topSector = Object.entries(sectorCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Taille moyenne entreprise
    const sizes = responses
      .map(r => parseInt(r.q3_taille?.match(/\d+/)?.[0] || '0'))
      .filter(s => s > 0);
    const avgSize = sizes.length > 0 
      ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length)
      : 0;

    // Score d'intérêt moyen
    const avgInterest = responses.length > 0
      ? (responses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / responses.length).toFixed(1)
      : '0.0';

    const clientMetrics = [
      {
        label: 'Budget principal',
        value: topBudget?.[0] || 'N/A',
        subtitle: `${topBudget?.[1] || 0} clients`,
        icon: DollarSign,
        color: 'from-green-500 to-emerald-500'
      },
      {
        label: 'Secteur dominant',
        value: topSector?.[0] || 'N/A',
        subtitle: `${topSector?.[1] || 0} clients`,
        icon: Building2,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        label: 'Taille moyenne',
        value: `${avgSize}`,
        subtitle: 'salariés/entreprise',
        icon: Users,
        color: 'from-violet-500 to-purple-500'
      },
      {
        label: 'Intérêt moyen',
        value: `${avgInterest}/5`,
        subtitle: 'score YoJob',
        icon: TrendingUp,
        color: 'from-orange-500 to-amber-500'
      }
    ];

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all shadow-md">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg mb-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-slate-900 mb-1">{metric.value}</div>
                <div className="text-slate-600 text-sm mb-1">{metric.label}</div>
                <div className="text-blue-600 text-xs">{metric.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  // ========== MÉTRIQUES INTÉRIMAIRES ==========
  if (profileType === 'worker') {
    // Pays préférés
    const countriesCount: Record<string, number> = {};
    responses.forEach(r => {
      const country = r.country || 'Non spécifié';
      countriesCount[country] = (countriesCount[country] || 0) + 1;
    });
    const topCountry = Object.entries(countriesCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Secteur principal
    const sectorCount: Record<string, number> = {};
    responses.forEach(r => {
      const sector = r.sector || 'Non spécifié';
      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    });
    const topSector = Object.entries(sectorCount)
      .sort((a, b) => b[1] - a[1])[0];

    // Taux de disponibilité immédiate (estimation basée sur intérêt)
    const highInterest = responses.filter(r => r.q18_score >= 4).length;
    const availabilityRate = responses.length > 0
      ? Math.round((highInterest / responses.length) * 100)
      : 0;

    // Score moyen
    const avgScore = responses.length > 0
      ? (responses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / responses.length).toFixed(1)
      : '0.0';

    const workerMetrics = [
      {
        label: 'Pays préféré',
        value: topCountry?.[0] || 'N/A',
        subtitle: `${topCountry?.[1] || 0} intérimaires`,
        icon: Globe,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        label: 'Secteur principal',
        value: topSector?.[0] || 'N/A',
        subtitle: `${topSector?.[1] || 0} intérimaires`,
        icon: Target,
        color: 'from-violet-500 to-purple-500'
      },
      {
        label: 'Très intéressés',
        value: `${availabilityRate}%`,
        subtitle: `${highInterest} intérimaires`,
        icon: Zap,
        color: 'from-green-500 to-emerald-500'
      },
      {
        label: 'Motivation moyenne',
        value: `${avgScore}/5`,
        subtitle: 'score d\'intérêt',
        icon: TrendingUp,
        color: 'from-orange-500 to-amber-500'
      }
    ];

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workerMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-green-400 hover:shadow-lg transition-all shadow-md">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg mb-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-slate-900 mb-1">{metric.value}</div>
                <div className="text-slate-600 text-sm mb-1">{metric.label}</div>
                <div className="text-green-600 text-xs">{metric.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
