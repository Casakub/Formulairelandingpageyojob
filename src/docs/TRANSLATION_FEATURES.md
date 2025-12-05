# 🌍 Fonctionnalités du Système de Traduction YOJOB

## Vue d'ensemble

Système de traduction multilingue complet pour YOJOB avec support de **8 langues européennes**, interface de gestion intuitive, statistiques en temps réel, et outils de productivité avancés.

---

## 📋 Table des matières

1. [Composants principaux](#composants-principaux)
2. [Fonctionnalités clés](#fonctionnalités-clés)
3. [Interface utilisateur](#interface-utilisateur)
4. [Outils de productivité](#outils-de-productivité)
5. [Statistiques et rapports](#statistiques-et-rapports)
6. [Architecture technique](#architecture-technique)

---

## 🎯 Composants principaux

### 1. TranslationManager
**Fichier** : `/components/dashboard/TranslationManager.tsx`

Hub central de gestion des traductions avec 4 sections d'accès rapide :
- **Questions** : Traduction des 25 questions du formulaire
- **Interface** : Traduction des textes UI (boutons, labels, messages)
- **Pays & langues** : Mapping ISO pays → langues
- **Statistiques** : Vue d'ensemble de la progression

**Modes de traduction disponibles** :
- ✍️ **Manuel** : Édition cellule par cellule avec validation
- 🤖 **MCP IA** : Suggestions automatiques via Claude
- 🔑 **API externe** : Intégration DeepL, Google Translate, Azure

---

### 2. QuestionTranslation
**Fichier** : `/components/dashboard/QuestionTranslation.tsx`

Interface de traduction des questions avec tableau horizontal scrollable.

**Fonctionnalités** :
- ✅ Colonne française (source) sticky pendant le scroll
- ✅ Édition inline avec Textarea auto-focus
- ✅ Compteur de caractères avec recommandations
- ✅ Comparaison automatique avec la source
- ✅ Statuts de traduction (À traduire, Validé, Auto-MCP, Auto-API)
- ✅ Filtrage multi-critères (section, langue, statut)
- ✅ Génération automatique par cellule ou en masse
- ✅ Raccourcis clavier pour productivité maximale

**Statuts visuels** :
```
🔴 À traduire    - Aucune traduction disponible
🟢 Validé        - Traduction validée manuellement
🟣 Auto-MCP      - Générée par Claude (à valider)
🔵 Auto-API      - Générée par API externe (à valider)
```

---

### 3. UITextTranslation
**Fichier** : `/components/dashboard/UITextTranslation.tsx`

Gestion des textes d'interface (150+ chaînes).

**Catégories** :
- **Buttons** : CTA, actions, navigation
- **Labels** : Champs de formulaire, légendes
- **Messages** : Erreurs, succès, confirmations
- **Navigation** : Menus, breadcrumbs

**Particularités** :
- Traduction langue par langue avec sélecteur
- Système de recherche par clé ou contexte
- ScrollArea pour listes longues
- Validation individuelle

---

### 4. CountryLanguageManager
**Fichier** : `/components/dashboard/CountryLanguageManager.tsx`

Mapping ISO 3166-1 (pays) → ISO 639-1 (langues).

**Données** :
- 30 pays européens configurés
- 8 langues cibles supportées
- Langues multiples par pays (ex: Belgique = FR + NL)
- Flags emoji pour UX améliorée

**Structure** :
```typescript
{
  code: 'BE',
  name: 'Belgique',
  flag: '🇧🇪',
  languages: ['fr', 'nl'],
  primary: 'fr'
}
```

---

## 🚀 Fonctionnalités clés

### Scroll horizontal intelligent

**Fichier** : `/components/dashboard/HorizontalScrollHint.tsx`

- Indicateur visuel "Scroll horizontal →" avec animation
- Auto-masquage après 5 secondes
- Réapparition sur hover de la zone de scroll
- Scrollbar personnalisée avec gradient violet

**Implémentation CSS** :
```css
/* Scrollbar stylée */
.styled-scrollbar::-webkit-scrollbar {
  height: 12px;
}
.styled-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #7C3AED, #06B6D4);
  border-radius: 6px;
}
```

---

### Compteur de caractères avancé

**Fichier** : `/components/dashboard/CharacterCounter.tsx`

**Props** :
```typescript
{
  current: number;         // Longueur actuelle
  max?: number;            // Limite max (500 recommandé)
  recommended?: number;    // Longueur idéale (200)
  sourceLength?: number;   // Longueur texte source
  showComparison?: boolean; // Afficher diff avec source
}
```

**Indicateurs visuels** :
- 🟢 Bon (< 90% de max)
- 🟠 Attention (90-100% de max)
- 🔴 Dépassement (> 100% de max)
- 📊 Barre de progression animée
- ⚠️ Badge si différence > 30% avec source

---

### Raccourcis clavier

**Fichier** : `/components/dashboard/TranslationKeyboardShortcuts.tsx`

| Raccourci | Action |
|-----------|--------|
| `Ctrl+S` | Sauvegarder la traduction en cours |
| `Ctrl+K` | Focus sur la recherche |
| `Ctrl+G` | Générer via MCP IA |
| `Ctrl+T` | Générer via API |
| `Esc` | Annuler l'édition |
| `Tab` | Cellule suivante (à implémenter) |
| `Shift+Tab` | Cellule précédente (à implémenter) |
| `?` | Afficher/masquer l'aide |

**Panneau d'aide** :
- Apparition automatique après 3 secondes (première visite)
- Bouton flottant bottom-left
- LocalStorage pour ne pas répéter l'affichage
- Animation Motion avec spring bounce

---

### Export rapide

**Fichier** : `/components/dashboard/QuickTranslationExport.tsx`

Bouton flottant bottom-right pour export instantané.

**Formats disponibles** :
- 📄 **JSON** : Structure complète avec métadonnées
- 📊 **CSV** : Compatible Excel/Google Sheets

**UX** :
- Panneau déroulant avec animation
- Indicateur de progression pendant l'export
- Message de succès avec auto-fermeture
- Stats affichées (25 questions, 150 textes UI)

---

## 📊 Statistiques et rapports

### TranslationStatistics

**Fichier** : `/components/dashboard/TranslationStatistics.tsx`

Dashboard complet de progression avec 4 sections :

#### 1. Statistiques globales (4 cards)
- **Progression globale** : % de traductions complètes
- **Validées** : % de traductions validées manuellement
- **Langues** : Nombre de langues actives + flags
- **Auto-générées** : Nombre de traductions nécessitant validation

#### 2. Progression par langue
**Composant** : `LanguageProgressIndicator`

Cards interactives pour chaque langue avec :
- Flag + nom + code ISO
- Barre de progression colorée
- Stats détaillées (Total / Validés / Auto)
- Badge qualité si 100% complété
- Clic → Filtre la langue dans QuestionTranslation

**Code couleur** :
```
🔴 0-50%    - Non démarré / Début
🟠 50-75%   - En cours
🔵 75-99%   - Avancé
🟢 100%     - Complété
```

#### 3. Métriques de qualité (3 cards)
- **Taux de qualité** : % validations humaines
- **Questions complètes** : Nb de questions traduites dans TOUTES les langues
- **Couverture pays** : Nb de pays européens couverts (30)

#### 4. Recommandations intelligentes
Alertes contextuelles basées sur l'état :
- Priorisation EN/DE/ES si < 50%
- Validation urgente si > 10 auto-traductions
- Encouragements si progression > 80%

---

## 🛠️ Architecture technique

### Stack technologique
- **React** : 18+ avec hooks
- **TypeScript** : Typage strict
- **Motion (Framer Motion)** : Animations fluides
- **Tailwind CSS** : Design system YOJOB
- **ShadCN UI** : Composants de base
- **Lucide React** : Icônes

### Structure des données

**Translation** :
```typescript
interface Translation {
  text: string;
  status: 'missing' | 'validated' | 'auto-mcp' | 'auto-api';
}
```

**QuestionTranslations** :
```typescript
interface QuestionTranslations {
  [questionId: string]: {
    [langCode: string]: Translation;
  };
}
```

### Routes API Supabase (10)

**Questions** :
- `GET /translations/questions` - Toutes les traductions
- `GET /translations/questions/:id` - Une question
- `POST /translations/questions/:id` - Créer
- `PUT /translations/questions/:id` - Mettre à jour

**UI Texts** :
- `GET /translations/ui-texts` - Tous les textes
- `GET /translations/ui-texts/:key` - Un texte
- `POST /translations/ui-texts` - Créer
- `PUT /translations/ui-texts/:key` - Mettre à jour

**Pays-Langues** :
- `GET /translations/country-languages` - Tous les mappings
- `PUT /translations/country-languages/:code` - Mettre à jour un pays

### Hook i18n personnalisé

**Fichier** : `/hooks/useI18n.ts`

```typescript
const { t, locale, setLocale, availableLocales } = useI18n();

// Utilisation
t('common.submit')  // → Texte traduit
t('questions.q1')   // → Question traduite
```

---

## 🎨 Design system appliqué

### Palette de couleurs YOJOB

**Traductions** :
- **Bleu** `#1E3A8A` : Source (français)
- **Cyan** `#06B6D4` : Traductions validées
- **Violet** `#7C3AED` : IA / Automatique
- **Vert** `#10B981` : Succès / Complété
- **Orange** `#F59E0B` : Attention / À valider
- **Rouge** `#EF4444` : Manquant / Erreur

### Effets visuels

**Glassmorphism** :
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

**Animations Motion** :
```tsx
// Apparition standard
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

// Hover scale
whileHover={{ scale: 1.05 }}

// Stagger (liste)
transition={{ delay: idx * 0.05 }}
```

---

## 📦 Composants utilitaires

### HorizontalScrollHint
- Indicateur de scroll avec flèche animée
- Auto-masquage intelligent
- Réapparition sur hover

### CharacterCounter
- Comptage en temps réel
- Comparaison avec source
- Warnings visuels

### TranslationKeyboardShortcuts
- Panneau d'aide interactif
- Détection globale des touches
- LocalStorage pour préférences

### QuickTranslationExport
- Export JSON/CSV instantané
- Panneau flottant animé
- Feedback visuel

### LanguageProgressIndicator
- Cards interactives par langue
- Progression colorée
- Métriques détaillées

---

## 🚦 États et statuts

### Statuts de traduction

| Statut | Description | Badge | Priorité |
|--------|-------------|-------|----------|
| `missing` | Aucune traduction | 🔴 À traduire | Haute |
| `auto-mcp` | Généré par Claude | 🟣 Auto-MCP | Moyenne |
| `auto-api` | Généré par API | 🔵 Auto-API | Moyenne |
| `validated` | Validé manuellement | 🟢 Validé | - |

### Statuts UI

- ✅ **Sauvegardé** : Persistance réussie
- ⏳ **Sauvegarde...** : En cours
- ⚠️ **À valider** : Traduction auto à vérifier
- ❌ **Erreur** : Échec de l'opération

---

## 🔄 Workflow recommandé

### 1. Configuration initiale
1. Accéder à **Pays & langues**
2. Vérifier le mapping pays → langues
3. Ajuster si nécessaire pour vos campagnes

### 2. Traduction des questions
1. Ouvrir **Questions**
2. Utiliser **Générer traductions manquantes** (MCP ou API)
3. Valider/Corriger les traductions automatiques
4. Utiliser `Ctrl+S` pour sauvegarder rapidement

### 3. Traduction de l'interface
1. Ouvrir **Interface**
2. Sélectionner langue cible
3. Traduire par catégorie (Buttons → Labels → Messages)
4. Valider chaque traduction

### 4. Vérification qualité
1. Ouvrir **Statistiques**
2. Vérifier progression par langue
3. Identifier les langues incomplètes
4. Cliquer sur langue pour filtrer et compléter

### 5. Export et déploiement
1. Utiliser le bouton **Export rapide** (bottom-right)
2. Télécharger JSON pour l'app
3. Télécharger CSV pour backup/révision
4. Déployer les traductions

---

## 🎯 Prochaines améliorations

### Court terme
- [ ] Navigation clavier Tab/Shift+Tab entre cellules
- [ ] Auto-save sur Ctrl+S
- [ ] Undo/Redo (Ctrl+Z / Ctrl+Y)
- [ ] Copier/Coller entre cellules
- [ ] Mode plein écran pour traduction

### Moyen terme
- [ ] Intégration réelle API DeepL
- [ ] Intégration MCP Claude via Anthropic API
- [ ] Système de commentaires par traduction
- [ ] Historique des modifications
- [ ] Suggestions contextuelles IA

### Long terme
- [ ] Collaboration multi-utilisateur
- [ ] Workflow d'approbation (traducteur → reviewer)
- [ ] Glossaire terminologique partagé
- [ ] Détection automatique de cohérence
- [ ] Export format i18next, react-intl, etc.

---

## 📚 Ressources

### Documentation externe
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [ISO 3166-1 Country Codes](https://en.wikipedia.org/wiki/ISO_3166-1)
- [DeepL API Docs](https://www.deepl.com/pro-api)
- [Framer Motion API](https://www.framer.com/motion/)

### Fichiers clés du projet
- `/Guidelines.md` - Design system YOJOB
- `/context/QuestionsContext.tsx` - Gestion globale des questions
- `/hooks/useI18n.ts` - Hook de traduction
- `/supabase/functions/server/index.tsx` - API Backend

---

## 🤝 Contribution

Pour ajouter une nouvelle langue :

1. **Ajouter dans `LANGUAGES`** (tous les fichiers de traduction)
```typescript
{ code: 'ro', name: 'Română', flag: '🇷🇴' }
```

2. **Mettre à jour `CountryLanguageManager`**
```typescript
availableLanguages = [...availableLanguages, 'ro'];
```

3. **Initialiser les traductions**
```typescript
initialTranslations[questionId] = {
  ...initialTranslations[questionId],
  ro: { text: '', status: 'missing' }
};
```

4. **Tester l'interface**
- Vérifier scroll horizontal
- Tester génération automatique
- Valider export JSON/CSV

---

**Version** : 1.0  
**Date** : 29 Novembre 2024  
**Auteur** : Équipe YOJOB Dev  
**Licence** : Propriétaire YOJOB
