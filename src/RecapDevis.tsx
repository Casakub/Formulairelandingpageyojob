import { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Building2,
  User,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  CheckCircle,
  Loader2,
  PenTool,
  X,
  Printer,
  ArrowLeft
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Checkbox } from './components/ui/checkbox';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { LogoSvg } from './imports/YojobLogoComplete';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { RECAP_COMPLETE_LANGUAGES } from './src/i18n/devis/languages';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from './utils/supabase/info';
import SignatureCanvas from 'react-signature-canvas';
import { 
  formaterMontant, 
  calculerTauxETTComplet, 
  calculerMajorationsDevis, 
  appliquerMajorationTaux 
} from './utils/devis-calculations';
import { useDevisTranslationStatic } from './hooks/useDevisTranslation';
import { translateSecteur, translatePoste, translateClassification, translatePays } from './utils/recapitulatif-translations';
import type { DevisLanguage } from './src/i18n/devis/types';

interface AccordionProps {
  title: string;
  icon: React.ElementType;
  colorClass: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, icon: Icon, colorClass, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl ${colorClass} p-6 mb-4 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white text-lg">{title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pt-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RecapDevis() {
  const [devisData, setDevisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [acceptCGV, setAcceptCGV] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [userIp, setUserIp] = useState<string>('Récupération...');
  const [selectedLang, setSelectedLang] = useState<DevisLanguage>('fr');
  const [showCGVModal, setShowCGVModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);

  // Récupérer l'ID du devis depuis l'URL
  const devisId = window.location.pathname.split('/').pop();
  const urlParams = new URLSearchParams(window.location.search);
  const numeroDevis = urlParams.get('numero');

  // Utiliser la langue sélectionnée manuellement ou celle du devis
  const lang = selectedLang;
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);

  useEffect(() => {
    loadDevisData();
    fetchUserIp();
  }, [devisId]);

  // Initialiser la langue sélectionnée quand le devis est chargé
  useEffect(() => {
    if (devisData?.language) {
      // Vérifier si la langue du devis est complète pour RecapDevis
      const devisLang = devisData.language as DevisLanguage;
      if (RECAP_COMPLETE_LANGUAGES.includes(devisLang)) {
        setSelectedLang(devisLang);
      } else {
        // Si la langue n'est pas complète, utiliser français par défaut
        console.warn(`⚠️ Langue ${devisLang} non complète pour RecapDevis. Utilisation du français.`);
        setSelectedLang('fr');
      }
    }
  }, [devisData]);

  const fetchUserIp = async () => {
    try {
      // Utiliser un service public pour récupérer l'IP
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setUserIp(data.ip);
    } catch (error) {
      console.error('Erreur récupération IP:', error);
      setUserIp('Non disponible');
    }
  };

  const loadDevisData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/${devisId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Devis non trouvé');
      }

