# 🔧 Configuration des variables d'environnement dans Figma Make

## ⚠️ Erreur actuelle

Si vous voyez cette erreur :
```
TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')
```

**C'est normal !** Les variables d'environnement ne sont pas encore configurées.

---

## 🚀 Solution rapide (2 minutes)

### Étape 1 : Créer votre projet Supabase

Si pas encore fait, suivez `QUICK_START.md` pour :
1. Créer un projet Supabase (2 min)
2. Créer la table avec le SQL (1 min)
3. Récupérer les clés API (1 min)

### Étape 2 : Configurer les variables dans Figma Make

#### Option A : Via l'interface Figma Make (Recommandé)

1. **Ouvrir les paramètres du projet** :
   - Dans Figma Make, cherchez une section "Settings" ou "Configuration"
   - Ou "Project Settings" / "Environment Variables"

2. **Ajouter les variables** :
   
   | Variable Name | Value |
   |--------------|-------|
   | `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

3. **Sauvegarder et redéployer** :
   - Cliquez sur "Save" ou "Apply"
   - Redéployez l'application (peut-être un bouton "Rebuild" ou "Deploy")

#### Option B : Via un fichier .env (Si supporté)

Si Figma Make supporte les fichiers `.env` :

1. Créez un fichier `.env` à la racine :
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. Remplacez les valeurs par vos vraies clés Supabase

3. Sauvegardez et redéployez

#### Option C : Hardcoder temporairement (Non recommandé)

Si aucune des options ci-dessus ne fonctionne, vous pouvez temporairement hardcoder les valeurs :

1. Ouvrez `/lib/supabase.ts`
2. Remplacez les lignes 18-19 :

```typescript
// AVANT (lignes 18-19)
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// APRÈS
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

⚠️ **Attention** : Cette méthode expose vos clés dans le code (mais c'est OK pour l'anon key qui est publique).

---

## 🧪 Vérifier que ça marche

Après configuration :

1. **Rechargez l'application**
2. **Ouvrez la console (F12)**
3. Vous ne devriez **PLUS** voir :
   - ❌ "Cannot read properties of undefined"
   - ❌ "⚠️ Supabase credentials not found"

4. **Testez la soumission** :
   - Remplissez le formulaire
   - Soumettez
   - Vous devriez voir un toast vert : "Merci ! Votre réponse a été enregistrée."

5. **Vérifiez dans Supabase** :
   - Allez dans Supabase → Table Editor
   - Ouvrez `market_research_responses`
   - Vous devriez voir votre réponse !

---

## 🎯 Mode Démo (Sans Supabase)

**Bonne nouvelle** : L'application fonctionne même SANS Supabase configuré !

Si les variables d'environnement ne sont pas configurées :
- ✅ Le formulaire s'affiche normalement
- ✅ Vous pouvez le remplir
- ⚠️ À la soumission, vous verrez un toast orange : "Mode démonstration"
- ✅ Le dashboard affiche des données de démonstration
- ✅ Toutes les fonctionnalités sont testables

**C'est parfait pour** :
- Tester l'interface
- Montrer une démo
- Développer en local

**Mais pour la production**, vous DEVEZ configurer Supabase pour :
- Sauvegarder les vraies réponses
- Collecter les données de 27,000 agences
- Analyser les résultats

---

## 📋 Checklist de configuration

- [ ] Projet Supabase créé
- [ ] Table `market_research_responses` créée (SQL exécuté)
- [ ] Clés API récupérées (URL + Anon Key)
- [ ] Variables d'environnement configurées dans Figma Make
- [ ] Application redéployée
- [ ] Console ne montre plus d'erreur "VITE_SUPABASE_URL"
- [ ] Test de soumission réussi
- [ ] Données visibles dans Supabase Table Editor
- [ ] Dashboard montre badge vert "Données Réelles"

---

## 🆘 Besoin d'aide ?

### Problème : "Je ne trouve pas où ajouter les variables d'environnement"

**Solutions** :
1. Cherchez dans la documentation de Figma Make
2. Regardez dans "Project Settings" ou "Configuration"
3. Utilisez l'Option C (hardcoder temporairement)
4. Contactez le support Figma Make

### Problème : "J'ai configuré mais l'erreur persiste"

**Vérifications** :
1. Les noms des variables sont EXACTS : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
2. Pas d'espace avant/après les valeurs
3. Pas de guillemets autour des valeurs
4. Avez-vous redéployé l'application après ajout ?
5. Videz le cache du navigateur (Ctrl+Shift+R)

### Problème : "Toast orange 'Mode démonstration' après soumission"

**Cause** : Supabase n'est pas configuré ou la connexion échoue

**Solutions** :
1. Vérifiez que les variables sont bien configurées
2. Vérifiez que les valeurs sont correctes
3. Testez la connexion dans Supabase (Settings → API → Test connection)
4. Regardez les logs de la console (F12) pour plus de détails

---

## 📚 Guides détaillés

Pour plus d'informations :
- 📖 `QUICK_START.md` - Configuration complète en 5 minutes
- 📘 `README_SUPABASE.md` - Documentation exhaustive
- 🗄️ `SUPABASE_SETUP.md` - Guide SQL détaillé
- 🚀 `🚀_START_HERE.md` - Vue d'ensemble

---

**🎉 Une fois configuré, l'application sera 100% fonctionnelle !**
