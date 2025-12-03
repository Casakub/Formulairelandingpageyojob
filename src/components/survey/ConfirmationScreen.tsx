import { motion } from 'motion/react';
import { CheckCircle, FileText, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useI18n } from '../../hooks/useI18n';

export function ConfirmationScreen() {
  const { t } = useI18n();
  
  const rewards = [
    {
      icon: FileText,
      title: t('confirmation.reward.report.title', 'Rapport "Tendances 2025"'),
      description: t('confirmation.reward.report.description', 'Envoyé sous 3 semaines'),
      color: 'text-cyan-400'
    },
    {
      icon: Gift,
      title: t('confirmation.reward.earlyaccess.title', 'Early Access YoJob'),
      description: t('confirmation.reward.earlyaccess.description', 'Top 100 répondants'),
      color: 'text-violet-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white mb-4"
        >
          {t('confirmation.title', 'Merci pour votre participation ! 🙏')}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg mb-12"
        >
          {t('confirmation.description', 'Votre avis est précieux et contribue à façonner l\'avenir de YoJob.')}
        </motion.p>

        {/* Rewards Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-cyan-400/30 transition-all shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className={`${reward.color} mb-3 text-4xl`}>
                    <reward.icon className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-white mb-1">{reward.title}</p>
                  <p className="text-white/40 text-sm">{reward.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
            className="border-2 border-white/50 bg-white/10 text-white hover:bg-white/20 hover:border-white/70 rounded-xl px-8 shadow-lg"
          >
            {t('confirmation.cta', 'Retour au site YoJob')}
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <p className="text-white/60 text-sm mb-3">
            {t('confirmation.thanks.title', '🎁 En remerciement de votre participation :')}
          </p>
          <ul className="text-white/80 text-sm space-y-2">
            <li>{t('confirmation.thanks.item1', '• Rapport exclusif "Tendances du détachement 2025"')}</li>
            <li>{t('confirmation.thanks.item2', '• Top 100 répondants = 3 mois d\'accès gratuit à YoJob (valeur 500€)')}</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
