# 🗂️ Référence complète des clés de contenu

## 📋 Vue d'ensemble

Ce document liste **toutes les clés de contenu** disponibles dans le système CMS de la landing page YOJOB.

Chaque clé suit la structure :
```
landing.[langue].[section].[champ]
```

**Exemple** :
```typescript
landing.fr.hero.title
landing.en.services.subtitle
landing.de.network.waitlist.ctaLabel
```

---

## 🌍 Langues supportées

| Code | Langue | Nom natif | Flag |
|------|--------|-----------|------|
| `fr` | French | Français | 🇫🇷 |
| `en` | English | English | 🇬🇧 |
| `de` | German | Deutsch | 🇩🇪 |
| `es` | Spanish | Español | 🇪🇸 |
| `it` | Italian | Italiano | 🇮🇹 |
| `pt` | Portuguese | Português | 🇵🇹 |
| `nl` | Dutch | Nederlands | 🇳🇱 |
| `pl` | Polish | Polski | 🇵🇱 |
| `ro` | Romanian | Română | 🇷🇴 |
| `bg` | Bulgarian | Български | 🇧🇬 |
| `hu` | Hungarian | Magyar | 🇭🇺 |
| `cs` | Czech | Čeština | 🇨🇿 |
| `sk` | Slovak | Slovenčina | 🇸🇰 |
| `hr` | Croatian | Hrvatski | 🇭🇷 |
| `sl` | Slovenian | Slovenščina | 🇸🇮 |
| `lt` | Lithuanian | Lietuvių | 🇱🇹 |
| `lv` | Latvian | Latviešu | 🇱🇻 |
| `et` | Estonian | Eesti | 🇪🇪 |
| `el` | Greek | Ελληνικά | 🇬🇷 |
| `sv` | Swedish | Svenska | 🇸🇪 |
| `da` | Danish | Dansk | 🇩🇰 |
| `fi` | Finnish | Suomi | 🇫🇮 |
| `no` | Norwegian | Norsk | 🇳🇴 |

---

## 🔍 Section : SEO & Meta

### Clés disponibles

| Clé | Type | Description | Limite | Exemple FR |
|-----|------|-------------|--------|------------|
| `seo.metaTitle` | string | Titre pour Google | 60 car. | "YOJOB - Plateforme européenne..." |
| `seo.metaDescription` | string | Description pour Google | 160 car. | "Centralisez vos démarches..." |
| `seo.slug` | string | URL de la page | - | "/" ou "/fr" |
| `seo.h1` | string | Titre H1 principal | - | "Votre plateforme tout-en-un..." |
| `seo.ogTitle` | string | Titre Open Graph | 60 car. | "YOJOB - Détachement simplifié" |
| `seo.ogDescription` | string | Description Open Graph | 160 car. | "Gérez vos démarches..." |
| `seo.ogImage` | string | Image Open Graph (URL) | - | "/images/og-image.jpg" |
| `seo.altTexts.heroVisual` | string | Alt de l'image hero | - | "Carte interactive de l'Europe..." |
| `seo.altTexts.europeMap` | string | Alt carte Europe | - | "Carte d'Europe avec 27 pays" |
| `seo.altTexts.logoFooter` | string | Alt logo footer | - | "Logo YOJOB" |
| `seo.aiSummary` | string | Résumé pour IA | 500 car. | "YOJOB est une plateforme..." |
| `seo.faq[i].question` | string | Question FAQ | - | "Qu'est-ce que YOJOB ?" |
| `seo.faq[i].answer` | string | Réponse FAQ | - | "YOJOB est une plateforme..." |

### Exemple complet (TypeScript)

