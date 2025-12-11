/**
 * 🔒 VALIDATIONS POUR L'ENQUÊTE YOJOB
 * 
 * Règles de validation pour tous les champs du formulaire
 * À utiliser avec Zod, Yup ou validation native
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

export interface QuestionValidation {
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minSelections?: number;
  maxSelections?: number;
  errorMessage?: {
    [lang: string]: string;
  };
}

/**
 * Validations par fieldName
 */
export const FIELD_VALIDATIONS: Record<string, QuestionValidation> = {
  // Années
  q2_annee: {
    min: 1900,
    max: new Date().getFullYear(),
    step: 1,
    errorMessage: {
      fr: 'Année invalide (entre 1900 et aujourd\'hui)',
      en: 'Invalid year (between 1900 and today)',
      de: 'Ungültiges Jahr (zwischen 1900 und heute)',
      es: 'Año inválido (entre 1900 y hoy)',
      it: 'Anno non valido (tra 1900 e oggi)',
      pt: 'Ano inválido (entre 1900 e hoje)',
      pl: 'Nieprawidłowy rok (między 1900 a dzisiaj)',
      ro: 'An invalid (între 1900 și astăzi)',
    },
  },

  // Nom/Identity
  q1_nom: {
    minLength: 2,
    maxLength: 100,
    errorMessage: {
      fr: 'Le nom doit contenir entre 2 et 100 caractères',
      en: 'Name must be between 2 and 100 characters',
      de: 'Name muss zwischen 2 und 100 Zeichen lang sein',
      es: 'El nombre debe tener entre 2 y 100 caracteres',
      it: 'Il nome deve essere tra 2 e 100 caratteri',
      pt: 'O nome deve ter entre 2 e 100 caracteres',
      pl: 'Nazwa musi mieć od 2 do 100 znaków',
      ro: 'Numele trebuie să aibă între 2 și 100 de caractere',
    },
  },

  // Nationalité
  q2_nationalite: {
    minLength: 2,
    maxLength: 50,
    errorMessage: {
      fr: 'Veuillez indiquer votre nationalité',
      en: 'Please indicate your nationality',
      de: 'Bitte geben Sie Ihre Staatsangehörigkeit an',
      es: 'Por favor indique su nacionalidad',
      it: 'Indicare la propria nazionalità',
      pt: 'Indique a sua nacionalidade',
      pl: 'Proszę podać swoją narodowość',
      ro: 'Vă rugăm să indicați naționalitatea',
    },
  },

  // Score NPS (0-10)
  q18_score: {
    min: 0,
    max: 10,
    step: 1,
    errorMessage: {
      fr: 'Veuillez sélectionner un score entre 0 et 10',
      en: 'Please select a score between 0 and 10',
      de: 'Bitte wählen Sie eine Bewertung zwischen 0 und 10',
      es: 'Seleccione una puntuación entre 0 y 10',
      it: 'Selezionare un punteggio tra 0 e 10',
      pt: 'Selecione uma pontuação entre 0 e 10',
      pl: 'Wybierz ocenę od 0 do 10',
      ro: 'Selectați un scor între 0 și 10',
    },
  },

  // Satisfaction (1-10)
  q9_satisfaction: {
    min: 1,
    max: 10,
    step: 1,
    errorMessage: {
      fr: 'Veuillez noter de 1 (très insatisfait) à 10 (très satisfait)',
      en: 'Please rate from 1 (very dissatisfied) to 10 (very satisfied)',
      de: 'Bitte bewerten Sie von 1 (sehr unzufrieden) bis 10 (sehr zufrieden)',
      es: 'Califique de 1 (muy insatisfecho) a 10 (muy satisfecho)',
      it: 'Valutare da 1 (molto insoddisfatto) a 10 (molto soddisfatto)',
      pt: 'Avalie de 1 (muito insatisfeito) a 10 (muito satisfeito)',
      pl: 'Oceń od 1 (bardzo niezadowolony) do 10 (bardzo zadowolony)',
      ro: 'Evaluați de la 1 (foarte nemulțumit) la 10 (foarte mulțumit)',
    },
  },

  // Email
  q24_email: {
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    maxLength: 100,
    errorMessage: {
      fr: 'Adresse email invalide',
      en: 'Invalid email address',
      de: 'Ungültige E-Mail-Adresse',
      es: 'Dirección de correo inválida',
      it: 'Indirizzo email non valido',
      pt: 'Endereço de email inválido',
      pl: 'Nieprawidłowy adres e-mail',
      ro: 'Adresă de email invalidă',
    },
  },

  // Téléphone
  q25_telephone: {
    pattern: '^\\+?[0-9\\s\\-\\.\\(\\)]{7,20}$',
    errorMessage: {
      fr: 'Numéro de téléphone invalide (format international recommandé: +33 6 12 34 56 78)',
      en: 'Invalid phone number (international format recommended: +44 20 1234 5678)',
      de: 'Ungültige Telefonnummer (internationales Format empfohlen: +49 30 12345678)',
      es: 'Número de teléfono inválido (formato internacional recomendado: +34 91 123 4567)',
      it: 'Numero di telefono non valido (formato internazionale consigliato: +39 02 1234567)',
      pt: 'Número de telefone inválido (formato internacional recomendado: +351 21 123 4567)',
      pl: 'Nieprawidłowy numer telefonu (zalecany format międzynarodowy: +48 22 123 4567)',
      ro: 'Număr de telefon invalid (format internațional recomandat: +40 21 123 4567)',
    },
  },

  // SIRET (France)
  q26_siret: {
    pattern: '^[0-9]{14}$|^[0-9]{3}\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{5}$',
    maxLength: 17,
    errorMessage: {
      fr: 'SIRET invalide (14 chiffres, ex: 123 456 789 00012)',
      en: 'Invalid SIRET (14 digits, e.g.: 123 456 789 00012)',
      de: 'Ungültige SIRET (14 Ziffern, z.B.: 123 456 789 00012)',
      es: 'SIRET inválido (14 dígitos, ej.: 123 456 789 00012)',
      it: 'SIRET non valido (14 cifre, es.: 123 456 789 00012)',
      pt: 'SIRET inválido (14 dígitos, ex.: 123 456 789 00012)',
      pl: 'Nieprawidłowy SIRET (14 cyfr, np.: 123 456 789 00012)',
      ro: 'SIRET invalid (14 cifre, ex.: 123 456 789 00012)',
    },
  },

  // LinkedIn URL
  q27_linkedin: {
    pattern: '^https?:\\/\\/(www\\.)?linkedin\\.com\\/(in|company)\\/[a-zA-Z0-9_-]+\\/?$',
    maxLength: 200,
    errorMessage: {
      fr: 'URL LinkedIn invalide (ex: https://linkedin.com/in/votre-nom)',
      en: 'Invalid LinkedIn URL (e.g.: https://linkedin.com/in/your-name)',
      de: 'Ungültige LinkedIn-URL (z.B.: https://linkedin.com/in/ihr-name)',
      es: 'URL de LinkedIn inválida (ej.: https://linkedin.com/in/su-nombre)',
      it: 'URL LinkedIn non valido (es.: https://linkedin.com/in/il-tuo-nome)',
      pt: 'URL do LinkedIn inválido (ex.: https://linkedin.com/in/seu-nome)',
      pl: 'Nieprawidłowy URL LinkedIn (np.: https://linkedin.com/in/twoje-imie)',
      ro: 'URL LinkedIn invalid (ex.: https://linkedin.com/in/numele-tau)',
    },
  },

  // Vision (textarea)
  q22_vision: {
    minLength: 10,
    maxLength: 1000,
    errorMessage: {
      fr: 'Votre vision doit contenir entre 10 et 1000 caractères',
      en: 'Your vision must be between 10 and 1000 characters',
      de: 'Ihre Vision muss zwischen 10 und 1000 Zeichen lang sein',
      es: 'Su visión debe tener entre 10 y 1000 caracteres',
      it: 'La tua visione deve essere tra 10 e 1000 caratteri',
      pt: 'Sua visão deve ter entre 10 e 1000 caracteres',
      pl: 'Twoja wizja musi mieć od 10 do 1000 znaków',
      ro: 'Viziunea ta trebuie să aibă între 10 și 1000 de caractere',
    },
  },

  // Besoins (textarea)
  q23_besoins: {
    minLength: 10,
    maxLength: 1000,
    errorMessage: {
      fr: 'Décrivez vos besoins en 10 à 1000 caractères',
      en: 'Describe your needs in 10 to 1000 characters',
      de: 'Beschreiben Sie Ihre Bedürfnisse in 10 bis 1000 Zeichen',
      es: 'Describa sus necesidades en 10 a 1000 caracteres',
      it: 'Descrivi le tue esigenze in 10-1000 caratteri',
      pt: 'Descreva suas necessidades em 10 a 1000 caracteres',
      pl: 'Opisz swoje potrzeby w 10-1000 znakach',
      ro: 'Descrieți nevoile în 10-1000 de caractere',
    },
  },

  // Commentaires (textarea)
  q30_commentaires: {
    maxLength: 2000,
    errorMessage: {
      fr: 'Maximum 2000 caractères',
      en: 'Maximum 2000 characters',
      de: 'Maximal 2000 Zeichen',
      es: 'Máximo 2000 caracteres',
      it: 'Massimo 2000 caratteri',
      pt: 'Máximo 2000 caracteres',
      pl: 'Maksymalnie 2000 znaków',
      ro: 'Maxim 2000 de caractere',
    },
  },

  // Autre (précision)
  q9_autre: {
    minLength: 3,
    maxLength: 200,
    errorMessage: {
      fr: 'Veuillez préciser (3 à 200 caractères)',
      en: 'Please specify (3 to 200 characters)',
      de: 'Bitte angeben (3 bis 200 Zeichen)',
      es: 'Especifique (3 a 200 caracteres)',
      it: 'Specificare (3-200 caratteri)',
      pt: 'Especifique (3 a 200 caracteres)',
      pl: 'Proszę określić (3-200 znaków)',
      ro: 'Specificați (3-200 caractere)',
    },
  },

  q16_autre: {
    minLength: 2,
    maxLength: 100,
    errorMessage: {
      fr: 'Nom du logiciel (2 à 100 caractères)',
      en: 'Software name (2 to 100 characters)',
      de: 'Software-Name (2 bis 100 Zeichen)',
      es: 'Nombre del software (2 a 100 caracteres)',
      it: 'Nome del software (2-100 caratteri)',
      pt: 'Nome do software (2 a 100 caracteres)',
      pl: 'Nazwa oprogramowania (2-100 znaków)',
      ro: 'Nume software (2-100 caractere)',
    },
  },

  // Concurrents
  q20_concurrents: {
    maxLength: 500,
    errorMessage: {
      fr: 'Maximum 500 caractères',
      en: 'Maximum 500 characters',
      de: 'Maximal 500 Zeichen',
      es: 'Máximo 500 caracteres',
      it: 'Massimo 500 caratteri',
      pt: 'Máximo 500 caracteres',
      pl: 'Maksymalnie 500 znaków',
      ro: 'Maxim 500 caractere',
    },
  },

  // Multi-select avec limites
  q4_secteurs: {
    minSelections: 1,
    maxSelections: 8,
    errorMessage: {
      fr: 'Sélectionnez entre 1 et 8 secteurs',
      en: 'Select between 1 and 8 sectors',
      de: 'Wählen Sie zwischen 1 und 8 Branchen',
      es: 'Seleccione entre 1 y 8 sectores',
      it: 'Selezionare tra 1 e 8 settori',
      pt: 'Selecione entre 1 e 8 setores',
      pl: 'Wybierz od 1 do 8 sektorów',
      ro: 'Selectați între 1 și 8 sectoare',
    },
  },

  q4_metiers: {
    minSelections: 1,
    maxSelections: 8,
    errorMessage: {
      fr: 'Sélectionnez entre 1 et 8 métiers',
      en: 'Select between 1 and 8 occupations',
      de: 'Wählen Sie zwischen 1 und 8 Berufen',
      es: 'Seleccione entre 1 y 8 oficios',
      it: 'Selezionare tra 1 e 8 mestieri',
      pt: 'Selecione entre 1 e 8 profissões',
      pl: 'Wybierz od 1 do 8 zawodów',
      ro: 'Selectați între 1 și 8 meserii',
    },
  },

  q12_criteres: {
    minSelections: 1,
    maxSelections: 3,
    errorMessage: {
      fr: 'Sélectionnez vos 3 critères prioritaires',
      en: 'Select your top 3 priority criteria',
      de: 'Wählen Sie Ihre 3 wichtigsten Kriterien',
      es: 'Seleccione sus 3 criterios prioritarios',
      it: 'Selezionare i 3 criteri prioritari',
      pt: 'Selecione seus 3 critérios prioritários',
      pl: 'Wybierz 3 najważniejsze kryteria',
      ro: 'Selectați cele 3 criterii prioritare',
    },
  },

  q13_competences: {
    minSelections: 1,
    maxSelections: 5,
    errorMessage: {
      fr: 'Sélectionnez jusqu\'à 5 compétences',
      en: 'Select up to 5 skills',
      de: 'Wählen Sie bis zu 5 Fähigkeiten',
      es: 'Seleccione hasta 5 habilidades',
      it: 'Selezionare fino a 5 competenze',
      pt: 'Selecione até 5 competências',
      pl: 'Wybierz do 5 umiejętności',
      ro: 'Selectați până la 5 competențe',
    },
  },

  q17_features: {
    minSelections: 1,
    maxSelections: 6,
    errorMessage: {
      fr: 'Sélectionnez entre 1 et 6 fonctionnalités',
      en: 'Select between 1 and 6 features',
      de: 'Wählen Sie zwischen 1 und 6 Funktionen',
      es: 'Seleccione entre 1 y 6 funcionalidades',
      it: 'Selezionare tra 1 e 6 funzionalità',
      pt: 'Selecione entre 1 e 6 funcionalidades',
      pl: 'Wybierz od 1 do 6 funkcji',
      ro: 'Selectați între 1 și 6 funcționalități',
    },
  },
};

