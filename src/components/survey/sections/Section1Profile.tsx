import { motion } from 'motion/react';
import { Building2, Briefcase, UserCheck } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';
import type { RespondentType } from '../../../types/survey';

interface Section1ProfileProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

// Map des icônes selon le profil
const PROFILE_ICONS: Record<RespondentType, any> = {
  agency: Building2,
  client: Briefcase,
  worker: UserCheck,
};

// Map des titres selon le profil
const PROFILE_TITLES: Record<RespondentType, string> = {
  agency: 'Profil de votre agence',
  client: 'Profil de votre entreprise',
  worker: 'Votre profil',
};

export function Section1Profile({ formData, updateFormData, respondentType }: Section1ProfileProps) {
  const { t } = useI18n();
  const Icon = PROFILE_ICONS[respondentType];
  const title = PROFILE_TITLES[respondentType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Icon}
        title={t('nav.section1', title)}
        description={t('section1.description', '4 questions • 2 min')}
        gradient="from-blue-500 to-cyan-500"
        respondentType={respondentType}
        sectionNumber={1}
      />

      <MultiProfileQuestionRenderer
        sectionNumber={1}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}