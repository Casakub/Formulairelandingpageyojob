import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Shortcut {
  keys: string[];
  description: string;
  action: string;
}

const SHORTCUTS: Shortcut[] = [
  {
    keys: ['Ctrl', 'S'],
    description: 'Sauvegarder la traduction en cours',
    action: 'save'
  },
  {
    keys: ['Ctrl', 'K'],
    description: 'Rechercher une question/texte',
    action: 'search'
  },
  {
    keys: ['Ctrl', 'G'],
    description: 'Générer traduction automatique (MCP)',
    action: 'generate-mcp'
  },
  {
    keys: ['Ctrl', 'T'],
    description: 'Générer traduction automatique (API)',
    action: 'generate-api'
  },
  {
    keys: ['Esc'],
    description: 'Annuler l\'édition en cours',
    action: 'cancel'
  },
  {
    keys: ['Tab'],
    description: 'Passer à la cellule suivante',
    action: 'next-cell'
  },
  {
    keys: ['Shift', 'Tab'],
    description: 'Passer à la cellule précédente',
    action: 'prev-cell'
  },
  {
    keys: ['?'],
    description: 'Afficher/Masquer les raccourcis',
    action: 'toggle-help'
  }
];

interface Props {
  onShortcut?: (action: string) => void;
}

export function TranslationKeyboardShortcuts({ onShortcut }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hasSeenShortcuts = localStorage.getItem('translation-shortcuts-seen');
    if (!hasSeenShortcuts && !dismissed) {
      const timer = setTimeout(() => {
        setShowHelp(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onShortcut?.('save');
      }
      
      // Ctrl+K - Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onShortcut?.('search');
      }
      
      // Ctrl+G - Generate MCP
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        onShortcut?.('generate-mcp');
      }
      
      // Ctrl+T - Generate API
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        onShortcut?.('generate-api');
      }
      
      // ? - Toggle help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        // Ne pas déclencher si on est dans un input/textarea
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowHelp(prev => !prev);
        }
      }
      
      // Esc - Cancel editing
      if (e.key === 'Escape') {
        onShortcut?.('cancel');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onShortcut]);

  const handleDismiss = () => {
    setShowHelp(false);
    setDismissed(true);
    localStorage.setItem('translation-shortcuts-seen', 'true');
  };

  return (
    <>
      {/* Help Button (always visible) */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowHelp(prev => !prev)}
        className="fixed bottom-6 left-[280px] z-[100] shadow-lg bg-white hover:bg-slate-50 border-slate-300"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Raccourcis</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-slate-100 border border-slate-300 rounded">?</kbd>
      </Button>

      {/* Shortcuts Panel */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-20 left-[280px] z-[100] w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="border-2 border-violet-200 shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-5 h-5" />
                      <h3>Raccourcis clavier</h3>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDismiss}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-violet-100 mt-1">
                    Gagnez du temps avec ces raccourcis
                  </p>
                </div>

                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {SHORTCUTS.map((shortcut, idx) => (
                    <motion.div
                      key={shortcut.action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-slate-50"
                    >
                      <span className="text-sm text-slate-600 flex-1">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIdx) => (
                          <kbd
                            key={keyIdx}
                            className="px-2 py-1 text-xs font-mono bg-slate-100 border border-slate-300 rounded shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    💡 Appuyez sur <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs">?</kbd> pour afficher/masquer
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
