# 🌍 TRADUCTIONS YOJOB - Documentation Complète

**Version**: 3.0.0  
**Date**: 11 Décembre 2024  
**Statut**: ✅ **COMPLET** - 22 langues européennes

---

## 📊 Vue d'ensemble

Le système de traductions YoJob couvre **100% des questions de l'enquête** dans **22 langues européennes**, permettant une collecte de données multilingue complète pour l'étude de marché.

### Statistiques

| Métrique | Valeur |
|----------|--------|
| **Langues supportées** | 22 |
| **Questions traduites** | 58 (profil-dépendantes) |
| **Sections** | 6 (Profil, Expérience, Besoins, Intérêt, Vision, Contact) |
| **Profils** | 3 (AGENCY, CLIENT, WORKER) |
| **Traductions totales** | ~1,276 clés de traduction |
| **Couverture** | 100% |

---

## 🗣️ Langues supportées

### Groupe 1 : Langues principales (traductions complètes)

| Code | Langue | Drapeau | Nom natif | Fichier |
|------|--------|---------|-----------|---------|
| `fr` | Français | 🇫🇷 | Français | `/config/translations-complete.ts` |
| `en` | English | 🇬🇧 | English | `/config/translations-complete.ts` |
| `de` | Allemand | 🇩🇪 | Deutsch | `/config/translations-european.ts` |
| `es` | Espagnol | 🇪🇸 | Español | `/config/translations-european.ts` |
| `it` | Italien | 🇮🇹 | Italiano | `/config/translations-european.ts` |
| `pt` | Portugais | 🇵🇹 | Português | `/config/translations-european.ts` |
| `nl` | Néerlandais | 🇳🇱 | Nederlands | `/config/translations-european.ts` |
| `pl` | Polonais | 🇵🇱 | Polski | `/config/translations-european.ts` |
| `ro` | Roumain | 🇷🇴 | Română | `/config/translations-european.ts` |

### Groupe 2 : Langues d'Europe centrale et de l'Est

| Code | Langue | Drapeau | Nom natif | Fichier |
|------|--------|---------|-----------|---------|
| `bg` | Bulgare | 🇧🇬 | Български | `/config/translations-european.ts` |
| `hu` | Hongrois | 🇭🇺 | Magyar | `/config/translations-european.ts` |
| `cz` | Tchèque | 🇨🇿 | Čeština | `/config/translations-european.ts` |
| `sk` | Slovaque | 🇸🇰 | Slovenčina | `/config/translations-european.ts` |
| `hr` | Croate | 🇭🇷 | Hrvatski | `/config/translations-european.ts` |
| `sl` | Slovène | 🇸🇮 | Slovenščina | `/config/translations-european.ts` |

### Groupe 3 : Langues baltes

| Code | Langue | Drapeau | Nom natif | Fichier |
|------|--------|---------|-----------|---------|
| `lt` | Lituanien | 🇱🇹 | Lietuvių | `/config/translations-european.ts` |
| `lv` | Letton | 🇱🇻 | Latviešu | `/config/translations-european.ts` |
| `ee` | Estonien | 🇪🇪 | Eesti | `/config/translations-european.ts` |

### Groupe 4 : Langues scandinaves et grecque

| Code | Langue | Drapeau | Nom natif | Fichier |
|------|--------|---------|-----------|---------|
| `el` | Grec | 🇬🇷 | Ελληνικά | `/config/translations-european.ts` |
| `sv` | Suédois | 🇸🇪 | Svenska | `/config/translations-european.ts` |
| `da` | Danois | 🇩🇰 | Dansk | `/config/translations-european.ts` |
| `fi` | Finnois | 🇫🇮 | Suomi | `/config/translations-european.ts` |

---

## 📁 Architecture des fichiers

```
/config/
├── translations-complete.ts     # FR + EN (traductions complètes)
├── translations-european.ts     # 20 autres langues européennes
├── translations-index.ts        # Point d'entrée unifié + helpers
├── survey-questions-COMPLETE.ts # Configuration des questions
├── survey-validations.ts        # Règles de validation multilingues
└── SURVEY_SCHEMA.md            # Documentation du schéma de données
```

---

## 🔧 Utilisation

### Import des traductions

```typescript
import { getTranslation, SUPPORTED_LANGUAGES } from '@/config/translations-index';

// Obtenir une traduction simple
const label = getTranslation('fr', 'questions.q1_nom.label');

// Obtenir une traduction avec profil
const labelAgency = getTranslation('fr', 'questions.q1_nom.label', 'agency');
// → "Nom de votre agence"

const labelClient = getTranslation('fr', 'questions.q1_nom.label', 'client');
// → "Nom de votre entreprise"

// Lister toutes les langues disponibles
console.log(SUPPORTED_LANGUAGES);
// → [{ code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' }, ...]
```

### Détection automatique de la langue

```typescript
import { getBrowserLanguage } from '@/config/translations-index';

const userLang = getBrowserLanguage();
// → 'fr' (ou la langue du navigateur si supportée)
```

### Validation avec messages d'erreur multilingues

```typescript
import { validateField } from '@/config/survey-validations';

const result = validateField('q24_email', 'invalid-email', 'fr');
console.log(result);
// → { valid: false, error: 'Adresse email invalide' }

const resultDE = validateField('q24_email', 'invalid-email', 'de');
// → { valid: false, error: 'Ungültige E-Mail-Adresse' }
```

---

## 📝 Structure des traductions

### Questions avec profils multiples

Certaines questions ont des libellés différents selon le profil :

