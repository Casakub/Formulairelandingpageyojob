import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ScoreSelectorProps {
  value: number;
  onChange: (score: number) => void;
}

export function ScoreSelector({ value, onChange }: ScoreSelectorProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (value >= 8) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [value]);

  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <motion.button
            key={n}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(n)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all relative ${
              value === n
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30 scale-110'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {value === n && showConfetti && (
              <>
                <motion.span
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute text-2xl"
                >
                  ✨
                </motion.span>
                <motion.span
                  initial={{ scale: 0, opacity: 1, rotate: 0 }}
                  animate={{ scale: 2, opacity: 0, rotate: 360 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute text-2xl"
                >
                  🎉
                </motion.span>
              </>
            )}
            <span className="relative z-10">{n}</span>
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-white/40 mt-3 px-1">
        <span>Pas intéressé</span>
        <span>Très intéressé</span>
      </div>
    </div>
  );
}
