# ✅ Checklist de tests - Système de langue unifié

## 🎯 Objectif

Cette checklist permet de valider le bon fonctionnement du système de langue unifié sur toutes les pages du site YOJOB.

---

## 🧪 Tests de base (obligatoires)

### Test 1 : Auto-détection au premier chargement

**Objectif** : Vérifier que la langue du navigateur est détectée automatiquement

**Étapes** :
1. Ouvrir DevTools (F12) → Console
2. Exécuter : `localStorage.clear()` ou `localStorage.removeItem('yojob_preferred_language')`
3. Recharger la page (F5)
4. Observer la langue affichée

**Résultat attendu** :
- ✅ La page s'affiche dans la langue du navigateur (si supportée)
- ✅ Message console : `🌍 Langue auto-détectée depuis navigateur: [code]`
- ✅ localStorage contient maintenant : `yojob_preferred_language = [code]`

**Vérification localStorage** :
```javascript
console.log(localStorage.getItem('yojob_preferred_language'));
```

---

### Test 2 : Persistance après rechargement

**Objectif** : Vérifier que le choix de langue persiste entre les sessions

**Étapes** :
1. Aller sur n'importe quelle page du site
2. Changer la langue via le sélecteur (ex: Allemand 🇩🇪)
3. Recharger la page (F5)
4. Observer la langue affichée

**Résultat attendu** :
- ✅ La page reste en allemand après rechargement
- ✅ localStorage contient : `yojob_preferred_language = de`

**Test supplémentaire** :
1. Fermer complètement le navigateur
2. Rouvrir le site
3. Vérifier que la langue est toujours en allemand

---

### Test 3 : Synchronisation entre pages

**Objectif** : Vérifier que la langue est partagée entre toutes les pages

**Étapes** :
1. Aller sur la **Landing Page** (`/`)
2. Changer la langue en **Polonais** 🇵🇱
3. Cliquer sur "Intérim Européen" ou naviguer vers `/ServiceInterimEuropeen`
4. Observer la langue affichée

**Résultat attendu** :
- ✅ La page Service Intérim Européen s'affiche en polonais
- ✅ Aucun flash de contenu en français

**Test inverse** :
1. Sur la page Service, changer la langue en **Espagnol** 🇪🇸
2. Retourner sur la Landing Page
3. Vérifier que la Landing Page est en espagnol

---

### Test 4 : Paramètre URL

**Objectif** : Vérifier que le paramètre `?lang=` fonctionne

**Étapes** :
1. Ajouter `?lang=it` à l'URL (ex: `https://votre-site.com?lang=it`)
2. Charger la page
3. Observer la langue affichée

**Résultat attendu** :
- ✅ La page s'affiche en italien 🇮🇹
- ✅ localStorage est mis à jour : `yojob_preferred_language = it`
- ✅ Message console : `🌍 Langue détectée depuis URL: it`

**Test avec langue invalide** :
1. Essayer `?lang=zz` (langue inexistante)
2. Vérifier que le fallback fonctionne (anglais puis français)

---

### Test 5 : Fallback intelligent

**Objectif** : Vérifier le comportement avec une langue non supportée

**Étapes** :
1. Vider localStorage : `localStorage.clear()`
2. Modifier temporairement la langue du navigateur vers une langue non supportée (ex: Japonais)
3. Recharger la page

**Résultat attendu** :
- ✅ La page s'affiche en **anglais** (fallback primaire)
- ✅ Message console : `🌍 Langue du navigateur non supportée, fallback sur anglais`
- ✅ Si anglais non disponible, fallback sur **français**

---

## 🔧 Tests techniques (développeurs)

### Test 6 : localStorage désactivé

**Objectif** : Vérifier le comportement en mode navigation privée

**Étapes** :
1. Ouvrir une fenêtre de navigation privée
2. Désactiver localStorage (si possible, ou simplement observer le comportement)
3. Charger le site
4. Changer la langue

