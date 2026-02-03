/**
 * 🎨 GÉNÉRATEUR PDF MODERNE - VERSION 5.0
 * 
 * Design complet aligné sur le dashboard avec les champs essentiels
 * - Sections structurées (emetteur, client, mission, profils, conditions)
 * - Totaux HT/TVA/TTC + cout total mission
 * - Mentions legales et RGPD en 2 colonnes
 * - Certificat de signature avec IP masquee
 */

import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, PDFImage } from "npm:pdf-lib@1.17.1";
import { YOJOB_LOGO_BASE64 } from './yojob-logo-base64.ts';
import { formatDelaiPaiementLabel } from './devis-payload.ts';

// ========================================
// 🎨 TYPES ET CONSTANTES
// ========================================

/**
 * ⚠️ DISPLAY-ONLY MODULE
 * Ce générateur est purement un affichage. Toutes les valeurs (pricing, totals,
 * majorations, heures) doivent provenir du payload canonique (payload.pricing).
 * Aucun fallback hardcodé, aucun recalcul ici.
 */

interface PDFColors {
  violet: ReturnType<typeof rgb>;
  cyan: ReturnType<typeof rgb>;
  blue: ReturnType<typeof rgb>;
  green: ReturnType<typeof rgb>;
  emerald: ReturnType<typeof rgb>;
  orange: ReturnType<typeof rgb>;
  pink: ReturnType<typeof rgb>;
  navy: ReturnType<typeof rgb>;
  darkBlue: ReturnType<typeof rgb>;
  gray: ReturnType<typeof rgb>;
  lightGray: ReturnType<typeof rgb>;
  white: ReturnType<typeof rgb>;
  background: ReturnType<typeof rgb>;
  black: ReturnType<typeof rgb>;
}

interface PDFConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  headerHeight: number;
  footerHeight: number;
  contentWidth: number;
}

// ========================================
// 🎨 DESIGN TOKENS (dashboard-like)
// ========================================

const DESIGN_TOKENS = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  // Font sizes
  fontSize: {
    xs: 7,
    sm: 8,
    md: 9,
    lg: 10,
    xl: 12,
    xxl: 14,
  },
  // Border radius (simulated via rectangles)
  radius: {
    sm: 2,
    md: 4,
    lg: 8,
  },
  // Card styles
  card: {
    padding: 12,
    borderWidth: 1,
  },
} as const;

// ========================================
// 🛠️ UTILITAIRES DE CONVERSION
// ========================================

const PDF_SANITIZE_SPACES = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;
const WIN_ANSI_EXTRA_CODES = new Set([
  0x20AC, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6,
  0x2030, 0x0160, 0x2039, 0x0152, 0x017D, 0x2018, 0x2019, 0x201C,
  0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A,
  0x0153, 0x017E, 0x0178,
]);

const isWinAnsiCodePoint = (code: number) => {
  if (code === 0x0A || code === 0x0D || code === 0x09) return true;
  if (code >= 0x20 && code <= 0x7E) return true;
  if (code >= 0xA0 && code <= 0xFF) return true;
  return WIN_ANSI_EXTRA_CODES.has(code);
};

const toPdfText = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  const normalized = String(value)
    .replace(PDF_SANITIZE_SPACES, ' ')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\\t/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  let out = '';
  for (const char of normalized) {
    const code = char.codePointAt(0);
    if (code && isWinAnsiCodePoint(code)) {
      out += char;
    } else {
      out += '?';
    }
  }
  return out;
};

const formatDateForPdf = (dateInput?: string): string => {
  if (!dateInput) return 'Non renseign\u00e9e';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return 'Non renseign\u00e9e';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatDateTimeForPdf = (dateInput?: string): string => {
  if (!dateInput) return 'Non renseign\u00e9e';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return 'Non renseign\u00e9e';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (value?: number): string => {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return '-';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(number);
};

const getTextValue = (value: any): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    return value.Français || value.fr || value.French || value.label || Object.values(value)[0] || '';
  }
  return String(value);
};

const readEnv = (key: string): string | undefined => {
  try {
    const denoEnv = (globalThis as any)?.Deno?.env;
    if (denoEnv?.get) {
      return denoEnv.get(key) ?? undefined;
    }
  } catch (_) {
    // ignore
  }
  return undefined;
};

// Valeurs par défaut YOJOB (utilisées si variables d'environnement non définies)
const YOJOB_DEFAULTS = {
  name: 'YOJOB',
  legalForm: 'EI',
  siret: '44786276400035',
  siren: '447862764',
  rcs: 'Bordeaux B 447 862 764',
  vatNumber: 'FR79447862764',
  address: '108 Avenue de Montesquieu, 33160 Saint-M\u00e9dard-en-Jalles, France',
  capital: '10 000 \u20ac',
  email: 'contact@yojob.fr',
  phone: '+33 6 50 62 25 24',
  website: 'https://www.yojob.fr',
  privacyUrl: 'https://www.yojob.fr/politique-confidentialite',
  cgvUrl: 'https://www.yojob.fr/cgv',
  createdAt: '01 avril 2003',
} as const;

const getIssuerInfo = () => ({
  name: readEnv('YOJOB_LEGAL_NAME') || YOJOB_DEFAULTS.name,
  legalForm: readEnv('YOJOB_LEGAL_FORM') || YOJOB_DEFAULTS.legalForm,
  siret: readEnv('YOJOB_SIRET') || YOJOB_DEFAULTS.siret,
  rcs: readEnv('YOJOB_RCS') || YOJOB_DEFAULTS.rcs,
  vatNumber: readEnv('YOJOB_VAT_NUMBER') || YOJOB_DEFAULTS.vatNumber,
  address: readEnv('YOJOB_ADDRESS') || YOJOB_DEFAULTS.address,
  capital: readEnv('YOJOB_CAPITAL') || YOJOB_DEFAULTS.capital,
  email: readEnv('YOJOB_EMAIL') || YOJOB_DEFAULTS.email,
  phone: readEnv('YOJOB_PHONE') || YOJOB_DEFAULTS.phone,
  website: readEnv('YOJOB_WEBSITE') || YOJOB_DEFAULTS.website,
  privacyUrl: readEnv('YOJOB_PRIVACY_URL') || YOJOB_DEFAULTS.privacyUrl,
  rgpdEmail: readEnv('YOJOB_RGPD_EMAIL') || readEnv('YOJOB_EMAIL') || YOJOB_DEFAULTS.email,
  cgvUrl: readEnv('YOJOB_CGV_URL') || YOJOB_DEFAULTS.cgvUrl,
});

const getValidityDays = () => {
  const raw = readEnv('DEVIS_VALIDITY_DAYS');
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 30;
};

const stripIpPort = (value: string) => {
  const bracketMatch = value.match(/^\[(.+)](?::\d+)?$/);
  if (bracketMatch?.[1]) return bracketMatch[1];
  if (value.includes('.') && /:\d+$/.test(value)) {
    return value.replace(/:\d+$/, '');
  }
  return value;
};

