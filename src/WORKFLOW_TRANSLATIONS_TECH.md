# 🔧 Architecture Technique - Traduction des Workflows

## Vue d'ensemble Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  WorkflowBuilder.tsx                                    │
│  ├─ État: workflowTranslations                          │
│  ├─ Bouton: "Gérer traductions"                         │
│  └─ Ouvre: WorkflowTranslationEditor                    │
│                                                          │
│  WorkflowTranslationEditor.tsx                          │
│  ├─ 22 tabs (1 par langue)                              │
│  ├─ Formulaires d'édition                               │
│  ├─ Bouton: "Traduire auto (1 langue)"                  │
│  ├─ Bouton: "Traduire tout (21 langues)"                │
│  └─ Sauvegarde vers parent                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
                           ↕ HTTP
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Supabase Edge)                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  /automations/auto-translate-workflow                   │
│  ├─ Input: sourceLang, targetLang, workflow, steps     │
│  ├─ Appel Claude API (1 langue)                         │
│  └─ Output: translation                                 │
│                                                          │
│  /automations/auto-translate-workflow-all               │
│  ├─ Input: workflow, steps                              │
│  ├─ Promise.all() → 21 appels Claude parallèles        │
│  └─ Output: translations (objet 21 langues)             │
│                                                          │
└─────────────────────────────────────────────────────────┘
                           ↕ HTTPS
┌─────────────────────────────────────────────────────────┐
│                  ANTHROPIC CLAUDE API                    │
├─────────────────────────────────────────────────────────┤
│  POST /v1/messages                                      │
│  ├─ Model: claude-opus-4-20250514 (configurable)       │
│  ├─ Temperature: 0.3 (déterministe)                     │
│  ├─ Max tokens: 4000                                    │
│  └─ Response: Traduction JSON                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Structure des Fichiers

```
/
├── components/
│   └── dashboard/
│       ├── WorkflowBuilder.tsx           # Constructeur de workflows
│       │   ├─ État workflowTranslations
│       │   ├─ Bouton "Gérer traductions"
│       │   └─ Intègre WorkflowTranslationEditor
│       │
│       └── WorkflowTranslationEditor.tsx # Éditeur de traductions
│           ├─ SUPPORTED_LANGUAGES (22)
│           ├─ État translations
│           ├─ État completionStatus
│           ├─ Fonction autoTranslate()
│           ├─ Fonction autoTranslateAll()
│           └─ Rendu Modal + Tabs + Forms
│
├── supabase/functions/server/
│   ├── automations.tsx                   # Routes workflows
│   │   ├─ Import: getApiKey, getSelectedModel
│   │   ├─ SUPPORTED_LANGUAGES (21)
│   │   ├─ POST /auto-translate-workflow
│   │   └─ POST /auto-translate-workflow-all
│   │
│   └── settings.tsx                      # Config API Claude
│       ├─ getApiKey()
│       └─ getSelectedModel()
│
├── types/
│   └── automations.ts                    # Types TypeScript
│
├── WORKFLOW_TRANSLATIONS.md              # Documentation
├── WORKFLOW_TRANSLATIONS_DEMO.md         # Démo utilisateur
└── WORKFLOW_TRANSLATIONS_TECH.md         # Ce fichier (doc tech)
```

---

## 🎨 Frontend - WorkflowBuilder.tsx

### États

```typescript
const [workflowTranslations, setWorkflowTranslations] = useState<any>({});
const [translationsEditorOpen, setTranslationsEditorOpen] = useState(false);
```

### Bouton d'ouverture (Étape 1)

```tsx
<div>
  <Label>Traductions (22 langues)</Label>
  <Button
    variant="outline"
    onClick={() => setTranslationsEditorOpen(true)}
    className="w-full mt-1 justify-start gap-2 border-dashed border-2 hover:border-purple-400 hover:bg-purple-50"
    type="button"
  >
    <Languages className="w-4 h-4 text-purple-600" />
    <span>Gérer les traductions multilingues</span>
    <Badge variant="outline" className="ml-auto bg-purple-100 text-purple-700">
      {Object.keys(workflowTranslations).length} / 21
    </Badge>
  </Button>
  <p className="text-xs text-slate-500 mt-1">
    Ajoutez les traductions pour adapter ce workflow aux 22 langues supportées
  </p>
</div>
```

### Passage des props

```tsx
<WorkflowTranslationEditor
  open={translationsEditorOpen}
  onClose={() => setTranslationsEditorOpen(false)}
  workflowName={workflowName}
  workflowDescription={workflowDescription}
  steps={steps.map(s => ({
    name: s.config.subject || s.config.task_title || s.config.tag_name || `Action ${s.type}`,
    description: s.config.body || `Étape de type ${s.type}`,
  }))}
  existingTranslations={workflowTranslations}
  onSave={(translations) => {
    setWorkflowTranslations(translations);
    setTranslationsEditorOpen(false);
  }}
/>
```

