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
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation } from './src/i18n/pages/usePageTranslation';
import { AVAILABLE_LANGUAGES_CGV } from './src/i18n/pages/cgv';

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

  const { currentLanguage, setLanguage } = useLanguageManager();
  const t = usePageTranslation('cgv', currentLanguage);
  const seoTitle = `${t.hero.title} | YOJOB`;
  const seoDescription = t.hero.subtitle.replace('{company}', company);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        lang={currentLanguage as any}
        availableLanguages={AVAILABLE_LANGUAGES_CGV}
      />
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
            <div className="flex items-center gap-4">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={setLanguage}
                availableLanguages={AVAILABLE_LANGUAGES_CGV}
              />
              <Button
                className="relative overflow-hidden group rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.common.back}
              </Button>
            </div>
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
            {t.hero.badge}
          </Badge>
          
          <h1 className="text-white mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-6">
            {t.hero.subtitle}
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">
              {t.hero.effectiveDate}
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
                  title={t.actors.yojob.title}
                  description={t.actors.yojob.description}
                  color="cyan"
                />
                <ActorCard 
                  icon={<Building2 className="w-8 h-8 text-blue-400" />}
                  title={t.actors.eu.title}
                  description={t.actors.eu.description}
                  color="blue"
                />
                <ActorCard 
                  icon={<Users className="w-8 h-8 text-violet-400" />}
                  title={t.actors.ett.title}
                  description={t.actors.ett.description}
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
            title={t.sections.article0.title}
            delay={0.2}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard label={t.sections.article0.fields.legalForm} value={t.sections.article0.fields.legalFormValue} />
              <InfoCard label={t.sections.article0.fields.manager} value={t.sections.article0.fields.managerValue} />
              <InfoCard label={t.sections.article0.fields.siret} value={t.sections.article0.fields.siretValue} />
              <InfoCard label={t.sections.article0.fields.vat} value={t.sections.article0.fields.vatValue} />
              <InfoCard label={t.sections.article0.fields.address} value={t.sections.article0.fields.addressValue} />
              <InfoCard label={t.sections.article0.fields.contact} value={t.sections.article0.fields.contactValue} />
            </div>
            <div className="mt-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm flex items-start gap-2">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t.sections.article0.insurance.title} :</strong> {t.sections.article0.insurance.description}
                </span>
              </p>
            </div>
          </CGVSection>

          {/* Article 1: Définitions */}
          <CGVSection
            icon={FileText}
            title={t.sections.article1.title}
            delay={0.3}
          >
            <div className="space-y-3">
              <DefinitionItem 
                term={t.sections.article1.terms.yojob.term}
                definition={t.sections.article1.terms.yojob.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.eu.term}
                definition={t.sections.article1.terms.eu.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.ett.term}
                definition={t.sections.article1.terms.ett.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.profile.term}
                definition={t.sections.article1.terms.profile.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.mission.term}
                definition={t.sections.article1.terms.mission.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.proposition.term}
                definition={t.sections.article1.terms.proposition.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.handover.term}
                definition={t.sections.article1.terms.handover.definition}
              />
              <DefinitionItem 
                term={t.sections.article1.terms.insurer.term}
                definition={t.sections.article1.terms.insurer.definition}
              />
            </div>
          </CGVSection>

          {/* Article 2: Objet */}
          <CGVSection
            icon={Target}
            title={t.sections.article2.title}
            delay={0.4}
          >
            <p className="text-white/80 mb-4">
              {t.sections.article2.intro}
            </p>
            <div className="space-y-3">
              <ServiceStep 
                number="1"
                title={t.sections.article2.steps.step1.title}
                description={t.sections.article2.steps.step1.description}
                icon={<Target className="w-5 h-5 text-cyan-400" />}
              />
              <ServiceStep 
                number="2"
                title={t.sections.article2.steps.step2.title}
                description={t.sections.article2.steps.step2.description}
                icon={<Network className="w-5 h-5 text-violet-400" />}
              />
              <ServiceStep 
                number="3"
                title={t.sections.article2.steps.step3.title}
                description={t.sections.article2.steps.step3.description}
                icon={<FileSignature className="w-5 h-5 text-blue-400" />}
              />
              <ServiceStep 
                number="4"
                title={t.sections.article2.steps.step4.title}
                description={t.sections.article2.steps.step4.description}
                icon={<Handshake className="w-5 h-5 text-green-400" />}
              />
            </div>
            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-white/90 text-sm flex items-start gap-2">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t.sections.article2.yojobRole.title} :</strong> {t.sections.article2.yojobRole.description}
                </span>
              </p>
            </div>
          </CGVSection>

          {/* Article 3: Hiérarchie */}
          <CGVSection
            icon={GitBranch}
            title={t.sections.article3.title}
            delay={0.5}
          >
            <p className="text-white/80 mb-4">
              {t.sections.article3.intro}
            </p>
            <div className="space-y-2">
              <HierarchyItem rank="1" title={t.sections.article3.hierarchy.rank1.title} subtitle={t.sections.article3.hierarchy.rank1.subtitle} />
              <HierarchyItem rank="2" title={t.sections.article3.hierarchy.rank2.title} subtitle={t.sections.article3.hierarchy.rank2.subtitle} />
              <HierarchyItem rank="3" title={t.sections.article3.hierarchy.rank3.title} subtitle={t.sections.article3.hierarchy.rank3.subtitle} />
              <HierarchyItem rank="4" title={t.sections.article3.hierarchy.rank4.title} subtitle={t.sections.article3.hierarchy.rank4.subtitle} />
            </div>
          </CGVSection>

          {/* Article 4: Schémas contractuels */}
          <CGVSection
            icon={FileCheck}
            title={t.sections.article4.title}
            delay={0.6}
          >
            <p className="text-white/80 mb-4">
              {t.sections.article4.intro}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <SchemaCard 
                label={t.sections.article4.schemes.schemaB.label}
                badge={t.sections.article4.schemes.schemaB.badge}
                title={t.sections.article4.schemes.schemaB.title}
                description={t.sections.article4.schemes.schemaB.description}
                color="violet"
                icon={<Users className="w-8 h-8" />}
              />
              <SchemaCard 
                label={t.sections.article4.schemes.schemaA.label}
                badge={t.sections.article4.schemes.schemaA.badge}
                title={t.sections.article4.schemes.schemaA.title}
                description={t.sections.article4.schemes.schemaA.description}
                color="blue"
                icon={<Building2 className="w-8 h-8" />}
              />
              <SchemaCard 
                label={t.sections.article4.schemes.schemaC.label}
                badge={t.sections.article4.schemes.schemaC.badge}
                title={t.sections.article4.schemes.schemaC.title}
                description={t.sections.article4.schemes.schemaC.description}
                color="cyan"
                icon={<GitBranch className="w-8 h-8" />}
              />
            </div>
          </CGVSection>

          {/* Article 5: Process */}
          <CGVSection
            icon={Zap}
            title={t.sections.article5.title}
            delay={0.7}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  {t.sections.article5.phase1.title}
                </h4>
                <p className="text-white/80 mb-3">{t.sections.article5.phase1.intro}</p>
                <div className="space-y-2">
                  {t.sections.article5.phase1.items.map((item: string, index: number) => (
                    <ProcessItem key={index} text={item} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-violet-400" />
                  {t.sections.article5.phase2.title}
                </h4>
                <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm mb-3">
                    {t.sections.article5.phase2.intro}
                  </p>
                  <div className="space-y-2">
                    {t.sections.article5.phase2.conditions.map((condition: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm"><strong>{condition}</strong></span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/90 text-sm mt-4">
                    {t.sections.article5.phase2.consequences}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  {t.sections.article5.phase3.title}
                </h4>
                <p className="text-white/80 text-sm">
                  {t.sections.article5.phase3.description}
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 6: Conditions financières */}
          <CGVSection
            icon={Euro}
            title={t.sections.article6.title}
            delay={0.8}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  {t.sections.article6.section1.title}
                </h4>
                <p className="text-white/80 mb-3">
                  {t.sections.article6.section1.intro}
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-3">{t.sections.article6.section1.modalitiesTitle}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {t.sections.article6.section1.modalities.map((mod: string, index: number) => (
                      <PaymentOption key={index} text={mod} />
                    ))}
                  </div>
                </div>
                <div className="mt-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm">
                    <Info className="w-4 h-4 inline mr-2 text-blue-400" />
                    {t.sections.article6.section1.legalLimit}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                  {t.sections.article6.section2.title}
                </h4>
                <p className="text-white/80 mb-4 text-sm">
                  {t.sections.article6.section2.intro}
                </p>
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <RiskSourceCard 
                    icon={<Shield className="w-6 h-6 text-cyan-400" />}
                    title={t.sections.article6.section2.sources.insurer.title}
                    description={t.sections.article6.section2.sources.insurer.description}
                  />
                  <RiskSourceCard 
                    icon={<Database className="w-6 h-6 text-violet-400" />}
                    title={t.sections.article6.section2.sources.score.title}
                    description={t.sections.article6.section2.sources.score.description}
                  />
                  <RiskSourceCard 
                    icon={<Clock className="w-6 h-6 text-blue-400" />}
                    title={t.sections.article6.section2.sources.history.title}
                    description={t.sections.article6.section2.sources.history.description}
                  />
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4 mb-4">
                  <p className="text-white/90 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-2 text-orange-400" />
                    {t.sections.article6.section2.primacy}
                  </p>
                </div>

                <h5 className="text-white text-sm mb-3">{t.sections.article6.section2.levelsTitle}</h5>
                <div className="space-y-3">
                  <RiskLevelCard 
                    level={t.sections.article6.section2.levels.r0.level}
                    title={t.sections.article6.section2.levels.r0.title}
                    color="green"
                    trigger={t.sections.article6.section2.levels.r0.trigger}
                    conditions={t.sections.article6.section2.levels.r0.conditions}
                    safeguards={t.sections.article6.section2.levels.r0.safeguards}
                    labels={t.common}
                  />
                  <RiskLevelCard 
                    level={t.sections.article6.section2.levels.r1.level}
                    title={t.sections.article6.section2.levels.r1.title}
                    color="yellow"
                    trigger={t.sections.article6.section2.levels.r1.trigger}
                    conditions={t.sections.article6.section2.levels.r1.conditions}
                    safeguards={t.sections.article6.section2.levels.r1.safeguards}
                    labels={t.common}
                  />
                  <RiskLevelCard 
                    level={t.sections.article6.section2.levels.r2.level}
                    title={t.sections.article6.section2.levels.r2.title}
                    color="orange"
                    trigger={t.sections.article6.section2.levels.r2.trigger}
                    conditions={t.sections.article6.section2.levels.r2.conditions}
                    safeguards={t.sections.article6.section2.levels.r2.safeguards}
                    labels={t.common}
                  />
                  <RiskLevelCard 
                    level={t.sections.article6.section2.levels.r3.level}
                    title={t.sections.article6.section2.levels.r3.title}
                    color="red"
                    trigger={t.sections.article6.section2.levels.r3.trigger}
                    conditions={t.sections.article6.section2.levels.r3.conditions}
                    safeguards={t.sections.article6.section2.levels.r3.safeguards}
                    labels={t.common}
                  />
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="text-white text-sm mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    {t.sections.article6.section2.transparency.title}
                  </h5>
                  <p className="text-white/70 text-sm">
                    {t.sections.article6.section2.transparency.description}
                  </p>
                </div>

                <div className="mt-3 bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-400/30 rounded-lg p-4">
                  <h5 className="text-white text-sm mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-violet-400" />
                    {t.sections.article6.section2.adjustment.title}
                  </h5>
                  <p className="text-white/80 text-sm">
                    {t.sections.article6.section2.adjustment.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  {t.sections.article6.section3.title}
                </h4>
                <p className="text-white/80 mb-3 text-sm">
                  {t.sections.article6.section3.intro}
                </p>
                <div className="space-y-2">
                  <PenaltyItem 
                    icon={<TrendingUp className="w-4 h-4 text-orange-400" />}
                    text={t.sections.article6.section3.penalties[0]}
                  />
                  <PenaltyItem 
                    icon={<Euro className="w-4 h-4 text-red-400" />}
                    text={t.sections.article6.section3.penalties[1]}
                  />
                  <PenaltyItem 
                    icon={<XCircle className="w-4 h-4 text-red-400" />}
                    text={t.sections.article6.section3.penalties[2]}
                  />
                </div>
              </div>
            </div>
          </CGVSection>

          {/* Article 7: Obligations EU */}
          <CGVSection
            icon={Building2}
            title={t.sections.article7.title}
            delay={0.9}
          >
            <p className="text-white/80 mb-4">{t.sections.article7.intro}</p>
            <div className="space-y-2">
              {t.sections.article7.obligations.map((obligation: string, index: number) => (
                <ObligationItem key={index} text={obligation} />
              ))}
            </div>
          </CGVSection>

          {/* Article 8: Obligations ETT */}
          <CGVSection
            icon={Users}
            title={t.sections.article8.title}
            delay={1.0}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  {t.sections.article8.section1.title}
                </h4>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg p-4">
                  <p className="text-white/90 mb-3">
                    {t.sections.article8.section1.intro}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <CommissionDetail label={t.sections.article8.section1.details.rate.label} value={t.sections.article8.section1.details.rate.value} />
                    <CommissionDetail label={t.sections.article8.section1.details.base.label} value={t.sections.article8.section1.details.base.value} />
                    <CommissionDetail label={t.sections.article8.section1.details.rhythm.label} value={t.sections.article8.section1.details.rhythm.value} />
                    <CommissionDetail label={t.sections.article8.section1.details.deadline.label} value={t.sections.article8.section1.details.deadline.value} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-400" />
                  {t.sections.article8.section2.title}
                </h4>
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-400/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm mb-3">
                    {t.sections.article8.section2.intro}
                  </p>
                  <div className="space-y-2">
                    <SuccessFeeItem 
                      label={t.sections.article8.section2.items.trigger.label}
                      value={t.sections.article8.section2.items.trigger.value}
                    />
                    <SuccessFeeItem 
                      label={t.sections.article8.section2.items.exigibility.label}
                      value={t.sections.article8.section2.items.exigibility.value}
                    />
                    <SuccessFeeItem 
                      label={t.sections.article8.section2.items.amount.label}
                      value={t.sections.article8.section2.items.amount.value}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  {t.sections.article8.section3.title}
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  {t.sections.article8.section3.intro}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {t.sections.article8.section3.items.map((item: string, index: number) => (
                    <ReportingItem key={index} text={item} />
                  ))}
                </div>
              </div>
            </div>
          </CGVSection>

          {/* Article 9: Période d'essai */}
          <CGVSection
            icon={Clock}
            title={t.sections.article9.title}
            delay={1.1}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-cyan-400" />
                  {t.sections.article9.section1.title}
                </h4>
                <p className="text-white/80 text-sm">
                  {t.sections.article9.section1.description}
                </p>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  {t.sections.article9.section2.title}
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  {t.sections.article9.section2.intro}
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {t.sections.article9.section2.durations.map((item: any, index: number) => (
                    <TrialPeriodCard key={index} duration={item.duration} condition={item.condition} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  {t.sections.article9.section3.title}
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  {t.sections.article9.section3.intro}
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {t.sections.article9.section3.durations.map((item: any, index: number) => (
                    <TrialPeriodCard key={index} duration={item.duration} condition={item.condition} color={item.color} />
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-3">
                  {t.sections.article9.section3.note}
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 10: Non-contournement */}
          <CGVSection
            icon={Ban}
            title={t.sections.article10.title}
            delay={1.2}
          >
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-lg p-6 mb-4">
              <p className="text-white/90 mb-4">
                {t.sections.article10.intro}
              </p>
              <div className="space-y-3">
                <NonCircumventItem 
                  actor="EU"
                  text={t.sections.article10.actors.eu}
                />
                <NonCircumventItem 
                  actor="ETT"
                  text={t.sections.article10.actors.ett}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                {t.sections.article10.penalty.title}
              </h4>
              <p className="text-white/90 text-sm">
                {t.sections.article10.penalty.description}
              </p>
            </div>
          </CGVSection>

          {/* Article 11: Responsabilité */}
          <CGVSection
            icon={ShieldCheck}
            title={t.sections.article11.title}
            delay={1.3}
          >
            <div className="space-y-4">
              <ResponsibilityCard 
                title={t.sections.article11.items.obligation.title}
                description={t.sections.article11.items.obligation.description}
                icon={<Target className="w-6 h-6 text-cyan-400" />}
              />
              <ResponsibilityCard 
                title={t.sections.article11.items.nonResponsibility.title}
                description={t.sections.article11.items.nonResponsibility.description}
                icon={<Shield className="w-6 h-6 text-violet-400" />}
              />
              <ResponsibilityCard 
                title={t.sections.article11.items.cap.title}
                description={t.sections.article11.items.cap.description}
                icon={<Scale className="w-6 h-6 text-blue-400" />}
              />
              <ResponsibilityCard 
                title={t.sections.article11.items.indirect.title}
                description={t.sections.article11.items.indirect.description}
                icon={<XCircle className="w-6 h-6 text-orange-400" />}
              />
            </div>
          </CGVSection>

          {/* Article 12: Confidentialité */}
          <CGVSection
            icon={Lock}
            title={t.sections.article12.title}
            delay={1.4}
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-6">
              <p className="text-white/90 mb-4">
                {t.sections.article12.intro}
              </p>
              <div className="space-y-3">
                {t.sections.article12.items.map((item: string, index: number) => (
                  <ConfidentialityItem key={index} text={item} />
                ))}
              </div>
            </div>
          </CGVSection>

          {/* Article 13: RGPD */}
          <CGVSection
            icon={Database}
            title={t.sections.article13.title}
            delay={1.5}
          >
            <p className="text-white/80 mb-4">
              {t.sections.article13.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card className="border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3" />
                  <h4 className="text-white mb-2">{t.sections.article13.cards.compliance.title}</h4>
                  <p className="text-white/70 text-sm mb-3">
                    {t.sections.article13.cards.compliance.description}
                  </p>
                  <a 
                    href="/privacy"
                    className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 underline"
                  >
                    {t.sections.article13.cards.compliance.linkText} <ArrowLeft className="w-3 h-3 rotate-180" />
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm">
                <CardContent className="p-4">
                  <Mail className="w-8 h-8 text-violet-400 mb-3" />
                  <h4 className="text-white mb-2">{t.sections.article13.cards.dpo.title}</h4>
                  <p className="text-white/70 text-sm mb-3">
                    {t.sections.article13.cards.dpo.description}
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
                {t.sections.article13.dpaNote}
              </p>
            </div>
          </CGVSection>

          {/* Article 14: Durée et résiliation */}
          <CGVSection
            icon={Calendar}
            title={t.sections.article14.title}
            delay={1.6}
          >
            <div className="space-y-4">
              <DurationCard 
                icon={<Clock className="w-6 h-6 text-cyan-400" />}
                title={t.sections.article14.items.duration.title}
                description={t.sections.article14.items.duration.description}
              />
              <DurationCard 
                icon={<XCircle className="w-6 h-6 text-orange-400" />}
                title={t.sections.article14.items.earlyTermination.title}
                description={t.sections.article14.items.earlyTermination.description}
              />
              <DurationCard 
                icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
                title={t.sections.article14.items.breach.title}
                description={t.sections.article14.items.breach.description}
              />
            </div>
          </CGVSection>

          {/* Article 15: Force majeure */}
          <CGVSection
            icon={AlertTriangle}
            title={t.sections.article15.title}
            delay={1.7}
          >
            <p className="text-white/80 mb-4">
              {t.sections.article15.intro}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/70 text-sm mb-3">
                {t.sections.article15.examplesTitle}
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {t.sections.article15.examples.map((example: string, index: number) => (
                  <ForceMajeureItem key={index} text={example} />
                ))}
              </div>
            </div>
            <p className="text-white/70 text-sm mt-3">
              {t.sections.article15.suspension}
            </p>
          </CGVSection>

          {/* Article 16: Droit applicable */}
          <CGVSection
            icon={Gavel}
            title={t.sections.article16.title}
            delay={1.8}
          >
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  {t.sections.article16.sections.law.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {t.sections.article16.sections.law.description}
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-violet-400" />
                  {t.sections.article16.sections.amicable.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {t.sections.article16.sections.amicable.description}
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white mb-2 flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-blue-400" />
                  {t.sections.article16.sections.jurisdiction.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {t.sections.article16.sections.jurisdiction.description}
                </p>
              </div>
            </div>
          </CGVSection>

          {/* Article 17: Modifications */}
          <CGVSection
            icon={RefreshCw}
            title={t.sections.article17.title}
            delay={1.9}
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/30 rounded-lg p-6">
              <p className="text-white/90 mb-4">
                {t.sections.article17.intro}
              </p>
              <div className="space-y-3">
                {t.sections.article17.items.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white/80 text-sm">
                      {item}
                    </p>
                  </div>
                ))}
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
                  {t.cta.contactUs}
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
              {t.footer.copyright.replace('{year}', new Date().getFullYear().toString()).replace('{company}', company)}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              <a href="/legal" className="hover:text-cyan-400 transition-colors">{t.footer.links.legal}</a>
              <span>•</span>
              <a href="/privacy" className="hover:text-cyan-400 transition-colors">{t.footer.links.privacy}</a>
              <span>•</span>
              <a href="/cgv" className="hover:text-cyan-400 transition-colors">{t.footer.links.cgv}</a>
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

function RiskLevelCard({ level, title, color, trigger, conditions, safeguards, labels }: { level: string; title: string; color: string; trigger: string; conditions: string; safeguards: string; labels: { triggers: string; conditions: string; safeguards: string } }) {
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
          <p className="text-white/80 text-xs mb-1"><strong>{labels.triggers} :</strong></p>
          <p className="text-white/70 text-xs">{trigger}</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-1"><strong>{labels.conditions} :</strong></p>
          <p className="text-white/70 text-xs">{conditions}</p>
        </div>
        <div>
          <p className="text-white/80 text-xs mb-1"><strong>{labels.safeguards} :</strong></p>
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
