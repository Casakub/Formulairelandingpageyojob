# 🌍 Guide de Migration - Traductions Landing Page YOJOB

## 📋 Vue d'ensemble

Ce guide vous explique comment migrer vos traductions de la landing page de **localStorage** vers **Supabase** pour activer le système multilingue complet (23 langues européennes).

---

## ✅ Étapes de migration

### **Étape 1 : Exécuter la migration SQL dans Supabase**

1. Ouvrez votre **Supabase Dashboard** : https://supabase.com/dashboard
2. Sélectionnez votre projet YOJOB
3. Allez dans **SQL Editor** (dans le menu de gauche)
4. Cliquez sur **New Query**
5. Copiez-collez le contenu du fichier `/supabase/migrations/11_landing_translations_table.sql`
6. Cliquez sur **Run** pour exécuter la migration
7. ✅ La table `landing_translations` est maintenant créée !

---

### **Étape 2 : Migrer vos traductions existantes**

1. Ouvrez votre application YOJOB
2. Connectez-vous au **Dashboard Admin** : `/admin`
   - Email : `a.auger@yojob.fr`
   - Mot de passe : `Adeole@33700`

3. Allez dans l'onglet **⚙️ Paramètres** (dans le menu de gauche)

4. Vous verrez une card **"Migration vers Supabase"** en haut de la page avec :
   - Nombre de langues détectées dans localStorage
   - Liste des langues à migrer
   - Bouton **"Lancer la migration"**

5. Cliquez sur **"Lancer la migration"**
   - Une barre de progression s'affiche en temps réel
   - Chaque langue est migrée une par une vers Supabase
   - Un rapport détaillé s'affiche à la fin (succès/erreurs)

6. ✅ Vos traductions sont maintenant dans Supabase !

---

### **Étape 3 : Vérifier que tout fonctionne**

1. Retournez sur la **landing page** : `/`

2. Vous devriez voir :
   - ✅ Un **sélecteur de langue élégant** avec drapeaux dans le header
   - ✅ Un badge vert **"Traductions Live • X langues"** dans le footer
   - ✅ La page se charge depuis Supabase (et non localStorage)

3. Testez le changement de langue :
   - Cliquez sur le sélecteur de langue
   - Choisissez une langue (ex: 🇬🇧 English, 🇩🇪 Deutsch, 🇪🇸 Español)
   - La page se met à jour instantanément
   - Votre choix est mémorisé pour votre prochaine visite

---

## 🎯 Fonctionnalités activées après la migration

### **1. Sélecteur de langue intelligent**
- 🌍 **23 langues européennes** disponibles
- 🎨 Interface élégante avec drapeaux et noms natifs
- 📱 Version desktop ET mobile responsive
- 💾 Mémorisation de la préférence utilisateur

### **2. Détection automatique**
- 🔍 Détecte la langue du navigateur au premier chargement
- 🔗 Support des paramètres URL (`?lang=en`)
- 💿 Fallback intelligent si la langue n'existe pas

### **3. Système de traduction IA (déjà en place)**
- 🤖 Traduction automatique avec **Claude 3.5 Sonnet**
- ✏️ Validation manuelle dans le CMS
- 📊 Suivi de progression par langue
- 🎯 Workflow : NOT_STARTED → AI_PROPOSED → IN_REVIEW → VALIDATED

### **4. Performance optimisée**
- ⚡ Cache localStorage pour accès offline
- 🚀 Chargement asynchrone depuis Supabase
- 🔄 Écran de chargement élégant pendant le fetch
- 🎨 Animations fluides Motion/Framer

---

## 🔧 Architecture technique

### **Backend API Routes**

Toutes les routes sont préfixées par `/make-server-10092a63/landing/` :

| Route | Méthode | Description |
|-------|---------|-------------|
| `/languages` | GET | Liste de toutes les langues disponibles |
| `/:lang` | GET | Récupérer une traduction spécifique |
| `/:lang` | POST | Créer/mettre à jour une traduction |
| `/:lang` | DELETE | Supprimer une traduction |
| `/all` | GET | Toutes les traductions en une fois |
| `/bulk-upload` | POST | Upload massif de traductions |

### **Hooks React**

#### `useLandingTranslations(initialLanguage)`
Hook principal pour gérer les traductions :

```typescript
const {
  translations,        // Record<string, LandingPageContent>
  currentLanguage,     // string (ex: 'fr', 'en')
  setLanguage,         // (lang: string) => void
  availableLanguages,  // string[] (ex: ['fr', 'en', 'de'])
  isLoading,           // boolean
  error,               // string | null
  refresh,             // () => Promise<void>
  saveTranslation,     // (lang, content, options) => Promise<void>
} = useLandingTranslations('fr');
```

#### `useLandingTranslation(language)`
Hook simplifié pour charger une seule langue :

```typescript
const {
  content,    // LandingPageContent | null
  isLoading,  // boolean
  error,      // string | null
} = useLandingTranslation('en');
```

### **Composants UI**

#### `<LanguageSelector />`
```tsx
<LanguageSelector
  currentLanguage="fr"
  onLanguageChange={(lang) => setLanguage(lang)}
  availableLanguages={['fr', 'en', 'de', 'es']}
  variant="default" // ou "mobile"
/>
```

---

## 🎨 Utilisation du CMS de traduction

### **Accéder au CMS**

1. Dashboard → **📝 Traductions** (onglet dans le menu)
2. Choisir l'onglet **"Landing Page"**

### **Traduire une nouvelle langue**

