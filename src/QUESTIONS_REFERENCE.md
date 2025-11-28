# 📋 Référence complète des 26 Questions YoJob

## Vue d'ensemble

**Total** : 26 questions
**Sections** : 6
**Questions obligatoires** : 24
**Questions optionnelles** : 2 (q7_origine, q25_besoins)
**Questions conditionnelles** : 2 (q9_autre, q16_autre)

---

## 📊 Section 1 : Profil Agence (4 questions)

### Q1 - Nom de l'agence
- **Code** : `q1_nom`
- **Type** : `text`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Ex: CEA Personalmanagement"

### Q2 - Année de création
- **Code** : `q2_annee`
- **Type** : `number`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Ex: 2010"

### Q3 - Taille de l'agence
- **Code** : `q3_taille`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `1-5` → 1-5 personnes 👤
  - `6-50` → 6-50 personnes 👥
  - `51-250` → 51-250 personnes 🏢
  - `250+` → 250+ personnes 🏛️

### Q4 - Principaux secteurs d'activité
- **Code** : `q4_secteurs`
- **Type** : `multi-select`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `btp` → BTP / Construction 🏗️
  - `industrie` → Industrie manufacturière ⚙️
  - `logistique` → Logistique / Transport 🚚
  - `hotellerie` → Hôtellerie / Restauration 🍽️
  - `sante` → Santé / Médical ⚕️
  - `agriculture` → Agriculture 🌾
  - `services` → Services aux entreprises 💼
  - `autre` → Autre 📌

---

## 🌍 Section 2 : Détachement (8 questions)

### Q5 - Pays d'origine de votre agence
- **Code** : `q5_pays`
- **Type** : `text`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Ex: Pologne"

### Q6 - Volume annuel de détachements
- **Code** : `q6_volume`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `0` → Aucun (pas encore) ⭕
  - `1-50` → 1-50 travailleurs 📊
  - `51-200` → 51-200 travailleurs 📈
  - `201-500` → 201-500 travailleurs 🚀
  - `500+` → 500+ travailleurs ⭐

### Q7 - Principaux pays d'origine de vos travailleurs détachés
- **Code** : `q7_origine`
- **Type** : `text`
- **Obligatoire** : ❌ Non (optionnel)
- **Placeholder** : "Ex: Pologne, Ukraine, Roumanie"

### Q8 - Principaux pays de destination
- **Code** : `q8_destinations`
- **Type** : `textarea`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Ex: France, Allemagne, Belgique, Pays-Bas..."

### Q9 - Principal défi du détachement européen
- **Code** : `q9_defi`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `admin` → Complexité administrative (A1, SIPSI...) 📋
  - `conformite` → Conformité légale multiples pays ⚖️
  - `cout` → Coûts et temps de gestion 💰
  - `langues` → Barrières linguistiques 🌐
  - `autre` → Autre ❓

### Q9_AUTRE - Précisez votre principal défi
- **Code** : `q9_autre`
- **Type** : `text`
- **Obligatoire** : ❌ Non
- **Conditionnel** : Affiché si `q9_defi === "autre"`
- **Placeholder** : "Décrivez votre défi..."

### Q10 - Comment gérez-vous actuellement vos détachements ?
- **Code** : `q10_gestion`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `interne` → Équipe interne dédiée 👥
  - `externe` → Prestataire externe / Cabinet 🏢
  - `mixte` → Mixte (interne + externe) 🔄
  - `manuel` → Gestion manuelle (Excel, emails) 📊
  - `logiciel` → Logiciel spécialisé 💻

### Q11 - Avez-vous déjà eu des incidents de conformité ?
- **Code** : `q11_incidents`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `jamais` → Non, jamais ✅
  - `rarement` → Rarement (1-2 fois) ⚠️
  - `parfois` → Parfois (3-5 fois) 🔴
  - `souvent` → Souvent (6+ fois) 🚨

---

## 💼 Section 3 : Besoins (7 questions)

### Q12 - Budget actuel pour la gestion du détachement
- **Code** : `q12_budget`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `0-5k` → 0-5 000 € / an 💵
  - `5-15k` → 5 000-15 000 € / an 💰
  - `15-30k` → 15 000-30 000 € / an 💸
  - `30k+` → 30 000+ € / an 🏦
  - `inconnu` → Je ne sais pas ❓

### Q13 - Estimez-vous avoir un manque à gagner dû aux contraintes du détachement ?
- **Code** : `q13_manque_gagner`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `non` → Non, pas vraiment ✅
  - `faible` → Oui, faible (< 5% CA) 📉
  - `moyen` → Oui, moyen (5-15% CA) 📊
  - `important` → Oui, important (> 15% CA) 🔴

### Q14 - Quels risques vous préoccupent le plus ?
- **Code** : `q14_risques`
- **Type** : `multi-select`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `amendes` → Amendes et sanctions 💸
  - `reputation` → Réputation / Image 🏆
  - `penal` → Responsabilité pénale ⚖️
  - `delais` → Retards dans les missions ⏰
  - `clients` → Perte de clients 📉
  - `aucun` → Aucun risque majeur ✅

### Q15 - Quel est votre plus gros problème aujourd'hui avec le détachement ?
- **Code** : `q15_probleme`
- **Type** : `textarea`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Décrivez en quelques phrases..."

### Q16 - Utilisez-vous un ERP ou logiciel de gestion ?
- **Code** : `q16_erp`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `sage` → Sage 📘
  - `sap` → SAP 🔷
  - `cegid` → Cegid 📗
  - `bullhorn` → Bullhorn / ATS spécialisé 🎯
  - `autre` → Autre 💼
  - `aucun` → Aucun ERP ❌

