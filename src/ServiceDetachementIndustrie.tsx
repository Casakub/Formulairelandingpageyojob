import { useState } from 'react';
import { motion } from 'motion/react';
import { SEOHead } from './components/SEOHead';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import { footerTranslations } from './src/i18n/services/footer';
import type { SupportedLanguage } from './src/i18n/types';
import {
  ChevronDown,
  ChevronUp,
  Factory,
  Cog,
  Package,
  Thermometer,
  Shield,
  Clock,
  CheckCircle,
  Users,
  MapPin,
  ArrowRight,
  Star,
  Truck,
  Apple,
  Wrench
} from 'lucide-react';

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

const content = {
  meta: {
    title: "Détachement Personnel Industrie Agroalimentaire Europe | YOJOB",
    description: "Main-d'œuvre européenne qualifiée industrie et agroalimentaire (opérateurs, techniciens, agents logistique). Détachement conforme Portugal, Roumanie. Devis gratuit."
  },
  hero: {
    badge: "🏭 Détachement Industrie",
    title: "Détachement de Personnel Qualifié pour l'Industrie et l'Agroalimentaire",
    subtitle: "Opérateurs de production, techniciens de maintenance, agents logistique... Renforcez vos lignes de production avec une main-d'œuvre européenne qualifiée et conforme."
  },
  secteurs: [
    { name: "Industrie manufacturière", description: "Opérateurs de production, conducteurs de ligne, agents qualité. Secteurs automobile, métallurgie, plasturgie.", icon: "factory" },
    { name: "Agroalimentaire", description: "Ouvriers de découpe, conditionneurs, agents de production. Normes HACCP et hygiène respectées.", icon: "apple" },
    { name: "Logistique & entreposage", description: "Caristes (CACES 1-3-5), préparateurs de commandes, agents de quai, manutentionnaires.", icon: "truck" },
    { name: "Maintenance industrielle", description: "Techniciens de maintenance préventive/corrective, électromécaniciens, automaticiens.", icon: "wrench" },
    { name: "Transformation viande", description: "Désosseurs, pareurs, ouvriers d'abattoir qualifiés. Respect strict des normes sanitaires.", icon: "package" },
    { name: "Industrie chimique", description: "Opérateurs process, agents de fabrication, conduite d'installations en environnement contrôlé.", icon: "cog" }
  ],
  process: [
    { step: "1", title: "Analyse de vos besoins", description: "Métiers, compétences techniques, volumes, cadences de production, contraintes du site." },
    { step: "2", title: "Sourcing européen ciblé", description: "Nos 500+ agences partenaires identifient les profils industriels dans 8 pays européens." },
    { step: "3", title: "Qualification et conformité", description: "Vérification des compétences techniques, certifications (CACES, habilitations), dossier A1/SIPSI." },
    { step: "4", title: "Intégration sur site", description: "Transport, hébergement, accueil sécurité, formation aux process spécifiques de votre usine." },
    { step: "5", title: "Pilotage de la mission", description: "Chef d'équipe bilingue, suivi de productivité, remplacement sous 48h si nécessaire." }
  ],
  avantages: [
    { title: "Flexibilité production", description: "Ajustez vos effectifs selon la saisonnalité et les pics de commandes, sans les contraintes du CDI.", icon: "clock" },
    { title: "Conformité totale", description: "Certificat A1, SIPSI, salaire minimum, cotisations : nous gérons toute la conformité réglementaire.", icon: "shield" },
    { title: "Personnel formé", description: "Opérateurs expérimentés en industrie, formés aux normes européennes (HACCP, sécurité, qualité).", icon: "star" },
    { title: "Zéro charge RH", description: "Recrutement, administratif, logistique, suivi — nous prenons tout en charge pour vous.", icon: "check" }
  ],
  faq: [
    { question: "Quels profils industriels sont disponibles via le détachement ?", answer: "Nous recrutons tous les profils de production industrielle : opérateurs de production, conducteurs de ligne, caristes (CACES 1-3-5), agents de conditionnement, désosseurs/pareurs, techniciens de maintenance, électromécaniciens, agents logistique et manutentionnaires." },
    { question: "Le personnel détaché est-il formé aux normes HACCP ?", answer: "Oui. Pour le secteur agroalimentaire, nous sélectionnons uniquement des profils ayant une expérience attestée en milieu agroalimentaire et une formation aux normes HACCP. Un complément de formation est organisé si nécessaire avant l'intégration sur site." },
    { question: "Comment gérez-vous les pics de production saisonniers ?", answer: "Notre réseau de 500+ agences européennes nous permet de mobiliser rapidement des volumes importants (10 à 100+ opérateurs) pour répondre aux pics saisonniers. La mobilisation standard est de 15 jours, réduite à 10 jours en cas d'urgence." },
    { question: "Quel est le cadre juridique du détachement en industrie ?", answer: "Le détachement s'effectue dans le cadre de la directive européenne 96/71/CE révisée. Chaque travailleur dispose d'un certificat A1 de sécurité sociale, d'une déclaration SIPSI, et est rémunéré au minimum au salaire conventionnel français du secteur." },
    { question: "Proposez-vous un encadrement sur site ?", answer: "Oui. Pour les missions de plus de 5 personnes, nous mettons en place un chef d'équipe bilingue qui assure la coordination quotidienne, le suivi qualité/productivité, et fait le lien entre vos responsables de production et les travailleurs détachés." }
  ],
  pays: ["Portugal", "Roumanie", "Pologne", "Bulgarie", "Hongrie", "Slovaquie", "Croatie", "Lituanie"]
};

