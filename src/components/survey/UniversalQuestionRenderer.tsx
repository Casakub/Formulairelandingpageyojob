/**
 * 🎯 RENDERER DE QUESTIONS UNIVERSEL
 * 
 * Composant intelligent qui affiche n'importe quelle question
 * en fonction de son type, avec validation et traductions
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import type { QuestionConfig } from '../../config/survey-questions-COMPLETE';
import type { RespondentType } from '../../types/survey';
import { getTranslation } from '../../src/i18n';
import { validateField } from '../../config/survey-validations';
import { ScoreSelector } from './inputs/ScoreSelector';

export interface UniversalQuestionRendererProps {
  question: QuestionConfig;
  value: any;
  onChange: (value: any) => void;
  profileType: RespondentType;
  language: string;
  showValidation?: boolean;
  disabled?: boolean;
  className?: string;
}

export function UniversalQuestionRenderer({
  question,
  value,
  onChange,
  profileType,
  language,
  showValidation = true,
  disabled = false,
  className = '',
}: UniversalQuestionRendererProps) {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Get translations
  const label = getTranslation(language, question.labelKey, profileType);
  const placeholder = question.placeholderKey
    ? getTranslation(language, question.placeholderKey, profileType)
    : undefined;
  const description = question.descriptionKey
    ? getTranslation(language, question.descriptionKey)
    : undefined;

  // Translate options
  const translatedOptions = question.options?.map(opt => ({
    ...opt,
    label: getTranslation(language, opt.labelKey),
  }));

  // Validation en temps réel
  useEffect(() => {
    if (!touched || !showValidation) return;

    setIsValidating(true);
    const timer = setTimeout(() => {
      const result = validateField(question.fieldName, value, language);
      setError(result.valid ? null : result.error);
      setIsValidating(false);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [value, touched, showValidation, question.fieldName, language]);

  const handleChange = (newValue: any) => {
    if (!touched) setTouched(true);
    onChange(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  // Render based on question type
  const renderInput = () => {
    switch (question.type) {
      case 'text':
      case 'email':
        return (
          <Input
            type={question.type}
            id={question.id}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={question.required}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            id={question.id}
            value={value || ''}
            onChange={(e) => handleChange(parseInt(e.target.value) || '')}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={question.required}
            min={question.validation?.min}
            max={question.validation?.max}
            step={question.validation?.step}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={question.id}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={question.required}
            maxLength={question.validation?.maxLength || 2000}
            rows={6}
            className={`resize-none ${error ? 'border-red-500' : ''}`}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={handleChange}
            disabled={disabled}
            className="space-y-3"
          >
            {translatedOptions?.map((opt) => (
              <motion.div
                key={opt.value}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all cursor-pointer"
                onClick={() => !disabled && handleChange(opt.value)}
              >
                <RadioGroupItem value={opt.value} id={`${question.id}-${opt.value}`} />
                <Label
                  htmlFor={`${question.id}-${opt.value}`}
                  className="flex-1 cursor-pointer text-slate-700"
                >
                  {opt.icon && <span className="mr-2">{opt.icon}</span>}
                  {opt.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        );

      case 'score':
        return (
          <ScoreSelector
            value={value || 0}
            onChange={handleChange}
            min={question.validation?.min || 0}
            max={question.validation?.max || 10}
            disabled={disabled}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-400 transition-all">
            <Checkbox
              id={question.id}
              checked={!!value}
              onCheckedChange={handleChange}
              disabled={disabled}
            />
            <Label
              htmlFor={question.id}
              className="flex-1 cursor-pointer text-slate-700"
            >
              {label}
            </Label>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Type de question non supporté: <code>{question.type}</code>
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`space-y-3 ${className}`}
    >
      {/* Label */}
      {question.type !== 'checkbox' && (
        <div className="flex items-center justify-between">
          <Label htmlFor={question.id} className="text-slate-900 flex items-center gap-2">
            {label}
            {question.required && (
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 border-red-200">
                Obligatoire
              </Badge>
            )}
          </Label>
          
          {/* Character counter for textarea */}
          {question.type === 'textarea' && value && (
            <span className="text-xs text-slate-500">
              {value.length} / {question.validation?.maxLength || 2000}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-slate-600 -mt-1">{description}</p>
      )}

      {/* Input */}
      <div className="relative">
        {renderInput()}
        
        {/* Validation spinner */}
        {isValidating && (
          <div className="absolute right-3 top-3">
            <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && touched && showValidation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Helper text for specific types */}
      {question.type === 'score' && !error && (
        <p className="text-xs text-slate-500 italic">
          {getTranslation(language, 'common.score_hint', profileType) || 
           'Cliquez sur un chiffre pour sélectionner votre réponse'}
        </p>
      )}
    </motion.div>
  );
}