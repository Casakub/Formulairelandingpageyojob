import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Props {
  current: number;
  max?: number;
  recommended?: number;
  sourceLength?: number;
  showComparison?: boolean;
}

export function CharacterCounter({
  current,
  max,
  recommended,
  sourceLength,
  showComparison = true
}: Props) {
  // Calculate percentage of max
  const percentage = max ? (current / max) * 100 : 0;
  
  // Determine status
  let status: 'good' | 'warning' | 'error' | 'info' = 'info';
  if (max && current > max) {
    status = 'error';
  } else if (max && percentage > 90) {
    status = 'warning';
  } else if (current > 0) {
    status = 'good';
  }

  // Calculate difference with source
  const diff = sourceLength ? current - sourceLength : 0;
  const diffPercentage = sourceLength ? ((diff / sourceLength) * 100) : 0;

  // Color based on status
  const getColor = () => {
    switch (status) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-orange-600';
      case 'good':
        return 'text-green-600';
      default:
        return 'text-slate-500';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'error':
        return <AlertCircle className="w-3 h-3" />;
      case 'warning':
        return <AlertCircle className="w-3 h-3" />;
      case 'good':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex items-center gap-3 text-xs">
      {/* Character count */}
      <div className={`flex items-center gap-1 ${getColor()}`}>
        {getIcon()}
        <span>
          {current} {max && `/ ${max}`} caractères
        </span>
      </div>

      {/* Progress bar (if max defined) */}
      {max && (
        <div className="flex-1 max-w-32">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full rounded-full ${
                status === 'error' ? 'bg-red-500' :
                status === 'warning' ? 'bg-orange-500' :
                status === 'good' ? 'bg-green-500' :
                'bg-slate-400'
              }`}
            />
          </div>
        </div>
      )}

      {/* Recommended length */}
      {recommended && current > recommended && (
        <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
          Recommandé: ~{recommended}
        </Badge>
      )}

      {/* Comparison with source */}
      {showComparison && sourceLength && sourceLength > 0 && (
        <div className="flex items-center gap-1 text-slate-500">
          <span>|</span>
          <span>
            Source: {sourceLength}
            {diff !== 0 && (
              <span className={diff > 0 ? 'text-orange-600' : 'text-green-600'}>
                {' '}({diff > 0 ? '+' : ''}{diff})
              </span>
            )}
          </span>
          {Math.abs(diffPercentage) > 30 && (
            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 ml-1">
              {diffPercentage > 0 ? '+' : ''}{diffPercentage.toFixed(0)}%
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
