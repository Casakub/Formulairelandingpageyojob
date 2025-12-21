import { useState, useEffect } from 'react';
import { SECTEURS, REGIONS } from '../data/devis-data';

// Types pour les données de configuration
interface Pays {
  code: string;
  label: string;
  flag: string;
  actif: boolean;
  ordre: number;
}

// 🆕 Données de fallback si le chargement échoue
const PAYS_FALLBACK: Pays[] = [
  { code: 'RO', label: 'Roumanie', flag: '🇷🇴', actif: true, ordre: 1 },
  { code: 'PL', label: 'Pologne', flag: '🇵🇱', actif: true, ordre: 2 },
  { code: 'PT', label: 'Portugal', flag: '🇵🇹', actif: true, ordre: 3 },
  { code: 'ES', label: 'Espagne', flag: '🇪🇸', actif: true, ordre: 4 },
  { code: 'BG', label: 'Bulgarie', flag: '🇧🇬', actif: true, ordre: 5 },
  { code: 'HU', label: 'Hongrie', flag: '🇭🇺', actif: true, ordre: 6 },
  { code: 'SK', label: 'Slovaquie', flag: '🇸🇰', actif: true, ordre: 7 },
  { code: 'CZ', label: 'Tchéquie', flag: '🇨🇿', actif: true, ordre: 8 },
  { code: 'HR', label: 'Croatie', flag: '🇭🇷', actif: true, ordre: 9 },
  { code: 'SI', label: 'Slovénie', flag: '🇸🇮', actif: true, ordre: 10 },
];

interface FacteurPays {
  code: string;
  label: string;
  facteur: number;
  description: string;
}

interface CoefficientDetail {
  coeffBase: number;
  facteurPays: number;
  labelPays: string;
  coeffFinal: number;
}

interface SupplementsData {
  supplements_horaires: {
    hebergement: { montant: number; unite: string; description: string };
    transport: { montant: number; unite: string; description: string };
  };
  paniers_repas: Record<string, Record<string, number>>;
}

// 🆕 Interface pour le mapping des classifications
interface MappingClassifications {
  [secteur: string]: {
    [ancienCode: string]: string; // N2 -> "Manoeuvre spécialisé"
  };
}

/**
 * Hook personnalisé pour gérer la configuration dynamique des devis
 * Charge les données depuis les fichiers JSON de configuration
 */
