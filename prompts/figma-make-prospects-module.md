# PROMPT FIGMA MAKE — Module Prospects CRM pour Dashboard YoJob

## 🎯 CONTEXTE TECHNIQUE DU PROJET

Ce fichier Figma appartient au projet **YoJob**, une plateforme SaaS de gestion d'enquêtes européennes. Le projet comprend deux parties distinctes :

1. **Landing Page Marketing** (à NE PAS modifier)
2. **Dashboard SaaS** (zone de travail ciblée)

### Stack technique de référence
- React 18 + TypeScript + Tailwind CSS
- Composants Radix UI (shadcn/ui)
- Framer Motion pour animations
- Icônes Lucide React

---

## 📐 DESIGN TOKENS À RESPECTER STRICTEMENT

### Couleurs principales
```
--primary: #030213 (texte principal)
--background: #ffffff
--card: #ffffff
--border: rgba(0, 0, 0, 0.1)
--muted: #ececf0
--muted-foreground: #717182
--accent: #e9ebef
--destructive: #d4183d
```

### Couleurs Tailwind utilisées dans le dashboard
```
Slate-50: #f8fafc (background subtil)
Slate-100: #f1f5f9 (hover states)
Slate-200: #e2e8f0 (borders)
Slate-600: #475569 (texte secondaire)
Slate-900: #0f172a (texte principal)

Cyan-500: #06b6d4 (accent principal)
Cyan-600: #0891b2 (texte accent)
Blue-500: #3b82f6
Blue-600: #2563eb
Violet-500: #8b5cf6
Violet-600: #7c3aed
Purple-500: #a855f7
Green-500: #22c55e
Emerald-500: #10b981
Orange-500: #f97316
Amber-500: #f59e0b
Red-500: #ef4444
Red-600: #dc2626
Pink-500: #ec4899
Rose-500: #f43f5e
```

### Gradients utilisés (bg-gradient-to-br)
```
• Blue-Cyan: from-blue-500 to-cyan-500 → #3b82f6 → #06b6d4
• Cyan-Teal: from-cyan-500 to-teal-500 → #06b6d4 → #14b8a6
• Violet-Purple: from-violet-500 to-purple-500 → #8b5cf6 → #a855f7
• Green-Emerald: from-green-500 to-emerald-500 → #22c55e → #10b981
• Orange-Amber: from-orange-500 to-amber-500 → #f97316 → #f59e0b
• Pink-Rose: from-pink-500 to-rose-500 → #ec4899 → #f43f5e
• Yellow-Orange: from-yellow-500 to-orange-500 → #eab308 → #f97316
• Indigo-Blue: from-indigo-500 to-blue-500 → #6366f1 → #3b82f6
```

### Typographie
```
H1: text-2xl (1.5rem/24px), font-medium
H2: text-xl (1.25rem/20px), font-medium
H3: text-lg (1.125rem/18px), font-medium
H4/Body: text-base (1rem/16px)
Small: text-sm (0.875rem/14px)
XS: text-xs (0.75rem/12px)
Font-weight: normal (400), medium (500)
```

### Espacements et dimensions
```
Radius global: 0.625rem (10px)
Radius-xl: 0.875rem (14px) - cartes principales
Radius-lg: 0.625rem (10px) - boutons, badges
Radius-md: 0.375rem (6px) - inputs
Radius-sm: 0.25rem (4px) - petits éléments

Padding cartes: p-6 (24px)
Gap grilles: gap-6 (24px)
Margin sections: mb-8 (32px)

Sidebar width: 280px (expanded), 80px (collapsed)
Main content max-width: 1280px (max-w-7xl)
```

### Ombres
```
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
```

---

## 📍 ARCHITECTURE ACTUELLE DU DASHBOARD

### Sidebar (280px, fond blanc/90 + backdrop-blur)
Items actuels avec icônes Lucide :
1. **Vue d'ensemble** — LayoutDashboard — gradient blue-cyan
2. **Résultats** — BarChart3 — gradient cyan-teal
3. **Questions** — FileEdit — gradient violet-purple
4. **Traductions** — Languages — gradient indigo-blue
5. **Export** — Download — gradient green-emerald
6. **Intégrations** — Plug — gradient orange-amber
7. **CMS Formulaire** — FileType — gradient pink-rose
8. **Paramètres** — Settings — gradient slate

