import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { Footer } from './components/landing/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  Handshake, 
  Star, 
  Globe, 
  Network, 
  Users, 
  CheckCircle, 
  Clock, 
  Award, 
  Target, 
  ArrowRight
} from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation, AVAILABLE_LANGUAGES_A_PROPOS } from './src/i18n/pages';
import { footerTranslations } from './src/i18n/services/footer';
import type { SupportedLanguage } from './src/i18n/pages';

export default function APropos() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageManager();
  
  // Ensure we use a valid language code (only fr and en are translated)
  const validLanguage: SupportedLanguage = AVAILABLE_LANGUAGES_A_PROPOS.includes(currentLanguage as any) 
    ? (currentLanguage as SupportedLanguage)
    : 'fr';
  
  const t = usePageTranslation('a-propos', validLanguage);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Excellence humaine",
      description: "Placer l'humain au cœur de nos services, avec respect et écoute",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Conformité totale",
      description: "Garantir 100% de légalité dans le détachement européen",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Réactivité",
      description: "Répondre à vos besoins en moins de 48h chrono",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Partenariats durables",
      description: "Construire des relations de confiance sur le long terme",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead page="a-propos" lang={validLanguage} availableLanguages={AVAILABLE_LANGUAGES_A_PROPOS} />

        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/10 backdrop-blur-md shadow-lg shadow-white/5' : 'bg-transparent'
          }`}
        >
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
                currentLanguage={currentLanguage}
                onLanguageChange={setLanguage}
                availableLanguages={AVAILABLE_LANGUAGES_A_PROPOS}
              />
              <a 
                href="/devis"
                className="relative overflow-hidden group rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105 px-6 py-2.5 inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </a>
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                {t.hero.badge}
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                {t.hero.title}
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8 text-[16px]">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/devis">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                  >
                    <span className="relative z-10 flex items-center">
                      {t.hero.cta.primary}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </a>
                <a href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all"
                  >
                    {t.hero.cta.secondary}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* STATS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {t.stats.map((stat, index) => {
                const icons = [Users, Globe, CheckCircle, Clock];
                const colors = [
                  "from-violet-500 to-purple-600",
                  "from-cyan-500 to-blue-600",
                  "from-green-500 to-emerald-600",
                  "from-orange-500 to-amber-600"
                ];
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                      <CardContent className="p-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="text-white mb-2">{stat.value}</div>
                        <p className="text-white/70 text-sm">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* NOTRE MISSION */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Target className="w-4 h-4 mr-2" />
                {t.mission.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.mission.title}</h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto text-[16px]">
                {t.mission.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-white mb-4 text-[20px]">{t.mission.problem.title}</h3>
                    <ul className="space-y-3 text-white/70">
                      {t.mission.problem.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-white mb-4 text-[20px]">{t.mission.solution.title}</h3>
                    <ul className="space-y-3 text-white/70">
                      {t.mission.solution.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
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

        {/* ============================================ */}
        {/* NOS VALEURS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Heart className="w-4 h-4 mr-2" />
                {t.values.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.values.title}</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                {t.values.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.values.items.map((value, index) => {
                const icons = [Heart, ShieldCheck, Zap, Handshake];
                const colors = [
                  "from-pink-500 to-rose-600",
                  "from-blue-500 to-cyan-600",
                  "from-violet-500 to-purple-600",
                  "from-green-500 to-emerald-600"
                ];
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-white mb-3">{value.title}</h3>
                        <p className="text-white/70 text-sm">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* NOTRE HISTOIRE */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-2" />
                {t.timeline.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.timeline.title}</h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-400 to-orange-400 hidden lg:block" />

              <div className="space-y-12">
                {t.timeline.items.map((item, index) => {
                  const icons = [Star, Globe, Network, Zap];
                  const colors = [
                    "from-blue-500 to-cyan-600",
                    "from-violet-500 to-purple-600",
                    "from-cyan-500 to-blue-600",
                    "from-orange-500 to-amber-600"
                  ];
                  const Icon = icons[index];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex items-center gap-8 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all">
                          <CardContent className="p-6">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-4 text-white shadow-lg ${
                              index % 2 === 0 ? 'lg:ml-auto' : ''
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="text-cyan-400 mb-2">{item.year}</div>
                            <h3 className="text-white mb-2 text-[20px]">{item.title}</h3>
                            <p className="text-white/70 text-sm">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="hidden lg:block w-4 h-4 rounded-full bg-white border-4 border-[#1E3A8A] relative z-10" />
                      <div className="flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA FINAL */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12"
            >
              <h2 className="text-white mb-4 text-[20px]">{t.finalCta.title}</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto text-[16px]">
                {t.finalCta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/devis">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                  >
                    <span className="relative z-10 flex items-center">
                      {t.finalCta.cta.primary}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </a>
                <a href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all"
                  >
                    {t.finalCta.cta.secondary}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer language={currentLanguage} />
      </div>
    </HelmetProvider>
  );
}
