import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { I18nProvider, useI18n, SUPPORTED_LANGUAGES } from './src/i18n';
import { TRANSLATED_LANGUAGE_CODES } from './src/i18n/constants';
import { QuestionsProvider } from './context/QuestionsContext';
import { TranslationMissingBanner } from './components/survey/TranslationMissingBanner';
import { AutoImportTranslations } from './components/AutoImportTranslations';
import { AdminLogin } from './components/auth/AdminLogin';
import DashboardApp from './DashboardApp';
import { SupabaseBanner } from './components/SupabaseBanner';
import type { RespondentType } from './types/survey';
import { saveResponsePublic } from './lib/supabase-public';
import { extractCountry, getInterestLevel } from './utils/helpers';
import { Section6Contact } from './components/survey/sections/Section6Contact';
import { Header } from './components/survey/Header';
import { HeroSection } from './components/survey/HeroSection';
import { ConfirmationScreen } from './components/survey/ConfirmationScreen';
import { ProgressBar } from './components/survey/ProgressBar';
import { SectionNavigator } from './components/survey/SectionNavigator';
import { RespondentSelector } from './components/survey/RespondentSelector';
import { Section1Profile } from './components/survey/sections/Section1Profile';
import { Section2Detachement } from './components/survey/sections/Section2Detachement';
import { Section3Besoins } from './components/survey/sections/Section3Besoins';
import { Section4Interet } from './components/survey/sections/Section4Interet';
import { Section5Vision } from './components/survey/sections/Section5Vision';

export interface FormData {
  // Section 1: Profil
  q1_nom: string;
  q2_annee: string;
  q2_annee_client: string;
  q2_nationalite: string;
  q3_taille: string;
  q3_experience: string;
  q4_secteurs: string[];
  q4_metiers: string[];
  
  // Section 2: Détachement
  q5_pays: string;
  q5_localisation: string;
  q5_pays_travail: string;
  q6_volume: string;
  q6_volume_client: string;
  q6_frequence: string;
  q7_origine: string;
  q8_destinations: string;
  q8_nationalites: string;
  q9_defi: string;
  q9_defi_client: string;
  q9_defi_worker: string;
  q9_autre: string;
  q10_gestion: string;
  q10_agences: string;
  q10_processus: string;
  q10_agence: string;
  q10_agences_worker: string;
  q11_incidents: string;
  q11_conformite: string;
  q11_problemes: string;
  
  // Section 3: Besoins
  q12_budget: string;
  q12_budget_client: string;
  q12_satisfaction: string;
  q12_salaire: string;
  q13_manque_gagner: string;
  q13_satisfaction: string;
  q13_satisfaction_worker: string;
  q14_risques: string[];
  q14_besoins_client: string[];
  q14_attentes: string[];
  q14_risques_client: string[];
  q14_risques_worker: string[];
  q15_probleme: string;
  q15_besoins_client: string;
  q15_ameliorations: string;
  q16_erp: string;
  q16_nom_erp: string;
  q16_autre: string;
  q16_criteres: string[];
  q16_amelioration: string[];
  q17_migration: string;
  q17_budget: string;
  q17_plateforme: string;
  
  // Section 4: Intérêt
  q18_score: number;
  q19_features: string[];
  q19_features_client: string[];
  q19_features_worker: string[];
  q20_prix: string;
  q21_budget_mensuel: string;
  q22_mvp: string;
  q23_role: string;
  
  // Section 5: Vision
  q24_evolution: string;
  q25_besoins: string;
  
  // Section 6: Contact
  q26_phone: string;
  q27_firstname: string;
  q28_lastname: string;
  q29_siret: string;
  email: string;
  autorise_contact: boolean;
  souhaite_rapport: boolean;
}

const SECTIONS = [
  { id: 1, labelKey: 'section.1.title', labelFallback: 'Profil Agence', icon: '👤', questions: 4, time: '2 min' },
  { id: 2, labelKey: 'section.2.title', labelFallback: 'Détachement', icon: '🌍', questions: 7, time: '3 min' },
  { id: 3, labelKey: 'section.3.title', labelFallback: 'Besoins', icon: '💼', questions: 6, time: '2 min' },
  { id: 4, labelKey: 'section.4.title', labelFallback: 'Intérêt YoJob', icon: '⭐', questions: 6, time: '3 min' },
  { id: 5, labelKey: 'section.5.title', labelFallback: 'Vision Future', icon: '🔮', questions: 2, time: '1 min' },
  { id: 6, labelKey: 'section.6.title', labelFallback: 'Contact', icon: '📧', questions: 1, time: '1 min' }
];

