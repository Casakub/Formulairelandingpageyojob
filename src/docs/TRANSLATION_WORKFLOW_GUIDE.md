# 🔄 Workflow de traduction avancé - Guide complet

## 🎯 Vue d'ensemble

Ce guide détaille le **workflow de traduction avancé** intégré dans le CMS Landing Page YOJOB, permettant de gérer efficacement les traductions de 23 langues européennes avec support de l'IA.

---

## 📊 Architecture du système

### Composants créés

1. **Types et structures** (`/types/translationWorkflow.ts`)
   - Types de statuts avancés
   - Métadonnées de traduction
   - Helpers de calcul de progression

2. **Service IA** (`/services/aiTranslationService.ts`)
   - Abstraction pour providers IA (Claude, OpenAI, DeepL)
   - Mode MOCK pour les tests
   - Estimation des coûts

3. **Éditeur de traduction** (`/components/dashboard/TranslationEditor.tsx`)
   - Interface deux colonnes (source/cible)
   - Filtres et recherche
   - Gestion des statuts par clé

4. **Manager amélioré** (`/components/dashboard/LandingContentManager.tsx`)
   - Bloc B enrichi avec barres de progression
   - Intégration de l'éditeur
   - Gestion des métadonnées

---

## 🎨 Statuts de traduction

### Statuts au niveau global (langue)

| Statut | Description | Badge |
|--------|-------------|-------|
| `NOT_STARTED` | Langue non traduite | 🔴 Non traduit |
| `AI_PROPOSED` | Traductions proposées par l'IA, à valider | 🟣 Proposition IA |
| `IN_REVIEW` | En cours de révision manuelle | 🟡 En révision |
| `VALIDATED` | Traduction validée et prête | 🟢 Validé |

### Statuts au niveau clé (champ individuel)

Chaque clé de contenu (ex: `hero.title`, `services.subtitle`) possède son propre statut dans les métadonnées de traduction.

**Exemple** :
```typescript
{
  keyPath: "hero.title",
  status: "AI_PROPOSED",
  sourceText: "Votre partenaire pour recruter en Europe",
  targetText: "[DE] Votre partenaire pour recruter en Europe",
  aiProposedText: "Ihr Partner für Rekrutierung in Europa",
  characterLimit: 60
}
```

---

## 🚀 Workflow complet de traduction

### Scénario 1 : Traduire une nouvelle langue (ex: Allemand)

#### Étape 1 : Lancer la traduction IA

1. Dans le **Bloc B - Gestion des langues**, trouver **🇩🇪 Deutsch (de)**
2. Cliquer sur le bouton **"Traduire avec l'IA"**
3. Le système :
   - Appelle le service IA (actuellement en mode MOCK)
   - Génère automatiquement toutes les traductions depuis le français
   - Marque les clés traduites en statut `AI_PROPOSED`
   - Ouvre automatiquement l'éditeur de traduction

**Temps estimé** : 30 secondes (mode MOCK) / 2-3 minutes (avec IA réelle)

---

#### Étape 2 : Réviser les traductions dans l'éditeur

L'**éditeur de traduction** s'ouvre automatiquement avec :

**Header** :
- Langue cible : 🇩🇪 DE
- Progression : X / Y clés validées (Z%)
- Bouton "Sauvegarder" (actif si modifications)
- Bouton "Traduire tout avec l'IA" (pour retraduire)

**Filtres** :
- Recherche par nom de clé
- Filtrer par statut (Non traduit, Proposition IA, En révision, Validé)
- Filtrer par type (Titres, Sous-titres, CTAs, Meta tags, etc.)

**Organisation** :
- Clés groupées par section (hero, services, network, etc.)
- Affichage deux colonnes :
  - **Gauche** : Texte source (FR) - Lecture seule
  - **Droite** : Traduction (DE) - Éditable

---

#### Étape 3 : Éditer une clé

Pour chaque clé, l'interface affiche :

1. **Header de la clé** :
   - Badge de statut (AI_PROPOSED, IN_REVIEW, VALIDATED)
   - Chemin de clé (`hero.title`)
   - Type de champ (title, subtitle, cta, meta...)
   - Compteur de caractères (si limite définie)

2. **Contenu deux colonnes** :
   - Source (FR) : Texte source en lecture seule
   - Traduction (DE) : Champ éditable

3. **Proposition IA** (si disponible) :
   - Zone avec fond violet affichant la traduction proposée par l'IA
   - Bouton "Utiliser cette traduction" pour l'accepter

4. **Notes de révision** :
   - Champ optionnel pour ajouter des commentaires

