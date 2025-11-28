# 📋 TODO - Ce qu'il reste à implémenter

## 🎯 État Actuel du Projet

### ✅ CE QUI EST FAIT (100% Fonctionnel)

#### 1. **Formulaire Public Complet** ✅
- 6 sections (25 questions)
- Hero section animée
- Progress bar
- Validation des champs
- Inputs personnalisés (RadioCard, MultiSelect, ScoreSelector)
- Écran de confirmation
- Design YOJOB (gradients, glassmorphism, animations Motion)
- **⚠️ MAIS** : Les données vont uniquement en `console.log` !

#### 2. **Dashboard Admin Complet** ✅
- Vue d'ensemble (overview)
- Gestionnaire de questions (drag & drop, CRUD)
- Export/Import (JSON, Supabase)
- Intégrations (Webhooks, OAuth, n8n, etc.)
- **NOUVEAU** : Onglet Résultats avec analyse
- Paramètres
- **⚠️ MAIS** : Fonctionne avec mock data uniquement !

#### 3. **Système d'Administration** ✅
- Login admin (`yojob2024`)
- ResultsOverview (stats, graphiques, tableau)
- ExportManager (JSON, CSV, Format IA)
- AIAnalysisPanel (analyse stratégique complète)
- **⚠️ MAIS** : Mock data de 5 réponses seulement !

#### 4. **Context & Configuration** ✅
- QuestionsContext (gestion centralisée)
- Configuration questions (`/config/questions.ts`)
- Types TypeScript complets

---

## ❌ CE QUI MANQUE (Pour Production)

### 🔴 CRITIQUE (Nécessaire pour MVP)

#### 1. **Connexion Backend - Supabase** 🔥
**Statut** : NON IMPLÉMENTÉ  
**Priorité** : 🔴 CRITIQUE  
**Temps estimé** : 2-3 heures

**À faire** :
```typescript
// 1. Créer la table Supabase
CREATE TABLE market_research_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  response_id VARCHAR(20) UNIQUE,
  
  -- Section 1: Profil
  q1_nom VARCHAR(255),
  q2_annee VARCHAR(50),
  q3_taille VARCHAR(50),
  q4_secteurs JSONB,
  
  -- Section 2: Détachement
  q5_pays VARCHAR(100),
  q6_volume VARCHAR(50),
  q7_origine VARCHAR(255),
  q8_destinations TEXT,
  q9_defi VARCHAR(255),
  q9_autre TEXT,
  q10_gestion VARCHAR(255),
  q11_incidents TEXT,
  
  -- Section 3: Besoins
  q12_budget VARCHAR(50),
  q13_manque_gagner TEXT,
  q14_risques TEXT,
  q15_probleme TEXT,
  q16_erp VARCHAR(255),
  q16_autre TEXT,
  q17_migration VARCHAR(50),
  
  -- Section 4: Intérêt
  q18_score INTEGER,
  q19_features JSONB,
  q20_prix VARCHAR(50),
  q21_budget_mensuel VARCHAR(50),
  q22_mvp VARCHAR(50),
  q23_concurrent VARCHAR(255),
  
  -- Section 5: Vision
  q24_evolution TEXT,
  q25_besoins TEXT,
  
  -- Section 6: Contact
  email VARCHAR(255),
  autorise_contact BOOLEAN,
  souhaite_rapport BOOLEAN,
  
  -- Metadata
  country VARCHAR(100),
  sector VARCHAR(100),
  company_size INTEGER,
  detachment_experience VARCHAR(50),
  interest_level VARCHAR(50),
  
  -- Tracking
  ip_address INET,
  user_agent TEXT,
  completion_time INTEGER, -- en secondes
  referrer TEXT
);

// 2. Modifier handleSubmit dans App.tsx
const handleSubmit = async () => {
  setIsSubmitting(true);
  
  try {
    const { data, error } = await supabase
      .from('market_research_responses')
      .insert([{
        response_id: `YJ-2025-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
        ...formData,
        // Metadata enrichie
        country: extractCountry(formData.q5_pays),
        sector: formData.q4_secteurs[0], // Secteur principal
        company_size: parseInt(formData.q3_taille) || 0,
        detachment_experience: formData.q6_volume === 'Pas encore' ? 'Non' : 'Oui',
        interest_level: formData.q18_score >= 8 ? 'Très intéressé' : 'Intéressé',
        completion_time: Math.floor((Date.now() - startTime) / 1000)
      }]);
    
    if (error) throw error;
    
    setCurrentSection(7); // Confirmation
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Erreur lors de l\'envoi. Veuillez réessayer.');
  } finally {
    setIsSubmitting(false);
  }
};

// 3. Modifier ResultsOverview pour utiliser vraies données
const { data: responses, error } = await supabase
  .from('market_research_responses')
  .select('*')
  .order('created_at', { ascending: false });
