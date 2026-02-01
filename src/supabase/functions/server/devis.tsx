import { Hono } from 'npm:hono';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import * as kv from './kv_store.tsx';
import { emailService } from './email-service.tsx';
import { SIGNATURE_EMAIL_TEMPLATES } from './signature-email-templates.ts';
import { cgvFR } from './cgv-data.ts';

const devis = new Hono();

const INTERNAL_CONTACT_EMAIL = 'contact@yojob.fr';
const DEVIS_PDF_BUCKET = 'yojob-devis-pdfs';
let devisPdfBucketReady: boolean | null = null;
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

type PdfTemplateVersion = 'v1' | 'v2-modern';

const resolvePdfTemplateVersion = (value?: string | null): PdfTemplateVersion =>
  value === 'v2-modern' ? 'v2-modern' : 'v1';

const getDefaultPdfTemplateVersion = (): PdfTemplateVersion =>
  resolvePdfTemplateVersion(Deno.env.get('DEVIS_PDF_TEMPLATE_VERSION'));

function formatDateForPdf(dateInput?: string): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

function formatCurrency(value?: number): string {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return '';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(number);
}

async function ensureDevisPdfBucket(supabase: any) {
  if (devisPdfBucketReady !== null) return devisPdfBucketReady;

  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('❌ Impossible de lister les buckets:', error);
      devisPdfBucketReady = false;
      return devisPdfBucketReady;
    }

    const exists = buckets?.some((bucket: any) => bucket.name === DEVIS_PDF_BUCKET);
    if (!exists) {
      const { error: createError } = await supabase.storage.createBucket(DEVIS_PDF_BUCKET, {
        public: false,
        fileSizeLimit: 20 * 1024 * 1024,
        allowedMimeTypes: ['application/pdf'],
      });
      if (createError) {
        console.error('❌ Erreur création bucket PDF devis:', createError);
        devisPdfBucketReady = false;
        return devisPdfBucketReady;
      }
      console.log(`✅ Bucket PDF devis créé: ${DEVIS_PDF_BUCKET}`);
    }

    devisPdfBucketReady = true;
    return devisPdfBucketReady;
  } catch (error) {
    console.error('❌ Erreur initialization bucket PDF devis:', error);
    devisPdfBucketReady = false;
    return devisPdfBucketReady;
  }
}

