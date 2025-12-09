/**
 * 🔄 Translation Workflow Types
 * Types et structures pour le workflow de traduction avancé du CMS
 */

import type { LanguageCode, LandingPageContent } from './landingContent';

/**
 * Statuts avancés de traduction
 */
export type TranslationWorkflowStatus =
  | 'NOT_STARTED'      // Pas encore traduit
  | 'AI_PROPOSED'      // Traduction proposée par l'IA (à valider)
  | 'IN_REVIEW'        // En cours de révision manuelle
  | 'VALIDATED';       // Validé et prêt pour production

/**
 * Type de champ de contenu (pour adapter l'UI)
 */
export type ContentFieldType =
  | 'title'            // Titre principal (H1, H2)
  | 'subtitle'         // Sous-titre / description
  | 'paragraph'        // Paragraphe long
  | 'cta'              // Call-to-action (bouton)
  | 'badge'            // Badge / tag
  | 'list_item'        // Item de liste
  | 'meta'             // Meta tag (title, description)
  | 'faq_question'     // Question FAQ
  | 'faq_answer'       // Réponse FAQ
  | 'placeholder'      // Placeholder de champ
  | 'label';           // Label de formulaire

/**
 * Métadonnées de traduction pour une clé spécifique
 */
export interface TranslationKeyMeta {
  keyPath: string;                          // Ex: "hero.title"
  fieldType: ContentFieldType;              // Type de champ
  status: TranslationWorkflowStatus;        // Statut de la traduction
  sourceText: string;                       // Texte source (FR)
  targetText: string;                       // Texte traduit
  aiProposedText?: string;                  // Proposition IA (si AI_PROPOSED)
  characterLimit?: number;                  // Limite de caractères (pour CTA, meta)
  lastModified?: string;                    // Date de dernière modification
  modifiedBy?: string;                      // Utilisateur ayant modifié
  reviewNotes?: string;                     // Notes de révision
}

/**
 * Métadonnées de traduction complètes pour une langue
 */
export interface LanguageTranslationMeta {
  languageCode: LanguageCode;
  overallStatus: TranslationWorkflowStatus; // Statut global de la langue
  completionPercentage: number;             // % de complétion (0-100)
  totalKeys: number;                        // Nombre total de clés
  validatedKeys: number;                    // Nombre de clés validées
  aiProposedKeys: number;                   // Nombre de clés proposées par IA
  inReviewKeys: number;                     // Nombre de clés en révision
  notStartedKeys: number;                   // Nombre de clés non traduites
  lastUpdated: string;                      // Date de dernière mise à jour
  translator?: string;                      // Traducteur assigné
  reviewer?: string;                        // Relecteur assigné
  notes?: string;                           // Notes générales
  keys: Record<string, TranslationKeyMeta>; // Métadonnées par clé
}

/**
 * Collection des métadonnées de traduction pour toutes les langues
 */
export type TranslationMetaCollection = {
  [K in LanguageCode]?: LanguageTranslationMeta;
};

/**
 * Paramètres pour la requête de traduction IA
 */
export interface AITranslationRequest {
  sourceLang: LanguageCode;                 // Langue source (généralement 'fr')
  targetLang: LanguageCode;                 // Langue cible
  sourceContent: LandingPageContent;        // Contenu source complet
  keysToTranslate?: string[];               // Clés spécifiques à traduire (optionnel)
  preserveVariables?: boolean;              // Préserver les {{variables}}
  adaptCulturally?: boolean;                // Adaptation culturelle vs littérale
  tone?: 'professional' | 'casual' | 'technical'; // Ton souhaité
}

/**
 * Réponse de traduction IA
 */
export interface AITranslationResponse {
  targetLang: LanguageCode;
  translatedContent: Partial<LandingPageContent>; // Contenu traduit
  translatedKeys: string[];                 // Clés traduites
  warnings?: string[];                      // Avertissements (texte trop long, etc.)
  confidence?: number;                      // Score de confiance (0-1)
  processingTime?: number;                  // Temps de traitement (ms)
}

/**
 * Configuration du workflow de traduction
 */
export interface TranslationWorkflowConfig {
  autoSaveEnabled: boolean;                 // Sauvegarde automatique
  autoSaveInterval: number;                 // Intervalle en ms
  requireReviewBeforeValidation: boolean;   // Exiger révision avant validation
  allowDirectValidation: boolean;           // Permettre validation directe sans révision
  notifyOnCompletion: boolean;              // Notifier à 100% de complétion
  defaultTone: 'professional' | 'casual' | 'technical';
}

/**
 * Helper pour calculer la progression d'une langue
 */
export function calculateLanguageProgress(meta: LanguageTranslationMeta): number {
  if (meta.totalKeys === 0) return 0;
  return Math.round((meta.validatedKeys / meta.totalKeys) * 100);
}

