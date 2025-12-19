import { useState, useEffect } from 'react';
import AppLanding from './App-Landing';
import AppSurvey from './App-Survey-Original';
import AppPushTranslations from './App-Push-Translations';
import Privacy from './Privacy';
import Legal from './Legal';
import CGV from './CGV';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept link clicks for client-side routing
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        
        // Only handle same-origin links
        if (url.origin === window.location.origin) {
          // Don't handle hash links
          if (anchor.getAttribute('href')?.startsWith('#')) {
            return;
          }
          
          e.preventDefault();
          window.history.pushState({}, '', url.pathname);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
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