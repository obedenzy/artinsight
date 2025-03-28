import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  VITE_BACKEND_API_URL: z.string().url('Invalid Backend API URL in .env file'),
});

let parsedEnv: z.infer<typeof envSchema>;

// Validate environment variables on import
try {
  // Log the raw value being read by Vite
  console.log('[env.ts] Raw import.meta.env.VITE_BACKEND_API_URL:', import.meta.env.VITE_BACKEND_API_URL);
  parsedEnv = envSchema.parse(import.meta.env);
  console.log('[env.ts] Parsed VITE_BACKEND_API_URL:', parsedEnv.VITE_BACKEND_API_URL);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('[env.ts] Environment variable validation failed:', error.errors);
    // Provide a more helpful error message in the console
    console.error('[env.ts] CRITICAL: Ensure VITE_BACKEND_API_URL is set correctly in your frontend/.env file (e.g., VITE_BACKEND_API_URL=http://localhost:3001/api)');
    throw new Error('Invalid environment variables. Check console and frontend/.env file.');
  }
  console.error('[env.ts] Unexpected error during env parsing:', error);
  throw error; // Re-throw other errors
}

// Export validated environment variables object
export const env = parsedEnv;

// Export the specific URL for easier import
export const API_BASE_URL = env.VITE_BACKEND_API_URL;

// Log to confirm (optional, remove in production)
console.log('[env.ts] Frontend environment variables loaded:', {
  API_BASE_URL: API_BASE_URL ? 'Loaded' : 'Missing',
});
