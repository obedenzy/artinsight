// backend/src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const artworkRoutes = require('./routes/artworkRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const supabase = require('./lib/supabaseClient'); // Import Supabase client

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// --- Supabase Connectivity Test ---
async function testSupabaseConnection() {
  console.log("🌐 Attempting Supabase connection test...");
  try {
    // Attempt a simple, low-impact query. Fetching schema or a single row count is good.
    // Using '.rpc('schema')' or similar might be less prone to RLS issues if tables are empty/restricted.
    // Here, we try selecting a single user ID, assuming the 'users' table exists.
    const { data, error } = await supabase
      .from('users') // Make sure 'users' table exists as per your schema (0004_create_tables_only.sql)
      .select('id')
      .limit(1);

    if (error) {
      // Rethrow the error to be caught by the catch block
      throw error;
    }

    console.log("✅ Supabase connection test successful (queried 'users' table).");
    // console.log("Data received:", data); // Optional: log data if needed

  } catch (error) {
    console.error("🛑 Supabase connection test failed:", error.message);
    if (error.message.includes('fetch failed')) {
        console.error("👉 This likely confirms the network limitation preventing the backend from reaching Supabase.");
    } else if (error.code === '42P01') { // PostgreSQL error code for 'undefined_table'
        console.error("👉 Check if the 'users' table exists in your Supabase database and the migration was applied.");
    } else {
        console.error("👉 An unexpected error occurred:", error); // Log other errors
    }
  }
}
// --- End Supabase Connectivity Test ---


// Middleware
app.use(cors()); // Enable CORS for all origins (adjust in production)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Art Analysis Backend is running!');
});
app.use('/api/artworks', artworkRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server and Run Test
app.listen(port, async () => {
  console.log(`Backend server listening on port ${port}`);
  // Run the Supabase connection test after the server starts
  await testSupabaseConnection();
});
