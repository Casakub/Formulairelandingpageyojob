# 🔍 PROMPT DE VÉRIFICATION DES DONNÉES - SYSTÈME DE DEVIS YOJOB

## 📋 CONTEXTE DU PROJET

Tu es une IA spécialisée dans l'analyse de systèmes de tarification. Tu dois analyser une application de gestion de devis pour une entreprise française de courtage en recrutement européen (YOJOB).

L'application permet de générer des devis pour la mise à disposition de travailleurs européens détachés en France, avec un système de calcul complexe basé sur :
- **Coefficients de base** par secteur et classification professionnelle
- **Facteurs multiplicateurs** par pays de nationalité du travailleur
- **Grilles salariales** officielles françaises par région et secteur
- **Suppléments** (hébergement, transport, panier repas)

## 🎯 MISSION

**OBJECTIF PRINCIPAL** : Vérifier l'intégrité et la cohérence des données de configuration après modification manuelle du fichier `/data/config/facteurs-pays.json`.

**FICHIER MODIFIÉ MANUELLEMENT** :
- `/data/config/facteurs-pays.json` (facteurs pays mis à jour le 2026-01-27)

**MODIFICATIONS APPORTÉES** :
- Portugal (PT) : facteur passé de `1.05` → `1.07`
- Bulgarie (BG) : facteur passé de `0.98` → `1.00`

## 📂 ARCHITECTURE DES FICHIERS DE CONFIGURATION

### 1️⃣ Fichiers JSON de configuration (Données source)

**Localisation** : `/data/config/`

#### A. `pays.json` - Liste des pays disponibles
```json
{
  "pays": [
    {
      "code": "RO",      // Code ISO 3166-1 alpha-2
      "label": "Roumanie",
      "flag": "🇷🇴",
      "actif": true,     // Pays actif dans l'application
      "ordre": 1         // Ordre d'affichage
    },
    // ... autres pays
  ],
  "metadata": { ... }
}
```

**PAYS ACTUELS (10 pays)** :
- RO (Roumanie), PL (Pologne), PT (Portugal), ES (Espagne), BG (Bulgarie)
- HU (Hongrie), SK (Slovaquie), CZ (Tchéquie), HR (Croatie), SI (Slovénie)

#### B. `facteurs-pays.json` - Facteurs multiplicateurs par pays ⭐ (MODIFIÉ)
```json
{
  "facteurs": {
    "RO": {
      "code": "RO",
      "label": "Roumanie",
      "facteur": 1.00,    // Multiplicateur appliqué au coefficient de base
      "description": "Coefficient de référence"
    },
    // ... autres pays
  },
  "metadata": { ... }
}
```

**FORMULE DE CALCUL** :
```
Coefficient ETT final = Coefficient base × Facteur pays
```

**Exemple** :
- Secteur : Bâtiment
- Classification : Maître Ouvrier (N3P2)
- Coefficient base : 1.98
- Pays : Portugal (PT)
- Facteur pays : 1.07
- **Coefficient final = 1.98 × 1.07 = 2.12**

#### C. `coefficients-base.json` - Coefficients de base par secteur/classification
```json
{
  "coefficients": {
    "Bâtiment": {
      "Ouvrier Exécution": 1.92,
      "Ouvrier Professionnel": 1.94,
      "Compagnon Professionnel": 1.96,
      "Maître Ouvrier": 1.98,
      "Chef Equipe": 2.05
    },
    // ... 9 autres secteurs
  },
  "mapping_anciennes_classifications": {
    "Bâtiment": {
      "N1P1": "Ouvrier Exécution",
      "N1P2": "Ouvrier Professionnel",
      "N3P2": "Maître Ouvrier",
      // ... mappings pour rétrocompatibilité
    }
  }
}
```

**SECTEURS COUVERTS (10 secteurs)** :
1. Bâtiment (5 classifications)
2. Métallurgie (10 classifications)
3. TP - Travaux Publics (6 classifications)
4. Hôtellerie (4 classifications)
5. Restauration (4 classifications)
6. Plasturgie (3 classifications)
7. Automobile Carrosserie (12 classifications)
8. Sylviculture (2 classifications)
9. Cartonnerie (12 classifications)
10. Autre (1 classification)

#### D. `salaires.json` - Grilles salariales officielles
```json
{
  "salaires": {
    "ÎLE-DE-FRANCE": {
      "Bâtiment": {
        "N1P1": 1823,  // Salaire brut mensuel en euros
        "N1P2": 1835,
        // ...
      },
      // ... autres secteurs
    },
    // ... 13 régions françaises
  }
}
```

