import { motion } from 'motion/react';
import { useI18n } from '../../hooks/useI18n';

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
  progress: number;
}

export function ProgressBar({ currentSection, totalSections, progress }: ProgressBarProps) {
  const { t } = useI18n();
  
  const questionsPerSection = [4, 7, 6, 6, 2, 1];
  const totalQuestions = questionsPerSection.reduce((a, b) => a + b, 0); // 26
  
  const currentQuestion = (() => {
    let total = 0;
    for (let i = 0; i < currentSection - 1; i++) {
      total += questionsPerSection[i];
    }
    return total + 1;
  })();

  return (
    <div className="mb-4 md:mb-8">
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/30"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 md:mt-3">
        <p className="text-white/60 text-xs md:text-sm">
          {t('progress.section', 'Section')} {currentSection}/{totalSections} • {t('progress.question', 'Question')} {currentQuestion}/{totalQuestions}
        </p>
        <p className="text-cyan-400 text-xs md:text-sm">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}