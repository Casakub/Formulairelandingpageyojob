# 🌍 Guide du Système Multilingue YoJob

## Vue d'ensemble

Le système i18n (internationalization) de YoJob permet de gérer le formulaire d'étude de marché en **8 langues européennes** pour cibler les **27 000 agences ETT** dans **30 pays européens**.

### Langues supportées

| Code | Langue | Drapeau | Pays principaux |
|------|--------|---------|-----------------|
| `fr` | Français | 🇫🇷 | France, Belgique, Suisse, Luxembourg |
| `en` | English | 🇬🇧 | UK, Irlande (langue secondaire partout) |
| `de` | Deutsch | 🇩🇪 | Allemagne, Autriche, Suisse |
| `es` | Español | 🇪🇸 | Espagne |
| `it` | Italiano | 🇮🇹 | Italie, Suisse |
| `pl` | Polski | 🇵🇱 | Pologne |
| `pt` | Português | 🇵🇹 | Portugal |
| `nl` | Nederlands | 🇳🇱 | Pays-Bas, Belgique |

---

## 📁 Architecture

### Fichiers principaux

```
/hooks/useI18n.tsx          # Hook React principal + Provider
/lib/i18n-api.ts            # API Client pour Supabase backend
/lib/i18n-seed-data.ts      # Données de test pour démarrage rapide
/supabase/functions/server/i18n.ts  # Backend API routes
```

### Composants Dashboard

```
/components/dashboard/
├── TranslationManager.tsx       # Module principal (3 modes)
├── QuestionTranslation.tsx      # Traduction des 25 questions
├── UITextTranslation.tsx        # Traduction textes d'interface
├── CountryLanguageManager.tsx   # Mapping pays → langues
├── TranslationExport.tsx        # Import/Export JSON
└── LanguagePreview.tsx          # Prévisualisation temps réel
```

---

## 🚀 Démarrage rapide

### 1. Charger les données de test

Dans le dashboard admin (`/dashboard`), onglet **Traductions** :

1. Cliquez sur le bouton violet **"Charger les données de test"**
2. Attendez le chargement (6 questions + 16 textes UI + 27 pays)
3. La page se recharge automatiquement

Cela vous donne un système fonctionnel avec des traductions validées pour FR/EN/DE et auto-générées pour ES/PL/IT.

### 2. Tester la prévisualisation

1. Dans le **Dashboard Overview**, cliquez sur **"Prévisualiser"** dans le widget i18n
2. Changez la langue dans le dropdown
3. Visualisez les questions et textes traduits vs non-traduits

### 3. Changer la langue du formulaire

Dans le header du formulaire public :
- Cliquez sur l'icône **Globe** (🌐)
- Sélectionnez une langue
- Le formulaire bascule instantanément

---

## 🛠️ Utilisation du hook `useI18n`

### Dans un composant React

```tsx
import { useI18n } from '../hooks/useI18n';

function MyComponent() {
  const { t, tQuestion, currentLang, setCurrentLang } = useI18n();

  return (
    <div>
      {/* Traduire un texte UI */}
      <button>{t('button.next', 'Suivant')}</button>

      {/* Traduire une question */}
      <label>{tQuestion('q1', 'Question par défaut')}</label>

      {/* Afficher la langue actuelle */}
      <span>Langue: {currentLang}</span>

      {/* Changer de langue */}
      <button onClick={() => setCurrentLang('en')}>English</button>
    </div>
  );
}
```

### API du hook

```typescript
interface UseI18nReturn {
  currentLang: string;              // Code langue actuel (ex: 'fr')
  setCurrentLang: (lang) => void;   // Changer de langue
  t: (key, fallback?) => string;    // Traduire texte UI
  tQuestion: (id, fallback?) => string; // Traduire question
  loading: boolean;                 // État de chargement
}
```

---

## 📝 Traduction des questions

### Via l'interface d'administration