### Pattern des items sidebar
- Icône dans carré 36x36px (w-9 h-9), rounded-lg
- État actif : fond gradient + ombre + texte blanc
- État inactif : fond slate-100, icône slate-600
- Indicateur actif : barre verticale 4px à gauche, gradient vertical
- Hover : translation x +4px

### Zone de contenu principale
- Background: gradient from-slate-50 via-blue-50 to-cyan-50
- Effets de fond : cercles blurs cyan-200/20 et violet-200/20
- Padding: px-4 py-8
- Max-width: 1280px, mx-auto

---

## 🎯 MISSION : CRÉER LE MODULE "PROSPECTS"

### ÉTAPE 1 — Nouvel item sidebar

Ajouter après "CMS Formulaire" :
```
Label: "Prospects"
Icône suggérée: Users2 ou UserPlus ou Target (Lucide)
Gradient: from-emerald-500 to-teal-500 (#10b981 → #14b8a6)
```

Position dans la liste :
1. Vue d'ensemble
2. Résultats
3. Questions
4. Traductions
5. Export
6. Intégrations
7. CMS Formulaire
8. **Prospects** ← NOUVEAU
9. Paramètres

---

### ÉTAPE 2 — Page principale "Prospects"

#### A. Header de page
```
Structure identique à DashboardOverview :

┌─────────────────────────────────────────────────────────────┐
│ [flex justify-between items-center mb-6]                    │
│                                                             │
│  ┌─────────────────────────┐    ┌──────────────────────┐   │
│  │ Prospects & Relances    │    │ [Bouton] Actualiser  │   │
│  │ text-slate-900          │    │ variant="outline"    │   │
│  │                         │    │ RefreshCw icon       │   │
│  │ Gérez vos prospects...  │    └──────────────────────┘   │
│  │ text-slate-600 text-sm  │                               │
│  └─────────────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

#### B. Grille KPI (4-5 cartes)
```
[grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8]

Utiliser exactement le même pattern que stats[] dans DashboardOverview :

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Card 1            │ Card 2            │ Card 3                │ Card 4                │
│ "Prospects        │ "Clients"         │ "Agences ETT"         │ "Intérimaires"        │
│  totaux"          │                   │                       │                       │
│                   │                   │                       │                       │
│ ┌──────────┐      │ ┌──────────┐      │ ┌──────────┐          │ ┌──────────┐          │
│ │ 48x48    │      │ │ 48x48    │      │ │ 48x48    │          │ │ 48x48    │          │
│ │ gradient │      │ │ gradient │      │ │ gradient │          │ │ gradient │          │
│ │ Users2   │      │ │ Building2│      │ │ Briefcase│          │ │ UserCheck│          │
│ └──────────┘      │ └──────────┘      │ └──────────┘          │ └──────────┘          │
│                   │                   │                       │                       │
│ 247               │ 89                │ 103                   │ 55                    │
│ text-3xl          │ text-3xl          │ text-3xl              │ text-3xl              │
│                   │                   │                       │                       │
│ Prospects totaux  │ Clients           │ Agences de travail    │ Intérimaires          │
│ text-slate-600    │ text-slate-600    │ temporaire            │ text-slate-600        │
│ text-sm           │ text-sm           │ text-slate-600 sm     │ text-sm               │
│                   │                   │                       │                       │
│ +12 ce mois       │ 36% du total      │ 42% du total          │ 22% du total          │
│ text-cyan-600     │ text-cyan-600     │ text-cyan-600         │ text-cyan-600         │
│ text-xs           │ text-xs           │ text-xs               │ text-xs               │
│                   │                   │                       │                       │
│ ░░░░░░░░░░░░░░░░░│ ░░░░░░░░░░░░░░░░░│ ░░░░░░░░░░░░░░░░░    │ ░░░░░░░░░░░░░░░░░    │
│ Progress bar      │ Progress bar      │ Progress bar          │ Progress bar          │
│ h-2 rounded-full  │ gradient blue-cyan│ gradient violet-purple│ gradient green-emerald│
└────────────────────────────────────────────────────────────────────────────────────────┘

