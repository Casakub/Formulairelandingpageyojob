# 🎯 EXEMPLES D'UTILISATION - YoJob Survey System

**Version**: 3.0.0  
**Date**: 11 Décembre 2024

Ce guide montre comment utiliser tous les helpers et schémas créés pour le formulaire d'enquête multi-profils.

---

## 📚 Table des matières

1. [Initialiser un formulaire](#1-initialiser-un-formulaire)
2. [Afficher les questions](#2-afficher-les-questions)
3. [Gérer les questions conditionnelles](#3-gérer-les-questions-conditionnelles)
4. [Calculer la progression](#4-calculer-la-progression)
5. [Valider les réponses](#5-valider-les-réponses)
6. [Traductions multilingues](#6-traductions-multilingues)
7. [Exemples complets React](#7-exemples-complets-react)

---

## 1. Initialiser un formulaire

```typescript
import { createEmptyResponse } from '@/lib/survey-response-schema';
import { getTotalQuestions } from '@/lib/survey-helpers';

function MyComponent() {
  const [profileType, setProfileType] = useState<'agency' | 'client' | 'worker'>('agency');
  const [formData, setFormData] = useState(() => createEmptyResponse(profileType));
  
  const totalQuestions = getTotalQuestions(profileType);
  
  console.log(`Formulaire ${profileType}: ${totalQuestions} questions`);
  // → "Formulaire agency: 34 questions"
}
```

---

## 2. Afficher les questions

### Option A: Liste simple

```typescript
import { getVisibleQuestions } from '@/lib/survey-helpers';
import { getTranslation } from '@/config/translations-index';

function QuestionsList() {
  const [profileType] = useState<'agency'>('agency');
  const [language] = useState<'fr'>('fr');
  
  const questions = getVisibleQuestions(profileType);
  
  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <label>
            {getTranslation(language, question.labelKey, profileType)}
          </label>
          {/* Render input based on question.type */}
        </div>
      ))}
    </div>
  );
}
```

### Option B: Par sections

```typescript
import { getQuestionsBySection, SECTION_TITLES } from '@/lib/survey-helpers';

function QuestionsBySections() {
  const [profileType] = useState<'agency'>('agency');
  const [formData] = useState({});
  
  const sectionMap = getQuestionsBySection(profileType, formData);
  
  return (
    <div>
      {Array.from(sectionMap.entries()).map(([sectionNumber, questions]) => {
        const sectionTitle = SECTION_TITLES[sectionNumber];
        
        return (
          <section key={sectionNumber}>
            <h2>
              {sectionTitle.icon} {sectionTitle.fr}
            </h2>
            {questions.map(question => (
              <div key={question.id}>
                {/* Render question */}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
```

---

## 3. Gérer les questions conditionnelles

```typescript
import { getQuestionsToDisplay, shouldShowConditionalQuestion } from '@/lib/survey-helpers';

function ConditionalQuestionsExample() {
  const [formData, setFormData] = useState({
    q9_defi: 'autre', // Sélection "autre"
  });
  
  // Obtenir TOUTES les questions (inclut les conditionnelles visibles)
  const questionsToDisplay = getQuestionsToDisplay('agency', formData);
  
  // La question q9_autre sera incluse car q9_defi === 'autre'
  console.log(questionsToDisplay.find(q => q.id === 'q9_autre'));
  // → { id: 'q9_autre', conditional: { dependsOn: 'q9_defi', showWhen: 'autre' }, ... }
  
  // Vérifier manuellement une question
  const q9_autre = { 
    id: 'q9_autre',
    conditional: { dependsOn: 'q9_defi', showWhen: 'autre' } 
  };
  
  const shouldShow = shouldShowConditionalQuestion(q9_autre, formData);
  console.log(shouldShow); // → true
  
  // Si on change la réponse
  setFormData({ q9_defi: 'conformite' });
  // q9_autre ne sera plus dans questionsToDisplay
}
```

---

## 4. Calculer la progression

### Progression globale

```typescript
import { calculateProgress, getFormStats } from '@/lib/survey-helpers';

function ProgressBar() {
  const [profileType] = useState<'agency'>('agency');
  const [formData] = useState({
    q1_nom: 'Mon Agence',
    q2_annee: 2015,
    q5_pays: 'France',
    q3_taille: '10-49',
    // ... autres réponses
  });
  
  const progress = calculateProgress(formData, profileType);
  console.log(`Progression: ${progress}%`); // → "Progression: 35%"
  
  // Statistiques détaillées
  const stats = getFormStats(formData, profileType);
  console.log(stats);
  // → {
  //   totalQuestions: 34,
  //   requiredQuestions: 25,
  //   answeredQuestions: 12,
  //   answeredRequired: 9,
  //   progress: 36,
  //   isComplete: false
  // }
  
  return (
    <div>
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>
      <p>{stats.answeredRequired} / {stats.requiredQuestions} questions obligatoires</p>
    </div>
  );
}
```

### Progression par section

```typescript
import { calculateSectionProgress, isSectionComplete } from '@/lib/survey-helpers';

function SectionProgressIndicator() {
  const [profileType] = useState<'agency'>('agency');
  const [formData] = useState({/* ... */});
  
  const sectionProgress = calculateSectionProgress(formData, profileType);
  
  return (
    <nav>
      {[1, 2, 3, 4, 5, 6].map(section => {
        const progress = sectionProgress.get(section) || 0;
        const isComplete = isSectionComplete(section, formData, profileType);
        
        return (
          <div key={section} className={isComplete ? 'complete' : 'incomplete'}>
            Section {section}: {progress}%
            {isComplete && ' ✅'}
          </div>
        );
      })}
    </nav>
  );
}
```

---

## 5. Valider les réponses

### Validation frontend (helpers)

```typescript
import { validateFormData } from '@/lib/survey-helpers';

function validateBeforeSubmit() {
  const formData = {
    q1_nom: 'Mon Agence',
    q24_email: '', // ❌ Obligatoire mais vide
    // ...
  };
  
  const { valid, errors } = validateFormData(formData, 'agency');
  
  if (!valid) {
    console.log('Erreurs:', errors);
    // → { q24_email: 'Email professionnel est obligatoire' }
    
    // Afficher les erreurs dans le formulaire
    Object.entries(errors).forEach(([field, message]) => {
      showError(field, message);
    });
    
    return;
  }
  
  // Formulaire valide, on peut soumettre
  submitForm(formData);
}
```

### Validation backend (Zod)

```typescript
import { validateResponseByProfile, formatZodErrors } from '@/lib/survey-response-schema';

async function handleFormSubmission(req, res) {
  const { profileType, ...formData } = req.body;
  
  // Validation stricte avec Zod
  const result = validateResponseByProfile(profileType, formData);
  
  if (!result.success) {
    const errors = formatZodErrors(result.errors);
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  
  // Données validées et typées
  const validatedData = result.data;
  
  // Sauvegarde en DB
  await saveToDatabase(validatedData);
  
  return res.json({ success: true });
}
```

### Validation complète (frontend + backend)

```typescript
import { validateField } from '@/config/survey-validations';
import { validateResponseByProfile } from '@/lib/survey-response-schema';

async function submitSurvey(formData, profileType, language) {
  // 1. Validation frontend des champs individuels
  const fieldErrors: Record<string, string> = {};
  
  Object.entries(formData).forEach(([fieldName, value]) => {
    const result = validateField(fieldName, value, language);
    if (!result.valid && result.error) {
      fieldErrors[fieldName] = result.error;
    }
  });
  
  if (Object.keys(fieldErrors).length > 0) {
    console.log('Erreurs de validation:', fieldErrors);
    return { success: false, errors: fieldErrors };
  }
  
  // 2. Validation backend avec Zod
  const zodResult = validateResponseByProfile(profileType, formData);
  
  if (!zodResult.success) {
    const zodErrors = formatZodErrors(zodResult.errors);
    console.log('Erreurs Zod:', zodErrors);
    return { success: false, errors: zodErrors };
  }
  
  // 3. Soumission au serveur
  const response = await fetch('/api/survey/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileType,
      ...zodResult.data,
    }),
  });
  
  const data = await response.json();
  return data;
}
```

---

## 6. Traductions multilingues

### Obtenir une traduction

```typescript
import { getTranslation, SUPPORTED_LANGUAGES } from '@/config/translations-index';

function TranslatedQuestion({ question, profileType, language }) {
  // Label
  const label = getTranslation(language, question.labelKey, profileType);
  
  // Placeholder
  const placeholder = question.placeholderKey
    ? getTranslation(language, question.placeholderKey, profileType)
    : undefined;
  
  // Description
  const description = question.descriptionKey
    ? getTranslation(language, question.descriptionKey)
    : undefined;
  
  // Options (pour radio/multi-select)
  const translatedOptions = question.options?.map(opt => ({
    ...opt,
    label: getTranslation(language, opt.labelKey),
  }));
  
  return (
    <div>
      <label>{label}</label>
      {description && <p>{description}</p>}
      {/* Render input with placeholder and translatedOptions */}
    </div>
  );
}
```

### Sélecteur de langue

```typescript
import { SUPPORTED_LANGUAGES, getBrowserLanguage } from '@/config/translations-index';

function LanguageSelector() {
  const [language, setLanguage] = useState(() => getBrowserLanguage());
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {SUPPORTED_LANGUAGES.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.nativeName}
        </option>
      ))}
    </select>
  );
}
```

---

## 7. Exemples complets React

### Composant de question universel

```typescript
import { QuestionConfig } from '@/config/survey-questions-COMPLETE';
import { getTranslation } from '@/config/translations-index';
import { validateField } from '@/config/survey-validations';

interface QuestionRendererProps {
  question: QuestionConfig;
  value: any;
  onChange: (value: any) => void;
  profileType: 'agency' | 'client' | 'worker';
  language: string;
}

function QuestionRenderer({ question, value, onChange, profileType, language }: QuestionRendererProps) {
  const [error, setError] = useState<string | null>(null);
  
  const label = getTranslation(language, question.labelKey, profileType);
  const placeholder = question.placeholderKey
    ? getTranslation(language, question.placeholderKey, profileType)
    : undefined;
  
  const handleChange = (newValue: any) => {
    // Validation en temps réel
    const result = validateField(question.fieldName, newValue, language);
    setError(result.valid ? null : result.error);
    
    onChange(newValue);
  };
  
  // Render selon le type
  switch (question.type) {
    case 'text':
    case 'email':
      return (
        <div>
          <label htmlFor={question.id}>
            {label}
            {question.required && <span>*</span>}
          </label>
          <input
            id={question.id}
            type={question.type}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            required={question.required}
          />
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    case 'number':
      return (
        <div>
          <label htmlFor={question.id}>{label}</label>
          <input
            id={question.id}
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(parseInt(e.target.value))}
            placeholder={placeholder}
            required={question.required}
          />
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    case 'radio':
      return (
        <div>
          <label>{label}</label>
          {question.options?.map(opt => {
            const optLabel = getTranslation(language, opt.labelKey);
            return (
              <label key={opt.value}>
                <input
                  type="radio"
                  name={question.id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => handleChange(opt.value)}
                  required={question.required}
                />
                {opt.icon} {optLabel}
              </label>
            );
          })}
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    case 'multi-select':
      return (
        <div>
          <label>{label}</label>
          {question.options?.map(opt => {
            const optLabel = getTranslation(language, opt.labelKey);
            const isChecked = Array.isArray(value) && value.includes(opt.value);
            return (
              <label key={opt.value}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(value || []), opt.value]
                      : (value || []).filter((v: string) => v !== opt.value);
                    handleChange(newValue);
                  }}
                />
                {opt.icon} {optLabel}
              </label>
            );
          })}
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    case 'textarea':
      return (
        <div>
          <label htmlFor={question.id}>{label}</label>
          <textarea
            id={question.id}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            required={question.required}
            maxLength={1000}
          />
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    case 'score':
      return (
        <div>
          <label>{label}</label>
          <div className="score-selector">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
              <button
                key={score}
                type="button"
                className={value === score ? 'selected' : ''}
                onClick={() => handleChange(score)}
              >
                {score}
              </button>
            ))}
          </div>
          {error && <span className="error">{error}</span>}
        </div>
      );
    
    default:
      return null;
  }
}
```

### Formulaire complet multi-sections

```typescript
import { useState } from 'react';
import { 
  getQuestionsBySection, 
  calculateSectionProgress, 
  getFormStats,
  validateFormData,
  SECTION_TITLES 
} from '@/lib/survey-helpers';
import { createEmptyResponse, validateResponseByProfile } from '@/lib/survey-response-schema';

function MultiSectionSurvey() {
  const [profileType] = useState<'agency'>('agency');
  const [language] = useState<'fr'>('fr');
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState(() => createEmptyResponse(profileType));
  
  const sectionMap = getQuestionsBySection(profileType, formData);
  const sectionProgress = calculateSectionProgress(formData, profileType);
  const stats = getFormStats(formData, profileType);
  
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };
  
  const handleNextSection = () => {
    // Valider la section actuelle
    const { valid, errors } = validateFormData(formData, profileType);
    
    if (!valid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (currentSection < 6) {
      setCurrentSection(currentSection + 1);
    }
  };
  
  const handleSubmit = async () => {
    // Validation finale
    const zodResult = validateResponseByProfile(profileType, formData);
    
    if (!zodResult.success) {
      alert('Formulaire invalide');
      return;
    }
    
    // Soumission
    const response = await fetch('/api/survey/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zodResult.data),
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Merci pour votre participation !');
    }
  };
  
  const currentQuestions = sectionMap.get(currentSection) || [];
  const sectionTitle = SECTION_TITLES[currentSection];
  
  return (
    <div className="survey-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div style={{ width: `${stats.progress}%` }} />
        <span>{stats.progress}% complété</span>
      </div>
      
      {/* Section Navigation */}
      <nav className="section-nav">
        {[1, 2, 3, 4, 5, 6].map(section => {
          const progress = sectionProgress.get(section) || 0;
          const title = SECTION_TITLES[section];
          return (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={currentSection === section ? 'active' : ''}
            >
              {title.icon} {title.fr} ({progress}%)
            </button>
          );
        })}
      </nav>
      
      {/* Current Section */}
      <section>
        <h2>{sectionTitle.icon} {sectionTitle.fr}</h2>
        
        {currentQuestions.map(question => (
          <QuestionRenderer
            key={question.id}
            question={question}
            value={formData[question.fieldName]}
            onChange={(value) => handleFieldChange(question.fieldName, value)}
            profileType={profileType}
            language={language}
          />
        ))}
        
        {/* Navigation Buttons */}
        <div className="section-nav-buttons">
          {currentSection > 1 && (
            <button onClick={() => setCurrentSection(currentSection - 1)}>
              Précédent
            </button>
          )}
          
          {currentSection < 6 ? (
            <button onClick={handleNextSection}>
              Suivant
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!stats.isComplete}>
              Envoyer
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## 🎯 Cas d'usage avancés

### Auto-save avec localStorage

```typescript
function useSurveyAutoSave(profileType: string) {
  const storageKey = `survey_${profileType}_autosave`;
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : createEmptyResponse(profileType);
  });
  
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);
  
  const clearAutoSave = () => {
    localStorage.removeItem(storageKey);
  };
  
  return { formData, setFormData, clearAutoSave };
}
```

### Navigation intelligente

```typescript
function SmartNavigation() {
  const [formData] = useState({/* ... */});
  const [profileType] = useState<'agency'>('agency');
  
  const nextQuestion = getNextUnansweredQuestion(formData, profileType);
  
  if (nextQuestion) {
    return (
      <button onClick={() => scrollToQuestion(nextQuestion.id)}>
        Répondre à la prochaine question obligatoire
      </button>
    );
  }
  
  return <button>Soumettre le formulaire ✅</button>;
}
```

---

## 📞 Support

Pour plus d'exemples, voir :
- `/config/survey-questions-COMPLETE.ts` - Configuration des questions
- `/config/SURVEY_SCHEMA.md` - Documentation du schéma
- `/ANALYSIS_REPORT.md` - Cas d'usage analytiques

**Maintenu par**: Équipe YoJob Dev  
**Version**: 3.0.0
