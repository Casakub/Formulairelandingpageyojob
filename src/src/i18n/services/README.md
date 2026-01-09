# 🌍 Traductions des Pages Services

## 📁 Structure modulaire

Cette architecture organise les traductions **par page de service**, plutôt que par langue. Chaque service a son propre dossier avec ses traductions.

```
/src/i18n/services/
├── README.md                          ← Ce fichier
├── index.ts                           ← Loader centralisé
├── useServiceTranslation.ts          ← Hook React
│
├── /interimEuropeen/                 ← Service 1
│   ├── fr.ts                         ← 🇫🇷 Français (~150 lignes)
│   ├── en.ts                         ← 🇬🇧 Anglais (~150 lignes)
│   ├── de.ts                         ← 🇩🇪 Allemand (TODO)
│   └── ...                           ← Autres langues
│
├── /recrutementSpecialise/           ← Service 2
│   ├── fr.ts                         ← 🇫🇷 Français (~150 lignes)
│   ├── en.ts                         ← 🇬🇧 Anglais (~150 lignes)
│   └── ...                           ← Autres langues
│
├── /conseilConformite/               ← Service 3 (TODO)
│   ├── fr.ts
│   └── en.ts
│
└── /detachementPersonnel/            ← Service 4 (TODO)
    ├── fr.ts
    └── en.ts
```

---

## ✅ Avantages de cette architecture

### 1. **Fichiers légers et maintenables**
- ❌ **Avant** : `locales/fr.ts` → 600+ lignes (4 services)
- ✅ **Après** : `interimEuropeen/fr.ts` → ~150 lignes

### 2. **Isolation parfaite**
- Chaque service est **complètement indépendant**
- Pas de risque de conflit entre les traductions
- Facile à retrouver : `recrutementSpecialise/en.ts`

### 3. **Performance optimisée**
- Possibilité de **lazy loading** (charge uniquement la page active)
- Pas besoin de charger toutes les traductions au démarrage

### 4. **Scalabilité**
- Ajouter un nouveau service = créer un nouveau dossier
- Ajouter une langue = créer `{service}/xx.ts`
- Pas de fichiers monstres

### 5. **Collaboration en équipe**
- Moins de conflits Git (chacun travaille sur son fichier)
- Revue de code plus facile

---

## 🚀 Utilisation

### Dans un composant React

```tsx
import { useServiceTranslation } from './src/i18n/services/useServiceTranslation';
import { useLanguageManager } from './hooks/useLanguageManager';

export default function ServiceInterimEuropeen() {
  const { language } = useLanguageManager();
  const t = useServiceTranslation('interimEuropeen', language);

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
      <button>{t.hero.cta.primary}</button>
    </div>
  );
}
```

---

## 📝 Créer une nouvelle traduction

### Étape 1 : Créer le fichier de traduction

Exemple pour ajouter l'allemand au service "Intérim Européen" :

```bash
# Créer le fichier
touch /src/i18n/services/interimEuropeen/de.ts
```

### Étape 2 : Copier la structure depuis fr.ts

```typescript
/**
 * 🇩🇪 TRADUCTIONS ALLEMANDES - INTÉRIM EUROPÉEN
 * 
 * @version 1.0.0
 */

export const deInterimEuropeen = {
  meta: {
    title: "Europäische Zeitarbeit | Rekrutierung in Europa | YOJOB",
    description: "..."
  },
  hero: {
    badge: "🇪🇺 Europäische Zeitarbeit",
    title: "...",
    // ... etc
  }
};
```

### Étape 3 : Ajouter l'import dans index.ts

```typescript
// Dans /src/i18n/services/index.ts
import { deInterimEuropeen } from './interimEuropeen/de';

// Puis dans la fonction loadServiceTranslation :
interimEuropeen: {
  fr: frInterimEuropeen,
  en: enInterimEuropeen,
  de: deInterimEuropeen, // ← Ajout ici
},
```

---

## 🆕 Créer un nouveau service

### Étape 1 : Créer le dossier

```bash
mkdir /src/i18n/services/conseilConformite
```

### Étape 2 : Créer les fichiers de traduction

```bash
touch /src/i18n/services/conseilConformite/fr.ts
touch /src/i18n/services/conseilConformite/en.ts
```

### Étape 3 : Définir les traductions

```typescript
// /src/i18n/services/conseilConformite/fr.ts

export const frConseilConformite = {
  meta: { ... },
  hero: { ... },
  // ... toutes les sections
};
```

### Étape 4 : Importer dans index.ts

```typescript
import { frConseilConformite } from './conseilConformite/fr';
import { enConseilConformite } from './conseilConformite/en';

// Dans loadServiceTranslation :
conseilConformite: {
  fr: frConseilConformite,
  en: enConseilConformite,
},
```

---

## 🔄 Migration depuis l'ancienne structure

L'ancienne structure (`/locales/fr.ts`, `/locales/en.ts`, etc.) contenait toutes les traductions de tous les services dans un seul fichier par langue.

**Migration effectuée :**
- ✅ `interimEuropeen` : FR + EN
- ✅ `recrutementSpecialise` : FR + EN
- ⏳ `conseilConformite` : TODO
- ⏳ `detachementPersonnel` : TODO

**Anciens fichiers conservés temporairement** dans `/locales/` pour référence.
Ils seront supprimés une fois tous les services migrés.

---

## 📊 État actuel (Janvier 2026)

| Service | FR | EN | DE | ES | IT | Autres |
|---------|----|----|----|----|----|----|
| **Intérim Européen** | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| **Recrutement Spécialisé** | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| **Conseil & Conformité** | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| **Détachement Personnel** | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

---

## 🎯 Prochaines étapes

1. ✅ Refactorisation complète (FAIT)
2. ✅ Migration `interimEuropeen` FR/EN (FAIT)
3. ✅ Migration `recrutementSpecialise` FR/EN (FAIT)
4. ⏳ Ajouter les autres langues (DE, ES, IT, etc.)
5. ⏳ Migrer `conseilConformite`
6. ⏳ Migrer `detachementPersonnel`
7. ⏳ Supprimer l'ancien dossier `/locales/`

---

**Maintenu par** : Équipe YOJOB Dev  
**Version** : 2.0.0  
**Dernière mise à jour** : Janvier 2026
