import { motion } from 'motion/react';
import { ArrowRight, Globe, Users, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useI18n } from '../../hooks/useI18n';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  const { t } = useI18n();
  
  // Fallbacks en français si les traductions ne sont pas encore chargées
  const getText = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };
  
  const stats = [
    { 
      icon: Globe, 
      labelKey: 'hero.stat.countries',
      fallback: '27 pays couverts',
      color: 'from-cyan-400 to-blue-500' 
    },
    { 
      icon: Users, 
      labelKey: 'hero.stat.agencies',
      fallback: '500+ agences partenaires',
      color: 'from-violet-400 to-purple-500' 
    },
    { 
      icon: Clock, 
      labelKey: 'hero.stat.duration',
      fallback: '8-10 min pour répondre',
      color: 'from-green-400 to-emerald-500' 
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <span className="mr-2 text-2xl">📊</span>
            <span className="text-white">{getText('hero.badge', 'Étude de marché européenne')}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white mb-6 px-4"
        >
          {getText('hero.title', 'Participez à l\'avenir du détachement européen')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-cyan-100 text-xl mb-12 max-w-3xl mx-auto px-4"
        >
          {getText('hero.subtitle', 'Votre avis façonne YoJob. 8 minutes pour transformer votre quotidien administratif.')}
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30 transition-all shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-white">{getText(stat.labelKey, stat.fallback)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
              {getText('hero.cta.start', 'Commencer l\'enquête')}
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
          {getText('hero.footer.info', '25 questions • Anonyme • Conforme RGPD')}
        </motion.p>
      </div>
    </motion.section>
  );
}