Gradients des cartes :
- Prospects totaux : from-blue-500 to-cyan-500
- Clients : from-violet-500 to-purple-500
- Agences ETT : from-orange-500 to-amber-500
- Intérimaires : from-green-500 to-emerald-500
```

Optionnel — 5ème carte sur une nouvelle ligne :
```
┌────────────────────────────────┐
│ "À relancer aujourd'hui"       │
│                                │
│ ┌──────────┐                   │
│ │ Bell     │                   │
│ │ gradient │                   │
│ │ red-orange                   │
│ └──────────┘                   │
│                                │
│ 18                             │
│ Prospects à contacter          │
│ 7.3% du total                  │
│ ░░░░░░░░░░░░░░░░░░░░          │
└────────────────────────────────┘
```

---

#### C. Zone de filtres (chips/tags)
```
[flex flex-wrap gap-2 mb-6]

Utiliser des Badges cliquables (pattern existant) :

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ ┌───────────┐      │
│ │ Tous (247)  │ │ Clients     │ │ Agences ETT         │ │ Intérim.  │      │
│ │ bg-gradient │ │ bg-slate-100│ │ bg-slate-100        │ │ bg-slate  │      │
│ │ text-white  │ │ text-slate  │ │ text-slate-700      │ │ -100      │      │
│ │ (actif)     │ │ (inactif)   │ │ (inactif)           │ │           │      │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ └───────────┘      │
│                                                                             │
│ │ Séparateur vertical 1px bg-slate-200                                     │
│                                                                             │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐          │
│ │ 🔽 Statut pipeline│ │ 🔽 Pays           │ │ 🔽 Secteur        │          │
│ │ (Select dropdown) │ │ (Select dropdown) │ │ (Select dropdown) │          │
│ └───────────────────┘ └───────────────────┘ └───────────────────┘          │
│                                                                             │
│ ┌─────────────────┐ ┌─────────────────────────────────────────────┐        │
│ │ 🔍 Rechercher...│ │ [Bouton] + Nouveau prospect                 │        │
│ │ Input w-64     │ │ bg-gradient-to-r from-blue-500 to-cyan-500  │        │
│ │ border-slate   │ │ text-white                                   │        │
│ └─────────────────┘ └─────────────────────────────────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

États des filtres :
- Actif : bg-gradient-to-r from-blue-500 to-cyan-500, text-white
- Inactif : bg-slate-100, text-slate-700, hover:bg-slate-200
```

---

#### D. Tableau des prospects
```
[Card bg-white border-slate-200 shadow-md]

Pattern identique au tableau "Dernières réponses" de DashboardOverview :

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CardHeader avec CardTitle                                                                                        │
│ ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 📋 Liste des prospects                                              Total: 247 │ Sélectionnés: 0          │ │
│ │ text-slate-900 flex items-center gap-2                                                                      │ │
│ │ + icône ClipboardList w-5 h-5 text-cyan-600                                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ CardContent                                                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Table                                                                                                        │ │
│ │                                                                                                              │ │
│ │ ┌──────┬────────────┬──────────────────┬─────────┬───────────┬──────────────────┬─────────────┬───────────┐ │ │
│ │ │ ☐    │ Type       │ Nom / Entreprise │ Pays    │ Secteur   │ Statut           │ Prochaine   │ Respons.  │ │ │
│ │ │      │            │                  │         │           │                  │ action      │           │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 🏢 Client  │ Bouygues BTP     │ 🇫🇷 FR  │ BTP       │ 🟢 Qualifié      │ 📞 Appel    │ 👤 JD     │ │ │
│ │ │      │ Badge blue │ text-slate-900   │ text-sm │ text-sm   │ Badge green      │ 15 déc.     │ Avatar    │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 🏭 Agence  │ Manpower Europe  │ 🇩🇪 DE  │ Multi     │ 🟡 Relance       │ 📧 Email    │ 👤 ML     │ │ │
│ │ │      │ Badge orange                  │         │           │ Badge yellow     │ 16 déc.     │           │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 👷 Intérim.│ Pavel Novak      │ 🇨🇿 CZ  │ Logistique│ 🔵 Nouveau       │ 📅 RDV      │ 👤 SC     │ │ │
│ │ │      │ Badge green│ text-slate-900   │         │           │ Badge blue       │ 18 déc.     │           │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 🏢 Client  │ Vinci Construct. │ 🇪🇸 ES  │ BTP       │ 🟣 Proposition   │ 📄 Devis    │ 👤 AF     │ │ │
│ │ │      │            │                  │         │           │ Badge violet     │ 20 déc.     │           │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 🏭 Agence  │ Adecco Poland    │ 🇵🇱 PL  │ Industrie │ 🟢 Gagné         │ ✅ Contrat  │ 👤 JD     │ │ │
│ │ │      │            │                  │         │           │ Badge emerald    │ signé       │           │ │ │
│ │ ├──────┼────────────┼──────────────────┼─────────┼───────────┼──────────────────┼─────────────┼───────────┤ │ │
│ │ │ ☐    │ 👷 Intérim.│ Maria Santos     │ 🇵🇹 PT  │ Hôtellerie│ 🔴 Perdu         │ —           │ 👤 ML     │ │ │
│ │ │      │            │                  │         │           │ Badge red        │             │           │ │ │
│ │ └──────┴────────────┴──────────────────┴─────────┴───────────┴──────────────────┴─────────────┴───────────┘ │ │
│ │                                                                                                              │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ Pagination en bas                                                                                                │
│ ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Affichant 1-10 sur 247          │  ◀ Précédent  │ 1 │ 2 │ 3 │ ... │ 25 │  Suivant ▶                       │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Badges Statut Pipeline (couleurs exactes) :
- Nouveau : bg-blue-100 text-blue-700
- Qualifié : bg-green-100 text-green-700
- Relance planifiée : bg-yellow-100 text-yellow-700 (ou amber)
- Proposition envoyée : bg-violet-100 text-violet-700
- Gagné : bg-emerald-100 text-emerald-700
- Perdu : bg-red-100 text-red-700

