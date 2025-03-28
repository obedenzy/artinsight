-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Users Table (Leveraging Supabase Auth)
-- We might create a public 'profiles' table later if needed
-- to store app-specific user data not in auth.users.

-- Artworks Table
create table if not exists artworks (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    artist text,
    date_created text, -- Consider using date or timestamp type if format is consistent
    medium text,
    dimensions jsonb, -- Store { height, width, depth, unit }
    style text,
    movement text,
    image_base64 text, -- Storing large base64 strings here is inefficient. Consider Supabase Storage.
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for frequently queried columns
create index if not exists idx_artworks_user_id on artworks(user_id);

-- RLS (Row Level Security) Policies for Artworks
-- Allow users to manage their own artworks
alter table artworks enable row level security;

create policy "Allow individual insert access" on artworks
  for insert with check (auth.uid() = user_id);

create policy "Allow individual select access" on artworks
  for select using (auth.uid() = user_id);

create policy "Allow individual update access" on artworks
  for update using (auth.uid() = user_id);

create policy "Allow individual delete access" on artworks
  for delete using (auth.uid() = user_id);


-- Analyses Table
create table if not exists analyses (
    id uuid primary key default uuid_generate_v4(),
    artwork_id uuid references artworks(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null, -- Denormalized for easier querying/RLS
    analysis_data jsonb, -- Store results from Gemini AI
    analyzed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes
create index if not exists idx_analyses_artwork_id on analyses(artwork_id);
create index if not exists idx_analyses_user_id on analyses(user_id);

-- RLS Policies for Analyses
alter table analyses enable row level security;

create policy "Allow individual insert access" on analyses
  for insert with check (auth.uid() = user_id);

create policy "Allow individual select access" on analyses
  for select using (auth.uid() = user_id);

-- Function to update 'updated_at' timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update 'updated_at' on artworks update
create trigger on_artwork_update
  before update on public.artworks
  for each row execute procedure public.handle_updated_at();

-- Note: You need to run this SQL script in your Supabase SQL Editor.
-- IMPORTANT: Storing large base64 strings (up to 50MB) in the 'image_base64' text field
-- is highly inefficient, can significantly slow down database operations, increase storage costs,
-- and may hit database row/field size limits.
-- Consider using Supabase Storage to upload the file and store only the URL/path in the database.