export default function ServiceDetachementIndustrie() {
  const { currentLanguage: globalLanguage } = useLanguageManager();
  const footerT = footerTranslations[globalLanguage as SupportedLanguage] || footerTranslations.fr;

  const secteurIcons: Record<string, React.ReactNode> = {
    factory: <Factory className="w-8 h-8 text-white" />,
    apple: <Apple className="w-8 h-8 text-white" />,
    truck: <Truck className="w-8 h-8 text-white" />,
    wrench: <Wrench className="w-8 h-8 text-white" />,
    package: <Package className="w-8 h-8 text-white" />,
    cog: <Cog className="w-8 h-8 text-white" />,
  };

  const avantageIcons: Record<string, React.ReactNode> = {
    clock: <Clock className="w-8 h-8" />,
    shield: <Shield className="w-8 h-8" />,
    star: <Star className="w-8 h-8" />,
    check: <CheckCircle className="w-8 h-8" />,
  };

  return (
    <>
      <SEOHead
        page="detachement-industrie"
        lang={globalLanguage as any}
        includeServiceSchema={true}
        faqItems={content.faq}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
                  <LogoSvg className="w-10 h-10 object-contain" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">YOJOB</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/services/detachement-personnel" className="text-white/70 hover:text-white text-sm transition-colors">Détachement Personnel</a>
              <a href="/services/detachement-btp" className="text-white/70 hover:text-white text-sm transition-colors">Détachement BTP</a>
              <a href="/devis" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all">
                Devis gratuit
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-2 text-sm">
                {content.hero.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/devis">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg shadow-lg shadow-cyan-500/25">
                    Demander un devis gratuit <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Secteurs industriels */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Nos Secteurs</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tous les secteurs industriels couverts</h2>
              <p className="text-white/60 max-w-2xl mx-auto">De la production manufacturière à l'agroalimentaire, nous fournissons les profils adaptés à votre industrie.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.secteurs.map((secteur, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all h-full">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-3">
                        {secteurIcons[secteur.icon] || <Factory className="w-8 h-8 text-white" />}
                      </div>
                      <CardTitle className="text-white text-lg">{secteur.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/60 text-sm">{secteur.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">Notre Processus</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">5 étapes pour renforcer vos lignes de production</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Un processus structuré pour intégrer vos opérateurs industriels européens rapidement et en conformité.</p>
            </div>
            <div className="space-y-6">
              {content.process.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">Vos Avantages</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pourquoi choisir YOJOB pour l'industrie ?</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.avantages.map((avantage, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-white/5 border-white/10 text-center h-full">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-4 text-white">
                        {avantageIcons[avantage.icon]}
                      </div>
                      <h3 className="text-white font-semibold mb-2">{avantage.title}</h3>
                      <p className="text-white/60 text-sm">{avantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pays d'origine */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20">Nos Pays Sources</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Main-d'œuvre industrielle qualifiée depuis 8 pays</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {content.pays.map((pays, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm">
                    <MapPin className="w-4 h-4 mr-2 inline" /> {pays}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions fréquentes — Détachement Industrie</h2>
            </div>
            <div className="space-y-4">
              {content.faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Besoin de renforcer vos effectifs industriels ?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Recevez un devis personnalisé sous 24h. Opérateurs qualifiés, conformité garantie.
              </p>
              <a href="/devis">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg shadow-lg shadow-cyan-500/25">
                  Demander un devis gratuit <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer translations={footerT} />
      </div>
    </>
  );
}