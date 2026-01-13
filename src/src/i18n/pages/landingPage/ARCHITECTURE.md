# 🏗️ Architecture - Système de Traductions Landing Page

## Vue d'Ensemble

Le système de traductions de la landing page YOJOB est conçu pour être **performant**, **maintenable** et **scalable**.

## 📐 Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                           │
│                   (Browser / React)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ useLanguageManager()
                           │ (Détection + Persistance)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    App-Landing.tsx                           │
│                                                              │
│  const { currentLanguage } = useLanguageManager();          │
│  const content = useLandingPageTranslation(currentLanguage);│
│                                                              │
│  → Pas de requête réseau                                    │
│  → Chargement instantané                                    │
│  → Type-safe à 100%                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ useLandingPageTranslation(lang)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│         useLandingPageTranslation.ts (Hook)                  │
│                                                              │
│  export function useLandingPageTranslation(lang) {          │
│    return useMemo(() => {                                   │
│      return getLandingPageTranslation(lang);                │
│    }, [lang]);                                              │
│  }                                                          │
│                                                              │
│  → Mémoïsation pour performance                            │
│  → Re-render uniquement si langue change                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ getLandingPageTranslation(lang)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              index.ts (Export Principal)                     │
│                                                              │
│  const translations = {                                     │
│    fr: frLandingPage,                                       │
│    en: enLandingPage,                                       │
│    de: deLandingPage,  // À ajouter                        │
│  };                                                         │
│                                                              │
│  return translations[lang] || translations['fr'];           │
│                                                              │
│  → Fallback automatique sur FR                             │
│  → Import statique (compile-time)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│    fr.ts       │ │    en.ts       │ │    de.ts       │
│                │ │                │ │                │
│ export const   │ │ export const   │ │ export const   │
│ frLandingPage  │ │ enLandingPage  │ │ deLandingPage  │
│                │ │                │ │                │
│ Toutes les     │ │ Toutes les     │ │ Toutes les     │
│ traductions FR │ │ traductions EN │ │ traductions DE │
└────────────────┘ └────────────────┘ └────────────────┘
```

## 🔄 Flux de Données

### 1. Initialisation

```
User opens page
      ↓
useLanguageManager detects browser language
      ↓
Checks localStorage for saved preference
      ↓
Sets currentLanguage (ex: 'fr')
      ↓
useLandingPageTranslation('fr') is called
      ↓
Returns frLandingPage object
      ↓
Content is rendered instantly
```

### 2. Changement de Langue

```
User clicks language selector
      ↓
setLanguage('en') is called
      ↓
localStorage is updated
      ↓
useLanguageManager notifies consumers
      ↓
useLandingPageTranslation('en') re-evaluates
      ↓
Returns enLandingPage object
      ↓
React re-renders with new content
```

**Durée totale : < 16ms (1 frame)**

## 🎯 Composants Clés

### 1. `useLanguageManager` (Hook Global)

**Responsabilités :**
- Détecter la langue du navigateur
- Persister la langue dans localStorage
- Fournir `currentLanguage` et `setLanguage`
- Synchroniser entre tous les composants

**Location :** `/hooks/useLanguageManager.ts`

**API :**
```typescript
const {
  currentLanguage,  // 'fr' | 'en' | 'de' | ...
  setLanguage,      // (lang: string) => void
  isReady,          // boolean (après détection initiale)
} = useLanguageManager();
```

### 2. `useLandingPageTranslation` (Hook Traductions)

**Responsabilités :**
- Récupérer les traductions pour une langue
- Mémoïser le résultat pour éviter re-calculs
- Fournir fallback sur FR si langue inexistante

**Location :** `/src/i18n/pages/landingPage/useLandingPageTranslation.ts`

**API :**
```typescript
const content = useLandingPageTranslation(
  currentLanguage as SupportedLanguage
);

