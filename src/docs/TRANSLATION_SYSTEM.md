# 🌍 Système de Traduction Multilingue YOJOB

## Vue d'ensemble

Le système de traduction YOJOB permet de gérer 23 langues européennes avec détection automatique des langues disponibles et affichage dynamique dans l'interface utilisateur.

---

## 🏗️ Architecture

### 1. Backend (Supabase Edge Functions)

**Fichier** : `/supabase/functions/server/i18n.tsx`

#### Routes principales

##### `GET /i18n/available-languages`
Retourne la liste des langues avec traductions disponibles et leur taux de complétion.

**Réponse** :
```json
{
  "success": true,
  "languages": [
    {
      "code": "fr",
      "totalTranslations": 28,
      "questions": 25,
      "ui": 3,
      "completion": 100
    },
    {
      "code": "en",
      "totalTranslations": 27,
      "questions": 24,
      "ui": 3,
      "completion": 96
    }
  ],
  "stats": {
    "totalQuestions": 25,
    "totalUITexts": 3,
    "totalItems": 28
  }
}
```

##### `GET /i18n/translate/:lang`
Retourne toutes les traductions pour une langue donnée.

**Réponse** :
```json
{
  "success": true,
  "lang": "fr",
  "translations": {
    "questions": {
      "q1": "Quel est le nom de votre agence ?",
      "q2": "Dans quel pays êtes-vous basé ?"
    },
    "ui": {
      "button.next": "Suivant",
      "button.previous": "Précédent"
    }
  }
}
```

---

### 2. Configuration des Langues

**Fichier** : `/lib/languages.ts`

Liste centralisée des 23 langues européennes supportées :
- Français (FR), Anglais (EN), Allemand (DE), Espagnol (ES), Italien (IT)
- Néerlandais (NL), Portugais (PT), Polonais (PL), Tchèque (CS), Slovaque (SK)
- Hongrois (HU), Roumain (RO), Bulgare (BG), Croate (HR), Slovène (SL)
- Estonien (ET), Letton (LV), Lituanien (LT), Grec (EL), Suédois (SV)
- Danois (DA), Finnois (FI), Norvégien (NO)

**Fonctions utilitaires** :
- `getLanguageByCode(code)` - Obtenir les infos d'une langue
- `getLanguageName(code)` - Obtenir le nom d'une langue
- `getLanguageFlag(code)` - Obtenir le drapeau d'une langue
- `isValidLanguageCode(code)` - Vérifier si un code est valide
- `getAllLanguageCodes()` - Obtenir tous les codes

---

### 3. Hooks React

#### `useI18n()` - Hook principal de traduction

**Fichier** : `/hooks/useI18n.ts`

```typescript
const { currentLang, setCurrentLang, t, tQuestion, loading } = useI18n();

// Changer de langue
setCurrentLang('es');

// Traduire un texte UI
t('button.next', 'Suivant'); // Fallback si traduction manquante

// Traduire une question
tQuestion('q1', 'Question par défaut');
```

**Fonctionnalités** :
- ✅ Détection automatique de la langue du navigateur
- ✅ Chargement automatique des traductions depuis l'API
- ✅ Fallback sur texte par défaut si traduction manquante
- ✅ Context Provider pour toute l'application

#### `useAvailableLanguages()` - Hook pour langues disponibles

**Fichier** : `/hooks/useAvailableLanguages.ts`

```typescript
const { availableLanguages, loading, error, hasLanguages } = useAvailableLanguages();

// availableLanguages contient :
[
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    nativeName: 'Français',
    totalTranslations: 28,
    questions: 25,
    ui: 3,
    completion: 100
  }
]
```

**Fonctions utilitaires** :
- `getAvailableLanguage(languages, code)` - Trouver une langue
- `isLanguageAvailable(languages, code)` - Vérifier disponibilité
- `getCompletionLabel(completion)` - Label de complétion (Complet, Avancé, Partiel...)
- `getCompletionColor(completion)` - Classe Tailwind pour couleur

---

### 4. Composants Frontend

#### `<Header />` - Sélecteur de langue dans le header

**Fichier** : `/components/survey/Header.tsx`

**Fonctionnalités** :
- ✅ Affiche uniquement les langues avec traductions
- ✅ Badge de complétion (%, couleur)
- ✅ Menu dropdown avec drapeaux
- ✅ État de chargement
- ✅ Langue active marquée avec ✓

#### `<QuickLanguageSwitch />` - Sélecteur rapide

**Fichier** : `/components/survey/QuickLanguageSwitch.tsx`

**Variants** :
- `compact` : Grille de drapeaux seulement
- `full` : Cartes avec nom + badge de complétion

**Props** :
```typescript
<QuickLanguageSwitch 
  variant="compact" 
  showCompletion={true} 
/>
```

#### `<LanguageAvailabilityWidget />` - Widget de dashboard

**Fichier** : `/components/dashboard/LanguageAvailabilityWidget.tsx`

**Affichage** :
- 🟢 Langues complètes (≥95%)
- 🔵 Langues en cours (25-94%)
- 🟠 Langues limitées (<25%)
- Barre de progression pour chaque langue
- Statistiques globales

#### `<TranslationMissingBanner />` - Banner d'avertissement

**Fichier** : `/components/survey/TranslationMissingBanner.tsx`