/**
 * Helper pour déterminer le statut global d'une langue
 */
export function determineOverallStatus(meta: LanguageTranslationMeta): TranslationWorkflowStatus {
  if (meta.validatedKeys === meta.totalKeys) {
    return 'VALIDATED';
  }
  if (meta.inReviewKeys > 0) {
    return 'IN_REVIEW';
  }
  if (meta.aiProposedKeys > 0) {
    return 'AI_PROPOSED';
  }
  return 'NOT_STARTED';
}

/**
 * Helper pour mapper les clés de contenu vers leurs métadonnées
 */
export function extractContentKeys(content: LandingPageContent): string[] {
  const keys: string[] = [];
  
  // Helper récursif pour extraire les clés
  function extractKeys(obj: any, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        keys.push(path);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string') {
            keys.push(`${path}[${index}]`);
          } else if (typeof item === 'object' && item !== null) {
            extractKeys(item, `${path}[${index}]`);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        extractKeys(value, path);
      }
    }
  }
  
  extractKeys(content);
  return keys;
}

/**
 * Helper pour déterminer le type de champ selon le chemin de clé
 */
export function determineFieldType(keyPath: string): ContentFieldType {
  const lowerPath = keyPath.toLowerCase();
  
  if (lowerPath.includes('title') && !lowerPath.includes('meta')) return 'title';
  if (lowerPath.includes('subtitle')) return 'subtitle';
  if (lowerPath.includes('description') || lowerPath.includes('quote')) return 'paragraph';
  if (lowerPath.includes('cta') || lowerPath.includes('label') && lowerPath.includes('button')) return 'cta';
  if (lowerPath.includes('badge')) return 'badge';
  if (lowerPath.includes('benefits') || lowerPath.includes('features')) return 'list_item';
  if (lowerPath.includes('meta') || lowerPath.includes('seo')) return 'meta';
  if (lowerPath.includes('faq') && lowerPath.includes('question')) return 'faq_question';
  if (lowerPath.includes('faq') && lowerPath.includes('answer')) return 'faq_answer';
  if (lowerPath.includes('placeholder')) return 'placeholder';
  if (lowerPath.includes('label')) return 'label';
  
  return 'paragraph'; // Défaut
}

/**
 * Helper pour obtenir les limites de caractères recommandées
 */
export function getCharacterLimit(fieldType: ContentFieldType): number | undefined {
  switch (fieldType) {
    case 'title': return 60;
    case 'cta': return 30;
    case 'badge': return 25;
    case 'meta': return 160;
    case 'placeholder': return 50;
    case 'label': return 30;
    default: return undefined;
  }
}

/**
 * Helper pour initialiser les métadonnées de traduction d'une langue
 */
export function initializeLanguageTranslationMeta(
  languageCode: LanguageCode,
  sourceContent: LandingPageContent,
  existingContent?: Partial<LandingPageContent>
): LanguageTranslationMeta {
  const sourceKeys = extractContentKeys(sourceContent);
  const existingKeys = existingContent ? extractContentKeys(existingContent as LandingPageContent) : [];
  
  const keysMeta: Record<string, TranslationKeyMeta> = {};
  
  sourceKeys.forEach(keyPath => {
    const sourceText = getValueAtPath(sourceContent, keyPath) || '';
    const targetText = existingContent ? (getValueAtPath(existingContent, keyPath) || '') : '';
    const fieldType = determineFieldType(keyPath);
    
    keysMeta[keyPath] = {
      keyPath,
      fieldType,
      status: targetText ? 'VALIDATED' : 'NOT_STARTED',
      sourceText,
      targetText,
      characterLimit: getCharacterLimit(fieldType),
      lastModified: new Date().toISOString(),
    };
  });
  
  const validatedKeys = Object.values(keysMeta).filter(k => k.status === 'VALIDATED').length;
  
  return {
    languageCode,
    overallStatus: validatedKeys === sourceKeys.length ? 'VALIDATED' : 'NOT_STARTED',
    completionPercentage: Math.round((validatedKeys / sourceKeys.length) * 100),
    totalKeys: sourceKeys.length,
    validatedKeys,
    aiProposedKeys: 0,
    inReviewKeys: 0,
    notStartedKeys: sourceKeys.length - validatedKeys,
    lastUpdated: new Date().toISOString(),
    keys: keysMeta,
  };
}

/**
 * Helper pour obtenir une valeur à partir d'un chemin de clé
 */
function getValueAtPath(obj: any, path: string): string | undefined {
  const parts = path.split(/[.[\]]/).filter(Boolean);
  let current = obj;
  
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  
  return typeof current === 'string' ? current : undefined;
}
