# CRÉER LE MODULE "PROSPECTS CRM" — Dashboard YoJob

## INSTRUCTIONS POUR FIGMA MAKE

Ce fichier contient 2 parties distinctes :
- **Landing page marketing** → **NE PAS TOUCHER**
- **Dashboard SaaS** (sidebar gauche + contenu) → **ZONE DE TRAVAIL**

**Objectif** : Ajouter un module complet de gestion des prospects (Clients, Agences ETT, Intérimaires) dans le dashboard existant.

---

## 1. DESIGN TOKENS OBLIGATOIRES

### Palette de couleurs exacte
```css
/* Textes */
--text-primary: #0f172a      /* slate-900 */
--text-secondary: #475569    /* slate-600 */
--text-accent: #0891b2       /* cyan-600 */
--text-muted: #717182

/* Fonds */
--bg-white: #ffffff
--bg-subtle: #f8fafc         /* slate-50 */
--bg-hover: #f1f5f9          /* slate-100 */
--bg-muted: #ececf0

/* Bordures */
--border: rgba(0,0,0,0.1)
--border-slate: #e2e8f0      /* slate-200 */

/* Accents */
--cyan-500: #06b6d4
--cyan-600: #0891b2
--blue-500: #3b82f6
--violet-500: #8b5cf6
--green-500: #22c55e
--emerald-500: #10b981
--orange-500: #f97316
--red-500: #ef4444
```

### Gradients à utiliser
```css
/* Format: direction + couleur départ + couleur fin */
--gradient-blue-cyan: 135deg, #3b82f6, #06b6d4
--gradient-violet-purple: 135deg, #8b5cf6, #a855f7
--gradient-green-emerald: 135deg, #22c55e, #10b981
--gradient-orange-amber: 135deg, #f97316, #f59e0b
--gradient-emerald-teal: 135deg, #10b981, #14b8a6
--gradient-pink-rose: 135deg, #ec4899, #f43f5e
```

### Dimensions fixes
```css
--radius: 10px
--radius-lg: 14px
--radius-sm: 6px
--sidebar-width: 280px
--card-padding: 24px
--grid-gap: 24px
--section-margin: 32px
--icon-kpi: 48px
--icon-sidebar: 36px
--avatar-sm: 32px
--avatar-lg: 64px
```

### Typographie
```css
--h1: 24px / font-weight: 500
--h2: 20px / font-weight: 500
--h3: 18px / font-weight: 500
--body: 16px / font-weight: 400
--small: 14px / font-weight: 400
--xs: 12px / font-weight: 400
```

### Ombres
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
```

---

## 2. AJOUTER L'ITEM SIDEBAR "PROSPECTS"

### Position dans la navigation
```
1. Vue d'ensemble    (LayoutDashboard)
2. Résultats         (BarChart3)
3. Questions         (FileEdit)
4. Traductions       (Languages)
5. Export            (Download)
6. Intégrations      (Plug)
7. CMS Formulaire    (FileType)
8. ★ PROSPECTS ★     (Users) ← NOUVEAU
9. Paramètres        (Settings)
```

### Spécifications de l'item
```
Libellé: "Prospects"
Icône: Users (Lucide) — ou UserPlus / Target
Gradient: #10b981 → #14b8a6 (emerald-teal)
```

### États visuels
```
ÉTAT INACTIF:
├─ Conteneur: 36×36px, radius 8px, bg #f1f5f9
├─ Icône: 20×20px, couleur #475569
└─ Label: 14px, couleur #475569

