import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Building2,
  Factory,
  Briefcase,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { TestimonialCarousel } from './components/landing/TestimonialCarousel';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/landing/LanguageSelector';

export default function Temoignages() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  // Header scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const caseStudies = [
    {
      company: "Bouygues Construction",
      sector: "BTP",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      challenge: "Besoin urgent de 50 maçons et coffreurs pour un chantier de grande envergure en Île-de-France.",
      solution: "Mobilisation de notre réseau au Portugal et en Roumanie. Mise à disposition de 52 professionnels qualifiés en 10 jours.",
      results: [
        "52 professionnels mobilisés en 10 jours",
        "Chantier livré dans les délais",
        "100% de conformité administrative",
        "Renouvellement du partenariat"
      ],
      testimonial: "YOJOB a été notre sauveur ! En moins de 2 semaines, nous avions toute l'équipe nécessaire sur le chantier. Leur gestion administrative est impeccable.",
      author: "Marc Dubois",
      role: "Directeur des Ressources Humaines",
      rating: 5
    },
    {
      company: "Lactalis",
      sector: "Industrie agroalimentaire",
      icon: <Factory className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      challenge: "Recrutement de 30 opérateurs de production pour une nouvelle ligne de fabrication avec démarrage sous 3 semaines.",
      solution: "Activation du réseau en Pologne et Bulgarie. Formation sur site organisée par YOJOB en partenariat avec l'usine.",
      results: [
        "30 opérateurs recrutés et formés",
        "Démarrage de la ligne dans les temps",
        "Taux de rétention à 6 mois : 93%",
        "Extension du contrat à 50 postes"
      ],
      testimonial: "La réactivité et le professionnalisme de YOJOB nous ont permis de tenir notre planning. Les profils étaient parfaitement adaptés à nos besoins.",
      author: "Sophie Martin",
      role: "Responsable Production",
      rating: 5
    },
    {
      company: "Groupe AccorHotels",
      sector: "Hôtellerie",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-red-500 to-rose-600",
      challenge: "Renforcement des équipes pour la saison estivale sur 12 établissements : cuisiniers, serveurs, réceptionnistes.",
      solution: "Recrutement de 85 professionnels via notre réseau en Espagne, Italie et Portugal. Gestion complète du détachement et de l'hébergement.",
      results: [
        "85 collaborateurs déployés en 15 jours",
        "12 hôtels couverts simultanément",
        "Score de satisfaction client : 4.8/5",
        "Fidélisation pour saison suivante : 78%"
      ],
      testimonial: "Un partenaire de confiance pour nos pics d'activité. YOJOB comprend parfaitement les enjeux de l'hôtellerie et nous livre des profils expérimentés.",
      author: "Jean-Pierre Renard",
      role: "Directeur Régional",
      rating: 5
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "98%",
      label: "Taux de satisfaction client",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "2000+",
      label: "Missions réussies par an",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "4.9/5",
      label: "Note moyenne",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "7-14 jours",
      label: "Délai moyen de mise à disposition",
      color: "from-orange-500 to-amber-600"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Conformité garantie",
      description: "100% de respect des réglementations européennes"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Talents qualifiés",
      description: "Sélection rigoureuse et vérification des compétences"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Réactivité",
      description: "Mise à disposition conforme aux délais légaux"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Suivi personnalisé",
      description: "Un interlocuteur dédié du début à la fin"
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead pageKey="temoignages" />

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
                onLanguageChange={setCurrentLanguage}
                availableLanguages={['fr', 'en']}
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
        {/* HERO SECTION - Background décoratif */}
        {/* ============================================ */}
        <section className="relative pt-20 pb-0 overflow-hidden">
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
        </section>

        {/* ============================================ */}
        {/* STATS + INTRO */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            {/* Intro Section */}
            <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2" />
                  Témoignages clients
                </Badge>

                <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                  Ils nous font confiance pour leur recrutement européen
                </h1>

                <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 text-[16px]">
                  Découvrez comment YOJOB accompagne les entreprises françaises dans leurs besoins de recrutement en Europe avec succès et réactivité.
                </p>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                    <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <div className="text-white mb-2">{stat.value}</div>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CAS CLIENTS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Cas clients
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">Des succès concrets dans tous les secteurs</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                Découvrez comment nous avons aidé ces entreprises à résoudre leurs défis de recrutement.
              </p>
            </motion.div>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Colonne 1 : En-tête */}
                        <div className="lg:col-span-3">
                          <div className="flex items-start gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                              {study.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white mb-1">{study.company}</h3>
                              <p className="text-cyan-400 text-sm mb-3">{study.sector}</p>
                              <div className="flex gap-1">
                                {[...Array(study.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 2 : Challenge & Solution */}
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-white mb-2 text-sm uppercase tracking-wide">Le défi</h4>
                            <p className="text-white/70 text-sm">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="text-white mb-2 text-sm uppercase tracking-wide">Notre solution</h4>
                            <p className="text-white/70 text-sm">{study.solution}</p>
                          </div>
                          <div className="pt-4 border-t border-white/10">
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                              <Quote className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-white/90 text-sm italic mb-3">{study.testimonial}</p>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                                    {study.author.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-white text-sm">{study.author}</p>
                                    <p className="text-white/60 text-xs">{study.role}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Colonne 3 : Résultats */}
                        <div>
                          <h4 className="text-white mb-3 text-sm uppercase tracking-wide">Résultats</h4>
                          <div className="space-y-3">
                            {study.results.map((result, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-white/80 text-sm">{result}</p>
                              </div>
                            ))}
                          </div>
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
        {/* CAROUSEL TÉMOIGNAGES */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-6 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                Avis clients
              </Badge>
              <h2 className="text-white mb-4">Ce que disent nos clients</h2>
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* ============================================ */}
        {/* POURQUOI NOUS CHOISIR */}
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
                <Award className="w-4 h-4 mr-2" />
                Nos engagements
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">Pourquoi ils nous font confiance</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                4 raisons qui font de YOJOB le partenaire privilégié pour le recrutement européen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                      <h3 className="text-white mb-3 text-[20px]">{benefit.title}</h3>
                      <p className="text-white/70 text-sm">{benefit.description}</p>
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
              <h2 className="text-white mb-4 text-[20px]">Rejoignez nos clients satisfaits</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto text-[16px]">
                Faites comme eux, confiez-nous vos besoins de recrutement européen et bénéficiez d'un service 5 étoiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/devis"
                  className="relative overflow-hidden group rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105 px-8 py-3 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Demander un devis gratuit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </a>
                <a
                  href="/"
                  className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all px-8 py-3 inline-flex items-center justify-center"
                >
                  Retour à l'accueil
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer complet */}
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white py-12 lg:py-16">
          {/* Radial gradients */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
          }} />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 lg:mb-12">
              {/* Column 1: Logo & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-32 h-32 inline-block mb-6"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogoSvg 
                    className="w-full h-full" 
                    effects={true}
                    aria-label="YOJOB"
                  />
                </motion.div>
                <p className="text-white/80 mb-[24px] leading-relaxed max-w-xs text-[13px] mt-[-46px] mr-[0px] ml-[0px]">
                  Leader du recrutement européen. 500+ agences partenaires dans 27 pays pour connecter les talents aux opportunités.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: '#', color: 'cyan' },
                    { icon: Twitter, href: '#', color: 'violet' },
                    { icon: Facebook, href: '#', color: 'blue' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className={`w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all`} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Column 2: Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-white mb-4 text-cyan-300">
                  Services
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: 'Intérim européen', href: '/services/interim-europeen' },
                    { label: 'Recrutement spécialisé', href: '/services/recrutement-specialise' },
                    { label: 'Conseil & Conformité', href: '/services/conseil-conformite' },
                    { label: 'Détachement de personnel', href: '/services/detachement-personnel' }
                  ].map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a href={link.href} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 3: Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-white mb-4 text-cyan-300">
                  Entreprise
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/a-propos" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      À propos
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/notre-reseau" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Notre réseau
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/nos-secteurs" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Nos secteurs
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/temoignages" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Témoignages
                    </a>
                  </motion.li>
                </ul>
              </motion.div>

              {/* Column 4: Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-white mb-4 text-cyan-300">
                  Contact
                </h3>
                <ul className="space-y-3 text-sm">
                  <motion.li 
                    className="flex items-start gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <span className="text-white/90">Bordeaux, France</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <Phone className="w-5 h-5 text-violet-400 drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                    <a href="tel:+33650622524" className="text-white/90 hover:text-cyan-400 transition-colors">
                      +33 6 50 62 25 24
                    </a>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <Mail className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <a
                      href="mailto:contact@yojob.fr"
                      className="text-white/90 hover:text-cyan-400 transition-colors"
                    >
                      contact@yojob.fr
                    </a>
                  </motion.li>
                </ul>
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div 
              className="border-t border-white/20 pt-6 lg:pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/80 mb-3">
                <p>© 2025 YOJOB. Tous droits réservés.</p>
              </div>
              {/* Footer Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
                <a 
                  href="/privacy" 
                  className="hover:text-cyan-400 transition-colors underline decoration-dotted"
                >
                  Politique de confidentialité
                </a>
                <span className="text-white/30">•</span>
                <a 
                  href="/legal" 
                  className="hover:text-cyan-400 transition-colors underline decoration-dotted"
                >
                  Mentions légales
                </a>
                <span className="text-white/30">•</span>
                <a 
                  href="/cgv" 
                  className="hover:text-cyan-400 transition-colors underline decoration-dotted"
                >
                  CGV
                </a>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}