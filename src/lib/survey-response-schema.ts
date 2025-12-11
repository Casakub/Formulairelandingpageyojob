/**
 * 📋 SCHÉMA ZOD POUR LES RÉPONSES DE L'ENQUÊTE
 * 
 * Validation TypeScript stricte des réponses du formulaire
 * Compatible avec la configuration /config/survey-questions-COMPLETE.ts
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { z } from 'zod';

/**
 * Type de profil (respondent)
 */
export const ProfileTypeSchema = z.enum(['agency', 'client', 'worker']);
export type ProfileType = z.infer<typeof ProfileTypeSchema>;

/**
 * Langue supportée
 */
export const LanguageSchema = z.enum([
  'fr', 'en', 'de', 'es', 'it', 'pt', 'nl', 
  'pl', 'ro', 'bg', 'hu', 'cz', 'sk', 'hr', 
  'sl', 'lt', 'lv', 'ee', 'el', 'sv', 'da', 'fi'
]);
export type Language = z.infer<typeof LanguageSchema>;

/**
 * Schéma de base pour toutes les réponses
 */
const BaseResponseSchema = z.object({
  // Metadata
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  profileType: ProfileTypeSchema,
  language: LanguageSchema.default('fr'),
  
  // Section 1: Profil
  q1_nom: z.string().min(2).max(100),
  q2_annee: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  q5_pays: z.string().min(2).max(100), // Utilisé pour nationalité (worker), pays (agency/client)
  q3_taille: z.enum(['1-9', '10-49', '50-249', '250+']).optional(),
});

/**
 * Schéma pour les réponses AGENCY
 */
export const AgencyResponseSchema = BaseResponseSchema.extend({
  profileType: z.literal('agency'),
  
  // Section 1: Profil
  q2_annee: z.number().int().min(1900).max(new Date().getFullYear()),
  q3_taille: z.enum(['1-9', '10-49', '50-249', '250+']),
  q4_secteurs: z.array(z.string()).min(1).max(8),
  
  // Section 2: Expérience
  q6_volume: z.enum(['0-50', '51-200', '201-500', '500+']),
  q7_origine: z.array(z.string()).optional(),
  q8_destinations: z.array(z.string()).optional(),
  q9_defi: z.string().optional(),
  q9_autre: z.string().min(3).max(200).optional(), // Conditionnel sur q9_defi === 'autre'
  q10_gestion: z.string().optional(),
  
  // Section 3: Besoins
  q11_certifications: z.array(z.string()).optional(),
  q12_documents: z.array(z.string()).optional(),
  q13_conformite_agency: z.string().optional(),
  q14_risques: z.array(z.string()).optional(),
  q15_budget_conformite: z.string().optional(),
  q16_erp: z.string().optional(),
  q16_autre: z.string().min(2).max(100).optional(), // Conditionnel sur q16_erp === 'oui'
  
  // Section 4: Intérêt
  q17_features: z.array(z.string()).min(1).max(6),
  q18_score: z.number().int().min(0).max(10),
  q19_prix: z.string(),
  q20_concurrents: z.string().max(500).optional(),
  q21_recommandation: z.string(),
  
  // Section 5: Vision
  q22_vision: z.string().min(10).max(1000).optional(),
  q23_besoins: z.string().min(10).max(1000).optional(),
  
  // Section 6: Contact
  q24_email: z.string().email().max(100),
  q25_telephone: z.string().regex(/^\+?[0-9\s\-\.\(\)]{7,20}$/).optional(),
  q26_siret: z.string().regex(/^[0-9]{14}$|^[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{5}$/).max(17).optional(),
  q27_linkedin: z.string().url().max(200).optional(),
  q28_demo: z.string(),
  q29_early_access: z.string(),
  q30_commentaires: z.string().max(2000).optional(),
});

/**
 * Schéma pour les réponses CLIENT
 */
export const ClientResponseSchema = BaseResponseSchema.extend({
  profileType: z.literal('client'),
  
  // Section 1: Profil
  q2_annee: z.number().int().min(1900).max(new Date().getFullYear()),
  q3_taille: z.enum(['1-9', '10-49', '50-249', '250+']),
  q4_secteurs: z.array(z.string()).min(1).max(8),
  
  // Section 2: Expérience
  q6_volume: z.enum(['0-50', '51-200', '201-500', '500+']),
  q7_exp_detachement: z.enum(['oui', 'occasionnel', 'envisage', 'non']).optional(),
  q8_pays_origine_client: z.array(z.string()).optional(),
  q9_freins: z.string().optional(),
  q10_delai: z.string().optional(),
  
  // Section 3: Besoins
  q11_budget_client: z.string().optional(),
  q12_criteres: z.array(z.string()).min(1).max(3).optional(),
  q13_conformite_client: z.string().optional(),
  q14_risques: z.array(z.string()).optional(),
  q15_partenaire: z.string().optional(),
  q16_cout_recrutement: z.string().optional(),
  
  // Section 4: Intérêt
  q17_features: z.array(z.string()).min(1).max(6),
  q18_score: z.number().int().min(0).max(10),
  q19_prix: z.string(),
  q20_concurrents: z.string().max(500).optional(),
  q21_recommandation: z.string(),
  
  // Section 5: Vision
  q22_vision: z.string().min(10).max(1000).optional(),
  q23_besoins: z.string().min(10).max(1000).optional(),
  
  // Section 6: Contact
  q24_email: z.string().email().max(100),
  q25_telephone: z.string().regex(/^\+?[0-9\s\-\.\(\)]{7,20}$/).optional(),
  q26_siret: z.string().regex(/^[0-9]{14}$|^[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{5}$/).max(17).optional(),
  q27_linkedin: z.string().url().max(200).optional(),
  q28_demo: z.string(),
  q29_early_access: z.string(),
  q30_commentaires: z.string().max(2000).optional(),
});

/**
 * Schéma pour les réponses WORKER
 */
export const WorkerResponseSchema = BaseResponseSchema.extend({
  profileType: z.literal('worker'),
  
  // Section 1: Profil
  q3_taille: z.enum(['<1', '1-3', '3-5', '5-10', '10+']), // Réutilise fieldName q3_taille pour expérience
  q4_metiers: z.array(z.string()).min(1).max(8),
  
  // Section 2: Expérience
  q6_volume: z.enum(['1-2', '3-5', '6-10', '10+']), // Fréquence missions
  q7_travail_etranger: z.enum(['oui', 'non']).optional(),
  q8_pays_travailles: z.array(z.string()).optional(),
  q9_satisfaction: z.number().int().min(1).max(10).optional(),
  q10_difficultes: z.array(z.string()).optional(),
  
  // Section 3: Besoins
  q11_ameliorations: z.array(z.string()).optional(),
  q12_langues: z.array(z.string()).optional(),
  q13_competences: z.array(z.string()).min(1).max(5).optional(),
  q14_risques: z.array(z.string()).optional(),
  q15_support_souhaite: z.array(z.string()).optional(),
  q16_agence_actuelle: z.string().optional(),
  
  // Section 4: Intérêt
  q17_features: z.array(z.string()).min(1).max(6),
  q18_score: z.number().int().min(0).max(10),
  q19_prix: z.string(),
  q20_concurrents: z.string().max(500).optional(),
  q21_recommandation: z.string(),
  
  // Section 5: Vision
  q22_vision: z.string().min(10).max(1000).optional(),
  q23_besoins: z.string().min(10).max(1000).optional(),
  
  // Section 6: Contact
  q24_email: z.string().email().max(100),
  q25_telephone: z.string().regex(/^\+?[0-9\s\-\.\(\)]{7,20}$/).optional(),
  q26_siret: z.string().regex(/^[0-9]{14}$|^[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{5}$/).max(17).optional(),
  q27_linkedin: z.string().url().max(200).optional(),
  q28_demo: z.string(),
  q29_early_access: z.string(),
  q30_commentaires: z.string().max(2000).optional(),
});

/**
 * Union type pour toutes les réponses
 */
export const SurveyResponseSchema = z.discriminatedUnion('profileType', [
  AgencyResponseSchema,
  ClientResponseSchema,
  WorkerResponseSchema,
]);

export type SurveyResponse = z.infer<typeof SurveyResponseSchema>;
export type AgencyResponse = z.infer<typeof AgencyResponseSchema>;
export type ClientResponse = z.infer<typeof ClientResponseSchema>;
export type WorkerResponse = z.infer<typeof WorkerResponseSchema>;

/**
 * Helper: Valider une réponse
 */
export function validateSurveyResponse(data: unknown): {
  success: boolean;
  data?: SurveyResponse;
  errors?: z.ZodError;
} {
  const result = SurveyResponseSchema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }
  
  return {
    success: false,
    errors: result.error,
  };
}

/**
 * Helper: Valider une réponse par profil
 */
export function validateResponseByProfile(
  profileType: ProfileType,
  data: unknown
): {
  success: boolean;
  data?: AgencyResponse | ClientResponse | WorkerResponse;
  errors?: z.ZodError;
} {
  let schema: z.ZodType;
  
  switch (profileType) {
    case 'agency':
      schema = AgencyResponseSchema;
      break;
    case 'client':
      schema = ClientResponseSchema;
      break;
    case 'worker':
      schema = WorkerResponseSchema;
      break;
    default:
      return {
        success: false,
        errors: new z.ZodError([{
          code: 'custom',
          path: ['profileType'],
          message: `Invalid profile type: ${profileType}`,
        }]),
      };
  }
  
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data as AgencyResponse | ClientResponse | WorkerResponse,
    };
  }
  
  return {
    success: false,
    errors: result.error,
  };
}

