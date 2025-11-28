# 📋 Guidelines Landing Page YOJOB

## 🎯 Vue d'ensemble

Landing page moderne et professionnelle pour YOJOB, entreprise française spécialisée dans le courtage en recrutement européen avec un réseau de 500+ agences partenaires dans 27 pays.

### Objectifs principaux
- ✅ Présenter clairement l'activité de YOJOB
- ✅ Générer des demandes de devis via formulaire de contact
- ✅ Teaser une future marketplace d'agences européennes
- ✅ Établir la crédibilité de l'entreprise

---

## 🎨 Design System

### Palette de couleurs

**Couleurs principales**
- **Bleu profond** : `#1E3A8A` - Confiance, professionnalisme
- **Cyan** : `#06B6D4` - Modernité, innovation
- **Violet** : `#7C3AED` - Créativité, premium

**Couleurs secondaires**
- **Blanc** : `#FFFFFF` - Pureté, clarté
- **Gris** : `#6B7280` - Textes secondaires
- **Vert** : `#10B981` - Validation, succès
- **Jaune/Orange** : `#F59E0B` - Attention, nouveauté

**Utilisation des dégradés**
```css
/* Gradient principal hero/services */
background: linear-gradient(to bottom right, #1E3A8A, #7C3AED, #06B6D4);

/* Gradient réseau européen/footer */
background: radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3), transparent),
            radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3), transparent);

/* Gradient carte Europe - Base */
linear-gradient(0%, #7C3AED 35%, #1E3A8A 30%, #06B6D4 25%);

/* Gradient carte Europe - Hover */
linear-gradient(0%, #06B6D4 90%, #7C3AED 85%);
```

### Typographie

**Police système** : Définie dans `/styles/globals.css`

**Règles importantes**
- ⚠️ **NE PAS utiliser** de classes Tailwind pour :
  - `font-size` (ex: `text-2xl`)
  - `font-weight` (ex: `font-bold`)
  - `line-height` (ex: `leading-none`)
- ✅ Les styles sont définis globalement par élément HTML
- ✅ Ne modifier que si demandé explicitement par l'utilisateur

**Hiérarchie**
```
h1 : Titres principaux (Hero)
h2 : Titres de sections
h3 : Sous-titres de cards/composants
h4 : Titres de formulaires
p  : Textes standards
```

### Effets visuels

**Glassmorphism**
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

**Shadows & Glow**
```css
/* Shadow standard */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

/* Glow effect cyan */
box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);

/* Glow effect violet */
box-shadow: 0 0 30px rgba(124, 58, 237, 0.5);
```

**Animations Motion**
```jsx
// Apparition standard
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

// Hover scale
whileHover={{ scale: 1.05, y: -8 }}
transition={{ duration: 0.3 }}

// Pulse
animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.8, 1] }}
transition={{ duration: 3, repeat: Infinity }}
```

---

## 📐 Structure de la page

### 1. Header (Sticky)

**Composants**
- Logo YOJOB avec gradient bleu/cyan
- Navigation desktop (6 liens)
- Sélecteur de langue FR/EN
- CTA "Demander un devis"
- Menu mobile responsive (glassmorphism)

**Comportement**
```jsx
// Scroll effect
const [isScrolled, setIsScrolled] = useState(false);
// Background change on scroll
className={isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
```

**Navigation mobile**
- Fond gradient violet/cyan avec glassmorphism
- Border radius 3xl
- Animations Motion (fade + slide)
- Fermeture automatique au clic

---

### 2. Hero Section

**Layout responsive**
- Desktop : Grid 2 colonnes (texte + carte Europe)
- Mobile : Stack vertical (texte + 3 cards statistiques)

**Éléments clés**
1. **Badge premium** : `⭐ Leader du recrutement européen`
   - Glow jaune/cyan
   - Glassmorphism
   
2. **Titre H1** : Police extrabold, taille responsive
   
3. **Sous-titre** : Description du service
   
4. **Stats cards desktop** (3 colonnes)
   - 500+ Agences
   - 27 Pays
   - 2000+ Missions
   - Glassmorphism avec hover effects

5. **Mobile : 3 cards détaillées**
   - Card 1 : 27 pays + Globe icon + pulse green
   - Card 2 : 500+ agences + Users icon + CheckCircle
   - Card 3 : 10 ans expertise + étoile dorée + badge
   - Gradient backgrounds différents

6. **CTAs** : 2 boutons (primaire blanc + secondaire outline)

7. **Carte Europe interactive** (desktop only)
   - Container glassmorphism
   - 3 floating badges animés
   - Particules animées

**Background effects**
- Gradient principal violet/cyan/bleu
- 2 blobs flous (cyan + violet)
- Grid pattern SVG (opacity 10%)
- 20 particules animées

---

### 3. Stats Section

