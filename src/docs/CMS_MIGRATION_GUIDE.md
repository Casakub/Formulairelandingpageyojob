# 🔄 Migration Landing Page → CMS

## 🎯 Objectif

Ce guide explique comment migrer la landing page YOJOB existante (`/App-Landing.tsx`) vers le nouveau système CMS **sans casser le code existant**.

---

## ⚠️ Principes de migration

### ✅ À FAIRE

- Remplacer **uniquement les textes** par des clés de contenu
- Conserver **toute la structure JSX** existante
- Garder **toutes les classes Tailwind**
- Préserver **toutes les animations Motion**
- Tester après chaque section migrée

### ❌ À NE PAS FAIRE

- Modifier la structure HTML/JSX
- Supprimer des composants
- Changer les classes CSS
- Casser les effets glassmorphism
- Modifier les gradients

---

## 📋 Checklist de migration

### Phase 1 : Préparation (15 min)

- [ ] Lire ce guide entièrement
- [ ] Lire `/docs/LANDING_CMS_INTEGRATION.md`
- [ ] Créer une branche Git `feature/cms-migration`
- [ ] Faire un backup de `/App-Landing.tsx`
- [ ] Tester que la landing fonctionne actuellement

### Phase 2 : Import et setup (10 min)

- [ ] Ajouter les imports en haut de `/App-Landing.tsx`
- [ ] Ajouter le state de langue
- [ ] Créer la variable `content`
- [ ] Tester que l'app compile

### Phase 3 : Migration par section (2-3h)

- [ ] Section Header (sélecteur de langue)
- [ ] Section Hero (titre, sous-titre, bénéfices)
- [ ] Section Stats (4 statistiques)
- [ ] Section Services (3 services)
- [ ] Section Network (réseau + waitlist)
- [ ] Section Steps (4 étapes)
- [ ] Section Testimonials (témoignages)
- [ ] Section Sectors (6 secteurs)
- [ ] Section CTA Form (formulaire)
- [ ] Section Footer (pied de page)

### Phase 4 : Tests (30 min)

- [ ] Tester en français
- [ ] Tester en anglais
- [ ] Vérifier le responsive mobile
- [ ] Vérifier les animations
- [ ] Vérifier le formulaire
- [ ] Tester les liens du footer

### Phase 5 : Déploiement

- [ ] Commit et push
- [ ] Créer une Pull Request
- [ ] Review de code
- [ ] Merge et déploiement

---

## 🔧 Phase 2 : Import et setup

### Étape 1 : Ajouter les imports

**Fichier** : `/App-Landing.tsx`

**Ajouter en haut du fichier** (après les imports existants) :

```typescript
// Imports existants
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
// ... autres imports

// 🆕 NOUVEAUX IMPORTS CMS
import { getLandingContent } from './content/landing';
import type { LanguageCode } from './types/landingContent';
```

### Étape 2 : Ajouter le state de langue

**Dans le composant `export default function AppLanding()`** :

```typescript
export default function AppLanding() {
  // États existants
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 🆕 NOUVEAU STATE LANGUE
  const [currentLang, setCurrentLang] = useState<LanguageCode>('fr');
  const content = getLandingContent(currentLang);
  
  // ... reste du code existant
}
```

### Étape 3 : Tester la compilation

```bash
npm run dev
```

Si l'app compile sans erreur, passez à la phase suivante ✅

---

## 📝 Phase 3 : Migration par section

### Section 1 : Header - Sélecteur de langue

**Localisation** : Ligne ~50-100 (barre de navigation)

#### Avant

```tsx
<nav className="...">
  <div>Logo</div>
  <div>Navigation</div>
  <Button>Demander un devis</Button>
</nav>
```

#### Après

