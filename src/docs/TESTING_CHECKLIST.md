# ✅ Checklist de Test - Système de Traductions Supabase

## 🎯 Tests à effectuer

### 1. Chargement initial ✅

**Étapes :**
1. Ouvrir le Dashboard
2. Cliquer sur l'onglet "Traductions"
3. Observer la console du navigateur (F12)

**Résultats attendus :**
- ✅ Logs : `✅ Translations loaded from Supabase: { questions: X, uiTexts: Y, countries: Z }`
- ✅ Barre de synchronisation affiche "Synchronisé avec Supabase"
- ✅ Badge vert avec dernière sync time
- ✅ Debug Panel (dev mode) affiche les statistiques

**En cas d'erreur :**
- ❌ Vérifier que Supabase est accessible
- ❌ Vérifier projectId et publicAnonKey dans `/utils/supabase/info.tsx`
- ❌ Vérifier que le serveur Edge Function tourne

---

### 2. Édition de traduction ✅

**Étapes :**
1. Aller dans "Questions" 
2. Cliquer sur une cellule pour éditer
3. Modifier le texte
4. Valider

**Résultats attendus :**
- ✅ Cellule devient éditable
- ✅ Barre de sync passe en orange "Modifications non sauvegardées"
- ✅ Badge s'anime (pulse)
- ✅ État local mis à jour immédiatement
- ✅ `hasUnsavedChanges = true`

---

### 3. Sauvegarde globale ✅

**Étapes :**
1. Après avoir édité une traduction
2. Cliquer sur "Sauvegarder" dans la barre
3. Observer les logs console

**Résultats attendus :**
- ✅ Barre passe en bleu "Sauvegarde en cours..."
- ✅ Loader animé
- ✅ Logs : `✅ All translations saved to Supabase`
- ✅ Après 1-2s, barre passe en vert "Synchronisé"
- ✅ `hasUnsavedChanges = false`
- ✅ `lastSyncTime` mis à jour

---

### 4. Rechargement depuis Supabase ✅

**Étapes :**
1. Cliquer sur "Recharger" dans la barre
2. Observer les logs

**Résultats attendus :**
- ✅ Logs : `✅ Translations loaded from Supabase...`
- ✅ Données rechargées depuis le serveur
- ✅ Modifications non sauvegardées perdues (comportement attendu)

---

### 5. Gestion d'erreurs ✅

**Étapes :**
1. Déconnecter internet (ou bloquer Supabase)
2. Essayer de sauvegarder
3. Observer la barre

**Résultats attendus :**
- ❌ Barre passe en rouge
- ❌ Message d'erreur affiché
- ❌ Logs : `❌ Error saving translations: ...`
- ❌ Données locales préservées
- ✅ Bouton "Sauvegarder" reste actif pour retry

---

### 6. Statistiques temps réel ✅

**Étapes :**
1. Ouvrir le Debug Panel (dev mode)
2. Éditer plusieurs traductions
3. Sauvegarder
4. Recharger

**Résultats attendus :**
- ✅ Compteurs s'actualisent
- ✅ Barres de progression se mettent à jour
- ✅ Stats cohérentes entre éditions

---

### 7. Édition de textes UI ✅

**Étapes :**
1. Aller dans "Interface"
2. Éditer un texte UI
3. Sauvegarder

**Résultats attendus :**
- ✅ Même workflow que questions
- ✅ Sauvegarde séparée dans `i18n:ui:{textId}`
- ✅ Logs distincts

---

### 8. Gestion des mappings pays-langues ✅

**Étapes :**
1. Aller dans "Pays & langues"
2. Modifier les langues d'un pays
3. Sauvegarder

**Résultats attendus :**
- ✅ Mappings sauvegardés dans `i18n:country:{code}`
- ✅ Détection de modifications
- ✅ Sync avec barre globale

---

### 9. Navigation entre onglets ✅