1. **Dashboard** → Onglet **Traductions**
2. Cliquez sur **"Ouvrir l'interface de traduction"**
3. Sélectionnez une question dans le dropdown
4. Pour chaque langue :
   - Saisissez la traduction manuellement
   - OU cliquez sur **"Auto-traduire (MCP)"** (IA locale)
   - OU cliquez sur **"Auto-traduire (API)"** (DeepL/Google)
5. Validez chaque traduction avec le switch

### Statuts de traduction

| Statut | Badge | Description |
|--------|-------|-------------|
| `missing` | ❌ Rouge | Traduction absente |
| `auto-mcp` | 🤖 Violet | Générée par IA MCP |
| `auto-api` | 🌐 Cyan | Générée par API externe |
| `validated` | ✅ Vert | Validée par humain |

---

## 🎨 Traduction des textes UI

### Catégories

- **buttons** : Boutons (Suivant, Précédent, Envoyer...)
- **navigation** : Titres de sections
- **descriptions** : Descriptions (4 questions • 2 min)
- **form** : Labels (Obligatoire, Optionnel...)
- **messages** : Messages système (Succès, Erreur...)

### Ajouter un nouveau texte

```typescript
// Dans le backend (i18n.ts)
await saveUITextTranslation(
  'button.cancel',      // textId
  'en',                 // langCode
  'Cancel',             // text
  'validated',          // status
  'button.cancel',      // key
  'buttons'             // category
);
```

```tsx
// Dans le frontend
{t('button.cancel', 'Annuler')}
```

---

## 🌍 Configuration pays → langues

### Mapping par défaut

Certains pays ont plusieurs langues officielles :

```typescript
// Belgique : FR + NL + EN
{ countryCode: 'BE', languages: ['fr', 'nl', 'en'] }

// Suisse : DE + FR + IT + EN
{ countryCode: 'CH', languages: ['de', 'fr', 'it', 'en'] }
```

### Modifier le mapping

1. **Dashboard** → **Traductions** → **Pays & Langues**
2. Trouvez le pays dans la liste
3. Cliquez sur **"Éditer"**
4. Cochez/décochez les langues
5. **Enregistrer**

### Détection automatique

Quand un utilisateur sélectionne son pays (question 1), le système :
1. Récupère les langues configurées pour ce pays
2. Détecte la langue du navigateur (`navigator.language`)
3. Choisit la meilleure correspondance
4. Fallback sur `en` si aucune correspondance

---

## 🔄 Import / Export

### Exporter toutes les traductions

1. **Dashboard** → **Traductions** → Scroll bas
2. Cliquez sur **"Exporter tout"** (bouton vert)
3. Téléchargez le fichier JSON
4. Format : `yojob-i18n-export-YYYY-MM-DD.json`

### Importer des traductions

1. Préparez un fichier JSON au format :

```json
{
  "version": "1.0",
  "exportDate": "2024-11-29T...",
  "data": {
    "questions": [...],
    "uiTexts": [...],
    "countries": [...]
  },
  "stats": {
    "questionsCount": 25,
    "uiTextsCount": 50,
    "countriesCount": 30
  }
}
```

2. Cliquez sur **"Choisir un fichier"** (bouton bleu)
3. La page se recharge après import

---

## 🤖 Traduction automatique

### Mode MCP (Model Context Protocol)

**Avantages** :
- ✅ Gratuit
- ✅ Intégration IA locale
- ✅ Contexte métier RH/Recrutement

**Utilisation** :
1. Activez le switch dans l'onglet **MCP IA**
2. Les traductions auto sont générées avec le badge 🤖 Violet

### Mode API (DeepL / Google Translate / Azure)

**Avantages** :
- ✅ Qualité professionnelle
- ✅ Traduction en temps réel
- ✅ Support 100+ langues

**Configuration** :
1. Onglet **API Externe**
2. Choisissez le provider (DeepL recommandé)
3. Entrez votre clé API
4. Testez la connexion
5. Les traductions auto sont générées avec le badge 🌐 Cyan

