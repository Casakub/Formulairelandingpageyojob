# PROMPT FIGMA MAKE — Module Prospects CRM

## CONTEXTE

Tu travailles sur un fichier Figma contenant :
1. **Landing page marketing** → NE PAS MODIFIER
2. **Dashboard SaaS** → ZONE DE TRAVAIL

**Mission** : Créer un module "Prospects" dans le dashboard pour gérer les prospects Clients, Agences ETT et Intérimaires.

---

## DESIGN SYSTEM À RESPECTER

### Couleurs
| Token | Valeur | Usage |
|-------|--------|-------|
| Primary | `#030213` | Texte principal |
| Background | `#ffffff` | Fonds |
| Border | `rgba(0,0,0,0.1)` | Bordures |
| Slate-600 | `#475569` | Texte secondaire |
| Cyan-500 | `#06b6d4` | Accent principal |
| Cyan-600 | `#0891b2` | Liens, accents |

### Gradients (format: from → to)
| Nom | Couleurs | Usage |
|-----|----------|-------|
| Blue-Cyan | `#3b82f6 → #06b6d4` | Principal, boutons |
| Violet-Purple | `#8b5cf6 → #a855f7` | Clients |
| Orange-Amber | `#f97316 → #f59e0b` | Agences |
| Green-Emerald | `#22c55e → #10b981` | Intérimaires |
| Emerald-Teal | `#10b981 → #14b8a6` | Onglet Prospects |

### Dimensions
| Élément | Valeur |
|---------|--------|
| Radius global | `10px` |
| Sidebar width | `280px` |
| Padding cards | `24px` |
| Gap grilles | `24px` |
| Icône KPI | `48×48px` |

### Typographie
- **H1** : 24px, medium
- **H2** : 20px, medium
- **Body** : 16px, normal
- **Small** : 14px
- **XS** : 12px

---

## STRUCTURE À CRÉER

### 1. SIDEBAR — Nouvel item

**Position** : Après "CMS Formulaire", avant "Paramètres"

```
Libellé : "Prospects"
Icône : Users2 (Lucide)
Gradient : Emerald-Teal (#10b981 → #14b8a6)
```

**États** :
- Actif : Fond gradient + icône blanche + barre verticale à gauche
- Inactif : Fond slate-100 + icône slate-600

---

### 2. PAGE PROSPECTS

#### A. En-tête
```
┌─────────────────────────────────────────────────────────┐
│ Prospects & Relances              [Bouton: Actualiser] │
│ Gérez vos prospects et relances.   (variant=outline)   │
└─────────────────────────────────────────────────────────┘
```

#### B. Cartes KPI (grille 4 colonnes)

| Carte | Icône | Gradient | Valeur exemple |
|-------|-------|----------|----------------|
| Prospects totaux | Users2 | Blue-Cyan | 247 |
| Clients | Building2 | Violet-Purple | 89 |
| Agences ETT | Briefcase | Orange-Amber | 103 |
| Intérimaires | UserCheck | Green-Emerald | 55 |

**Structure d'une carte** :
```
┌──────────────────────────┐
│ [Icône 48×48 gradient]   │
│                          │
│ 247                      │ ← text-3xl
│ Prospects totaux         │ ← text-sm slate-600
│ +12 ce mois              │ ← text-xs cyan-600
│ ▓▓▓▓▓▓▓░░░░░░░░         │ ← Progress bar h-2
└──────────────────────────┘
```

