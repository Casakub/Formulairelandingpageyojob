import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';
import type { RespondentType } from '../../../types/survey';

interface Section5VisionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

export function Section5Vision({ formData, updateFormData, respondentType }: Section5VisionProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Lightbulb}
        title={t('nav.section5', 'Vision Future')}
        description={t('section5.description', '2 questions • 1 min')}
        gradient="from-pink-500 to-rose-500"
        respondentType={respondentType}
        sectionNumber={5}
      />

      <MultiProfileQuestionRenderer
        sectionNumber={5}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}