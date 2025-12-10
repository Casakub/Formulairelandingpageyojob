import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App-Survey-Original';
import { MultiProfileQuestionRenderer } from '../MultiProfileQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';
import type { RespondentType } from '../../../types/survey';

interface Section6ContactProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  respondentType: RespondentType;
}

export function Section6Contact({ formData, updateFormData, respondentType }: Section6ContactProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Mail}
        title={t('nav.section6', 'Contact')}
        description={t('section6.description', '1 question • 1 min')}
        gradient="from-green-500 to-emerald-500"
        respondentType={respondentType}
        sectionNumber={6}
      />

      <MultiProfileQuestionRenderer
        sectionNumber={6}
        respondentType={respondentType}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}