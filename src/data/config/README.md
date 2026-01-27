# 📁 Architecture des données de configuration YOJOB

## 🎯 Objectif

Ce dossier contient **toutes les données** nécessaires au système de devis YOJOB de manière centralisée. C'est la **source unique de vérité** pour éviter toute duplication.

---

## 📂 Structure des fichiers

### `/data/config/index.ts` ✅ **SOURCE PRINCIPALE**
Contient toutes les données métier :
- **Pays** : Liste des 10 pays actifs (RO, PL, PT, ES, BG, HU, SK, CZ, HR, SI)
- **Coefficients** : Coefficients de base par secteur et classification
- **Facteurs pays** : Facteurs multiplicateurs par pays (1.00 à 1.07)
- **Salaires** : Grilles salariales par région (13 régions françaises) et secteur
- **Suppléments** : Hébergement, transport, paniers repas

**Utilisation** :
```typescript
import { configData } from '../data/config/index';
const salaires = configData.salaires.salaires['ÎLE-DE-FRANCE'];
```

---

### `/data/config/constants.ts` ✅ **CONSTANTES RÉUTILISABLES**
Contient les constantes simples :
- **PAYS_EUROPEENS** : Liste de 27 pays européens
- **REGIONS** : 13 régions françaises
- **SECTEURS** : 10 secteurs d'activité avec postes et classifications
- **COEFFICIENTS** : Coefficients agence par secteur (marges ETT)
- **SUPPLEMENTS** : Hébergement (3.50€/h) et transport (1.50€/h)
- **NIVEAUX_LANGUE** : A1 à C2
- **LANGUES** : Français, Anglais, Portugais, Espagnol, Italien, Autre
- **EPIS** : Équipements de protection individuelle (10 types)

**Utilisation** :
```typescript
import { REGIONS, SECTEURS, EPIS } from '../data/config/constants';
```

---

### `/data/config/helpers.ts` ✅ **FONCTIONS UTILITAIRES**
Contient toutes les fonctions pour interroger les données :

#### 💶 Fonctions salaires
- `getSalairesByPaysRegion(pays, region)` : Récupère les salaires
- `getCoefficientByPays(pays)` : Récupère le coefficient pays

#### 🍽️ Fonctions paniers repas
- `getPanierRepas(region, secteur)` : **À UTILISER** (prend en compte le secteur)
- `getPanierRepasByPays(pays, region, secteur)` : **OBSOLÈTE** (compatibilité)

#### 🏢 Fonctions pays
- `getPaysActifs()` : Liste des pays actifs
- `getPaysParCode(code)` : Informations d'un pays

#### 🎯 Fonctions coefficients
- `getCoefficientBase(secteur, classification)` : Coefficient de base
- `getClassificationsPourSecteur(secteur)` : Liste des classifications
- `mapperClassification(secteur, ancienneClassification)` : Mapping

#### ✨ Fonctions suppléments
- `getSupplementHebergement()` : Montant hébergement
- `getSupplementTransport()` : Montant transport

**Utilisation** :
```typescript
import { getPanierRepas, getSalairesByPaysRegion } from '../data/config/helpers';

const montant = getPanierRepas('ÎLE-DE-FRANCE', 'Bâtiment'); // 12.50
const salaires = getSalairesByPaysRegion('FR', 'ÎLE-DE-FRANCE');
```

---

## 🔄 Migration depuis l'ancien système

### ❌ Fichiers OBSOLÈTES (NE PLUS UTILISER)
- `/data/devis-data.ts` → Remplacé par `constants.ts` + `index.ts`
- `/data/devis-data-pays.ts` → Remplacé par `helpers.ts` + `index.ts`

### ✅ Migration des imports

**AVANT** :
```typescript
import { REGIONS, SECTEURS } from '../../data/devis-data';
import { getSalairesByPaysRegion } from '../../data/devis-data-pays';
```

**APRÈS** :
```typescript
import { REGIONS, SECTEURS } from '../../data/config/constants';
import { getSalairesByPaysRegion } from '../../data/config/helpers';
```

---

## 🛠️ Hook React : `useDevisConfig()`

### Utilisation
```typescript
import { useDevisConfig } from '../../hooks/useDevisConfig';

const { 
  getPaysActifs,
  getCoefficient,
  getSalaire,
  getPanierRepas,
  isLoading 
} = useDevisConfig();

// Récupérer les pays actifs
const pays = getPaysActifs(); // [{ code: 'RO', label: 'Roumanie', flag: '🇷🇴' }, ...]

// Calculer un coefficient
const coeff = getCoefficient('Bâtiment', 'N1P1', 'RO'); // 1.92

// Récupérer un salaire
const salaire = getSalaire('ÎLE-DE-FRANCE', 'Bâtiment', 'N1P1'); // 1823

// Récupérer un panier repas
const panier = getPanierRepas('ÎLE-DE-FRANCE', 'Bâtiment'); // 12.50
```

---

