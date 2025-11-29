import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, Languages } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useI18n, SUPPORTED_LANGUAGES } from '../../hooks/useI18n';

export function TranslationMissingBanner() {
  const { currentLang, setCurrentLang } = useI18n();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const currentLanguageData = SUPPORTED_LANGUAGES.find(l => l.code === currentLang);

  useEffect(() => {
    // Only show banner for non-French languages and if not previously dismissed
    const dismissed = sessionStorage.getItem('translation-banner-dismissed');
    if (currentLang !== 'fr' && !dismissed) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [currentLang]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowBanner(false);
    sessionStorage.setItem('translation-banner-dismissed', 'true');
  };

  const handleSwitchToFrench = () => {
    setCurrentLang('fr');
    handleDismiss();
  };

  if (!showBanner || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
      >
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 rounded-2xl shadow-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Languages className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-slate-900">Traduction en cours</h4>
                <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                  {currentLanguageData?.flag} {currentLanguageData?.name}
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-3">
                Certaines questions peuvent s'afficher en français si la traduction n'est pas encore disponible. 
                Nous travaillons à améliorer la couverture linguistique.
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={handleSwitchToFrench}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  🇫🇷 Passer en Français
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Continuer en {currentLanguageData?.name}
                </Button>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-slate-500 hover:text-slate-900 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
