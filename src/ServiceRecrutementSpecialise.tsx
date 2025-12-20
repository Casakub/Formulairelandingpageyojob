import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Target,
  Search,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
  FileText,
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
  Star,
  Award,
  Globe
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

export default function ServiceRecrutementSpecialise() {
  const faqs = [
    {
      question: "Quels secteurs d'activité couvrez-vous ?",
      answer: "Nous couvrons tous les secteurs d'activité : BTP, industrie, hôtellerie-restauration, métallurgie, plasturgie, automobile, sylviculture, cartonnerie, et bien d'autres. Nos agences partenaires sont spécialisées par secteur pour garantir une parfaite compréhension de vos besoins."
    },
    {
      question: "Comment vérifiez-vous les compétences des candidats ?",
      answer: "Nos agences partenaires vérifient systématiquement les diplômes, certifications professionnelles (CACES, habilitations électriques, etc.), références employeurs, et font passer des tests techniques si nécessaire. Nous pouvons également organiser des évaluations pratiques sur site."
    },
    {
      question: "Pouvez-vous recruter des profils avec des certifications spécifiques (CACES, habilitations...) ?",
      answer: "Absolument. Nos agences partenaires disposent de viviers de candidats certifiés : CACES (R489, R490, R482...), habilitations électriques (B0, B1, B2, BR, BC, H0...), AIPR, SST, travail en hauteur, etc. Nous vérifions la validité de toutes les certifications avant présentation."
    },
    {
      question: "Quel est le niveau de langue des candidats ?",
      answer: "Le niveau de français varie selon le pays d'origine et le profil. Nous évaluons systématiquement le niveau de langue (A1 à C2) et vous présentons uniquement des candidats dont le niveau correspond à vos exigences. Pour les postes nécessitant un français courant, nous organisons des entretiens en visio."
    },
    {
      question: "Proposez-vous des tests techniques avant embauche ?",
      answer: "Oui, nous pouvons organiser des tests techniques adaptés à votre métier : soudure, conduite d'engins, mécanique, électricité, etc. Ces tests peuvent être réalisés dans le pays d'origine ou directement sur votre site lors d'une période d'essai."
    }
  ];

  const advantages = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Expertise sectorielle",
      description: "Agences spécialisées par métier et secteur",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Profils qualifiés",
      description: "Vérification des compétences et certifications",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Matching précis",
      description: "Compétences techniques + niveau de langue adapté",
      color: "from-violet-500 to-violet-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Accompagnement",
      description: "Suivi personnalisé tout au long de la mission",
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
      title: "Définissez le profil",
      description: "Partagez-nous le profil recherché : compétences, certifications, expérience",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2",
      title: "Sourcing ciblé",
      description: "Nos agences spécialisées identifient les meilleurs candidats",
      icon: <Network className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      number: "3",
      title: "Présélection",
      description: "Vous recevez les CV qualifiés et menez les entretiens",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-violet-500 to-violet-600"
    },
    {
      number: "4",
      title: "Intégration",
      description: "Le candidat retenu rejoint vos équipes, suivi personnalisé",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Recrutement Spécialisé Europe | Experts sectoriels | YOJOB</title>
          <meta name="description" content="Trouvez les talents spécialisés dont vous avez besoin grâce à notre réseau d'experts sectoriels : BTP, industrie, hôtellerie, métallurgie..." />
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
              <Button
                className="relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-2.5"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Devis gratuit
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </Button>
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
                <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-cyan-200 backdrop-blur-sm">
                  🎯 Recrutement Spécialisé
                </Badge>
                <h1 className="text-white mb-6 max-w-3xl mx-auto">
                  Des experts sectoriels pour vos recrutements pointus
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Recrutez des profils techniques qualifiés dans toute l'Europe grâce à notre réseau d'experts RH spécialisés.
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
              <h2 className="text-white mb-4">Ce service est fait pour vous</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">Entreprises Utilisatrices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">
                      Entreprises recherchant des profils spécialisés avec des compétences techniques pointues, certifications spécifiques ou expertise sectorielle rare.
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
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">Vous êtes concerné si...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Vous cherchez des profils avec certifications (CACES, habilitations...)",
                        "Vous avez besoin de compétences techniques rares",
                        "Vous recrutez dans un secteur spécialisé",
                        "Vous voulez des candidats expérimentés",
                        "Vous avez des exigences qualité élevées"
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
              <h2 className="text-white">Pourquoi choisir notre recrutement spécialisé</h2>
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
              <h2 className="text-white">Le processus en 4 étapes</h2>
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
              <h2 className="text-white">Nos expertises sectorielles</h2>
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
                    "Nous cherchions des soudeurs qualifiés avec certification EN 9606. YOJOB a mobilisé son réseau et nous a présenté 8 candidats roumains parfaitement qualifiés en moins d'une semaine. La qualité du sourcing est remarquable."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xl">
                      ML
                    </div>
                    <div>
                      <p className="text-white">Marie Lambert</p>
                      <p className="text-white/60 text-sm">DRH - MetalIndustrie France</p>
                      <p className="text-white/40 text-xs mt-1">Secteur : Métallurgie</p>
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
              <h2 className="text-white">Vos questions sur le recrutement spécialisé</h2>
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
              <h2 className="text-white mb-6">
                Prêt à trouver les experts dont vous avez besoin ?
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Décrivez-nous le profil recherché et accédez à notre réseau d'agences spécialisées
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
        <footer className="py-12 px-4 bg-black/20 border-t border-white/10">
          <div className="container mx-auto">
            <div className="text-center text-white/60 text-sm">
              <p>© 2026 YOJOB. Tous droits réservés.</p>
              <div className="flex gap-4 justify-center mt-4">
                <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
                <span>•</span>
                <a href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
                <span>•</span>
                <a href="/cgv" className="hover:text-white transition-colors">CGV</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}