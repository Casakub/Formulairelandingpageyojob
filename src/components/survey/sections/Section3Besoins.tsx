import { motion } from 'motion/react';
import { Briefcase, DollarSign, AlertCircle } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';
import type { RespondentType } from '../../../types/survey';

interface Section3BesoinsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

// Map des titres selon le profil
const SECTION_TITLES: Record<RespondentType, string> = {
  agency: 'Besoins & Budget',
  client: 'Budget & Délais',
  worker: 'Votre expérience',
};

export function Section3Besoins({ formData, updateFormData, respondentType }: Section3BesoinsProps) {
  const { t } = useI18n();
  const title = SECTION_TITLES[respondentType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Briefcase}
        title={t('nav.section3', title)}
        description={t('section3.description', '6 questions • 2 min')}
        gradient="from-violet-500 to-purple-500"
        respondentType={respondentType}
        sectionNumber={3}
      />

      <MultiProfileQuestionRenderer
        sectionNumber={3}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}