import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';
import { LanguageSelector } from './components/shared/LanguageSelector';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4"
        >
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ServiceConseilConformite() {
  const [language, setLanguage] = useState('fr');

  const faqs = [
    {
      question: "Qu'est-ce que le formulaire A1 et qui doit le fournir ?",
      answer: "Le formulaire A1 (anciennement E101) est le certificat qui atteste que le travailleur détaché reste affilié au régime de sécurité sociale de son pays d'origine. C'est l'agence d'emploi temporaire (ETT) du pays d'origine qui doit le demander auprès de son organisme de sécurité sociale et le fournir."
    },
    {
      question: "Quelles sont les obligations de l'entreprise utilisatrice en cas de détachement ?",
      answer: "L'entreprise utilisatrice (EU) doit : vérifier que l'ETT a bien effectué la déclaration SIPSI, s'assurer de la présence du formulaire A1, appliquer les conditions de travail françaises (salaire minimum, durée du travail, repos), tenir à disposition les documents obligatoires, et désigner un représentant en cas de contrôle."
    },
    {
      question: "Comment déclarer un travailleur détaché sur SIPSI ?",
      answer: "C'est l'ETT étrangère (ou son représentant en France) qui doit effectuer la déclaration préalable de détachement sur la plateforme SIPSI (sipsi.travail.gouv.fr) avant le début de la mission. Cette déclaration doit être faite au minimum dans un délai raisonnable avant le détachement. YOJOB vous accompagne pour vérifier que cette formalité a bien été effectuée."
    },
    {
      question: "Quels sont les risques en cas de non-conformité ?",
      answer: "Les risques sont importants : amende administrative jusqu'à 4 000€ par travailleur (8 000€ en cas de récidive), requalification en travail dissimulé, solidarité financière de l'EU en cas de non-paiement des salaires/cotisations, et suspension d'activité possible. D'où l'importance d'un accompagnement expert."
    },
    {
      question: "La réglementation est-elle la même dans tous les pays européens ?",
      answer: "Non, chaque pays a sa propre réglementation pour encadrer le détachement de travailleurs sur son territoire. La directive européenne 2018/957 fixe un cadre commun, mais chaque État membre l'a transposée différemment. C'est pourquoi notre expertise sur les 27 pays est essentielle pour garantir votre conformité."
    }
  ];

  const advantages = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Expertise réglementaire",
      description: "Connaissance approfondie des 27 législations",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Sécurité juridique",
      description: "Conformité avec la directive détachement 2018/957",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Gestion documentaire",
      description: "Formulaires A1, SIPSI, attestations",
      color: "from-violet-500 to-violet-600"
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Veille continue",
      description: "Suivi des évolutions réglementaires",
      color: "from-green-500 to-green-600"
    }
  ];

  const sectors = [
    { icon: <Building2 className="w-8 h-8 text-white" />, name: "Construction / BTP", color: "from-slate-600 to-slate-700" },
    { icon: <Factory className="w-8 h-8 text-white" />, name: "Industrie & Métallurgie", color: "from-blue-600 to-indigo-700" },
    { icon: <Apple className="w-8 h-8 text-white" />, name: "Agroalimentaire", color: "from-emerald-600 to-teal-700" },
    { icon: <Car className="w-8 h-8 text-white" />, name: "Automobile & Équipementiers", color: "from-blue-700 to-indigo-800" },
    { icon: <Truck className="w-8 h-8 text-white" />, name: "Logistique & Transport", color: "from-slate-700 to-cyan-800" },
    { icon: <UtensilsCrossed className="w-8 h-8 text-white" />, name: "Hôtellerie-Restauration", color: "from-rose-600 to-red-700" },
    { icon: <Trees className="w-8 h-8 text-white" />, name: "Agriculture & Sylviculture", color: "from-green-700 to-emerald-800" },
    { icon: <Package className="w-8 h-8 text-white" />, name: "Plasturgie & Emballage", color: "from-amber-600 to-orange-700" },
    { icon: <Sparkles className="w-8 h-8 text-white" />, name: "Nettoyage & Services", color: "from-violet-600 to-indigo-700" }
  ];

  const steps = [
    {
      number: "1",
      title: "Audit de votre besoin",
      description: "Analyse de votre projet et identification des points de conformité",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2",
      title: "Sélection ETT conforme",
      description: "Choix d'agences partenaires certifiées et conformes",
      icon: <Network className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      number: "3",
      title: "Vérification documents",
      description: "Contrôle A1, SIPSI, attestations et documents obligatoires",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-violet-500 to-violet-600"
    },
    {
      number: "4",
      title: "Suivi & conformité",
      description: "Accompagnement continu et mise à jour réglementaire",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Conseil & Conformité Détachement | Réglementation européenne | YOJOB</title>
          <meta name="description" content="Assurez la conformité de vos détachements de travailleurs européens. Expertise réglementaire, formalités A1, obligations légales." />
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
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

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                  ⚖️ Conseil & Conformité
                </Badge>
                <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                  Sécurisez vos détachements avec notre expertise réglementaire
                </h1>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed text-[16px]">
                  Naviguez sereinement dans la réglementation européenne du détachement de travailleurs. Nous vous accompagnons sur tous les aspects légaux.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/devis">
                    <Button className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all px-12 py-6 text-lg">
                      <span className="relative z-10 flex items-center">
                        Demander un devis
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    className="relative overflow-hidden group rounded-full border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 transition-all px-8 py-6 text-lg w-full sm:w-auto"
                    onClick={() => document.getElementById('processus')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10">Découvrir le processus</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/10 to-violet-500/10" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pour qui Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                🎯 Pour qui ?
              </Badge>
              <h2 className="text-white mb-4 text-[20px]">Ce service est fait pour vous</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">Entreprises Utilisatrices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">
                      Entreprises qui accueillent des travailleurs détachés et souhaitent garantir leur conformité totale avec la réglementation européenne et française.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">Vous êtes concerné si...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Vous recevez des travailleurs détachés pour la première fois",
                        "Vous voulez éviter les risques juridiques et financiers",
                        "Vous ne maîtrisez pas la réglementation européenne",
                        "Vous avez besoin d'un accompagnement expert",
                        "Vous souhaitez sécuriser vos relations avec les ETT"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/70">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30 text-green-200 backdrop-blur-sm">
                ✨ Vos avantages
              </Badge>
              <h2 className="text-white text-[20px]">Pourquoi choisir notre accompagnement conformité</h2>
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
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        {advantage.icon}
                      </div>
                      <h3 className="text-white mb-2">{advantage.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche Section */}
        <section id="processus" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                🎯 Comment ça marche
              </Badge>
              <h2 className="text-white text-[20px]">Le processus en 4 étapes</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 opacity-30" style={{ width: 'calc(100% - 12rem)', left: '6rem' }} />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 relative">
                      <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white text-xl absolute -top-6 right-6 shadow-lg rotate-12`}>
                        {step.number}
                      </div>
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        {step.icon}
                      </div>
                      <h3 className="text-white mb-2">{step.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Secteurs Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-200 backdrop-blur-sm">
                🏭 Secteurs d'activité
              </Badge>
              <h2 className="text-white text-[20px]">Secteurs à risque de non-conformité</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="h-full"
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                      <div className={`w-16 h-16 bg-gradient-to-br ${sector.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        {sector.icon}
                      </div>
                      <p className="text-white text-sm leading-tight">{sector.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignage Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-200 backdrop-blur-sm">
                ⭐ Ils nous font confiance
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                    "Suite à un contrôle URSSAF, nous avons fait appel à YOJOB pour sécuriser nos processus de détachement. Leur audit a révélé plusieurs non-conformités mineures que nous avons pu corriger avant sanction. Leur accompagnement nous a évité de lourdes amendes."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                      PM
                    </div>
                    <div>
                      <p className="text-white">Pierre Martin</p>
                      <p className="text-white/60 text-sm">Responsable Juridique - LogisBat Group</p>
                      <p className="text-white/40 text-xs mt-1">Secteur : BTP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 text-violet-200 backdrop-blur-sm">
                ❓ Questions fréquentes
              </Badge>
              <h2 className="text-white text-[20px]">Vos questions sur la conformité</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900 opacity-80" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-white mb-6 text-[20px]">
                Prêt à sécuriser vos détachements ?
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed text-[16px]">
                Bénéficiez de notre expertise réglementaire et évitez les risques de non-conformité
              </p>
              <a href="/devis">
                <Button className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all px-12 py-6 text-lg">
                  <span className="relative z-10 flex items-center">
                    Demander un devis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </Button>
              </a>
              <p className="text-white/60 text-sm mt-6">
                ✓ Réponse sous 24h • ✓ Sans engagement
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white py-12 lg:py-16">
          {/* Radial gradients - same as network section */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
          }} />

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
                <p>© 2026 YOJOB. Tous droits réservés.</p>
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
    </>
  );
}