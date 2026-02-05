/**
 * ⭐ PAGE TÉMOIGNAGES - YOJOB
 * 
 * Page présentant les témoignages clients avec carousel
 * Design: Glassmorphism + Gradients + Animations Motion
 * Traductions: FR/EN
 * 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star,
  ArrowRight,
  Clock,
  ShieldCheck,
  Users,
  Heart,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
import { Footer } from './components/landing/Footer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useLanguageManager } from './hooks/useLanguageManager';
import { usePageTranslation, AVAILABLE_LANGUAGES_TEMOIGNAGES } from './src/i18n/pages';
import type { TemoignagesSupportedLanguage } from './src/i18n/pages/temoignages';

export default function Temoignages() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentLanguage, setLanguage } = useLanguageManager();
  
  // Ensure we use a valid language code (only fr and en are translated)
  const validLanguage: TemoignagesSupportedLanguage = AVAILABLE_LANGUAGES_TEMOIGNAGES.includes(currentLanguage as any) 
    ? (currentLanguage as TemoignagesSupportedLanguage)
    : 'fr';
  
  const t = usePageTranslation('temoignages', validLanguage);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.testimonials.length]);

  const processIcons = {
    Clock,
    ShieldCheck,
    Users,
    Heart
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

  // Get 3 testimonials to display (current and 2 next)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(t.testimonials[(currentSlide + i) % t.testimonials.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
      <SEOHead page="temoignages" lang={validLanguage} availableLanguages={AVAILABLE_LANGUAGES_TEMOIGNAGES} />

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
              availableLanguages={AVAILABLE_LANGUAGES_TEMOIGNAGES}
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
              <a href="/nos-secteurs">
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
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
              {t.stats.badge}
            </Badge>
            <h2 className="text-white">{t.stats.title}</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items.map((stat: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center">
                  <CardContent className="p-8">
                    <div className="text-white mb-2 text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS CAROUSEL */}
      {/* ============================================ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid of testimonials - showing 3 at a time on desktop */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((testimonial: any) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all h-full">
                  <CardContent className="p-8">
                    {/* Quote icon */}
                    <Quote className="w-10 h-10 text-cyan-400/30 mb-4" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-white/80 mb-6 italic leading-relaxed min-h-[120px]">
                      "{testimonial.quote}"
                    </p>

                    {/* Avatar & Info */}
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-900 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white truncate">{testimonial.name}</h4>
                        <p className="text-white/60 text-sm truncate">{testimonial.position}</p>
                        <p className="text-cyan-400 text-xs truncate">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Sector badge */}
                    <Badge className="mt-4 bg-white/5 border-white/10 text-white/70 text-xs">
                      {testimonial.sector}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation & Dots */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {t.testimonials.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-cyan-400 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESS / WHY US */}
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
            <h2 className="text-white">{t.process.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.items.map((item: any, index: number) => {
              const Icon = processIcons[item.icon as keyof typeof processIcons];
              const colors = [
                'from-orange-500 to-amber-600',
                'from-blue-500 to-cyan-600',
                'from-violet-500 to-purple-600',
                'from-pink-500 to-rose-600'
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-4 mx-auto text-white shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-white mb-3">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
