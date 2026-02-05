import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { 
  Globe, 
  Building2, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Search,
  Shield,
  FileText,
  Clock,
  Lock,
  BarChart3
} from 'lucide-react';
import { EuropeMap } from './components/landing/EuropeMap';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation, getAvailableLanguagesForPage } from './hooks/usePageTranslation';
import { useEuropeMapTranslation } from './hooks/useEuropeMapTranslation';

export default function NotreReseau() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Utiliser le gestionnaire de langue unifié
  const { currentLanguage, setLanguage } = useLanguageManager();
  
  // Récupérer les traductions pour la page
  const t = usePageTranslation('notre-reseau', currentLanguage);
  
  // 🗺️ Récupérer les traductions de la carte Europe
  const europeMapTranslations = useEuropeMapTranslation(currentLanguage as any);
  
  // Récupérer les langues disponibles pour cette page
  const availableLanguages = getAvailableLanguagesForPage('notre-reseau');

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topCountries = t.topCountries.countries.map((country: any, index: number) => ({
    name: country.name,
    flag: ["🇫🇷", "🇵🇱", "🇵🇹", "🇷🇴", "🇪🇸", "🇮🇹"][index],
    agencies: [85, 78, 62, 54, 48, 42][index],
    specialties: country.specialties,
    color: ["from-blue-500 to-cyan-600", "from-red-500 to-rose-600", "from-green-500 to-emerald-600", "from-yellow-500 to-orange-600", "from-orange-500 to-red-600", "from-green-500 to-red-600"][index]
  }));

  const otherCountries = t.otherCountries.countries.map((country: any, index: number) => ({
    name: country.name,
    flag: ["🇩🇪", "🇳🇱", "🇧🇪", "🇨🇿", "🇭🇺", "🇧🇬", "🇸🇰", "🇭🇷", "🇬🇷", "🇦🇹", "🇸🇪", "🇱🇹", "🇱🇻", "🇸🇮", "🇩🇰", "🇮🇪", "🇫🇮", "🇪🇪", "🇱🇺", "🇨🇾", "🇲🇹"][index],
    agencies: [38, 32, 28, 24, 22, 20, 18, 16, 15, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2][index]
  }));

  const advantages = t.advantages.items.map((item: any, index: number) => ({
    icon: [<Globe className="w-8 h-8" key="globe" />, <Building2 className="w-8 h-8" key="building" />, <Users className="w-8 h-8" key="users" />, <CheckCircle className="w-8 h-8" key="check" />][index],
    title: item.title,
    description: item.description,
    color: ["from-blue-500 to-cyan-600", "from-violet-500 to-purple-600", "from-green-500 to-emerald-600", "from-orange-500 to-amber-600"][index]
  }));

  const marketplaceFeatures = t.marketplace.features.map((feature: any, index: number) => ({
    icon: [<Search className="w-6 h-6" key="search" />, <Shield className="w-6 h-6" key="shield" />, <Users className="w-6 h-6" key="users2" />, <FileText className="w-6 h-6" key="file" />, <Globe className="w-6 h-6" key="globe2" />, <Clock className="w-6 h-6" key="clock" />, <Lock className="w-6 h-6" key="lock" />, <BarChart3 className="w-6 h-6" key="chart" />][index],
    title: feature.title,
    description: feature.description,
    color: ["from-blue-500 to-cyan-600", "from-green-500 to-emerald-600", "from-violet-500 to-purple-600", "from-orange-500 to-amber-600", "from-pink-500 to-rose-600", "from-cyan-500 to-blue-600", "from-yellow-500 to-orange-600", "from-indigo-500 to-purple-600"][index]
  }));

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead page="notre-reseau" lang={currentLanguage as any} availableLanguages={availableLanguages} />

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
                availableLanguages={availableLanguages}
              />
              <a 
                href="/devis"
                className="relative overflow-hidden group rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105 px-6 py-2.5 inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  {t.header.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </a>
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO + CARTE INTERACTIVE FUSIONNÉS */}
        {/* ============================================ */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl" 
                 style={{ animationDelay: '1s' }} />
            {/* Particules décoratives */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-300/30 rounded-full animate-ping" />
            <div className="absolute top-20 right-20 w-1 h-1 bg-violet-300/30 rounded-full animate-ping" 
                 style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-10 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" 
                 style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Contenu Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Globe className="w-4 h-4 mr-2" />
                {t.hero.badge}
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                {t.hero.title}
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 text-[16px]">
                {t.hero.subtitle}
              </p>

              <div className="flex justify-center mb-12">
                <EuropeMap 
                  variant="network"
                  agenciesLabel={europeMapTranslations.agenciesLabel}
                  countryNames={europeMapTranslations.countries}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-white mb-4 text-[20px]">{t.hero.mapTitle}</h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                  {t.hero.mapSubtitle}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* TOP PAYS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                {t.topCountries.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.topCountries.title}</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                {t.topCountries.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCountries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{country.flag}</div>
                        <div>
                          <h3 className="text-white">{country.name}</h3>
                          <p className="text-cyan-400 text-sm">{country.agencies} {t.topCountries.agenciesLabel}</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{t.topCountries.specialtiesLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {country.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            className="bg-white/10 border-white/20 text-white/80 text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{t.topCountries.averageDelay}</span>
                          <span className="text-green-400">{t.topCountries.delayValue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* AUTRES PAYS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Globe className="w-4 h-4 mr-2" />
                {t.otherCountries.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.otherCountries.title}</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                {t.otherCountries.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCountries.map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{country.flag}</div>
                        <div>
                          <h3 className="text-white">{country.name}</h3>
                          <p className="text-cyan-400 text-sm">{country.agencies} {t.otherCountries.agenciesLabel}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{t.otherCountries.averageDelay}</span>
                          <span className="text-green-400">{t.otherCountries.delayValue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* AVANTAGES DU RÉSEAU */}
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
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.advantages.badge}
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">{t.advantages.title}</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                {t.advantages.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {advantage.icon}
                      </div>
                      <h3 className="text-white mb-3 text-[20px]">{advantage.title}</h3>
                      <p className="text-white/70 text-sm">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* MARKETPLACE TEASER */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 border-0 text-white">
                  {t.marketplace.badge}
                </Badge>
                <h2 className="text-white mb-4 text-[20px]">{t.marketplace.title}</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto text-[16px]">
                  {t.marketplace.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {marketplaceFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{feature.title}</h4>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                >
                  <a href="/devis">
                    <span className="relative z-10 flex items-center">
                      {t.marketplace.cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </Button>
              </div>
            </motion.div>
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
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                >
                  <a href="/devis">
                    <span className="relative z-10 flex items-center">
                      {t.finalCta.primaryCta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 shadow-lg transition-all"
                >
                  <a href="/">
                    {t.finalCta.secondaryCta}
                  </a>
                </Button>
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
