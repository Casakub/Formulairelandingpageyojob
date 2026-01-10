import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';
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
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function APropos() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [revealedEmail, setRevealedEmail] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailReveal = () => {
    setRevealedEmail(!revealedEmail);
  };

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

  const timeline = [
    {
      year: "2013",
      title: "Création de YOJOB",
      description: "Lancement de l'activité de courtage en recrutement européen.",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      year: "2017",
      title: "Expansion européenne",
      description: "Développement du réseau de partenaires et expertise en détachement de travailleurs.",
      icon: <Globe className="w-6 h-6" />,
      color: "from-violet-500 to-purple-600"
    },
    {
      year: "2025",
      title: "Enquête européenne en cours",
      description: "Étude de marché auprès des agences de travail temporaire pour identifier leurs besoins.",
      icon: <Network className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      year: "2026 - 2027",
      title: "Développement du logiciel",
      description: "Création d'une plateforme digitale basée sur les résultats de l'enquête (à venir).",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-amber-600"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Agences partenaires",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "27",
      label: "Pays couverts",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      value: "2000+",
      label: "Missions réussies/an",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "10+",
      label: "Années d'expertise",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead pageKey="a-propos" />

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
                currentLanguage={language}
                onLanguageChange={setLanguage}
                availableLanguages={['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no']}
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
                À propos de YOJOB
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                Le courtage en recrutement européen, réinventé
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8 text-[16px]">
                Depuis 2014, nous connectons les entreprises françaises aux meilleurs talents européens à travers un réseau de 500+ agences partenaires dans 27 pays.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/devis">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                  >
                    <span className="relative z-10 flex items-center">
                      Demander un devis
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
                    Retour à l'accueil
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
              {stats.map((stat, index) => (
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
                Notre mission
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">Simplifier le recrutement européen</h2>
              <p className="text-white/70 text-lg max-w-3xl mx-auto text-[16px]">
                YOJOB est né d'un constat simple : recruter des talents européens est complexe, chronophage et semé d'embûches administratives. Notre mission est de vous offrir un service clé en main, rapide et 100% conforme.
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
                    <h3 className="text-white mb-4 text-[20px]">Le problème que nous résolvons</h3>
                    <ul className="space-y-3 text-white/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>Pénurie de main-d'œuvre qualifiée en France</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>Complexité du détachement de travailleurs européens</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>Risques juridiques et administratifs importants</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>Délais de recrutement trop longs</span>
                      </li>
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
                    <h3 className="text-white mb-4 text-[20px]">Notre solution</h3>
                    <ul className="space-y-3 text-white/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>Accès à 500+ agences dans toute l'Europe</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>Conformité juridique garantie à 100%</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>Gestion administrative clé en main</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>Mise à disposition conforme aux délais légaux de détachement</span>
                      </li>
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
                Nos valeurs
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">Ce qui nous anime au quotidien</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                Quatre piliers guident notre action et nos relations avec nos clients et partenaires.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {value.icon}
                      </div>
                      <h3 className="text-white mb-3">{value.title}</h3>
                      <p className="text-white/70 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                Notre histoire
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">10 ans d'innovation et de croissance</h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-400 to-orange-400 hidden lg:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
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
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-lg ${
                            index % 2 === 0 ? 'lg:ml-auto' : ''
                          }`}>
                            {item.icon}
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
                ))}
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
              <h2 className="text-white mb-4 text-[20px]">Prêt à recruter vos talents européens ?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto text-[16px]">
                Rejoignez les centaines d'entreprises qui nous font confiance pour leur recrutement européen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => (window.location.href = '/devis')}
                  size="lg"
                  className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                >
                  <span className="relative z-10 flex items-center">
                    Demander un devis gratuit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  onClick={() => (window.location.href = '/')}
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 transition-all"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white py-12 lg:py-16">
          {/* Radial gradients - same as network section */}
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
                    <button
                      onClick={handleEmailReveal}
                      className="text-white/90 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
                      aria-label="Envoyer un email"
                    >
                      {revealedEmail 
                        ? 'contact@yojob.fr'
                        : 'contact@yojob.fr'
                      }
                    </button>
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