/**
 * 🌍 MAP LANGUE → PAYS
 * Détermine le pays basé sur la langue sélectionnée dans le formulaire
 */
function getCountryFromLanguage(langCode: string): string {
  const languageToCountry: Record<string, string> = {
    'fr': 'France',
    'en': 'United Kingdom',
    'de': 'Allemagne',
    'es': 'Espagne',
    'it': 'Italie',
    'pl': 'Pologne',
    'ro': 'Roumanie',
    'bg': 'Bulgarie',
    'hr': 'Croatie',
    'cz': 'République Tchèque',
    'da': 'Danemark',
    'ee': 'Estonie',
    'el': 'Grèce',
    'fi': 'Finlande',
    'hu': 'Hongrie',
    'lt': 'Lituanie',
    'lv': 'Lettonie',
    'nl': 'Pays-Bas',
    'pt': 'Portugal',
    'sk': 'Slovaquie',
    'sl': 'Slovénie',
    'sv': 'Suède',
  };
  return languageToCountry[langCode] || 'Non spécifié';
}

/**
 * 🏳️ MAP LANGUE → CODE PAYS (ISO 3166-1 alpha-2)
 */
function getCountryCodeFromLanguage(langCode: string): string {
  const languageToCountryCode: Record<string, string> = {
    'fr': 'FR',
    'en': 'GB',
    'de': 'DE',
    'es': 'ES',
    'it': 'IT',
    'pl': 'PL',
    'ro': 'RO',
    'bg': 'BG',
    'hr': 'HR',
    'cz': 'CZ',
    'da': 'DK',
    'ee': 'EE',
    'el': 'GR',
    'fi': 'FI',
    'hu': 'HU',
    'lt': 'LT',
    'lv': 'LV',
    'nl': 'NL',
    'pt': 'PT',
    'sk': 'SK',
    'sl': 'SI',
    'sv': 'SE',
  };
  return languageToCountryCode[langCode] || 'XX';
}

