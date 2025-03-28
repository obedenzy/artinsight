import React, { createContext, useState, useEffect, ReactNode, useMemo, useContext } from 'react'; // Added useContext
import { User } from '../types/auth'; // Assuming User type exists
// Removed API_BASE_URL import as it's not used here

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean; // Added isAuthenticated helper
}

// Default context value with corrected types and added isAuthenticated
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false, // Default implementation
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
         console.log("Auth: Restored session from localStorage");
      } catch (error) {
        console.error("Auth: Failed to parse stored user data", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    console.log("Auth: User logged in, token stored.");
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
    console.log("Auth: User logged out, token removed.");
  };

  // Helper function to check authentication status
  const isAuthenticated = (): boolean => {
    return !!token && !!user; // User is authenticated if token and user data exist
  };

  const contextValue = useMemo(() => ({
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated, // Provide isAuthenticated in context
  }), [user, token, isLoading]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
