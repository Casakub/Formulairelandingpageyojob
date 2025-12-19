import React from 'react';

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
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
