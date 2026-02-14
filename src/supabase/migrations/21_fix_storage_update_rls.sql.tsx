-- =============================================================================
-- MIGRATION 21: Ajouter la politique UPDATE manquante sur le bucket blog-images
-- =============================================================================
-- L'upsert des sitemaps (et des images) échoue avec :
--   "new row violates row-level security policy"
-- car la migration 19 ne créait que INSERT / DELETE / SELECT, sans UPDATE.
-- Quand upsert: true remplace un fichier existant, Supabase a besoin de UPDATE.

CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