**Résultat attendu** :
- ✅ Aucune erreur dans la console
- ✅ Warnings : `⚠️ Impossible de lire/sauvegarder localStorage`
- ✅ La langue fonctionne mais ne persiste pas

---

### Test 7 : État de chargement (isReady)

**Objectif** : Vérifier que l'état `isReady` fonctionne correctement

**Étapes** :
1. Ouvrir DevTools → Console
2. Ajouter un `console.log(isReady)` dans le composant
3. Observer la séquence de valeurs

**Résultat attendu** :
- ✅ Au montage : `isReady = false`
- ✅ Après détection : `isReady = true`
- ✅ Durée < 10ms

---

### Test 8 : Changement rapide de langue

**Objectif** : Tester la réactivité et l'absence de bugs

**Étapes** :
1. Ouvrir le sélecteur de langue
2. Changer rapidement entre plusieurs langues (FR → EN → DE → PL → ES)
3. Observer les traductions

**Résultat attendu** :
- ✅ Aucun lag visible
- ✅ Aucune erreur console
- ✅ Traductions changent instantanément
- ✅ localStorage mis à jour à chaque changement

---

## 🌍 Tests par langue (échantillon)

### Langues principales à tester

| Langue | Code | Test manuel | Notes |
|--------|------|-------------|-------|
| 🇫🇷 Français | `fr` | ✅ | Langue par défaut |
| 🇬🇧 Anglais | `en` | ✅ | Fallback primaire |
| 🇩🇪 Allemand | `de` | ✅ | Marché important |
| 🇪🇸 Espagnol | `es` | ✅ | Marché important |
| 🇮🇹 Italien | `it` | ✅ | Marché important |
| 🇵🇱 Polonais | `pl` | ✅ | Forte immigration |
| 🇳🇱 Néerlandais | `nl` | ⬜ | |
| 🇵🇹 Portugais | `pt` | ⬜ | |
| 🇨🇿 Tchèque | `cs` | ⬜ | |
| 🇸🇰 Slovaque | `sk` | ⬜ | |
| 🇭🇺 Hongrois | `hu` | ⬜ | |
| 🇷🇴 Roumain | `ro` | ⬜ | Forte immigration |
| 🇧🇬 Bulgare | `bg` | ⬜ | |
| 🇭🇷 Croate | `hr` | ⬜ | |
| 🇸🇮 Slovène | `sl` | ⬜ | |
| 🇪🇪 Estonien | `et` | ⬜ | |
| 🇱🇻 Letton | `lv` | ⬜ | |
| 🇱🇹 Lituanien | `lt` | ⬜ | |
| 🇬🇷 Grec | `el` | ⬜ | |
| 🇸🇪 Suédois | `sv` | ⬜ | |
| 🇩🇰 Danois | `da` | ⬜ | |
| 🇫🇮 Finnois | `fi` | ✅ | Nouvellement ajouté |
| 🇳🇴 Norvégien | `no` | ✅ | Nouvellement ajouté |

---

## 📱 Tests responsive

### Test 9 : Mobile - Sélecteur de langue

**Étapes** :
1. Réduire la fenêtre en mode mobile (<768px)
2. Ouvrir le menu burger
3. Utiliser le sélecteur de langue
4. Observer le comportement

**Résultat attendu** :
- ✅ Sélecteur visible et fonctionnel
- ✅ Menu se ferme après sélection
- ✅ Langue change instantanément

---

### Test 10 : Tablette

**Étapes** :
1. Tester sur iPad ou émulation tablette (768-1024px)
2. Vérifier le sélecteur de langue
3. Changer la langue

**Résultat attendu** :
- ✅ Interface adaptée
- ✅ Sélecteur accessible
- ✅ Fonctionnement normal

---

## 🌐 Tests multi-navigateurs

### Navigateurs à tester

