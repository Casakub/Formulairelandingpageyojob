-- Migration: Add missing Section 6 Contact translations
-- Date: 2024-12-03
-- Description: Add 7 missing translation keys for Section 6 Contact and confirmation toast

-- 1. section6.consent.contact.title
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:section6.consent.contact.title',
  '{"text_id": "section6.consent.contact.title", "category": "ui", "translations": {"fr": "J''autorise YoJob à me recontacter"}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 2. section6.consent.contact.description
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:section6.consent.contact.description',
  '{"text_id": "section6.consent.contact.description", "category": "ui", "translations": {"fr": "Pour discuter de vos besoins et vous présenter notre solution"}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 3. section6.consent.report.title
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:section6.consent.report.title',
  '{"text_id": "section6.consent.report.title", "category": "ui", "translations": {"fr": "Je souhaite recevoir le rapport de l''étude 2025"}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 4. section6.consent.report.description
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:section6.consent.report.description',
  '{"text_id": "section6.consent.report.description", "category": "ui", "translations": {"fr": "Recevez en avant-première les insights du marché européen"}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 5. section6.rgpd
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:section6.rgpd',
  '{"text_id": "section6.rgpd", "category": "ui", "translations": {"fr": "Vos données sont sécurisées et conformes au RGPD. Elles ne seront jamais vendues à des tiers."}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 6. confirmation.toast.title
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:confirmation.toast.title',
  '{"text_id": "confirmation.toast.title", "category": "ui", "translations": {"fr": "Merci ! Votre réponse a été enregistrée."}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;

-- 7. confirmation.toast.description
INSERT INTO kv_store_10092a63 (key, value, metadata)
VALUES (
  'translation:confirmation.toast.description',
  '{"text_id": "confirmation.toast.description", "category": "ui", "translations": {"fr": "Vous recevrez une analyse par email si vous avez coché l''option."}}',
  '{"type": "translation", "category": "ui", "created_at": "2024-12-03T00:00:00.000Z"}'
)
ON CONFLICT (key) DO NOTHING;
