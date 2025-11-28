import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';

interface Section3BesoinsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section3Besoins({ formData, updateFormData }: Section3BesoinsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Briefcase}
        title="Vos besoins"
        description="6 questions • 2 min"
        gradient="from-violet-500 to-purple-500"
      />

      <DynamicQuestionRenderer
        sectionNumber={3}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}
