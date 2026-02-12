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
const AUTO_BLOG_DISCOVERY = ['1', 'true', 'yes'].includes(
  String(process.env.PRERENDER_AUTO_BLOG_DISCOVERY || 'true').toLowerCase()
);
const BLOG_DISCOVERY_LIMIT = Number(process.env.PRERENDER_BLOG_DISCOVERY_LIMIT || 200);
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
const BLOG_LANGS = ['fr']; // adapte si blog multilingue

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

  // Blog index toujours présent
  { path: '/blog', langs: BLOG_LANGS },

  // Legacy / pages fixes utiles
  { path: '/blog/directive-detachement-europe', langs: BLOG_LANGS },

  { path: '/devis', langs: DEVIS_LANGS },
  { path: '/privacy', langs: ALL_LANGS },
  { path: '/legal', langs: ALL_LANGS },
  { path: '/cgv', langs: ALL_LANGS },
];

// Optionnel : slugs injectés via env
// PRERENDER_BLOG_SLUGS="slug-1,slug-2"
const getBlogPagesFromEnv = () => {
  const raw = process.env.PRERENDER_BLOG_SLUGS;
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((slug) => ({
      path: `/blog/${slug.replace(/^\/+/, '').replace(/^blog\//, '')}`,
      langs: BLOG_LANGS,
    }));
};

const filterPages = (pages) => {
  const envPages = process.env.PRERENDER_PAGES;
  if (!envPages) return pages;
  const allowed = envPages.split(',').map((p) => p.trim()).filter(Boolean);
  return pages.filter((page) => allowed.includes(page.path));
};

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

const discoverBlogRoutes = async (browser, lang = 'fr') => {
  const route = localizedRoute('/blog', lang);
  const url = `${BASE_URL}${route}`;
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(NAV_TIMEOUT);
  page.setDefaultTimeout(NAV_TIMEOUT);

  try {
    await page.setExtraHTTPHeaders({ 'Accept-Language': `${lang}` });
    await page.evaluateOnNewDocument((langCode) => {
      Object.defineProperty(navigator, 'language', { get: () => langCode });
      Object.defineProperty(navigator, 'languages', { get: () => [langCode] });
    }, lang);

    await page.goto(url, { waitUntil: WAIT_UNTIL, timeout: NAV_TIMEOUT });

    // Petit délai pour laisser les cards se charger (si fetch async)
    await page.waitForTimeout(1500);

    const links = await page.$$eval('a[href]', (anchors) =>
      anchors.map((a) => a.getAttribute('href') || '').filter(Boolean)
    );

    const found = new Set();
    for (const href of links) {
      // Support liens absolus + relatifs
      let pathOnly = href;
      try {
        const u = new URL(href, 'http://dummy.local');
        pathOnly = u.pathname;
      } catch (_) {}

      // Normalisation trailing slash
      pathOnly = pathOnly.replace(/\/+$/, '') || '/';

      // Routes blog article (évite /blog et /blog/directive... si tu veux conserver)
      if (/^\/blog\/[^/]+$/.test(pathOnly)) {
        found.add(pathOnly);
      }

      // Si blog multilingue activé plus tard : /en/blog/slug etc.
      if (/^\/[a-z]{2}\/blog\/[^/]+$/.test(pathOnly)) {
        found.add(pathOnly);
      }
    }

    const routes = Array.from(found).slice(0, BLOG_DISCOVERY_LIMIT);
    console.log(`[prerender] Blog discovery: ${routes.length} article route(s) found from ${route}`);
    routes.forEach((r) => console.log(`[prerender]   + ${r}`));

    return routes;
  } finally {
    await page.close().catch(() => {});
  }
};

const renderRoute = async (browser, route, lang) => {
  const url = `${BASE_URL}${route}`;
  let attempt = 0;

  while (attempt <= RETRY_LIMIT) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(NAV_TIMEOUT);
    page.setDefaultTimeout(NAV_TIMEOUT);

    try {
      await page.setExtraHTTPHeaders({ 'Accept-Language': `${lang}` });
      await page.evaluateOnNewDocument((langCode) => {
        Object.defineProperty(navigator, 'language', { get: () => langCode });
        Object.defineProperty(navigator, 'languages', { get: () => [langCode] });
      }, lang);

      await page.goto(url, { waitUntil: WAIT_UNTIL, timeout: NAV_TIMEOUT });

      const seoReady = await page
        .waitForFunction('window.__SEO_READY__ === true', { timeout: SEO_TIMEOUT })
        .then(() => true)
        .catch(() => false);

      if (!seoReady) {
        console.warn(`[prerender] WARNING: __SEO_READY__ not set within ${SEO_TIMEOUT}ms for ${route} (${lang})`);
      }

      const html = await page.content();

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
    throw new Error(`Build directory not found: ${BUILD_DIR}. Run "vite build" first.`);
  }

  const mergedPages = [...ALL_PAGES, ...getBlogPagesFromEnv()];
  const filteredPages = filterPages(mergedPages);

  const staticRoutes = [];
  for (const pageEntry of filteredPages) {
    for (const lang of filterLangs(pageEntry.langs)) {
      staticRoutes.push({ route: localizedRoute(pageEntry.path, lang), lang });
    }
  }

  console.log(`[prerender] ${staticRoutes.length} static route(s) to render`);
  if (process.env.PRERENDER_LANGS) console.log(`[prerender] Langs filter: ${process.env.PRERENDER_LANGS}`);
  if (process.env.PRERENDER_PAGES) console.log(`[prerender] Pages filter: ${process.env.PRERENDER_PAGES}`);

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

    // 1) Render statique
    for (const { route, lang } of staticRoutes) {
      try {
        await renderRoute(browser, route, lang);
      } catch (err) {
        failures.push({ route, lang, err });
        if (!CONTINUE_ON_ERROR) throw err;
      }
      if (BETWEEN_DELAY > 0) await sleep(BETWEEN_DELAY);
    }

    // 2) Auto-discovery blog
    if (AUTO_BLOG_DISCOVERY) {
      const blogLangs = filterLangs(BLOG_LANGS);
      const discovered = [];

      for (const lang of blogLangs) {
        try {
          const routes = await discoverBlogRoutes(browser, lang);
          for (const r of routes) discovered.push({ route: r, lang });
        } catch (err) {
          const message = String((err && err.message) || err || 'Unknown error');
          console.warn(`[prerender] Blog discovery failed for lang=${lang}: ${message}`);
          if (!CONTINUE_ON_ERROR) throw err;
        }
      }

      // unique + retire déjà rendues
      const already = new Set(staticRoutes.map((r) => r.route));
      const uniqueDiscovered = [];
      const seen = new Set();

      for (const item of discovered) {
        if (already.has(item.route)) continue;
        if (seen.has(item.route)) continue;
        seen.add(item.route);
        uniqueDiscovered.push(item);
      }

      console.log(`[prerender] ${uniqueDiscovered.length} discovered blog route(s) to render`);

      for (const { route, lang } of uniqueDiscovered) {
        try {
          await renderRoute(browser, route, lang);
        } catch (err) {
          failures.push({ route, lang, err });
          if (!CONTINUE_ON_ERROR) throw err;
        }
        if (BETWEEN_DELAY > 0) await sleep(BETWEEN_DELAY);
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
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