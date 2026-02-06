/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const puppeteer = require('puppeteer');

const PORT = process.env.PRERENDER_PORT || 4173;
const HOST = process.env.PRERENDER_HOST || '0.0.0.0';
const BASE_URL = `http://127.0.0.1:${PORT}`;
const PREVIEW_DELAY = Number(process.env.PRERENDER_PREVIEW_DELAY || 15000);
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
const filterLangs = (langs) => {
  const envLangs = process.env.PRERENDER_LANGS;
  if (!envLangs) return langs;
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

const run = async () => {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`Build directory not found: ${BUILD_DIR}. Run \"vite build\" first.`);
  }

  const pages = filterPages();
  const routes = [];
  for (const page of pages) {
    for (const lang of filterLangs(page.langs)) {
      routes.push(localizedRoute(page.path, lang));
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
  await new Promise((r) => setTimeout(r, PREVIEW_DELAY));

  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const browser = await puppeteer.launch(launchOptions);

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForFunction('window.__SEO_READY__ === true', { timeout: 15000 }).catch(() => {});
    const html = await page.content();
    const outputPath = routeToFilePath(route);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf8');
    await page.close();
    console.log(`[prerender] ${route} -> ${outputPath}`);
  }

  await browser.close();
  preview.kill('SIGTERM');
};

run().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
