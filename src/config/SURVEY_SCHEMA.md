# 📊 SCHÉMA DE DONNÉES - Enquête YoJob Multi-Profils

**Version**: 3.0.0  
**Date**: 11 Décembre 2024  
**Dernière mise à jour**: Corrections sémantiques + validations

---

## 🎯 Vue d'ensemble

L'enquête YoJob utilise un modèle **multi-profil** avec réutilisation intelligente des champs (`fieldName`) pour faciliter l'analyse comparative entre:
- **AGENCY**: Agences ETT européennes (34 questions)
- **CLIENT**: Entreprises utilisatrices (29 questions)
- **WORKER**: Intérimaires/Travailleurs (24 questions)

**Total**: 58 questions dont 55 uniques (3 questions conditionnelles "autre")

---

## 🔑 Mapping `fieldName` ↔ Sémantique

### ⚠️ **Champs partagés avec sémantiques différentes**

Certains `fieldName` sont réutilisés entre profils mais avec des significations légèrement différentes. C'est **voulu** pour permettre des analyses comparatives type "Quel est le principal risque perçu par chaque profil ?".

| `fieldName` | AGENCY | CLIENT | WORKER | Remarques |
|-------------|--------|--------|--------|-----------|
| `q1_nom` | Nom agence | Nom entreprise | Prénom + Nom | String générique "identity" |
| `q2_annee` | Année création | Année création | *N/A* | Number (année) |
| `q2_nationalite` | *N/A* | *N/A* | Nationalité | **⚠️ Utilise `fieldName: q5_pays`** |
| `q5_pays` | Pays enregistrement | Pays opération | Pays résidence | Dimension géographique principale |
| `q3_taille` | Taille agence | Taille entreprise | *N/A* | Catégorie volumétrie |
| `q3_experience` | *N/A* | *N/A* | Années intérim | **⚠️ Utilise `fieldName: q3_taille`** |
| `q6_volume` | Travailleurs détachés/an | Intérimaires/an | Fréquence missions | Volumétrie d'activité |
| `q9_defi` | Défi détachement | *N/A* | *N/A* | Problématiques métier |
| `q9_freins` | *N/A* | Freins recrutement | *N/A* | Obstacles business |
| `q9_satisfaction` | *N/A* | *N/A* | Satisfaction globale | NPS-like score |
| `q14_risques` | Risques agence | Risques client | Risques worker | Catégorie risque (options différentes) |
| `q16_erp` | Usage ERP | *N/A* | *N/A* | Outils tech |
| `q16_cout_recrutement` | *N/A* | Coût moyen | *N/A* | Dimension budgétaire |
| `q16_agence_actuelle` | *N/A* | *N/A* | Agence actuelle | Relation existante |
| `q18_score` | Intérêt plateforme | Intérêt plateforme | Intérêt plateforme | NPS 0-10 (même question) |
| `q19_prix` | Prix acceptable | Prix acceptable | Prix acceptable | Options différentes par profil |
| `q22_vision` | Vision détachement | Vision recrutement | Vision travail tempo | Open-ended, sémantique adaptée |
| `q23_besoins` | Besoins non couverts | Besoins non couverts | Ce qui manque | Open-ended similaire |

### ✅ **Champs uniques (pas de réutilisation)**

| `fieldName` | Profil | Description |
|-------------|--------|-------------|
| `q4_secteurs` | Agency, Client | Secteurs d'activité (multi-select) |
| `q4_metiers` | Worker | Métiers exercés (multi-select) |
| `q7_origine` | Agency | Pays origine travailleurs détachés |
| `q7_exp_detachement` | Client | Expérience détachement européen |
| `q7_travail_etranger` | Worker | Travail à l'étranger (yes/no) |
| `q8_destinations` | Agency | Pays de destination |
| `q8_pays_origine_client` | Client | Pays origine intérimaires |
| `q8_pays_travailles` | Worker | Pays où travaillé |
| `q10_gestion` | Agency | Mode de gestion détachement |
| `q10_delai` | Client | Délai moyen recrutement |
| `q10_difficultes` | Worker | Difficultés rencontrées |
| `q11_certifications` | Agency | Certifications détenues |
| `q11_budget_client` | Client | Budget annuel recrutement |
| `q11_ameliorations` | Worker | Améliorations souhaitées |
| `q12_documents` | Agency | Documents gérés |
| `q12_criteres` | Client | Critères sélection |
| `q12_langues` | Worker | Langues parlées |
| `q13_conformite_agency` | Agency | Niveau conformité |
| `q13_conformite_client` | Client | Problèmes conformité |
| `q13_competences` | Worker | Compétences principales |
| `q15_budget_conformite` | Agency | Budget conformité |
| `q15_partenaire` | Client | Partenaire européen |
| `q15_support_souhaite` | Worker | Support souhaité |
| `q17_features` | All | Fonctionnalités utiles (même pour tous) |
| `q20_concurrents` | All | Solutions utilisées |
| `q21_recommandation` | All | NPS recommendation |
| `q24_email` | All | Email professionnel |
| `q25_telephone` | All | Téléphone |
| `q26_siret` | All | SIRET (France uniquement) |
| `q27_linkedin` | All | Profil LinkedIn |
| `q28_demo` | All | Demande de démo |
| `q29_early_access` | All | Accès anticipé beta |
| `q30_commentaires` | All | Commentaires libres |

