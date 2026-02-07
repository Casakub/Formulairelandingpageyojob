/**
 * 🎯 COMPOSANT SEO HEAD
 * 
 * Injection automatique des métadonnées SEO (Title, Meta, Schema)
 * Compatible avec le système de traduction i18n
 * 
 * @version 2.0.0
 * @created 2025-01-05
 */

import { useEffect } from 'react';
import { getPageMetadata, getOrganizationSchema, getServiceSchema, type PageKey } from '../src/i18n/seo/metadata';
import type { DevisLanguage } from '../src/i18n/devis/types';
import { getAllLanguageCodes } from '../lib/languages';
import { DEFAULT_LANGUAGE } from '../lib/i18nRouting';

// ============================================================================
// NOUVELLE API (pour formulaire devis et nouvelles pages)
// ============================================================================
interface SEOHeadPropsNew {
  page: PageKey;
  lang?: DevisLanguage;
  includeServiceSchema?: boolean;
  availableLanguages?: DevisLanguage[];
  // Marquer les anciennes props comme optionnelles pour compatibilité
  content?: never;
  language?: never;
  allContent?: never;
  title?: never;
  description?: never;
}

// ============================================================================ 
// API PERSONNALISÉE (title/description simples)
// ============================================================================
interface SEOHeadPropsCustom {
  title: string;
  description: string;
  lang?: DevisLanguage;
  includeServiceSchema?: boolean;
  availableLanguages?: DevisLanguage[];
  page?: never;
  content?: never;
  language?: never;
  allContent?: never;
}

// ============================================================================
// ANCIENNE API (pour compatibilité avec App-Landing)
// ============================================================================
interface SEOHeadPropsOld {
  content: any;
  language: string;
  allContent?: any;
  availableLanguages?: DevisLanguage[];
  // Marquer les nouvelles props comme optionnelles
  page?: never;
  lang?: never;
  includeServiceSchema?: never;
  title?: never;
  description?: never;
}

type SEOHeadProps = SEOHeadPropsNew | SEOHeadPropsOld | SEOHeadPropsCustom;

/**
 * Composant pour injecter les métadonnées SEO dans le <head>
 * Support de l'ancienne et nouvelle API pour rétrocompatibilité
 */
