/**
 * 🏢 PAGE NOS SECTEURS - YOJOB
 * 
 * Page présentant les 6 secteurs d'activité couverts par YOJOB
 * Design: Glassmorphism + Gradients + Animations Motion
 * Traductions: FR/EN/DE/ES/IT/NL/PT/PL/CS/SK/HU/RO/BG/HR/SL/ET/LV/LT/EL/SV/DA/FI/NO
 * 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Factory, 
  Tractor, 
  UtensilsCrossed, 
  Heart, 
  Laptop,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation, AVAILABLE_LANGUAGES_NOS_SECTEURS } from './src/i18n/pages';
import type { NosSecteursSupportedLanguage } from './src/i18n/pages/nosSecteurs';

export default function NosSecteurs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageManager();
  
  // Ensure we use a valid language code (fr, en, de, es, it, nl, pt, pl, cs, sk, hu, ro, bg, hr, sl, et, lv, lt, el, sv, da, fi, and no are currently translated)
  const validLanguage: NosSecteursSupportedLanguage = AVAILABLE_LANGUAGES_NOS_SECTEURS.includes(currentLanguage as any) 
    ? (currentLanguage as NosSecteursSupportedLanguage)
    : 'fr';
  
  const t = usePageTranslation('nos-secteurs', validLanguage);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconMap = {
    Building2,
    Factory,
    Tractor,
    UtensilsCrossed,
    Heart,
    Laptop
  };

  const processIcons = {
    Clock,
    ShieldCheck,
    Users,
    Heart
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
      <SEOHead page="nos-secteurs" lang={validLanguage} />

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
              availableLanguages={AVAILABLE_LANGUAGES_NOS_SECTEURS}
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
              {t.hero.badge}
            </Badge>

            <h1 className="text-white mb-6 max-w-3xl mx-auto">
              {t.hero.title}
            </h1>

            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
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
      {/* SECTEURS GRID */}
      {/* ============================================ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sectors.map((sector: any, index: number) => {
              const Icon = iconMap[sector.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all group">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-10 h-10" />
                      </div>

                      {/* Name */}
                      <h3 className="text-white mb-4">{sector.name}</h3>

                      {/* Description */}
                      <p className="text-white/70 mb-6 text-sm leading-relaxed">
                        {sector.description}
                      </p>

                      {/* Stats */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-xs text-cyan-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>{sector.stats.agencies}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-violet-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>{sector.stats.missions}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>{sector.stats.countries}</span>
                        </div>
                      </div>

                      {/* Profiles */}
                      <div className="mb-6">
                        <h4 className="text-white text-sm mb-3">Profils :</h4>
                        <ul className="space-y-1.5">
                          {sector.profiles.slice(0, 3).map((profile: string, i: number) => (
                            <li key={i} className="text-white/60 text-xs flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-cyan-400" />
                              {profile}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <a 
                        href="/devis"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm group/link"
                      >
                        <span>{t.recruitNowLink}</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
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
              {t.process.badge}
            </Badge>
            <h2 className="text-white mb-4">{t.process.title}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {t.process.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm text-center relative overflow-hidden group hover:bg-white/10 transition-all">
                  <CardContent className="p-6">
                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center text-white text-sm shadow-lg">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-white mb-3 mt-8">{step.title}</h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
              {t.cta.badge}
            </Badge>
            <h2 className="text-white mb-4">{t.cta.title}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/devis">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                >
                  <span className="relative z-10 flex items-center">
                    {t.cta.primaryCta}
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
                  {t.cta.secondaryCta}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer language={currentLanguage} />
    </div>
  );
}