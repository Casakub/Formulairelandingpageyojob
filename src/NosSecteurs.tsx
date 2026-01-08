import { LogoSvg } from './imports/YojobLogoComplete';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/shared/LanguageSelector';

export default function NosSecteurs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
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
      description: "Personnel qualifié dans les délais conformes au détachement européen",
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
        {/* HERO + INTRO SECTION FUSIONNÉS */}
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

              <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                Des talents européens pour tous vos secteurs d'activité
              </h1>

              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 text-[16px]">
                Du BTP à la tech, de l'industrie à l'hôtellerie : trouvez les professionnels qualifiés dont vous avez besoin dans 9 secteurs clés.
              </p>

              <h2 className="text-white mb-4 text-[20px]">9 secteurs d'expertise pour répondre à tous vos besoins</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
                De la construction à la santé, du transport à la tech : découvrez notre expertise sectorielle et les métiers couverts par notre réseau de 500+ agences européennes.
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
                  className="cursor-pointer h-full"
                >
                  <Card className={`h-full border transition-all group ${
                    selectedSector === index
                      ? 'border-cyan-400 bg-white/15 shadow-2xl shadow-cyan-500/30'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50'
                  } backdrop-blur-sm`}>
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Icône + Nom */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {sector.icon}
                      </div>
                      <h3 className="text-white mb-3 text-[20px]">{sector.name}</h3>
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

                      {/* CTA expandable - Poussé en bas avec flex-grow */}
                      <div className="mt-auto pt-4 flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
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
              <h2 className="text-white mb-4 text-[20px]">Une expertise reconnue dans chaque secteur</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto text-[16px]">
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
                  className="h-full"
                >
                  <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center group">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg group-hover:scale-110 transition-transform`}>
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
              <h2 className="text-white mb-4 text-[20px]">Trouvez les talents pour votre secteur</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto text-[16px]">
                Décrivez-nous vos besoins et accédez immédiatement aux meilleurs professionnels européens de votre secteur d'activité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/devis"
                  className="relative overflow-hidden group rounded-full bg-white text-[#1E3A8A] hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105 px-8 py-3 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Demander un devis
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

        {/* Footer minimal */}
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