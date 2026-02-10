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
  HardHat,
  Building2,
  Wrench,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  FileText,
  Users,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Linkedin,
  Twitter,
  Facebook
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
    title: "Détachement Ouvriers Qualifiés BTP Europe Portugal Roumanie | YOJOB",
    description: "Recrutement ouvriers qualifiés BTP (maçons, coffreurs, ferrilleurs, électriciens) depuis Portugal, Roumanie, Pologne. Conformité UE garantie. Mobilisation 15 jours."
  },
  hero: {
    badge: "🏗️ Détachement BTP",
    title: "Détachement d'Ouvriers Qualifiés BTP depuis l'Europe de l'Est",
    subtitle: "Maçons, coffreurs, ferrilleurs, électriciens... Recrutez les meilleurs ouvriers européens du BTP, conformément à la directive européenne de détachement. Mobilisation en 15 jours."
  },
  metiers: [
    { name: "Maçons / Coffreurs", description: "Gros œuvre, construction neuve et rénovation. Certifications européennes validées.", icon: "building" },
    { name: "Ferrilleurs / Soudeurs", description: "Armature béton armé, structures métalliques, soudure MIG/TIG.", icon: "wrench" },
    { name: "Électriciens", description: "Courant fort et faible, bâtiment et industriel. Habilitations B1/B2/BR.", icon: "zap" },
    { name: "Plaquistes / Peintres", description: "Second œuvre complet : cloisons, faux plafonds, finitions, peinture.", icon: "hardhat" },
    { name: "Charpentiers / Menuisiers", description: "Charpente bois et métal, menuiseries intérieures et extérieures.", icon: "building2" },
    { name: "Plombiers / Chauffagistes", description: "Installations sanitaires, chauffage, climatisation, VMC.", icon: "wrench" }
  ],
  process: [
    { step: "1", title: "Expression du besoin", description: "Vous décrivez vos besoins : métiers, qualifications, volumes, planning chantier." },
    { step: "2", title: "Sourcing et sélection", description: "Nos agences partenaires en Europe identifient les profils qualifiés adaptés." },
    { step: "3", title: "Conformité administrative", description: "Certificat A1, déclaration SIPSI, vérification des qualifications et habilitations." },
    { step: "4", title: "Mobilisation chantier", description: "Transport, hébergement, intégration sur site. Mobilisation en 15 jours." },
    { step: "5", title: "Suivi et gestion", description: "Suivi qualité, gestion RH, remplacement si nécessaire. Interlocuteur dédié." }
  ],
  avantages: [
    { title: "Mobilisation rapide", description: "15 jours entre la validation et l'arrivée sur chantier, grâce à notre réseau de 500+ agences.", icon: "clock" },
    { title: "Conformité UE garantie", description: "Certificat A1, SIPSI, salaire minimum français, cotisations sociales : tout est vérifié.", icon: "shield" },
    { title: "Ouvriers qualifiés", description: "Profils testés et certifiés. Expérience chantier France vérifiée pour les profils seniors.", icon: "star" },
    { title: "Gestion tout-inclus", description: "Transport, hébergement, suivi RH, remplacement — vous ne gérez que votre chantier.", icon: "check" }
  ],
  faq: [
    { question: "Quels métiers BTP sont disponibles via le détachement ?", answer: "Tous les métiers du gros œuvre (maçons, coffreurs, ferrilleurs) et du second œuvre (électriciens, plombiers, plaquistes, peintres, menuisiers, charpentiers). Nous couvrons aussi les conducteurs d'engins et manœuvres qualifiés." },
    { question: "Quel est le délai de mobilisation des ouvriers BTP ?", answer: "En moyenne 15 jours ouvrés entre la validation de votre demande et l'arrivée des ouvriers sur chantier. Ce délai inclut le sourcing, les vérifications administratives (A1, SIPSI) et l'organisation logistique." },
    { question: "Les ouvriers détachés ont-ils les certifications françaises ?", answer: "Nous vérifions systématiquement les certifications européennes équivalentes (habilitations électriques, CACES, travail en hauteur). Pour les certifications spécifiquement françaises, nous organisons les formations complémentaires nécessaires." },
    { question: "Comment est assurée la conformité avec la directive européenne ?", answer: "YOJOB gère l'intégralité de la conformité : certificat A1 de sécurité sociale, déclaration SIPSI auprès de l'inspection du travail, respect du salaire minimum conventionnel français, et suivi des cotisations sociales." },
    { question: "Que se passe-t-il si un ouvrier ne convient pas ?", answer: "Notre engagement qualité prévoit le remplacement sous 48h en cas de non-conformité du profil. Un chef d'équipe bilingue assure le suivi sur site et la liaison avec nos agences partenaires pour tout ajustement." }
  ],
  pays: ["Portugal", "Roumanie", "Pologne", "Bulgarie", "Hongrie", "Slovaquie", "Croatie", "Slovénie"]
};

export default function ServiceDetachementBTP() {
  const { currentLanguage: globalLanguage } = useLanguageManager();
  const footerT = footerTranslations[globalLanguage as SupportedLanguage] || footerTranslations.fr;

  const metierIcons: Record<string, React.ReactNode> = {
    building: <Building2 className="w-8 h-8 text-white" />,
    wrench: <Wrench className="w-8 h-8 text-white" />,
    zap: <Zap className="w-8 h-8 text-white" />,
    hardhat: <HardHat className="w-8 h-8 text-white" />,
    building2: <Building2 className="w-8 h-8 text-white" />,
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
        page="detachement-btp"
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
              <a href="/services/interim-europeen" className="text-white/70 hover:text-white text-sm transition-colors">Intérim Européen</a>
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

        {/* Métiers BTP */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Nos Métiers</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tous les métiers du BTP couverts</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Du gros œuvre au second œuvre, accédez à des ouvriers qualifiés et expérimentés depuis toute l'Europe.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.metiers.map((metier, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all h-full">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3">
                        {metierIcons[metier.icon] || <HardHat className="w-8 h-8 text-white" />}
                      </div>
                      <CardTitle className="text-white text-lg">{metier.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/60 text-sm">{metier.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">De votre besoin au chantier en 5 étapes</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Un processus éprouvé pour recruter vos ouvriers BTP européens en toute conformité.</p>
            </div>
            <div className="space-y-6">
              {content.process.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pourquoi choisir YOJOB pour le BTP ?</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.avantages.map((avantage, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-white/5 border-white/10 text-center h-full">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 text-white">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Des ouvriers BTP qualifiés depuis 8 pays</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions fréquentes — Détachement BTP</h2>
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
                Besoin d'ouvriers BTP qualifiés ?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Recevez un devis personnalisé sous 24h. Mobilisation chantier en 15 jours.
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