```

**Fichiers à modifier** :
- `/App.tsx` (handleSubmit)
- `/components/dashboard/ResultsOverview.tsx` (remplacer mockResponses)
- Créer `/lib/supabase.ts` pour le client

---

#### 2. **Bouton d'Accès Admin** 🔥
**Statut** : NON IMPLÉMENTÉ  
**Priorité** : 🔴 CRITIQUE  
**Temps estimé** : 30 minutes

**À faire** :
```typescript
// Option 1 : Bouton caché dans le Header du formulaire
// /components/survey/Header.tsx

// Ajouter un bouton discret (triple clic ou keystroke)
const [clickCount, setClickCount] = useState(0);

useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      window.location.href = '/?mode=admin';
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);

// Option 2 : URL directe
// Modifier App.tsx pour détecter le query param
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'admin') {
    setViewMode('dashboard');
  }
}, []);

// Option 3 : Bouton visible dans le footer (DEV only)
{process.env.NODE_ENV === 'development' && (
  <Button onClick={() => setViewMode('dashboard')}>
    Admin Dashboard
  </Button>
)}
```

**Fichiers à modifier** :
- `/App.tsx` (détection URL)
- `/components/survey/Header.tsx` (bouton caché) OU
- Créer un composant `/components/AdminAccess.tsx`

---

#### 3. **Email de Distribution du Formulaire** 🟡
**Statut** : NON IMPLÉMENTÉ  
**Priorité** : 🟡 IMPORTANT (mais pas bloquant pour MVP)  
**Temps estimé** : 4-6 heures

**À faire** :
- Créer template email HTML
- Système de tracking (liens uniques par agence)
- Intégration Resend/SendGrid/Brevo
- Dashboard envois (qui a ouvert, qui a répondu)

**Peut être fait APRÈS le MVP** : Vous pouvez d'abord envoyer manuellement le lien.

---

#### 4. **Intégration IA Réelle (Claude/GPT)** 🟡
**Statut** : SIMULÉ  
**Priorité** : 🟡 IMPORTANT  
**Temps estimé** : 2-3 heures

**À faire** :
```typescript
// /components/dashboard/AIAnalysisPanel.tsx

