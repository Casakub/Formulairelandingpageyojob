const MATOMO_TAG_MANAGER_URL = (import.meta.env.VITE_MATOMO_TAG_MANAGER_URL || '').trim();
const MTM_SCRIPT_ATTR = 'data-yojob-mtm';

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function loadScript(src: string, attr: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.setAttribute(attr, 'true');
  document.head.appendChild(script);
}

function initMatomoTagManager(containerUrl: string) {
  if (!containerUrl || document.querySelector(`script[${MTM_SCRIPT_ATTR}]`)) {
    return;
  }

  window._mtm = window._mtm || [];
  window._mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });

  loadScript(containerUrl, MTM_SCRIPT_ATTR);
}

export function initAnalytics() {
  if (!isBrowser()) {
    return;
  }

  if (MATOMO_TAG_MANAGER_URL) {
    initMatomoTagManager(MATOMO_TAG_MANAGER_URL);
  }
}

export function getAnalyticsConfig() {
  return {
    matomoTagManagerUrl: MATOMO_TAG_MANAGER_URL,
  };
}

declare global {
  interface Window {
    _mtm?: Array<Record<string, unknown>>;
  }
}
