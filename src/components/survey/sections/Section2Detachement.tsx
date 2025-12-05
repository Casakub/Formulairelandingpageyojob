import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';

interface Section2DetachementProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section2Detachement({ formData, updateFormData }: Section2DetachementProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Globe}
        title={t('nav.section2', 'Détachement européen')}
        description={t('section2.description', '7 questions • 3 min')}
        gradient="from-cyan-500 to-blue-500"
      />

      <DynamicQuestionRenderer
        sectionNumber={2}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}
