import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';

interface Section4InteretProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section4Interet({ formData, updateFormData }: Section4InteretProps) {
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
        title={t('nav.section4', 'Votre intérêt pour YoJob')}
        description={t('section4.description', '6 questions • 3 min')}
        gradient="from-yellow-500 to-orange-500"
      />

      <DynamicQuestionRenderer
        sectionNumber={4}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}
