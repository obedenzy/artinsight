-- backend/supabase/migrations/0004_create_tables_only.sql
-- This script contains ONLY the CREATE TABLE statements for the core application tables.

-- 1. Create Users Table (for custom JWT auth)
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

-- 2. Create Artworks Table
CREATE TABLE IF NOT EXISTS public.artworks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid references public.users(id) on delete cascade not null, -- Foreign key to the users table
  title text not null default 'Untitled',
  artist text default 'Unknown Artist',
  image_storage_path text not null, -- Path within the 'artwork-images' bucket (e.g., user_id/filename.jpg)
  medium TEXT,
  dimensions JSONB, -- Store { height, width, depth, unit }
  date_created TEXT, -- Flexible date format
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Artwork Analyses Table (History)
CREATE TABLE IF NOT EXISTS public.artwork_analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id uuid references public.artworks(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null, -- Foreign key to the users table
  analysis_data jsonb not null, -- Store the full Gemini JSON result
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
  -- No updated_at needed here as analyses are typically immutable records
);

-- End of tables-only script
