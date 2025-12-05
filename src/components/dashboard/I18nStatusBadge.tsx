import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Languages, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { fetchI18nStats } from '../../lib/i18n-api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function I18nStatusBadge() {
  const [stats, setStats] = useState<{
    questions: { total: number; validated: number; progress: number };
    ui: { total: number; validated: number; progress: number };
    countries: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchI18nStats();
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <Badge variant="outline" className="border-slate-300">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        Chargement...
      </Badge>
    );
  }

  if (!stats) {
    return (
      <Badge variant="outline" className="border-red-300 text-red-700">
        <AlertCircle className="w-3 h-3 mr-1" />
        i18n inactif
      </Badge>
    );
  }

  const totalProgress = Math.round((stats.questions.progress + stats.ui.progress) / 2);
  const isFullyConfigured = stats.questions.progress === 100 && stats.ui.progress === 100;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Badge
              className={`${
                isFullyConfigured
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                  : totalProgress > 50
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0'
              } cursor-help`}
            >
              {isFullyConfigured ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <Languages className="w-3 h-3 mr-1" />
              )}
              i18n {totalProgress}%
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-600">Questions</span>
              <span className="text-xs font-semibold">
                {stats.questions.validated}/{stats.questions.total} ({stats.questions.progress}%)
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-600">Textes UI</span>
              <span className="text-xs font-semibold">
                {stats.ui.validated}/{stats.ui.total} ({stats.ui.progress}%)
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-600">Pays</span>
              <span className="text-xs font-semibold">
                {stats.countries}/30
              </span>
            </div>
            {!isFullyConfigured && (
              <p className="text-xs text-slate-500 pt-2 border-t">
                💡 Accédez à l'onglet Traductions pour compléter
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
