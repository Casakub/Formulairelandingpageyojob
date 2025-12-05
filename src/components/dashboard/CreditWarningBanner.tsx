import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CreditCard, ExternalLink, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface CreditWarningBannerProps {
  message: string;
  type?: 'warning' | 'error' | 'info';
  showRechargeButton?: boolean;
  onDismiss?: () => void;
}

export function CreditWarningBanner({ 
  message, 
  type = 'warning', 
  showRechargeButton = true,
  onDismiss 
}: CreditWarningBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const colors = {
    warning: {
      bg: 'from-orange-50 to-amber-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      icon: 'text-orange-600',
      button: 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
    },
    error: {
      bg: 'from-red-50 to-rose-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      button: 'from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
    },
    info: {
      bg: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      button: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
    }
  };

  const colorScheme = colors[type];

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="overflow-hidden"
        >
          <div className={`relative bg-gradient-to-r ${colorScheme.bg} border ${colorScheme.border} rounded-2xl p-4 shadow-lg mb-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <AlertCircle className={`w-5 h-5 ${colorScheme.icon}`} />
              </div>

              <div className="flex-1">
                <h3 className={`${colorScheme.text} mb-1`}>
                  {type === 'error' ? '⚠️ Crédits insuffisants' : type === 'warning' ? '💳 Rechargez vos crédits' : 'ℹ️ Information'}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              {showRechargeButton && (
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${colorScheme.button} text-white shadow-md hover:shadow-lg transition-all`}
                  onClick={() => window.open('https://console.anthropic.com/settings/plans', '_blank')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Recharger
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              )}

              {onDismiss && (
                <button
                  onClick={handleDismiss}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