| Navigateur | Version | Desktop | Mobile | Status |
|------------|---------|---------|--------|--------|
| Chrome | Latest | ✅ | ✅ | |
| Firefox | Latest | ✅ | ⬜ | |
| Safari | Latest | ⬜ | ✅ | |
| Edge | Latest | ✅ | ⬜ | |
| Opera | Latest | ⬜ | ⬜ | |

---

## 🔍 Tests de régression

### Vérifier que rien n'a été cassé

- [ ] Landing Page : Toutes les sections fonctionnent
- [ ] Landing Page : Formulaire de contact
- [ ] Landing Page : Formulaire waitlist
- [ ] Service Intérim : Toutes les sections
- [ ] Service Intérim : FAQ déroulant
- [ ] Footer : Liens cliquables
- [ ] Footer : Réseaux sociaux
- [ ] Header : Navigation
- [ ] Header : Menu mobile

---

## 📊 Tests de performance

### Test 11 : Temps de chargement

**Étapes** :
1. Ouvrir DevTools → Network
2. Vider le cache
3. Recharger la page
4. Mesurer le temps total

**Résultat attendu** :
- ✅ Aucun délai ajouté par le système de langue
- ✅ Temps de détection < 5ms
- ✅ Pas de requête réseau supplémentaire

---

### Test 12 : Mémoire

**Étapes** :
1. Ouvrir DevTools → Memory
2. Prendre un snapshot
3. Changer de langue 10 fois
4. Prendre un nouveau snapshot
5. Comparer

**Résultat attendu** :
- ✅ Pas de fuite mémoire
- ✅ Utilisation stable

---

## 🐛 Tests de cas limites

### Test 13 : localStorage plein

**Étapes** :
1. Remplir localStorage à 95% de sa capacité
2. Essayer de changer la langue
3. Observer le comportement

**Résultat attendu** :
- ✅ Warning console mais pas de crash
- ✅ Langue fonctionne (en mémoire uniquement)

---

### Test 14 : Corruption localStorage

**Étapes** :
1. Injecter une valeur corrompue : `localStorage.setItem('yojob_preferred_language', 'invalid123')`
2. Recharger la page

**Résultat attendu** :
- ✅ Détection de valeur invalide
- ✅ Fallback sur détection navigateur
- ✅ Remplacement par une valeur valide

---

## ✅ Checklist finale

### Pages migrées
- [x] Landing Page (`/App-Landing.tsx`)
- [x] Service Intérim Européen (`/ServiceInterimEuropeen.tsx`)
- [ ] Service Recrutement Spécialisé
- [ ] Service Conseil & Conformité
- [ ] Service Détachement de Personnel
- [ ] Formulaire multi-étapes
- [ ] Pages admin

### Fonctionnalités
- [x] Auto-détection navigateur
- [x] Persistance localStorage
- [x] Synchronisation inter-pages
- [x] Paramètre URL
- [x] Fallback intelligent
- [x] Gestion erreurs localStorage
- [x] État isReady

### Documentation
- [x] Guide système (`LANGUAGE_SYSTEM.md`)
- [x] Guide migration (`MIGRATION_GUIDE_LANGUAGE.md`)
- [x] Changelog (`CHANGELOG_LANGUAGE_SYSTEM.md`)
- [x] Tests checklist (`TESTING_CHECKLIST_LANGUAGE.md`)

---

## 📝 Rapport de bugs

Si vous trouvez un bug, veuillez documenter :
1. **Page** : Quelle page était affectée
2. **Navigateur** : Chrome 120, Firefox 121, etc.
3. **Langue** : Code langue testé
4. **localStorage** : Contenu avant le bug
5. **Console** : Messages d'erreur
6. **Étapes** : Comment reproduire

---

## 🎉 Validation finale

Une fois tous les tests cochés ✅ :

1. Merger la branche dans `main`
2. Déployer en production
3. Monitorer les logs pendant 24h
4. Collecter les feedbacks utilisateurs

---

**Dernière mise à jour** : Janvier 2025  
**Testeur** : _________________  
**Date du test** : _________________  
**Résultat global** : ⬜ Réussi / ⬜ Échoué
