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
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-6">
          <h4 className="text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-600" />
            Répartition par section
          </h4>
          <div className="grid md:grid-cols-6 gap-4">
            {sectionBreakdown.map((section, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center border border-cyan-400/50">
                  <span className="text-2xl text-slate-900">{section.count}</span>
                </div>
                <div className="text-slate-600 text-sm">Section {section.section}</div>
                <div className="text-cyan-600 text-xs">{section.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
