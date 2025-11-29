# ⚡ Quick Reference - YoJob Market Study

> Guide rapide pour les développeurs maintenant le projet

---

## 🚨 Action Immédiate Requise

```bash
# 1. Exécuter cette migration SQL via Supabase Dashboard
/supabase/migrations/fix_questions_structure.sql

# 2. Vérifier : 3 rows inserted (q23_role, q24_evolution, q25_besoins)
```

📄 **Guide complet** : `/MIGRATION_SQL_GUIDE.md`

---

## 📂 Fichiers Principaux

| Fichier | Rôle | Modales |
|---------|------|---------|
| `/App.tsx` | Landing + Formulaire | - |
| `/DashboardApp.tsx` | Dashboard admin (container) | - |
| `/components/dashboard/QuestionManager.tsx` | CRUD questions | 2 ✅ |
| `/components/dashboard/LivePreview.tsx` | Aperçu question | Portal ✅ |
| `/components/dashboard/IntegrationManager.tsx` | Créer intégration | Portal ✅ |
| `/components/dashboard/IntegrationDetails.tsx` | Config intégration | Portal ✅ |
| `/components/dashboard/ExportManager.tsx` | Export résultats | Portal ✅ |
| `/components/dashboard/AIAnalysisPanel.tsx` | Analyse IA | Portal ✅ |
| `/supabase/functions/server/index.tsx` | Edge Function API | - |

---

## 🎨 Pattern Modale Standardisé

```tsx
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

export function MyModal({ onClose }: Props) {
  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999] 
                 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full"
      >
        {/* Contenu ici */}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
```

**Éléments obligatoires** :
- ✅ `createPortal(content, document.body)`
- ✅ `z-[99999]` (ne jamais utiliser z-50)
- ✅ `bg-black/80 backdrop-blur-lg`
- ✅ `stopPropagation` sur contenu

---

## 🎨 Design System YoJob

### Couleurs

```tsx
// Principales
const colors = {
  blueProfond: '#1E3A8A',  // Confiance
  cyan: '#06B6D4',         // Modernité
  violet: '#7C3AED',       // Premium
  vert: '#10B981',         // Succès
  orange: '#F59E0B'        // Attention
};
```

### Gradients

```css
/* Hero/Services */
bg-gradient-to-br from-blue-900 via-violet-600 to-cyan-500

/* Réseau EU */
bg-gradient-radial from-cyan-500/30 to-transparent
```

### Effets

```tsx
// Glassmorphism
className="bg-white/10 backdrop-blur-xl border border-white/20"

// Glow
className="shadow-[0_0_30px_rgba(6,182,212,0.5)]"

// Hover
whileHover={{ scale: 1.05, y: -8 }}
```

---

## 🔧 Commandes Utiles

### Développement

```bash
# Lancer le projet
npm run dev

# Build production
npm run build

# Linter
npm run lint

# Type check
npx tsc --noEmit
```

### Supabase

```bash
# Se connecter
supabase login

# Link au projet
supabase link --project-ref <project-id>

# Déployer Edge Function
supabase functions deploy make-server-10092a63

# Voir logs
supabase functions logs make-server-10092a63
```

---

## 🐛 Debugging Common Issues

### Modale sous le menu

❌ **Symptôme** : Menu latéral visible par-dessus modale  
✅ **Solution** : Utiliser React Portal + z-99999

```tsx
// ❌ Mauvais
<motion.div className="fixed inset-0 z-50">

// ✅ Bon
const modal = <motion.div className="fixed inset-0 z-[99999]">
return createPortal(modal, document.body);
```

### État modale vide

❌ **Symptôme** : Modale s'ouvre mais aucun contenu  
✅ **Solution** : Passer les props correctement

```tsx
// ❌ Mauvais
{showModal && <Modal />}

// ✅ Bon
{showModal && <Modal question={selectedQuestion} />}
```

### Supabase CORS Error

❌ **Symptôme** : CORS error dans console  
✅ **Solution** : Vérifier Edge Function

```tsx
// index.tsx
import { cors } from 'npm:hono/cors';

app.use('*', cors());
```

### TypeScript Errors

❌ **Symptôme** : Type errors sur imports  
✅ **Solution** : Vérifier paths

```tsx
// ❌ Mauvais
import { Button } from 'components/ui/button';

// ✅ Bon
import { Button } from './components/ui/button';
```

---

## 📊 Structure Base de Données

### Table : kv_store_10092a63