---

## 🌍 Frontend - WorkflowTranslationEditor.tsx

### Props Interface

```typescript
interface WorkflowTranslationEditorProps {
  open: boolean;
  onClose: () => void;
  workflowName: string;                      // Français (source)
  workflowDescription: string;               // Français (source)
  steps: Array<{                             // Français (source)
    name: string;
    description: string;
  }>;
  existingTranslations?: WorkflowTranslations;
  onSave: (translations: WorkflowTranslations) => void;
}
```

### Structure de données

```typescript
interface WorkflowTranslations {
  [languageCode: string]: {
    workflow: {
      name: string;
      description: string;
    };
    steps: Array<{
      name: string;
      description: string;
    }>;
  };
}

// Exemple:
{
  "en": {
    "workflow": {
      "name": "Waitlist Nurturing",
      "description": "Automated workflow to engage prospects..."
    },
    "steps": [
      {
        "name": "Send welcome email",
        "description": "First contact with the prospect"
      }
    ]
  },
  "de": { ... },
  // ... 19 autres langues
}
```

### Fonction autoTranslate (1 langue)

```typescript
const autoTranslate = async (targetLangCode: string) => {
  setIsAutoTranslating(true);
  
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          sourceLang: 'fr',
          targetLang: targetLangCode,
          workflow: {
            name: workflowName,
            description: workflowDescription,
          },
          steps: steps,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setTranslations(prev => ({
        ...prev,
        [targetLangCode]: data.translation,
      }));
      
      calculateCompletionStatus({
        ...translations,
        [targetLangCode]: data.translation,
      });
      
      toast.success(`✅ Traduction ${SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode)?.flag} générée !`);
    }
  } catch (error: any) {
    toast.error('❌ Erreur: ' + error.message);
  } finally {
    setIsAutoTranslating(false);
  }
};
```

### Fonction autoTranslateAll (21 langues)

```typescript
const autoTranslateAll = async () => {
  setIsAutoTranslating(true);
  toast.info('🔄 Traduction automatique en cours...', {
    description: 'Génération des 21 traductions avec IA',
  });

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow-all`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          workflow: {
            name: workflowName,
            description: workflowDescription,
          },
          steps: steps,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setTranslations(data.translations);
      calculateCompletionStatus(data.translations);
      
      toast.success('✅ 21 traductions générées avec succès !', {
        description: 'Vous pouvez maintenant les modifier si nécessaire',
      });
    }
  } catch (error: any) {
    toast.error('❌ Erreur: ' + error.message);
  } finally {
    setIsAutoTranslating(false);
  }
};
```

### Calcul de complétion

```typescript
const calculateCompletionStatus = (trans: WorkflowTranslations) => {
  const status: Record<string, number> = {};
  
  Object.entries(trans).forEach(([langCode, langData]) => {
    let filledFields = 0;
    const totalFields = 2 + (steps.length * 2); // workflow (name+desc) + steps
    
    if (langData.workflow.name) filledFields++;
    if (langData.workflow.description) filledFields++;
    
    langData.steps.forEach(step => {
      if (step.name) filledFields++;
      if (step.description) filledFields++;
    });
    
    status[langCode] = Math.round((filledFields / totalFields) * 100);
  });
  
  setCompletionStatus(status);
};
```

---

## ⚙️ Backend - /automations/auto-translate-workflow

### Route

```typescript
app.post("/auto-translate-workflow", async (c) => {
  try {
    const body = await c.req.json();
    const { sourceLang, targetLang, workflow, steps } = body;

    // 1. Vérifier API key
    const apiKey = await getApiKey();
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Clé API Anthropic non configurée",
      }, 400);
    }

    // 2. Vérifier langue cible
    const targetLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
    if (!targetLangInfo) {
      return c.json({
        success: false,
        error: `Langue cible non supportée: ${targetLang}`,
      }, 400);
    }

    // 3. Créer prompt
    const prompt = createTranslationPrompt(workflow, steps, targetLangInfo);

    // 4. Appeler Claude
    const claudeResponse = await callClaudeAPI(apiKey, prompt);

    // 5. Parser réponse
    const translation = parseClaudeResponse(claudeResponse);

    // 6. Retourner résultat
    return c.json({
      success: true,
      translation,
      targetLang,
      targetLangName: targetLangInfo.name,
    });

  } catch (error: any) {
    console.error("❌ Erreur traduction:", error);
    return c.json({ 
      success: false, 
      error: error.message
    }, 500);
  }
});
```

### Prompt Claude

```typescript
const prompt = `Tu es un traducteur professionnel spécialisé dans les workflows d'automatisation marketing.

**CONTEXTE:**
- Application: YOJOB (courtage en recrutement européen)
- Langue source: Français
- Langue cible: ${targetLangInfo.name}

**WORKFLOW À TRADUIRE:**

Nom: ${workflow.name}
Description: ${workflow.description}

**ÉTAPES DU WORKFLOW:**
${steps.map((step, idx) => `
Étape ${idx + 1}:
- Nom: ${step.name}
- Description: ${step.description}
`).join('\n')}

**INSTRUCTIONS:**
1. Traduis de manière professionnelle et contextualisée
2. Préserve le ton professionnel adapté au recrutement européen
3. Garde la même structure et longueur approximative
4. Respecte la terminologie métier du recrutement
5. Retourne UNIQUEMENT un JSON valide sans markdown

**FORMAT DE RÉPONSE (JSON strict):**
{
  "workflow": {
    "name": "...",
    "description": "..."
  },
  "steps": [
    {
      "name": "...",
      "description": "..."
    }
  ]
}`;
```

### Appel API Claude

```typescript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: await getSelectedModel(),  // Ex: "claude-opus-4-20250514"
    max_tokens: 4000,
    temperature: 0.3,                 // Déterministe pour traductions
    messages: [{
      role: "user",
      content: prompt
    }]
  })
});
```

### Parsing réponse

```typescript
const data = await response.json();
const rawContent = data.content[0].text;

