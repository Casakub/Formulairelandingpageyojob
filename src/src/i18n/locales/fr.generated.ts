/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES (BASE LOCALE)
 * 
 * ⚠️ FICHIER AUTO-GÉNÉRÉ - NE PAS ÉDITER MANUELLEMENT
 * 
 * Généré automatiquement depuis survey-questions-COMPLETE.ts
 * Pour régénérer: yarn i18n:generate
 * 
 * @version 2.0.0
 * @generated 2024-12-11T10:00:00.000Z
 */

import { SURVEY_QUESTIONS } from '../../../config/survey-questions-COMPLETE';
import type { TranslationBundle, QuestionTranslation } from '../types';

/**
 * Génère le bundle FR à partir de SURVEY_QUESTIONS
 */
function generateFrenchBundle(): TranslationBundle {
  const questions: Record<string, QuestionTranslation> = {};
  
  // Parcourir toutes les questions et extraire les fallbacks
  for (const question of SURVEY_QUESTIONS) {
    const translation: QuestionTranslation = {};
    
    // Label
    if (question.labelFallback) {
      translation.label = question.labelFallback;
    }
    
    // Placeholder
    if (question.placeholderFallback) {
      translation.placeholder = question.placeholderFallback;
    }
    
    // Description
    if (question.descriptionFallback) {
      translation.description = question.descriptionFallback;
    }
    
    // Options
    if (question.options && question.options.length > 0) {
      translation.options = {};
      for (const option of question.options) {
        if (option.labelFallback) {
          translation.options[option.value] = option.labelFallback;
        }
      }
    }
    
    // Métadonnées
    translation._meta = {
      _lastUpdated: '2024-12-11T10:00:00.000Z',
      _origin: 'generated',
    };
    
    questions[question.id] = translation;
  }
  
  return {
    nav: {
      section1: 'Profil',
      section2: 'Expérience',
      section3: 'Besoins',
      section4: 'Intérêt YoJob',
      section5: 'Vision Future',
      section6: 'Contact',
      dashboard: 'Dashboard',
      back_to_site: 'Retour au site',
    },
    
    dashboard: {
      title: 'YoJob',
      subtitle: 'Dashboard',
      tabs: {
        overview: 'Vue d\'ensemble',
        results: 'Résultats',
        questions: 'Questions',
        translations: 'Traductions',
        export: 'Export',
        integrations: 'Intégrations',
        cms: 'CMS Formulaire',
        settings: 'Paramètres',
        prospects: 'Prospects',
      },
      badges: {
        hub: '⭐ Hub',
        new: '🆕 Nouveau',
        beta: '🧪 Bêta',
      },
      actions: {
        logout: 'Se déconnecter',
        back_to_survey: 'Retour au formulaire',
        toggle_sidebar: 'Réduire/Agrandir',
      },
      user: {
        welcome: 'Bienvenue',
        logged_in_as: 'Connecté en tant que',
      },
    },
    
    section: {
      1: {
        title: 'Profil Agence',
        description: '4 questions • 2 min',
      },
      2: {
        title: 'Détachement',
        description: '7 questions • 3 min',
      },
      3: {
        title: 'Besoins',
        description: '6 questions • 2 min',
      },
      4: {
        title: 'Intérêt YoJob',
        description: '6 questions • 3 min',
      },
      5: {
        title: 'Vision Future',
        description: '2 questions • 1 min',
      },
      6: {
        title: 'Contact',
        description: '1 question • 1 min',
      },
    },
    
    header: {
      title: 'YoJob',
      subtitle: 'Étude de marché',
    },
    
    hero: {
      title: 'Enquête de marché',
      subtitle: 'Aidez-nous à mieux comprendre vos besoins',
      description: 'Cette enquête prend environ 10-15 minutes. Vos réponses nous permettront de créer une solution adaptée à votre secteur.',
      cta_start: 'Commencer l\'enquête',
      cta_dashboard: 'Accéder au Dashboard',
      badge: 'Étude de marché européen',
      stat: {
        countries: '27 pays européens',
        questions: 'questions',
        benchmark: 'Recevez le benchmark 2025',
        insights: 'Insights marché exclusifs',
        opportunities: 'Accès prioritaire aux offres',
      },
      footer: {
        info: 'questions • Anonyme • Conforme RGPD',
        anonymous: 'Anonyme',
        gdpr: 'Conforme RGPD',
      },
    },
    
    respondent_type: {
      title: 'Qui êtes-vous ?',
      subtitle: 'Sélectionnez votre profil pour personnaliser les questions',
      agency: 'Agence ETT',
      agency_description: 'Vous êtes une agence d\'intérim ou de travail temporaire',
      client: 'Entreprise Cliente',
      client_description: 'Vous êtes une entreprise qui embauche des intérimaires',
      worker: 'Travailleur Intérimaire',
      worker_description: 'Vous êtes un travailleur intérimaire ou en détachement',
    },
    
    selector: {
      badge: '🌍 Étude de marché européen - Recrutement & Intérim',
      title: 'Partagez votre expérience du marché européen',
      subtitle: 'Sélectionnez votre profil pour commencer l\'enquête',
      cta: 'Cliquer pour démarrer →',
      trust: {
        secure: 'Données sécurisées',
        languages: '{count} langues disponibles',
        languages_suffix: 'langues disponibles',
        anonymous: 'Anonyme & confidentiel',
      },
    },
    
    respondent: {
      agency: {
        label: 'Agence de travail temporaire',
        description: 'Vous êtes une agence ETT européenne. Partagez votre expérience du détachement.',
        estimatedTime: '15 min',
      },
      client: {
        label: 'Entreprise cliente',
        description: 'Vous recrutez des intérimaires. Partagez vos besoins et attentes.',
        estimatedTime: '10 min',
      },
      worker: {
        label: 'Travailleur intérimaire',
        description: 'Vous travaillez en intérim. Partagez votre expérience terrain.',
        estimatedTime: '10 min',
      },
    },
    
    button: {
      previous: 'Précédent',
      next: 'Suivant',
      submit: 'Envoyer mes réponses',
      submitting: 'Envoi en cours...',
      back: 'Retour',
      start: 'Commencer',
    },
    
    confirmation: {
      title: 'Merci pour votre participation !',
      subtitle: 'Vos réponses ont été enregistrées avec succès',
      message: 'Nous analysons actuellement toutes les réponses pour créer une solution parfaitement adaptée à vos besoins.',
      cta_back: 'Retour à l\'accueil',
      cta_dashboard: 'Voir le Dashboard',
      description: 'Votre avis est précieux et contribue à façonner l\'avenir de YoJob.',
      cta: 'Retour au site YoJob',
      
      reward: {
        report: {
          title: 'Rapport "Tendances 2025"',
          description: 'Envoyé sous 3 semaines'
        },
        earlyaccess: {
          title: 'Early Access YoJob',
          description: 'Top 100 répondants'
        }
      },
      
      thanks: {
        title: '🎁 En remerciement de votre participation :',
        item1: '• Rapport exclusif "Tendances du détachement 2025"',
        item2: '• Top 100 répondants = 3 mois d\'accès gratuit à YoJob (valeur 500€)'
      }
    },
    
    progress: {
      section: 'Section',
      question: 'Question',
      section_completed: 'Section complétée',
      questions_remaining: '{count} questions restantes',
      time_remaining: 'Environ {time} restant',
    },
    
    section1: {
      description: '4 questions • 2 min',
    },
    section2: {
      description: '7 questions • 3 min',
    },
    section3: {
      description: '6 questions • 2 min',
    },
    section4: {
      description: '6 questions • 3 min',
    },
    section5: {
      description: '2 questions • 1 min',
    },
    section6: {
      description: '1 question • 1 min',
    },
    
    common: {
      oui: 'Oui',
      non: 'Non',
      autre: 'Autre',
      loading: 'Chargement...',
      submit: 'Envoyer',
      next: 'Suivant',
      previous: 'Précédent',
      skip: 'Passer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      required: 'Obligatoire',
      optional: 'Optionnel',
      error: 'Erreur',
      success: 'Succès',
      completed: 'Complété',
      inProgress: 'En cours',
      notStarted: 'Non commencé',
      profileAgency: 'Agence ETT',
      profileClient: 'Entreprise Cliente',
      profileWorker: 'Travailleur Intérimaire',
      score_not_interested: 'Pas intéressé',
      score_very_interested: 'Très intéressé',
    },
    
    sectors: {
      btp: 'BTP / Construction',
      industrie: 'Industrie',
      logistique: 'Logistique / Transport',
      hotellerie: 'Hôtellerie / Restauration',
      sante: 'Santé',
      agriculture: 'Agriculture',
      tech: 'Tech / IT',
      autres: 'Autres',
    },
    
    questions,
    
    _meta: {
      _lastUpdated: '2024-12-11T10:00:00.000Z',
      _origin: 'generated',
      _translatedBy: 'Auto-generator from survey-questions-COMPLETE.ts',
    },
  };
}

// Générer et exporter le bundle
export const fr: TranslationBundle = generateFrenchBundle();