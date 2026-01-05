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
  ArrowLeft,
  Building2,
  Factory,
  Briefcase,
  Clock,
  Award
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { TestimonialCarousel } from './components/landing/TestimonialCarousel';
import { SEOHead } from './components/SEOHead';

export default function Temoignages() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      quote: "YOJOB a été réactif et professionnel. Grâce à leur réseau européen, nous avons pu tenir nos engagements clients.",
      author: "Marc Dubois",
      role: "Directeur Opérations",
      rating: 5
    },
    {
      company: "Renault Trucks",
      sector: "Industrie",
      icon: <Factory className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      challenge: "Augmentation temporaire de production nécessitant 30 opérateurs de production qualifiés pour 6 mois.",
      solution: "Recrutement ciblé en Pologne et République Tchèque via nos agences partenaires. Formation complémentaire assurée sur site.",
      results: [
        "30 opérateurs recrutés en 2 semaines",
        "Formation sur mesure réalisée",
        "Productivité maintenue à 98%",
        "15 embauches CDI à l'issue"
      ],
      quote: "La qualité des profils proposés et l'accompagnement de YOJOB ont dépassé nos attentes. Une vraie valeur ajoutée.",
      author: "Sophie Martin",
      role: "RH Manufacturing",
      rating: 5
    },
    {
      company: "Groupe Pierre & Vacances",
      sector: "Hôtellerie",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-red-500 to-rose-600",
      challenge: "Recrutement saisonnier massif pour la haute saison : 80 postes en hôtellerie-restauration sur 12 établissements.",
      solution: "Activation de notre réseau Espagne, Portugal et Italie. Sélection rigoureuse sur critères linguistiques et expérience client.",
      results: [
        "82 professionnels recrutés",
        "Couverture de 12 sites en 3 semaines",
        "Satisfaction client en hausse de 12%",
        "Fidélisation de 45% des saisonniers"
      ],
      quote: "YOJOB maîtrise parfaitement les enjeux du recrutement saisonnier européen. Leur accompagnement est irréprochable.",
      author: "Isabelle Renard",
      role: "Directrice RH",
      rating: 5
    }
  ];

  const stats = [
    { label: "Taux de satisfaction", value: "98%", icon: <Star className="w-6 h-6" /> },
    { label: "Clients réguliers", value: "85%", icon: <Users className="w-6 h-6" /> },
    { label: "Missions réussies", value: "2000+", icon: <CheckCircle className="w-6 h-6" /> },
    { label: "Note moyenne", value: "4.9/5", icon: <Award className="w-6 h-6" /> }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Réactivité exemplaire",
      description: "Profils qualifiés disponibles sous 48-72h pour répondre à vos urgences",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Conformité garantie",
      description: "Gestion complète des formalités administratives et légales européennes",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Talents qualifiés",
      description: "Sélection rigoureuse par nos agences partenaires certifiées",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Accompagnement continu",
      description: "Support dédié tout au long de vos missions de recrutement",
      color: "from-orange-500 to-amber-600"
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
                <Star className="w-4 h-4 mr-2" />
                Témoignages clients
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto">
                Ils nous font confiance pour leur recrutement européen
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
                Découvrez les témoignages de nos clients et comment YOJOB les a accompagnés dans leurs projets de recrutement international.
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
        {/* CAROUSEL TÉMOIGNAGES */}
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
                <Quote className="w-4 h-4 mr-2" />
                Avis clients
              </Badge>
              <h2 className="text-white mb-4">Ce que nos clients disent de nous</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Plus de 200 entreprises nous font confiance pour leurs besoins de recrutement européen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialCarousel />
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* ÉTUDES DE CAS */}
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
                <Briefcase className="w-4 h-4 mr-2" />
                Études de cas
              </Badge>
              <h2 className="text-white mb-4">Réussites clients</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Des projets de recrutement européen menés avec succès grâce à notre expertise et notre réseau.
              </p>
            </motion.div>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all overflow-hidden">
                    <CardContent className="p-8 md:p-10">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center flex-shrink-0 text-white shadow-lg`}>
                          {study.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white mb-2">{study.company}</h3>
                          <Badge className="bg-white/10 border-white/20 text-white/80">
                            {study.sector}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(study.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Left: Challenge & Solution */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-white/80 text-sm uppercase tracking-wide mb-3">
                              Challenge
                            </h4>
                            <p className="text-white/70">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="text-white/80 text-sm uppercase tracking-wide mb-3">
                              Solution YOJOB
                            </h4>
                            <p className="text-white/70">{study.solution}</p>
                          </div>
                        </div>

                        {/* Right: Results */}
                        <div>
                          <h4 className="text-white/80 text-sm uppercase tracking-wide mb-3">
                            Résultats
                          </h4>
                          <ul className="space-y-3">
                            {study.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-white/70">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="border-t border-white/10 pt-6">
                        <div className="flex gap-3 mb-4">
                          <Quote className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                          <p className="text-white/80 italic text-lg">{study.quote}</p>
                        </div>
                        <div className="ml-11">
                          <p className="text-white">{study.author}</p>
                          <p className="text-white/60 text-sm">{study.role} • {study.company}</p>
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
              <h2 className="text-white mb-4">Pourquoi nos clients nous choisissent</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Des garanties solides qui font de YOJOB le partenaire idéal pour votre recrutement européen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {benefit.icon}
                      </div>
                      <h3 className="text-white mb-3">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
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
              <h2 className="text-white mb-4">Rejoignez nos clients satisfaits</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Bénéficiez de notre expertise et de notre réseau européen pour vos projets de recrutement. Obtenez un devis personnalisé en quelques minutes.
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
