import React from 'react'
import ReactDOM from 'react-dom/client'
// Temporarily remove Router import
// import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Temporarily remove Router */}
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </React.StrictMode>,
  )
} else {
  console.error("Failed to find the root element. Check your index.html file.");
}