export function useDevisConfig() {
  // État de chargement
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Données chargées depuis les JSON
  const [pays, setPays] = useState<Pays[]>([]);
  const [coefficientsBase, setCoefficientsBase] = useState<Record<string, Record<string, number>>>({});
  const [facteursPays, setFacteursPays] = useState<Record<string, FacteurPays>>({});
  const [salaires, setSalaires] = useState<Record<string, Record<string, Record<string, number>>>>({});
  const [supplements, setSupplements] = useState<SupplementsData | null>(null);
  const [mappingClassifications, setMappingClassifications] = useState<MappingClassifications>({});

  // Chargement des données au montage du composant
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🔄 [useDevisConfig] Début du chargement de la configuration...');

        // Charger tous les fichiers JSON en parallèle
        const [paysData, coeffsData, facteursData, salairesData, supplementsData] = await Promise.all([
          fetch('/data/config/pays.json').then(res => {
            console.log('📥 [useDevisConfig] pays.json - Status:', res.status);
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status} pour pays.json`);
            return res.json();
          }),
          fetch('/data/config/coefficients-base.json').then(res => {
            console.log('📥 [useDevisConfig] coefficients-base.json - Status:', res.status);
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status} pour coefficients-base.json`);
            return res.json();
          }),
          fetch('/data/config/facteurs-pays.json').then(res => {
            console.log('📥 [useDevisConfig] facteurs-pays.json - Status:', res.status);
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status} pour facteurs-pays.json`);
            return res.json();
          }),
          fetch('/data/config/salaires.json').then(res => {
            console.log('📥 [useDevisConfig] salaires.json - Status:', res.status);
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status} pour salaires.json`);
            return res.json();
          }),
          fetch('/data/config/supplements.json').then(res => {
            console.log('📥 [useDevisConfig] supplements.json - Status:', res.status);
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status} pour supplements.json`);
            return res.json();
          })
        ]);

        // Stocker les données
        setPays(paysData.pays || []);
        setCoefficientsBase(coeffsData.coefficients || {});
        setFacteursPays(facteursData.facteurs || {});
        setSalaires(salairesData.salaires || {});
        setSupplements(supplementsData);
        setMappingClassifications(coeffsData.mapping_anciennes_classifications || {});

        console.log('✅ [useDevisConfig] Configuration chargée avec succès !');
        console.log(`   - Pays: ${paysData.pays?.length || 0} pays chargés`);
        console.log(`   - Coefficients: ${Object.keys(coeffsData.coefficients || {}).length} secteurs`);
        console.log(`   - Facteurs pays: ${Object.keys(facteursData.facteurs || {}).length} pays`);
        console.log(`   - Salaires: ${Object.keys(salairesData.salaires || {}).length} régions`);

        setIsLoading(false);
      } catch (err) {
        console.error('❌ [useDevisConfig] Erreur lors du chargement:', err);
        console.warn('⚠️ [useDevisConfig] Utilisation des données de fallback (10 pays)');
        setError('Impossible de charger la configuration. Utilisation des valeurs par défaut.');
        setIsLoading(false);
        // Utiliser les données de fallback
        setPays(PAYS_FALLBACK);
      }
    };

    loadConfig();
  }, []);

  // ==================== FONCTIONS HELPERS ====================

  /**
   * Retourne la liste des pays actifs triés par ordre
   */
  const getPaysActifs = (): Pays[] => {
    return pays.filter(p => p.actif).sort((a, b) => a.ordre - b.ordre);
  };

  /**
   * 🆕 Retourne les informations d'un pays (flag, label) à partir de son code
   */
  const getPaysInfo = (code: string): Pays | null => {
    return pays.find(p => p.code === code) || PAYS_FALLBACK.find(p => p.code === code) || null;
  };

  /**
   * Calcule le coefficient final avec la formule : Coeff base × Facteur pays
   * 🆕 Utilise le mapping des classifications pour convertir les codes courts
   */
  const getCoefficient = (secteur: string, classification: string, paysCode: string): number => {
    // 🆕 Convertir la classification si nécessaire (N2 -> "Manoeuvre spécialisé")
    const classificationMappee = mappingClassifications[secteur]?.[classification] || classification;
    
    const coeffBase = coefficientsBase[secteur]?.[classificationMappee] ?? 1.92;
    const facteurPays = facteursPays[paysCode]?.facteur ?? 1.00;
    const coeffFinal = coeffBase * facteurPays;
    
    // 🆕 Log de débogage
    console.log('🔍 [getCoefficient] Calcul:', {
      secteur,
      classificationOriginale: classification,
      classificationMappee,
      coeffBase,
      facteurPays,
      coeffFinal: Math.round(coeffFinal * 100) / 100
    });
    
    return Math.round(coeffFinal * 100) / 100;
  };

  /**
   * Retourne le détail complet du coefficient pour l'affichage
   * 🆕 Utilise le mapping des classifications pour convertir les codes courts
   */
  const getCoefficientDetail = (secteur: string, classification: string, paysCode: string): CoefficientDetail => {
    // 🆕 Convertir la classification si nécessaire (N2 -> "Manoeuvre spécialisé")
    const classificationMappee = mappingClassifications[secteur]?.[classification] || classification;
    
    const coeffBase = coefficientsBase[secteur]?.[classificationMappee] ?? 1.92;
    const facteur = facteursPays[paysCode]?.facteur ?? 1.00;
    
    // 🆕 Chercher le label d'abord dans facteursPays, sinon dans pays[], sinon fallback
    let labelPays = facteursPays[paysCode]?.label;
    if (!labelPays) {
      const paysInfo = pays.find(p => p.code === paysCode);
      labelPays = paysInfo?.label ?? 'Inconnu';
    }
    
    // 🆕 Log de débogage
    console.log('🔍 [getCoefficientDetail] Détail:', {
      secteur,
      classificationOriginale: classification,
      classificationMappee,
      coeffBase,
      paysCode,
      facteur,
      labelPays
    });
    
    return {
      coeffBase,
      facteurPays: facteur,
      labelPays,
      coeffFinal: getCoefficient(secteur, classification, paysCode)
    };
  };

  /**
   * Retourne le salaire pour une région, secteur et classification donnés
   */
  const getSalaire = (region: string, secteur: string, classification: string): number => {
    const salaire = salaires[region]?.[secteur]?.[classification];
    
    if (salaire !== undefined) {
      return salaire;
    }

    // Fallback : essayer AUVERGNE-RHÔNE-ALPES si la région n'a pas de données
    const salaireFallback = salaires['AUVERGNE-RHÔNE-ALPES']?.[secteur]?.[classification];
    
    if (salaireFallback !== undefined) {
      return salaireFallback;
    }

    // Si toujours pas trouvé, warning et retour 0
    console.warn(`Salaire introuvable pour ${region} / ${secteur} / ${classification}`);
    return 0;
  };

  /**
   * Retourne le montant du panier repas pour une région et un secteur
   */
  const getPanierRepas = (region: string, secteur: string): number => {
    const montant = supplements?.paniers_repas?.[region]?.[secteur];
    
    if (montant !== undefined) {
      return montant;
    }

    // Fallback : 10.00€ par défaut
    console.warn(`Panier repas introuvable pour ${region} / ${secteur}, utilisation de 10.00€`);
    return 10.00;
  };

  /**
   * Retourne les suppléments horaires (hébergement, transport)
   */
  const getSupplementsHoraires = () => {
    return {
      hebergement: supplements?.supplements_horaires?.hebergement?.montant ?? 3.50,
      transport: supplements?.supplements_horaires?.transport?.montant ?? 1.50
    };
  };

  /**
   * Retourne la liste des secteurs disponibles
   */
  const getSecteurs = (): string[] => {
    return Object.keys(SECTEURS);
  };

  /**
   * Retourne les classifications pour un secteur donné
   */
  const getClassifications = (secteur: string): string[] => {
    const secteurData = SECTEURS[secteur as keyof typeof SECTEURS];
    return secteurData?.classifications || [];
  };

  /**
   * Retourne les postes pour un secteur donné
   */
  const getPostes = (secteur: string): string[] => {
    const secteurData = SECTEURS[secteur as keyof typeof SECTEURS];
    return secteurData?.postes || [];
  };

  /**
   * Retourne la convention collective pour un secteur
   */
  const getConvention = (secteur: string): string => {
    const secteurData = SECTEURS[secteur as keyof typeof SECTEURS];
    return secteurData?.convention || 'À définir selon activité';
  };

  /**
   * Retourne la liste des régions françaises
   */
  const getRegions = (): readonly string[] => {
    return REGIONS;
  };

  /**
   * Vérifie si un coefficient existe pour un secteur/classification
   */
  const hasCoefficient = (secteur: string, classification: string): boolean => {
    return coefficientsBase[secteur]?.[classification] !== undefined;
  };

  /**
   * Vérifie si un salaire existe pour une région/secteur/classification
   */
  const hasSalaire = (region: string, secteur: string, classification: string): boolean => {
    return salaires[region]?.[secteur]?.[classification] !== undefined;
  };

  /**
   * Retourne tous les coefficients pour un secteur (pour affichage dans le dashboard admin)
   */
  const getCoefficientsParSecteur = (secteur: string): Record<string, number> => {
    return coefficientsBase[secteur] || {};
  };

  /**
   * Retourne tous les facteurs pays (pour affichage dans le dashboard admin)
   */
  const getAllFacteursPays = (): Record<string, FacteurPays> => {
    return facteursPays;
  };

  // ==================== RETOUR DU HOOK ====================

  return {
    // État
    isLoading,
    error,

    // Données brutes (pour le dashboard admin futur)
    pays,
    coefficientsBase,
    facteursPays,
    salaires,
    supplements,

    // Fonctions helpers principales
    getPaysActifs,
    getCoefficient,
    getCoefficientDetail,
    getSalaire,
    getPanierRepas,
    getSupplementsHoraires,
    
    // Fonctions utilitaires
    getSecteurs,
    getClassifications,
    getPostes,
    getConvention,
    getRegions,
    
    // Fonctions de vérification
    hasCoefficient,
    hasSalaire,
    
    // Fonctions pour le dashboard admin
    getCoefficientsParSecteur,
    getAllFacteursPays,
    
    // 🆕 Fonction pour obtenir les informations d'un pays
    getPaysInfo,
    
    // 🆕 Mapping des classifications
    mappingClassifications,
  };
}