ÉTAT ACTIF:
├─ Conteneur: 36×36px, radius 8px, bg gradient emerald-teal
├─ Icône: 20×20px, couleur #ffffff
├─ Label: 14px, couleur #0f172a, font-weight 500
└─ Indicateur: barre 4×32px à gauche, gradient vertical emerald-teal
```

---

## 3. CRÉER LA PAGE "PROSPECTS"

### A. Structure générale
```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
│ ┌────────────────────────────┐  ┌───────────────────────────┐ │
│ │ Prospects & Relances       │  │ ↻ Actualiser              │ │
│ │ Gérez vos prospects...     │  │ (bouton outline)          │ │
│ └────────────────────────────┘  └───────────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│ KPI CARDS (grille 4 colonnes)                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ │ Total    │ │ Clients  │ │ Agences  │ │ Intérim. │          │
│ │ 247      │ │ 89       │ │ 103      │ │ 55       │          │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
├────────────────────────────────────────────────────────────────┤
│ FILTRES                                                        │
│ [Tous] [Clients] [Agences] [Intérim.] | [Statut▼] [Pays▼]     │
│ [🔍 Rechercher...]                    [+ Nouveau prospect]     │
├────────────────────────────────────────────────────────────────┤
│ TABLEAU DES PROSPECTS                                          │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ ☐ │ Type │ Nom │ Pays │ Secteur │ Statut │ Action │ Resp. │ │
│ ├────────────────────────────────────────────────────────────┤ │
│ │    ...lignes de données...                                 │ │
│ └────────────────────────────────────────────────────────────┘ │
│ Pagination: ◀ 1 2 3 ... 25 ▶                                  │
└────────────────────────────────────────────────────────────────┘
```

---

### B. Composant CARTE KPI

Créer 4 cartes identiques avec ces variations :

```
STRUCTURE D'UNE CARTE:
┌─────────────────────────────────────┐
│ padding: 24px                       │
│ bg: #ffffff                         │
│ border: 1px solid #e2e8f0           │
│ radius: 14px                        │
│ shadow: shadow-md                   │
│                                     │
│ ┌────────────┐                      │
│ │            │ ← Icône 48×48px      │
│ │   ICÔNE    │   radius: 12px       │
│ │            │   bg: gradient       │
│ └────────────┘   icône: 24px blanc  │
│                                     │
│ 247                ← 30px, #0f172a  │
│ Prospects totaux   ← 14px, #475569  │
│ +12 ce mois        ← 12px, #0891b2  │
│                                     │
│ ▓▓▓▓▓▓▓▓░░░░░░░░░ ← Progress bar   │
│ height: 8px, radius: 4px            │
│ bg-track: #f1f5f9                   │
│ bg-fill: gradient correspondant    │
└─────────────────────────────────────┘
```

**Les 4 cartes à créer :**

| Carte | Icône | Gradient | Valeur | Label | Sous-label |
|-------|-------|----------|--------|-------|------------|
| 1 | Users | blue-cyan | 247 | Prospects totaux | +12 ce mois |
| 2 | Building2 | violet-purple | 89 | Clients | 36% du total |
| 3 | Briefcase | orange-amber | 103 | Agences ETT | 42% du total |
| 4 | UserCheck | green-emerald | 55 | Intérimaires | 22% du total |

---

### C. Composant ZONE FILTRES

```
LAYOUT: flex, gap 12px, align-center, wrap
HEIGHT: auto (environ 80px avec 2 lignes)
MARGIN-BOTTOM: 24px

LIGNE 1 - Chips de type:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Tous (247)   │ │ Clients (89) │ │ Agences (103)│ │ Intérim.(55) │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Chip ACTIF:
- bg: gradient blue-cyan
- text: #ffffff
- padding: 8px 16px
- radius: 20px

Chip INACTIF:
- bg: #f1f5f9
- text: #475569
- border: 1px solid #e2e8f0
- hover: bg #e2e8f0

SÉPARATEUR VERTICAL: 1px, height 24px, bg #e2e8f0

DROPDOWNS (3):
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Statut       ▼  │ │ Pays         ▼  │ │ Secteur      ▼  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
- width: 150px
- height: 40px
- bg: #ffffff
- border: 1px solid #e2e8f0
- radius: 8px

LIGNE 2:
┌────────────────────────────┐          ┌─────────────────────────┐
│ 🔍 Rechercher un prospect..│          │ + Nouveau prospect      │
└────────────────────────────┘          └─────────────────────────┘

Input recherche:
- width: 280px
- height: 40px
- bg: #ffffff
- border: 1px solid #e2e8f0
- radius: 8px
- placeholder: #717182

Bouton Nouveau:
- bg: gradient blue-cyan
- text: #ffffff, 14px, medium
- padding: 10px 20px
- radius: 8px
- shadow: shadow-md
- icône Plus à gauche, 16px
```

---

### D. Composant TABLEAU

```
CONTENEUR CARD:
- bg: #ffffff
- border: 1px solid #e2e8f0
- radius: 14px
- shadow: shadow-md
- overflow: hidden