      const result = await response.json();
      setDevisData(result.data);
    } catch (error) {
      console.error('Erreur chargement devis:', error);
      toast.error('Impossible de charger le devis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      toast.info('Génération du PDF en cours...');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/generer-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            devisId,
            inclureCGV: true
          })
        }
      );

      if (!response.ok) {
        throw new Error('Erreur génération PDF');
      }

      const result = await response.json();
      
      // Télécharger le PDF
      if (result.pdfUrl) {
        window.open(result.pdfUrl, '_blank');
        toast.success('PDF généré avec succès !');
      }
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      toast.error('Impossible de générer le PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSignDevis = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      toast.error(t.pageRecap.signature.erreurSignatureVide);
      return;
    }

    if (!acceptCGV) {
      toast.error(t.pageRecap.signature.erreurCGV);
      return;
    }

    try {
      setIsSigning(true);
      const signatureData = signatureRef.current.toDataURL();

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/signer-devis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            devisId,
            signatureBase64: signatureData,
            accepteCGV: true
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur backend signature:', errorData);
        throw new Error(errorData.error || t.pageRecap.erreurs.signature);
      }

      const result = await response.json();
      
      toast.success(t.pageRecap.toast.signatureSucces);
      
      // Recharger les données
      await loadDevisData();
      setShowSignature(false);
    } catch (error) {
      console.error('❌ Erreur signature:', error);
      toast.error(`${t.pageRecap.erreurs.signature} : ${error.message}`);
    } finally {
      setIsSigning(false);
    }
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  if (isLoading || isLoadingTranslations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white/70">{isLoadingTranslations ? 'Chargement des traductions...' : 'Chargement du devis...'}</p>
        </div>
      </div>
    );
  }

  if (!devisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <p className="text-white text-center">Devis non trouvé</p>
        </Card>
      </div>
    );
  }

  // Vérifier que les traductions sont complètes avant de rendre
  if (!t.pageRecap || !t.pageRecap.header) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white/70">Chargement des traductions...</p>
        </div>
      </div>
    );
  }

  // Vérifier que toutes les sections critiques existent
  const sectionsRequises = [
    t.pageRecap.header,
    t.pageRecap.entreprise,
    t.pageRecap.contact,
    t.pageRecap.postes,
    t.pageRecap.conditions,
    t.pageRecap.candidats,
    t.pageRecap.signature,
    t.pageRecap.statut,
    t.pageRecap.dates
  ];

  const sectionsManquantes = sectionsRequises.some(section => !section);
  
  if (sectionsManquantes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-lg w-full mx-4">
          <div className="text-center mb-6">
            <p className="text-white text-xl mb-4">⚠️ Traductions incomplètes pour cette langue</p>
            <p className="text-white/70 text-sm mb-8">
              Certaines sections ne sont pas encore disponibles. Veuillez utiliser le français, l'anglais, l'allemand, l'espagnol, l'italien, le polonais ou le roumain.
            </p>
          </div>
          
          {/* Bouton Retour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => window.history.back()}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 
                         hover:border-white/40 backdrop-blur-md text-white px-6 py-3 rounded-full 
                         transition-all duration-300 shadow-lg hover:shadow-white/20"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t.navigation.back}</span>
              </motion.div>
              
              {/* Effet shimmer au hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                              transition-transform duration-700 bg-gradient-to-r from-transparent 
                              via-white/20 to-transparent" />
            </Button>
          </motion.div>
        </Card>
      </div>
    );
  }

  const isSigned = devisData.statut === 'signe';
  const majorations = calculerMajorationsDevis({
    delaiPaiement: devisData.conditions?.delaiPaiement,
    experience: devisData.candidats?.experience,
    permis: devisData.candidats?.permis,
    langues: devisData.candidats?.langues,
    outillage: devisData.candidats?.outillage,
  });
  const postes = Array.isArray(devisData.postes) ? devisData.postes : [];
  const totalPostes = postes.length;
  const totalCandidats = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
  const entrepriseAdresse = [
    devisData.entreprise?.adresse,
    devisData.entreprise?.codePostal,
    devisData.entreprise?.ville,
    devisData.entreprise?.region,
    devisData.entreprise?.pays,
  ].filter(Boolean).join(' ');

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Devis {numeroDevis} | YOJOB</title>
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Bouton Retour */}
                <motion.button
                  onClick={() => window.history.back()}
                  whileHover={{ scale: 1.05, x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 group"
                >
                  <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-white/70 group-hover:text-white text-sm hidden sm:inline transition-colors">
                    {lang === 'fr' ? 'Retour' : 
                     lang === 'en' ? 'Back' : 
                     lang === 'de' ? 'Zurück' : 
                     lang === 'es' ? 'Volver' : 
                     lang === 'it' ? 'Indietro' : 
                     lang === 'pl' ? 'Powrót' : 
                     lang === 'ro' ? 'Înapoi' : 'Retour'}
                  </span>
                </motion.button>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[10px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <LogoSvg className="w-8 h-8" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-white text-xl">YOJOB</h1>
                  <p className="text-white/60 text-sm">{t.pageRecap.header.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Sélecteur de langue unifié */}
                <LanguageSelector
                  currentLanguage={selectedLang}
                  onLanguageChange={(lang) => setSelectedLang(lang as DevisLanguage)}
                  availableLanguages={RECAP_COMPLETE_LANGUAGES}
                  variant="default"
                  languageSource="devis"
                />

                <div className="relative group">
                  <Button
                    onClick={isSigned ? handleGeneratePDF : undefined}
                    disabled={!isSigned || isGeneratingPDF}
                    className={`relative overflow-hidden rounded-full shadow-lg transition-all ${
                      isSigned 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white hover:shadow-violet-500/50' 
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isGeneratingPDF ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {t.pageRecap.header.exportPDF}
                  </Button>
                  {!isSigned && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="bg-gradient-to-br from-violet-900 to-purple-900 border border-violet-400/50 rounded-xl p-3 shadow-2xl backdrop-blur-md">
                        <p className="text-white text-sm text-center">
                          🔒 {lang === 'fr' ? 'Signez votre devis pour débloquer le PDF officiel' : 'Semnați pentru a debloca PDF-ul oficial'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <Button
                    onClick={() => isSigned && setShowPrintModal(true)}
                    disabled={!isSigned}
                    className={`relative overflow-hidden rounded-full shadow-lg transition-all ${
                      isSigned 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white hover:shadow-violet-500/50' 
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {lang === 'fr' ? 'Aperçu & Impression' : 'Previzualizare & Imprimare'}
                  </Button>
                  {!isSigned && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="bg-gradient-to-br from-violet-900 to-purple-900 border border-violet-400/50 rounded-xl p-3 shadow-2xl backdrop-blur-md">
                        <p className="text-white text-sm text-center">
                          🔒 {lang === 'fr' ? 'Signez votre devis pour débloquer le PDF officiel' : 'Semnați pentru a debloca PDF-ul oficial'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* En-tête du devis */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-2xl text-white">{numeroDevis || devisData.numero}</h2>
                    </div>
                    <p className="text-white/60 text-sm">
                      {t.pageRecap.dates.creeLe} {new Date(devisData.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')} {t.pageRecap.dates.a} {new Date(devisData.createdAt).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'ro-RO', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge 
                    className={`text-sm px-4 py-2 ${
                      isSigned 
                        ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                        : 'bg-orange-500/20 text-orange-300 border-orange-400/30'
                    }`}
                  >
                    {isSigned ? `✅ ${t.pageRecap.statut.signe}` : `⏳ ${t.pageRecap.statut.nouveau}`}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Accordions */}
          <Accordion 
            title={t.pageRecap.entreprise.title}
            icon={Building2} 
            colorClass="bg-blue-500/10"
            defaultOpen={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.entreprise.raisonSociale}</p>
                <p className="text-white font-medium">{devisData.entreprise.raisonSociale}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.entreprise.siret}</p>
                <p className="text-white font-medium">{devisData.entreprise.siret}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.entreprise.codeAPE}</p>
                <p className="text-white font-medium">{devisData.entreprise.codeAPE}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.entreprise.tvaIntracommunautaire}</p>
                <p className="text-white font-medium">{devisData.entreprise.tvaIntracommunautaire}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 text-sm mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t.pageRecap.entreprise.adresse}
                </p>
                <p className="text-white font-medium">
                  {devisData.entreprise.adresse}<br />
                  {devisData.entreprise.codePostal} {devisData.entreprise.ville}<br />
                  {devisData.entreprise.region}
                </p>
              </div>
              {devisData.entreprise.siteInternet && (
                <div className="md:col-span-2">
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.entreprise.siteInternet}</p>
                  <a 
                    href={devisData.entreprise.siteInternet} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    {devisData.entreprise.siteInternet}
                  </a>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion 
            title={t.pageRecap.contact.title}
            icon={User} 
            colorClass="bg-violet-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.contact.nomComplet}</p>
                <p className="text-white font-medium">
                  {devisData.contact.prenom} {devisData.contact.nom}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.contact.fonction}</p>
                <p className="text-white font-medium">{devisData.contact.fonction}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.contact.email}</p>
                <a 
                  href={`mailto:${devisData.contact.email}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {devisData.contact.email}
                </a>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.contact.telephonePortable}</p>
                <a 
                  href={`tel:${devisData.contact.telephonePortable}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {devisData.contact.telephonePortable}
                </a>
              </div>
              {devisData.contact.telephoneFixe && (
                <div>
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.contact.telephoneFixe}</p>
                  <a 
                    href={`tel:${devisData.contact.telephoneFixe}`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    {devisData.contact.telephoneFixe}
                  </a>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion 
            title={`${t.pageRecap.postes.title} (${devisData.postes?.length || 0})`}
            icon={Briefcase} 
            colorClass="bg-green-500/10"
          >
            <div className="space-y-4">
              {devisData.postes?.map((poste: any, index: number) => {
                const tauxHoraireBrut = poste.tauxHoraireBrut ?? (poste.salaireBrut ? poste.salaireBrut / 151.67 : 0);
                const tauxETTBase = calculerTauxETTComplet(
                  tauxHoraireBrut,
                  poste.coeffBase || 1.92,
                  poste.facteurPays || 1.00,
                  3.50,
                  1.50,
                  {
                    hebergementNonFourni: !devisData.conditions?.hebergement?.chargeEU,
                    transportETT: devisData.conditions?.transportLocal?.chargeETT
                  }
                );
                const tauxETTMajore = appliquerMajorationTaux(tauxETTBase, majorations.total);

                return (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium text-lg">{translatePoste(poste.secteur, poste.poste, lang)}</h4>
                      <p className="text-white/70 text-sm">{translateSecteur(poste.secteur, lang)} • {translateClassification(poste.secteur, poste.classification, lang)}</p>
                      {poste.labelPays && (
                        <p className="text-cyan-300/80 text-sm mt-1">
                          📍 {t.pageRecap.postes.nationalite}: {translatePays(poste.labelPays, lang)}
                        </p>
                      )}
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">
                      × {poste.quantite}
                    </Badge>
                  </div>
                  <Separator className="my-3 bg-white/10" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-white/60 mb-1">{t.pageRecap.postes.salaireBrut}</p>
                      <p className="text-white font-medium">{formaterMontant(poste.salaireBrut)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">{t.pageRecap.postes.tauxHoraireBrut}</p>
                      <p className="text-white font-medium">{formaterMontant(tauxHoraireBrut)}/h</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">{t.pageRecap.postes.coefficientETT}</p>
                      <p className="text-green-400 font-medium">{poste.coeffFinal?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">{t.pageRecap.postes.tauxETT}</p>
                      <p className="text-green-400 font-medium">{formaterMontant(tauxETTMajore)}/h</p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </Accordion>

          <Accordion 
            title={t.pageRecap.conditions.title}
            icon={Calendar} 
            colorClass="bg-orange-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.dateDebut}</p>
                <p className="text-white font-medium">
                  {devisData.conditions.dateDebut ? new Date(devisData.conditions.dateDebut).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.dateFin}</p>
                <p className="text-white font-medium">
                  {devisData.conditions.dateFin ? new Date(devisData.conditions.dateFin).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.periodeEssai}</p>
                <p className="text-white font-medium">{devisData.conditions.periodeEssai} {t.common.months}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.baseHoraire}</p>
                <p className="text-white font-medium">{devisData.conditions.baseHoraire}{t.pageRecap.conditions.heuresMois}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.lieuxMission}</p>
                <p className="text-white font-medium">{devisData.conditions.lieuxMission}</p>
              </div>
              {devisData.conditions.motifRecours && (
                <div className="md:col-span-2">
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.conditions.motifRecours}</p>
                  <p className="text-white font-medium">{devisData.conditions.motifRecours}</p>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion 
            title={t.pageRecap.candidats.title}
            icon={Users} 
            colorClass="bg-pink-500/10"
          >
            <div className="space-y-4">
              {devisData.candidats?.experience?.obligatoire && (
                <div>
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.candidats.experience}</p>
                  <p className="text-white font-medium">
                    {devisData.candidats.experience.annees} {t.pageRecap.candidats.ansMinimum}
                  </p>
                </div>
              )}
              {devisData.candidats?.formation?.obligatoire && (
                <div>
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.candidats.formation}</p>
                  <p className="text-white font-medium">{devisData.candidats.formation.type}</p>
                </div>
              )}
              {devisData.candidats?.permis?.requis && (
                <div>
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.candidats.permis}</p>
                  <p className="text-white font-medium">{devisData.candidats.permis.categorie}</p>
                </div>
              )}
              {Object.keys(devisData.candidats?.langues || {}).length > 0 && (
                <div>
                  <p className="text-white/60 text-sm mb-1">{t.pageRecap.candidats.langues}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(devisData.candidats.langues).map(([langue, niveau]) => (
                      <Badge key={langue} className="bg-white/10 text-white border-white/20">
                        {langue}: {niveau}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Accordion>

          {/* Section Signature */}
          {!isSigned && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-md border-violet-400/30 shadow-2xl">
                <CardContent className="p-8">
                  {/* Badge incitatif */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center animate-pulse">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white">
                          🔒 {lang === 'fr' ? 'Signez maintenant pour recevoir votre PDF officiel' : 'Semnați acum pentru a primi PDF-ul oficial'}
                        </p>
                        <p className="text-cyan-300 text-sm mt-1">
                          {lang === 'fr' ? 'Le document sera disponible immédiatement après signature' : 'Documentul va fi disponibil imediat după semnare'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/50">
                      <PenTool className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white text-2xl mb-2">{t.pageRecap.signature.title}</h3>
                    <p className="text-white/70">{t.pageRecap.signature.subtitle}</p>
                  </div>

                  {!showSignature ? (
                    <Button
                      onClick={() => setShowSignature(true)}
                      className="w-full relative overflow-hidden group rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/50 transition-all py-6 text-lg"
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      {t.pageRecap.signature.commencer}
                    </Button>
                  ) : (
                    <div className="space-y-6">
                      {/* Récapitulatif d'identité du signataire */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/20">
                        <h4 className="text-white mb-4 flex items-center gap-2">
                          <User className="w-5 h-5" />
                          {t.pageRecap.signature.identiteSignataire}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.nomComplet}</p>
                            <p className="text-white font-medium">
                              {devisData.contact.prenom} {devisData.contact.nom}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.fonction}</p>
                            <p className="text-white font-medium">{devisData.contact.fonction}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.email}</p>
                            <p className="text-cyan-400 font-medium">{devisData.contact.email}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.entreprise}</p>
                            <p className="text-white font-medium">{devisData.entreprise.raisonSociale}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.siret}</p>
                            <p className="text-white font-medium font-mono">{devisData.entreprise.siret}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">{t.pageRecap.signature.adresseIP}</p>
                            <p className="text-green-400 font-medium font-mono">{userIp}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-white/70 text-xs leading-relaxed">
                            {t.pageRecap.signature.infoLegale}
                          </p>
                        </div>
                      </div>

                      {/* Canvas de signature */}
                      <div>
                        <Label className="text-white mb-2 block">{t.pageRecap.signature.dessinerSignature}</Label>
                        <div className="border-2 border-dashed border-white/30 rounded-xl bg-white p-2">
                          <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                              className: 'w-full h-40 rounded-lg',
                              style: { touchAction: 'none' }
                            }}
                            backgroundColor="rgb(255, 255, 255)"
                            penColor="rgb(0, 0, 0)"
                          />
                        </div>
                        <Button
                          onClick={clearSignature}
                          variant="ghost"
                          className="mt-2 text-white/70 hover:text-white"
                        >
                          {t.pageRecap.signature.effacer}
                        </Button>
                      </div>

                      {/* Acceptation CGV */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <Checkbox 
                          id="cgv" 
                          checked={acceptCGV}
                          onCheckedChange={(checked) => setAcceptCGV(checked as boolean)}
                          className="mt-1"
                        />
                        <Label htmlFor="cgv" className="text-white/90 text-sm leading-relaxed cursor-pointer">
                          {t.pageRecap.signature.accepteCGV}{' '}
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowCGVModal(true);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 underline"
                          >
                            {t.pageRecap.signature.cgvLien}
                          </button>
                          {' '}{t.pageRecap.signature.accepteCGVSuite}
                        </Label>
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex gap-4">
                        <Button
                          onClick={() => setShowSignature(false)}
                          variant="outline"
                          className="flex-1 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all"
                        >
                          {t.pageRecap.signature.annuler}
                        </Button>
                        <Button
                          onClick={handleSignDevis}
                          disabled={!acceptCGV || isSigning}
                          className="flex-1 relative overflow-hidden group rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSigning ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              {t.pageRecap.signature.signatureEnCours}
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              {t.pageRecap.signature.validerSigner}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Devis signé */}
          {isSigned && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border-green-400/30 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white text-2xl mb-2">{t.pageRecap.succes.title}</h3>
                  <p className="text-white/70 mb-4">
                    {t.pageRecap.succes.message}
                  </p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30 mb-4">
                    {t.pageRecap.succes.signeLe} {new Date(devisData.updatedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')} {t.pageRecap.dates.a} {new Date(devisData.updatedAt).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'ro-RO', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                  
                  {/* Message déblocage PDF */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white">
                          ✅ {lang === 'fr' ? 'PDF débloqué !' : 'PDF deblocat!'}
                        </p>
                        <p className="text-cyan-300 text-sm">
                          {lang === 'fr' ? 'Vous pouvez maintenant télécharger votre devis officiel en haut de page' : 'Puteți descărca acum oferta oficială în partea de sus'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm">
              {t.pageRecap.dates.derniereModification} {new Date(devisData.updatedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')} {t.pageRecap.dates.a} {new Date(devisData.updatedAt).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'ro-RO', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Modale Aperçu Avant Impression */}
        <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 print:bg-white print:shadow-none">
            <DialogHeader className="print:hidden">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  {lang === 'fr' ? 'Aperçu du devis' : 'Previzualizare ofertă'}
                </DialogTitle>
                <Button
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/50"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  {lang === 'fr' ? 'Imprimer / Enregistrer PDF' : 'Imprimare / Salvare PDF'}
                </Button>
              </div>
            </DialogHeader>
            
            {/* Vérification des données avant rendu */}
            {!devisData ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            ) : (
              /* Contenu du devis optimisé pour l'impression */
              <div className="mt-6 space-y-6 px-6 print:px-8" id="printable-content">
              <div className="hidden print:block text-gray-900">
                <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h1 className="text-2xl font-bold">YOJOB</h1>
                    <p className="text-xs text-gray-600">
                      {lang === 'fr' ? 'Courtage en recrutement européen' : 'Recrutare europeană'}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold">{numeroDevis || devisData.numero}</p>
                    <p>{new Date(devisData.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')}</p>
                    <p>{isSigned ? t.pageRecap.statut.signe : t.pageRecap.statut.nouveau}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                  <div>
                    <h2 className="text-sm font-semibold mb-2">{t.pageRecap.entreprise.title}</h2>
                    <p>{devisData.entreprise.raisonSociale}</p>
                    <p>{t.pageRecap.entreprise.siret}: {devisData.entreprise.siret || 'N/A'}</p>
                    <p>{t.pageRecap.entreprise.codeAPE}: {devisData.entreprise.codeAPE || 'N/A'}</p>
                    <p>{t.pageRecap.entreprise.tvaIntracommunautaire}: {devisData.entreprise.tvaIntracommunautaire || 'N/A'}</p>
                    <p className="mt-2">{entrepriseAdresse || 'N/A'}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold mb-2">{t.pageRecap.contact.title}</h2>
                    <p>{devisData.contact.prenom} {devisData.contact.nom}</p>
                    <p>{t.pageRecap.contact.fonction}: {devisData.contact.fonction || 'N/A'}</p>
                    <p>{t.pageRecap.contact.email}: {devisData.contact.email || 'N/A'}</p>
                    <p>{t.pageRecap.contact.telephonePortable}: {devisData.contact.telephonePortable || devisData.contact.telephoneFixe || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-semibold mb-2">{t.pageRecap.postes.title}</h2>
                  <table className="w-full text-xs border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-2 border-b border-gray-200">Poste</th>
                        <th className="text-left p-2 border-b border-gray-200">Secteur</th>
                        <th className="text-left p-2 border-b border-gray-200">Classification</th>
                        <th className="text-right p-2 border-b border-gray-200">Qté</th>
                        <th className="text-right p-2 border-b border-gray-200">{t.pageRecap.postes.salaireBrut}</th>
                        <th className="text-right p-2 border-b border-gray-200">{t.pageRecap.postes.tauxETT}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postes.map((poste: any, index: number) => {
                        const salaireBrut = poste.salaireBrut ?? 0;
                        const tauxHoraireBrut = poste.tauxHoraireBrut ?? (poste.salaireBrut ? poste.salaireBrut / 151.67 : 0);
                        const tauxETTBase = calculerTauxETTComplet(
                          tauxHoraireBrut,
                          poste.coeffBase || 1.92,
                          poste.facteurPays || 1.00,
                          3.50,
                          1.50,
                          {
                            hebergementNonFourni: !devisData.conditions?.hebergement?.chargeEU,
                            transportETT: devisData.conditions?.transportLocal?.chargeETT
                          }
                        );
                        const tauxETTMajore = appliquerMajorationTaux(tauxETTBase, majorations.total);

                        return (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="p-2">{translatePoste(poste.secteur, poste.poste, lang)}</td>
                            <td className="p-2">{translateSecteur(poste.secteur, lang)}</td>
                            <td className="p-2">{translateClassification(poste.secteur, poste.classification, lang)}</td>
                            <td className="p-2 text-right">{poste.quantite || 0}</td>
                            <td className="p-2 text-right">{formaterMontant(salaireBrut)}</td>
                            <td className="p-2 text-right">{formaterMontant(tauxETTMajore)}/h</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-2 text-xs text-gray-600">
                    {lang === 'fr' ? 'Postes' : 'Posturi'}: {totalPostes} • {lang === 'fr' ? 'Candidats' : 'Candidați'}: {totalCandidats}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
                  <div>
                    <h2 className="text-sm font-semibold mb-2">{t.pageRecap.conditions.title}</h2>
                    <p>{t.pageRecap.conditions.dateDebut}: {devisData.conditions?.dateDebut ? new Date(devisData.conditions.dateDebut).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}</p>
                    <p>{t.pageRecap.conditions.dateFin}: {devisData.conditions?.dateFin ? new Date(devisData.conditions.dateFin).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}</p>
                    <p>{t.pageRecap.conditions.periodeEssai}: {devisData.conditions?.periodeEssai ? `${devisData.conditions.periodeEssai} ${t.common.months}` : 'N/A'}</p>
                    <p>{t.pageRecap.conditions.baseHoraire}: {devisData.conditions?.baseHoraire ? `${devisData.conditions.baseHoraire}${t.pageRecap.conditions.heuresMois}` : 'N/A'}</p>
                    <p>{t.pageRecap.conditions.lieuxMission}: {devisData.conditions?.lieuxMission || 'N/A'}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold mb-2">{lang === 'fr' ? 'Résumé' : 'Rezumat'}</h2>
                    <p>{lang === 'fr' ? 'Postes' : 'Posturi'}: {totalPostes}</p>
                    <p>{lang === 'fr' ? 'Candidats' : 'Candidați'}: {totalCandidats}</p>
                    <p>{lang === 'fr' ? 'Statut' : 'Status'}: {isSigned ? t.pageRecap.statut.signe : t.pageRecap.statut.nouveau}</p>
                  </div>
                </div>

                {isSigned && devisData.signature && (
                  <div className="mt-6 text-sm">
                    <h2 className="text-sm font-semibold mb-2">{lang === 'fr' ? 'Signature électronique' : 'Semnătură electronică'}</h2>
                    <p>{lang === 'fr' ? 'Signataire' : 'Semnatar'}: {devisData.signature.signataire?.prenom} {devisData.signature.signataire?.nom}</p>
                    <p>Email: {devisData.signature.signataire?.email || 'N/A'}</p>
                    <p>{lang === 'fr' ? 'Date' : 'Data'}: {devisData.signature.metadata?.timestampReadable || 'N/A'}</p>
                    <p>IP: {devisData.signature.metadata?.ipAddress || 'N/A'}</p>
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-500">
                  {lang === 'fr' ? 'Document généré le' : 'Document generat la'} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')}
                </div>
              </div>

              <div className="print:hidden">
              {/* En-tête avec logo premium */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-xl flex items-center justify-center print:bg-blue-600">
                        <LogoSvg className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl text-white print:text-gray-900">YOJOB</h1>
                        <p className="text-cyan-300 print:text-gray-600">{lang === 'fr' ? 'Courtage en recrutement européen' : 'Recrutare europeană'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-white print:text-gray-900">{numeroDevis || devisData.numero}</p>
                    <p className="text-sm text-white/70 print:text-gray-600">
                      {new Date(devisData.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')}
                    </p>
                    <Badge className={`mt-2 ${isSigned ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-orange-500/20 text-orange-300 border-orange-400/30'} print:bg-white print:border-gray-300`}>
                      {isSigned ? `✅ ${t.pageRecap.statut.signe}` : `⏳ ${t.pageRecap.statut.nouveau}`}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Informations entreprise */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center print:bg-blue-600">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl text-white print:text-gray-900">{t.pageRecap.entreprise.title}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.entreprise.raisonSociale}</p>
                    <p className="text-white print:text-gray-900">{devisData.entreprise.raisonSociale}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.entreprise.siret}</p>
                    <p className="text-white print:text-gray-900">{devisData.entreprise.siret}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.entreprise.codeAPE}</p>
                    <p className="text-white print:text-gray-900">{devisData.entreprise.codeAPE}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.entreprise.tvaIntracommunautaire}</p>
                    <p className="text-white print:text-gray-900">{devisData.entreprise.tvaIntracommunautaire}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 mt-1 print:text-gray-600" />
                      <div>
                        <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.entreprise.adresse}</p>
                        <p className="text-white print:text-gray-900">
                          {devisData.entreprise.adresse}<br />
                          {devisData.entreprise.codePostal} {devisData.entreprise.ville}<br />
                          {devisData.entreprise.region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personne de contact */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center print:bg-violet-600">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl text-white print:text-gray-900">{t.pageRecap.contact.title}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-violet-300 mb-2 print:text-gray-600">{t.pageRecap.contact.nomComplet}</p>
                    <p className="text-white print:text-gray-900">{devisData.contact.prenom} {devisData.contact.nom}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-violet-300 mb-2 print:text-gray-600">{t.pageRecap.contact.fonction}</p>
                    <p className="text-white print:text-gray-900">{devisData.contact.fonction}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-violet-300 mb-2 print:text-gray-600">{t.pageRecap.contact.email}</p>
                    <p className="text-white print:text-gray-900">{devisData.contact.email}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-violet-300 mb-2 print:text-gray-600">{t.pageRecap.contact.telephonePortable}</p>
                    <p className="text-white print:text-gray-900">{devisData.contact.telephonePortable}</p>
                  </div>
                </div>
              </div>

              {/* Postes à pourvoir */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center print:bg-cyan-600">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl text-white print:text-gray-900">{t.pageRecap.postes.title}</h2>
                </div>
                <div className="space-y-4">
                  {devisData.postes?.map((poste: any, index: number) => {
                    const tauxHoraireBrut = poste.tauxHoraireBrut ?? (poste.salaireBrut ? poste.salaireBrut / 151.67 : 0);
                    const tauxETTBase = calculerTauxETTComplet(
                      tauxHoraireBrut,
                      poste.coeffBase || 1.92,
                      poste.facteurPays || 1.00,
                      3.50,
                      1.50,
                      {
                        hebergementNonFourni: !devisData.conditions?.hebergement?.chargeEU,
                        transportETT: devisData.conditions?.transportLocal?.chargeETT
                      }
                    );
                    const tauxETTMajore = appliquerMajorationTaux(tauxETTBase, majorations.total);

                    return (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-5 print:bg-transparent print:border-gray-200 print:px-4 print:py-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white text-lg mb-1 print:text-gray-900">{translatePoste(poste.secteur, poste.poste, lang)}</h3>
                          <p className="text-sm text-cyan-300 print:text-gray-600">{translateSecteur(poste.secteur, lang)} • {translateClassification(poste.secteur, poste.classification, lang)}</p>
                          {poste.labelPays && (
                            <div className="flex items-center gap-2 mt-2">
                              <MapPin className="w-4 h-4 text-blue-400 print:text-blue-600" />
                              <p className="text-sm text-blue-300 print:text-blue-600">
                                {t.pageRecap.postes.nationalite}: {translatePays(poste.labelPays, lang)}
                              </p>
                            </div>
                          )}
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 print:bg-blue-100 print:text-blue-800">
                          × {poste.quantite}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm mt-4 pt-4 border-t border-white/10 print:border-gray-200">
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.postes.salaireBrut}</p>
                          <p className="text-white print:text-gray-900">{formaterMontant(poste.salaireBrut)}</p>
                        </div>
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.postes.tauxHoraireBrut}</p>
                          <p className="text-white print:text-gray-900">{formaterMontant(tauxHoraireBrut)}/h</p>
                        </div>
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.postes.coefficientETT}</p>
                          <p className="text-green-300 print:text-green-700">{poste.coeffFinal?.toFixed(2) || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">{t.pageRecap.postes.tauxETT}</p>
                          <p className="text-green-300 print:text-green-700">{formaterMontant(tauxETTMajore)}/h</p>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Conditions de mission */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center print:bg-purple-600">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl text-white print:text-gray-900">{t.pageRecap.conditions.title}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-purple-300 mb-2 print:text-gray-600">{t.pageRecap.conditions.dateDebut}</p>
                    <p className="text-white print:text-gray-900">
                      {devisData.conditions.dateDebut ? new Date(devisData.conditions.dateDebut).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-purple-300 mb-2 print:text-gray-600">{t.pageRecap.conditions.dateFin}</p>
                    <p className="text-white print:text-gray-900">
                      {devisData.conditions.dateFin ? new Date(devisData.conditions.dateFin).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-purple-300 mb-2 print:text-gray-600">{t.pageRecap.conditions.periodeEssai}</p>
                    <p className="text-white print:text-gray-900">{devisData.conditions.periodeEssai} {t.common.months}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-purple-300 mb-2 print:text-gray-600">{t.pageRecap.conditions.baseHoraire}</p>
                    <p className="text-white print:text-gray-900">{devisData.conditions.baseHoraire}{t.pageRecap.conditions.heuresMois}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 p-4 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200">
                    <p className="text-purple-300 mb-2 print:text-gray-600">{t.pageRecap.conditions.lieuxMission}</p>
                    <p className="text-white print:text-gray-900">{devisData.conditions.lieuxMission}</p>
                  </div>
                </div>
              </div>

              {/* Informations de signature - NOUVELLE SECTION */}
              {isSigned && devisData.signature && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center print:bg-green-600">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl text-white print:text-gray-900">
                      {lang === 'fr' ? 'Signature électronique' : 'Semnătură electronică'}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Signataire */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200 print:px-4">
                      <h3 className="text-white mb-4 print:text-gray-900">
                        {lang === 'fr' ? 'Signataire' : 'Semnatar'}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Nom complet' : 'Nume complet'}
                          </p>
                          <p className="text-white print:text-gray-900">
                            {devisData.signature.signataire?.prenom} {devisData.signature.signataire?.nom}
                          </p>
                        </div>
                        <div>
                          <p className="text-green-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Fonction' : 'Funcție'}
                          </p>
                          <p className="text-white print:text-gray-900">
                            {devisData.signature.signataire?.fonction}
                          </p>
                        </div>
                        <div>
                          <p className="text-green-300 mb-2 print:text-gray-600">Email</p>
                          <p className="text-white print:text-gray-900">
                            {devisData.signature.signataire?.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-green-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Entreprise' : 'Companie'}
                          </p>
                          <p className="text-white print:text-gray-900">
                            {devisData.signature.signataire?.entreprise}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Traçabilité technique */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200 print:px-4">
                      <h3 className="text-white mb-4 print:text-gray-900">
                        {lang === 'fr' ? 'Traçabilité technique' : 'Trasabilitate tehnică'}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Date et heure' : 'Data și ora'}
                          </p>
                          <p className="text-white print:text-gray-900">
                            {devisData.signature.metadata?.timestampReadable || 
                             new Date(devisData.updatedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO') + ' ' + 
                             new Date(devisData.updatedAt).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'ro-RO', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-cyan-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Adresse IP' : 'Adresă IP'}
                          </p>
                          <p className="text-green-300 font-mono print:text-green-700">
                            {devisData.signature.metadata?.ipAddress || 'N/A'}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-cyan-300 mb-2 print:text-gray-600">
                            {lang === 'fr' ? 'Navigateur' : 'Browser'}
                          </p>
                          <p className="text-white text-xs print:text-gray-900 break-all">
                            {devisData.signature.metadata?.userAgent?.substring(0, 100) || 'N/A'}...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image de signature */}
                    {devisData.signature.image && (
                      <div className="bg-white/5 p-6 rounded-xl border border-white/10 print:bg-transparent print:border-gray-200 print:px-4">
                        <h3 className="text-white mb-4 print:text-gray-900">
                          {lang === 'fr' ? 'Signature manuscrite' : 'Semnătură manuscrisă'}
                        </h3>
                        <div className="bg-white p-4 rounded-lg">
                          <img 
                            src={devisData.signature.image} 
                            alt="Signature" 
                            className="max-w-md mx-auto h-24 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer premium */}
              <div className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center print:bg-white print:border-gray-300 print:backdrop-blur-none print:px-6 print:py-6">
                <p className="text-white/80 text-sm print:text-gray-600">
                  {lang === 'fr' ? 'Document généré le' : 'Document generat la'} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ro-RO')}
                </p>
                <p className="text-cyan-300 mt-2 print:text-gray-900">YOJOB - {lang === 'fr' ? 'Courtage en recrutement européen' : 'Recrutare europeană'}</p>
                <div className="flex items-center justify-center gap-2 mt-4 print:hidden">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              </div>
            </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modale CGV */}
        <Dialog open={showCGVModal} onOpenChange={setShowCGVModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-violet-900/95 to-cyan-900/95 backdrop-blur-xl border-white/20 px-8">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyan-400" />
                {lang === 'fr' ? 'Conditions Générales de Vente' : 'Condiții Generale de Vânzare'}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 space-y-6 text-white/90 px-6">
              {lang === 'fr' ? (
                <>
                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">1. Objet</h3>
                    <p className="text-sm leading-relaxed">
                      Les présentes Conditions Générales de Vente (CGV) régissent la relation contractuelle entre YOJOB, 
                      société spécialisée dans le courtage en recrutement européen, et ses clients pour toute prestation de service.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">2. Services</h3>
                    <p className="text-sm leading-relaxed mb-2">
                      YOJOB propose les services suivants :
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Mise à disposition de personnel intérimaire européen</li>
                      <li>Recrutement spécialisé dans 27 pays</li>
                      <li>Conseil et conformité en matière de détachement transnational</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">3. Tarification</h3>
                    <p className="text-sm leading-relaxed">
                      Les tarifs sont établis sur la base des coefficients applicables par secteur d'activité et pays d'origine 
                      du travailleur. Ils incluent les charges patronales, les frais de gestion, et les coûts de conformité légale.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">4. Modalités de paiement</h3>
                    <p className="text-sm leading-relaxed">
                      Les factures sont payables à réception par virement bancaire sous 30 jours. 
                      Tout retard de paiement entraîne l'application de pénalités de retard au taux légal en vigueur.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">5. Obligations du client</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Fournir des informations exactes et complètes</li>
                      <li>Respecter la réglementation du travail en vigueur</li>
                      <li>Assurer la sécurité et l'hygiène sur les lieux de mission</li>
                      <li>Valider les heures travaillées dans les délais convenus</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">6. Obligations de YOJOB</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Mettre à disposition des travailleurs qualifiés</li>
                      <li>Assurer la conformité légale du détachement</li>
                      <li>Gérer les formalités administratives</li>
                      <li>Garantir le respect de la législation sociale</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">7. Responsabilité</h3>
                    <p className="text-sm leading-relaxed">
                      YOJOB ne peut être tenu responsable des dommages indirects résultant de l'exécution ou de la non-exécution 
                      du contrat. La responsabilité de YOJOB est limitée au montant des prestations facturées.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">8. Protection des données</h3>
                    <p className="text-sm leading-relaxed">
                      YOJOB s'engage à respecter la réglementation RGPD en vigueur concernant la collecte et le traitement des données personnelles. 
                      Les données sont conservées de manière sécurisée et ne sont jamais transmises à des tiers sans consentement.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">9. Droit applicable et juridiction</h3>
                    <p className="text-sm leading-relaxed">
                      Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de Paris seront seuls compétents.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">10. Signature électronique</h3>
                    <p className="text-sm leading-relaxed">
                      La signature électronique du présent devis a la même valeur juridique qu'une signature manuscrite conformément 
                      au Règlement eIDAS (UE) n°910/2014. Un certificat de signature incluant un horodatage et l'adresse IP du signataire 
                      est généré et archivé de manière sécurisée.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">1. Obiect</h3>
                    <p className="text-sm leading-relaxed">
                      Prezentele Condiții Generale de Vânzare (CGV) reglementează relația contractuală între YOJOB, 
                      companie specializată în medierea recrutării europene, și clienții săi pentru orice serviciu prestat.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">2. Servicii</h3>
                    <p className="text-sm leading-relaxed mb-2">
                      YOJOB oferă următoarele servicii:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Punerea la dispoziție de personal temporar european</li>
                      <li>Recrutare specializată în 27 de țări</li>
                      <li>Consultanță și conformitate în materie de detașare transnațională</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">3. Prețuri</h3>
                    <p className="text-sm leading-relaxed">
                      Tarifele sunt stabilite pe baza coeficienților aplicabili pe sector de activitate și țara de origine 
                      a lucrătorului. Acestea includ contribuțiile angajatorului, cheltuielile de administrare și costurile de conformitate legală.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">4. Modalități de plată</h3>
                    <p className="text-sm leading-relaxed">
                      Facturile sunt plătibile la primire prin transfer bancar în termen de 30 de zile. 
                      Orice întârziere de plată atrage penalități de întârziere la rata legală în vigoare.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">5. Obligațiile clientului</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Furnizarea de informații exacte și complete</li>
                      <li>Respectarea legislației muncii în vigoare</li>
                      <li>Asigurarea securității și igienei la locul de muncă</li>
                      <li>Validarea orelor lucrate în termenele convenite</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">6. Obligațiile YOJOB</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                      <li>Punerea la dispoziție de lucrători calificați</li>
                      <li>Asigurarea conformității legale a detașării</li>
                      <li>Gestionarea formalităților administrative</li>
                      <li>Garantarea respectării legislației sociale</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">7. Responsabilitate</h3>
                    <p className="text-sm leading-relaxed">
                      YOJOB nu poate fi tras la răspundere pentru daunele indirecte rezultate din executarea sau neexecutarea 
                      contractului. Responsabilitatea YOJOB este limitată la valoarea serviciilor facturate.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">8. Protecția datelor</h3>
                    <p className="text-sm leading-relaxed">
                      YOJOB se angajează să respecte reglementarea GDPR în vigoare privind colectarea și prelucrarea datelor personale. 
                      Datele sunt păstrate în siguranță și nu sunt niciodată transmise terților fără consimțământ.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">9. Legea aplicabilă și jurisdicția</h3>
                    <p className="text-sm leading-relaxed">
                      Prezentele CGV sunt supuse dreptului francez. În caz de litigiu, tribunalele din Paris vor fi singurele competente.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg mb-3 text-cyan-400">10. Semnătura electronică</h3>
                    <p className="text-sm leading-relaxed">
                      Semnătura electronică a acestei oferte are aceeași valoare juridică ca o semnătură manuscrisă conform 
                      Regulamentului eIDAS (UE) nr. 910/2014. Un certificat de semnătură incluzând o ștampilă de timp și adresa IP a semnatarului 
                      este generat și arhivat în siguranță.
                    </p>
                  </section>
                </>
              )}

              <div className="mt-8 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                <p className="text-sm text-center text-white/80">
                  {lang === 'fr' 
                    ? 'En signant ce devis, vous acceptez les présentes conditions générales de vente.'
                    : 'Prin semnarea acestei oferte, acceptați prezentele condiții generale de vânzare.'
                  }
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
