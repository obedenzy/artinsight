// Base configuration for API calls
import axios from 'axios';

// Retrieve the API base URL from environment variables
// Ensure VITE_API_BASE_URL is set in your .env file (e.g., VITE_API_BASE_URL=http://localhost:3001/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

console.log("API Base URL:", API_BASE_URL); // Log to verify

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptor to include JWT token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or however you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// Example service function structure:
// export const fetchArtworks = async () => {
//   try {
//     const response = await apiClient.get('/artworks');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching artworks:', error);
//     throw error; // Re-throw or handle as needed
//   }
// };
