import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Analyzer } from './pages/Analyzer';
import { RecentArtworks } from './components/analyzed/RecentArtworks';
import { FeaturedArtworks } from './components/FeaturedArtworks';
import { ArtworkDetails } from './pages/ArtworkDetails';
import { AddArtwork } from './pages/AddArtwork';
import { MyArts } from './pages/MyArts';
import { MyHistory } from './pages/MyHistory';
import { GamesMenu } from './pages/games/GamesMenu';
import { CreateGame } from './pages/games/CreateGame';
import { GameDetails } from './pages/games/GameDetails';
import { ArtsList } from './pages/ArtsList';
import { AddChildArtwork } from './pages/AddChildArtwork';
import LoginPage from './pages/LoginPage'; // Use default import
import SignupPage from './pages/SignupPage'; // Use default import
import { useAuth } from './context/AuthContext'; // Import the custom hook

// Simple ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Use the custom hook

  if (isLoading) {
    // Optional: Show a loading spinner while checking auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};


function HomePage() {
  return (
    <>
      <RecentArtworks />
      <FeaturedArtworks />
    </>
  );
}

export default function App() {
  return (
    // Router is now likely in main.tsx wrapping AuthProvider
    // <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/arts" element={<ArtsList />} />
            <Route path="/artwork/:id" element={<ArtworkDetails />} /> {/* Public view */}

            {/* Protected Routes */}
            <Route path="/upload" element={<ProtectedRoute><Analyzer /></ProtectedRoute>} />
            <Route path="/my-arts" element={<ProtectedRoute><MyArts /></ProtectedRoute>} />
            <Route path="/my-history" element={<ProtectedRoute><MyHistory /></ProtectedRoute>} />
            <Route path="/artwork/add" element={<ProtectedRoute><AddArtwork /></ProtectedRoute>} />
            <Route path="/add-child-artwork" element={<ProtectedRoute><AddChildArtwork /></ProtectedRoute>} />
            <Route path="/games" element={<ProtectedRoute><GamesMenu /></ProtectedRoute>} />
            <Route path="/games/create" element={<ProtectedRoute><CreateGame /></ProtectedRoute>} />
            <Route path="/games/create/:type" element={<ProtectedRoute><CreateGame /></ProtectedRoute>} />
            <Route path="/games/:id" element={<ProtectedRoute><GameDetails /></ProtectedRoute>} />

             {/* Catch-all or 404 Not Found Route */}
             {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
      </div>
    // </Router>
  );
}
