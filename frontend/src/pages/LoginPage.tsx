import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Keep alias for UI components for now
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from '../services/auth'; // Use relative path
import { useAuth } from '../context/AuthContext'; // Use relative path

// Default export for the component
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the custom hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { token, user } = await loginUser({ username, password });
      login(token, user); // Update auth context
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-var(--header-height))] lg:grid-cols-2 xl:min-h-[calc(100vh-var(--header-height))]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="YourUsername"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* Optional: Add Forgot password link */}
                {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            {/* Optional: Add social login buttons */}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
         {/* Image container */}
         <div
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536924940846-227afb31e2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDd8fGFydCUyMGdhbGxlcnl8ZW58MHx8fHwxNzE3OTE0OTg5fDA&ixlib=rb-4.0.3&q=80&w=1080')" }}
         ></div>
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 via-pink-500/70 to-red-500/70 flex items-center justify-center p-10">
            <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Unlock the World of Art</h2>
                <p className="text-xl">Analyze, discover, and connect with art like never before.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
