import { motion } from 'motion/react';
import { Question } from '../../config/questions';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioCard } from '../survey/inputs/RadioCard';
import { MultiSelectChips } from '../survey/inputs/MultiSelectChips';
import { ScoreSelector } from '../survey/inputs/ScoreSelector';
import { useI18n } from '../../hooks/useI18n';
import { 
  Building2, 
  Calendar, 
  Users, 
  Globe, 
  FileText,
  Mail
} from 'lucide-react';

interface QuestionPreviewProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  delay?: number;
}

// Map question codes to icons for visual enhancement
const QUESTION_ICONS: Record<string, any> = {
  q1_nom: Building2,
  q2_annee: Calendar,
  q3_taille: Users,
  q5_pays: Globe,
  q7_origine: Globe,
  q8_destinations: Globe,
  email: Mail
};

export function QuestionPreview({ question, value, onChange, delay = 0 }: QuestionPreviewProps) {
  const { t } = useI18n();
  const Icon = QUESTION_ICONS[question.code] || FileText;

  switch (question.type) {
    case 'text':
    case 'number':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label htmlFor={question.code} className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id={question.code}
              type={question.type}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              required={question.required}
              min={question.type === 'number' ? 1900 : undefined}
              max={question.type === 'number' ? 2025 : undefined}
              className="pl-12 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl h-12"
            />
          </div>
        </motion.div>
      );

    case 'email':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label htmlFor={question.code} className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id={question.code}
              type="email"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              required={question.required}
              className="pl-12 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl h-12"
            />
          </div>
        </motion.div>
      );

    case 'textarea':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label htmlFor={question.code} className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Textarea
            id={question.code}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            required={question.required}
            rows={4}
            className="border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl resize-none"
          />
        </motion.div>
      );

    case 'radio':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {question.options?.map((option, optIndex) => (
              <div
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  value === option.value
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.icon && (
                    <div className={`p-2 rounded-lg ${
                      value === option.value ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {option.icon}
                    </div>
                  )}
                  <span className={value === option.value ? 'text-cyan-900' : 'text-slate-700'}>
                    {option.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );

    case 'multi-select':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {question.code === 'q4_secteurs' && (
            <p className="text-slate-500 text-sm">{t('helper.select_up_to_3', 'Sélectionnez jusqu\'à 3 secteurs')}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {question.options?.map((option) => {
              const isSelected = (value || []).includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const currentValues = value || [];
                    const newValues = isSelected
                      ? currentValues.filter((v: string) => v !== option.value)
                      : question.code === 'q4_secteurs' && currentValues.length >= 3
                      ? currentValues
                      : [...currentValues, option.value];
                    onChange(newValues);
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-300'
                  }`}
                >
                  {option.icon && <span className="inline-block mr-2">{option.icon}</span>}
                  {option.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      );

    case 'score':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="space-y-3"
        >
          <Label className="text-slate-900 block">
            {question.label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="flex items-center justify-between gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => onChange(score)}
                className={`w-12 h-12 rounded-xl text-sm transition-all ${
                  value === score
                    ? score >= 7
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-110'
                      : score >= 4
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg scale-110'
                      : 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg scale-110'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Pas du tout intéressé</span>
            <span>Extrêmement intéressé</span>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
