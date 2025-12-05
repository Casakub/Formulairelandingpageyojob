import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  isPremium?: boolean;
}

export function SectionHeader({ icon: Icon, title, description, gradient, isPremium }: SectionHeaderProps) {
  if (isPremium) {
    return (
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl" />
        <div className="relative flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-1">{title}</h3>
            <p className="text-cyan-300 text-sm">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 mb-8"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="text-white mb-1">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
