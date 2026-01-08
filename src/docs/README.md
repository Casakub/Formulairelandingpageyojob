# 📚 Documentation YOJOB

Bienvenue dans la documentation du projet YOJOB. Cette documentation couvre tous les aspects techniques du site, avec un focus particulier sur le système de gestion multilingue.

---

## 🌍 Système de langue unifié

Le site YOJOB dispose d'un système de gestion de langue avancé avec auto-détection, persistance et synchronisation.

### 📖 Documents disponibles

| Document | Description | Pour qui ? |
|----------|-------------|------------|
| [**LANGUAGE_SYSTEM.md**](./LANGUAGE_SYSTEM.md) | Guide complet du système de langue | Tous |
| [**MIGRATION_GUIDE_LANGUAGE.md**](./MIGRATION_GUIDE_LANGUAGE.md) | Guide de migration pour nouvelles pages | Développeurs |
| [**CHANGELOG_LANGUAGE_SYSTEM.md**](./CHANGELOG_LANGUAGE_SYSTEM.md) | Historique des modifications | Tous |
| [**TESTING_CHECKLIST_LANGUAGE.md**](./TESTING_CHECKLIST_LANGUAGE.md) | Checklist de tests | QA / Développeurs |

---

## 🚀 Pages déjà migrées

- ✅ Landing Page (`/App-Landing.tsx`)
- ✅ Service Intérim Européen (`/ServiceInterimEuropeen.tsx`)
- ✅ Formulaire de devis multi-étapes (`/DemandeDevis.tsx`)

## 📋 Pages à migrer

- ⬜ Autres pages services (Recrutement Spécialisé, Conseil & Conformité, etc.)
- ⬜ Formulaire multi-étapes
- ⬜ Pages admin

---

## 🎯 Fonctionnalités principales

### ✨ Auto-détection
La langue du navigateur est détectée automatiquement au premier chargement.

```javascript
// Priorités de détection
1. localStorage (choix précédent)
2. URL parameter (?lang=pl)
3. Navigateur (navigator.language)
4. Fallback (en → fr)
```

### 💾 Persistance
Le choix de langue est sauvegardé et persiste entre les sessions.

```javascript
localStorage.getItem('yojob_preferred_language') // ex: 'pl'
```

### 🔄 Synchronisation
Toutes les pages partagent la même langue automatiquement.

```
Landing → Service → Admin
   ↓         ↓        ↓
 [Polish] [Polish] [Polish]
```

---

## 🛠️ Pour les développeurs

### Hook principal

```typescript
import { useLanguageManager } from './hooks/useLanguageManager';

const { currentLanguage, setLanguage, isReady } = useLanguageManager();
```

### Exemple d'utilisation

```tsx
export default function MaPage() {
  const { currentLanguage, setLanguage } = useLanguageManager();
  const t = useServiceTranslation('interimEuropeen', currentLanguage);

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}
```

---

## 🌐 Langues supportées

Le site supporte **23 langues européennes** :

| Langue | Code | Statut |
|--------|------|--------|
| 🇫🇷 Français | `fr` | ✅ Complet |
| 🇬🇧 Anglais | `en` | ✅ Complet |
| 🇩🇪 Allemand | `de` | ✅ Complet |
| 🇪🇸 Espagnol | `es` | ✅ Complet |
| 🇮🇹 Italien | `it` | ✅ Complet |
| 🇳🇱 Néerlandais | `nl` | ✅ Complet |
| 🇵🇹 Portugais | `pt` | ✅ Complet |
| 🇵🇱 Polonais | `pl` | ✅ Complet |
| 🇨🇿 Tchèque | `cs` | ✅ Complet |
| 🇸🇰 Slovaque | `sk` | ✅ Complet |
| 🇭🇺 Hongrois | `hu` | ✅ Complet |
| 🇷🇴 Roumain | `ro` | ✅ Complet |
| 🇧🇬 Bulgare | `bg` | ✅ Complet |
| 🇭🇷 Croate | `hr` | ✅ Complet |
| 🇸🇮 Slovène | `sl` | ✅ Complet |
| 🇪🇪 Estonien | `et` | ✅ Complet |
| 🇱🇻 Letton | `lv` | ✅ Complet |
| 🇱🇹 Lituanien | `lt` | ✅ Complet |
| 🇬🇷 Grec | `el` | ✅ Complet |
| 🇸🇪 Suédois | `sv` | ✅ Complet |
| 🇩🇰 Danois | `da` | ✅ Complet |
| 🇫🇮 Finnois | `fi` | ✅ Complet |
| 🇳🇴 Norvégien | `no` | ✅ Complet |

---

## 📊 Architecture du système

```
┌─────────────────────────────────────────┐
│   useLanguageManager (Hook central)    │
│                                         │
│  • Détection automatique                │
│  • Gestion localStorage                 │
│  • Synchronisation pages                │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
      ▼                ▼
┌─────────────┐  ┌──────────────┐
│ Landing Page│  │Pages Services│
│             │  │              │
│ Supabase DB │  │ Fichiers TS  │
└─────────────┘  └──────────────┘
```

---

## 🔧 Maintenance

### Ajouter une nouvelle langue

1. Ajouter dans `/lib/languages.ts`
2. Créer `/src/i18n/services/locales/[code].ts`
3. Ajouter dans Supabase (pour landing)
4. Tester avec la checklist

### Modifier une traduction

**Services** (fichiers statiques) :
```bash
/src/i18n/services/locales/fr.ts
```

**Landing** (Supabase) :
```sql
UPDATE kv_store_10092a63 
SET value = '...' 
WHERE key = 'landing_translations_fr';
```

---

## 🧪 Tests

Avant chaque déploiement, exécuter :

1. Tests unitaires du hook
2. Tests d'intégration multi-pages
3. Tests manuels (checklist complète)
4. Tests multi-navigateurs
5. Tests responsive

**Checklist complète** : [TESTING_CHECKLIST_LANGUAGE.md](./TESTING_CHECKLIST_LANGUAGE.md)

---

## 🆘 Support

### Questions fréquentes

**Q : Comment forcer une langue ?**
```javascript
localStorage.setItem('yojob_preferred_language', 'pl');
window.location.reload();
```

**Q : Comment réinitialiser ?**
```javascript
localStorage.removeItem('yojob_preferred_language');
window.location.reload();
```

**Q : La langue ne se synchronise pas ?**
- Vérifier que toutes les pages utilisent `useLanguageManager`
- Vérifier la console pour les warnings
- Vérifier que localStorage n'est pas désactivé

---

## 📞 Contact

Pour toute question concernant le système de langue :
- **Documentation** : Consultez les fichiers dans `/docs`
- **Bugs** : Créer une issue avec le template de bug report
- **Améliorations** : Proposer une PR avec description détaillée

---

## 📝 Changelog

### Version 1.0.0 (Janvier 2025)
- ✨ Système de langue unifié
- ✨ Auto-détection navigateur
- ✨ Persistance localStorage
- ✨ Synchronisation inter-pages
- 📚 Documentation complète

---

## 🎉 Remerciements

Merci à toute l'équipe YOJOB pour le développement et les tests de ce système !

---

**Dernière mise à jour** : Janvier 2025  
**Version** : 1.0.0  
**Licence** : Propriétaire YOJOB