import { motion } from 'motion/react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, RadialBarChart, RadialBar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, TrendingUp, Users, Star } from 'lucide-react';
import { useState } from 'react';

export function ScoreDistributionChart() {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'radial'>('radial');

  const scoreData = [
    { 
      range: '9-10', 
      label: 'Ambassadeurs', 
      percentage: 42, 
      count: 523,
      color: '#10B981',
      icon: '🌟',
      description: 'Très intéressés, prêts à tester'
    },
    { 
      range: '7-8', 
      label: 'Intéressés', 
      percentage: 31,
      count: 387,
      color: '#06B6D4',
      icon: '👍',
      description: 'Intérêt confirmé'
    },
    { 
      range: '5-6', 
      label: 'Modérés', 
      percentage: 18,
      count: 224,
      color: '#F59E0B',
      icon: '🤔',
      description: 'Attentistes'
    },
    { 
      range: '1-4', 
      label: 'Peu intéressés', 
      percentage: 9,
      count: 113,
      color: '#EF4444',
      icon: '😐',
      description: 'Pas prioritaire'
    }
  ];

  const totalResponses = scoreData.reduce((sum, item) => sum + item.count, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{data.icon}</span>
            <p className="text-slate-900">{data.label}</p>
          </div>
          <p className="text-cyan-600 text-sm mb-1">Score: {data.range}/10</p>
          <p className="text-slate-700"><strong>{data.count}</strong> agences ({data.percentage}%)</p>
          <p className="text-slate-500 text-xs mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur de type */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Distribution des scores (Q18)</CardTitle>
                <p className="text-slate-600 text-sm">Note d'intérêt pour la plateforme YoJob</p>
              </div>
            </div>
            
            {/* Type selector */}
            <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setChartType('radial')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  chartType === 'radial' 
                    ? 'bg-white text-cyan-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎯 Radial
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  chartType === 'bar' 
                    ? 'bg-white text-cyan-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 Barres
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  chartType === 'pie' 
                    ? 'bg-white text-cyan-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🥧 Donut
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {scoreData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <Card 
              className="border-2 transition-all cursor-pointer shadow-md hover:shadow-xl"
              style={{ 
                borderColor: item.color + '40',
                background: `linear-gradient(135deg, ${item.color}08, ${item.color}15)`
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{item.icon}</span>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-lg">{item.percentage}%</span>
                  </div>
                </div>
                <h4 className="text-slate-900 mb-1">{item.label}</h4>
                <p className="text-slate-600 text-sm mb-1">{item.count} agences</p>
                <div className="flex items-center gap-1 text-xs" style={{ color: item.color }}>
                  <span>Score {item.range}/10</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-6">
          <motion.div
            key={chartType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {chartType === 'bar' && (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#64748B"
                    tick={{ fill: '#64748B' }}
                  />
                  <YAxis 
                    stroke="#64748B"
                    tick={{ fill: '#64748B' }}
                    label={{ value: 'Pourcentage (%)', angle: -90, position: 'insideLeft', fill: '#64748B' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="percentage" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {chartType === 'pie' && (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ label, percentage }) => `${label}: ${percentage}%`}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="percentage"
                    animationDuration={1000}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}

            {chartType === 'radial' && (
              <ResponsiveContainer width="100%" height={350}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="10%" 
                  outerRadius="90%" 
                  data={scoreData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }}
                    background
                    clockWise
                    dataKey="percentage"
                    animationDuration={1500}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RadialBar>
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Légende personnalisée */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200">
            {scoreData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-5 h-5 text-green-600" />
              <h4 className="text-slate-900">Score Moyen</h4>
            </div>
            <div className="text-3xl text-green-600 mb-1">7.8/10</div>
            <p className="text-slate-600 text-sm">
              73% des agences sont intéressées (score ≥ 7)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/50 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-cyan-600" />
              <h4 className="text-slate-900">Ambassadeurs</h4>
            </div>
            <div className="text-3xl text-cyan-600 mb-1">523</div>
            <p className="text-slate-600 text-sm">
              42% prêts à tester le MVP immédiatement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-400/50 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <h4 className="text-slate-900">Potentiel</h4>
            </div>
            <div className="text-3xl text-violet-600 mb-1">910</div>
            <p className="text-slate-600 text-sm">
              Agences avec score ≥ 7 (cible prioritaire)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
