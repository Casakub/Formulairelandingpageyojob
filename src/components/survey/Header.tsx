import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, LayoutDashboard, Globe, Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useI18n } from '../../hooks/useI18n';
import { useAvailableLanguages, getCompletionColor } from '../../hooks/useAvailableLanguages';

interface HeaderProps {
  currentSection: number;
  progress: number;
  onDashboardClick?: () => void;
}

export function Header({ currentSection, progress, onDashboardClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLang, setCurrentLang, t } = useI18n();
  const { availableLanguages, loading: languagesLoading } = useAvailableLanguages();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu on click outside
  useEffect(() => {
    if (!isLangMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsLangMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white text-xl">Y</span>
          </div>
          <div>
            <h1 className={`transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              YoJob
            </h1>
            <p className={`text-xs transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/60'}`}>
              {t('header.subtitle', 'Étude de marché')}
            </p>
          </div>
        </div>

        {/* Progress indicator (only show when in form) */}
        {currentSection > 0 && currentSection < 7 && (
          <div className="hidden md:flex items-center gap-3">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
              {Math.round(progress)}%
            </span>
          </div>
        )}

        {/* Language Selector & Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative language-selector">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className={`transition-colors ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-cyan-600 hover:bg-cyan-50' 
                        : 'text-white hover:text-cyan-200 hover:bg-white/10'
                    }`}
                    disabled={languagesLoading}
                  >
                    {languagesLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Globe className="w-4 h-4 mr-2" />
                    )}
                    <span className="hidden md:inline uppercase">
                      {currentLang}
                    </span>
                    <span className="md:hidden">
                      {availableLanguages.find(l => l.code === currentLang)?.flag || '🌍'}
                    </span>
                  </Button>

                  {/* Language Dropdown */}
                  <AnimatePresence>
                    {isLangMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden z-50"
                      >
                        {languagesLoading ? (
                          <div className="p-8 flex flex-col items-center justify-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
                            <p className="text-sm text-slate-600">Chargement des langues...</p>
                          </div>
                        ) : availableLanguages.length === 0 ? (
                          <div className="p-6 text-center">
                            <p className="text-sm text-slate-600">
                              Aucune traduction disponible pour le moment
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="p-2 max-h-96 overflow-y-auto">
                              {availableLanguages.map((lang) => (
                                <motion.button
                                  key={lang.code}
                                  onClick={() => {
                                    setCurrentLang(lang.code);
                                    setIsLangMenuOpen(false);
                                  }}
                                  whileHover={{ x: 4 }}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    currentLang === lang.code
                                      ? 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-violet-600'
                                      : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="text-left flex-1">
                                      <div className="text-sm">{lang.name}</div>
                                      <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="uppercase">{lang.code}</span>
                                        <span className="text-slate-300">•</span>
                                        <span className={getCompletionColor(lang.completion)}>
                                          {lang.completion}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {currentLang === lang.code && (
                                    <Check className="w-4 h-4 text-cyan-500" />
                                  )}
                                </motion.button>
                              ))}
                            </div>
                            <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-violet-50 border-t border-slate-200">
                              <p className="text-xs text-slate-600">
                                💡 {availableLanguages.length} {availableLanguages.length === 1 ? 'langue disponible' : 'langues disponibles'}
                              </p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Changer de langue</p>
                <p className="text-xs text-slate-400">Auto-détection activée</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {onDashboardClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDashboardClick}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-gray-900 hover:text-violet-600 hover:bg-violet-50' 
                  : 'text-white hover:text-violet-200 hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('nav.dashboard', 'Dashboard')}</span>
            </Button>
          )}
          <a
            href="/"
            className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isScrolled 
                ? 'text-gray-900 hover:text-cyan-600 hover:bg-cyan-50' 
                : 'text-white hover:text-cyan-200 hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('nav.back_to_site', 'Retour au site')}</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}