```tsx
<nav className="...">
  <div>Logo</div>
  <div>Navigation</div>
  
  {/* 🆕 Sélecteur de langue */}
  <Select value={currentLang} onValueChange={(v) => setCurrentLang(v as LanguageCode)}>
    <SelectTrigger className="w-24 bg-white/10 text-white border-white/20">
      <Globe className="w-4 h-4 mr-2" />
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="fr">🇫🇷 FR</SelectItem>
      <SelectItem value="en">🇬🇧 EN</SelectItem>
      <SelectItem value="de">🇩🇪 DE</SelectItem>
      <SelectItem value="es">🇪🇸 ES</SelectItem>
      {/* Ajouter d'autres langues si nécessaire */}
    </SelectContent>
  </Select>
  
  <Button>{content.hero.ctaPrimaryLabel}</Button>
</nav>
```

**Test** : Le sélecteur de langue apparaît ✅

---

### Section 2 : Hero

**Localisation** : Ligne ~150-400

#### Textes à remplacer

| Ligne approx. | Ancien texte (à chercher) | Nouvelle clé |
|---------------|---------------------------|--------------|
| ~170 | `"⭐ Leader du recrutement européen"` | `{content.hero.badge}` |
| ~180 | `"Votre partenaire pour recruter en Europe"` | `{content.hero.title}` |
| ~190 | `"Accédez à un réseau de 500+ agences..."` | `{content.hero.subtitle}` |
| ~210 | `"Demander un devis"` | `{content.hero.ctaPrimaryLabel}` |
| ~220 | `"Découvrir notre réseau"` | `{content.hero.ctaSecondaryLabel}` |

#### Exemple de migration

**Avant** :
```tsx
<Badge className="...">
  ⭐ Leader du recrutement européen
</Badge>

<h1 className="...">
  Votre partenaire pour recruter en Europe
</h1>

<p className="...">
  Accédez à un réseau de 500+ agences d'emploi dans 27 pays. 
  Simplifiez votre recrutement européen avec un courtier expert et de confiance.
</p>
```

**Après** :
```tsx
<Badge className="...">
  {content.hero.badge}
</Badge>

<h1 className="...">
  {content.hero.title}
</h1>

<p className="...">
  {content.hero.subtitle}
</p>
```

#### Bénéfices (4 items)

**Chercher** : Les 4 bénéfices actuels (ligne ~850-900)

**Avant** :
```tsx
{[
  'Dossiers centralisés et sécurisés',
  'Démarches administratives en ligne',
  "Gestion des offres d'emploi",
  'Conformité multi-pays'
].map((feature, i) => (
  <div key={i}>
    <CheckCircle />
    <span>{feature}</span>
  </div>
))}
```

**Après** :
```tsx
{content.hero.benefits.map((benefit, i) => (
  <div key={i}>
    <CheckCircle />
    <span>{benefit}</span>
  </div>
))}
```

**Test** : La section Hero affiche les textes depuis le CMS ✅

---

### Section 3 : Stats

**Localisation** : Ligne ~450-550

#### Textes à remplacer

**Avant** :
```tsx
<CountUpStat end={10} suffix="+" label="ans d'expertise" />
<CountUpStat end={27} label="pays couverts" />
<CountUpStat end={500} suffix="+" label="agences partenaires" />
<CountUpStat end={2000} suffix="+" label="missions réalisées" />
```

**Après** :
```tsx
<CountUpStat 
  end={parseInt(content.stats.items[0].value)} 
  suffix="+" 
  label={content.stats.items[0].label} 
/>
<CountUpStat 
  end={parseInt(content.stats.items[1].value)} 
  label={content.stats.items[1].label} 
/>
<CountUpStat 
  end={parseInt(content.stats.items[2].value)} 
  suffix="+" 
  label={content.stats.items[2].label} 
/>
<CountUpStat 
  end={parseInt(content.stats.items[3].value)} 
  suffix="+" 
  label={content.stats.items[3].label} 
/>
```

**Note** : Si vous utilisez une boucle `.map()`, c'est encore mieux :

```tsx
{content.stats.items.map((stat, i) => (
  <CountUpStat
    key={i}
    end={parseInt(stat.value)}
    suffix={stat.value.includes('+') ? '+' : ''}
    label={stat.label}
  />
))}
```

**Test** : Les statistiques s'affichent correctement ✅

---

### Section 4 : Services

**Localisation** : Ligne ~600-750

#### Textes à remplacer

