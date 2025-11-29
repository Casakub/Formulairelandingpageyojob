import { motion } from 'motion/react';
import { Mail, Shield, FileText } from 'lucide-react';
import { Label } from '../../ui/label';
import { SectionHeader } from '../SectionHeader';
import { FormData } from '../../../App';
import { DynamicQuestionRenderer } from '../DynamicQuestionRenderer';
import { useI18n } from '../../../hooks/useI18n';

interface Section6ContactProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function Section6Contact({ formData, updateFormData }: Section6ContactProps) {
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
        title={t('nav.section6', 'Restons en contact')}
        description={t('section6.description', '1 question • 1 min')}
        gradient="from-green-500 to-emerald-500"
      />

      <div className="space-y-8">
        {/* Email field from DynamicQuestionRenderer */}
        <DynamicQuestionRenderer
          sectionNumber={6}
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Consent checkboxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Contact consent */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={formData.autorise_contact}
              onChange={(e) => updateFormData({ autorise_contact: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-white mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                J'autorise YoJob à me recontacter
              </div>
              <p className="text-white/60 text-sm">
                Pour discuter de vos besoins et vous présenter notre solution
              </p>
            </div>
          </label>

          {/* Report consent */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-400/30 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={formData.souhaite_rapport}
              onChange={(e) => updateFormData({ souhaite_rapport: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-white mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                Je souhaite recevoir le rapport de l'étude 2025
              </div>
              <p className="text-white/60 text-sm">
                Recevez en avant-première les insights du marché européen
              </p>
            </div>
          </label>
        </motion.div>

        {/* Privacy notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20"
        >
          <p className="text-white/70 text-sm">
            <Shield className="w-4 h-4 inline mr-2 text-cyan-400" />
            Vos données sont sécurisées et conformes au RGPD. Elles ne seront jamais vendues à des tiers.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