function wrapTextForPdf(text: string, font: any, fontSize: number, maxWidth: number): string[] {
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


async function generateDevisPdfBytes(prospect: any, inclureCGV: boolean): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const measureTextWidth = (font: any, text: string, fontSize: number) =>
    font.widthOfTextAtSize(toPdfText(text), fontSize);

  const drawTextSafe = (text: string, options: any) => {
    page.drawText(toPdfText(text), options);
  };

  const drawTextOnPage = (targetPage: any, text: string, options: any) => {
    targetPage.drawText(toPdfText(text), options);
  };

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 24;
  const footerHeight = 40;
  const contentWidth = pageWidth - margin * 2;
  const columnGap = 20;

  const hexToRgb = (hex: string) => {
    const cleaned = hex.replace('#', '').trim();
    const value = cleaned.length === 3
      ? cleaned.split('').map((c) => c + c).join('')
      : cleaned.padEnd(6, '0');
    const num = parseInt(value, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
    };
  };

  const mixColors = (a: any, b: any, ratio: number) => ({
    r: a.r + (b.r - a.r) * ratio,
    g: a.g + (b.g - a.g) * ratio,
    b: a.b + (b.b - a.b) * ratio,
  });

  const tint = (color: any, amount: number) => mixColors({ r: 1, g: 1, b: 1 }, color, amount);
  const toPdfColor = (color: any) => rgb(color.r, color.g, color.b);

  const colors = {
    violet: hexToRgb('#8B5CF6'),
    magenta: hexToRgb('#EC4899'),
    cyan: hexToRgb('#06B6D4'),
    blue: hexToRgb('#2563EB'),
    green: hexToRgb('#10B981'),
    dark: hexToRgb('#0F172A'),
    deep: hexToRgb('#1E3A8A'),
    textLight: hexToRgb('#6B7280'),
    bgLight: hexToRgb('#F9FAFB'),
    white: hexToRgb('#FFFFFF'),
    shadow: hexToRgb('#E5E7EB'),
  };

  const cgv = cgvFR;

  const getTextValue = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      return value.Français || value.fr || value.French || value.label || Object.values(value)[0] || '';
    }
    return String(value);
  };

  const drawGradientRect = (x: number, yPos: number, width: number, height: number, from: any, to: any, steps = 42) => {
    const stepWidth = width / steps;
    for (let i = 0; i < steps; i += 1) {
      const ratio = steps === 1 ? 0 : i / (steps - 1);
      const color = mixColors(from, to, ratio);
      page.drawRectangle({
        x: x + i * stepWidth,
        y: yPos,
        width: stepWidth + 0.5,
        height,
        color: toPdfColor(color),
      });
    }
  };

  const drawShadowRect = (x: number, yPos: number, width: number, height: number) => {
    page.drawRectangle({
      x: x + 2,
      y: yPos - 2,
      width,
      height,
      color: toPdfColor(colors.shadow),
    });
  };

  const wrapValue = (value: string, width: number, fontSize: number) =>
    wrapTextForPdf(value, fontRegular, fontSize, width);

  const measureKeyValueGrid = (
    entries: Array<{ label: string; value: string }>,
    width: number,
    columns: number,
    labelSize: number,
    valueSize: number,
    rowGap: number,
    gap: number
  ) => {
    const filtered = entries.filter((entry) => entry.value);
    if (!filtered.length) return 0;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    let totalHeight = 0;
    for (let i = 0; i < filtered.length; i += columns) {
      const rowEntries = filtered.slice(i, i + columns);
      const heights = rowEntries.map((entry) => {
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        return labelSize + 4 + lines.length * (valueSize + 2);
      });
      totalHeight += Math.max(...heights) + rowGap;
    }
    return totalHeight;
  };

  const drawKeyValueGrid = (
    entries: Array<{ label: string; value: string }>,
    x: number,
    yTop: number,
    width: number,
    columns: number,
    labelSize: number,
    valueSize: number,
    rowGap: number,
    gap: number,
    labelColor: any,
    valueColor: any
  ) => {
    const filtered = entries.filter((entry) => entry.value);
    if (!filtered.length) return 0;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    let yCursor = yTop;
    let totalHeight = 0;
    for (let i = 0; i < filtered.length; i += columns) {
      const rowEntries = filtered.slice(i, i + columns);
      const heights = rowEntries.map((entry) => {
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        return labelSize + 4 + lines.length * (valueSize + 2);
      });
      const rowHeight = Math.max(...heights);
      rowEntries.forEach((entry, index) => {
        const xPos = x + index * (columnWidth + gap);
        drawTextSafe(entry.label, { x: xPos, y: yCursor, size: labelSize, font: fontBold, color: labelColor });
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        let lineY = yCursor - labelSize - 3;
        lines.forEach((line) => {
          drawTextSafe(line, { x: xPos, y: lineY, size: valueSize, font: fontRegular, color: valueColor });
          lineY -= valueSize + 2;
        });
      });
      yCursor -= rowHeight + rowGap;
      totalHeight += rowHeight + rowGap;
    }
    return totalHeight;
  };

  const measureParagraph = (text: string, width: number, fontSize: number, lineGap: number, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    return lines.length * (fontSize + lineGap);
  };

  const drawParagraph = (text: string, x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    let yCursor = yTop;
    lines.forEach((line) => {
      if (!line) {
        yCursor -= fontSize + lineGap;
        return;
      }
      drawTextSafe(line, { x, y: yCursor, size: fontSize, font, color });
      yCursor -= fontSize + lineGap;
    });
    return yTop - yCursor;
  };

  const drawBadge = (text: string, fill: any, x: number, yPos: number) => {
    const fontSize = 9;
    const paddingX = 10;
    const paddingY = 4;
    const textWidth = measureTextWidth(fontBold, text, fontSize);
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    page.drawRectangle({
      x,
      y: yPos,
      width: badgeWidth,
      height: badgeHeight,
      color: toPdfColor(fill),
    });
    drawTextSafe(text, {
      x: x + paddingX,
      y: yPos + paddingY - 1,
      size: fontSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    return badgeWidth;
  };

  const isSigned = prospect?.statut === 'signe' || Boolean(prospect?.signature);
  const statusLabel = isSigned ? 'SIGNE' : 'A SIGNER';
  const createdLabel = formatDateForPdf(prospect.createdAt) || '-';
  const signatureExpiry =
    prospect?.signatureLinkExpiresAt ||
    prospect?.signature_link_expires_at ||
    prospect?.custom_fields?.signature_link_expires_at;
  let validUntilLabel = '';
  if (signatureExpiry) {
    validUntilLabel = formatDateForPdf(signatureExpiry) || '';
  } else if (prospect.createdAt) {
    const created = new Date(prospect.createdAt);
    if (!Number.isNaN(created.getTime())) {
      created.setDate(created.getDate() + 30);
      validUntilLabel = formatDateForPdf(created.toISOString());
    }
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawHeader = () => {
    const headerHeight = 80;
    drawGradientRect(0, pageHeight - headerHeight, pageWidth, headerHeight, colors.violet, colors.cyan);

    drawTextSafe('YOJOB', {
      x: margin,
      y: pageHeight - 32,
      size: 20,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    drawTextSafe('Courtage en recrutement europeen', {
      x: margin,
      y: pageHeight - 48,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });

    const infoX = pageWidth - margin - 220;
    drawTextSafe('DEVIS', {
      x: infoX,
      y: pageHeight - 30,
      size: 9,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    drawTextSafe(prospect.numero || '-', {
      x: infoX + 38,
      y: pageHeight - 30,
      size: 10,
      font: fontBold,
      color: toPdfColor(colors.white),
    });

    const badgeFontSize = 9;
    const badgeWidth = measureTextWidth(fontBold, statusLabel, badgeFontSize) + 20;
    const badgeHeight = badgeFontSize + 8;
    const badgeX = pageWidth - margin - badgeWidth;
    const badgeY = pageHeight - 36;
    page.drawRectangle({
      x: badgeX,
      y: badgeY,
      width: badgeWidth,
      height: badgeHeight,
      color: toPdfColor(isSigned ? colors.green : colors.magenta),
    });
    drawTextSafe(statusLabel, {
      x: badgeX + 10,
      y: badgeY + 4,
      size: badgeFontSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });

    drawTextSafe(`Cree le: ${createdLabel || '-'}`, {
      x: margin,
      y: pageHeight - 66,
      size: 8,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });
    drawTextSafe(`Valable jusqu'au: ${validUntilLabel || '-'}`, {
      x: margin + 160,
      y: pageHeight - 66,
      size: 8,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });

    y = pageHeight - headerHeight - 12;
  };

  const newPage = () => {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawHeader();
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < margin + footerHeight) {
      newPage();
    }
  };

  drawHeader();

  const entreprise = prospect.entreprise || {};
  const contact = prospect.contact || {};

  const drawTwoColumnSection = (
    title: string,
    color: any,
    bgColor: any,
    leftTitle: string,
    rightTitle: string,
    leftEntries: Array<{ label: string; value: string }>,
    rightEntries: Array<{ label: string; value: string }>
  ) => {
    const headerHeight = 22;
    const padding = 12;
    const columnTitleSize = 8.5;
    const labelSize = 7.5;
    const valueSize = 9.5;
    const rowGap = 6;
    const columnWidth = (contentWidth - columnGap - padding * 2) / 2;

    const leftHeight = measureKeyValueGrid(leftEntries, columnWidth, 1, labelSize, valueSize, rowGap, 0);
    const rightHeight = measureKeyValueGrid(rightEntries, columnWidth, 1, labelSize, valueSize, rowGap, 0);
    const contentHeight = columnTitleSize + 4 + Math.max(leftHeight, rightHeight);
    const sectionHeight = headerHeight + padding * 2 + contentHeight;

    ensureSpace(sectionHeight + 10);

    drawShadowRect(margin, y - sectionHeight, contentWidth, sectionHeight);
    page.drawRectangle({
      x: margin,
      y: y - sectionHeight,
      width: contentWidth,
      height: sectionHeight,
      color: bgColor,
      borderColor: toPdfColor(tint(color, 0.2)),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: margin,
      y: y - headerHeight,
      width: contentWidth,
      height: headerHeight,
      color: toPdfColor(tint(color, 0.12)),
    });
    page.drawRectangle({
      x: margin + 10,
      y: y - headerHeight + 6,
      width: 10,
      height: 10,
      color: toPdfColor(color),
    });
    drawTextSafe(title, {
      x: margin + 26,
      y: y - headerHeight + 7,
      size: 9.5,
      font: fontBold,
      color: toPdfColor(color),
    });

    const contentTop = y - headerHeight - padding;
    drawTextSafe(leftTitle, {
      x: margin + padding,
      y: contentTop,
      size: columnTitleSize,
      font: fontBold,
      color: toPdfColor(colors.textLight),
    });
    drawTextSafe(rightTitle, {
      x: margin + padding + columnWidth + columnGap,
      y: contentTop,
      size: columnTitleSize,
      font: fontBold,
      color: toPdfColor(colors.textLight),
    });

    const entriesTop = contentTop - columnTitleSize - 4;
    drawKeyValueGrid(
      leftEntries,
      margin + padding,
      entriesTop,
      columnWidth,
      1,
      labelSize,
      valueSize,
      rowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );
    drawKeyValueGrid(
      rightEntries,
      margin + padding + columnWidth + columnGap,
      entriesTop,
      columnWidth,
      1,
      labelSize,
      valueSize,
      rowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );

    y -= sectionHeight + 14;
  };

  drawTwoColumnSection(
    'Informations entreprise',
    colors.blue,
    toPdfColor(tint(colors.blue, 0.08)),
    'IDENTITE',
    'COORDONNEES',
    [
      { label: 'Raison sociale', value: entreprise.raisonSociale || '' },
      { label: 'Pays', value: entreprise.pays || '' },
      { label: 'SIRET', value: entreprise.siret || '' },
      { label: 'Code APE', value: entreprise.codeAPE || '' },
      { label: 'TVA', value: entreprise.tvaIntracommunautaire || '' },
    ],
    [
      { label: 'Adresse', value: [entreprise.adresse, entreprise.codePostal, entreprise.ville, entreprise.region, entreprise.pays].filter(Boolean).join(' ') },
      { label: 'Site web', value: entreprise.siteInternet || '' },
    ]
  );

  drawTwoColumnSection(
    'Personne de contact',
    colors.magenta,
    toPdfColor(tint(colors.magenta, 0.08)),
    'IDENTITE',
    'CONTACT',
    [
      { label: 'Nom', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
      { label: 'Fonction', value: contact.fonction || '' },
    ],
    [
      { label: 'Email', value: contact.email || '' },
      { label: 'Telephone', value: contact.telephonePortable || contact.telephoneFixe || '' },
    ]
  );

  const postes = Array.isArray(prospect.postes) ? prospect.postes : [];
  const totalCandidats = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
  const secteurPrincipalRaw = postes[0]?.secteur ? getTextValue(postes[0].secteur) : '';
  const secteurPrincipal = secteurPrincipalRaw ? (mapDevisSector(secteurPrincipalRaw) || secteurPrincipalRaw) : '';

  const synthHeight = 32;
  ensureSpace(synthHeight + 10);
  page.drawRectangle({
    x: margin,
    y: y - synthHeight,
    width: contentWidth,
    height: synthHeight,
    color: toPdfColor(tint(colors.violet, 0.08)),
    borderColor: toPdfColor(tint(colors.violet, 0.2)),
    borderWidth: 1,
  });
  const badgeY = y - 22;
  let badgeX = margin + 12;
  badgeX += drawBadge(`${postes.length} Poste(s)`, colors.blue, badgeX, badgeY) + 8;
  badgeX += drawBadge(`${totalCandidats} Candidat(s)`, colors.cyan, badgeX, badgeY) + 8;
  drawBadge(`${secteurPrincipal || 'Secteur'}`, colors.magenta, badgeX, badgeY);
  y -= synthHeight + 16;

  const conditions = prospect.conditions || {};
  const candidats = prospect.candidats || {};

  const posteHeaderFont = 11;
  const sectionPadding = 12;
  const sectionLabelSize = 7.5;
  const sectionValueSize = 9.5;
  const sectionRowGap = 6;
  const columnWidth = (contentWidth - columnGap - sectionPadding * 2) / 2;

  const formatDateShort = (input?: string) => {
    if (!input) return '';
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('fr-FR');
  };

  const calcRowHeight = (entries: Array<{ label: string; value: string }>) =>
    measureKeyValueGrid(entries, columnWidth, 1, sectionLabelSize, sectionValueSize, sectionRowGap, 0);

  const drawTwoColumnGroup = (
    leftTitle: string | null,
    rightTitle: string | null,
    leftEntries: Array<{ label: string; value: string }>,
    rightEntries: Array<{ label: string; value: string }>,
    cursorY: number
  ) => {
    const titleSize = 8.5;
    let localY = cursorY;
    if (leftTitle || rightTitle) {
      if (leftTitle) {
        drawTextSafe(leftTitle, {
          x: margin + sectionPadding,
          y: localY,
          size: titleSize,
          font: fontBold,
          color: toPdfColor(colors.textLight),
        });
      }
      if (rightTitle) {
        drawTextSafe(rightTitle, {
          x: margin + sectionPadding + columnWidth + columnGap,
          y: localY,
          size: titleSize,
          font: fontBold,
          color: toPdfColor(colors.textLight),
        });
      }
      localY -= titleSize + 4;
    }

    drawKeyValueGrid(
      leftEntries,
      margin + sectionPadding,
      localY,
      columnWidth,
      1,
      sectionLabelSize,
      sectionValueSize,
      sectionRowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );
    drawKeyValueGrid(
      rightEntries,
      margin + sectionPadding + columnWidth + columnGap,
      localY,
      columnWidth,
      1,
      sectionLabelSize,
      sectionValueSize,
      sectionRowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );

    const leftHeight = calcRowHeight(leftEntries);
    const rightHeight = calcRowHeight(rightEntries);
    const groupHeight = Math.max(leftHeight, rightHeight);
    return localY - groupHeight - 6;
  };

  postes.forEach((poste: any, index: number) => {
    const posteLabel = getTextValue(poste.poste);
    const secteurLabelRaw = getTextValue(poste.secteur);
    const secteurLabel = secteurLabelRaw ? (mapDevisSector(secteurLabelRaw) || secteurLabelRaw) : '';
    const classificationLabel = getTextValue(poste.classification);
    const salaireBrutValue = Number(poste.salaireBrut);
    const salaireBrutLabel = formatCurrency(salaireBrutValue);
    const panierRepas = typeof conditions.repas?.montant === 'number' ? conditions.repas.montant : Number(conditions.repas?.montant || 0);
    const coutRepas = panierRepas ? panierRepas * 22 : 0;
    const coutTotal = (Number.isFinite(salaireBrutValue) ? salaireBrutValue : 0) + coutRepas;
    const heuresMois = conditions.baseHoraire ? `${conditions.baseHoraire} h/mois` : '';
    const periodeDebut = formatDateShort(conditions.dateDebut);
    const periodeFin = formatDateShort(conditions.dateFin);
    const tauxEttLabel = formatCurrency(poste.tauxETT);
    const prixHeader = coutTotal
      ? `${formatCurrency(coutTotal)}/mois`
      : (salaireBrutLabel ? `${salaireBrutLabel}/mois` : '');
    const priceWidth = prixHeader ? measureTextWidth(fontBold, prixHeader, 9.5) : 0;

    const group1Left = [
      { label: 'Salaire brut', value: salaireBrutLabel || '' },
      { label: 'Panier repas', value: panierRepas ? `${formatCurrency(panierRepas)}/jour` : '' },
      { label: 'Heures/mois', value: heuresMois || '' },
    ].filter((entry) => entry.value);
    const group1Right = [
      { label: 'Debut', value: periodeDebut },
      { label: 'Fin', value: periodeFin },
    ].filter((entry) => entry.value);

    const group2Left = [
      { label: 'Lieu de mission', value: conditions.lieuxMission || '' },
    ].filter((entry) => entry.value);
    const group2Right = [
      { label: 'Nationalite', value: getTextValue(poste.labelPays || poste.nationalite || '') },
    ].filter((entry) => entry.value);

    const group3Left = [
      { label: 'Classification', value: classificationLabel || '' },
    ].filter((entry) => entry.value);
    const group3Right = [
      { label: 'Quantite', value: poste.quantite ? String(poste.quantite) : '' },
    ].filter((entry) => entry.value);

    const group4Left = [
      { label: 'Taux ETT', value: tauxEttLabel ? `${tauxEttLabel}/h` : '' },
    ].filter((entry) => entry.value);
    const group4Right = [
      { label: 'Base horaire', value: heuresMois },
    ].filter((entry) => entry.value);

    const groups: Array<{ leftTitle?: string; rightTitle?: string; left: any[]; right: any[] }> = [
      { leftTitle: 'INFORMATIONS SALARIALES', rightTitle: 'PERIODE', left: group1Left, right: group1Right },
      { left: group2Left, right: group2Right },
      { left: group3Left, right: group3Right },
      { left: group4Left, right: group4Right },
    ].filter((group) => group.left.length || group.right.length);

    const headerHeight = 28;
    const contentHeights = groups.map((group) => {
      const titleHeight = group.leftTitle || group.rightTitle ? 8.5 + 4 : 0;
      const leftHeight = calcRowHeight(group.left);
      const rightHeight = calcRowHeight(group.right);
      return titleHeight + Math.max(leftHeight, rightHeight) + 6;
    });
    const contentHeight = contentHeights.reduce((sum, value) => sum + value, 0);
    const cardHeight = headerHeight + sectionPadding * 2 + contentHeight;

    ensureSpace(cardHeight + 12);

    drawShadowRect(margin, y - cardHeight, contentWidth, cardHeight);
    page.drawRectangle({
      x: margin,
      y: y - cardHeight,
      width: contentWidth,
      height: cardHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.violet, 0.2)),
      borderWidth: 1,
    });

    drawTextSafe(`POSTE #${index + 1} - ${(posteLabel || 'Poste').toUpperCase()}`, {
      x: margin + sectionPadding,
      y: y - 20,
      size: posteHeaderFont,
      font: fontBold,
      color: toPdfColor(colors.violet),
    });
    if (prixHeader) {
      drawTextSafe(prixHeader, {
        x: margin + contentWidth - sectionPadding - priceWidth,
        y: y - 20,
        size: 9.5,
        font: fontBold,
        color: toPdfColor(colors.green),
      });
    }

    const badgeText = secteurLabel || '';
    if (badgeText) {
      const badgeFontSize = 9;
      const badgeTextWidth = measureTextWidth(fontBold, badgeText, badgeFontSize);
      const badgeWidth = badgeTextWidth + 20;
      const rightEdge = margin + contentWidth - sectionPadding;
      const badgeX = Math.max(margin + sectionPadding, rightEdge - (priceWidth ? priceWidth + 10 : 0) - badgeWidth);
      drawBadge(badgeText, colors.violet, badgeX, y - 30);
    }

    let cursorY = y - headerHeight - sectionPadding;
    groups.forEach((group) => {
      cursorY = drawTwoColumnGroup(
        group.leftTitle || null,
        group.rightTitle || null,
        group.left,
        group.right,
        cursorY
      );
    });

    y -= cardHeight + 12;

    const conditionsEntriesLeft = [
      { label: 'Type de contrat', value: getTextValue(conditions.typeContrat) || '' },
      { label: 'Periode d\'essai', value: getTextValue(conditions.periodeEssai) || '' },
      { label: 'Motif de recours', value: getTextValue(conditions.motifRecours) || '' },
      { label: 'Delai paiement', value: getTextValue(conditions.delaiPaiement) || '' },
    ].filter((entry) => entry.value);

    const conditionsEntriesRight = [
      { label: 'Duree du contrat', value: getTextValue(conditions.dureeContrat) || '' },
      { label: 'Lieu', value: getTextValue(conditions.lieu) || '' },
      { label: 'Date debut souhaitee', value: conditions.dateDebutSouhaitee ? formatDateShort(conditions.dateDebutSouhaitee) : '' },
    ].filter((entry) => entry.value);

    const hebergementLabel = conditions.hebergement?.chargeEU ? 'Pris en charge' : 'Non pris en charge';
    const hebergementComment = conditions.hebergement?.commentaire ? ` (${conditions.hebergement.commentaire})` : '';
    const repasTypeLabel = conditions.repas?.type ? getTextValue(conditions.repas.type) : '';
    const repasLabel = repasTypeLabel
      ? `${repasTypeLabel}${conditions.repas?.montant ? ` (${formatCurrency(conditions.repas.montant)})` : ''}`
      : '';
    const logistics = [
      `Hebergement: ${hebergementLabel}${hebergementComment}`,
      conditions.transportLocal?.chargeETT ? 'Transport local: Pris en charge' : 'Transport local: Non pris en charge',
      repasLabel ? `Repas: ${repasLabel}` : '',
    ].filter(Boolean);

    const conditionsHeaderHeight = 22;
    const conditionsPadding = 12;
    const conditionsLeftHeight = measureKeyValueGrid(conditionsEntriesLeft, columnWidth, 1, sectionLabelSize, sectionValueSize, sectionRowGap, 0);
    const conditionsRightHeight = measureKeyValueGrid(conditionsEntriesRight, columnWidth, 1, sectionLabelSize, sectionValueSize, sectionRowGap, 0);
    const logisticsHeight = logistics.length
      ? measureParagraph(logistics.join('\\n'), contentWidth - conditionsPadding * 2, 9, 3)
      : 0;
    const conditionsHeight =
      conditionsHeaderHeight +
      conditionsPadding * 2 +
      Math.max(conditionsLeftHeight, conditionsRightHeight) +
      (logisticsHeight ? 10 + logisticsHeight : 0);

    ensureSpace(conditionsHeight + 10);
    drawShadowRect(margin, y - conditionsHeight, contentWidth, conditionsHeight);
    page.drawRectangle({
      x: margin,
      y: y - conditionsHeight,
      width: contentWidth,
      height: conditionsHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.violet, 0.12)),
      borderWidth: 1,
    });
    page.drawRectangle({
      x: margin,
      y: y - conditionsHeaderHeight,
      width: contentWidth,
      height: conditionsHeaderHeight,
      color: toPdfColor(tint(colors.violet, 0.08)),
    });
    drawTextSafe('CONDITIONS DE TRAVAIL', {
      x: margin + conditionsPadding,
      y: y - conditionsHeaderHeight + 6,
      size: 9.5,
      font: fontBold,
      color: toPdfColor(colors.violet),
    });

    const conditionsTop = y - conditionsHeaderHeight - conditionsPadding;
    drawKeyValueGrid(
      conditionsEntriesLeft,
      margin + conditionsPadding,
      conditionsTop,
      columnWidth,
      1,
      sectionLabelSize,
      sectionValueSize,
      sectionRowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );
    drawKeyValueGrid(
      conditionsEntriesRight,
      margin + conditionsPadding + columnWidth + columnGap,
      conditionsTop,
      columnWidth,
      1,
      sectionLabelSize,
      sectionValueSize,
      sectionRowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );

    if (logisticsHeight) {
      const logisticsY = conditionsTop - Math.max(conditionsLeftHeight, conditionsRightHeight) - 8;
      drawParagraph(logistics.join('\\n'), margin + conditionsPadding, logisticsY, contentWidth - conditionsPadding * 2, 9, 3, toPdfColor(colors.dark));
    }

    y -= conditionsHeight + 12;

    const profileLines = [
      candidats.experience?.obligatoire
        ? `Experience requise: ${candidats.experience.annees ? `${candidats.experience.annees} ans` : 'Oui'}`
        : 'Experience requise: Non',
      candidats.formation?.obligatoire
        ? `Formation: ${getTextValue(candidats.formation.type) || 'Obligatoire'}`
        : 'Formation: Non',
      candidats.permis?.requis
        ? `Permis de conduire: ${candidats.permis.categorie ? `Categorie ${getTextValue(candidats.permis.categorie)}` : 'Requis'}`
        : 'Permis de conduire: Non requis',
      candidats.outillage?.requis
        ? `Outillage: ${getTextValue(candidats.outillage.type) || 'Requis'}`
        : 'Outillage: Non requis',
      candidats.travailRisque?.active
        ? `Travail a risque: ${getTextValue(candidats.travailRisque.precisions) || 'Oui'}`
        : '',
    ].filter(Boolean);

    const languesEntries = candidats.langues
      ? Object.entries(candidats.langues)
          .filter(([, niveau]) => niveau && niveau !== 'non-requis')
          .map(([langue, niveau]) => `${getTextValue(langue)} - ${getTextValue(niveau)}`)
      : [];

    if (languesEntries.length) {
      profileLines.push(`Langues: ${languesEntries.join(', ')}`);
    }

    const episEntries = Array.isArray(candidats.epis) ? candidats.epis.map((epi: string) => getTextValue(epi)) : [];
    if (episEntries.length) {
      profileLines.push('EPI requis:');
      episEntries.forEach((epi: string) => profileLines.push(`- ${epi}`));
    }

    const profileHeaderHeight = 22;
    const profilePadding = 12;
    const profileHeight =
      profileHeaderHeight +
      profilePadding * 2 +
      measureParagraph(profileLines.join('\\n'), contentWidth - profilePadding * 2, 9, 3) +
      6;

    ensureSpace(profileHeight + 12);
    drawShadowRect(margin, y - profileHeight, contentWidth, profileHeight);
    page.drawRectangle({
      x: margin,
      y: y - profileHeight,
      width: contentWidth,
      height: profileHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.violet, 0.12)),
      borderWidth: 1,
    });
    page.drawRectangle({
      x: margin,
      y: y - profileHeaderHeight,
      width: contentWidth,
      height: profileHeaderHeight,
      color: toPdfColor(tint(colors.magenta, 0.08)),
    });
    drawTextSafe('PROFIL DES CANDIDATS RECHERCHES', {
      x: margin + profilePadding,
      y: y - profileHeaderHeight + 6,
      size: 9.5,
      font: fontBold,
      color: toPdfColor(colors.magenta),
    });

    const profileTextY = y - profileHeaderHeight - profilePadding;
    drawParagraph(profileLines.join('\\n'), margin + profilePadding, profileTextY, contentWidth - profilePadding * 2, 9, 3, toPdfColor(colors.dark));

    y -= profileHeight + 18;
  });

  const recapitulatif = prospect.recapitulatif || null;
  if (recapitulatif) {
    const recapHeaderHeight = 22;
    const recapPadding = 12;
    const recapLines = [
      recapitulatif.totalPostes !== undefined ? `Postes a pourvoir: ${recapitulatif.totalPostes}` : '',
      recapitulatif.totalCandidats !== undefined ? `Candidats recherches: ${recapitulatif.totalCandidats}` : '',
      recapitulatif.budgetEstime ? `Budget estime: ${formatCurrency(recapitulatif.budgetEstime)}` : '',
    ].filter(Boolean);
    const recapText = recapLines.join('\\n');
    const recapComment = recapitulatif.commentaires ? `Commentaires: ${recapitulatif.commentaires}` : '';
    const recapTextHeight = measureParagraph(recapText, contentWidth - recapPadding * 2, 9, 3);
    const recapCommentHeight = recapComment
      ? measureParagraph(recapComment, contentWidth - recapPadding * 2, 8.5, 3) + 6
      : 0;
    const recapHeight = recapHeaderHeight + recapPadding * 2 + recapTextHeight + recapCommentHeight + 6;

    ensureSpace(recapHeight + 12);
    drawShadowRect(margin, y - recapHeight, contentWidth, recapHeight);
    page.drawRectangle({
      x: margin,
      y: y - recapHeight,
      width: contentWidth,
      height: recapHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.cyan, 0.2)),
      borderWidth: 1,
    });
    page.drawRectangle({
      x: margin,
      y: y - recapHeaderHeight,
      width: contentWidth,
      height: recapHeaderHeight,
      color: toPdfColor(tint(colors.cyan, 0.12)),
    });
    drawTextSafe('RECAPITULATIF DE LA DEMANDE', {
      x: margin + recapPadding,
      y: y - recapHeaderHeight + 6,
      size: 9.5,
      font: fontBold,
      color: toPdfColor(colors.cyan),
    });

    const recapTextY = y - recapHeaderHeight - recapPadding;
    drawParagraph(recapText, margin + recapPadding, recapTextY, contentWidth - recapPadding * 2, 9, 3, toPdfColor(colors.dark));

    if (recapComment) {
      const recapCommentY = recapTextY - recapTextHeight - 6;
      drawParagraph(recapComment, margin + recapPadding, recapCommentY, contentWidth - recapPadding * 2, 8.5, 3, toPdfColor(colors.textLight));
    }

    y -= recapHeight + 16;
  }

  const signaturePadding = 14;
  const signatureTitleHeight = 22;
  const signatureColor = isSigned ? colors.green : colors.magenta;
  const signatureBg = tint(signatureColor, 0.08);

  const signatureEntries = [
    { label: 'Nom complet', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
    { label: 'Email', value: contact.email || '' },
    { label: 'Entreprise', value: entreprise.raisonSociale || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
  ].filter((entry) => entry.value);

  const signatureMetaEntries = [
    { label: 'Date et heure', value: prospect.signature?.metadata?.timestampReadable || '' },
    { label: 'Horodatage ISO 8601', value: prospect.signature?.metadata?.timestamp || '' },
    { label: 'Adresse IP', value: prospect.signature?.metadata?.ipAddress || '' },
    { label: 'Navigateur', value: prospect.signature?.metadata?.userAgent || '' },
  ].filter((entry) => entry.value);

  const signatureHashEntries = [
    { label: 'Algorithme', value: prospect.signature?.integrite?.hashAlgorithm || '' },
  ].filter((entry) => entry.value);

  const signatureHash = prospect.signature?.integrite?.documentHash || '';
  const signatureHashFormatted = signatureHash
    ? (signatureHash.match(/.{1,48}/g) || [signatureHash]).join(' ')
    : '';
  const consentMentions = prospect.signature?.consentement?.mentions || '';
  const consentDate = prospect.signature?.consentement?.dateAcceptation
    ? new Date(prospect.signature.consentement.dateAcceptation).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Paris'
      })
    : '';

  const signatureBoxHeight = isSigned ? 70 : 90;
  const signatureColumnWidth = (contentWidth - signaturePadding * 2 - columnGap) / 2;
  const signatureIdentHeight = measureKeyValueGrid(signatureEntries, signatureColumnWidth, 1, 7.5, 9.5, 6, 0);
  const signatureMetaHeight = measureKeyValueGrid(signatureMetaEntries, signatureColumnWidth, 1, 7.5, 9.5, 6, 0);
  const hashHeight = signatureHashFormatted
    ? measureParagraph(signatureHashFormatted, contentWidth - signaturePadding * 2, 8, 3, fontMono) + 16
    : 0;
  const consentHeight = consentMentions
    ? measureParagraph(consentMentions, contentWidth - signaturePadding * 2, 8.5, 3) + (consentDate ? 12 : 0)
    : 0;

  const signatureHeight =
    signatureTitleHeight +
    signaturePadding * 2 +
    Math.max(signatureIdentHeight, signatureMetaHeight) +
    14 +
    signatureBoxHeight +
    (hashHeight ? hashHeight + 6 : 0) +
    (consentHeight ? consentHeight + 6 : 0);

  ensureSpace(signatureHeight + 12);
  drawShadowRect(margin, y - signatureHeight, contentWidth, signatureHeight);
  page.drawRectangle({
    x: margin,
    y: y - signatureHeight,
    width: contentWidth,
    height: signatureHeight,
    color: toPdfColor(signatureBg),
    borderColor: toPdfColor(signatureColor),
    borderWidth: 1.5,
  });
  page.drawRectangle({
    x: margin,
    y: y - signatureTitleHeight,
    width: contentWidth,
    height: signatureTitleHeight,
    color: toPdfColor(tint(signatureColor, 0.16)),
  });
  drawTextSafe(isSigned ? 'CERTIFICAT DE SIGNATURE ELECTRONIQUE' : 'A SIGNER - SIGNATURE REQUISE', {
    x: margin + signaturePadding,
    y: y - signatureTitleHeight + 6,
    size: 9.5,
    font: fontBold,
    color: toPdfColor(signatureColor),
  });

  let signatureCursor = y - signatureTitleHeight - signaturePadding;
  drawKeyValueGrid(
    signatureEntries,
    margin + signaturePadding,
    signatureCursor,
    signatureColumnWidth,
    1,
    7.5,
    9.5,
    6,
    0,
    toPdfColor(colors.textLight),
    toPdfColor(colors.dark)
  );
  drawKeyValueGrid(
    signatureMetaEntries,
    margin + signaturePadding + signatureColumnWidth + columnGap,
    signatureCursor,
    signatureColumnWidth,
    1,
    7.5,
    9.5,
    6,
    0,
    toPdfColor(colors.textLight),
    toPdfColor(colors.dark)
  );

  signatureCursor -= Math.max(signatureIdentHeight, signatureMetaHeight) + 10;

  if (signatureHashEntries.length) {
    drawTextSafe('PREUVE D\'INTEGRITE DU DOCUMENT', {
      x: margin + signaturePadding,
      y: signatureCursor,
      size: 8.5,
      font: fontBold,
      color: toPdfColor(colors.deep),
    });
    signatureCursor -= 10;
    drawKeyValueGrid(
      signatureHashEntries,
      margin + signaturePadding,
      signatureCursor,
      contentWidth - signaturePadding * 2,
      2,
      7.5,
      9,
      6,
      12,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );
    signatureCursor -= 10;
    if (signatureHashFormatted) {
      drawParagraph(signatureHashFormatted, margin + signaturePadding, signatureCursor, contentWidth - signaturePadding * 2, 8, 3, toPdfColor(colors.dark), fontMono);
      signatureCursor -= measureParagraph(signatureHashFormatted, contentWidth - signaturePadding * 2, 8, 3, fontMono) + 6;
    }
  }

  page.drawRectangle({
    x: margin + signaturePadding,
    y: y - signatureHeight + signaturePadding,
    width: 180,
    height: signatureBoxHeight,
    color: toPdfColor(colors.white),
    borderColor: toPdfColor(signatureColor),
    borderWidth: 1,
  });

  if (isSigned && prospect.signature?.image && typeof prospect.signature.image === 'string' && prospect.signature.image.startsWith('data:image')) {
    try {
      const base64 = prospect.signature.image.split(',')[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const image = await pdfDoc.embedPng(bytes);
      const scale = Math.min(160 / image.width, (signatureBoxHeight - 12) / image.height);
      const imgWidth = image.width * scale;
      const imgHeight = image.height * scale;
      page.drawImage(image, {
        x: margin + signaturePadding + (180 - imgWidth) / 2,
        y: y - signatureHeight + signaturePadding + (signatureBoxHeight - imgHeight) / 2,
        width: imgWidth,
        height: imgHeight,
      });
    } catch (error) {
      console.error('⚠️ Erreur embed signature image:', error);
    }
  } else {
    drawTextSafe('Espace signature', {
      x: margin + signaturePadding + 16,
      y: y - signatureHeight + signaturePadding + signatureBoxHeight / 2 - 4,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
    });
  }

  if (consentMentions) {
    const consentY = y - signatureHeight + signaturePadding + signatureBoxHeight + 14;
    drawParagraph(consentMentions, margin + signaturePadding, consentY, contentWidth - signaturePadding * 2, 8.5, 3, toPdfColor(colors.dark));
    if (consentDate) {
      const consentTextHeight = measureParagraph(consentMentions, contentWidth - signaturePadding * 2, 8.5, 3);
      drawTextSafe(`CGV acceptees le: ${consentDate}`, {
        x: margin + signaturePadding,
        y: consentY - consentTextHeight - 2,
        size: 8,
        font: fontRegular,
        color: toPdfColor(colors.textLight),
      });
    }
  }

  y -= signatureHeight + 16;

  if (inclureCGV) {
    const cgvLegalFields = cgv?.sections?.article0?.fields || {};
    const legalSummaryLines = [
      getTextValue(conditions.delaiPaiement) ? `Conditions de paiement: ${getTextValue(conditions.delaiPaiement)}` : '',
      cgv?.hero?.subtitle,
      cgv?.hero?.effectiveDate,
      cgv?.sections?.article6?.section1?.legalLimit,
      cgv?.sections?.article16?.sections?.law?.description,
      cgv?.sections?.article16?.sections?.jurisdiction?.description,
    ].filter(Boolean).map((line) => `• ${line}`);

    const legalFooterLines = [
      cgvLegalFields.legalFormValue ? `Forme juridique: ${cgvLegalFields.legalFormValue}` : '',
      cgvLegalFields.managerValue ? `Gerant: ${cgvLegalFields.managerValue}` : '',
      cgvLegalFields.siretValue ? `SIRET: ${cgvLegalFields.siretValue}` : '',
      cgvLegalFields.vatValue ? `TVA intracom: ${cgvLegalFields.vatValue}` : '',
      cgvLegalFields.addressValue ? `Adresse: ${cgvLegalFields.addressValue}` : '',
      cgvLegalFields.contactValue ? `Contact: ${cgvLegalFields.contactValue}` : '',
    ].filter(Boolean);

    const legalText = legalSummaryLines.join('\\n');
    const legalFooterText = legalFooterLines.join('\\n');
    const legalTextHeight = measureParagraph(legalText, contentWidth - 24, 8.5, 3);
    const legalFooterHeight = legalFooterText
      ? measureParagraph(legalFooterText, contentWidth - 24, 8, 3)
      : 0;
    const legalHeight = 20 + legalTextHeight + (legalFooterHeight ? 10 + legalFooterHeight : 0) + 18;
    ensureSpace(legalHeight + 10);
    page.drawRectangle({
      x: margin,
      y: y - legalHeight,
      width: contentWidth,
      height: legalHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.violet, 0.12)),
      borderWidth: 1,
    });
    drawTextSafe('CONDITIONS GENERALES & MENTIONS LEGALES', {
      x: margin + 12,
      y: y - 14,
      size: 9,
      font: fontBold,
      color: toPdfColor(colors.deep),
    });
    const legalTextY = y - 28;
    drawParagraph(legalText, margin + 12, legalTextY, contentWidth - 24, 8.5, 3, toPdfColor(colors.dark));

    if (legalFooterText) {
      const legalFooterTop = y - legalHeight + 12 + legalFooterHeight;
      drawParagraph(legalFooterText, margin + 12, legalFooterTop, contentWidth - 24, 8, 3, toPdfColor(colors.textLight));
    }

    y -= legalHeight + 12;
  }

  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const generatedLabel = formatDateForPdf(new Date().toISOString()) || '';
  pages.forEach((currentPage, index) => {
    currentPage.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: footerHeight,
      color: toPdfColor(colors.bgLight),
    });
    currentPage.drawLine({
      start: { x: 0, y: footerHeight },
      end: { x: pageWidth, y: footerHeight },
      thickness: 1,
      color: toPdfColor(tint(colors.violet, 0.2)),
    });
    const footerText = 'YOJOB - contact@yojob.fr - +33 1 23 45 67 89 - yojob.fr';
    drawTextOnPage(currentPage, footerText, {
      x: margin,
      y: 14,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
    });
    if (generatedLabel) {
      drawTextOnPage(currentPage, `Genere le: ${generatedLabel}`, {
        x: margin,
        y: 4,
        size: 7.5,
        font: fontRegular,
        color: toPdfColor(colors.textLight),
      });
    }
    const pageLabel = `Page ${index + 1}/${totalPages}`;
    const pageLabelWidth = measureTextWidth(fontRegular, pageLabel, 8);
    drawTextOnPage(currentPage, pageLabel, {
      x: pageWidth - margin - pageLabelWidth,
      y: 14,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
    });
  });

  return await pdfDoc.save();
}