---

## 🔒 Validations recommandées

### **Champs numériques**

```typescript
{
  fieldName: 'q2_annee',
  type: 'number',
  validation: {
    min: 1900,
    max: new Date().getFullYear(),
    step: 1,
    errorMessage: {
      fr: 'Année invalide (entre 1900 et aujourd\'hui)',
      en: 'Invalid year (between 1900 and today)'
    }
  }
}
```

### **Champs score (NPS)**

```typescript
{
  fieldName: 'q18_score',
  type: 'score',
  validation: {
    min: 0,
    max: 10,
    step: 1,
    errorMessage: {
      fr: 'Veuillez sélectionner un score entre 0 et 10',
      en: 'Please select a score between 0 and 10'
    }
  }
}
```

### **Champs texte libres**

```typescript
{
  fieldName: 'q22_vision',
  type: 'textarea',
  validation: {
    maxLength: 1000,
    minLength: 10, // Optionnel
    errorMessage: {
      fr: 'Maximum 1000 caractères',
      en: 'Maximum 1000 characters'
    }
  }
}
```

### **Email**

```typescript
{
  fieldName: 'q24_email',
  type: 'email',
  validation: {
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    errorMessage: {
      fr: 'Email invalide',
      en: 'Invalid email'
    }
  }
}
```

### **Téléphone**

```typescript
{
  fieldName: 'q25_telephone',
  type: 'text',
  validation: {
    pattern: '^\\+?[0-9\\s\\-]{7,20}$',
    errorMessage: {
      fr: 'Numéro de téléphone invalide (format international recommandé)',
      en: 'Invalid phone number (international format recommended)'
    }
  }
}
```

### **SIRET (France)**

```typescript
{
  fieldName: 'q26_siret',
  type: 'text',
  required: false,
  validation: {
    pattern: '^[0-9]{14}$|^[0-9]{3}\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{5}$',
    maxLength: 17,
    errorMessage: {
      fr: 'SIRET invalide (14 chiffres)',
      en: 'Invalid SIRET (14 digits)'
    }
  }
}
```

### **Multi-select avec limite**

```typescript
{
  fieldName: 'q12_criteres',
  type: 'multi-select',
  validation: {
    minSelections: 1,
    maxSelections: 3,
    errorMessage: {
      fr: 'Sélectionnez entre 1 et 3 critères',
      en: 'Select between 1 and 3 criteria'
    }
  }
}
```

---

## 📐 Schéma TypeScript complet

```typescript
export interface QuestionValidation {
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Regex string
  minSelections?: number;
  maxSelections?: number;
  errorMessage?: {
    [lang: string]: string;
  };
}

export interface QuestionConfig {
  id: string;
  section: 1 | 2 | 3 | 4 | 5 | 6;
  order: number;
  category: 'profile' | 'experience' | 'needs' | 'interest' | 'vision' | 'contact';
  visibleFor: ('agency' | 'client' | 'worker')[];
  type: 'text' | 'textarea' | 'radio' | 'multi-select' | 'number' | 'email' | 'score' | 'checkbox';
  required: boolean;
  fieldName: string;
  labelKey: string;
  labelFallback: string;
  placeholderKey?: string;
  placeholderFallback?: string;
  descriptionKey?: string;
  descriptionFallback?: string;
  options?: Array<{
    value: string;
    labelKey: string;
    labelFallback: string;
    icon?: string;
  }>;
  conditional?: {
    dependsOn: string; // fieldName de la question parent
    showWhen: string | string[]; // Valeur(s) qui déclenchent l'affichage
  };
  validation?: QuestionValidation;
}
```

