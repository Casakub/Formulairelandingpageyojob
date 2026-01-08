# 🌍 Système de gestion des langues YOJOB

## Vue d'ensemble

Le site YOJOB dispose d'un système de gestion de langue **unifié et automatique** qui fonctionne sur toutes les pages.

### ✅ Fonctionnalités

- **Auto-détection** : Détecte automatiquement la langue du navigateur de l'utilisateur
- **Persistance** : Le choix de langue est sauvegardé et persiste entre les sessions
- **Synchronisation** : Changer la langue sur une page la change partout
- **23 langues européennes** : FR, EN, DE, ES, IT, NL, PT, PL, CS, SK, HU, RO, BG, HR, SL, ET, LV, LT, EL, SV, DA, FI, NO

---

## 🏗️ Architecture

### Hook principal : `useLanguageManager`

**Fichier** : `/hooks/useLanguageManager.ts`

**Responsabilité** : Gérer la langue courante pour tout le site

```typescript
const { currentLanguage, setLanguage, isReady } = useLanguageManager();
```

#### Détection automatique (ordre de priorité)

1. **localStorage** (`yojob_preferred_language`) - Choix manuel précédent
2. **URL parameter** (`?lang=pl`) - Paramètre dans l'URL
3. **Navigateur** (`navigator.language`) - Langue du navigateur
4. **Fallback** - Anglais puis français

### Systèmes de traduction

Le site utilise **deux systèmes de traduction différents** mais partage la **même langue courante** :

#### 1. Landing Page
- **Hook** : `useLandingTranslations` 
- **Source** : Base de données Supabase
- **Usage** : Traductions éditables en ligne

#### 2. Pages Services
- **Hook** : `useServiceTranslation`
- **Source** : Fichiers TypeScript statiques (`/src/i18n/services/`)
- **Usage** : Traductions intégrées au code

---

## 📝 Utilisation

### Dans un composant existant

```tsx
import { useLanguageManager } from './hooks/useLanguageManager';
import { useServiceTranslation } from './src/i18n/services/useServiceTranslation';

export default function MaNouvellePage() {
  // 1. Obtenir la langue courante
  const { currentLanguage, setLanguage, isReady } = useLanguageManager();

  // 2. Charger les traductions
  const t = useServiceTranslation('interimEuropeen', currentLanguage);

  // 3. Utiliser dans le JSX
  return (
    <div>
      <h1>{t.hero.title}</h1>
      
      {/* Sélecteur de langue */}
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
        availableLanguages={['fr', 'en', 'de', ...]}
      />
    </div>
  );
}
```

### Créer une nouvelle page avec traductions

1. Ajouter les traductions dans `/src/i18n/services/locales/` pour chaque langue
2. Utiliser `useLanguageManager` pour la langue courante
3. Utiliser `useServiceTranslation` pour charger les traductions

---

## 🔧 Implémentation technique

### Landing Page (`App-Landing.tsx`)

```tsx
// Hook unifié pour la langue
const { currentLanguage: globalLanguage, setLanguage: setGlobalLanguage } = useLanguageManager();

// Hook spécifique pour les traductions Supabase
const { translations, currentLanguage, setLanguage } = useLandingTranslations(globalLanguage);

// Synchronisation
useEffect(() => {
  if (languageReady && globalLanguage !== currentLanguage) {
    setLanguage(globalLanguage);
  }
}, [globalLanguage, languageReady]);
```

### Pages Services (`ServiceInterimEuropeen.tsx`)

```tsx
// Hook unifié pour la langue
const { currentLanguage: globalLanguage, setLanguage: setGlobalLanguage } = useLanguageManager();

// Hook pour les traductions statiques
const t = useServiceTranslation('interimEuropeen', globalLanguage as SupportedLanguage);
```

---

## 🔍 localStorage

### Clé utilisée
```
yojob_preferred_language
```

### Valeurs possibles
```
'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'el' | 'sv' | 'da' | 'fi' | 'no'
```

### Comportement

- ✅ Écrit automatiquement lors de l'auto-détection (1ère visite)
- ✅ Écrit automatiquement lors d'un changement manuel
- ✅ Lu au chargement de chaque page
- ✅ Priorité maximale sur la détection navigateur

---

## 🧪 Tests

### Tester l'auto-détection

1. Vider le localStorage : `localStorage.removeItem('yojob_preferred_language')`
2. Recharger la page
3. Vérifier que la langue du navigateur est détectée

### Tester la persistance

1. Changer la langue via le sélecteur
2. Recharger la page
3. Vérifier que la langue est conservée

### Tester la synchronisation

1. Aller sur la landing page
2. Changer la langue
3. Naviguer vers une page service
4. Vérifier que la langue est la même

---

## 📚 Fichiers modifiés

### Nouveaux fichiers
- ✅ `/hooks/useLanguageManager.ts` - Hook unifié de gestion de langue

### Fichiers modifiés
- ✅ `/App-Landing.tsx` - Utilise `useLanguageManager`
- ✅ `/ServiceInterimEuropeen.tsx` - Utilise `useLanguageManager`

### Fichiers non touchés (systèmes de traduction)
- ✅ `/hooks/useLandingTranslations.ts` - Inchangé
- ✅ `/src/i18n/services/useServiceTranslation.ts` - Inchangé
- ✅ `/src/i18n/services/locales/*` - Inchangés
- ✅ Base de données Supabase - Intacte

---

## 🚀 Prochaines étapes

### Pour ajouter l'auto-détection à d'autres pages

1. Importer le hook :
```tsx
import { useLanguageManager } from './hooks/useLanguageManager';
```

2. Remplacer `useState('fr')` par :
```tsx
const { currentLanguage, setLanguage } = useLanguageManager();
```

3. Mettre à jour les LanguageSelector :
```tsx
<LanguageSelector
  currentLanguage={currentLanguage}
  onLanguageChange={setLanguage}
  ...
/>
```

---

**Version** : 1.0.0  
**Date** : Janvier 2025  
**Auteur** : Équipe YOJOB Dev
