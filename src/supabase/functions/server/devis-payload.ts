import type {
  DevisPayload,
  MajorationBreakdown,
  DevisPricing,
  DevisPricingPoste,
  DevisPricingTotals,
  DevisPricingHeures,
  DevisPricingPanier,
  DevisPricingSupplements,
  DevisConditions,
  DevisCandidats,
  DevisPoste,
  DevisEntreprise
} from '../../../types/devis.ts';

const SECTEUR_KEY_TO_LABEL: Record<string, string> = {
  batiment: 'B\u00e2timent',
  metallurgie: 'M\u00e9tallurgie',
  tp: 'TP',
  hotellerie: 'H\u00f4tellerie',
  restauration: 'Restauration',
  plasturgie: 'Plasturgie',
  automobile_carrosserie: 'Automobile Carrosserie',
  sylviculture: 'Sylviculture',
  cartonnerie: 'Cartonnerie',
  autre: 'Autre',
};

const DEFAULTS = {
  baseHoraireLegale: 151.67,
  supplementHebergement: 3.5,
  supplementTransport: 1.5,
  vatRate: 0.2,
  panierFallback: 8.0,
};

const MAJORATIONS_TAUX = {
  delaiPaiement: {
    reception: 0,
    reception_facture: -0.03,
    j30: 0.03,
    j45: 0.05,
    j60: 0.07,
  },
  experience: {
    entre_4_6: 0.01,
    entre_7_10: 0.02,
    plus_10: 0.03,
  },
  permis: 0.01,
  outillage: 0.01,
  langues: {
    B1: 0.01,
    B2: 0.015,
    C1: 0.018,
    C2: 0.02,
  },
} as const;

const round2 = (value: number) => Math.round(value * 100) / 100;

const readEnv = (key: string): string | undefined => {
  try {
    const denoEnv = (globalThis as any)?.Deno?.env;
    if (denoEnv?.get) {
      return denoEnv.get(key) ?? undefined;
    }
  } catch (_) {
    // ignore
  }
  try {
    if (typeof process !== 'undefined' && process?.env) {
      return process.env[key];
    }
  } catch (_) {
    // ignore
  }
  return undefined;
};

