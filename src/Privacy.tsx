import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from './components/Link';
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  FileText, 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Info,
  Database,
  Clock,
  Trash2,
  Download,
  Building2,
  Globe,
  Cookie,
  Edit,
  XCircle,
  Target
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Skeleton } from './components/ui/skeleton';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { LogoSvg } from './imports/YojobLogoComplete';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation } from './src/i18n/pages/usePageTranslation';
import { AVAILABLE_LANGUAGES_PRIVACY } from './src/i18n/pages/privacy';

interface ComplianceData {
  companyName: string;
  dpoName: string;
  dpoEmail: string;
  privacyPolicyUrl: string;
  gdprCompliant: boolean;
  gdpr_enabled: boolean;
  unsubscribe_link: boolean;
  double_optin: boolean;
  data_retention_days: number;
  consent_tracking: boolean;
}

export default function Privacy() {
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
      console.error('Erreur chargement données RGPD:', error);
    } finally {
      setLoading(false);
    }
  };

  const company = complianceData?.companyName || 'YOJOB';
  const dpoName = complianceData?.dpoName || 'Alexandre AUGER';
  const dpoEmail = complianceData?.dpoEmail || 'dpo@yojob.fr';

  const { currentLanguage, setLanguage } = useLanguageManager();
  const t = usePageTranslation('privacy', currentLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
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
            <div className="flex items-center gap-4">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={setLanguage}
                availableLanguages={AVAILABLE_LANGUAGES_PRIVACY}
              />
              <Button
                className="relative overflow-hidden group rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentLanguage === 'en' ? 'Back' : 'Retour'}
              </Button>
            </div>
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
            <Shield className="w-4 h-4" />
            {t.hero.badge}
          </Badge>
          
          <h1 className="text-white mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.hero.subtitle.replace('{company}', company)}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">
              {t.hero.lastUpdate} {new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* DPO Contact Card */}
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
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">{t.dpo.title}</CardTitle>
                  <CardDescription className="text-white/60">
                    {t.dpo.subtitle}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-48 bg-white/10" />
                  <Skeleton className="h-4 w-64 bg-white/10" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/90">
                    <UserCheck className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">{dpoName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-violet-400" />
                    <a 
                      href={`mailto:${dpoEmail}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-dotted"
                    >
                      {dpoEmail}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {/* Section 1: Responsable du traitement */}
          <PrivacySection
            icon={Building2}
            title={t.sections.dataController.title}
            delay={0.2}
          >
            <p className="text-white/80 mb-4">
              {t.sections.dataController.intro}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-white"><strong>{company}</strong></p>
              <p className="text-white/70">{t.sections.dataController.location}</p>
              <p className="text-white/70">
                {t.sections.dataController.email} <a href={`mailto:${dpoEmail}`} className="text-cyan-400 hover:underline">{dpoEmail}</a>
              </p>
            </div>
          </PrivacySection>

          {/* Section 2: Données collectées */}
          <PrivacySection
            icon={Database}
            title={t.sections.dataCollected.title}
            delay={0.3}
          >
            <p className="text-white/80 mb-4">
              {t.sections.dataCollected.intro}
            </p>
            <div className="grid gap-3">
              {t.sections.dataCollected.items.map((item, index) => (
                <DataItem key={index} icon={<CheckCircle className="w-4 h-4 text-green-400" />}>
                  <strong>{item.label}</strong> {item.description}
                </DataItem>
              ))}
            </div>
          </PrivacySection>

          {/* Section 3: Finalités */}
          <PrivacySection
            icon={Target}
            title={t.sections.purposes.title}
            delay={0.4}
          >
            <p className="text-white/80 mb-4">
              {t.sections.purposes.intro}
            </p>
            <div className="space-y-4">
              <FinalityCard
                title={t.sections.purposes.items[0].title}
                description={t.sections.purposes.items[0].description}
                color="cyan"
              />
              <FinalityCard
                title={t.sections.purposes.items[1].title}
                description={t.sections.purposes.items[1].description}
                color="violet"
              />
              <FinalityCard
                title={t.sections.purposes.items[2].title}
                description={t.sections.purposes.items[2].description}
                color="blue"
              />
            </div>
          </PrivacySection>

          {/* Section 4: Base légale */}
          <PrivacySection
            icon={FileText}
            title={t.sections.legalBasis.title}
            delay={0.5}
          >
            <p className="text-white/80 mb-4">
              {t.sections.legalBasis.intro}
            </p>
            <div className="grid gap-3">
              {t.sections.legalBasis.items.map((item, index) => (
                <LegalBasisItem 
                  key={index}
                  basis={item.basis}
                  description={item.description}
                />
              ))}
            </div>
          </PrivacySection>

          {/* Section 5: Durée de conservation */}
          <PrivacySection
            icon={Clock}
            title={t.sections.retention.title}
            delay={0.6}
          >
            <p className="text-white/80 mb-4">
              {t.sections.retention.intro}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
              <RetentionItem period={t.sections.retention.items[0].period} description={t.sections.retention.items[0].description} />
              <RetentionItem period={t.sections.retention.items[1].period} description={t.sections.retention.items[1].description} />
              <RetentionItem period={t.sections.retention.items[2].period} description={t.sections.retention.items[2].description} />
              <RetentionItem 
                period={t.sections.retention.items[3].period.replace('{days}', String(complianceData?.data_retention_days || 365))} 
                description={t.sections.retention.items[3].description}
                highlight
              />
            </div>
          </PrivacySection>

          {/* Section 6: Vos droits */}
          <PrivacySection
            icon={Shield}
            title={t.sections.rights.title}
            delay={0.7}
          >
            <p className="text-white/80 mb-4">
              {t.sections.rights.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <RightCard
                icon={<Eye className="w-5 h-5" />}
                title={t.sections.rights.items[0].title}
                description={t.sections.rights.items[0].description}
                color="cyan"
              />
              <RightCard
                icon={<Edit className="w-5 h-5" />}
                title={t.sections.rights.items[1].title}
                description={t.sections.rights.items[1].description}
                color="violet"
              />
              <RightCard
                icon={<Trash2 className="w-5 h-5" />}
                title={t.sections.rights.items[2].title}
                description={t.sections.rights.items[2].description}
                color="red"
              />
              <RightCard
                icon={<Lock className="w-5 h-5" />}
                title={t.sections.rights.items[3].title}
                description={t.sections.rights.items[3].description}
                color="orange"
              />
              <RightCard
                icon={<Download className="w-5 h-5" />}
                title={t.sections.rights.items[4].title}
                description={t.sections.rights.items[4].description}
                color="blue"
              />
              <RightCard
                icon={<XCircle className="w-5 h-5" />}
                title={t.sections.rights.items[5].title}
                description={t.sections.rights.items[5].description}
                color="pink"
              />
            </div>
            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm">
                <Info className="w-4 h-4 inline mr-2 text-cyan-400" />
                {t.sections.rights.footer}{' '}
                <a href={`mailto:${dpoEmail}`} className="text-cyan-400 hover:underline font-medium">
                  {dpoEmail}
                </a>
              </p>
            </div>
          </PrivacySection>

          {/* Section 7: Sécurité */}
          <PrivacySection
            icon={Lock}
            title={t.sections.security.title}
            delay={0.8}
          >
            <p className="text-white/80 mb-4">
              {t.sections.security.intro}
            </p>
            <div className="grid gap-3">
              {t.sections.security.measures.map((measure, index) => (
                <SecurityMeasure 
                  key={index}
                  measure={measure}
                />
              ))}
            </div>
          </PrivacySection>

          {/* Section 8: Transferts de données */}
          <PrivacySection
            icon={Globe}
            title={t.sections.transfers.title}
            delay={0.9}
          >
            <p className="text-white/80 mb-4">
              {t.sections.transfers.intro}
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2">{t.sections.transfers.eu.title}</h4>
                <p className="text-white/70 text-sm">
                  {t.sections.transfers.eu.description}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2">{t.sections.transfers.nonEu.title}</h4>
                <p className="text-white/70 text-sm">
                  {t.sections.transfers.nonEu.description}
                </p>
              </div>
            </div>
          </PrivacySection>

          {/* Section 9: Cookies */}
          <PrivacySection
            icon={Cookie}
            title={t.sections.cookies.title}
            delay={1.0}
          >
            <p className="text-white/80 mb-4">
              {t.sections.cookies.intro}
            </p>
            <div className="space-y-3">
              {t.sections.cookies.types.map((cookieType, index) => (
                <CookieType 
                  key={index}
                  type={cookieType.type}
                  description={cookieType.description}
                  required={cookieType.required}
                  language={currentLanguage}
                  translations={t.badges}
                />
              ))}
            </div>
            <p className="text-white/70 text-sm mt-4">
              {t.sections.cookies.footer}
            </p>
          </PrivacySection>

          {/* Section 10: Contact et réclamation */}
          <PrivacySection
            icon={Mail}
            title={t.sections.contact.title}
            delay={1.1}
          >
            <p className="text-white/80 mb-4">
              {t.sections.contact.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    {t.sections.contact.dpoCard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-2">{dpoName}</p>
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
                    <Shield className="w-5 h-5 text-violet-400" />
                    {t.sections.contact.cnilCard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-2">{t.sections.contact.cnilCard.name}</p>
                  <a 
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 text-sm underline"
                  >
                    www.cnil.fr
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/80 text-sm">
                {t.sections.contact.footer}
              </p>
            </div>
          </PrivacySection>
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
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white text-2xl mb-3">{t.cta.title}</h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                {t.cta.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white shadow-lg shadow-cyan-500/30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.cta.backHome}
                  </Button>
                </Link>
                <Button
                  className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 border-0"
                  onClick={() => window.location.href = `mailto:${dpoEmail}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t.cta.contactDpo}
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
            © {new Date().getFullYear()} {company}. {currentLanguage === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function PrivacySection({ 
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

function DataItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <p className="text-white/80 text-sm">{children}</p>
    </div>
  );
}

function FinalityCard({ title, description, color }: { title: string; description: string; color: string }) {
  const gradients: Record<string, string> = {
    cyan: 'from-cyan-500/10 to-transparent',
    violet: 'from-violet-500/10 to-transparent',
    blue: 'from-blue-500/10 to-transparent',
  };

  return (
    <div className={`bg-gradient-to-r ${gradients[color]} border border-white/10 rounded-lg p-4`}>
      <h4 className="text-white mb-2">{title}</h4>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
}

function LegalBasisItem({ basis, description }: { basis: string; description: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-white text-sm mb-1"><strong>{basis}</strong></p>
        <p className="text-white/70 text-xs">{description}</p>
      </div>
    </div>
  );
}

function RetentionItem({ period, description, highlight = false }: { period: string; description: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${highlight ? 'bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-2' : ''}`}>
      <span className="text-white/80 text-sm">{description}</span>
      <Badge className={highlight ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' : 'bg-white/10 text-white/70 border-white/20'}>
        {period}
      </Badge>
    </div>
  );
}

function RightCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colors: Record<string, { border: string; bg: string; iconColor: string }> = {
    cyan: { border: 'border-cyan-400/30', bg: 'bg-cyan-500/10', iconColor: 'text-cyan-400' },
    violet: { border: 'border-violet-400/30', bg: 'bg-violet-500/10', iconColor: 'text-violet-400' },
    red: { border: 'border-red-400/30', bg: 'bg-red-500/10', iconColor: 'text-red-400' },
    orange: { border: 'border-orange-400/30', bg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
    blue: { border: 'border-blue-400/30', bg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
    pink: { border: 'border-pink-400/30', bg: 'bg-pink-500/10', iconColor: 'text-pink-400' },
  };

  const style = colors[color];

  return (
    <div className={`${style.border} ${style.bg} border rounded-lg p-4 backdrop-blur-sm`}>
      <div className={`${style.iconColor} mb-2`}>{icon}</div>
      <h4 className="text-white text-sm mb-1">{title}</h4>
      <p className="text-white/60 text-xs">{description}</p>
    </div>
  );
}

function SecurityMeasure({ measure }: { measure: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
      <Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
      <p className="text-white/80 text-sm">{measure}</p>
    </div>
  );
}

function CookieType({ type, description, required, language, translations }: { type: string; description: string; required: boolean; language: string; translations: Record<string, string> }) {
  return (
    <div className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex-1">
        <h4 className="text-white text-sm mb-1">{type}</h4>
        <p className="text-white/60 text-xs">{description}</p>
      </div>
      <Badge className={required ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-white/10 text-white/70 border-white/20'}>
        {required ? translations.required : translations.optional}
      </Badge>
    </div>
  );
}