**Avant** :
```tsx
<Badge>{`💼 Nos services`}</Badge>
<h2>Des solutions adaptées à vos besoins</h2>
<p>Nous vous accompagnons dans toutes vos démarches...</p>

<Card>
  <h3>Intérim européen</h3>
  <p>Recrutement de personnel temporaire partout en Europe...</p>
  <Link>En savoir plus <ArrowRight /></Link>
</Card>
```

**Après** :
```tsx
<Badge>{content.services.badge}</Badge>
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

**Test** : Les 3 services s'affichent depuis le CMS ✅

---

### Section 5 : Network (Réseau Européen + Waitlist)

**Localisation** : Ligne ~800-950

#### Badge et titre de section

**Avant** :
```tsx
<Badge>🌍 Réseau Européen</Badge>
<h2>Un réseau qui couvre toute l'Europe</h2>
<p>Plus de 500 agences partenaires dans 27 pays...</p>
```

**Après** :
```tsx
<Badge>{content.network.badge}</Badge>
<h2>{content.network.title}</h2>
<p>{content.network.subtitle}</p>
```

#### Waitlist card (Important - déjà modifié récemment)

**Avant** (version actuelle après votre modification) :
```tsx
<Badge>✨ Nouveauté 2026</Badge>
<h3>Votre plateforme tout-en-un du détachement européen</h3>
<p>Centralisez tous vos documents et données de détachement...</p>

{[
  'Dossiers centralisés et sécurisés',
  'Démarches administratives en ligne',
  "Gestion des offres d'emploi",
  'Conformité multi-pays'
].map((feature, i) => (...))}
```

**Après** :
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

**Test** : La section Network et Waitlist affichent les textes du CMS ✅

---

### Section 6 : Steps (Comment ça marche)

**Localisation** : Ligne ~1000-1150

#### Textes à remplacer

**Avant** :
```tsx
<Badge>🎯 Comment ça marche</Badge>
<h2>Un processus simple et efficace</h2>

<Card>
  <Badge>01</Badge>
  <h4>Décrivez votre besoin</h4>
  <p>Partagez-nous vos besoins en recrutement...</p>
</Card>
```

**Après** :
```tsx
<Badge>{content.steps.badge}</Badge>
<h2>{content.steps.title}</h2>
<p>{content.steps.subtitle}</p>

{content.steps.steps.map((step, i) => (
  <Card key={i}>
    <Badge>{step.number}</Badge>
    <h4>{step.title}</h4>
    <p>{step.description}</p>
  </Card>
))}
```

**Test** : Les 4 étapes s'affichent depuis le CMS ✅

---

### Section 7 : Testimonials

**Localisation** : Ligne ~1200-1350

#### Migration du composant TestimonialCarousel

**Avant** :
```tsx
<TestimonialCarousel testimonials={[
  {
    name: 'Marc Durand',
    position: 'Directeur RH',
    company: 'BTP Solutions France',
    quote: 'YOJOB nous a permis de recruter...',
    rating: 5,
    sector: 'BTP'
  },
  // ... autres témoignages
]} />
```

**Après** :
```tsx
<Badge>{content.testimonials.badge}</Badge>
<h2>{content.testimonials.title}</h2>
<p>{content.testimonials.subtitle}</p>

<TestimonialCarousel testimonials={content.testimonials.testimonials} />
```

**Test** : Le carousel de témoignages affiche les contenus du CMS ✅

---

### Section 8 : Sectors

**Localisation** : Ligne ~1400-1500

#### Textes à remplacer

**Avant** :
```tsx
<Badge>🏭 Secteurs d'activité</Badge>
<h2>Nous intervenons dans tous les secteurs</h2>

<Card>
  <Building2 />
  <h4>BTP</h4>
</Card>
<Card>
  <Factory />
  <h4>Industrie</h4>
</Card>
```

**Après** :
```tsx
<Badge>{content.sectors.badge}</Badge>
<h2>{content.sectors.title}</h2>
<p>{content.sectors.subtitle}</p>

