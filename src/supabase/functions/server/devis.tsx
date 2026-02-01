import { Hono } from 'npm:hono';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import fontkit from "npm:@pdf-lib/fontkit@1.0.0";
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

const loadAssetBytes = async (relativePath: string): Promise<Uint8Array> => {
  const url = new URL(relativePath, import.meta.url);
  return await Deno.readFile(url);
};

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
  pdfDoc.registerFontkit(fontkit);

  const embedFontSafe = async (relativePath: string, fallback: any) => {
    try {
      const bytes = await loadAssetBytes(relativePath);
      const font = await pdfDoc.embedFont(bytes, { subset: true });
      return { font, isFallback: false };
    } catch (error) {
      console.warn('⚠️ Font PDF indisponible:', error);
      const font = await pdfDoc.embedFont(fallback);
      return { font, isFallback: true };
    }
  };

  const regularFont = await embedFontSafe('./assets/fonts/Inter-Variable.ttf', StandardFonts.Helvetica);
  const fontRegular = regularFont.font;
  const fontBold = regularFont.isFallback
    ? await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    : fontRegular;
  const useSyntheticBold = !regularFont.isFallback;
  const syntheticBoldOffset = 0.28;
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  let logoImage: any = null;
  try {
    const logoBytes = await loadAssetBytes('./assets/yojob-logo.png');
    logoImage = await pdfDoc.embedPng(logoBytes);
  } catch (error) {
    console.warn('⚠️ Logo PDF introuvable:', error);
  }

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const marginBottom = 46;
  const headerBandHeight = 52;
  const headerInfoHeight = 18;
  const headerHeight = headerBandHeight + headerInfoHeight + 10;
  const footerHeight = 28;
  const contentWidth = pageWidth - marginX * 2;
  const columnGap = 16;
  const cardRadius = 10;
  const cardPadding = 10;
  const sectionGap = 10;
  const sectionGapLarge = 12;

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
    bg: hexToRgb('#F7F8FC'),
    primary: hexToRgb('#675AE6'),
    secondary: hexToRgb('#5C3FD8'),
    navy: hexToRgb('#1A2A60'),
    success: hexToRgb('#47B985'),
    warning: hexToRgb('#D2A83A'),
    text: hexToRgb('#0F172A'),
    muted: hexToRgb('#6B7280'),
    white: hexToRgb('#FFFFFF'),
    shadow: hexToRgb('#F2F4FA'),
  };
  const borderColor = tint(colors.primary, 0.16);

  const measureTextWidth = (font: any, text: string, fontSize: number) =>
    font.widthOfTextAtSize(toPdfText(text), fontSize);

  const drawTextSafe = (text: string, options: any) => {
    const safeText = toPdfText(text);
    if (!safeText) return;
    page.drawText(safeText, options);
    if (useSyntheticBold && options.font === fontBold) {
      page.drawText(safeText, { ...options, x: options.x + syntheticBoldOffset });
    }
  };

  const drawTextOnPage = (targetPage: any, text: string, options: any) => {
    const safeText = toPdfText(text);
    if (!safeText) return;
    targetPage.drawText(safeText, options);
    if (useSyntheticBold && options.font === fontBold) {
      targetPage.drawText(safeText, { ...options, x: options.x + syntheticBoldOffset });
    }
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
        opacity: options.opacity,
        borderOpacity: options.borderOpacity,
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
      opacity: options.opacity,
      borderOpacity: options.borderOpacity,
    });
  };

  const drawShadowRect = (x: number, yTop: number, width: number, height: number) => {
    drawRoundedRect(x + 0.8, yTop - height - 0.8, width, height, cardRadius, {
      color: toPdfColor(colors.shadow),
      opacity: 0.6,
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
      const accentHeight = 3;
      const accentInset = 1;
      // Barre d'accent simple et moderne
      page.drawRectangle({
        x: x + accentInset,
        y: yTop - accentHeight - accentInset,
        width: width - accentInset * 2,
        height: accentHeight,
        color: toPdfColor(accent),
      });
      drawTextSafe(title, {
        x: x + cardPadding,
        y: yTop - cardPadding - 2,
        size: 11,
        font: fontBold,
        color: toPdfColor(accent),
      });
    }
  };

  const getBadgeSize = (text: string, font: any, fontSize: number, paddingX: number, paddingY: number) => {
    const textWidth = measureTextWidth(font, text, fontSize);
    return {
      width: textWidth + paddingX * 2,
      height: fontSize + paddingY * 2,
    };
  };

  const drawBadge = (text: string, fill: any, x: number, yPos: number, options: any = {}) => {
    const fontSize = options.fontSize ?? 8.2;
    const paddingX = options.paddingX ?? 7;
    const paddingY = options.paddingY ?? 2.6;
    const radius = options.radius ?? 6;
    const font = options.font ?? fontBold;
    const textColor = options.textColor ?? colors.white;
    const badgeSize = getBadgeSize(text, font, fontSize, paddingX, paddingY);
    drawRoundedRect(x, yPos, badgeSize.width, badgeSize.height, radius, {
      color: toPdfColor(fill),
      borderColor: toPdfColor(fill),
      borderWidth: 1,
    });
    drawTextSafe(text, {
      x: x + paddingX,
      y: yPos + paddingY - 0.6,
      size: fontSize,
      font,
      color: toPdfColor(textColor),
    });
    return badgeSize;
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
    const rowCount = Math.ceil(filtered.length / columns);
    for (let row = 0; row < rowCount; row += 1) {
      const startIndex = row * columns;
      const rowEntries = filtered.slice(startIndex, startIndex + columns);
      const heights = rowEntries.map((entry) => {
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        return labelSize + 4 + lines.length * (valueSize + 2);
      });
      totalHeight += Math.max(...heights);
      if (row < rowCount - 1) {
        totalHeight += rowGap;
      }
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
    const rowCount = Math.ceil(filtered.length / columns);
    for (let row = 0; row < rowCount; row += 1) {
      const startIndex = row * columns;
      const rowEntries = filtered.slice(startIndex, startIndex + columns);
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
      yCursor -= rowHeight;
      totalHeight += rowHeight;
      if (row < rowCount - 1) {
        yCursor -= rowGap;
        totalHeight += rowGap;
      }
    }
    return totalHeight;
  };

  const measureParagraph = (text: string, width: number, fontSize: number, lineGap: number, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    if (!lines.length) return 0;
    return lines.length * fontSize + (lines.length - 1) * lineGap;
  };

  const drawParagraph = (text: string, x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any, font: any = fontRegular) => {
    const lines = wrapTextForPdf(text, font, fontSize, width);
    if (!lines.length) return 0;
    let yCursor = yTop;
    lines.forEach((line, index) => {
      if (line) {
        drawTextSafe(line, { x, y: yCursor, size: fontSize, font, color });
      }
      yCursor -= fontSize;
      if (index < lines.length - 1) {
        yCursor -= lineGap;
      }
    });
    return yTop - yCursor;
  };

  const measureChecklist = (items: string[], width: number, fontSize: number, lineGap: number) => {
    const itemGap = lineGap + 1;
    return items.reduce((total, item, index) => {
      const lines = wrapTextForPdf(item, fontRegular, fontSize, width - 14);
      if (!lines.length) return total;
      const blockHeight = lines.length * fontSize + (lines.length - 1) * lineGap;
      total += blockHeight;
      if (index < items.length - 1) {
        total += itemGap;
      }
      return total;
    }, 0);
  };

  const drawChecklist = (items: string[], x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any) => {
    const boxSize = 5.5;
    const itemGap = lineGap + 1;
    let yCursor = yTop;
    items.forEach((item, index) => {
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
      let lineY = yCursor;
      lines.forEach((line, lineIndex) => {
        drawTextSafe(line, {
          x: x + boxSize + 6,
          y: lineY,
          size: fontSize,
          font: fontRegular,
          color,
        });
        lineY -= fontSize;
        if (lineIndex < lines.length - 1) {
          lineY -= lineGap;
        }
      });
      const blockHeight = lines.length * fontSize + (lines.length - 1) * lineGap;
      yCursor -= blockHeight;
      if (index < items.length - 1) {
        yCursor -= itemGap;
      }
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
      tint(colors.primary, 0.84),
      tint(colors.secondary, 0.84)
    );
    const logoSize = 22;
    const logoY = pageHeight - headerBandHeight + (headerBandHeight - logoSize) / 2;
    const brandX = logoImage ? marginX + logoSize + 10 : marginX;
    if (logoImage) {
      page.drawImage(logoImage, {
        x: marginX,
        y: logoY,
        width: logoSize,
        height: logoSize,
      });
    }
    drawTextSafe('YOJOB', {
      x: brandX,
      y: pageHeight - 30,
      size: 16.5,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    drawTextSafe('Courtage en recrutement europeen', {
      x: brandX,
      y: pageHeight - 44,
      size: 8.2,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.82)),
    });

    const headerLabel = 'DEVIS';
    const headerNumber = prospect.numero || '-';
    const headerLabelSize = 7.6;
    const headerNumberSize = 10;
    const headerPaddingX = 12;
    const headerPaddingY = 5.5;
    const statusFontSize = 7.6;
    const statusPaddingX = 6;
    const statusPaddingY = 2.4;
    const statusBadgeSize = getBadgeSize(statusLabel, fontBold, statusFontSize, statusPaddingX, statusPaddingY);
    const headerLabelWidth = measureTextWidth(fontBold, headerLabel, headerLabelSize);
    const headerNumberWidth = measureTextWidth(fontBold, headerNumber, headerNumberSize);
    const contentWidthNeeded = headerLabelWidth + 6 + headerNumberWidth + 12 + statusBadgeSize.width;
    const infoWidth = Math.max(200, contentWidthNeeded + headerPaddingX * 2);
    const infoHeight = Math.max(26, statusBadgeSize.height + headerPaddingY * 2);
    const infoX = pageWidth - marginX - infoWidth;
    const infoY = pageHeight - headerBandHeight + (headerBandHeight - infoHeight) / 2;
    drawRoundedRect(infoX, infoY, infoWidth, infoHeight, 8, {
      color: toPdfColor(tint(colors.white, 0.96)),
      borderColor: toPdfColor(tint(colors.white, 0.7)),
      borderWidth: 0.5,
    });
    const infoTextY = infoY + (infoHeight - headerNumberSize) / 2 + 1;
    drawTextSafe(headerLabel, {
      x: infoX + headerPaddingX,
      y: infoTextY + 1,
      size: headerLabelSize,
      font: fontBold,
      color: toPdfColor(colors.navy),
    });
    drawTextSafe(headerNumber, {
      x: infoX + headerPaddingX + headerLabelWidth + 6,
      y: infoTextY,
      size: headerNumberSize,
      font: fontBold,
      color: toPdfColor(colors.navy),
    });
    const badgeX = infoX + infoWidth - headerPaddingX - statusBadgeSize.width;
    const badgeY = infoY + (infoHeight - statusBadgeSize.height) / 2;
    drawBadge(statusLabel, isSigned ? colors.success : colors.warning, badgeX, badgeY, {
      fontSize: statusFontSize,
      paddingX: statusPaddingX,
      paddingY: statusPaddingY,
      radius: 5,
    });

    const dateY = pageHeight - headerBandHeight - 12;
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

    y = pageHeight - headerHeight - 6;
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
  const columnTitleSize = 8.2;
  const labelSize = 8.2;
  const valueSize = 10.5;
  const rowGap = 5;
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
    3 +
    Math.max(entrepriseLeftHeight, entrepriseRightHeight) +
    4;

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
    3 +
    Math.max(contactLeftHeight, contactRightHeight) +
    4;

  const topCardsHeight = Math.max(entrepriseHeight, contactHeight);
  ensureSpace(topCardsHeight + 12);
  drawCard(marginX, y, infoCardWidth, topCardsHeight, 'Client (Entreprise)', colors.primary);
  drawCard(marginX + infoCardWidth + columnGap, y, infoCardWidth, topCardsHeight, 'Contact', colors.secondary);

  const entrepriseContentTop = y - cardPadding - 12;
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

  const contactContentTop = y - cardPadding - 12;
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

  y -= topCardsHeight + 12;

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
  // Colonnes dynamiques selon le nombre d'entrées (max 5 pour garder la lisibilité)
  const synthColumns = Math.min(syntheseEntries.length, 5);
  const synthHeight = cardPadding * 2 + 12 + measureKeyValueGrid(syntheseEntries, contentWidth - cardPadding * 2, synthColumns, labelSize, valueSize, 4, 10);
  ensureSpace(synthHeight + 8);
  drawCard(marginX, y, contentWidth, synthHeight, 'Synthese', colors.primary);
  drawKeyValueGrid(
    syntheseEntries,
    marginX + cardPadding,
    y - cardPadding - 12,
    contentWidth - cardPadding * 2,
    synthColumns,
    labelSize,
    valueSize,
    4,
    10,
    toPdfColor(colors.muted),
    toPdfColor(colors.text)
  );
  y -= synthHeight + 10;

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
    const missionHeight = measureKeyValueGrid(missionEntries, posteColumnWidth, 1, labelSize, valueSize, 5, 0);
    const remunerationHeight = measureKeyValueGrid(remunerationEntries, posteColumnWidth, 1, labelSize, valueSize, 5, 0);
    const posteContentHeight = Math.max(missionHeight, remunerationHeight) + 12;
    const posteHeight = cardPadding * 2 + 16 + posteContentHeight;

    ensureSpace(posteHeight + 10);
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
      drawBadge(secteurLabel, colors.primary, marginX + cardPadding, y - cardPadding - 18);
    }

    const columnTitleSizeSmall = 8;
    drawTextSafe('MISSION', {
      x: marginX + cardPadding,
      y: y - cardPadding - 22,
      size: columnTitleSizeSmall,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });
    drawTextSafe('REMUNERATION', {
      x: marginX + cardPadding + posteColumnWidth + columnGap,
      y: y - cardPadding - 22,
      size: columnTitleSizeSmall,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });

    const posteEntriesTop = y - cardPadding - 22 - columnTitleSizeSmall - 3;
    drawKeyValueGrid(
      missionEntries,
      marginX + cardPadding,
      posteEntriesTop,
      posteColumnWidth,
      1,
      labelSize,
      valueSize,
      5,
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
      5,
      0,
      toPdfColor(colors.muted),
      toPdfColor(colors.text)
    );

    y -= posteHeight + 10;
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
  const conditionsLeftHeight = measureKeyValueGrid(conditionsEntriesLeft, conditionsColumnWidth, 1, labelSize, valueSize, 5, 0);
  const conditionsRightHeight = measureKeyValueGrid(conditionsEntriesRight, conditionsColumnWidth, 1, labelSize, valueSize, 5, 0);
  const logisticsText = logistics.map((line) => `• ${line}`).join('\n');
  const logisticsHeight = logisticsText
    ? measureParagraph(logisticsText, contentWidth - cardPadding * 2, 9, 2.2)
    : 0;
  const conditionsHeight =
    cardPadding * 2 +
    12 +
    Math.max(conditionsLeftHeight, conditionsRightHeight) +
    (logisticsHeight ? logisticsHeight + 6 : 0);

  ensureSpace(conditionsHeight + 10);
  drawCard(marginX, y, contentWidth, conditionsHeight, 'Conditions de travail', colors.primary);
  const conditionsTop = y - cardPadding - 12;
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
    const logisticsY = conditionsTop - Math.max(conditionsLeftHeight, conditionsRightHeight) - 5;
    drawParagraph(logisticsText, marginX + cardPadding, logisticsY, contentWidth - cardPadding * 2, 9, 2.2, toPdfColor(colors.text));
  }
  y -= conditionsHeight + 10;

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
  const profileTextHeight = measureParagraph(profileText, contentWidth - cardPadding * 2, 9, 2.2);
  const episHeight = episEntries.length ? measureChecklist(episEntries, contentWidth - cardPadding * 2, 8.5, 2) + 10 : 0;
  const profileHeight =
    cardPadding * 2 +
    12 +
    profileTextHeight +
    (episHeight ? episHeight + 6 : 0);

  ensureSpace(profileHeight + 10);
  drawCard(marginX, y, contentWidth, profileHeight, 'Profil des candidats recherches', colors.secondary);
  const profileTop = y - cardPadding - 12;
  drawParagraph(profileText, marginX + cardPadding, profileTop, contentWidth - cardPadding * 2, 9, 2.2, toPdfColor(colors.text));
  if (episEntries.length) {
    const episTitleY = profileTop - profileTextHeight - 5;
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
      episTitleY - 10,
      contentWidth - cardPadding * 2,
      8.5,
      2,
      toPdfColor(colors.text)
    );
  }
  y -= profileHeight + 10;

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

  const signatureBoxWidth = 140;
  const signatureBoxHeight = isSigned ? 60 : 45;
  const consentMentions = prospect.signature?.consentement?.mentions || '';
  const consentDate = prospect.signature?.consentement?.dateAcceptation
    ? new Date(prospect.signature.consentement.dateAcceptation).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Paris'
      })
    : '';
  const consentTextHeight = consentMentions
    ? measureParagraph(consentMentions, contentWidth - cardPadding * 2 - signatureBoxWidth - 10, 8, 2)
    : 0;
  const signatureHeight =
    cardPadding * 2 +
    12 +
    signatureGridHeight +
    6 +
    signatureBoxHeight +
    (consentTextHeight ? consentTextHeight + (consentDate ? 10 : 0) : 0) +
    4;

  ensureSpace(signatureHeight + 10);
  drawCard(marginX, y, contentWidth, signatureHeight, 'Signature electronique', isSigned ? colors.success : colors.warning);
  const signatureTop = y - cardPadding - 12;
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

  const signatureBoxY = signatureTop - signatureGridHeight - 6;
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
    drawParagraph(consentMentions, consentX, consentY, contentWidth - cardPadding * 2 - signatureBoxWidth - 12, 8.4, 2.4, toPdfColor(colors.text));
    if (consentDate) {
      const consentTextHeightLocal = measureParagraph(consentMentions, contentWidth - cardPadding * 2 - signatureBoxWidth - 12, 8.4, 2.4);
      drawTextSafe(`CGV acceptees le: ${consentDate}`, {
        x: consentX,
        y: consentY - consentTextHeightLocal - 2,
        size: 7.8,
        font: fontRegular,
        color: toPdfColor(colors.muted),
      });
    }
  }

  y -= signatureHeight + 10;

  // Preuve integrite / details techniques
  const signatureHashEntries = [
    { label: 'Adresse IP', value: prospect.signature?.metadata?.ipAddress || '' },
    { label: 'Navigateur', value: prospect.signature?.metadata?.userAgent || '' },
    { label: 'Algorithme', value: prospect.signature?.integrite?.hashAlgorithm || '' },
  ].filter((entry) => entry.value);
  const signatureHash = prospect.signature?.integrite?.documentHash || '';
  // Limiter le hash à 2 lignes pour compacité
  const signatureHashFormatted = signatureHash
    ? (signatureHash.length > 64
        ? signatureHash.slice(0, 32) + ' ' + signatureHash.slice(32, 64) + ' ' + signatureHash.slice(64)
        : signatureHash)
    : '';
  const hashGridHeight = measureKeyValueGrid(signatureHashEntries, contentWidth - cardPadding * 2, 1, 8, 9, 5, 0);
  const hashTextHeight = signatureHashFormatted
    ? measureParagraph(signatureHashFormatted, contentWidth - cardPadding * 2, 7.5, 2, fontMono)
    : 0;
  const technicalHeight =
    cardPadding * 2 +
    12 +
    hashGridHeight +
    (hashTextHeight ? hashTextHeight + 8 : 0);

  ensureSpace(technicalHeight + 10);
  drawCard(marginX, y, contentWidth, technicalHeight, 'Details techniques (preuve integrite)', colors.navy);
  const technicalTop = y - cardPadding - 12;
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
      size: 8.2,
      font: fontBold,
      color: toPdfColor(colors.muted),
    });
    drawParagraph(signatureHashFormatted, marginX + cardPadding, hashY - 10, contentWidth - cardPadding * 2, 8.2, 2.4, toPdfColor(colors.text), fontMono);
  }
  y -= technicalHeight + 10;

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
    const legalTextHeight = measureParagraph(legalText, contentWidth - cardPadding * 2, 8, 2);
    const legalFooterHeight = legalFooterText
      ? measureParagraph(legalFooterText, contentWidth - cardPadding * 2, 7.5, 2)
      : 0;
    const legalHeight =
      cardPadding * 2 +
      12 +
      legalTextHeight +
      (legalFooterHeight ? legalFooterHeight + 6 : 0);

    ensureSpace(legalHeight + 10);
    drawCard(marginX, y, contentWidth, legalHeight, 'Conditions generales & mentions legales', colors.primary);
    const legalTop = y - cardPadding - 12;
    drawParagraph(legalText, marginX + cardPadding, legalTop, contentWidth - cardPadding * 2, 8, 2, toPdfColor(colors.text));
    if (legalFooterText) {
      const legalFooterY = legalTop - legalTextHeight - 5;
      drawParagraph(legalFooterText, marginX + cardPadding, legalFooterY, contentWidth - cardPadding * 2, 7.5, 2, toPdfColor(colors.muted));
    }
    y -= legalHeight + 10;
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

async function generateAndStorePdf(
  prospect: any,
  inclureCGV: boolean
): Promise<{ pdfUrl: string; pdfPath: string; pdfBytes: Uint8Array; prospectUpdated: any } | null> {
  try {
    const pdfBytes = await generateDevisPdfBytes(prospect, inclureCGV);
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
    const { devisId, inclureCGV } = await c.req.json();
    
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
    
    const pdfResult = await generateAndStorePdf(prospect, Boolean(inclureCGV));

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