Badges Type :
- Client : bg-blue-100 text-blue-700, icône Building2
- Agence ETT : bg-orange-100 text-orange-700, icône Briefcase
- Intérimaire : bg-green-100 text-green-700, icône UserCheck

Avatars :
- Cercle 32x32px (w-8 h-8), rounded-full
- Initiales en texte blanc sur fond gradient
- Alternative : photo de profil
```

---

### ÉTAPE 3 — Panneau latéral "Fiche Prospect"

```
[Sheet ou Drawer, côté droit, width: 480px (w-[480px])]
[Fond blanc, border-l border-slate-200, shadow-xl]

Au clic sur une ligne du tableau, ce panneau s'ouvre avec animation (slide from right)

┌──────────────────────────────────────────────────────────────────────────────────┐
│ Header du panneau                                                                 │
│ ┌──────────────────────────────────────────────────────────────────────────────┐ │
│ │ [flex justify-between items-center p-6 border-b border-slate-200]            │ │
│ │                                                                              │ │
│ │ ┌───────────────────────────────┐                    ┌────────────────────┐ │ │
│ │ │ Fiche Prospect                │                    │ ✕ Fermer           │ │ │
│ │ │ text-xl text-slate-900        │                    │ Button ghost       │ │ │
│ │ └───────────────────────────────┘                    └────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│ Corps du panneau [p-6 space-y-6 overflow-y-auto]                                 │
│ ┌──────────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                              │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Bloc identité - Card avec fond gradient subtil]                         │ │ │
│ │ │ bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 p-4 rounded-xl │ │ │
│ │ │                                                                          │ │ │
│ │ │ ┌─────────────────────────────────────────────────────────────────────┐  │ │ │
│ │ │ │ ┌──────────┐  Bouygues BTP                                          │  │ │ │
│ │ │ │ │ Avatar   │  text-xl text-slate-900 font-medium                    │  │ │ │
│ │ │ │ │ 64x64    │                                                        │  │ │ │
│ │ │ │ │ gradient │  🏢 Client • 🇫🇷 France • BTP                          │  │ │ │
│ │ │ │ │ B        │  text-sm text-slate-600                                │  │ │ │
│ │ │ │ └──────────┘                                                        │  │ │ │
│ │ │ │                                                                     │  │ │ │
│ │ │ │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │  │ │ │
│ │ │ │ │ 🟢 Qualifié   │ │ 📅 Créé le    │ │ 👤 Resp: JD   │              │  │ │ │
│ │ │ │ │ Badge green   │ │ 15 oct 2024   │ │               │              │  │ │ │
│ │ │ │ └───────────────┘ └───────────────┘ └───────────────┘              │  │ │ │
│ │ │ └─────────────────────────────────────────────────────────────────────┘  │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                              │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Section Coordonnées]                                                    │ │ │
│ │ │                                                                          │ │ │
│ │ │ 📧 Email                              📞 Téléphone                       │ │ │
│ │ │ contact@bouygues.com                  +33 1 23 45 67 89                  │ │ │
│ │ │ text-cyan-600 hover:underline         text-slate-700                     │ │ │
│ │ │                                                                          │ │ │
│ │ │ 🌐 Site web                           📍 Adresse                         │ │ │
│ │ │ www.bouygues.com                      Paris, France                      │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                              │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Section Prochaines relances]                                            │ │ │
│ │ │ CardHeader: 🔔 Prochaines actions                                        │ │ │
│ │ │                                                                          │ │ │
│ │ │ ┌──────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ 📞 15 déc. 14:00 │ Appel de suivi          │ JD │ [Bouton: Fait ✓]  │ │ │ │
│ │ │ │    text-slate-600│ text-slate-900          │    │                   │ │ │ │
│ │ │ ├──────────────────────────────────────────────────────────────────────┤ │ │ │
│ │ │ │ 📧 18 déc. 10:00 │ Envoi proposition       │ JD │                   │ │ │ │
│ │ │ └──────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                          │ │ │
│ │ │ [Bouton: + Planifier une action]                                        │ │ │
│ │ │ variant="outline" w-full                                                 │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                              │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Section Historique]                                                     │ │ │
│ │ │ CardHeader: 📋 Historique des interactions                               │ │ │
│ │ │                                                                          │ │ │
│ │ │ ┌──────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ Timeline verticale avec ligne à gauche                               │ │ │ │
│ │ │ │                                                                      │ │ │ │
│ │ │ │ ● 12 déc. 2024                                                       │ │ │ │
│ │ │ │ │ 📞 Appel découverte                                                │ │ │ │
│ │ │ │ │ "Discussion sur leurs besoins en intérimaires polonais..."         │ │ │ │
│ │ │ │ │ text-slate-600 text-sm                                             │ │ │ │
│ │ │ │ │                                                                    │ │ │ │
│ │ │ │ ● 8 déc. 2024                                                        │ │ │ │
│ │ │ │ │ 📧 Email d'introduction                                            │ │ │ │
│ │ │ │ │ "Premier contact suite au formulaire..."                           │ │ │ │
│ │ │ │ │                                                                    │ │ │ │
│ │ │ │ ● 5 déc. 2024                                                        │ │ │ │
│ │ │ │   🌐 Formulaire reçu                                                 │ │ │ │
│ │ │ │   Score d'intérêt: 8/10                                              │ │ │ │
│ │ │ └──────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                              │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Section Notes internes]                                                 │ │ │
│ │ │ CardHeader: 📝 Notes internes                                            │ │ │
│ │ │                                                                          │ │ │
│ │ │ ┌──────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ Textarea h-24                                                        │ │ │ │
│ │ │ │ placeholder="Ajouter une note..."                                    │ │ │ │
│ │ │ │ border-slate-200 focus:border-cyan-400                               │ │ │ │
│ │ │ └──────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                          │ │ │
│ │ │ Liste des notes existantes en dessous                                    │ │ │
│ │ │ ┌───────────────────────────────────────────────────────────────────┐   │ │ │
│ │ │ │ 10 déc. par JD: "Client prioritaire pour Q1 2025"                 │   │ │ │
│ │ │ │ bg-slate-50 p-3 rounded-lg text-sm                                │   │ │ │
│ │ │ └───────────────────────────────────────────────────────────────────┘   │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                              │ │
│ └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│ Footer du panneau [p-6 border-t border-slate-200 flex gap-3]                     │
│ ┌──────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Bouton: Modifier le statut] variant="outline"                               │ │
│ │ [Bouton: Envoyer un email] bg-gradient-to-r from-blue-500 to-cyan-500       │ │
│ └──────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### ÉTAPE 4 — Section Campagnes Marketing (optionnelle)

