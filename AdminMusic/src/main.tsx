
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import adminApi from './services/api_admin';

// Check if user is logged in and redirect accordingly
const { isAuthenticated } = adminApi.checkAuthStatus();

// If not authenticated and not on login page, will be redirected by the ProtectedRoute component
createRoot(document.getElementById("root")!).render(<App />);
