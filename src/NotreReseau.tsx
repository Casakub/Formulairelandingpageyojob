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
  ArrowLeft,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { EuropeMap } from './components/landing/EuropeMap';
import { SEOHead } from './components/SEOHead';

export default function NotreReseau() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Header scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const networkStats = [
    {
      number: "27",
      label: "Pays européens",
      description: "Couverture complète de l'Union Européenne",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      number: "500+",
      label: "Agences partenaires",
      description: "Réseau certifié et qualifié",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-violet-500 to-purple-600"
    },
    {
      number: "10,000+",
      label: "Professionnels disponibles",
      description: "Base de talents européens",
      icon: <Users className="w-8 h-8" />,
      color: "from-cyan-500 to-teal-600"
    },
    {
      number: "98%",
      label: "Taux de satisfaction",
      description: "Clients satisfaits de nos services",
      icon: <Star className="w-8 h-8" />,
      color: "from-orange-500 to-amber-600"
    }
  ];

  const topCountries = [
    {
      country: "France",
      flag: "🇫🇷",
      agencies: 85,
      sectors: ["BTP", "Industrie", "Logistique"],
      color: "from-blue-500 to-blue-600"
    },
    {
      country: "Portugal",
      flag: "🇵🇹",
      agencies: 65,
      sectors: ["BTP", "Hôtellerie", "Agriculture"],
      color: "from-green-500 to-emerald-600"
    },
    {
      country: "Roumanie",
      flag: "🇷🇴",
      agencies: 72,
      sectors: ["Industrie", "BTP", "Logistique"],
      color: "from-yellow-500 to-orange-600"
    },
    {
      country: "Pologne",
      flag: "🇵🇱",
      agencies: 58,
      sectors: ["Industrie", "Tech", "BTP"],
      color: "from-red-500 to-rose-600"
    },
    {
      country: "Espagne",
      flag: "🇪🇸",
      agencies: 52,
      sectors: ["Hôtellerie", "Agriculture", "BTP"],
      color: "from-amber-500 to-orange-600"
    },
    {
      country: "Allemagne",
      flag: "🇩🇪",
      agencies: 48,
      sectors: ["Tech", "Industrie", "Logistique"],
      color: "from-gray-500 to-slate-600"
    }
  ];

  const certifications = [
    {
      title: "Agences certifiées",
      description: "Toutes nos agences partenaires sont certifiées et respectent les normes européennes d'emploi temporaire.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Contrôle qualité",
      description: "Audits réguliers et contrôles de conformité pour garantir l'excellence de nos prestations.",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Support multilingue",
      description: "Équipes parlant 22 langues européennes pour faciliter les échanges internationaux.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Réseau évolutif",
      description: "Expansion continue avec de nouveaux partenaires qualifiés chaque trimestre.",
      icon: <TrendingUp className="w-6 h-6" />
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
            isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#06B6D4] flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                <LogoSvg className="w-6 h-6 text-white" />
              </div>
              <span className={`transition-colors ${isScrolled ? 'text-[#1E3A8A]' : 'text-white'}`}>
                YOJOB
              </span>
            </a>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className={`rounded-full ${
                  isScrolled
                    ? 'border-[#1E3A8A]/20 text-[#1E3A8A] hover:bg-[#1E3A8A]/5'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
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
                <Network className="w-4 h-4 mr-2" />
                Notre réseau européen
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto">
                500+ agences partenaires dans 27 pays européens
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
                Le plus grand réseau européen d'agences d'emploi temporaire certifiées, à votre service pour vos besoins de recrutement international.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {networkStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          {stat.icon}
                        </div>
                        <div className="text-white mb-2">{stat.number}</div>
                        <p className="text-white/80 text-sm mb-2">{stat.label}</p>
                        <p className="text-white/60 text-xs">{stat.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CARTE EUROPE INTERACTIVE */}
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
                <Globe className="w-4 h-4 mr-2" />
                Couverture géographique
              </Badge>
              <h2 className="text-white mb-4">Une présence dans toute l'Europe</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Survolez les pays pour découvrir le nombre d'agences partenaires disponibles dans chaque région.
              </p>
            </motion.div>

            {/* Carte Europe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12">
                <EuropeMap variant="network" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* TOP PAYS PARTENAIRES */}
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
                <MapPin className="w-4 h-4 mr-2" />
                Pays partenaires
              </Badge>
              <h2 className="text-white mb-4">Nos principales destinations</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Découvrez les pays où nous disposons du plus grand réseau d'agences certifiées.
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
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{country.flag}</div>
                        <div className="flex-1">
                          <h3 className="text-white mb-1">{country.country}</h3>
                          <p className="text-cyan-400 text-sm">{country.agencies} agences</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {country.sectors.map((sector, idx) => (
                          <Badge
                            key={idx}
                            className="bg-white/10 border-white/20 text-white/80 text-xs"
                          >
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CERTIFICATIONS & QUALITÉ */}
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
                Garantie qualité
              </Badge>
              <h2 className="text-white mb-4">Un réseau certifié et contrôlé</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Toutes nos agences partenaires respectent nos standards de qualité élevés et les réglementations européennes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform">
                          {cert.icon}
                        </div>
                        <div>
                          <h3 className="text-white mb-2">{cert.title}</h3>
                          <p className="text-white/70">{cert.description}</p>
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
        {/* TEASER MARKETPLACE */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center"
            >
              <Badge className="mb-6 px-6 py-2 bg-orange-500/20 border-orange-400/30 text-orange-300">
                <Star className="w-4 h-4 mr-2" />
                Bientôt disponible
              </Badge>
              <h2 className="text-white mb-4">Marketplace digitale en 2025</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Accédez directement à notre réseau d'agences européennes via notre plateforme digitale : recherchez, comparez et contractez en quelques clics.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Badge className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <Search className="w-4 h-4 mr-2" />
                  Recherche multicritères
                </Badge>
                <Badge className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <Filter className="w-4 h-4 mr-2" />
                  Comparaison instantanée
                </Badge>
                <Badge className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Avis vérifiés
                </Badge>
              </div>
              <Button
                size="lg"
                className="rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl"
              >
                Rejoindre la liste d'attente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
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
                Accédez instantanément à 500+ agences partenaires et trouvez les talents dont vous avez besoin pour vos projets.
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
                  className="rounded-full border-white/30 text-white hover:bg-white/10"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer minimal */}
        <footer className="py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/50 text-sm">
              © 2025 YOJOB. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