## 📊 Données disponibles

### 1. Pays (10 actifs)
| Code | Pays | Facteur | Flag |
|------|------|---------|------|
| RO | Roumanie | 1.00 | 🇷🇴 |
| PL | Pologne | 1.02 | 🇵🇱 |
| PT | Portugal | 1.07 | 🇵🇹 |
| ES | Espagne | 1.06 | 🇪🇸 |
| BG | Bulgarie | 1.00 | 🇧🇬 |
| HU | Hongrie | 1.01 | 🇭🇺 |
| SK | Slovaquie | 1.00 | 🇸🇰 |
| CZ | Tchéquie | 1.03 | 🇨🇿 |
| HR | Croatie | 1.01 | 🇭🇷 |
| SI | Slovénie | 1.04 | 🇸🇮 |

### 2. Régions françaises (13)
- ÎLE-DE-FRANCE
- PROVENCE-ALPES-CÔTE D'AZUR
- AUVERGNE-RHÔNE-ALPES
- ... (13 au total)

### 3. Secteurs d'activité (10)
- Bâtiment (8 classifications)
- Métallurgie (10 classifications)
- TP (6 classifications)
- Hôtellerie (4 classifications)
- Restauration (5 classifications)
- Plasturgie (12 classifications)
- Automobile Carrosserie (12 classifications)
- Sylviculture (2 classifications)
- Cartonnerie (12 classifications)
- Autre (1 classification)

### 4. Paniers repas (par région ET secteur)

**Exemple : ÎLE-DE-FRANCE**
| Secteur | Montant (€/jour) |
|---------|------------------|
| Bâtiment | 12.50 |
| Métallurgie | 5.94 |
| TP | 12.50 |
| Hôtellerie | 5.94 |
| Restauration | 5.94 |
| ... | ... |

**Exemple : NOUVELLE-AQUITAINE**
| Secteur | Montant (€/jour) |
|---------|------------------|
| Bâtiment | 10.00 |
| Métallurgie | 5.94 |
| TP | 10.00 |
| Hôtellerie | 5.94 |
| Restauration | 5.94 |
| ... | ... |

---

## ✅ Checklist de migration

- [x] Créer `/data/config/constants.ts`
- [x] Créer `/data/config/helpers.ts`
- [x] Mettre à jour `/hooks/useDevisConfig.ts`
- [x] Migrer `/components/devis/Step1Entreprise.tsx`
- [x] Migrer `/components/devis/Step3Besoins.tsx`
- [x] Migrer `/components/devis/Step5Candidats.tsx`
- [x] Migrer `/utils/devis-calculations.ts`
- [ ] Migrer `/components/devis/StepRecapitulatif.tsx`
- [ ] Supprimer `/data/devis-data.ts` (après tests)
- [ ] Supprimer `/data/devis-data-pays.ts` (après tests)

---

## 🔧 Maintenance

### Ajouter un nouveau pays
1. Ouvrir `/data/config/index.ts`
2. Ajouter dans `configData.pays.pays`
3. Ajouter dans `configData.facteurs.facteurs`

### Ajouter une nouvelle région
1. Ouvrir `/data/config/constants.ts`
2. Ajouter dans `REGIONS`
3. Ouvrir `/data/config/index.ts`
4. Ajouter les salaires dans `configData.salaires.salaires`
5. Ajouter les paniers repas dans `configData.supplements.paniers_repas`

### Modifier un montant de panier repas
1. Ouvrir `/data/config/index.ts`
2. Modifier dans `configData.supplements.paniers_repas[region][secteur]`

---

## 🚨 Règles importantes

1. **NE JAMAIS** dupliquer les données dans plusieurs fichiers
2. **TOUJOURS** utiliser `useDevisConfig()` dans les composants React
3. **TOUJOURS** utiliser les helpers pour accéder aux données
4. **TOUJOURS** importer depuis `/data/config/*` (jamais depuis `/data/devis-data*`)
5. **VÉRIFIER** les logs de console pour déboguer les calculs

---

## 📝 Exemple complet

```typescript
// ✅ BON
import { REGIONS } from '../data/config/constants';
import { getPanierRepas } from '../data/config/helpers';
import { useDevisConfig } from '../hooks/useDevisConfig';

function MonComposant() {
  const { getPaysActifs, getSalaire } = useDevisConfig();
  
  const pays = getPaysActifs();
  const salaire = getSalaire('ÎLE-DE-FRANCE', 'Bâtiment', 'N1P1');
  const panier = getPanierRepas('ÎLE-DE-FRANCE', 'Bâtiment');
  
  return <div>...</div>;
}

// ❌ MAUVAIS
import { REGIONS } from '../data/devis-data'; // OBSOLÈTE
import { getPanierRepasByPays } from '../data/devis-data-pays'; // OBSOLÈTE
```

---

**Version** : 2.0  
**Dernière mise à jour** : 27 janvier 2026  
**Mainteneur** : Équipe YOJOB Dev