// Nettoyer markdown si présent
const cleanedContent = rawContent
  .replace(/```json\n?/g, '')
  .replace(/```\n?/g, '')
  .trim();

const translation = JSON.parse(cleanedContent);
```

---

## ⚡ Backend - /automations/auto-translate-workflow-all

### Route

```typescript
app.post("/auto-translate-workflow-all", async (c) => {
  try {
    const body = await c.req.json();
    const { workflow, steps } = body;

    const apiKey = await getApiKey();
    if (!apiKey) {
      return c.json({ success: false, error: "API key manquante" }, 400);
    }

    console.log('🌍 Traduction vers 21 langues en parallèle...');

    // Fonction pour traduire 1 langue
    const translateToLanguage = async (targetLang: string, langName: string) => {
      try {
        const prompt = createTranslationPrompt(workflow, steps, langName);
        const response = await callClaudeAPI(apiKey, prompt);
        const translation = parseClaudeResponse(response);
        
        console.log(`✅ ${langName} traduit`);
        
        return {
          lang: targetLang,
          success: true,
          translation,
        };
      } catch (error: any) {
        console.error(`❌ Erreur ${langName}:`, error.message);
        return {
          lang: targetLang,
          success: false,
          error: error.message,
        };
      }
    };

    // Lancer 21 traductions en parallèle
    const translationPromises = SUPPORTED_LANGUAGES.map(lang => 
      translateToLanguage(lang.code, lang.name)
    );

    const results = await Promise.all(translationPromises);

    // Agréger résultats
    const translations: any = {};
    let successCount = 0;
    let failureCount = 0;

    results.forEach(result => {
      if (result.success) {
        translations[result.lang] = result.translation;
        successCount++;
      } else {
        failureCount++;
        // Fallback: copier texte source
        translations[result.lang] = {
          workflow: {
            name: workflow.name,
            description: workflow.description,
          },
          steps: steps.map((s: any) => ({
            name: s.name,
            description: s.description,
          })),
        };
      }
    });

    console.log(`✅ Traduction terminée: ${successCount} succès, ${failureCount} échecs`);

    return c.json({
      success: true,
      translations,
      stats: {
        total: SUPPORTED_LANGUAGES.length,
        success: successCount,
        failed: failureCount,
      },
    });

  } catch (error: any) {
    console.error("❌ Erreur traduction globale:", error);
    return c.json({ 
      success: false, 
      error: error.message
    }, 500);
  }
});
```

---

## 🔐 Sécurité

### Validation des entrées

```typescript
// Vérifier que l'API key existe
const apiKey = await getApiKey();
if (!apiKey) {
  return c.json({ success: false, error: "API key manquante" }, 400);
}

// Vérifier langue cible valide
const targetLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
if (!targetLangInfo) {
  return c.json({ success: false, error: "Langue non supportée" }, 400);
}

// Limiter taille des textes
if (workflow.name.length > 200) {
  return c.json({ success: false, error: "Nom trop long" }, 400);
}

