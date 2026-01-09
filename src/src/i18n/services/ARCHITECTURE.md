# 🏗️ Architecture des Traductions Services

## 📐 Vue d'ensemble

```
/src/i18n/services/
│
├── 📄 index.ts                          ← Loader centralisé (NEW)
├── 📄 useServiceTranslation.ts         ← Hook React
├── 📄 footer.ts                        ← Traductions footer
│
├── 📖 README.md                        ← Documentation principale
├── 📖 MIGRATION.md                     ← Guide de migration
├── 📖 ARCHITECTURE.md                  ← Ce fichier
├── 📖 VERIFICATION.md                  ← Tests de vérification
│
├── 📁 /interimEuropeen/                ← Service 1 (MIGRÉ)
│   ├── 📄 index.ts                     ← Re-exports
│   ├── 🇫🇷 fr.ts                      ← 150 lignes
│   ├── 🇬🇧 en.ts                      ← 150 lignes
│   ├── 🇩🇪 de.ts                      ← TODO
│   ├── 🇪🇸 es.ts                      ← TODO
│   └── ...                             ← 23 autres langues
│
├── 📁 /recrutementSpecialise/          ← Service 2 (MIGRÉ)
│   ├── 📄 index.ts
│   ├── 🇫🇷 fr.ts                      ← 150 lignes
│   ├── 🇬🇧 en.ts                      ← 150 lignes
│   └── ...                             ← À ajouter
│
├── 📁 /conseilConformite/              ← Service 3 (TODO)
│   ├── 🇫🇷 fr.ts                      ← À créer
│   └── 🇬🇧 en.ts                      ← À créer
│
├── 📁 /detachementPersonnel/           ← Service 4 (TODO)
│   ├── 🇫🇷 fr.ts                      ← À créer
│   └── 🇬🇧 en.ts                      ← À créer
│
└── 📁 /locales/ (DEPRECATED)           ← Ancien système
    ├── ⚠️ DEPRECATED.md                ← Avertissement
    ├── fr.ts                           ← 600+ lignes (à supprimer)
    ├── en.ts                           ← 600+ lignes (à supprimer)
    └── ...                             ← Tous à supprimer
```

---

## 🔄 Flux de données

```
┌─────────────────────────────────────────────────────────────┐
│  COMPOSANT REACT (ServiceRecrutementSpecialise.tsx)         │
│                                                              │
│  1. useLanguageManager() → language = 'fr'                  │
│  2. useServiceTranslation('recrutementSpecialise', 'fr')    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  HOOK (useServiceTranslation.ts)                            │
│                                                              │
│  → Appelle getServiceTranslation(lang, page)                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  LOADER (index.ts → loadServiceTranslation())               │
│                                                              │
│  → Cherche dans la map :                                    │
│    translations['recrutementSpecialise']['fr']              │
│                                                              │
│  → Si trouvé : retourne frRecrutementSpecialise             │
│  → Sinon : fallback sur FR avec warning                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  FICHIER DE TRADUCTION (recrutementSpecialise/fr.ts)        │
│                                                              │
│  export const frRecrutementSpecialise = {                   │
│    meta: { ... },                                           │
│    hero: { ... },                                           │
│    forWho: { ... },                                         │
│    ...                                                      │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Structure d'un fichier de traduction

Chaque fichier de traduction (ex: `fr.ts`) contient **9 sections** :

```typescript
export const frServiceName = {
  // 1️⃣ SEO
  meta: {
    title: string,
    description: string
  },
  
  // 2️⃣ HERO
  hero: {
    badge: string,
    title: string,
    subtitle: string,
    cta: { primary: string, secondary: string }
  },
  
  // 3️⃣ POUR QUI
  forWho: {
    badge: string,
    title: string,
    userCompanies: { title: string, description: string },
    concerns: { title: string, items: string[] }
  },
  
  // 4️⃣ AVANTAGES
  benefits: {
    title: string,
    subtitle: string,
    items: Array<{ title: string, description: string }>
  },
  
  // 5️⃣ PROCESSUS
  process: {
    badge: string,
    title: string,
    subtitle: string,
    steps: Array<{ title: string, description: string }>
  },
  
  // 6️⃣ SECTEURS
  sectors: {
    badge: string,
    title: string,
    subtitle: string,
    items: Array<{ name: string }>
  },
  
  // 7️⃣ TÉMOIGNAGE
  testimonial: {
    badge: string,
    quote: string,
    author: { name: string, role: string, sector: string }
  },
  
  // 8️⃣ FAQ
  faq: {
    badge: string,
    title: string,
    subtitle: string,
    items: Array<{ question: string, answer: string }>
  },
  
  // 9️⃣ CTA FINAL
  ctaFinal: {
    badge: string,
    title: string,
    subtitle: string,
    cta: string,
    features: string
  }
};
```

---

## 🎯 Conventions de nommage

### Fichiers
- **Service** : camelCase → `interimEuropeen`, `recrutementSpecialise`
- **Langue** : Code ISO 639-1 → `fr.ts`, `en.ts`, `de.ts`

### Exports
- **Pattern** : `{langue}{ServicePascalCase}`
- **Exemples** :
  - `frInterimEuropeen`
  - `enInterimEuropeen`
  - `deInterimEuropeen`
  - `frRecrutementSpecialise`
  - `enRecrutementSpecialise`

### Dossiers
- **Pattern** : `/nomDuService/`
- **Exemples** :
  - `/interimEuropeen/`
  - `/recrutementSpecialise/`
  - `/conseilConformite/`
  - `/detachementPersonnel/`

---

## 📊 Métriques

### Avant refactorisation
```
/locales/fr.ts     → 600+ lignes (4 services)
/locales/en.ts     → 600+ lignes (4 services)
/locales/de.ts     → 600+ lignes (4 services)
...
Total : 23 langues × 600 lignes = 13 800+ lignes
```

### Après refactorisation
```
/interimEuropeen/fr.ts           → ~150 lignes
/interimEuropeen/en.ts           → ~150 lignes
/recrutementSpecialise/fr.ts     → ~150 lignes
/recrutementSpecialise/en.ts     → ~150 lignes
...
Total actuel : 4 fichiers × 150 lignes = 600 lignes
Total cible : 4 services × 23 langues × 150 lignes = 13 800 lignes
```

**Différence :** Même nombre de lignes total, mais **réparti intelligemment** ! 🎯

---

## 🚀 Performance

### Lazy Loading (Future)

Actuellement, tous les imports sont statiques :
```typescript
import { frInterimEuropeen } from './interimEuropeen/fr';
```

**Amélioration future** : Lazy loading dynamique
```typescript
const loadTranslation = async (service: string, lang: string) => {
  const module = await import(`./${service}/${lang}`);
  return module[`${lang}${capitalize(service)}`];
};
```

**Avantage :** Ne charge que la traduction nécessaire (économie mémoire)

---

## 🔐 Type Safety

```typescript
// ✅ Type-safe
const t: ServicePageTranslation = getServiceTranslation('fr', 'interimEuropeen');
t.hero.title;        // ✅ OK
t.hero.subtitle;     // ✅ OK
t.hero.unknown;      // ❌ Erreur TypeScript

