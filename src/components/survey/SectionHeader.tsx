import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import type { RespondentType } from '../../types/survey';
import { useI18n } from '../../src/i18n';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  isPremium?: boolean;
  respondentType?: RespondentType;
  sectionNumber?: number;
}

export function SectionHeader({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  isPremium,
  respondentType = 'agency',
  sectionNumber
}: SectionHeaderProps) {
  const { t, translate } = useI18n();
  
  // Si sectionNumber est fourni, on utilise les traductions i18n avec profil
  let displayTitle = title;
  let displayDescription = description;
  
  if (sectionNumber) {
    // Chercher d'abord dans sectionContent avec profil
    const titleKey = `sectionContent.${sectionNumber}.${respondentType}.title`;
    const descKey = `sectionContent.${sectionNumber}.${respondentType}.description`;
    
    displayTitle = translate(titleKey, { fallback: title });
    displayDescription = translate(descKey, { fallback: description });
  }

  if (isPremium) {
    return (
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl" />
        <div className="relative flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-1">{displayTitle}</h3>
            <p className="text-cyan-300 text-sm">{displayDescription}</p>
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
        <h3 className="text-white mb-1">{displayTitle}</h3>
        <p className="text-white/60 text-sm">{displayDescription}</p>
      </div>
    </motion.div>
  );
}