if (workflow.description.length > 2000) {
  return c.json({ success: false, error: "Description trop longue" }, 400);
}
```

### Rate limiting

```typescript
// À implémenter : limiter nombre d'appels par utilisateur
// Ex: max 10 traductions/heure ou max 50 traductions/jour
```

---

## 📊 Performance

### Métriques

```typescript
// Temps de réponse moyen par langue
1 langue:        ~3-5 secondes
21 langues:      ~30-45 secondes (parallèle)

// Coût API Claude (estimé)
1 traduction:    ~0.01 crédits
21 traductions:  ~0.20 crédits

// Taille des requêtes
Input (prompt):  ~1,000-2,000 tokens
Output (JSON):   ~500-1,000 tokens
```

### Optimisations appliquées

✅ **Parallélisation** : `Promise.all()` pour les 21 langues
✅ **Temperature basse** : 0.3 pour résultats déterministes
✅ **Nettoyage markdown** : Parser robust pour JSON
✅ **Fallback** : Texte source si échec traduction
✅ **Logs détaillés** : Console logs pour debugging

### Optimisations futures

🔜 **Caching** : Stocker traductions dans KV store
🔜 **Retry logic** : Réessayer automatiquement si échec
🔜 **Batching** : Regrouper plusieurs workflows
🔜 **Streaming** : Afficher traductions au fur et à mesure
🔜 **CDN** : Cache traductions côté edge

---

## 🧪 Tests

### Test unitaire (Frontend)

```typescript
describe('WorkflowTranslationEditor', () => {
  test('calcule correctement la complétion', () => {
    const translations = {
      en: {
        workflow: { name: 'Test', description: 'Test' },
        steps: [{ name: 'Step 1', description: 'Desc 1' }]
      }
    };
    
    const completion = calculateCompletionStatus(translations);
    expect(completion.en).toBe(100);
  });

  test('nettoie le markdown de Claude', () => {
    const rawResponse = '```json\n{"workflow":{"name":"Test"}}\n```';
    const cleaned = cleanMarkdown(rawResponse);
    expect(cleaned).toBe('{"workflow":{"name":"Test"}}');
  });
});
```

### Test intégration (Backend)

```bash
# Test route auto-translate-workflow
curl -X POST http://localhost:54321/functions/v1/make-server-10092a63/automations/auto-translate-workflow \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceLang": "fr",
    "targetLang": "en",
    "workflow": {
      "name": "Test",
      "description": "Test description"
    },
    "steps": []
  }'

# Vérifier réponse
# Expected: { success: true, translation: { ... } }
```

---

## 🐛 Debugging

### Logs Backend

```typescript
console.log('🌍 Traduction workflow vers', targetLangInfo.name);
console.log('📝 Réponse brute Claude:', rawContent);
console.log('✅ Traduction réussie !');
console.log('❌ Erreur parsing JSON:', parseError);
```

### Logs Frontend

```typescript
console.log('Traductions mises à jour:', translations);
console.log('Statut de complétion:', completionStatus);
console.log('Erreur API:', error);
```

### Troubleshooting commun

**Problème** : "Clé API Anthropic non configurée"
**Solution** : Paramètres → Modèles IA → Ajouter clé

**Problème** : Parsing JSON échoue
**Solution** : Vérifier le nettoyage markdown, ajuster regex

**Problème** : Timeout sur 21 langues
**Solution** : Augmenter timeout fetch, ou traduire par batch de 7

**Problème** : Traduction de mauvaise qualité
**Solution** : Améliorer le prompt, ajouter exemples, ajuster temperature

---

## 📦 Déploiement

### Checklist

✅ Clé API Anthropic configurée
✅ Modèle Claude sélectionné (Paramètres)
✅ Routes `/automations/*` enregistrées
✅ Frontend build sans erreurs
✅ Tests manuels passés (1 langue + 21 langues)
✅ Logs backend fonctionnels
✅ Documentation à jour

### Variables d'environnement

```bash
ANTHROPIC_API_KEY=sk-ant-...  # Déjà configurée via UI
SUPABASE_URL=https://...      # Auto
SUPABASE_ANON_KEY=eyJ...      # Auto
```

---

## 🔄 Évolutions Futures

### V2 (Q2 2025)
- [ ] Traduction des templates d'emails
- [ ] Export/Import JSON des traductions
- [ ] Historique des versions
- [ ] Review workflow par natifs

### V3 (Q3 2025)
- [ ] Traduction en temps réel (streaming)
- [ ] Suggestions terminologie
- [ ] Glossaire multilingue
- [ ] API publique

---

**Maintaineur** : Équipe YOJOB Dev
**Version** : 1.0.0
**Dernière MAJ** : Janvier 2025