---

## 📊 Statistiques & Monitoring

### Widget Dashboard

Le dashboard affiche :
- **Questions** : X/25 traduites (Y%)
- **Textes UI** : X/50 traduits (Y%)
- **Pays** : 27/30 configurés

### Voir la couverture détaillée

```
Dashboard → Traductions → QuestionTranslation
```

Pour chaque question, vous voyez les 8 langues avec leur statut.

---

## 🔧 Backend API

### Routes disponibles

```
GET  /i18n/questions              # Récupérer toutes les questions
POST /i18n/questions/:id          # Sauvegarder une traduction
POST /i18n/questions/bulk         # Bulk import questions

GET  /i18n/ui-texts               # Récupérer textes UI
POST /i18n/ui-texts/:id           # Sauvegarder texte UI
POST /i18n/ui-texts/bulk          # Bulk import textes

GET  /i18n/country-languages      # Récupérer mappings pays
POST /i18n/country-languages/:code # Sauvegarder mapping
POST /i18n/country-languages/bulk  # Bulk import mappings

POST /i18n/auto-translate         # Traduire via MCP/API
GET  /i18n/stats                  # Stats globales
```

### Exemple d'appel

```typescript
import { saveQuestionTranslation } from '../lib/i18n-api';

await saveQuestionTranslation(
  'q1',          // questionId
  'de',          // langCode
  'In welchem Land...', // text
  'validated'    // status
);
```

---

## 🎯 Workflow de campagne multilingue

### Étape 1 : Préparer les traductions

1. Charger les données de test (bouton violet)
2. Vérifier les 25 questions en FR/EN/DE
3. Auto-traduire ES/PL/IT/PT/NL avec MCP
4. Réviser manuellement les traductions sensibles
5. Marquer comme "Validé" ✅

### Étape 2 : Configurer les pays

1. **Pays & Langues** → Vérifier les 30 pays
2. Adapter les langues secondaires si besoin
3. Exemple : UK → Ajouter PL pour travailleurs polonais

### Étape 3 : Personnaliser par campagne

1. Exporter la config de base (JSON)
2. Dupliquer pour chaque marché
3. Adapter les textes marketing par pays
4. Importer la config spécifique

### Étape 4 : Lancer & Monitorer

1. Partager l'URL du formulaire
2. Les utilisateurs voient auto leur langue
3. Dashboard → Voir les stats par pays
4. Ajuster les traductions selon feedback

---

## 🐛 Troubleshooting

### Problème : Traductions ne s'affichent pas

**Solution** :
1. Vérifiez que le `I18nProvider` entoure votre app
2. Vérifiez que le backend est démarré
3. Console → Regardez les erreurs API
4. Dashboard → Stats i18n (chargement OK ?)

### Problème : Langue ne change pas

**Solution** :
1. Videz le localStorage : `localStorage.clear()`
2. Rechargez la page
3. Le fallback est toujours `fr`

### Problème : Import JSON échoue

**Solution** :
1. Vérifiez le format JSON (validation stricte)
2. Le fichier doit avoir `version` et `data`
3. Regardez la console pour l'erreur exacte

---

## 📚 Ressources

### Documentation API externes

- **DeepL** : https://www.deepl.com/pro-api
- **Google Translate** : https://cloud.google.com/translate
- **Azure Translator** : https://azure.microsoft.com/translator

### Codes ISO

- **Langues (ISO 639-1)** : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
- **Pays (ISO 3166-1)** : https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

---

## 🎉 Prochaines étapes

- [ ] Ajouter tchèque (`cs`) pour République tchèque/Slovaquie
- [ ] Intégration DeepL API pour traduction pro
- [ ] Traduction emails de confirmation
- [ ] Rapports analytics par langue
- [ ] A/B testing messages selon culture

---

**Créé par YoJob Dev Team** • Version 1.0 • Novembre 2024