async function generateDevisPdfBytesV2(prospect: any, inclureCGV: boolean): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const marginBottom = 46;
  const headerBandHeight = 54;
  const headerInfoHeight = 18;
  const headerHeight = headerBandHeight + headerInfoHeight + 10;
  const footerHeight = 34;
  const contentWidth = pageWidth - marginX * 2;
  const columnGap = 16;
  const cardRadius = 14;
  const cardPadding = 12;

  const hexToRgb = (hex: string) => {
    const cleaned = hex.replace('#', '').trim();
    const value = cleaned.length === 3
      ? cleaned.split('').map((c) => c + c).join('')
      : cleaned.padEnd(6, '0');
    const num = parseInt(value, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
    };
  };

  const mixColors = (a: any, b: any, ratio: number) => ({
    r: a.r + (b.r - a.r) * ratio,
    g: a.g + (b.g - a.g) * ratio,
    b: a.b + (b.b - a.b) * ratio,
  });

  const tint = (color: any, amount: number) => mixColors({ r: 1, g: 1, b: 1 }, color, amount);
  const toPdfColor = (color: any) => rgb(color.r, color.g, color.b);

  const colors = {
    bg: hexToRgb('#F9F9FC'),
    primary: hexToRgb('#695EE2'),
    secondary: hexToRgb('#6B3BD9'),
    navy: hexToRgb('#1A2A60'),
    success: hexToRgb('#66CE8D'),
    warning: hexToRgb('#D6B12C'),
    text: hexToRgb('#0F172A'),
    muted: hexToRgb('#64748B'),
    white: hexToRgb('#FFFFFF'),
    shadow: hexToRgb('#E6E8F5'),
  };
  const borderColor = tint(colors.primary, 0.2);

  const measureTextWidth = (font: any, text: string, fontSize: number) =>
    font.widthOfTextAtSize(toPdfText(text), fontSize);

  const drawTextSafe = (text: string, options: any) => {
    page.drawText(toPdfText(text), options);
  };

  const drawTextOnPage = (targetPage: any, text: string, options: any) => {
    targetPage.drawText(toPdfText(text), options);
  };

  const drawGradientRect = (x: number, yPos: number, width: number, height: number, from: any, to: any, steps = 36) => {
    const stepWidth = width / steps;
    for (let i = 0; i < steps; i += 1) {
      const ratio = steps === 1 ? 0 : i / (steps - 1);
      const color = mixColors(from, to, ratio);
      page.drawRectangle({
        x: x + i * stepWidth,
        y: yPos,
        width: stepWidth + 0.5,
        height,
        color: toPdfColor(color),
      });
    }
  };

  const drawRoundedRect = (x: number, yPos: number, width: number, height: number, radius: number, options: any) => {
    const r = Math.max(0, Math.min(radius, width / 2, height / 2));
    if (typeof (page as any).drawSvgPath !== 'function' || r === 0) {
      page.drawRectangle({
        x,
        y: yPos,
        width,
        height,
        color: options.color,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth,
      });
      return;
    }
    const path = `M${r} 0 H${width - r} A${r} ${r} 0 0 1 ${width} ${r} V${height - r} A${r} ${r} 0 0 1 ${width - r} ${height} H${r} A${r} ${r} 0 0 1 0 ${height - r} V${r} A${r} ${r} 0 0 1 ${r} 0 Z`;
    page.drawSvgPath(path, {
      x,
      y: yPos,
      color: options.color,
      borderColor: options.borderColor,
      borderWidth: options.borderWidth,
    });
  };

  const drawShadowRect = (x: number, yTop: number, width: number, height: number) => {
    drawRoundedRect(x + 2, yTop - height - 2, width, height, cardRadius, {
      color: toPdfColor(colors.shadow),
    });
  };

  const drawCard = (x: number, yTop: number, width: number, height: number, title: string, accent: any) => {
    drawShadowRect(x, yTop, width, height);
    drawRoundedRect(x, yTop - height, width, height, cardRadius, {
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(borderColor),
      borderWidth: 1,
    });
    if (title) {
      page.drawRectangle({
        x,
        y: yTop - 3,
        width,
        height: 3,
        color: toPdfColor(tint(accent, 0.6)),
      });
      page.drawRectangle({
        x,
        y: yTop - 3,
        width: width * 0.4,
        height: 3,
        color: toPdfColor(tint(accent, 0.85)),
      });
      drawTextSafe(title, {
        x: x + cardPadding,
        y: yTop - cardPadding - 2,
        size: 11.5,
        font: fontBold,
        color: toPdfColor(accent),
      });
    }
  };

  const drawBadge = (text: string, fill: any, x: number, yPos: number) => {
    const fontSize = 8.5;
    const paddingX = 8;
    const paddingY = 3;
    const textWidth = measureTextWidth(fontBold, text, fontSize);
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    drawRoundedRect(x, yPos, badgeWidth, badgeHeight, 6, {
      color: toPdfColor(fill),
      borderColor: toPdfColor(fill),
      borderWidth: 1,
    });
    drawTextSafe(text, {
      x: x + paddingX,
      y: yPos + paddingY - 1,
      size: fontSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    return badgeWidth;
  };

  const wrapValue = (value: string, width: number, fontSize: number, font: any = fontRegular) =>
    wrapTextForPdf(value, font, fontSize, width);

  const measureKeyValueGrid = (
    entries: Array<{ label: string; value: string }>,
    width: number,
    columns: number,
    labelSize: number,
    valueSize: number,
    rowGap: number,
    gap: number
  ) => {
    const filtered = entries.filter((entry) => entry.value);
    if (!filtered.length) return 0;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    let totalHeight = 0;
    for (let i = 0; i < filtered.length; i += columns) {
      const rowEntries = filtered.slice(i, i + columns);
      const heights = rowEntries.map((entry) => {
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        return labelSize + 4 + lines.length * (valueSize + 2);
      });
      totalHeight += Math.max(...heights) + rowGap;
    }
    return totalHeight;
  };

  const drawKeyValueGrid = (
    entries: Array<{ label: string; value: string }>,
    x: number,
    yTop: number,
    width: number,
    columns: number,
    labelSize: number,
    valueSize: number,
    rowGap: number,
    gap: number,
    labelColor: any,
    valueColor: any
  ) => {
    const filtered = entries.filter((entry) => entry.value);
    if (!filtered.length) return 0;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    let yCursor = yTop;
    let totalHeight = 0;
    for (let i = 0; i < filtered.length; i += columns) {
      const rowEntries = filtered.slice(i, i + columns);
      const heights = rowEntries.map((entry) => {
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        return labelSize + 4 + lines.length * (valueSize + 2);
      });
      const rowHeight = Math.max(...heights);
      rowEntries.forEach((entry, index) => {
        const xPos = x + index * (columnWidth + gap);
        drawTextSafe(entry.label, { x: xPos, y: yCursor, size: labelSize, font: fontBold, color: labelColor });
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        let lineY = yCursor - labelSize - 3;
        lines.forEach((line) => {
          drawTextSafe(line, { x: xPos, y: lineY, size: valueSize, font: fontRegular, color: valueColor });
          lineY -= valueSize + 2;
        });
      });
      yCursor -= rowHeight + rowGap;
      totalHeight += rowHeight + rowGap;
    }
    return totalHeight;
  };

  const measureParagraph = (text: string, width: number, fontSize: number, lineGap: number, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    return lines.length * (fontSize + lineGap);
  };

  const drawParagraph = (text: string, x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    let yCursor = yTop;
    lines.forEach((line) => {
      if (!line) {
        yCursor -= fontSize + lineGap;
        return;
      }
      drawTextSafe(line, { x, y: yCursor, size: fontSize, font, color });
      yCursor -= fontSize + lineGap;
    });
    return yTop - yCursor;
  };

  const measureChecklist = (items: string[], width: number, fontSize: number, lineGap: number) => {
    return items.reduce((total, item) => {
      const lines = wrapTextForPdf(item, fontRegular, fontSize, width - 14);
      return total + lines.length * (fontSize + lineGap) + lineGap;
    }, 0);
  };

  const drawChecklist = (items: string[], x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any) => {
    const boxSize = 6;
    let yCursor = yTop;
    items.forEach((item) => {
      const lines = wrapTextForPdf(item, fontRegular, fontSize, width - 14);
      if (!lines.length) return;
      page.drawRectangle({
        x,
        y: yCursor - boxSize + 1,
        width: boxSize,
        height: boxSize,
        borderColor: toPdfColor(borderColor),
        borderWidth: 1,
        color: toPdfColor(colors.white),
      });
      lines.forEach((line, idx) => {
        drawTextSafe(line, {
          x: x + boxSize + 6,
          y: yCursor - idx * (fontSize + lineGap),
          size: fontSize,
          font: fontRegular,
          color,
        });
      });
      yCursor -= lines.length * (fontSize + lineGap) + lineGap;
    });
    return yTop - yCursor;
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

  const formatDateShort = (input?: string) => {
    if (!input) return '';
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('fr-FR');
  };

  const cgv = cgvFR;
  const entreprise = prospect.entreprise || {};
  const contact = prospect.contact || {};
  const conditions = prospect.conditions || {};
  const candidats = prospect.candidats || {};
  const postes = Array.isArray(prospect.postes) ? prospect.postes : [];
  const totalCandidats = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
  const secteurPrincipalRaw = postes[0]?.secteur ? getTextValue(postes[0].secteur) : '';
  const secteurPrincipal = secteurPrincipalRaw ? (mapDevisSector(secteurPrincipalRaw) || secteurPrincipalRaw) : '';

  const isSigned = prospect?.statut === 'signe' || Boolean(prospect?.signature);
  const statusLabel = isSigned ? 'SIGNE' : 'A SIGNER';
  const createdLabel = formatDateForPdf(prospect.createdAt) || '-';
  const signatureExpiry =
    prospect?.signatureLinkExpiresAt ||
    prospect?.signature_link_expires_at ||
    prospect?.custom_fields?.signature_link_expires_at;
  let validUntilLabel = '';
  if (signatureExpiry) {
    validUntilLabel = formatDateForPdf(signatureExpiry) || '';
  } else if (prospect.createdAt) {
    const created = new Date(prospect.createdAt);
    if (!Number.isNaN(created.getTime())) {
      created.setDate(created.getDate() + 30);
      validUntilLabel = formatDateForPdf(created.toISOString());
    }
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - headerHeight - 8;

  const drawHeader = () => {
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: toPdfColor(colors.bg),
    });
    drawGradientRect(
      0,
      pageHeight - headerBandHeight,
      pageWidth,
      headerBandHeight,
      tint(colors.primary, 0.85),
      tint(colors.secondary, 0.85)
    );
    drawTextSafe('YOJOB', {
      x: marginX,
      y: pageHeight - 28,
      size: 18,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    drawTextSafe('Courtage en recrutement europeen', {
      x: marginX,
      y: pageHeight - 44,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.8)),
    });

    const infoWidth = 190;
    const infoHeight = 30;
    const infoX = pageWidth - marginX - infoWidth;
    const infoY = pageHeight - 42;
    drawRoundedRect(infoX, infoY, infoWidth, infoHeight, 8, {
      color: toPdfColor(tint(colors.white, 0.95)),
      borderColor: toPdfColor(tint(colors.white, 0.7)),
      borderWidth: 0.5,
    });
    drawTextSafe('DEVIS', {
      x: infoX + 10,
      y: infoY + 18,
      size: 8,
      font: fontBold,
      color: toPdfColor(colors.navy),
    });
    drawTextSafe(prospect.numero || '-', {
      x: infoX + 52,
      y: infoY + 18,
      size: 9.5,
      font: fontBold,
      color: toPdfColor(colors.navy),
    });
    drawBadge(statusLabel, isSigned ? colors.success : colors.warning, infoX + infoWidth - 70, infoY + 6);

    const dateY = pageHeight - headerBandHeight - 10;
    drawTextSafe(`Cree le: ${createdLabel || '-'}`, {
      x: marginX,
      y: dateY,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(colors.muted),
    });
    drawTextSafe(`Valable jusqu'au: ${validUntilLabel || '-'}`, {
      x: marginX + 180,
      y: dateY,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(colors.muted),
    });

    y = pageHeight - headerHeight - 8;
  };

  const newPage = () => {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawHeader();
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < marginBottom + footerHeight) {
      newPage();
    }
  };

  drawHeader();

  // Carte entreprise + contact
  const infoCardWidth = (contentWidth - columnGap) / 2;
  const columnTitleSize = 8;
  const labelSize = 8;
  const valueSize = 10.2;
  const rowGap = 6;
  const innerColumnWidth = (infoCardWidth - cardPadding * 2 - columnGap) / 2;
  const entrepriseLeft = [
    { label: 'Raison sociale', value: entreprise.raisonSociale || '' },
    { label: 'Pays', value: entreprise.pays || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
    { label: 'Code APE', value: entreprise.codeAPE || '' },
    { label: 'TVA', value: entreprise.tvaIntracommunautaire || '' },
  ].filter((entry) => entry.value);
  const entrepriseRight = [
    { label: 'Adresse', value: [entreprise.adresse, entreprise.codePostal, entreprise.ville, entreprise.region, entreprise.pays].filter(Boolean).join(' ') },
    { label: 'Site web', value: entreprise.siteInternet || '' },
  ].filter((entry) => entry.value);
  const entrepriseLeftHeight = measureKeyValueGrid(entrepriseLeft, innerColumnWidth, 1, labelSize, valueSize, rowGap, 0);
  const entrepriseRightHeight = measureKeyValueGrid(entrepriseRight, innerColumnWidth, 1, labelSize, valueSize, rowGap, 0);
  const entrepriseHeight =
    cardPadding * 2 +
    columnTitleSize +
    4 +
    Math.max(entrepriseLeftHeight, entrepriseRightHeight) +
    6;

  const contactLeft = [
    { label: 'Nom', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
  ].filter((entry) => entry.value);
  const contactRight = [
    { label: 'Email', value: contact.email || '' },
    { label: 'Telephone', value: contact.telephonePortable || contact.telephoneFixe || '' },
  ].filter((entry) => entry.value);
  const contactLeftHeight = measureKeyValueGrid(contactLeft, innerColumnWidth, 1, labelSize, valueSize, rowGap, 0);
  const contactRightHeight = measureKeyValueGrid(contactRight, innerColumnWidth, 1, labelSize, valueSize, rowGap, 0);
  const contactHeight =
    cardPadding * 2 +
    columnTitleSize +
    4 +
    Math.max(contactLeftHeight, contactRightHeight) +
    6;

  const topCardsHeight = Math.max(entrepriseHeight, contactHeight);
  ensureSpace(topCardsHeight + 12);
  drawCard(marginX, y, infoCardWidth, topCardsHeight, 'Client (Entreprise)', colors.primary);
  drawCard(marginX + infoCardWidth + columnGap, y, infoCardWidth, topCardsHeight, 'Contact', colors.secondary);

  const entrepriseContentTop = y - cardPadding - 14;
  drawTextSafe('IDENTITE', {
    x: marginX + cardPadding,
    y: entrepriseContentTop,
    size: columnTitleSize,
    font: fontBold,
    color: toPdfColor(colors.muted),
  });
  drawTextSafe('COORDONNEES', {
    x: marginX + cardPadding + innerColumnWidth + columnGap,
    y: entrepriseContentTop,
    size: columnTitleSize,
    font: fontBold,
    color: toPdfColor(colors.muted),
  });
  drawKeyValueGrid(
    entrepriseLeft,
    marginX + cardPadding,
    entrepriseContentTop - columnTitleSize - 3,
    innerColumnWidth,
    1,
    labelSize,
    valueSize,
    rowGap,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  drawKeyValueGrid(
    entrepriseRight,
    marginX + cardPadding + innerColumnWidth + columnGap,
    entrepriseContentTop - columnTitleSize - 3,
    innerColumnWidth,
    1,
    labelSize,
    valueSize,
    rowGap,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );

  const contactContentTop = y - cardPadding - 14;
  drawTextSafe('IDENTITE', {
    x: marginX + infoCardWidth + columnGap + cardPadding,
    y: contactContentTop,
    size: columnTitleSize,
    font: fontBold,
    color: toPdfColor(colors.muted),
  });
  drawTextSafe('CONTACT', {
    x: marginX + infoCardWidth + columnGap + cardPadding + innerColumnWidth + columnGap,
    y: contactContentTop,
    size: columnTitleSize,
    font: fontBold,
    color: toPdfColor(colors.muted),
  });
  drawKeyValueGrid(
    contactLeft,
    marginX + infoCardWidth + columnGap + cardPadding,
    contactContentTop - columnTitleSize - 3,
    innerColumnWidth,
    1,
    labelSize,
    valueSize,
    rowGap,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  drawKeyValueGrid(
    contactRight,
    marginX + infoCardWidth + columnGap + cardPadding + innerColumnWidth + columnGap,
    contactContentTop - columnTitleSize - 3,
    innerColumnWidth,
    1,
    labelSize,
    valueSize,
    rowGap,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );

  y -= topCardsHeight + 18;

  // Carte synthese
  const periodeSynthese = conditions.dateDebut || conditions.dateFin
    ? `${formatDateShort(conditions.dateDebut) || '-'} → ${formatDateShort(conditions.dateFin) || '-'}`
    : '';
  const syntheseEntries = [
    { label: 'Postes', value: postes.length ? String(postes.length) : '' },
    { label: 'Candidats', value: totalCandidats ? String(totalCandidats) : '' },
    { label: 'Secteur', value: secteurPrincipal || '' },
    { label: 'Lieu', value: conditions.lieuxMission || conditions.lieu || '' },
    { label: 'Periode', value: periodeSynthese || '' },
  ].filter((entry) => entry.value);
  const synthColumns = 3;
  const synthHeight = cardPadding * 2 + 14 + measureKeyValueGrid(syntheseEntries, contentWidth - cardPadding * 2, synthColumns, labelSize, valueSize, 6, 8);
  ensureSpace(synthHeight + 10);
  drawCard(marginX, y, contentWidth, synthHeight, 'Synthese', colors.primary);
  drawKeyValueGrid(
    syntheseEntries,
    marginX + cardPadding,
    y - cardPadding - 14,
    contentWidth - cardPadding * 2,
    synthColumns,
    labelSize,
    valueSize,
    6,
    8,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  y -= synthHeight + 18;

  // Cartes postes
  postes.forEach((poste: any, index: number) => {
    const posteLabel = getTextValue(poste.poste);
    const secteurLabelRaw = getTextValue(poste.secteur);
    const secteurLabel = secteurLabelRaw ? (mapDevisSector(secteurLabelRaw) || secteurLabelRaw) : '';
    const classificationLabel = getTextValue(poste.classification);
    const salaireBrutValue = Number(poste.salaireBrut);
    const salaireBrutLabel = formatCurrency(salaireBrutValue);
    const panierRepas = typeof conditions.repas?.montant === 'number' ? conditions.repas.montant : Number(conditions.repas?.montant || 0);
    const heuresMois = conditions.baseHoraire ? `${conditions.baseHoraire} h/mois` : '';
    const periodeDebut = formatDateShort(conditions.dateDebut);
    const periodeFin = formatDateShort(conditions.dateFin);
    const tauxEttLabel = formatCurrency(poste.tauxETT);
    const coutRepas = panierRepas ? panierRepas * 22 : 0;
    const coutTotal = (Number.isFinite(salaireBrutValue) ? salaireBrutValue : 0) + coutRepas;
    const prixHeader = coutTotal
      ? `${formatCurrency(coutTotal)}/mois`
      : (salaireBrutLabel ? `${salaireBrutLabel}/mois` : '');

    const missionEntries = [
      { label: 'Lieu de mission', value: conditions.lieuxMission || '' },
      { label: 'Periode', value: periodeDebut || periodeFin ? `${periodeDebut || '-'} → ${periodeFin || '-'}` : '' },
      { label: 'Nationalite', value: getTextValue(poste.labelPays || poste.nationalite || '') },
      { label: 'Classification', value: classificationLabel || '' },
      { label: 'Quantite', value: poste.quantite ? String(poste.quantite) : '' },
    ].filter((entry) => entry.value);

    const remunerationEntries = [
      { label: 'Salaire brut', value: salaireBrutLabel || '' },
      { label: 'Panier repas', value: panierRepas ? `${formatCurrency(panierRepas)}/jour` : '' },
      { label: 'Heures/mois', value: heuresMois || '' },
      { label: 'Taux ETT', value: tauxEttLabel ? `${tauxEttLabel}/h` : '' },
      { label: 'Base horaire', value: heuresMois || '' },
    ].filter((entry) => entry.value);

    const posteColumnWidth = (contentWidth - cardPadding * 2 - columnGap) / 2;
    const missionHeight = measureKeyValueGrid(missionEntries, posteColumnWidth, 1, labelSize, valueSize, 6, 0);
    const remunerationHeight = measureKeyValueGrid(remunerationEntries, posteColumnWidth, 1, labelSize, valueSize, 6, 0);
    const posteContentHeight = Math.max(missionHeight, remunerationHeight) + 16;
    const posteHeight = cardPadding * 2 + 18 + posteContentHeight;

    ensureSpace(posteHeight + 12);
    drawCard(marginX, y, contentWidth, posteHeight, `Poste #${index + 1} - ${(posteLabel || 'Poste').toUpperCase()}`, colors.secondary);

    if (prixHeader) {
      const priceWidth = measureTextWidth(fontBold, prixHeader, 10);
      drawTextSafe(prixHeader, {
        x: marginX + contentWidth - cardPadding - priceWidth,
        y: y - cardPadding - 2,
        size: 10,
        font: fontBold,
        color: toPdfColor(colors.success),
      });
    }
    if (secteurLabel) {
      drawBadge(secteurLabel, colors.primary, marginX + cardPadding, y - cardPadding - 20);
    }

    const columnTitleSizeSmall = 8.5;
    drawTextSafe('MISSION', {
      x: marginX + cardPadding,
      y: y - cardPadding - 24,
      size: columnTitleSizeSmall,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });
    drawTextSafe('REMUNERATION', {
      x: marginX + cardPadding + posteColumnWidth + columnGap,
      y: y - cardPadding - 24,
      size: columnTitleSizeSmall,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });

    const posteEntriesTop = y - cardPadding - 24 - columnTitleSizeSmall - 4;
    drawKeyValueGrid(
      missionEntries,
      marginX + cardPadding,
      posteEntriesTop,
      posteColumnWidth,
      1,
      labelSize,
      valueSize,
      6,
      0,
      toPdfColor(colors.muted),
      toPdfColor(colors.text)
    );
    drawKeyValueGrid(
      remunerationEntries,
      marginX + cardPadding + posteColumnWidth + columnGap,
      posteEntriesTop,
      posteColumnWidth,
      1,
      labelSize,
      valueSize,
      6,
      0,
      toPdfColor(colors.muted),
      toPdfColor(colors.text)
    );

    y -= posteHeight + 14;
  });

  // Conditions de travail
  const conditionsEntriesLeft = [
    { label: 'Type de contrat', value: getTextValue(conditions.typeContrat) || '' },
    { label: 'Periode d\'essai', value: getTextValue(conditions.periodeEssai) || '' },
    { label: 'Motif de recours', value: getTextValue(conditions.motifRecours) || '' },
    { label: 'Delai paiement', value: getTextValue(conditions.delaiPaiement) || '' },
  ].filter((entry) => entry.value);
  const conditionsEntriesRight = [
    { label: 'Duree du contrat', value: getTextValue(conditions.dureeContrat) || '' },
    { label: 'Lieu', value: getTextValue(conditions.lieu) || '' },
    { label: 'Date debut souhaitee', value: conditions.dateDebutSouhaitee ? formatDateShort(conditions.dateDebutSouhaitee) : '' },
  ].filter((entry) => entry.value);
  const hebergementLabel = conditions.hebergement?.chargeEU ? 'Pris en charge' : 'Non pris en charge';
  const hebergementComment = conditions.hebergement?.commentaire ? ` (${conditions.hebergement.commentaire})` : '';
  const repasTypeLabel = conditions.repas?.type ? getTextValue(conditions.repas.type) : '';
  const repasLabel = repasTypeLabel
    ? `${repasTypeLabel}${conditions.repas?.montant ? ` (${formatCurrency(conditions.repas.montant)})` : ''}`
    : '';
  const logistics = [
    `Hebergement: ${hebergementLabel}${hebergementComment}`,
    conditions.transportLocal?.chargeETT ? 'Transport local: Pris en charge' : 'Transport local: Non pris en charge',
    repasLabel ? `Repas: ${repasLabel}` : '',
  ].filter(Boolean);

  const conditionsColumnWidth = (contentWidth - cardPadding * 2 - columnGap) / 2;
  const conditionsLeftHeight = measureKeyValueGrid(conditionsEntriesLeft, conditionsColumnWidth, 1, labelSize, valueSize, 6, 0);
  const conditionsRightHeight = measureKeyValueGrid(conditionsEntriesRight, conditionsColumnWidth, 1, labelSize, valueSize, 6, 0);
  const logisticsText = logistics.map((line) => `• ${line}`).join('\n');
  const logisticsHeight = logisticsText
    ? measureParagraph(logisticsText, contentWidth - cardPadding * 2, 9, 3)
    : 0;
  const conditionsHeight =
    cardPadding * 2 +
    14 +
    Math.max(conditionsLeftHeight, conditionsRightHeight) +
    (logisticsHeight ? logisticsHeight + 8 : 0);

  ensureSpace(conditionsHeight + 12);
  drawCard(marginX, y, contentWidth, conditionsHeight, 'Conditions de travail', colors.primary);
  const conditionsTop = y - cardPadding - 14;
  drawKeyValueGrid(
    conditionsEntriesLeft,
    marginX + cardPadding,
    conditionsTop,
    conditionsColumnWidth,
    1,
    labelSize,
    valueSize,
    6,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  drawKeyValueGrid(
    conditionsEntriesRight,
    marginX + cardPadding + conditionsColumnWidth + columnGap,
    conditionsTop,
    conditionsColumnWidth,
    1,
    labelSize,
    valueSize,
    6,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  if (logisticsHeight) {
    const logisticsY = conditionsTop - Math.max(conditionsLeftHeight, conditionsRightHeight) - 6;
    drawParagraph(logisticsText, marginX + cardPadding, logisticsY, contentWidth - cardPadding * 2, 9, 3, toPdfColor(colors.text));
  }
  y -= conditionsHeight + 14;

  // Profil candidats
  const profileLines = [
    candidats.experience?.obligatoire
      ? `Experience requise: ${candidats.experience.annees ? `${candidats.experience.annees} ans` : 'Oui'}`
      : 'Experience requise: Non',
    candidats.formation?.obligatoire
      ? `Formation: ${getTextValue(candidats.formation.type) || 'Obligatoire'}`
      : 'Formation: Non',
    candidats.permis?.requis
      ? `Permis de conduire: ${candidats.permis.categorie ? `Categorie ${getTextValue(candidats.permis.categorie)}` : 'Requis'}`
      : 'Permis de conduire: Non requis',
    candidats.outillage?.requis
      ? `Outillage: ${getTextValue(candidats.outillage.type) || 'Requis'}`
      : 'Outillage: Non requis',
    candidats.travailRisque?.active
      ? `Travail a risque: ${getTextValue(candidats.travailRisque.precisions) || 'Oui'}`
      : '',
  ].filter(Boolean);

  const languesEntries = candidats.langues
    ? Object.entries(candidats.langues)
        .filter(([, niveau]) => niveau && niveau !== 'non-requis')
        .map(([langue, niveau]) => `${getTextValue(langue)} - ${getTextValue(niveau)}`)
    : [];

  if (languesEntries.length) {
    profileLines.push(`Langues: ${languesEntries.join(', ')}`);
  }

  const episEntries = Array.isArray(candidats.epis) ? candidats.epis.map((epi: string) => getTextValue(epi)) : [];

  const profileText = profileLines.map((line) => `• ${line}`).join('\n');
  const profileTextHeight = measureParagraph(profileText, contentWidth - cardPadding * 2, 9, 3);
  const episHeight = episEntries.length ? measureChecklist(episEntries, contentWidth - cardPadding * 2, 9, 3) + 12 : 0;
  const profileHeight =
    cardPadding * 2 +
    14 +
    profileTextHeight +
    (episHeight ? episHeight + 8 : 0);

  ensureSpace(profileHeight + 12);
  drawCard(marginX, y, contentWidth, profileHeight, 'Profil des candidats recherches', colors.secondary);
  const profileTop = y - cardPadding - 14;
  drawParagraph(profileText, marginX + cardPadding, profileTop, contentWidth - cardPadding * 2, 9, 3, toPdfColor(colors.text));
  if (episEntries.length) {
    const episTitleY = profileTop - profileTextHeight - 6;
    drawTextSafe('EPI requis:', {
      x: marginX + cardPadding,
      y: episTitleY,
      size: 9,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });
    drawChecklist(
      episEntries,
      marginX + cardPadding,
      episTitleY - 12,
      contentWidth - cardPadding * 2,
      9,
      3,
      toPdfColor(colors.text)
    );
  }
  y -= profileHeight + 16;

  // Signature electronique
  const signatureEntries = [
    { label: 'Nom complet', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
    { label: 'Email', value: contact.email || '' },
    { label: 'Entreprise', value: entreprise.raisonSociale || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
  ].filter((entry) => entry.value);
  const signatureMetaEntries = [
    { label: 'Date et heure', value: prospect.signature?.metadata?.timestampReadable || '' },
    { label: 'Horodatage ISO 8601', value: prospect.signature?.metadata?.timestamp || '' },
  ].filter((entry) => entry.value);
  const signatureColumnWidth = (contentWidth - cardPadding * 2 - columnGap) / 2;
  const signatureLeftHeight = measureKeyValueGrid(signatureEntries, signatureColumnWidth, 1, 8, 10, 6, 0);
  const signatureRightHeight = measureKeyValueGrid(signatureMetaEntries, signatureColumnWidth, 1, 8, 10, 6, 0);
  const signatureGridHeight = Math.max(signatureLeftHeight, signatureRightHeight);

  const signatureBoxWidth = 160;
  const signatureBoxHeight = 70;
  const consentMentions = prospect.signature?.consentement?.mentions || '';
  const consentDate = prospect.signature?.consentement?.dateAcceptation
    ? new Date(prospect.signature.consentement.dateAcceptation).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Paris'
      })
    : '';
  const consentTextHeight = consentMentions
    ? measureParagraph(consentMentions, contentWidth - cardPadding * 2 - signatureBoxWidth - 12, 8.5, 3)
    : 0;
  const signatureHeight =
    cardPadding * 2 +
    14 +
    signatureGridHeight +
    8 +
    signatureBoxHeight +
    (consentTextHeight ? consentTextHeight + (consentDate ? 12 : 0) : 0) +
    6;

  ensureSpace(signatureHeight + 12);
  drawCard(marginX, y, contentWidth, signatureHeight, 'Signature electronique', isSigned ? colors.success : colors.warning);
  const signatureTop = y - cardPadding - 14;
  drawKeyValueGrid(
    signatureEntries,
    marginX + cardPadding,
    signatureTop,
    signatureColumnWidth,
    1,
    8,
    10,
    6,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  drawKeyValueGrid(
    signatureMetaEntries,
    marginX + cardPadding + signatureColumnWidth + columnGap,
    signatureTop,
    signatureColumnWidth,
    1,
    8,
    10,
    6,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );

  const signatureBoxY = signatureTop - signatureGridHeight - 8;
  drawRoundedRect(marginX + cardPadding, signatureBoxY - signatureBoxHeight, signatureBoxWidth, signatureBoxHeight, 8, {
    color: toPdfColor(colors.white),
    borderColor: toPdfColor(borderColor),
    borderWidth: 1,
  });
  if (isSigned && prospect.signature?.image && typeof prospect.signature.image === 'string' && prospect.signature.image.startsWith('data:image')) {
    try {
      const base64 = prospect.signature.image.split(',')[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const image = await pdfDoc.embedPng(bytes);
      const scale = Math.min((signatureBoxWidth - 16) / image.width, (signatureBoxHeight - 12) / image.height);
      const imgWidth = image.width * scale;
      const imgHeight = image.height * scale;
      page.drawImage(image, {
        x: marginX + cardPadding + (signatureBoxWidth - imgWidth) / 2,
        y: signatureBoxY - signatureBoxHeight + (signatureBoxHeight - imgHeight) / 2,
        width: imgWidth,
        height: imgHeight,
      });
    } catch (error) {
      console.error('⚠️ Erreur embed signature image:', error);
    }
  } else {
    drawTextSafe('Espace signature', {
      x: marginX + cardPadding + 16,
      y: signatureBoxY - signatureBoxHeight / 2,
      size: 8.5,
      font: fontRegular,
      color: toPdfColor(colors.muted),
    });
  }

  if (consentMentions) {
    const consentX = marginX + cardPadding + signatureBoxWidth + 12;
    const consentY = signatureBoxY - 2;
    drawParagraph(consentMentions, consentX, consentY, contentWidth - cardPadding * 2 - signatureBoxWidth - 12, 8.5, 3, toPdfColor(colors.text));
    if (consentDate) {
      const consentTextHeightLocal = measureParagraph(consentMentions, contentWidth - cardPadding * 2 - signatureBoxWidth - 12, 8.5, 3);
      drawTextSafe(`CGV acceptees le: ${consentDate}`, {
        x: consentX,
        y: consentY - consentTextHeightLocal - 2,
        size: 8,
        font: fontRegular,
        color: toPdfColor(colors.muted),
      });
    }
  }

  y -= signatureHeight + 14;

  // Preuve integrite / details techniques
  const signatureHashEntries = [
    { label: 'Adresse IP', value: prospect.signature?.metadata?.ipAddress || '' },
    { label: 'Navigateur', value: prospect.signature?.metadata?.userAgent || '' },
    { label: 'Algorithme', value: prospect.signature?.integrite?.hashAlgorithm || '' },
  ].filter((entry) => entry.value);
  const signatureHash = prospect.signature?.integrite?.documentHash || '';
  const signatureHashFormatted = signatureHash
    ? (signatureHash.match(/.{1,48}/g) || [signatureHash]).join(' ')
    : '';
  const hashGridHeight = measureKeyValueGrid(signatureHashEntries, contentWidth - cardPadding * 2, 1, 8, 9.5, 6, 0);
  const hashTextHeight = signatureHashFormatted
    ? measureParagraph(signatureHashFormatted, contentWidth - cardPadding * 2, 8, 3, fontMono)
    : 0;
  const technicalHeight =
    cardPadding * 2 +
    14 +
    hashGridHeight +
    (hashTextHeight ? hashTextHeight + 10 : 0);

  ensureSpace(technicalHeight + 12);
  drawCard(marginX, y, contentWidth, technicalHeight, 'Details techniques (preuve integrite)', colors.navy);
  const technicalTop = y - cardPadding - 14;
  drawKeyValueGrid(
    signatureHashEntries,
    marginX + cardPadding,
    technicalTop,
    contentWidth - cardPadding * 2,
    1,
    8,
    9.5,
    6,
    0,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  if (hashTextHeight) {
    const hashY = technicalTop - hashGridHeight - 6;
    drawTextSafe('Hash document:', {
      x: marginX + cardPadding,
      y: hashY,
      size: 8,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });
    drawParagraph(signatureHashFormatted, marginX + cardPadding, hashY - 10, contentWidth - cardPadding * 2, 8, 3, toPdfColor(colors.text), fontMono);
  }
  y -= technicalHeight + 14;

  // Conditions generales & mentions legales
  if (inclureCGV) {
    const cgvLegalFields = cgv?.sections?.article0?.fields || {};
    const legalSummaryLines = [
      getTextValue(conditions.delaiPaiement) ? `Conditions de paiement: ${getTextValue(conditions.delaiPaiement)}` : '',
      cgv?.hero?.subtitle,
      cgv?.hero?.effectiveDate,
      cgv?.sections?.article6?.section1?.legalLimit,
      cgv?.sections?.article16?.sections?.law?.description,
      cgv?.sections?.article16?.sections?.jurisdiction?.description,
    ].filter(Boolean).map((line) => `• ${line}`);

    const legalFooterLines = [
      cgvLegalFields.legalFormValue ? `Forme juridique: ${cgvLegalFields.legalFormValue}` : '',
      cgvLegalFields.managerValue ? `Gerant: ${cgvLegalFields.managerValue}` : '',
      cgvLegalFields.siretValue ? `SIRET: ${cgvLegalFields.siretValue}` : '',
      cgvLegalFields.vatValue ? `TVA intracom: ${cgvLegalFields.vatValue}` : '',
      cgvLegalFields.addressValue ? `Adresse: ${cgvLegalFields.addressValue}` : '',
      cgvLegalFields.contactValue ? `Contact: ${cgvLegalFields.contactValue}` : '',
    ].filter(Boolean);

    const legalText = legalSummaryLines.join('\n');
    const legalFooterText = legalFooterLines.join('\n');
    const legalTextHeight = measureParagraph(legalText, contentWidth - cardPadding * 2, 8.5, 3);
    const legalFooterHeight = legalFooterText
      ? measureParagraph(legalFooterText, contentWidth - cardPadding * 2, 8, 3)
      : 0;
    const legalHeight =
      cardPadding * 2 +
      14 +
      legalTextHeight +
      (legalFooterHeight ? legalFooterHeight + 8 : 0);

    ensureSpace(legalHeight + 12);
    drawCard(marginX, y, contentWidth, legalHeight, 'Conditions generales & mentions legales', colors.primary);
    const legalTop = y - cardPadding - 14;
    drawParagraph(legalText, marginX + cardPadding, legalTop, contentWidth - cardPadding * 2, 8.5, 3, toPdfColor(colors.text));
    if (legalFooterText) {
      const legalFooterY = legalTop - legalTextHeight - 6;
      drawParagraph(legalFooterText, marginX + cardPadding, legalFooterY, contentWidth - cardPadding * 2, 8, 3, toPdfColor(colors.muted));
    }
    y -= legalHeight + 14;
  }

  // Footer
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const generatedLabel = formatDateForPdf(new Date().toISOString()) || '';
  pages.forEach((currentPage, index) => {
    currentPage.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: footerHeight,
      color: toPdfColor(tint(colors.white, 0.98)),
    });
    currentPage.drawLine({
      start: { x: 0, y: footerHeight },
      end: { x: pageWidth, y: footerHeight },
      thickness: 1,
      color: toPdfColor(tint(colors.primary, 0.2)),
    });
    const footerText = 'YOJOB - contact@yojob.fr - +33 1 23 45 67 89 - yojob.fr';
    drawTextOnPage(currentPage, footerText, {
      x: marginX,
      y: 12,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.muted),
    });
    if (generatedLabel) {
      drawTextOnPage(currentPage, `Genere le: ${generatedLabel}`, {
        x: marginX,
        y: 3,
        size: 7.5,
        font: fontRegular,
        color: toPdfColor(colors.muted),
      });
    }
    const pageLabel = `Page ${index + 1}/${totalPages}`;
    const pageLabelWidth = measureTextWidth(fontRegular, pageLabel, 8);
    drawTextOnPage(currentPage, pageLabel, {
      x: pageWidth - marginX - pageLabelWidth,
      y: 12,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.muted),
    });
  });

  return await pdfDoc.save();
}

const generateDevisPdfBytesByVersion = async (
  prospect: any,
  inclureCGV: boolean,
  templateVersion?: string | null
): Promise<Uint8Array> => {
  const resolved = resolvePdfTemplateVersion(templateVersion ?? getDefaultPdfTemplateVersion());
  if (resolved === 'v2-modern') {
    return await generateDevisPdfBytesV2(prospect, inclureCGV);
  }
  return await generateDevisPdfBytes(prospect, inclureCGV);
};


async function generateAndStorePdf(
  prospect: any,
  inclureCGV: boolean,
  templateVersion?: string | null
): Promise<{ pdfUrl: string; pdfPath: string; pdfBytes: Uint8Array; prospectUpdated: any } | null> {
  try {
    const pdfBytes = await generateDevisPdfBytesByVersion(prospect, inclureCGV, templateVersion);
    const supabase = getSupabaseClient();
    const bucketReady = await ensureDevisPdfBucket(supabase);
    if (!bucketReady) {
      throw new Error('Bucket PDF devis indisponible');
    }

    const safeNumero = String(prospect.numero || prospect.id || 'devis')
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const pdfPath = `devis/${safeNumero}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from(DEVIS_PDF_BUCKET)
      .upload(pdfPath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: signedUrlData, error: signedError } = await supabase.storage
      .from(DEVIS_PDF_BUCKET)
      .createSignedUrl(pdfPath, 315360000);

    if (signedError || !signedUrlData?.signedUrl) {
      throw signedError || new Error('Impossible de générer l’URL signée');
    }

    const pdfUrl = signedUrlData.signedUrl;
    const generatedAt = new Date().toISOString();

    const prospectUpdated = {
      ...prospect,
      pdfUrl,
      pdf_url: pdfUrl,
      pdf_storage_path: pdfPath,
      pdfGeneratedAt: generatedAt,
      pdf_generated_at: generatedAt,
    };

    await kv.set(`prospects:${prospect.id}`, prospectUpdated);

    await updateProspectCustomFields(prospectUpdated, {
      pdf_url: pdfUrl,
      pdf_storage_path: pdfPath,
      pdf_generated_at: generatedAt,
    });

    return { pdfUrl, pdfPath, pdfBytes, prospectUpdated };
  } catch (error) {
    console.error('❌ Erreur génération PDF devis:', error);
    return null;
  }
}

// Helper pour obtenir le client Supabase (CRM prospects)
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function mapDevisSector(secteurKey?: string): string | null {
  if (!secteurKey) return null;

  const normalized = secteurKey.toLowerCase();
  if (normalized === 'batiment' || normalized === 'tp' || normalized === 'travaux_publics') {
    return 'BTP';
  }

  return secteurKey;
}

function applyTemplateVariables(
  template: { subject: string; body_html: string; body_text: string },
  variables: Record<string, string>
) {
  let subject = template.subject;
  let bodyHtml = template.body_html;
  let bodyText = template.body_text;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    subject = subject.split(placeholder).join(value);
    bodyHtml = bodyHtml.split(placeholder).join(value);
    bodyText = bodyText.split(placeholder).join(value);
  }

  return { subject, bodyHtml, bodyText };
}

async function sendEmailSafe(options: { to: string; subject: string; body: string; html?: string; replyTo?: string; attachments?: { filename: string; content?: string | Uint8Array; contentType?: string }[] }) {
  try {
    const result = await emailService.sendEmail(options);
    if (!result.success) {
      console.error('⚠️ Envoi email échoué:', result.message);
    }
  } catch (error) {
    console.error('⚠️ Erreur envoi email (non-bloquant):', error);
  }
}

async function updateProspectCustomFields(
  devisData: any,
  updates: Record<string, any>
): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    const contactEmail = devisData?.contact?.email;
    let prospectId = devisData?.prospectId || null;

    let existing: any = null;
    if (prospectId) {
      const { data } = await supabase
        .from('prospects')
        .select('id, custom_fields')
        .eq('id', prospectId)
        .single();
      existing = data;
    } else if (contactEmail) {
      const { data } = await supabase
        .from('prospects')
        .select('id, custom_fields')
        .eq('email', contactEmail)
        .maybeSingle();
      existing = data;
    }

    if (!existing) return null;

    const merged = {
      ...(existing.custom_fields || {}),
      ...updates,
    };

    const { error } = await supabase
      .from('prospects')
      .update({ custom_fields: merged })
      .eq('id', existing.id);

    if (error) {
      console.error('⚠️ Erreur update custom_fields prospect:', error);
      return existing.id;
    }

    return existing.id;
  } catch (error) {
    console.error('⚠️ Erreur update custom_fields prospect (non-bloquant):', error);
    return null;
  }
}

async function sendSignatureConfirmationEmails(
  prospect: any,
  signatureTimestamp: string,
  pdfAttachment?: { filename: string; content?: string | Uint8Array; contentType?: string }
) {
  try {
    const template = SIGNATURE_EMAIL_TEMPLATES.find(t => t.id === 'tpl-signature-confirmed');
    const signatureDate = new Date(signatureTimestamp).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Paris'
    });

    const contactName = [prospect.contact.prenom, prospect.contact.nom].filter(Boolean).join(' ').trim();
    const variables = {
      contact_firstname: prospect.contact.prenom || '',
      contact_lastname: prospect.contact.nom || '',
      quote_number: prospect.numero || '',
      signature_date: signatureDate,
    };

    if (template) {
      const { subject, bodyHtml, bodyText } = applyTemplateVariables(template, variables);
      const pdfUrl = (prospect.pdfUrl && prospect.pdfUrl !== '#') ? prospect.pdfUrl : (prospect.pdf_url && prospect.pdf_url !== '#') ? prospect.pdf_url : '';
      const extraHtml = pdfUrl
        ? `<p style="margin-top: 20px;"><a href="${pdfUrl}" style="color:#06B6D4;text-decoration:none;">📄 Télécharger votre devis signé</a></p>`
        : '';
      const extraText = pdfUrl ? `\n\nTélécharger votre devis signé : ${pdfUrl}` : '';

      await sendEmailSafe({
        to: prospect.contact.email,
        subject,
        body: bodyText + extraText,
        html: bodyHtml + extraHtml,
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      });
    } else {
      await sendEmailSafe({
        to: prospect.contact.email,
        subject: '✅ Votre devis est signé',
        body: `Bonjour ${contactName || ''},\n\nVotre devis ${prospect.numero} a été signé le ${signatureDate}.\n\nL'équipe YOJOB`,
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      });
    }

    await sendEmailSafe({
      to: INTERNAL_CONTACT_EMAIL,
      subject: `✅ Devis signé - ${prospect.numero}`,
      body: `Le devis ${prospect.numero} a été signé.\n\nContact: ${contactName}\nEmail: ${prospect.contact.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2>✅ Devis signé</h2>
          <p><strong>Numéro :</strong> ${prospect.numero}</p>
          <p><strong>Contact :</strong> ${contactName}</p>
          <p><strong>Email :</strong> ${prospect.contact.email}</p>
        </div>
      `,
      replyTo: prospect.contact.email,
    });
  } catch (error) {
    console.error('⚠️ Erreur envoi email signature (non-bloquant):', error);
  }
}

async function syncDevisToProspect(devisData: any) {
  try {
    const contact = devisData?.contact || {};
    const entreprise = devisData?.entreprise || {};
    const postes = Array.isArray(devisData?.postes) ? devisData.postes : [];
    const conditions = devisData?.conditions || {};

    if (!contact.email) {
      console.warn('⚠️ Devis sans email, sync CRM ignorée.');
      return null;
    }

    const supabase = getSupabaseClient();

    const fullName = [contact.prenom, contact.nom].filter(Boolean).join(' ').trim();
    const phone = contact.telephonePortable || contact.telephoneFixe || null;
    const sectorKey = postes[0]?.secteur || null;
    const sectorLabel = mapDevisSector(sectorKey || undefined);
    const totalCandidates = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
    const projectDescription = [conditions.motifRecours, conditions.lieuxMission].filter(Boolean).join(' - ');

    const customFields = {
      devis_id: devisData.id,
      devis_numero: devisData.numero,
      devis_status: devisData.statut,
      devis_created_at: devisData.createdAt,
      devis_updated_at: devisData.updatedAt,
      workers_count: totalCandidates,
      industry_sector: sectorLabel || sectorKey || null,
      sector_key: sectorKey,
      project_description: projectDescription || null,
      entreprise,
      contact,
      postes,
      conditions,
      source_event: 'devis_submitted',
    };

    const { data: existingProspect, error: searchError } = await supabase
      .from('prospects')
      .select('id, status, type, source, name, phone, company, country_code, sector, need_type, message, custom_fields')
      .eq('email', contact.email)
      .maybeSingle();

    if (searchError) {
      const message = (searchError as any)?.message || '';
      const code = (searchError as any)?.code || '';
      if (code === 'PGRST205' || message.includes('schema cache') || message.includes('does not exist')) {
        console.warn('⚠️ Tables CRM non initialisées, sync devis ignorée.');
        return null;
      }
      console.error('❌ Erreur recherche prospect existant:', searchError);
    }

    let prospectId: string;
    let isNew = false;
    let previousStatus: string | null = null;
    let currentStatus: string | null = null;

    if (existingProspect) {
      previousStatus = existingProspect.status || null;

      const updatedCustomFields = {
        ...(existingProspect.custom_fields || {}),
        ...customFields,
      };

      const { data: updatedProspect, error: updateError } = await supabase
        .from('prospects')
        .update({
          type: existingProspect.type || 'client',
          source: existingProspect.source || 'devis_form',
          status: existingProspect.status || 'new',
          name: existingProspect.name || fullName || null,
          phone: existingProspect.phone || phone,
          company: existingProspect.company || entreprise.raisonSociale || null,
          country_code: existingProspect.country_code || entreprise.pays || null,
          sector: existingProspect.sector || sectorLabel || sectorKey || null,
          need_type: existingProspect.need_type || conditions.motifRecours || null,
          message: existingProspect.message || 'Demande de devis',
          custom_fields: updatedCustomFields,
        })
        .eq('id', existingProspect.id)
        .select('id, status')
        .single();

      if (updateError) {
        console.error('❌ Erreur mise à jour prospect (devis):', updateError);
        return null;
      }

      prospectId = updatedProspect.id;
      currentStatus = updatedProspect.status || null;
    } else {
      const { data: newProspect, error: insertError } = await supabase
        .from('prospects')
        .insert([{
          type: 'client',
          source: 'devis_form',
          status: 'new',
          name: fullName || null,
          email: contact.email,
          phone,
          company: entreprise.raisonSociale || null,
          country_code: entreprise.pays || null,
          language_code: 'fr',
          sector: sectorLabel || sectorKey || null,
          need_type: conditions.motifRecours || null,
          message: 'Demande de devis',
          custom_fields: customFields,
        }])
        .select('id, status')
        .single();

      if (insertError) {
        console.error('❌ Erreur création prospect (devis):', insertError);
        return null;
      }

      prospectId = newProspect.id;
      currentStatus = newProspect.status || null;
      isNew = true;
    }

    try {
      await supabase.from('prospect_actions').insert({
        prospect_id: prospectId,
        action_type: 'quote_request',
        action_label: 'Demande de devis',
        action_description: `Demande de devis ${devisData.numero}`,
        user_name: 'Système',
        metadata: {
          devis_id: devisData.id,
          devis_numero: devisData.numero,
          source: 'devis_form',
        },
      });
    } catch (actionError) {
      console.warn('⚠️ Impossible d\'enregistrer action prospect (devis):', actionError);
    }

    return {
      prospectId,
      isNew,
      previousStatus,
      currentStatus,
    };
  } catch (error) {
    console.error('❌ Erreur sync devis → prospect:', error);
    return null;
  }
}

async function triggerWorkflow(triggerType: 'prospect_created' | 'status_changed', payload: Record<string, any>) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !anonKey) return;

    fetch(`${supabaseUrl}/functions/v1/make-server-10092a63/workflow-engine/trigger/${triggerType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    }).catch(err => {
      console.error(`⚠️ Erreur trigger ${triggerType} (non-bloquant):`, err);
    });
  } catch (error) {
    console.error(`⚠️ Erreur déclenchement workflow ${triggerType}:`, error);
  }
}

/**
 * Génère un numéro de devis unique
 */
function genererNumeroDevis(): string {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  return `DEV-${annee}${mois}${jour}-${random}`;
}

/**
 * POST /make-server-10092a63/devis
 * Créer une nouvelle demande de devis
 */
devis.post('/', async (c) => {
  try {
    const data = await c.req.json();
    
    // Générer un ID et numéro unique
    const id = crypto.randomUUID();
    const numero = genererNumeroDevis();
    const timestamp = new Date().toISOString();
    
    // Créer l'objet prospect/devis
    const prospect = {
      id,
      numero,
      type: 'devis',
      statut: 'nouveau',
      createdAt: timestamp,
      updatedAt: timestamp,
      
      // Informations entreprise
      entreprise: {
        pays: data.entreprise.pays || 'France', // Valeur par défaut pour rétrocompatibilité
        raisonSociale: data.entreprise.raisonSociale,
        siret: data.entreprise.siret,
        codeAPE: data.entreprise.codeAPE,
        tvaIntracommunautaire: data.entreprise.tvaIntracommunautaire,
        adresse: data.entreprise.adresse,
        codePostal: data.entreprise.codePostal,
        ville: data.entreprise.ville,
        region: data.entreprise.region,
        siteInternet: data.entreprise.siteInternet
      },
      
      // Contact
      contact: {
        nom: data.contact.nom,
        prenom: data.contact.prenom,
        fonction: data.contact.fonction,
        email: data.contact.email,
        telephoneFixe: data.contact.telephoneFixe,
        telephonePortable: data.contact.telephonePortable
      },
      
      // Besoins (postes)
      postes: data.postes,
      
      // Conditions
      conditions: data.conditions,
      
      // Profil candidats
      candidats: data.candidats,
      
      // Métadonnées
      metadata: {
        source: 'formulaire-web',
        userAgent: c.req.header('user-agent'),
        ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
      }
    };
    
    // Sauvegarder dans le KV store
    await kv.set(`prospects:${id}`, prospect);
    
    // Ajouter à la liste des prospects
    const listeProspects = await kv.get('prospects:list') || [];
    listeProspects.unshift(id); // Ajouter au début
    await kv.set('prospects:list', listeProspects);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      signe: 0,
      converti: 0,
      perdu: 0
    };
    stats.total += 1;
    stats.nouveau += 1;
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis créé: ${numero} (ID: ${id})`);

    // ✉️ Emails transactionnels (confirmation client + notification interne)
    try {
      const contactName = [prospect.contact.prenom, prospect.contact.nom].filter(Boolean).join(' ').trim() || 'Bonjour';
      const subjectClient = '✅ Votre demande de devis a bien été reçue';
      const textClient = `Bonjour ${contactName},

Merci pour votre demande de devis. Notre équipe vous recontacte rapidement.

Numéro de devis : ${prospect.numero}
Entreprise : ${prospect.entreprise.raisonSociale || 'Non précisé'}

L'équipe YOJOB`;

      const htmlClient = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Demande de devis reçue ✅</h2>
          <p>Bonjour <strong>${contactName}</strong>,</p>
          <p>Merci pour votre demande de devis. Notre équipe vous recontacte rapidement.</p>
          <p><strong>Numéro de devis :</strong> ${prospect.numero}</p>
          <p><strong>Entreprise :</strong> ${prospect.entreprise.raisonSociale || 'Non précisé'}</p>
          <p>À très vite,<br><strong>L'équipe YOJOB</strong></p>
        </div>
      `;

      await sendEmailSafe({
        to: prospect.contact.email,
        subject: subjectClient,
        body: textClient,
        html: htmlClient,
      });

      const subjectAdmin = '📥 Nouvelle demande de devis';
      const textAdmin = `Nouvelle demande de devis

Numéro : ${prospect.numero}
Entreprise : ${prospect.entreprise.raisonSociale || 'Non précisé'}
Contact : ${contactName}
Email : ${prospect.contact.email}
Téléphone : ${prospect.contact.telephonePortable || prospect.contact.telephoneFixe || 'Non précisé'}
Pays : ${prospect.entreprise.pays || 'Non précisé'}
Postes : ${prospect.postes?.length || 0}
`;

      const htmlAdmin = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2>📥 Nouvelle demande de devis</h2>
          <ul>
            <li><strong>Numéro :</strong> ${prospect.numero}</li>
            <li><strong>Entreprise :</strong> ${prospect.entreprise.raisonSociale || 'Non précisé'}</li>
            <li><strong>Contact :</strong> ${contactName}</li>
            <li><strong>Email :</strong> ${prospect.contact.email}</li>
            <li><strong>Téléphone :</strong> ${prospect.contact.telephonePortable || prospect.contact.telephoneFixe || 'Non précisé'}</li>
            <li><strong>Pays :</strong> ${prospect.entreprise.pays || 'Non précisé'}</li>
            <li><strong>Postes :</strong> ${prospect.postes?.length || 0}</li>
          </ul>
        </div>
      `;

      await sendEmailSafe({
        to: INTERNAL_CONTACT_EMAIL,
        subject: subjectAdmin,
        body: textAdmin,
        html: htmlAdmin,
        replyTo: prospect.contact.email,
      });
    } catch (notifyError) {
      console.error('⚠️ Emails devis (non-bloquant):', notifyError);
    }

    // 🔗 Sync CRM + Trigger automations (non bloquant)
    try {
      const syncResult = await syncDevisToProspect(prospect);
      if (syncResult?.prospectId) {
        await kv.set(`prospects:${id}`, {
          ...prospect,
          prospectId: syncResult.prospectId,
        });

        // Déclencher les workflows automatiquement (SMTP)
        await triggerWorkflow('prospect_created', { prospect_id: syncResult.prospectId });

        if (
          syncResult.previousStatus &&
          syncResult.currentStatus &&
          syncResult.previousStatus !== syncResult.currentStatus
        ) {
          await triggerWorkflow('status_changed', {
            prospect_id: syncResult.prospectId,
            status_from: syncResult.previousStatus,
            status_to: syncResult.currentStatus,
          });
        }
      }
    } catch (syncError) {
      console.error('⚠️ Sync CRM devis (non-bloquant):', syncError);
    }
    
    return c.json({
      success: true,
      id,
      numero,
      message: 'Demande de devis enregistrée avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur création devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la création du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis
 * Lister tous les devis/prospects
 */
devis.get('/', async (c) => {
  try {
    const listeIds = await kv.get('prospects:list') || [];
    
    if (listeIds.length === 0) {
      return c.json({
        success: true,
        data: [],
        total: 0
      });
    }
    
    // Récupérer tous les prospects
    const prospects = await kv.mget(listeIds.map(id => `prospects:${id}`));
    
    // Filtrer les null (prospects supprimés)
    const prospectsFiltres = prospects.filter(p => p !== null);
    
    return c.json({
      success: true,
      data: prospectsFiltres,
      total: prospectsFiltres.length
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/:id
 * Récupérer un devis spécifique
 */
devis.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    return c.json({
      success: true,
      data: prospect
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * PATCH /make-server-10092a63/devis/:id
 * Mettre à jour un devis (statut, notes, etc.)
 */
devis.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Mettre à jour le statut si fourni
    if (updates.statut && prospect.statut !== updates.statut) {
      // Mettre à jour les stats
      const stats = await kv.get('prospects:stats') || {};
      if (stats[prospect.statut]) stats[prospect.statut] -= 1;
      if (stats[updates.statut]) stats[updates.statut] += 1;
      await kv.set('prospects:stats', stats);
    }
    
    // Fusionner les mises à jour
    const prospectMisAJour = {
      ...prospect,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`prospects:${id}`, prospectMisAJour);
    
    console.log(`✅ Devis mis à jour: ${id}`);
    
    return c.json({
      success: true,
      data: prospectMisAJour
    });
    
  } catch (error) {
    console.error('❌ Erreur mise à jour devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * DELETE /make-server-10092a63/devis/:id
 * Supprimer un devis
 */
devis.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Supprimer de la liste
    const listeIds = await kv.get('prospects:list') || [];
    const nouvelleListe = listeIds.filter(i => i !== id);
    await kv.set('prospects:list', nouvelleListe);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats.total) stats.total -= 1;
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    await kv.set('prospects:stats', stats);
    
    // Supprimer le prospect
    await kv.del(`prospects:${id}`);
    
    console.log(`✅ Devis supprimé: ${id}`);
    
    return c.json({
      success: true,
      message: 'Devis supprimé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur suppression devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/stats
 * Récupérer les statistiques
 */
devis.get('/api/stats', async (c) => {
  try {
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      signe: 0,
      converti: 0,
      perdu: 0
    };
    
    return c.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération stats:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des statistiques',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/generer-pdf
 * Générer un PDF pour un devis
 */
devis.post('/generer-pdf', async (c) => {
  try {
    const { devisId, inclureCGV, templateVersion } = await c.req.json();
    
    console.log(`📄 Génération PDF pour devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    const pdfResult = await generateAndStorePdf(prospect, Boolean(inclureCGV), templateVersion);

    if (!pdfResult) {
      return c.json(
        {
          success: false,
          error: 'Impossible de générer le PDF'
        },
        500
      );
    }

    console.log(`✅ PDF généré: ${pdfResult.pdfPath}`);

    return c.json({
      success: true,
      pdfUrl: pdfResult.pdfUrl,
      pdfId: pdfResult.pdfPath,
      message: 'PDF généré avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur génération PDF:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la génération du PDF',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/devis/signer-devis
 * Signer un devis électroniquement avec certification complète
 */
devis.post('/signer-devis', async (c) => {
  try {
    const { 
      devisId, 
      signatureBase64, 
      accepteCGV,
      identiteSignataire // Nouvelles données d'identité
    } = await c.req.json();
    
    if (!accepteCGV) {
      return c.json(
        {
          success: false,
          error: 'Vous devez accepter les CGV'
        },
        400
      );
    }
    
    console.log(`✍️ Signature devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer un hash SHA-256 du contenu du devis pour garantir l'intégrité
    const devisContent = JSON.stringify({
      numero: prospect.numero,
      entreprise: prospect.entreprise,
      contact: prospect.contact,
      postes: prospect.postes,
      conditions: prospect.conditions
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(devisContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Récupérer les métadonnées de la requête
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      c.req.header('cf-connecting-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';
    const timestamp = new Date().toISOString();
    
    // Créer le certificat de signature électronique
    const certificatSignature = {
      // Signature graphique
      image: signatureBase64,
      
      // Identité du signataire (certifiée par les données du formulaire)
      signataire: {
        nom: prospect.contact.nom,
        prenom: prospect.contact.prenom,
        email: prospect.contact.email,
        fonction: prospect.contact.fonction,
        entreprise: prospect.entreprise.raisonSociale,
        siret: prospect.entreprise.siret
      },
      
      // Traçabilité technique
      metadata: {
        ipAddress: ipAddress,
        userAgent: userAgent,
        timestamp: timestamp,
        timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Europe/Paris'
        })
      },
      
      // Preuve d'intégrité
      integrite: {
        hashAlgorithm: 'SHA-256',
        documentHash: hashHex,
        devisNumero: prospect.numero,
        devisId: devisId
      },
      
      // Consentement
      consentement: {
        accepteCGV: true,
        dateAcceptation: timestamp,
        mentions: 'Le signataire certifie avoir lu et accepté les Conditions Générales de Vente et que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu\'une signature manuscrite conformément au règlement eIDAS (UE) n°910/2014.'
      },
      
      // Informations supplémentaires pour la traçabilité
      contexte: identiteSignataire || {}
    };
    
    // Mettre à jour le statut du devis
    const prospectMisAJour = {
      ...prospect,
      statut: 'signe',
      signature: certificatSignature,
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    if (stats['signe']) {
      stats['signe'] += 1;
    } else {
      stats['signe'] = 1;
    }
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis signé avec certification complète: ${devisId}`);
    console.log(`📍 IP: ${ipAddress}`);
    console.log(`🔐 Hash: ${hashHex.substring(0, 16)}...`);
    
    const pdfResult = await generateAndStorePdf(prospectMisAJour, true);
    const prospectWithPdf = pdfResult?.prospectUpdated || prospectMisAJour;
    const pdfAttachment = pdfResult
      ? {
          filename: `Devis-${prospectWithPdf.numero || prospectWithPdf.id}.pdf`,
          content: pdfResult.pdfBytes,
          contentType: 'application/pdf',
        }
      : undefined;

    // 🔄 Sync CRM + email confirmation
    await updateProspectCustomFields(prospectWithPdf, {
      devis_status: 'signe',
      signature_date: timestamp,
      signed_via_token: false,
      ...(pdfResult
        ? {
            pdf_url: pdfResult.pdfUrl,
            pdf_storage_path: pdfResult.pdfPath,
            pdf_generated_at: prospectWithPdf.pdf_generated_at || new Date().toISOString(),
          }
        : {}),
    });
    await sendSignatureConfirmationEmails(prospectWithPdf, timestamp, pdfAttachment);
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectWithPdf,
      certificat: certificatSignature
    });
    
  } catch (error) {
    console.error('❌ Erreur signature devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la signature du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/generer-lien-signature
 * Génère un lien de signature unique pour un devis
 */
devis.post('/generer-lien-signature', async (c) => {
  try {
    const { devisId } = await c.req.json();
    
    console.log(`🔗 Génération lien signature pour devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer un token unique et sécurisé
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const timestamp = new Date().toISOString();
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 jours
    
    // Sauvegarder le token
    const tokenData = {
      token,
      devisId,
      prospectEmail: prospect.contact.email,
      createdAt: timestamp,
      expiresAt: expirationDate.toISOString(),
      used: false
    };
    
    await kv.set(`signature-token:${token}`, tokenData);
    
    // Mettre à jour le devis avec le token
    const prospectMisAJour = {
      ...prospect,
      signatureToken: token,
      signatureUrl: signatureUrl,
      signatureLinkGeneratedAt: timestamp,
      signatureLinkExpiresAt: expirationDate.toISOString(),
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    // Générer l'URL complète (à adapter selon votre domaine)
    const signatureUrl = `${c.req.url.split('/functions')[0]}/signer/${token}`;
    
    console.log(`✅ Lien signature généré: ${token.substring(0, 16)}...`);
    console.log(`🔗 URL: ${signatureUrl}`);
    
    // 🆕 ENVOI AUTOMATIQUE D'EMAIL AVEC LE LIEN
    try {
      const template = SIGNATURE_EMAIL_TEMPLATES.find(t => t.id === 'tpl-signature-link');
      
      if (template && prospectMisAJour) {
        const totalCandidats = prospectMisAJour.postes.reduce((sum, p) => sum + p.quantite, 0);
        const variables = {
          contact_firstname: prospectMisAJour.contact.prenom || '',
          contact_lastname: prospectMisAJour.contact.nom || '',
          company: prospectMisAJour.entreprise.raisonSociale || '',
          quote_number: prospectMisAJour.numero || '',
          signature_url: signatureUrl,
          positions_count: String(prospectMisAJour.postes.length),
          candidates_count: String(totalCandidats),
          sector: prospectMisAJour.postes[0]?.secteur || 'Non spécifié',
          country: prospectMisAJour.entreprise.pays || '',
        };
        
        const { subject, bodyHtml, bodyText } = applyTemplateVariables(template, variables);
        
        await sendEmailSafe({
          to: prospectMisAJour.contact.email,
          subject,
          body: bodyText,
          html: bodyHtml,
        });
      }
    } catch (emailError) {
      // Ne pas bloquer si l'email échoue (non-bloquant)
      console.error('⚠️ Erreur envoi email (non-bloquant):', emailError);
    }

    // 🔄 Synchroniser infos signature dans le CRM prospects
    await updateProspectCustomFields(prospectMisAJour, {
      signature_token: token,
      signature_url: signatureUrl,
      signature_link_generated_at: timestamp,
      signature_link_expires_at: expirationDate.toISOString(),
    });
    
    return c.json({
      success: true,
      token,
      signatureUrl,
      expiresAt: expirationDate.toISOString(),
      message: 'Lien de signature généré avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur génération lien signature:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la génération du lien',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/verifier-token-signature
 * Vérifie la validité d'un token de signature et retourne le devis
 */
devis.post('/verifier-token-signature', async (c) => {
  try {
    const { token } = await c.req.json();
    
    console.log(`🔍 Vérification token: ${token.substring(0, 16)}...`);
    
    // Récupérer les données du token
    const tokenData = await kv.get(`signature-token:${token}`);
    
    if (!tokenData) {
      return c.json(
        {
          success: false,
          error: 'Lien invalide ou expiré'
        },
        404
      );
    }
    
    // Vérifier l'expiration
    const now = new Date();
    const expirationDate = new Date(tokenData.expiresAt);
    
    if (now > expirationDate) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a expiré'
        },
        400
      );
    }
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${tokenData.devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    console.log(`✅ Token valide pour devis: ${prospect.numero}`);
    
    return c.json({
      success: true,
      devis: prospect,
      tokenData: {
        createdAt: tokenData.createdAt,
        expiresAt: tokenData.expiresAt
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur vérification token:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la vérification du lien',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/signer-avec-token
 * Signer un devis avec un token de signature
 */
devis.post('/signer-avec-token', async (c) => {
  try {
    const { token, signatureBase64, accepteCGV } = await c.req.json();
    
    if (!accepteCGV) {
      return c.json(
        {
          success: false,
          error: 'Vous devez accepter les CGV'
        },
        400
      );
    }
    
    console.log(`✍️ Signature avec token: ${token.substring(0, 16)}...`);
    
    // Vérifier le token
    const tokenData = await kv.get(`signature-token:${token}`);
    
    if (!tokenData) {
      return c.json(
        {
          success: false,
          error: 'Lien invalide ou expiré'
        },
        404
      );
    }
    
    // Vérifier l'expiration
    const now = new Date();
    const expirationDate = new Date(tokenData.expiresAt);
    
    if (now > expirationDate) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a expiré'
        },
        400
      );
    }
    
    // Vérifier si déjà utilisé
    if (tokenData.used) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a déjà été utilisé'
        },
        400
      );
    }
    
    // Récupérer le devis
    const devisId = tokenData.devisId;
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer le hash d'intégrité
    const devisContent = JSON.stringify({
      numero: prospect.numero,
      entreprise: prospect.entreprise,
      contact: prospect.contact,
      postes: prospect.postes,
      conditions: prospect.conditions
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(devisContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Métadonnées
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      c.req.header('cf-connecting-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';
    const timestamp = new Date().toISOString();
    
    // Créer le certificat de signature
    const certificatSignature = {
      image: signatureBase64,
      signataire: {
        nom: prospect.contact.nom,
        prenom: prospect.contact.prenom,
        email: prospect.contact.email,
        fonction: prospect.contact.fonction,
        entreprise: prospect.entreprise.raisonSociale,
        siret: prospect.entreprise.siret
      },
      metadata: {
        ipAddress,
        userAgent,
        timestamp,
        timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Europe/Paris'
        }),
        signatureMethod: 'online_link'
      },
      integrite: {
        hashAlgorithm: 'SHA-256',
        documentHash: hashHex,
        devisNumero: prospect.numero,
        devisId: devisId
      },
      consentement: {
        accepteCGV: true,
        dateAcceptation: timestamp,
        mentions: 'Le signataire certifie avoir lu et accepté les Conditions Générales de Vente et que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu\'une signature manuscrite conformément au règlement eIDAS (UE) n°910/2014.'
      }
    };
    
    // Mettre à jour le devis
    const prospectMisAJour = {
      ...prospect,
      statut: 'signe',
      signature: certificatSignature,
      signedViaToken: true,
      signatureTokenUsed: token,
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    // Marquer le token comme utilisé
    const tokenDataUpdated = {
      ...tokenData,
      used: true,
      usedAt: timestamp
    };
    await kv.set(`signature-token:${token}`, tokenDataUpdated);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    if (stats['signe']) {
      stats['signe'] += 1;
    } else {
      stats['signe'] = 1;
    }
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis signé via lien: ${prospect.numero}`);
    console.log(`📍 IP: ${ipAddress}`);
    console.log(`🔐 Hash: ${hashHex.substring(0, 16)}...`);
    
    const pdfResult = await generateAndStorePdf(prospectMisAJour, true);
    const prospectWithPdf = pdfResult?.prospectUpdated || prospectMisAJour;
    const pdfAttachment = pdfResult
      ? {
          filename: `Devis-${prospectWithPdf.numero || prospectWithPdf.id}.pdf`,
          content: pdfResult.pdfBytes,
          contentType: 'application/pdf',
        }
      : undefined;

    // 🔄 Sync CRM + email confirmation
    await updateProspectCustomFields(prospectWithPdf, {
      devis_status: 'signe',
      signature_date: timestamp,
      signed_via_token: true,
      signature_token_used: token,
      ...(pdfResult
        ? {
            pdf_url: pdfResult.pdfUrl,
            pdf_storage_path: pdfResult.pdfPath,
            pdf_generated_at: prospectWithPdf.pdf_generated_at || new Date().toISOString(),
          }
        : {}),
    });
    await sendSignatureConfirmationEmails(prospectWithPdf, timestamp, pdfAttachment);
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectWithPdf,
      certificat: certificatSignature
    });
    
  } catch (error) {
    console.error('❌ Erreur signature avec token:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la signature du devis',
        details: error.message
      },
      500
    );
  }
});

export default devis;