#### C. Zone de filtres

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Tous] [Clients] [Agences] [Intérim.]  │  [Statut ▼] [Pays ▼] [Secteur ▼]  │
│ ─────────────────────────────────────  │  ────────────────────────────────  │
│ Chips cliquables                       │  Dropdowns Select                  │
│                                        │                                    │
│ [🔍 Rechercher...]                              [+ Nouveau prospect]        │
│  Input w-64                                      Bouton gradient blue-cyan  │
└──────────────────────────────────────────────────────────────────────────────┘
```

**États chips** :
- Actif : `bg-gradient blue-cyan` + `text-white`
- Inactif : `bg-slate-100` + `text-slate-700`

#### D. Tableau des prospects

**Colonnes** :
| ☐ | Type | Nom / Entreprise | Pays | Secteur | Statut | Prochaine action | Resp. |
|---|------|------------------|------|---------|--------|------------------|-------|

**Badges Type** :
- Client : `bg-blue-100 text-blue-700` + Building2
- Agence : `bg-orange-100 text-orange-700` + Briefcase
- Intérim : `bg-green-100 text-green-700` + UserCheck

**Badges Statut Pipeline** :
| Statut | Couleur |
|--------|---------|
| Nouveau | `bg-blue-100 text-blue-700` |
| Qualifié | `bg-green-100 text-green-700` |
| Relance planifiée | `bg-yellow-100 text-yellow-700` |
| Proposition envoyée | `bg-violet-100 text-violet-700` |
| Gagné | `bg-emerald-100 text-emerald-700` |
| Perdu | `bg-red-100 text-red-700` |

**Lignes exemple** :
```
☐ | 🏢 Client  | Bouygues BTP     | 🇫🇷 FR | BTP       | 🟢 Qualifié    | 📞 Appel 15/12  | JD
☐ | 🏭 Agence  | Manpower Europe  | 🇩🇪 DE | Multi     | 🟡 Relance     | 📧 Email 16/12  | ML
☐ | 👷 Intérim | Pavel Novak      | 🇨🇿 CZ | Logistique| 🔵 Nouveau     | 📅 RDV 18/12    | SC
```

**Pagination** : `Affichant 1-10 sur 247  ◀ 1 2 3 ... 25 ▶`

---

### 3. PANNEAU LATÉRAL — Fiche Prospect

**Dimensions** : `width: 480px`, slide depuis la droite

#### Structure

```
┌────────────────────────────────────────────────────────┐
│ HEADER                                                 │
│ Fiche Prospect                              [✕ Fermer] │
├────────────────────────────────────────────────────────┤
│ IDENTITÉ (Card gradient blue-50 → cyan-50)             │
│ ┌────────┐                                             │
│ │ Avatar │ Bouygues BTP                                │
│ │  64×64 │ 🏢 Client • 🇫🇷 France • BTP                │
│ └────────┘                                             │
│ [🟢 Qualifié] [📅 Créé: 15 oct] [👤 Resp: JD]         │
├────────────────────────────────────────────────────────┤
│ COORDONNÉES                                            │
│ 📧 contact@bouygues.com    📞 +33 1 23 45 67 89       │
│ 🌐 www.bouygues.com        📍 Paris, France           │
├────────────────────────────────────────────────────────┤
│ 🔔 PROCHAINES ACTIONS                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 📞 15 déc 14h │ Appel suivi │ JD │ [✓ Fait]       │ │
│ │ 📧 18 déc 10h │ Envoi prop. │ JD │                │ │
│ └────────────────────────────────────────────────────┘ │
│ [+ Planifier une action]                               │
├────────────────────────────────────────────────────────┤
│ 📋 HISTORIQUE                                          │
│ ● 12 déc — 📞 Appel découverte                        │
│ │ "Discussion besoins intérimaires polonais..."       │
│ ● 8 déc — 📧 Email introduction                       │
│ ● 5 déc — 🌐 Formulaire reçu (Score: 8/10)           │
├────────────────────────────────────────────────────────┤
│ 📝 NOTES INTERNES                                      │
│ [Textarea: Ajouter une note...]                        │
│ ┌──────────────────────────────────────────────────┐  │
│ │ 10 déc par JD: "Client prioritaire Q1 2025"      │  │
│ └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│ FOOTER                                                 │
│ [Modifier statut]              [Envoyer email]        │
│  variant=outline                gradient blue-cyan     │
└────────────────────────────────────────────────────────┘
```

---

### 4. SECTION CAMPAGNES (Optionnelle)

Sous le tableau, grille 3 colonnes :

| Campagnes actives | Emails envoyés | Taux d'ouverture |
|-------------------|----------------|------------------|
| 3 en cours | 1,234 (+18%) | 42.3% (RadialChart) |

---

## ICÔNES LUCIDE

| Contexte | Icônes |
|----------|--------|
| Navigation | Users2, RefreshCw |
| KPI | Users2, Building2, Briefcase, UserCheck, Bell |
| Actions | Phone, Mail, Calendar, FileText, CheckCircle |
| Fiche | Mail, Phone, Globe, MapPin, Clock, StickyNote, Edit, Send |

---

## INTERACTIONS À PROTOTYPER

1. **Sidebar** : Clic "Prospects" → Affiche page + état actif
2. **Chips filtres** : Clic → Toggle état actif/inactif
3. **Ligne tableau** : Hover → bg-slate-50 | Clic → Ouvre panneau latéral
4. **Panneau** : Animation slide-in droite | ✕ → slide-out

---

## RESTRICTIONS

| ❌ NE PAS FAIRE | ✅ FAIRE |
|-----------------|----------|
| Modifier la landing page | Travailler uniquement dans le dashboard |
| Changer les tokens/variables | Réutiliser les valeurs exactes |
| Renommer les frames existants | Créer de nouveaux frames à côté |
| Modifier les composants globaux | Réutiliser Card, Badge, Button, Table |
| Inventer de nouvelles couleurs | Utiliser uniquement la palette définie |

---

## CHECKLIST

- [ ] Item sidebar "Prospects" ajouté (position 8)
- [ ] Page avec header + KPI + filtres + tableau
- [ ] Badges statut avec couleurs correctes
- [ ] Panneau fiche prospect complet
- [ ] Interactions prototypées
- [ ] Design cohérent avec le dashboard existant
