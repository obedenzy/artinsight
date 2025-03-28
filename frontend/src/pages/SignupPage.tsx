import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Keep alias for UI components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from '../services/auth'; // Use relative path
import { useAuth } from '../context/AuthContext'; // Use relative path

// Default export for the component
export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      const { token, user } = await signupUser({ username, email, password });
      login(token, user); // Log the user in immediately after signup
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-var(--header-height))] lg:grid-cols-2 xl:min-h-[calc(100vh-var(--header-height))]">
       <div className="hidden bg-muted lg:block relative">
         {/* Image container */}
         <div
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536924940846-227afb31e2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDd8fGFydCUyMGdhbGxlcnl8ZW58MHx8fHwxNzE3OTE0OTg5fDA&ixlib=rb-4.0.3&q=80&w=1080')" }}
         ></div>
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 via-pink-500/70 to-red-500/70 flex items-center justify-center p-10">
            <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Join the Art Revolution</h2>
                <p className="text-xl">Sign up to analyze your art, connect with creators, and explore.</p>
            </div>
         </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="YourUsername"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
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
              {isLoading ? 'Creating Account...' : 'Create an account'}
            </Button>
            {/* Optional: Add social signup buttons */}
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