```sql
CREATE TABLE kv_store_10092a63 (
  key TEXT PRIMARY KEY,
  value JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Clés Principales

| Clé | Type | Description |
|-----|------|-------------|
| `questions` | Array | 25 questions du formulaire |
| `response_<id>` | Object | Réponse d'une agence |
| `anthropic_api_key` | String | Clé API Claude (chiffrée) |
| `integration_<id>` | Object | Config intégration |

---

## 🔐 Environnement Variables

### Required

```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # ⚠️ Never expose to frontend
```

### Optional

```bash
ANTHROPIC_API_KEY=sk-ant-xxx  # Stocké dans KV via UI
GOOGLE_OAUTH_CLIENT_ID=xxx
GOOGLE_OAUTH_CLIENT_SECRET=xxx
NOTION_OAUTH_CLIENT_ID=xxx
NOTION_OAUTH_CLIENT_SECRET=xxx
```

---

## 📚 Documentation Prioritaire

Lire dans cet ordre :

1. **`/🎉_README_FINAL.md`** - Vue d'ensemble (5 min)
2. **`/🚨_ACTION_REQUISE_MIGRATION.md`** - Action immédiate (2 min)
3. **`/Guidelines.md`** - Design system (30 min)
4. **`/REACT_PORTALS_GUIDE.md`** - Modales (20 min)
5. **`/✅_PROJET_STATUS_FINAL.md`** - État complet (15 min)

Total : ~1h15 de lecture pour maîtrise complète

---

## 🧪 Tests Checklist

Avant chaque déploiement :

- [ ] Landing page : Toutes sections visibles
- [ ] Formulaire : Soumission OK + Supabase
- [ ] Dashboard : 6 panneaux chargent
- [ ] Questions : CRUD + Drag&Drop
- [ ] Aperçu : Modal plein écran (menu invisible)
- [ ] Export : JSON + CSV + IA téléchargent
- [ ] Intégrations : Modales s'ouvrent (menu invisible)
- [ ] IA : Analyse génère (avec clé API)
- [ ] Responsive : Mobile + Tablet + Desktop
- [ ] Animations : 60fps, fluides

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add env variables in dashboard
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod

# 3. Add env variables
netlify env:set SUPABASE_URL=...
netlify env:set SUPABASE_ANON_KEY=...
```

---

## 💡 Tips & Best Practices

### Composants

✅ **DO** :
- Utiliser TypeScript strict
- Définir interfaces Props
- Séparer logique/présentation
- Nommer composants en PascalCase

❌ **DON'T** :
- Utiliser `any` sans raison
- Créer composants >500 lignes
- Dupliquer logique
- Oublier PropTypes/Interfaces

### Styling

✅ **DO** :
- Utiliser Tailwind classes
- Respecter palette YoJob
- Mobile-first responsive
- Animations subtiles

❌ **DON'T** :
- Utiliser font-size/weight/line-height Tailwind
- Couleurs hors palette
- Animations >1s
- z-index <1000 pour modales

### Performance

✅ **DO** :
- Lazy load images
- viewport={{ once: true }} pour Motion
- Memoize composants lourds
- Optimize re-renders

❌ **DON'T** :
- Charger toutes images d'un coup
- Animations infinies partout
- Re-renders inutiles
- Bloquer UI pendant calculs

---

## 🆘 Aide Rapide

### Problème : Build fail

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Problème : Types errors

```bash
# Regenerate types
npx tsc --noEmit
```

### Problème : Supabase connection

```bash
# Check credentials
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Test connection
curl $SUPABASE_URL/rest/v1/
```

### Problème : Modal z-index

```tsx
// Vérifier :
// 1. createPortal est importé
import { createPortal } from 'react-dom';

// 2. z-[99999] est utilisé
className="... z-[99999] ..."

// 3. Portal rend dans body
return createPortal(content, document.body);
```

---

## 📞 Resources

| Resource | URL | Usage |
|----------|-----|-------|
| Supabase Dashboard | [app.supabase.com](https://app.supabase.com) | DB + Auth + Storage |
| Tailwind Docs | [tailwindcss.com](https://tailwindcss.com) | Styling |
| Motion Docs | [motion.dev](https://motion.dev) | Animations |
| ShadCN UI | [ui.shadcn.com](https://ui.shadcn.com) | Components |
| Lucide Icons | [lucide.dev](https://lucide.dev) | Icons |

---

## ✅ Statut Actuel

**Version** : 1.0.0  
**Status** : ✅ 99% Complet - Production-Ready  
**Bugs** : 0 critiques  
**Modales** : 6/6 fixées avec Portals  
**Action** : ⚠️ Exécuter migration SQL  

---

_Mise à jour : 29 Novembre 2024_  
_Prochaine révision : Après migration SQL_
