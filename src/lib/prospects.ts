/**
 * 🎯 PROSPECTS INTEGRATION
 * 
 * Ajoute automatiquement les contacts du questionnaire dans l'onglet Prospects
 * après la soumission du formulaire.
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';
import type { RespondentType } from '../types/survey';
import type { FormData } from '../App-Survey-Original';

/**
 * Convertit le type de répondant du questionnaire vers le type de prospect
 */
function mapRespondentTypeToProspectType(respondentType: RespondentType | null): string {
  const mapping: Record<RespondentType, string> = {
    'agency': 'agency',
    'client': 'client',
    'worker': 'interim'
  };
  
  return mapping[respondentType || 'agency'];
}

/**
 * Extrait le code pays depuis le champ pays du formulaire
 * Ex: "France (FR)" → "FR"
 */
function extractCountryCode(paysField: string): string {
  const match = paysField.match(/\(([A-Z]{2})\)/);
  return match ? match[1] : 'FR';
}

/**
 * Détermine le niveau d'intérêt basé sur le score (1-5)
 */
function determineInterestLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 4) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

/**
 * Ajoute automatiquement un prospect après la soumission du questionnaire
 * 
 * @param formData - Données du formulaire
 * @param respondentType - Type de répondant (agency/client/worker)
 * @param country - Pays extrait
 * @param sector - Secteur d'activité
 * @param surveyResponseId - ID de la réponse au questionnaire (pour traçabilité)
 */
export async function addToProspects(
  formData: FormData,
  respondentType: RespondentType | null,
  country: string,
  sector: string,
  surveyResponseId: string
): Promise<void> {
  console.log('🚀 Ajout automatique du contact aux Prospects...');
  
  try {
    // Déterminer le type de prospect
    const prospectType = mapRespondentTypeToProspectType(respondentType);
    
    // Extraire le code pays
    const countryCode = extractCountryCode(formData.q5_pays);
    
    // Déterminer le niveau d'intérêt
    const interestLevel = determineInterestLevel(formData.q18_score);
    
    // Préparer le nom complet
    let fullName = formData.q1_nom;
    if (formData.q27_firstname && formData.q28_lastname) {
      fullName = `${formData.q27_firstname} ${formData.q28_lastname}`;
    }
    
    // Préparer les données du prospect
    const prospectData = {
      type: prospectType,
      source: 'survey_form',
      status: 'new', // Tous les nouveaux prospects commencent avec le statut "new"
      name: fullName || null,
      email: formData.email,
      phone: formData.q26_phone || null,
      company: formData.q1_nom || null, // Nom de l'entreprise/agence
      country_code: countryCode,
      language_code: 'FR', // Par défaut français (peut être adapté plus tard)
      sector: sector || null,
      need_type: null, // Peut être enrichi plus tard
      message: null, // Pas de message dans le questionnaire
      responsible_name: null, // Pas de responsable assigné initialement
      next_action_date: null,
      next_action_type: null,
      next_action_label: null,
      custom_fields: {
        // Champs supplémentaires pour enrichir le prospect
        survey_response_id: surveyResponseId,
        company_size: formData.q3_taille || null,
        sectors: formData.q4_secteurs || [],
        detachment_volume: formData.q6_volume || null,
        interest_score: formData.q18_score || 0,
        interest_level: interestLevel,
        budget: formData.q21_budget_mensuel || null,
        features_interested: formData.q19_features || [],
        role: formData.q23_role || null,
        siret: formData.q29_siret || null,
        autorise_contact: formData.autorise_contact || false,
        souhaite_rapport: formData.souhaite_rapport || false,
        submitted_at: new Date().toISOString()
      }
    };
    
    console.log('📦 Données du prospect préparées:', {
      type: prospectData.type,
      name: prospectData.name,
      email: prospectData.email,
      company: prospectData.company,
      country: prospectData.country_code,
      interest_level: interestLevel,
      survey_id: surveyResponseId
    });
    
    // Envoyer à l'API Prospects
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/submit`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospectData)
      }
    );
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Contact ajouté aux Prospects avec succès!', result.prospect);
      console.log(`📊 Dashboard: Le prospect apparaîtra maintenant dans l'onglet "Prospects" avec le statut "Nouveau"`);
    } else {
      console.error('❌ Échec de l\'ajout aux Prospects:', result.error);
      throw new Error(result.error || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout aux Prospects:', error);
    // On ne throw pas l'erreur pour ne pas bloquer le flow utilisateur
    // L'erreur est juste loggée
  }
}
