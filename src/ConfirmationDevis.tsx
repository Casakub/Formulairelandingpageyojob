import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle, Download, Home, Mail, FileText } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { LogoSvg } from './imports/YojobLogoComplete';

export default function ConfirmationDevis() {
  const [numeroDevis, setNumeroDevis] = useState('');
  
  useEffect(() => {
    // Récupérer le numéro de devis depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setNumeroDevis(ref);
    }
  }, []);

  const handleDownloadPDF = () => {
    // TODO: Générer et télécharger le PDF
    alert('Fonctionnalité de téléchargement PDF à venir');
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Demande envoyée | YOJOB</title>
          <meta name="description" content="Votre demande de devis a bien été envoyée." />
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center px-4">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center gap-3 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#7C3AED] p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <div className="w-full h-full rounded-[14px] bg-white/95 backdrop-blur-sm flex items-center justify-center">
                  <LogoSvg className="w-10 h-10" />
                </div>
              </div>
              <span className="text-white text-2xl group-hover:text-cyan-400 transition-colors">
                YOJOB
              </span>
            </a>
          </div>

          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/50">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <CardContent className="p-8 text-center">
                <h1 className="text-white text-3xl mb-4">
                  Demande envoyée avec succès !
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  Votre demande de devis a bien été enregistrée.
                </p>

                {numeroDevis && (
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
                    <p className="text-cyan-200 text-sm mb-2">Numéro de référence</p>
                    <p className="text-white text-2xl font-mono">{numeroDevis}</p>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-left">
                    <Mail className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Email de confirmation</p>
                      <p className="text-white/70 text-sm">
                        Un récapitulatif vous a été envoyé par email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-left">
                    <FileText className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Traitement sous 24h</p>
                      <p className="text-white/70 text-sm">
                        Notre équipe vous contactera sous 24h ouvrées
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prochaines étapes */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6 text-left">
                  <h3 className="text-white font-medium mb-4">📋 Prochaines étapes</h3>
                  <ol className="space-y-3 text-white/80 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">
                        1
                      </span>
                      <span>Notre équipe analyse votre demande et sélectionne les meilleures ETT partenaires</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">
                        2
                      </span>
                      <span>Nous préparons votre devis détaillé avec tarification précise</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">
                        3
                      </span>
                      <span>Vous recevez votre devis et nous échangeons sur les détails</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">
                        4
                      </span>
                      <span>Validation et démarrage de votre mission</span>
                    </li>
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="flex-1 relative overflow-hidden group rounded-full border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 transition-all py-6"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger le récapitulatif
                  </Button>

                  <Button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all py-6"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Home className="w-5 h-5 mr-2" />
                      Retour à l'accueil
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-white/60 text-sm">
              Une question ? Contactez-nous à{' '}
              <a href="mailto:contact@yojob.com" className="text-cyan-400 hover:underline">
                contact@yojob.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
