import { motion } from 'motion/react';
import { FileText, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useQuestions } from '../../context/QuestionsContext';

export function QuestionStats() {
  const { questions } = useQuestions();

  const stats = [
    {
      label: 'Questions totales',
      value: questions.length,
      subtitle: 'dans le formulaire',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Questions visibles',
      value: questions.filter(q => q.visible).length,
      subtitle: `${Math.round((questions.filter(q => q.visible).length / questions.length) * 100)}% du total`,
      icon: Eye,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Questions masquées',
      value: questions.filter(q => !q.visible).length,
      subtitle: 'temporairement',
      icon: EyeOff,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Questions obligatoires',
      value: questions.filter(q => q.required).length,
      subtitle: `${Math.round((questions.filter(q => q.required).length / questions.length) * 100)}% du total`,
      icon: CheckCircle,
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const sectionBreakdown = [
    { section: 1, name: 'Profil', count: questions.filter(q => q.section === 1).length },
    { section: 2, name: 'Détachement', count: questions.filter(q => q.section === 2).length },
    { section: 3, name: 'Besoins', count: questions.filter(q => q.section === 3).length },
    { section: 4, name: 'Intérêt', count: questions.filter(q => q.section === 4).length },
    { section: 5, name: 'Vision', count: questions.filter(q => q.section === 5).length },
    { section: 6, name: 'Contact', count: questions.filter(q => q.section === 6).length }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm mb-1">{stat.label}</div>
                <div className="text-cyan-600 text-xs">{stat.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Section Breakdown */}
      <Card className="bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/20 border-slate-200 shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-slate-900 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              Répartition par section
            </h4>
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-cyan-600 text-sm border border-cyan-200">
              6 sections
            </span>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectionBreakdown.map((section, index) => {
              const percentage = questions.length > 0 
                ? Math.round((section.count / questions.length) * 100) 
                : 0;
              
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-cyan-500 to-teal-500',
                'from-violet-500 to-purple-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500',
                'from-green-500 to-emerald-500'
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 
                                  hover:border-cyan-400 transition-all shadow-md hover:shadow-lg">
                    {/* Number badge */}
                    <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${gradients[index]} 
                                     flex items-center justify-center mb-3 shadow-lg
                                     group-hover:shadow-xl group-hover:scale-105 transition-all`}>
                      <span className="text-4xl text-white drop-shadow-lg">{section.count}</span>
                    </div>

                    {/* Section info */}
                    <div className="text-center space-y-1">
                      <div className="text-slate-900 text-sm">Section {section.section}</div>
                      <div className="text-cyan-600 text-xs">{section.name}</div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${gradients[index]} rounded-full`}
                      />
                    </div>
                    
                    {/* Percentage */}
                    <div className="text-center mt-2 text-xs text-slate-500">
                      {percentage}%
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}