/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const puppeteer = require('puppeteer');

const PORT = process.env.PRERENDER_PORT || 4173;
const HOST = process.env.PRERENDER_HOST || '0.0.0.0';
const BASE_URL = `http://127.0.0.1:${PORT}`;
const PREVIEW_DELAY = Number(process.env.PRERENDER_PREVIEW_DELAY || 15000);
const NAV_TIMEOUT = Number(process.env.PRERENDER_NAV_TIMEOUT || 45000);
const SEO_TIMEOUT = Number(process.env.PRERENDER_SEO_TIMEOUT || 15000);
const RETRY_LIMIT = Number(process.env.PRERENDER_RETRY_LIMIT || 1);
const WAIT_UNTIL = process.env.PRERENDER_WAIT_UNTIL || 'domcontentloaded';
const BETWEEN_DELAY = Number(process.env.PRERENDER_BETWEEN_DELAY || 0);
const CONTINUE_ON_ERROR = ['1', 'true', 'yes'].includes(
  String(process.env.PRERENDER_CONTINUE_ON_ERROR || '').toLowerCase()
);
let BUILD_DIR = path.join(process.cwd(), 'build');
if (!fs.existsSync(BUILD_DIR)) {
  const altBuild = path.join(process.cwd(), '..', 'build');
  if (fs.existsSync(altBuild)) BUILD_DIR = altBuild;
}

const ALL_LANGS = [
  'fr','en','de','es','it','nl','pt','pl','cs','sk','hu','ro','bg','hr','sl','et','lv','lt','el','sv','da','fi','no'
];
const DEVIS_LANGS = [
  'fr','en','de','es','pl','ro','it','pt','nl','bg','hu','cs','sk','hr','sl','et','lt','lv','el','fi','sv','da'
];

const ALL_PAGES = [
  { path: '/', langs: ALL_LANGS },
  { path: '/a-propos', langs: ALL_LANGS },
  { path: '/notre-reseau', langs: ALL_LANGS },
  { path: '/nos-secteurs', langs: ALL_LANGS },
  { path: '/temoignages', langs: ALL_LANGS },
  { path: '/services/interim-europeen', langs: ALL_LANGS },
  { path: '/services/recrutement-specialise', langs: ALL_LANGS },
  { path: '/services/conseil-conformite', langs: ALL_LANGS },
  { path: '/services/detachement-personnel', langs: ALL_LANGS },
  { path: '/services/detachement-btp', langs: ['fr'] },
  { path: '/services/detachement-industrie', langs: ['fr'] },
  { path: '/blog/directive-detachement-europe', langs: ['fr'] },
  { path: '/devis', langs: DEVIS_LANGS },
  { path: '/privacy', langs: ALL_LANGS },
  { path: '/legal', langs: ALL_LANGS },
  { path: '/cgv', langs: ALL_LANGS },
];

// Filter pages by PRERENDER_PAGES env var (comma-separated paths)
const filterPages = () => {
  const envPages = process.env.PRERENDER_PAGES;
  if (!envPages) return ALL_PAGES;
  const allowed = envPages.split(',').map((p) => p.trim());
  return ALL_PAGES.filter((page) => allowed.includes(page.path));
};

// Filter langs by PRERENDER_LANGS env var (comma-separated lang codes)
// Special value "NONE" = skip prerender entirely
const filterLangs = (langs) => {
  const envLangs = process.env.PRERENDER_LANGS;
  if (!envLangs) return langs;
  if (envLangs === 'NONE') return [];
  const allowed = envLangs.split(',').map((l) => l.trim());
  return langs.filter((l) => allowed.includes(l));
};

const localizedRoute = (pagePath, lang) => {
  if (lang === 'fr') return pagePath;
  if (pagePath === '/') return `/${lang}`;
  return `/${lang}${pagePath}`;
};

const routeToFilePath = (route) => {
  const normalized = route.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!normalized) return path.join(BUILD_DIR, 'index.html');
  return path.join(BUILD_DIR, normalized, 'index.html');
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isTransientNavigationError = (err) => {
  const msg = String((err && err.message) || err || '');
  return /frame was detached|Navigation failed|Target closed|net::ERR|Protocol error/i.test(msg);
};

