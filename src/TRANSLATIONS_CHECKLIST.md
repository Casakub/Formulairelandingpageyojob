# 📋 Checklist des traductions UI - YOJOB Survey

## ✅ État actuel (Décembre 2024)

### 🎯 Traductions à importer pour avoir un site 100% multilingue

---

## 📦 1. Hero Section (8 textes)

**Statut** : ✅ Code modifié, prêt à importer

| ID | Clé | FR | EN |
|---|---|---|---|
| 1 | `hero.badge` | Étude de marché européenne | European Market Study |
| 2 | `hero.title` | Participez à l'avenir du détachement européen | Participate in the future of European secondment |
| 3 | `hero.subtitle` | Votre avis façonne YoJob... | Your opinion shapes YoJob... |
| 4 | `hero.stat.countries` | 27 pays couverts | 27 countries covered |
| 5 | `hero.stat.agencies` | 500+ agences partenaires | 500+ partner agencies |
| 6 | `hero.stat.duration` | 8-10 min pour répondre | 8-10 min to complete |
| 7 | `hero.cta.start` | Commencer l'enquête | Start the survey |
| 8 | `hero.footer.info` | 25 questions • Anonyme • Conforme RGPD | 25 questions • Anonymous • GDPR compliant |

**🔧 Import** : Dashboard → Traductions → "Hero (8 textes)"

---

## 🗂️ 2. Titres des Sections (6 textes)

**Statut** : ✅ Code modifié, prêt à importer

| ID | Clé | FR | EN |
|---|---|---|---|
| 1 | `section.1.title` | Profil Agence | Agency Profile |
| 2 | `section.2.title` | Détachement | Secondment |
| 3 | `section.3.title` | Besoins | Needs |
| 4 | `section.4.title` | Intérêt YoJob | YoJob Interest |
| 5 | `section.5.title` | Vision Future | Future Vision |
| 6 | `section.6.title` | Contact | Contact |

**🔧 Import rapide** : Dashboard → Traductions → "⚡ 6 sections"

---

## 🔘 3. Boutons de Navigation (7 textes)

**Statut** : ✅ Code modifié, prêt à importer

| ID | Clé | FR | EN |
|---|---|---|---|
| 1 | `button.next` | Suivant | Next |
| 2 | `button.previous` | Précédent | Previous |
| 3 | `button.submit` | Envoyer mes réponses | Submit my answers |
| 4 | `button.submitting` | Envoi en cours... | Sending... |
| 5 | `helper.select_up_to_3` | Sélectionnez jusqu'à 3 secteurs | Select up to 3 sectors |
| 6 | `nav.dashboard` | Dashboard | Dashboard |
| 7 | `nav.back_to_site` | Retour au site | Back to site |

**🔧 Import rapide** : Dashboard → Traductions → "⚡ 7 navigation"

---

## 📊 Résumé

| Catégorie | Nombre de textes | Statut Code | Statut Import |
|-----------|------------------|-------------|---------------|
| Hero Section | 8 | ✅ Modifié | ⏳ À importer |
| Titres Sections | 6 | ✅ Modifié | ⏳ À importer |
| Navigation/Boutons | 7 | ✅ Modifié | ⏳ À importer |
| **TOTAL** | **21 textes** | ✅ **100%** | ⏳ **0%** |

---

## 🚀 Procédure d'import complète

### Option 1 : Import rapide (Recommandé)

1. **Dashboard Admin** → **Traductions** → **Textes d'interface**
2. Cliquez sur **"⚡ 6 sections"** → Attendez confirmation ✅
3. Cliquez sur **"⚡ 7 navigation"** → Attendez confirmation ✅
4. Téléchargez **"Hero (8 textes)"** → Importez avec "Sélectionner un JSON"

**Résultat** : 21 textes importés en ~2 minutes !

### Option 2 : Import manuel

1. Télécharger chaque template JSON
2. Les importer un par un via "Sélectionner un JSON"

---

## ✅ Vérification post-import

### Test en Anglais

1. Page d'accueil → Sélecteur de langue → **EN**
2. Vérifier que tous les textes sont traduits :
   - ✅ Badge "European Market Study"
   - ✅ Titre principal en anglais
   - ✅ Stats en anglais
   - ✅ Bouton "Start the survey"

3. Cliquer sur "Start the survey"
4. Vérifier la section 1 :
   - ✅ Onglets sections : "Agency Profile", "Secondment", "Needs", etc.
   - ✅ Instructions : "Select up to 3 sectors"
   - ✅ Bouton : "Next" (au lieu de "Suivant")

5. Vérifier le header :
   - ✅ "Dashboard" ou "Back to site"

---

## 📝 Langues supportées

Toutes les traductions sont disponibles pour :

- 🇫🇷 Français (FR)
- 🇬🇧 Anglais (EN)
- 🇩🇪 Allemand (DE)
- 🇪🇸 Espagnol (ES)
- 🇮🇹 Italien (IT)
- 🇳🇱 Néerlandais (NL)
- 🇵🇱 Polonais (PL)
- 🇵🇹 Portugais (PT)

---

## 🔍 Fichiers modifiés

### Composants React

1. `/App.tsx` - Ajout de `useI18n()` pour sections et boutons
2. `/components/survey/Header.tsx` - Navigation traduite
3. `/components/survey/DynamicQuestionRenderer.tsx` - Helper text traduit
4. `/components/dashboard/UITextsImport.tsx` - Nouveaux boutons d'import

### Traductions

- Toutes générées en mémoire, pas de fichiers JSON à maintenir

---

**Dernière mise à jour** : 2 décembre 2024
**Statut global** : ✅ Prêt pour l'import !
