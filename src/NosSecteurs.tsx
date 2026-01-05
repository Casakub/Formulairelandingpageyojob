import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Building2,
  Factory,
  Tractor,
  UtensilsCrossed,
  Heart,
  Laptop,
  Truck,
  ShoppingBag,
  Wrench,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  ArrowLeft,
  Briefcase,
  Globe
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';

export default function NosSecteurs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);

  // Header scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const sectors = [
    {
      icon: <Building2 className="w-10 h-10" />,
      name: "BTP & Construction",
      shortDesc: "Gros œuvre, second œuvre, génie civil",
      fullDesc: "Recrutement de professionnels qualifiés pour tous vos chantiers : maçons, coffreurs, charpentiers, électriciens, plombiers, couvreurs. Expertise particulière sur le gros œuvre et le second œuvre.",
      jobs: ["Maçon", "Coffreur", "Charpentier", "Électricien", "Plombier", "Couvreur", "Chef de chantier"],
      color: "from-orange-500 to-orange-600",
      stats: { agencies: 180, missions: 850, countries: 15 }
    },
    {
      icon: <Factory className="w-10 h-10" />,
      name: "Industrie & Production",
      shortDesc: "Manufacturing, assemblage, logistique industrielle",
      fullDesc: "Main-d'œuvre qualifiée pour l'industrie manufacturière, automobile, agroalimentaire, plasturgie. Opérateurs de production, techniciens de maintenance, caristes, chefs d'équipe.",
      jobs: ["Opérateur production", "Technicien maintenance", "Cariste", "Soudeur", "Conducteur de ligne", "Agent qualité"],
      color: "from-blue-500 to-cyan-600",
      stats: { agencies: 145, missions: 720, countries: 18 }
    },
    {
      icon: <Tractor className="w-10 h-10" />,
      name: "Agriculture & Viticulture",
      shortDesc: "Cultures, élevage, viticulture, maraîchage",
      fullDesc: "Personnel agricole saisonnier et permanent : ouvriers agricoles, viticulteurs, maraîchers, conducteurs d'engins agricoles. Expertise sur les vendanges, cueillettes et travaux des champs.",
      jobs: ["Ouvrier agricole", "Viticulteur", "Maraîcher", "Conducteur tracteur", "Agent d'élevage", "Arboriculteur"],
      color: "from-green-500 to-emerald-600",
      stats: { agencies: 98, missions: 450, countries: 12 }
    },
    {
      icon: <UtensilsCrossed className="w-10 h-10" />,
      name: "Hôtellerie & Restauration",
      shortDesc: "Hôtels, restaurants, restauration collective",
      fullDesc: "Professionnels de l'hôtellerie-restauration : cuisiniers, serveurs, commis, réceptionnistes, femmes de chambre, chefs de rang. Spécialisation haute saison touristique.",
      jobs: ["Cuisinier", "Serveur", "Commis cuisine", "Réceptionniste", "Femme de chambre", "Plongeur", "Chef de rang"],
      color: "from-red-500 to-rose-600",
      stats: { agencies: 125, missions: 680, countries: 20 }
    },
    {
      icon: <Heart className="w-10 h-10" />,
      name: "Santé & Services à la personne",
      shortDesc: "Aide à domicile, auxiliaires de vie, EHPAD",
      fullDesc: "Personnel soignant et services à la personne : aides-soignants, auxiliaires de vie, aides à domicile, agents de service hospitalier. Respect des certifications et diplômes requis.",
      jobs: ["Aide-soignant", "Auxiliaire de vie", "Aide à domicile", "ASH", "Infirmier", "Aide médico-psychologique"],
      color: "from-pink-500 to-rose-600",
      stats: { agencies: 87, missions: 380, countries: 14 }
    },
    {
      icon: <Truck className="w-10 h-10" />,
      name: "Transport & Logistique",
      shortDesc: "Conducteurs, préparateurs, magasiniers",
      fullDesc: "Professionnels du transport et de la logistique : conducteurs PL/SPL, livreurs, préparateurs de commandes, magasiniers, agents d'exploitation, caristes CACES.",
      jobs: ["Conducteur PL", "Préparateur commandes", "Magasinier", "Cariste CACES", "Livreur", "Agent d'exploitation"],
      color: "from-gray-500 to-slate-600",
      stats: { agencies: 132, missions: 590, countries: 16 }
    },
    {
      icon: <Laptop className="w-10 h-10" />,
      name: "Tech & Numérique",
      shortDesc: "Développeurs, ingénieurs, data analysts",
      fullDesc: "Talents IT et digitaux : développeurs web/mobile, ingénieurs systèmes, data analysts, chefs de projet digital, designers UX/UI. Profils juniors à experts.",
      jobs: ["Développeur", "Ingénieur système", "Data analyst", "Chef de projet", "Designer UX/UI", "DevOps"],
      color: "from-violet-500 to-purple-600",
      stats: { agencies: 76, missions: 310, countries: 22 }
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      name: "Commerce & Vente",
      shortDesc: "Vendeurs, hôtes de caisse, merchandisers",
      fullDesc: "Professionnels de la vente et du commerce : vendeurs, hôtes de caisse, merchandisers, commerciaux, managers de rayon. Grande distribution et commerce spécialisé.",
      jobs: ["Vendeur", "Hôte de caisse", "Merchandiser", "Commercial", "Manager de rayon", "Conseiller client"],
      color: "from-purple-500 to-fuchsia-600",
      stats: { agencies: 94, missions: 425, countries: 17 }
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      name: "Maintenance & Services techniques",
      shortDesc: "Techniciens, électromécaniciens, dépanneurs",
      fullDesc: "Experts techniques : techniciens de maintenance, électromécaniciens, frigoristes, agents de dépannage, techniciens SAV. Industrie, bâtiment et services.",
      jobs: ["Technicien maintenance", "Électromécanicien", "Frigoriste", "Dépanneur", "Technicien SAV", "Mécanicien"],
      color: "from-indigo-500 to-blue-600",
      stats: { agencies: 108, missions: 480, countries: 13 }
    }
  ];

  const advantages = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Expertise sectorielle",
      description: "Connaissance approfondie des métiers et réglementations de chaque secteur",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Talents qualifiés",
      description: "Professionnels formés, certifiés et expérimentés dans leur domaine",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Sélection rigoureuse",
      description: "Vérification des diplômes, compétences et références professionnelles",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Disponibilité rapide",
      description: "Mise à disposition sous 48-72h pour répondre à vos urgences",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        <SEOHead pageKey="nos-secteurs" />

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
                <Briefcase className="w-4 h-4 mr-2" />
                Nos secteurs d'activité
              </Badge>

              <h1 className="text-white mb-6 max-w-3xl mx-auto">
                Des talents européens pour tous vos secteurs d'activité
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto">
                Du BTP à la tech, de l'industrie à l'hôtellerie : trouvez les professionnels qualifiés dont vous avez besoin dans 9 secteurs clés.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* GRILLE SECTEURS */}
        {/* ============================================ */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedSector(selectedSector === index ? null : index)}
                  className="cursor-pointer"
                >
                  <Card className={`h-full border transition-all group ${
                    selectedSector === index
                      ? 'border-cyan-400 bg-white/15 shadow-2xl shadow-cyan-500/30'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50'
                  } backdrop-blur-sm`}>
                    <CardContent className="p-8">
                      {/* Icône + Nom */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {sector.icon}
                      </div>
                      <h3 className="text-white mb-3">{sector.name}</h3>
                      <p className="text-white/70 text-sm mb-4">{sector.shortDesc}</p>

                      {/* Stats rapides */}
                      <div className="flex gap-3 text-xs text-white/60 mb-4">
                        <span>{sector.stats.agencies} agences</span>
                        <span>•</span>
                        <span>{sector.stats.missions} missions/an</span>
                      </div>

                      {/* Détails (si sélectionné) */}
                      {selectedSector === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-white/10"
                        >
                          <p className="text-white/80 text-sm mb-4">{sector.fullDesc}</p>
                          <div className="space-y-2">
                            <p className="text-white/70 text-xs uppercase tracking-wide">Métiers proposés :</p>
                            <div className="flex flex-wrap gap-2">
                              {sector.jobs.map((job, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-white/10 border-white/20 text-white/80 text-xs"
                                >
                                  {job}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* CTA expandable */}
                      <div className="mt-4 flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                        {selectedSector === index ? 'Voir moins' : 'Voir plus'}
                        <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${
                          selectedSector === index ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* AVANTAGES SECTORIELS */}
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
              <h2 className="text-white mb-4">Une expertise reconnue dans chaque secteur</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Quel que soit votre domaine d'activité, bénéficiez de notre connaissance approfondie des métiers et des talents européens.
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
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {advantage.icon}
                      </div>
                      <h3 className="text-white mb-3 text-lg">{advantage.title}</h3>
                      <p className="text-white/70 text-sm">{advantage.description}</p>
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
              <h2 className="text-white mb-4">Trouvez les talents pour votre secteur</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Décrivez-nous vos besoins et accédez immédiatement aux meilleurs professionnels européens de votre secteur d'activité.
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
