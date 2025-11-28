import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';

interface Section4InteretProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section4Interet({ formData, updateFormData }: Section4InteretProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Star}
        title="Votre intérêt pour YoJob"
        description="6 questions • 3 min"
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
