import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface RadioCardProps {
  value: string;
  label: string;
  icon?: string;
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
  delay?: number;
}

export function RadioCard({ value, label, icon, subtitle, selected, onSelect, delay = 0 }: RadioCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`p-4 rounded-xl cursor-pointer transition-all text-left ${
        selected
          ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/20'
          : 'bg-white/5 border border-white/10 hover:border-cyan-400/30'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <div className="flex items-center gap-2">
              {selected && <CheckCircle className="w-4 h-4 text-cyan-400" />}
              <span className={`${selected ? 'text-white' : 'text-white/80'}`}>
                {label}
              </span>
            </div>
            {subtitle && (
              <span className="text-xs text-white/40">{subtitle}</span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