const maskSingleIp = (ip: string): string => {
  const cleaned = stripIpPort(ip.trim());
  if (!cleaned) return '';
  if (cleaned.includes('.')) {
    const parts = cleaned.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }
  if (cleaned.includes(':')) {
    const parts = cleaned.split(':').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:xxxx:xxxx`;
    }
  }
  return cleaned;
};

const maskIpAddress = (ip?: string): string => {
  if (!ip) return '-';
  const parts = ip
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value && value.toLowerCase() !== 'unknown');
  if (!parts.length) return '-';
  const masked = parts.map(maskSingleIp).filter(Boolean);
  const unique = Array.from(new Set(masked));
  return unique.join(', ');
};

const formatPercent = (value?: number) => {
  if (!Number.isFinite(value)) return '-';
  const sign = value && value > 0 ? '+' : '';
  return `${sign}${Math.round((value || 0) * 100)}%`;
};

// ========================================
// 🎨 FONCTIONS DE DESSIN
// ========================================

function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const safeText = toPdfText(text);
  if (!safeText) return [];
  
  const lines: string[] = [];
  const paragraphs = safeText.split('\n');

  paragraphs.forEach((paragraph, index) => {
    if (!paragraph.trim()) {
      lines.push('');
      return;
    }

    const words = paragraph.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    if (index < paragraphs.length - 1) {
      lines.push('');
    }
  });

  return lines;
}

function drawHeader(
  page: PDFPage,
  config: PDFConfig,
  colors: PDFColors,
  fonts: { regular: PDFFont; bold: PDFFont },
  logo: PDFImage | null,
  devisData: {
    numero: string;
    isSigned: boolean;
    createdAt: string;
  }
) {
  const { pageWidth, pageHeight } = config;
  const headerHeight = 70;

  // Background dark bleu-cyan (éclairci)
  page.drawRectangle({
    x: 0,
    y: pageHeight - headerHeight,
    width: pageWidth,
    height: headerHeight,
    color: rgb(0.11, 0.16, 0.32), // Bleu foncé légèrement éclairci
  });

  // Logo YOJOB réel (si disponible)
  if (logo) {
    try {
      // Calculer les dimensions avec le bon ratio d'aspect
      const logoOriginalWidth = logo.width;
      const logoOriginalHeight = logo.height;
      const logoRatio = logoOriginalWidth / logoOriginalHeight;
      
      // Hauteur fixe de 40px, largeur calculée selon le ratio
      const logoHeight = 40;
      const logoWidth = logoHeight * logoRatio;
      
      page.drawImage(logo, {
        x: 40,
        y: pageHeight - 55,
        width: logoWidth,
        height: logoHeight,
      });
    } catch (error) {
      console.error('Erreur dessin logo:', error);
      // Fallback sur texte si l'image échoue
      page.drawText('YOJOB', {
        x: 40,
        y: pageHeight - 35,
        size: 24,
        font: fonts.bold,
        color: colors.cyan,
      });
    }
  } else {
    // Fallback : Logo stylisé simplifié avec cercle si pas d'image
    page.drawCircle({
      x: 60,
      y: pageHeight - 35,
      size: 30,
      color: rgb(0.15, 0.20, 0.35),
      borderColor: colors.cyan,
      borderWidth: 2,
    });

    page.drawText('YJ', {
      x: 48,
      y: pageHeight - 40,
      size: 20,
      font: fonts.bold,
      color: colors.cyan,
    });
    
    page.drawText('YO', {
      x: 100,
      y: pageHeight - 32,
      size: 24,
      font: fonts.bold,
      color: colors.white,
    });
    
    page.drawText('JOB', {
      x: 140,
      y: pageHeight - 32,
      size: 24,
      font: fonts.bold,
      color: colors.cyan,
    });

    page.drawText('Courtage en recrutement europ\u00e9en', {
      x: 100,
      y: pageHeight - 48,
      size: 8,
      font: fonts.regular,
      color: rgb(0.7, 0.7, 0.7),
    });
  }

  // Numéro de devis
  const devisLabel = toPdfText(`DEVIS ${devisData.numero}`);
  const devisWidth = fonts.bold.widthOfTextAtSize(devisLabel, 14);
  
  page.drawText(devisLabel, {
    x: pageWidth - devisWidth - 30,
    y: pageHeight - 30,
    size: 14,
    font: fonts.bold,
    color: colors.white,
  });

  // Badge statut
  const badgeText = devisData.isSigned ? 'SIGN\u00c9' : 'EN ATTENTE';
  const badgeColor = devisData.isSigned ? colors.green : rgb(0.95, 0.55, 0.15);
  const badgeWidth = fonts.bold.widthOfTextAtSize(badgeText, 8) + 16;
  
  page.drawRectangle({
    x: pageWidth - badgeWidth - 30,
    y: pageHeight - 50,
    width: badgeWidth,
    height: 16,
    color: badgeColor,
  });

  page.drawText(badgeText, {
    x: pageWidth - badgeWidth - 22,
    y: pageHeight - 45,
    size: 8,
    font: fonts.bold,
    color: colors.white,
  });

  // Date de création
  page.drawText(`Cr\u00e9\u00e9 le: ${formatDateTimeForPdf(devisData.createdAt)}`, {
    x: 30,
    y: pageHeight - headerHeight - 14,
    size: 8,
    font: fonts.regular,
    color: colors.gray,
  });
}

function drawFooter(
  page: PDFPage,
  config: PDFConfig,
  colors: PDFColors,
  font: PDFFont,
  pageNumber: number,
  totalPages: number,
  footerText: string
) {
  const footerY = 24;

  // Ligne séparatrice
  page.drawLine({
    start: { x: config.margin, y: footerY + 16 },
    end: { x: config.pageWidth - config.margin, y: footerY + 16 },
    thickness: 0.5,
    color: colors.lightGray,
  });

  // Texte footer
  if (footerText) {
    page.drawText(footerText, {
      x: config.margin,
      y: footerY,
      size: 7,
      font,
      color: colors.gray,
    });
  }

  // Pagination
  const pageText = toPdfText(`Page ${pageNumber} / ${totalPages}`);
  const pageWidth = font.widthOfTextAtSize(pageText, 7);
  
  page.drawText(pageText, {
    x: config.pageWidth - config.margin - pageWidth,
    y: footerY,
    size: 7,
    font,
    color: colors.gray,
  });
}

function drawSectionHeader(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  title: string,
  icon: string,
  bgColor: ReturnType<typeof rgb>,
  colors: PDFColors,
  fonts: { regular: PDFFont; bold: PDFFont }
): number {
  // Rectangle de fond
  page.drawRectangle({
    x,
    y: y - 30,
    width,
    height: 30,
    color: bgColor,
  });

  // Titre
  page.drawText(toPdfText(title), {
    x: x + 12,
    y: y - 18,
    size: 10,
    font: fonts.bold,
    color: colors.navy,
  });

  // Bordure inférieure
  page.drawLine({
    start: { x, y: y - 30 },
    end: { x: x + width, y: y - 30 },
    thickness: 3,
    color: rgb(bgColor.red * 0.6, bgColor.green * 0.6, bgColor.blue * 0.6),
  });

  return y - 38; // Position Y pour le contenu
}

function drawKeyValue(
  page: PDFPage,
  x: number,
  y: number,
  label: string,
  value: string,
  colors: PDFColors,
  fonts: { regular: PDFFont; bold: PDFFont },
  maxWidth?: number
): number {
  if (!value) return 0;

  const safeLabel = toPdfText(label);
  const safeValue = toPdfText(value);

  // Label en gris
  page.drawText(safeLabel, {
    x,
    y,
    size: 8,
    font: fonts.bold,
    color: colors.gray,
  }); 

  // Valeur (avec wrap si nécessaire)
  if (maxWidth) {
    const lines = wrapText(safeValue, fonts.regular, 9, maxWidth);
    let currentY = y - 12;
    
    lines.forEach((line) => {
      page.drawText(line, {
        x,
        y: currentY,
        size: 9,
        font: fonts.regular,
        color: colors.navy,
      });
      currentY -= 11;
    });
    
    return lines.length * 11 + 18;
  } else {
    page.drawText(safeValue, {
      x,
      y: y - 12,
      size: 9,
      font: fonts.regular,
      color: colors.navy,
    });
    
    return 26;
  }
}

function checkNeedNewPage(currentY: number, requiredSpace: number, config: PDFConfig): boolean {
  return currentY - requiredSpace < config.footerHeight + 40;
}

/**
 * 🎨 drawCard - Helper pour dessiner une card style dashboard
 * Display-only: ne fait aucun calcul, affiche ce qu'on lui donne
 */
function drawCard(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  height: number,
  colors: PDFColors,
  options?: {
    bgColor?: ReturnType<typeof rgb>;
    borderColor?: ReturnType<typeof rgb>;
    accentColor?: ReturnType<typeof rgb>;
    accentWidth?: number;
  }
) {
  const bgColor = options?.bgColor || colors.white;
  const borderColor = options?.borderColor || colors.lightGray;
  const padding = DESIGN_TOKENS.card.padding;

  // Background
  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: bgColor,
    borderColor,
    borderWidth: DESIGN_TOKENS.card.borderWidth,
  });

  // Accent bar (left side, dashboard-like)
  if (options?.accentColor) {
    const accentWidth = options.accentWidth || 4;
    page.drawRectangle({
      x,
      y: y - height,
      width: accentWidth,
      height,
      color: options.accentColor,
    });
  }

  return { innerX: x + padding, innerY: y - padding, innerWidth: width - padding * 2 };
}

/**
 * 🏷️ drawBadge - Helper pour dessiner un badge style dashboard
 * Display-only: affiche un petit rectangle coloré avec du texte
 */
function drawBadge(
  page: PDFPage,
  x: number,
  y: number,
  text: string,
  font: PDFFont,
  options: {
    bgColor: ReturnType<typeof rgb>;
    textColor: ReturnType<typeof rgb>;
    fontSize?: number;
    paddingX?: number;
    paddingY?: number;
  }
): { width: number; height: number } {
  const fontSize = options.fontSize || 7;
  const paddingX = options.paddingX || 6;
  const paddingY = options.paddingY || 3;
  const safeText = toPdfText(text);
  const textWidth = font.widthOfTextAtSize(safeText, fontSize);
  const badgeWidth = textWidth + paddingX * 2;
  const badgeHeight = fontSize + paddingY * 2;

  // Badge background
  page.drawRectangle({
    x,
    y: y - badgeHeight,
    width: badgeWidth,
    height: badgeHeight,
    color: options.bgColor,
  });

  // Badge text
  page.drawText(safeText, {
    x: x + paddingX,
    y: y - badgeHeight + paddingY,
    size: fontSize,
    font,
    color: options.textColor,
  });

  return { width: badgeWidth, height: badgeHeight };
}

function measureBadge(
  text: string,
  font: PDFFont,
  options: {
    fontSize?: number;
    paddingX?: number;
    paddingY?: number;
  }
): { width: number; height: number } {
  const fontSize = options.fontSize || 7;
  const paddingX = options.paddingX || 6;
  const paddingY = options.paddingY || 3;
  const safeText = toPdfText(text);
  const textWidth = font.widthOfTextAtSize(safeText, fontSize);
  const badgeWidth = textWidth + paddingX * 2;
  const badgeHeight = fontSize + paddingY * 2;
  return { width: badgeWidth, height: badgeHeight };
}

/**
 * 🎨 Couleurs de badge par type (dashboard-like)
 */
function getBadgeColors(type: string, colors: PDFColors): { bg: ReturnType<typeof rgb>; text: ReturnType<typeof rgb> } {
  switch (type) {
    case 'secteur':
      return { bg: rgb(0.93, 0.95, 0.99), text: colors.blue };
    case 'classification':
      return { bg: rgb(0.95, 0.93, 0.99), text: colors.violet };
    case 'status-signed':
      return { bg: colors.green, text: colors.white };
    case 'status-pending':
      return { bg: colors.orange, text: colors.white };
    case 'quantity':
      return { bg: rgb(0.93, 0.99, 0.96), text: colors.emerald };
    default:
      return { bg: colors.lightGray, text: colors.navy };
  }
}

// ========================================
// 🎯 FONCTION PRINCIPALE
// ========================================

export async function generateModernDevisPdf(prospect: any, inclureCGV: boolean): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const config: PDFConfig = {
    pageWidth: 595.28,
    pageHeight: 841.89,
    margin: 30,
    headerHeight: 90,
    footerHeight: 50,
    contentWidth: 535.28,
  };

  const colors: PDFColors = {
    violet: rgb(0.49, 0.27, 0.90),
    cyan: rgb(0.03, 0.71, 0.83),
    blue: rgb(0.12, 0.23, 0.54),
    darkBlue: rgb(0.09, 0.13, 0.28),
    green: rgb(0.06, 0.73, 0.51),
    emerald: rgb(0.20, 0.83, 0.61),
    orange: rgb(0.96, 0.62, 0.09),
    pink: rgb(0.98, 0.45, 0.68),
    navy: rgb(0.12, 0.16, 0.24),
    gray: rgb(0.39, 0.45, 0.55),
    lightGray: rgb(0.89, 0.91, 0.94),
    white: rgb(1, 1, 1),
    background: rgb(0.98, 0.98, 0.99),
    black: rgb(0, 0, 0),
  };

  const fonts = { regular: fontRegular, bold: fontBold };

  const payload = { ...prospect };
  const entreprise = payload.entreprise || {};
  const contact = payload.contact || {};
  const postes = Array.isArray(payload.postes) ? payload.postes : [];
  const conditions = payload.conditions || {};
  const candidats = payload.candidats || {};
  const pricing = payload.pricing;
  const totals = pricing?.totals;
  const majorations = pricing?.majorations || payload.majorations;

  const isSigned = payload?.statut === 'signe' || Boolean(payload?.signature);
  const createdAt = payload.createdAt || new Date().toISOString();
  const devisData = {
    numero: payload.numero || 'DEV-XXXXXX',
    isSigned,
    createdAt,
  };

  const issuer = getIssuerInfo();
  const totalPostes = postes.length;
  const totalCandidats = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);

  const validityDays = getValidityDays();
  const validUntil = (() => {
    const created = new Date(createdAt);
    if (Number.isNaN(created.getTime())) return '';
    created.setDate(created.getDate() + validityDays);
    return created.toISOString();
  })();
  const validityLabel = formatDateForPdf(validUntil);

  let currentPage: PDFPage;
  let y = 0;
  const pages: PDFPage[] = [];

  let logo: PDFImage | null = null;
  try {
    const base64Data = YOJOB_LOGO_BASE64.includes(',')
      ? YOJOB_LOGO_BASE64.split(',')[1]
      : YOJOB_LOGO_BASE64;
    const logoBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    logo = await pdfDoc.embedPng(logoBytes);
  } catch (error) {
    console.error('Erreur chargement logo:', error);
  }

  const footerText = [
    issuer.name,
    issuer.email,
    issuer.phone,
    issuer.website,
  ].filter(Boolean).join(' | ');

  const addPage = () => {
    currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
    pages.push(currentPage);
    drawHeader(currentPage, config, colors, fonts, logo, devisData);
    y = config.pageHeight - config.headerHeight - 10;
  };

  const ensureSpace = (needed: number) => {
    if (checkNeedNewPage(y, needed, config)) {
      addPage();
    }
  };

  const drawBulletLines = (
  lines: string[],
  startX: number,
  startY: number,
  width: number,
  fontSize: number
) => {
  let cursor = startY;

  const bullet = '• ';
  const bulletWidth = fontRegular.widthOfTextAtSize(bullet, fontSize);
  const indentX = startX + bulletWidth;
  const maxTextWidth = width - 14;

  lines.forEach((rawLine) => {
    const line = toPdfText(rawLine || '').trim();
    if (!line) return;

    const kv = line.match(/^([^:]{2,40}):\s*(.+)$/); // "Label: value"

    // Cas 1: Label: Value -> label en gras
    if (kv) {
      const label = `${kv[1]}: `;
      const value = kv[2];

      const labelWidth = fontBold.widthOfTextAtSize(toPdfText(label), fontSize);
      const valueMaxWidthFirstLine = Math.max(40, maxTextWidth - bulletWidth - labelWidth);

      // wrap valeur (1ère ligne = espace restant après label, puis lignes suivantes pleine largeur)
      const valueLinesFirst = wrapText(value, fontRegular, fontSize, valueMaxWidthFirstLine);
      const remainingValue = valueLinesFirst.length ? valueLinesFirst.join('\n') : value;
      const valueLines = valueLinesFirst.length
        ? [valueLinesFirst[0], ...wrapText(valueLinesFirst.slice(1).join(' '), fontRegular, fontSize, maxTextWidth - bulletWidth)]
        : wrapText(value, fontRegular, fontSize, maxTextWidth - bulletWidth);

      // Bullet
      currentPage.drawText(bullet, {
        x: startX,
        y: cursor,
        size: fontSize,
        font: fontRegular,
        color: colors.navy,
      });

      // Label bold
      currentPage.drawText(toPdfText(label), {
        x: indentX,
        y: cursor,
        size: fontSize,
        font: fontBold,
        color: colors.navy,
      });

      // Valeur regular - ligne 1
      const firstValue = valueLines[0] || '';
      currentPage.drawText(toPdfText(firstValue), {
        x: indentX + labelWidth,
        y: cursor,
        size: fontSize,
        font: fontRegular,
        color: colors.navy,
      });

      cursor -= fontSize + 3;

      // Lignes suivantes (alignées sous la valeur)
      const tail = valueLines.slice(1);
      tail.forEach((vLine) => {
        currentPage.drawText(toPdfText(vLine), {
          x: indentX,
          y: cursor,
          size: fontSize,
          font: fontRegular,
          color: colors.navy,
        });
        cursor -= fontSize + 3;
      });

      return;
    }

    // Cas 2: phrase libre -> comportement actuel
    const wrapped = wrapText(line, fontRegular, fontSize, maxTextWidth);
    wrapped.forEach((wrappedLine, index) => {
      currentPage.drawText(index === 0 ? `• ${wrappedLine}` : `  ${wrappedLine}`, {
        x: startX,
        y: cursor,
        size: fontSize,
        font: fontRegular,
        color: colors.navy,
      });
      cursor -= fontSize + 3;
    });
  });

  return cursor;
};

  const measureBulletLinesHeight = (lines: string[], width: number, fontSize: number) => {
    let height = 0;
    lines.forEach((line) => {
      const wrapped = wrapText(line, fontRegular, fontSize, width - 14);
      height += wrapped.length * (fontSize + 3);
    });
    return height;
  };

  const splitBulletLinesIntoColumns = (lines: string[], width: number, fontSize: number) => {
    const columns: string[][] = [[], []];
    const heights = [0, 0];
    lines.forEach((line) => {
      const wrapped = wrapText(line, fontRegular, fontSize, width - 14);
      const height = wrapped.length * (fontSize + 3);
      const targetIndex = heights[0] <= heights[1] ? 0 : 1;
      columns[targetIndex].push(line);
      heights[targetIndex] += height;
    });
    return { columns, heights };
  };

  const measureTwoColumnBulletHeight = (lines: string[], totalWidth: number, gap: number, fontSize: number) => {
    const columnWidth = (totalWidth - gap) / 2;
    const { heights } = splitBulletLinesIntoColumns(lines, columnWidth, fontSize);
    return Math.max(heights[0], heights[1]);
  };

  const drawTwoColumnBulletLines = (
    lines: string[],
    startX: number,
    startY: number,
    totalWidth: number,
    gap: number,
    fontSize: number
  ) => {
    const columnWidth = (totalWidth - gap) / 2;
    const { columns } = splitBulletLinesIntoColumns(lines, columnWidth, fontSize);
    const leftEnd = drawBulletLines(columns[0], startX, startY, columnWidth, fontSize);
    const rightEnd = drawBulletLines(columns[1], startX + columnWidth + gap, startY, columnWidth, fontSize);
    return Math.min(leftEnd, rightEnd);
  };

  const measureInfoTableHeight = (entries: Array<{ label: string; value: string }>, width: number) => {
    const labelWidth = 72;
    const valueWidth = width - labelWidth - 8;
    let height = 0;
    entries.forEach((entry) => {
      if (!entry.value) return;
      const lines = wrapText(entry.value, fontRegular, 8.5, valueWidth);
      height += Math.max(1, lines.length) * 10 + 6;
    });
    return height;
  };

  const drawInfoTable = (
    entries: Array<{ label: string; value: string }>,
    startX: number,
    startY: number,
    width: number
  ) => {
    const labelWidth = 72;
    const valueX = startX + labelWidth + 6;
    const valueWidth = width - labelWidth - 6;
    let cursor = startY;
    const visibleEntries = entries.filter((entry) => entry.value);

    visibleEntries.forEach((entry, index) => {
      const label = toPdfText(entry.label).toUpperCase();
      const value = toPdfText(entry.value);
      const lines = wrapText(value, fontRegular, 8.5, valueWidth);
      const rowHeight = Math.max(1, lines.length) * 10 + 6;

      currentPage.drawText(label, {
        x: startX,
        y: cursor,
        size: 7,
        font: fontBold,
        color: colors.gray,
      });

      lines.forEach((line, lineIndex) => {
        currentPage.drawText(line, {
          x: valueX,
          y: cursor - lineIndex * 10,
          size: 8.5,
          font: fontRegular,
          color: colors.navy,
        });
      });

      if (index < visibleEntries.length - 1) {
        currentPage.drawLine({
          start: { x: startX, y: cursor - rowHeight + 3 },
          end: { x: startX + width, y: cursor - rowHeight + 3 },
          thickness: 0.3,
          color: colors.lightGray,
        });
      }

      cursor -= rowHeight;
    });

    return cursor;
  };

  addPage();

  // ========================================
  // EMETTEUR & CLIENT (tableau pro, align\u00e9)
  // ========================================

  const isEI = (issuer.legalForm || '').trim().toUpperCase() === 'EI';

  const issuerEntries = [
    { label: 'Raison sociale', value: issuer.name },
    { label: 'Forme juridique', value: issuer.legalForm },
    { label: 'SIRET', value: issuer.siret },
    { label: 'TVA intracom.', value: issuer.vatNumber },
    { label: 'RCS', value: issuer.rcs },
    ...(!isEI ? [{ label: 'Capital', value: issuer.capital }] : []),
    { label: 'Adresse', value: issuer.address },
    { label: 'Email', value: issuer.email },
    { label: 'T\u00e9l\u00e9phone', value: issuer.phone },
    { label: 'Site web', value: issuer.website },
  ];

  const clientEntries = [
    { label: 'Raison sociale', value: entreprise.raisonSociale || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
    { label: 'TVA intracom', value: entreprise.tvaIntracommunautaire || '' },
    { label: 'Adresse', value: [entreprise.adresse, entreprise.codePostal, entreprise.ville, entreprise.region, entreprise.pays].filter(Boolean).join(' ') },
    { label: 'Contact', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
    { label: 'Email', value: contact.email || '' },
    { label: 'T\u00e9l\u00e9phone', value: contact.telephonePortable || contact.telephoneFixe || '' },
  ];

  const columnWidth = (config.contentWidth - 24) / 2;
  const tablePadding = 12;
  const issuerTableHeight = measureInfoTableHeight(issuerEntries, columnWidth - tablePadding * 2);
  const clientTableHeight = measureInfoTableHeight(clientEntries, columnWidth - tablePadding * 2);
  const cardHeight = Math.max(issuerTableHeight, clientTableHeight) + tablePadding * 2 + 8;

  ensureSpace(cardHeight + 80);

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    '\u00c9metteur & Client',
    '',
    rgb(0.93, 0.96, 0.99),
    colors,
    fonts
  );
  y -= 6;

  // Accents de colonne
  currentPage.drawRectangle({
    x: config.margin,
    y: y - 2,
    width: columnWidth,
    height: 3,
    color: colors.cyan,
  });
  currentPage.drawRectangle({
    x: config.margin + columnWidth + 24,
    y: y - 2,
    width: columnWidth,
    height: 3,
    color: colors.violet,
  });
  y -= 12;

  // Titres des colonnes
  currentPage.drawText('\u00c9METTEUR (YOJOB)', {
    x: config.margin + 6,
    y: y - 8,
    size: 8.5,
    font: fontBold,
    color: colors.cyan,
  });
  currentPage.drawText('CLIENT', {
    x: config.margin + columnWidth + 30,
    y: y - 8,
    size: 8.5,
    font: fontBold,
    color: colors.violet,
  });
  y -= 18;

  const cardTopY = y;
  const leftCard = drawCard(
    currentPage,
    config.margin,
    cardTopY,
    columnWidth,
    cardHeight,
    colors,
    {
      bgColor: rgb(0.99, 0.99, 0.995),
      borderColor: colors.lightGray,
      accentColor: colors.cyan,
      accentWidth: 3,
    }
  );
  const rightCard = drawCard(
    currentPage,
    config.margin + columnWidth + 24,
    cardTopY,
    columnWidth,
    cardHeight,
    colors,
    {
      bgColor: rgb(0.99, 0.99, 0.995),
      borderColor: colors.lightGray,
      accentColor: colors.violet,
      accentWidth: 3,
    }
  );

  drawInfoTable(issuerEntries, leftCard.innerX, leftCard.innerY, leftCard.innerWidth);
  drawInfoTable(clientEntries, rightCard.innerX, rightCard.innerY, rightCard.innerWidth);

  y = cardTopY - cardHeight - 16;

  // ========================================
  // RESUME DE MISSION (avec accent bleu)
  // ========================================

  ensureSpace(160);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'R\u00e9sum\u00e9 de mission',
    '',
    rgb(0.96, 0.95, 0.99),
    colors,
    fonts
  );
  y -= 4;

  // Accent bleu à gauche
  currentPage.drawRectangle({
    x: config.margin,
    y: y - 4,
    width: 4,
    height: 4,
    color: colors.blue,
  });

  const periodeLabel = conditions.dateDebut || conditions.dateFin
    ? `${formatDateForPdf(conditions.dateDebut)} -> ${formatDateForPdf(conditions.dateFin)}`
    : '';

  const resumeEntries = [
    { label: 'Postes', value: totalPostes ? String(totalPostes) : '' },
    { label: 'Candidats', value: totalCandidats ? String(totalCandidats) : '' },
    { label: 'Lieu de mission', value: conditions.lieuxMission || '' },
    { label: 'P\u00e9riode', value: periodeLabel },
    { label: 'Base horaire', value: pricing?.baseHoraireMensuelle ? `${pricing.baseHoraireMensuelle} h/mois` : '' },
    { label: 'Motif de recours', value: getTextValue(conditions.motifRecours) || '' },
    { label: 'D\u00e9lai de paiement', value: formatDelaiPaiementLabel(conditions.delaiPaiement) || '' },
    { label: 'Validit\u00e9 du devis', value: validityLabel },
  ].filter((entry) => entry.value);

  let resumeY = y;
  resumeEntries.forEach((entry) => {
    resumeY -= drawKeyValue(currentPage, config.margin + 12, resumeY, entry.label, entry.value, colors, fonts, config.contentWidth - 24) + 2;
  });
  y = resumeY - 10;

  // ========================================
  // TABLEAU PROFILS
  // ========================================

  ensureSpace(90);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Profils & co\u00fbts mensuels',
    '',
    rgb(0.93, 0.99, 0.96),
    colors,
    fonts
  );
  y -= 12;

  const tableX = config.margin + 8;
  const tableWidth = config.contentWidth - 16;
  const columns = [
    { key: 'profil', label: 'Profil', width: 230 },
    { key: 'qty', label: 'Qte', width: 40 },
    { key: 'taux', label: 'Taux ETT', width: 100 },
    { key: 'cout', label: 'Co\u00fbt mensuel HT', width: 130 },
  ];

  const drawTableHeader = () => {
    const headerHeight = 22;
    currentPage.drawRectangle({
      x: tableX,
      y: y - headerHeight,
      width: tableWidth,
      height: headerHeight,
      color: rgb(0.93, 0.96, 0.99),
      borderColor: colors.lightGray,
      borderWidth: 0.5,
    });
    let offsetX = tableX + 6;
    columns.forEach((col) => {
      currentPage.drawText(toPdfText(col.label), {
        x: offsetX,
        y: y - 15,
        size: 8,
        font: fontBold,
        color: colors.navy,
      });
      offsetX += col.width;
    });
    y -= headerHeight + 4;
  };

  drawTableHeader();

  pricing?.postes?.forEach((poste: any) => {
    const posteName = poste.poste || 'Profil';
    const classification = poste.classification || '';
    const secteur = poste.secteur || '';
    const cells = {
      qty: String(poste.quantite || 1),
      taux: `${formatCurrency(poste.tauxETTMajore)}/h`,
      cout: formatCurrency(poste.coutTotalMensuel),
    };

    const badgeItems = [
      secteur ? { text: secteur, type: 'secteur' as const } : null,
      classification ? { text: classification, type: 'classification' as const } : null,
    ].filter(Boolean) as Array<{ text: string; type: 'secteur' | 'classification' }>;

    const badgeGap = 4;
    const badgeSizes = badgeItems.map((item) =>
      measureBadge(item.text, fontBold, { fontSize: 6, paddingX: 4, paddingY: 2 })
    );
    const badgeTotalWidth = badgeSizes.reduce((sum, size) => sum + size.width, 0)
      + Math.max(0, badgeItems.length - 1) * badgeGap;

    const profileCellWidth = columns[0].width - 14;
    const nameMaxWidth = badgeItems.length
      ? Math.max(70, profileCellWidth - badgeTotalWidth - 6)
      : profileCellWidth;

    const profilLines = wrapText(posteName, fontRegular, 8, nameMaxWidth);
    const firstLine = profilLines[0] || posteName;
    const firstLineWidth = fontBold.widthOfTextAtSize(toPdfText(firstLine), 8);

    // Si multi-ligne ou titre "serré", on stack les badges sous le titre
    const shouldStackBadges =
      badgeItems.length > 0 && (profilLines.length > 1 || firstLineWidth > nameMaxWidth * 0.85);

    const baseRowHeight = Math.max(
      20,
      profilLines.length * 10 + 8 + (shouldStackBadges ? 12 : 0)
    );
    const rowHeight = baseRowHeight;

    if (checkNeedNewPage(y, rowHeight + 30, config)) {
      addPage();
      y = drawSectionHeader(
        currentPage,
        config.margin,
        y,
        config.contentWidth,
        'Profils & co\u00fbts mensuels (suite)',
        '',
        rgb(0.93, 0.99, 0.96),
        colors,
        fonts
      );
      y -= 12;
      drawTableHeader();
    }

    // Row background avec accent gauche coloré
    currentPage.drawRectangle({
      x: tableX,
      y: y - rowHeight,
      width: tableWidth,
      height: rowHeight,
      color: colors.white,
      borderColor: colors.lightGray,
      borderWidth: 0.5,
    });

    // Accent bar left (style dashboard)
    currentPage.drawRectangle({
      x: tableX,
      y: y - rowHeight,
      width: 3,
      height: rowHeight,
      color: colors.violet,
    });

    let offsetX = tableX + 10;

    // Nom du poste (avec badges inline)
    profilLines.forEach((line, idx) => {
      currentPage.drawText(toPdfText(line), {
        x: offsetX,
        y: y - 12 - idx * 10,
        size: 8,
        font: fontBold,
        color: colors.navy,
      });
    });

    if (badgeItems.length) {
      const maxBadgeStartX = offsetX + profileCellWidth - badgeTotalWidth;

      // Inline si possible, sinon sous le titre
      let badgeX = shouldStackBadges ? offsetX : (offsetX + firstLineWidth + 6);

      if (badgeX > maxBadgeStartX) badgeX = maxBadgeStartX;
      if (badgeX < offsetX) badgeX = offsetX;

      const badgeTopY = shouldStackBadges ? (y - 22) : (y - 6);

      badgeItems.forEach((item, index) => {
        const colorSet = getBadgeColors(item.type, colors);
        const size = badgeSizes[index];
        drawBadge(currentPage, badgeX, badgeTopY, item.text, fontBold, {
          bgColor: colorSet.bg,
          textColor: colorSet.text,
          fontSize: 6,
          paddingX: 4,
          paddingY: 2,
        });
        badgeX += size.width + badgeGap;
      });
    }

    offsetX += columns[0].width - 4;

    // Quantité avec badge style
    const qtyColors = getBadgeColors('quantity', colors);
    drawBadge(currentPage, offsetX, y - 6, cells.qty, fontBold, {
      bgColor: qtyColors.bg,
      textColor: qtyColors.text,
      fontSize: 7,
      paddingX: 6,
      paddingY: 2,
    });
    offsetX += columns[1].width;

    // Taux ETT
    currentPage.drawText(toPdfText(cells.taux), {
      x: offsetX,
      y: y - 12,
      size: 8,
      font: fontRegular,
      color: colors.navy,
    });
    offsetX += columns[2].width;

    // Coût mensuel (mis en valeur)
    currentPage.drawText(toPdfText(cells.cout), {
      x: offsetX,
      y: y - 12,
      size: 8,
      font: fontBold,
      color: colors.emerald,
    });

    y -= rowHeight + 4;
  });

  y -= 10;

  // ========================================
  // DETAIL TARIFAIRE PAR PROFIL
  // ========================================

  ensureSpace(120);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'D\u00e9tail tarifaire par profil',
    '',
    rgb(0.99, 0.95, 0.97),
    colors,
    fonts
  );
  y -= 8;

  pricing?.postes?.forEach((poste: any, index: number) => {
    const posteTitle = `Profil #${index + 1} - ${poste.poste || 'Poste'}`;
    const blocks = [] as string[];
    blocks.push(`Coefficient ETT: ${poste.coeffBase.toFixed(2)} x ${poste.facteurPays.toFixed(2)} = ${poste.coeffFinal.toFixed(2)}`);

    if (poste.supplements.total > 0) {
      const supplements = [] as string[];
      if (poste.supplements.hebergement > 0) {
        supplements.push(`Hébergement +${formatCurrency(poste.supplements.hebergement)}/h`);
      }
      if (poste.supplements.transport > 0) {
        supplements.push(`Transport +${formatCurrency(poste.supplements.transport)}/h`);
      }
      blocks.push(`Suppléments horaires (inclus dans le taux): ${supplements.join(' • ')}`);
    } else {
      blocks.push('Suppléments horaires: aucun');
    }

    if (poste.panier.totalMensuel > 0) {
      blocks.push(`Panier repas (facturé séparément): ${formatCurrency(poste.panier.montantJour)} / jour x ${poste.panier.joursParMois} jours x ${poste.quantite} pers. = ${formatCurrency(poste.panier.totalMensuel)}`);
    } else {
      blocks.push('Panier repas: non concerné');
    }

    const hasOvertime = (poste.heures?.heures25 || 0) > 0 || (poste.heures?.heures50 || 0) > 0;
    if (hasOvertime) {
      blocks.push(`Heures supplémentaires: ${poste.heures.heuresNormales}h normales, ${poste.heures.heures25}h +25%, ${poste.heures.heures50}h +50% (total ${formatCurrency(poste.heures.coutTotal)})`);
    } else {
      blocks.push('Base horaire standard (pas d’heures supplémentaires)');
    }

    ensureSpace(80);
    currentPage.drawText(toPdfText(posteTitle), {
      x: config.margin + 12,
      y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });
    y -= 14;
    y = drawBulletLines(blocks, config.margin + 16, y, config.contentWidth - 20, 8);
    y -= 8;
  });

  // ========================================
  // TOTAUX (display-only from payload.pricing.totals)
  // ========================================

  ensureSpace(170);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Totaux & TVA',
    '',
    rgb(0.93, 0.99, 0.96),
    colors,
    fonts
  );
  y -= DESIGN_TOKENS.spacing.sm;

  const totalBoxHeight = 90;
  drawCard(
    currentPage,
    config.margin + DESIGN_TOKENS.spacing.sm,
    y,
    config.contentWidth - DESIGN_TOKENS.spacing.md,
    totalBoxHeight,
    colors,
    {
      bgColor: rgb(0.98, 0.99, 0.98),
      borderColor: colors.emerald,
      accentColor: colors.emerald,
      accentWidth: 4,
    }
  );

  const totalsX = config.margin + 16;
  let totalsY = y - 18;
  const vatRate = Number.isFinite(totals?.tvaRate) ? totals?.tvaRate : undefined;
  const hasVatRate = vatRate !== undefined && vatRate > 0;
  const vatLabel = hasVatRate ? `TVA (${Math.round(vatRate * 100)}%)` : 'TVA';
  const vatAmount = totals?.totalMensuelTVA;
  const hasVatAmount = Number.isFinite(vatAmount);
  const vatValue = hasVatAmount
    ? formatCurrency(vatAmount)
    : (!hasVatRate ? 'Non applicable / sur facture' : '-');

  const totalsRows = [
    { label: 'Total mensuel HT', value: formatCurrency(totals?.totalMensuelHT) },
    { label: vatLabel, value: vatValue },
    { label: 'Total mensuel TTC', value: formatCurrency(totals?.totalMensuelTTC) },
  ];

  totalsRows.forEach((row) => {
    currentPage.drawText(toPdfText(row.label), {
      x: totalsX,
      y: totalsY,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });
    const valueWidth = fontBold.widthOfTextAtSize(toPdfText(row.value), 9);
    currentPage.drawText(toPdfText(row.value), {
      x: config.pageWidth - config.margin - valueWidth - 16,
      y: totalsY,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });
    totalsY -= 16;
  });

  currentPage.drawLine({
    start: { x: totalsX, y: totalsY + 4 },
    end: { x: config.pageWidth - config.margin - 16, y: totalsY + 4 },
    thickness: 0.5,
    color: colors.lightGray,
  });

  const missionLabel = `Coût total mission TTC (${totals?.dureeMissionMois || 1} mois)`;
  const missionValue = formatCurrency(totals?.totalMissionTTC);
  currentPage.drawText(toPdfText(missionLabel), {
    x: totalsX,
    y: totalsY - 8,
    size: 10,
    font: fontBold,
    color: colors.emerald,
  });
  const missionWidth = fontBold.widthOfTextAtSize(toPdfText(missionValue), 10);
  currentPage.drawText(toPdfText(missionValue), {
    x: config.pageWidth - config.margin - missionWidth - 16,
    y: totalsY - 8,
    size: 10,
    font: fontBold,
    color: colors.emerald,
  });

  y = y - totalBoxHeight - 18;

  // Note TVA intracom (pro)
  const intracomNotice =
    "TVA intracommunautaire : si votre numéro de TVA est valide, la facturation pourra être établie en autoliquidation (B2B intracommunautaire au sein de l’Union européenne), conformément à la réglementation en vigueur.";