### Q16_AUTRE - Précisez votre ERP
- **Code** : `q16_autre`
- **Type** : `text`
- **Obligatoire** : ❌ Non
- **Conditionnel** : Affiché si `q16_erp === "autre"`
- **Placeholder** : "Nom du logiciel..."

### Q17 - Seriez-vous prêt à migrer vers une nouvelle solution ?
- **Code** : `q17_migration`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `oui` → Oui, sans problème ✅
  - `conditions` → Oui, sous conditions ⚠️
  - `difficile` → Difficile, mais ouvert 🤔
  - `non` → Non, pas envisageable ❌

---

## ⭐ Section 4 : Intérêt YoJob (6 questions)

### Q18 - Score d'intérêt pour une plateforme YoJob (1-10)
- **Code** : `q18_score`
- **Type** : `score`
- **Obligatoire** : ✅ Oui
- **Valeurs** : 1 à 10

### Q19 - Quelles fonctionnalités vous intéressent le plus ?
- **Code** : `q19_features`
- **Type** : `multi-select`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `sipsi` → Déclaration SIPSI automatisée 🤖
  - `a1` → Gestion certificats A1 📜
  - `conformite` → Dashboard conformité multi-pays 📊
  - `alertes` → Alertes & renouvellements 🔔
  - `documents` → Centralisation documents 📁
  - `marketplace` → Marketplace agences européennes 🛒
  - `support` → Support expert multilingue 💬
  - `api` → Intégration API (ERP) 🔌

### Q20 - Quel modèle de tarification préféreriez-vous ?
- **Code** : `q20_prix`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `mensuel` → Abonnement mensuel fixe 📆
  - `detache` → Prix par travailleur détaché 👤
  - `usage` → Pay-as-you-go (à l'usage) 💳
  - `annuel` → Forfait annuel (avec réduction) 🎁

### Q21 - Quel budget mensuel seriez-vous prêt à investir ?
- **Code** : `q21_budget_mensuel`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `0-100` → 0-100 € / mois 💵
  - `100-300` → 100-300 € / mois 💰
  - `300-500` → 300-500 € / mois 💸
  - `500-1000` → 500-1 000 € / mois 💎
  - `1000+` → 1 000+ € / mois 🏦

### Q22 - Seriez-vous prêt à tester un MVP (version beta) de YoJob ?
- **Code** : `q22_mvp`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `oui_gratuit` → Oui, gratuitement 🎁
  - `oui_reduc` → Oui, avec réduction 💰
  - `peut_etre` → Peut-être, selon features 🤔
  - `non` → Non, pas intéressé ❌

### Q23 - Quel est votre rôle dans la décision d'achat ?
- **Code** : `q23_role`
- **Type** : `radio`
- **Obligatoire** : ✅ Oui
- **Options** :
  - `decideur` → Décideur final 👑
  - `influenceur` → Influenceur / Recommandation 🎯
  - `utilisateur` → Utilisateur final 👤
  - `autre` → Autre ❓

---

## 🔮 Section 5 : Vision Future (2 questions)

### Q24 - Comment voyez-vous évoluer le marché du détachement dans les 3 prochaines années ?
- **Code** : `q24_evolution`
- **Type** : `textarea`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "Partagez votre vision..."

### Q25 - Y a-t-il d'autres besoins ou suggestions que vous aimeriez partager ?
- **Code** : `q25_besoins`
- **Type** : `textarea`
- **Obligatoire** : ❌ Non (optionnel)
- **Placeholder** : "Vos suggestions nous intéressent..."

---

## 📧 Section 6 : Contact (1 question)

### Q26 - Email professionnel
- **Code** : `email`
- **Type** : `email`
- **Obligatoire** : ✅ Oui
- **Placeholder** : "votre.email@agence.com"

**Note** : Cette section inclut aussi 2 checkboxes (non comptabilisées comme questions) :
- `autorise_contact` → Autorisation de contact
- `souhaite_rapport` → Recevoir le rapport 2025

---

## 📈 Statistiques des questions

### Par type
- **text** : 6 questions (23%)
- **number** : 1 question (4%)
- **email** : 1 question (4%)
- **textarea** : 4 questions (15%)
- **radio** : 12 questions (46%)
- **multi-select** : 3 questions (12%)
- **score** : 1 question (4%)

### Par section
- **Section 1** : 4 questions (15%)
- **Section 2** : 8 questions (31%)
- **Section 3** : 7 questions (27%)
- **Section 4** : 6 questions (23%)
- **Section 5** : 2 questions (8%)
- **Section 6** : 1 question (4%)

### Temps estimé
- **Section 1** : 2 min
- **Section 2** : 3 min
- **Section 3** : 2 min
- **Section 4** : 3 min
- **Section 5** : 1 min
- **Section 6** : 1 min
- **TOTAL** : ~12 minutes

---

## 🔗 Questions avec options (15 questions)

### Radio (12 questions)
Q3, Q6, Q9, Q10, Q11, Q12, Q13, Q16, Q17, Q20, Q21, Q22, Q23

### Multi-select (3 questions)
Q4, Q14, Q19

### Total options disponibles
- **Section 1** : 12 options
- **Section 2** : 19 options
- **Section 3** : 21 options
- **Section 4** : 29 options
- **TOTAL** : 81 options

---

**Version** : 1.0
**Dernière mise à jour** : 28 Novembre 2024
**Maintenu par** : Équipe YoJob Dev
