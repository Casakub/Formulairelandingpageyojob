import { motion } from 'motion/react';
import { useI18n, SUPPORTED_LANGUAGES } from '../../hooks/useI18n';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface QuickLanguageSwitchProps {
  variant?: 'compact' | 'full';
}

export function QuickLanguageSwitch({ variant = 'compact' }: QuickLanguageSwitchProps) {
  const { currentLang, setCurrentLang } = useI18n();

  if (variant === 'compact') {
    return (
      <div className="flex gap-1 flex-wrap">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setCurrentLang(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
              currentLang === lang.code
                ? 'bg-gradient-to-br from-cyan-500 to-violet-500 shadow-lg scale-110'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => (
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
          {currentLang === lang.code && (
            <Badge className="bg-white/20 text-white text-xs">
              ✓ Actif
            </Badge>
          )}
        </motion.button>
      ))}
    </div>
  );
}
