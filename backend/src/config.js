// backend/src/config.js
// Load environment variables (optional here if server.js loads them first, but safe to include)
require('dotenv').config();

// Export specific environment variables needed by services
module.exports = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  // Add other variables as needed
};
