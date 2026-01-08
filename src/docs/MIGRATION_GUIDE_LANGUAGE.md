# 📖 Guide de migration - Système de langue unifié

## 🎯 Objectif

Ce guide explique comment migrer une page existante vers le nouveau système de langue unifié avec auto-détection et persistance.

---

## ✅ Checklist de migration

- [ ] Importer `useLanguageManager`
- [ ] Remplacer `useState` par le hook
- [ ] Mettre à jour les `LanguageSelector`
- [ ] Tester l'auto-détection
- [ ] Tester la persistance
- [ ] Tester la synchronisation inter-pages

---

## 📝 Migration étape par étape

### Avant (ancien système)

```tsx
import { useState } from 'react';
import { LanguageSelector } from './components/landing/LanguageSelector';
import { useServiceTranslation } from './src/i18n/services/useServiceTranslation';
import type { SupportedLanguage } from './src/i18n/types';

export default function MaPage() {
  // ❌ État local, pas d'auto-détection, pas de persistance
  const [language, setLanguage] = useState<SupportedLanguage>('fr');
  
  const t = useServiceTranslation('interimEuropeen', language);

  return (
    <div>
      <h1>{t.hero.title}</h1>
      
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
        availableLanguages={['fr', 'en', 'de', ...]}
      />
    </div>
  );
}
```

### Après (nouveau système)

```tsx
import { LanguageSelector } from './components/landing/LanguageSelector';
import { useServiceTranslation } from './src/i18n/services/useServiceTranslation';
import { useLanguageManager } from './hooks/useLanguageManager'; // ⬅️ AJOUT
import type { SupportedLanguage } from './src/i18n/types';

export default function MaPage() {
  // ✅ Auto-détection + persistance + synchronisation
  const { 
    currentLanguage, 
    setLanguage,
    isReady 
  } = useLanguageManager();
  
  const t = useServiceTranslation('interimEuropeen', currentLanguage as SupportedLanguage);

  // Optionnel : Afficher un loader pendant l'initialisation
  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{t.hero.title}</h1>
      
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
        availableLanguages={['fr', 'en', 'de', ...]}
      />
    </div>
  );
}
```

---

## 🔧 Modifications détaillées

### 1. Import du hook

```diff
+ import { useLanguageManager } from './hooks/useLanguageManager';
```

### 2. Remplacement de useState

```diff
- const [language, setLanguage] = useState<SupportedLanguage>('fr');
+ const { currentLanguage, setLanguage, isReady } = useLanguageManager();
```

### 3. Mise à jour des traductions

```diff
- const t = useServiceTranslation('interimEuropeen', language);
+ const t = useServiceTranslation('interimEuropeen', currentLanguage as SupportedLanguage);
```

### 4. Mise à jour du LanguageSelector

```diff
  <LanguageSelector
-   currentLanguage={language}
+   currentLanguage={currentLanguage}
    onLanguageChange={setLanguage}
    availableLanguages={['fr', 'en', 'de', ...]}
  />
```

### 5. Mise à jour du Footer (si applicable)

```diff
- <Footer content={footerTranslations[language]} />
+ <Footer content={footerTranslations[currentLanguage as SupportedLanguage]} />
```

---

## 🎨 Cas spéciaux

### Landing Page avec Supabase

La landing page utilise **deux hooks** :
1. `useLanguageManager` - Gère la langue courante
2. `useLandingTranslations` - Charge les traductions depuis Supabase

```tsx
// Hook unifié pour la langue
const {
  currentLanguage: globalLanguage,
  setLanguage: setGlobalLanguage,
  isReady: languageReady,
} = useLanguageManager();

// Hook pour les traductions Supabase
const {
  translations,
  currentLanguage,
  setLanguage,
  availableLanguages,
  isLoading,
  error,
  refresh,
} = useLandingTranslations(globalLanguage);

// Synchronisation entre les deux
useEffect(() => {
  if (languageReady && globalLanguage !== currentLanguage) {
    setLanguage(globalLanguage);
  }
}, [globalLanguage, languageReady]);
```

### Pourquoi deux variables ?

- `globalLanguage` : Langue détectée par `useLanguageManager`
- `currentLanguage` : Langue des traductions Supabase chargées

---

## 🧪 Tests post-migration

### Test 1 : Auto-détection

1. Ouvrir DevTools → Console
2. Exécuter : `localStorage.removeItem('yojob_preferred_language')`
3. Recharger la page
4. Vérifier que la page s'affiche dans la langue du navigateur

**Exemple** : Navigateur en polonais → Page en polonais

### Test 2 : Persistance

1. Changer la langue via le sélecteur (ex: Anglais)
2. Recharger la page (F5)
3. Vérifier que la langue reste en anglais

### Test 3 : Synchronisation

1. Aller sur la Landing Page
2. Changer la langue (ex: Allemand)
3. Naviguer vers la page migrée
4. Vérifier que la page est en allemand

### Test 4 : URL Parameter

1. Ajouter `?lang=pl` à l'URL
2. Vérifier que la page s'affiche en polonais
3. Le choix est sauvegardé dans localStorage

---

## ⚠️ Points d'attention

### Type casting

Le hook retourne `string` mais les traductions attendent `SupportedLanguage` :

```tsx
// ✅ Bon
const t = useServiceTranslation('interimEuropeen', currentLanguage as SupportedLanguage);

// ❌ Erreur TypeScript
const t = useServiceTranslation('interimEuropeen', currentLanguage);
```

### État de chargement

Le hook expose `isReady` pour éviter les flashs de contenu :

```tsx
const { currentLanguage, isReady } = useLanguageManager();

if (!isReady) {
  return <Loader />; // Optionnel
}
```

### localStorage indisponible

Le hook gère automatiquement les erreurs localStorage (mode privé, etc.) avec des `try/catch`.

---

## 📊 Comparaison avant/après

| Fonctionnalité | Avant | Après |
|----------------|-------|-------|
| Auto-détection | ❌ | ✅ |
| Persistance | ❌ | ✅ |
| Synchronisation | ❌ | ✅ |
| URL parameter | ❌ | ✅ |
| Fallback intelligent | ❌ | ✅ |

---

## 🚀 Pages déjà migrées

- ✅ Landing Page (`/App-Landing.tsx`)
- ✅ Service Intérim Européen (`/ServiceInterimEuropeen.tsx`)

## 📋 Pages à migrer

- ⬜ Autres pages services (Recrutement Spécialisé, Conseil & Conformité, etc.)
- ⬜ Formulaire multi-étapes
- ⬜ Pages admin

---

## 🆘 Aide et support

### Problème : La langue ne se synchronise pas

**Solution** : Vérifier que toutes les pages utilisent bien `useLanguageManager` et non `useState` local.

### Problème : Erreur TypeScript sur SupportedLanguage

**Solution** : Ajouter `as SupportedLanguage` lors de l'appel à `useServiceTranslation`.

### Problème : Flash de contenu en français

**Solution** : Utiliser `isReady` pour afficher un loader pendant l'initialisation.

---

**Version** : 1.0.0  
**Date** : Janvier 2025  
**Auteur** : Équipe YOJOB Dev
