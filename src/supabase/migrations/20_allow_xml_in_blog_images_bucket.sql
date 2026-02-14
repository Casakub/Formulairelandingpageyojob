-- =============================================================================
-- MIGRATION 20: Autoriser les fichiers XML dans le bucket blog-images
-- =============================================================================
-- Nécessaire pour que le dashboard puisse sauvegarder les sitemaps générés
-- dans le sous-dossier _sitemaps/ du bucket blog-images.

UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/xml',
  'text/xml'
]
WHERE id = 'blog-images';