const readEnvNumber = (key: string, fallback: number) => {
  const raw = readEnv(key);
  if (raw === undefined || raw === null || raw === '') return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getPricingConfig = () => ({
  baseHoraireLegale: readEnvNumber('DEVIS_BASE_HORAIRE_LEGALE', DEFAULTS.baseHoraireLegale),
  supplementHebergement: readEnvNumber('DEVIS_SUPPLEMENT_HEBERGEMENT', DEFAULTS.supplementHebergement),
  supplementTransport: readEnvNumber('DEVIS_SUPPLEMENT_TRANSPORT', DEFAULTS.supplementTransport),
  vatRate: readEnvNumber('DEVIS_VAT_RATE', DEFAULTS.vatRate),
  panierFallback: readEnvNumber('DEVIS_PANIER_REPAS_FALLBACK', DEFAULTS.panierFallback),
});

export const formatDelaiPaiementLabel = (value?: string): string => {
  if (!value) return '';
  const mapping: Record<string, string> = {
    reception: '\u00c0 r\u00e9ception',
    reception_facture: '\u00c0 r\u00e9ception de facture',
    j30: '30 jours',
    j45: '45 jours',
    j60: '60 jours',
  };
  return mapping[value] || value;
};

const computeMajorations = (conditions?: DevisConditions, candidats?: DevisCandidats): MajorationBreakdown => {
  const delaiKey = conditions?.delaiPaiement || '';
  const delaiPaiement = MAJORATIONS_TAUX.delaiPaiement[delaiKey as keyof typeof MAJORATIONS_TAUX.delaiPaiement] ?? 0;

  const experience = (() => {
    if (!candidats?.experience?.obligatoire || !candidats.experience.annees) return 0;
    const years = candidats.experience.annees;
    if (years >= 4 && years <= 6) return MAJORATIONS_TAUX.experience.entre_4_6;
    if (years >= 7 && years <= 10) return MAJORATIONS_TAUX.experience.entre_7_10;
    if (years > 10) return MAJORATIONS_TAUX.experience.plus_10;
    return 0;
  })();

  const permis = candidats?.permis?.requis ? MAJORATIONS_TAUX.permis : 0;
  const outillage = candidats?.outillage?.requis ? MAJORATIONS_TAUX.outillage : 0;

  const langues = (() => {
    if (!candidats?.langues) return 0;
    let maxValue = 0;
    Object.values(candidats.langues).forEach((niveau) => {
      if (!niveau) return;
      const normalized = String(niveau).toUpperCase();
      const value = MAJORATIONS_TAUX.langues[normalized as keyof typeof MAJORATIONS_TAUX.langues] ?? 0;
      if (value > maxValue) maxValue = value;
    });
    return maxValue;
  })();

  const total = delaiPaiement + experience + permis + langues + outillage;

  return {
    delaiPaiement,
    experience,
    permis,
    langues,
    outillage,
    total,
  };
};

const normalizeMajorations = (
  input: Partial<MajorationBreakdown> | undefined,
  conditions?: DevisConditions,
  candidats?: DevisCandidats
): MajorationBreakdown => {
  if (!input) return computeMajorations(conditions, candidats);
  const fallback = computeMajorations(conditions, candidats);
  return {
    delaiPaiement: input.delaiPaiement ?? fallback.delaiPaiement,
    experience: input.experience ?? fallback.experience,
    permis: input.permis ?? fallback.permis,
    langues: input.langues ?? fallback.langues,
    outillage: input.outillage ?? fallback.outillage,
    total: input.total ?? fallback.total,
  };
};

const computeHeuresDetail = (tauxETT: number, baseHoraire: number, quantite: number): DevisPricingHeures => {
  const SEUIL_NORMAL = 151.67;
  const SEUIL_25 = 186.33;
  const heuresNormales = Math.min(baseHoraire, SEUIL_NORMAL);
  const heures25 = baseHoraire > SEUIL_NORMAL
    ? Math.min(baseHoraire - SEUIL_NORMAL, SEUIL_25 - SEUIL_NORMAL)
    : 0;
  const heures50 = baseHoraire > SEUIL_25 ? baseHoraire - SEUIL_25 : 0;

  const coutHeuresNormales = tauxETT * heuresNormales;
  const coutHeures25 = tauxETT * 1.25 * heures25;
  const coutHeures50 = tauxETT * 1.5 * heures50;
  const coutUnitaire = coutHeuresNormales + coutHeures25 + coutHeures50;
  const coutTotal = coutUnitaire * quantite;

  return {
    baseHoraire: round2(baseHoraire),
    heuresNormales: round2(heuresNormales),
    heures25: round2(heures25),
    heures50: round2(heures50),
    coutHeuresNormales: round2(coutHeuresNormales),
    coutHeures25: round2(coutHeures25),
    coutHeures50: round2(coutHeures50),
    coutUnitaire: round2(coutUnitaire),
    coutTotal: round2(coutTotal),
  };
};

const normalizeSecteurLabel = (secteur?: string): string => {
  if (!secteur) return 'Autre';
  const key = secteur.toLowerCase();
  return SECTEUR_KEY_TO_LABEL[key] || secteur;
};

const getPanierMontantJour = (
  entreprise: DevisEntreprise | undefined,
  poste: DevisPoste,
  conditions: DevisConditions,
  panierFallback: number
): number => {
  if (conditions.repas?.type !== 'panier') return 0;
  if (typeof conditions.repas.montant === 'number' && Number.isFinite(conditions.repas.montant)) {
    return conditions.repas.montant;
  }

  // Note: configData n'est pas accessible côté serveur, on utilise le fallback
  // Les montants régionaux devront être configurés via les variables d'environnement si nécessaire
  return panierFallback;
};

const computeDureeMissionMois = (dateDebut?: string, dateFin?: string): number => {
  if (!dateDebut || !dateFin) return 1;
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);
  if (Number.isNaN(debut.getTime()) || Number.isNaN(fin.getTime())) return 1;
  const diffTime = Math.abs(fin.getTime() - debut.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);
  return Math.max(1, diffMonths);
};

