# 🧪 Tests : Système de traduction CLIENT & WORKER

## Plan de tests complet pour valider le système de traduction

---

## 🎯 Objectifs des tests

- ✅ Vérifier que toutes les questions CLIENT sont traduites
- ✅ Vérifier que toutes les questions WORKER sont traduites
- ✅ Confirmer que les doublons ne sont pas traduits deux fois
- ✅ Valider que les traductions sont sauvegardées dans Supabase
- ✅ S'assurer que le formulaire fonctionne dans toutes les langues
- ✅ Tester la gestion d'erreurs

---

## 📋 Tests unitaires

### **Test 1 : Chargement du composant**
```typescript
Composant : TranslateClientWorkerProfiles.tsx

✅ Le composant se charge sans erreur
✅ Les statistiques s'affichent correctement
   - Nombre de questions CLIENT : 18
   - Nombre de questions WORKER : 15
   - Questions uniques calculées correctement
✅ Le bouton "Traduire" est cliquable
```

**Comment tester :**
1. Ouvrir Dashboard → Traductions → Statistiques
2. Vérifier que la carte "Traduire CLIENT & WORKER" s'affiche
3. Vérifier les chiffres affichés

**Résultat attendu :**
- ✅ Carte visible avec gradient violet/rose
- ✅ Statistiques correctes
- ✅ Bouton actif (non grisé)

---

### **Test 2 : Détection des questions uniques**
```typescript
Fonction : getQuestionsByProfile()

Input :
  - Profile: 'client'
  - Profile: 'worker'

Output attendu :
  - CLIENT : 18 questions
  - WORKER : 15 questions
  - Questions partagées : ~5-8 (ex: q1_nom, email, consent)
  - Questions uniques : ~25-30
```

**Comment tester :**
```javascript
// Dans la console du navigateur (F12)
import { getQuestionsByProfile } from './config/survey-questions';

const clientQ = getQuestionsByProfile('client');
const workerQ = getQuestionsByProfile('worker');

console.log('CLIENT:', clientQ.length);
console.log('WORKER:', workerQ.length);

const allIds = [...clientQ, ...workerQ].map(q => q.id);
const uniqueIds = [...new Set(allIds)];
console.log('UNIQUE:', uniqueIds.length);
```

**Résultat attendu :**
- ✅ CLIENT : 18
- ✅ WORKER : 15
- ✅ UNIQUE : 25-30 (selon le nombre de questions partagées)

---

### **Test 3 : Appel API de traduction**
```typescript
Endpoint : POST /i18n/auto-translate-batch

Payload :
{
  "textId": "q1_nom",
  "sourceText": "Nom de votre entreprise",
  "sourceLanguage": "fr",
  "targetLanguages": ["en", "de"],
  "category": "question",
  "autoStore": true
}

Réponse attendue :
{
  "success": true,
  "stats": {
    "total": 2,
    "successful": 2,
    "failed": 0
  },
  "translations": {
    "en": "Your company name",
    "de": "Name Ihres Unternehmens"
  }
}
```

**Comment tester :**
```javascript
// Test manuel avec Postman ou curl
const response = await fetch(
  'https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/i18n/auto-translate-batch',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_ANON_KEY'
    },
    body: JSON.stringify({
      textId: 'test_question',
      sourceText: 'Bonjour le monde',
      sourceLanguage: 'fr',
      targetLanguages: ['en', 'de', 'es'],
      category: 'question',
      autoStore: false // Test sans sauvegarde
    })
  }
);

const data = await response.json();
console.log(data);
```

**Résultat attendu :**
- ✅ Status 200 OK
- ✅ `success: true`
- ✅ 3 traductions dans `translations`
- ✅ Temps de réponse : 3-5 secondes

---

## 🔄 Tests d'intégration

### **Test 4 : Traduction complète CLIENT**
```typescript
Scénario : Traduire toutes les questions CLIENT

Étapes :
1. Ouvrir le composant TranslateClientWorkerProfiles
2. Noter le nombre de questions CLIENT affichées
3. Cliquer sur "Traduire avec Claude AI"
4. Confirmer la popup
5. Attendre la fin de la traduction
6. Vérifier le résultat

Vérifications :
✅ Toutes les 18 questions CLIENT sont traitées
✅ 22 langues par question = 396 traductions (18 × 22)
✅ Aucune erreur dans les logs
✅ Message de succès affiché
✅ Rechargement automatique proposé
```

**Commande de vérification (après traduction) :**
```sql
-- Dans Supabase SQL Editor
SELECT 
  COUNT(*) as total_translations,
  COUNT(DISTINCT text_id) as unique_questions,
  COUNT(DISTINCT lang_code) as languages
FROM translations
WHERE text_id IN (
  'q1_nom', 'q2_annee_client', 'q3_taille', 'q4_secteurs',
  'q7_exp_detachement', 'q8_pays_origine_client', 'q9_freins',
  'q10_delai', 'q12_budget_annuel', 'q13_difficulte',
  'q14_logiciel_rh', 'q15_postes_non_pourvus', 'q18_score',
  'q19_features_client', 'q20_prix_client', 
  'q21_budget_mensuel_client', 'q25_besoins', 'email'
);
```

