import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  currentSection: number;
  progress: number;
  onDashboardClick?: () => void;
}

export function Header({ currentSection, progress, onDashboardClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              Étude de marché
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

        {/* Actions */}
        <div className="flex items-center gap-2">
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
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/'}
            className={`transition-colors ${
              isScrolled 
                ? 'text-gray-900 hover:text-cyan-600 hover:bg-cyan-50' 
                : 'text-white hover:text-cyan-200 hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Retour au site</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
