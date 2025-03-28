import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/config/env'; // Use validated env vars

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing in frontend environment variables.");
  // Handle this case appropriately, maybe show an error message to the user
  // or prevent the app from initializing fully.
}

// Create and export the Supabase client instance
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

console.log("Frontend Supabase client initialized.");
