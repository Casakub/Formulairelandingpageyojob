/**
 * 🎨 GÉNÉRATEUR PDF MODERNE - VERSION 3.0 
 * 
 * Design complet aligné sur le dashboard avec TOUS les champs
 * - Logo YOJOB intégré
 * - Sections complètes (entreprise, contact, postes, conditions, candidats)
 * - Certificat de signature électronique détaillé
 * - Design épuré et professionnel
 */

import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "npm:pdf-lib@1.17.1";

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
  gray: ReturnType<typeof rgb>;
  lightGray: ReturnType<typeof rgb>;
  white: ReturnType<typeof rgb>;
  background: ReturnType<typeof rgb>;
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
  devisData: {
    numero: string;
    isSigned: boolean;
    createdAt: string;
  }
) {
  const { pageWidth, pageHeight } = config;
  const headerHeight = 70;

  // Background gradient bleu → cyan
  const gradientSteps = 40;
  const stepWidth = pageWidth / gradientSteps;
  
  for (let i = 0; i < gradientSteps; i++) {
    const ratio = i / (gradientSteps - 1);
    const r = 0.12 + (0.03 - 0.12) * ratio; // #1E3A8A → #06B6D4
    const g = 0.23 + (0.71 - 0.23) * ratio;
    const b = 0.54 + (0.83 - 0.54) * ratio;
    
    page.drawRectangle({
      x: i * stepWidth,
      y: pageHeight - headerHeight,
      width: stepWidth + 1,
      height: headerHeight,
      color: rgb(r, g, b),
    });
  }

  // Logo YOJOB stylisé
  page.drawText('YO', {
    x: 30,
    y: pageHeight - 32,
    size: 24,
    font: fonts.bold,
    color: colors.white,
  });
  
  page.drawText('JOB', {
    x: 60,
    y: pageHeight - 32,
    size: 24,
    font: fonts.bold,
    color: colors.cyan,
  });

  page.drawText('Courtage en recrutement europeen', {
    x: 30,
    y: pageHeight - 48,
    size: 8,
    font: fonts.regular,
    color: rgb(1, 1, 1, 0.85),
  });

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
    y: y - 36,
    width,
    height: 36,
    color: bgColor,
  });

  // Icône (carré coloré simple au lieu d'emoji)
  const iconColor = rgb(bgColor.red * 0.6, bgColor.green * 0.6, bgColor.blue * 0.6);
  page.drawRectangle({
    x: x + 12,
    y: y - 26,
    width: 16,
    height: 16,
    color: iconColor,
  });

  // Titre
  page.drawText(toPdfText(title), {
    x: x + 36,
    y: y - 21,
    size: 11,
    font: fonts.bold,
    color: colors.navy,
  });

  // Bordure inférieure
  page.drawLine({
    start: { x, y: y - 36 },
    end: { x: x + width, y: y - 36 },
    thickness: 2,
    color: rgb(bgColor.red * 0.7, bgColor.green * 0.7, bgColor.blue * 0.7),
  });

  return y - 44; // Position Y pour le contenu
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
    green: rgb(0.06, 0.73, 0.51), // #10B981
    emerald: rgb(0.20, 0.83, 0.61), // #34D399
    orange: rgb(0.96, 0.62, 0.09), // #F59E0B
    pink: rgb(0.98, 0.45, 0.68), // #F472B6
    navy: rgb(0.12, 0.16, 0.24), // #1E293B
    gray: rgb(0.39, 0.45, 0.55), // #64748B
    lightGray: rgb(0.89, 0.91, 0.94), // #E2E8F0
    white: rgb(1, 1, 1),
    background: rgb(0.98, 0.98, 0.99),
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
  drawHeader(currentPage, config, colors, fonts, devisData);

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
    '🏢',
    rgb(0.93, 0.96, 0.99), // bleu très clair
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
    drawHeader(currentPage, config, colors, fonts, devisData);
    y -= 20;
  }

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    'Personne de contact',
    '👤',
    rgb(0.96, 0.95, 0.99), // violet clair
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
    drawHeader(currentPage, config, colors, fonts, devisData);
    y -= 20;
  }

  y = drawSectionHeader(
    currentPage,
    config.margin,
    y,
    config.contentWidth,
    `Postes a pourvoir (${postes.length})`,
    '💼',
    rgb(0.93, 0.99, 0.96), // vert clair
    colors,
    fonts
  );

  y -= 12;

  postes.forEach((poste: any, index: number) => {
    if (checkNeedNewPage(y, 180, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, devisData);
      y -= 20;
    }

    const posteLabel = getTextValue(poste.poste) || 'Poste';
    const salaireBrut = formatCurrency(poste.salaireBrut);

    // Bordure de carte
    const cardHeight = 120;
    currentPage.drawRectangle({
      x: config.margin,
      y: y - cardHeight,
      width: config.contentWidth,
      height: cardHeight,
      borderColor: colors.lightGray,
      borderWidth: 1,
    });

    // Bordure verte à gauche
    currentPage.drawRectangle({
      x: config.margin,
      y: y - cardHeight,
      width: 4,
      height: cardHeight,
      color: colors.emerald,
    });

    // Titre du poste
    const safePosteLabel = toPdfText(`POSTE #${index + 1} - ${posteLabel}`);
    currentPage.drawText(safePosteLabel, {
      x: config.margin + 14,
      y: y - 18,
      size: 10,
      font: fontBold,
      color: colors.emerald,
    });

    // Prix à droite
    if (salaireBrut) {
      const priceText = toPdfText(`${salaireBrut}/mois`);
      const priceWidth = fontBold.widthOfTextAtSize(priceText, 11);
      currentPage.drawText(priceText, {
        x: config.pageWidth - config.margin - priceWidth - 12,
        y: y - 18,
        size: 11,
        font: fontBold,
        color: colors.green,
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
      color: rgb(0.85, 0.97, 0.93),
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
        color: rgb(0.85, 0.93, 0.99),
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

    // Badge quantité
    const qtyText = toPdfText(`Quantite: ${poste.quantite || 1}`);
    currentPage.drawText(qtyText, {
      x: badgeX,
      y: badgeY + 1,
      size: 7,
      font: fontRegular,
      color: colors.gray,
    });

    // Détails du poste (3 colonnes)
    let detailY = y - 54;
    const colWidth = (config.contentWidth - 40) / 3;

    // Colonne 1 : Rémunération
    currentPage.drawText('Remuneration', {
      x: config.margin + 14,
      y: detailY,
      size: 7.5,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 14;
    detailY -= drawKeyValue(currentPage, config.margin + 14, detailY, 'Salaire brut', salaireBrut, colors, fonts);
    if (poste.tauxHoraireBrut) detailY -= drawKeyValue(currentPage, config.margin + 14, detailY, 'Taux horaire', formatCurrency(poste.tauxHoraireBrut) + '/h', colors, fonts);
    if (poste.tauxETT) detailY -= drawKeyValue(currentPage, config.margin + 14, detailY, 'Taux ETT', formatCurrency(poste.tauxETT) + '/h', colors, fonts);

    // Colonne 2 : Période
    detailY = y - 54;
    currentPage.drawText('Periode', {
      x: config.margin + 14 + colWidth,
      y: detailY,
      size: 7.5,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 14;
    if (conditions.dateDebut) detailY -= drawKeyValue(currentPage, config.margin + 14 + colWidth, detailY, 'Debut', formatDateForPdf(conditions.dateDebut), colors, fonts);
    if (conditions.dateFin) detailY -= drawKeyValue(currentPage, config.margin + 14 + colWidth, detailY, 'Fin', formatDateForPdf(conditions.dateFin), colors, fonts);
    if (conditions.periodeEssai) detailY -= drawKeyValue(currentPage, config.margin + 14 + colWidth, detailY, 'Periode essai', getTextValue(conditions.periodeEssai), colors, fonts);

    // Colonne 3 : Nationalité/Lieu
    detailY = y - 54;
    currentPage.drawText('Lieu & Nationalite', {
      x: config.margin + 14 + colWidth * 2,
      y: detailY,
      size: 7.5,
      font: fontBold,
      color: colors.gray,
    });
    detailY -= 14;
    const nationalite = poste.labelPays || poste.nationalite || 'Non renseignee';
    detailY -= drawKeyValue(currentPage, config.margin + 14 + colWidth * 2, detailY, 'Nationalite', nationalite, colors, fonts);
    if (conditions.lieuxMission) detailY -= drawKeyValue(currentPage, config.margin + 14 + colWidth * 2, detailY, 'Lieu de mission', conditions.lieuxMission, colors, fonts, colWidth - 10);

    y -= cardHeight + 12;
  });

  // ========================================
  // 📋 SECTION CONDITIONS
  // ========================================

  if (conditions && Object.keys(conditions).length > 0) {
    if (checkNeedNewPage(y, 150, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, devisData);
      y -= 20;
    }

    y = drawSectionHeader(
      currentPage,
      config.margin,
      y,
      config.contentWidth,
      'Conditions de travail',
      '📋',
      rgb(0.99, 0.96, 0.93), // orange clair
      colors,
      fonts
    );

    y -= 12;

    currentPage.drawText('•', {
      x: config.margin + 12,
      y: y,
      size: 10,
      font: fontRegular,
      color: colors.navy,
    });

    const conditionsList: string[] = [];
    if (conditions.motifRecours) conditionsList.push(`Motif de recours: ${getTextValue(conditions.motifRecours)}`);
    if (conditions.delaiPaiement) conditionsList.push(`Delai de paiement: ${getTextValue(conditions.delaiPaiement)}`);
    if (conditions.baseHoraire) conditionsList.push(`Base horaire: ${conditions.baseHoraire}h/mois`);
    if (conditions.hebergement?.chargeEU) conditionsList.push('Hebergement: Pris en charge par l\'entreprise utilisatrice');
    if (conditions.transportLocal?.chargeETT) conditionsList.push('Transport local: Pris en charge');
    if (conditions.repas?.type) {
      const repasType = getTextValue(conditions.repas.type);
      const repasMontant = conditions.repas.montant ? ` (${formatCurrency(conditions.repas.montant)}/jour)` : '';
      conditionsList.push(`Repas: ${repasType}${repasMontant}`);
    }

    conditionsList.forEach((item) => {
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

    if (conditionsList.length === 0) {
      currentPage.drawText('Aucune condition specifique renseignee', {
        x: config.margin + 24,
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
    if (checkNeedNewPage(y, 150, config)) {
      currentPage = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      pages.push(currentPage);
      pageNumber++;
      y = config.pageHeight - config.headerHeight;
      drawHeader(currentPage, config, colors, fonts, devisData);
      y -= 20;
    }

    y = drawSectionHeader(
      currentPage,
      config.margin,
      y,
      config.contentWidth,
      'Profil des candidats recherches',
      '👥',
      rgb(0.99, 0.95, 0.97), // rose clair
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
      const permisCategorie = candidats.permis.categorie ? ` - Categorie ${getTextValue(candidats.permis.categorie)}` : '';
      candidatsList.push(`Permis de conduire: Requis${permisCategorie}`);
    }
    
    if (candidats.outillage?.requis) {
      const outillageType = candidats.outillage.type ? ` - ${getTextValue(candidats.outillage.type)}` : '';
      candidatsList.push(`Outillage: Requis${outillageType}`);
    }
    
    if (candidats.epis && candidats.epis.length > 0) {
      const episText = candidats.epis.map((epi: any) => getTextValue(epi)).join(', ');
      candidatsList.push(`EPIs requis: ${episText}`);
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
      currentPage.drawText('Aucun profil specifique defini', {
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
    drawHeader(currentPage, config, colors, fonts, devisData);
    y -= 20;

    // En-tête spécial signature avec bordure verte
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

    // Carré vert au lieu d'emoji shield
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

    // Checkmark simple au lieu d'emoji
    currentPage.drawText('[ v ] Conforme au reglement eIDAS (UE) n°910/2014', {
      x: config.margin + 42,
      y: y - 36,
      size: 7,
      font: fontRegular,
      color: colors.green,
    });

    y -= 62;

    // Section Identité du signataire
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.green,
    });

    currentPage.drawText('Identite du signataire certifiee', {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    col1Y = y;
    col2Y = y;

    // Colonne 1
    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Nom complet', `${signature.signataire.prenom} ${signature.signataire.nom}`, colors, fonts);
    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Fonction', signature.signataire.fonction || '', colors, fonts);
    col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Email', signature.signataire.email || '', colors, fonts, columnWidth - 20);

    // Colonne 2
    col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Entreprise', signature.signataire.entreprise || '', colors, fonts);
    col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'SIRET', signature.signataire.siret || '', colors, fonts);

    y = Math.min(col1Y, col2Y) - 20;

    // Ligne séparatrice
    currentPage.drawLine({
      start: { x: config.margin + 12, y: y },
      end: { x: config.pageWidth - config.margin - 12, y: y },
      thickness: 0.5,
      color: colors.lightGray,
    });

    y -= 16;

    // Section Traçabilité technique
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.blue,
    });

    currentPage.drawText('Tracabilite technique', {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    col1Y = y;
    col2Y = y;

    // Colonne 1
    if (signature.metadata?.timestampReadable) {
      col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Date et heure (Paris)', signature.metadata.timestampReadable, colors, fonts);
    }
    if (signature.metadata?.timestamp) {
      col1Y -= drawKeyValue(currentPage, config.margin + 12, col1Y, 'Horodatage ISO 8601', signature.metadata.timestamp, colors, fonts, columnWidth - 20);
    }

    // Colonne 2
    if (signature.metadata?.ipAddress) {
      col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Adresse IP', signature.metadata.ipAddress, colors, fonts);
    }
    if (signature.metadata?.userAgent) {
      const userAgentShort = signature.metadata.userAgent.substring(0, 60) + (signature.metadata.userAgent.length > 60 ? '...' : '');
      col2Y -= drawKeyValue(currentPage, config.margin + columnWidth + 24, col2Y, 'Navigateur', userAgentShort, colors, fonts, columnWidth - 20);
    }

    y = Math.min(col1Y, col2Y) - 20;

    // Ligne séparatrice
    currentPage.drawLine({
      start: { x: config.margin + 12, y: y },
      end: { x: config.pageWidth - config.margin - 12, y: y },
      thickness: 0.5,
      color: colors.lightGray,
    });

    y -= 16;

    // Section Preuve d'intégrité
    currentPage.drawRectangle({
      x: config.margin,
      y: y,
      width: 4,
      height: 2,
      color: colors.violet,
    });

    currentPage.drawText("Preuve d'integrite du document", {
      x: config.margin + 12,
      y: y,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    y -= 16;

    if (signature.integrite?.hashAlgorithm) {
      currentPage.drawText('Algorithme de hachage', {
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
      currentPage.drawText('Empreinte numerique du devis', {
        x: config.margin + 12,
        y: y,
        size: 8,
        font: fontRegular,
        color: colors.gray,
      });

      y -= 14;

      // Rectangle de fond pour le hash
      currentPage.drawRectangle({
        x: config.margin + 12,
        y: y - 28,
        width: config.contentWidth - 24,
        height: 30,
        color: rgb(0.98, 0.98, 0.98),
        borderColor: colors.lightGray,
        borderWidth: 0.5,
      });

      // Hash sur 2 lignes
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

      y -= 34;

      if (signature.integrite.devisNumero) {
        currentPage.drawText(toPdfText(`Cette empreinte garantit que le devis ${signature.integrite.devisNumero} n'a pas ete modifie depuis la signature.`), {
          x: config.margin + 12,
          y: y,
          size: 7,
          font: fontRegular,
          color: colors.gray,
        });
        y -= 12;
      }
    }

    y -= 20;

    // Section Consentement
    if (signature.consentement) {
      currentPage.drawRectangle({
        x: config.margin,
        y: y - 44,
        width: config.contentWidth,
        height: 44,
        color: rgb(0.93, 0.99, 0.96),
        borderColor: rgb(0.06, 0.73, 0.51),
        borderWidth: 1,
      });

      // Carré vert au lieu d'emoji checkmark
      currentPage.drawRectangle({
        x: config.margin + 12,
        y: y - 24,
        width: 12,
        height: 12,
        color: colors.green,
      });

      currentPage.drawText('Consentement et acceptation', {
        x: config.margin + 32,
        y: y - 16,
        size: 9,
        font: fontBold,
        color: colors.navy,
      });

      const accepteText = signature.consentement.accepteCGV ? 'J\'accepte les Conditions Generales de Vente' : 'CGV non acceptees';
      currentPage.drawText(toPdfText(accepteText), {
        x: config.margin + 32,
        y: y - 28,
        size: 7.5,
        font: fontRegular,
        color: colors.navy,
      });

      if (signature.consentement.dateAcceptation) {
        currentPage.drawText(toPdfText(`Date d'acceptation: ${formatDateTimeForPdf(signature.consentement.dateAcceptation)}`), {
          x: config.margin + 32,
          y: y - 38,
          size: 7,
          font: fontRegular,
          color: colors.gray,
        });
      }

      y -= 50;
    }
  }

  // ========================================
  // ✅ AJOUT DES FOOTERS SUR TOUTES LES PAGES
  // ========================================

  const totalPages = pages.length;
  pages.forEach((page, index) => {
    drawFooter(page, config, colors, fontRegular, index + 1, totalPages);
  });

  return await pdfDoc.save();
}