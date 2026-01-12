/**
 * 🌍 SÉLECTEUR DE LANGUE UNIFIÉ
 * 
 * Composant partagé pour toutes les pages du site
 * - Landing page : Style élégant avec gradient
 * - Formulaire devis : + Suggestion intelligente selon pays
 * 
 * @version 2.0.0
 * @created 2024-01-08
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';
import { DEVIS_LANGUAGES, getSuggestedLanguage } from '../../src/i18n/devis/languages';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  availableLanguages?: string[];
  variant?: 'default' | 'mobile';
  className?: string;
  
  // 🆕 Props pour suggestion intelligente (devis)
  suggestedCountry?: string;
  showCountrySuggestion?: boolean;
  languageSource?: 'european' | 'devis';
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  availableLanguages = ['fr', 'en'],
  variant = 'default',
  className = '',
  suggestedCountry,
  showCountrySuggestion = false,
  languageSource = 'european',
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

  // Choisir la source de langues
  const languagesList = languageSource === 'devis' ? DEVIS_LANGUAGES : EUROPEAN_LANGUAGES;

  // Obtenir les informations de la langue actuelle
  const currentLangInfo = languagesList.find((l) => l.code === currentLanguage) || languagesList[0];

  // Filtrer les langues disponibles
  const filteredLanguages = languagesList.filter((lang) => 
    availableLanguages.includes(lang.code)
  );

  // Calculer la langue suggérée (si applicable)
  const suggestedLang = suggestedCountry && showCountrySuggestion 
    ? getSuggestedLanguage(suggestedCountry) 
    : null;

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const handleSuggestionClick = () => {
    if (suggestedLang) {
      onLanguageChange(suggestedLang);
    }
  };

  // === MOBILE VARIANT ===
  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="relative" ref={dropdownRef}>
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

        {/* Suggestion de langue (mobile) */}
        {suggestedLang && suggestedLang !== currentLanguage && showCountrySuggestion && (
          <button
            onClick={handleSuggestionClick}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-lg text-cyan-100 text-sm transition-all w-full"
          >
            <Sparkles className="w-4 h-4" />
            <span>Utiliser la langue suggérée</span>
          </button>
        )}
      </div>
    );
  }

  // === DESKTOP VARIANT ===
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative z-[100]" ref={dropdownRef}>
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
                      <div className="text-xs text-slate-500">{lang.code.toUpperCase()}</div>
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

      {/* Suggestion de langue (desktop) */}
      {suggestedLang && suggestedLang !== currentLanguage && showCountrySuggestion && (
        <motion.button
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSuggestionClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-full text-cyan-100 text-xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Utiliser la langue suggérée</span>
        </motion.button>
      )}
    </div>
  );
}