/**
 * 🎨 GÉNÉRATEUR PDF MODERNE - VERSION 4.0
 * 
 * Design complet aligné sur le dashboard avec les champs essentiels
 * - Sections structurées (emetteur, client, mission, profils, conditions)
 * - Totaux HT/TVA/TTC + cout total mission
 * - Mentions legales et RGPD en fin de document
 * - Certificat de signature avec IP masquee
 */

import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, PDFImage } from "npm:pdf-lib@1.17.1";
import { YOJOB_LOGO_BASE64 } from './yojob-logo-base64.ts';
import { formatDelaiPaiementLabel } from './devis-payload.ts';

// ========================================
// 🎨 TYPES ET CONSTANTES
// ========================================

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

const getIssuerInfo = () => ({
  name: readEnv('YOJOB_LEGAL_NAME') || '',
  legalForm: readEnv('YOJOB_LEGAL_FORM') || '',
  siret: readEnv('YOJOB_SIRET') || '',
  rcs: readEnv('YOJOB_RCS') || '',
  vatNumber: readEnv('YOJOB_VAT_NUMBER') || '',
  address: readEnv('YOJOB_ADDRESS') || '',
  capital: readEnv('YOJOB_CAPITAL') || '',
  email: readEnv('YOJOB_EMAIL') || '',
  phone: readEnv('YOJOB_PHONE') || '',
  website: readEnv('YOJOB_WEBSITE') || '',
  privacyUrl: readEnv('YOJOB_PRIVACY_URL') || '',
  rgpdEmail: readEnv('YOJOB_RGPD_EMAIL') || readEnv('YOJOB_EMAIL') || '',
  cgvUrl: readEnv('YOJOB_CGV_URL') || '',
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
    font: fonts.regular,
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

  const drawColumn = (
    entries: Array<{ label: string; value: string }>,
    startX: number,
    startY: number,
    width: number
  ) => {
    let cursor = startY;
    entries.forEach((entry) => {
      if (!entry.value) return;
      cursor -= drawKeyValue(currentPage, startX, cursor, entry.label, entry.value, colors, fonts, width) + 4;
    });
    return cursor;
  };

  const drawBulletLines = (lines: string[], startX: number, startY: number, width: number, fontSize: number) => {
    let cursor = startY;
    lines.forEach((line) => {
      const wrapped = wrapText(line, fontRegular, fontSize, width - 14);
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

  addPage();

  // ========================================
  // EMETTEUR & CLIENT
  // ========================================

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
  y -= 8;

  const columnWidth = (config.contentWidth - 24) / 2;

  currentPage.drawText('\u00c9METTEUR (YOJOB)', {
    x: config.margin + 12,
    y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  currentPage.drawText('CLIENT', {
    x: config.margin + columnWidth + 24,
    y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  y -= 16;

  const issuerEntries = [
    { label: 'Raison sociale', value: issuer.name || 'Non renseign\u00e9e' },
    { label: 'Forme juridique', value: issuer.legalForm || 'Non renseign\u00e9e' },
    { label: 'SIRET', value: issuer.siret || 'Non renseign\u00e9e' },
    { label: 'TVA', value: issuer.vatNumber || 'Non renseign\u00e9e' },
    { label: 'RCS', value: issuer.rcs || 'Non renseign\u00e9e' },
    { label: 'Capital', value: issuer.capital || 'Non renseign\u00e9e' },
    { label: 'Adresse', value: issuer.address || 'Non renseign\u00e9e' },
    { label: 'Email', value: issuer.email || 'Non renseign\u00e9e' },
    { label: 'T\u00e9l\u00e9phone', value: issuer.phone || 'Non renseign\u00e9e' },
    { label: 'Site', value: issuer.website || 'Non renseign\u00e9e' },
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

  const leftEnd = drawColumn(issuerEntries, config.margin + 12, y, columnWidth - 20);
  const rightEnd = drawColumn(clientEntries, config.margin + columnWidth + 24, y, columnWidth - 20);
  y = Math.min(leftEnd, rightEnd) - 12;

  // ========================================
  // RESUME DE MISSION
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
  y -= 8;

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
  // TOTAUX
  // ========================================

  ensureSpace(140);
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
  y -= 8;

  const totalBoxHeight = 90;
  currentPage.drawRectangle({
    x: config.margin + 8,
    y: y - totalBoxHeight,
    width: config.contentWidth - 16,
    height: totalBoxHeight,
    color: rgb(0.98, 0.98, 0.99),
    borderColor: colors.lightGray,
    borderWidth: 1,
  });

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

  // ========================================
  // PAGE 2 - TABLEAU PROFILS
  // ========================================

  addPage();
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

  pricing?.postes?.forEach((poste) => {
    const profilLabel = [poste.poste, poste.classification].filter(Boolean).join(' - ') || 'Profil';
    const cells = {
      profil: profilLabel,
      qty: String(poste.quantite || 1),
      taux: `${formatCurrency(poste.tauxETTMajore)}/h`,
      cout: formatCurrency(poste.coutTotalMensuel),
    };

    const profilLines = wrapText(cells.profil, fontRegular, 8, columns[0].width - 10);
    const rowHeight = Math.max(16, profilLines.length * 10 + 4);

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

    currentPage.drawRectangle({
      x: tableX,
      y: y - rowHeight,
      width: tableWidth,
      height: rowHeight,
      color: colors.white,
      borderColor: colors.lightGray,
      borderWidth: 0.5,
    });

    let offsetX = tableX + 6;
    profilLines.forEach((line, idx) => {
      currentPage.drawText(toPdfText(line), {
        x: offsetX,
        y: y - 12 - idx * 10,
        size: 8,
        font: fontRegular,
        color: colors.navy,
      });
    });
    offsetX += columns[0].width;

    currentPage.drawText(toPdfText(cells.qty), {
      x: offsetX,
      y: y - 12,
      size: 8,
      font: fontRegular,
      color: colors.navy,
    });
    offsetX += columns[1].width;

    currentPage.drawText(toPdfText(cells.taux), {
      x: offsetX,
      y: y - 12,
      size: 8,
      font: fontRegular,
      color: colors.navy,
    });
    offsetX += columns[2].width;

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

  pricing?.postes?.forEach((poste, index) => {
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
  // PAGE 3 - CONDITIONS & CANDIDATS
  // ========================================

  addPage();
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

  y = drawBulletLines(conditionsLines, config.margin + 12, y, config.contentWidth - 20, 8.5);
  y -= 10;

  ensureSpace(120);
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

  ensureSpace(120);
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

  const majorationRows = [
    { label: 'Délai de paiement', value: formatPercent(majorations?.delaiPaiement) },
    { label: 'Expérience', value: formatPercent(majorations?.experience) },
    { label: 'Permis', value: formatPercent(majorations?.permis) },
    { label: 'Langues', value: formatPercent(majorations?.langues) },
    { label: 'Outillage', value: formatPercent(majorations?.outillage) },
    { label: 'Total', value: formatPercent(majorations?.total) },
  ];

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
  // PAGE 4 - MENTIONS LEGALES & SIGNATURE
  // ========================================

  addPage();
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

  const legalLines = [
    issuer.name ? `Raison sociale: ${issuer.name}` : '',
    issuer.legalForm ? `Forme juridique: ${issuer.legalForm}` : '',
    issuer.siret ? `SIRET: ${issuer.siret}` : '',
    issuer.rcs ? `RCS: ${issuer.rcs}` : '',
    issuer.vatNumber ? `TVA: ${issuer.vatNumber}` : '',
    issuer.capital ? `Capital: ${issuer.capital}` : '',
    issuer.address ? `Adresse: ${issuer.address}` : '',
    issuer.email ? `Email: ${issuer.email}` : '',
    issuer.phone ? `T\u00e9l\u00e9phone: ${issuer.phone}` : '',
    issuer.website ? `Site: ${issuer.website}` : '',
    inclureCGV && issuer.cgvUrl ? `CGV: ${issuer.cgvUrl}` : '',
  ].filter(Boolean) as string[];

  if (legalLines.length) {
    y = drawBulletLines(legalLines, config.margin + 12, y, config.contentWidth - 20, 8.5);
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

  const paiementClause = 'En cas de retard de paiement, des pénalités seront appliquées au taux directeur de la BCE majoré de 10 points, ainsi qu’une indemnité forfaitaire de 40 EUR (art. L441-10 C. com.).';
  const rgpdContact = issuer.rgpdEmail || issuer.email || 'Non renseigné';
  const rgpdNotice = `RGPD: les données sont traitées pour répondre à la demande de devis et assurer le suivi commercial. Conservation: 36 mois. Contact: ${rgpdContact}${issuer.privacyUrl ? ` | ${issuer.privacyUrl}` : ''}${issuer.cgvUrl ? ` | ${issuer.cgvUrl}` : ''}.`;
  const scopeNotice = 'Ce devis est indicatif. Le tarif final pourra être ajusté après validation des conditions définitives et des disponibilités.';

  y = drawBulletLines([scopeNotice, paiementClause, rgpdNotice], config.margin + 12, y, config.contentWidth - 20, 8);
  y -= 6;

  ensureSpace(160);
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

  if (isSigned && payload.signature) {
    const signature = payload.signature;
    const signataire = signature.signataire || {};
    const metadata = signature.metadata || {};
    const integrite = signature.integrite || {};

    const methodLabel = metadata.signatureMethod === 'online_link'
      ? 'Lien s\u00e9curis\u00e9'
      : metadata.signatureMethod === 'direct_form'
        ? 'Signature directe'
        : (metadata.signatureMethod || 'Signature \u00e9lectronique simple');

    const signatureLines = [
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

    y = drawBulletLines(signatureLines, config.margin + 12, y, config.contentWidth - 20, 8.2);
    y -= 4;

    if (integrite.documentHash) {
      currentPage.drawText('Empreinte du document:', {
        x: config.margin + 12,
        y,
        size: 8.2,
        font: fontBold,
        color: colors.navy,
      });
      y -= 12;
      const hashLines = wrapText(integrite.documentHash, fontMono, 7, config.contentWidth - 24);
      hashLines.forEach((line) => {
        currentPage.drawText(toPdfText(line), {
          x: config.margin + 12,
          y,
          size: 7,
          font: fontMono,
          color: colors.navy,
        });
        y -= 9;
      });
      y -= 6;
    }

    if (signature.image) {
      try {
        const base64Data = signature.image.split(',')[1] || signature.image;
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const signatureImage = signature.image.includes('png')
          ? await pdfDoc.embedPng(imageBytes)
          : await pdfDoc.embedJpg(imageBytes);
        const imgWidth = 200;
        const imgHeight = 80;
        currentPage.drawImage(signatureImage, {
          x: config.margin + 12,
          y: y - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });
        y -= imgHeight + 10;
      } catch (error) {
        console.error('Erreur chargement image signature:', error);
      }
    }
  } else {
    currentPage.drawText("Ce devis n'a pas encore ete signe.", {
      x: config.margin + 12,
      y,
      size: 8.5,
      font: fontRegular,
      color: colors.gray,
    });
    y -= 12;
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