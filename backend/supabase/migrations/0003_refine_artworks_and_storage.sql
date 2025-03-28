-- backend/supabase/migrations/0003_refine_artworks_and_storage.sql

-- 1. Refine 'artworks' table
-- Add new columns if they don't exist
ALTER TABLE public.artworks
ADD COLUMN IF NOT EXISTS medium TEXT,
ADD COLUMN IF NOT EXISTS dimensions JSONB, -- To store { height, width, depth, unit }
ADD COLUMN IF NOT EXISTS date_created TEXT; -- Using TEXT for flexibility, consider DATE if format is strict

-- Ensure image_storage_path exists (should from migration 0001)
-- If the old inefficient image_base64 column exists from schema.sql (unlikely if migrations were run), remove it.
-- ALTER TABLE public.artworks DROP COLUMN IF EXISTS image_base64;

-- Re-apply RLS policies for artworks just in case, referencing the user_id column
-- Drop existing policies first to avoid conflicts if they were altered
DROP POLICY IF EXISTS "Users can insert their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can view their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can update their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can delete their own artworks." ON public.artworks;

-- Recreate policies using the user_id column compared against auth.uid()
-- Ensure these match the policies in 0002_auth_tables.sql
CREATE POLICY "Users can insert their own artworks."
    ON public.artworks FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own artworks."
    ON public.artworks FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update their own artworks."
    ON public.artworks FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own artworks."
    ON public.artworks FOR DELETE
    USING (user_id = auth.uid());

-- Ensure the updated_at trigger is still in place for artworks
DROP TRIGGER IF EXISTS handle_updated_at ON public.artworks;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column(); -- Assumes function exists from 0002


-- 2. Add Storage Policies for 'artwork-images' bucket
-- IMPORTANT: Replace 'artwork-images' if your bucket name is different.
-- IMPORTANT: Ensure RLS is enabled for the bucket in Supabase Dashboard (Storage -> Policies).

-- Policy: Allow authenticated users to upload images into a folder named after their user_id
-- Example path: artwork-images/user_id_uuid/image_name.jpg
CREATE POLICY "Allow authenticated uploads in user folder"
ON storage.objects FOR INSERT TO authenticated -- Or specific roles
WITH CHECK (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1] -- Check if the first folder name matches the user's ID
    -- Optional: Add size limits or file type checks here if needed
    -- AND storage.objects.size < 50000000 -- Example: Limit to 50MB
    -- AND storage.objects.metadata->>'mimetype' LIKE 'image/%' -- Example: Allow only image types
);

-- Policy: Allow users to view images within their own folder
CREATE POLICY "Allow authenticated view of own images"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1] -- Check if the first folder name matches the user's ID
);

-- Policy: Allow users to update images within their own folder (e.g., replace)
CREATE POLICY "Allow authenticated update of own images"
ON storage.objects FOR UPDATE TO authenticated
USING (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Allow users to delete images within their own folder
CREATE POLICY "Allow authenticated delete of own images"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
);

-- Note: These storage policies assume a folder structure like `user_id/image_file.jpg`.
-- The `artworkService.js` needs to ensure uploads follow this pattern (`${userId}/${timestamp}_${randomSuffix}.${fileExtension}`).
-- You need to manually run this SQL in your Supabase project's SQL Editor or apply it via the Supabase CLI.
