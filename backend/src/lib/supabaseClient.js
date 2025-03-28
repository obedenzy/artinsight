// backend/src/lib/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
// Import directly from the new config file
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('../config');
// Correctly import all required logger functions
const { logError, logWarn, logInfo } = require('../utils/logger'); // Import logger

let supabase;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  logWarn('Supabase URL or Anon Key not found in environment variables. Supabase client not initialized.');
  // Depending on how critical Supabase is, you might want to throw an error
  // throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.");
  supabase = null; // Explicitly set to null if not configured
} else {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            // Optional: configure auth persistence if needed, though likely not for backend service
            // persistSession: false,
            // autoRefreshToken: false,
        },
        // Optional: configure global fetch options if needed
        // global: {
        //   fetch: (...args) => fetch(...args), // Use global fetch or a custom one
        // },
    });
    // Now logInfo should be defined here
    logInfo('Supabase client initialized successfully.');
  } catch (error) {
      logError(`Failed to initialize Supabase client: ${error.message}`, error);
      supabase = null; // Ensure supabase is null on initialization error
  }
}

// Export the initialized client (or null if initialization failed)
module.exports = supabase;
