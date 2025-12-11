# 🌍 ARCHITECTURE DES TRADUCTIONS YOJOB

**Date** : 11 Décembre 2024  
**Version** : 3.0.4  
**Statut** : ✅ **PRODUCTION READY**

---

## 📊 **VUE D'ENSEMBLE**

Le système YOJOB utilise **2 systèmes de traductions indépendants** pour gérer différentes parties de l'application.

```
┌─────────────────────────────────────────────────────────────┐
│                    YOJOB APPLICATION                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐     ┌─────────────────────────┐  │
│  │   LANDING PAGE       │     │   FORMULAIRES           │  │
│  │                      │     │   (Market Research)     │  │
│  ├──────────────────────┤     ├─────────────────────────┤  │
│  │ Table:               │     │ Table:                  │  │
│  │ landing_translations │     │ translations_10092a63   │  │
│  │                      │     │                         │  │
│  │ Routes:              │     │ Routes:                 │  │
│  │ /landing/languages   │     │ /i18n/available-lang    │  │
│  │ /landing/translate   │     │ /i18n/translations/:lg  │  │
│  │                      │     │                         │  │
│  │ Langues: 23          │     │ Langues: 22 (évolutif)  │  │
│  └──────────────────────┘     └─────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ **SYSTÈME 1 : LANDING PAGE**

### **Caractéristiques**

| Propriété | Valeur |
|-----------|--------|
| **Table Supabase** | `landing_translations` |
| **Endpoint API** | `/make-server-10092a63/landing/*` |
| **Langues supportées** | 23 langues européennes |
| **Fichier serveur** | `/supabase/functions/server/landing.tsx` |
| **Hook frontend** | `/hooks/useLandingTranslations.ts` |

### **Routes disponibles**

```typescript
GET  /make-server-10092a63/landing/languages
     → Liste toutes les langues disponibles

GET  /make-server-10092a63/landing/translations
     → Toutes les traductions (bulk)

POST /make-server-10092a63/landing/translate/:language
     → Génère des traductions via IA (Claude)
```

### **Structure de la table**

```sql
CREATE TABLE landing_translations (
  id BIGSERIAL PRIMARY KEY,
  language_code VARCHAR(10) NOT NULL UNIQUE,
  hero_title TEXT,
  hero_subtitle TEXT,
  stats_title TEXT,
  services_title TEXT,
  contact_title TEXT,
  footer_text TEXT,
  -- ... + 50 autres colonnes
  translation_status VARCHAR(50),
  translation_progress INTEGER,
  translated_by VARCHAR(100),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### **Utilisation**

**Frontend (App-Landing.tsx)** :
```typescript
import { useLandingTranslations } from './hooks/useLandingTranslations';

const { translations, currentLanguage, setLanguage } = useLandingTranslations();
```

**⚠️ IMPORTANT** : Ne JAMAIS modifier cette table sans vérifier l'impact sur la landing page !

---

## 🗂️ **SYSTÈME 2 : FORMULAIRES (Market Research)**

### **Caractéristiques**

| Propriété | Valeur |
|-----------|--------|
| **Table Supabase** | `translations_10092a63` |
| **Endpoint API** | `/make-server-10092a63/i18n/*` |
| **Langues supportées** | 22 langues (extensible) |
| **Fichier serveur** | `/supabase/functions/server/i18n.tsx` |
| **Hook frontend** | `/hooks/useI18n.ts`, `/hooks/useAvailableLanguages.ts` |

### **Routes disponibles**

```typescript
GET /make-server-10092a63/i18n/available-languages
    → Liste des langues avec stats de complétion

GET /make-server-10092a63/i18n/translations/:language
    → Traductions pour une langue spécifique (ex: /i18n/translations/fr)

GET /make-server-10092a63/i18n/translations
    → Toutes les traductions (bulk)
```

### **Structure de la table**

```sql
CREATE TABLE translations_10092a63 (
  id BIGSERIAL PRIMARY KEY,
  language VARCHAR(10) NOT NULL,          -- Code ISO 639-1 (fr, en, de, etc.)
  key TEXT NOT NULL,                      -- Clé de traduction (questions.q1_nom.label)
  value TEXT NOT NULL,                    -- Texte traduit
  context TEXT,                           -- Contexte pour traducteurs
  section VARCHAR(50),                    -- Section (profile, experience, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(language, key)                   -- 1 seule traduction par langue/clé
);

-- Index pour performance
CREATE INDEX idx_translations_language ON translations_10092a63(language);
CREATE INDEX idx_translations_key ON translations_10092a63(key);
CREATE INDEX idx_translations_section ON translations_10092a63(section);
```

### **Format des clés**

```typescript
// Questions du formulaire
"questions.q1_nom.label"           → "Nom de l'agence"
"questions.q1_nom.placeholder"     → "Ex: ABC Recrutement"
"questions.q1_nom.description"     → "Indiquez le nom complet"

// Options de questions
"questions.q3_taille.options.1-10"  → "1-10 employés"
"questions.q3_taille.options.10-50" → "10-50 employés"

// Textes UI généraux
"common.submit"      → "Envoyer"
"common.cancel"      → "Annuler"
"common.loading"     → "Chargement..."
"common.error"       → "Erreur"

// Validations
"validation.required" → "Ce champ est requis"
"validation.email"    → "Email invalide"
```

### **Utilisation**

**Frontend (ModernSurveyForm.tsx)** :
```typescript
import { useI18n } from './hooks/useI18n';

const { t, tQuestion, currentLang, setCurrentLang } = useI18n();

// Traduction simple
const submitText = t('common.submit'); // "Envoyer"

// Traduction de question
const label = tQuestion('q1_nom', 'label'); // "Nom de l'agence"
```

### **Exemple de données**

```sql
-- Français
INSERT INTO translations_10092a63 (language, key, value, section) VALUES
  ('fr', 'questions.q1_nom.label', 'Nom de l''agence', 'profile'),
  ('fr', 'questions.q24_email.label', 'Adresse email', 'contact'),
  ('fr', 'common.submit', 'Envoyer', 'ui');

-- Anglais
INSERT INTO translations_10092a63 (language, key, value, section) VALUES
  ('en', 'questions.q1_nom.label', 'Agency Name', 'profile'),
  ('en', 'questions.q24_email.label', 'Email Address', 'contact'),
  ('en', 'common.submit', 'Submit', 'ui');

-- Allemand
INSERT INTO translations_10092a63 (language, key, value, section) VALUES
  ('de', 'questions.q1_nom.label', 'Name der Agentur', 'profile'),
  ('de', 'questions.q24_email.label', 'E-Mail-Adresse', 'contact'),
  ('de', 'common.submit', 'Senden', 'ui');
```

---

## 🔄 **GÉNÉRATION AUTOMATIQUE DES TRADUCTIONS**

### **Landing Page**

**Endpoint** : `POST /make-server-10092a63/landing/translate/:language`

**Utilise** : Claude AI (Anthropic)

**Process** :
1. Récupère les traductions FR (source)
2. Envoie à Claude avec prompt spécialisé
3. Parse la réponse JSON
4. Insère/update dans `landing_translations`

**Exemple d'utilisation** :
```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/landing/translate/de \
  -H "Authorization: Bearer ANON_KEY"
```

---

### **Formulaires (Market Research)**

**Endpoint** : `POST /make-server-10092a63/seed/generate`

**Utilise** : Claude AI (Anthropic)

**Process** :
1. Lit les questions depuis `/config/survey-questions-COMPLETE.ts`
2. Pour chaque langue cible, génère via Claude
3. Insère dans `translations_10092a63`
4. Retourne statistiques

**Fichier serveur** : `/supabase/functions/server/seed-smart-translations.tsx`

**Exemple d'utilisation** :
```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/seed/generate \
  -H "Authorization: Bearer ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"languages": ["de", "es", "it"], "mode": "questions_only"}'
```

---

## 📋 **LANGUES SUPPORTÉES**

### **Landing Page (23 langues)**

```typescript
const LANDING_LANGUAGES = [
  'fr', 'en', 'de', 'es', 'it', 'pl', 'ro', 'pt', 'nl', 'bg',
  'hu', 'cs', 'el', 'sv', 'hr', 'sk', 'lt', 'lv', 'sl', 'et',
  'fi', 'da', 'mt'
];
```

### **Formulaires (22 langues)**

```typescript
const FORM_LANGUAGES = [
  'fr', 'en', 'de', 'es', 'it', 'pl', 'ro', 'pt', 'nl', 'bg',
  'hu', 'cs', 'el', 'sv', 'hr', 'sk', 'lt', 'lv', 'sl', 'et',
  'fi', 'da'
];
```

---

## 🛡️ **SÉCURITÉ & PERMISSIONS**

### **Row Level Security (RLS)**

**Les 2 tables utilisent RLS** :

```sql
-- Landing Page
ALTER TABLE landing_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read landing translations"
  ON landing_translations FOR SELECT USING (true);

CREATE POLICY "Only admins can modify landing translations"
  ON landing_translations FOR ALL 
  USING (auth.role() = 'authenticated');

-- Formulaires
ALTER TABLE translations_10092a63 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are viewable by everyone"
  ON translations_10092a63 FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify translations"
  ON translations_10092a63 FOR ALL 
  USING (auth.role() = 'authenticated');
```

**Résumé** :
- ✅ **Lecture** : Publique (tout le monde)
- 🔒 **Écriture** : Authentification requise (admins uniquement)

---

## 🧪 **TESTS**

### **Test automatique**

Ouvre `/test-translations-system.html` dans ton navigateur et clique sur "Lancer tous les tests".

**Tests effectués** :
1. ✅ Traductions Landing Page (23 langues)
2. ✅ Langues disponibles Formulaires
3. ✅ Traductions FR Formulaires
4. ✅ Traductions EN Formulaires
5. ✅ API Questions (58 questions)

---

### **Test manuel**

**1. Test Landing Page** :
```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/landing/languages
```

**2. Test Formulaires (langues)** :
```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/available-languages \
  -H "Authorization: Bearer ANON_KEY"
```

**3. Test Formulaires (traductions FR)** :
```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/translations/fr \
  -H "Authorization: Bearer ANON_KEY"
```

---

## ⚠️ **BONNES PRATIQUES**

### **DO ✅**

1. **Toujours utiliser les hooks existants**
   ```typescript
   // Landing
   const { translations } = useLandingTranslations();
   
   // Formulaires
   const { t, tQuestion } = useI18n();
   ```

2. **Respecter le format des clés**
   ```
   questions.{questionId}.{property}
   common.{key}
   validation.{key}
   ```

3. **Tester après chaque modification**
   - Ouvrir `/test-translations-system.html`
   - Vérifier la console du navigateur

4. **Utiliser les sections**
   ```typescript
   section: 'profile' | 'experience' | 'needs' | 'interest' | 'vision' | 'contact' | 'ui'
   ```

---

### **DON'T ❌**

1. **❌ NE PAS mélanger les 2 systèmes**
   ```typescript
   // MAUVAIS
   const landingText = t('hero.title'); // Utilise le hook formulaires pour landing
   
   // BON
   const landingText = translations.hero?.title; // Hook dédié
   ```

2. **❌ NE PAS supprimer des traductions sans vérifier**
   ```sql
   -- DANGEREUX !
   DELETE FROM landing_translations WHERE language_code = 'fr';
   ```

3. **❌ NE PAS hardcoder les textes**
   ```typescript
   // MAUVAIS
   <button>Envoyer</button>
   
   // BON
   <button>{t('common.submit')}</button>
   ```

4. **❌ NE PAS oublier le contexte**
   ```sql
   -- MAUVAIS
   INSERT INTO translations_10092a63 (language, key, value) 
   VALUES ('fr', 'questions.q1_nom.label', 'Nom');
   
   -- BON
   INSERT INTO translations_10092a63 (language, key, value, context, section) 
   VALUES ('fr', 'questions.q1_nom.label', 'Nom de l''agence', 
           'Question 1 - Nom de l''organisation', 'profile');
   ```

---

## 📊 **STATISTIQUES ACTUELLES**

| Métrique | Landing Page | Formulaires |
|----------|--------------|-------------|
| **Tables** | 1 (`landing_translations`) | 1 (`translations_10092a63`) |
| **Langues** | 23 | 22 |
| **Clés par langue** | ~60 colonnes | ~300 clés (évolutif) |
| **Total traductions** | 23 × 60 = 1,380 | Variable |
| **Questions** | N/A | 58 questions |
| **Profils** | N/A | 3 (agency/client/worker) |

---

## 🔄 **MAINTENANCE**

### **Ajouter une nouvelle langue (Formulaires)**

**Étape 1** : Ajouter à la liste EUROPEAN_LANGUAGES (`/lib/languages.ts`)

**Étape 2** : Générer les traductions via API
```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/seed/generate \
  -H "Authorization: Bearer ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"languages": ["NEW_LANG"], "mode": "questions_only"}'
```

**Étape 3** : Vérifier
```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/translations/NEW_LANG
```

---

### **Ajouter une nouvelle question**

**Étape 1** : Ajouter dans `/config/survey-questions-COMPLETE.ts`

**Étape 2** : Seed les traductions
```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/seed/generate
```

---

## 🎯 **CHECKLIST DE DÉPLOIEMENT**

Avant de déployer en production :

- [ ] Tables créées (`landing_translations` + `translations_10092a63`)
- [ ] RLS activé sur les 2 tables
- [ ] Policies créées (read public, write authenticated)
- [ ] Index créés sur `translations_10092a63`
- [ ] Au moins 2 langues (FR + EN) avec traductions complètes
- [ ] Tests passés (`/test-translations-system.html`)
- [ ] Aucune erreur dans la console navigateur
- [ ] Endpoints testés manuellement (curl)
- [ ] Clé API Claude configurée (si génération auto)
- [ ] Backup de la base de données

---

## 📞 **SUPPORT**

En cas de problème :

1. **Vérifier les logs Supabase** : Dashboard → Edge Functions → Logs
2. **Consulter la console navigateur** : Erreurs JS/Network
3. **Tester les endpoints** : Utiliser curl ou Postman
4. **Relire ce document** : Architecture et bonnes pratiques
5. **Vérifier les migrations** : Toutes exécutées ?

---

**Version** : 3.0.4  
**Date** : 11 Décembre 2024  
**Auteur** : YoJob Dev Team  
**Statut** : ✅ **PRODUCTION READY**