/**
 * Helper: Extraire les erreurs Zod en format lisible
 */
export function formatZodErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  errors.issues.forEach(issue => {
    const path = issue.path.join('.');
    formatted[path] = issue.message;
  });
  
  return formatted;
}

/**
 * Helper: Créer une réponse vide pour un profil
 */
export function createEmptyResponse(profileType: ProfileType): Partial<SurveyResponse> {
  const base = {
    profileType,
    language: 'fr' as Language,
    q1_nom: '',
    q5_pays: '',
    q24_email: '',
  };
  
  switch (profileType) {
    case 'agency':
      return {
        ...base,
        profileType: 'agency',
        q4_secteurs: [],
        q17_features: [],
        q18_score: 5,
        q19_prix: '',
        q21_recommandation: '',
        q28_demo: '',
        q29_early_access: '',
      } as Partial<AgencyResponse>;
      
    case 'client':
      return {
        ...base,
        profileType: 'client',
        q4_secteurs: [],
        q17_features: [],
        q18_score: 5,
        q19_prix: '',
        q21_recommandation: '',
        q28_demo: '',
        q29_early_access: '',
      } as Partial<ClientResponse>;
      
    case 'worker':
      return {
        ...base,
        profileType: 'worker',
        q4_metiers: [],
        q17_features: [],
        q18_score: 5,
        q19_prix: '',
        q21_recommandation: '',
        q28_demo: '',
        q29_early_access: '',
      } as Partial<WorkerResponse>;
  }
}

/**
 * Export de tous les helpers
 */
export const SurveyResponseHelpers = {
  validateSurveyResponse,
  validateResponseByProfile,
  formatZodErrors,
  createEmptyResponse,
};
