/**
 * COMPOSANT SEO HEAD
 *
 * Injection automatique des métadonnées SEO (Title, Meta, Schema)
 * Compatible avec le système de traduction i18n
 *
 * @version 3.0.0
 * @updated 2026-02-10
 */

import { useEffect } from 'react';
import { getPageMetadata, getOrganizationSchema, getServiceSchema, getWebSiteSchema, getBreadcrumbSchema, type PageKey } from '../src/i18n/seo/metadata';
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
  page?: never;
  lang?: never;
  includeServiceSchema?: never;
  title?: never;
  description?: never;
}

type SEOHeadProps = SEOHeadPropsNew | SEOHeadPropsOld | SEOHeadPropsCustom;

/** Helper: set or create a meta tag */
function setMeta(selector: string, attr: string, key: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

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
      const { title, description, lang = 'fr', includeServiceSchema = false } = props as SEOHeadPropsCustom;
      metadata = { title, description, h1: title, keywords: [] };
      currentLang = lang;
      shouldIncludeServiceSchema = includeServiceSchema;
    } else if (isNewAPI) {
      const { page, lang = 'fr', includeServiceSchema = false } = props as SEOHeadPropsNew;
      metadata = getPageMetadata(page, lang);
      currentLang = lang;
      shouldIncludeServiceSchema = includeServiceSchema;
    } else {
      const { content, language } = props as SEOHeadPropsOld;
      metadata = {
        title: content?.seo?.metaTitle || content?.meta?.title || 'YOJOB',
        description: content?.seo?.metaDescription || content?.meta?.description || '',
        h1: content?.seo?.h1 || content?.meta?.title || 'YOJOB',
        keywords: []
      };
      currentLang = language as DevisLanguage || 'fr';
      shouldIncludeServiceSchema = false;
    }

    // ========================================================================
    // URL COMPUTATION (needed by canonical, OG, hreflang)
    // ========================================================================
    const baseUrl = 'https://yojob.fr';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const allLangs = getAllLanguageCodes();
    const segments = currentPath.split('/').filter(Boolean);
    const firstSegment = segments[0]?.toLowerCase();
    const hasLangPrefix = firstSegment && allLangs.includes(firstSegment);
    const basePath = hasLangPrefix ? '/' + segments.slice(1).join('/') : currentPath;

    const canonicalHref = currentLang === DEFAULT_LANGUAGE
      ? `${baseUrl}${basePath === '/' ? '' : basePath}`
      : `${baseUrl}/${currentLang}${basePath === '/' ? '' : basePath}`;

    // ========================================================================
    // TITLE
    // ========================================================================
    document.title = metadata.title;

    // ========================================================================
    // META DESCRIPTION
    // ========================================================================
    setMeta('meta[name="description"]', 'name', 'description', metadata.description);

    // ========================================================================
    // META KEYWORDS (optionnel)
    // ========================================================================
    if (metadata.keywords && metadata.keywords.length > 0) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', metadata.keywords.join(', '));
    }

    // ========================================================================
    // OPEN GRAPH
    // ========================================================================
    const ogLocaleMap: Record<string, string> = {
      fr: 'fr_FR', en: 'en_GB', de: 'de_DE', es: 'es_ES', it: 'it_IT',
      nl: 'nl_NL', pt: 'pt_PT', pl: 'pl_PL', ro: 'ro_RO', cs: 'cs_CZ',
      sk: 'sk_SK', hu: 'hu_HU', bg: 'bg_BG', hr: 'hr_HR', sl: 'sl_SI',
      el: 'el_GR', sv: 'sv_SE', da: 'da_DK', fi: 'fi_FI', no: 'nb_NO',
      lt: 'lt_LT', lv: 'lv_LV', et: 'et_EE',
    };

    const ogTags: Record<string, string> = {
      'og:title': metadata.title,
      'og:description': metadata.description,
      'og:type': 'website',
      'og:site_name': 'YOJOB',
      'og:url': canonicalHref || baseUrl,
      'og:image': `${baseUrl}/favicon.svg`,
      'og:locale': ogLocaleMap[currentLang] || 'fr_FR',
    };

    for (const [property, content] of Object.entries(ogTags)) {
      setMeta(`meta[property="${property}"]`, 'property', property, content);
    }

    // ========================================================================
    // TWITTER CARD
    // ========================================================================
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': metadata.title,
      'twitter:description': metadata.description,
      'twitter:image': `${baseUrl}/favicon.svg`,
    };

    for (const [name, content] of Object.entries(twitterTags)) {
      setMeta(`meta[name="${name}"]`, 'name', name, content);
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
    if (shouldIncludeServiceSchema && isNewAPI) {
      let schemaService = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
      if (!schemaService) {
        schemaService = document.createElement('script');
        schemaService.setAttribute('type', 'application/ld+json');
        schemaService.setAttribute('data-schema', 'service');
        document.head.appendChild(schemaService);
      }
      schemaService.textContent = JSON.stringify(getServiceSchema(props.page as PageKey, currentLang), null, 2);
    } else {
      const existingServiceSchema = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
      if (existingServiceSchema) {
        existingServiceSchema.remove();
      }
    }

    // ========================================================================
    // SCHEMA.ORG - BREADCRUMBLIST (toujours présent sauf home)
    // ========================================================================
    if (basePath !== '/') {
      let schemaBreadcrumb = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
      if (!schemaBreadcrumb) {
        schemaBreadcrumb = document.createElement('script');
        schemaBreadcrumb.setAttribute('type', 'application/ld+json');
        schemaBreadcrumb.setAttribute('data-schema', 'breadcrumb');
        document.head.appendChild(schemaBreadcrumb);
      }
      schemaBreadcrumb.textContent = JSON.stringify(getBreadcrumbSchema(basePath, baseUrl), null, 2);
    } else {
      const existingBreadcrumb = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
      if (existingBreadcrumb) existingBreadcrumb.remove();
    }

    // ========================================================================
    // SCHEMA.ORG - WEBSITE + SEARCHACTION (home seulement)
    // ========================================================================
    if (basePath === '/') {
      let schemaWebSite = document.querySelector('script[type="application/ld+json"][data-schema="website"]');
      if (!schemaWebSite) {
        schemaWebSite = document.createElement('script');
        schemaWebSite.setAttribute('type', 'application/ld+json');
        schemaWebSite.setAttribute('data-schema', 'website');
        document.head.appendChild(schemaWebSite);
      }
      schemaWebSite.textContent = JSON.stringify(getWebSiteSchema(baseUrl), null, 2);
    } else {
      const existingWebSite = document.querySelector('script[type="application/ld+json"][data-schema="website"]');
      if (existingWebSite) existingWebSite.remove();
    }

    // ========================================================================
    // LANG ATTRIBUTE sur <html>
    // ========================================================================
    document.documentElement.lang = currentLang;

    // ========================================================================
    // CANONICAL URL
    // ========================================================================
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
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

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

    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', `${baseUrl}${basePath === '/' ? '' : basePath}` || baseUrl);
    document.head.appendChild(xDefaultLink);

    // ========================================================================
    // FAVICON LINKS
    // ========================================================================
    let faviconIco = document.querySelector('link[rel="icon"][type="image/x-icon"]');
    if (!faviconIco) {
      faviconIco = document.createElement('link');
      faviconIco.setAttribute('rel', 'icon');
      faviconIco.setAttribute('type', 'image/x-icon');
      faviconIco.setAttribute('href', '/favicon.ico');
      document.head.appendChild(faviconIco);
    }

    let faviconSvg = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (!faviconSvg) {
      faviconSvg = document.createElement('link');
      faviconSvg.setAttribute('rel', 'icon');
      faviconSvg.setAttribute('type', 'image/svg+xml');
      faviconSvg.setAttribute('href', '/favicon.svg');
      document.head.appendChild(faviconSvg);
    }

    let manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.setAttribute('rel', 'manifest');
      manifest.setAttribute('href', '/site.webmanifest');
      document.head.appendChild(manifest);
    }

    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      themeColor.setAttribute('content', '#1E3A8A');
      document.head.appendChild(themeColor);
    }

    // ========================================================================
    // PRE-RENDERING SIGNAL
    // Signal to Puppeteer prerender script that SEO metadata is ready
    // ========================================================================
    (window as any).__SEO_READY__ = true;

  }, [props]);

  return null;
}

/**
 * Hook personnalisé pour récupérer le H1 SEO-optimisé
 */
export function useSEOH1(page: PageKey, lang: DevisLanguage = 'fr'): string {
  const metadata = getPageMetadata(page, lang);
  return metadata.h1;
}