1. Dans la **Bloc B - Gestion des langues** (colonne de droite)
2. Trouvez la langue cible (ex: 🇩🇪 Deutsch)
3. Cliquez sur **"Traduire avec l'IA"**
4. Claude traduit automatiquement tous les textes (~30 secondes)
5. Un toast de succès apparaît : **"✅ Traduction DE terminée !"**
6. L'éditeur s'ouvre automatiquement pour validation

### **Valider/Modifier une traduction**

1. Cliquez sur **"Ouvrir l'éditeur"** à côté de la langue
2. Interface avec 3 colonnes :
   - **Gauche** : Texte source (français)
   - **Centre** : Proposition IA (si disponible)
   - **Droite** : Texte traduit actuel
3. Pour chaque clé :
   - ✅ Valider la proposition IA
   - ✏️ Modifier manuellement
   - ❌ Rejeter et réécrire
4. Cliquez sur **"Sauvegarder"** en haut

### **Statuts de traduction**

| Statut | Badge | Description |
|--------|-------|-------------|
| `NOT_STARTED` | ⚪ Non traduit | Langue jamais traduite |
| `AI_PROPOSED` | 🟣 Proposition IA | Traduit par IA, en attente de validation |
| `IN_REVIEW` | 🟡 En révision | Partiellement validé |
| `VALIDATED` | 🟢 Validé | 100% validé, prêt pour production |

---

## 📊 Données stockées dans Supabase

### **Table : `landing_translations`**

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique |
| `language_code` | VARCHAR(5) | Code ISO 639-1 (fr, en, de...) |
| `content` | JSONB | Contenu complet de la landing page |
| `translation_status` | VARCHAR(20) | draft, published |
| `translation_progress` | INTEGER | Progression 0-100% |
| `translated_by` | VARCHAR(20) | manual, ai, bulk_upload |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Date de dernière modification |

### **Structure du JSON `content`**

```json
{
  "seo": {
    "metaTitle": "YOJOB - Votre partenaire recrutement européen",
    "metaDescription": "Description...",
    "slug": "/fr",
    "h1": "Titre H1",
    "aiSummary": "Résumé pour les IA",
    "faq": [...]
  },
  "hero": {
    "badge": "⭐ Leader du recrutement européen",
    "title": "Votre partenaire pour recruter en Europe",
    "subtitle": "Description...",
    "benefits": ["Bénéfice 1", "Bénéfice 2", ...],
    "ctaPrimaryLabel": "Demander un devis",
    "ctaSecondaryLabel": "Découvrir notre réseau"
  },
  "services": { ... },
  "network": { ... },
  "steps": { ... },
  "testimonials": { ... },
  "sectors": { ... },
  "ctaForm": { ... },
  "footer": { ... }
}
```

---

## 🚨 Résolution de problèmes

### **Problème : Écran "Aucune traduction disponible"**

**Cause** : La table Supabase est vide (migration pas encore effectuée)

**Solution** :
1. Vérifiez que la migration SQL (Étape 1) est bien exécutée
2. Lancez la migration depuis Dashboard → Paramètres (Étape 2)

---

### **Problème : Erreur lors de la migration**

**Causes possibles** :
- Clé API Supabase invalide
- Table `landing_translations` pas créée
- Problème de permissions

**Solution** :
1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez que la table existe dans Supabase Dashboard → Table Editor
3. Réexécutez la migration SQL si nécessaire

---

### **Problème : Le sélecteur de langue ne s'affiche pas**

**Causes possibles** :
- Traductions pas encore migrées
- Erreur JavaScript dans la console

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Vérifiez s'il y a des erreurs rouges
3. Vérifiez que `availableLanguages` contient bien des langues

---

### **Problème : Traduction IA échoue**

**Causes possibles** :
- Clé API Anthropic manquante ou invalide
- Solde de crédits insuffisant

**Solution** :
1. Dashboard → Paramètres → Configuration IA
2. Testez la clé API avec le bouton "Tester"
3. Si erreur "credit balance too low" :
   - Allez sur https://console.anthropic.com/settings/plans
   - Ajoutez des crédits ($10 minimum recommandé)

---

## 📈 Prochaines étapes

### **1. Traduire toutes les langues cibles**

Pour chaque langue européenne dont vous avez besoin :
1. Dashboard → Traductions → Landing Page
2. Cliquez sur "Traduire avec l'IA"
3. Validez les traductions dans l'éditeur
4. Publiez

### **2. Optimiser le SEO multilingue**

Pour chaque langue, personnalisez :
- `metaTitle` (60 caractères max)
- `metaDescription` (160 caractères max)
- `aiSummary` (500 caractères pour ChatGPT/Perplexity)
- FAQ structurée

### **3. Tester l'expérience utilisateur**

- Testez chaque langue sur desktop ET mobile
- Vérifiez que tous les textes s'affichent correctement
- Testez la détection automatique de langue
- Vérifiez les performances de chargement

### **4. Ajouter des traductions personnalisées**

Si certaines traductions IA ne sont pas parfaites :
1. Ouvrez l'éditeur pour la langue
2. Modifiez manuellement les textes
3. Marquez comme "Validé" ✅

---

## 🎯 Résumé

✅ **Avant la migration** :
- Traductions en localStorage (limitées)
- Seulement FR/EN
- Pas de synchronisation

✅ **Après la migration** :
- Traductions dans Supabase (scalable)
- 23 langues européennes
- Traduction IA automatique
- Workflow de validation
- Sélecteur de langue élégant
- Détection automatique
- Statistiques de progression

---

**Besoin d'aide ?** Consultez les logs dans le Dashboard → Paramètres → Configuration IA

**Date de création** : 8 Décembre 2024  
**Version** : 1.0
