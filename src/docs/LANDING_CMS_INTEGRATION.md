# 🎨 Landing Page CMS - Guide d'intégration

## 📋 Vue d'ensemble

Ce document décrit comment connecter le **Content & Localisation Manager** (mini CMS) à la landing page YOJOB existante **sans modifier sa structure**.

---

## 🗂️ Architecture des fichiers

### Structure créée

```
/types/
  └── landingContent.ts          # Types TypeScript pour le contenu multilingue

/content/landing/
  ├── index.ts                   # Export centralisé
  ├── fr.ts                      # Contenu français (référence)
  ├── en.ts                      # Contenu anglais
  └── [autres langues].ts        # À ajouter progressivement

/components/dashboard/
  └── LandingContentManager.tsx  # Interface CMS (page admin)

/App-Landing.tsx                 # Landing page (À CONNECTER)
```

---

## 🔌 Connexion non-destructive à la landing

### Étape 1 : Import du contenu dans App-Landing.tsx

**Ajouter en haut du fichier** :

```tsx
import { getLandingContent } from './content/landing';
import type { LanguageCode } from './types/landingContent';
```

### Étape 2 : State de langue dans le composant

**Dans le composant `AppLanding`** :

```tsx
export default function AppLanding() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('fr');
  const content = getLandingContent(currentLang);
  
  // ... reste du code
}
```

### Étape 3 : Remplacement des textes en dur

**❌ AVANT (texte en dur)** :

```tsx
<h1>Votre partenaire pour recruter en Europe</h1>
<p>Accédez à un réseau de 500+ agences...</p>
<Badge>⭐ Leader du recrutement européen</Badge>
```

**✅ APRÈS (via contenu dynamique)** :

```tsx
<h1>{content.hero.title}</h1>
<p>{content.hero.subtitle}</p>
<Badge>{content.hero.badge}</Badge>
```

---

## 📍 Mapping des clés de contenu par section

### Section Hero

| Élément UI | Clé de contenu | Type |
|------------|----------------|------|
| Badge premium | `content.hero.badge` | string |
| Titre H1 | `content.hero.title` | string |
| Sous-titre | `content.hero.subtitle` | string |
| Bénéfices (4 items) | `content.hero.benefits[0-3]` | string[] |
| CTA Primaire | `content.hero.ctaPrimaryLabel` | string |
| CTA Secondaire | `content.hero.ctaSecondaryLabel` | string |
| Stats - Agences | `content.hero.stats.agencies.value` / `.label` | object |
| Stats - Pays | `content.hero.stats.countries.value` / `.label` | object |
| Stats - Missions | `content.hero.stats.missions.value` / `.label` | object |

**Exemple d'implémentation** :

```tsx
{/* Badge */}
<Badge className="...">
  {content.hero.badge}
</Badge>

{/* Titre */}
<h1 className="...">
  {content.hero.title}
</h1>

{/* Sous-titre */}
<p className="...">
  {content.hero.subtitle}
</p>

{/* Bénéfices */}
{content.hero.benefits.map((benefit, i) => (
  <div key={i}>
    <CheckCircle />
    <span>{benefit}</span>
  </div>
))}

{/* CTAs */}
<Button>{content.hero.ctaPrimaryLabel}</Button>
<Button>{content.hero.ctaSecondaryLabel}</Button>

{/* Stats */}
<CountUpStat 
  end={parseInt(content.hero.stats.agencies.value)} 
  label={content.hero.stats.agencies.label} 
/>
```

---

### Section Services

| Élément UI | Clé de contenu |
|------------|----------------|
| Badge | `content.services.badge` |
| Titre H2 | `content.services.title` |
| Sous-titre | `content.services.subtitle` |
| Service 1 titre | `content.services.services[0].title` |
| Service 1 description | `content.services.services[0].description` |
| Service 1 lien | `content.services.services[0].linkLabel` |