export function SEOHead(props: SEOHeadProps) {
  
  useEffect(() => {
    // Détecter quelle API est utilisée
    const isCustomAPI = 'title' in props && 'description' in props;
    const isNewAPI = 'page' in props && props.page !== undefined;
    
    let metadata: { title: string; description: string; h1: string; keywords?: string[] };
    let currentLang: DevisLanguage = 'fr';
    let shouldIncludeServiceSchema = false;
    
    if (isCustomAPI) {
      // API PERSONNALISÉE (title/description)
      const { title, description, lang = 'fr', includeServiceSchema = false } = props as SEOHeadPropsCustom;
      metadata = {
        title,
        description,
        h1: title,
        keywords: []
      };
      currentLang = lang;
      shouldIncludeServiceSchema = includeServiceSchema;
    } else if (isNewAPI) {
      // NOUVELLE API
      const { page, lang = 'fr', includeServiceSchema = false } = props as SEOHeadPropsNew;
      metadata = getPageMetadata(page, lang);
      currentLang = lang;
      shouldIncludeServiceSchema = includeServiceSchema;
    } else {
      // ANCIENNE API (compatibilité App-Landing)
      const { content, language } = props as SEOHeadPropsOld;
      metadata = {
        title: content?.seo?.metaTitle || content?.meta?.title || 'YOJOB',
        description: content?.seo?.metaDescription || content?.meta?.description || '',
        h1: content?.seo?.h1 || content?.meta?.title || 'YOJOB',
        keywords: []
      };
      currentLang = language as DevisLanguage || 'fr';
      shouldIncludeServiceSchema = false; // Pas de schéma service pour l'ancienne API
    }
    
    // ========================================================================
    // TITLE
    // ========================================================================
    document.title = metadata.title;
    
    // ========================================================================
    // META DESCRIPTION
    // ========================================================================
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metadata.description);
    
    // ========================================================================
    // META KEYWORDS (optionnel)
    // ========================================================================
    if (metadata.keywords && metadata.keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', metadata.keywords.join(', '));
    }
    
    // ========================================================================
    // OPEN GRAPH (pour réseaux sociaux)
    // ========================================================================
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', metadata.title);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', metadata.description);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }
    
    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }
    
    // ========================================================================
    // TWITTER CARD
    // ========================================================================
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCard);
    }
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    twitterTitle.setAttribute('content', metadata.title);
    if (!document.querySelector('meta[name="twitter:title"]')) {
      document.head.appendChild(twitterTitle);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    twitterDescription.setAttribute('content', metadata.description);
    if (!document.querySelector('meta[name="twitter:description"]')) {
      document.head.appendChild(twitterDescription);
    }
    
    // ========================================================================
    // SCHEMA.ORG - ORGANIZATION (toujours présent)
    // ========================================================================
    let schemaOrg = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    if (!schemaOrg) {
      schemaOrg = document.createElement('script');
      schemaOrg.setAttribute('type', 'application/ld+json');
      schemaOrg.setAttribute('data-schema', 'organization');
      document.head.appendChild(schemaOrg);
    }
    const schemaBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yojob.fr';
    schemaOrg.textContent = JSON.stringify(getOrganizationSchema(schemaBaseUrl), null, 2);
    
    // ========================================================================
    // SCHEMA.ORG - SERVICE (conditionnel)
    // ========================================================================
    if (shouldIncludeServiceSchema) {
      let schemaService = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
      if (!schemaService) {
        schemaService = document.createElement('script');
        schemaService.setAttribute('type', 'application/ld+json');
        schemaService.setAttribute('data-schema', 'service');
        document.head.appendChild(schemaService);
      }
      schemaService.textContent = JSON.stringify(getServiceSchema(props.page as PageKey, currentLang), null, 2);
    } else {
      // Supprimer le schéma Service s'il existe mais qu'on ne le veut plus
      const existingServiceSchema = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
      if (existingServiceSchema) {
        existingServiceSchema.remove();
      }
    }
    
    // ========================================================================
    // LANG ATTRIBUTE sur <html>
    // ========================================================================
    document.documentElement.lang = currentLang;

    // ========================================================================
    // CANONICAL URL
    // ========================================================================
    const baseUrl = 'https://yojob.fr';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    // Retirer le prefixe de langue pour obtenir le chemin de base
    const allLangs = getAllLanguageCodes();
    const segments = currentPath.split('/').filter(Boolean);
    const firstSegment = segments[0]?.toLowerCase();
    const hasLangPrefix = firstSegment && allLangs.includes(firstSegment);
    const basePath = hasLangPrefix ? '/' + segments.slice(1).join('/') : currentPath;

    const canonicalHref = currentLang === DEFAULT_LANGUAGE
      ? `${baseUrl}${basePath === '/' ? '' : basePath}`
      : `${baseUrl}/${currentLang}${basePath === '/' ? '' : basePath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref || baseUrl);

    // ========================================================================
    // HREFLANG ALTERNATE LINKS
    // ========================================================================
    // Supprimer les anciens hreflang
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Ajouter un hreflang pour chaque langue supportee
    for (const lang of allLangs) {
      const href = lang === DEFAULT_LANGUAGE
        ? `${baseUrl}${basePath === '/' ? '' : basePath}`
        : `${baseUrl}/${lang}${basePath === '/' ? '' : basePath}`;

      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href || baseUrl);
      document.head.appendChild(link);
    }

    // x-default pointe vers la version francaise (langue par defaut)
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', `${baseUrl}${basePath === '/' ? '' : basePath}` || baseUrl);
    document.head.appendChild(xDefaultLink);
    
    // ========================================================================
    // FAVICON LINKS
    // ========================================================================
    // Favicon ICO (fallback)
    let faviconIco = document.querySelector('link[rel="icon"][type="image/x-icon"]');
    if (!faviconIco) {
      faviconIco = document.createElement('link');
      faviconIco.setAttribute('rel', 'icon');
      faviconIco.setAttribute('type', 'image/x-icon');
      faviconIco.setAttribute('href', '/favicon.ico');
      document.head.appendChild(faviconIco);
    }
    
    // Favicon SVG (modern browsers - prioritaire)
    let faviconSvg = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (!faviconSvg) {
      faviconSvg = document.createElement('link');
      faviconSvg.setAttribute('rel', 'icon');
      faviconSvg.setAttribute('type', 'image/svg+xml');
      faviconSvg.setAttribute('href', '/favicon.svg');
      document.head.appendChild(faviconSvg);
    }
    
    // Web Manifest
    let manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.setAttribute('rel', 'manifest');
      manifest.setAttribute('href', '/site.webmanifest');
      document.head.appendChild(manifest);
    }
    
    // Theme Color (pour mobile)
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      themeColor.setAttribute('content', '#1E3A8A');
      document.head.appendChild(themeColor);
    }
    
  }, [props]);
  
  // Ce composant n'affiche rien visuellement
  return null;
}

/**
 * Hook personnalisé pour récupérer le H1 SEO-optimisé
 */
export function useSEOH1(page: PageKey, lang: DevisLanguage = 'fr'): string {
  const metadata = getPageMetadata(page, lang);
  return metadata.h1;
}
