# 🌍 Guide : Ajouter une Nouvelle Langue à la Landing Page

## Étapes Rapides

### 1. Créer le fichier de traduction

```bash
# Copier le template
cp _template.ts de.ts  # Exemple pour l'allemand
```

### 2. Éditer le fichier

Ouvrez `/src/i18n/pages/landingPage/de.ts` et :

1. **Remplacer `[LANGUAGE_CODE]`** par le code langue (ex: `de`)
   ```typescript
   export const deLandingPage: LandingPageContent = {
     language: 'de',
   ```

2. **Traduire tous les textes** marqués `[Traduire]`
   - Rechercher tous les `"[Traduire]` dans le fichier
   - Les remplacer par les traductions appropriées

### 3. Importer dans index.ts

Ouvrez `/src/i18n/pages/landingPage/index.ts` et ajoutez :

```typescript
// Import
import { deLandingPage } from './de';

// Dans AVAILABLE_LANGUAGES_LANDING
export const AVAILABLE_LANGUAGES_LANDING: SupportedLanguage[] = ['fr', 'en', 'de'];

// Dans getLandingPageTranslation()
export function getLandingPageTranslation(language: SupportedLanguage = 'fr'): LandingPageContent {
  const translations: Record<string, LandingPageContent> = {
    fr: frLandingPage,
    en: enLandingPage,
    de: deLandingPage,  // ← Ajouter ici
  };
  
  return translations[language] || translations['fr'];
}
```

### 4. Tester

```bash
# Lancer l'application
npm run dev

# Changer la langue dans le sélecteur de langue
# Vérifier que tout s'affiche correctement
```

## Exemple Complet : Ajouter l'Espagnol (ES)

### Étape 1 : Créer `es.ts`

```typescript
/**
 * 🇪🇸 TRADUCTIONS ESPAGNOLES - LANDING PAGE
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const esLandingPage: LandingPageContent = {
  language: 'es',
  
  seo: {
    metaTitle: "YOJOB | Líder en contratación europea - Trabajo temporal y fijo en 27 países",
    metaDescription: "Acceda a más de 500 agencias de contratación en 27 países europeos. Trabajo temporal, fijo, destacamento: YOJOB simplifica sus contrataciones internacionales.",
    slug: "/es",
    h1: "Líder en contratación europea",
    // ... etc
  },
  
  header: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      network: "Red",
      contact: "Contacto"
    },
    cta: "Solicitar presupuesto"
  },
  
  // ... continuer avec toutes les sections
};
```

### Étape 2 : Mettre à jour `index.ts`

```typescript
import { esLandingPage } from './es';

export const AVAILABLE_LANGUAGES_LANDING: SupportedLanguage[] = ['fr', 'en', 'es'];

export function getLandingPageTranslation(language: SupportedLanguage = 'fr'): LandingPageContent {
  const translations: Record<string, LandingPageContent> = {
    fr: frLandingPage,
    en: enLandingPage,
    es: esLandingPage,
  };
  
  return translations[language] || translations['fr'];
}
```

### Étape 3 : Vérifier

✅ Le fichier compile sans erreur TypeScript  
✅ La langue apparaît dans le sélecteur  
✅ Tous les textes s'affichent dans la nouvelle langue  
✅ Les liens et boutons fonctionnent  

## Checklist de Traduction

Sections à traduire dans chaque fichier :

- [ ] **SEO** : metaTitle, metaDescription, h1, altTexts, faq (3 questions)
- [ ] **Header** : navigation (4 liens), CTA
- [ ] **Hero** : badge, title, subtitle, 2 CTAs, 3 stats, 6 floating cards
- [ ] **Stats** : badge, title, 4 items avec labels
- [ ] **Services** : badge, title, subtitle, 3 services (titre + description + lien)
- [ ] **Network** : badge, title, subtitle, mapLabel, waitlist (8 éléments)
- [ ] **Steps** : badge, title, subtitle, 4 étapes (titre + description)
- [ ] **Testimonials** : badge, title, subtitle, 3 témoignages complets
- [ ] **Sectors** : badge, title, subtitle, 12 noms de secteurs
- [ ] **CTA Form** : badge, title, subtitle, 4 benefits, 6 champs formulaire
- [ ] **Footer** : tagline, 3 colonnes de liens, contact, copyright, 3 liens légaux

## Conseils de Traduction

### Ton et Style
- **Professionnel** mais **accessible**
- **Direct** et **orienté action** pour les CTAs
- **Rassurant** pour la conformité et sécurité

### Mots-clés à Préserver
- Conserver "YOJOB" (nom de marque)
- Conserver les chiffres : "500+", "27", "2000+"
- Conserver les icônes émoji : 🎯, 🌍, ⭐, etc.

### Adaptations Culturelles
- **Formats téléphone** : adapter selon le pays (ex: +49 pour Allemagne)
- **Adresse** : peut rester en France ou adapter selon le marché cible
- **Exemples de noms** : adapter les témoignages avec des noms locaux
- **Secteurs** : adapter si certains secteurs sont appelés différemment

### Vérifications Finales
- ✅ Pas de `[Traduire]` restant dans le fichier
- ✅ Tous les placeholders sont traduits
- ✅ Les accents et caractères spéciaux sont corrects
- ✅ Les longueurs de texte restent raisonnables (pas trop long pour le design)
- ✅ Le fichier compile sans erreur TypeScript

## Scripts Utiles

### Compter les textes à traduire
```bash
grep -o "\[Traduire\]" de.ts | wc -l
```

### Trouver tous les textes non traduits
```bash
grep "\[Traduire\]" de.ts
```

### Vérifier la syntaxe TypeScript
```bash
npx tsc --noEmit src/i18n/pages/landingPage/de.ts
```

## Ordre Recommandé des Langues

Basé sur le trafic et les marchés YOJOB :

1. ✅ Français (fr) - COMPLÉTÉ
2. ✅ Anglais (en) - COMPLÉTÉ
3. ✅ Allemand (de) - COMPLÉTÉ 🎉 (13 janvier 2025)
4. ⏳ Espagnol (es) - Priorité haute (marché important)
5. ⏳ Italien (it) - Priorité haute (marché important)
6. ⏳ Polonais (pl) - Priorité haute (main d'œuvre)
7. ⏳ Portugais (pt) - Priorité moyenne
8. ⏳ Néerlandais (nl) - Priorité moyenne
9. ⏳ Roumain (ro) - Priorité moyenne (main d'œuvre)
10. ⏳ Autres langues européennes...

## Support

Questions ? Consultez :
- 📖 [MIGRATION.md](./MIGRATION.md) - Documentation complète
- 📖 [README.md](./README.md) - Vue d'ensemble
- 🔗 `/types/landingContent.ts` - Structure des données
- 💬 Créer une issue sur le repo

---

**Bonne traduction ! 🌍✨**