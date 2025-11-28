import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';

interface Section1ProfileProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section1Profile({ formData, updateFormData }: Section1ProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeader
        icon={Building2}
        title="Profil de votre agence"
        description="4 questions • 2 min"
        gradient="from-blue-500 to-cyan-500"
      />

      <DynamicQuestionRenderer
        sectionNumber={1}
        formData={formData}
        updateFormData={updateFormData}
      />
    </motion.div>
  );
}
