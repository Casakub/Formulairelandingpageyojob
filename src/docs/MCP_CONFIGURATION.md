# 🤖 Configuration MCP (Model Context Protocol)

## Vue d'ensemble

Le système MCP permet de générer des traductions automatiques via **Claude AI** (Anthropic) avec un contrôle fin sur le comportement de l'IA.

---

## ✅ Activation de MCP

### 1. Activer le mode MCP

1. Aller dans **Dashboard** → **Traductions**
2. Cliquer sur l'onglet **MCP IA**
3. Activer le switch **"Activer MCP IA"**

### 2. Configurer les paramètres avancés

1. Une fois MCP activé, cliquer sur **"Paramètres avancés"**
2. Une fenêtre modale s'ouvre avec tous les réglages

---

## ⚙️ Paramètres disponibles

### 🤖 Modèle Claude

Choisissez le modèle d'IA à utiliser :

| Modèle | Description | Usage recommandé |
|--------|-------------|------------------|
| **Claude 3.5 Sonnet** | Équilibre qualité/vitesse | ✅ **Recommandé** pour traductions |
| **Claude 3 Opus** | Plus puissant, plus lent | Traductions complexes/créatives |
| **Claude 3 Haiku** | Plus rapide, moins précis | Brouillons rapides |

**Défaut** : `claude-3-5-sonnet-20241022`

---

### 🌡️ Température (0.0 - 1.0)

Contrôle la créativité vs précision de l'IA.

```
0.0 ────────── 0.3 ────────── 0.5 ────────── 0.8 ────────── 1.0
Déterministe   Précis        Équilibré      Créatif        Imprévisible
```

**Recommandations** :
- **0.0 - 0.3** : Traductions techniques, précises, répétables ✅
- **0.4 - 0.6** : Équilibre pour textes marketing
- **0.7 - 1.0** : Créativité maximale (déconseillé pour traductions)

**Défaut** : `0.3` (précis et cohérent)

---

### 📏 Tokens maximum

Limite la longueur des réponses de l'IA.

**Conversion approximative** :
- 100 tokens ≈ 75 mots
- 500 tokens ≈ 375 mots
- 1000 tokens ≈ 750 mots
- 2000 tokens ≈ 1500 mots

**Recommandations** :
- Questions courtes (< 20 mots) : 200-500 tokens
- Questions moyennes (20-50 mots) : 500-1000 tokens
- Questions longues (> 50 mots) : 1000-2000 tokens

**Défaut** : `1000 tokens`

---

### 🪟 Fenêtre de contexte

Nombre de questions précédentes envoyées à l'IA pour maintenir la cohérence terminologique.

```
1 question  → Traduction isolée (pas de contexte)
3 questions → Contexte léger (cohérence basique)
5 questions → Contexte moyen (cohérence inter-questions) ✅
10 questions → Contexte large (cohérence maximale)
```

**Avantages du contexte** :
- ✅ Cohérence terminologique (même traduction pour mêmes termes)
- ✅ Ton et style uniformes
- ✅ Respect du vocabulaire métier

**Inconvénients** :
- ⚠️ Plus de tokens consommés (coût API)
- ⚠️ Légèrement plus lent

**Défaut** : `5 questions` (bon équilibre)

---

### ⚡ Mode batch (par lots)

Traiter plusieurs questions en une seule requête API.

**Activé** (recommandé) :
- ✅ Plus de cohérence entre traductions
- ✅ Moins de requêtes API (économie)
- ✅ Plus rapide globalement
- ⚠️ Timeout possible si trop de questions

**Désactivé** :
- ⚠️ Chaque question = 1 requête séparée
- ⚠️ Moins de cohérence
- ✅ Pas de risque de timeout

**Défaut** : `Activé`

---

### ✅ Validation automatique

Marquer les traductions générées comme **"Validé"** au lieu de **"Auto-MCP"**.

