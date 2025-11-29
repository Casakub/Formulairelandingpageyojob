# 🚪 Guide Complet : React Portals

## 🎯 Qu'est-ce qu'un React Portal ?

Un **React Portal** est une fonctionnalité de React qui permet de rendre un composant enfant dans un nœud DOM qui existe **en dehors** de la hiérarchie DOM du composant parent.

### Analogie Simple

Imaginez un **téléporteur** :
- Votre composant est créé dans un fichier React (ex: `LivePreview.tsx`)
- Au lieu de l'afficher à l'endroit habituel dans le DOM
- Le Portal le "téléporte" vers un autre endroit (ex: `document.body`)

```
Composant Parent     →  [PORTAL]  →     Autre endroit du DOM
    (logique)                            (rendu visuel)
```

---

## 📚 API React Portal

### Import

```tsx
import { createPortal } from 'react-dom';
```

### Syntaxe

```tsx
createPortal(child, container, key?)
```

**Paramètres** :
- `child` : Le JSX/React element à rendre (votre composant)
- `container` : Le nœud DOM cible où rendre le composant
- `key?` : Optionnel, pour identifier le Portal (si plusieurs)

### Exemple Basique

```tsx
import { createPortal } from 'react-dom';

function MyModal() {
  return createPortal(
    <div className="modal">
      <h1>Je suis dans le body !</h1>
    </div>,
    document.body
  );
}
```

**Résultat dans le DOM** :

```html
<body>
  <div id="root">
    <!-- Votre app React normale -->
  </div>
  
  <!-- Le Portal est rendu ICI -->
  <div class="modal">
    <h1>Je suis dans le body !</h1>
  </div>
</body>
```

---

## 🔍 Cas d'Usage Typiques

### 1. Modales et Dialogs

**Problème** : Une modale dans un container avec `overflow: hidden` sera coupée.

**Solution** : Rendre la modale dans `document.body` avec un Portal.

```tsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### 2. Tooltips

**Problème** : Un tooltip dans un container scrollable peut être coupé.

**Solution** : Portal vers `document.body` pour qu'il flotte librement.

```tsx
function Tooltip({ text, position }) {
  return createPortal(
    <div className="tooltip" style={position}>
      {text}
    </div>,
    document.body
  );
}
```

### 3. Dropdowns et Menus Contextuels

**Problème** : Un dropdown dans un petit container sera rogné.

**Solution** : Portal pour qu'il s'affiche au-dessus de tout.

```tsx
function Dropdown({ items, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <ul className="dropdown">
      {items.map(item => <li key={item.id}>{item.label}</li>)}
    </ul>,
    document.body
  );
}
```

### 4. Notifications / Toasts

**Problème** : Les notifications doivent être visibles partout dans l'app.

**Solution** : Portal vers un container fixe dans `document.body`.

```tsx
function NotificationContainer() {
  return createPortal(
    <div className="notifications-container">
      {/* Notifications ici */}
    </div>,
    document.body
  );
}
```

---

## 🎨 Le Problème du Stacking Context

### Qu'est-ce qu'un Stacking Context ?

Un **stacking context** est un groupe d'éléments qui sont ordonnés ensemble sur l'axe Z (profondeur).

**Important** : Le `z-index` fonctionne **relativement** au stacking context, pas de manière absolue.

### Exemple du Problème

```html
<div> <!-- Stacking Context Root -->
  <div style="z-index: 50"> Sidebar </div>
  
  <div style="z-index: 10"> Main Content
    <div style="z-index: 9999"> Modal </div>
    <!--
      Même avec z-9999, la modal est dans le contexte de "Main Content" (z-10)
      Elle ne peut donc JAMAIS dépasser le Sidebar (z-50)
    -->
  </div>
</div>
```

**Résultat** : La modal à z-9999 apparaît **sous** le Sidebar à z-50 !

### Solution avec Portal

```tsx
function Modal() {
  const modalContent = (
    <div style={{ zIndex: 9999 }}>
      Modal
    </div>
  );
  
  return createPortal(modalContent, document.body);
}
```

**Résultat DOM** :

```html
<div> <!-- Stacking Context Root -->
  <div style="z-index: 50"> Sidebar </div>
  <div style="z-index: 10"> Main Content </div>
</div>

<!-- Portal rend ICI -->
<div style="z-index: 9999"> Modal </div>
<!-- Maintenant la modal est au même niveau que le root,
     son z-9999 surpasse bien le z-50 du Sidebar -->