**Exemple** :

```tsx
<h2>{content.services.title}</h2>
<p>{content.services.subtitle}</p>

{content.services.services.map((service, i) => (
  <Card key={i}>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <Link>{service.linkLabel} <ArrowRight /></Link>
  </Card>
))}
```

---

### Section Réseau Européen

| Élément UI | Clé de contenu |
|------------|----------------|
| Badge | `content.network.badge` |
| Titre | `content.network.title` |
| Badge Waitlist | `content.network.waitlist.badge` |
| Titre Waitlist | `content.network.waitlist.title` |
| Sous-titre Waitlist | `content.network.waitlist.subtitle` |
| Features Waitlist | `content.network.waitlist.features[0-3]` |
| Placeholder Email | `content.network.waitlist.emailPlaceholder` |
| CTA Waitlist | `content.network.waitlist.ctaLabel` |

**Exemple** :

```tsx
<Badge>{content.network.waitlist.badge}</Badge>
<h3>{content.network.waitlist.title}</h3>
<p>{content.network.waitlist.subtitle}</p>

{content.network.waitlist.features.map((feature, i) => (
  <div key={i}>
    <CheckCircle />
    <span>{feature}</span>
  </div>
))}

<Input placeholder={content.network.waitlist.emailPlaceholder} />
<Button>{content.network.waitlist.ctaLabel}</Button>
```

---

### Section Comment ça marche

| Élément UI | Clé de contenu |
|------------|----------------|
| Badge | `content.steps.badge` |
| Titre | `content.steps.title` |
| Sous-titre | `content.steps.subtitle` |
| Étape 1 numéro | `content.steps.steps[0].number` |
| Étape 1 titre | `content.steps.steps[0].title` |
| Étape 1 description | `content.steps.steps[0].description` |

**Exemple** :

```tsx
{content.steps.steps.map((step, i) => (
  <Card key={i}>
    <Badge>{step.number}</Badge>
    <h4>{step.title}</h4>
    <p>{step.description}</p>
  </Card>
))}
```

---

### Section Témoignages

| Élément UI | Clé de contenu |
|------------|----------------|
| Badge | `content.testimonials.badge` |
| Titre | `content.testimonials.title` |
| Témoignage 1 nom | `content.testimonials.testimonials[0].name` |
| Témoignage 1 poste | `content.testimonials.testimonials[0].position` |
| Témoignage 1 entreprise | `content.testimonials.testimonials[0].company` |
| Témoignage 1 citation | `content.testimonials.testimonials[0].quote` |
| Témoignage 1 rating | `content.testimonials.testimonials[0].rating` |

**Exemple** :

```tsx
<TestimonialCarousel testimonials={content.testimonials.testimonials} />
```

---

### Section CTA / Formulaire

| Élément UI | Clé de contenu |
|------------|----------------|
| Titre | `content.ctaForm.title` |
| Sous-titre | `content.ctaForm.subtitle` |
| Nom - Label | `content.ctaForm.form.fields.name.label` |
| Nom - Placeholder | `content.ctaForm.form.fields.name.placeholder` |
| Email - Label | `content.ctaForm.form.fields.email.label` |
| Téléphone - Label | `content.ctaForm.form.fields.phone.label` |
| CTA Label | `content.ctaForm.form.ctaLabel` |
| Note sécurité | `content.ctaForm.form.securityNote` |
| Message succès | `content.ctaForm.form.successMessage` |

**Exemple** :

```tsx
<Label>{content.ctaForm.form.fields.name.label}</Label>
<Input placeholder={content.ctaForm.form.fields.name.placeholder} />

<Button type="submit">
  {content.ctaForm.form.ctaLabel}
</Button>
```

---

### Section Footer

