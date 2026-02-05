import React from 'react';
import { useLanguageManager } from '../hooks/useLanguageManager';
import { buildLocalizedPath } from '../lib/i18nRouting';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

/**
 * 🔗 Composant Link pour navigation client-side
 * 
 * La navigation est gérée automatiquement par le gestionnaire global
 * dans App.tsx qui intercepte tous les clics sur les liens internes.
 */
export function Link({ href, children, className, ...props }: LinkProps) {
  const { currentLanguage } = useLanguageManager();

  const isLocalizableHref = (value: string) => {
    if (!value.startsWith('/') || value.startsWith('//')) return false;
    if (value.startsWith('/assets') || value.startsWith('/images') || value.startsWith('/styles') || value.startsWith('/api')) {
      return false;
    }
    const path = value.split('?')[0].split('#')[0];
    return !/\.[a-zA-Z0-9]+$/.test(path);
  };

  const resolvedHref = isLocalizableHref(href) ? buildLocalizedPath(href, currentLanguage) : href;

  return (
    <a href={resolvedHref} className={className} {...props}>
      {children}
    </a>
  );
}