// ✅ Autocomplétion
useServiceTranslation('interim...'); // Propose : interimEuropeen, recrutementSpecialise, etc.
```

---

## 🌍 Langues supportées (cible)

| Code | Langue | Statut interimEuropeen | Statut recrutementSpecialise |
|------|--------|------------------------|------------------------------|
| `fr` | Français | ✅ | ✅ |
| `en` | Anglais | ✅ | ✅ |
| `de` | Allemand | ⏳ | ⏳ |
| `es` | Espagnol | ⏳ | ⏳ |
| `it` | Italien | ⏳ | ⏳ |
| `nl` | Néerlandais | ⏳ | ⏳ |
| `pt` | Portugais | ⏳ | ⏳ |
| `pl` | Polonais | ⏳ | ⏳ |
| `ro` | Roumain | ⏳ | ⏳ |
| `bg` | Bulgare | ⏳ | ⏳ |
| ... | 14 autres | ⏳ | ⏳ |

**Total cible** : 23 langues × 4 services = **92 fichiers**

---

## 🎨 Bonnes pratiques

### 1. Un fichier = Une responsabilité
Chaque fichier contient les traductions **d'un seul service** dans **une seule langue**.

### 2. Exports nommés
```typescript
// ✅ Bon
export const frInterimEuropeen = { ... };

// ❌ Éviter
export default { ... };
```

### 3. Commentaires
```typescript
/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES - INTÉRIM EUROPÉEN
 * 
 * @version 1.0.0
 */
export const frInterimEuropeen = { ... };
```

### 4. Index pour re-exports
```typescript
// /interimEuropeen/index.ts
export { frInterimEuropeen } from './fr';
export { enInterimEuropeen } from './en';
```

---

## 🔧 Maintenance

### Ajouter une langue
1. Créer `{service}/{langue}.ts`
2. Copier la structure depuis `{service}/fr.ts`
3. Traduire tous les champs
4. Ajouter l'export dans `{service}/index.ts`
5. Ajouter l'import dans `/src/i18n/services/index.ts`

### Ajouter un service
1. Créer `/nouveauService/`
2. Créer `fr.ts` et `en.ts`
3. Créer `index.ts`
4. Ajouter dans `/src/i18n/services/index.ts`
5. Mettre à jour les types si nécessaire

### Modifier une traduction
1. Ouvrir `{service}/{langue}.ts`
2. Modifier le texte
3. Sauvegarder → Hot reload automatique

---

**Maintenu par** : Équipe YOJOB Dev  
**Version** : 2.0.0  
**Dernière mise à jour** : Janvier 2026