const noticeFontSize = 7.5;
const noticeLines = wrapText(intracomNotice, fontRegular, noticeFontSize, config.contentWidth - 32);

noticeLines.forEach((line) => {
  currentPage.drawText(toPdfText(line), {
    x: config.margin + 16,
    y,
    size: noticeFontSize,
    font: fontRegular,
    color: colors.gray,
  });
  y -= noticeFontSize + 3;
});

y -= 6;

  // ========================================
  // CONDITIONS & CANDIDATS
  // ========================================
  const conditionsLines = [
    conditions.typeContrat ? `Type de contrat: ${getTextValue(conditions.typeContrat)}` : '',
    conditions.periodeEssai ? `Période d’essai: ${getTextValue(conditions.periodeEssai)}` : '',
    conditions.baseHoraire ? `Base horaire: ${conditions.baseHoraire} h/mois` : '',
    conditions.lieuxMission ? `Lieu de mission: ${conditions.lieuxMission}` : '',
    conditions.dateDebut ? `Date de début: ${formatDateForPdf(conditions.dateDebut)}` : '',
    conditions.dateFin ? `Date de fin: ${formatDateForPdf(conditions.dateFin)}` : '',
    conditions.motifRecours ? `Motif de recours: ${getTextValue(conditions.motifRecours)}` : '',
    conditions.delaiPaiement ? `Délai de paiement: ${formatDelaiPaiementLabel(conditions.delaiPaiement)}` : '',
    conditions.hebergement?.chargeEU !== undefined ? `Hébergement: ${conditions.hebergement.chargeEU ? 'Pris en charge' : 'Non pris en charge'}${conditions.hebergement.commentaire ? ` (${conditions.hebergement.commentaire})` : ''}` : '',
    conditions.transportLocal?.chargeETT !== undefined ? `Transport local: ${conditions.transportLocal.chargeETT ? 'Pris en charge par ETT' : 'Non pris en charge par ETT'}` : '',
    conditions.repas?.type ? `Repas: ${conditions.repas.type}${conditions.repas.montant ? ` (${formatCurrency(conditions.repas.montant)}/jour)` : ''}` : '',
  ].filter(Boolean) as string[];

  ensureSpace(measureBulletLinesHeight(conditionsLines, config.contentWidth - 20, 8.5) + 60);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Conditions de mission',
    '',
    rgb(0.99, 0.96, 0.93),
    colors,
    fonts
  );
  y -= 10;

  y = drawBulletLines(conditionsLines, config.margin + 12, y, config.contentWidth - 20, 8.5);
  y -= 10;

  const candidatsLines: string[] = [];
  if (candidats.experience) {
    const exp = candidats.experience.obligatoire ? 'Obligatoire' : 'Non obligatoire';
    const years = candidats.experience.annees ? ` (${candidats.experience.annees} ans)` : '';
    candidatsLines.push(`Expérience: ${exp}${years}`);
  }
  if (candidats.formation) {
    const form = candidats.formation.obligatoire ? 'Obligatoire' : 'Non obligatoire';
    const type = candidats.formation.type ? ` (${getTextValue(candidats.formation.type)})` : '';
    candidatsLines.push(`Formation: ${form}${type}`);
  }
  if (candidats.permis?.requis) {
    candidatsLines.push(`Permis: ${candidats.permis.categorie ? `Cat. ${getTextValue(candidats.permis.categorie)}` : 'Requis'}`);
  }
  if (candidats.outillage?.requis) {
    candidatsLines.push(`Outillage: ${getTextValue(candidats.outillage.type) || 'Requis'}`);
  }
  if (candidats.travailRisque?.active) {
    candidatsLines.push(`Travail à risque: ${getTextValue(candidats.travailRisque.precisions) || 'Oui'}`);
  }
  if (candidats.langues && Object.keys(candidats.langues).length) {
    const langues = Object.entries(candidats.langues)
      .filter(([, niveau]) => niveau && niveau !== 'non-requis')
      .map(([langue, niveau]) => `${getTextValue(langue)} (${getTextValue(niveau)})`)
      .join(', ');
    if (langues) {
      candidatsLines.push(`Langues: ${langues}`);
    }
  }
  if (candidats.epis?.length) {
    const epis = candidats.epis.map((epi: any) => getTextValue(epi)).join(', ');
    candidatsLines.push(`EPI requis: ${epis}`);
  }

  const candidatsContentHeight = candidatsLines.length
    ? measureBulletLinesHeight(candidatsLines, config.contentWidth - 20, 8.5)
    : 14;
  ensureSpace(candidatsContentHeight + 60);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Profil des candidats',
    '',
    rgb(0.99, 0.95, 0.97),
    colors,
    fonts
  );
  y -= 10;

  if (candidatsLines.length) {
    y = drawBulletLines(candidatsLines, config.margin + 12, y, config.contentWidth - 20, 8.5);
  } else {
    currentPage.drawText('Aucun profil spécifique.', {
      x: config.margin + 12,
      y,
      size: 8.5,
      font: fontRegular,
      color: colors.gray,
    });
    y -= 12;
  }

  y -= 10;

  const majorationRows = [
    { label: 'Délai de paiement', value: formatPercent(majorations?.delaiPaiement) },
    { label: 'Expérience', value: formatPercent(majorations?.experience) },
    { label: 'Permis', value: formatPercent(majorations?.permis) },
    { label: 'Langues', value: formatPercent(majorations?.langues) },
    { label: 'Outillage', value: formatPercent(majorations?.outillage) },
    { label: 'Total', value: formatPercent(majorations?.total) },
  ];

  ensureSpace(majorationRows.length * 14 + 60);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Ajustements tarifaires',
    '',
    rgb(0.93, 0.96, 0.99),
    colors,
    fonts
  );
  y -= 10;

  let majY = y;
  majorationRows.forEach((row, index) => {
    currentPage.drawText(toPdfText(row.label), {
      x: config.margin + 12,
      y: majY,
      size: 8.5,
      font: index === majorationRows.length - 1 ? fontBold : fontRegular,
      color: colors.navy,
    });
    const valueWidth = fontRegular.widthOfTextAtSize(toPdfText(row.value), 8.5);
    currentPage.drawText(toPdfText(row.value), {
      x: config.pageWidth - config.margin - valueWidth,
      y: majY,
      size: 8.5,
      font: index === majorationRows.length - 1 ? fontBold : fontRegular,
      color: colors.navy,
    });
    majY -= 14;
  });
  y = majY - 6;

  // ========================================
  // MENTIONS LEGALES & SIGNATURE
  // ========================================

  const legalLines = [
    issuer.name ? `Raison sociale: ${issuer.name}` : '',
    issuer.legalForm ? `Forme juridique: ${issuer.legalForm}` : '',
    issuer.siret ? `SIRET: ${issuer.siret}` : '',
    issuer.rcs ? `RCS: ${issuer.rcs}` : '',
    issuer.vatNumber ? `TVA: ${issuer.vatNumber}` : '',
    (!isEI && issuer.capital) ? `Capital: ${issuer.capital}` : '',
    issuer.address ? `Adresse: ${issuer.address}` : '',
    issuer.email ? `Email: ${issuer.email}` : '',
    issuer.phone ? `T\u00e9l\u00e9phone: ${issuer.phone}` : '',
    issuer.website ? `Site: ${issuer.website}` : '',
    inclureCGV && issuer.cgvUrl ? `CGV: ${issuer.cgvUrl}` : '',
  ].filter(Boolean) as string[];

  const paiementClause = 'En cas de retard de paiement, des pénalités seront appliquées au taux directeur de la BCE majoré de 10 points, ainsi qu’une indemnité forfaitaire de 40 EUR (art. L441-10 C. com.).';
  const rgpdContact = issuer.rgpdEmail || issuer.email || 'Non renseigné';
  const rgpdNotice = `RGPD: les données sont traitées pour répondre à la demande de devis et assurer le suivi commercial. Conservation: 36 mois. Contact: ${rgpdContact}${issuer.privacyUrl ? ` | ${issuer.privacyUrl}` : ''}${issuer.cgvUrl ? ` | ${issuer.cgvUrl}` : ''}.`;
  const scopeNotice = 'Ce devis est indicatif. Le tarif final pourra être ajusté après validation des conditions définitives et des disponibilités.';

  const mentionLines = [...legalLines, scopeNotice, paiementClause, rgpdNotice].filter(Boolean);
  const mentionsGap = 18;
  const mentionsWidth = config.contentWidth - 24;
  const mentionsHeight = mentionLines.length
    ? measureTwoColumnBulletHeight(mentionLines, mentionsWidth, mentionsGap, 8)
    : 20;

  ensureSpace(mentionsHeight + 60);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Mentions l\u00e9gales & RGPD',
    '',
    rgb(0.99, 0.96, 0.93),
    colors,
    fonts
  );
  y -= 10;

  if (mentionLines.length) {
    y = drawTwoColumnBulletLines(
      mentionLines,
      config.margin + 12,
      y,
      mentionsWidth,
      mentionsGap,
      8
    );
  } else {
    currentPage.drawText('Informations \u00e9metteur \u00e0 compl\u00e9ter via la configuration.', {
      x: config.margin + 12,
      y,
      size: 8.5,
      font: fontRegular,
      color: colors.gray,
    });
    y -= 12;
  }

  y -= 8;

  const signaturePayload = isSigned && payload.signature ? payload.signature : null;
  const unsignedCardHeight = 60;
  let signatureLines: string[] = [];
  let signatureCardHeight = unsignedCardHeight;
  let signatureMeta: {
    signataire: any;
    metadata: any;
    integrite: any;
    methodLabel: string;
  } | null = null;

  if (signaturePayload) {
    const signataire = signaturePayload.signataire || {};
    const metadata = signaturePayload.metadata || {};
    const integrite = signaturePayload.integrite || {};

    const methodLabel = metadata.signatureMethod === 'online_link'
      ? 'Lien s\u00e9curis\u00e9'
      : metadata.signatureMethod === 'direct_form'
        ? 'Signature directe'
        : (metadata.signatureMethod || 'Signature \u00e9lectronique simple');

    signatureLines = [
      `Signataire: ${[signataire.prenom, signataire.nom].filter(Boolean).join(' ')}`,
      signataire.fonction ? `Fonction: ${signataire.fonction}` : '',
      signataire.email ? `Email: ${signataire.email}` : '',
      signataire.entreprise ? `Entreprise: ${signataire.entreprise}` : '',
      signataire.siret ? `SIRET: ${signataire.siret}` : '',
      metadata.timestampReadable ? `Horodatage: ${metadata.timestampReadable}` : (metadata.timestamp ? `Horodatage: ${metadata.timestamp}` : ''),
      `M\u00e9thode: ${methodLabel}`,
      metadata.transactionId ? `ID transaction: ${metadata.transactionId}` : '',
      metadata.ipAddress ? `IP (masquee): ${maskIpAddress(metadata.ipAddress)}` : '',
    ].filter(Boolean) as string[];

    signatureCardHeight = signatureLines.length * 12
      + (integrite.documentHash ? 50 : 0)
      + (signaturePayload.image ? 100 : 0)
      + 30;

    signatureMeta = { signataire, metadata, integrite, methodLabel };
  }

  ensureSpace(signatureCardHeight + 70);
  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Certificat de signature \u00e9lectronique',
    '',
    rgb(0.93, 0.99, 0.96),
    colors,
    fonts
  );
  y -= 10;

  if (signaturePayload && signatureMeta) {
    const { integrite } = signatureMeta;

    // Card avec accent vert (signé = valide)
    drawCard(
      currentPage,
      config.margin,
      y,
      config.contentWidth,
      signatureCardHeight,
      colors,
      {
        bgColor: rgb(0.98, 1, 0.98),
        borderColor: colors.green,
        accentColor: colors.green,
        accentWidth: 5,
      }
    );

    // Badge SIGNÉ en haut à droite de la card
    const statusColors = getBadgeColors('status-signed', colors);
    drawBadge(
      currentPage,
      config.pageWidth - config.margin - 60,
      y - 4,
      'SIGN\u00c9',
      fontBold,
      {
        bgColor: statusColors.bg,
        textColor: statusColors.text,
        fontSize: 8,
        paddingX: 8,
        paddingY: 3,
      }
    );

    // Titre dans la card
    currentPage.drawText('Document sign\u00e9 \u00e9lectroniquement', {
      x: config.margin + 16,
      y: y - 18,
      size: 10,
      font: fontBold,
      color: colors.green,
    });

    let certY = y - 34;

    // Utilise drawBulletLines : détecte "Label: value" et rend le label en gras
    certY = drawBulletLines(
      signatureLines,
      config.margin + 16,
      certY,
      config.contentWidth - 32,
      8
    );

    if (integrite.documentHash) {
      certY -= 4;
      currentPage.drawText('Empreinte du document (SHA-256):', {
        x: config.margin + 16,
        y: certY,
        size: 8,
        font: fontBold,
        color: colors.navy,
      });
      certY -= 12;

      // Hash dans une boîte monospace stylée
      const hashLines = wrapText(integrite.documentHash, fontMono, 6.5, config.contentWidth - 40);
      currentPage.drawRectangle({
        x: config.margin + 16,
        y: certY - hashLines.length * 9 - 4,
        width: config.contentWidth - 32,
        height: hashLines.length * 9 + 8,
        color: colors.white,
        borderColor: colors.lightGray,
        borderWidth: 0.5,
      });
      hashLines.forEach((line) => {
        currentPage.drawText(toPdfText(line), {
          x: config.margin + 20,
          y: certY - 2,
          size: 6.5,
          font: fontMono,
          color: colors.navy,
        });
        certY -= 9;
      });
      certY -= 8;
    }

    if (signaturePayload.image) {
      try {
        const base64Data = signaturePayload.image.split(',')[1] || signaturePayload.image;
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const signatureImage = signaturePayload.image.includes('png')
          ? await pdfDoc.embedPng(imageBytes)
          : await pdfDoc.embedJpg(imageBytes);
        const imgWidth = 180;
        const imgHeight = 70;
        certY -= 4;
        currentPage.drawImage(signatureImage, {
          x: config.margin + 16,
          y: certY - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });
        certY -= imgHeight + 6;
      } catch (error) {
        console.error('Erreur chargement image signature:', error);
      }
    }

    y = y - signatureCardHeight - 12;
  } else {
    // Card pour devis non signé avec accent orange
    drawCard(
      currentPage,
      config.margin,
      y,
      config.contentWidth,
      unsignedCardHeight,
      colors,
      {
        bgColor: rgb(1, 0.99, 0.97),
        borderColor: colors.orange,
        accentColor: colors.orange,
        accentWidth: 5,
      }
    );

    // Badge EN ATTENTE
    const statusColors = getBadgeColors('status-pending', colors);
    drawBadge(
      currentPage,
      config.pageWidth - config.margin - 80,
      y - 4,
      'EN ATTENTE',
      fontBold,
      {
        bgColor: statusColors.bg,
        textColor: statusColors.text,
        fontSize: 8,
        paddingX: 8,
        paddingY: 3,
      }
    );

    currentPage.drawText('En attente de signature', {
      x: config.margin + 16,
      y: y - 20,
      size: 10,
      font: fontBold,
      color: colors.orange,
    });

    currentPage.drawText("Ce devis n'a pas encore \u00e9t\u00e9 sign\u00e9 par le client.", {
      x: config.margin + 16,
      y: y - 38,
      size: 8.5,
      font: fontRegular,
      color: colors.gray,
    });

    y = y - unsignedCardHeight - 12;
  }

  // ========================================
  // FOOTERS
  // ========================================

  const totalPages = pages.length;
  pages.forEach((page, index) => {
    drawFooter(page, config, colors, fontRegular, index + 1, totalPages, footerText);
  });

  return await pdfDoc.save();
}
