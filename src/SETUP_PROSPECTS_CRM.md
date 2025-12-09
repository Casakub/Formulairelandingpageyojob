# 🚀 SETUP PROSPECTS CRM - 2 MINUTES

## ⚡ Étape 1 : Ouvrir Supabase SQL Editor

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet : **vhpbmckgxtdyxdwhmdxy**
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **+ New Query**

## 📋 Étape 2 : Copier-Coller le Script SQL

1. Ouvrez le fichier `SETUP_PROSPECTS_CRM.sql`
2. Copiez **TOUT** le contenu (Ctrl+A puis Ctrl+C)
3. Collez dans le SQL Editor de Supabase (Ctrl+V)

## ▶️ Étape 3 : Exécuter

1. Cliquez sur le bouton **RUN** en bas à droite
2. Attendez 2-3 secondes
3. Vous devriez voir : **Success. No rows returned**

## ✅ Étape 4 : Vérifier

Exécutez cette requête pour vérifier :

```sql
SELECT * FROM prospect_stats;
```

Vous devriez voir quelque chose comme :
```
total_active: 3
total_clients: 1
total_agencies: 1
total_waitlist: 1
```

## 🎉 C'est fait !

Retournez sur votre application et :
1. Rechargez la page (F5)
2. Allez sur `/admin` → Onglet "Prospects"
3. Vous devriez voir 3 prospects de test !

---

## 🐛 En cas de problème

### Erreur "relation already exists"
C'est normal ! Le script utilise `IF NOT EXISTS`, donc il ne fait rien si les tables existent déjà.

### Erreur de permission
Assurez-vous d'être connecté avec un compte admin Supabase.

### Les tables sont créées mais vides
Re-exécutez juste la section 9 du script (INSERT INTO prospects...).

---

## 🔄 Pour recommencer à zéro

Si vous voulez supprimer toutes les tables et recommencer :

```sql
DROP TABLE IF EXISTS prospect_notes CASCADE;
DROP TABLE IF EXISTS prospect_actions CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP VIEW IF EXISTS prospect_stats;
```

Puis re-exécutez `SETUP_PROSPECTS_CRM.sql`.

---

**Besoin d'aide ?** Vérifiez les logs dans Supabase → Edge Functions → Logs
