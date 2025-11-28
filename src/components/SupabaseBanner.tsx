import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { Button } from './ui/button';

export function SupabaseBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  
  // Don't show if Supabase is configured or if banner was dismissed
  if (isSupabaseConfigured() || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm sm:text-base">
                <span className="font-semibold">Mode Démonstration</span> - Supabase n'est pas configuré. 
                <span className="hidden sm:inline"> Les réponses ne seront pas sauvegardées.</span>
              </p>
              <p className="text-xs mt-1 opacity-90 hidden md:block">
                📖 Voir <span className="underline font-medium">FIGMA_MAKE_ENV.md</span> pour configurer (2 minutes)
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-white hover:bg-white/20 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