HEADER DU TABLEAU:
- padding: 16px 24px
- border-bottom: 1px solid #e2e8f0
- bg: #ffffff

Titre: "Liste des prospects"
- icône ClipboardList 20px #0891b2
- text: 18px, #0f172a, medium

Compteur: "Total: 247 | Sélectionnés: 0"
- text: 14px, #475569

COLONNES:
| Largeur | Colonne |
|---------|---------|
| 48px | Checkbox |
| 100px | Type |
| 200px | Nom / Entreprise |
| 80px | Pays |
| 120px | Secteur |
| 140px | Statut |
| 140px | Prochaine action |
| 80px | Responsable |

HEADER ROW:
- height: 48px
- bg: #f8fafc
- text: 14px, #475569, medium
- padding: 0 16px

DATA ROWS:
- height: 56px
- bg: #ffffff
- border-bottom: 1px solid #f1f5f9
- hover: bg #f8fafc
- text: 14px, #0f172a
- padding: 0 16px
```

**BADGES TYPE (dans colonne Type) :**
```
CLIENT:
- bg: #dbeafe (blue-100)
- text: #1d4ed8 (blue-700)
- icône: Building2, 14px
- padding: 4px 10px
- radius: 6px

AGENCE:
- bg: #ffedd5 (orange-100)
- text: #c2410c (orange-700)
- icône: Briefcase, 14px

INTÉRIMAIRE:
- bg: #dcfce7 (green-100)
- text: #15803d (green-700)
- icône: UserCheck, 14px
```

**BADGES STATUT (dans colonne Statut) :**
```
┌─────────────────────┬─────────────────────────────┐
│ Statut              │ Couleurs                    │
├─────────────────────┼─────────────────────────────┤
│ Nouveau             │ bg: #dbeafe, text: #1d4ed8  │
│ Qualifié            │ bg: #dcfce7, text: #15803d  │
│ Relance planifiée   │ bg: #fef3c7, text: #b45309  │
│ Proposition envoyée │ bg: #ede9fe, text: #6d28d9  │
│ Gagné               │ bg: #d1fae5, text: #047857  │
│ Perdu               │ bg: #fee2e2, text: #b91c1c  │
└─────────────────────┴─────────────────────────────┘
```

**COLONNE PROCHAINE ACTION :**
```
Format: [Icône] [Date]
Exemples:
- 📞 15 déc.  (Phone)
- 📧 16 déc.  (Mail)
- 📅 18 déc.  (Calendar)
- 📄 20 déc.  (FileText)
- ✅ Signé    (CheckCircle)

Icône: 14px, #475569
Date: 14px, #0f172a
```

**COLONNE RESPONSABLE :**
```
Avatar cercle:
- size: 32×32px
- bg: gradient (basé sur initiales)
- text: 12px, #ffffff, medium
- initiales: 2 lettres (ex: JD, ML, SC)
```

**DONNÉES EXEMPLE (6 lignes) :**
```
1. ☐ | Client  | Bouygues BTP      | 🇫🇷 FR | BTP        | Qualifié    | 📞 15 déc | JD
2. ☐ | Agence  | Manpower Europe   | 🇩🇪 DE | Multi      | Relance     | 📧 16 déc | ML
3. ☐ | Intérim | Pavel Novak       | 🇨🇿 CZ | Logistique | Nouveau     | 📅 18 déc | SC
4. ☐ | Client  | Vinci Construction| 🇪🇸 ES | BTP        | Proposition | 📄 20 déc | AF
5. ☐ | Agence  | Adecco Poland     | 🇵🇱 PL | Industrie  | Gagné       | ✅ Signé  | JD
6. ☐ | Intérim | Maria Santos      | 🇵🇹 PT | Hôtellerie | Perdu       | —         | ML
```

**PAGINATION :**
```
LAYOUT: flex, justify-between, padding 16px 24px, border-top

Gauche: "Affichant 1-10 sur 247"
- text: 14px, #475569

Droite: navigation
┌────┐ ┌───┐ ┌───┐ ┌───┐ ┌─────┐ ┌───┐ ┌────┐
│ ◀  │ │ 1 │ │ 2 │ │ 3 │ │ ... │ │25 │ │ ▶  │
└────┘ └───┘ └───┘ └───┘ └─────┘ └───┘ └────┘