**RÉGIONS FRANÇAISES COUVERTES (13)** :
- ÎLE-DE-FRANCE, PROVENCE-ALPES-CÔTE D'AZUR, AUVERGNE-RHÔNE-ALPES
- BOURGOGNE-FRANCHE-COMTÉ, BRETAGNE, CENTRE-VAL DE LOIRE, CORSE
- GRAND EST, HAUTS-DE-FRANCE, NORMANDIE, NOUVELLE-AQUITAINE
- OCCITANIE, PAYS DE LA LOIRE

#### E. `supplements.json` - Suppléments horaires et paniers repas
```json
{
  "supplements_horaires": {
    "hebergement": {
      "montant": 3.50,   // €/heure
      "unite": "EUR/h",
      "description": "Supplément si hébergement non fourni par EU"
    },
    "transport": {
      "montant": 1.50,   // €/heure
      "unite": "EUR/h",
      "description": "Supplément si transport à charge ETT"
    }
  },
  "paniers_repas": {
    "France": {
      "ÎLE-DE-FRANCE": 12.50,  // €/jour
      "PROVENCE-ALPES-CÔTE D'AZUR": 11.50,
      // ... autres régions
    }
  }
}
```

### 2️⃣ Fichier TypeScript legacy (Anciennes données)

**Fichier** : `/data/devis-data-pays.ts`

⚠️ **IMPORTANT** : Ce fichier contient d'anciennes données et pourrait être partiellement obsolète. Il est conservé pour compatibilité mais les fichiers JSON dans `/data/config/` sont la source de vérité.

**Contenu** :
- Salaires France par région (DONNÉES OFFICIELLES JANVIER 2026)
- Salaires autres pays européens (moyennes nationales)
- Fonctions d'export : `getSalairesByPays()`, `getPanierRepasByPays()`

### 3️⃣ Fichier de chargement centralisé

**Fichier** : `/data/config/index.ts`

Centralise l'import de tous les fichiers JSON de configuration :
```typescript
import paysData from './pays.json';
import coefficientsData from './coefficients-base.json';
import facteursData from './facteurs-pays.json';
import salairesData from './salaires.json';
import supplementsData from './supplements.json';

export const configData = {
  pays: paysData,
  coefficients: coefficientsData,
  facteurs: facteursData,
  salaires: salairesData,
  supplements: supplementsData
};
```

### 4️⃣ Hook React de chargement

**Fichier** : `/hooks/useDevisConfig.ts`

Hook personnalisé qui charge la configuration et expose les fonctions utiles :
```typescript
export function useDevisConfig() {
  const [pays, setPays] = useState<Pays[]>([]);
  const [coefficientsBase, setCoefficientsBase] = useState<...>({});
  const [facteursPays, setFacteursPays] = useState<...>({});
  const [salaires, setSalaires] = useState<...>({});
  
  // Fonctions exposées :
  // - getPaysInfo(code: string): Pays | null
  // - getCoefficient(secteur, classification, paysCode): number
  // - getCoefficientDetail(...): { coeffBase, facteurPays, coeffFinal, labelPays }
  // - getSalaire(region, secteur, classification): number
}
```

## 🔎 VÉRIFICATIONS À EFFECTUER

### ✅ VÉRIFICATION 1 : Cohérence des codes pays

**Objectif** : S'assurer que tous les pays ont des données cohérentes dans tous les fichiers

**Fichiers à croiser** :
- `/data/config/pays.json` (liste des pays actifs)
- `/data/config/facteurs-pays.json` (facteurs multiplicateurs)

**Points à vérifier** :
1. Chaque pays dans `pays.json` a-t-il une entrée correspondante dans `facteurs-pays.json` ?
2. Chaque pays dans `facteurs-pays.json` existe-t-il dans `pays.json` ?
3. Les codes pays (ISO alpha-2) sont-ils identiques entre les deux fichiers ?
4. Les labels (noms des pays) sont-ils identiques ?

**Attendu** : Correspondance parfaite 1:1 entre les deux fichiers pour les 10 pays.

---

### ✅ VÉRIFICATION 2 : Cohérence des facteurs pays

**Objectif** : Valider que les facteurs pays sont dans une plage cohérente

**Fichier** : `/data/config/facteurs-pays.json`

**Points à vérifier** :
1. Tous les facteurs sont-ils > 0 ?
2. Les facteurs sont-ils dans une plage raisonnable (ex: 0.80 à 1.20) ?
3. Le pays de référence (RO ou SK avec facteur 1.00) est-il bien défini ?
4. Y a-t-il des valeurs aberrantes ou incohérentes ?