**Résultat attendu :**
```
total_translations: ~396
unique_questions: 18
languages: 23 (FR + 22 autres)
```

---

### **Test 5 : Traduction complète WORKER**
```typescript
Scénario : Traduire toutes les questions WORKER

Étapes :
1. Même processus que Test 4
2. Mais pour le profil WORKER

Vérifications :
✅ Toutes les 15 questions WORKER sont traitées
✅ 22 langues par question = 330 traductions (15 × 22)
✅ Aucune erreur
✅ Success message
```

**Commande de vérification :**
```sql
SELECT 
  COUNT(*) as total_translations
FROM translations
WHERE text_id IN (
  'q1_nom', 'q2_nationalite', 'q2_age', 'q3_experience',
  'q4_metiers', 'q6_volume', 'q7_travail_etranger',
  'q8_pays_travailles', 'q9_satisfaction', 'q12_problemes_worker',
  'q13_freins_mobilite', 'q19_features_worker', 'q20_mobilite',
  'q21_attentes_plateforme', 'q25_besoins', 'email'
);
```

**Résultat attendu :**
```
total_translations: ~330
```

---

### **Test 6 : Gestion des doublons**
```typescript
Scénario : Vérifier que les questions partagées ne sont pas traduites 2 fois

Questions partagées entre CLIENT et WORKER :
- q1_nom (Nom)
- email (Email)
- consent_newsletter
- consent_contact
- q25_besoins (Besoins futurs)

Test :
1. Lancer traduction CLIENT
2. Attendre la fin
3. Lancer traduction WORKER
4. Vérifier que les questions partagées n'ont pas été retraduites

Vérification SQL :
SELECT text_id, lang_code, COUNT(*) as occurrences
FROM translations
WHERE text_id IN ('q1_nom', 'email', 'consent_newsletter', 'consent_contact', 'q25_besoins')
GROUP BY text_id, lang_code
HAVING COUNT(*) > 1;
```

**Résultat attendu :**
```
0 rows (aucun doublon)
```

---

## 🌍 Tests fonctionnels (Front-end)

### **Test 7 : Affichage dans le formulaire CLIENT**
```typescript
Scénario : Vérifier que les traductions s'affichent dans le formulaire

Étapes :
1. Aller sur la page d'accueil
2. Cliquer "Démarrer l'enquête"
3. Sélectionner profil : CLIENT
4. Changer la langue (menu en haut)
5. Vérifier l'affichage des questions

Langues à tester (prioritaires) :
✅ 🇬🇧 EN (English)
✅ 🇩🇪 DE (Deutsch)
✅ 🇪🇸 ES (Español)
✅ 🇮🇹 IT (Italiano)
✅ 🇵🇱 PL (Polski)

Pour chaque langue :
✅ Labels des questions traduits
✅ Placeholders traduits
✅ Options de réponse traduites
✅ Boutons (Suivant, Précédent) traduits
✅ Messages d'erreur traduits
✅ Barre de progression traduite
```

**Checklist par langue :**
```
🇬🇧 EN - English
[ ] q1_nom : "Your company name"
[ ] q3_taille : "Company size"
[ ] q4_secteurs : "Industry sectors"
[ ] Placeholder q1 : "e.g.: My Company Ltd"
[ ] Option taille : "1-9 employees"
[ ] Bouton : "Next"

🇩🇪 DE - Deutsch
[ ] q1_nom : "Name Ihres Unternehmens"
[ ] q3_taille : "Unternehmensgröße"
[ ] q4_secteurs : "Branchen"
[ ] Placeholder q1 : "z.B.: Mein Unternehmen GmbH"
[ ] Option taille : "1-9 Mitarbeiter"
[ ] Bouton : "Weiter"

🇪🇸 ES - Español
[ ] q1_nom : "Nombre de su empresa"
[ ] q3_taille : "Tamaño de la empresa"
[ ] q4_secteurs : "Sectores de actividad"
[ ] Placeholder q1 : "ej.: Mi Empresa SL"
[ ] Option taille : "1-9 empleados"
[ ] Bouton : "Siguiente"
```

---

### **Test 8 : Affichage dans le formulaire WORKER**
```typescript
Scénario : Même test que Test 7 mais pour profil WORKER

Questions spécifiques à vérifier :
✅ q2_nationalite : Nationalité
✅ q2_age : Âge
✅ q3_experience : Années d'expérience
✅ q4_metiers : Métiers exercés
✅ q7_travail_etranger : Travail à l'étranger
✅ q20_mobilite : Mobilité géographique
```

---

