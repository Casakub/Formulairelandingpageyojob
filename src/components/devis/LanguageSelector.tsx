/**
 * 🌍 SÉLECTEUR DE LANGUE POUR LE FORMULAIRE DE DEVIS
 * 
 * Composant permettant de changer la langue du formulaire
 * Détection intelligente selon le pays sélectionné
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DEVIS_LANGUAGES, MVP_LANGUAGES, getSuggestedLanguage } from '../../src/i18n/devis/languages';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface LanguageSelectorProps {
  value: DevisLanguage;
  onChange: (lang: DevisLanguage) => void;
  suggestedCountry?: string;
  showMVPOnly?: boolean;
  className?: string;
}

/**
 * Sélecteur de langue avec suggestions intelligentes
 */
export function LanguageSelector({ 
  value, 
  onChange, 
  suggestedCountry,
  showMVPOnly = false,
  className = '',
}: LanguageSelectorProps) {
  
  // Filtrer les langues à afficher
  const availableLanguages = showMVPOnly 
    ? DEVIS_LANGUAGES.filter(lang => MVP_LANGUAGES.includes(lang.code))
    : DEVIS_LANGUAGES;

  // Langue suggérée selon le pays
  const suggestedLang = suggestedCountry ? getSuggestedLanguage(suggestedCountry) : null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="min-w-[200px] bg-white/5 border-white/20 text-white hover:bg-white/10 transition-colors [&>span]:text-white">
          <SelectValue placeholder="Sélectionner une langue" />
        </SelectTrigger>
        
        <SelectContent className="bg-white backdrop-blur-xl border border-slate-200 max-h-[400px] overflow-y-auto z-[9999] shadow-xl [&_button]:!text-slate-900 [&_button]:hover:bg-slate-100">
          {availableLanguages.map((lang) => {
            const isSuggested = suggestedLang === lang.code;
            
            return (
              <SelectItem 
                key={lang.code} 
                value={lang.code}
                className="!text-slate-900 hover:bg-slate-100 focus:bg-slate-100 cursor-pointer py-2 px-3"
              >
                {lang.flag} {lang.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {suggestedLang && suggestedLang !== value && (
        <button
          onClick={() => onChange(suggestedLang)}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline whitespace-nowrap"
        >
          Utiliser la langue suggérée
        </button>
      )}
    </div>
  );
}

/**
 * Version compacte du sélecteur (pour mobile)
 */
export function LanguageSelectorCompact({ 
  value, 
  onChange,
  className = '',
}: Omit<LanguageSelectorProps, 'suggestedCountry' | 'showMVPOnly'>) {
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px] bg-white/5 border-white/20 text-white hover:bg-white/10 [&>span]:text-white">
          <SelectValue placeholder="Langue" />
        </SelectTrigger>
        
        <SelectContent className="bg-[#2d1b69] backdrop-blur-xl border border-white/30 text-white max-h-[300px] overflow-y-auto z-[9999] shadow-xl">
          {DEVIS_LANGUAGES.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="hover:bg-white/10 focus:bg-white/10 text-white"
            >
              {lang.flag} {lang.code.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Badge de langue (pour affichage uniquement)
 */
export function LanguageBadge({ lang }: { lang: DevisLanguage }) {
  const langInfo = DEVIS_LANGUAGES.find(l => l.code === lang);
  
  if (!langInfo) return null;
  
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-full text-sm text-white">
      <span>{langInfo.flag}</span>
      <span>{langInfo.label}</span>
    </div>
  );
}