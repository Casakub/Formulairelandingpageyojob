import { motion } from 'motion/react';
import { Globe, Users, MapPin } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';
import type { RespondentType } from '../../../types/survey';

interface Section2DetachementProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

// Map des titres selon le profil
const SECTION_TITLES: Record<RespondentType, string> = {
  agency: 'Détachement européen',
  client: 'Recrutement & Besoins',
  worker: 'Vos missions',
};

export function Section2Detachement({ formData, updateFormData, respondentType }: Section2DetachementProps) {
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
        icon={Globe}
        title={t('nav.section2', title)}
        description={t('section2.description', '7 questions • 3 min')}
        gradient="from-cyan-500 to-blue-500"
      />

      <MultiProfileQuestionRenderer
        sectionNumber={2}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}