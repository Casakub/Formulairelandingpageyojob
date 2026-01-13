# 🏠 Traductions Landing Page

Traductions complètes de la landing page YOJOB en fichiers TypeScript statiques.

## 📁 Structure

```
landingPage/
  ├── index.ts                    # Export principal
  ├── useLandingPageTranslation.ts # Hook React
  ├── fr.ts                        # 🇫🇷 Français
  ├── en.ts                        # 🇬🇧 Anglais
  ├── de.ts                        # 🇩🇪 Allemand
  ├── _template.ts                 # Template pour nouvelles langues
  ├── validate-translation.ts      # Script de validation
  ├── TRANSLATION_PROGRESS.md      # Suivi des traductions
  ├── CHANGELOG.md                 # Historique des changements
  └── MIGRATION.md                 # Documentation de migration
```

## 🚀 Utilisation

```tsx
import { useLandingPageTranslation } from './src/i18n/pages/landingPage';

const t = useLandingPageTranslation('fr');
console.log(t.hero.title); // "Recrutez partout en Europe..."
```

## 📦 Contenu Traduit

- ✅ SEO (meta, alt texts, FAQ)
- ✅ Header (navigation, CTA)
- ✅ Hero (titre, sous-titre, stats)
- ✅ Services (3 services)
- ✅ Network (carte + waitlist)
- ✅ Steps (4 étapes)
- ✅ Testimonials (témoignages)
- ✅ Sectors (12 secteurs)
- ✅ CTA Form (formulaire contact)
- ✅ Footer (complet)

## 🌍 Langues Disponibles

- 🇫🇷 Français (fr) ✅
- 🇬🇧 Anglais (en) ✅
- 🇩🇪 Allemand (de) ✅
- 🇪🇸 Espagnol (es) ⏳
- ... 19 autres langues européennes à venir

## 📖 Documentation

Voir [MIGRATION.md](./MIGRATION.md) pour plus de détails.