**Layout** : Grid 4 colonnes responsive

**Cards statistiques**
- Icône gradient dans carré arrondi
- Effet hover : scale + glow
- CountUp animation (composant dédié)
- Blob décoratif animé

**Statistiques**
1. 10+ ans d'expertise (Target icon, blue)
2. 27 pays couverts (Globe icon, cyan)
3. 500+ agences (Network icon, purple)
4. 2000+ missions (CheckCircle icon, green)

---

### 4. Services Section

**Background** : Gradient violet/cyan + grid pattern

**Layout** : 3 cards glassmorphism

**Structure de card**
- Glow animé au hover
- Icône gradient avec shadow glow
- Titre + description
- Lien "En savoir plus" avec flèche animée

**Services**
1. **Intérim européen** (Users, blue)
2. **Recrutement spécialisé** (Target, cyan)
3. **Conseil & Conformité** (ShieldCheck, violet)

---

### 5. Réseau Européen Section

**Background** : Radial gradients cyan/violet + particules

**Éléments**
1. Header avec badge "🌍 Réseau Européen"
2. **Carte Europe interactive** (full-width, centered)
   - Component `<EuropeMap variant="network" />`
   - Voir section dédiée ci-dessous
3. **Waitlist teaser** (Glassmorphism card 2 colonnes)
   - Badge "Nouveauté 2025"
   - Liste 4 features avec checkmarks
   - Formulaire email avec CTA gradient

---

### 6. Comment ça marche Section

**Layout** : Grid 4 colonnes + ligne de connexion

**Timeline features**
- Ligne gradient horizontale (desktop)
- Dots animés sur la ligne
- Badge numéro rotatif en coin

**4 étapes**
1. Décrivez votre besoin (FileText, blue)
2. Nous activons notre réseau (Network, cyan)
3. Validez les candidats (UserCheck, violet)
4. Accueillez votre équipe (CheckCircle, green)

---

### 7. Témoignages Section

**Component** : `<TestimonialCarousel />`
- Carousel react-slick
- 3 témoignages minimum
- Autoplay + dots navigation
- Cards glassmorphism avec étoiles

**Structure témoignage**
- Avatar + nom + poste + entreprise
- Citation
- Rating 5 étoiles
- Secteur d'activité

---

### 8. Secteurs d'activité Section

**Layout** : Grid 6 colonnes responsive

**Secteurs**
1. BTP (Building2, orange)
2. Industrie (Factory, blue)
3. Agriculture (Tractor, green)
4. Hôtellerie (UtensilsCrossed, red)
5. Santé (Heart, pink)
6. Tech (Laptop, violet)

**Card features**
- Icône gradient XXL
- Hover : scale + glow intense
- Background gradient subtil

---

### 9. CTA / Contact Section

**Background** : Gradient violet/cyan cohérent

**Layout desktop** : 2 colonnes
1. **Gauche : Bénéfices** (4 cards glassmorphism)
   - Icône + titre + description
   - Hover effects

2. **Droite : Formulaire** (Glassmorphism premium)
   - 6 champs (nom, email, tel, entreprise, type besoin, message)
   - Icônes dans inputs
   - CTA avec shimmer effect
   - Message sécurité en footer

**Mobile** : Stack vertical optimisé (tient sur 1 page)

---

### 10. Footer

**Background** : Radial gradients identique à section réseau

**Structure** : Grid 4 colonnes responsive

1. **Colonne 1 : Logo & Description**
   - Logo glassmorphism avec glow
   - Slogan
   - Boutons sociaux (hover scale + glow)

2. **Colonne 2 : Services**
   - Liste liens

3. **Colonne 3 : Entreprise**
   - Liste liens

4. **Colonne 4 : Contact**
   - Adresse avec MapPin icon gradient
   - Téléphone avec Phone icon gradient
   - Email avec Mail icon gradient

**Footer bottom**
- Copyright avec badge ❤️ animé
- Mentions légales + CGV

---

## 🗺️ Composant EuropeMap

### Props
```typescript
interface EuropeMapProps {
  variant?: 'hero' | 'network';
}
```

### Variants

**Hero variant**
- Taille : max-w-4xl
- Padding container : 135px/40px
- Tooltip centré
- Glow modéré

**Network variant**
- Taille : max-w-sm centré
- Full width parent
- Glow intense
- Pulse dots plus gros

### Features

**27 pays européens** avec données
```typescript
{
  name: string;    // "France"
  code: string;    // "FR"
  path: string;    // SVG path data
  agencies: number; // 85
}
```

**Gradients SVG**
1. `countryBase-{variant}` : Violet → Bleu → Cyan
2. `countryHover-{variant}` : Cyan → Violet intense
3. `borderGradient-{variant}` : White → Cyan → Violet
4. `pulseGradient-{variant}` : Radial Cyan → Violet