Bouton page:
- size: 32×32px
- radius: 6px
- ACTIF: bg gradient blue-cyan, text #ffffff
- INACTIF: bg #ffffff, text #475569, border #e2e8f0
```

---

## 4. CRÉER LE PANNEAU "FICHE PROSPECT"

### Spécifications du panneau
```
TYPE: Sheet / Drawer (slide depuis la droite)
WIDTH: 480px
HEIGHT: 100vh
BG: #ffffff
BORDER-LEFT: 1px solid #e2e8f0
SHADOW: shadow-xl
Z-INDEX: 50
```

### Structure complète
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER — height: 72px, border-bottom, padding: 0 24px      │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Fiche Prospect                              [✕]        │ │
│ │ 20px, #0f172a, medium                    32×32 ghost   │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ BODY — padding: 24px, overflow-y: auto, flex: 1            │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION IDENTITÉ                                        │ │
│ │ bg: gradient(135deg, #eff6ff, #ecfeff)                 │ │
│ │ border: 1px solid #bfdbfe                              │ │
│ │ radius: 12px, padding: 16px                            │ │
│ │                                                         │ │
│ │ ┌────────┐                                              │ │
│ │ │ Avatar │  Bouygues BTP                               │ │
│ │ │ 64×64  │  20px, #0f172a, medium                      │ │
│ │ │   B    │                                              │ │
│ │ └────────┘  🏢 Client • 🇫🇷 France • BTP               │ │
│ │             14px, #475569                               │ │
│ │                                                         │ │
│ │ [Qualifié] [Créé: 15 oct] [Resp: JD]                   │ │
│ │ badges 12px                                             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION COORDONNÉES — margin-top: 24px                  │ │
│ │ Titre: 16px, #0f172a, medium, margin-bottom: 12px      │ │
│ │                                                         │ │
│ │ Grid 2 colonnes, gap 16px:                             │ │
│ │                                                         │ │
│ │ 📧 Email                    📞 Téléphone               │ │
│ │ contact@bouygues.com        +33 1 23 45 67 89          │ │
│ │ #0891b2, hover underline    #0f172a                    │ │
│ │                                                         │ │
│ │ 🌐 Site web                 📍 Adresse                 │ │
│ │ www.bouygues.com            Paris, France              │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION PROCHAINES ACTIONS — margin-top: 24px          │ │
│ │ Titre: 🔔 Prochaines actions                           │ │
│ │                                                         │ │
│ │ Liste d'actions:                                        │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ 📞 │ 15 déc 14h │ Appel suivi │ JD │ [✓ Fait]      │ │ │
│ │ ├─────────────────────────────────────────────────────┤ │ │
│ │ │ 📧 │ 18 déc 10h │ Envoi prop. │ JD │               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ [+ Planifier une action]                               │ │
│ │ width: 100%, variant: outline                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION HISTORIQUE — margin-top: 24px                   │ │
│ │ Titre: 📋 Historique                                    │ │
│ │                                                         │ │
│ │ Timeline verticale (ligne 2px #e2e8f0 à gauche):       │ │
│ │                                                         │ │
│ │ ● 12 déc 2024                                          │ │
│ │ │ 📞 Appel découverte                                  │ │
│ │ │ "Discussion besoins intérimaires..."                 │ │
│ │ │ 14px #475569, italic                                 │ │
│ │ │                                                       │ │
│ │ ● 8 déc 2024                                           │ │
│ │ │ 📧 Email introduction                                │ │
│ │ │                                                       │ │
│ │ ● 5 déc 2024                                           │ │
│ │   🌐 Formulaire reçu — Score: 8/10                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION NOTES — margin-top: 24px                        │ │
│ │ Titre: 📝 Notes internes                                │ │
│ │                                                         │ │
│ │ ┌───────────────────────────────────────────────────┐  │ │
│ │ │ Textarea                                          │  │ │
│ │ │ height: 80px                                      │  │ │
│ │ │ placeholder: "Ajouter une note..."                │  │ │
│ │ └───────────────────────────────────────────────────┘  │ │
│ │                                                         │ │
│ │ Notes existantes:                                       │ │
│ │ ┌───────────────────────────────────────────────────┐  │ │
│ │ │ 10 déc par JD                                     │  │ │
│ │ │ "Client prioritaire Q1 2025"                      │  │ │
│ │ │ bg: #f8fafc, padding: 12px, radius: 8px          │  │ │
│ │ └───────────────────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER — height: 72px, border-top, padding: 16px 24px      │
│ flex, gap: 12px                                             │
│                                                             │
│ ┌─────────────────────┐  ┌─────────────────────────────┐   │
│ │ Modifier statut     │  │ Envoyer email               │   │
│ │ variant: outline    │  │ bg: gradient blue-cyan      │   │
│ │ flex: 1             │  │ text: #ffffff               │   │
│ └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. INTERACTIONS À CRÉER

### Navigation
```
TRIGGER: Clic sur item sidebar "Prospects"
ACTION: Afficher page Prospects + activer état sidebar
ANIMATION: Fade-in contenu (opacity 0→1, 200ms)
```

### Filtres
```
TRIGGER: Clic sur chip type (Tous/Clients/Agences/Intérim)
ACTION: Activer le chip cliqué, désactiver les autres
ANIMATION: Transition bg-color 150ms
```

### Tableau
```
TRIGGER: Hover sur ligne
ACTION: bg → #f8fafc
ANIMATION: Transition 150ms

