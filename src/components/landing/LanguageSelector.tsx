import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  availableLanguages?: string[];
  variant?: 'default' | 'mobile';
  className?: string;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  availableLanguages = ['fr', 'en'],
  variant = 'default',
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtenir les informations de la langue actuelle
  const currentLangInfo = EUROPEAN_LANGUAGES.find((l) => l.code === currentLanguage) || EUROPEAN_LANGUAGES[0];

  // Filtrer les langues disponibles
  const filteredLanguages = EUROPEAN_LANGUAGES.filter((lang) => 
    availableLanguages.includes(lang.code)
  );

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/20 transition-all w-full"
        >
          <Globe className="w-4 h-4" />
          <span className="text-2xl">{currentLangInfo.flag}</span>
          <span>{currentLangInfo.nativeName}</span>
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
            >
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors ${
                    lang.code === currentLanguage ? 'bg-cyan-50' : ''
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="flex-1 text-left text-slate-900">
                    {lang.nativeName}
                    <span className="text-xs text-slate-500 ml-2">({lang.code.toUpperCase()})</span>
                  </span>
                  {lang.code === currentLanguage && (
                    <Check className="w-4 h-4 text-cyan-600" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className={`relative z-50 ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 backdrop-blur-md rounded-full text-white border border-white/30 shadow-lg hover:shadow-xl transition-all group"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xl">{currentLangInfo.flag}</span>
        <span className="hidden sm:inline">{currentLangInfo.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[9999]"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Choisissez votre langue</span>
              </div>
            </div>

            {/* Languages list */}
            <div className="max-h-96 overflow-y-auto">
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors ${
                    lang.code === currentLanguage ? 'bg-cyan-50' : ''
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-slate-900">{lang.nativeName}</div>
                    <div className="text-xs text-slate-500">{lang.name} ({lang.code.toUpperCase()})</div>
                  </div>
                  {lang.code === currentLanguage && (
                    <Check className="w-5 h-5 text-cyan-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
              {filteredLanguages.length} {filteredLanguages.length > 1 ? 'langues disponibles' : 'langue disponible'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}