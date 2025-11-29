import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';

interface Section5VisionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section5Vision({ formData, updateFormData }: Section5VisionProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Sparkles}
        title={t('nav.section5', 'Vision du futur')}
        description={t('section5.description', '2 questions • 1 min')}
        gradient="from-purple-500 to-pink-500"
      />

      <DynamicQuestionRenderer
        sectionNumber={5}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}
