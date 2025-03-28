import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom hook
import Logo from '../assets/logo.svg'; // This path should now work

export function Header() {
  const { isAuthenticated, logout, user } = useAuth(); // Use the custom hook
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Ensure the img tag uses the imported Logo */}
          <img src={Logo} alt="Art Verify Pro Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight">Art Verify Pro</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/arts" className="hover:text-gray-200 transition duration-150">Explore Art</Link>
          {isAuthenticated() ? (
            <>
              <Link to="/upload" className="hover:text-gray-200 transition duration-150">Analyze</Link>
              <Link to="/my-arts" className="hover:text-gray-200 transition duration-150">My Artworks</Link>
              {/* <Link to="/my-history" className="hover:text-gray-200 transition duration-150">History</Link> */}
              <Link to="/games" className="hover:text-gray-200 transition duration-150">Games</Link>
              <span className="text-sm">Welcome, {user?.username || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition duration-150">Login</Link>
              <Link
                to="/signup"
                className="bg-white text-purple-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-150"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
