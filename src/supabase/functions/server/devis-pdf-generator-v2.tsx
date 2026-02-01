/**
 * 🎨 GÉNÉRATEUR PDF MODERNE - VERSION 2.0
 * 
 * Design épuré et adaptatif basé sur les maquettes
 * - Header gradient violet moderne
 * - Cards avec bordures colorées à gauche
 * - Layout responsive selon les champs présents
 * - Hiérarchie visuelle claire
 */

import { PDFDocument, StandardFonts, rgb, PDFPage } from "npm:pdf-lib@1.17.1";

// ========================================
// 🎨 TYPES ET CONSTANTES
// ========================================

interface PDFColors {
  violet: ReturnType<typeof rgb>;
  cyan: ReturnType<typeof rgb>;
  green: ReturnType<typeof rgb>;
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
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatCurrency = (value?: number): string => {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return '';
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
  font: any,
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
  fonts: { regular: any; bold: any },
  devisData: {
    numero: string;
    isSigned: boolean;
    createdAt: string;
    expiresAt: string;
  }
) {
  const { pageWidth, pageHeight } = config;
  const headerHeight = 60;

  // Background gradient violet → cyan
  const gradientSteps = 40;
  const stepWidth = pageWidth / gradientSteps;
  
  for (let i = 0; i < gradientSteps; i++) {
    const ratio = i / (gradientSteps - 1);
    const r = 0.31 + (0.03 - 0.31) * ratio; // #4F46E5 → #06B6D4
    const g = 0.27 + (0.71 - 0.27) * ratio;
    const b = 0.90 + (0.83 - 0.90) * ratio;
    
    page.drawRectangle({
      x: i * stepWidth,
      y: pageHeight - headerHeight,
      width: stepWidth + 1,
      height: headerHeight,
      color: rgb(r, g, b),
    });
  }

  // Logo YOJOB (texte)
  page.drawText('YOJOB', {
    x: 30,
    y: pageHeight - 28,
    size: 18,
    font: fonts.bold,
    color: colors.white,
  });

  page.drawText('Courtage en recrutement europeen', {
    x: 30,
    y: pageHeight - 44,
    size: 8,
    font: fonts.regular,
    color: rgb(1, 1, 1, 0.85),
  });

  // Numéro de devis et statut (à droite)
  const devisLabel = `DEVIS ${devisData.numero}`;
  const devisWidth = fonts.bold.widthOfTextAtSize(devisLabel, 12);
  
  page.drawText(devisLabel, {
    x: pageWidth - 160,
    y: pageHeight - 26,
    size: 12,
    font: fonts.bold,
    color: colors.white,
  });

  // Badge SIGNÉ ou A SIGNER
  const badgeText = devisData.isSigned ? 'SIGNE' : 'A SIGNER';
  const badgeColor = devisData.isSigned ? colors.green : rgb(0.95, 0.55, 0.15);
  const badgeWidth = fonts.bold.widthOfTextAtSize(badgeText, 8) + 16;
  
  page.drawRectangle({
    x: pageWidth - 90,
    y: pageHeight - 43,
    width: badgeWidth,
    height: 16,
    color: badgeColor,
  });

  page.drawText(badgeText, {
    x: pageWidth - 82,
    y: pageHeight - 38,
    size: 8,
    font: fonts.bold,
    color: colors.white,
  });

  // Dates sous le header
  const datesY = pageHeight - headerHeight - 12;
  
  page.drawText(`Cree le: ${formatDateForPdf(devisData.createdAt)}`, {
    x: 30,
    y: datesY,
    size: 7,
    font: fonts.regular,
    color: colors.gray,
  });

  page.drawText(`Valable jusqu'au: ${formatDateForPdf(devisData.expiresAt)}`, {
    x: pageWidth / 2 - 50,
    y: datesY,
    size: 7,
    font: fonts.regular,
    color: colors.gray,
  });
}

function drawFooter(
  page: PDFPage,
  config: PDFConfig,
  colors: PDFColors,
  font: any,
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
  page.drawText('YOJOB | contact@yojob.fr | +33 1 23 45 67 89 | yojob.fr', {
    x: config.margin,
    y: footerY,
    size: 7,
    font,
    color: colors.gray,
  });

  // Pagination
  const pageText = `${pageNumber} / ${totalPages}`;
  const pageWidth = font.widthOfTextAtSize(pageText, 7);
  
  page.drawText(pageText, {
    x: config.pageWidth - config.margin - pageWidth,
    y: footerY,
    size: 7,
    font,
    color: colors.gray,
  });
}

function drawSectionCard(
  page: PDFPage,
  x: number,
  yTop: number,
  width: number,
  height: number,
  title: string,
  borderColor: ReturnType<typeof rgb>,
  colors: PDFColors,
  fonts: { regular: any; bold: any }
): number {
  // Fond blanc
  page.drawRectangle({
    x,
    y: yTop - height,
    width,
    height,
    color: colors.white,
    borderColor: colors.lightGray,
    borderWidth: 1,
  });

  // Bordure colorée à gauche (4px)
  page.drawRectangle({
    x,
    y: yTop - height,
    width: 4,
    height,
    color: borderColor,
  });

  // Titre de la section
  if (title) {
    page.drawText(title, {
      x: x + 14,
      y: yTop - 16,
      size: 10,
      font: fonts.bold,
      color: colors.navy,
    });
  }

  return yTop - 26; // Position Y pour le contenu
}

function drawKeyValue(
  page: PDFPage,
  x: number,
  y: number,
  label: string,
  value: string,
  colors: PDFColors,
  fonts: { regular: any; bold: any },
  maxWidth?: number
): number {
  if (!value) return 0;

  // Label en gris
  page.drawText(label, {
    x,
    y,
    size: 7,
    font: fonts.regular,
    color: colors.gray,
  });

  // Valeur en noir (avec wrap si nécessaire)
  if (maxWidth) {
    const lines = wrapText(value, fonts.regular, 9, maxWidth);
    let currentY = y - 10;
    
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
    
    return lines.length * 11 + 14;
  } else {
    page.drawText(value, {
      x,
      y: y - 10,
      size: 9,
      font: fonts.regular,
      color: colors.navy,
    });
    
    return 24;
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

  // Configuration
  const config: PDFConfig = {
    pageWidth: 595.28, // A4
    pageHeight: 841.89,
    margin: 30,
    headerHeight: 74,
    footerHeight: 40,
    contentWidth: 535.28,
  };

  const colors: PDFColors = {
    violet: rgb(0.31, 0.27, 0.90), // #4F46E5
    cyan: rgb(0.03, 0.71, 0.83), // #06B6D4
    green: rgb(0.06, 0.73, 0.51), // #10B981
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
  const expiresAt = prospect?.signatureLinkExpiresAt || 
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const devisData = {
    numero: prospect.numero || 'DEV-XXXXXX',
    isSigned,
    createdAt,
    expiresAt,
  };

  const entreprise = prospect.entreprise || {};
  const contact = prospect.contact || {};
  const postes = Array.isArray(prospect.postes) ? prospect.postes : [];
  const conditions = prospect.conditions || {};
  const candidats = prospect.candidats || {};

  // ========================================
  // 📄 PAGE 1 - INFORMATIONS PRINCIPALES
  // ========================================

  let page = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
  let y = config.pageHeight - config.headerHeight;

  // Header
  drawHeader(page, config, colors, fonts, devisData);

  y -= 20;

  // ========================================
  // 🏢 CLIENT + CONTACT (2 colonnes)
  // ========================================

  const columnWidth = (config.contentWidth - 12) / 2;
  const cardHeight = 120;

  // Colonne 1 : Client (Entreprise)
  let contentY = drawSectionCard(
    page,
    config.margin,
    y,
    columnWidth,
    cardHeight,
    'Client (Entreprise)',
    colors.violet,
    colors,
    fonts
  );

  // Sous-titre IDENTITE
  page.drawText('IDENTITE', {
    x: config.margin + 14,
    y: contentY,
    size: 7.5,
    font: fontBold,
    color: colors.gray,
  });
  contentY -= 12;

  // Champs entreprise
  contentY -= drawKeyValue(page, config.margin + 14, contentY, 'Raison sociale', entreprise.raisonSociale || '', colors, fonts, columnWidth - 24);
  contentY -= drawKeyValue(page, config.margin + 14, contentY, 'Pays', entreprise.pays || '', colors, fonts);
  contentY -= drawKeyValue(page, config.margin + 14, contentY, 'SIRET', entreprise.siret || '', colors, fonts);

  // Colonne 2 : Contact
  contentY = drawSectionCard(
    page,
    config.margin + columnWidth + 12,
    y,
    columnWidth,
    cardHeight,
    'Contact',
    colors.cyan,
    colors,
    fonts
  );

  // Sous-titre IDENTITE
  page.drawText('IDENTITE', {
    x: config.margin + columnWidth + 12 + 14,
    y: contentY,
    size: 7.5,
    font: fontBold,
    color: colors.gray,
  });
  contentY -= 12;

  // Champs contact
  const fullName = [contact.prenom, contact.nom].filter(Boolean).join(' ');
  contentY -= drawKeyValue(page, config.margin + columnWidth + 12 + 14, contentY, 'Nom', fullName, colors, fonts);
  contentY -= drawKeyValue(page, config.margin + columnWidth + 12 + 14, contentY, 'Email', contact.email || '', colors, fonts, columnWidth - 24);
  contentY -= drawKeyValue(page, config.margin + columnWidth + 12 + 14, contentY, 'Telephone', contact.telephonePortable || contact.telephoneFixe || '', colors, fonts);

  y -= cardHeight + 16;

  // ========================================
  // 📊 SYNTHÈSE (badges inline)
  // ========================================

  const synthHeight = 36;
  
  page.drawRectangle({
    x: config.margin,
    y: y - synthHeight,
    width: config.contentWidth,
    height: synthHeight,
    color: rgb(0.97, 0.98, 0.99),
    borderColor: colors.lightGray,
    borderWidth: 1,
  });

  page.drawText('Synthese', {
    x: config.margin + 12,
    y: y - 14,
    size: 8,
    font: fontBold,
    color: colors.navy,
  });

  // Badges
  let badgeX = config.margin + 12;
  const badgeY = y - 28;

  const totalCandidats = postes.reduce((sum: number, p: any) => sum + (Number(p?.quantite) || 0), 0);
  const secteur = postes[0]?.secteur ? getTextValue(postes[0].secteur) : 'Secteur';
  
  // Badge Postes
  const badge1Width = fontBold.widthOfTextAtSize(`${postes.length} Poste(s)`, 8) + 14;
  page.drawRectangle({
    x: badgeX,
    y: badgeY - 4,
    width: badge1Width,
    height: 16,
    color: colors.violet,
  });
  page.drawText(`${postes.length} Poste(s)`, {
    x: badgeX + 7,
    y: badgeY,
    size: 8,
    font: fontBold,
    color: colors.white,
  });
  badgeX += badge1Width + 8;

  // Badge Candidats
  const badge2Width = fontBold.widthOfTextAtSize(`${totalCandidats} Candidat(s)`, 8) + 14;
  page.drawRectangle({
    x: badgeX,
    y: badgeY - 4,
    width: badge2Width,
    height: 16,
    color: colors.cyan,
  });
  page.drawText(`${totalCandidats} Candidat(s)`, {
    x: badgeX + 7,
    y: badgeY,
    size: 8,
    font: fontBold,
    color: colors.white,
  });
  badgeX += badge2Width + 8;

  // Badge Lieu
  const lieu = conditions.lieuxMission || 'Bordeaux';
  const badge3Width = fontBold.widthOfTextAtSize(lieu, 8) + 14;
  page.drawRectangle({
    x: badgeX,
    y: badgeY - 4,
    width: badge3Width,
    height: 16,
    color: rgb(0.20, 0.20, 0.20),
  });
  page.drawText(lieu, {
    x: badgeX + 7,
    y: badgeY,
    size: 8,
    font: fontBold,
    color: colors.white,
  });
  badgeX += badge3Width + 8;

  // Badge Période
  const periode = `${formatDateForPdf(conditions.dateDebut)} ? ${formatDateForPdf(conditions.dateFin)}`;
  const badge4Width = fontBold.widthOfTextAtSize(periode, 8) + 14;
  page.drawRectangle({
    x: badgeX,
    y: badgeY - 4,
    width: badge4Width,
    height: 16,
    color: colors.gray,
  });
  page.drawText(periode, {
    x: badgeX + 7,
    y: badgeY,
    size: 8,
    font: fontBold,
    color: colors.white,
  });

  y -= synthHeight + 16;

  // ========================================
  // 💼 POSTES
  // ========================================

  postes.forEach((poste: any, index: number) => {
    // Vérifier si on a besoin d'une nouvelle page
    if (y < 200) {
      drawFooter(page, config, colors, fontRegular, 1, 2);
      page = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
      y = config.pageHeight - config.headerHeight;
      drawHeader(page, config, colors, fonts, devisData);
      y -= 20;
    }

    const posteLabel = getTextValue(poste.poste) || 'Poste';
    const salaireBrut = formatCurrency(poste.salaireBrut);
    
    const posteHeight = 140;

    // Card du poste
    page.drawRectangle({
      x: config.margin,
      y: y - posteHeight,
      width: config.contentWidth,
      height: posteHeight,
      color: colors.white,
      borderColor: colors.lightGray,
      borderWidth: 1,
    });

    // Bordure violette à gauche
    page.drawRectangle({
      x: config.margin,
      y: y - posteHeight,
      width: 4,
      height: posteHeight,
      color: colors.violet,
    });

    // Titre du poste
    page.drawText(`POSTE #${index + 1} - ${posteLabel.toUpperCase()}`, {
      x: config.margin + 14,
      y: y - 16,
      size: 10,
      font: fontBold,
      color: colors.violet,
    });

    // Prix à droite
    if (salaireBrut) {
      const priceText = `${salaireBrut}/mois`;
      const priceWidth = fontBold.widthOfTextAtSize(priceText, 10);
      page.drawText(priceText, {
        x: config.pageWidth - config.margin - priceWidth - 12,
        y: y - 16,
        size: 10,
        font: fontBold,
        color: colors.green,
      });
    }

    // Contenu (2 colonnes)
    let col1Y = y - 36;
    let col2Y = y - 36;
    const col1X = config.margin + 14;
    const col2X = config.margin + columnWidth + 12;

    // Colonne 1
    page.drawText('REMUNERATION', {
      x: col1X,
      y: col1Y,
      size: 7.5,
      font: fontBold,
      color: colors.gray,
    });
    col1Y -= 12;

    col1Y -= drawKeyValue(page, col1X, col1Y, 'Salaire brut', salaireBrut, colors, fonts);
    col1Y -= drawKeyValue(page, col1X, col1Y, 'Taux ETT', formatCurrency(poste.tauxETT) + '/h', colors, fonts);

    // Colonne 2
    page.drawText('INFORMATIONS', {
      x: col2X,
      y: col2Y,
      size: 7.5,
      font: fontBold,
      color: colors.gray,
    });
    col2Y -= 12;

    col2Y -= drawKeyValue(page, col2X, col2Y, 'Lieu de mission', conditions.lieuxMission || '', colors, fonts);
    col2Y -= drawKeyValue(page, col2X, col2Y, 'Nationalite', getTextValue(poste.labelPays || poste.nationalite || ''), colors, fonts);
    col2Y -= drawKeyValue(page, col2X, col2Y, 'Quantite', String(poste.quantite || 1), colors, fonts);

    y -= posteHeight + 12;
  });

  // ========================================
  // 📋 CONDITIONS DE TRAVAIL
  // ========================================

  if (y < 180) {
    drawFooter(page, config, colors, fontRegular, 1, 2);
    page = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
    y = config.pageHeight - config.headerHeight;
    drawHeader(page, config, colors, fonts, devisData);
    y -= 20;
  }

  const conditionsHeight = 100;
  
  contentY = drawSectionCard(
    page,
    config.margin,
    y,
    config.contentWidth,
    conditionsHeight,
    'Conditions de travail',
    colors.navy,
    colors,
    fonts
  );

  contentY -= 4;

  // Liste à puces
  const conditionsList = [
    conditions.motifRecours ? `Motif de recours: ${getTextValue(conditions.motifRecours)}` : null,
    conditions.delaiPaiement ? `Delai paiement: ${getTextValue(conditions.delaiPaiement)}` : null,
    conditions.hebergement?.chargeEU ? 'Hebergement: Pris en charge' : 'Hebergement: Non pris en charge',
    conditions.transportLocal?.chargeETT ? 'Transport local: Pris en charge' : null,
    conditions.repas?.type ? `Repas: ${getTextValue(conditions.repas.type)}` : null,
  ].filter(Boolean);

  conditionsList.forEach((item) => {
    if (item) {
      page.drawText('•', {
        x: config.margin + 14,
        y: contentY,
        size: 10,
        font: fontRegular,
        color: colors.navy,
      });

      const lines = wrapText(item, fontRegular, 8, config.contentWidth - 40);
      lines.forEach((line) => {
        page.drawText(line, {
          x: config.margin + 24,
          y: contentY,
          size: 8,
          font: fontRegular,
          color: colors.navy,
        });
        contentY -= 11;
      });
    }
  });

  y -= conditionsHeight + 16;

  // ========================================
  // 📄 PAGE 2 - PROFIL & SIGNATURE
  // ========================================

  drawFooter(page, config, colors, fontRegular, 1, 2);
  page = pdfDoc.addPage([config.pageWidth, config.pageHeight]);
  y = config.pageHeight - config.headerHeight;
  drawHeader(page, config, colors, fonts, devisData);
  y -= 20;

  // ========================================
  // 👥 PROFIL DES CANDIDATS
  // ========================================

  const profilHeight = 120;
  
  contentY = drawSectionCard(
    page,
    config.margin,
    y,
    config.contentWidth,
    profilHeight,
    'Profil des candidats recherches',
    colors.violet,
    colors,
    fonts
  );

  contentY -= 4;

  const profilItems = [
    candidats.experienceRequise ? `Experience requise: ${getTextValue(candidats.experienceRequise)}` : null,
    candidats.formation ? `Formation: ${getTextValue(candidats.formation)}` : null,
    candidats.permisConduire ? `Permis de conduire: ${getTextValue(candidats.permisConduire)}` : null,
    candidats.outillage ? `Outillage: ${getTextValue(candidats.outillage)}` : null,
    candidats.langues ? `Langues: ${getTextValue(candidats.langues)}` : null,
  ].filter(Boolean);

  if (profilItems.length > 0) {
    profilItems.forEach((item) => {
      if (item) {
        page.drawText('•', {
          x: config.margin + 14,
          y: contentY,
          size: 10,
          font: fontRegular,
          color: colors.navy,
        });

        page.drawText(item, {
          x: config.margin + 24,
          y: contentY,
          size: 8,
          font: fontRegular,
          color: colors.navy,
        });
        contentY -= 12;
      }
    });
  } else {
    page.drawText('Aucun profil specifique defini', {
      x: config.margin + 14,
      y: contentY,
      size: 8,
      font: fontRegular,
      color: colors.gray,
    });
  }

  y -= profilHeight + 16;

  // ========================================
  // ✍️ SIGNATURE ÉLECTRONIQUE
  // ========================================

  if (isSigned && prospect.signature) {
    const signatureHeight = 160;

    // Card avec bordure verte/cyan
    page.drawRectangle({
      x: config.margin,
      y: y - signatureHeight,
      width: config.contentWidth,
      height: signatureHeight,
      color: colors.white,
      borderColor: colors.lightGray,
      borderWidth: 1,
    });

    page.drawRectangle({
      x: config.margin,
      y: y - signatureHeight,
      width: 4,
      height: signatureHeight,
      color: colors.green,
    });

    page.drawText('Signature electronique', {
      x: config.margin + 14,
      y: y - 16,
      size: 10,
      font: fontBold,
      color: colors.navy,
    });

    let sigY = y - 36;

    // Nom complet
    sigY -= drawKeyValue(page, config.margin + 14, sigY, 'Nom complet', prospect.signature.nomComplet || fullName, colors, fonts);
    
    // Fonction
    sigY -= drawKeyValue(page, config.margin + 14, sigY, 'Fonction', prospect.signature.fonction || contact.fonction || '', colors, fonts);

    // Date et heure
    const signedAt = formatDateForPdf(prospect.signature.signedAt || prospect.signedAt);
    sigY -= drawKeyValue(page, config.margin + 14, sigY, 'Date et heure', signedAt, colors, fonts);

    // Entreprise
    sigY -= drawKeyValue(page, config.margin + 14, sigY, 'Entreprise', entreprise.raisonSociale || '', colors, fonts);

    // SIRET
    sigY -= drawKeyValue(page, config.margin + 14, sigY, 'SIRET', entreprise.siret || '', colors, fonts);

    y -= signatureHeight + 16;

    // ========================================
    // 🔒 DÉTAILS TECHNIQUES
    // ========================================

    const techHeight = 90;

    page.drawRectangle({
      x: config.margin,
      y: y - techHeight,
      width: config.contentWidth,
      height: techHeight,
      color: rgb(0.99, 0.99, 0.99),
      borderColor: colors.lightGray,
      borderWidth: 1,
    });

    page.drawText('Details techniques (preuve integrite)', {
      x: config.margin + 12,
      y: y - 16,
      size: 9,
      font: fontBold,
      color: colors.navy,
    });

    let techY = y - 32;

    // Adresse IP
    if (prospect.signature.ipAddress) {
      techY -= drawKeyValue(page, config.margin + 12, techY, 'Adresse IP', prospect.signature.ipAddress, colors, fonts);
    }

    // Navigateur
    if (prospect.signature.userAgent) {
      techY -= drawKeyValue(page, config.margin + 12, techY, 'Navigateur', prospect.signature.userAgent, colors, fonts, config.contentWidth - 24);
    }

    // Hash document
    if (prospect.signature.documentHash) {
      const hashLines = wrapText(prospect.signature.documentHash, fontMono, 7, config.contentWidth - 24);
      page.drawText('Hash document', {
        x: config.margin + 12,
        y: techY,
        size: 7,
        font: fontRegular,
        color: colors.gray,
      });
      techY -= 10;
      
      hashLines.forEach((line) => {
        page.drawText(line, {
          x: config.margin + 12,
          y: techY,
          size: 7,
          font: fontMono,
          color: colors.navy,
        });
        techY -= 9;
      });
    }

    y -= techHeight;
  }

  // Footer final
  drawFooter(page, config, colors, fontRegular, 2, 2);

  return await pdfDoc.save();
}