```

✅ **La modal est maintenant au-dessus du Sidebar !**

---

## 🛠️ Implémentation Complète

### Exemple : LivePreview avec Portal

**Fichier** : `/components/dashboard/LivePreview.tsx`

```tsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface LivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LivePreview({ isOpen, onClose }: LivePreviewProps) {
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="p-8"
        >
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl">
            <h2>Aperçu de la Modale</h2>
            <p>Cette modale est rendue via un Portal !</p>
            <button onClick={onClose}>Fermer</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Render using Portal to escape the dashboard layout hierarchy
  return createPortal(modalContent, document.body);
}
```

### Points Clés

1. **Structure conditionnelle** : `if (!isOpen) return null;` avant le Portal
2. **Variable intermédiaire** : `const modalContent = (...)` pour clarté
3. **Portal à la fin** : `return createPortal(modalContent, document.body);`
4. **Z-index élevé** : `z-[99999]` pour garantir la visibilité
5. **Fixed positioning** : `fixed inset-0` pour couvrir tout l'écran
6. **Overlay cliquable** : `onClick={onClose}` sur le fond
7. **Stop propagation** : `onClick={(e) => e.stopPropagation()}` sur le contenu

---

## ⚡ Performance et Optimisations

### Le Portal ne Clone Pas

**Idée fausse** : "Le Portal copie le composant"

**Réalité** : Le Portal **déplace** logiquement le composant dans le DOM, il ne le clone pas.

**Impact** :
- ✅ Aucune surcharge mémoire
- ✅ Les refs fonctionnent normalement
- ✅ Le state est préservé
- ✅ Les effets de lifecycle sont normaux

### Animations avec Portal

Les animations (Motion, Transition) fonctionnent **parfaitement** avec les Portals.

```tsx
return createPortal(
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
  >
    {children}
  </motion.div>,
  document.body
);
```

### Re-renders

Un Portal ne cause **pas** de re-renders supplémentaires. Il se comporte exactement comme un composant normal.

---

## 🎯 Bonnes Pratiques

### 1. Toujours vérifier `isOpen` avant le Portal

```tsx
// ✅ BON
if (!isOpen) return null;
return createPortal(modalContent, document.body);

// ❌ MAUVAIS
return createPortal(
  isOpen ? modalContent : null,
  document.body
);
```

**Raison** : Éviter de créer un Portal vide dans le DOM.

### 2. Nettoyer le DOM avec `useEffect`

Si vous créez un container personnalisé pour le Portal :

```tsx
function Modal() {
  const [container] = useState(() => {
    const div = document.createElement('div');
    div.id = 'modal-root';
    return div;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(<div>Modal</div>, container);
}
```

### 3. Z-index cohérent

Définir une hiérarchie de z-index :

```tsx
// constants/zIndex.ts
export const Z_INDEX = {
  MODAL: 99999,
  TOOLTIP: 100000,
  DROPDOWN: 90000,
  SIDEBAR: 50,
  CONTENT: 10,
  BASE: 0
};

// Usage
className={`fixed inset-0 z-[${Z_INDEX.MODAL}]`}
```

### 4. Accessibility (a11y)

Gérer le focus et l'échappement :

```tsx
import { useEffect } from 'react';

function Modal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    // Trap focus
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>,
    document.body
  );
}
```

### 5. Désactiver le scroll du body

Empêcher le scroll de la page en arrière-plan :

```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }
}, [isOpen]);
```

---

## 🐛 Debugging des Portals

### Inspecter le DOM

Ouvrir les DevTools :
1. Aller dans l'onglet **Elements**
2. Chercher directement dans `<body>`
3. Le Portal sera rendu à côté de `<div id="root">`

### React DevTools

Les Portals apparaissent normalement dans React DevTools :

```
<DashboardApp>
  <Sidebar />
  <Main>
    <LivePreview>  ← Le composant est ici logiquement
      <Portal>     ← Mais rendu ailleurs physiquement
