import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  Shield,
  FileText,
  Users,
  CheckCircle2,
  Scale,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Building2,
  Target,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  Network,
  UserCheck,
  Star,
  Factory,
  Apple,
  Car,
  Truck,
  UtensilsCrossed,
  Trees,
  Package,
  Sparkles,
} from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { LogoSvg } from './imports/YojobLogoComplete';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { SEOHead } from './components/SEOHead';
import { Footer } from './components/landing/Footer';
import { useServiceTranslation } from './src/i18n/services/useServiceTranslation';
import { useLanguageManager } from './hooks/useLanguageManager';
import { footerTranslations } from './src/i18n/services/footer';
import { AVAILABLE_LANGUAGES_CONSEIL_CONFORMITE } from './src/i18n/services/conseilConformite';
import type { SupportedLanguage } from './src/i18n/types';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4"
        >
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ServiceConseilConformite() {
  // Use global language manager
  const { currentLanguage: globalLanguage, setLanguage } = useLanguageManager();
  
  // Get translations for current language
  const t = useServiceTranslation('conseilConformite', globalLanguage as SupportedLanguage);
  
  // Get footer translations
  const footerT = footerTranslations[globalLanguage as SupportedLanguage] || footerTranslations.fr;

  // Icons for advantages
  const advantageIcons = [
    <BookOpen className="w-8 h-8" />,
    <ShieldCheck className="w-8 h-8" />,
    <FileText className="w-8 h-8" />,
    <AlertCircle className="w-8 h-8" />,
  ];

  const advantageColors = [
    "from-blue-500 to-blue-600",
    "from-cyan-500 to-cyan-600",
    "from-violet-500 to-violet-600",
    "from-green-500 to-green-600",
  ];

  // Icons for process steps
  const processIcons = [
    <FileText className="w-8 h-8" />,
    <Network className="w-8 h-8" />,
    <UserCheck className="w-8 h-8" />,
    <CheckCircle className="w-8 h-8" />,
  ];

  const processColors = [
    "from-blue-500 to-blue-600",
    "from-cyan-500 to-cyan-600",
    "from-violet-500 to-violet-600",
    "from-green-500 to-green-600",
  ];

  // Icons for sectors
  const sectorIcons = [
    <Building2 className="w-8 h-8 text-white" />,
    <Factory className="w-8 h-8 text-white" />,
    <Apple className="w-8 h-8 text-white" />,
    <Car className="w-8 h-8 text-white" />,
    <Truck className="w-8 h-8 text-white" />,
    <UtensilsCrossed className="w-8 h-8 text-white" />,
    <Trees className="w-8 h-8 text-white" />,
    <Package className="w-8 h-8 text-white" />,
    <Sparkles className="w-8 h-8 text-white" />,
  ];

  const sectorColors = [
    "from-slate-600 to-slate-700",
    "from-blue-600 to-indigo-700",
    "from-emerald-600 to-teal-700",
    "from-blue-700 to-indigo-800",
    "from-slate-700 to-cyan-800",
    "from-rose-600 to-red-700",
    "from-green-700 to-emerald-800",
    "from-amber-600 to-orange-700",
    "from-violet-600 to-indigo-700",
  ];

  return (
    <>
      <SEOHead
        title={t.meta.title}
        description={t.meta.description}
        lang={globalLanguage as any}
        includeServiceSchema={true}
        faqItems={t.faq.items}
        availableLanguages={AVAILABLE_LANGUAGES_CONSEIL_CONFORMITE}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
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

            {/* CTA */}
            <div className="flex items-center gap-4">
              <LanguageSelector
                currentLanguage={globalLanguage}
                onLanguageChange={setLanguage}
                availableLanguages={AVAILABLE_LANGUAGES_CONSEIL_CONFORMITE}
              />
              <a 
                href="/devis"
                className="relative overflow-hidden group rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105 px-6 py-2.5 inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  {t.hero.cta.primary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                  {t.hero.badge}
                </Badge>
                <h1 className="text-white mb-6 max-w-3xl mx-auto">
                  {t.hero.title}
                </h1>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/devis">
                    <Button className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all px-12 py-6 text-lg">
                      <span className="relative z-10 flex items-center">
                        {t.hero.cta.primary}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    className="relative overflow-hidden group rounded-full border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all px-8 py-6 text-lg w-full sm:w-auto"
                    onClick={() => document.getElementById('processus')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10">{t.hero.cta.secondary}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/10 to-violet-500/10" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pour qui Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                {t.forWho.badge}
              </Badge>
              <h2 className="text-white mb-4">{t.forWho.title}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">{t.forWho.userCompanies.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">
                      {t.forWho.userCompanies.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">{t.forWho.concerns.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {t.forWho.concerns.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/70">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30 text-green-200 backdrop-blur-sm">
                {t.benefits.subtitle}
              </Badge>
              <h2 className="text-white">{t.benefits.title}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.benefits.items.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${advantageColors[index]} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        {advantageIcons[index]}
                      </div>
                      <h3 className="text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche Section */}
        <section id="processus" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                {t.process.badge}
              </Badge>
              <h2 className="text-white">{t.process.title}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 opacity-30" style={{ width: 'calc(100% - 12rem)', left: '6rem' }} />

              {t.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 relative">
                      <div className={`w-12 h-12 bg-gradient-to-br ${processColors[index]} rounded-xl flex items-center justify-center text-white text-xl absolute -top-6 right-6 shadow-lg rotate-12`}>
                        {index + 1}
                      </div>
                      <div className={`w-16 h-16 bg-gradient-to-br ${processColors[index]} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        {processIcons[index]}
                      </div>
                      <h3 className="text-white mb-2">{step.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Secteurs Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-200 backdrop-blur-sm">
                {t.sectors.badge}
              </Badge>
              <h2 className="text-white">{t.sectors.title}</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {t.sectors.items.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="h-full"
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                      <div className={`w-16 h-16 bg-gradient-to-br ${sectorColors[index]} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        {sectorIcons[index]}
                      </div>
                      <p className="text-white text-sm leading-tight">{sector.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignage Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-200 backdrop-blur-sm">
                {t.testimonial.badge}
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                    "{t.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                      {t.testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white">{t.testimonial.author.name}</p>
                      <p className="text-white/60 text-sm">{t.testimonial.author.role}</p>
                      <p className="text-white/40 text-xs mt-1">{t.testimonial.author.sector}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                {t.faq.badge}
              </Badge>
              <h2 className="text-white">{t.faq.title}</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {t.faq.items.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900 opacity-80" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-white mb-6">
                {t.ctaFinal.title}
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                {t.ctaFinal.subtitle}
              </p>
              <a href="/devis">
                <Button className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all px-12 py-6 text-lg">
                  <span className="relative z-10 flex items-center">
                    {t.ctaFinal.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </Button>
              </a>
              <p className="text-white/60 text-sm mt-6">
                {t.ctaFinal.features}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer content={footerT} />
      </div>
    </>
  );
}