### **Test 9 : Navigation multilingue**
```typescript
Scénario : Changer de langue en cours de formulaire

Étapes :
1. Démarrer formulaire en FR
2. Remplir les 3 premières questions
3. Changer de langue → EN
4. Vérifier que :
   ✅ Les réponses sont conservées
   ✅ Les labels changent de langue
   ✅ La navigation fonctionne
5. Revenir en FR
6. Vérifier que tout est OK
```

---

## ⚠️ Tests d'erreurs

### **Test 10 : Clé API invalide**
```typescript
Scénario : Tester la gestion d'erreur si la clé Claude API est invalide

Étapes :
1. Modifier la clé API (mettre une fausse clé)
2. Lancer la traduction
3. Vérifier le message d'erreur

Résultat attendu :
✅ Message d'erreur clair
✅ Compteur d'erreurs s'incrémente
✅ Les traductions déjà faites ne sont pas perdues
✅ Possibilité de relancer
```

---

### **Test 11 : Connexion Internet coupée**
```typescript
Scénario : Simuler une perte de connexion

Étapes :
1. Démarrer la traduction
2. Après 5 questions, couper Internet (Dev Tools → Network → Offline)
3. Observer le comportement

Résultat attendu :
✅ Message d'erreur réseau
✅ Traductions déjà faites sont sauvegardées
✅ Possibilité de reprendre là où ça s'est arrêté
```

---

### **Test 12 : Rechargement de page pendant traduction**
```typescript
Scénario : Recharger la page pendant la traduction

Étapes :
1. Démarrer la traduction
2. Après 10 secondes, recharger la page (F5)
3. Relancer la traduction

Résultat attendu :
✅ Seules les traductions manquantes sont créées
✅ Pas de doublons
✅ Traduction reprend là où elle s'était arrêtée
```

---

## 📊 Tests de performance

### **Test 13 : Temps de traduction**
```typescript
Mesurer le temps total de traduction

Setup :
- 25 questions uniques
- 22 langues
- Total : ~550 traductions

Mesures :
⏱️ Temps moyen par question : ___ secondes
⏱️ Temps moyen par langue : ___ secondes
⏱️ Temps total : ___ minutes

Objectifs :
✅ < 5 secondes par question
✅ < 0.5 seconde par langue
✅ < 3 minutes au total
```

**Comment mesurer :**
```javascript
const startTime = Date.now();
// Lancer la traduction
// Attendre la fin
const endTime = Date.now();
const totalSeconds = (endTime - startTime) / 1000;
console.log(`Temps total: ${totalSeconds}s`);
console.log(`Temps par question: ${totalSeconds / 25}s`);
```

---

### **Test 14 : Utilisation mémoire**
```typescript
Vérifier que l'outil ne cause pas de fuite mémoire

Étapes :
1. Ouvrir Chrome DevTools → Performance
2. Démarrer l'enregistrement
3. Lancer la traduction
4. Attendre la fin
5. Arrêter l'enregistrement
6. Analyser

Vérifications :
✅ Pas de spike mémoire > 200MB
✅ Garbage collection fonctionne
✅ Pas de memory leak
```

---

## ✅ Checklist finale de validation

Avant de passer en production, vérifier :

### **Données**
- [ ] Toutes les questions CLIENT traduites (18 × 22 = 396)
- [ ] Toutes les questions WORKER traduites (15 × 22 = 330)
- [ ] Pas de doublons dans la base de données
- [ ] Status des traductions = 'auto-mcp'

### **Interface**
- [ ] Formulaire CLIENT fonctionne en 5+ langues
- [ ] Formulaire WORKER fonctionne en 5+ langues
- [ ] Sélecteur de langue fonctionne
- [ ] Traductions s'affichent correctement (pas de [object Object])

### **Performance**
- [ ] Temps de traduction < 3 minutes
- [ ] Pas de ralentissement de l'application
- [ ] Pas de memory leak

### **Erreurs**
- [ ] Gestion d'erreur API fonctionne
- [ ] Gestion d'erreur réseau fonctionne
- [ ] Logs d'erreur sont clairs et exploitables

### **Documentation**
- [ ] Guide utilisateur créé
- [ ] Changelog mis à jour
- [ ] Tests documentés

---

## 🎯 Critères de succès

Le système est considéré comme fonctionnel si :

1. ✅ **Complétude** : 100% des questions CLIENT et WORKER traduites
2. ✅ **Qualité** : Traductions lisibles et cohérentes
3. ✅ **Performance** : Traduction complète en < 3 minutes
4. ✅ **Fiabilité** : Taux d'erreur < 1%
5. ✅ **UX** : Formulaire multilingue fonctionnel

---

## 📝 Rapport de tests

**Date** : ___/___/_____  
**Testeur** : _______________  
**Version** : 2.1.0

### Résumé
- Tests réussis : ___ / 14
- Tests échoués : ___
- Bugs critiques : ___
- Bugs mineurs : ___

### Recommandations
_À compléter après les tests_

---

**Version** : 1.0  
**Dernière mise à jour** : 10 Décembre 2024
