# 🚨 ACTION IMMÉDIATE REQUISE - 2 MINUTES

## ❌ Erreurs actuelles

Vous voyez ces erreurs car **les tables de base de données n'existent pas encore** :

```
Error: Could not find the table 'public.prospects' in the schema cache
Error: Could not find the table 'public.prospect_stats' in the schema cache
```

## ✅ Solution en 5 étapes (2 minutes chrono)

### 📍 **Étape 1** - Ouvrir Supabase

1. Allez sur : **https://supabase.com/dashboard**
2. Sélectionnez votre projet : **vhpbmckgxtdyxdwhmdxy**

### 📍 **Étape 2** - Ouvrir SQL Editor

Dans le menu de gauche :
- Cliquez sur **SQL Editor** 🗄️
- Cliquez sur **+ New Query**

### 📍 **Étape 3** - Copier le script SQL

1. Ouvrez le fichier **`SETUP_PROSPECTS_CRM.sql`** (dans ce projet)
2. Sélectionnez **TOUT** le contenu (Ctrl+A / Cmd+A)
3. Copiez (Ctrl+C / Cmd+C)

### 📍 **Étape 4** - Coller et Exécuter

1. Collez dans le **SQL Editor** de Supabase (Ctrl+V / Cmd+V)
2. Cliquez sur le bouton **▶️ RUN** en bas à droite
3. Attendez 2-3 secondes ⏱️

### 📍 **Étape 5** - Vérifier

Vous devriez voir :
```
✅ Success. No rows returned
```

Puis exécutez cette vérification :
```sql
SELECT * FROM prospect_stats;
```

Résultat attendu :
```
total_active: 3
total_clients: 1
total_agencies: 1
total_waitlist: 1
```

## 🎉 Terminé !

Retournez sur votre application et **rechargez la page** (F5).

Les erreurs devraient avoir disparu ! 🚀

---

## 📋 Ce qui a été créé

- ✅ **Table `prospects`** - Stockage de tous les prospects (clients, agences, intérimaires, waitlist)
- ✅ **Table `prospect_actions`** - Historique des actions sur chaque prospect
- ✅ **Table `prospect_notes`** - Notes internes de l'équipe commerciale
- ✅ **Vue `prospect_stats`** - Statistiques en temps réel (KPI)
- ✅ **Table `integrations`** - Configuration des intégrations CRM
- ✅ **3 prospects de test** - Pour tester immédiatement

---

## 🔄 Pour tout recommencer (optionnel)

Si vous voulez supprimer toutes les données et recommencer :

```sql
DROP TABLE IF EXISTS prospect_notes CASCADE;
DROP TABLE IF EXISTS prospect_actions CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP VIEW IF EXISTS prospect_stats;
```

Puis re-exécutez le fichier `SETUP_PROSPECTS_CRM.sql`.

---

## 💡 Pourquoi faire cela manuellement ?

Supabase ne permet pas de créer automatiquement des tables via le code pour des raisons de sécurité.
C'est une bonne pratique qui évite les modifications accidentelles de votre schéma de base de données.

**Le script SQL est sûr et peut être exécuté plusieurs fois sans problème** (il utilise `IF NOT EXISTS`).

---

## 📞 Besoin d'aide ?

- **Les tables existent déjà ?** → Vérifiez dans Supabase → Table Editor
- **Erreurs de permission ?** → Assurez-vous d'être connecté avec un compte admin
- **Autres problèmes ?** → Vérifiez les logs : Supabase → Edge Functions → Logs

---

**Prochaines étapes après le setup :**

1. ✅ Dashboard Prospects fonctionnel
2. ✅ Formulaire landing page → BDD automatique
3. ✅ Scoring IA via Claude
4. ✅ Export CSV/JSON
5. ✅ Intégrations CRM (HubSpot, Salesforce, n8n)

**Tout est prêt, il ne manque que cette étape SQL !** 🎯
