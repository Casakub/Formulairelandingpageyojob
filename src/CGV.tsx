import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from './components/Link';
import { 
  FileText, 
  Building2, 
  Euro, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle,
  Gavel,
  Mail,
  ArrowLeft,
  CheckCircle,
  Info,
  Users,
  Target,
  Clock,
  XCircle,
  TrendingUp,
  CreditCard,
  FileCheck,
  Scale,
  Briefcase,
  Globe,
  UserCheck,
  RefreshCw,
  Network,
  FileSignature,
  Handshake,
  Shield,
  Lock,
  TrendingDown,
  DollarSign,
  Zap,
  GitBranch,
  Eye,
  Database,
  Ban
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Skeleton } from './components/ui/skeleton';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { LogoSvg } from './imports/YojobLogoComplete';

interface ComplianceData {
  companyName: string;
  dpoName: string;
  dpoEmail: string;
  privacyPolicyUrl: string;
  gdprCompliant: boolean;
}

export default function CGV() {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/compliance`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.settings) {
          setComplianceData(result.settings);
        }
      }
    } catch (error) {
      console.error('Erreur chargement données compliance:', error);
    } finally {
      setLoading(false);
    }
  };

  const company = complianceData?.companyName || 'YOJOB';
  const dpoEmail = complianceData?.dpoEmail || 'contact@yojob.fr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <div className="w-full h-full rounded-[10px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                  <LogoSvg className="w-8 h-8" />
                </div>
              </div>
              <span className="text-white text-xl hidden sm:block group-hover:text-cyan-400 transition-colors">
                {company}
              </span>
            </a>
            <Button
              className="relative overflow-hidden group rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/30 text-cyan-300 px-4 py-2 mb-6 inline-flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Document B2B - Contractuel
          </Badge>
          
          <h1 className="text-white mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
            Conditions Générales de Vente
          </h1>
          
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-6">
            CGV applicables aux <strong className="text-cyan-400">Entreprises Utilisatrices (EU)</strong> et aux <strong className="text-violet-400">Agences de Travail Temporaire partenaires (ETT)</strong>
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">
              Version en vigueur depuis le 19 décembre 2025
            </span>
          </div>
        </motion.div>

        {/* Type d'acteurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <ActorCard 
                  icon={<Briefcase className="w-8 h-8 text-cyan-400" />}
                  title="YOJOB"
                  description="Intermédiaire / Courtier commercial"
                  color="cyan"
                />
                <ActorCard 
                  icon={<Building2 className="w-8 h-8 text-blue-400" />}
                  title="Entreprise Utilisatrice (EU)"
                  description="Client final recevant la main-d'œuvre"
                  color="blue"
                />
                <ActorCard 
                  icon={<Users className="w-8 h-8 text-violet-400" />}
                  title="Agence ETT"
                  description="Partenaire réalisant le recrutement"
                  color="violet"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CGV Sections */}
        <div className="space-y-8">
          {/* Article 0: Identité */}
          <CGVSection
            icon={Building2}
            title="Article 0 - Identité du prestataire"
            delay={0.2}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard label="Forme juridique" value="Entreprise Individuelle (EI)" />
              <InfoCard label="Gérant" value="Alexandre AUGER" />
              <InfoCard label="SIRET" value="44786276400035" />
              <InfoCard label="TVA intracommunautaire" value="FR79447862764" />
              <InfoCard label="Adresse" value="108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES" />
              <InfoCard label="Contact" value="contact@yojob.fr" />
            </div>
            <div className="mt-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm flex items-start gap-2">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Assurance RC Professionnelle :</strong> YOJOB dispose d'une assurance responsabilité civile professionnelle 
                  couvrant les conséquences pécuniaires de sa responsabilité au titre de ses prestations.
                </span>
              </p>
            </div>
          </CGVSection>

          {/* Article 1: Définitions */}
          <CGVSection
            icon={FileText}
            title="Article 1 - Définitions"
            delay={0.3}
          >
            <div className="space-y-3">
              <DefinitionItem 
                term="YOJOB"
                definition="Intermédiaire/courtier commercial assurant la prospection, qualification, coordination et formalisation de propositions commerciales entre EU et ETT."
              />
              <DefinitionItem 
                term="Entreprise Utilisatrice (EU)"
                definition="Entreprise cliente finale recevant la main-d'œuvre mise à disposition par une ETT partenaire."
              />
              <DefinitionItem 
                term="ETT / Agence partenaire"
                definition="Agence de travail temporaire réalisant le recrutement, la contractualisation et l'organisation de la mise à disposition de personnel."
              />
              <DefinitionItem 
                term="Profil"
                definition="Candidat ou intérimaire présenté par une ETT à une EU via l'intermédiation de YOJOB."
              />
              <DefinitionItem 
                term="Mission"
                definition="Besoin en recrutement exprimé par l'EU (métier, volume, dates, site, contraintes spécifiques)."
              />
              <DefinitionItem 
                term="Proposition tripartite"
                definition="Proposition commerciale et administrative structurée par YOJOB et validée par l'EU et l'ETT (signature ou accord écrit)."
              />
              <DefinitionItem 
                term="Passage de main"
                definition="Moment où l'ETT devient l'interlocuteur principal de l'EU après double validation EU + ETT."
              />
              <DefinitionItem 
                term="Assureur-crédit"
                definition="Organisme d'assurance-crédit (COFACE, Allianz Trade, etc.) intervenant dans l'analyse du risque client et l'octroi d'encours."
              />
            </div>
          </CGVSection>

          {/* Article 2: Objet */}
          <CGVSection
            icon={Target}
            title="Article 2 - Objet"
            delay={0.4}
          >
            <p className="text-white/80 mb-4">
              Les présentes CGV encadrent les prestations de {company} consistant notamment à :
            </p>
            <div className="space-y-3">
              <ServiceStep 
                number="1"
                title="Prospecter et qualifier"
                description="Identifier et qualifier des Entreprises Utilisatrices ayant des besoins en recrutement européen"
                icon={<Target className="w-5 h-5 text-cyan-400" />}
              />
              <ServiceStep 
                number="2"
                title="Présenter les opportunités"
                description="Transmettre les opportunités qualifiées aux ETT partenaires correspondantes"
                icon={<Network className="w-5 h-5 text-violet-400" />}
              />
              <ServiceStep 
                number="3"
                title="Structurer la proposition"
                description="Élaborer une proposition commerciale détaillée (périmètre, coordination, éléments administratifs)"
                icon={<FileSignature className="w-5 h-5 text-blue-400" />}
              />
              <ServiceStep 
                number="4"
                title="Organiser le passage de main"
                description="Assurer la transition vers l'ETT après signature pour l'exécution (recrutement, mise à disposition, facturation)"
                icon={<Handshake className="w-5 h-5 text-green-400" />}
              />
            </div>
            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm flex items-start gap-2">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Rôle de YOJOB :</strong> YOJOB agit exclusivement comme <strong>intermédiaire</strong>. 
                  L'ETT est responsable du recrutement, de la mise à disposition, de la conformité employeur et de la facturation à l'EU, 
                  sauf stipulation expresse contraire dans le contrat.
                </span>
              </p>
            </div>
          </CGVSection>

          {/* Article 3: Hiérarchie */}
          <CGVSection
            icon={GitBranch}
            title="Article 3 - Documents contractuels et hiérarchie"
            delay={0.5}
          >
            <p className="text-white/80 mb-4">
              En cas de contradiction entre les documents, l'ordre de priorité suivant s'applique :
            </p>
            <div className="space-y-2">
              <HierarchyItem rank="1" title="Contrat particulier / Conditions spécifiques" subtitle="Partenariat ou apport d'affaires personnalisé" />
              <HierarchyItem rank="2" title="Proposition tripartite / Devis / Bon de commande" subtitle="Document signé par les parties" />
              <HierarchyItem rank="3" title="Conditions Générales de Vente (CGV)" subtitle="Présent document" />
              <HierarchyItem rank="4" title="Annexes" subtitle="SLA, DPA, process, checklists, etc." />
            </div>
          </CGVSection>

          {/* Article 4: Schémas contractuels */}
          <CGVSection
            icon={FileCheck}
            title="Article 4 - Schémas contractuels"
            delay={0.6}
          >
            <p className="text-white/80 mb-4">
              Le schéma applicable est précisé dans la proposition ou le contrat. YOJOB peut intervenir selon 3 modèles :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <SchemaCard 
                label="Schéma B"
                badge="Principal"
                title="ETT cliente de YOJOB"
                description="YOJOB est rémunéré par l'ETT au titre de l'apport d'affaires (commission mensuelle et/ou success fee)"
                color="violet"
                icon={<Users className="w-8 h-8" />}
              />
              <SchemaCard 
                label="Schéma A"
                badge="Optionnel"
                title="EU cliente de YOJOB"
                description="YOJOB facture à l'EU des services additionnels (coordination renforcée, assistance documentaire étendue)"
                color="blue"
                icon={<Building2 className="w-8 h-8" />}
              />
              <SchemaCard 
                label="Schéma C"
                badge="Mixte"
                title="Rémunération combinée"
                description="YOJOB est rémunéré par l'ETT (Schéma B) ET facture des services additionnels à l'EU (Schéma A)"
                color="cyan"
                icon={<GitBranch className="w-8 h-8" />}
              />
            </div>
          </CGVSection>

          {/* Article 5: Process */}
          <CGVSection
            icon={Zap}
            title="Article 5 - Process et passage de main"
            delay={0.7}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  5.1 Phase amont (commerciale & coordination)
                </h4>
                <p className="text-white/80 mb-3">YOJOB assure :</p>
                <div className="space-y-2">
                  <ProcessItem text="Prospection et qualification de l'Entreprise Utilisatrice" />
                  <ProcessItem text="Collecte des éléments nécessaires à la Mission" />
                  <ProcessItem text="Transmission du besoin à une ou plusieurs ETT partenaires" />
                  <ProcessItem text="Coordination jusqu'à la finalisation de la proposition tripartite" />
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-violet-400" />
                  5.2 Déclencheur du passage de main
                </h4>
                <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm mb-3">
                    Le "passage de main" intervient dès la réunion de <strong>deux conditions cumulatives</strong> :
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm"><strong>Signature/accord écrit de l'EU</strong> sur la proposition</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm"><strong>Acceptation/validation de l'ETT</strong> (capacité, conditions, conformité, risque)</span>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mt-4">
                    À partir de ce moment, l'ETT devient l'interlocuteur principal pour : recrutement, contrats, onboarding, 
                    mise à disposition, paie, obligations détachement, facturation et recouvrement EU.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  5.3 Assistance résiduelle (si prévue)
                </h4>
                <p className="text-white/80 text-sm">
                  YOJOB peut rester en support (coordination/qualité) dans la limite du périmètre convenu dans la proposition ou le contrat.
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 6: Conditions financières */}
          <CGVSection
            icon={Euro}
            title="Article 6 - Conditions financières et modalités de règlement"
            delay={0.8}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  6.1 Principe : délais "sélectifs" et au cas par cas
                </h4>
                <p className="text-white/80 mb-3">
                  Compte tenu des pratiques du secteur (assurance-crédit, risque client, organisation de facturation), 
                  les <strong>conditions de règlement</strong> sont définies <strong>au cas par cas</strong> dans la proposition/contrat applicable.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-3">Les modalités peuvent inclure :</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <PaymentOption text="Paiement à réception" />
                    <PaymentOption text="Paiement à l'avance / acompte" />
                    <PaymentOption text="Facturation hebdomadaire" />
                    <PaymentOption text="Garanties (dépôt, limitation d'encours)" />
                  </div>
                </div>
                <div className="mt-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm">
                    <Info className="w-4 h-4 inline mr-2 text-blue-400" />
                    Lorsqu'un délai de paiement "à terme" est accordé, il respecte les plafonds légaux : 
                    <strong> 60 jours</strong> à compter de la date d'émission de la facture, 
                    ou <strong>45 jours fin de mois</strong> si stipulé.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                  6.2 Grille standard — EU "à risque"
                </h4>
                <p className="text-white/80 mb-4 text-sm">
                  La classification du risque est déterminée à partir de <strong>3 sources cumulatives</strong> :
                </p>
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <RiskSourceCard 
                    icon={<Shield className="w-6 h-6 text-cyan-400" />}
                    title="Assureur-crédit"
                    description="Couverture/encours/conditions"
                  />
                  <RiskSourceCard 
                    icon={<Database className="w-6 h-6 text-violet-400" />}
                    title="Score interne ETT"
                    description="Politique risque & recouvrement"
                  />
                  <RiskSourceCard 
                    icon={<Clock className="w-6 h-6 text-blue-400" />}
                    title="Historique paiement"
                    description="Comportement & exposition"
                  />
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4 mb-4">
                  <p className="text-white/90 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-2 text-orange-400" />
                    <strong>Primauté :</strong> en cas de contradiction, la <strong>décision assureur-crédit</strong> prévaut sur les autres signaux.
                  </p>
                </div>

                <h5 className="text-white text-sm mb-3">Niveaux de risque & conditions de règlement</h5>
                <div className="space-y-3">
                  <RiskLevelCard 
                    level="R0"
                    title="Standard"
                    color="green"
                    trigger="Assureur : couvert / encours OK ; Score ETT : A/B ; Historique : bon (0 incident)"
                    conditions="Mensuel + délai négocié (ex. 30j) dans la limite légale"
                    safeguards="Encours standard"
                  />
                  <RiskLevelCard 
                    level="R1"
                    title="Surveillé"
                    color="yellow"
                    trigger="Assureur : encours limité ; Score ETT : B/C ; Historique : retards modérés"
                    conditions="À réception OU acompte 30-50% + solde à réception"
                    safeguards="Encours plafonné + revue hebdomadaire"
                  />
                  <RiskLevelCard 
                    level="R2"
                    title="Renforcé"
                    color="orange"
                    trigger="Assureur : couverture partielle insuffisante ; Score ETT : C/D ; Historique : retards significatifs"
                    conditions="Hebdomadaire à réception OU acompte 50-70% + ajustement hebdo"
                    safeguards="Démarrage par lots (volume limité)"
                  />
                  <RiskLevelCard 
                    level="R3"
                    title="Critique"
                    color="red"
                    trigger="Assureur : REFUS / non-assurable ; Score ETT : D ; Historique : incidents majeurs"
                    conditions="Paiement 100% à l'avance (ou refus de démarrage)"
                    safeguards="Démarrage conditionné au paiement ; stop si écart"
                  />
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="text-white text-sm mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    Transparence & acceptation
                  </h5>
                  <p className="text-white/70 text-sm">
                    La <strong>Proposition tripartite</strong> précise le niveau (R0/R1/R2/R3), le mode de facturation et la condition de règlement. 
                    La signature/acceptation de la proposition vaut acceptation de ces modalités.
                  </p>
                </div>

                <div className="mt-3 bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-400/30 rounded-lg p-4">
                  <h5 className="text-white text-sm mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-violet-400" />
                    Clause d'ajustement dynamique
                  </h5>
                  <p className="text-white/80 text-sm">
                    En cas d'évolution du risque (baisse d'encours assureur, retards, incidents), l'ETT peut <strong>réviser</strong> les conditions 
                    de règlement pour les périodes suivantes, après notification à l'EU, dans le respect du contrat applicable.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  6.3 Retards de paiement
                </h4>
                <p className="text-white/80 mb-3 text-sm">
                  En cas de retard sur une facture émise par YOJOB (Schéma A ou facturation ETT→YOJOB) :
                </p>
                <div className="space-y-2">
                  <PenaltyItem 
                    icon={<TrendingUp className="w-4 h-4 text-orange-400" />}
                    text="Pénalités de retard exigibles sans rappel, selon le taux prévu au contrat ou le cadre légal applicable"
                  />
                  <PenaltyItem 
                    icon={<Euro className="w-4 h-4 text-red-400" />}
                    text="Indemnité forfaitaire de recouvrement : 40 € par facture impayée"
                  />
                  <PenaltyItem 
                    icon={<XCircle className="w-4 h-4 text-red-400" />}
                    text="Suspension possible des prestations après notification écrite"
                  />
                </div>
              </div>
            </div>
          </CGVSection>

          {/* Article 7: Obligations EU */}
          <CGVSection
            icon={Building2}
            title="Article 7 - Obligations de l'Entreprise Utilisatrice (EU)"
            delay={0.9}
          >
            <p className="text-white/80 mb-4">L'EU s'engage à :</p>
            <div className="space-y-2">
              <ObligationItem text="Fournir un besoin exact et complet, et coopérer activement (retours, validations, planning)" />
              <ObligationItem text="Transmettre les contraintes de sécurité et les modalités d'accès au site" />
              <ObligationItem text="Respecter la confidentialité des informations (ETT, profils, conditions commerciales)" />
              <ObligationItem text="Reconnaître que le recrutement, la mise à disposition et la facturation main-d'œuvre relèvent de l'ETT (sauf schéma différent écrit)" />
              <ObligationItem text="Respecter les conditions de règlement définies dans la proposition tripartite" />
            </div>
          </CGVSection>

          {/* Article 8: Obligations ETT */}
          <CGVSection
            icon={Users}
            title="Article 8 - Obligations et rémunération de l'ETT partenaire"
            delay={1.0}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  8.1 Commission mensuelle (apport d'affaires)
                </h4>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg p-4">
                  <p className="text-white/90 mb-3">
                    L'ETT doit à YOJOB une commission calculée sur le CA HT facturé par l'ETT à l'EU au titre des missions issues de YOJOB.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <CommissionDetail label="Taux de commission" value="Variable selon contrat (ex. 3-8%)" />
                    <CommissionDetail label="Base de calcul" value="CA HT facturé EU (missions YOJOB)" />
                    <CommissionDetail label="Rythme facturation" value="Mensuel" />
                    <CommissionDetail label="Délai de paiement" value="Dès réception du paiement de l'EU, sans délai" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-400" />
                  8.2 Success fee "placement"
                </h4>
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm mb-3">
                    Pour certaines missions, un <strong>success fee</strong> peut s'ajouter à la commission mensuelle :
                  </p>
                  <div className="space-y-2">
                    <SuccessFeeItem 
                      label="Fait générateur"
                      value="Fin de la période d'essai applicable (voir art. 9), sans rupture imputable au Profil"
                    />
                    <SuccessFeeItem 
                      label="Exigibilité"
                      value="Paiement intégral immédiat à émission de la facture YOJOB"
                    />
                    <SuccessFeeItem 
                      label="Montant"
                      value="Variable selon contrat (ex. % du salaire annuel brut ou montant forfaitaire)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  8.3 Reporting
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  L'ETT fournit à YOJOB, à fréquence convenue (ex. mensuelle) :
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <ReportingItem text="Liste des missions YOJOB (EU, site, dates, volumes)" />
                  <ReportingItem text="CA HT associé par mission" />
                  <ReportingItem text="Éléments justificatifs raisonnables" />
                  <ReportingItem text="Respect du RGPD et du secret des affaires" />
                </div>
              </div>
            </div>
          </CGVSection>

          {/* Article 9: Période d'essai */}
          <CGVSection
            icon={Clock}
            title="Article 9 - Période d'essai réglementaire"
            delay={1.1}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-cyan-400" />
                  9.1 Principe
                </h4>
                <p className="text-white/80 text-sm">
                  La période d'essai applicable est celle prévue par les documents contractuels (ETT↔EU et/ou ETT↔Profil) 
                  et par la réglementation/accords applicables. Elle ne peut excéder les durées maximales autorisées.
                </p>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  9.2 Détachement / Intérim (contrat de mission)
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  Le contrat de mission peut comporter une période d'essai fixée par accord ; <strong>à défaut</strong>, elle est plafonnée à :
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <TrialPeriodCard duration="2 jours" condition="Contrat ≤ 1 mois" />
                  <TrialPeriodCard duration="3 jours" condition="1 mois < contrat ≤ 2 mois" />
                  <TrialPeriodCard duration="5 jours" condition="Contrat > 2 mois" />
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  9.3 Recrutement (CDI/assimilé) — Plafond légal
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  Pour un CDI, la durée maximale de la période d'essai est notamment :
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <TrialPeriodCard duration="2 mois" condition="Ouvriers / Employés" color="green" />
                  <TrialPeriodCard duration="3 mois" condition="Agents de maîtrise / Techniciens" color="blue" />
                  <TrialPeriodCard duration="4 mois" condition="Cadres" color="violet" />
                </div>
                <p className="text-white/60 text-xs mt-3">
                  Selon les règles applicables et éventuel renouvellement encadré par la loi.
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 10: Non-contournement */}
          <CGVSection
            icon={Ban}
            title="Article 10 - Non-contournement — Durée 24 mois"
            delay={1.2}
          >
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-lg p-6 mb-4">
              <p className="text-white/90 mb-4">
                Pendant la relation contractuelle et pendant <strong>24 mois</strong> après la dernière mise en relation 
                (ETT et/ou Profil), les parties s'interdisent tout contournement :
              </p>
              <div className="space-y-3">
                <NonCircumventItem 
                  actor="EU"
                  text="Interdiction de contractualiser directement avec une ETT introduite par YOJOB (ou via entité liée) en contournant YOJOB, sauf accord écrit."
                />
                <NonCircumventItem 
                  actor="ETT"
                  text="Interdiction de contourner la rémunération YOJOB sur une EU/opportunité issue de YOJOB, sauf accord écrit."
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Clause pénale
              </h4>
              <p className="text-white/90 text-sm">
                En cas de violation de cette clause de non-contournement, la partie défaillante s'engage à verser à YOJOB 
                une <strong>indemnité forfaitaire</strong> dont le montant est précisé au contrat (ou équivalent à un pourcentage 
                des sommes générées/estimées), sans préjudice des dommages-intérêts complémentaires.
              </p>
            </div>
          </CGVSection>

          {/* Article 11: Responsabilité */}
          <CGVSection
            icon={ShieldCheck}
            title="Article 11 - Responsabilité et limitations"
            delay={1.3}
          >
            <div className="space-y-4">
              <ResponsibilityCard 
                title="Obligation de moyens"
                description="YOJOB s'engage à mettre en œuvre tous les moyens nécessaires pour réaliser ses prestations d'intermédiation, sans garantie de résultat."
                icon={<Target className="w-6 h-6 text-cyan-400" />}
              />
              <ResponsibilityCard 
                title="Non-responsabilité ETT/Profils"
                description="YOJOB n'est pas responsable des actes, omissions ou manquements de l'ETT, des Profils recrutés, ni des décisions de crédit/assurance."
                icon={<Shield className="w-6 h-6 text-violet-400" />}
              />
              <ResponsibilityCard 
                title="Plafonnement"
                description="Sauf faute lourde ou dol, la responsabilité de YOJOB est plafonnée au montant HT perçu au titre du contrat concerné sur les 12 derniers mois."
                icon={<Scale className="w-6 h-6 text-blue-400" />}
              />
              <ResponsibilityCard 
                title="Dommages indirects exclus"
                description="YOJOB ne peut être tenu responsable des dommages indirects (perte d'exploitation, manque à gagner, perte de clientèle, etc.)."
                icon={<XCircle className="w-6 h-6 text-orange-400" />}
              />
            </div>
          </CGVSection>

          {/* Article 12: Confidentialité */}
          <CGVSection
            icon={Lock}
            title="Article 12 - Confidentialité"
            delay={1.4}
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-6">
              <p className="text-white/90 mb-4">
                Les parties s'engagent à maintenir <strong>confidentielles</strong> toutes les informations échangées 
                dans le cadre de leur collaboration.
              </p>
              <div className="space-y-3">
                <ConfidentialityItem text="Les informations confidentielles incluent les données commerciales, techniques, financières et stratégiques" />
                <ConfidentialityItem text="L'obligation de confidentialité perdure pendant toute la durée de la relation contractuelle et 5 ans après sa cessation" />
                <ConfidentialityItem text="Les informations ne peuvent être divulguées à des tiers sans accord préalable écrit" />
                <ConfidentialityItem text="Les parties doivent prendre toutes les mesures nécessaires pour protéger la confidentialité des informations" />
              </div>
            </div>
          </CGVSection>

          {/* Article 13: RGPD */}
          <CGVSection
            icon={Database}
            title="Article 13 - Données personnelles (RGPD)"
            delay={1.5}
          >
            <p className="text-white/80 mb-4">
              Les échanges de données personnelles sont strictement limités aux <strong>données nécessaires</strong> à l'exécution 
              des prestations (contacts, besoins, profils candidats).
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card className="border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3" />
                  <h4 className="text-white mb-2">Conformité RGPD</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Le traitement des données personnelles est effectué conformément au RGPD et à la loi Informatique et Libertés.
                  </p>
                  <a 
                    href="/privacy"
                    className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 underline"
                  >
                    Politique de confidentialité <ArrowLeft className="w-3 h-3 rotate-180" />
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <Mail className="w-8 h-8 text-violet-400 mb-3" />
                  <h4 className="text-white mb-2">Contact DPO</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Pour toute demande concernant vos données personnelles ou l'exercice de vos droits RGPD.
                  </p>
                  <a 
                    href={`mailto:${dpoEmail}`}
                    className="text-violet-400 hover:text-violet-300 text-sm inline-flex items-center gap-1 underline"
                  >
                    {dpoEmail}
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/80 text-sm">
                <Info className="w-4 h-4 inline mr-2 text-cyan-400" />
                Un DPA (Data Processing Agreement) peut être annexé si nécessaire selon la nature des échanges de données.
              </p>
            </div>
          </CGVSection>

          {/* Article 14: Durée et résiliation */}
          <CGVSection
            icon={Calendar}
            title="Article 14 - Durée et résiliation"
            delay={1.6}
          >
            <div className="space-y-4">
              <DurationCard 
                icon={<Clock className="w-6 h-6 text-cyan-400" />}
                title="Durée"
                description="La durée de la relation contractuelle est celle définie dans le contrat ou la proposition tripartite acceptée."
              />
              <DurationCard 
                icon={<XCircle className="w-6 h-6 text-orange-400" />}
                title="Résiliation anticipée"
                description="Préavis de 30 jours (ou durée convenue au contrat) + paiement des sommes dues (y compris commissions/success fees si fait générateur atteint)."
              />
              <DurationCard 
                icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
                title="Résiliation pour manquement"
                description="En cas de manquement grave aux obligations : mise en demeure + délai de cure de 15 jours. À défaut de régularisation, résiliation de plein droit."
              />
            </div>
          </CGVSection>

          {/* Article 15: Force majeure */}
          <CGVSection
            icon={AlertTriangle}
            title="Article 15 - Force majeure"
            delay={1.7}
          >
            <p className="text-white/80 mb-4">
              Les parties ne pourront être tenues responsables si la non-exécution ou le retard dans l'exécution de leurs obligations 
              découle d'un <strong>cas de force majeure</strong> au sens de la jurisprudence française.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/70 text-sm mb-3">
                Constituent notamment des cas de force majeure :
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                <ForceMajeureItem text="Catastrophes naturelles, inondations, incendies" />
                <ForceMajeureItem text="Guerres, attentats, émeutes" />
                <ForceMajeureItem text="Grèves générales, blocages des transports" />
                <ForceMajeureItem text="Défaillance des réseaux (télécoms, électricité)" />
                <ForceMajeureItem text="Épidémies, pandémies" />
                <ForceMajeureItem text="Mesures sanitaires gouvernementales" />
              </div>
            </div>
            <p className="text-white/70 text-sm mt-3">
              En cas de force majeure, les obligations sont <strong>suspendues</strong> pendant la durée de l'événement, 
              après notification à l'autre partie.
            </p>
          </CGVSection>

          {/* Article 16: Droit applicable */}
          <CGVSection
            icon={Gavel}
            title="Article 16 - Droit applicable et litiges"
            delay={1.8}
          >
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Droit applicable
                </h4>
                <p className="text-white/70 text-sm">
                  Les présentes CGV sont soumises au <strong>droit français</strong>.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-violet-400" />
                  Tentative amiable préalable
                </h4>
                <p className="text-white/70 text-sm">
                  En cas de litige, les parties s'engagent à rechercher une <strong>solution amiable</strong> avant toute action judiciaire. 
                  Le client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-blue-400" />
                  Juridiction compétente
                </h4>
                <p className="text-white/70 text-sm">
                  À défaut de résolution amiable, tout litige relève de la compétence exclusive des <strong>tribunaux du ressort 
                  du siège social de {company}</strong>, sauf règle impérative contraire.
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 17: Modifications */}
          <CGVSection
            icon={RefreshCw}
            title="Article 17 - Modification des CGV"
            delay={1.9}
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-6">
              <p className="text-white/90 mb-4">
                {company} se réserve le droit de modifier à tout moment les présentes CGV.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    Les CGV <strong>applicables</strong> sont celles en vigueur à la date d'acceptation de la proposition/contrat
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    Les modifications <strong>n'ont pas d'effet rétroactif</strong> sur les contrats en cours d'exécution, 
                    sauf accord express écrit des parties
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    La dernière version des CGV est consultable à tout moment sur le site web de {company}
                  </p>
                </div>
              </div>
            </div>
          </CGVSection>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-16 text-center"
        >
          <Card className="border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white text-2xl mb-3">Questions sur nos CGV ?</h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Notre équipe juridique et commerciale est à votre disposition pour toute clarification concernant 
                ces Conditions Générales de Vente.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white shadow-lg shadow-cyan-500/30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
                <Button
                  className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 border-0"
                  onClick={() => window.location.href = `mailto:${dpoEmail}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Nous contacter
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer minimal */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-white/60 text-sm mb-2">
              © {new Date().getFullYear()} {company} — Entreprise Individuelle. Tous droits réservés.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              <a href="/legal" className="hover:text-cyan-400 transition-colors">Mentions légales</a>
              <span>•</span>
              <a href="/privacy" className="hover:text-cyan-400 transition-colors">Confidentialité</a>
              <span>•</span>
              <a href="/cgv" className="hover:text-cyan-400 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function CGVSection({ 
  icon: Icon, 
  title, 
  children, 
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  children: React.ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl">{title}</h2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ActorCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-400/30',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-400/30',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-400/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-400/50`}>
      <div className="flex justify-center mb-3">{icon}</div>
      <h4 className="text-white mb-1">{title}</h4>
      <p className="text-white/70 text-xs">{description}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <p className="text-white/60 text-xs mb-1">{label}</p>
      <p className="text-white text-sm">{value}</p>
    </div>
  );
}

