import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  User,
  Briefcase,
  FileText,
  Users,
  CheckCircle,
  Plus,
  Trash2,
  FileCheck
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { LogoSvg } from './imports/YojobLogoComplete';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from './utils/supabase/info';

// Import des composants d'étapes (à créer)
import { Step1Entreprise } from './components/devis/Step1Entreprise';
import { Step2Contact } from './components/devis/Step2Contact';
import { Step3Besoins } from './components/devis/Step3Besoins';
import { Step4Conditions } from './components/devis/Step4Conditions';
import { Step5Candidats } from './components/devis/Step5Candidats';
import { StepRecapitulatif } from './components/devis/StepRecapitulatif';

// Import du système de traduction
import { LanguageSelector, getSuggestedLanguage } from './src/i18n/devis';
import type { DevisLanguage } from './src/i18n/devis/types';
import { useDevisTranslationStatic } from './hooks/useDevisTranslation';

// Types pour les données du formulaire
export interface DevisFormData {
  // Étape 1: Entreprise
  entreprise: {
    pays: string;
    raisonSociale: string;
    siret: string;
    codeAPE: string;
    tvaIntracommunautaire: string;
    adresse: string;
    codePostal: string;
    ville: string;
    region: string;
    siteInternet: string;
  };
  
  // Étape 2: Contact
  contact: {
    nom: string;
    prenom: string;
    fonction: string;
    email: string;
    telephoneFixe: string;
    telephonePortable: string;
  };
  
  // Étape 3: Besoins (multiple)
  postes: Array<{
    id: string;
    secteur: string;
    convention: string;
    nationalite: string;  // 🆕 Code pays (RO, PL, PT, etc.)
    poste: string;
    classification: string;
    quantite: number;
    salaireBrut: number;
    tauxHoraireBrut: number;
    tauxETT: number;
    // 🆕 Détails du coefficient pour affichage
    coeffBase: number;
    facteurPays: number;
    coeffFinal: number;
    labelPays: string;
  }>;
  
  // Étape 4: Conditions
  conditions: {
    dateDebut: string;
    dateFin: string;
    periodeEssai: string;
    baseHoraire: number;
    lieuxMission: string;
    motifRecours: string;
    delaiPaiement: string;
    hebergement: {
      chargeEU: boolean;
      commentaire: string;
    };
    transportLocal: {
      chargeETT: boolean;
    };
    repas: {
      type: 'restaurant' | 'panier' | 'non-concerne';
      montant?: number;
    };
  };
  
  // Étape 5: Candidats
  candidats: {
    experience: {
      obligatoire: boolean;
      annees?: number;
    };
    formation: {
      obligatoire: boolean;
      type?: string;
    };
    travailRisque: {
      active: boolean;
      precisions?: string;
    };
    langues: Record<string, string>; // langue: niveau
    permis: {
      requis: boolean;
      categorie?: string;
    };
    outillage: {
      requis: boolean;
      type?: string;
    };
    epis: string[];
  };
}

