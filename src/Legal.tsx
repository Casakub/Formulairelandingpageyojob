import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from './components/Link';
import { 
  Scale, 
  Building2, 
  Server, 
  Copyright, 
  Shield, 
  Cookie, 
  AlertTriangle,
  Gavel,
  Mail,
  ArrowLeft,
  CheckCircle,
  Info,
  FileText,
  User,
  MapPin,
  Phone,
  Globe,
  ExternalLink
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

export default function Legal() {
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
  const dpoEmail = complianceData?.dpoEmail || 'dpo@yojob.fr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
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
      <main className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/30 text-cyan-300 px-4 py-2 mb-6 inline-flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Mentions Légales
          </Badge>
          
          <h1 className="text-white mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
            Informations légales
          </h1>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* Company Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Identification de l'entreprise</CardTitle>
                  <CardDescription className="text-white/60">
                    Informations officielles de la société
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-48 bg-white/10" />
                  <Skeleton className="h-4 w-64 bg-white/10" />
                  <Skeleton className="h-4 w-56 bg-white/10" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem icon={<Building2 className="w-5 h-5 text-cyan-400" />} label="Raison sociale" value={company} />
                  <InfoItem icon={<User className="w-5 h-5 text-violet-400" />} label="Gérant" value="ALEXANDRE AUGER" />
                  <InfoItem icon={<FileText className="w-5 h-5 text-blue-400" />} label="SIRET" value="44786276400035" />
                  <InfoItem icon={<FileText className="w-5 h-5 text-green-400" />} label="TVA Intracommunautaire" value="FR79447862764" />
                  <InfoItem icon={<MapPin className="w-5 h-5 text-orange-400" />} label="Siège social" value="Bordeaux, France" />
                  <InfoItem icon={<Mail className="w-5 h-5 text-pink-400" />} label="Contact" value={dpoEmail} />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Legal Sections */}
        <div className="space-y-8">
          {/* Section 1: Éditeur du site */}
          <LegalSection
            icon={Globe}
            title="1. Éditeur du site web"
            delay={0.2}
          >
            <p className="text-white/80 mb-4">
              Le site web accessible à l'adresse <strong className="text-white">yojob.fr</strong> est édité par :
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-white"><strong>{company}</strong></p>
              <p className="text-white/70">Représentée par Alexandre AUGER, en qualité de Gérant</p>
              <p className="text-white/70">SIRET : 44786276400035</p>
              <p className="text-white/70">TVA Intracommunautaire : FR79447862764</p>
              <p className="text-white/70">Siège social : Bordeaux, France</p>
              <p className="text-white/70">
                Email : <a href={`mailto:${dpoEmail}`} className="text-cyan-400 hover:underline">{dpoEmail}</a>
              </p>
            </div>
          </LegalSection>

          {/* Section 2: Hébergement */}
          <LegalSection
            icon={Server}
            title="2. Hébergement"
            delay={0.3}
          >
            <p className="text-white/80 mb-4">
              Le site est hébergé par :
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-white"><strong>HOSTINGER International Ltd.</strong></p>
              <p className="text-white/70">61 Lordou Vironos Street</p>
              <p className="text-white/70">6023 Larnaca, Cyprus</p>
              <p className="text-white/70">
                Site web : <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                  hostinger.fr <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
            <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm">
                <Info className="w-4 h-4 inline mr-2 text-cyan-400" />
                L'hébergement est conforme aux standards européens de protection des données (RGPD).
              </p>
            </div>
          </LegalSection>

          {/* Section 3: Directeur de publication */}
          <LegalSection
            icon={User}
            title="3. Directeur de publication"
            delay={0.4}
          >
            <p className="text-white/80">
              Le directeur de la publication du site est <strong className="text-white">Alexandre AUGER</strong>, 
              Gérant de {company}.
            </p>
          </LegalSection>

          {/* Section 4: Propriété intellectuelle */}
          <LegalSection
            icon={Copyright}
            title="4. Propriété intellectuelle"
            delay={0.5}
          >
            <p className="text-white/80 mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
            </p>
            <div className="space-y-3">
              <ProtectionItem 
                title="Contenus protégés"
                description="Tous les éléments de ce site (textes, images, logos, graphismes, vidéos) sont la propriété exclusive de YOJOB ou de ses partenaires."
              />
              <ProtectionItem 
                title="Marques et logos"
                description="Les marques, logos et signes distinctifs reproduits sur ce site sont la propriété de YOJOB et ne peuvent être utilisés sans autorisation préalable écrite."
              />
              <ProtectionItem 
                title="Reproduction interdite"
                description="Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie du site, par quelque procédé que ce soit, est interdite sauf autorisation écrite préalable."
              />
            </div>
            <div className="mt-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2 text-orange-400" />
                Toute exploitation non autorisée du site ou de l'un de ses éléments sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </div>
          </LegalSection>

          {/* Section 5: Protection données personnelles */}
          <LegalSection
            icon={Shield}
            title="5. Protection des données personnelles"
            delay={0.6}
          >
            <p className="text-white/80 mb-4">
              {company} s'engage à respecter la réglementation en vigueur relative à la protection des données personnelles, notamment le Règlement Général sur la Protection des Données (RGPD).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <Shield className="w-8 h-8 text-cyan-400 mb-3" />
                  <h4 className="text-white mb-2">Politique de confidentialité</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Consultez notre politique détaillée sur la protection de vos données personnelles.
                  </p>
                  <a 
                    href="/privacy"
                    className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 underline"
                  >
                    Voir la politique <ArrowLeft className="w-3 h-3 rotate-180" />
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <Mail className="w-8 h-8 text-violet-400 mb-3" />
                  <h4 className="text-white mb-2">Contact DPO</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Pour toute question concernant vos données personnelles.
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
          </LegalSection>

          {/* Section 6: Cookies */}
          <LegalSection
            icon={Cookie}
            title="6. Cookies et traceurs"
            delay={0.7}
          >
            <p className="text-white/80 mb-4">
              Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.
            </p>
            <div className="space-y-3">
              <CookieInfo 
                type="Cookies techniques"
                description="Nécessaires au bon fonctionnement du site (session, préférences)"
                essential
              />
              <CookieInfo 
                type="Cookies analytiques"
                description="Mesure d'audience et statistiques de visite"
                essential={false}
              />
              <CookieInfo 
                type="Cookies marketing"
                description="Personnalisation des publicités (avec votre consentement)"
                essential={false}
              />
            </div>
            <p className="text-white/70 text-sm mt-4">
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur ou notre bandeau de consentement.
            </p>
          </LegalSection>

          {/* Section 7: Responsabilité */}
          <LegalSection
            icon={AlertTriangle}
            title="7. Limitation de responsabilité"
            delay={0.8}
          >
            <p className="text-white/80 mb-4">
              {company} met tout en œuvre pour offrir aux utilisateurs des informations fiables et vérifiées. Toutefois :
            </p>
            <div className="space-y-3">
              <ResponsibilityItem 
                title="Exactitude des informations"
                description="Les informations diffusées sur le site sont présentées à titre indicatif et peuvent comporter des inexactitudes ou être obsolètes. Nous nous efforçons de les corriger dès que possible."
              />
              <ResponsibilityItem 
                title="Disponibilité du service"
                description="YOJOB ne peut être tenu responsable des interruptions temporaires du site pour maintenance, mise à jour ou dysfonctionnement technique."
              />
              <ResponsibilityItem 
                title="Liens externes"
                description="Le site peut contenir des liens vers des sites tiers. YOJOB n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu."
              />
              <ResponsibilityItem 
                title="Virus et piratage"
                description="YOJOB met en œuvre tous les moyens raisonnables pour assurer la sécurité du site mais ne peut garantir une protection absolue contre les virus ou actes malveillants."
              />
            </div>
          </LegalSection>

          {/* Section 8: Droit applicable */}
          <LegalSection
            icon={Gavel}
            title="8. Droit applicable et juridiction"
            delay={0.9}
          >
            <p className="text-white/80 mb-4">
              Les présentes mentions légales sont régies par le droit français.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="text-white mb-2">🇫🇷 Droit applicable</h4>
                <p className="text-white/70 text-sm">
                  Les présentes mentions légales et l'utilisation du site sont soumises au droit français.
                </p>
              </div>
              <div>
                <h4 className="text-white mb-2">⚖️ Juridiction compétente</h4>
                <p className="text-white/70 text-sm">
                  En cas de litige et à défaut d'accord amiable, les tribunaux français seront seuls compétents. 
                  Conformément aux règles applicables en matière de compétence territoriale, 
                  les tribunaux du ressort du siège social de YOJOB seront compétents.
                </p>
              </div>
              <div>
                <h4 className="text-white mb-2">🤝 Règlement amiable</h4>
                <p className="text-white/70 text-sm">
                  Avant toute action en justice, nous vous encourageons à nous contacter pour tenter de résoudre tout différend à l'amiable.
                </p>
              </div>
            </div>
          </LegalSection>

          {/* Section 9: Médiation */}
          <LegalSection
            icon={Scale}
            title="9. Médiation et règlement des litiges"
            delay={1.0}
          >
            <p className="text-white/80 mb-4">
              Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges :
            </p>
            <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-400/30 rounded-lg p-6">
              <h4 className="text-white mb-3">Plateforme de résolution en ligne des litiges</h4>
              <p className="text-white/70 text-sm mb-3">
                La Commission Européenne a mis en place une plateforme de règlement en ligne des litiges accessible à l'adresse :
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2 underline"
              >
                ec.europa.eu/consumers/odr <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </LegalSection>

          {/* Section 10: Contact */}
          <LegalSection
            icon={Mail}
            title="10. Nous contacter"
            delay={1.1}
          >
            <p className="text-white/80 mb-4">
              Pour toute question concernant les mentions légales ou l'utilisation du site :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    Par email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`mailto:${dpoEmail}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                  >
                    {dpoEmail}
                  </a>
                </CardContent>
              </Card>
              
              <Card className="border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-violet-400" />
                    Par courrier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">
                    {company}<br />
                    Bordeaux, France
                  </p>
                </CardContent>
              </Card>
            </div>
          </LegalSection>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Card className="border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <Scale className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white text-2xl mb-3">Transparence et conformité</h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                {company} s'engage à respecter la réglementation en vigueur et à vous fournir 
                toutes les informations légales nécessaires.
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
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} {company}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function LegalSection({ 
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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-white/60 text-xs">{label}</span>
      </div>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  );
}

function ProtectionItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Copyright className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-white text-sm mb-1">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function CookieInfo({ type, description, essential }: { type: string; description: string; essential: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex items-start gap-3 flex-1">
        <Cookie className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-white text-sm mb-1">{type}</h4>
          <p className="text-white/60 text-xs">{description}</p>
        </div>
      </div>
      <Badge className={essential ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-white/10 text-white/70 border-white/20'}>
        {essential ? 'Essentiel' : 'Optionnel'}
      </Badge>
    </div>
  );
}

function ResponsibilityItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-white text-sm mb-1">{title}</h4>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}