-- backend/supabase/migrations/0001_initial_schema.sql

-- 1. Create Profiles Table (linked to auth.users)
-- Stores public user information.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
-- Allow users to view all profiles (public info)
create policy "Public profiles are viewable by everyone."
  on public.profiles for select using (true);
-- Allow users to update their own profile
create policy "Users can insert their own profile."
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile."
  on public.profiles for update using (auth.uid() = id);
-- Function to automatically create a profile when a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username'); -- Assumes username is passed in metadata on signup
  return new;
end;
$$;
-- Trigger the function after user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Create Artwork Images Bucket (Supabase Storage)
-- Note: Bucket creation is often done via UI or Supabase CLI, but let's define policies here.
-- Ensure a bucket named 'artwork-images' exists.
-- Example policy: Allow authenticated users to upload images
-- (Replace with actual bucket creation/policy setting in Supabase dashboard or CLI)
-- insert into storage.buckets (id, name, public) values ('artwork-images', 'artwork-images', false); -- Example, might need adjustments

create policy "Allow authenticated users to upload artwork images"
  on storage.objects for insert to authenticated with check ( bucket_id = 'artwork-images' );

create policy "Allow owner to view their artwork images"
  on storage.objects for select to authenticated using ( bucket_id = 'artwork-images' and owner = auth.uid() );

create policy "Allow owner to delete their artwork images"
  on storage.objects for delete to authenticated using ( bucket_id = 'artwork-images' and owner = auth.uid() );


-- 3. Create Artworks Table
create table if not exists public.artworks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null default 'Untitled',
  artist text default 'Unknown Artist',
  image_storage_path text not null, -- Path within the 'artwork-images' bucket
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable RLS
alter table public.artworks enable row level security;
-- Allow users to insert artworks linked to their own user_id
create policy "Users can insert their own artworks."
  on public.artworks for insert with check (auth.uid() = user_id);
-- Allow users to view their own artworks
create policy "Users can view their own artworks."
  on public.artworks for select using (auth.uid() = user_id);
-- Allow users to update their own artworks
create policy "Users can update their own artworks."
  on public.artworks for update using (auth.uid() = user_id);
-- Allow users to delete their own artworks
create policy "Users can delete their own artworks."
  on public.artworks for delete using (auth.uid() = user_id);
-- Add indexes
create index if not exists idx_artworks_user_id on public.artworks(user_id);


-- 4. Create Artwork Analyses Table (History)
create table if not exists public.artwork_analyses (
  id uuid default gen_random_uuid() primary key,
  artwork_id uuid references public.artworks on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null, -- Denormalized for easier RLS/querying
  analysis_data jsonb not null, -- Store the full Gemini JSON result
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable RLS
alter table public.artwork_analyses enable row level security;
-- Allow users to insert analyses linked to their own user_id and artwork
create policy "Users can insert analyses for their own artworks."
  on public.artwork_analyses for insert with check (auth.uid() = user_id);
-- Allow users to view analyses for their own artworks
create policy "Users can view analyses for their own artworks."
  on public.artwork_analyses for select using (auth.uid() = user_id);
-- Add indexes
create index if not exists idx_artwork_analyses_artwork_id on public.artwork_analyses(artwork_id);
create index if not exists idx_artwork_analyses_user_id on public.artwork_analyses(user_id);


-- Function to update `updated_at` timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Trigger for artworks table
create trigger handle_updated_at before update on public.artworks
  for each row execute procedure public.update_updated_at_column();

-- Note: Remember to run this SQL script in your Supabase project's SQL Editor.
-- Also, ensure the 'artwork-images' bucket is created in Supabase Storage.
