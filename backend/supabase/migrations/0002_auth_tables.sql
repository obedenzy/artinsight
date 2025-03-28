-- backend/supabase/migrations/0002_auth_tables.sql

-- Drop dependent objects first if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop the old profiles table which depends on auth.users
DROP TABLE IF EXISTS public.profiles;

-- Create a new users table for traditional authentication
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

-- Enable RLS for the new users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users table:
-- Users can view their own profile data.
CREATE POLICY "Users can view their own profile."
    ON public.users FOR SELECT
    USING (id = auth.uid()); -- Still use auth.uid() here as JWT verification will set the session context

-- Users can update their own profile data (excluding password hash here for simplicity, could be separate).
CREATE POLICY "Users can update their own profile."
    ON public.users FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Update RLS policies on artworks to reference the new users table id
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can insert their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can view their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can update their own artworks." ON public.artworks;
DROP POLICY IF EXISTS "Users can delete their own artworks." ON public.artworks;

-- Recreate policies using the user_id column compared against auth.uid()
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


-- Update RLS policies on artwork_analyses to reference the new users table id
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can insert analyses for their own artworks." ON public.artwork_analyses;
DROP POLICY IF EXISTS "Users can view analyses for their own artworks." ON public.artwork_analyses;

-- Recreate policies using the user_id column compared against auth.uid()
CREATE POLICY "Users can insert analyses for their own artworks."
    ON public.artwork_analyses FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view analyses for their own artworks."
    ON public.artwork_analyses FOR SELECT
    USING (user_id = auth.uid());


-- Update the function for updated_at timestamp (no change needed, just ensure it exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists for the new users table
DROP TRIGGER IF EXISTS handle_updated_at ON public.users;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Ensure the trigger exists for the artworks table (from previous migration)
DROP TRIGGER IF EXISTS handle_updated_at ON public.artworks;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.artworks
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Note: You need to manually run this SQL in your Supabase project's SQL Editor.
-- This script assumes the previous migration (0001) might have been partially or fully applied.
-- It drops potentially conflicting old objects before creating the new structure.
