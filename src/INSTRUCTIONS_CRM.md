# 🚨 ACTION REQUISE : Créer les tables Prospects CRM

## ⚠️ Pourquoi cette erreur ?

L'erreur **"Could not find the table 'public.prospects'"** signifie que les tables de la base de données n'existent pas encore.

## ✅ Solution : 2 minutes top chrono !

### 📍 Étape 1 : Ouvrir Supabase

1. Allez sur https://supabase.com/dashboard
2. Cliquez sur votre projet : **vhpbmckgxtdyxdwhmdxy**

### 📍 Étape 2 : Ouvrir SQL Editor

1. Menu de gauche → Cliquez sur **🗄️ SQL Editor**
2. Cliquez sur **+ New Query**

### 📍 Étape 3 : Copier le SQL

1. Ouvrez le fichier `SETUP_PROSPECTS_CRM.sql` (dans ce projet)
2. Sélectionnez TOUT (Ctrl+A ou Cmd+A)
3. Copiez (Ctrl+C ou Cmd+C)

### 📍 Étape 4 : Coller et Exécuter

1. Collez dans le SQL Editor de Supabase (Ctrl+V ou Cmd+V)
2. Cliquez sur **▶️ RUN** en bas à droite
3. Attendez 2-3 secondes ⏱️

### 📍 Étape 5 : Vérifier

Si tout s'est bien passé, vous verrez :
```
✅ Success. No rows returned
```

Puis exécutez cette requête pour confirmer :
```sql
SELECT * FROM prospect_stats;
```

Vous devriez voir :
```
total_active: 3
total_clients: 1
total_agencies: 1
```

## 🎉 C'est fini !

Retournez sur votre application et rechargez (F5).

L'erreur devrait avoir disparu ! 🚀

---

## 💡 Ce qui a été créé

- ✅ Table `prospects` (pour stocker les prospects)
- ✅ Table `prospect_actions` (historique)
- ✅ Table `prospect_notes` (notes internes)
- ✅ Vue `prospect_stats` (statistiques temps réel)
- ✅ 3 prospects de test

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème :
1. Vérifiez que vous êtes bien connecté à Supabase
2. Assurez-vous d'avoir exécuté le script complet
3. Vérifiez les erreurs dans le SQL Editor

**Le script est conçu pour être exécuté plusieurs fois sans problème** (il utilise `IF NOT EXISTS`).
