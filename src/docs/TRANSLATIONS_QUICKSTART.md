# 🚀 Démarrage Rapide - Système de Traductions

## ✅ C'est fait !

Votre système de traductions est maintenant **connecté à Supabase** et prêt à l'emploi ! 🎉

---

## 📍 Comment ça marche ?

### 1. Ouvrez l'onglet "Traductions"

Le système charge automatiquement toutes vos traductions depuis Supabase.

### 2. Éditez vos traductions

- **Questions du formulaire** : Onglet "Questions"
- **Textes d'interface** : Onglet "Interface"  
- **Mappings pays-langues** : Onglet "Pays & langues"

### 3. La barre de synchronisation vous guide

En haut de l'écran, vous verrez :

| État | Signification |
|------|---------------|
| 🟢 **Synchronisé avec Supabase** | Tout est sauvegardé |
| 🟠 **Modifications non sauvegardées** | Cliquez sur "Sauvegarder" |
| 🔵 **Sauvegarde en cours...** | Patientez quelques secondes |
| 🔴 **Erreur** | Vérifiez votre connexion |

### 4. Sauvegardez

Cliquez sur le bouton **"Sauvegarder"** dans la barre en haut.  
✅ Toutes vos modifications sont envoyées à Supabase en un seul clic !

---

## 🎯 Fonctionnalités disponibles

### ✅ Actuellement fonctionnel

- ✅ **Stockage persistant** dans Supabase KV Store
- ✅ **Chargement automatique** au démarrage
- ✅ **Sauvegarde globale** (1 clic)
- ✅ **Indicateurs visuels** (modifications non sauvegardées)
- ✅ **Gestion d'erreurs** avec retry
- ✅ **Statistiques en temps réel**
- ✅ **Exports JSON/CSV**

### 🔜 Sprint 2 (À venir)

- 🔜 **Auto-traduction MCP** (Claude IA)
- 🔜 **Auto-traduction DeepL API**
- 🔜 **Analyse qualité IA**
- 🔜 **Suggestions contextuelles**

---

## 🔍 Où sont stockées les données ?

**Base de données** : Supabase Postgres  
**Table** : `kv_store_10092a63`  
**Préfixes clés** :
- `i18n:question:{id}` → Traductions des questions
- `i18n:ui:{id}` → Traductions des textes UI
- `i18n:country:{code}` → Mappings pays-langues

---

## 💡 Astuces

### Raccourcis clavier (à venir Sprint 2)
- `Ctrl + S` : Sauvegarder tout
- `Ctrl + R` : Recharger
- `Esc` : Annuler édition

### Workflow recommandé
1. Créez vos questions en français (langue source)
2. Allez dans "Traductions" → "Questions"
3. Traduisez langue par langue
4. Marquez comme "Validé" quand c'est OK
5. Sauvegardez régulièrement

### Statuts de traduction
- 🔴 **Missing** : Pas encore traduit
- 🟡 **Auto-MCP** : Généré par IA, à relire
- 🟡 **Auto-API** : Généré par API, à relire
- 🟢 **Validated** : Validé par un humain ✅

---

## 🆘 Problèmes courants

### "Erreur : Failed to load translations"
➡️ Vérifiez votre connexion internet  
➡️ Cliquez sur "Recharger"

### "Modifications non sauvegardées"
➡️ Normal ! Cliquez sur "Sauvegarder"  
➡️ Vos données sont en sécurité dans l'état React

### Données ne se chargent pas
➡️ Ouvrez la console (F12)  
➡️ Cherchez les logs `✅ Translations loaded...`  
➡️ Si erreur, contactez le support

---

## 📚 Documentation complète

Pour plus de détails techniques, consultez :
- `/docs/TRANSLATIONS_SUPABASE.md` - Architecture complète
- `/docs/I18N_SYSTEM.md` - Système multilingue global
- `/docs/TRANSLATION_OPTIMIZATION.md` - Optimisations UX

---

## ✨ Prêt à traduire !

Votre système est opérationnel. Allez dans **Dashboard → Traductions** et commencez ! 🚀

---

**Questions ?** Consultez `/docs/TRANSLATIONS_SUPABASE.md`  
**Bugs ?** Ouvrez la console (F12) et vérifiez les logs
