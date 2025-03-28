import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router here
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx'; // Import AuthProvider
// import { validateEnv } from './config/env.ts'; // Import validateEnv

// // Validate environment variables on startup
// try {
//   validateEnv();
// } catch (error) {
//   console.error("Application startup failed due to invalid environment variables.");
//   // Optionally render an error message to the user or halt execution
//   // For now, we log and potentially let the app crash or misbehave later.
// }


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router> {/* Router wraps AuthProvider and App */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