**Valeurs actuelles** :
```
RO: 1.00 (référence)
PL: 1.02
PT: 1.07 ← MODIFIÉ (était 1.05)
ES: 1.06
BG: 1.00 ← MODIFIÉ (était 0.98)
HU: 1.01
SK: 1.00 (référence)
CZ: 1.03
HR: 1.01
SI: 1.04
```

**Question** : La modification BG (0.98 → 1.00) est-elle cohérente avec la description `"Légère réduction liée aux coûts de détachement"` ?

---

### ✅ VÉRIFICATION 3 : Couverture des coefficients de base

**Objectif** : S'assurer que tous les secteurs et classifications ont un coefficient de base défini

**Fichier** : `/data/config/coefficients-base.json`

**Points à vérifier** :
1. Tous les secteurs listés dans `/data/devis-data.ts` (SECTEURS) ont-ils des coefficients ?
2. Toutes les classifications de chaque secteur ont-elles un coefficient ?
3. Le mapping `mapping_anciennes_classifications` couvre-t-il toutes les anciennes dénominations ?
4. Y a-t-il des coefficients < 1.80 ou > 2.20 (valeurs inhabituelles) ?

**Secteurs attendus** : Bâtiment, Métallurgie, TP, Hôtellerie, Restauration, Plasturgie, Automobile Carrosserie, Sylviculture, Cartonnerie, Autre

---

### ✅ VÉRIFICATION 4 : Couverture des grilles salariales

**Objectif** : Vérifier que toutes les régions/secteurs/classifications ont un salaire défini

**Fichier** : `/data/config/salaires.json`

**Points à vérifier** :
1. Les 13 régions françaises sont-elles toutes présentes ?
2. Chaque région contient-elle tous les secteurs ?
3. Chaque secteur contient-il toutes ses classifications ?
4. Y a-t-il des valeurs < SMIC mensuel (≈1800€ en 2026) ?
5. Y a-t-il des trous dans les données (undefined/null) ?

**Régions attendues** : ÎLE-DE-FRANCE, PROVENCE-ALPES-CÔTE D'AZUR, AUVERGNE-RHÔNE-ALPES, etc. (13 au total)

---

### ✅ VÉRIFICATION 5 : Cohérence des paniers repas

**Objectif** : Vérifier que toutes les régions ont un montant de panier repas

**Fichier** : `/data/config/supplements.json`

**Points à vérifier** :
1. Les 13 régions françaises ont-elles toutes un montant de panier repas ?
2. Les montants sont-ils cohérents (ex: ÎDF > autres régions) ?
3. Y a-t-il des montants < 8€ ou > 15€ (valeurs inhabituelles) ?

---

### ✅ VÉRIFICATION 6 : Intégrité des métadonnées

**Objectif** : Vérifier que les métadonnées sont à jour

**Tous les fichiers JSON** : Vérifier la section `metadata`

**Points à vérifier** :
1. La `derniere_modification` est-elle cohérente ?
2. Le champ `modifie_par` est-il renseigné ?
3. La `description` est-elle claire et à jour ?

**Note** : `/data/config/facteurs-pays.json` a été modifié le 2026-01-27

---

### ✅ VÉRIFICATION 7 : Données legacy vs nouvelles données

**Objectif** : Identifier les incohérences entre les anciennes et nouvelles sources de données

**Fichiers à comparer** :
- `/data/devis-data-pays.ts` (anciennes données hardcodées)
- `/data/config/salaires.json` (nouvelles données JSON)

**Points à vérifier** :
1. Y a-t-il des différences de salaires pour les mêmes secteurs/classifications/régions ?
2. Les paniers repas sont-ils identiques entre les deux sources ?
3. Quel fichier est utilisé en production ? (vérifier dans `/hooks/useDevisConfig.ts`)

---

### ✅ VÉRIFICATION 8 : Validation des calculs

**Objectif** : Tester que les calculs de coefficients fonctionnent correctement

**Fichier** : `/hooks/useDevisConfig.ts` (fonction `getCoefficient`)