**Activé** :
- ✅ Traductions directement validées (gain de temps)
- ⚠️ Pas de relecture manuelle (risque d'erreurs)

**Désactivé** (recommandé) :
- ✅ Traductions marquées "Auto-MCP" pour relecture
- ✅ Validation manuelle obligatoire
- ✅ Qualité garantie

**Défaut** : `Désactivé` (sécurité)

---

### 📝 Préserver le formatage

Conserver la ponctuation, majuscules et structure du texte source.

**Activé** (recommandé) :
- ✅ Structure identique à l'original
- ✅ Ponctuation préservée
- ✅ Majuscules/minuscules respectées

**Désactivé** :
- ⚠️ L'IA peut reformuler librement
- ⚠️ Structure potentiellement différente

**Défaut** : `Activé`

---

### 💬 Prompt personnalisé

Instructions additionnelles pour guider le style et le ton des traductions.

**Exemples** :

```
Utilise un ton professionnel et formel.
Privilégie le vocabulaire du recrutement et de l'intérim.
Adapte les expressions idiomatiques au contexte local.
```

```
Garde un style direct et concis.
Utilise le vouvoiement en français, allemand, italien.
Utilise le tutoiement en espagnol, portugais uniquement.
```

```
Évite le jargon technique.
Préfère des formulations simples et claires.
Adapte les exemples au contexte européen.
```

**Défaut** : Vide (pas d'instructions custom)

---

## 🎯 Configurations recommandées

### Configuration "Production" (qualité maximale)

```
Modèle: Claude 3.5 Sonnet
Température: 0.3
Max Tokens: 1000
Contexte: 5 questions
Mode batch: Activé
Auto-validate: Désactivé ✅
Préserver formatage: Activé
Prompt custom: 
  "Utilise un ton professionnel adapté au recrutement.
   Privilégie la clarté et la précision.
   Adapte les expressions au contexte local."
```

### Configuration "Rapide" (brouillons)

```
Modèle: Claude 3 Haiku
Température: 0.5
Max Tokens: 500
Contexte: 1 question
Mode batch: Désactivé
Auto-validate: Désactivé
Préserver formatage: Activé
Prompt custom: Vide
```

### Configuration "Créative" (marketing)

```
Modèle: Claude 3 Opus
Température: 0.7
Max Tokens: 2000
Contexte: 10 questions
Mode batch: Activé
Auto-validate: Désactivé
Préserver formatage: Désactivé
Prompt custom:
  "Adapte le message marketing au ton et culture locale.
   Sois créatif dans les formulations.
   Garde l'impact émotionnel du message original."
```

---

## 💾 Sauvegarde des paramètres

Les paramètres MCP sont sauvegardés **localement** dans le navigateur (localStorage).

### Avantages
✅ Pas besoin de reconfigurer à chaque session  
✅ Paramètres conservés même après refresh

### Limitations
⚠️ Paramètres liés au navigateur (pas synchronisés entre devices)  
⚠️ Effacés si vous videz le cache du navigateur

### Réinitialisation
Cliquez sur **"Réinitialiser"** pour revenir aux valeurs par défaut.

---

## 🚀 Utilisation pratique

### Workflow complet

1. **Activer MCP** dans l'onglet "MCP IA"
2. **Configurer les paramètres** via "Paramètres avancés"
3. **Sauvegarder** les paramètres
4. **Aller dans "Questions"** pour traduire
5. **Sélectionner une question** à traduire
6. **Cliquer sur "Générer avec MCP"** (bouton à implémenter dans Sprint 2)
7. **Relire la traduction** proposée
8. **Valider ou modifier** selon besoin
9. **Sauvegarder** dans Supabase

---

## 🔐 Sécurité & Coûts

### API Key Anthropic

Pour utiliser MCP, vous devez fournir une clé API Anthropic.

**Comment obtenir** :
1. Créer un compte sur https://console.anthropic.com
2. Générer une API key
3. La stocker dans variable d'environnement `ANTHROPIC_API_KEY`

**Coûts** (tarifs Anthropic) :
- Claude 3.5 Sonnet : ~$3 / 1M tokens input, ~$15 / 1M tokens output
- Claude 3 Opus : ~$15 / 1M tokens input, ~$75 / 1M tokens output
- Claude 3 Haiku : ~$0.25 / 1M tokens input, ~$1.25 / 1M tokens output

**Estimation pour YOJOB** :
- 25 questions × 10 langues = 250 traductions
- Moyenne 50 mots/question = ~70 tokens/traduction
- Total : ~17,500 tokens ≈ $0.05 avec Sonnet

---

## 🐛 Dépannage

### "Paramètres avancés ne s'ouvrent pas"

✅ **Vérifié et corrigé !** Le bouton ouvre maintenant une modale complète.

### "Paramètres non sauvegardés"

- Vérifiez la console (F12) pour logs
- Vérifiez que localStorage n'est pas désactivé
- Essayez de réinitialiser et sauvegarder à nouveau

### "Traductions MCP non générées"

⏳ **Sprint 2** : L'intégration backend MCP sera finalisée dans le prochain sprint.  
Pour l'instant, les paramètres sont configurables mais la génération n'est pas encore active.

---

## 📚 Documentation liée

- [TRANSLATIONS_SUPABASE.md](TRANSLATIONS_SUPABASE.md) - Architecture backend
- [TRANSLATIONS_QUICKSTART.md](TRANSLATIONS_QUICKSTART.md) - Guide utilisateur
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Tests

---

## 🔮 Roadmap v2.0

### Sprint 2 - Intégration complète MCP

- [ ] Bouton "Générer avec MCP" dans QuestionTranslation
- [ ] Appel backend `/auto-translate` avec paramètres MCP
- [ ] Affichage de la traduction générée dans l'éditeur
- [ ] Bouton "Accepter" / "Modifier" / "Rejeter"
- [ ] Batch generation (toutes les langues d'un coup)
- [ ] Indicateur de progression (X/Y traductions générées)
- [ ] Estimation du coût API en temps réel

---

**Version** : 1.1.0  
**Statut** : ✅ Configuration UI implémentée  
**Prochaine étape** : Intégration backend (Sprint 2)  
**Équipe** : YOJOB Dev