export const computeDevisPricing = (payload: Partial<DevisPayload>, config = getPricingConfig()): DevisPricing => {
  const baseHoraireLegale = config.baseHoraireLegale;
  const baseHoraire = Number(payload.conditions?.baseHoraire) || baseHoraireLegale;
  const conditions = payload.conditions;
  const candidats = payload.candidats;
  const majorations = normalizeMajorations(payload.majorations, conditions, candidats);

  const postes: DevisPoste[] = Array.isArray(payload.postes) ? payload.postes : [];
  const postesPricing: DevisPricingPoste[] = postes.map((poste) => {
    const quantite = Number(poste.quantite) || 1;
    const salaireBrut = Number(poste.salaireBrut) || 0;
    const tauxHoraireBrut = Number(poste.tauxHoraireBrut) || (baseHoraireLegale ? salaireBrut / baseHoraireLegale : 0);
    const coeffBase = Number(poste.coeffBase) || 1.92;
    const facteurPays = Number(poste.facteurPays) || 1;
    const coeffFinal = Number(poste.coeffFinal) || round2(coeffBase * facteurPays);

    const supplementHebergement = conditions?.hebergement?.chargeEU ? 0 : config.supplementHebergement;
    const supplementTransport = conditions?.transportLocal?.chargeETT ? config.supplementTransport : 0;
    const supplements: DevisPricingSupplements = {
      hebergement: round2(supplementHebergement),
      transport: round2(supplementTransport),
      total: round2(supplementHebergement + supplementTransport),
    };

    const tauxETTBase = round2(tauxHoraireBrut * coeffFinal + supplements.total);
    const tauxETTMajore = round2(tauxETTBase * (1 + (majorations.total || 0)));

    const heures = computeHeuresDetail(tauxETTMajore, baseHoraire, quantite);

    const montantJour = getPanierMontantJour(payload.entreprise, poste, conditions || ({} as DevisConditions), config.panierFallback);
    const joursParMois = Math.max(1, Math.round(baseHoraire / 7));
    const totalPanier = montantJour > 0 ? round2(montantJour * joursParMois * quantite) : 0;

    const panier: DevisPricingPanier = {
      type: conditions?.repas?.type || 'non-concerne',
      montantJour: round2(montantJour || 0),
      joursParMois,
      totalMensuel: totalPanier,
      facturation: 'separee',
    };

    const coutMainOeuvreMensuel = heures.coutTotal;
    const coutTotalMensuel = round2(coutMainOeuvreMensuel + totalPanier);

    return {
      id: poste.id,
      secteur: poste.secteur,
      poste: poste.poste,
      classification: poste.classification,
      nationalite: poste.nationalite,
      quantite,
      salaireBrut: round2(salaireBrut),
      tauxHoraireBrut: round2(tauxHoraireBrut),
      coeffBase: round2(coeffBase),
      facteurPays: round2(facteurPays),
      coeffFinal: round2(coeffFinal),
      supplements,
      tauxETTBase,
      tauxETTMajore,
      heures,
      panier,
      coutMainOeuvreMensuel: round2(coutMainOeuvreMensuel),
      coutTotalMensuel,
    };
  });

  const totalMensuelHT = round2(postesPricing.reduce((sum, poste) => sum + poste.coutTotalMensuel, 0));
  const totalMensuelTVA = round2(totalMensuelHT * config.vatRate);
  const totalMensuelTTC = round2(totalMensuelHT + totalMensuelTVA);
  const dureeMissionMois = computeDureeMissionMois(payload.conditions?.dateDebut, payload.conditions?.dateFin);
  const totalMissionHT = round2(totalMensuelHT * dureeMissionMois);
  const totalMissionTVA = round2(totalMensuelTVA * dureeMissionMois);
  const totalMissionTTC = round2(totalMensuelTTC * dureeMissionMois);

  const totals: DevisPricingTotals = {
    totalMensuelHT,
    totalMensuelTVA,
    totalMensuelTTC,
    totalMissionHT,
    totalMissionTVA,
    totalMissionTTC,
    dureeMissionMois,
    tvaRate: config.vatRate,
  };

  return {
    baseHoraireMensuelle: round2(baseHoraire),
    baseHoraireLegale: round2(baseHoraireLegale),
    joursParMois: Math.max(1, Math.round(baseHoraire / 7)),
    majorations,
    totals,
    postes: postesPricing,
  };
};

export const buildDevisPayload = (payload: DevisPayload): DevisPayload => {
  const pricing = computeDevisPricing(payload);
  const majorations = pricing.majorations;
  return {
    ...payload,
    majorations,
    pricing,
  };
};