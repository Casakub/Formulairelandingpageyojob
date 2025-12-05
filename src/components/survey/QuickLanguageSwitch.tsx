import { motion } from 'motion/react';
import { useI18n } from '../../hooks/useI18n';
import { useAvailableLanguages, getCompletionColor } from '../../hooks/useAvailableLanguages';
import { Badge } from '../ui/badge';
import { Loader2 } from 'lucide-react';

interface QuickLanguageSwitchProps {
  variant?: 'compact' | 'full';
  showCompletion?: boolean;
}

export function QuickLanguageSwitch({ variant = 'compact', showCompletion = false }: QuickLanguageSwitchProps) {
  const { currentLang, setCurrentLang } = useI18n();
  const { availableLanguages, loading } = useAvailableLanguages();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-cyan-500" />
        <span className="text-sm text-slate-600">Chargement des langues...</span>
      </div>
    );
  }

  if (availableLanguages.length === 0) {
    return (
      <div className="text-center text-sm text-slate-600 p-4">
        Aucune langue disponible
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-1 flex-wrap">
        {availableLanguages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setCurrentLang(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all relative ${
              currentLang === lang.code
                ? 'bg-gradient-to-br from-cyan-500 to-violet-500 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
            title={`${lang.name} (${lang.completion}%)`}
          >
            {lang.flag}
            {showCompletion && lang.completion < 100 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                <span className={`text-xs ${getCompletionColor(lang.completion)}`}>
                  {lang.completion}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {availableLanguages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setCurrentLang(lang.code)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
            currentLang === lang.code
              ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-lg'
              : 'bg-white/80 backdrop-blur-sm hover:bg-white border border-slate-200'
          }`}
        >
          <span className="text-2xl">{lang.flag}</span>
          <span className={`text-xs ${currentLang === lang.code ? 'text-white' : 'text-slate-600'}`}>
            {lang.name}
          </span>
          <div className="flex items-center gap-1">
            {currentLang === lang.code && (
              <Badge className="bg-white/20 text-white text-xs">
                ✓ Actif
              </Badge>
            )}
            {showCompletion && (
              <Badge 
                variant="secondary" 
                className={`text-xs ${currentLang === lang.code ? 'bg-white/20 text-white' : ''}`}
              >
                {lang.completion}%
              </Badge>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