```

### Console Logging

```tsx
useEffect(() => {
  console.log('Portal rendered in:', document.body);
}, []);
```

---

## 📊 Comparaison : Avec vs Sans Portal

| Aspect | Sans Portal | Avec Portal |
|--------|-------------|-------------|
| **Position DOM** | Dans le parent | Dans `document.body` |
| **Stacking context** | ⚠️ Limité au parent | ✅ Indépendant |
| **Z-index** | ⚠️ Relatif | ✅ Absolu |
| **Overflow** | ⚠️ Peut être coupé | ✅ Jamais coupé |
| **Position fixed** | ⚠️ Peut être problématique | ✅ Fonctionne parfaitement |
| **Complexité** | ✅ Simple | ⚠️ Moyenne |
| **Performance** | ✅ Identique | ✅ Identique |
| **Maintenance** | ✅ Simple | ⚠️ Nécessite compréhension |

---

## 🚀 Quand Utiliser un Portal ?

### ✅ Utilisez un Portal pour :

1. **Modales et dialogs**
2. **Tooltips**
3. **Dropdowns et menus contextuels**
4. **Notifications / Toasts**
5. **Popovers**
6. **Fullscreen overlays**
7. **Drawers / Side panels**

### ❌ N'utilisez PAS de Portal pour :

1. **Composants standards** (pas de z-index issues)
2. **Contenu inline** (paragraphes, images)
3. **Listes et grids** (sauf overlay)
4. **Forms simples** (sauf si dans une modale)

**Règle d'or** : Utilisez un Portal si vous avez un problème de **z-index, overflow, ou positionnement**.

---

## 🎓 Ressources Avancées

### React 18 et Concurrent Mode

Les Portals fonctionnent parfaitement avec :
- Suspense
- Transitions
- Concurrent rendering
- Server Components (attention au SSR)

### SSR (Server-Side Rendering)

**Attention** : Les Portals ne fonctionnent pas en SSR car `document.body` n'existe pas côté serveur.

**Solution** : Render conditionnel côté client :

```tsx
import { useEffect, useState } from 'react';

function Modal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
```

### Multiple Portals

Vous pouvez avoir plusieurs Portals actifs :

```tsx
function App() {
  return (
    <>
      <Modal />
      <Tooltip />
      <Notification />
      {/* Tous utilisent des Portals */}
    </>
  );
}
```

React gère automatiquement l'ordre de rendu.

---

## 🎯 Cas Pratique : Notre Fix LivePreview

### Problème Initial

```
DashboardApp (z-auto)
├─ Sidebar (z-50) ← Au-dessus
└─ Main (z-10)
   └─ LivePreview (z-9999 effectif = 10) ← En dessous
```

La modale avec `z-9999` était **coincée** dans le contexte de `<Main>` (z-10).

### Solution avec Portal

```tsx
// Avant
function LivePreview() {
  return (
    <div className="z-[9999]">  {/* Bloqué à z-10 effectif */}
      Modal
    </div>
  );
}

// Après
function LivePreview() {
  const modalContent = (
    <div className="z-[99999]">  {/* Vrai z-99999 dans body */}
      Modal
    </div>
  );
  
  return createPortal(modalContent, document.body);
}
```

### Résultat

```
DashboardApp (z-auto)
├─ Sidebar (z-50)
└─ Main (z-10)

[Portal] LivePreview (z-99999) ← Au-dessus de TOUT ✅
```

**Success !** La modale est maintenant au-dessus du Sidebar.

---

## 📝 Checklist d'Implémentation

Quand vous implémentez un Portal, vérifiez :

- [ ] Import de `createPortal` depuis `react-dom`
- [ ] Vérification conditionnelle (`if (!isOpen) return null`)
- [ ] Z-index élevé (99999+)
- [ ] Fixed positioning (`fixed inset-0`)
- [ ] Overlay cliquable pour fermer
- [ ] Stop propagation sur le contenu
- [ ] Accessibilité (aria-modal, role, escape key)
- [ ] Désactivation du scroll du body
- [ ] Animations Motion (si applicable)
- [ ] Test sur mobile / tablette / desktop
- [ ] Test dans React DevTools

---

## 🏆 Conclusion

Les **React Portals** sont une fonctionnalité puissante pour :
- ✅ Échapper au stacking context
- ✅ Gérer le z-index efficacement
- ✅ Créer des overlays fullscreen
- ✅ Implémenter des modales professionnelles

**Quand les utiliser** : Dès que vous avez un problème de z-index ou d'overflow.

**Comment les utiliser** : `createPortal(content, document.body)`

**Résultat** : UX immersive et professionnelle, sans bugs de positionnement.

---

## 📚 Liens Utiles

- [Documentation officielle React Portals](https://react.dev/reference/react-dom/createPortal)
- [MDN : Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
- [CSS Tricks : Z-Index](https://css-tricks.com/almanac/properties/z/z-index/)

---

**Date** : 29 Novembre 2024  
**Version** : 1.0  
**Auteur** : Documentation Technique YoJob  
**Statut** : ✅ Complet et testé en production
