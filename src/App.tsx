import { useState, useEffect } from 'react';
import AppLanding from './App-Landing';
import AppSurvey from './App-Survey-Original';
import AppPushTranslations from './App-Push-Translations';
import Privacy from './Privacy';
import Legal from './Legal';
import CGV from './CGV';
import ServiceInterimEuropeen from './ServiceInterimEuropeen';
import ServiceRecrutementSpecialise from './ServiceRecrutementSpecialise';
import ServiceConseilConformite from './ServiceConseilConformite';
import ServiceDetachementPersonnel from './ServiceDetachementPersonnel';
import DemandeDevis from './DemandeDevis';
import ConfirmationDevis from './ConfirmationDevis';
import RecapDevis from './RecapDevis';
import APropos from './APropos';
import NotreReseau from './NotreReseau';
import NosSecteurs from './NosSecteurs';
import Temoignages from './Temoignages';
import { SignatureOnline } from './components/SignatureOnline';
import { Toaster } from './components/ui/sonner';
import { buildLocalizedPath, DEFAULT_LANGUAGE, splitPathByLang, stripLangPrefix } from './lib/i18nRouting';

export default function App() {
  const getNormalizedPath = () => {
    const { pathname, search, hash } = window.location;
    const { lang, hasLangPrefix, restPath } = splitPathByLang(pathname);

    if (hasLangPrefix && lang === DEFAULT_LANGUAGE) {
      // Canonicaliser /fr/... vers /
      const canonicalUrl = `${restPath}${search}${hash}`;
      if (canonicalUrl !== `${pathname}${search}${hash}`) {
        window.history.replaceState({}, '', canonicalUrl);
      }
    }

    return restPath;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept link clicks for client-side routing
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Ne traiter que les clics sur des liens <a>
      if (!anchor || !anchor.href) {
        // Ignorer silencieusement les clics sur les boutons, etc.
        return;
      }
      
      // Ignorer les liens qui doivent rester natifs
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      const hrefAttr = anchor.getAttribute('href') || '';
      if (hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('tel:')) {
        return;
      }

      const url = new URL(anchor.href);
      
      // Only handle same-origin links
      if (url.origin === window.location.origin) {
        // Don't handle hash links
        if (anchor.getAttribute('href')?.startsWith('#')) {
          return;
        }

        // Ne pas intercepter les liens vers des fichiers/ressources
        const isFile = /\.[a-zA-Z0-9]+$/.test(url.pathname);
        if (
          isFile ||
          url.pathname.startsWith('/assets') ||
          url.pathname.startsWith('/images') ||
          url.pathname.startsWith('/styles')
        ) {
          return;
        }
        
        // Intercepter la navigation client-side
        e.preventDefault();
        e.stopPropagation();
        const { lang } = splitPathByLang(window.location.pathname);
        const nextPath = buildLocalizedPath(url.pathname, lang);
        const nextUrl = `${nextPath}${url.search}${url.hash}`;
        window.history.pushState({}, '', nextUrl);
        setCurrentPath(stripLangPrefix(nextPath));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick, true); // Use capture phase
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // Route matching
  if (currentPath === '/' || currentPath === '') {
    return (
      <>
        <AppLanding />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/privacy') {
    return (
      <>
        <Privacy />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/legal') {
    return (
      <>
        <Legal />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/cgv') {
    return (
      <>
        <CGV />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/services/interim-europeen') {
    return (
      <>
        <ServiceInterimEuropeen />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/services/recrutement-specialise') {
    return (
      <>
        <ServiceRecrutementSpecialise />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/services/conseil-conformite') {
    return (
      <>
        <ServiceConseilConformite />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/services/detachement-personnel') {
    return (
      <>
        <ServiceDetachementPersonnel />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/a-propos') {
    return (
      <>
        <APropos />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/notre-reseau') {
    return (
      <>
        <NotreReseau />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/nos-secteurs') {
    return (
      <>
        <NosSecteurs />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/temoignages') {
    return (
      <>
        <Temoignages />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath.startsWith('/survey') || currentPath.startsWith('/admin')) {
    return (
      <>
        <AppSurvey />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/push-translations') {
    return (
      <>
        <AppPushTranslations />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/devis') {
    return (
      <>
        <DemandeDevis />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPath === '/confirmation-devis') {
    return (
      <>
        <ConfirmationDevis />
        <Toaster position="top-right" />
      </>
    );
  }

  // Route dynamique pour /recap-devis/:id
  if (currentPath.startsWith('/recap-devis/')) {
    return (
      <>
        <RecapDevis />
        <Toaster position="top-right" />
      </>
    );
  }

  // 🆕 Route dynamique pour /signer/:token (signature en ligne)
  if (currentPath.startsWith('/signer/')) {
    const token = currentPath.split('/signer/')[1];
    return (
      <>
        <SignatureOnline token={token} />
        <Toaster position="top-right" />
      </>
    );
  }

  // 404
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl mb-4">404 - Page non trouvée</h1>
          <p className="text-gray-600 mb-6">La page que vous recherchez n'existe pas.</p>
          <a href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
