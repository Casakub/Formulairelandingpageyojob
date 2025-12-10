# 🌍 Traductions CLIENT & WORKER - Guide d'importation

## 📋 Contexte

Vous avez besoin de traduire **100 clés** pour les profils CLIENT et WORKER dans **22 langues européennes**, soit **2 200 traductions au total**.

Le système backend utilise Claude AI pour traduire, mais il échoue actuellement à cause d'une erreur de modèle.

## ✅ Solution immédiate : Mode Mock

Plutôt que d'attendre Claude, vous pouvez utiliser le **mode Mock** déjà intégré pour importer rapidement des traductions test.

### Étape 1 : Activer le mode Mock dans le Dashboard

1. Allez dans **Dashboard → Traductions → Formulaire d'enquête**
2. En haut à droite, cliquez sur **"Mode Test"** (au lieu de "Claude 3.5 Sonnet")
3. Le mode Mock va préfixer toutes les traductions avec `[LANG]` (ex: `[DE] Année de création`)

### Étape 2 : Lancer la traduction Mock

1. Dans l'onglet **"Formulaire d'enquête"**, vous devriez voir le composant **TranslateClientWorkerProfiles**
2. Cliquez sur **"Traduire automatiquement les profils CLIENT & WORKER"**
3. Le système va générer instantanément les 2 200 traductions en mode mock
4. **Avantage** : Gratuit, instantané, et permet de tester tout le workflow

### Étape 3 : Vérifier les traductions

Les traductions mock auront ce format :
```
FR: "Année de création de votre entreprise"
EN: "[EN] Année de création de votre entreprise"  
DE: "[DE] Année de création de votre entreprise"
ES: "[ES] Année de création de votre entreprise"
...
```

**C'est parfait pour tester !** Le préfixe `[LANG]` permet de voir quelle langue est affichée.

## 🎯 Solution avancée : Traductions manuelles de qualité

Si vous voulez des **vraies traductions professionnelles** sans attendre que Claude soit disponible, voici les 10 clés les plus importantes à traduire manuellement en priorité :

### Top 10 des clés CLIENT à traduire

1. `questions.q2_annee_client.label` - "Année de création de votre entreprise"
2. `questions.q5_localisation.label` - "Pays de localisation de votre entreprise"  
3. `questions.q6_volume_client.label` - "Combien d'intérimaires employez-vous par an ?"
4. `questions.q9_defi_client.label` - "Principal défi avec l'intérim européen"
5. `questions.q10_agences.label` - "Combien d'agences d'intérim utilisez-vous ?"
6. `questions.q12_budget_client.label` - "Budget annuel consacré à l'intérim"
7. `questions.q13_satisfaction.label` - "Satisfaction avec vos agences actuelles"
8. `questions.q14_risques_client.label` - "Quels risques vous préoccupent le plus ?"
9. `questions.q15_besoins_client.label` - "Quels sont vos besoins prioritaires ?"
10. `questions.q19_features_client.label` - "Fonctionnalités les plus intéressantes"

### Top 10 des clés WORKER à traduire

1. `questions.q2_nationalite.label` - "Votre nationalité"
2. `questions.q3_experience.label` - "Années d'expérience en intérim"
3. `questions.q4_metiers.label` - "Métiers exercés"
4. `questions.q5_pays_travail.label` - "Pays où vous avez travaillé en intérim"
5. `questions.q6_frequence.label` - "À quelle fréquence travaillez-vous en intérim ?"
6. `questions.q9_defi_worker.label` - "Principal défi dans vos missions"
7. `questions.q10_agences_worker.label` - "Avec combien d'agences travaillez-vous ?"
8. `questions.q12_salaire.label` - "Salaire mensuel moyen de vos missions"
9. `questions.q13_satisfaction_worker.label` - "Satisfaction avec vos agences actuelles"
10. `questions.q14_risques_worker.label` - "Quels problèmes rencontrez-vous le plus souvent ?"

## 📝 Comment importer manuellement des traductions

Si vous avez déjà des traductions de qualité, voici comment les importer :