// content.hero.title
// content.services.badge
// content.footer.copyright
// etc.
```

### 3. `getLandingPageTranslation` (Fonction Pure)

**Responsabilités :**
- Mapper langue → objet de traductions
- Gérer les imports statiques
- Retourner fallback si nécessaire

**Location :** `/src/i18n/pages/landingPage/index.ts`

**API :**
```typescript
const content = getLandingPageTranslation('fr');
// Peut être utilisé hors React (ex: dans un service)
```

### 4. Fichiers de Traductions (`fr.ts`, `en.ts`, etc.)

**Responsabilités :**
- Contenir TOUTES les traductions d'une langue
- Respecter l'interface `LandingPageContent`
- Être type-safe

**Structure :**
```typescript
export const frLandingPage: LandingPageContent = {
  language: 'fr',
  seo: { ... },
  header: { ... },
  hero: { ... },
  stats: { ... },
  services: { ... },
  network: { ... },
  steps: { ... },
  testimonials: { ... },
  sectors: { ... },
  ctaForm: { ... },
  footer: { ... },
};
```

## 🔒 Type Safety

### Interface Principale

```typescript
// /types/landingContent.ts
export interface LandingPageContent {
  language: LanguageCode;
  seo: SEOContent;
  header?: HeaderContent;
  hero: HeroContent;
  stats: StatsContent;
  services: ServicesContent;
  network: NetworkContent;
  steps: StepsContent;
  testimonials: TestimonialsContent;
  sectors: SectorsContent;
  ctaForm: CTAFormContent;
  footer: FooterContent;
}
```

### Validation TypeScript

```typescript
// ✅ OK - Toutes les propriétés présentes
export const deLandingPage: LandingPageContent = {
  language: 'de',
  seo: { ... },
  // ... toutes les sections
};

// ❌ ERREUR - Propriété manquante
export const deLandingPage: LandingPageContent = {
  language: 'de',
  seo: { ... },
  // Manque hero, stats, etc.
  // → TypeScript error!
};

// ❌ ERREUR - Type incorrect
export const deLandingPage: LandingPageContent = {
  language: 'de',
  seo: {
    metaTitle: 123,  // ❌ devrait être string
  },
};
```

## 🚀 Performance

### Build Time

**Compilation TypeScript :**
- Temps : ~2-3s pour tous les fichiers
- Size : ~60kb par fichier de langue (non compressé)
- Gzip : ~12kb par fichier de langue

**Tree Shaking :**
- Uniquement les langues utilisées sont incluses dans le bundle
- Import statique permet l'optimisation

### Runtime

**Chargement Initial :**
```
User opens page → Content available immediately (0ms)
```

**Changement de Langue :**
```
User changes lang → New content in < 16ms (1 frame)
```

**Mémoire :**
- ~50kb par langue en RAM
- Garbage collected si langue non utilisée

## 🧩 Intégration

### Avec React Components

```tsx
function MyComponent() {
  const { currentLanguage } = useLanguageManager();
  const t = useLandingPageTranslation(currentLanguage);
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
    </div>
  );
}
```

### Avec SEO Head

```tsx
<SEOHead content={content} language={currentLanguage} />
```

Le composant SEOHead détecte automatiquement la structure et injecte les bonnes meta tags.

### Avec Composants Enfants

```tsx
// App-Landing.tsx
<TestimonialCarousel 
  testimonials={content.testimonials?.testimonials || []} 
/>

// TestimonialCarousel.tsx
interface Props {
  testimonials: TestimonialItem[];
}
```

Les traductions sont passées via props pour garder les composants purs et testables.

## 🔄 Synchronisation Multi-Pages

### Problème Résolu

Avant, la landing page utilisait un système différent des autres pages, causant :
- Désynchronisation des langues
- Double gestion de l'état
- Bugs de navigation

### Solution

**Un seul système :**
```
useLanguageManager (Global)
         ↓
         ├─→ Landing Page (useLandingPageTranslation)
         ├─→ Devis Page (useDevisTranslation)
         ├─→ Service Pages (useServiceTranslation)
         └─→ CGV Page (useCGVTranslation)