```typescript
{
  seo: {
    metaTitle: "YOJOB - Plateforme européenne de détachement | 27 pays",
    metaDescription: "Centralisez vos démarches de détachement...",
    slug: "/",
    h1: "Votre plateforme tout-en-un du détachement européen",
    ogTitle: "YOJOB - Détachement de personnel simplifié en Europe",
    ogDescription: "Gérez vos démarches de détachement avec YOJOB...",
    altTexts: {
      heroVisual: "Carte interactive de l'Europe montrant le réseau YOJOB",
      europeMap: "Carte d'Europe avec les 27 pays couverts par YOJOB",
      logoFooter: "Logo YOJOB - Plateforme européenne de détachement",
    },
    aiSummary: "YOJOB est une plateforme européenne spécialisée...",
    faq: [
      {
        question: "Qu'est-ce que YOJOB ?",
        answer: "YOJOB est une plateforme européenne..."
      }
    ]
  }
}
```

---

## 🦸 Section : Hero

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `hero.badge` | string | Badge premium | "⭐ Leader du recrutement européen" |
| `hero.title` | string | Titre H1 principal | "Votre partenaire pour recruter en Europe" |
| `hero.subtitle` | string | Sous-titre descriptif | "Accédez à un réseau de 500+ agences..." |
| `hero.benefits[0]` | string | Bénéfice 1 | "Dossiers centralisés et sécurisés" |
| `hero.benefits[1]` | string | Bénéfice 2 | "Démarches administratives en ligne" |
| `hero.benefits[2]` | string | Bénéfice 3 | "Gestion des offres d'emploi" |
| `hero.benefits[3]` | string | Bénéfice 4 | "Conformité multi-pays" |
| `hero.ctaPrimaryLabel` | string | Label CTA principal | "Demander un devis" |
| `hero.ctaSecondaryLabel` | string | Label CTA secondaire | "Découvrir notre réseau" |
| `hero.stats.agencies.value` | string | Valeur stat agences | "500+" |
| `hero.stats.agencies.label` | string | Label stat agences | "agences partenaires" |
| `hero.stats.countries.value` | string | Valeur stat pays | "27" |
| `hero.stats.countries.label` | string | Label stat pays | "pays européens" |
| `hero.stats.missions.value` | string | Valeur stat missions | "2000+" |
| `hero.stats.missions.label` | string | Label stat missions | "missions réussies" |

### Exemple complet

```typescript
{
  hero: {
    badge: "⭐ Leader du recrutement européen",
    title: "Votre partenaire pour recruter en Europe",
    subtitle: "Accédez à un réseau de 500+ agences d'emploi dans 27 pays...",
    benefits: [
      "Dossiers centralisés et sécurisés",
      "Démarches administratives en ligne",
      "Gestion des offres d'emploi",
      "Conformité multi-pays"
    ],
    ctaPrimaryLabel: "Demander un devis",
    ctaSecondaryLabel: "Découvrir notre réseau",
    stats: {
      agencies: { value: "500+", label: "agences partenaires" },
      countries: { value: "27", label: "pays européens" },
      missions: { value: "2000+", label: "missions réussies" }
    }
  }
}
```

---

## 📊 Section : Stats

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `stats.badge` | string | Badge de la section | "📊 Nos chiffres clés" |
| `stats.title` | string | Titre de la section | "Une expertise reconnue en Europe" |
| `stats.items[0].value` | string | Valeur stat 1 | "10+" |
| `stats.items[0].label` | string | Label stat 1 | "ans d'expertise" |
| `stats.items[0].icon` | string | Icône stat 1 | "Target" |
| `stats.items[1].value` | string | Valeur stat 2 | "27" |
| `stats.items[1].label` | string | Label stat 2 | "pays couverts" |
| `stats.items[1].icon` | string | Icône stat 2 | "Globe" |
| `stats.items[2].value` | string | Valeur stat 3 | "500+" |
| `stats.items[2].label` | string | Label stat 3 | "agences partenaires" |
| `stats.items[2].icon` | string | Icône stat 3 | "Network" |
| `stats.items[3].value` | string | Valeur stat 4 | "2000+" |
| `stats.items[3].label` | string | Label stat 4 | "missions réalisées" |
| `stats.items[3].icon` | string | Icône stat 4 | "CheckCircle" |

---