{content.sectors.sectors.map((sector, i) => {
  const Icon = lucideIcons[sector.icon]; // Mapping des icônes
  return (
    <Card key={i}>
      <Icon />
      <h4>{sector.name}</h4>
    </Card>
  );
})}
```

**Note** : Créer un mapping des icônes :

```typescript
const lucideIcons: Record<string, any> = {
  Building2,
  Factory,
  Tractor,
  UtensilsCrossed,
  Heart,
  Laptop
};
```

**Test** : Les 6 secteurs s'affichent ✅

---

### Section 9 : CTA Form

**Localisation** : Ligne ~1550-1750

#### Textes à remplacer

**Avant** :
```tsx
<Badge>📞 Contactez-nous</Badge>
<h2>Prêt à recruter en Europe ?</h2>

<Label>Nom complet</Label>
<Input placeholder="Jean Dupont" />

<Label>Email professionnel</Label>
<Input placeholder="jean.dupont@entreprise.fr" />

<Button type="submit">Envoyer ma demande</Button>
<p>🔒 Vos données sont sécurisées...</p>
```

**Après** :
```tsx
<Badge>{content.ctaForm.badge}</Badge>
<h2>{content.ctaForm.title}</h2>
<p>{content.ctaForm.subtitle}</p>

<Label>{content.ctaForm.form.fields.name.label}</Label>
<Input placeholder={content.ctaForm.form.fields.name.placeholder} />

<Label>{content.ctaForm.form.fields.email.label}</Label>
<Input placeholder={content.ctaForm.form.fields.email.placeholder} />

<Label>{content.ctaForm.form.fields.phone.label}</Label>
<Input placeholder={content.ctaForm.form.fields.phone.placeholder} />

<Label>{content.ctaForm.form.fields.company.label}</Label>
<Input placeholder={content.ctaForm.form.fields.company.placeholder} />

<Label>{content.ctaForm.form.fields.needType.label}</Label>
<Select placeholder={content.ctaForm.form.fields.needType.placeholder}>
  {/* ... options */}
</Select>

<Label>{content.ctaForm.form.fields.message.label}</Label>
<Textarea placeholder={content.ctaForm.form.fields.message.placeholder} />

<Button type="submit">{content.ctaForm.form.ctaLabel}</Button>
<p>{content.ctaForm.form.securityNote}</p>
```

**Message de succès** (dans le handler onSubmit) :

```typescript
const handleSubmit = () => {
  // ... logique de soumission
  toast.success(content.ctaForm.form.successMessage);
};
```

**Test** : Le formulaire affiche les labels et placeholders du CMS ✅

---

### Section 10 : Footer

**Localisation** : Ligne ~1800-2000

#### Textes à remplacer

**Avant** :
```tsx
<p>Votre partenaire de confiance pour le recrutement européen</p>

<h4>Services</h4>
<Link href="#interim">Intérim européen</Link>
<Link href="#recrutement">Recrutement spécialisé</Link>

<h4>Contact</h4>
<p>123 Avenue de l'Europe, 75001 Paris, France</p>
<p>+33 1 23 45 67 89</p>
<p>contact@yojob.fr</p>

<p>© 2026 YOJOB. Tous droits réservés. Fait avec ❤️ en Europe.</p>
```

**Après** :
```tsx
<p>{content.footer.logo.tagline}</p>

<h4>{content.footer.columns.services.title}</h4>
{content.footer.columns.services.links.map((link, i) => (
  <Link key={i} href={link.href}>{link.label}</Link>
))}

<h4>{content.footer.columns.company.title}</h4>
{content.footer.columns.company.links.map((link, i) => (
  <Link key={i} href={link.href}>{link.label}</Link>
))}

<h4>{content.footer.columns.contact.title}</h4>
<p>{content.footer.columns.contact.address}</p>
<p>{content.footer.columns.contact.phone}</p>
<p>{content.footer.columns.contact.email}</p>

