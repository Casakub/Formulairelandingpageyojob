# 🎯 Guide d'Implémentation SEO YOJOB v2.0

## 📋 Vue d'ensemble

Ce guide explique comment implémenter les **métadonnées SEO optimisées** sur toutes les pages YOJOB avec support **multilingue complet** (22 langues).

---

## 🔧 Architecture Technique

### Fichiers créés

1. **`/src/i18n/seo/metadata.ts`**  
   - Contient tous les Titles, Meta-descriptions, H1 pour 6 pages × 22 langues
   - 132 configurations SEO uniques
   - Schémas Organization et Service

2. **`/components/SEOHead.tsx`**  
   - Composant React pour injection automatique des métadonnées
   - Hook `useSEOH1` pour récupérer le H1 optimisé

3. **`/docs/SEO_IMPLEMENTATION_GUIDE.md`** (ce fichier)  
   - Documentation technique complète

---

## 📖 Utilisation

### Étape 1 : Importer le composant SEOHead

```tsx
import { SEOHead, useSEOH1 } from './components/SEOHead';
```

### Étape 2 : Utiliser dans votre composant

#### Exemple : Page d'accueil (`/App.tsx`)

```tsx
import { SEOHead, useSEOH1 } from './components/SEOHead';

export default function App() {
  const [currentLang, setCurrentLang] = useState<DevisLanguage>('fr');
  const h1Text = useSEOH1('home', currentLang);

  return (
    <>
      {/* Injection SEO automatique */}
      <SEOHead 
        page="home" 
        lang={currentLang}
        includeServiceSchema={true}
      />

      <div>
        <h1>{h1Text}</h1>
        {/* Reste du contenu */}
      </div>
    </>
  );
}
```

#### Exemple : Page Formulaire Devis

```tsx
import { SEOHead, useSEOH1 } from './components/SEOHead';
import type { DevisLanguage } from './src/i18n/devis/types';

export function DevisForm() {
  const [language, setLanguage] = useState<DevisLanguage>('fr');
  const h1Text = useSEOH1('devis-form', language);

  return (
    <>
      <SEOHead 
        page="devis-form" 
        lang={language}
        includeServiceSchema={true}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-center mb-8">{h1Text}</h1>
        
        {/* Formulaire multi-étapes */}
      </div>
    </>
  );
}
```

---

## 🎯 Pages Disponibles

### PageKey disponibles

```typescript
type PageKey = 
  | 'home'                      // Page d'accueil
  | 'detachement-btp'           // Page détachement BTP
  | 'detachement-industrie'     // Page détachement industrie
  | 'methode-a-propos'          // Page méthode/à propos
  | 'contact-devis'             // Page contact/devis
  | 'blog-directive'            // Page blog directive UE
  | 'devis-form';               // Formulaire de devis
```

---

## 🌍 Langues Supportées

**22 langues européennes :**

```typescript
'fr' | 'en' | 'es' | 'pt' | 'de' | 'it' | 'nl' | 'pl' | 'ro' | 'cs' | 'sk' | 
'hu' | 'bg' | 'el' | 'hr' | 'sl' | 'lt' | 'lv' | 'et' | 'sv' | 'da' | 'fi' | 'no'
```

---

## 📊 Schémas Structurés (Schema.org)

### Organization Schema

**Toujours inclus automatiquement** sur toutes les pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YOJOB",
  "description": "Courtier en recrutement et détachement de personnel européen",
  "url": "https://yojob.com",
  "areaServed": ["FR", "PT", "RO", "PL", ...],
  "serviceType": ["Détachement de personnel", "Intérim européen"]
}
```

### Service Schema

**Optionnel** - Activé avec `includeServiceSchema={true}`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Détachement d'Ouvriers Qualifiés BTP",
  "description": "...",
  "provider": { "@type": "Organization", "name": "YOJOB" },
  "areaServed": ["Portugal", "Romania", "Poland"]
}
```

### Quand utiliser `includeServiceSchema` ?

✅ **OUI** pour :
- `home` (service global)
- `detachement-btp`
- `detachement-industrie`
- `contact-devis`
- `devis-form`

❌ **NON** pour :
- `methode-a-propos` (utiliser Organization suffit)
- `blog-directive` (utiliser Article schema à la place - voir ci-dessous)

---

## 📝 Schéma Article/FAQPage (pages blog)

Pour les pages de contenu éditorial comme `blog-directive`, ajouter manuellement :

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Directive Travailleurs Détachés UE 2024",
  "author": {
    "@type": "Organization",
    "name": "YOJOB"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2025-01-05"
}
</script>
```

---

## ✅ Checklist d'Implémentation

### Pour chaque nouvelle page

- [ ] Importer `SEOHead` et `useSEOH1`
- [ ] Ajouter `<SEOHead page="..." lang={currentLang} />` en début de composant
- [ ] Utiliser `const h1Text = useSEOH1('...', currentLang)` pour le H1
- [ ] Remplacer le texte H1 statique par `{h1Text}`
- [ ] Activer `includeServiceSchema` si page de service
- [ ] Vérifier que le changement de langue met à jour le SEO

### Validation SEO

- [ ] Title ≤ 60 caractères (vérifier dans l'onglet navigateur)
- [ ] Meta-description ≤ 160 caractères
- [ ] H1 visible correspond au Title SEO
- [ ] Schéma Organization présent dans le code source
- [ ] Schéma Service présent si `includeServiceSchema={true}`
- [ ] Attribut `lang` sur `<html>` correspond à la langue active
- [ ] Open Graph tags présents (vérifier avec Facebook Debugger)
- [ ] Twitter Card tags présents

---

## 🔍 Outils de Test SEO

### 1. Google Search Console
```
https://search.google.com/search-console
```
Vérifier l'indexation et les erreurs.

### 2. Rich Results Test (Google)
```
https://search.google.com/test/rich-results
```
Valider les schémas structurés.

### 3. Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
Vérifier les Open Graph tags.

### 4. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```
Vérifier les Twitter Cards.