## 💼 Section : Services

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `services.badge` | string | Badge | "💼 Nos services" |
| `services.title` | string | Titre H2 | "Des solutions adaptées à vos besoins" |
| `services.subtitle` | string | Sous-titre | "Nous vous accompagnons dans toutes vos démarches..." |
| `services.services[0].icon` | string | Icône service 1 | "Users" |
| `services.services[0].title` | string | Titre service 1 | "Intérim européen" |
| `services.services[0].description` | string | Description service 1 | "Recrutement de personnel temporaire..." |
| `services.services[0].linkLabel` | string | Label lien service 1 | "En savoir plus" |
| `services.services[1].icon` | string | Icône service 2 | "Target" |
| `services.services[1].title` | string | Titre service 2 | "Recrutement spécialisé" |
| `services.services[1].description` | string | Description service 2 | "Trouvez les talents dont vous avez besoin..." |
| `services.services[1].linkLabel` | string | Label lien service 2 | "En savoir plus" |
| `services.services[2].icon` | string | Icône service 3 | "ShieldCheck" |
| `services.services[2].title` | string | Titre service 3 | "Conseil & Conformité" |
| `services.services[2].description` | string | Description service 3 | "Assurez-vous de respecter..." |
| `services.services[2].linkLabel` | string | Label lien service 3 | "En savoir plus" |

### Exemple complet

```typescript
{
  services: {
    badge: "💼 Nos services",
    title: "Des solutions adaptées à vos besoins",
    subtitle: "Nous vous accompagnons dans toutes vos démarches...",
    services: [
      {
        icon: "Users",
        title: "Intérim européen",
        description: "Recrutement de personnel temporaire partout en Europe...",
        linkLabel: "En savoir plus"
      },
      {
        icon: "Target",
        title: "Recrutement spécialisé",
        description: "Trouvez les talents dont vous avez besoin...",
        linkLabel: "En savoir plus"
      },
      {
        icon: "ShieldCheck",
        title: "Conseil & Conformité",
        description: "Assurez-vous de respecter toutes les réglementations...",
        linkLabel: "En savoir plus"
      }
    ]
  }
}
```

---

## 🌍 Section : Network (Réseau Européen)

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `network.badge` | string | Badge section | "🌍 Réseau Européen" |
| `network.title` | string | Titre section | "Un réseau qui couvre toute l'Europe" |
| `network.subtitle` | string | Sous-titre | "Plus de 500 agences partenaires dans 27 pays..." |
| `network.waitlist.badge` | string | Badge waitlist | "✨ Nouveauté 2026" |
| `network.waitlist.title` | string | Titre waitlist | "Votre plateforme tout-en-un..." |
| `network.waitlist.subtitle` | string | Sous-titre waitlist | "Centralisez tous vos documents..." |
| `network.waitlist.features[0]` | string | Feature 1 | "Dossiers centralisés et sécurisés" |
| `network.waitlist.features[1]` | string | Feature 2 | "Démarches administratives en ligne" |
| `network.waitlist.features[2]` | string | Feature 3 | "Gestion des offres d'emploi" |
| `network.waitlist.features[3]` | string | Feature 4 | "Conformité multi-pays" |
| `network.waitlist.emailPlaceholder` | string | Placeholder email | "Votre adresse email professionnelle" |
| `network.waitlist.ctaLabel` | string | Label CTA | "Rejoindre la liste d'attente" |

---

## 🎯 Section : Steps (Comment ça marche)

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `steps.badge` | string | Badge | "🎯 Comment ça marche" |
| `steps.title` | string | Titre | "Un processus simple et efficace" |
| `steps.subtitle` | string | Sous-titre | "En 4 étapes, trouvez les talents..." |
| `steps.steps[0].number` | string | Numéro étape 1 | "01" |
| `steps.steps[0].title` | string | Titre étape 1 | "Décrivez votre besoin" |
| `steps.steps[0].description` | string | Description étape 1 | "Partagez-nous vos besoins..." |
| `steps.steps[0].icon` | string | Icône étape 1 | "FileText" |
| `steps.steps[1].number` | string | Numéro étape 2 | "02" |
| `steps.steps[1].title` | string | Titre étape 2 | "Nous activons notre réseau" |
| `steps.steps[1].description` | string | Description étape 2 | "Nos agences partenaires dans toute l'Europe..." |
| `steps.steps[1].icon` | string | Icône étape 2 | "Network" |
| `steps.steps[2].number` | string | Numéro étape 3 | "03" |
| `steps.steps[2].title` | string | Titre étape 3 | "Validez les candidats" |
| `steps.steps[2].description` | string | Description étape 3 | "Nous vous présentons une sélection..." |
| `steps.steps[2].icon` | string | Icône étape 3 | "UserCheck" |
| `steps.steps[3].number` | string | Numéro étape 4 | "04" |
| `steps.steps[3].title` | string | Titre étape 4 | "Accueillez votre équipe" |
| `steps.steps[3].description` | string | Description étape 4 | "Nous gérons toutes les formalités..." |
| `steps.steps[3].icon` | string | Icône étape 4 | "CheckCircle" |

