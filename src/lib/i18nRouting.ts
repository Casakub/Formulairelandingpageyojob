import { getAllLanguageCodes } from './languages';

export const DEFAULT_LANGUAGE = 'fr';

export function normalizePathname(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

export function splitPathByLang(pathname: string): {
  lang: string;
  hasLangPrefix: boolean;
  restPath: string;
} {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) {
    return { lang: DEFAULT_LANGUAGE, hasLangPrefix: false, restPath: '/' };
  }

  const maybeLang = segments[0].toLowerCase();
  const supported = getAllLanguageCodes();
  if (supported.includes(maybeLang)) {
    const restSegments = segments.slice(1);
    const restPath = restSegments.length ? `/${restSegments.join('/')}` : '/';
    return { lang: maybeLang, hasLangPrefix: true, restPath };
  }

  return { lang: DEFAULT_LANGUAGE, hasLangPrefix: false, restPath: normalized };
}

export function stripLangPrefix(pathname: string): string {
  return splitPathByLang(pathname).restPath;
}

export function buildLocalizedPath(pathname: string, lang: string): string {
  const { restPath } = splitPathByLang(pathname);
  const normalizedLang = (lang || DEFAULT_LANGUAGE).toLowerCase();
  if (normalizedLang === DEFAULT_LANGUAGE) {
    return restPath;
  }
  return `/${normalizedLang}${restPath === '/' ? '' : restPath}`;
}

export function isSupportedLanguage(code: string): boolean {
  return getAllLanguageCodes().includes(code);
}
