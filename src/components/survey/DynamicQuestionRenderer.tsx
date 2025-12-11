import { motion } from 'motion/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Building2, Factory, Tractor, UtensilsCrossed, Heart, Laptop, FileText, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { MultiSelectChips } from './inputs/MultiSelectChips';
import { ScoreSelector } from './inputs/ScoreSelector';
import { useI18n } from '../../src/i18n';
import { useQuestions } from '../../context/QuestionsContext';
import type { Question } from '../../context/QuestionsContext';

const Icon1 = Building2;

interface DynamicQuestionRendererProps {
  sectionNumber: number;
  formData: Record<string, any>;
  updateFormData: (updates: Record<string, any>) => void;
}

// Map question codes to icons for visual enhancement
const QUESTION_ICONS: Record<string, any> = {
  q1_nom: Icon1,
  q2_annee: Factory,
  q3_taille: Tractor,
  q5_pays: UtensilsCrossed,
  q7_origine: Heart,
  q8_destinations: Laptop,
  email: Mail
};

export function DynamicQuestionRenderer({
  sectionNumber,
  formData,
  updateFormData
}: DynamicQuestionRendererProps) {
  const { getVisibleQuestionsBySection } = useQuestions();
  const { t, tQuestion, tPlaceholder, tOptions } = useI18n();
  const questions = getVisibleQuestionsBySection(sectionNumber);

  const shouldShowQuestion = (question: Question) => {
    if (!question.conditional) return true;
    
    const dependentValue = formData[question.conditional.dependsOn];
    return dependentValue === question.conditional.showWhen;
  };

  const getIcon = (questionCode: string) => {
    return QUESTION_ICONS[questionCode] || FileText;
  };

  const renderQuestion = (question: Question, index: number) => {
    if (!shouldShowQuestion(question)) return null;

    const value = formData[question.code];
    const onChange = (newValue: any) => {
      updateFormData({ [question.code]: newValue });
    };
    
    const Icon = getIcon(question.code);
    const baseDelay = index * 0.1;

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
            <Label htmlFor={question.code} className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                id={question.code}
                type={question.type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={tPlaceholder(question.id, question.placeholder)}
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
            <Label htmlFor={question.code} className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                id={question.code}
                type="email"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={tPlaceholder(question.id, question.placeholder)}
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
            <Label htmlFor={question.code} className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Textarea
              id={question.code}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={tPlaceholder(question.id, question.placeholder)}
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
            <Label className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {tOptions(question.id, question.options)?.map((option, optIndex) => (
                <RadioCard
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  icon={option.icon}
                  selected={value === option.value}
                  onSelect={() => onChange(option.value)}
                  delay={baseDelay + 0.1 + optIndex * 0.05}
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
            <Label className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            {question.code === 'q4_secteurs' && (
              <p className="text-white/60 text-sm mb-4">{t('helper.select_up_to_3', 'Sélectionnez jusqu\'à 3 secteurs')}</p>
            )}
            <MultiSelectChips
              options={tOptions(question.id, question.options) || []}
              selected={value || []}
              onChange={onChange}
              maxSelections={question.code === 'q4_secteurs' ? 3 : undefined}
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
            <Label className="text-white mb-3 block">
              {tQuestion(question.id, question.label)}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <ScoreSelector
              value={value || 0}
              onChange={onChange}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {questions.map((question, index) => renderQuestion(question, index))}
    </div>
  );
}