**Cas de test à vérifier** :
```
Cas 1 : Bâtiment, N3P2 (Maître Ouvrier), Portugal (PT)
  - Coeff base attendu : 1.98
  - Facteur pays attendu : 1.07
  - Coeff final attendu : 1.98 × 1.07 = 2.1186 (≈ 2.12)

Cas 2 : Métallurgie, Niveau III, Bulgarie (BG)
  - Coeff base attendu : 1.96
  - Facteur pays attendu : 1.00
  - Coeff final attendu : 1.96 × 1.00 = 1.96

Cas 3 : TP, N2 (Manoeuvre spécialisé), Roumanie (RO)
  - Coeff base attendu : 1.94
  - Facteur pays attendu : 1.00
  - Coeff final attendu : 1.94 × 1.00 = 1.94
```

---

## 📊 FORMAT DE SORTIE ATTENDU

Merci de structurer ta réponse comme suit :

### 1. RÉSUMÉ EXÉCUTIF
- ✅ Nombre de vérifications réussies
- ❌ Nombre d'anomalies détectées
- ⚠️ Nombre d'avertissements

### 2. DÉTAILS DES ANOMALIES
Pour chaque anomalie détectée :
```
❌ ANOMALIE #X : [Titre court]
Fichier concerné : /chemin/vers/fichier.json
Ligne(s) : XX-YY
Description : [Explication claire du problème]
Impact : [Critique / Modéré / Faible]
Recommandation : [Action corrective proposée]
```

### 3. AVERTISSEMENTS
Pour chaque avertissement :
```
⚠️ AVERTISSEMENT #X : [Titre court]
Fichier concerné : /chemin/vers/fichier.json
Description : [Point d'attention]
Recommandation : [Action suggérée]
```

### 4. DONNÉES MANQUANTES
Lister les données manquantes identifiées :
```
📋 DONNÉES MANQUANTES :
- Pays : [Liste des codes pays sans facteur]
- Secteurs : [Liste des secteurs sans coefficients]
- Régions : [Liste des régions sans salaires]
- Classifications : [Liste des classifications manquantes]
```

### 5. STATISTIQUES
```
📊 STATISTIQUES DE COUVERTURE :
- Pays couverts : 10/10 (100%)
- Secteurs couverts : X/10 (XX%)
- Régions couvertes : X/13 (XX%)
- Classifications couvertes : XX/YY (XX%)
```

### 6. RECOMMANDATIONS FINALES
Liste des actions prioritaires à effectuer pour corriger les problèmes détectés.

---

## 🛠️ OUTILS À UTILISER

Pour effectuer cette analyse, utilise les outils suivants :

1. **file_search** : Rechercher des patterns dans les fichiers
2. **read** : Lire le contenu complet des fichiers JSON
3. **think** : Raisonner sur les incohérences détectées

**Fichiers principaux à analyser** :
- `/data/config/pays.json`
- `/data/config/facteurs-pays.json` ⭐ (modifié)
- `/data/config/coefficients-base.json`
- `/data/config/salaires.json`
- `/data/config/supplements.json`
- `/data/devis-data-pays.ts` (legacy)
- `/hooks/useDevisConfig.ts` (logique de chargement)

---

## 🎯 PRIORITÉS

**PRIORITÉ HAUTE** :
- Vérification 1 : Cohérence des codes pays
- Vérification 2 : Cohérence des facteurs pays
- Vérification 4 : Couverture des grilles salariales

**PRIORITÉ MOYENNE** :
- Vérification 3 : Couverture des coefficients de base
- Vérification 5 : Cohérence des paniers repas

**PRIORITÉ BASSE** :
- Vérification 6 : Intégrité des métadonnées
- Vérification 7 : Données legacy vs nouvelles

---

## 💡 CONTEXTE SUPPLÉMENTAIRE

**Modifications récentes** :
- Le fichier `/data/config/facteurs-pays.json` a été modifié manuellement le 2026-01-27
- Portugal (PT) : facteur 1.05 → 1.07 (+2%)
- Bulgarie (BG) : facteur 0.98 → 1.00 (+2%)

**Questions importantes** :
1. Ces modifications sont-elles cohérentes avec les descriptions dans `facteurs-pays.json` ?
2. Y a-t-il d'autres pays qui devraient avoir des facteurs similaires ?
3. Les grilles salariales françaises sont-elles à jour (JANVIER 2026) ?
4. Tous les secteurs d'activité sont-ils couverts de manière exhaustive ?

---

## 🚀 COMMENCER L'ANALYSE

Tu peux maintenant commencer ton analyse. Prends le temps de :
1. Lire tous les fichiers JSON de configuration
2. Croiser les données entre les fichiers
3. Identifier les incohérences et données manquantes
4. Générer un rapport détaillé selon le format demandé

**Bonne analyse !** 🔍