5. **Actions de statut** :
   - Bouton "En révision" → Change le statut en `IN_REVIEW`
   - Bouton "Valider" → Change le statut en `VALIDATED`

**Workflow recommandé** :
1. Lire la source FR
2. Vérifier la proposition IA
3. Éditer si nécessaire
4. Cliquer sur "Valider" ✅

---

#### Étape 4 : Utiliser les filtres

**Cas d'usage** : "Je veux réviser uniquement les CTAs et Meta tags"

1. Dans le sélecteur "Filtrer par type", choisir **"CTAs"**
2. L'éditeur n'affiche que les clés de type CTA
3. Réviser et valider
4. Changer le filtre pour **"Meta tags"**
5. Réviser les meta titles et descriptions
6. Vérifier les limites de caractères (60 pour title, 160 pour description)

**Cas d'usage** : "Je veux voir uniquement les propositions IA non encore révisées"

1. Dans le sélecteur "Filtrer par statut", choisir **"Proposition IA"**
2. Réviser toutes les propositions une par une
3. Les valider ou les passer "En révision"

---

#### Étape 5 : Sauvegarder

1. Cliquer sur le bouton **"Sauvegarder"** en haut à droite
2. Le système :
   - Recalcule les statistiques (X clés validées / Y total)
   - Met à jour le pourcentage de complétion
   - Ferme l'éditeur
   - Retourne au Bloc B avec progression mise à jour

**Indicateur de progression** (dans le Bloc B) :
```
🇩🇪 Deutsch (de)
Statut : 🟡 En révision
Progression : 78%
[████████████░░░░] 156 / 200 clés
```

---

### Scénario 2 : Retraduire une langue existante (ex: Anglais)

#### Cas d'usage : "Je veux retraduire certaines sections EN avec l'IA"

1. Dans le **Bloc B**, trouver **🇬🇧 English (en)**
2. Cliquer sur **"Ouvrir l'éditeur"**
3. Dans l'éditeur, cliquer sur **"Traduire tout avec l'IA"** (en haut)
4. Confirmation : "Voulez-vous vraiment retraduire toutes les clés ?"
5. L'IA génère de nouvelles propositions
6. Les propositions remplacent le statut existant par `AI_PROPOSED`
7. Réviser section par section

**Alternative** : Traduction partielle
- Filtrer par section (ex: "Hero")
- Sélectionner manuellement les clés à retraduire
- Cliquer sur un bouton "Traduire la sélection avec l'IA" (feature future)

---

### Scénario 3 : Éditer manuellement une traduction validée

#### Cas d'usage : "Je dois corriger un terme dans la version allemande"

1. Aller dans le **Bloc B**, trouver **🇩🇪 Deutsch**
2. Cliquer sur **"Ouvrir l'éditeur"**
3. Utiliser la **recherche** pour trouver la clé (ex: "hero.title")
4. Éditer le texte dans la colonne de droite
5. Le statut passe automatiquement de `VALIDATED` à `IN_REVIEW`
6. Ajouter une note de révision (optionnel) : "Correction terminologique"
7. Re-valider en cliquant sur **"Valider"**
8. Sauvegarder

---

## 🎨 Interface du Bloc B (amélioré)

### Vue d'ensemble

Pour chaque langue, le Bloc B affiche maintenant :

```
┌──────────────────────────────────────────────┐
│ 🇩🇪  Deutsch                                  │
│     German (de)                               │
│                                               │
│  🟡 En révision                               │
│                                               │
│  Progression              78%                 │
│  [████████████░░░░]                           │
│  156 / 200 clés    [12 IA]                   │
│                                               │
│  [Ouvrir l'éditeur]  [🪄 IA]                 │
└──────────────────────────────────────────────┘
```

### Éléments

1. **Flag + Nom** : 🇩🇪 Deutsch
2. **Nom anglais + code** : German (de)
3. **Badge de statut** : Couleur selon statut global
4. **Barre de progression** : Visuelle + pourcentage
5. **Compteur de clés** : "156 / 200 clés"
6. **Badge IA** (si applicable) : "[12 IA]" = 12 propositions IA en attente
7. **Actions** :
   - Bouton **"Ouvrir l'éditeur"** (si langue existe)
   - Bouton **"IA"** (pour (re)traduire)

---

## 🤖 Service de traduction IA

### Configuration actuelle (MOCK)

Par défaut, le système utilise un **provider MOCK** pour les tests :

```typescript
// /services/aiTranslationService.ts
export const aiTranslationService = new AITranslationService({
  provider: 'mock', // Mode test
});
```

