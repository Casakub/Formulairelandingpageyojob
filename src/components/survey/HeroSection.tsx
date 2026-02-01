import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useI18n } from '../../src/i18n';
import { QUESTION_COUNT_BY_PROFILE, ESTIMATED_TIME_BY_PROFILE } from '../../config/survey-questions';
import type { RespondentType } from '../../types/survey';

interface HeroSectionProps {
  onStart: () => void;
  respondentType: RespondentType;
}

export function HeroSection({ onStart, respondentType }: HeroSectionProps) {
  const { t } = useI18n();
  
  // Fallbacks en français si les traductions ne sont pas encore chargées
  const getText = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  // Stats dynamiques selon le profil
  const questionCount = QUESTION_COUNT_BY_PROFILE[respondentType];
  const estimatedTime = ESTIMATED_TIME_BY_PROFILE[respondentType];
  
  // 🎯 STATS ADAPTÉES PAR PROFIL - Marketing optimisé
  const getStatsForProfile = () => {
    switch (respondentType) {
      case 'agency':
        return [
          { 
            icon: CheckCircle, 
            labelKey: 'hero.stat.countries',
            fallback: '27 pays européens',
            color: 'from-cyan-400 to-blue-500' 
          },
          { 
            icon: Clock, 
            label: `${questionCount} ${getText('hero.stat.questions', 'questions')} • ${estimatedTime}`,
            color: 'from-green-400 to-emerald-500' 
          },
          { 
            icon: TrendingUp, 
            labelKey: 'hero.stat.benchmark',
            fallback: 'Recevez le benchmark 2025',
            color: 'from-violet-400 to-purple-500' 
          }
        ];
      
      case 'client':
        return [
          { 
            icon: CheckCircle, 
            labelKey: 'hero.stat.countries',
            fallback: '27 pays européens',
            color: 'from-cyan-400 to-blue-500' 
          },
          { 
            icon: Clock, 
            label: `${questionCount} ${getText('hero.stat.questions', 'questions')} • ${estimatedTime}`,
            color: 'from-green-400 to-emerald-500' 
          },
          { 
            icon: TrendingUp, 
            labelKey: 'hero.stat.insights',
            fallback: 'Insights marché exclusifs',
            color: 'from-orange-400 to-amber-500' 
          }
        ];
      
      case 'worker':
        return [
          { 
            icon: CheckCircle, 
            labelKey: 'hero.stat.countries',
            fallback: '27 pays disponibles',
            color: 'from-cyan-400 to-blue-500' 
          },
          { 
            icon: Clock, 
            label: `${questionCount} ${getText('hero.stat.questions', 'questions')} • ${estimatedTime}`,
            color: 'from-green-400 to-emerald-500' 
          },
          { 
            icon: TrendingUp, 
            labelKey: 'hero.stat.opportunities',
            fallback: 'Accès prioritaire aux offres',
            color: 'from-pink-400 to-rose-500' 
          }
        ];
      
      default:
        return [
          { 
            icon: CheckCircle, 
            labelKey: 'hero.stat.countries',
            fallback: '27 pays couverts',
            color: 'from-cyan-400 to-blue-500' 
          },
          { 
            icon: Clock, 
            label: `${questionCount} ${getText('hero.stat.questions', 'questions')} • ${estimatedTime}`,
            color: 'from-green-400 to-emerald-500' 
          }
        ];
    }
  };

  const stats = getStatsForProfile();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 pt-32 md:pt-40 px-4">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 max-w-full text-center flex-wrap"
        >
          <span className="text-2xl">📊</span>
          <span className="text-white/90 leading-relaxed">{getText('hero.badge', 'Étude de marché européen')}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white mb-6"
        >
          {getText('hero.title', 'Enquête de marché')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
        >
          {getText('hero.subtitle', 'Aidez-nous à mieux comprendre vos besoins')}
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white">
                      {stat.label || getText(stat.labelKey!, stat.fallback || '')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="h-16 px-12 bg-white text-blue-900 hover:bg-cyan-50 rounded-full shadow-2xl hover:shadow-white/70 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              {getText('hero.cta_start', 'Commencer l\'enquête')}
              <ArrowRight className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
          </Button>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/60 text-sm mt-8"
        >
          {questionCount} {getText('hero.stat.questions', 'questions')} • {estimatedTime} • {getText('hero.footer.anonymous', 'Anonyme')} • {getText('hero.footer.gdpr', 'Conforme RGPD')}
        </motion.p>
      </div>
    </section>
  );
}