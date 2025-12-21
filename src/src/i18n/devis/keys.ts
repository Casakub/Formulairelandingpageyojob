/**
 * 🗝️ CLÉS DE TRADUCTION DU FORMULAIRE DE DEVIS
 * 
 * Ce fichier définit toutes les clés de traduction utilisées dans le formulaire de demande de devis.
 * Utiliser ces constantes garantit la cohérence et évite les fautes de frappe.
 * 
 * @version 1.0.0
 */

export const DEVIS_KEYS = {
  // ==================== ÉTAPE 1 : ENTREPRISE ====================
  step1: {
    title: 'devis.step1.title',
    subtitle: 'devis.step1.subtitle',
    infoMessage: 'devis.step1.infoMessage',
    
    fields: {
      pays: {
        label: 'devis.step1.pays.label',
        placeholder: 'devis.step1.pays.placeholder',
      },
      raisonSociale: {
        label: 'devis.step1.raisonSociale.label',
        placeholder: 'devis.step1.raisonSociale.placeholder',
      },
      siret: {
        label: 'devis.step1.siret.label',
        placeholder: 'devis.step1.siret.placeholder',
        error: 'devis.step1.siret.error',
      },
      codeAPE: {
        label: 'devis.step1.codeAPE.label',
        placeholder: 'devis.step1.codeAPE.placeholder',
      },
      tvaIntracommunautaire: {
        label: 'devis.step1.tvaIntracommunautaire.label',
        placeholder: 'devis.step1.tvaIntracommunautaire.placeholder',
      },
      adresse: {
        label: 'devis.step1.adresse.label',
        placeholder: 'devis.step1.adresse.placeholder',
      },
      codePostal: {
        label: 'devis.step1.codePostal.label',
        placeholder: 'devis.step1.codePostal.placeholder',
      },
      ville: {
        label: 'devis.step1.ville.label',
        placeholder: 'devis.step1.ville.placeholder',
      },
      region: {
        label: 'devis.step1.region.label',
        placeholder: 'devis.step1.region.placeholder',
      },
      siteInternet: {
        label: 'devis.step1.siteInternet.label',
        placeholder: 'devis.step1.siteInternet.placeholder',
      },
    },
  },

  // ==================== ÉTAPE 2 : CONTACT ====================
  step2: {
    title: 'devis.step2.title',
    subtitle: 'devis.step2.subtitle',
    infoMessage: 'devis.step2.infoMessage',
    
    fields: {
      nom: {
        label: 'devis.step2.nom.label',
        placeholder: 'devis.step2.nom.placeholder',
      },
      prenom: {
        label: 'devis.step2.prenom.label',
        placeholder: 'devis.step2.prenom.placeholder',
      },
      fonction: {
        label: 'devis.step2.fonction.label',
        placeholder: 'devis.step2.fonction.placeholder',
      },
      email: {
        label: 'devis.step2.email.label',
        placeholder: 'devis.step2.email.placeholder',
        error: 'devis.step2.email.error',
      },
      telephone: {
        label: 'devis.step2.telephone.label',
        placeholder: 'devis.step2.telephone.placeholder',
      },
    },
  },

  // ==================== ÉTAPE 3 : BESOINS ====================
  step3: {
    title: 'devis.step3.title',
    subtitle: 'devis.step3.subtitle',
    
    fields: {
      secteur: {
        label: 'devis.step3.secteur.label',
        placeholder: 'devis.step3.secteur.placeholder',
      },
      poste: {
        label: 'devis.step3.poste.label',
        placeholder: 'devis.step3.poste.placeholder',
      },
      classification: {
        label: 'devis.step3.classification.label',
        placeholder: 'devis.step3.classification.placeholder',
        helper: 'devis.step3.classification.helper',
      },
      paysOrigine: {
        label: 'devis.step3.paysOrigine.label',
        placeholder: 'devis.step3.paysOrigine.placeholder',
        helper: 'devis.step3.paysOrigine.helper',
      },
      quantite: {
        label: 'devis.step3.quantite.label',
        placeholder: 'devis.step3.quantite.placeholder',
      },
      dateDebut: {
        label: 'devis.step3.dateDebut.label',
        placeholder: 'devis.step3.dateDebut.placeholder',
      },
      duree: {
        label: 'devis.step3.duree.label',
        placeholder: 'devis.step3.duree.placeholder',
      },
    },
    
    coefficientInfo: 'devis.step3.coefficientInfo',
    coefficientDetail: 'devis.step3.coefficientDetail',
  },

  // ==================== ÉTAPE 4 : CONDITIONS ====================
  step4: {
    title: 'devis.step4.title',
    subtitle: 'devis.step4.subtitle',
    
    fields: {
      heuresMensuelles: {
        label: 'devis.step4.heuresMensuelles.label',
        placeholder: 'devis.step4.heuresMensuelles.placeholder',
        helper: 'devis.step4.heuresMensuelles.helper',
      },
      heuresSupplementaires: {
        label: 'devis.step4.heuresSupplementaires.label',
        helper: 'devis.step4.heuresSupplementaires.helper',
      },
      hebergement: {
        label: 'devis.step4.hebergement.label',
        helper: 'devis.step4.hebergement.helper',
      },
      transport: {
        label: 'devis.step4.transport.label',
        helper: 'devis.step4.transport.helper',
      },
      panierRepas: {
        label: 'devis.step4.panierRepas.label',
        helper: 'devis.step4.panierRepas.helper',
      },
      joursRepas: {
        label: 'devis.step4.joursRepas.label',
        placeholder: 'devis.step4.joursRepas.placeholder',
      },
    },
    
    majoration25: 'devis.step4.majoration25',
    majoration50: 'devis.step4.majoration50',
  },

  // ==================== ÉTAPE 5 : CANDIDATS ====================
  step5: {
    title: 'devis.step5.title',
    subtitle: 'devis.step5.subtitle',
    
    fields: {
      criteresSelection: {
        label: 'devis.step5.criteresSelection.label',
        placeholder: 'devis.step5.criteresSelection.placeholder',
      },
      certificationsRequises: {
        label: 'devis.step5.certificationsRequises.label',
        placeholder: 'devis.step5.certificationsRequises.placeholder',
      },
      languesRequises: {
        label: 'devis.step5.languesRequises.label',
        placeholder: 'devis.step5.languesRequises.placeholder',
      },
      experienceMinimale: {
        label: 'devis.step5.experienceMinimale.label',
        placeholder: 'devis.step5.experienceMinimale.placeholder',
      },
      informationsComplementaires: {
        label: 'devis.step5.informationsComplementaires.label',
        placeholder: 'devis.step5.informationsComplementaires.placeholder',
      },
    },
  },

  // ==================== RÉCAPITULATIF ====================
  recapitulatif: {
    title: 'devis.recapitulatif.title',
    subtitle: 'devis.recapitulatif.subtitle',
    
    sections: {
      entreprise: 'devis.recapitulatif.sections.entreprise',
      contact: 'devis.recapitulatif.sections.contact',
      besoins: 'devis.recapitulatif.sections.besoins',
      conditions: 'devis.recapitulatif.sections.conditions',
      candidats: 'devis.recapitulatif.sections.candidats',
      estimation: 'devis.recapitulatif.sections.estimation',
    },
    
    labels: {
      tauxHoraire: 'devis.recapitulatif.labels.tauxHoraire',
      coutMensuel: 'devis.recapitulatif.labels.coutMensuel',
      coutPersonne: 'devis.recapitulatif.labels.coutPersonne',
      coutTotal: 'devis.recapitulatif.labels.coutTotal',
      panierRepas: 'devis.recapitulatif.labels.panierRepas',
      totalHT: 'devis.recapitulatif.labels.totalHT',
      tva: 'devis.recapitulatif.labels.tva',
      totalTTC: 'devis.recapitulatif.labels.totalTTC',
    },
    
    acceptConditions: 'devis.recapitulatif.acceptConditions',
    lireCGV: 'devis.recapitulatif.lireCGV',
    submitButton: 'devis.recapitulatif.submitButton',
    submitting: 'devis.recapitulatif.submitting',
  },

  // ==================== CONFIRMATION ====================
  confirmation: {
    title: 'devis.confirmation.title',
    subtitle: 'devis.confirmation.subtitle',
    message: 'devis.confirmation.message',
    numero: 'devis.confirmation.numero',
    prochaines: 'devis.confirmation.prochaines',
    
    steps: {
      step1: 'devis.confirmation.steps.step1',
      step2: 'devis.confirmation.steps.step2',
      step3: 'devis.confirmation.steps.step3',
    },
    
    actions: {
      downloadPDF: 'devis.confirmation.actions.downloadPDF',
      backHome: 'devis.confirmation.actions.backHome',
      newQuote: 'devis.confirmation.actions.newQuote',
    },
  },

  // ==================== SECTEURS ====================
  secteurs: {
    batiment: 'devis.secteurs.batiment',
    metallurgie: 'devis.secteurs.metallurgie',
    tp: 'devis.secteurs.tp',
    hotellerie: 'devis.secteurs.hotellerie',
    restauration: 'devis.secteurs.restauration',
    plasturgie: 'devis.secteurs.plasturgie',
    automobile: 'devis.secteurs.automobile',
    sylviculture: 'devis.secteurs.sylviculture',
    cartonnerie: 'devis.secteurs.cartonnerie',
    autre: 'devis.secteurs.autre',
  },

  // ==================== COMMUN ====================
  common: {
    next: 'devis.common.next',
    previous: 'devis.common.previous',
    submit: 'devis.common.submit',
    required: 'devis.common.required',
    optional: 'devis.common.optional',
    loading: 'devis.common.loading',
    error: 'devis.common.error',
    success: 'devis.common.success',
    cancel: 'devis.common.cancel',
    confirm: 'devis.common.confirm',
    yes: 'devis.common.yes',
    no: 'devis.common.no',
    edit: 'devis.common.edit',
    delete: 'devis.common.delete',
    save: 'devis.common.save',
  },

  // ==================== ERREURS ====================
  errors: {
    required: 'devis.errors.required',
    invalidEmail: 'devis.errors.invalidEmail',
    invalidPhone: 'devis.errors.invalidPhone',
    invalidSIRET: 'devis.errors.invalidSIRET',
    minValue: 'devis.errors.minValue',
    maxValue: 'devis.errors.maxValue',
    network: 'devis.errors.network',
    serverError: 'devis.errors.serverError',
  },
} as const;

/**
 * Type helper pour extraire les clés de traduction
 */
export type DevisTranslationKey = typeof DEVIS_KEYS[keyof typeof DEVIS_KEYS];
