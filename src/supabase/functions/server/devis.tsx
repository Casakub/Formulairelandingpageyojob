import { Hono } from 'npm:hono';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import * as kv from './kv_store.tsx';
import { emailService } from './email-service.tsx';
import { SIGNATURE_EMAIL_TEMPLATES } from './signature-email-templates.ts';

const devis = new Hono();

const INTERNAL_CONTACT_EMAIL = 'contact@yojob.fr';
const DEVIS_PDF_BUCKET = 'yojob-devis-pdfs';
let devisPdfBucketReady: boolean | null = null;

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
  if (!text) return [];
  const lines: string[] = [];
  const paragraphs = text.split('\n');

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

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 24;
  const footerHeight = 40;
  const contentWidth = pageWidth - margin * 2;
  const columnGap = 20;
  const headerHeightFirst = 96;
  const headerHeightOther = 72;

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
    border: tint(hexToRgb('#8B5CF6'), 0.2),
    shadow: hexToRgb('#E5E7EB'),
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

  const drawBadge = (text: string, fill: any, x: number, yPos: number) => {
    const fontSize = 9;
    const paddingX = 10;
    const paddingY = 4;
    const textWidth = fontBold.widthOfTextAtSize(text, fontSize);
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    page.drawRectangle({
      x,
      y: yPos,
      width: badgeWidth,
      height: badgeHeight,
      color: toPdfColor(fill),
    });
    page.drawText(text, {
      x: x + paddingX,
      y: yPos + paddingY - 1,
      size: fontSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    return badgeWidth;
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
        page.drawText(entry.label, { x: xPos, y: yCursor, size: labelSize, font: fontBold, color: labelColor });
        const lines = wrapValue(entry.value, columnWidth, valueSize);
        let lineY = yCursor - labelSize - 3;
        lines.forEach((line) => {
          page.drawText(line, { x: xPos, y: lineY, size: valueSize, font: fontRegular, color: valueColor });
          lineY -= valueSize + 2;
        });
      });
      yCursor -= rowHeight + rowGap;
      totalHeight += rowHeight + rowGap;
    }
    return totalHeight;
  };

  const measureBulletList = (lines: string[], width: number, fontSize: number, lineGap: number) => {
    let height = 0;
    lines.forEach((line) => {
      const wrapped = wrapTextForPdf(line, fontRegular, fontSize, width);
      height += wrapped.length * (fontSize + lineGap);
    });
    return height;
  };

  const drawBulletList = (lines: string[], x: number, yTop: number, width: number, fontSize: number, lineGap: number, color: any) => {
    let yCursor = yTop;
    lines.forEach((line) => {
      const wrapped = wrapTextForPdf(line, fontRegular, fontSize, width);
      wrapped.forEach((wrappedLine, idx) => {
        const prefix = idx === 0 ? '- ' : '  ';
        page.drawText(prefix + wrappedLine, { x, y: yCursor, size: fontSize, font: fontRegular, color });
        yCursor -= fontSize + lineGap;
      });
    });
    return yTop - yCursor;
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

  const drawHeader = (isFirst: boolean) => {
    const headerHeight = isFirst ? headerHeightFirst : headerHeightOther;
    drawGradientRect(0, pageHeight - headerHeight, pageWidth, headerHeight, colors.violet, colors.cyan);

    const titleSize = isFirst ? 22 : 18;
    page.drawText('YOJOB', {
      x: margin,
      y: pageHeight - 34,
      size: titleSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    page.drawText('Courtage en recrutement europeen', {
      x: margin,
      y: pageHeight - 52,
      size: 9,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });

    const infoX = pageWidth - margin - 210;
    page.drawText('DEVIS', {
      x: infoX,
      y: pageHeight - 30,
      size: 9,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    page.drawText(prospect.numero || '-', {
      x: infoX,
      y: pageHeight - 46,
      size: 12,
      font: fontBold,
      color: toPdfColor(colors.white),
    });
    page.drawText(`Cree le: ${createdLabel || '-'}`, {
      x: infoX,
      y: pageHeight - 60,
      size: 8,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });
    page.drawText(`Valable jusqu'au: ${validUntilLabel || '-'}`, {
      x: infoX,
      y: pageHeight - 72,
      size: 8,
      font: fontRegular,
      color: toPdfColor(tint(colors.white, 0.7)),
    });

    const badgeFontSize = 9;
    const badgeWidth = fontBold.widthOfTextAtSize(statusLabel, badgeFontSize) + 20;
    const badgeHeight = badgeFontSize + 8;
    const badgeX = pageWidth - margin - badgeWidth;
    const badgeY = pageHeight - 26 - badgeHeight;
    page.drawRectangle({
      x: badgeX,
      y: badgeY,
      width: badgeWidth,
      height: badgeHeight,
      color: toPdfColor(isSigned ? colors.green : colors.magenta),
    });
    page.drawText(statusLabel, {
      x: badgeX + 10,
      y: badgeY + 4,
      size: badgeFontSize,
      font: fontBold,
      color: toPdfColor(colors.white),
    });

    y = pageHeight - headerHeight - 16;
  };

  const newPage = () => {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawHeader(false);
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < margin + footerHeight) {
      newPage();
    }
  };

  drawHeader(true);

  const entreprise = prospect.entreprise || {};
  const contact = prospect.contact || {};

  const cardPadding = 16;
  const cardTitleSize = 11;
  const cardLabelSize = 8;
  const cardValueSize = 10.5;
  const cardRowGap = 6;

  const leftCardEntries = [
    { label: 'Raison sociale', value: entreprise.raisonSociale || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
    { label: 'Code APE', value: entreprise.codeAPE || '' },
    { label: 'Adresse', value: [entreprise.adresse, entreprise.codePostal, entreprise.ville, entreprise.region, entreprise.pays].filter(Boolean).join(' ') },
    { label: 'Site web', value: entreprise.siteInternet || '' },
  ];

  const rightCardEntries = [
    { label: 'Nom', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
    { label: 'Email', value: contact.email || '' },
    { label: 'Telephone', value: contact.telephonePortable || contact.telephoneFixe || '' },
  ];

  const cardWidth = (contentWidth - columnGap) / 2;
  const leftGridHeight = measureKeyValueGrid(leftCardEntries, cardWidth - cardPadding * 2, 1, cardLabelSize, cardValueSize, cardRowGap, 0);
  const rightGridHeight = measureKeyValueGrid(rightCardEntries, cardWidth - cardPadding * 2, 1, cardLabelSize, cardValueSize, cardRowGap, 0);
  const cardTitleHeight = cardTitleSize + 8;
  const cardHeight = Math.max(leftGridHeight, rightGridHeight) + cardPadding * 2 + cardTitleHeight;

  ensureSpace(cardHeight + 12);

  const drawInfoCard = (x: number, title: string, entries: Array<{ label: string; value: string }>) => {
    drawShadowRect(x, y - cardHeight, cardWidth, cardHeight);
    page.drawRectangle({
      x,
      y: y - cardHeight,
      width: cardWidth,
      height: cardHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(colors.border),
      borderWidth: 1,
    });

    page.drawText(title, {
      x: x + cardPadding,
      y: y - cardPadding - cardTitleSize,
      size: cardTitleSize,
      font: fontBold,
      color: toPdfColor(colors.violet),
    });

    const gridTop = y - cardPadding - cardTitleHeight;
    drawKeyValueGrid(
      entries,
      x + cardPadding,
      gridTop,
      cardWidth - cardPadding * 2,
      1,
      cardLabelSize,
      cardValueSize,
      cardRowGap,
      0,
      toPdfColor(colors.textLight),
      toPdfColor(colors.dark)
    );
  };

  drawInfoCard(margin, 'CLIENT', leftCardEntries);
  drawInfoCard(margin + cardWidth + columnGap, 'CONTACT', rightCardEntries);

  y -= cardHeight + 16;

  const postes = Array.isArray(prospect.postes) ? prospect.postes : [];
  const totalCandidats = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
  const secteurPrincipal = postes[0]?.secteur ? mapDevisSector(postes[0].secteur) : '';

  const synthHeight = 44;
  ensureSpace(synthHeight + 10);
  page.drawRectangle({
    x: margin,
    y: y - synthHeight,
    width: contentWidth,
    height: synthHeight,
    color: toPdfColor(tint(colors.violet, 0.08)),
    borderColor: toPdfColor(tint(colors.violet, 0.25)),
    borderWidth: 1,
  });
  page.drawText('SYNTHESE MISSION', {
    x: margin + 14,
    y: y - 18,
    size: 10.5,
    font: fontBold,
    color: toPdfColor(colors.deep),
  });

  const badgeY = y - 34;
  let badgeX = margin + 150;
  badgeX += drawBadge(`${postes.length} Poste(s)`, colors.blue, badgeX, badgeY) + 8;
  badgeX += drawBadge(`${totalCandidats} Candidat(s)`, colors.cyan, badgeX, badgeY) + 8;
  drawBadge(`${secteurPrincipal || 'Secteur'}`, colors.magenta, badgeX, badgeY);

  y -= synthHeight + 16;

  const conditions = prospect.conditions || {};
  const missionEntries = [
    { label: 'Lieu mission', value: conditions.lieuxMission || '' },
    { label: 'Periode', value: conditions.dateDebut ? `${formatDateForPdf(conditions.dateDebut)}${conditions.dateFin ? ` -> ${formatDateForPdf(conditions.dateFin)}` : ''}` : '' },
    { label: 'Base horaire', value: conditions.baseHoraire ? `${conditions.baseHoraire} h/mois` : '' },
    { label: 'Motif recours', value: conditions.motifRecours || '' },
    { label: 'Delai paiement', value: conditions.delaiPaiement || '' },
  ];
  const missionLogistics = [
    conditions.hebergement?.chargeEU ? 'Hebergement: Pris en charge' : 'Hebergement: Non pris en charge',
    conditions.transportLocal?.chargeETT ? 'Transport local: Pris en charge' : 'Transport local: Non pris en charge',
    conditions.repas?.type
      ? `Repas: ${conditions.repas.type}${conditions.repas?.montant ? ` (${formatCurrency(conditions.repas.montant)})` : ''}`
      : '',
  ].filter(Boolean);

  const missionLabelSize = 8;
  const missionValueSize = 10.5;
  const missionRowGap = 8;
  const missionGridHeight = measureKeyValueGrid(missionEntries, contentWidth - cardPadding * 2, 2, missionLabelSize, missionValueSize, missionRowGap, columnGap / 2);
  const missionLogisticsHeight = missionLogistics.length
    ? measureBulletList(missionLogistics, contentWidth - cardPadding * 2, 9.5, 3) + 6
    : 0;
  const missionTitleHeight = 12;
  const missionCardHeight = cardPadding * 2 + missionTitleHeight + missionGridHeight + (missionLogisticsHeight ? 10 + missionLogisticsHeight : 0);

  ensureSpace(missionCardHeight + 12);
  drawShadowRect(margin, y - missionCardHeight, contentWidth, missionCardHeight);
  page.drawRectangle({
    x: margin,
    y: y - missionCardHeight,
    width: contentWidth,
    height: missionCardHeight,
    color: toPdfColor(colors.white),
    borderColor: toPdfColor(tint(colors.violet, 0.15)),
    borderWidth: 1,
  });
  page.drawText('MISSION & CONDITIONS DE TRAVAIL', {
    x: margin + cardPadding,
    y: y - cardPadding - missionTitleHeight,
    size: missionTitleHeight,
    font: fontBold,
    color: toPdfColor(colors.violet),
  });

  let missionCursorY = y - cardPadding - missionTitleHeight - 8;
  const missionGridHeightDrawn = drawKeyValueGrid(
    missionEntries,
    margin + cardPadding,
    missionCursorY,
    contentWidth - cardPadding * 2,
    2,
    missionLabelSize,
    missionValueSize,
    missionRowGap,
    columnGap / 2,
    toPdfColor(colors.textLight),
    toPdfColor(colors.dark)
  );
  missionCursorY -= missionGridHeightDrawn + 2;

  if (missionLogistics.length) {
    page.drawLine({
      start: { x: margin + cardPadding, y: missionCursorY },
      end: { x: margin + contentWidth - cardPadding, y: missionCursorY },
      thickness: 1,
      color: toPdfColor(tint(colors.violet, 0.2)),
    });
    missionCursorY -= 10;
    drawBulletList(missionLogistics, margin + cardPadding, missionCursorY, contentWidth - cardPadding * 2, 9.5, 3, toPdfColor(colors.dark));
  }

  y -= missionCardHeight + 18;

  if (!postes.length) {
    ensureSpace(18);
    page.drawText('Aucun poste renseigne.', { x: margin, y, size: 10, font: fontRegular, color: toPdfColor(colors.textLight) });
    y -= 18;
  } else {
    page.drawText('POSTES A POURVOIR', {
      x: margin,
      y: y - 4,
      size: 12,
      font: fontBold,
      color: toPdfColor(colors.deep),
    });
    y -= 20;

    const postesGradients = [
      [colors.violet, colors.cyan],
      [colors.magenta, colors.violet],
      [colors.cyan, colors.blue],
      [colors.green, colors.cyan],
    ];

    const candidats = prospect.candidats || {};
    const languesEntries = candidats.langues
      ? Object.entries(candidats.langues).map(([langue, niveau]) => `${langue}: ${niveau}`)
      : [];
    const episEntries = Array.isArray(candidats.epis) ? candidats.epis : [];

    postes.forEach((poste: any, index: number) => {
      const [gradStart, gradEnd] = postesGradients[index % postesGradients.length];
      const headerHeight = 30;
      const cardPaddingInner = 16;
      const labelSize = 8;
      const valueSize = 10.5;
      const rowGap = 6;
      const salaireBrutLabel = formatCurrency(poste.salaireBrut);
      const tauxEttLabel = formatCurrency(poste.tauxETT);
      const infoEntries = [
        { label: 'Classification', value: poste.classification || '' },
        { label: 'Quantite', value: poste.quantite ? String(poste.quantite) : '' },
        { label: 'Salaire brut', value: salaireBrutLabel || '' },
        { label: 'Taux ETT', value: tauxEttLabel ? `${tauxEttLabel}/h` : '' },
        { label: 'Base horaire', value: conditions.baseHoraire ? `${conditions.baseHoraire} h/mois` : '' },
        { label: 'Periode', value: conditions.dateDebut ? `${formatDateForPdf(conditions.dateDebut)}${conditions.dateFin ? ` -> ${formatDateForPdf(conditions.dateFin)}` : ''}` : '' },
        { label: 'Lieu mission', value: conditions.lieuxMission || '' },
        { label: 'Nationalite', value: poste.labelPays || poste.nationalite || '' },
      ];

      const profileEntries = [
        { label: 'Experience', value: candidats.experience?.obligatoire ? (candidats.experience.annees ? `${candidats.experience.annees} ans` : 'Oui') : '' },
        { label: 'Formation', value: candidats.formation?.obligatoire ? (candidats.formation.type || 'Requise') : '' },
        { label: 'Permis', value: candidats.permis?.requis ? (candidats.permis.categorie || 'Requis') : '' },
        { label: 'Outillage', value: candidats.outillage?.requis ? (candidats.outillage.type || 'Requis') : '' },
        { label: 'Langues', value: languesEntries.length ? languesEntries.join(', ') : '' },
      ].filter((entry) => entry.value);

      const infoGridHeight = measureKeyValueGrid(infoEntries, contentWidth - cardPaddingInner * 2, 2, labelSize, valueSize, rowGap, columnGap / 2);
      const profileGridHeight = profileEntries.length
        ? measureKeyValueGrid(profileEntries, contentWidth - cardPaddingInner * 2, 2, labelSize, valueSize, rowGap, columnGap / 2)
        : 0;
      const epiHeight = episEntries.length
        ? measureBulletList(episEntries.map((item: string) => item), contentWidth - cardPaddingInner * 2, 9.5, 3) + 8
        : 0;

      const profileTitleHeight = profileEntries.length ? 12 : 0;
      const epiTitleHeight = episEntries.length ? 12 : 0;
      const cardHeight =
        headerHeight +
        cardPaddingInner * 2 +
        infoGridHeight +
        (profileEntries.length ? 10 + profileTitleHeight + profileGridHeight : 0) +
        (episEntries.length ? 8 + epiTitleHeight + epiHeight : 0);

      ensureSpace(cardHeight + 12);

      drawShadowRect(margin, y - cardHeight, contentWidth, cardHeight);
      page.drawRectangle({
        x: margin,
        y: y - cardHeight,
        width: contentWidth,
        height: cardHeight,
        color: toPdfColor(colors.white),
        borderColor: toPdfColor(tint(colors.dark, 0.1)),
        borderWidth: 1,
      });

      drawGradientRect(margin, y - headerHeight, contentWidth, headerHeight, gradStart, gradEnd);
      page.drawText(`POSTE #${index + 1} - ${(poste.poste || 'Poste').toUpperCase()}`, {
        x: margin + cardPaddingInner,
        y: y - 20,
        size: 11.5,
        font: fontBold,
        color: toPdfColor(colors.white),
      });

      const badgeText = mapDevisSector(poste.secteur) || poste.secteur || '';
      if (badgeText) {
        const badgeFontSizeInner = 8.5;
        const badgeWidth = fontBold.widthOfTextAtSize(badgeText, badgeFontSizeInner) + 14;
        page.drawRectangle({
          x: margin + contentWidth - badgeWidth - 12,
          y: y - 24,
          width: badgeWidth,
          height: 16,
          color: toPdfColor(tint(colors.white, 0.2)),
        });
        page.drawText(badgeText, {
          x: margin + contentWidth - badgeWidth - 6,
          y: y - 20,
          size: badgeFontSizeInner,
          font: fontBold,
          color: toPdfColor(colors.white),
        });
      }

      let cardCursorY = y - headerHeight - cardPaddingInner;
      const infoHeightDrawn = drawKeyValueGrid(
        infoEntries,
        margin + cardPaddingInner,
        cardCursorY,
        contentWidth - cardPaddingInner * 2,
        2,
        labelSize,
        valueSize,
        rowGap,
        columnGap / 2,
        toPdfColor(colors.textLight),
        toPdfColor(colors.dark)
      );
      cardCursorY -= infoHeightDrawn + 6;

      if (profileEntries.length) {
        page.drawText('PROFIL REQUIS', {
          x: margin + cardPaddingInner,
          y: cardCursorY,
          size: 11,
          font: fontBold,
          color: toPdfColor(colors.deep),
        });
        cardCursorY -= 12;
        const profileHeightDrawn = drawKeyValueGrid(
          profileEntries,
          margin + cardPaddingInner,
          cardCursorY,
          contentWidth - cardPaddingInner * 2,
          2,
          labelSize,
          valueSize,
          rowGap,
          columnGap / 2,
          toPdfColor(colors.textLight),
          toPdfColor(colors.dark)
        );
        cardCursorY -= profileHeightDrawn + 4;
      }

      if (episEntries.length) {
        page.drawText('EPI REQUIS', {
          x: margin + cardPaddingInner,
          y: cardCursorY,
          size: 11,
          font: fontBold,
          color: toPdfColor(colors.magenta),
        });
        cardCursorY -= 12;
        drawBulletList(
          episEntries.map((item: string) => item),
          margin + cardPaddingInner,
          cardCursorY,
          contentWidth - cardPaddingInner * 2,
          9.5,
          3,
          toPdfColor(colors.dark)
        );
      }

      y -= cardHeight + 16;
    });
  }

  const signatureBlockPadding = 18;
  const signatureTitleSize = 12;
  const signatureLabelSize = 8;
  const signatureValueSize = 10.5;
  const signatureRowGap = 6;
  const signatureEntries = [
    { label: 'Signataire', value: [contact.prenom, contact.nom].filter(Boolean).join(' ') },
    { label: 'Fonction', value: contact.fonction || '' },
    { label: 'Email', value: contact.email || '' },
    { label: 'Entreprise', value: entreprise.raisonSociale || '' },
    { label: 'SIRET', value: entreprise.siret || '' },
  ];

  let signatureExtraLines: string[] = [];
  if (isSigned) {
    const signedAt = prospect.signature?.metadata?.timestampReadable || formatDateForPdf(prospect.updatedAt) || '';
    signatureExtraLines = [signedAt ? `Signe le: ${signedAt}` : ''].filter(Boolean);
  }

  const signatureGridHeight = measureKeyValueGrid(signatureEntries, contentWidth - signatureBlockPadding * 2, 2, signatureLabelSize, signatureValueSize, signatureRowGap, columnGap / 2);
  const signatureExtraHeight = signatureExtraLines.length
    ? measureBulletList(signatureExtraLines, contentWidth - signatureBlockPadding * 2, 9, 3) + 4
    : 0;

  const signatureImageHeight = isSigned && prospect.signature?.image ? 70 : 100;
  const signatureBlockHeight =
    signatureBlockPadding * 2 +
    signatureTitleSize +
    signatureGridHeight +
    signatureExtraHeight +
    signatureImageHeight +
    24;

  ensureSpace(signatureBlockHeight + 12);

  const signatureBorderColor = toPdfColor(isSigned ? colors.green : colors.magenta);
  const signatureBgColor = toPdfColor(tint(isSigned ? colors.green : colors.magenta, 0.08));

  drawShadowRect(margin, y - signatureBlockHeight, contentWidth, signatureBlockHeight);
  page.drawRectangle({
    x: margin,
    y: y - signatureBlockHeight,
    width: contentWidth,
    height: signatureBlockHeight,
    color: signatureBgColor,
    borderColor: signatureBorderColor,
    borderWidth: 1.5,
  });

  page.drawText(isSigned ? 'DOCUMENT SIGNE - CERTIFICAT EIDAS' : 'A SIGNER - SIGNATURE REQUISE', {
    x: margin + signatureBlockPadding,
    y: y - signatureBlockPadding - signatureTitleSize,
    size: signatureTitleSize,
    font: fontBold,
    color: signatureBorderColor,
  });

  let signatureCursorY = y - signatureBlockPadding - signatureTitleSize - 8;
  const signatureGridDrawn = drawKeyValueGrid(
    signatureEntries,
    margin + signatureBlockPadding,
    signatureCursorY,
    contentWidth - signatureBlockPadding * 2,
    2,
    signatureLabelSize,
    signatureValueSize,
    signatureRowGap,
    columnGap / 2,
    toPdfColor(colors.textLight),
    toPdfColor(colors.dark)
  );
  signatureCursorY -= signatureGridDrawn + 6;

  if (isSigned && signatureExtraLines.length) {
    drawBulletList(signatureExtraLines, margin + signatureBlockPadding, signatureCursorY, contentWidth - signatureBlockPadding * 2, 9, 3, toPdfColor(colors.dark));
    signatureCursorY -= signatureExtraHeight;
  }

  const signatureBoxWidth = 180;
  const signatureBoxHeight = signatureImageHeight;
  page.drawRectangle({
    x: margin + signatureBlockPadding,
    y: y - signatureBlockHeight + signatureBlockPadding,
    width: signatureBoxWidth,
    height: signatureBoxHeight,
    color: toPdfColor(colors.white),
    borderColor: signatureBorderColor,
    borderWidth: 1,
  });

  if (isSigned && prospect.signature?.image && typeof prospect.signature.image === 'string' && prospect.signature.image.startsWith('data:image')) {
    try {
      const base64 = prospect.signature.image.split(',')[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const image = await pdfDoc.embedPng(bytes);
      const scale = Math.min((signatureBoxWidth - 16) / image.width, (signatureBoxHeight - 16) / image.height);
      const imgWidth = image.width * scale;
      const imgHeight = image.height * scale;
      page.drawImage(image, {
        x: margin + signatureBlockPadding + (signatureBoxWidth - imgWidth) / 2,
        y: y - signatureBlockHeight + signatureBlockPadding + (signatureBoxHeight - imgHeight) / 2,
        width: imgWidth,
        height: imgHeight,
      });
    } catch (error) {
      console.error('⚠️ Erreur embed signature image:', error);
    }
  } else {
    page.drawText('Signature', {
      x: margin + signatureBlockPadding + 12,
      y: y - signatureBlockHeight + signatureBlockPadding + signatureBoxHeight / 2 - 4,
      size: 9,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
    });
  }

  if (isSigned && prospect.signature?.integrite?.documentHash) {
    const hashText = prospect.signature.integrite.documentHash;
    const hashLines = wrapTextForPdf(hashText, fontMono, 8, contentWidth - signatureBlockPadding * 2 - signatureBoxWidth - 20);
    let hashY = y - signatureBlockHeight + signatureBlockPadding + signatureBoxHeight - 10;
    page.drawText('Empreinte SHA-256:', {
      x: margin + signatureBlockPadding + signatureBoxWidth + 16,
      y: hashY,
      size: 8.5,
      font: fontBold,
      color: toPdfColor(colors.textLight),
    });
    hashY -= 10;
    hashLines.forEach((line) => {
      page.drawText(line, {
        x: margin + signatureBlockPadding + signatureBoxWidth + 16,
        y: hashY,
        size: 8,
        font: fontMono,
        color: toPdfColor(colors.dark),
      });
      hashY -= 9;
    });
  }

  y -= signatureBlockHeight + 18;

  if (inclureCGV) {
    const legalLines = [
      'Devis valable 30 jours calendaires',
      conditions.delaiPaiement ? `Conditions de paiement: ${conditions.delaiPaiement}` : 'Conditions de paiement: Net 60 jours',
      'Acceptation des CGV requise',
      'Signature electronique eIDAS (UE)',
    ];
    const legalHeight =
      signatureBlockPadding * 2 +
      12 +
      measureBulletList(legalLines, contentWidth - signatureBlockPadding * 2, 9, 3) +
      18;

    ensureSpace(legalHeight + 12);
    drawShadowRect(margin, y - legalHeight, contentWidth, legalHeight);
    page.drawRectangle({
      x: margin,
      y: y - legalHeight,
      width: contentWidth,
      height: legalHeight,
      color: toPdfColor(colors.white),
      borderColor: toPdfColor(tint(colors.violet, 0.15)),
      borderWidth: 1,
    });

    page.drawText('CONDITIONS GENERALES & CONFORMITE', {
      x: margin + signatureBlockPadding,
      y: y - signatureBlockPadding - 12,
      size: 11,
      font: fontBold,
      color: toPdfColor(colors.deep),
    });
    let legalCursor = y - signatureBlockPadding - 24;
    drawBulletList(legalLines, margin + signatureBlockPadding, legalCursor, contentWidth - signatureBlockPadding * 2, 9, 3, toPdfColor(colors.dark));

    const legalInfo = [
      entreprise.tvaIntracommunautaire ? `TVA: ${entreprise.tvaIntracommunautaire}` : '',
      entreprise.siret ? `SIRET: ${entreprise.siret}` : '',
    ].filter(Boolean);
    if (legalInfo.length) {
      const infoY = y - legalHeight + signatureBlockPadding + 6;
      let infoCursor = infoY;
      legalInfo.forEach((line) => {
        page.drawText(line, {
          x: margin + signatureBlockPadding,
          y: infoCursor,
          size: 8.5,
          font: fontRegular,
          color: toPdfColor(colors.textLight),
        });
        infoCursor -= 10;
      });
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
    currentPage.drawText(footerText, {
      x: margin,
      y: 14,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
    });
    if (generatedLabel) {
      currentPage.drawText(`Genere le: ${generatedLabel}`, {
        x: margin,
        y: 4,
        size: 7.5,
        font: fontRegular,
        color: toPdfColor(colors.textLight),
      });
    }
    const pageLabel = `Page ${index + 1}/${totalPages}`;
    const pageLabelWidth = fontRegular.widthOfTextAtSize(pageLabel, 8);
    currentPage.drawText(pageLabel, {
      x: pageWidth - margin - pageLabelWidth,
      y: 14,
      size: 8,
      font: fontRegular,
      color: toPdfColor(colors.textLight),
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