| Élément UI | Clé de contenu |
|------------|----------------|
| Tagline | `content.footer.logo.tagline` |
| Services titre | `content.footer.columns.services.title` |
| Services liens | `content.footer.columns.services.links[i].label` |
| Entreprise titre | `content.footer.columns.company.title` |
| Contact adresse | `content.footer.columns.contact.address` |
| Contact téléphone | `content.footer.columns.contact.phone` |
| Contact email | `content.footer.columns.contact.email` |
| Copyright | `content.footer.bottom.copyright` |

**Exemple** :

```tsx
<p>{content.footer.logo.tagline}</p>

<h4>{content.footer.columns.services.title}</h4>
{content.footer.columns.services.links.map((link, i) => (
  <a key={i} href={link.href}>{link.label}</a>
))}

<p>{content.footer.bottom.copyright}</p>
```

---

## 🌍 Sélecteur de langue

**Ajouter un sélecteur dans le header de la landing** :

```tsx
<Select value={currentLang} onValueChange={(v) => setCurrentLang(v as LanguageCode)}>
  <SelectTrigger>
    <Globe className="w-4 h-4 mr-2" />
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="fr">🇫🇷 Français</SelectItem>
    <SelectItem value="en">🇬🇧 English</SelectItem>
    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
    {/* ... autres langues */}
  </SelectContent>
</Select>
```

---

## 🔍 SEO Dynamique

**Ajouter dans `<head>` ou via un composant SEO** :

```tsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{content.seo.metaTitle}</title>
  <meta name="description" content={content.seo.metaDescription} />
  <meta property="og:title" content={content.seo.ogTitle} />
  <meta property="og:description" content={content.seo.ogDescription} />
  <link rel="canonical" href={`https://yojob.com${content.seo.slug}`} />
</Helmet>
```

---

## ⚙️ Workflow de traduction

### 1. Édition du contenu français (référence)

1. Se connecter au dashboard admin
2. Aller dans **Content & Localisation Manager**
3. Sélectionner **FR** comme langue
4. Modifier les textes dans les sections
5. Cliquer sur **Sauvegarder**

### 2. Génération des traductions IA

1. Sélectionner une langue cible (ex: **DE**)
2. Cliquer sur **Traduire avec l'IA** (bouton Sparkles)
3. Le système génère automatiquement la traduction depuis le FR
4. Vérifier et ajuster si nécessaire
5. Changer le statut en **Validée**

### 3. Publication

1. Les contenus sont stockés dans `/content/landing/[lang].ts`
2. La landing consomme automatiquement le contenu via `getLandingContent(lang)`
3. Aucun redéploiement nécessaire si utilisation d'une base de données (future amélioration)

---

## 🚀 Migration progressive

### Phase 1 (Actuel)
- ✅ Types TypeScript créés
- ✅ Contenu FR + EN créés
- ✅ Interface CMS créée
- ⏳ Connexion à la landing (à faire)

### Phase 2 (Recommandé)
- Remplacer textes Hero
- Remplacer textes Services
- Remplacer textes Network
- Remplacer textes Steps
- Remplacer textes Testimonials
- Remplacer textes CTA Form
- Remplacer textes Footer

### Phase 3 (Avancé)
- Stocker les contenus en base Supabase
- API pour édition en temps réel
- Historique des versions
- Preview avant publication

---

## 📊 Structure de données complète

Voir les fichiers :
- `/types/landingContent.ts` - Tous les types TypeScript
- `/content/landing/fr.ts` - Exemple de contenu complet
- `/content/landing/en.ts` - Exemple de traduction

---

## 🎯 Points de vigilance

### ⚠️ À NE PAS FAIRE
- ❌ Modifier la structure HTML/JSX de la landing
- ❌ Changer les classes Tailwind existantes
- ❌ Supprimer des éléments visuels
- ❌ Casser les animations Motion

### ✅ À FAIRE
- ✅ Remplacer uniquement les textes
- ✅ Conserver tous les composants existants
- ✅ Préserver les effets glassmorphism
- ✅ Garder les gradients et couleurs

---

## 📱 Accès à l'interface CMS

### Option 1 : Route dédiée

Ajouter dans `/DashboardApp.tsx` ou créer une nouvelle route :

```tsx
import { LandingContentManager } from './components/dashboard/LandingContentManager';

