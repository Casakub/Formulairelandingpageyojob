import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Globe,
  Network,
  ArrowRight,
  CheckCircle,
  MapPin,
  Building2,
  Users,
  Star,
  Search,
  Filter,
  TrendingUp,
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
import { EuropeMap } from './components/landing/EuropeMap';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/landing/LanguageSelector';

export default function NotreReseau() {
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

  const topCountries = [
    {
      name: "France",
      flag: "🇫🇷",
      agencies: 85,
      specialties: ["BTP", "Industrie", "Hôtellerie"],
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Pologne",
      flag: "🇵🇱",
      agencies: 78,
      specialties: ["BTP", "Transport", "Industrie"],
      color: "from-red-500 to-rose-600"
    },
    {
      name: "Portugal",
      flag: "🇵🇹",
      agencies: 62,
      specialties: ["BTP", "Hôtellerie", "Agriculture"],
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Roumanie",
      flag: "🇷🇴",
      agencies: 54,
      specialties: ["BTP", "Industrie", "Agriculture"],
      color: "from-yellow-500 to-orange-600"
    },
    {
      name: "Espagne",
      flag: "🇪🇸",
      agencies: 48,
      specialties: ["Hôtellerie", "Agriculture", "Santé"],
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Italie",
      flag: "🇮🇹",
      agencies: 42,
      specialties: ["BTP", "Industrie", "Hôtellerie"],
      color: "from-green-500 to-red-600"
    }
  ];

  const advantages = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "27 pays européens",
      description: "Couverture complète de l'Union Européenne + Royaume-Uni",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "500+ agences vérifiées",
      description: "Partenaires sélectionnés et certifiés pour leur sérieux",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tous secteurs d'activité",
      description: "Du BTP à la tech, en passant par l'industrie et l'hôtellerie",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Conformité garantie",
      description: "100% de respect des réglementations du détachement européen",
      color: "from-orange-500 to-amber-600"
    }
  ];

  const marketplaceFeatures = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Recherche multicritères",
      description: "Trouvez l'agence idéale selon le pays, secteur, métier et délai"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Avis vérifiés",
      description: "Consultez les retours d'expérience d'autres entreprises"
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Comparaison instantanée",
      description: "Comparez prix, délais et profils en un clic"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Mise en relation directe",
      description: "Échangez directement avec les agences sans intermédiaire"
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead pageKey="notre-reseau" />

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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#06B6D4] flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                <LogoSvg className="w-6 h-6 text-white" />
              </div>
              <span className="text-white transition-colors">
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
              <Button
                onClick={() => (window.location.href = '/devis')}
                className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-lg"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO + CARTE INTERACTIVE FUSIONNÉS */}
        {/* ============================================ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
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
                Notre réseau européen
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto">
                Le plus grand réseau de recrutement européen : 500+ agences dans 27 pays
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
                Recrutez vos talents qualifiés en 48-72h grâce à nos agences partenaires vérifiées. Intérim, CDI, détachement : une solution 100% conforme et clé en main pour tous vos besoins de main-d'œuvre européenne.
              </p>

              <h2 className="text-white mb-4">Une couverture européenne complète en temps réel</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                27 pays, 500+ agences, des milliers de talents disponibles immédiatement. Explorez notre réseau pays par pays et identifiez les agences spécialisées dans votre secteur d'activité pour cibler votre recrutement avec précision.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <EuropeMap variant="network" />
            </div>
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
                Nos pays phares
              </Badge>
              <h2 className="text-white mb-4">Les destinations privilégiées</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                6 pays concentrent 70% de notre réseau avec une expertise sectorielle reconnue.
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
                          <p className="text-cyan-400 text-sm">{country.agencies} agences</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">Spécialités :</p>
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
                          <span>Délai moyen</span>
                          <span className="text-green-400">48-72h</span>
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
                Nos garanties
              </Badge>
              <h2 className="text-white mb-4">Pourquoi choisir notre réseau ?</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Un réseau construit sur la qualité, la fiabilité et la conformité réglementaire.
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
                      <h3 className="text-white mb-3">{advantage.title}</h3>
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
                  🚀 Nouveauté 2026
                </Badge>
                <h2 className="text-white mb-4">Marketplace d'agences européennes (à venir)</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Bientôt, accédez directement à toutes nos agences partenaires via une plateforme digitale innovante.
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
                      Demander un devis gratuit
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
              <h2 className="text-white mb-4">Activez notre réseau européen</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Décrivez votre besoin et nous mobilisons immédiatement nos agences partenaires dans le pays de votre choix.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/50 transition-all group"
                >
                  <a href="/devis">
                    <span className="relative z-10 flex items-center">
                      Demander un devis gratuit
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
                    Retour à l'accueil
                  </a>
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
                <h3 className="text-white mb-4 text-cyan-300">Services</h3>
                <ul className="space-y-2.5 text-sm">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/services/interim-europeen" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Intérim européen
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/services/recrutement-specialise" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Recrutement spécialisé
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/services/conseil-conformite" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Conseil & Conformité
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="/services/detachement-personnel" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Détachement de personnel
                    </a>
                  </motion.li>
                </ul>
              </motion.div>

              {/* Column 3: Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-white mb-4 text-cyan-300">Entreprise</h3>
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
                <h3 className="text-white mb-4 text-cyan-300">Contact</h3>
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
                    <a href="mailto:contact@yojob.fr" className="text-white/90 hover:text-cyan-400 transition-colors">
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