<p>{content.footer.bottom.copyright}</p>
{content.footer.bottom.legalLinks.map((link, i) => (
  <Link key={i} href={link.href}>{link.label}</Link>
))}
```

**Test** : Le footer affiche tous les contenus du CMS ✅

---

## 🧪 Phase 4 : Tests

### Checklist de tests

#### Tests fonctionnels

- [ ] Le sélecteur de langue fonctionne
- [ ] Changement FR → EN met à jour tous les textes
- [ ] Changement EN → FR met à jour tous les textes
- [ ] Aucune erreur dans la console
- [ ] Toutes les animations fonctionnent
- [ ] Les liens du menu fonctionnent
- [ ] Le formulaire se soumet correctement

#### Tests visuels

- [ ] Le design est identique à avant
- [ ] Les gradients sont intacts
- [ ] Les effets glassmorphism fonctionnent
- [ ] Les hover effects fonctionnent
- [ ] Les cartes s'affichent correctement
- [ ] Les badges ont les bonnes couleurs

#### Tests responsive

- [ ] Desktop (1920px) : OK
- [ ] Laptop (1280px) : OK
- [ ] Tablet (768px) : OK
- [ ] Mobile (375px) : OK

#### Tests de contenu

- [ ] Tous les titres s'affichent
- [ ] Tous les sous-titres s'affichent
- [ ] Tous les bénéfices s'affichent
- [ ] Tous les CTAs s'affichent
- [ ] Le formulaire a tous ses labels
- [ ] Le footer est complet

---

## 🐛 Résolution de problèmes

### Problème : "Uncaught TypeError: Cannot read property 'title' of undefined"

**Cause** : Le contenu n'est pas chargé

**Solution** :
```tsx
{content?.hero?.title || 'Titre par défaut'}
```

---

### Problème : "Les textes ne changent pas quand je change de langue"

**Cause** : Le state `currentLang` n'est pas bien propagé

**Solution** : Vérifier que :
```tsx
const content = getLandingContent(currentLang);
```
est bien dans le bon composant et se met à jour.

---

### Problème : "Le design est cassé après la migration"

**Cause** : Vous avez modifié les classes Tailwind

**Solution** : Comparer avec le backup et restaurer les classes originales

---

### Problème : "Apostrophe dans 'd'emploi' casse la syntaxe"

**Cause** : Chaîne avec guillemets simples contenant une apostrophe

**Solution** : Utiliser des guillemets doubles
```tsx
"Gestion des offres d'emploi"  // ✅
'Gestion des offres d'emploi'  // ❌
```

---

## ✅ Phase 5 : Déploiement

### Checklist de déploiement

- [ ] Tous les tests sont passés
- [ ] Le code est propre (pas de console.log)
- [ ] La documentation est à jour
- [ ] Commit avec message clair :
  ```
  feat: Migrate landing page to CMS system
  
  - Add language selector in header
  - Replace all hardcoded texts with content keys
  - Support FR + EN languages
  - Preserve all existing design and animations
  ```

- [ ] Push vers GitHub
- [ ] Créer une Pull Request
- [ ] Review de code
- [ ] Tests en pré-production
- [ ] Merge et déploiement en production

---

## 📊 Résultat attendu

### Avant la migration

- ✅ Landing page fonctionnelle
- ❌ Textes en dur dans le code
- ❌ Impossible de changer la langue
- ❌ Édition des textes = modifier le code

### Après la migration

- ✅ Landing page fonctionnelle
- ✅ Textes dans le CMS
- ✅ Sélecteur de langue FR/EN
- ✅ Édition des textes via l'interface CMS
- ✅ Support de 23 langues prêt
- ✅ SEO optimisé par langue

---

## 📚 Ressources

- **Guide d'intégration** : `/docs/LANDING_CMS_INTEGRATION.md`
- **Référence des clés** : `/docs/CONTENT_KEYS_REFERENCE.md`
- **Guide utilisateur CMS** : `/docs/CMS_USER_GUIDE.md`
- **Backup de la landing** : `/App-Landing.backup.tsx` (à créer)

---

## 🎯 Temps estimé

| Phase | Temps |
|-------|-------|
| Préparation | 15 min |
| Import et setup | 10 min |
| Migration sections | 2-3h |
| Tests | 30 min |
| **TOTAL** | **3-4h** |

---

**Version** : 1.0  
**Dernière mise à jour** : 7 décembre 2024  
**Auteur** : Équipe YOJOB Dev