// Dans le router
<Route path="/admin/landing-content" element={<LandingContentManager />} />
```

### Option 2 : Onglet dans le dashboard

Ajouter un nouvel onglet dans le menu admin :

```tsx
<TabsList>
  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
  <TabsTrigger value="results">Résultats</TabsTrigger>
  <TabsTrigger value="landing">Landing CMS</TabsTrigger> {/* NOUVEAU */}
</TabsList>

<TabsContent value="landing">
  <LandingContentManager />
</TabsContent>
```

---

## 🔧 Configuration future (base de données)

Pour une solution dynamique avec Supabase :

### Table `landing_content`

```sql
CREATE TABLE landing_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code varchar(5) NOT NULL,
  section varchar(50) NOT NULL,
  key varchar(100) NOT NULL,
  value text NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(language_code, section, key)
);
```

### API Route

```tsx
// GET /api/landing-content/:lang
export async function getLandingContentAPI(lang: LanguageCode) {
  const { data } = await supabase
    .from('landing_content')
    .select('*')
    .eq('language_code', lang);
  
  return formatLandingContent(data);
}
```

---

## 🎨 Démonstration visuelle

```
┌─────────────────────────────────────────────┐
│  DASHBOARD ADMIN                            │
│  ┌──────────────────────────────────────┐   │
│  │ Content & Localisation Manager       │   │
│  │                                      │   │
│  │ [FR] [EN] [DE] [ES] ... + Tous       │   │
│  │                                      │   │
│  │ ┌─────────────┐  ┌─────────────────┐│   │
│  │ │ Bloc A      │  │ Bloc B          ││   │
│  │ │ Structure   │  │ Langues         ││   │
│  │ │ Contenus    │  │                 ││   │
│  │ │             │  │ 🇫🇷 FR ✅       ││   │
│  │ │ Hero        │  │ 🇬🇧 EN ✅       ││   │
│  │ │ Services    │  │ 🇩🇪 DE ⏳       ││   │
│  │ │ Network     │  │ 🇪🇸 ES ⏳       ││   │
│  │ │ Steps       │  │                 ││   │
│  │ │ ...         │  │ ┌─────────────┐ ││   │
│  │ └─────────────┘  │ │ Bloc C      │ ││   │
│  │                  │ │ SEO & IA    │ ││   │
│  │                  │ │             │ ││   │
│  │                  │ │ Meta Title  │ ││   │
│  │                  │ │ Meta Desc.  │ ││   │
│  │                  │ │ Résumé IA   │ ││   │
│  │                  │ │ FAQ         │ ││   │
│  │                  │ └─────────────┘ ││   │
│  │                  └─────────────────┘│   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
           ↓
     [Sauvegarde]
           ↓
    /content/landing/fr.ts
    /content/landing/en.ts
           ↓
    getLandingContent('fr')
           ↓
┌─────────────────────────────────────────────┐
│  LANDING PAGE (App-Landing.tsx)             │
│                                             │
│  Hero:    {content.hero.title}              │
│  Services: {content.services.title}         │
│  Network:  {content.network.title}          │
│  ...                                        │
└─────────────────────────────────────────────┘
```

---

## 📚 Ressources

- **Types** : `/types/landingContent.ts`
- **Contenu FR** : `/content/landing/fr.ts`
- **Contenu EN** : `/content/landing/en.ts`
- **Interface CMS** : `/components/dashboard/LandingContentManager.tsx`
- **Landing** : `/App-Landing.tsx`

---

**Version** : 1.0  
**Dernière mise à jour** : 7 décembre 2024  
**Auteur** : Équipe YOJOB Dev
