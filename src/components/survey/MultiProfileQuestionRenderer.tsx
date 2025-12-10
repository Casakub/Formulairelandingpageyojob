/**
 * 🎯 MULTI-PROFILE QUESTION RENDERER
 * 
 * Renderer de questions qui s'adapte automatiquement au type de répondant
 * Utilise la nouvelle configuration centralisée dans /config/survey-questions.ts
 */

import { motion } from 'motion/react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioCard } from './inputs/RadioCard';
import { MultiSelectChips } from './inputs/MultiSelectChips';
import { ScoreSelector } from './inputs/ScoreSelector';
import { Checkbox } from '../ui/checkbox';
import { useI18n } from '../../hooks/useI18n';
import { useQuestionVisibility } from '../../hooks/useQuestionVisibility';
import type { RespondentType } from '../../types/survey';
import type { FormData } from '../../App-Survey-Original';
import { 
  Building2, 
  Calendar, 
  Users, 
  Globe, 
  FileText,
  Mail,
  Briefcase,
  UserCheck,
  MapPin,
  TrendingUp,
  DollarSign,
  Settings,
  Heart
} from 'lucide-react';

interface MultiProfileQuestionRendererProps {
  sectionNumber: number;
  respondentType: RespondentType;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

// Map des icônes par fieldName pour visuel amélioré
const FIELD_ICONS: Record<string, any> = {
  q1_nom: Building2,
  q2_annee: Calendar,
  q3_taille: Users,
  q4_secteurs: Briefcase,
  q5_pays: Globe,
  q6_volume: TrendingUp,
  q7_origine: MapPin,
  q8_destinations: MapPin,
  q9_defi: Settings,
  q10_gestion: Settings,
  q11_incidents: FileText,
  q12_budget: DollarSign,
  q13_manque_gagner: DollarSign,
  q14_risques: FileText,
  q15_probleme: FileText,
  q16_erp: Settings,
  q17_migration: FileText,
  q18_score: Heart,
  q19_features: UserCheck,
  q20_prix: DollarSign,
  q21_budget_mensuel: DollarSign,
  q22_mvp: FileText,
  q23_role: UserCheck,
  q24_evolution: Globe,
  q25_besoins: FileText,
  email: Mail,
};

export function MultiProfileQuestionRenderer({
  sectionNumber,
  respondentType,
  formData,
  updateFormData,
}: MultiProfileQuestionRendererProps) {
  const { t } = useI18n();
  
  // Récupère les questions visibles pour cette section et ce profil
  const { questions } = useQuestionVisibility({
    sectionId: sectionNumber,
    respondentType,
    formData,
  });

  const getIcon = (fieldName: string) => {
    return FIELD_ICONS[fieldName] || FileText;
  };

  const renderQuestion = (question: any, index: number) => {
    const value = formData[question.fieldName as keyof FormData];
    const onChange = (newValue: any) => {
      updateFormData({ [question.fieldName]: newValue } as Partial<FormData>);
    };
    
    const Icon = getIcon(question.fieldName);
    const baseDelay = index * 0.1;

    // Labels i18n avec fallback
    const label = t(question.labelKey, question.labelFallback);
    const placeholder = question.placeholderKey 
      ? t(question.placeholderKey, question.placeholderFallback || '')
      : question.placeholderFallback || '';
    const description = question.descriptionKey
      ? t(question.descriptionKey, question.descriptionFallback || '')
      : question.descriptionFallback || '';

    switch (question.type) {
      case 'text':
      case 'number':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label htmlFor={question.id} className="text-white mb-3 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                id={question.id}
                type={question.type}
                value={value as string || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={question.required}
                min={question.type === 'number' ? 1900 : undefined}
                max={question.type === 'number' ? 2025 : undefined}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl h-12"
              />
            </div>
          </motion.div>
        );

      case 'email':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label htmlFor={question.id} className="text-white mb-3 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                id={question.id}
                type="email"
                value={value as string || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={question.required}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl h-12"
              />
            </div>
          </motion.div>
        );

      case 'textarea':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label htmlFor={question.id} className="text-white mb-3 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Textarea
              id={question.id}
              value={value as string || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              required={question.required}
              rows={4}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl resize-none"
            />
          </motion.div>
        );

      case 'radio':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label className="text-white mb-4 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            {description && (
              <p className="text-cyan-200 text-sm mb-4">{description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map((option: any) => (
                <RadioCard
                  key={option.value}
                  name={question.id}
                  value={option.value}
                  label={t(option.labelKey, option.labelFallback)}
                  icon={option.icon}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                />
              ))}
            </div>
          </motion.div>
        );

      case 'multi-select':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label className="text-white mb-4 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            {description && (
              <p className="text-cyan-200 text-sm mb-4">{description}</p>
            )}
            <MultiSelectChips
              options={(question.options || []).map((opt: any) => ({
                value: opt.value,
                label: t(opt.labelKey, opt.labelFallback),
                icon: opt.icon,
              }))}
              selected={(value as string[]) || []}
              onChange={onChange}
            />
          </motion.div>
        );

      case 'score':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
          >
            <Label className="text-white mb-4 block">
              {label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            {description && (
              <p className="text-cyan-200 text-sm mb-4">{description}</p>
            )}
            <ScoreSelector
              value={(value as number) || 0}
              onChange={onChange}
              min={1}
              max={10}
            />
          </motion.div>
        );

      case 'checkbox':
        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay }}
            className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-colors"
          >
            <Checkbox
              id={question.id}
              checked={(value as boolean) || false}
              onCheckedChange={(checked) => onChange(checked)}
              className="mt-0.5 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <Label
              htmlFor={question.id}
              className="text-white cursor-pointer select-none flex-1"
            >
              {label}
              {description && (
                <span className="block text-sm text-cyan-200 mt-1">{description}</span>
              )}
            </Label>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 mt-8">
      {questions.map((question, index) => renderQuestion(question, index))}
    </div>
  );
}