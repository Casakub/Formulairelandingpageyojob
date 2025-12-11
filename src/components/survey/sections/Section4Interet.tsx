import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../src/i18n';
import type { RespondentType } from '../../../types/survey';

interface Section4InteretProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

export function Section4Interet({ formData, updateFormData, respondentType }: Section4InteretProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Star}
        title={t('nav.section4', 'Intérêt pour YoJob')}
        description={t('section4.description', '6 questions • 3 min')}
        gradient="from-yellow-500 to-orange-500"
        respondentType={respondentType}
        sectionNumber={4}
        isPremium
      />

      <MultiProfileQuestionRenderer
        sectionNumber={4}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}