/**
 * 📊 PROFILE COMPARISON
 * 
 * Compare les métriques clés entre les 3 types de profils
 * (Score moyen, taux de réponse, budget moyen, etc.)
 */

import { motion } from 'motion/react';
import { Building2, Briefcase, HardHat, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { MarketResearchResponse } from '../../lib/supabase';

interface ProfileComparisonProps {
  responses: MarketResearchResponse[];
}

export function ProfileComparison({ responses }: ProfileComparisonProps) {
  const agencyResponses = responses.filter(r => r.respondent_type === 'agency');
  const clientResponses = responses.filter(r => r.respondent_type === 'client');
  const workerResponses = responses.filter(r => r.respondent_type === 'worker');

  // Calculer les scores moyens
  const avgScores = {
    agency: agencyResponses.length > 0
      ? (agencyResponses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / agencyResponses.length).toFixed(1)
      : '0.0',
    client: clientResponses.length > 0
      ? (clientResponses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / clientResponses.length).toFixed(1)
      : '0.0',
    worker: workerResponses.length > 0
      ? (workerResponses.reduce((sum, r) => sum + (r.q18_score || 0), 0) / workerResponses.length).toFixed(1)
      : '0.0'
  };

  // Taux de haute motivation (score >= 4)
  const highMotivationRates = {
    agency: agencyResponses.length > 0
      ? Math.round((agencyResponses.filter(r => r.q18_score >= 4).length / agencyResponses.length) * 100)
      : 0,
    client: clientResponses.length > 0
      ? Math.round((clientResponses.filter(r => r.q18_score >= 4).length / clientResponses.length) * 100)
      : 0,
    worker: workerResponses.length > 0
      ? Math.round((workerResponses.filter(r => r.q18_score >= 4).length / workerResponses.length) * 100)
      : 0
  };

  // Taux de contact autorisé
  const contactRates = {
    agency: agencyResponses.length > 0
      ? Math.round((agencyResponses.filter(r => r.autorise_contact).length / agencyResponses.length) * 100)
      : 0,
    client: clientResponses.length > 0
      ? Math.round((clientResponses.filter(r => r.autorise_contact).length / clientResponses.length) * 100)
      : 0,
    worker: workerResponses.length > 0
      ? Math.round((workerResponses.filter(r => r.autorise_contact).length / workerResponses.length) * 100)
      : 0
  };

  const profiles = [
    {
      type: 'agency',
      label: 'Agences ETT',
      icon: Building2,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      count: agencyResponses.length,
      avgScore: avgScores.agency,
      highMotivation: highMotivationRates.agency,
      contactRate: contactRates.agency
    },
    {
      type: 'client',
      label: 'Clients/Entreprises',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      count: clientResponses.length,
      avgScore: avgScores.client,
      highMotivation: highMotivationRates.client,
      contactRate: contactRates.client
    },
    {
      type: 'worker',
      label: 'Intérimaires',
      icon: HardHat,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      count: workerResponses.length,
      avgScore: avgScores.worker,
      highMotivation: highMotivationRates.worker,
      contactRate: contactRates.worker
    }
  ];

  // Trouver le meilleur profil pour chaque métrique
  const bestScore = Math.max(parseFloat(avgScores.agency), parseFloat(avgScores.client), parseFloat(avgScores.worker));
  const bestMotivation = Math.max(highMotivationRates.agency, highMotivationRates.client, highMotivationRates.worker);
  const bestContact = Math.max(contactRates.agency, contactRates.client, contactRates.worker);

  if (responses.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-600" />
          Comparaison entre profils
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            const isTopScore = parseFloat(profile.avgScore) === bestScore && bestScore > 0;
            const isTopMotivation = profile.highMotivation === bestMotivation && bestMotivation > 0;
            const isTopContact = profile.contactRate === bestContact && bestContact > 0;

            return (
              <motion.div
                key={profile.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${profile.bgColor} ${profile.borderColor} border-2 rounded-2xl p-6 relative`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Label & Count */}
                <h4 className="text-slate-900 mb-1">{profile.label}</h4>
                <p className="text-slate-600 text-sm mb-6">{profile.count} réponses</p>

                {/* Metrics */}
                <div className="space-y-4">
                  {/* Score moyen */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600 text-sm">Score moyen</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{profile.avgScore}/5</span>
                        {isTopScore && <Badge className="bg-green-100 text-green-700 text-xs">🏆 Top</Badge>}
                      </div>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(parseFloat(profile.avgScore) / 5) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${profile.color}`}
                      />
                    </div>
                  </div>

                  {/* Haute motivation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600 text-sm">Très intéressés</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{profile.highMotivation}%</span>
                        {isTopMotivation && <Badge className="bg-green-100 text-green-700 text-xs">🏆 Top</Badge>}
                      </div>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.highMotivation}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${profile.color}`}
                      />
                    </div>
                  </div>

                  {/* Taux de contact */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600 text-sm">Autorise contact</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{profile.contactRate}%</span>
                        {isTopContact && <Badge className="bg-green-100 text-green-700 text-xs">🏆 Top</Badge>}
                      </div>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.contactRate}%` }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${profile.color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
