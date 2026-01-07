import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Users,
  Globe,
  FileText,
  CheckCircle,
  ArrowRight,
  Building2,
  Target,
  Zap,
  ShieldCheck,
  Clock,
  Network,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Factory,
  Wrench,
  UtensilsCrossed,
  Truck,
  Car,
  Trees,
  Package,
  ArrowLeft,
  Star
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LogoSvg } from './imports/YojobLogoComplete';

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

export default function ServiceInterimEuropeen() {
  const faqs = [
    {
      question: "Quels pays sont couverts par votre réseau d'intérim ?",
      answer: "Notre réseau couvre les 27 pays de l'Union Européenne avec plus de 500 agences partenaires certifiées. Nous avons une présence particulièrement forte en Europe de l'Ouest (France, Allemagne, Belgique, Espagne, Portugal) et en Europe de l'Est (Pologne, Roumanie, Bulgarie)."
    },
    {
      question: "Quels sont les délais pour recevoir des candidats ?",
      answer: "En moyenne, nous pouvons vous proposer des profils qualifiés sous 48 à 72 heures après réception de votre demande. Pour des besoins urgents, notre équipe peut activer notre réseau en mode accéléré pour des délais encore plus courts."
    },
    {
      question: "Qui gère les formalités administratives (A1, contrat, paie) ?",
      answer: "L'agence d'emploi temporaire (ETT) partenaire du pays d'origine est l'employeur légal et gère l'ensemble des formalités : contrat de travail, bulletin de paie, cotisations sociales, formulaire A1 pour le détachement, et déclaration SIPSI en France."
    },
    {
      question: "Quelle est la durée minimum/maximum d'une mission ?",
      answer: "Les missions d'intérim peuvent aller de quelques jours à plusieurs mois selon vos besoins. La durée maximale de détachement en France est généralement de 24 mois, conformément à la réglementation européenne."
    },
    {
      question: "Comment sont sélectionnés les intérimaires ?",
      answer: "Nos agences partenaires sélectionnent les candidats selon vos critères précis : qualifications professionnelles, expérience, certifications requises, niveau de langue. Nous vérifions également leurs documents d'identité, diplômes et références avant de vous les présenter."
    }
  ];

  const advantages = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Couverture européenne",
      description: "Accès à 27 pays et 500+ agences certifiées",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Gestion administrative",
      description: "Formalités A1, contrats, paie gérés par l'ETT",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Réactivité",
      description: "Profils qualifiés disponibles sous 48-72h",
      color: "from-violet-500 to-violet-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Conformité garantie",
      description: "Respect des réglementations européennes",
      color: "from-green-500 to-green-600"
    }
  ];

  const sectors = [
    { icon: <Building2 className="w-8 h-8" />, name: "Bâtiment", color: "from-orange-500 to-orange-600" },
    { icon: <Wrench className="w-8 h-8" />, name: "Métallurgie", color: "from-blue-500 to-blue-600" },
    { icon: <Truck className="w-8 h-8" />, name: "TP", color: "from-gray-500 to-gray-600" },
    { icon: <UtensilsCrossed className="w-8 h-8" />, name: "Hôtellerie", color: "from-red-500 to-red-600" },
    { icon: <UtensilsCrossed className="w-8 h-8" />, name: "Restauration", color: "from-pink-500 to-pink-600" },
    { icon: <Factory className="w-8 h-8" />, name: "Plasturgie", color: "from-purple-500 to-purple-600" },
    { icon: <Car className="w-8 h-8" />, name: "Automobile", color: "from-indigo-500 to-indigo-600" },
    { icon: <Trees className="w-8 h-8" />, name: "Sylviculture", color: "from-green-500 to-green-600" },
    { icon: <Package className="w-8 h-8" />, name: "Cartonnerie", color: "from-amber-500 to-amber-600" }
  ];

  const steps = [
    {
      number: "1",
      title: "Décrivez votre besoin",
      description: "Partagez-nous vos besoins : métier, nombre, durée, qualifications requises",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2",
      title: "Nous activons notre réseau",
      description: "Nos agences partenaires sélectionnent les meilleurs profils disponibles",
      icon: <Network className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      number: "3",
      title: "Validez les candidats",
      description: "Vous recevez les CV et menez les entretiens si souhaité",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-violet-500 to-violet-600"
    },
    {
      number: "4",
      title: "Accueillez votre équipe",
      description: "Les intérimaires arrivent sur site, l'ETT gère toutes les formalités",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Intérim Européen | Recrutement temporaire en Europe | YOJOB</title>
          <meta name="description" content="Accédez à 500+ agences d'intérim dans 27 pays européens. Recrutement de personnel temporaire qualifié avec gestion complète des formalités administratives." />
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
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
              <a href="/devis">
                <Button
                  className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-2.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Devis gratuit
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </Button>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Background effects */}
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
                <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-200 backdrop-blur-sm">
                  🇪🇺 Intérim Européen
                </Badge>
                <h1 className="text-white mb-6 max-w-3xl mx-auto text-[20px]">
                  Recrutez du personnel temporaire partout en Europe
                </h1>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed text-[16px]">
                  Accédez à notre réseau de 500+ agences partenaires dans 27 pays. Nous gérons toutes les formalités administratives pour vous.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/devis">
                    <Button className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all px-8 py-6 text-lg w-full sm:w-auto">
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
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-[20px]">Entreprises Utilisatrices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">
                      Entreprises françaises ou européennes ayant besoin de renforcer ponctuellement leurs équipes avec du personnel qualifié venant d'autres pays européens.
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
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-[20px]">Vous êtes concerné si...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Vous avez un besoin temporaire de main d'œuvre",
                        "Vous cherchez des profils qualifiés rapidement",
                        "Vous voulez déléguer les formalités administratives",
                        "Vous souhaitez tester des profils avant embauche",
                        "Vous avez des pics d'activité saisonniers"
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
              <h2 className="text-white text-[20px]">Pourquoi choisir notre service d'intérim européen</h2>
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
              {/* Connection line (desktop) */}
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
              <h2 className="text-white text-[20px]">Secteurs concernés par l'intérim européen</h2>
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
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${sector.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        {sector.icon}
                      </div>
                      <p className="text-white">{sector.name}</p>
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
                    "YOJOB nous a permis de renforcer nos équipes de chantier en quelques jours avec des ouvriers qualifiés venus de Pologne. La gestion administrative a été totalement prise en charge par leur réseau d'agences partenaires. Un vrai gain de temps !"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl">
                      JD
                    </div>
                    <div>
                      <p className="text-white">Jean Dupont</p>
                      <p className="text-white/60 text-sm">Directeur des Opérations - ConstructBat SA</p>
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
              <h2 className="text-white text-[20px]">Vos questions sur l'intérim européen</h2>
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
                Prêt à recruter du personnel temporaire en Europe ?
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed text-[16px]">
                Décrivez-nous votre besoin et recevez des profils qualifiés sous 48-72h
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
                    aria-label="YOJOB"
                  />
                </motion.div>
                <p className="text-white/80 mb-[24px] leading-relaxed max-w-xs text-[13px] mt-[-46px]">
                  Leader du recrutement européen. 500+ agences partenaires dans 27 pays pour connecter les talents aux opportunités.
                </p>
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
                    className="flex items-start gap-3 text-white/80"
                    whileHover={{ x: 3 }}
                  >
                    <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>Bordeaux, France</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 text-white/80"
                    whileHover={{ x: 3 }}
                  >
                    <FileText className="w-5 h-5 text-violet-400" />
                    <a href="tel:+33650622524" className="hover:text-white transition-colors">
                      +33 6 50 62 25 24
                    </a>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 text-white/80"
                    whileHover={{ x: 3 }}
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    <span>contact@yojob.fr</span>
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