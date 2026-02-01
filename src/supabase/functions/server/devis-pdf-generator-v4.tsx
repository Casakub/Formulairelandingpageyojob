/**
 * 🎨 GÉNÉRATEUR PDF MODERNE - VERSION 4.0
 * 
 * Design complet aligné sur le dashboard avec TOUS les champs
 * - Logo YOJOB stylisé (fond noir/dark)
 * - Sections complètes
 * - Postes sans bordure (uniquement barre verte à gauche)
 * - Image de signature du client si signée
 * - Pages CGV en fin de document
 * - Design épuré et professionnel
 */

import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, PDFImage } from "npm:pdf-lib@1.17.1";
import { cgvFR } from './cgv-data.ts';
import { YOJOB_LOGO_BASE64 } from './yojob-logo-base64.ts';

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
  if (!dateInput) return 'Non renseignee';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return 'Non renseignee';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatDateTimeForPdf = (dateInput?: string): string => {
  if (!dateInput) return 'Non renseignee';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return 'Non renseignee';
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
  if (!Number.isFinite(number)) return '0,00 EUR';
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

    page.drawText('Courtage en recrutement europeen', {
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
  const badgeText = devisData.isSigned ? 'SIGNE' : 'EN ATTENTE';
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
  page.drawText(`Cree le: ${formatDateTimeForPdf(devisData.createdAt)}`, {
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
  totalPages: number
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
  page.drawText('YOJOB | contact@yojob.fr | +33 1 23 45 67 89 | www.yojob.fr', {
    x: config.margin,
    y: footerY,
    size: 7,
    font,
    color: colors.gray,
  });

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

  // Configuration
  const config: PDFConfig = {
    pageWidth: 595.28, // A4
    pageHeight: 841.89,
    margin: 30,
    headerHeight: 90,
    footerHeight: 50,
    contentWidth: 535.28,
  };

  const colors: PDFColors = {
    violet: rgb(0.49, 0.27, 0.90), // #7C3AED
    cyan: rgb(0.03, 0.71, 0.83), // #06B6D4
    blue: rgb(0.12, 0.23, 0.54), // #1E3A8A
    darkBlue: rgb(0.09, 0.13, 0.28), // #172136
    green: rgb(0.06, 0.73, 0.51), // #10B981
    emerald: rgb(0.20, 0.83, 0.61), // #34D399
    orange: rgb(0.96, 0.62, 0.09), // #F59E0B
    pink: rgb(0.98, 0.45, 0.68), // #F472B6
    navy: rgb(0.12, 0.16, 0.24), // #1E293B
    gray: rgb(0.39, 0.45, 0.55), // #64748B
    lightGray: rgb(0.89, 0.91, 0.94), // #E2E8F0
    white: rgb(1, 1, 1),
    background: rgb(0.98, 0.98, 0.99),
    black: rgb(0, 0, 0),
  };

  const fonts = { regular: fontRegular, bold: fontBold };

  // Données du devis
  const isSigned = prospect?.statut === 'signe' || Boolean(prospect?.signature);
  const createdAt = prospect.createdAt || new Date().toISOString();

  const devisData = {
    numero: prospect.numero || 'DEV-XXXXXX',
    isSigned,
    createdAt,
  };

  const entreprise = prospect.entreprise || {};
  const contact = prospect.contact || {};
  const postes = Array.isArray(prospect.postes) ? prospect.postes : [];
  const conditions = prospect.conditions || {};
  const candidats = prospect.candidats || {};
  const signature = prospect.signature || null;

  let currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
  let y = config.pageHeight - config.headerHeight;
  let pageNumber = 1;
  const pages: PDFPage[] = [currentPage];

  // Header première page
  let logo: PDFImage | null = null;
  try {
    // Extraire le base64 pur (enlever le préfixe data:image/png;base64, si présent)
    const base64Data = YOJOB_LOGO_BASE64.includes(',') 
      ? YOJOB_LOGO_BASE64.split(',')[1] 
      : YOJOB_LOGO_BASE64;
    const logoBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    logo = await pdfDoc.embedPng(logoBytes);
  } catch (error) {
    console.error('Erreur chargement logo:', error);
  }
  drawHeader(currentPage, config, colors, fonts, logo, devisData);

  // ========================================
  // 🏢 SECTION ENTREPRISE
  // ========================================

  y -= 20;

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Informations entreprise',
    '',
    rgb(0.93, 0.96, 0.99),
    colors,
    fonts
  );

  y -= 8;

  const columnWidth = (config.contentWidth - 24) / 2;

  // Colonne 1 : Identité
  let col1Y = y;
  currentPage.drawText('IDENTITE', {
    x: config.margin + 12,
    y: col1Y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  col1Y -= 16;

  col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Raison sociale', entreprise.raisonSociale || '', colors, fonts, columnWidth - 20);
  if (entreprise.pays) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Pays', entreprise.pays, colors, fonts);
  if (entreprise.formeJuridique) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Forme juridique', entreprise.formeJuridique, colors, fonts);
  col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'SIRET', entreprise.siret || '', colors, fonts);
  if (entreprise.numeroTVA) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'N° TVA', entreprise.numeroTVA, colors, fonts);
  if (entreprise.codeAPE) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Code APE', entreprise.codeAPE, colors, fonts);
  if (entreprise.tvaIntracommunautaire) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'TVA intracommunautaire', entreprise.tvaIntracommunautaire, colors, fonts);
  if (entreprise.siteInternet) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Site internet', entreprise.siteInternet, colors, fonts, columnWidth - 20);

  // Colonne 2 : Coordonnées
  let col2Y = y;
  currentPage.drawText('COORDONNEES', {
    x: config.margin + columnWidth + 24,
    y: col2Y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  col2Y -= 16;

  const adresseComplete = [
    entreprise.adresse,
    `${entreprise.codePostal} ${entreprise.ville}`,
    `${entreprise.region}, ${entreprise.pays}`
  ].filter(Boolean).join('\n');
  
  col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Adresse', adresseComplete, colors, fonts, columnWidth - 20);
  if (entreprise.secteurActivite) col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, "Secteur d'activite", entreprise.secteurActivite, colors, fonts);
  if (entreprise.effectifs) col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Effectifs', entreprise.effectifs, colors, fonts);

  y = Math.min(col1Y, col2Y) - 20;

  // ========================================
  // 👤 SECTION CONTACT
  // ========================================

  if (checkNeedNewPage(y, 150, config)) {
    currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
    pages.push(currentPage);
    pageNumber++;
    y = config.pageHeight - config.headerHeight;
    drawHeader(currentPage, config, colors, fonts, logo, devisData);
    y -= 20;
  }

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Personne de contact',
    '',
    rgb(0.96, 0.95, 0.99),
    colors,
    fonts
  );

  y -= 8;

  // Colonne 1 : Identité
  col1Y = y;
  currentPage.drawText('IDENTITE', {
    x: config.margin + 12,
    y: col1Y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  col1Y -= 16;

  const fullName = [contact.civilite, contact.prenom, contact.nom].filter(Boolean).join(' ');
  col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Nom complet', fullName, colors, fonts);
  if (contact.fonction) col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Fonction', contact.fonction, colors, fonts);

  // Colonne 2 : Contact
  col2Y = y;
  currentPage.drawText('CONTACT', {
    x: config.margin + columnWidth + 24,
    y: col2Y,
    size: 8.5,
    font: fontBold,
    color: colors.gray,
  });
  col2Y -= 16;

  col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Email', contact.email || '', colors, fonts, columnWidth - 20);
  if (contact.telephonePortable) col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Tel. portable', contact.telephonePortable, colors, fonts);
  if (contact.telephoneFixe) col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Tel. fixe', contact.telephoneFixe, colors, fonts);

  y = Math.min(col1Y, col2Y) - 20;

  // ========================================
  // 💼 SECTION POSTES
  // ========================================

  if (checkNeedNewPage(y, 200, config)) {
    currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
    pages.push(currentPage);
    pageNumber++;
    y = config.pageHeight - config.headerHeight;
    drawHeader(currentPage, config, colors, fonts, logo, devisData);
    y -= 20;
  }

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    `Postes a pourvoir (${postes.length})`,
    '',
    rgb(0.93, 0.99, 0.96),
    colors,
    fonts
  );

  y -= 12;

  postes.forEach((poste: any, index: number) => {
    if (checkNeedNewPage(y, 120, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, logo, devisData);
      y -= 20;
    }

    const posteLabel = getTextValue(poste.poste) || 'Poste';
    const salaireBrut = formatCurrency(poste.salaireBrut);

    const cardHeight = 100;

    // Bordure verte à gauche UNIQUEMENT (pas de bordure complète)
    currentPage.drawRectangle({
      x: config.margin,
      y: y - cardHeight,
      width: 4,
      height: cardHeight,
      color: colors.emerald,
    });

    // Fond gris très clair
    currentPage.drawRectangle({
      x: config.margin + 4,
      y: y - cardHeight,
      width: config.contentWidth - 4,
      height: cardHeight,
      color: rgb(0.98, 0.98, 0.99),
    });

    // Titre du poste
    const safePosteLabel = toPdfText(`#${index + 1} - ${posteLabel}`);
    currentPage.drawText(safePosteLabel, {
      x: config.margin + 14,
      y: y - 18,
      size: 10,
      font: fontBold,
      color: colors.navy,
    });

    // Prix à droite
    if (salaireBrut) {
      const priceText = toPdfText(salaireBrut);
      const priceWidth = fontBold.widthOfTextAtSize(priceText, 12);
      currentPage.drawText(priceText, {
        x: config.pageWidth - config.margin - priceWidth - 12,
        y: y - 18,
        size: 12,
        font: fontBold,
        color: colors.emerald,
      });

      currentPage.drawText('/mois', {
        x: config.pageWidth - config.margin - 30,
        y: y - 28,
        size: 7,
        font: fontRegular,
        color: colors.gray,
      });
    }

    // Badges
    let badgeX = config.margin + 14;
    const badgeY = y - 36;

    // Badge secteur
    const secteurText = toPdfText(getTextValue(poste.secteur) || 'Secteur');
    const secteurWidth = fontRegular.widthOfTextAtSize(secteurText, 7) + 12;
    currentPage.drawRectangle({
      x: badgeX,
      y: badgeY - 3,
      width: secteurWidth,
      height: 14,
      color: rgb(0.90, 0.97, 0.93),
    });
    currentPage.drawText(secteurText, {
      x: badgeX + 6,
      y: badgeY + 1,
      size: 7,
      font: fontRegular,
      color: rgb(0.06, 0.73, 0.51),
    });
    badgeX += secteurWidth + 6;

    // Badge classification
    const classifText = toPdfText(getTextValue(poste.classification) || '');
    if (classifText) {
      const classifWidth = fontRegular.widthOfTextAtSize(classifText, 7) + 12;
      currentPage.drawRectangle({
        x: badgeX,
        y: badgeY - 3,
        width: classifWidth,
        height: 14,
        color: rgb(0.90, 0.93, 0.99),
      });
      currentPage.drawText(classifText, {
        x: badgeX + 6,
        y: badgeY + 1,
        size: 7,
        font: fontRegular,
        color: rgb(0.12, 0.45, 0.93),
      });
      badgeX += classifWidth + 6;
    }

    // Quantité
    const qtyText = toPdfText(`Quantite: ${poste.quantite || 1}`);
    currentPage.drawText(qtyText, {
      x: badgeX,
      y: badgeY + 1,
      size: 7,
      font: fontRegular,
      color: colors.gray,
    });

    // Détails (3 colonnes)
    let detailY = y - 54;
    const colWidth = (config.contentWidth - 40) / 3;

    // Col 1 : Rémunération
    currentPage.drawText('Remuneration', {
      x: config.margin + 14,
      y: detailY,
      size: 7,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 12;
    currentPage.drawText(toPdfText(`Salaire: ${salaireBrut}`), {
      x: config.margin + 14,
      y: detailY,
      size: 8,
      font: fontRegular,
      color: colors.navy,
    });
    if (poste.tauxHoraireBrut) {
      detailY -= 11;
      currentPage.drawText(toPdfText(`Taux: ${formatCurrency(poste.tauxHoraireBrut)}/h`), {
        x: config.margin + 14,
        y: detailY,
        size: 8,
        font: fontRegular,
        color: colors.navy,
      });
    }

    // Col 2 : Période
    detailY = y - 54;
    currentPage.drawText('Periode', {
      x: config.margin + 14 + colWidth,
      y: detailY,
      size: 7,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 12;
    if (conditions.dateDebut) {
      currentPage.drawText(toPdfText(`Debut: ${formatDateForPdf(conditions.dateDebut)}`), {
        x: config.margin + 14 + colWidth,
        y: detailY,
        size: 8,
        font: fontRegular,
        color: colors.navy,
      });
      detailY -= 11;
    }
    if (conditions.dateFin) {
      currentPage.drawText(toPdfText(`Fin: ${formatDateForPdf(conditions.dateFin)}`), {
        x: config.margin + 14 + colWidth,
        y: detailY,
        size: 8,
        font: fontRegular,
        color: colors.navy,
      });
    }

    // Col 3 : Lieu
    detailY = y - 54;
    currentPage.drawText('Lieu & Nationalite', {
      x: config.margin + 14 + colWidth * 2,
      y: detailY,
      size: 7,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 12;
    const nationalite = poste.labelPays || poste.nationalite || 'Non renseignee';
    currentPage.drawText(toPdfText(`Nat.: ${nationalite}`), {
      x: config.margin + 14 + colWidth * 2,
      y: detailY,
      size: 8,
      font: fontRegular,
      color: colors.navy,
    });
    if (conditions.lieuxMission) {
      detailY -= 11;
      const lieuLines = wrapText(conditions.lieuxMission, fontRegular, 8, colWidth - 10);
      lieuLines.slice(0, 2).forEach((line) => {
        currentPage.drawText(toPdfText(line), {
          x: config.margin + 14 + colWidth * 2,
          y: detailY,
          size: 8,
          font: fontRegular,
          color: colors.navy,
        });
        detailY -= 11;
      });
    }

    y -= cardHeight + 12;
  });

  // ========================================
  // 📋 SECTION CONDITIONS
  // ========================================

  if (conditions && Object.keys(conditions).length > 0) {
    if (checkNeedNewPage(y, 100, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, logo, devisData);
      y -= 20;
    }

    y = drawSectionHeader(
      currentPage,
      config.margin,
      y,
      config.contentWidth,
      'Conditions de travail',
      '',
      rgb(0.99, 0.96, 0.93),
      colors,
      fonts
    );

    y -= 12;

    const conditionsList: string[] = [];
    if (conditions.motifRecours) conditionsList.push(`Motif: ${getTextValue(conditions.motifRecours)}`);
    if (conditions.delaiPaiement) conditionsList.push(`Paiement: ${getTextValue(conditions.delaiPaiement)}`);
    if (conditions.baseHoraire) conditionsList.push(`Base: ${conditions.baseHoraire}h/mois`);
    if (conditions.hebergement?.chargeEU) conditionsList.push('Hebergement: EU');
    if (conditions.transportLocal?.chargeETT) conditionsList.push('Transport: ETT');
    if (conditions.repas?.type) {
      const repasType = getTextValue(conditions.repas.type);
      const repasMontant = conditions.repas.montant ? ` (${formatCurrency(conditions.repas.montant)}/j)` : '';
      conditionsList.push(`Repas: ${repasType}${repasMontant}`);
    }

    if (conditionsList.length > 0) {
      conditionsList.forEach((item) => {
        currentPage.drawText('•', {
          x: config.margin + 12,
          y: y,
          size: 10,
          font: fontRegular,
          color: colors.navy,
        });

        const lines = wrapText(item, fontRegular, 8, config.contentWidth - 40);
        lines.forEach((line) => {
          currentPage.drawText(line, {
            x: config.margin + 24,
            y: y,
            size: 8,
            font: fontRegular,
            color: colors.navy,
          });
          y -= 12;
        });
      });
    } else {
      currentPage.drawText('Aucune condition specifique', {
        x: config.margin + 12,
        y: y,
        size: 8,
        font: fontRegular,
        color: colors.gray,
      });
      y -= 12;
    }

    y -= 20;
  }

  // ========================================
  // 👥 SECTION CANDIDATS
  // ========================================

  if (candidats && Object.keys(candidats).length > 0) {
    if (checkNeedNewPage(y, 100, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, logo, devisData);
      y -= 20;
    }

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

    y -= 12;

    const candidatsList: string[] = [];
    
    if (candidats.experience) {
      const expText = candidats.experience.obligatoire ? 'Obligatoire' : 'Non obligatoire';
      const expAnnees = candidats.experience.annees ? ` - ${candidats.experience.annees} ans` : '';
      candidatsList.push(`Experience: ${expText}${expAnnees}`);
    }
    
    if (candidats.formation) {
      const formText = candidats.formation.obligatoire ? 'Obligatoire' : 'Non obligatoire';
      const formType = candidats.formation.type ? ` - ${getTextValue(candidats.formation.type)}` : '';
      candidatsList.push(`Formation: ${formText}${formType}`);
    }
    
    if (candidats.travailRisque?.active) {
      const risqueText = candidats.travailRisque.precisions || 'Oui';
      candidatsList.push(`Travail a risque: ${risqueText}`);
    }
    
    if (candidats.langues && Object.keys(candidats.langues).length > 0) {
      const languesText = Object.entries(candidats.langues)
        .map(([langue, niveau]) => `${getTextValue(langue)} (${getTextValue(niveau)})`)
        .join(', ');
      candidatsList.push(`Langues: ${languesText}`);
    }
    
    if (candidats.permis?.requis) {
      const permisCategorie = candidats.permis.categorie ? ` - Cat. ${getTextValue(candidats.permis.categorie)}` : '';
      candidatsList.push(`Permis: Requis${permisCategorie}`);
    }
    
    if (candidats.outillage?.requis) {
      const outillageType = candidats.outillage.type ? ` - ${getTextValue(candidats.outillage.type)}` : '';
      candidatsList.push(`Outillage: Requis${outillageType}`);
    }
    
    if (candidats.epis && candidats.epis.length > 0) {
      const episText = candidats.epis.map((epi: any) => getTextValue(epi)).join(', ');
      candidatsList.push(`EPIs: ${episText}`);
    }

    if (candidatsList.length > 0) {
      candidatsList.forEach((item) => {
        currentPage.drawText('•', {
          x: config.margin + 12,
          y: y,
          size: 10,
          font: fontRegular,
          color: colors.navy,
        });

        const lines = wrapText(item, fontRegular, 8, config.contentWidth - 40);
        lines.forEach((line) => {
          currentPage.drawText(line, {
            x: config.margin + 24,
            y: y,
            size: 8,
            font: fontRegular,
            color: colors.navy,
          });
          y -= 12;
        });
      });
    } else {
      currentPage.drawText('Aucun profil specifique', {
        x: config.margin + 12,
        y: y,
        size: 8,
        font: fontRegular,
        color: colors.gray,
      });
      y -= 12;
    }

    y -= 20;
  }

  // ========================================
  // 🛡️ SECTION SIGNATURE ÉLECTRONIQUE
  // ========================================

  if (isSigned && signature && signature.signataire) {
    // Nouvelle page pour la signature
    currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
    pages.push(currentPage);
    pageNumber++;
    y = config.pageHeight - config.headerHeight;
    drawHeader(currentPage, config, colors, fonts, logo, devisData);
    y -= 20;

    // En-tête signature
    currentPage.drawRectangle({
      x: config.margin,
      y: y - 50,
      width: config.contentWidth,
      height: 50,
      color: rgb(0.93, 0.99, 0.96),
    });

    currentPage.drawRectangle({
      x: config.margin,
      y: y - 50,
      width: config.contentWidth,
      height: 4,
      color: colors.green,
    });

    currentPage.drawRectangle({
      x: config.margin + 12,
      y: y - 36,
      width: 20,
      height: 20,
      color: colors.green,
    });

    currentPage.drawText('Certificat de Signature Electronique', {
      x: config.margin + 42,
      y: y - 22,
      size: 12,
      font: fontBold,
      color: colors.navy,
    });

    currentPage.drawText('[ v ] Conforme au reglement eIDAS (UE) n°910/2014', {
      x: config.margin + 42,
      y: y - 36,
      size: 7,
      font: fontRegular,
      color: colors.green,
    });

    y -= 62;

    // Identité du signataire
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.green,
    });

    currentPage.drawText('Identite du signataire', {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    col1Y = y;
    col2Y = y;

    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Nom', `${signature.signataire.prenom} ${signature.signataire.nom}`, colors, fonts);
    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Fonction', signature.signataire.fonction || '', colors, fonts);
    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Email', signature.signataire.email || '', colors, fonts, columnWidth - 20);

    col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Entreprise', signature.signataire.entreprise || '', colors, fonts);
    col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'SIRET', signature.signataire.siret || '', colors, fonts);

    y = Math.min(col1Y, col2Y) - 20;

    currentPage.drawLine({
      start: { x: config.margin + 12, y: y },
      end: { x: config.pageWidth - config.margin - 12, y: y },
      thickness: 0.5,
      color: colors.lightGray,
    });

    y -= 16;

    // Traçabilité
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.blue,
    });

    currentPage.drawText('Tracabilite', {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    col1Y = y;
    col2Y = y;

    if (signature.metadata?.timestampReadable) {
      col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Date/Heure', signature.metadata.timestampReadable, colors, fonts);
    }
    if (signature.metadata?.timestamp) {
      col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'ISO 8601', signature.metadata.timestamp, colors, fonts, columnWidth - 20);
    }

    if (signature.metadata?.ipAddress) {
      col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'IP', signature.metadata.ipAddress, colors, fonts);
    }
    if (signature.metadata?.userAgent) {
      const userAgentShort = signature.metadata.userAgent.substring(0, 50) + '...';
      col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Navigateur', userAgentShort, colors, fonts, columnWidth - 20);
    }

    y = Math.min(col1Y, col2Y) - 20;

    currentPage.drawLine({
      start: { x: config.margin + 12, y: y },
      end: { x: config.pageWidth - config.margin - 12, y: y },
      thickness: 0.5,
      color: colors.lightGray,
    });

    y -= 16;

    // Intégrité
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.violet,
    });

    currentPage.drawText("Integrite", {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    if (signature.integrite?.hashAlgorithm) {
      currentPage.drawText('Algorithme', {
        x: config.margin + 12,
        y: y,
        size: 8,
        font: fontRegular,
        color: colors.gray,
      });

      y -= 14;

      currentPage.drawRectangle({
        x: config.margin + 12,
        y: y - 2,
        width: fontBold.widthOfTextAtSize(toPdfText(signature.integrite.hashAlgorithm), 8) + 12,
        height: 14,
        color: rgb(0.93, 0.91, 0.99),
      });

      currentPage.drawText(toPdfText(signature.integrite.hashAlgorithm), {
        x: config.margin + 18,
        y: y + 2,
        size: 8,
        font: fontBold,
        color: colors.violet,
      });

      y -= 20;
    }

    if (signature.integrite?.documentHash) {
      currentPage.drawText('Hash', {
        x: config.margin + 12,
        y: y,
        size: 8,
        font: fontRegular,
        color: colors.gray,
      });

      y -= 14;

      currentPage.drawRectangle({
        x: config.margin + 12,
        y: y - 24,
        width: config.contentWidth - 24,
        height: 26,
        color: rgb(0.98, 0.98, 0.98),
        borderColor: colors.lightGray,
        borderWidth: 0.5,
      });

      const hashLines = wrapText(signature.integrite.documentHash, fontMono, 7, config.contentWidth - 36);
      let hashY = y - 8;
      hashLines.forEach((line) => {
        currentPage.drawText(line, {
          x: config.margin + 18,
          y: hashY,
          size: 7,
          font: fontMono,
          color: colors.navy,
        });
        hashY -= 9;
      });

      y -= 30;
    }

    y -= 20;

    currentPage.drawLine({
      start: { x: config.margin + 12, y: y },
      end: { x: config.pageWidth - config.margin - 12, y: y },
      thickness: 0.5,
      color: colors.lightGray,
    });

    y -= 20;

    // Image de signature si disponible (APRÈS Intégrité)
    if (signature.image) {
      try {
        // Titre "Signature"
        currentPage.drawRectangle({
          x: config.margin,
          y: y,
          width: 4,
          height: 2,
          color: colors.green,
        });

        currentPage.drawText('Signature', {
          x: config.margin + 12,
          y: y,
          size: 9,
          font: fontBold,
          color: colors.navy,
        });

        y -= 20;

        // Extraire l'image base64
        const base64Data = signature.image.split(',')[1] || signature.image;
        const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        let signatureImage: PDFImage;
        if (signature.image.includes('png')) {
          signatureImage = await pdfDoc.embedPng(imageBytes);
        } else {
          signatureImage = await pdfDoc.embedJpg(imageBytes);
        }

        const imgWidth = 200;
        const imgHeight = 80;

        currentPage.drawImage(signatureImage, {
          x: config.margin + 12,
          y: y - imgHeight,
          width: imgWidth,
          height: imgHeight,
        });

        y -= imgHeight + 20;
      } catch (error) {
        console.error('Erreur chargement image signature:', error);
        y -= 20;
      }
    }

    y -= 20;

    // Consentement
    if (signature.consentement) {
      currentPage.drawRectangle({
        x: config.margin,
        y: y - 36,
        width: config.contentWidth,
        height: 36,
        color: rgb(0.93, 0.99, 0.96),
        borderColor: rgb(0.06, 0.73, 0.51),
        borderWidth: 1,
      });

      currentPage.drawRectangle({
        x: config.margin + 12,
        y: y - 20,
        width: 10,
        height: 10,
        color: colors.green,
      });

      currentPage.drawText('Consentement', {
        x: config.margin + 28,
        y: y - 14,
        size: 9,
        font: fontBold,
        color: colors.navy,
      });

      const accepteText = signature.consentement.accepteCGV ? "J'accepte les CGV" : 'CGV non acceptees';
      currentPage.drawText(toPdfText(accepteText), {
        x: config.margin + 28,
        y: y - 26,
        size: 7.5,
        font: fontRegular,
        color: colors.navy,
      });

      y -= 42;
    }
  }

  // ========================================
  // ✅ AJOUT DES FOOTERS
  // ========================================

  const totalPages = pages.length;
  pages.forEach((page, index) => {
    drawFooter(page, config, colors, fontRegular, index + 1, totalPages);
  });

  return await pdfDoc.save();
}