Le mode MOCK :
- Simule un délai de 2 secondes
- Préfixe les traductions par `[DE]`, `[ES]`, etc.
- Génère des propositions factices
- Ajoute des warnings ("This is a MOCK translation")

---

### Migration vers une IA réelle (Claude)

#### Étape 1 : Obtenir une clé API

1. Créer un compte sur https://console.anthropic.com
2. Générer une API Key
3. Copier la clé

#### Étape 2 : Configurer dans le CMS

```typescript
// /services/aiTranslationService.ts
export const aiTranslationService = new AITranslationService({
  provider: 'claude',
  apiKey: process.env.ANTHROPIC_API_KEY, // Depuis env
  model: 'claude-3-sonnet-20240229',
  timeout: 30000,
});
```

#### Étape 3 : Implémenter la méthode `translateWithClaude`

La méthode est déjà structurée avec :
- Construction du prompt optimisé
- Appel à l'API Claude (à décommenter)
- Parsing de la réponse JSON

**Prompt utilisé** :
```
You are a professional translator specializing in B2B SaaS content.

Task: Translate from FR to DE.

Instructions:
- Adapt culturally, not literal
- Tone: professional
- Preserve {{variables}}
- Keep same text length for UI elements
- Respect character limits (title: 60, description: 160)
- Do not translate brand names like "YOJOB"

Source content (JSON): {...}

Return ONLY valid JSON with translated content.
```

#### Étape 4 : Tester

1. Traduire une langue test (ex: DE)
2. Vérifier la qualité des traductions
3. Ajuster le prompt si nécessaire
4. Monitorer les coûts avec `estimateTranslationCost()`

---

### Estimation des coûts

Le système fournit une estimation avant traduction :

```typescript
import { estimateTranslationCost } from '../../services/aiTranslationService';

const sourceFR = landingContent.fr;
const { estimatedTokens, estimatedCostUSD } = estimateTranslationCost(sourceFR);

console.log(`Tokens: ~${estimatedTokens}`);
console.log(`Coût estimé: ~${estimatedCostUSD} USD`);
```

**Exemple** pour le contenu FR complet :
- Tokens estimés : ~2000
- Coût Claude Sonnet : ~$0.036 USD par traduction
- Pour 22 langues : ~$0.79 USD total

---

## 📝 Métadonnées de traduction

### Structure

Les métadonnées sont stockées en mémoire (cache local) :

```typescript
{
  languageCode: 'de',
  overallStatus: 'IN_REVIEW',
  completionPercentage: 78,
  totalKeys: 200,
  validatedKeys: 156,
  aiProposedKeys: 12,
  inReviewKeys: 32,
  notStartedKeys: 0,
  lastUpdated: '2024-12-07T23:00:00Z',
  keys: {
    'hero.title': {
      keyPath: 'hero.title',
      fieldType: 'title',
      status: 'VALIDATED',
      sourceText: 'Votre partenaire pour recruter en Europe',
      targetText: 'Ihr Partner für Rekrutierung in Europa',
      characterLimit: 60,
      lastModified: '2024-12-07T22:30:00Z'
    },
    // ... 199 autres clés
  }
}
```

### Persistance (TODO)

**Actuellement** : Métadonnées en mémoire uniquement (perdues au refresh)

**Future implémentation** :
1. Table Supabase `translation_metadata`
2. Sauvegarde automatique après chaque modification
3. Chargement au démarrage du CMS

```sql
CREATE TABLE translation_metadata (
  id uuid PRIMARY KEY,
  language_code varchar(5),
  key_path varchar(200),
  status varchar(20),
  source_text text,
  target_text text,
  ai_proposed_text text,
  character_limit int,
  last_modified timestamp,
  review_notes text
);
```

---

## 🎯 Bonnes pratiques

### Pour les traducteurs

1. **Toujours partir de la source FR**
   - Le français est la langue de référence
   - Toutes les traductions doivent être cohérentes avec FR

2. **Vérifier les propositions IA**
   - Ne jamais valider automatiquement
   - Lire attentivement chaque traduction
   - Adapter culturellement si nécessaire

3. **Respecter les limites de caractères**
   - CTAs : ~30 caractères
   - Meta titles : 60 caractères
   - Meta descriptions : 160 caractères
   - Le système affiche un warning si dépassement

4. **Utiliser les notes de révision**
   - Documenter les choix de traduction
   - Signaler les termes métier
   - Indiquer les adaptations culturelles

5. **Workflow de validation**
   - Traduction IA → `AI_PROPOSED`
   - Révision manuelle → `IN_REVIEW`
   - Validation finale → `VALIDATED`

---

### Pour les développeurs