**Étapes :**
1. Éditer dans "Questions"
2. Passer à "Interface" sans sauvegarder
3. Retourner dans "Questions"

**Résultats attendus :**
- ✅ Modifications préservées (état global React)
- ⚠️ Badge "Non sauvegardé" reste affiché
- ✅ Données cohérentes

---

### 10. Bulk save performance ✅

**Étapes :**
1. Éditer 10+ traductions
2. Cliquer "Sauvegarder tout"
3. Observer la durée

**Résultats attendus :**
- ✅ Sauvegarde en < 3 secondes
- ✅ Toutes les traductions envoyées en 3 requêtes parallèles
- ✅ Pas de lag UI

---

## 🧪 Tests backend (Edge Function)

### Tester les endpoints manuellement

```bash
# Base URL
BASE_URL="https://{projectId}.supabase.co/functions/v1/make-server-10092a63/i18n"
ANON_KEY="your-anon-key"

# 1. GET questions
curl -X GET "$BASE_URL/questions" \
  -H "Authorization: Bearer $ANON_KEY"

# 2. POST question translation
curl -X POST "$BASE_URL/questions/q1" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "langCode": "en",
    "text": "What is your question?",
    "status": "validated"
  }'

# 3. GET stats
curl -X GET "$BASE_URL/stats" \
  -H "Authorization: Bearer $ANON_KEY"

# 4. POST bulk save
curl -X POST "$BASE_URL/questions/bulk" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "translations": [
      {
        "questionId": "q1",
        "translations": {
          "en": { "text": "Question 1", "status": "validated" }
        }
      }
    ]
  }'
```

---

## 🔍 Debugging

### Logs à surveiller

**Console Frontend :**
```
✅ Translations loaded from Supabase: { questions: 15, uiTexts: 17, countries: 27 }
✅ All translations saved to Supabase
✅ Question translation saved: q1 (en)
❌ Error loading translations: Network timeout
```

**Console Backend (Edge Function logs dans Supabase Dashboard) :**
```
GET /questions - 200 OK
POST /questions/q1 - 200 OK
POST /questions/bulk - 200 OK
ERROR: Validation failed - 400 Bad Request
```

### Variables d'environnement à vérifier

```bash
# Frontend
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...

# Backend (Edge Function)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Différent de ANON_KEY !
```

---

## 🐛 Problèmes courants

### 1. "Failed to load translations"
**Cause :** Backend inaccessible ou Edge Function non déployée  
**Solution :** Vérifier que la fonction `server` est bien déployée dans Supabase

### 2. "Authorization error"
**Cause :** `publicAnonKey` incorrect ou expiré  
**Solution :** Régénérer la clé dans Supabase Dashboard → Settings → API

### 3. "CORS error"
**Cause :** Headers CORS manquants côté serveur  
**Solution :** Vérifier que le serveur Hono a bien `app.use('*', cors())`

### 4. "Modifications perdues après refresh"
**Cause :** Normal si pas sauvegardé (état React volatile)  
**Solution :** Sauvegarder avant de rafraîchir

### 5. "Stats ne se mettent pas à jour"
**Cause :** Cache ou requête GET /stats non appelée  
**Solution :** Forcer un reload ou vérifier l'appel dans `saveAll()`

---

## ✅ Critères de validation

Pour considérer le système comme **production-ready** :

- [x] ✅ Chargement des données depuis Supabase
- [x] ✅ Sauvegarde des données dans Supabase
- [x] ✅ Détection des modifications non sauvegardées
- [x] ✅ Gestion d'erreurs avec messages clairs
- [x] ✅ UI responsive et fluide
- [x] ✅ Logs détaillés pour debugging
- [ ] ⏳ Tests unitaires (Sprint 2)
- [ ] ⏳ Tests E2E (Sprint 2)
- [ ] ⏳ Performance monitoring (Sprint 2)

---

**Date de dernière mise à jour** : Novembre 2024  
**Statut** : ✅ Prêt pour MVP testing
