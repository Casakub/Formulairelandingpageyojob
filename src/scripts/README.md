# 📁 Scripts - Traductions YOJOB

Ce dossier contient tous les scripts et templates pour gérer les traductions manquantes.

---

## 📊 Vue d'Ensemble

**Problème** : 17 textes UI ne sont traduits qu'en français  
**Solution** : Scripts automatisés pour ajouter + traduire  
**Temps total** : ~5 minutes  
**Résultat** : +391 traductions (17 textes × 23 langues)

---

## 🗂️ Fichiers Disponibles

### 🚀 Scripts Exécutables

#### 1. `seed-all-missing-translations.ts` ⚡ RECOMMANDÉ
**Usage** : Console browser (F12)  
**Fonction** : Ajoute les 17 textes FR dans la base de données  
**Temps** : 30 secondes

```javascript
// 1. Dashboard Admin → F12 → Console
// 2. Copy-paste ce fichier
// 3. Entrée
// ✅ Output : "🎉 Seeding completed! 17 textes ajoutés"
```

**Contenu** : 
- 5 textes Section 6 Contact
- 2 textes Confirmation Toast  
- 10 textes Confirmation Screen

---

#### 2. `check-missing-translations.ts` 🔍
**Usage** : Console browser (F12)  
**Fonction** : Vérifier quels textes sont déjà dans la DB  
**Temps** : 10 secondes

```javascript
// Ouvrir n'importe quelle page
// F12 → Console
// Copy-paste ce fichier
// ✅ Output : Rapport détaillé avec ✅/❌ par texte
```

---

#### 3. `add-missing-section6-translations.sql`
**Usage** : Supabase SQL Editor  
**Fonction** : Insertion SQL directe (Section 6 uniquement)  
**Temps** : 5 secondes

```sql
-- Supabase Dashboard → SQL Editor
-- Copy-paste ce fichier
-- Exécuter
-- ✅ Output : 5 rows inserted
```

**Note** : N'ajoute que la Section 6, pas les 17 textes complets

---

### 📄 Templates JSON

#### 4. `all-missing-translations-complete.json` 📦 COMPLET
**Contenu** : Les 17 textes avec structure complète  
**Format** : Prêt pour import direct  
**Langues** : FR pré-rempli, 22 autres vides

**Structure** :
```json
{
  "version": "2.0",
  "data": {
    "ui": [
      {
        "text_id": "section6.consent.contact.title",
        "category": "ui",
        "translations": {
          "fr": "J'autorise YoJob à me recontacter",
          "en": "",
          "de": "",
          ...
        }
      },
      ...
    ]
  },
  "stats": {
    "totalTexts": 17,
    "totalLanguages": 23,
    "missingTranslations": 374
  }
}
```

**Usage** :
```bash
# Option 1 : Import direct
Dashboard → Export → Import JSON → Upload ce fichier

# Option 2 : Template pour traduction
Envoyer à Claude → Traduire → Ré-importer
```

---

#### 5. `section6-missing-translations-template.json`
**Contenu** : Seulement Section 6 (7 textes)  
**Format** : Template partiel  

**Usage** : Si vous voulez traiter Section 6 séparément

---

### 📖 Documentation

#### 6. `README-ADD-MISSING-TRANSLATIONS.md`
**Contenu** : Guide détaillé avec 3 méthodes  
**Public** : Débutants et avancés

**Sections** :
- ✅ Solution 1 : Via Dashboard (recommandé)
- ✅ Solution 2 : Via Console (rapide)
- ✅ Solution 3 : Via SQL (avancé)
- 🧪 Procédure de vérification
- 💡 Astuces et troubleshooting

---

## 🎯 Workflows Recommandés

### Workflow A : Ultra Rapide (5 min)
```
1. seed-all-missing-translations.ts        → 30 sec
2. Dashboard → Export Template             → 10 sec
3. Claude 3.5 Sonnet                       →  3 min
4. Dashboard → Import JSON                 → 30 sec
5. Vérifier sur 3 langues                  →  1 min
───────────────────────────────────────────────────
TOTAL                                      →  5 min
✅ Résultat : 391 traductions ajoutées
```

### Workflow B : Vérification d'abord (6 min)
```
1. check-missing-translations.ts           → 10 sec
2. seed-all-missing-translations.ts        → 30 sec
3. check-missing-translations.ts (re-run)  → 10 sec
4. Dashboard → Export Template             → 10 sec
5. Claude 3.5 Sonnet                       →  3 min
6. Dashboard → Import JSON                 → 30 sec
7. Vérifier sur 5 langues                  →  2 min
───────────────────────────────────────────────────
TOTAL                                      →  6 min
✅ Résultat : 391 traductions + vérification
```

### Workflow C : SQL Direct (4 min)
```
1. add-missing-section6-translations.sql   →  5 sec
2. Manual add des 12 autres textes         →  2 min
3. Claude 3.5 Sonnet                       →  3 min
4. Import JSON                             → 30 sec
───────────────────────────────────────────────────
TOTAL                                      →  6 min
⚠️  Plus d'effort manuel
```

**RECOMMANDATION : Workflow A** ⚡

---

## 📝 Textes Ajoutés

### Section 6 Contact (5)
```
✅ section6.consent.contact.title
✅ section6.consent.contact.description
✅ section6.consent.report.title
✅ section6.consent.report.description
✅ section6.rgpd
```

