# 🎨 Nouveau Design PDF - Version 2.0

## 📋 Vue d'ensemble

Refonte complète de la génération PDF avec un design moderne, épuré et adaptatif basé sur les maquettes fournies.

## ✨ Caractéristiques principales

### Design moderne
- **Header gradient** : Dégradé violet (#4F46E5) → cyan (#06B6D4)
- **Cards épurées** : Bordures colorées de 4px à gauche au lieu de rectangles pleins
- **Typographie claire** : Labels en gris (7-8pt), valeurs en noir (9-10pt)
- **Espacement généreux** : Padding 12-16px, gap entre sections 12-16px

### Layout adaptatif
- **2 colonnes** pour Client/Contact
- **Section Synthèse** avec badges inline
- **Cards de postes** avec bordure violette à gauche
- **Conditions de travail** en liste à puces
- **Page 2** : Profil des candidats + Signature électronique (si signée)

## 📐 Structure du PDF

### Page 1 - Informations principales

```
┌─────────────────────────────────────────────┐
│ HEADER (gradient violet → cyan)            │
│ YOJOB | DEVIS XXX-XXX | [SIGNÉ/A SIGNER]  │
│ Créé le: XX/XX/XXXX | Valable jusqu'au    │
├─────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━┓  │
│ ┃ Client         ┃  ┃ Contact        ┃  │
│ ┃ (Entreprise)   ┃  ┃                ┃  │
│ ┗━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━┛  │
│                                             │
│ ┌────────────────────────────────────────┐ │
│ │ Synthèse                               │ │
│ │ [X Poste(s)] [X Candidat(s)] [Lieu]   │ │
│ └────────────────────────────────────────┘ │
│                                             │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ POSTE #1 - COFFREUR    1 913.00 €/mois ┃  │
│ ┃                                         ┃  │
│ ┃ RÉMUNÉRATION        INFORMATIONS        ┃  │
│ ┃ Salaire brut        Lieu de mission     ┃  │
│ ┃ 1 913.00 €          Bordeaux            ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                             │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ Conditions de travail                   ┃  │
│ ┃ • Motif de recours: accroissement       ┃  │
│ ┃ • Hébergement: Non pris en charge       ┃  │
│ ┃ • Repas: panier                         ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                             │
│ Footer : YOJOB | contact | 1/2             │
└─────────────────────────────────────────────┘
```

### Page 2 - Profil & Signature

```
┌─────────────────────────────────────────────┐
│ HEADER (identique page 1)                  │
├─────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ Profil des candidats recherchés         ┃  │
│ ┃ • Expérience requise: 12 ans            ┃  │
│ ┃ • Formation: CAP                        ┃  │
│ ┃ • Permis de conduire: Catégorie B       ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                             │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ Signature électronique (bordure verte)  ┃  │
│ ┃ Nom complet: Test DUPONT                ┃  │
│ ┃ Fonction: RH                            ┃  │
│ ┃ Date: 01/02/2026 à 15:11:14            ┃  │
│ ┃ Entreprise: Test entreprise             ┃  │
│ ┃ SIRET: 123123123                        ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                             │
│ ┌────────────────────────────────────────┐ │
│ │ Détails techniques (preuve intégrité)  │ │
│ │ Adresse IP: 83.195.155.204             │ │
│ │ Navigateur: Mozilla/5.0...              │ │
│ │ Hash: de413b2e53c2aa...                 │ │
│ └────────────────────────────────────────┘ │
│                                             │
│ Footer : YOJOB | contact | 2/2             │
└─────────────────────────────────────────────┘
```

## 🎨 Palette de couleurs

```typescript
colors = {
  violet: rgb(0.31, 0.27, 0.90),    // #4F46E5 - Bordure postes
  cyan: rgb(0.03, 0.71, 0.83),      // #06B6D4 - Bordure contact
  green: rgb(0.06, 0.73, 0.51),     // #10B981 - Signature (si signée)
  navy: rgb(0.12, 0.16, 0.24),      // #1E293B - Texte principal
  gray: rgb(0.39, 0.45, 0.55),      // #64748B - Labels
  lightGray: rgb(0.89, 0.91, 0.94), // #E2E8F0 - Bordures cards
  white: rgb(1, 1, 1),              // #FFFFFF - Fond cards
}
```

## 📏 Dimensions et espacements

- **Page** : 595.28 × 841.89 px (A4)
- **Marges** : 30px
- **Header** : 74px de hauteur
- **Footer** : 40px de hauteur
- **Bordure colorée** : 4px de largeur
- **Padding cards** : 12-16px
- **Gap entre sections** : 12-16px
- **Gap colonnes** : 12px

## 🔤 Typographie

- **Font principale** : Helvetica (Standard PDF)
- **Font bold** : Helvetica-Bold
- **Font mono** : Courier (pour les hash techniques)

### Tailles de police
- **Titres sections** : 10pt bold
- **Titres postes** : 10pt bold
- **Sous-titres** : 7.5-8pt bold
- **Labels** : 7-8pt regular (gris)
- **Valeurs** : 9pt regular (noir)
- **Footer** : 7pt regular

## 📦 Fichiers

- **`devis-pdf-generator-v2.tsx`** : Nouveau générateur PDF moderne
- **`devis.tsx`** : Fichier principal (importe et utilise la v2)
- **`generateDevisPdfBytes()`** : Ancienne fonction (conservée pour référence)

## 🔄 Migration

### Avant
```typescript
const pdfBytes = await generateDevisPdfBytes(prospect, inclureCGV);
```

### Après
```typescript
import { generateModernDevisPdf } from './devis-pdf-generator-v2.tsx';
const pdfBytes = await generateModernDevisPdf(prospect, inclureCGV);
```

## ✅ Avantages du nouveau design

1. **Plus épuré** : Bordures fines au lieu de rectangles pleins
2. **Meilleur contraste** : Hiérarchie visuelle claire labels/valeurs
3. **Adaptatif** : S'ajuste automatiquement selon les champs présents
4. **Moderne** : Gradient header, badges colorés, espacements généreux
5. **Lisible** : Typographie claire, tailles optimales
6. **Professionnel** : Cohérence visuelle avec le branding YOJOB

## 🐛 Points d'attention

- **Gestion des pages** : Nouvelle page automatique si espace insuffisant
- **Wrap du texte** : Les valeurs longues sont wrappées intelligemment
- **Champs vides** : Les sections sans données sont masquées ou affichent un message
- **Signature** : Page 2 affichée uniquement si le devis est signé

## 🚀 Prochaines améliorations possibles

- [ ] Support des logos personnalisés (upload entreprise)
- [ ] Thèmes de couleurs personnalisables
- [ ] Export multi-langues (EN, DE, ES, etc.)
- [ ] QR code pour vérification d'authenticité
- [ ] Génération PDF/A pour archivage long terme

---

**Version** : 2.0  
**Date** : Février 2026  
**Auteur** : YOJOB Dev Team
