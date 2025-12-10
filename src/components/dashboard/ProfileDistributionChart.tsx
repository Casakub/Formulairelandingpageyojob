/**
 * 📊 PROFILE DISTRIBUTION CHART
 * 
 * Affiche la répartition des réponses entre les 3 types de profils
 * (Agences ETT, Clients/Entreprises, Intérimaires)
 */

import { motion } from 'motion/react';
import { Building2, Briefcase, HardHat, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { MarketResearchResponse } from '../../lib/supabase';

interface ProfileDistributionChartProps {
  responses: MarketResearchResponse[];
}

const PROFILE_COLORS = {
  agency: {
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    icon: Building2,
    label: 'Agences ETT',
    emoji: '🏢'
  },
  client: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: Briefcase,
    label: 'Clients/Entreprises',
    emoji: '💼'
  },
  worker: {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: HardHat,
    label: 'Intérimaires',
    emoji: '👷'
  }
};

export function ProfileDistributionChart({ responses }: ProfileDistributionChartProps) {
  // Calculer la répartition
  const distribution = {
    agency: responses.filter(r => r.respondent_type === 'agency').length,
    client: responses.filter(r => r.respondent_type === 'client').length,
    worker: responses.filter(r => r.respondent_type === 'worker').length
  };

  const total = distribution.agency + distribution.client + distribution.worker;

  const profiles = [
    {
      type: 'agency' as const,
      count: distribution.agency,
      percentage: total > 0 ? Math.round((distribution.agency / total) * 100) : 0
    },
    {
      type: 'client' as const,
      count: distribution.client,
      percentage: total > 0 ? Math.round((distribution.client / total) * 100) : 0
    },
    {
      type: 'worker' as const,
      count: distribution.worker,
      percentage: total > 0 ? Math.round((distribution.worker / total) * 100) : 0
    }
  ].sort((a, b) => b.count - a.count); // Trier par nombre décroissant

  return (
    <Card className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-600" />
          Répartition par profil
        </CardTitle>
      </CardHeader>
      <CardContent>
        {total > 0 ? (
          <div className="space-y-5">
            {profiles.map((profile, index) => {
              const config = PROFILE_COLORS[profile.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={profile.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 text-sm">{config.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900">{profile.count.toLocaleString('fr-FR')}</div>
                      <div className="text-slate-500 text-xs">{profile.percentage}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${profile.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${config.gradient} shadow-sm`}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Total */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-sm">Total réponses</span>
                <span className="text-slate-900">{total.toLocaleString('fr-FR')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Aucune donnée disponible</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