---

## ⭐ Section : Testimonials (Témoignages)

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `testimonials.badge` | string | Badge | "⭐ Témoignages" |
| `testimonials.title` | string | Titre | "Ils nous font confiance" |
| `testimonials.subtitle` | string | Sous-titre | "Découvrez les retours d'expérience..." |
| `testimonials.testimonials[0].name` | string | Nom témoignage 1 | "Marc Durand" |
| `testimonials.testimonials[0].position` | string | Poste | "Directeur RH" |
| `testimonials.testimonials[0].company` | string | Entreprise | "BTP Solutions France" |
| `testimonials.testimonials[0].quote` | string | Citation | "YOJOB nous a permis de recruter..." |
| `testimonials.testimonials[0].rating` | number | Note (1-5) | 5 |
| `testimonials.testimonials[0].sector` | string | Secteur | "BTP" |
| `testimonials.testimonials[0].avatar` | string | URL avatar (optionnel) | "/avatars/marc.jpg" |

---

## 🏭 Section : Sectors (Secteurs d'activité)

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `sectors.badge` | string | Badge | "🏭 Secteurs d'activité" |
| `sectors.title` | string | Titre | "Nous intervenons dans tous les secteurs" |
| `sectors.subtitle` | string | Sous-titre | "Notre expertise couvre l'ensemble..." |
| `sectors.sectors[0].icon` | string | Icône secteur 1 | "Building2" |
| `sectors.sectors[0].name` | string | Nom secteur 1 | "BTP" |
| `sectors.sectors[0].color` | string | Couleur secteur 1 | "orange" |
| `sectors.sectors[1].icon` | string | Icône secteur 2 | "Factory" |
| `sectors.sectors[1].name` | string | Nom secteur 2 | "Industrie" |
| `sectors.sectors[1].color` | string | Couleur secteur 2 | "blue" |

**Secteurs disponibles** : BTP, Industrie, Agriculture, Hôtellerie, Santé, Tech

---

## 📞 Section : CTA Form (Formulaire de contact)

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `ctaForm.badge` | string | Badge | "📞 Contactez-nous" |
| `ctaForm.title` | string | Titre | "Prêt à recruter en Europe ?" |
| `ctaForm.subtitle` | string | Sous-titre | "Parlez-nous de votre projet..." |
| `ctaForm.benefits[0].icon` | string | Icône bénéfice 1 | "Users" |
| `ctaForm.benefits[0].title` | string | Titre bénéfice 1 | "Accompagnement personnalisé" |
| `ctaForm.benefits[0].description` | string | Description bénéfice 1 | "Un expert dédié pour votre projet" |
| `ctaForm.form.fields.name.label` | string | Label nom | "Nom complet" |
| `ctaForm.form.fields.name.placeholder` | string | Placeholder nom | "Jean Dupont" |
| `ctaForm.form.fields.email.label` | string | Label email | "Email professionnel" |
| `ctaForm.form.fields.email.placeholder` | string | Placeholder email | "jean.dupont@entreprise.fr" |
| `ctaForm.form.fields.phone.label` | string | Label téléphone | "Téléphone" |
| `ctaForm.form.fields.phone.placeholder` | string | Placeholder téléphone | "+33 6 12 34 56 78" |
| `ctaForm.form.fields.company.label` | string | Label entreprise | "Entreprise" |
| `ctaForm.form.fields.company.placeholder` | string | Placeholder entreprise | "Nom de votre entreprise" |
| `ctaForm.form.fields.needType.label` | string | Label type besoin | "Type de besoin" |
| `ctaForm.form.fields.needType.placeholder` | string | Placeholder type besoin | "Sélectionnez un type de besoin" |
| `ctaForm.form.fields.message.label` | string | Label message | "Décrivez votre besoin" |
| `ctaForm.form.fields.message.placeholder` | string | Placeholder message | "Décrivez-nous votre projet..." |
| `ctaForm.form.ctaLabel` | string | Label bouton CTA | "Envoyer ma demande" |
| `ctaForm.form.securityNote` | string | Note sécurité | "🔒 Vos données sont sécurisées..." |
| `ctaForm.form.successMessage` | string | Message succès | "Merci ! Nous vous recontacterons sous 24h." |