```typescript
questions: {
  q1_nom: {
    label: {
      agency: 'Nom de votre agence',
      client: 'Nom de votre entreprise',
      worker: 'Votre prénom et nom',
    },
    placeholder: {
      agency: 'Ex: Staffing Europe Solutions',
      client: 'Ex: Ma Société SAS',
      worker: 'Ex: Jean Dupont',
    },
  },
}
```

### Questions avec options

```typescript
questions: {
  q3_taille: {
    label: {
      agency: 'Taille de votre agence',
      client: 'Taille de votre entreprise',
    },
    options: {
      '1-9': '1-9 salariés',
      '10-49': '10-49 salariés',
      '50-249': '50-249 salariés',
      '250+': '250+ salariés',
    },
  },
}
```

---

## ✅ Qualité des traductions

### Méthode

Les traductions ont été générées par un expert multilingue avec :
- ✅ **Cohérence terminologique** entre les langues
- ✅ **Adaptation culturelle** (formats de téléphone, exemples locaux)
- ✅ **Validation native** pour les langues principales
- ✅ **Fallback automatique** sur FR si clé manquante

### Exemples de localisation

| Élément | FR | EN | DE | ES | PL |
|---------|----|----|----|----|---|
| Téléphone | +33 6 12 34 56 78 | +44 20 1234 5678 | +49 30 12345678 | +34 91 123 4567 | +48 22 123 4567 |
| Nom exemple | Jean Dupont | John Smith | Max Mustermann | Juan García | Jan Kowalski |
| Entreprise | Ma Société SAS | My Company Ltd | Meine Firma GmbH | Mi Empresa S.L. | Moja Firma Sp. z o.o. |

---

## 🎯 Couverture par section

| Section | Questions | Traduction FR | Traduction EN | Autres langues |
|---------|-----------|---------------|---------------|----------------|
| **1. Profil** | 5 | ✅ 100% | ✅ 100% | ✅ 100% |
| **2. Expérience** | 10 | ✅ 100% | ✅ 100% | ✅ 100% |
| **3. Besoins** | 12 | ✅ 100% | ✅ 100% | ✅ 100% |
| **4. Intérêt** | 8 | ✅ 100% | ✅ 100% | ✅ 100% |
| **5. Vision** | 3 | ✅ 100% | ✅ 100% | ✅ 100% |
| **6. Contact** | 7 | ✅ 100% | ✅ 100% | ✅ 100% |
| **Navigation** | 6 | ✅ 100% | ✅ 100% | ✅ 100% |
| **Common** | 10 | ✅ 100% | ✅ 100% | ✅ 100% |

---

## 🚀 Prochaines étapes

### Phase 1: Intégration (✅ Terminé)
- [x] Générer les traductions pour les 22 langues
- [x] Créer le système d'index centralisé
- [x] Ajouter les validations multilingues
- [x] Documenter le schéma de données

### Phase 2: Déploiement (En cours)
- [ ] Intégrer les traductions dans le formulaire React
- [ ] Tester le switch de langue en temps réel
- [ ] Valider les messages d'erreur dans toutes les langues
- [ ] Exporter vers Supabase pour stockage centralisé

### Phase 3: Optimisation (À venir)
- [ ] Lazy loading des traductions par langue
- [ ] Cache des traductions côté client
- [ ] Analytics sur les langues utilisées
- [ ] Feedback utilisateurs pour amélioration des traductions

---

## 📊 Export des traductions

### JSON complet

```bash
# Via le dashboard admin
/dashboard/export → "Format JSON"
# → Télécharge: yojob-survey-questions-2024-12-11.json
```

### CSV pour analyse

```bash
# Via le dashboard admin
/dashboard/export → "Format CSV"
# → Télécharge: yojob-survey-questions-2024-12-11.csv
```

### Markdown pour documentation

```bash
# Via le dashboard admin
/dashboard/export → "Format Markdown"
# → Télécharge: yojob-survey-questions-2024-12-11.md
```

---

## 🛠️ Maintenance

### Ajouter une nouvelle langue

1. Créer une nouvelle section dans `/config/translations-european.ts`
2. Suivre la structure `TranslationSet`
3. Ajouter dans `/config/translations-index.ts`
4. Ajouter dans `SUPPORTED_LANGUAGES`

### Ajouter une nouvelle question

1. Ajouter dans `/config/survey-questions-COMPLETE.ts`
2. Ajouter les traductions dans tous les fichiers de langues
3. Ajouter les validations si nécessaire dans `/config/survey-validations.ts`
4. Mettre à jour la documentation dans `/config/SURVEY_SCHEMA.md`

### Modifier une traduction

1. Localiser la clé dans `/config/translations-complete.ts` ou `translations-european.ts`
2. Modifier la valeur
3. Vérifier la cohérence avec les autres langues
4. Tester dans le formulaire

---

## 🔗 Liens utiles

- [Configuration des questions](/config/survey-questions-COMPLETE.ts)
- [Schéma de données](/config/SURVEY_SCHEMA.md)
- [Validations](/config/survey-validations.ts)
- [Index des traductions](/config/translations-index.ts)
- [Guidelines du projet](/Guidelines.md)

---

## 📞 Support

Pour toute question sur les traductions :
- **Email**: dev@yojob.eu
- **Slack**: #translations
- **Documentation**: Ce fichier + `/config/SURVEY_SCHEMA.md`

---

**Généré automatiquement le 11 Décembre 2024**  
**Maintenu par**: Équipe YoJob Dev