export default function AppSurveyOriginal() {
  const [viewMode, setViewMode] = useState<'survey' | 'dashboard' | 'login'>('survey'); // Toggle between survey, dashboard and login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [respondentType, setRespondentType] = useState<RespondentType | null>(null); // Step -1: Profile selection
  const [currentSection, setCurrentSection] = useState(0); // 0 = Hero, 1-6 = Sections, 7 = Confirmation
  const [formData, setFormData] = useState<FormData>({
    q1_nom: '',
    q2_annee: '',
    q2_annee_client: '',
    q2_nationalite: '',
    q3_taille: '',
    q3_experience: '',
    q4_secteurs: [],
    q4_metiers: [],
    q5_pays: '',
    q5_localisation: '',
    q5_pays_travail: '',
    q6_volume: '',
    q6_volume_client: '',
    q6_frequence: '',
    q7_origine: '',
    q8_destinations: '',
    q8_nationalites: '',
    q9_defi: '',
    q9_defi_client: '',
    q9_defi_worker: '',
    q9_autre: '',
    q10_gestion: '',
    q10_agences: '',
    q10_processus: '',
    q10_agence: '',
    q10_agences_worker: '',
    q11_incidents: '',
    q11_conformite: '',
    q11_problemes: '',
    q12_budget: '',
    q12_budget_client: '',
    q12_satisfaction: '',
    q12_salaire: '',
    q13_manque_gagner: '',
    q13_satisfaction: '',
    q13_satisfaction_worker: '',
    q14_risques: [],
    q14_besoins_client: [],
    q14_attentes: [],
    q14_risques_client: [],
    q14_risques_worker: [],
    q15_probleme: '',
    q15_besoins_client: '',
    q15_ameliorations: '',
    q16_erp: '',
    q16_nom_erp: '',
    q16_autre: '',
    q16_criteres: [],
    q16_amelioration: [],
    q17_migration: '',
    q17_budget: '',
    q17_plateforme: '',
    q18_score: 0,
    q19_features: [],
    q19_features_client: [],
    q19_features_worker: [],
    q20_prix: '',
    q21_budget_mensuel: '',
    q22_mvp: '',
    q23_role: '',
    q24_evolution: '',
    q25_besoins: '',
    q26_phone: '',
    q27_firstname: '',
    q28_lastname: '',
    q29_siret: '',
    email: '',
    autorise_contact: false,
    souhaite_rapport: false
  });
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  
  // 🌍 Ref pour stocker la langue courante (accessible dans handleSubmit)
  const currentLangRef = useRef('fr');

  // Check authentication on mount & URL params for admin access
  useEffect(() => {
    async function checkAuth() {
      const { initAuth } = await import('./services/authService');
      const { authenticated } = await initAuth();
      
      if (authenticated) {
        setIsAuthenticated(true);
      }

      // Check for admin mode in URL
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'admin') {
        setViewMode('dashboard');
      }

      // Load debug tools in development
      if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
        import('./utils/auth-debug');
      }
    }

    checkAuth();
  }, []);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setViewMode('dashboard');
  };

  const handleLogout = async () => {
    const { logout } = await import('./services/authService');
    await logout();
    setIsAuthenticated(false);
    setViewMode('survey');
  };

  const handleStartSurvey = () => {
    setCurrentSection(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextSection = () => {
    if (currentSection < 6) {
      if (!completedSections.includes(currentSection)) {
        setCompletedSections(prev => [...prev, currentSection]);
      }
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate unique response ID
      const responseId = `YJ-2025-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      
      // Enriched metadata
      // 🌍 Pays basé sur la LANGUE sélectionnée (pas sur la réponse q5_pays)
      const country = getCountryFromLanguage(currentLangRef.current);
      const countryCode = getCountryCodeFromLanguage(currentLangRef.current);
      const sector = respondentType === 'worker'
        ? (formData.q4_metiers[0] || 'Non spécifié')
        : (formData.q4_secteurs[0] || 'Non spécifié');
      const companySize = respondentType === 'worker'
        ? 0
        : parseInt(formData.q3_taille?.match(/\d+/)?.[0] || '0', 10);
      const detachmentExperience = (() => {
        if (respondentType === 'agency') {
          return formData.q6_volume === '0' || formData.q6_volume === 'Pas encore' ? 'Non' : formData.q6_volume ? 'Oui' : 'Non';
        }
        if (respondentType === 'client') {
          return formData.q6_volume_client === '0' ? 'Non' : formData.q6_volume_client ? 'Oui' : 'Non';
        }
        if (respondentType === 'worker') {
          return formData.q6_frequence === 'jamais' ? 'Non' : formData.q6_frequence ? 'Oui' : 'Non';
        }
        return 'Non';
      })();
      const interestLevel = getInterestLevel(formData.q18_score);
      const completionTime = Math.floor((Date.now() - startTime) / 1000);
      
      // Get user tracking info (non-invasive)
      const userAgent = navigator.userAgent;
      const referrer = document.referrer || 'Direct';
      
      // Prepare data for Supabase WITH respondent_type
      const responseData = {
        response_id: responseId,
        respondent_type: respondentType || 'agency', // ✅ Include respondent type
        language_code: currentLangRef.current, // ✅ RÉACTIVÉ - Langue utilisée lors du remplissage
        
        // 🔹 CORE FIELDS (communs à tous les types)
        q1_nom: formData.q1_nom || '',
        q2_annee: formData.q2_annee || '',
        q3_taille: formData.q3_taille || '',
        q4_secteurs: formData.q4_secteurs || [],
        
        // 🔹 FIELDS ADAPTABLES (utiliser les champs génériques ou les mettre dans additional_data)
        // Pour les questions qui existent dans la table, on les remplit directement
        q5_pays: formData.q5_pays || '',
        q6_volume: formData.q6_volume || '',
        q7_origine: formData.q7_origine || '',
        q8_destinations: formData.q8_destinations || '',
        q9_defi: formData.q9_defi || '',
        q9_autre: formData.q9_autre || '',
        q10_gestion: formData.q10_gestion || '', // ✅ TOUS les profils utilisent ce fieldName
        q11_incidents: formData.q11_incidents || '',
        
        q12_budget: formData.q12_budget || '',
        q13_manque_gagner: formData.q13_manque_gagner || '',
        q14_risques: formData.q14_risques || '',
        q15_probleme: formData.q15_probleme || '',
        q16_erp: formData.q16_erp || '',
        q16_autre: formData.q16_autre || '',
        q17_migration: formData.q17_migration || '',
        
        q18_score: formData.q18_score || 0,
        q19_features: formData.q19_features || [],
        q20_prix: formData.q20_prix || '',
        q21_budget_mensuel: formData.q21_budget_mensuel || '',
        q22_mvp: formData.q22_mvp || '',
        q23_role: formData.q23_role || '',
        
        q24_evolution: formData.q24_evolution || '',
        q25_besoins: formData.q25_besoins || '',
        
        q26_phone: formData.q26_phone || '',
        q27_firstname: formData.q27_firstname || '',
        q28_lastname: formData.q28_lastname || '',
        q29_siret: formData.q29_siret || '',
        email: formData.email || '',
        autorise_contact: formData.autorise_contact || false,
        souhaite_rapport: formData.souhaite_rapport || false,
        
        // 🔹 ADDITIONAL DATA (questions spécifiques au type de répondant)
        additional_data: {
          // ✅ Backup complet pour référence et debugging
          raw_form_data: formData
        },
        
        // Metadata enrichie
        country,
        countryCode,
        sector,
        company_size: companySize,
        detachment_experience: detachmentExperience,
        interest_level: interestLevel,
        completion_time: completionTime,
        user_agent: userAgent,
        referrer
      };
      
      console.log('📤 Envoi de la réponse avec type:', respondentType);
      console.log('🌍 Langue utilisée:', currentLangRef.current);
      
      // Save to Supabase using PUBLIC client (no session possible)
      const result = await saveResponsePublic(responseData);
      
      if (result.success) {
        console.log('✅ Réponse sauvegardée avec succès:', responseId);
        toast.success('Merci ! Votre réponse a été enregistrée.', {
          description: 'Vous recevrez une analyse par email si vous avez coché l\'option.'
        });
        
        setCurrentSection(7); // Show confirmation screen
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Check if it's a configuration error
        const errorMessage = result.error?.message;
        const errorCode = result.error?.code;
        
        // Detect RLS policy error
        if (errorCode === '42501' || errorMessage?.includes('row-level security policy')) {
          console.error('🚨 Erreur RLS détectée:', result.error);
          toast.error('🚨 Erreur de Configuration Base de Données', {
            description: 'La policy RLS bloque les insertions. Cliquez pour corriger.',
            duration: 10000,
            action: {
              label: 'Corriger (2 min)',
              onClick: () => window.location.href = '/fix-rls-v2'
            }
          });
          throw new Error('Erreur RLS - Voir /fix-rls pour la solution');
        } else if (errorMessage === 'Supabase not configured') {
          console.warn('⚠️ Mode démonstration : Supabase non configuré');
          toast.warning('Mode démonstration', {
            description: 'Configurez Supabase pour sauvegarder les réponses. Voir FIGMA_MAKE_ENV.md'
          });
          // Still show confirmation screen in demo mode
          setCurrentSection(7);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          throw new Error('Échec de la sauvegarde');
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      
      // Check if it's an RLS error in the caught exception
      const errorString = error?.toString() || '';
      if (errorString.includes('RLS') || errorString.includes('row-level security')) {
        // Already shown toast above, just log
        console.log('👉 Solution disponible sur /fix-rls');
      } else {
        toast.error('Erreur lors de l\'envoi', {
          description: 'Veuillez réessayer ou contacter le support.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = currentSection === 0 ? 0 : ((currentSection - 1) / 6) * 100 + (completedSections.includes(currentSection) ? 100 / 6 : 0);

  // Show login if trying to access dashboard without auth
  if (viewMode === 'dashboard' && !isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <I18nProvider>
      <QuestionsProvider>
        <AutoImportTranslations />
        <SupabaseBanner />
        <Toaster position="top-right" richColors />
        {viewMode === 'dashboard' ? (
          <DashboardApp onBackToSurvey={() => setViewMode('survey')} />
        ) : (
          <AppContent
            currentSection={currentSection}
            progress={progress}
            formData={formData}
            completedSections={completedSections}
            respondentType={respondentType}
            setRespondentType={setRespondentType}
            setViewMode={setViewMode}
            handleStartSurvey={handleStartSurvey}
            setCurrentSection={setCurrentSection}
            updateFormData={updateFormData}
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            currentLangRef={currentLangRef}
          />
        )}
      </QuestionsProvider>
    </I18nProvider>
  );
}

interface AppContentProps {
  currentSection: number;
  progress: number;
  formData: FormData;
  completedSections: number[];
  respondentType: RespondentType | null;
  setRespondentType: (type: RespondentType) => void;
  setViewMode: (mode: 'survey' | 'dashboard') => void;
  handleStartSurvey: () => void;
  setCurrentSection: (section: number | ((prev: number) => number)) => void;
  updateFormData: (updates: Partial<FormData>) => void;
  handlePrevSection: () => void;
  handleNextSection: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  currentLangRef: React.MutableRefObject<string>;
}

function AppContent({
  currentSection,
  progress,
  formData,
  completedSections,
  respondentType,
  setRespondentType,
  setViewMode,
  handleStartSurvey,
  setCurrentSection,
  updateFormData,
  handlePrevSection,
  handleNextSection,
  handleSubmit,
  isSubmitting,
  currentLangRef
}: AppContentProps) {
  const { t, currentLang } = useI18n();
  
  // Filtrer uniquement les langues traduites
  const translatedLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    TRANSLATED_LANGUAGE_CODES.includes(lang.code)
  );
  
  // 🌍 Mettre à jour la ref de la langue courante
  currentLangRef.current = currentLang;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <Header 
        currentSection={currentSection} 
        progress={progress} 
        onDashboardClick={() => setViewMode('dashboard')}
      />

      {/* Translation Missing Banner */}
      <TranslationMissingBanner />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {/* Step -1: Respondent Type Selection */}
        {!respondentType && currentSection === 0 && (
          <RespondentSelector
            key="respondent-selector"
            currentLanguage={currentLang}
            availableLanguagesCount={translatedLanguages.length}
            onSelect={(type) => {
              setRespondentType(type);
              console.log('✅ Type de répondant sélectionné:', type);
            }}
          />
        )}

        {/* Step 0: Hero Section (only shown after profile selection) */}
        {respondentType && currentSection === 0 && (
          <HeroSection key="hero" onStart={handleStartSurvey} respondentType={respondentType} />
        )}

        {currentSection === 7 && (
          <ConfirmationScreen key="confirmation" />
        )}

        {currentSection >= 1 && currentSection <= 6 && (
          <motion.div
            key={`section-${currentSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-4xl mx-auto px-4 py-8 mt-8 md:mt-24"
          >
            {/* Progress Bar */}
            <ProgressBar 
              currentSection={currentSection} 
              totalSections={6} 
              progress={progress}
            />

            {/* Section Steps */}
            <SectionNavigator 
              sections={SECTIONS}
              currentSection={currentSection}
              completedSections={completedSections}
              setCurrentSection={setCurrentSection}
            />

            {/* Form Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {currentSection === 1 && (
                  <Section1Profile 
                    key="section1"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
                {currentSection === 2 && (
                  <Section2Detachement 
                    key="section2"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
                {currentSection === 3 && (
                  <Section3Besoins 
                    key="section3"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
                {currentSection === 4 && (
                  <Section4Interet 
                    key="section4"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
                {currentSection === 5 && (
                  <Section5Vision 
                    key="section5"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
                {currentSection === 6 && (
                  <Section6Contact 
                    key="section6"
                    formData={formData} 
                    updateFormData={updateFormData}
                    respondentType={respondentType!}
                  />
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentSection > 1 && (
                  <Button
                    onClick={handlePrevSection}
                    variant="outline"
                    className="flex-1 h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 rounded-xl transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    {t('button.previous', 'Précédent')}
                  </Button>
                )}
                
                {currentSection < 6 ? (
                  <Button
                    onClick={handleNextSection}
                    className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl shadow-lg shadow-cyan-500/30"
                  >
                    {t('button.next', 'Suivant')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || !formData.email}
                    className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl shadow-lg shadow-cyan-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? t('button.submitting', 'Envoi en cours...') : t('button.submit', 'Envoyer mes réponses')}
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}