# 📊 Système d'Export/Import - Documentation

## 🎯 Vue d'ensemble

Le système d'export/import permet de gérer deux types de contenus :
1. **Questions du formulaire** (25 questions de l'étude de marché)
2. **Contenu CMS** (Landing page : Hero + Progress + UI)

---

## 🗂️ Structure des fichiers

### Frontend
```
/components/dashboard/
├── ExportImportManager.tsx      # Composant principal (onglet Export)
├── CMSExportSection.tsx          # Export/Import CMS
└── ExportGuideCard.tsx           # Guide des workflows
```

### Backend
```
/supabase/functions/server/
├── index.tsx                     # Serveur principal
└── i18n.tsx                      # Routes API i18n (utilisées par CMS Export)
```

**Note** : Le système d'export/import CMS réutilise les API i18n existantes

---

## 📋 Questions du formulaire

### Formats d'export
- **JSON** : Backup complet avec toutes les configurations
- **CSV** : Format tableur pour analyse
- **Markdown** : Documentation lisible
- **Copie** : JSON dans le presse-papier

### Import
- Fichier JSON uniquement
- ⚠️ **Remplace toutes les questions existantes**
- Validation automatique du format
- Toast de confirmation

---

## 🎨 Contenu CMS (Landing Page)

### Formats d'export

#### 1. JSON Complet
```json
{
  "version": "1.0",
  "exportDate": "2024-12-03T...",
  "source": "YOJOB CMS Landing Page",
  "data": {
    "hero": [...],
    "progress": [...],
    "ui": [...]
  },
  "stats": {
    "heroCount": 8,
    "progressCount": 10,
    "uiCount": 9,
    "totalTexts": 27,
    "totalLanguages": 23,
    "languages": ["fr", "en", "de", ...]
  }
}
```

**Utilisation** : Idéal pour traduction IA (Claude, ChatGPT, DeepL API)

#### 2. Excel/CSV
- 3 fichiers CSV générés : `hero.csv`, `progress.csv`, `ui.csv`
- Format : `Text ID | Category | fr | en | de | es | ...`
- UTF-8 avec BOM (Excel compatible)

**Utilisation** : Traducteurs humains avec Excel/Google Sheets

#### 3. Template intelligent avec traductions existantes
- JSON avec **toutes les traductions existantes** pré-remplies
- Langues manquantes marquées comme vides (`""`)
- **Statistiques détaillées** incluses :
  - Nombre de traductions existantes vs manquantes
  - Taux de complétion par langue
  - Taux de complétion global
- Structure identique au JSON complet

**Utilisation** : Envoi à des traducteurs externes (ils voient ce qui est déjà fait)

**Exemple de structure** :
```json
{
  "version": "1.0",
  "exportDate": "2024-12-03T...",
  "source": "YOJOB CMS Translation Template",
  "data": {
    "hero": [...],
    "progress": [...],
    "ui": [...]
  },
  "stats": { ... },
  "translationStatus": {
    "totalSlots": 621,
    "existingTranslations": 324,
    "missingTranslations": 297,
    "completionRate": 52,
    "languageStats": [
      { "language": "FR", "existing": 27, "missing": 0, "completionRate": 100 },
      { "language": "EN", "existing": 27, "missing": 0, "completionRate": 100 },
      { "language": "DE", "existing": 20, "missing": 7, "completionRate": 74 },
      { "language": "ES", "existing": 15, "missing": 12, "completionRate": 56 },
      ...
    ]
  }
}
```

#### 4. Copie JSON
- JSON complet copié dans le presse-papier
- Partage rapide

---

## 🔄 Workflows de traduction

### Workflow 1 : Traduction via IA 🤖

1. Exportez en **JSON Complet**
2. Envoyez le fichier à :
   - Claude 3.5 Sonnet (Anthropic)
   - ChatGPT-4 (OpenAI)
   - DeepL API
3. Récupérez le JSON traduit
4. Importez avec aperçu automatique

**Avantages** :
- Très rapide (quelques secondes)
- Qualité élevée
- Gère les 23 langues

**Prompt recommandé pour Claude** :
```
Traduisez ce fichier JSON contenant les textes de ma landing page 
dans les 23 langues européennes. Conservez la structure exacte du JSON. 
Adaptez les traductions au contexte du recrutement professionnel.
```

### Workflow 2 : Traduction humaine 👨‍💻

1. Exportez en **Excel/CSV**
2. Partagez les 3 fichiers avec vos traducteurs :
   - `yojob-cms-hero-2024-12-03.csv`
   - `yojob-cms-progress-2024-12-03.csv`
   - `yojob-cms-ui-2024-12-03.csv`
3. Récupérez les fichiers complétés
4. Convertissez CSV → JSON (ou utilisez l'import direct)

**Avantages** :
- Qualité maximale (traduction native)
- Adaptation culturelle
- Révision professionnelle

### Workflow 3 : Template intelligent 📝

1. Cliquez sur **"Template avec Existantes"**
2. **Toutes les traductions déjà faites** sont pré-remplies
3. Les langues manquantes sont marquées vides (`""`)
4. Consultez les **statistiques de complétion** par langue
5. Envoyez à votre agence de traduction
6. Récupérez le JSON complété (seulement les langues manquantes)
7. Importez

**Avantages** :
- ✅ Les traducteurs voient ce qui est **déjà fait**
- ✅ Évite les **doublons** et traductions inutiles
- ✅ **Statistiques claires** : combien reste à faire par langue
- ✅ Pas de risque d'écraser du travail existant
- ✅ Français ET traductions existantes servent de référence

---

## 🛡️ Protection des données

### Import CMS : Mode intelligent

#### Aperçu avant import
Avant tout import, une modal s'affiche avec :
- Nombre de textes par catégorie (Hero, Progress, UI)
- Langues détectées
- Aperçu des 3 premiers textes
- Boutons "Annuler" / "Confirmer"

#### Fusion intelligente
L'import **NE remplace PAS tout** ! Il fusionne intelligemment :

**Exemple** :
- Vous avez déjà : `{ fr: "Bonjour", en: "Hello", de: "Hallo" }`
- Vous importez : `{ en: "Hi", es: "Hola" }`
- Résultat : `{ fr: "Bonjour", en: "Hi", de: "Hallo", es: "Hola" }`

✅ Le français et l'allemand sont conservés  
✅ L'anglais est mis à jour  
✅ L'espagnol est ajouté

### Import Questions : Remplacement total

⚠️ **Attention** : L'import de questions **remplace toutes les questions existantes**

**Protection** :
- Message d'avertissement jaune avant import
- Recommandation d'exporter d'abord
- Toast de confirmation après import
- Rechargement de la page

---

## 📡 API Backend

### Endpoints utilisés

Le système d'export/import CMS utilise les **API i18n existantes** (pas de nouvelles routes) :

#### GET `/make-server-10092a63/i18n/translations?category={category}`
Récupère les traductions d'une catégorie

**Paramètres** : `category` = `hero` | `progress` | `ui`

**Response** :
```json
{
  "success": true,
  "translations": [
    {
      "text_id": "hero.badge",
      "language_code": "fr",
      "text_content": "Leader du recrutement européen",
      "category": "hero",
      "validation_status": "validated"
    }
  ]
}
```

#### POST `/make-server-10092a63/i18n/translations/update`
Met à jour une traduction individuelle

**Body** :
```json
{
  "textId": "hero.badge",
  "languageCode": "fr",
  "textContent": "Nouveau texte"
}
```

**Response** :
```json
{
  "success": true
}
```

**Note** : L'import bulk utilise cette route en boucle pour chaque traduction

---

## 🎨 Design System

### Couleurs par section

| Section | Couleur | Gradient |
|---------|---------|----------|
| Questions | Cyan/Blue | `from-cyan-500 to-blue-500` |
| CMS | Pink/Rose | `from-pink-500 to-rose-500` |
| Export général | Green/Emerald | `from-green-500 to-emerald-500` |

### Composants utilisés
- `Card` (shadcn)
- `Button` (shadcn)
- `Badge` (shadcn)
- `Alert` (shadcn)
- `motion` (Motion/React)
- `toast` (Sonner)

---

## 🚀 Utilisation

### Accès
1. Connexion admin : `a.auger@yojob.fr` / `Adeole@33700`
2. Onglet **"Export"** dans le dashboard

### Export CMS
```typescript
// Dans le composant
<CMSExportSection />

// Actions disponibles :
- handleExportJSON()      // JSON complet
- handleExportExcel()     // 3 fichiers CSV
- handleExportTemplate()  // Template FR + vides
- handleCopyJSON()        // Copie presse-papier
```

### Import CMS
```typescript
// Upload fichier JSON
<input type="file" accept=".json" onChange={handleImport} />

// Aperçu → Confirmation → Import
setImportPreview(data) → confirmImport()
```

---

## 🔧 Configuration

### Variables d'environnement
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
SUPABASE_ANON_KEY=xxx
```

### Table Supabase
```sql
-- Table : translations_v2
CREATE TABLE translations_v2 (
  text_id TEXT PRIMARY KEY,
  category TEXT NOT NULL,  -- 'hero' | 'progress' | 'ui'
  translations JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📊 Statistiques

### Contenus gérés

| Type | Nombre | Langues |
|------|--------|---------|
| Questions formulaire | 25 | 23 |
| Hero Section | 8 | 23 |
| Progress Section | 10 | 23 |
| UI Section | 9 | 23 |
| **Total textes** | **52** | **23** |
| **Total traductions** | **1,196** | - |

### Langues supportées (23)
🇫🇷 FR · 🇬🇧 EN · 🇩🇪 DE · 🇪🇸 ES · 🇮🇹 IT · 🇳🇱 NL · 🇵🇱 PL · 🇵🇹 PT · 🇬🇷 EL · 🇸🇪 SV · 🇩🇰 DA · 🇫🇮 FI · 🇨🇿 CS · 🇭🇺 HU · 🇷🇴 RO · 🇧🇬 BG · 🇸🇰 SK · 🇸🇮 SL · 🇭🇷 HR · 🇱🇹 LT · 🇱🇻 LV · 🇪🇪 ET

---

## ✅ Checklist avant traduction externe

- [ ] Export JSON complet (backup)
- [ ] Vérifier que le français est complet
- [ ] Choisir le format adapté (JSON pour IA, Excel pour humains)
- [ ] Télécharger le fichier
- [ ] Envoyer au prestataire
- [ ] Valider un échantillon avant import complet
- [ ] Importer avec aperçu
- [ ] Vérifier les traductions dans l'interface

---

## 🆘 Dépannage

### Erreur : "Aucune donnée CMS"
**Solution** : Ajoutez des traductions dans l'onglet CMS d'abord

### Erreur : "Format de fichier invalide"
**Solution** : Vérifiez que le JSON a la structure correcte avec `version`, `data`, `stats`

### Erreur : "Failed to fetch translations"
**Solution** : Vérifiez que le serveur backend est démarré et que Supabase est configuré

### Import ne fonctionne pas
**Solution** : 
1. Vérifiez les logs du navigateur (F12)
2. Vérifiez les logs du serveur
3. Vérifiez que la table `translations_v2` existe
4. Vérifiez les permissions Supabase

---

## 🎯 Prochaines évolutions possibles

- [ ] Export/Import pour les intégrations
- [ ] Export/Import pour les résultats
- [ ] Support du format XLIFF (standard traduction)
- [ ] API de traduction automatique intégrée
- [ ] Comparaison de versions avant import
- [ ] Historique des imports/exports
- [ ] Notifications email après import réussi

---

**Version** : 1.0  
**Date** : 3 Décembre 2024  
**Auteur** : Équipe YOJOB Dev  
**Status** : ✅ Production Ready
