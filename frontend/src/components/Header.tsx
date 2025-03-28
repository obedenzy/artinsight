import React from 'react';
import { Link } from 'react-router-dom';
// import { LogIn, UserPlus } from 'lucide-react'; // Example icons

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Art Platform
        </Link>
        <div>
          {/* Placeholder for navigation links or user actions */}
          <Link to="/test" className="hover:text-gray-200 mr-4">Test Page</Link>
          {/* Example Auth Links - uncomment and adapt when auth is ready */}
          {/*
          <Link to="/login" className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 mr-2">
            <LogIn className="mr-1 h-4 w-4" /> Login
          </Link>
          <Link to="/signup" className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
            <UserPlus className="mr-1 h-4 w-4" /> Sign Up
          </Link>
           */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