### 5. Schema Markup Validator
```
https://validator.schema.org/
```
Valider la syntaxe JSON-LD.

---

## 📈 Mots-Clés Ciblés

### Priorité 1 (Volume élevé)
- `détachement de personnel européen`
- `intérim Portugal`
- `travailleurs détachés BTP`
- `recrutement européen`

### Priorité 2 (Longue traîne)
- `ouvriers qualifiés Portugal`
- `main-d'œuvre BTP Roumanie`
- `détachement industrie Pologne`
- `recrutement international BTP`

### Priorité 3 (Métiers spécifiques)
- `maçons Portugal`
- `coffreurs Roumanie`
- `électriciens Pologne`
- `opérateurs agroalimentaire Europe`

---

## 🎨 Cohérence Design / SEO

### H1 : Tailwind styling suggéré

```tsx
<h1 className="text-center mb-8">
  {h1Text}
</h1>
```

**IMPORTANT :** Ne pas utiliser de classes `text-*` (taille), `font-*` (poids) car le système global s'en charge.

---

## 🌐 URLs Optimisées Suggérées

| Page | URL Recommandée |
|------|-----------------|
| Home | `/` |
| BTP | `/detachement-personnel-btp-portugal-roumanie-pologne` |
| Industrie | `/detachement-industrie-agroalimentaire-europe` |
| Méthode | `/methode-recrutement-europeen` |
| Contact | `/demande-devis-detachement-personnel` |
| Blog | `/guide-directive-travailleurs-detaches-2024` |
| Devis | `/simulateur-devis-detachement-europeen` |

---

## 🚨 Erreurs à Éviter

### ❌ NE PAS FAIRE

```tsx
// Mauvais : H1 statique non traduit
<h1>Détachement de personnel européen</h1>

// Mauvais : Title en dur dans index.html
<title>YOJOB</title>

// Mauvais : Mélanger Organization + Service dans 1 seul schéma
{
  "@type": ["Organization", "Service"], // ❌
}
```

### ✅ FAIRE

```tsx
// Bon : H1 dynamique traduit
const h1Text = useSEOH1('home', currentLang);
<h1>{h1Text}</h1>

// Bon : Title géré par SEOHead
<SEOHead page="home" lang={currentLang} />

// Bon : Schémas séparés
<SEOHead page="home" includeServiceSchema={true} />
```

---

## 📊 Exemple Complet : Formulaire Devis

```tsx
import { useState } from 'react';
import { SEOHead, useSEOH1 } from './components/SEOHead';
import { LanguageSelector } from './components/devis/LanguageSelector';
import type { DevisLanguage } from './src/i18n/devis/types';

export function DevisFormPage() {
  const [language, setLanguage] = useState<DevisLanguage>('fr');
  const h1Text = useSEOH1('devis-form', language);

  return (
    <>
      {/* ============================================ */}
      {/* SEO : Title, Meta, Schema automatiques      */}
      {/* ============================================ */}
      <SEOHead 
        page="devis-form" 
        lang={language}
        includeServiceSchema={true}
      />

      {/* ============================================ */}
      {/* Header avec sélecteur de langue             */}
      {/* ============================================ */}
      <div className="bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4] min-h-screen p-8">
        
        <div className="max-w-4xl mx-auto">
          
          {/* Sélecteur de langue (change aussi le SEO) */}
          <LanguageSelector 
            value={language}
            onChange={setLanguage}
            className="mb-8"
          />

          {/* H1 SEO-optimisé et traduit */}
          <h1 className="text-center text-white mb-8">
            {h1Text}
          </h1>

          {/* Formulaire multi-étapes */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
            {/* ... */}
          </div>

        </div>
      </div>
    </>
  );
}
```

---

## 🔄 Workflow de Traduction

### Si besoin d'ajouter une nouvelle langue

1. **Éditer `/src/i18n/seo/metadata.ts`**
2. Ajouter la langue dans `DevisLanguage` (déjà fait)
3. Traduire les 6 pages pour cette langue
4. **Outils recommandés :**
   - DeepL Pro (meilleure qualité)
   - Google Translate (rapide)
   - Validation par natif (idéal)

### Template de traduction

```typescript
'NOUVELLE_LANGUE': {
  title: 'Traduire ici (max 60 char)',
  description: 'Traduire ici (max 160 char)',
  h1: 'Traduire ici (pas de limite mais raisonnable)'
}
```

---

## 📞 Support & Questions

**Mainteneur SEO :** Équipe YOJOB Dev  
**Dernière mise à jour :** 05 Janvier 2025  
**Version :** 2.0.0

---

## 🎯 Résumé : Quick Start

```tsx
// 1. Importer
import { SEOHead, useSEOH1 } from './components/SEOHead';

// 2. Dans votre composant
const h1 = useSEOH1('home', 'fr');

// 3. Dans le JSX
return (
  <>
    <SEOHead page="home" lang="fr" includeServiceSchema={true} />
    <h1>{h1}</h1>
  </>
);
```

**C'est tout ! Le SEO est géré automatiquement.** ✅
