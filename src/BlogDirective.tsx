import { motion } from 'motion/react';
import { SEOHead } from './components/SEOHead';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import { footerTranslations } from './src/i18n/services/footer';
import type { SupportedLanguage } from './src/i18n/types';
import {
  ArrowRight,
  FileText,
  Shield,
  Euro,
  Users,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Scale
} from 'lucide-react';

const content = {
  meta: {
    title: "Directive Travailleurs Détachés UE 2024 : Guide Employeurs | YOJOB",
    description: "Directive européenne travailleurs détachés : obligations employeurs, A1, salaire minimum, cotisations. Guide pratique pour DRH BTP et industrie par YOJOB."
  },
  faq: [
    { question: "Qu'est-ce que la directive européenne sur les travailleurs détachés ?", answer: "La directive 96/71/CE, révisée en 2018 (directive 2018/957), encadre le détachement temporaire de travailleurs d'un État membre de l'UE vers un autre. Elle garantit que les travailleurs détachés bénéficient des mêmes conditions de rémunération et de travail que les travailleurs locaux du pays d'accueil." },
    { question: "Quelles sont les obligations de l'employeur qui détache des travailleurs en France ?", answer: "L'employeur doit : 1) Obtenir le certificat A1 de sécurité sociale pour chaque travailleur, 2) Effectuer la déclaration SIPSI auprès de l'inspection du travail avant le début de la mission, 3) Désigner un représentant en France, 4) Payer au minimum le salaire conventionnel français applicable, 5) Respecter les durées maximales de travail et les repos." },
    { question: "Qu'est-ce que le certificat A1 et comment l'obtenir ?", answer: "Le certificat A1 (anciennement E101) atteste que le travailleur reste affilié au système de sécurité sociale de son pays d'origine pendant la période de détachement (max 24 mois). Il est délivré par l'organisme de sécurité sociale du pays d'envoi sur demande de l'employeur, avant le début du détachement." },
    { question: "Quelle est la durée maximale d'un détachement ?", answer: "La directive révisée distingue deux phases : détachement standard (jusqu'à 12 mois) avec application du « noyau dur » de conditions, et détachement longue durée (12-18 mois, extensible sur notification motivée) où pratiquement toutes les conditions de travail du pays d'accueil s'appliquent, sauf les clauses de rupture de contrat." },
    { question: "Quelles sanctions en cas de non-conformité ?", answer: "Les sanctions pour non-respect de la directive sont sévères en France : amende administrative de 4 000 € par travailleur détaché (8 000 € en cas de récidive), suspension de la prestation de service, interdiction temporaire de détachement (jusqu'à 2 ans). Les donneurs d'ordre peuvent être co-responsables en cas de manquement de leur sous-traitant." }
  ]
};