function DefinitionItem({ term, definition }: { term: string; definition: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h4 className="text-white mb-2 flex items-center gap-2">
        <span className="text-cyan-400">•</span>
        <strong>{term}</strong>
      </h4>
      <p className="text-white/70 text-sm pl-4">{definition}</p>
    </div>
  );
}

function ServiceStep({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">{number}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <h4 className="text-white text-sm">{title}</h4>
          </div>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function HierarchyItem({ rank, title, subtitle }: { rank: string; title: string; subtitle: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm">{rank}</span>
      </div>
      <div>
        <p className="text-white text-sm">{title}</p>
        <p className="text-white/60 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function SchemaCard({ label, badge, title, description, color, icon }: { label: string; badge: string; title: string; description: string; color: string; icon: React.ReactNode }) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-400/30 text-cyan-400',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-400/30 text-blue-400',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-400/30 text-violet-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4`}>
      <Badge className={`mb-3 ${colorClasses[color as keyof typeof colorClasses]}`}>{badge}</Badge>
      <div className="mb-3">{icon}</div>
      <h4 className="text-white mb-2 text-sm">{label}</h4>
      <h5 className="text-white mb-2">{title}</h5>
      <p className="text-white/70 text-xs">{description}</p>
    </div>
  );
}

function ProcessItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function PaymentOption({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function RiskSourceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h5 className="text-white text-sm mb-1">{title}</h5>
      <p className="text-white/60 text-xs">{description}</p>
    </div>
  );
}

function RiskLevelCard({ level, title, color, trigger, conditions, safeguards }: { level: string; title: string; color: string; trigger: string; conditions: string; safeguards: string }) {
  const colorClasses = {
    green: 'from-green-500/10 to-emerald-500/10 border-green-400/30',
    yellow: 'from-yellow-500/10 to-amber-500/10 border-yellow-400/30',
    orange: 'from-orange-500/10 to-red-500/10 border-orange-400/30',
    red: 'from-red-500/10 to-red-600/10 border-red-400/30'
  };

  const badgeColors = {
    green: 'bg-green-500/20 text-green-400 border-green-400/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-400/30',
    red: 'bg-red-500/20 text-red-400 border-red-400/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-3">
        <Badge className={badgeColors[color as keyof typeof badgeColors]}>{level}</Badge>
        <span className="text-white text-sm">{title}</span>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-white/80 text-xs mb-1"><strong>Déclencheurs :</strong></p>
          <p className="text-white/70 text-xs">{trigger}</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-1"><strong>Conditions :</strong></p>
          <p className="text-white/70 text-xs">{conditions}</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-1"><strong>Garde-fous :</strong></p>
          <p className="text-white/70 text-xs">{safeguards}</p>
        </div>
      </div>
    </div>
  );
}

function PenaltyItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
      {icon}
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function ObligationItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function CommissionDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/60 text-xs mb-1">{label}</p>
      <p className="text-white text-sm">{value}</p>
    </div>
  );
}

function SuccessFeeItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <p className="text-white/80 text-xs mb-1"><strong>{label}</strong></p>
      <p className="text-white/70 text-xs">{value}</p>
    </div>
  );
}

function ReportingItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function TrialPeriodCard({ duration, condition, color = 'cyan' }: { duration: string; condition: string; color?: string }) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-400/30',
    green: 'from-green-500/10 to-green-500/5 border-green-400/30',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-400/30',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-400/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-3 text-center`}>
      <p className="text-white text-lg mb-1">{duration}</p>
      <p className="text-white/70 text-xs">{condition}</p>
    </div>
  );
}

function NonCircumventItem({ actor, text }: { actor: string; text: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <Badge className="bg-red-500/20 text-red-400 border-red-400/30 mb-2">{actor}</Badge>
      <p className="text-white/80 text-sm">{text}</p>
    </div>
  );
}

function ResponsibilityCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h4 className="text-white text-sm mb-1">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ConfidentialityItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
      <p className="text-white/90 text-sm">{text}</p>
    </div>
  );
}

function DurationCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h4 className="text-white text-sm mb-1">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ForceMajeureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-orange-400 mt-1">•</span>
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}
