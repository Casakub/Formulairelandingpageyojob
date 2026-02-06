/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const puppeteer = require('puppeteer');

const PORT = process.env.PRERENDER_PORT || 4173;
const HOST = process.env.PRERENDER_HOST || 'http://127.0.0.1';
const BASE_URL = `${HOST}:${PORT}`;
const BUILD_DIR = path.join(process.cwd(), 'build');

const ALL_LANGS = [
  'fr','en','de','es','it','nl','pt','pl','cs','sk','hu','ro','bg','hr','sl','et','lv','lt','el','sv','da','fi','no'
];
const DEVIS_LANGS = [
  'fr','en','de','es','pl','ro','it','pt','nl','bg','hu','cs','sk','hr','sl','et','lt','lv','el','fi','sv','da'
];

const PAGES = [
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

const waitForServer = async (retries = 60) => {
  for (let i = 0; i < retries; i += 1) {
    try {
      const res = await fetch(BASE_URL, { method: 'GET' });
      if (res.ok) return true;
    } catch (err) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
};

const run = async () => {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`Build directory not found: ${BUILD_DIR}. Run \"vite build\" first.`);
  }

  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const preview = spawn(
    npxCmd,
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { stdio: 'inherit' }
  );

  const serverReady = await waitForServer();
  if (!serverReady) {
    preview.kill();
    throw new Error('Vite preview did not start in time.');
  }

  const launchOptions = {
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}
const browser = await puppeteer.launch(launchOptions);
  const routes = [];
  for (const page of PAGES) {
    for (const lang of page.langs) {
      routes.push(localizedRoute(page.path, lang));
    }
  }

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