Affiche un message si l'utilisateur sélectionne une langue incomplète avec option de revenir au français.

#### `<LanguagePreview />` - Prévisualisation multilingue

**Fichier** : `/components/dashboard/LanguagePreview.tsx`

Modal permettant de prévisualiser les traductions en temps réel avec :
- Sélecteur de langue
- Aperçu des questions traduites
- Aperçu des textes UI traduits
- Indicateurs de complétion

---

## 🔄 Workflow Complet

### Pour l'administrateur (Dashboard)

1. **Accéder aux traductions** → Dashboard → Onglet "Traductions"
2. **Sélectionner une langue** → Choisir parmi les 23 langues
3. **Traduire** → Saisir manuellement ou utiliser MCP/API
4. **Valider** → Marquer comme "validated"
5. **Prévisualiser** → Voir le rendu en temps réel
6. **Langue apparaît automatiquement** dans le sélecteur frontend 🎉

### Pour l'utilisateur (Formulaire)

1. **Page chargée** → Détection automatique de la langue du navigateur
2. **Clic sur sélecteur de langue** → Voit uniquement les langues disponibles
3. **Sélection** → Interface se met à jour instantanément
4. **Traductions chargées** → Questions et UI traduits
5. **Fallback FR** → Si traduction manquante

---

## 📊 États de Complétion

| Pourcentage | Label | Couleur | Description |
|-------------|-------|---------|-------------|
| ≥95% | Complet | 🟢 Vert | Traduction complète |
| 75-94% | Avancé | 🔵 Cyan | Presque terminé |
| 50-74% | Partiel | 🟡 Jaune | En cours |
| 25-49% | En cours | 🟠 Orange | Démarré |
| <25% | Limité | 🔴 Rouge | Très peu traduit |

---

## 💡 Best Practices

### ✅ À Faire

1. **Toujours utiliser le hook** `useAvailableLanguages()` pour afficher les langues
2. **Fournir des fallbacks** dans `t()` et `tQuestion()`
3. **Vérifier `loading`** avant d'afficher les langues
4. **Utiliser le widget** `<LanguageAvailabilityWidget />` dans le dashboard
5. **Traduire progressivement** - Les langues apparaissent dès 1 traduction

### ❌ À Éviter

1. ❌ Ne pas hardcoder la liste des langues
2. ❌ Ne pas afficher toutes les langues sans vérifier disponibilité
3. ❌ Ne pas oublier les états de chargement
4. ❌ Ne pas cacher les langues incomplètes (les afficher avec badge)
5. ❌ Ne pas oublier le fallback FR

---

## 🚀 Ajout d'une Nouvelle Langue

### Option 1 : Langue européenne existante

Si la langue fait partie des 23 langues :
1. Aller dans le dashboard → Traductions
2. Sélectionner la langue
3. Traduire les questions/UI
4. ✅ La langue apparaît automatiquement dans le sélecteur !

### Option 2 : Nouvelle langue hors Europe

1. **Ajouter dans** `/lib/languages.ts` :
```typescript
{ code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' }
```

2. **Rien d'autre à faire** - Le système détecte automatiquement !

---

## 🐛 Debugging

### Problème : "Aucune langue disponible"

**Causes possibles** :
- Aucune traduction en base de données
- Erreur API `/available-languages`
- Problème de connexion Supabase

**Solution** :
1. Vérifier console navigateur pour erreurs
2. Tester API manuellement : `GET /i18n/available-languages`
3. Vérifier que des traductions existent dans le KV store

### Problème : "Langue n'apparaît pas dans le sélecteur"

**Causes possibles** :
- Aucune traduction pour cette langue
- Cache du hook

**Solution** :
1. Vérifier que la langue a au moins 1 traduction
2. Rafraîchir la page (le hook charge au mount)
3. Vérifier la réponse de `/available-languages`

### Problème : "Complétion à 0% mais j'ai traduit"

**Causes possibles** :
- Traductions non sauvegardées
- Statut "missing" au lieu de "validated"

**Solution** :
1. Vérifier que les traductions sont bien dans le KV store
2. Vérifier le champ `status` des traductions
3. Re-sauvegarder avec statut "validated"

---

## 📈 Métriques & Analytics

Le widget `<LanguageAvailabilityWidget />` fournit :
- Nombre total de langues disponibles
- Répartition par niveau de complétion
- Total de traductions
- Barres de progression visuelles

**Utilisation** :
```tsx
import { LanguageAvailabilityWidget } from './components/dashboard/LanguageAvailabilityWidget';

<LanguageAvailabilityWidget />
```

---

## 🔮 Évolutions Futures

- [ ] Import/Export de traductions (CSV, JSON)
- [ ] Traduction collaborative (plusieurs admin)
- [ ] Historique des modifications
- [ ] Suggestions de traductions manquantes
- [ ] Détection automatique des textes non traduits
- [ ] Intégration DeepL/Google Translate directe
- [ ] Preview en contexte (iframe du formulaire)
- [ ] Mode "fallback chain" (EN → FR si traduction manquante)

---

## 📞 Support

Pour toute question sur le système de traduction :
1. Consulter cette documentation
2. Vérifier les logs console navigateur
3. Tester les routes API manuellement
4. Vérifier l'état du KV store Supabase

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2024  
**Maintenu par** : Équipe YOJOB Dev