const handleAnalyzeWithMCP = async () => {
  setIsAnalyzing(true);
  
  try {
    // Option 1 : Via MCP (recommandé)
    const tools = await discover_tools({
      query: "AI analysis, Claude, GPT",
      user_intent: "Analyze market research data",
      max_results: 10
    });
    
    const claudeTool = tools.find(t => t.name.includes('claude'));
    
    const result = await run_mcp_tool({
      tool_name: claudeTool.name,
      tool_input: {
        prompt: generatePrompt(responses, stats),
        max_tokens: 4000
      },
      serverId: claudeTool.metadata.serverId,
      serverLogoUrl: claudeTool.metadata.serverLogoUrl,
      serverName: claudeTool.metadata.serverName
    });
    
    setAnalysis(result.content);
    
  } catch (error) {
    // Option 2 : Fallback sur API directe
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: generatePrompt(responses, stats)
        }]
      })
    });
    
    const data = await response.json();
    setAnalysis(data.content[0].text);
  } finally {
    setIsAnalyzing(false);
  }
};
```

**Fichiers à modifier** :
- `/components/dashboard/AIAnalysisPanel.tsx`
- Ajouter variables d'environnement

**Coût estimé** : ~$0.05 par analyse (Claude 3.5 Sonnet)

---

### 🟢 NICE TO HAVE (Améliorations)

#### 5. **Analytics & Tracking** 🟢
**Statut** : NON IMPLÉMENTÉ  
**Priorité** : 🟢 BONUS

**À faire** :
- PostHog / Mixpanel pour tracking
- Taux de complétion par section
- Temps moyen par question
- Taux d'abandon

**Temps estimé** : 1-2 heures

---

#### 6. **Multi-langue (FR/EN)** 🟢
**Statut** : NON IMPLÉMENTÉ (seulement FR actuellement)  
**Priorité** : 🟢 BONUS

**À faire** :
- i18n (react-i18next)
- Traduction de toutes les questions
- Sélecteur de langue
- Détection automatique (browser locale)

**Temps estimé** : 3-4 heures

---

#### 7. **Tests Automatisés** 🟢
**Statut** : NON IMPLÉMENTÉ  
**Priorité** : 🟢 BONUS

**À faire** :
- Tests unitaires (Vitest)
- Tests d'intégration (Playwright)
- Tests E2E du formulaire
- CI/CD (GitHub Actions)

**Temps estimé** : 6-8 heures

---

#### 8. **Performance Optimizations** 🟢
**Statut** : PARTIEL  
**Priorité** : 🟢 BONUS

**À faire** :
- Lazy loading des sections
- Code splitting
- Image optimization
- Bundle analysis
- Lighthouse score > 90

**Temps estimé** : 2-3 heures

---

## 🚀 Plan d'Action Recommandé

### Sprint 1 : MVP Fonctionnel (1-2 jours)

**Jour 1 - Matin** : Connexion Supabase
- [ ] Créer table Supabase
- [ ] Modifier handleSubmit pour envoyer à Supabase
- [ ] Tester soumission complète
- [ ] Vérifier données dans Supabase

**Jour 1 - Après-midi** : Dashboard avec vraies données
- [ ] Modifier ResultsOverview pour fetch Supabase
- [ ] Remplacer mock data
- [ ] Tester filtres avec vraies données
- [ ] Ajouter bouton d'accès admin

**Jour 2 - Matin** : Intégration IA
- [ ] Créer compte Anthropic/OpenAI
- [ ] Obtenir API key
- [ ] Implémenter appel API dans AIAnalysisPanel
- [ ] Tester analyse avec vraies données

**Jour 2 - Après-midi** : Tests & Déploiement
- [ ] Tests manuels end-to-end
- [ ] Fix bugs
- [ ] Déployer sur Vercel/Netlify
- [ ] Tester en production

---

### Sprint 2 : Distribution (Optionnel - 2-3 jours)

**Jour 3** : Système d'emailing
- [ ] Créer template email HTML
- [ ] Intégrer Resend/SendGrid
- [ ] Générer liens uniques
- [ ] Dashboard tracking envois

**Jour 4-5** : Améliorations
- [ ] Analytics (PostHog)
- [ ] Multi-langue
- [ ] Performance optimizations
- [ ] Documentation finale

---

## 📊 Résumé Visuel

```
┌─────────────────────────────────────────────────────┐
│             ÉTAT ACTUEL DU PROJET                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ Formulaire Public (100%)                        │
│     └─ ⚠️ Envoie à console.log uniquement          │
│                                                     │
│  ✅ Dashboard Admin (100%)                          │
│     └─ ⚠️ Fonctionne avec mock data                │
│                                                     │
│  ✅ Système Résultats (100%)                        │
│     └─ ⚠️ 5 réponses fictives seulement            │
│                                                     │
│  ✅ Analyse IA (100%)                               │
│     └─ ⚠️ Analyse simulée (template)               │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│            CE QU'IL FAUT IMPLÉMENTER                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔴 Connexion Supabase (2-3h)                       │
│     ├─ Créer table                                  │
│     ├─ Modifier handleSubmit                        │
│     └─ Fetch vraies données dans ResultsOverview    │
│                                                     │
│  🔴 Bouton Admin (30min)                            │
│     └─ URL ?mode=admin ou keystroke                │
│                                                     │
│  🟡 IA Réelle (2-3h)                                │
│     ├─ API Key Claude/GPT                           │
│     └─ Remplacer mock analysis                      │
│                                                     │
│  🟡 Emailing (4-6h) - OPTIONNEL                     │
│     └─ Peut être fait manuellement au début         │
│                                                     │
│  🟢 Analytics (1-2h) - BONUS                        │
│  🟢 Multi-langue (3-4h) - BONUS                     │
│  🟢 Tests (6-8h) - BONUS                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Pour Lancer DEMAIN

**Minimum Viable Product** :

1. **Connexion Supabase** (2-3h)
2. **Bouton Admin** (30min)
3. **Tester** (1h)
4. **Déployer** (30min)

**Total** : ~4-5 heures de travail

**Résultat** :
- ✅ Formulaire fonctionnel qui stocke en DB
- ✅ Dashboard admin accessible
- ✅ Analyse des résultats (avec vraies données)
- ✅ Export fonctionnel
- ⚠️ Analyse IA encore simulée (à faire après)

---

## 💰 Coûts Mensuels Estimés (Production)

- **Supabase** : €0 (Free tier jusqu'à 500 MB + 2 GB transfer)
- **Vercel/Netlify** : €0 (Free tier)
- **Claude API** : ~€10-50/mois (selon usage)
- **Resend Email** : €0 (Free tier 3,000 emails/mois)
- **PostHog Analytics** : €0 (Free tier 1M events/mois)

**Total** : €10-50/mois max

---

## ❓ Questions Critiques

### 1. Voulez-vous implémenter Supabase MAINTENANT ?
- ✅ **OUI** → Je crée le système de connexion Supabase
- ❌ **NON** → Je peux créer un autre système de stockage

### 2. Comment voulez-vous distribuer le formulaire ?
- **Option A** : URL publique simple (exemple.com/etude-marche)
- **Option B** : Emails avec liens uniques trackés
- **Option C** : Les deux

### 3. Analyse IA : Budget disponible ?
- **Option A** : API payante (Claude/GPT) = meilleure qualité
- **Option B** : Garder simulée pour l'instant
- **Option C** : MCP (si vous avez déjà un serveur MCP configuré)

---

**Voulez-vous que je commence par la connexion Supabase ? C'est la priorité #1 pour avoir un système fonctionnel !** 🚀
