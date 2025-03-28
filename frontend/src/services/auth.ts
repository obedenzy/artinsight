import { env, API_BASE_URL } from '@/config/env'; // Import both for clarity or just API_BASE_URL
import type { SignUpCredentials, LoginCredentials, UserProfile } from '@/types/auth';

// Use the validated and exported API_BASE_URL directly
// const API_URL = env.VITE_BACKEND_API_URL; // Previous way
const API_URL = API_BASE_URL; // Use the directly exported constant

interface AuthResponse {
  token: string;
  user: UserProfile; // Assuming backend returns user profile on login/signup
}

interface SignupResponse {
    message: string; // e.g., "User created successfully" or "Signup successful, confirmation required"
    user?: UserProfile; // Might be returned if no confirmation needed
    token?: string; // Might be returned if no confirmation needed
    requiresConfirmation?: boolean; // Flag indicating if email confirmation is needed
}


// --- Sign Up ---
export const signupUser = async (credentials: SignUpCredentials): Promise<SignupResponse> => {
  const targetUrl = `${API_URL}/auth/signup`;
  console.log("[auth.ts] Attempting backend signup for:", credentials.email, "at URL:", targetUrl); // Log the exact URL
  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json(); // Always parse JSON first

  if (!response.ok) {
    console.error("[auth.ts] Backend signup error:", data);
    // Throw an error object compatible with how pages handle it
    const error = new Error(data.message || `HTTP error! status: ${response.status}`);
    (error as any).response = data; // Attach full response if needed
    throw error;
  }

  console.log("[auth.ts] Backend signup successful:", data);
  // Adapt based on expected backend response structure
  return {
      message: data.message || "Signup successful",
      user: data.user,
      token: data.token,
      requiresConfirmation: data.requiresConfirmation ?? !data.token, // Infer confirmation if no token
  };
};

// --- Login ---
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const targetUrl = `${API_URL}/auth/login`;
  console.log("[auth.ts] Attempting backend login for:", credentials.email, "at URL:", targetUrl); // Log the exact URL
  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json(); // Always parse JSON first

  if (!response.ok) {
    console.error("[auth.ts] Backend login error:", data);
    const error = new Error(data.message || `HTTP error! status: ${response.status}`);
    (error as any).response = data;
    throw error;
  }

  console.log("[auth.ts] Backend login successful:", data);
  if (!data.token || !data.user) {
      throw new Error("[auth.ts] Login response missing token or user data.");
  }
  return data as AuthResponse; // Expecting { token: string, user: UserProfile }
};

// --- Fetch User Profile (Example) ---
// This function assumes you have a backend endpoint to get the current user's profile using a JWT
export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
    const targetUrl = `${API_URL}/auth/profile`; // Assuming a /profile endpoint
    console.log("[auth.ts] Attempting to fetch user profile from backend at URL:", targetUrl); // Log the exact URL
    const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("[auth.ts] Backend fetch profile error:", data);
        const error = new Error(data.message || `HTTP error! status: ${response.status}`);
        (error as any).response = data;
        throw error;
    }

    console.log("[auth.ts] Backend fetch profile successful:", data);
    if (!data.user) {
        throw new Error("[auth.ts] Profile response missing user data.");
    }
    return data.user as UserProfile;
};

// Note: Logout is typically handled client-side by removing the token,
// but you might have a backend endpoint for token invalidation if using refresh tokens etc.
// For simple JWT, client-side removal is usually sufficient.
