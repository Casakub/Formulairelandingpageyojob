-- 🔧 FORCE SCHEMA REFRESH
-- Ce script force Supabase à rafraîchir son cache de schéma

-- 1️⃣ Vérifier que la table existe
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'translations_10092a63'
  ) THEN
    RAISE NOTICE '✅ Table translations_10092a63 existe';
  ELSE
    RAISE EXCEPTION '❌ Table translations_10092a63 INTROUVABLE !';
  END IF;
END $$;

-- 2️⃣ Vérifier les données
SELECT 
  COUNT(*) as total_translations,
  COUNT(DISTINCT language) as total_languages
FROM translations_10092a63;

-- 3️⃣ Afficher quelques exemples
SELECT language, key, value 
FROM translations_10092a63 
LIMIT 10;

-- 4️⃣ FORCER le refresh du schema cache
NOTIFY pgrst, 'reload schema';
SELECT pg_notify('pgrst', 'reload config');

-- 5️⃣ Message de confirmation
SELECT 
  '✅ Schema cache rafraîchi ! Attends 30 secondes puis rafraîchis ton app (F5)' as status;