```
Si l'espace le permet, ajouter sous le tableau :

[grid lg:grid-cols-3 gap-6 mt-8]

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Card 1                     │ Card 2                     │ Card 3                      │
│ "Campagnes actives"        │ "Emails envoyés"           │ "Taux d'ouverture"          │
│                            │                            │                              │
│ ┌──────────────────────┐   │ ┌──────────────────────┐   │ ┌──────────────────────┐    │
│ │ Mini donut chart     │   │ │ Nombre: 1,234        │   │ │ 42.3%                │    │
│ │ (optionnel)          │   │ │ +18% ce mois         │   │ │ RadialBarChart       │    │
│ │                      │   │ │                      │   │ │ ou cercle progress   │    │
│ │ 3 campagnes          │   │ │ Bar chart mini       │   │ │                      │    │
│ │ en cours             │   │ │ derniers 7 jours     │   │ │ "Moy. industrie: 21%"│    │
│ └──────────────────────┘   │ └──────────────────────┘   │ └──────────────────────┘    │
│                            │                            │                              │
│ Détails campagnes:         │                            │ Taux de clic: 12.8%         │
│ • Newsletter Europe        │                            │ Désabonnements: 0.3%        │
│ • Offre BTP Q1             │                            │                              │
│ • Webinar intérim          │                            │                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 INTERACTIONS À PROTOTYPER

1. **Navigation Sidebar**
   - Clic sur "Prospects" → Affiche la page Prospects
   - État actif avec indicateur visuel (barre verticale gradient + fond)

2. **Filtres**
   - Clic sur chip "Clients" → État actif (gradient), autres inactifs
   - Les chips Type sont mutuellement exclusifs (un seul actif)
   - Les dropdowns Statut/Pays/Secteur peuvent être combinés

3. **Tableau**
   - Hover sur ligne → bg-slate-50 (hover state)
   - Clic sur ligne → Ouvre le panneau latéral fiche prospect
   - Checkbox pour sélection multiple

4. **Panneau latéral**
   - Animation slide-in depuis la droite
   - Bouton X pour fermer → slide-out
   - Clic à l'extérieur → ferme le panneau

5. **Actions**
   - Bouton "+ Nouveau prospect" → Ouvre modal de création
   - Bouton "Modifier le statut" → Dropdown avec les statuts

---

## 🚫 RESTRICTIONS ABSOLUES

1. **NE PAS MODIFIER** la landing page marketing (hero, chiffres, services, témoignages, etc.)
2. **NE PAS CHANGER** les styles globaux, tokens, variables existantes
3. **NE PAS RENOMMER** les composants ou frames existants
4. **NE PAS MODIFIER** la grille ou structure des pages dashboard existantes
5. **RÉUTILISER** les composants existants (Card, Badge, Button, Table, Input, Select)
6. **RESPECTER** les exactes valeurs de couleurs, espacements et radius

---

## ✅ CHECKLIST FINALE

- [ ] Nouvel item "Prospects" ajouté dans la sidebar (position 8)
- [ ] Page Prospects créée avec la même structure que Vue d'ensemble
- [ ] 4-5 cartes KPI avec gradients et progress bars
- [ ] Zone de filtres (chips + dropdowns + recherche + bouton)
- [ ] Tableau des prospects avec toutes les colonnes
- [ ] Badges de statut avec les bonnes couleurs
- [ ] Pagination du tableau
- [ ] Panneau latéral "Fiche Prospect" (Sheet/Drawer)
- [ ] Sections dans la fiche : Identité, Coordonnées, Relances, Historique, Notes
- [ ] (Optionnel) Section Campagnes Marketing
- [ ] Interactions de navigation prototypées
- [ ] Respect total du design system existant

---

## 📎 ICÔNES LUCIDE À UTILISER

```
Sidebar & Navigation:
- Users2 ou UserPlus : Onglet Prospects
- RefreshCw : Bouton Actualiser

KPI Cards:
- Users2 : Prospects totaux
- Building2 : Clients
- Briefcase : Agences ETT
- UserCheck : Intérimaires
- Bell ou AlertCircle : À relancer

Tableau:
- ClipboardList : Titre du tableau
- Phone : Appel
- Mail : Email
- Calendar : RDV
- FileText : Devis/Proposition
- CheckCircle : Contrat signé

Fiche Prospect:
- Mail : Email
- Phone : Téléphone
- Globe : Site web
- MapPin : Adresse
- Bell : Prochaines actions
- Clock ou History : Historique
- StickyNote ou MessageSquare : Notes
- Edit : Modifier
- Send : Envoyer email
```

---

Ce prompt fournit toutes les spécifications techniques exactes pour que Figma Make puisse générer un module Prospects parfaitement cohérent avec le design system existant du dashboard YoJob.