export default function DemandeDevis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [lang, setLang] = useState<DevisLanguage>('fr');
  
  // Charger les traductions pour la langue active
  const { t } = useDevisTranslationStatic(lang);
  
  // Générer les steps avec traductions dynamiquement
  const STEPS = [
    { id: 1, title: t.navigation.steps.entreprise.title, icon: Building2, badge: t.navigation.steps.entreprise.badge },
    { id: 2, title: t.navigation.steps.contact.title, icon: User, badge: t.navigation.steps.contact.badge },
    { id: 3, title: t.navigation.steps.besoins.title, icon: Briefcase, badge: t.navigation.steps.besoins.badge },
    { id: 4, title: t.navigation.steps.conditions.title, icon: FileText, badge: t.navigation.steps.conditions.badge },
    { id: 5, title: t.navigation.steps.candidats.title, icon: Users, badge: t.navigation.steps.candidats.badge },
    { id: 6, title: t.navigation.steps.recapitulatif.title, icon: FileCheck, badge: t.navigation.steps.recapitulatif.badge }
  ];

  const [formData, setFormData] = useState<DevisFormData>({
    entreprise: {
      pays: 'France', // Valeur par défaut
      raisonSociale: '',
      siret: '',
      codeAPE: '',
      tvaIntracommunautaire: '',
      adresse: '',
      codePostal: '',
      ville: '',
      region: '',
      siteInternet: ''
    },
    contact: {
      nom: '',
      prenom: '',
      fonction: '',
      email: '',
      telephoneFixe: '',
      telephonePortable: ''
    },
    postes: [
      {
        id: crypto.randomUUID(),
        secteur: '',
        convention: '',
        nationalite: '',  // 🆕 Code pays (RO, PL, PT, etc.)
        poste: '',
        classification: '',
        quantite: 1,
        salaireBrut: 0,
        tauxHoraireBrut: 0,
        tauxETT: 0,
        // 🆕 Détails du coefficient pour affichage
        coeffBase: 0,
        facteurPays: 0,
        coeffFinal: 0,
        labelPays: ''
      }
    ],
    conditions: {
      dateDebut: '',
      dateFin: '',
      periodeEssai: '3',
      baseHoraire: 151.67,
      lieuxMission: '',
      motifRecours: '',
      delaiPaiement: '',
      hebergement: {
        chargeEU: true,
        commentaire: ''
      },
      transportLocal: {
        chargeETT: false
      },
      repas: {
        type: 'non-concerne'
      }
    },
    candidats: {
      experience: {
        obligatoire: false
      },
      formation: {
        obligatoire: false
      },
      travailRisque: {
        active: false
      },
      langues: {},
      permis: {
        requis: false
      },
      outillage: {
        requis: false
      },
      epis: []
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;

  const updateFormData = (section: keyof DevisFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNext = () => {
    // Validation avant de passer à l'étape suivante
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateCurrentStep = (): boolean => {
    // Validation basique (à améliorer)
    switch (currentStep) {
      case 1:
        // Validation entreprise
        if (!formData.entreprise.raisonSociale || !formData.entreprise.siret || !formData.entreprise.ville) {
          toast.error('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        // Région obligatoire uniquement pour la France
        const estFrance = formData.entreprise.pays === 'France' || !formData.entreprise.pays;
        if (estFrance && !formData.entreprise.region) {
          toast.error('Veuillez sélectionner une région');
          return false;
        }
        break;
      case 2:
        if (!formData.contact.nom || !formData.contact.prenom || !formData.contact.email || !formData.contact.telephonePortable) {
          toast.error('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        break;
      case 3:
        if (formData.postes.length === 0 || !formData.postes[0].secteur) {
          toast.error('Veuillez ajouter au moins un poste');
          return false;
        }
        break;
      case 4:
        if (!formData.conditions.dateDebut || !formData.conditions.lieuxMission) {
          toast.error('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('📤 Envoi du devis au backend...');
      
      // Envoyer les données au backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur backend:', errorData);
        throw new Error(errorData.error || 'Erreur lors de l\'envoi du devis');
      }

      const result = await response.json();
      console.log('✅ Devis créé avec succès:', result);
      
      // Afficher le toast de succès AVANT la redirection
      toast.success('Devis envoyé avec succès ! Redirection en cours...');
      
      // Attendre 500ms pour que le toast soit visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigation client-side (compatible Figma Make et production)
      const targetUrl = `/recap-devis/${result.id}?numero=${result.numero}`;
      window.history.pushState({}, '', targetUrl);
      
      // Déclencher l'événement popstate pour que App.tsx mette à jour la route
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      toast.error(`Une erreur est survenue : ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Entreprise
            data={formData.entreprise}
            onChange={(data) => updateFormData('entreprise', data)}
            lang={lang}
          />
        );
      case 2:
        return (
          <Step2Contact
            data={formData.contact}
            onChange={(data) => updateFormData('contact', data)}
            lang={lang}
          />
        );
      case 3:
        return (
          <Step3Besoins
            data={formData.postes}
            pays={formData.entreprise.pays}
            region={formData.entreprise.region}
            onChange={(data) => updateFormData('postes', data)}
            lang={lang}
          />
        );
      case 4:
        return (
          <Step4Conditions
            data={formData.conditions}
            pays={formData.entreprise.pays}
            region={formData.entreprise.region}
            onChange={(data) => updateFormData('conditions', data)}
            lang={lang}
          />
        );
      case 5:
        return (
          <Step5Candidats
            data={formData.candidats}
            onChange={(data) => updateFormData('candidats', data)}
            lang={lang}
          />
        );
      case 6:
        return (
          <StepRecapitulatif
            formData={formData}
            onSubmit={handleSubmit}
            lang={lang}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Demande de devis | YOJOB</title>
          <meta name="description" content="Demandez un devis pour vos besoins en personnel intérimaire européen." />
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <div className="w-full h-full rounded-[10px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <LogoSvg className="w-8 h-8" />
                  </div>
                </div>
                <span className="text-white text-xl hidden sm:block group-hover:text-cyan-400 transition-colors">
                  YOJOB
                </span>
              </a>

              {/* Language Selector */}
              <div className="flex items-center gap-4">
                <LanguageSelector 
                  value={lang} 
                  onChange={setLang}
                  suggestedCountry={formData.entreprise.pays}
                  showMVPOnly={true}
                />
                <Button
                  className="relative overflow-hidden group rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Étape {currentStep} sur {STEPS.length}</span>
                <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/10" />
            </div>
            
            {/* Step Indicator */}
            <div className="hidden md:flex items-center justify-between gap-2 mb-8">
              {STEPS.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive ? 'bg-gradient-to-br from-cyan-500 to-green-500 shadow-lg shadow-cyan-500/50' : ''}
                        ${isCompleted ? 'bg-green-500' : ''}
                        ${!isActive && !isCompleted ? 'bg-white/10 border border-white/20' : ''}
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <StepIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <span className={`
                        mt-2 text-xs text-center
                        ${isActive ? 'text-white font-medium' : 'text-white/60'}
                      `}>
                        {step.title}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`
                        h-0.5 flex-1 mx-2 transition-all duration-300
                        ${isCompleted ? 'bg-green-500' : 'bg-white/20'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                  <CardContent className="p-6 md:p-8">
                    {/* Badge de l'étape */}
                    <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm text-base">
                      {STEPS[currentStep - 1].badge}
                    </Badge>
                    
                    {/* Contenu de l'étape */}
                    {renderStep()}
                  </CardContent>
                </Card>

                {/* Navigation Buttons */}
                {currentStep < STEPS.length && (
                  <div className="flex items-center justify-between mt-6 gap-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      variant="outline"
                      className="relative overflow-hidden group rounded-full border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 transition-all px-8 py-6 text-lg shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Précédent
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all px-8 py-6 text-lg"
                    >
                      <span className="relative z-10 flex items-center">
                        Suivant
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}