const renderRoute = async (browser, route, lang) => {
  const url = `${BASE_URL}${route}`;
  let attempt = 0;

  while (attempt <= RETRY_LIMIT) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(NAV_TIMEOUT);
    page.setDefaultTimeout(NAV_TIMEOUT);

    try {
      // Forcer la locale du navigateur pour que useLanguageManager
      // détecte la bonne langue (évite le fallback vers EN)
      await page.setExtraHTTPHeaders({ 'Accept-Language': `${lang}` });
      await page.evaluateOnNewDocument((langCode) => {
        Object.defineProperty(navigator, 'language', { get: () => langCode });
        Object.defineProperty(navigator, 'languages', { get: () => [langCode] });
      }, lang);

      await page.goto(url, { waitUntil: WAIT_UNTIL, timeout: NAV_TIMEOUT });
      const seoReady = await page.waitForFunction('window.__SEO_READY__ === true', { timeout: SEO_TIMEOUT })
        .then(() => true)
        .catch(() => false);
      if (!seoReady) {
        console.warn(`[prerender] WARNING: __SEO_READY__ not set within ${SEO_TIMEOUT}ms for ${route} (${lang})`);
      }
      const html = await page.content();
      // Validate that the rendered HTML contains essential SEO tags
      const hasTitle = /<title>[^<]{5,}<\/title>/.test(html);
      const hasMeta = /meta\s+name="description"/.test(html);
      if (!hasTitle || !hasMeta) {
        const missing = [];
        if (!hasTitle) missing.push('<title>');
        if (!hasMeta) missing.push('meta[description]');
        console.warn(`[prerender] WARNING: ${route} (${lang}) missing SEO tags: ${missing.join(', ')}`);
      }
      const outputPath = routeToFilePath(route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html, 'utf8');
      const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
      console.log(`[prerender] ${route} (${lang}) -> ${outputPath} (${sizeKB}KB${seoReady ? '' : ' SEO_READY=timeout'})`);
      return true;
    } catch (err) {
      const message = String((err && err.message) || err || 'Unknown error');
      const canRetry = attempt < RETRY_LIMIT && isTransientNavigationError(err);
      const attemptLabel = `${attempt + 1}/${RETRY_LIMIT + 1}`;
      console.warn(`[prerender] Failed attempt ${attemptLabel} for ${route} (${lang}): ${message}`);
      if (!canRetry) throw err;
      await sleep(1000 * (attempt + 1));
    } finally {
      await page.close().catch(() => {});
    }

    attempt += 1;
  }

  return false;
};

const run = async () => {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`Build directory not found: ${BUILD_DIR}. Run \"vite build\" first.`);
  }

  const pages = filterPages();
  const routes = [];
  for (const pageEntry of pages) {
    for (const lang of filterLangs(pageEntry.langs)) {
      routes.push({ route: localizedRoute(pageEntry.path, lang), lang });
    }
  }

  console.log(`[prerender] ${routes.length} routes to render`);
  if (process.env.PRERENDER_LANGS) console.log(`[prerender] Langs filter: ${process.env.PRERENDER_LANGS}`);
  if (process.env.PRERENDER_PAGES) console.log(`[prerender] Pages filter: ${process.env.PRERENDER_PAGES}`);

  if (routes.length === 0) {
    console.log('[prerender] No routes to render, skipping.');
    return;
  }

  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const preview = spawn(
    npxCmd,
    ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', HOST],
    { stdio: 'inherit' }
  );

  console.log(`[prerender] Waiting ${PREVIEW_DELAY}ms for Vite preview to be ready...`);
  await sleep(PREVIEW_DELAY);

  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  let browser;
  const failures = [];

  try {
    browser = await puppeteer.launch(launchOptions);
    for (const { route, lang } of routes) {
      try {
        await renderRoute(browser, route, lang);
      } catch (err) {
        failures.push({ route, lang, err });
        if (!CONTINUE_ON_ERROR) throw err;
      }

      if (BETWEEN_DELAY > 0) {
        await sleep(BETWEEN_DELAY);
      }
    }
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    preview.kill('SIGTERM');
  }

  if (failures.length > 0) {
    console.warn(`[prerender] ${failures.length} route(s) failed.`);
    failures.forEach(({ route, lang, err }) => {
      const message = String((err && err.message) || err || 'Unknown error');
      console.warn(`[prerender] Failed route: ${route} (${lang}) -> ${message}`);
    });

    if (!CONTINUE_ON_ERROR) {
      throw new Error(`[prerender] ${failures.length} route(s) failed.`);
    }
  }
};

run().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});