### Confirmation Toast (2)
```
✅ confirmation.toast.title
✅ confirmation.toast.description
```

### Confirmation Screen (10)
```
✅ confirmation.title
✅ confirmation.description
✅ confirmation.reward.report.title
✅ confirmation.reward.report.description
✅ confirmation.reward.earlyaccess.title
✅ confirmation.reward.earlyaccess.description
✅ confirmation.cta
✅ confirmation.thanks.title
✅ confirmation.thanks.item1
✅ confirmation.thanks.item2
```

**TOTAL : 17 textes**

---

## 🌍 Langues Cibles

```
FR  🇫🇷 Français     (déjà rempli)
EN  🇬🇧 Anglais
DE  🇩🇪 Allemand
ES  🇪🇸 Espagnol
IT  🇮🇹 Italien
NL  🇳🇱 Néerlandais
PL  🇵🇱 Polonais
PT  🇵🇹 Portugais
EL  🇬🇷 Grec
SV  🇸🇪 Suédois
DA  🇩🇰 Danois
FI  🇫🇮 Finnois
CS  🇨🇿 Tchèque      ⚠️ PRIORITÉ
HU  🇭🇺 Hongrois
RO  🇷🇴 Roumain
BG  🇧🇬 Bulgare
SK  🇸🇰 Slovaque
SL  🇸🇮 Slovène
HR  🇭🇷 Croate
LT  🇱🇹 Lituanien
LV  🇱🇻 Letton
ET  🇪🇪 Estonien
NO  🇳🇴 Norvégien
```

**TOTAL : 23 langues**

---

## 🤖 Prompt pour Claude

```
Traduisez ces 17 textes UI en 22 langues européennes (toutes sauf FR).

CONTEXTE :
Application B2B de recrutement européen.
Formulaire de consentement RGPD + page de remerciement.

LANGUES CIBLES :
EN, DE, ES, IT, NL, PL, PT, EL, SV, DA, FI, CS, HU, RO, BG, SK, SL, HR, LT, LV, ET, NO

RÈGLES :
1. Gardez la structure JSON EXACTE
2. Ton professionnel B2B mais chaleureux
3. Respectez les normes RGPD européennes
4. Gardez les emojis 🙏 et 🎁
5. Pour "Early Access", adaptez selon la langue

TEXTES À TRADUIRE :
- Section 6 : Consentements RGPD (5 textes)
- Toast : Confirmation soumission (2 textes)
- Page finale : Remerciement + récompenses (10 textes)

Retournez le JSON complet avec TOUTES les traductions remplies.

[COLLEZ LE JSON EXPORTÉ ICI]
```

---

## 🧪 Tests

### Test Rapide
```bash
# Tchèque (langue avec screenshot du bug)
/?country=cz

Vérifier :
✅ Section 6 Contact → Textes tchèques
✅ Toast après soumission → Texte tchèque
✅ Écran final → Textes tchèques
```

### Test Complet
```bash
# 5 langues prioritaires
/?country=cz  # Tchèque
/?country=de  # Allemand
/?country=es  # Espagnol
/?country=pl  # Polonais
/?country=it  # Italien

Pour chaque :
1. Section 6
2. Soumettre formulaire
3. Vérifier toast
4. Vérifier écran final
```

---

## 📊 Statistiques

```
╔═══════════════════════════════════════════╗
║  Scripts créés           │  6            ║
║  Templates JSON          │  2            ║
║  Documentation           │  1            ║
║  Textes ajoutés          │  17           ║
║  Langues cibles          │  23           ║
║  Traductions manquantes  │  391          ║
║  Temps total fix         │  ~5 min       ║
╚═══════════════════════════════════════════╝
```

---

## 💡 Tips

### ✅ Do's
- Toujours vérifier avec `check-missing-translations.ts` d'abord
- Tester sur minimum 3 langues
- Garder un backup JSON avant import massif
- Utiliser Claude 3.5 Sonnet (meilleur pour traductions)

### ❌ Don'ts
- Ne pas modifier les `text_id` dans le JSON
- Ne pas changer la catégorie (doit être `"ui"`)
- Ne pas oublier les emojis
- Ne pas importer un JSON invalide (vérifier sur JSONLint.com)

---

## 🔗 Liens Utiles

- **Doc Complète** : `/COMPLETE_TRANSLATION_FIX.md`
- **Quick Start** : `/QUICK_START.md`
- **Status** : `/TRANSLATION_STATUS.md`
- **Code modifié** : 
  - `/components/survey/sections/Section6Contact.tsx`
  - `/App.tsx`
  - `/components/survey/ConfirmationScreen.tsx`

---

## 📞 Support

### Problème : Script ne fonctionne pas
```bash
→ Vérifiez que vous êtes connecté en admin
→ F12 → Console → Vérifiez les erreurs
→ Essayez en navigation privée
```

### Problème : Import JSON échoue
```bash
→ Validez le JSON sur JSONLint.com
→ Vérifiez que tous les text_id existent
→ Essayez d'importer seulement 2-3 textes pour tester
```

### Problème : Traductions ne s'affichent pas
```bash
→ Hard refresh : Ctrl+Shift+R
→ Videz le cache navigateur
→ Vérifiez que le text_id correspond au code
```

---

**Créé le** : 3 Décembre 2024  
**Version** : 2.0  
**Auteur** : YOJOB Dev Team  
**License** : Internal Use Only

---

🚀 **Prêt à fixer les traductions !**