/**
 * Helper: Get validation for a field
 */
export function getValidation(fieldName: string): QuestionValidation | undefined {
  return FIELD_VALIDATIONS[fieldName];
}

/**
 * Helper: Get error message in specific language
 */
export function getErrorMessage(
  fieldName: string,
  lang: string = 'fr'
): string | undefined {
  const validation = FIELD_VALIDATIONS[fieldName];
  return validation?.errorMessage?.[lang];
}

/**
 * Helper: Validate a value against field rules
 */
export function validateField(
  fieldName: string,
  value: any,
  lang: string = 'fr'
): { valid: boolean; error?: string } {
  const validation = getValidation(fieldName);
  
  if (!validation) {
    return { valid: true };
  }

  // Number validations
  if (typeof value === 'number') {
    if (validation.min !== undefined && value < validation.min) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
    if (validation.max !== undefined && value > validation.max) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
  }

  // String validations
  if (typeof value === 'string') {
    if (validation.minLength !== undefined && value.length < validation.minLength) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
    if (validation.maxLength !== undefined && value.length > validation.maxLength) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
    if (validation.pattern) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return { valid: false, error: validation.errorMessage?.[lang] };
      }
    }
  }

  // Array validations (multi-select)
  if (Array.isArray(value)) {
    if (validation.minSelections !== undefined && value.length < validation.minSelections) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
    if (validation.maxSelections !== undefined && value.length > validation.maxSelections) {
      return { valid: false, error: validation.errorMessage?.[lang] };
    }
  }

  return { valid: true };
}

/**
 * Helper: Validate all fields in a form submission
 */
export function validateForm(
  formData: Record<string, any>,
  lang: string = 'fr'
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  Object.entries(formData).forEach(([fieldName, value]) => {
    const result = validateField(fieldName, value, lang);
    if (!result.valid && result.error) {
      errors[fieldName] = result.error;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
