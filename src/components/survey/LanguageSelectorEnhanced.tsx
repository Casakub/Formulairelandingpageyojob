/**
 * 🌍 SÉLECTEUR DE LANGUE AMÉLIORÉ
 * 
 * Composant de sélection de langue avec 22 langues européennes
 * Détection automatique de la langue du navigateur
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  SUPPORTED_LANGUAGES,
  getBrowserLanguage,
  type SupportedLanguage 
} from '../../src/i18n';

export interface LanguageSelectorEnhancedProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  variant?: 'default' | 'compact' | 'minimal';
  showFlag?: boolean;
  showNativeName?: boolean;
  className?: string;
}

export function LanguageSelectorEnhanced({
  currentLanguage,
  onLanguageChange,
  variant = 'default',
  showFlag = true,
  showNativeName = true,
  className = '',
}: LanguageSelectorEnhancedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-detect language on first mount
  useEffect(() => {
    if (!currentLanguage) {
      const browserLang = getBrowserLanguage();
      onLanguageChange(browserLang);
    }
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  // Filter languages by search query
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang =>
    searchQuery === '' || 
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    onLanguageChange(lang);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Compact variant (just flag + code)
  if (variant === 'compact') {
    return (
      <div className={`language-selector relative ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 h-9 px-3 border-slate-300 hover:border-cyan-400"
        >
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="text-sm uppercase">{currentLanguage}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="max-h-96 overflow-y-auto p-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-50 transition-colors ${
                      lang.code === currentLanguage ? 'bg-cyan-100' : ''
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1 text-left text-sm">{lang.nativeName}</span>
                    {lang.code === currentLanguage && (
                      <Check className="w-4 h-4 text-cyan-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Minimal variant (just flag, click to change)
  if (variant === 'minimal') {
    return (
      <div className={`language-selector relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          title={currentLang?.nativeName}
        >
          <span className="text-2xl">{currentLang?.flag}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-12 z-50 grid grid-cols-6 gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-xl"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-2 rounded-lg hover:bg-cyan-50 transition-all ${
                    lang.code === currentLanguage ? 'bg-cyan-100 ring-2 ring-cyan-400' : ''
                  }`}
                  title={lang.nativeName}
                >
                  <span className="text-2xl">{lang.flag}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant (full with search)
  return (
    <div className={`language-selector relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 h-11 px-4 border-2 border-slate-300 hover:border-cyan-400 transition-all"
      >
        <Globe className="w-4 h-4 text-slate-600" />
        {showFlag && <span className="text-xl">{currentLang?.flag}</span>}
        {showNativeName && (
          <span className="hidden sm:inline text-sm">{currentLang?.nativeName}</span>
        )}
        <span className="sm:hidden text-sm uppercase">{currentLanguage}</span>
        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-14 z-50 w-80 bg-white border-2 border-slate-200 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search bar */}
            <div className="p-3 border-b border-slate-200 bg-slate-50">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une langue..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Language list */}
            <div className="max-h-96 overflow-y-auto">
              {filteredLanguages.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <p className="text-sm">Aucune langue trouvée</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredLanguages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        lang.code === currentLanguage
                          ? 'bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-400'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm text-slate-900">{lang.nativeName}</div>
                        <div className="text-xs text-slate-500">{lang.name}</div>
                      </div>
                      <span className="text-xs text-slate-400 uppercase">{lang.code}</span>
                      {lang.code === currentLanguage && (
                        <Check className="w-5 h-5 text-cyan-600" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <p className="text-xs text-slate-500 text-center">
                {SUPPORTED_LANGUAGES.length} langues européennes disponibles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}