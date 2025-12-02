import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Header } from './components/survey/Header';
import { HeroSection } from './components/survey/HeroSection';
import { ProgressBar } from './components/survey/ProgressBar';
import { SectionHeader } from './components/survey/SectionHeader';
import { ConfirmationScreen } from './components/survey/ConfirmationScreen';
import { Section1Profile } from './components/survey/sections/Section1Profile';
import { Section2Detachement } from './components/survey/sections/Section2Detachement';
import { Section3Besoins } from './components/survey/sections/Section3Besoins';
import { Section4Interet } from './components/survey/sections/Section4Interet';
import { Section5Vision } from './components/survey/sections/Section5Vision';
import { Section6Contact } from './components/survey/sections/Section6Contact';
import DashboardApp from './DashboardApp';
import { QuestionsProvider } from './context/QuestionsContext';
import { AdminLogin } from './components/auth/AdminLogin';
import { saveResponse, extractCountry, getInterestLevel } from './lib/supabase';
import { saveResponsePublic } from './lib/supabase-public';
import { toast, Toaster } from 'sonner@2.0.3';
import { SupabaseBanner } from './components/SupabaseBanner';
import { I18nProvider, useI18n } from './hooks/useI18n';
import { TranslationMissingBanner } from './components/survey/TranslationMissingBanner';
import './utils/diagnostic-supabase'; // Import diagnostic tool

export interface FormData {
  // Section 1: Profil
  q1_nom: string;
  q2_annee: string;
  q3_taille: string;
  q4_secteurs: string[];
  
  // Section 2: Détachement
  q5_pays: string;
  q6_volume: string;
  q7_origine: string;
  q8_destinations: string;
  q9_defi: string;
  q9_autre: string;
  q10_gestion: string;
  q11_incidents: string;
  
  // Section 3: Besoins
  q12_budget: string;
  q13_manque_gagner: string;
  q14_risques: string;
  q15_probleme: string;
  q16_erp: string;
  q16_autre: string;
  q17_migration: string;
  
  // Section 4: Intérêt
  q18_score: number;
  q19_features: string[];
  q20_prix: string;
  q21_budget_mensuel: string;
  q22_mvp: string;
  q23_role: string;
  
  // Section 5: Vision
  q24_evolution: string;
  q25_besoins: string;
  
  // Section 6: Contact
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

export default function App() {
  const [viewMode, setViewMode] = useState<'survey' | 'dashboard' | 'login'>('survey'); // Toggle between survey, dashboard and login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0 = Hero, 1-6 = Sections, 7 = Confirmation
  const [formData, setFormData] = useState<FormData>({
    q1_nom: '',
    q2_annee: '',
    q3_taille: '',
    q4_secteurs: [],
    q5_pays: '',
    q6_volume: '',
    q7_origine: '',
    q8_destinations: '',
    q9_defi: '',
    q9_autre: '',
    q10_gestion: '',
    q11_incidents: '',
    q12_budget: '',
    q13_manque_gagner: '',
    q14_risques: '',
    q15_probleme: '',
    q16_erp: '',
    q16_autre: '',
    q17_migration: '',
    q18_score: 0,
    q19_features: [],
    q20_prix: '',
    q21_budget_mensuel: '',
    q22_mvp: '',
    q23_role: '',
    q24_evolution: '',
    q25_besoins: '',
    email: '',
    autorise_contact: false,
    souhaite_rapport: false
  });
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

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
      const country = extractCountry(formData.q5_pays);
      const sector = formData.q4_secteurs[0] || 'Non spécifié';
      const companySize = parseInt(formData.q3_taille?.match(/\d+/)?.[0] || '0');
      const detachmentExperience = formData.q6_volume === 'Pas encore' ? 'Non' : 'Oui';
      const interestLevel = getInterestLevel(formData.q18_score);
      const completionTime = Math.floor((Date.now() - startTime) / 1000);
      
      // Get user tracking info (non-invasive)
      const userAgent = navigator.userAgent;
      const referrer = document.referrer || 'Direct';
      
      // Prepare data for Supabase
      const responseData = {
        response_id: responseId,
        ...formData,
        country,
        sector,
        company_size: companySize,
        detachment_experience: detachmentExperience,
        interest_level: interestLevel,
        completion_time: completionTime,
        user_agent: userAgent,
        referrer
      };
      
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
            setViewMode={setViewMode}
            handleStartSurvey={handleStartSurvey}
            setCurrentSection={setCurrentSection}
            updateFormData={updateFormData}
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
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
  setViewMode: (mode: 'survey' | 'dashboard') => void;
  handleStartSurvey: () => void;
  setCurrentSection: (section: number | ((prev: number) => number)) => void;
  updateFormData: (updates: Partial<FormData>) => void;
  handlePrevSection: () => void;
  handleNextSection: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

function AppContent({
  currentSection,
  progress,
  formData,
  completedSections,
  setViewMode,
  handleStartSurvey,
  setCurrentSection,
  updateFormData,
  handlePrevSection,
  handleNextSection,
  handleSubmit,
  isSubmitting
}: AppContentProps) {
  const { t } = useI18n();
  
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
        {currentSection === 0 && (
          <HeroSection key="hero" onStart={handleStartSurvey} />
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
            className="relative z-10 max-w-4xl mx-auto px-4 py-8 mt-24"
          >
            {/* Progress Bar */}
            <ProgressBar 
              currentSection={currentSection} 
              totalSections={6} 
              progress={progress}
            />

            {/* Section Steps */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => section.id < currentSection && setCurrentSection(section.id)}
                  disabled={section.id > currentSection}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    section.id === currentSection
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30'
                      : completedSections.includes(section.id)
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-pointer hover:bg-green-500/30'
                      : section.id < currentSection
                      ? 'bg-white/10 text-white/60 border border-white/20 cursor-pointer hover:bg-white/20'
                      : 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {completedSections.includes(section.id) && section.id !== currentSection && (
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                  )}
                  {section.icon} {t(section.labelKey, section.labelFallback)}
                </button>
              ))}
            </div>

            {/* Form Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {currentSection === 1 && (
                  <Section1Profile 
                    key="section1"
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {currentSection === 2 && (
                  <Section2Detachement 
                    key="section2"
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {currentSection === 3 && (
                  <Section3Besoins 
                    key="section3"
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {currentSection === 4 && (
                  <Section4Interet 
                    key="section4"
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {currentSection === 5 && (
                  <Section5Vision 
                    key="section5"
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {currentSection === 6 && (
                  <Section6Contact 
                    key="section6"
                    formData={formData} 
                    updateFormData={updateFormData} 
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
                    Précédent
                  </Button>
                )}
                
                {currentSection < 6 ? (
                  <Button
                    onClick={handleNextSection}
                    className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl shadow-lg shadow-cyan-500/30"
                  >
                    Suivant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.email}
                    className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl shadow-lg shadow-cyan-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer mes réponses'}
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
