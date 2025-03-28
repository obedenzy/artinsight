-- backend/supabase/migrations/0000_combined_initial_schema.sql
-- This script combines the setup for users, artworks, analyses, and storage policies.

-- Drop existing objects in reverse order of dependency (optional, but helps ensure clean state)
DROP TRIGGER IF EXISTS handle_updated_at ON public.artworks;
DROP TRIGGER IF EXISTS handle_updated_at ON public.users;
DROP POLICY IF EXISTS "Allow authenticated delete of own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update of own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated view of own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads in user folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can view analyses for their own artworks." ON public.artwork_analyses;
DROP POLICY IF EXISTS "Users can insert analyses for their own artworks." ON public.artwork_analyses;
DROP POLICY IF EXISTS "Users can delete their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can update their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can view their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can insert their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile." ON public.users;
DROP TABLE IF EXISTS public.artwork_analyses;
DROP TABLE IF EXISTS public.artworks;
DROP TABLE IF EXISTS public.users;
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- 1. Create Helper Function: update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- 2. Create Users Table (for custom JWT auth)
CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Store hashed passwords
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    CONSTRAINT username_length CHECK (char_length(username) >= 3),
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Add updated_at trigger for users
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable RLS for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile."
    ON public.users FOR SELECT
    USING (id = auth.uid()); -- Assumes JWT sets auth.uid()

CREATE POLICY "Users can update their own profile."
    ON public.users FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());


-- 3. Create Artworks Table
CREATE TABLE IF NOT EXISTS public.artworks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid references public.users(id) on delete cascade not null, -- Foreign key to the new users table
  title text not null default 'Untitled',
  artist text default 'Unknown Artist',
  image_storage_path text not null, -- Path within the 'artwork-images' bucket (e.g., user_id/filename.jpg)
  medium TEXT,
  dimensions JSONB, -- Store { height, width, depth, unit }
  date_created TEXT, -- Flexible date format
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add updated_at trigger for artworks
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable RLS for artworks table
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artworks table
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

-- Add indexes for artworks
CREATE INDEX IF NOT EXISTS idx_artworks_user_id ON public.artworks(user_id);


-- 4. Create Artwork Analyses Table (History)
CREATE TABLE IF NOT EXISTS public.artwork_analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id uuid references public.artworks(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null, -- Denormalized, references new users table
  analysis_data jsonb not null, -- Store the full Gemini JSON result
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
  -- No updated_at needed here as analyses are typically immutable records
);

-- Enable RLS for artwork_analyses table
ALTER TABLE public.artwork_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artwork_analyses table
CREATE POLICY "Users can insert analyses for their own artworks."
    ON public.artwork_analyses FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view analyses for their own artworks."
    ON public.artwork_analyses FOR SELECT
    USING (user_id = auth.uid());

-- Add indexes for artwork_analyses
CREATE INDEX IF NOT EXISTS idx_artwork_analyses_artwork_id ON public.artwork_analyses(artwork_id);
CREATE INDEX IF NOT EXISTS idx_artwork_analyses_user_id ON public.artwork_analyses(user_id);


-- 5. Add Storage Policies for 'artwork-images' bucket
-- IMPORTANT: Ensure 'artwork-images' bucket exists, is private, and has RLS enabled in Supabase Dashboard.

-- Policy: Allow authenticated users to upload images into a folder named after their user_id
CREATE POLICY "Allow authenticated uploads in user folder"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1] -- First folder must be user's UUID
    -- Optional: Add size limits or file type checks here
    -- AND size < 50000000 -- Example: Limit to 50MB
    -- AND metadata->>'mimetype' LIKE 'image/%' -- Example: Allow only image types
);

-- Policy: Allow users to view images within their own folder
CREATE POLICY "Allow authenticated view of own images"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'artwork-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
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

-- End of combined schema script
