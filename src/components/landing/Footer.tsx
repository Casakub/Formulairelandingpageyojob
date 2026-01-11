/**
 * 🦶 FOOTER COMPONENT - YOJOB
 * 
 * Footer réutilisable avec traductions multi-langues
 * Design: Glassmorphism + Gradients radiaux + Grid pattern
 * 
 * @version 2.0.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { LogoSvg } from '../../imports/YojobLogoComplete';
import { useFooterTranslation } from '../../hooks/useFooterTranslation';

interface FooterProps {
  language?: string;
}

export function Footer({ language = 'fr' }: FooterProps) {
  const [revealedEmail, setRevealedEmail] = useState(false);
  
  // Récupérer les traductions du footer
  const content = useFooterTranslation(language);

  if (content.variant === 'minimal') {
    return (
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <LogoSvg className="w-16 h-16 mx-auto mb-3" />
          </div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/80 mb-3">
              <p>{content?.bottom?.copyright || '© 2026 YOJOB. Tous droits réservés.'}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
              <a 
                href="/privacy" 
                className="hover:text-cyan-400 transition-colors underline decoration-dotted"
              >
                {content?.bottom?.links?.privacy || 'Politique de confidentialité'}
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="/legal" 
                className="hover:text-cyan-400 transition-colors underline decoration-dotted"
              >
                {content?.bottom?.links?.legal || 'Mentions légales'}
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="/cgv" 
                className="hover:text-cyan-400 transition-colors underline decoration-dotted"
              >
                {content?.bottom?.links?.terms || 'CGV'}
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    );
  }

  return (
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
              {content?.logo?.tagline || 'Leader du recrutement européen. 500+ agences partenaires dans 27 pays pour connecter les talents aux opportunités.'}
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
              {content?.columns?.services?.title || 'Services'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(content?.columns?.services?.links || []).map((link, index) => {
                const serviceFooterUrls = [
                  '/services/interim-europeen',
                  '/services/recrutement-specialise', 
                  '/services/conseil-conformite',
                  '/services/detachement-personnel'
                ];
                return (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={serviceFooterUrls[index] || link.href} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
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
              {content?.columns?.company?.title || 'Entreprise'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(content?.columns?.company?.links || []).map((link, index) => {
                const companyUrls = ['/a-propos', '/notre-reseau', '/nos-secteurs', '/temoignages'];
                return (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={companyUrls[index]} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
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
              {content?.columns?.contact?.title || 'Contact'}
            </h3>
            <ul className="space-y-3 text-sm">
              <motion.li 
                className="flex items-start gap-3 text-white/80"
                whileHover={{ x: 3 }}
              >
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-white/90">{content?.contact?.address || 'Bordeaux, France'}</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-white/80"
                whileHover={{ x: 3 }}
              >
                <Phone className="w-5 h-5 text-violet-400 drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                <a href="tel:+33650622524" className="text-white/90 hover:text-cyan-400 transition-colors">
                  {content?.contact?.phone || '+33 6 50 62 25 24'}
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-white/80"
                whileHover={{ x: 3 }}
              >
                <Mail className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <button
                  onClick={() => setRevealedEmail(!revealedEmail)}
                  className="text-white/90 hover:text-cyan-400 transition-colors text-left"
                  title="Cliquez pour révéler l'email complet"
                >
                  {content?.contact?.email || 'contact@yojob.fr'}
                </button>
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
            <p>© 2026 {content?.bottom?.rights || 'YOJOB. Tous droits réservés.'}</p>
          </div>
          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
            <a 
              href="/legal" 
              className="hover:text-cyan-400 transition-colors underline decoration-dotted"
            >
              {content?.bottom?.legal || 'Mentions légales'}
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="/cgv" 
              className="hover:text-cyan-400 transition-colors underline decoration-dotted"
            >
              {content?.bottom?.terms || 'CGV'}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}