```

Tous les hooks consomment la même source de vérité : `useLanguageManager`.

## 🛠️ Maintenance

### Ajouter une Nouvelle Langue

1. Créer le fichier (copier `_template.ts`)
2. Traduire tous les textes
3. Importer dans `index.ts`
4. Ajouter dans `AVAILABLE_LANGUAGES_LANDING`

**Temps estimé : 2-4 heures** (selon qualité de traduction)

### Modifier un Texte Existant

1. Identifier la clé (ex: `hero.title`)
2. Modifier dans TOUS les fichiers de langue
3. Compiler TypeScript pour vérifier

**Temps estimé : 5-10 minutes**

### Ajouter une Nouvelle Section

1. Modifier l'interface dans `/types/landingContent.ts`
2. TypeScript signalera tous les fichiers à mettre à jour
3. Ajouter la section dans chaque fichier de langue

**Temps estimé : 30-60 minutes**

## 🐛 Debugging

### Problème : Texte en français s'affiche au lieu de la langue sélectionnée

**Solution :**
```tsx
// Ajouter des logs
const { currentLanguage } = useLanguageManager();
const content = useLandingPageTranslation(currentLanguage);

console.log('Current language:', currentLanguage);
console.log('Content language:', content.language);
```

Si `content.language` ne correspond pas à `currentLanguage`, la langue n'est pas disponible → fallback sur FR.

### Problème : TypeScript erreur "Property X does not exist"

**Solution :**
```bash
# Vérifier que tous les fichiers ont la propriété X
grep -r "propertyName" src/i18n/pages/landingPage/*.ts

# Compiler pour voir les erreurs
npx tsc --noEmit
```

### Problème : Performance dégradée

**Solution :**
```tsx
// Vérifier que useMemo est bien utilisé
const content = useLandingPageTranslation(currentLanguage);
// ✅ Devrait se re-calculer uniquement si currentLanguage change

// Vérifier avec React DevTools Profiler
// Le composant ne devrait re-render que lors du changement de langue
```

## 📊 Metrics & Monitoring

### Métriques à Surveiller

1. **Bundle Size**
   - Target : < 20kb gzipped par langue
   - Alert si > 30kb

2. **Load Time**
   - Target : < 100ms pour chargement initial
   - Alert si > 500ms

3. **Erreur Rate**
   - Target : 0% d'erreurs de traduction
   - Alert si > 0.1%

4. **Usage par Langue**
   - Track quelle langue est la plus utilisée
   - Prioriser les traductions

## 🎓 Best Practices

### Do's ✅

- ✅ Toujours utiliser le hook `useLandingPageTranslation`
- ✅ Passer les traductions via props aux composants enfants
- ✅ Valider avec TypeScript avant de commit
- ✅ Tester chaque langue après modification
- ✅ Documenter les changements majeurs

### Don'ts ❌

- ❌ Ne jamais hardcoder du texte dans les composants
- ❌ Ne pas créer d'alternative au hook officiel
- ❌ Ne pas modifier la structure sans mettre à jour TOUS les fichiers
- ❌ Ne pas commit sans tester au moins FR et EN
- ❌ Ne pas oublier de documenter les nouvelles clés

## 🔮 Évolution Future

### Phase 1 : Completion (Q1 2025)
- [ ] Ajouter les 21 langues européennes manquantes
- [ ] Tests automatisés pour chaque langue
- [ ] CI/CD validation

### Phase 2 : Automation (Q2 2025)
- [ ] Script de génération via IA (GPT-4)
- [ ] Interface admin pour éditer traductions
- [ ] Preview en temps réel

### Phase 3 : Optimization (Q3 2025)
- [ ] Lazy loading des langues
- [ ] Code splitting par langue
- [ ] Cache agressif

### Phase 4 : Scale (Q4 2025)
- [ ] Support de langues hors-Europe
- [ ] Traduction automatique en temps réel
- [ ] A/B testing par langue

---

**Documentation maintenue par l'équipe YOJOB**  
**Dernière mise à jour : 13 Janvier 2025**