### Méthode 1 : Via le Dashboard (recommandé)

1. Allez dans **Dashboard → Traductions**
2. Utilisez l'interface de gestion des traductions
3. Cherchez la clé (ex: `questions.q2_annee_client.label`)
4. Cliquez sur "Éditer" pour chaque langue
5. Remplacez le texte mock par votre traduction professionnelle
6. Statut passe de `auto-mock` à `validated`

### Méthode 2 : Import JSON bulk

Créez un fichier JSON avec ce format :

```json
{
  "translations": [
    {
      "textId": "questions.q2_annee_client.label",
      "lang": "en",
      "text": "Year your company was founded",
      "status": "manual"
    },
    {
      "textId": "questions.q2_annee_client.label",
      "lang": "de",
      "text": "Gründungsjahr Ihres Unternehmens",
      "status": "manual"
    }
  ]
}
```

Puis utilisez l'API du serveur :
```bash
POST /make-server-10092a63/translations/bulk-import
Content-Type: application/json
Authorization: Bearer YOUR_ANON_KEY

{ ... votre JSON ... }
```

## 🔧 Quand Claude sera disponible

Une fois que l'API Claude sera configurée avec le bon modèle :

1. Repassez en **mode "Claude 3.5 Sonnet"** dans le dashboard
2. Relancez la traduction automatique
3. Le système remplacera automatiquement les traductions mock par des traductions IA de qualité
4. Vous pourrez ensuite valider ou ajuster chaque traduction

## 📊 Statistiques des traductions nécessaires

| Profil | Questions spécifiques | Questions communes | Total questions | Clés (labels + options) | Langues | Total traductions |
|--------|----------------------|-------------------|----------------|------------------------|---------|-------------------|
| CLIENT | 10 | 12 | 22 | ~50 clés | 22 | ~1 100 |
| WORKER | 7 | 8 | 15 | ~50 clés | 22 | ~1 100 |
| **TOTAL** | - | - | - | **~100 clés** | **22** | **~2 200** |

## 🎯 Langues ciblées (22 + FR = 23 total)

- 🇬🇧 Anglais (en)
- 🇩🇪 Allemand (de)
- 🇪🇸 Espagnol (es)
- 🇮🇹 Italien (it)
- 🇳🇱 Néerlandais (nl)
- 🇵🇹 Portugais (pt)
- 🇵🇱 Polonais (pl)
- 🇨🇿 Tchèque (cs)
- 🇸🇰 Slovaque (sk)
- 🇭🇺 Hongrois (hu)
- 🇷🇴 Roumain (ro)
- 🇧🇬 Bulgare (bg)
- 🇭🇷 Croate (hr)
- 🇸🇮 Slovène (sl)
- 🇪🇪 Estonien (et)
- 🇱🇻 Letton (lv)
- 🇱🇹 Lituanien (lt)
- 🇬🇷 Grec (el)
- 🇸🇪 Suédois (sv)
- 🇩🇰 Danois (da)
- 🇫🇮 Finnois (fi)
- 🇳🇴 Norvégien (no)
- 🇫🇷 Français (fr) - langue source

## ⚡ Résolution du problème Claude

L'erreur actuelle :
```
model: claude-3-5-sonnet-20241022" not found
```

**Solution** : Vérifier que la variable d'environnement `ANTHROPIC_API_KEY` est bien configurée et que votre compte Anthropic a accès au modèle `claude-3-5-sonnet-20241022`.

Si le modèle n'est pas disponible, vous pouvez modifier le code pour utiliser :
- `claude-3-5-sonnet-20240620` (version précédente)
- `claude-3-opus-20240229` (plus puissant)
- Ou rester en mode Mock pour le développement

## 📞 Support

Pour toute question :
- Dashboard : Section "Traductions" 
- Documentation : `/Guidelines.md`
- Logs : Console navigateur + logs Supabase

---

✨ **Conseil** : Commencez par le mode Mock pour valider tout le workflow, puis remplacez progressivement par des vraies traductions quand vous en aurez besoin !