1. **Ne jamais modifier directement les contenus**
   - Toujours passer par l'interface CMS
   - Les fichiers `/content/landing/*.ts` sont générés

2. **Respecter les types TypeScript**
   - Utiliser `TranslationWorkflowStatus` (pas `TranslationStatus`)
   - Utiliser les helpers fournis (`initializeLanguageTranslationMeta`, etc.)

3. **Tester avec le provider MOCK**
   - Ne pas consommer de crédits API pendant le dev
   - Passer en mode `claude` uniquement en production

4. **Monitorer les performances**
   - Traduction complète : 2-3 minutes
   - Révision manuelle : 20-30 minutes par langue
   - Utiliser les filtres pour optimiser le workflow

---

## 🔧 Configuration avancée

### Adapter le prompt IA

Modifier `/services/aiTranslationService.ts` :

```typescript
private buildClaudePrompt(request: AITranslationRequest): string {
  const { sourceLang, targetLang, tone } = request;

  return `Vous êtes un traducteur professionnel B2B SaaS.

Tâche : Traduire de ${sourceLang} vers ${targetLang}.

Ton : ${tone || 'professionnel et rassurant'}
Style : Clair, direct, orienté bénéfices client

Règles strictes :
- Adapter culturellement (pas littéral)
- Préserver les {{variables}}
- Respecter les longueurs (CTA ≤ 30 car., Meta title ≤ 60, Meta desc ≤ 160)
- Ne PAS traduire "YOJOB"
- Utiliser le vouvoiement en DE, ES, IT
- Utiliser le tutoiement en NL

Contenu source :
${JSON.stringify(request.sourceContent, null, 2)}

Réponse attendue : JSON valide uniquement.`;
}
```

---

### Ajouter un nouveau provider IA

1. Implémenter la méthode `translateWithXXX` :

```typescript
private async translateWithOpenAI(request: AITranslationRequest): Promise<AITranslationResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'You are a professional B2B SaaS translator.',
      }, {
        role: 'user',
        content: this.buildOpenAIPrompt(request),
      }],
    }),
  });

  const data = await response.json();
  return this.parseOpenAIResponse(data, request.targetLang);
}
```

2. Ajouter la condition dans `translateContent` :

```typescript
if (this.config.provider === 'openai') {
  return this.translateWithOpenAI(request);
}
```

---

## 📊 Statistiques et monitoring

### Tableau de bord (future feature)

Ajouter une page **"Translation Dashboard"** avec :

- **Vue globale** :
  - Graphique en barres : % de complétion par langue
  - Graphique circulaire : Répartition des statuts
  - Tableau : Temps moyen de traduction par langue

- **Alertes** :
  - Langues à <50% de complétion
  - Propositions IA en attente >7 jours
  - Traductions en révision >14 jours

- **Historique** :
  - Log des traductions IA effectuées
  - Log des validations
  - Log des modifications manuelles

---

## 🚀 Roadmap

### Version 1.1 (en cours)
- ✅ Types de workflow avancés
- ✅ Service IA avec abstraction
- ✅ Éditeur deux colonnes
- ✅ Bloc B enrichi avec progression
- ⏳ Persistance Supabase
- ⏳ Intégration Claude API réelle

### Version 1.2 (à venir)
- Preview en temps réel (split-screen)
- Comparaison côte à côte (FR vs langue cible)
- Export des traductions (Excel, CSV, JSON)
- Import de traductions externes
- Historique des versions (rollback)

### Version 1.3 (roadmap)
- Workflow d'approbation multi-niveaux
- Commentaires collaboratifs
- Assignation de traducteurs
- Notifications par email
- Intégration Slack

---

## 📞 Support

### Questions fréquentes

**Q : Puis-je traduire sans IA ?**  
R : Oui, cliquez sur "Ouvrir l'éditeur" et éditez manuellement chaque clé.

**Q : Combien coûte une traduction IA ?**  
R : ~$0.036 USD avec Claude Sonnet. Utilisez `estimateTranslationCost()` pour une estimation.

**Q : Puis-je modifier une traduction validée ?**  
R : Oui, elle passera en statut `IN_REVIEW`. Re-validez après modification.

**Q : Comment sauvegarder mes traductions ?**  
R : Cliquez sur "Sauvegarder" dans l'éditeur. (Actuellement en mémoire, DB à venir)

**Q : Puis-je annuler une traduction IA ?**  
R : Oui, ne validez pas les propositions et ré-éditez manuellement.

---

**Version du guide** : 1.0  
**Dernière mise à jour** : 7 décembre 2024  
**Auteur** : Équipe YOJOB Dev