export default function BlogDirective() {
  const { currentLanguage: globalLanguage } = useLanguageManager();
  const footerT = footerTranslations[globalLanguage as SupportedLanguage] || footerTranslations.fr;

  return (
    <>
      <SEOHead
        page="blog-directive"
        lang={globalLanguage as any}
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
              <a href="/services/detachement-personnel" className="text-white/70 hover:text-white text-sm transition-colors">Nos Services</a>
              <a href="/devis" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all">
                Devis gratuit
              </a>
            </div>
          </div>
        </header>

        {/* Hero Article */}
        <section className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
                  <BookOpen className="w-4 h-4 mr-1 inline" /> Guide pratique
                </Badge>
                <span className="text-white/50 text-sm">Mis à jour : Février 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Guide Complet de la Directive Européenne des Travailleurs Détachés 2024
              </h1>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Tout ce que les employeurs, DRH et donneurs d'ordre BTP et industrie doivent savoir sur le cadre juridique du détachement de travailleurs en Europe. Obligations, procédures, sanctions — le guide opérationnel par YOJOB.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sommaire */}
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">Sommaire</h2>
              <nav className="space-y-2">
                <a href="#cadre" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">1.</span> Cadre juridique : la directive 96/71/CE révisée
                </a>
                <a href="#obligations" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">2.</span> Les 5 obligations clés de l'employeur
                </a>
                <a href="#a1" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">3.</span> Certificat A1 : procédure complète
                </a>
                <a href="#sipsi" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">4.</span> Déclaration SIPSI et représentant
                </a>
                <a href="#remuneration" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">5.</span> Rémunération et conditions de travail
                </a>
                <a href="#sanctions" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">6.</span> Sanctions et contrôles
                </a>
                <a href="#faq" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-white/40">7.</span> FAQ
                </a>
              </nav>
            </div>
          </div>
        </section>

        {/* Section 1 : Cadre juridique */}
        <article className="px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            <section id="cadre">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">1. Cadre juridique : la directive 96/71/CE révisée</h2>
                </div>
                <div className="prose prose-invert max-w-none space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    Le détachement de travailleurs au sein de l'Union européenne est encadré par la <strong className="text-white">directive 96/71/CE</strong>,
                    adoptée en 1996 et significativement révisée par la <strong className="text-white">directive 2018/957</strong> (transposée en France par l'ordonnance du 20 février 2019).
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Cette directive établit le principe fondamental du <strong className="text-white">« noyau dur »</strong> de conditions de travail du pays d'accueil
                    qui doivent être garanties aux travailleurs détachés : rémunération minimale, durée du travail, congés payés, santé et sécurité,
                    conditions de mise à disposition, égalité de traitement, et hébergement.
                  </p>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 my-6">
                    <p className="text-cyan-300 font-medium mb-2">Point clé — Directive révisée 2018</p>
                    <p className="text-white/70">
                      Depuis la révision de 2018, le principe de <strong className="text-white">« à travail égal, rémunération égale »</strong> s'applique :
                      les travailleurs détachés doivent percevoir la même rémunération que les travailleurs locaux (et non plus seulement le salaire minimum).
                      Cela inclut les primes d'ancienneté, le 13e mois, les indemnités de panier, etc.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section 2 : Obligations */}
            <section id="obligations">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">2. Les 5 obligations clés de l'employeur</h2>
                </div>
                <div className="grid gap-4">
                  {[
                    { icon: <FileText className="w-5 h-5" />, title: "Certificat A1 de sécurité sociale", desc: "Obtenir le formulaire A1 pour chaque travailleur avant le début de la mission, attestant du maintien de l'affiliation au régime social du pays d'origine." },
                    { icon: <Shield className="w-5 h-5" />, title: "Déclaration SIPSI", desc: "Télédéclarer chaque détachement sur le portail SIPSI de l'inspection du travail française avant le début de la prestation." },
                    { icon: <Users className="w-5 h-5" />, title: "Représentant en France", desc: "Désigner un représentant sur le territoire français chargé de la liaison avec l'inspection du travail et la conservation des documents." },
                    { icon: <Euro className="w-5 h-5" />, title: "Rémunération conforme", desc: "Garantir au minimum le salaire conventionnel français du secteur, incluant les majorations, indemnités et primes prévues par la convention collective." },
                    { icon: <CheckCircle className="w-5 h-5" />, title: "Conservation des documents", desc: "Tenir à disposition les bulletins de paie, justificatifs de paiement, contrat de travail, certificat A1 et déclaration SIPSI pendant toute la durée du détachement." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Section 3 : Certificat A1 */}
            <section id="a1">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">3. Certificat A1 : procédure complète</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Le <strong className="text-white">certificat A1</strong> (anciennement E101) est le document central du détachement.
                    Il atteste que le travailleur reste affilié au régime de sécurité sociale de son pays d'origine pendant la durée du détachement,
                    évitant ainsi une double cotisation.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-3">Procédure d'obtention :</h3>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>L'employeur du pays d'origine fait la demande auprès de son organisme de sécurité sociale</li>
                      <li>Délai moyen : 5 à 15 jours ouvrés selon le pays</li>
                      <li>Le certificat est valable pour la durée de la mission (max 24 mois, renouvelable)</li>
                      <li>Il doit être présenté à tout contrôle de l'inspection du travail en France</li>
                    </ol>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                    <p className="text-amber-300 font-medium mb-2"><AlertTriangle className="w-4 h-4 inline mr-1" /> Attention</p>
                    <p className="text-white/70">
                      L'absence de certificat A1 lors d'un contrôle entraîne une présomption de travail dissimulé.
                      YOJOB s'assure systématiquement que chaque travailleur détaché dispose de son A1 avant le départ.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section 4 : SIPSI */}
            <section id="sipsi">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">4. Déclaration SIPSI et représentant</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Le <strong className="text-white">Système d'Information sur les Prestations de Service Internationales (SIPSI)</strong> est la plateforme
                    de télédéclaration obligatoire pour tout détachement de travailleurs en France. La déclaration doit être effectuée
                    <strong className="text-white"> avant le début de chaque prestation</strong>.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-3">Informations à déclarer :</h3>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Identité de l'entreprise d'envoi et du représentant en France</li>
                      <li>Identité du donneur d'ordre ou maître d'ouvrage</li>
                      <li>Lieu de réalisation de la prestation</li>
                      <li>Dates de début et de fin prévues</li>
                      <li>Liste nominative des travailleurs détachés</li>
                      <li>Horaires de travail applicables</li>
                    </ul>
                  </div>
                  <p>
                    Le <strong className="text-white">représentant en France</strong> doit être une personne physique ou morale présente sur le territoire,
                    capable de présenter les documents aux inspecteurs et de recevoir les notifications.
                    Il peut s'agir d'un salarié de l'entreprise d'envoi présent en France, ou d'un mandataire externe.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Section 5 : Rémunération */}
            <section id="remuneration">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Euro className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">5. Rémunération et conditions de travail</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Depuis la directive révisée de 2018, le principe d'<strong className="text-white">égalité de rémunération</strong> remplace
                    le simple respect du salaire minimum. Le travailleur détaché doit percevoir la même rémunération qu'un salarié local occupant le même poste.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <h3 className="text-green-300 font-semibold mb-3"><CheckCircle className="w-4 h-4 inline mr-1" /> Éléments inclus</h3>
                      <ul className="space-y-1 text-sm">
                        <li>Salaire minimum conventionnel</li>
                        <li>Majorations heures supplémentaires</li>
                        <li>Indemnités de grand déplacement</li>
                        <li>Primes de panier / repas</li>
                        <li>13e mois si prévu par la CCN</li>
                        <li>Indemnités d'intempéries (BTP)</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-3">Conditions de travail applicables</h3>
                      <ul className="space-y-1 text-sm">
                        <li>Durée maximale du travail (35h/semaine)</li>
                        <li>Repos quotidien (11h) et hebdomadaire (35h)</li>
                        <li>Congés payés (2,5 jours/mois)</li>
                        <li>Santé et sécurité au travail</li>
                        <li>Protection des femmes enceintes</li>
                        <li>Non-discrimination</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section 6 : Sanctions */}
            <section id="sanctions">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">6. Sanctions et contrôles</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    La France dispose d'un arsenal de sanctions parmi les plus stricts d'Europe en matière de détachement.
                    Les contrôles sont effectués par l'inspection du travail (DREETS) et l'URSSAF.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <h3 className="text-red-300 font-semibold mb-3">Barème des sanctions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span>Absence de déclaration SIPSI</span>
                        <span className="text-red-300 font-semibold">4 000 € / travailleur</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span>Récidive dans les 2 ans</span>
                        <span className="text-red-300 font-semibold">8 000 € / travailleur</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span>Plafond par prestation</span>
                        <span className="text-red-300 font-semibold">500 000 €</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span>Suspension de la prestation</span>
                        <span className="text-amber-300 font-semibold">Jusqu'à 1 mois</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Interdiction de détachement</span>
                        <span className="text-amber-300 font-semibold">Jusqu'à 2 ans</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                    <p className="text-amber-300 font-medium mb-2">Responsabilité du donneur d'ordre</p>
                    <p className="text-white/70">
                      Les maîtres d'ouvrage et donneurs d'ordre sont tenus à un <strong className="text-white">devoir de vigilance</strong>.
                      Ils doivent vérifier que leurs sous-traitants respectent leurs obligations en matière de détachement.
                      En cas de manquement, ils peuvent être tenus <strong className="text-white">solidairement responsables</strong> du paiement des salaires et cotisations.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section 7 : FAQ */}
            <section id="faq" className="pb-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">7. Questions fréquentes</h2>
                </div>
                <div className="space-y-4">
                  {content.faq.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-2">{item.question}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </article>

        {/* CTA Final */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                YOJOB gère la conformité pour vous
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Certificat A1, SIPSI, salaires conventionnels, représentant en France — nous prenons en charge l'intégralité de la conformité administrative du détachement.
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
