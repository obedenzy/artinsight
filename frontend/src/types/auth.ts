// Define types for authentication related data structures

export interface LoginCredentials {
  email: string;
  password?: string; // Optional for potential future methods like social login
}

export interface SignupCredentials extends LoginCredentials {
  username: string;
}

// Based on Supabase Auth responses
export interface User {
  id: string;
  email?: string;
  // Add other relevant fields from Supabase user object if needed
  // e.g., created_at, updated_at, email_confirmed_at
  user_metadata?: {
      username?: string;
      // Add other custom metadata fields if you store them
  };
  // You might get profile data merged here or fetch it separately
  username?: string; // From profiles table potentially
  full_name?: string;
  avatar_url?: string;
  website?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

// Combined response type for login/signup
export interface AuthResponse {
  message: string;
  session?: Session | null; // Session might be null if confirmation needed
  user?: User | null;       // User might be null if confirmation needed
  userId?: string;          // Included for signup confirmation case
  requiresConfirmation?: boolean; // Flag for email confirmation
}


// Type for the user profile fetched from /api/auth/profile
export interface UserProfile {
    id: string;
    email?: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    website?: string;
    message?: string; // Include message for potential errors
}
