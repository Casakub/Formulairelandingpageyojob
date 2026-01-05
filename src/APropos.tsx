import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Users,
  Globe,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
  Heart,
  Zap,
  ShieldCheck,
  TrendingUp,
  Building2,
  ArrowLeft,
  Star,
  Handshake,
  Clock,
  Network
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';

export default function APropos() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Header scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Excellence & Engagement",
      description: "Nous nous engageons à fournir un service d'excellence à chaque client, avec une attention particulière portée à la qualité et à la satisfaction.",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Conformité & Transparence",
      description: "Respect strict des réglementations européennes et transparence totale sur nos processus, tarifs et engagements.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Partenariat & Confiance",
      description: "Nous construisons des relations durables basées sur la confiance mutuelle avec nos clients et nos agences partenaires.",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Réactivité & Innovation",
      description: "Une approche innovante et une réactivité exemplaire pour répondre rapidement aux besoins de main-d'œuvre de nos clients.",
      color: "from-orange-500 to-amber-600"
    }
  ];

  const timeline = [
    {
      year: "2014",
      title: "Création de YOJOB",
      description: "Lancement de notre activité de courtage en recrutement européen avec 3 pays partenaires.",
      icon: <Building2 className="w-6 h-6" />
    },
    {
      year: "2017",
      title: "Expansion européenne",
      description: "Extension à 15 pays de l'Union Européenne et développement de notre réseau d'agences partenaires.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "2020",
      title: "500+ agences partenaires",
      description: "Franchissement du cap des 500 agences certifiées dans 27 pays européens.",
      icon: <Network className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "Marketplace digitale",
      description: "Lancement de notre plateforme digitale de mise en relation directe avec les agences européennes.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const team = [
    {
      role: "Direction & Stratégie",
      description: "Une équipe de direction expérimentée qui pilote la vision stratégique et le développement de YOJOB.",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      role: "Experts recrutement",
      description: "Des spécialistes du recrutement européen qui activent notre réseau et sélectionnent les meilleurs profils.",
      icon: <Users className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      role: "Conformité & Juridique",
      description: "Une cellule dédiée qui garantit la conformité de toutes nos opérations avec les réglementations européennes.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "from-violet-500 to-violet-600"
    },
    {
      role: "Support client",
      description: "Une équipe support disponible pour accompagner nos clients tout au long de leurs missions.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    }
  ];

  const stats = [
    { label: "Ans d'expertise", value: "10+", icon: <Clock className="w-6 h-6" /> },
    { label: "Pays couverts", value: "27", icon: <Globe className="w-6 h-6" /> },
    { label: "Agences partenaires", value: "500+", icon: <Network className="w-6 h-6" /> },
    { label: "Missions réalisées", value: "2000+", icon: <CheckCircle className="w-6 h-6" /> }
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
                <Award className="w-4 h-4 mr-2" />
                À propos de YOJOB
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto">
                10 ans d'expertise au service de votre recrutement européen
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
                Leader français du courtage en recrutement européen, YOJOB connecte les entreprises avec un réseau de 500+ agences partenaires dans 27 pays.
              </p>

              {/* Stats rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-white mb-1">{stat.value}</div>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              <h2 className="text-white mb-4">Une décennie au service du recrutement européen</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Depuis 2014, YOJOB accompagne les entreprises françaises dans leurs besoins de main-d'œuvre européenne.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Ligne verticale */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-violet-400 to-cyan-400" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="text-white/50">{item.year}</span>
                          </div>
                          <h3 className="text-white mb-2">{item.title}</h3>
                          <p className="text-white/70">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dot central (desktop only) */}
                    <div className="hidden md:block w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 border-4 border-[#1E3A8A] shadow-lg" />

                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
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
                <Star className="w-4 h-4 mr-2" />
                Nos valeurs
              </Badge>
              <h2 className="text-white mb-4">Les piliers de notre engagement</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Des valeurs fortes qui guident notre action quotidienne au service de nos clients.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {value.icon}
                      </div>
                      <h3 className="text-white mb-3">{value.title}</h3>
                      <p className="text-white/70">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* NOTRE ÉQUIPE */}
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
                <Users className="w-4 h-4 mr-2" />
                Notre équipe
              </Badge>
              <h2 className="text-white mb-4">Des experts à votre service</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Une équipe pluridisciplinaire dédiée à la réussite de vos projets de recrutement européen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 text-white shadow-lg mx-auto group-hover:scale-110 transition-transform`}>
                        {member.icon}
                      </div>
                      <h3 className="text-white mb-3 text-lg">{member.role}</h3>
                      <p className="text-white/70 text-sm">{member.description}</p>
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
              <h2 className="text-white mb-4">Prêt à travailler avec nous ?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Découvrez comment YOJOB peut vous accompagner dans vos besoins de recrutement européen. Obtenez un devis personnalisé en quelques minutes.
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