---

## 🦶 Section : Footer

### Clés disponibles

| Clé | Type | Description | Exemple FR |
|-----|------|-------------|------------|
| `footer.logo.tagline` | string | Slogan logo | "Votre partenaire de confiance..." |
| `footer.columns.services.title` | string | Titre colonne Services | "Services" |
| `footer.columns.services.links[0].label` | string | Label lien 1 | "Intérim européen" |
| `footer.columns.services.links[0].href` | string | URL lien 1 | "#interim" |
| `footer.columns.company.title` | string | Titre colonne Entreprise | "Entreprise" |
| `footer.columns.company.links[0].label` | string | Label lien 1 | "À propos" |
| `footer.columns.company.links[0].href` | string | URL lien 1 | "#about" |
| `footer.columns.contact.title` | string | Titre colonne Contact | "Contact" |
| `footer.columns.contact.address` | string | Adresse | "123 Avenue de l'Europe, 75001 Paris" |
| `footer.columns.contact.phone` | string | Téléphone | "+33 1 23 45 67 89" |
| `footer.columns.contact.email` | string | Email | "contact@yojob.fr" |
| `footer.social.linkedin` | string | URL LinkedIn | "https://linkedin.com/company/yojob" |
| `footer.social.twitter` | string | URL Twitter | "https://twitter.com/yojob" |
| `footer.social.facebook` | string | URL Facebook | "https://facebook.com/yojob" |
| `footer.bottom.copyright` | string | Copyright | "© 2026 YOJOB. Tous droits réservés..." |
| `footer.bottom.legalLinks[0].label` | string | Label lien légal 1 | "Mentions légales" |
| `footer.bottom.legalLinks[0].href` | string | URL lien légal 1 | "#mentions" |

---

## 🧩 Utilisation dans le code

### Import

```typescript
import { getLandingContent } from './content/landing';
import type { LanguageCode } from './types/landingContent';
```

### Récupération du contenu

```typescript
const content = getLandingContent('fr');
```

### Accès aux clés

```typescript
// Hero title
const heroTitle = content.hero.title;

// Service 1 description
const service1Desc = content.services.services[0].description;

// FAQ question 1
const faqQuestion1 = content.seo.faq[0].question;

// Footer copyright
const copyright = content.footer.bottom.copyright;
```

### Mapping dans JSX

```tsx
<h1>{content.hero.title}</h1>
<p>{content.hero.subtitle}</p>

{content.hero.benefits.map((benefit, i) => (
  <li key={i}>{benefit}</li>
))}

<Button>{content.hero.ctaPrimaryLabel}</Button>
```

---

## 📚 Ressources

- **Types complets** : `/types/landingContent.ts`
- **Contenu FR** : `/content/landing/fr.ts`
- **Contenu EN** : `/content/landing/en.ts`
- **Interface CMS** : `/components/dashboard/LandingContentManager.tsx`
- **Guide d'intégration** : `/docs/LANDING_CMS_INTEGRATION.md`
- **Guide utilisateur** : `/docs/CMS_USER_GUIDE.md`

---

**Version** : 1.0  
**Dernière mise à jour** : 7 décembre 2024