TRIGGER: Clic sur ligne
ACTION: Ouvrir panneau fiche prospect
ANIMATION: Slide-in depuis droite (transform translateX 100%→0%, 300ms ease-out)
```

### Panneau
```
TRIGGER: Clic bouton ✕ ou clic extérieur
ACTION: Fermer panneau
ANIMATION: Slide-out vers droite (300ms ease-in)
```

---

## 6. RÉCAPITULATIF DES COMPOSANTS À CRÉER

| # | Composant | Type | Quantité |
|---|-----------|------|----------|
| 1 | Item Sidebar Prospects | Navigation | 1 |
| 2 | Page Prospects | Frame/Page | 1 |
| 3 | Carte KPI | Component | 4 variantes |
| 4 | Chip Filtre | Component | 2 états |
| 5 | Dropdown Filtre | Component | 1 |
| 6 | Input Recherche | Component | 1 |
| 7 | Bouton Nouveau | Component | 1 |
| 8 | Tableau Prospects | Component | 1 |
| 9 | Badge Type | Component | 3 variantes |
| 10 | Badge Statut | Component | 6 variantes |
| 11 | Avatar Initiales | Component | 1 |
| 12 | Pagination | Component | 1 |
| 13 | Panneau Fiche | Component/Frame | 1 |
| 14 | Section Identité | Component | 1 |
| 15 | Section Coordonnées | Component | 1 |
| 16 | Section Actions | Component | 1 |
| 17 | Section Historique | Component | 1 |
| 18 | Section Notes | Component | 1 |

---

## 7. RESTRICTIONS ABSOLUES

❌ **NE JAMAIS FAIRE :**
- Modifier les frames de la landing page
- Changer les couleurs/tokens existants
- Renommer les composants existants
- Modifier la structure de la sidebar existante
- Utiliser des couleurs hors de la palette définie
- Créer des styles de texte non conformes

✅ **TOUJOURS FAIRE :**
- Réutiliser Card, Badge, Button, Input, Table existants
- Respecter exactement les valeurs de couleurs HEX
- Maintenir la cohérence avec le dashboard existant
- Utiliser les icônes Lucide spécifiées
- Appliquer les mêmes shadows et radius

---

## 8. CHECKLIST DE VALIDATION

- [ ] Item "Prospects" visible dans sidebar (position 8)
- [ ] États actif/inactif de l'item sidebar fonctionnels
- [ ] Page Prospects avec header correct
- [ ] 4 cartes KPI avec icônes, valeurs et progress bars
- [ ] Zone filtres avec chips et dropdowns
- [ ] Bouton "+ Nouveau prospect" gradient blue-cyan
- [ ] Tableau avec toutes les colonnes
- [ ] 6 lignes de données exemple
- [ ] Badges Type (3 couleurs)
- [ ] Badges Statut (6 couleurs)
- [ ] Avatars avec initiales
- [ ] Pagination fonctionnelle visuellement
- [ ] Panneau fiche prospect (480px)
- [ ] 5 sections dans le panneau
- [ ] Boutons footer du panneau
- [ ] Interactions prototypées (navigation, hover, ouverture panneau)
- [ ] Aucune modification sur la landing page
- [ ] Design 100% cohérent avec le dashboard existant
