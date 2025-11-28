import { motion } from 'motion/react';
import { Users, TrendingUp, Star, CheckCircle, Calendar, Globe, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScoreDistributionChart } from './ScoreDistributionChart';

export function DashboardOverview() {
  const stats = [
    {
      label: 'Réponses totales',
      value: '1,247',
      subtitle: '/27,000',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      progress: 4.6
    },
    {
      label: 'Taux de complétion',
      value: '73%',
      subtitle: 'Objectif: 70%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      progress: 73
    },
    {
      label: 'Score moyen',
      value: '7.3',
      subtitle: '/10',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      progress: 73
    },
    {
      label: 'Prêts pour MVP',
      value: '523',
      subtitle: '42% des répondants',
      icon: Rocket,
      color: 'from-violet-500 to-purple-500',
      progress: 42
    }
  ];

  const topCountries = [
    { country: '🇵🇱 Pologne', count: 612, percentage: 49 },
    { country: '🇨🇿 Tchéquie', count: 187, percentage: 15 },
    { country: '🇸🇰 Slovaquie', count: 98, percentage: 8 },
    { country: '🇪🇸 Espagne', count: 76, percentage: 6 },
    { country: '🇷🇴 Roumanie', count: 54, percentage: 4 }
  ];

  const topFeatures = [
    { feature: 'SIPSI automatisée', percentage: 67, color: 'bg-blue-500' },
    { feature: 'Dashboard conformité', percentage: 54, color: 'bg-cyan-500' },
    { feature: 'Certificats A1', percentage: 51, color: 'bg-violet-500' },
    { feature: 'Alertes renouvellement', percentage: 43, color: 'bg-green-500' },
    { feature: 'Marketplace', percentage: 38, color: 'bg-orange-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
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
                    animate={{ width: `${stat.progress}%` }}
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
        {/* Top Features */}
        <Card className="bg-white border-slate-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-600" />
              Top 5 Features demandées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFeatures.map((feature, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700">{feature.feature}</span>
                    <span className="text-cyan-600">{feature.percentage}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className={`h-full ${feature.color} shadow-lg`}
                    />
                  </div>
                </div>
              ))}
            </div>
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
          </CardContent>
        </Card>
      </div>

      {/* Score Distribution - New Component */}
      <ScoreDistributionChart />

      {/* Quick Stats */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 text-cyan-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">+47</div>
            <div className="text-slate-600 text-sm">Réponses aujourd'hui</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-violet-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">8.2 min</div>
            <div className="text-slate-600 text-sm">Temps moyen</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <div className="text-slate-900 text-2xl mb-1">94%</div>
            <div className="text-slate-600 text-sm">Taux de validation</div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
