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
  PenTool
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Checkbox } from './components/ui/checkbox';
import { Label } from './components/ui/label';
import { LogoSvg } from './imports/YojobLogoComplete';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from './utils/supabase/info';
import SignatureCanvas from 'react-signature-canvas';
import { formaterMontant } from './utils/devis-calculations';

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
  const signatureRef = useRef<SignatureCanvas>(null);

  // Récupérer l'ID du devis depuis l'URL
  const devisId = window.location.pathname.split('/').pop();
  const urlParams = new URLSearchParams(window.location.search);
  const numeroDevis = urlParams.get('numero');

  useEffect(() => {
    loadDevisData();
    fetchUserIp();
  }, [devisId]);

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
      toast.error('Veuillez signer avant de valider');
      return;
    }

    if (!acceptCGV) {
      toast.error('Veuillez accepter les CGV');
      return;
    }

    try {
      setIsSigning(true);
      const signatureData = signatureRef.current.toDataURL();

      console.log('📝 Démarrage signature électronique...');
      console.log('🔐 Informations de traçabilité:');
      console.log(`  - Signataire: ${devisData.contact.prenom} ${devisData.contact.nom}`);
      console.log(`  - Email: ${devisData.contact.email}`);
      console.log(`  - Entreprise: ${devisData.entreprise.raisonSociale}`);
      console.log(`  - SIRET: ${devisData.entreprise.siret}`);
      console.log(`  - Adresse IP: ${userIp}`);
      console.log(`  - Timestamp: ${new Date().toISOString()}`);

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
        throw new Error(errorData.error || 'Erreur lors de la signature');
      }

      const result = await response.json();
      
      console.log('✅ Signature réussie avec certificat:', result.certificat);
      console.log('🔒 Hash SHA-256:', result.certificat?.integrite?.documentHash);
      console.log('📍 IP enregistrée:', result.certificat?.metadata?.ipAddress);
      console.log('🕐 Timestamp:', result.certificat?.metadata?.timestampReadable);
      
      toast.success('Devis signé avec succès ! Un email de confirmation vous a été envoyé.');
      
      // Recharger les données
      await loadDevisData();
      setShowSignature(false);
    } catch (error) {
      console.error('❌ Erreur signature:', error);
      toast.error(`Impossible de signer le devis : ${error.message}`);
    } finally {
      setIsSigning(false);
    }
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white/70">Chargement du devis...</p>
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

  const isSigned = devisData.statut === 'signe';

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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[10px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <LogoSvg className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h1 className="text-white text-xl">YOJOB</h1>
                  <p className="text-white/60 text-sm">Récapitulatif de devis</p>
                </div>
              </div>

              <Button
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
                className="relative overflow-hidden group rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/50 transition-all"
              >
                {isGeneratingPDF ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Export PDF
              </Button>
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
                      Créé le {new Date(devisData.createdAt).toLocaleDateString('fr-FR')} à {new Date(devisData.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge 
                    className={`text-sm px-4 py-2 ${
                      isSigned 
                        ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                        : 'bg-orange-500/20 text-orange-300 border-orange-400/30'
                    }`}
                  >
                    {isSigned ? '✅ Signé' : '⏳ Nouveau'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Accordions */}
          <Accordion 
            title="Informations entreprise" 
            icon={Building2} 
            colorClass="bg-blue-500/10"
            defaultOpen={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Raison sociale</p>
                <p className="text-white font-medium">{devisData.entreprise.raisonSociale}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">SIRET</p>
                <p className="text-white font-medium">{devisData.entreprise.siret}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Code APE</p>
                <p className="text-white font-medium">{devisData.entreprise.codeAPE}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">TVA Intracommunautaire</p>
                <p className="text-white font-medium">{devisData.entreprise.tvaIntracommunautaire}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 text-sm mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Adresse
                </p>
                <p className="text-white font-medium">
                  {devisData.entreprise.adresse}<br />
                  {devisData.entreprise.codePostal} {devisData.entreprise.ville}<br />
                  {devisData.entreprise.region}
                </p>
              </div>
              {devisData.entreprise.siteInternet && (
                <div className="md:col-span-2">
                  <p className="text-white/60 text-sm mb-1">Site internet</p>
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
            title="Personne de contact" 
            icon={User} 
            colorClass="bg-violet-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Nom complet</p>
                <p className="text-white font-medium">
                  {devisData.contact.prenom} {devisData.contact.nom}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Fonction</p>
                <p className="text-white font-medium">{devisData.contact.fonction}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Email</p>
                <a 
                  href={`mailto:${devisData.contact.email}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {devisData.contact.email}
                </a>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Téléphone portable</p>
                <a 
                  href={`tel:${devisData.contact.telephonePortable}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {devisData.contact.telephonePortable}
                </a>
              </div>
              {devisData.contact.telephoneFixe && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Téléphone fixe</p>
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
            title={`Postes à pourvoir (${devisData.postes?.length || 0})`}
            icon={Briefcase} 
            colorClass="bg-green-500/10"
          >
            <div className="space-y-4">
              {devisData.postes?.map((poste: any, index: number) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium text-lg">{poste.poste}</h4>
                      <p className="text-white/70 text-sm">{poste.secteur} • {poste.classification}</p>
                      {poste.labelPays && (
                        <p className="text-cyan-300/80 text-sm mt-1">
                          📍 Nationalité: {poste.labelPays}
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
                      <p className="text-white/60 mb-1">Salaire brut</p>
                      <p className="text-white font-medium">{formaterMontant(poste.salaireBrut)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">Taux horaire brut</p>
                      <p className="text-white font-medium">{formaterMontant(poste.tauxHoraireBrut)}/h</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">Coefficient ETT</p>
                      <p className="text-green-400 font-medium">{poste.coeffFinal?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">Taux ETT</p>
                      <p className="text-green-400 font-medium">{formaterMontant(poste.tauxETT)}/h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion 
            title="Conditions de travail" 
            icon={Calendar} 
            colorClass="bg-orange-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Date de début</p>
                <p className="text-white font-medium">
                  {devisData.conditions.dateDebut ? new Date(devisData.conditions.dateDebut).toLocaleDateString('fr-FR') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Date de fin</p>
                <p className="text-white font-medium">
                  {devisData.conditions.dateFin ? new Date(devisData.conditions.dateFin).toLocaleDateString('fr-FR') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Période d'essai</p>
                <p className="text-white font-medium">{devisData.conditions.periodeEssai} mois</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Base horaire</p>
                <p className="text-white font-medium">{devisData.conditions.baseHoraire}h/mois</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 text-sm mb-1">Lieux de mission</p>
                <p className="text-white font-medium">{devisData.conditions.lieuxMission}</p>
              </div>
              {devisData.conditions.motifRecours && (
                <div className="md:col-span-2">
                  <p className="text-white/60 text-sm mb-1">Motif de recours</p>
                  <p className="text-white font-medium">{devisData.conditions.motifRecours}</p>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion 
            title="Profil des candidats recherchés" 
            icon={Users} 
            colorClass="bg-pink-500/10"
          >
            <div className="space-y-4">
              {devisData.candidats?.experience?.obligatoire && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Expérience</p>
                  <p className="text-white font-medium">
                    {devisData.candidats.experience.annees} ans minimum
                  </p>
                </div>
              )}
              {devisData.candidats?.formation?.obligatoire && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Formation</p>
                  <p className="text-white font-medium">{devisData.candidats.formation.type}</p>
                </div>
              )}
              {devisData.candidats?.permis?.requis && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Permis</p>
                  <p className="text-white font-medium">{devisData.candidats.permis.categorie}</p>
                </div>
              )}
              {Object.keys(devisData.candidats?.langues || {}).length > 0 && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Langues</p>
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
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/50">
                      <PenTool className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white text-2xl mb-2">Signature électronique</h3>
                    <p className="text-white/70">Signez votre devis en ligne de manière sécurisée</p>
                  </div>

                  {!showSignature ? (
                    <Button
                      onClick={() => setShowSignature(true)}
                      className="w-full relative overflow-hidden group rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/50 transition-all py-6 text-lg"
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      Commencer la signature
                    </Button>
                  ) : (
                    <div className="space-y-6">
                      {/* Récapitulatif d'identité du signataire */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/20">
                        <h4 className="text-white mb-4 flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Identité du signataire
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/60 mb-1">Nom complet</p>
                            <p className="text-white font-medium">
                              {devisData.contact.prenom} {devisData.contact.nom}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Fonction</p>
                            <p className="text-white font-medium">{devisData.contact.fonction}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Email</p>
                            <p className="text-cyan-400 font-medium">{devisData.contact.email}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Entreprise</p>
                            <p className="text-white font-medium">{devisData.entreprise.raisonSociale}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">SIRET</p>
                            <p className="text-white font-medium font-mono">{devisData.entreprise.siret}</p>
                          </div>
                          <div>
                            <p className="text-white/60 mb-1">Adresse IP</p>
                            <p className="text-green-400 font-medium font-mono">{userIp}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-white/70 text-xs leading-relaxed">
                            🔒 Ces informations seront enregistrées dans le certificat de signature électronique pour garantir la traçabilité et la conformité légale selon le règlement eIDAS (UE) n°910/2014.
                          </p>
                        </div>
                      </div>

                      {/* Canvas de signature */}
                      <div>
                        <Label className="text-white mb-2 block">Dessinez votre signature ci-dessous</Label>
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
                          Effacer
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
                          J'accepte les{' '}
                          <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
                            Conditions Générales de Vente
                          </a>
                          {' '}et certifie que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu'une signature manuscrite.
                        </Label>
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex gap-4">
                        <Button
                          onClick={() => setShowSignature(false)}
                          variant="outline"
                          className="flex-1 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all"
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleSignDevis}
                          disabled={!acceptCGV || isSigning}
                          className="flex-1 relative overflow-hidden group rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSigning ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Signature en cours...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Valider et signer
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
                  <h3 className="text-white text-2xl mb-2">Devis signé avec succès !</h3>
                  <p className="text-white/70 mb-4">
                    Ce devis a été signé électroniquement. Vous recevrez prochainement un email de confirmation avec le PDF final.
                  </p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                    Signé le {new Date(devisData.updatedAt).toLocaleDateString('fr-FR')} à {new Date(devisData.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm">
              Dernière modification : {new Date(devisData.updatedAt).toLocaleDateString('fr-FR')} à {new Date(devisData.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}