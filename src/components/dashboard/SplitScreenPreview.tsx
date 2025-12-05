import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, ExternalLink, Monitor, Smartphone, Tablet, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SplitScreenPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage?: string;
}

export function SplitScreenPreview({ isOpen, onClose, selectedLanguage = 'fr' }: SplitScreenPreviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullWidth, setIsFullWidth] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Recharger l'iframe quand la langue change
  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const iframe = iframeRef.current;
      const currentSrc = iframe.src;
      const url = new URL(currentSrc || window.location.origin);
      url.searchParams.set('lang', selectedLanguage);
      iframe.src = url.toString();
    }
  }, [selectedLanguage, isOpen]);

  // Fonction de rafraîchissement
  function handleRefresh() {
    if (iframeRef.current) {
      setIsRefreshing(true);
      iframeRef.current.src = iframeRef.current.src;
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  }

  // Ouvrir dans un nouvel onglet
  function handleOpenNewTab() {
    if (iframeRef.current) {
      window.open(iframeRef.current.src, '_blank');
    }
  }

  // Largeurs selon le mode device
  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed top-0 right-0 h-screen bg-white border-l-2 border-slate-200 shadow-2xl z-40 flex flex-col ${
            isFullWidth ? 'w-full' : 'w-1/2'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Prévisualisation en direct</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-xs bg-white">
                    {selectedLanguage.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    Mise à jour automatique
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Device mode selector */}
              <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-2 rounded transition-colors ${
                    deviceMode === 'desktop'
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  title="Mode Desktop"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-2 rounded transition-colors ${
                    deviceMode === 'tablet'
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  title="Mode Tablet"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-2 rounded transition-colors ${
                    deviceMode === 'mobile'
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  title="Mode Mobile"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Fullwidth toggle */}
              <Button
                onClick={() => setIsFullWidth(!isFullWidth)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                title={isFullWidth ? 'Mode Split' : 'Plein écran'}
              >
                {isFullWidth ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>

              {/* Refresh */}
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>

              {/* Open in new tab */}
              <Button
                onClick={handleOpenNewTab}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>

              {/* Close */}
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Iframe container */}
          <div className="flex-1 overflow-auto bg-slate-100 p-4">
            <div className={`mx-auto h-full ${deviceWidths[deviceMode]} transition-all duration-300`}>
              <div className="bg-white h-full rounded-lg shadow-xl overflow-hidden border-2 border-slate-200">
                {isRefreshing ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
                      <p className="text-slate-600">Rechargement...</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src={`/?lang=${selectedLanguage}`}
                    className="w-full h-full border-0"
                    title="Prévisualisation"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>🌐 Langue : <strong>{selectedLanguage.toUpperCase()}</strong></span>
                <span>📱 Mode : <strong className="capitalize">{deviceMode}</strong></span>
              </div>
              <span className="text-slate-400">
                Les modifications s'affichent automatiquement après sauvegarde
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
