import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, X } from 'lucide-react';
import { Button } from '../ui/button';

export function HorizontalScrollHint() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the hint
    const hasSeenHint = localStorage.getItem('translation-scroll-hint-seen');
    
    if (!hasSeenHint && !dismissed) {
      // Show hint after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('translation-scroll-hint-seen', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-br from-cyan-500 to-violet-500 rounded-2xl shadow-2xl p-1">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <ArrowLeftRight className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-slate-900 mb-1">💡 Astuce</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Faites défiler horizontalement pour voir toutes les langues (EN, DE, ES, IT, PL, PT, NL)
                  </p>
                  <Button
                    size="sm"
                    onClick={handleDismiss}
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                  >
                    Compris !
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-slate-400 hover:text-slate-900 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
