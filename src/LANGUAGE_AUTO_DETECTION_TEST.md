# 🌍 Test de la Détection Automatique de Langue

## ✅ Fonctionnalités Implémentées

La détection automatique de langue est maintenant **active** sur la landing page YoJob !

### 🎯 Ordre de Priorité

1. **Choix manuel utilisateur** (localStorage `yojob_preferred_language`)
   - Si l'utilisateur a déjà choisi une langue, elle est utilisée
   - Priorité absolue sur toutes les autres détections

2. **Paramètre URL** (`?lang=pl`)
   - Permet de forcer une langue via l'URL
   - Utile pour les campagnes marketing ciblées

3. **Détection navigateur** (AUTO 🚀)
   - Lit `navigator.language` du navigateur
   - Exemples :
     - 🇵🇱 Navigateur polonais (`pl-PL`) → Site en polonais
     - 🇩🇪 Navigateur allemand (`de-DE`) → Site en allemand
     - 🇫🇷 Navigateur français (`fr-FR`) → Site en français
     - 🇪🇸 Navigateur espagnol (`es-ES`) → Site en espagnol

4. **Fallback intelligent**
   - Si la langue détectée n'existe pas dans les 23 langues supportées → Anglais
   - Si anglais non disponible → Français

---

## 🧪 Comment Tester

### Test 1 : Première Visite (Auto-détection)

1. **Effacer le localStorage** dans la console :
   ```javascript
   localStorage.clear();
   ```

2. **Rafraîchir la page** (F5 ou Cmd+R)

3. **Vérifier la langue affichée** :
   - Elle doit correspondre à la langue de votre navigateur
   - Exemple : Navigateur en polonais → Site en polonais automatiquement

4. **Vérifier les logs console** :
   ```
   🌍 Langue détectée automatiquement depuis le navigateur: pl
   ✅ Langue auto-détectée sauvegardée: pl
   ```

---

### Test 2 : Simuler un Utilisateur Polonais

1. **Effacer le localStorage** :
   ```javascript
   localStorage.clear();
   ```

2. **Changer la langue du navigateur** :
   - Chrome : `chrome://settings/languages`
   - Firefox : `about:preferences#general` → Langue
   - Mettre le polonais en premier

3. **Rafraîchir la page**
   - Le site doit s'afficher en **polonais** automatiquement 🇵🇱

---

### Test 3 : Simuler un Utilisateur Allemand

1. **Utiliser le paramètre URL** :
   ```
   http://localhost:5173/?lang=de
   ```

2. **Rafraîchir**
   - Le site doit s'afficher en **allemand** 🇩🇪

---

### Test 4 : Choix Manuel Persistant

1. **Cliquer sur le sélecteur de langue** (en haut à droite)

2. **Choisir une langue manuellement** (ex: Italien)

3. **Rafraîchir la page** (F5)
   - La langue doit rester **italienne**
   - Même si votre navigateur est en français

4. **Vérifier localStorage** :
   ```javascript
   localStorage.getItem('yojob_preferred_language')
   // Doit retourner "it"
   ```

---

### Test 5 : Langue Non Supportée

1. **Simuler un navigateur japonais** :
   ```javascript
   // Dans la console
   Object.defineProperty(navigator, 'language', {
     get: function() { return 'ja-JP'; }
   });
   ```

2. **Rafraîchir**
   - Le site doit fallback sur **anglais** (ou français si anglais indisponible)

---

## 📊 23 Langues Supportées

| Code | Langue | Drapeau | Pays Typiques |
|------|--------|---------|---------------|
| `fr` | Français | 🇫🇷 | France, Belgique, Suisse |
| `en` | English | 🇬🇧 | UK, Irlande |
| `de` | Deutsch | 🇩🇪 | Allemagne, Autriche, Suisse |
| `es` | Español | 🇪🇸 | Espagne |
| `it` | Italiano | 🇮🇹 | Italie |
| `nl` | Nederlands | 🇳🇱 | Pays-Bas, Belgique |
| `pt` | Português | 🇵🇹 | Portugal |
| `pl` | Polski | 🇵🇱 | Pologne |
| `cs` | Čeština | 🇨🇿 | République Tchèque |
| `sk` | Slovenčina | 🇸🇰 | Slovaquie |
| `hu` | Magyar | 🇭🇺 | Hongrie |
| `ro` | Română | 🇷🇴 | Roumanie |
| `bg` | Български | 🇧🇬 | Bulgarie |
| `hr` | Hrvatski | 🇭🇷 | Croatie |
| `sl` | Slovenščina | 🇸🇮 | Slovénie |
| `et` | Eesti | 🇪🇪 | Estonie |
| `lv` | Latviešu | 🇱🇻 | Lettonie |
| `lt` | Lietuvių | 🇱🇹 | Lituanie |
| `el` | Ελληνικά | 🇬🇷 | Grèce |
| `sv` | Svenska | 🇸🇪 | Suède |
| `da` | Dansk | 🇩🇰 | Danemark |
| `fi` | Suomi | 🇫🇮 | Finlande |
| `no` | Norsk | 🇳🇴 | Norvège |

---

## 🎯 Cas d'Usage Réels

### Campagne Email Ciblée Pologne
```
Email → https://yojob.com/?lang=pl
→ Utilisateur polonais voit le site en polonais directement
```

### Visiteur Organique Allemagne
```
Google.de → Recherche "agence intérim europe"
→ Clic sur YoJob
→ Navigateur allemand détecté
→ Site affiché en allemand automatiquement 🇩🇪
```

### Utilisateur Revient sur le Site
```
Visite 1 → Auto-détection polonais
Visite 2 → Change manuellement en anglais
Visite 3 → Site reste en anglais (choix manuel persistant)
```

---

## 🔧 Debug dans la Console

Pour voir tous les logs de détection :

```javascript
// Vérifier la langue actuelle
localStorage.getItem('yojob_preferred_language')

// Vérifier la langue du navigateur
navigator.language

// Forcer une nouvelle détection
localStorage.removeItem('yojob_preferred_language');
location.reload();
```

---

## ✅ Résumé

**Avant** : Tous les utilisateurs voyaient le site en français par défaut
**Maintenant** : 
- 🇵🇱 Polonais → Site en polonais automatiquement
- 🇩🇪 Allemand → Site en allemand automatiquement
- 🇪🇸 Espagnol → Site en espagnol automatiquement
- ... pour les 23 langues européennes !

**Bénéfices** :
- ✅ Meilleure expérience utilisateur
- ✅ Taux de conversion amélioré
- ✅ SEO multilingue optimisé
- ✅ Campagnes marketing ciblées par pays

---

**Version** : 1.0  
**Date** : Décembre 2024  
**Auteur** : YoJob Dev Team
