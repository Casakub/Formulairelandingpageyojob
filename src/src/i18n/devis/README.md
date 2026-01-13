# 🌍 Système de Traduction - Formulaire de Devis YOJOB

> Système de traduction multi-langues pour le formulaire de demande de devis
> Support de 22 langues européennes avec détection intelligente selon le pays

---

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Backend](#api-backend)
- [Traductions](#traductions)
- [Développement](#développement)

---

## 🎯 Vue d'ensemble

### Fonctionnalités

✅ **22 langues supportées** (27 pays EU)
✅ **Détection intelligente** selon le pays sélectionné
✅ **Fallback automatique** vers le français
✅ **API backend** avec cache KV Store
✅ **Hook React** réutilisable
✅ **Composant de sélection** de langue
✅ **~170 clés** de traduction

### Langues supportées (MVP Phase 1)

| Langue | Code | Pays principaux | Priorité |
|--------|------|-----------------|----------|
| 🇫🇷 Français | `fr` | France, Belgique, Luxembourg | ⭐⭐⭐⭐⭐ |
| 🇬🇧 English | `en` | Irlande, Malte, Chypre | ⭐⭐⭐⭐⭐ |
| 🇩🇪 Deutsch | `de` | Allemagne, Autriche | ⭐⭐⭐⭐⭐ |
| 🇪🇸 Español | `es` | Espagne | ⭐⭐⭐⭐⭐ |
| 🇵🇱 Polski | `pl` | Pologne | ⭐⭐⭐⭐⭐ |
| 🇷🇴 Română | `ro` | Roumanie | ⭐⭐⭐⭐⭐ |

### Langues Phase 2 (Europe de l'Ouest)

| Langue | Code | Pays principaux | Statut |
|--------|------|-----------------|--------|
| 🇮🇹 Italiano | `it` | Italie | ✅ Complété |
| 🇵🇹 Português | `pt` | Portugal | ✅ Complété |
| 🇳🇱 Nederlands | `nl` | Pays-Bas, Belgique | ✅ Complété |

**✨ Phase 2 : 100% COMPLÉTÉE ! 🎉**

### Langues Phase 3 (Europe de l'Est)

| Langue | Code | Pays principaux | Statut |
|--------|------|-----------------|--------|
| 🇧🇬 Български | `bg` | Bulgarie | ✅ Complété |
| 🇭🇺 Magyar | `hu` | Hongrie | ✅ Complété |
| 🇨🇿 Čeština | `cs` | République Tchèque | ✅ Complété |
| 🇸🇰 Slovenčina | `sk` | Slovaquie | ✅ Complété |
| 🇭🇷 Hrvatski | `hr` | Croatie | ✅ Complété |
| 🇸🇮 Slovenščina | `sl` | Slovénie | ✅ Complété |

**🎉 Phase 3 : 100% COMPLÉTÉE ! 🎊**

### Langues Phase 5 (Pays Baltes & Finno-ougriens)

| Langue | Code | Pays principaux | Statut |
|--------|------|-----------------|--------|
| 🇪🇪 Eesti | `et` | Estonie | ✅ Complété |
| 🇱🇹 Lietuvių | `lt` | Lituanie | ✅ Complété |
| 🇱🇻 Latviešu | `lv` | Lettonie | ✅ Complété |

**🎊 Phase 5 : 100% COMPLÉTÉE ! 🎉**

### Langues Phase 4 (Europe du Sud & Nordique)

| Langue | Code | Pays principaux | Statut |
|--------|------|-----------------|--------|
| 🇬🇷 Ελληνικά | `el` | Grèce, Chypre | ✅ Complété |
| 🇫🇮 Suomi | `fi` | Finlande | ✅ Complété |
| 🇸🇪 Svenska | `sv` | Suède | ✅ Complété |
| 🇩🇰 Dansk | `da` | Danemark | ✅ Complété |

**🎉🎊 Phase 4 : 100% COMPLÉTÉE ! 🏆✨**

---

## 🚀 Installation

### 1. Initialiser les traductions

Ouvrir le fichier `/scripts/seed-devis-translations.html` dans le navigateur :

```bash
# Depuis la racine du projet
open scripts/seed-devis-translations.html
```

Cliquer sur **"🇫🇷 Seed Français (Base)"** pour initialiser le français.

### 2. Vérifier l'installation

```bash
# Dans la console navigateur ou via l'interface
GET /make-server-10092a63/devis-translations/
```

Vous devriez voir :
```json
{
  "success": true,
  "availableLanguages": [
    { "code": "fr", "available": true, "version": "1.0.0" }
  ],
  "total": 1
}
```

---

## 📖 Usage

### Dans un composant React

```tsx
import { useDevisTranslation } from '@/hooks/useDevisTranslation';
import { LanguageSelector } from '@/components/devis/LanguageSelector';

function Step1Entreprise() {
  const { t, isLoading, currentLanguage, changeLanguage } = useDevisTranslation('fr');

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      {/* Sélecteur de langue */}
      <LanguageSelector 
        value={currentLanguage} 
        onChange={changeLanguage}
        suggestedCountry="France" 
      />

      {/* Utilisation des traductions */}
      <h2>{t.step1.title}</h2>
      <p>{t.step1.subtitle}</p>

      <label>
        {t.step1.fields.pays.label}
        <span>{t.common.required}</span>
      </label>

      <input placeholder={t.step1.fields.pays.placeholder} />
    </div>
  );
}
```

### Hook simplifié (lecture seule)

```tsx
import { useDevisTranslationStatic } from '@/hooks/useDevisTranslation';

function MyComponent({ lang }: { lang: DevisLanguage }) {
  const { t, isLoading } = useDevisTranslationStatic(lang);

  return <div>{t.step1.title}</div>;
}
```

### Sélecteur de langue compact (mobile)

```tsx
import { LanguageSelectorCompact } from '@/components/devis/LanguageSelector';

function MobileHeader() {
  const [lang, setLang] = useState('fr');

  return (
    <header>
      <LanguageSelectorCompact value={lang} onChange={setLang} />
    </header>
  );
}
```

### Badge de langue (affichage uniquement)

```tsx
import { LanguageBadge } from '@/components/devis/LanguageSelector';

function ConfirmationPage({ lang }: { lang: DevisLanguage }) {
  return (
    <div>
      <LanguageBadge lang={lang} />
      <p>Votre demande a été envoyée</p>
    </div>
  );
}
```

---

## 🏗️ Architecture

### Structure des fichiers

```
src/i18n/devis/
├── types.ts                    # Types TypeScript
├── languages.ts                # Configuration des langues
├── locales/
│   ├── fr.ts                  # 🇫🇷 Traductions françaises (base)
│   ├── en.ts                  # 🇬🇧 Traductions anglaises (TODO)
│   ├── de.ts                  # 🇩🇪 Traductions allemandes (TODO)
│   └── ...
├── index.ts                    # Exports centralisés
└── README.md                   # Documentation

hooks/
└── useDevisTranslation.ts     # Hook React principal

components/devis/
└── LanguageSelector.tsx       # Composant sélecteur

supabase/functions/server/
└── devis-translations.tsx     # API Backend

scripts/
└── seed-devis-translations.html # Interface de seed
```

### Type `DevisTranslations`

```typescript
interface DevisTranslations {
  step1: {
    title: string;
    subtitle: string;
    fields: {
      pays: { label: string; placeholder: string; };
      // ... autres champs
    };
  };
  step2: { /* ... */ };
  step3: { /* ... */ };
  // ... autres étapes
  common: {
    next: string;
    previous: string;
    required: string;
    // ... autres textes communs
  };
  errors: {
    required: string;
    invalidEmail: string;
    // ... autres erreurs
  };
}
```

---

## 🔌 API Backend

### Endpoints disponibles

#### `GET /devis-translations/:lang`
Récupérer les traductions pour une langue.

**Exemple :**
```bash
GET /make-server-10092a63/devis-translations/fr
```

**Réponse :**
```json
{
  "success": true,
  "translations": { /* ... */ },
  "language": "fr",
  "_meta": {
    "lastUpdated": "2024-12-21T10:00:00.000Z",
    "version": "1.0.0"
  }
}
```

#### `POST /devis-translations/seed`
Initialiser/mettre à jour les traductions d'une langue.

**Body :**
```json
{
  "lang": "fr",
  "translations": { /* ... */ }
}
```

#### `GET /devis-translations/`
Lister toutes les langues disponibles.

**Réponse :**
```json
{
  "success": true,
  "availableLanguages": [
    { "code": "fr", "available": true, "version": "1.0.0" }
  ],
  "total": 1,
  "mvpLanguages": ["fr", "en", "de", "es", "pl", "ro"]
}
```

#### `GET /devis-translations/:lang/status`
Vérifier le statut d'une langue.

**Réponse :**
```json
{
  "success": true,
  "available": true,
  "language": "fr",
  "totalKeys": 170,
  "lastUpdated": "2024-12-21T10:00:00.000Z"
}
```

#### `DELETE /devis-translations/:lang`
Supprimer les traductions d'une langue (admin).

---

## 🌐 Traductions

### Ajouter une nouvelle langue

#### 1. Créer le fichier de traduction

```typescript
// src/i18n/devis/locales/en.ts
import type { DevisTranslations } from '../types';

export const en: DevisTranslations = {
  step1: {
    title: "Company Information",
    subtitle: "Please provide your company's legal information.",
    fields: {
      pays: {
        label: "Country",
        placeholder: "Select a country",
      },
      // ... traduire tous les champs
    },
  },
  // ... traduire toutes les sections
};
```

#### 2. Seed la traduction

```bash
# Via l'interface HTML
POST /make-server-10092a63/devis-translations/seed
{
  "lang": "en",
  "translations": { /* import from en.ts */ }
}
```

#### 3. Vérifier

```bash
GET /make-server-10092a63/devis-translations/en
```

### Traduction automatique (TODO)

Pour les prochaines phases, utiliser Claude pour traduire automatiquement :

```typescript
// Pseudo-code
const baseTranslations = fr; // Base française
const targetLang = 'de';

const translatedContent = await translateWithClaude({
  sourceLang: 'fr',
  targetLang,
  texts: baseTranslations,
  context: 'European recruitment quote request form'
});

await seedTranslation(targetLang, translatedContent);
```

---

## 🛠️ Développement

### Clés de traduction

#### Convention de nommage

- **Étapes** : `stepX.*`
- **Champs** : `stepX.fields.nomChamp.*`
- **Commun** : `common.*`
- **Erreurs** : `errors.*`
- **Secteurs** : `secteurs.*`

#### Ajouter une nouvelle clé

1. Mettre à jour le type dans `types.ts`
2. Ajouter la traduction dans `locales/fr.ts`
3. Utiliser dans le composant : `t.nouvelle.cle`
4. Traduire dans les autres langues

### Détection intelligente de langue

Le système suggère automatiquement la langue selon le pays :

```typescript
import { getSuggestedLanguage } from '@/src/i18n/devis/languages';

const suggestedLang = getSuggestedLanguage('France'); // 'fr'
const suggestedLang2 = getSuggestedLanguage('Espagne'); // 'es'
```

**Mapping pays → langue :**
- France, Belgique, Luxembourg → Français
- Allemagne, Autriche → Allemand
- Espagne → Espagnol
- Portugal → Portugais
- Etc.

### Cache & Performance

- **Frontend** : Les traductions sont chargées une fois et mises en cache
- **Backend** : KV Store Supabase (accès ultra-rapide)
- **Fallback** : Toujours le français en cas d'échec

---

## 📊 Statistiques

### Clés par section

| Section | Clés | Description |
|---------|------|-------------|
| Step 1 | ~15 | Informations entreprise |
| Step 2 | ~10 | Contact |
| Step 3 | ~20 | Besoins + secteurs |
| Step 4 | ~15 | Conditions de travail |
| Step 5 | ~10 | Profil candidats |
| Récapitulatif | ~20 | Synthèse calculs |
| Confirmation | ~10 | Message confirmation |
| Secteurs | 10 | Noms des secteurs |
| Commun | ~20 | Textes réutilisables |
| Erreurs | ~10 | Messages d'erreur |
| **TOTAL** | **~170** | **Clés uniques** |

---

## ✅ Checklist de déploiement

- [x] Types TypeScript créés
- [x] Configuration des langues
- [x] Traductions françaises (base)
- [x] Hook `useDevisTranslation`
- [x] Composant `LanguageSelector`
- [x] API Backend `/devis-translations`
- [x] Script de seed HTML
- [ ] Traductions EN, DE, ES, PL, RO (MVP)
- [ ] Traductions complètes (22 langues)
- [ ] Tests unitaires
- [ ] Tests E2E
- [ ] Documentation utilisateur

---

## 🚀 Prochaines étapes

### Phase 1 : MVP (EN COURS)
- ✅ Infrastructure technique
- ⏳ Traductions MVP (6 langues)
- ⏳ Intégration dans les composants Step

### Phase 2 : Extension
- ⏳ 15 langues supplémentaires
- ⏳ Traduction automatique via Claude
- ⏳ Interface admin de gestion

### Phase 3 : Optimisation
- ⏳ Cache navigateur (LocalStorage)
- ⏳ Préchargement intelligent
- ⏳ Analytics d'usage des langues

---

## 📞 Support

Pour toute question ou problème :

1. Vérifier les logs dans `/scripts/seed-devis-translations.html`
2. Tester l'endpoint `/devis-translations/` pour vérifier les langues disponibles
3. Consulter les exemples dans ce README

---

**Version :** 1.0.0  
**Dernière mise à jour :** 21 décembre 2024  
**Auteur :** Équipe YOJOB Dev