---

## 🎯 Guide d'utilisation pour analystes data

### **1. Requêtes SQL pour analyses comparatives**

```sql
-- Exemple: Top 3 défis par profil
SELECT 
  profileType,
  q9_defi AS challenge,
  COUNT(*) as frequency
FROM responses
WHERE q9_defi IS NOT NULL
GROUP BY profileType, q9_defi
ORDER BY profileType, frequency DESC
LIMIT 3;
```

### **2. Pivot pour dashboard comparatif**

```sql
-- Volume d'activité par profil
SELECT 
  'AGENCY' as profile,
  q6_volume as volume_category,
  COUNT(*) as count
FROM responses
WHERE profileType = 'agency'
GROUP BY q6_volume

UNION ALL

SELECT 
  'CLIENT' as profile,
  q6_volume as volume_category,
  COUNT(*) as count
FROM responses
WHERE profileType = 'client'
GROUP BY q6_volume

UNION ALL

SELECT 
  'WORKER' as profile,
  q6_volume as volume_category,
  COUNT(*) as count
FROM responses
WHERE profileType = 'worker'
GROUP BY q6_volume;
```

### **3. NPS calculation**

```typescript
// Calcul NPS sur q18_score (0-10)
function calculateNPS(responses: Response[]) {
  const scores = responses.map(r => r.q18_score).filter(s => s !== null);
  const promoters = scores.filter(s => s >= 9).length;
  const detractors = scores.filter(s => s <= 6).length;
  const nps = ((promoters - detractors) / scores.length) * 100;
  return Math.round(nps);
}
```

---

## 🚨 Points d'attention

### **1. Normalisation des réponses**

Pour les champs partagés avec options différentes (ex: `q6_volume`), assurez-vous de:
- Stocker la valeur brute (`'0-50'`, `'1-2'`, etc.)
- Inclure le `profileType` dans TOUTES les analyses
- Documenter la sémantique dans vos dashboards

### **2. Logique conditionnelle**

Les questions `q9_autre` et `q16_autre` dépendent de:
```typescript
{
  dependsOn: 'q9_defi', // ou 'q16_erp'
  showWhen: 'autre'     // Afficher si la valeur parente = 'autre'
}
```

### **3. Questions multi-profils**

Questions présentes pour TOUS les profils:
- `q17_features`
- `q20_concurrents`
- `q21_recommandation`
- `q22_vision` (sémantique adaptée)
- `q23_besoins` (sémantique adaptée)
- Section Contact (q24-q30)

---

## 📦 Export structure recommandée

```json
{
  "metadata": {
    "exportDate": "2024-12-11T10:30:00Z",
    "version": "3.0.0",
    "source": "YoJob Market Research Survey",
    "totalQuestions": 58,
    "profiles": {
      "agency": 34,
      "client": 29,
      "worker": 24
    }
  },
  "questions": [
    {
      "id": "q1_nom",
      "fieldName": "q1_nom",
      "section": 1,
      "order": 1,
      "category": "profile",
      "type": "text",
      "required": true,
      "visibleFor": ["agency", "client", "worker"],
      "labelKey": "questions.q1_nom.label",
      "labelFallback": "Nom",
      "validation": {
        "minLength": 2,
        "maxLength": 100
      }
    }
    // ...
  ]
}
```

---

## 🔄 Changelog

### v3.0.0 (11 Déc 2024)
- ✅ Documentation complète du mapping `fieldName`
- ✅ Ajout des validations recommandées
- ✅ Schéma TypeScript enrichi
- ✅ Guide pour analystes data
- ⚠️ Clarification des champs ambigus (`q5_pays`, `q3_taille`)

### v2.0.0 (10 Déc 2024)
- 🎯 Refonte architecture multi-profils
- 📊 58 questions (34 AGENCY / 29 CLIENT / 24 WORKER)
- 🌍 Support 22 langues européennes

---

**Maintenu par**: Équipe YoJob Dev  
**Contact**: Pour toute question sur le schéma, contacter l'équipe data