**Filters**
- `glow-{variant}` : Gaussian blur standard
- `glowIntense-{variant}` : Blur + color matrix
- `shadow-{variant}` : Drop shadow cyan

**Interactions**
- Hover : Scale 1.06-1.08 + opacity 100% + glow intense
- Pulse dots sur pays > 20 agences
- Tooltip glassmorphism avec gradient text

**Animations**
- Apparition pays : Stagger 0.02s
- Pulse dots : 3s infinite, delay stagger 0.4s
- Middle ring : 2s infinite, delay stagger 0.3s
- Tooltip : Spring bounce effect

---

## 🧩 Composants réutilisables

### CountUpStat
**Location** : `/components/CountUpStat.tsx`

**Props**
```typescript
{
  end: number;        // 500
  suffix?: string;    // "+"
  label: string;      // "agences partenaires"
}
```

**Features**
- Animation compteur (useEffect + setInterval)
- Duration 2s
- Formatting avec suffix optionnel

---

### TestimonialCarousel
**Location** : `/components/TestimonialCarousel.tsx`

**Config react-slick**
```javascript
{
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,  // Desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    { breakpoint: 1024, slidesToShow: 2 },
    { breakpoint: 640, slidesToShow: 1 }
  ]
}
```

---

## 📱 Responsive Design

### Breakpoints Tailwind
- `sm` : 640px
- `md` : 768px
- `lg` : 1024px
- `xl` : 1280px

### Mobile-first approach

**Hero Section**
- Desktop : Grid 2 col + carte Europe
- Mobile : Stack + 3 cards stats colorées

**Services**
- Desktop : Grid 3 col
- Mobile : Stack vertical

**Contact**
- Desktop : 2 col (benefits + form)
- Mobile : Stack (form d'abord)

**Footer**
- Desktop : Grid 4 col
- Tablet : Grid 2 col
- Mobile : Stack vertical

---

## ⚙️ Règles générales de développement

### Do's ✅
- Toujours utiliser Motion pour les animations
- Préférer glassmorphism pour les overlays
- Utiliser les gradients de la palette
- Animations subtiles et fluides
- Mobile-first responsive
- Accessibilité (labels, alt texts)
- États hover/focus visibles

### Don'ts ❌
- **NE JAMAIS** utiliser font-size/font-weight/line-height en Tailwind
- Pas d'animations trop agressives
- Pas de couleurs hors palette
- Pas de composants ShadCN custom (utiliser ceux fournis)
- Pas d'images externes sans unsplash_tool
- Pas de placeholders incomplets

### Imports essentiels
```jsx
import { motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
// etc.
```

### Icons
**Utiliser uniquement** `lucide-react`
```jsx
import { Users, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
```

---

## 🎯 Performance & SEO

### Optimisations
- Lazy loading images
- Motion viewport={{ once: true }} pour animations
- Pas de re-renders inutiles
- États locaux optimisés

### Accessibilité
- Labels sur tous les inputs
- Alt texts sur images
- Contraste suffisant
- Navigation keyboard friendly

---

## 🚀 Future features (Marketplace)

**Liste d'attente** déjà implémentée dans section réseau

**Features annoncées**
- ✓ Recherche multicritères
- ✓ Comparaison instantanée
- ✓ Avis vérifiés
- ✓ Mise en relation directe

---

## 📞 Contact & Support

**Email formulaire** : Envoie vers console.log (mock)
**Waitlist** : Envoie vers console.log (mock)

**Messages**
- Contact : "Merci ! Nous vous recontacterons sous 24h."
- Waitlist : "Merci ! Vous êtes inscrit à la liste d'attente."

---

## 🎨 Exemples de code

### Card glassmorphism standard
```jsx
<Card className="border border-white/10 hover:border-cyan-400/50 
                 transition-all duration-300 shadow-2xl 
                 bg-white/5 backdrop-blur-sm overflow-hidden">
  <CardContent className="p-6">
    {/* Contenu */}
  </CardContent>
</Card>
```

### Button CTA avec shimmer
```jsx
<Button className="relative overflow-hidden group rounded-full 
                   bg-white text-blue-900 hover:bg-cyan-50 
                   shadow-2xl hover:shadow-white/70">
  <span className="relative z-10 flex items-center">
    Texte CTA
    <ArrowRight className="ml-2 w-5 h-5" />
  </span>
  <div className="absolute inset-0 -translate-x-full 
                  group-hover:translate-x-full transition-transform 
                  duration-700 bg-gradient-to-r from-transparent 
                  via-white/40 to-transparent" />
</Button>
```

### Animation Motion standard
```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
  whileHover={{ y: -8 }}
>
  {/* Contenu */}
</motion.div>
```

---

**Version** : 1.0 Premium
**Dernière mise à jour** : 28 Novembre 2024
**Maintenu par** : Équipe YOJOB Dev
