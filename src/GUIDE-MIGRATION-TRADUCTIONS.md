# 🔄 GUIDE - Migration des traductions AGENCY

## 🎯 Pourquoi cette migration ?

Lors de la refonte du système de traductions, nous sommes passés de **2 formats différents** :

### ANCIEN FORMAT (par langue)
```
i18n:fr:question:q4_secteurs
i18n:en:question:q4_secteurs
i18n:de:question:q4_secteurs
```

### NOUVEAU FORMAT (multi-langue)
```
i18n:question:q4_secteurs = {
  translations: {
    fr: { label: "...", placeholder: "..." },
    en: { label: "...", placeholder: "..." },
    de: { label: "...", placeholder: "..." }
  }
}
```

**Le problème** : Les anciennes traductions AGENCY ne sont plus chargées par le nouveau système !

---

## ✅ Solution : Script de migration automatique

Un bouton de migration a été ajouté dans **Dashboard → Onglet Questions** (tout en bas).

---

## 📝 Mode d'emploi

### Étape 1 : Ouvrir le dashboard

1. Va sur `/dashboard?tab=questions`
2. Scroll tout en bas de la page
3. Tu verras une card orange **"Migration des traductions"**

### Étape 2 : Prévisualiser

1. Clique sur **"Afficher les détails"**
2. Le script va charger automatiquement :
   - **Ancien format** (rouge) : Nombre de traductions à migrer
   - **Nouveau format** (vert) : Nombre de traductions déjà au bon format

### Étape 3 : Lancer la migration

1. Si tu vois des traductions en **ancien format** (rouge > 0)
2. Clique sur **"Lancer la migration"**
3. Confirme l'opération
4. Attends quelques secondes

### Étape 4 : Vérifier

1. Le système affiche **"✅ Migration réussie ! X traductions migrées"**
2. Les traductions sont maintenant dans le nouveau format
3. Les anciennes traductions sont **conservées** (pas supprimées)

### Étape 5 : Nettoyer (optionnel)

1. **IMPORTANT** : Teste d'abord que tout fonctionne !
2. Va sur le formulaire `/` → Vérifie que toutes les traductions s'affichent
3. Si tout est OK, tu peux cliquer sur **"Nettoyer (après migration)"**
4. Cela supprime les anciennes clés (i18n:fr:question:*) pour éviter la duplication

---

## 🔍 Ce que fait la migration

### Automatiquement

- ✅ Détecte toutes les traductions ancien format
- ✅ Les convertit vers le nouveau format
- ✅ **Fusionne** avec les traductions existantes (ne les écrase pas)
- ✅ Conserve les anciennes clés (sécurité)

### Exemple concret

**AVANT** (dans Supabase KV Store) :
```
i18n:fr:question:q4_secteurs = {
  text: "Principaux secteurs d'activité - test",
  placeholder: "Sélectionnez...",
  status: "validated"
}

i18n:en:question:q4_secteurs = {
  text: "Main business sectors",
  placeholder: "Select...",
  status: "auto-api"
}
```

**APRÈS migration** :
```
i18n:question:q4_secteurs = {
  translations: {
    fr: {
      label: "Principaux secteurs d'activité - test",
      placeholder: "Sélectionnez...",
      status: "validated"
    },
    en: {
      label: "Main business sectors",
      placeholder: "Select...",
      status: "auto-api"
    }
  }
}

// Les anciennes clés existent toujours (jusqu'au nettoyage)
i18n:fr:question:q4_secteurs = {...}
i18n:en:question:q4_secteurs = {...}
```

---

## 🧪 Vérification post-migration

### 1. Formulaire AGENCY

1. Va sur `/`
2. Sélectionne **"Agence ETT"**
3. Vérifie que toutes les questions s'affichent correctement
4. Vérifie les traductions (si tu as plusieurs langues)

### 2. Formulaire CLIENT

1. Va sur `/`
2. Sélectionne **"Entreprise / Client"**
3. Vérifie que les modifications du dashboard s'appliquent

### 3. Formulaire WORKER

1. Va sur `/`
2. Sélectionne **"Intérimaire / Travailleur"**
3. Vérifie que tout fonctionne

---

## ⚠️ Sécurité

- ✅ La migration **NE SUPPRIME RIEN** (sauf si tu cliques sur "Nettoyer")
- ✅ Les anciennes et nouvelles traductions **coexistent**
- ✅ Si problème : Les anciennes traductions sont toujours là
- ✅ Le nettoyage est **optionnel** et **demande confirmation**

---

## 📊 Logs attendus

### Console serveur (F12 → Network → migrate-translations)

```
🔄 [MIGRATION] Démarrage de la migration des traductions...
📊 [MIGRATION] Trouvé 150 clés i18n:*
  ✓ Ancien format question: fr/q4_secteurs
  ✓ Ancien format question: en/q4_secteurs
  ✓ Ancien format question: de/q4_secteurs
  ...
📊 [MIGRATION] Analyse terminée:
  - 78 traductions ancien format
  - 12 traductions nouveau format
  - 26 questions à migrer
  - 0 textes UI à migrer
  ✅ Migration question q4_secteurs [fr]
  ✅ Migration question q4_secteurs [en]
  ...
✅ [MIGRATION] Migration terminée avec succès !
  - 26 questions migrées
  - 0 textes UI migrés
```

---

## 🎯 Résultat final

### AVANT

- ❌ Traductions AGENCY dans ancien format
- ❌ Non chargées par le nouveau système
- ❌ Formulaire CLIENT/WORKER déconnecté du dashboard

### APRÈS

- ✅ Toutes les traductions au nouveau format
- ✅ Chargées par `/translate/:lang`
- ✅ Formulaire AGENCY/CLIENT/WORKER synchronisés
- ✅ Modifications dashboard appliquées partout

---

## 🚨 En cas de problème

### Si la migration échoue

1. Vérifie la console (F12)
2. Regarde les logs serveur
3. Les anciennes traductions sont toujours là
4. Tu peux relancer la migration

### Si les traductions ne s'affichent pas

1. **NE PAS NETTOYER** tout de suite
2. Vérifie que la migration s'est bien passée
3. Rafraîchis la page (F5)
4. Vérifie les logs de `useI18n` dans la console

### Si tu veux annuler

1. **Si pas encore nettoyé** : Les anciennes clés existent toujours
2. Tu peux restaurer manuellement depuis Supabase
3. Demande de l'aide si besoin

---

## 📁 Fichiers créés

1. `/supabase/functions/server/migrate-translations.tsx` - Script de migration
2. `/components/dashboard/MigrateTranslationsButton.tsx` - Interface UI
3. `/GUIDE-MIGRATION-TRADUCTIONS.md` - Ce guide
4. `/DIAGNOSTIC-TRADUCTIONS-CLIENT.md` - Diagnostic technique
5. `/FIX-TRADUCTIONS-CLIENT-COMPLET.md` - Documentation complète

---

## 🎉 C'est tout !

Maintenant :
1. ✅ Les 3 formulaires sont synchronisés
2. ✅ Les traductions sont au nouveau format unifié
3. ✅ Les modifications dashboard s'appliquent partout

**Lance la migration et teste ! 🚀**
