import { motion } from 'motion/react';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface MultiSelectChipsProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
}

export function MultiSelectChips({ options, selected, onChange, maxSelections }: MultiSelectChipsProps) {
  // Ensure selected is always an array
  const selectedArray = Array.isArray(selected) ? selected : [];
  
  const handleToggle = (value: string) => {
    if (selectedArray.includes(value)) {
      onChange(selectedArray.filter(v => v !== value));
    } else {
      if (!maxSelections || selectedArray.length < maxSelections) {
        onChange([...selectedArray, value]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => {
        const isSelected = selectedArray.includes(option.value);
        const isDisabled = !isSelected && maxSelections && selectedArray.length >= maxSelections;

        return (
          <motion.button
            key={option.value}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            onClick={() => !isDisabled && handleToggle(option.value)}
            disabled={isDisabled}
            className={`px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
              isSelected
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : isDisabled
                ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10'
            }`}
          >
            {option.icon && <span>{option.icon}</span>}
            <span className="text-sm">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}