/**
 * 🎯 FORMULAIRE D'ENQUÊTE MODERNISÉ
 * 
 * Formulaire intelligent multi-profils avec :
 * - Questions dynamiques basées sur /config/survey-questions-COMPLETE.ts
 * - Validation Zod en temps réel
 * - Traductions 22 langues
 * - Progression automatique
 * - Sauvegarde automatique localStorage
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import type { RespondentType } from '../../types/survey';
import type { SupportedLanguage } from '../../src/i18n';
import { 
  getQuestionsBySection,
  calculateSectionProgress,
  calculateProgress,
  isSectionComplete,
  getFormStats,
  validateFormData,
  SECTION_TITLES,
} from '../../lib/survey-helpers';
import { 
  validateResponseByProfile,
  formatZodErrors,
  createEmptyResponse,
} from '../../lib/survey-response-schema';
import { getTranslation } from '../../src/i18n';
import { UniversalQuestionRenderer } from './UniversalQuestionRenderer';
import { LanguageSelectorEnhanced } from './LanguageSelectorEnhanced';
import { saveResponsePublic } from '../../lib/supabase-public';

export interface ModernSurveyFormProps {
  profileType: RespondentType;
  onComplete?: (data: any) => void;
  onProfileChange?: () => void;
  initialLanguage?: SupportedLanguage;
}

export function ModernSurveyForm({
  profileType,
  onComplete,
  onProfileChange,
  initialLanguage = 'fr',
}: ModernSurveyFormProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem(`survey_${profileType}_autosave`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }
    return { ...createEmptyResponse(profileType), profileType, language };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  // Get questions by section
  const sectionMap = useMemo(
    () => getQuestionsBySection(profileType, formData),
    [profileType, formData]
  );

  // Calculate progress
  const sectionProgress = useMemo(
    () => calculateSectionProgress(formData, profileType),
    [formData, profileType]
  );

  const globalProgress = useMemo(
    () => calculateProgress(formData, profileType),
    [formData, profileType]
  );

  const stats = useMemo(
    () => getFormStats(formData, profileType),
    [formData, profileType]
  );

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`survey_${profileType}_autosave`, JSON.stringify(formData));
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [formData, profileType]);

  // Handle field change
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
      language, // Always update language
    }));
  };

  // Navigate to section
  const goToSection = (section: number) => {
    if (section >= 1 && section <= 6) {
      setCurrentSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle next section
  const handleNextSection = () => {
    // Validate current section
    const { valid, errors } = validateFormData(formData, profileType);
    
    if (!valid) {
      const errorFields = Object.keys(errors);
      const currentQuestions = sectionMap.get(currentSection) || [];
      const hasErrorInCurrentSection = currentQuestions.some(q => 
        errorFields.includes(q.fieldName)
      );

      if (hasErrorInCurrentSection) {
        toast.error('Veuillez remplir tous les champs obligatoires de cette section');
        return;
      }
    }

    if (currentSection < 6) {
      goToSection(currentSection + 1);
    }
  };

  // Handle previous section
  const handlePreviousSection = () => {
    if (currentSection > 1) {
      goToSection(currentSection - 1);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    // Final validation with Zod
    const zodResult = validateResponseByProfile(profileType, formData);

    if (!zodResult.success) {
      const errors = formatZodErrors(zodResult.errors!);
      console.error('Validation errors:', errors);
      
      toast.error(
        <div>
          <p className="font-medium">Formulaire invalide</p>
          <ul className="text-xs mt-1">
            {Object.entries(errors).slice(0, 3).map(([field, msg]) => (
              <li key={field}>• {msg}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate completion time
      const completionTime = Math.round((Date.now() - startTime) / 1000); // seconds

      // Prepare data for submission
      const submissionData = {
        ...zodResult.data,
        completion_time_seconds: completionTime,
        created_at: new Date().toISOString(),
      };

      console.log('Submitting survey response:', submissionData);

      // Submit to Supabase
      const result = await saveResponsePublic(submissionData);

      if (result.success) {
        // Clear localStorage
        localStorage.removeItem(`survey_${profileType}_autosave`);
        
        toast.success('Merci pour votre participation ! 🎉', { duration: 5000 });
        
        // Call onComplete callback
        if (onComplete) {
          onComplete(submissionData);
        }
      } else {
        throw new Error(result.error || 'Erreur lors de la soumission');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(`Erreur: ${error.message}`, { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestions = sectionMap.get(currentSection) || [];
  const sectionTitle = SECTION_TITLES[currentSection];
  const currentSectionProgress = sectionProgress.get(currentSection) || 0;
  const isCurrentSectionComplete = isSectionComplete(currentSection, formData, profileType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-slate-900">Enquête YoJob</h1>
              <p className="text-sm text-slate-600">
                Profil: <span className="text-cyan-600 uppercase">{profileType}</span>
                {onProfileChange && (
                  <button
                    onClick={onProfileChange}
                    className="ml-2 text-xs text-blue-600 hover:underline"
                  >
                    Changer
                  </button>
                )}
              </p>
            </div>

            <LanguageSelectorEnhanced
              currentLanguage={language}
              onLanguageChange={setLanguage}
              variant="compact"
            />
          </div>

          {/* Global progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Progression globale</span>
              <span className="text-cyan-600 font-medium">{globalProgress}%</span>
            </div>
            <Progress value={globalProgress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{stats.answeredRequired} / {stats.requiredQuestions} questions obligatoires</span>
              <span>{stats.answeredQuestions} / {stats.totalQuestions} total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map(section => {
            const title = SECTION_TITLES[section];
            const progress = sectionProgress.get(section) || 0;
            const isActive = currentSection === section;
            const isComplete = progress === 100;

            return (
              <button
                key={section}
                onClick={() => goToSection(section)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-50 shadow-md'
                    : isComplete
                    ? 'border-green-400 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl mb-1">{title.icon}</div>
                <div className="text-xs text-slate-900 mb-1">{title.fr}</div>
                <div className={`text-xs ${isComplete ? 'text-green-600' : 'text-slate-500'}`}>
                  {progress}%
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-slate-200 shadow-xl">
              <CardContent className="p-8">
                {/* Section Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{sectionTitle.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-slate-900">{sectionTitle.fr}</h2>
                      <p className="text-sm text-slate-600">
                        Section {currentSection} / 6
                      </p>
                    </div>
                    {isCurrentSectionComplete && (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    )}
                  </div>

                  {/* Section progress */}
                  <Progress value={currentSectionProgress} className="h-1.5" />
                </div>

                {/* Questions */}
                <div className="space-y-8">
                  {currentQuestions.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                      <p>Aucune question pour cette section</p>
                    </div>
                  ) : (
                    currentQuestions.map((question) => (
                      <UniversalQuestionRenderer
                        key={question.id}
                        question={question}
                        value={formData[question.fieldName]}
                        onChange={(value) => handleFieldChange(question.fieldName, value)}
                        profileType={profileType}
                        language={language}
                        showValidation={true}
                      />
                    ))
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={handlePreviousSection}
                    disabled={currentSection === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </Button>

                  {currentSection < 6 ? (
                    <Button
                      onClick={handleNextSection}
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !stats.isComplete}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}