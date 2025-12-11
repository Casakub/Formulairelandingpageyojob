# 🌍 I18N System v2.0

Système de traduction centralisé, typé et évolutif pour YoJob Survey.

## 🚀 Quick Start

```bash
# Générer la base FR depuis survey-questions-COMPLETE.ts
yarn i18n:generate

# Vérifier l'état des traductions
yarn i18n:check

# Migrer les anciennes traductions (one-time)
yarn i18n:migrate
```

## 📖 Documentation

- **Vue d'ensemble complète** : [/docs/I18N_SYSTEM_OVERVIEW.md](/docs/I18N_SYSTEM_OVERVIEW.md)
- **Guide de migration** : [/docs/I18N_MIGRATION_GUIDE.md](/docs/I18N_MIGRATION_GUIDE.md)

## 💻 Usage

```typescript
import { getTranslation } from './src/i18n';

// Simple
const text = getTranslation('fr', 'common.submit');

// Avec profil
const label = getTranslation('en', 'questions.q1_nom.label', {
  profile: 'agency'
});

// Avec variables
const msg = getTranslation('fr', 'welcome.message', {
  variables: { name: 'Alice' }
});
```

## 📂 Structure

```
i18n/
├── types.ts           # Types TypeScript
├── index.ts           # API publique
├── locales/
│   ├── fr.generated.ts  # AUTO (ne pas éditer)
│   ├── en.ts
│   ├── de.ts
│   └── ...
└── README.md          # Ce fichier
```

## ✅ Checklist quotidienne

- [ ] Après modification de questions : `yarn i18n:generate`
- [ ] Avant commit : `yarn i18n:check`
- [ ] Si ajout langue : créer `locales/xx.ts` + importer dans `index.ts`

## 🆘 Support

Problème ? Lisez la doc complète dans `/docs/I18N_SYSTEM_OVERVIEW.md`
