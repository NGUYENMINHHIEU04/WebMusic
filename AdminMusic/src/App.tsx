
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Artists from "./pages/Artist";
import Users from "./pages/Users";
import AudioManager from "./pages/AudioManager";
import Images from "./pages/Images";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected Route component that uses the useAuth hook
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Admin Login Route */}
                <Route path="/admin-login" element={<AdminLogin />} />
                
                {/* Protected Admin Routes */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="songs" element={<Songs />} />
                  <Route path="albums" element={<Albums />} />
                  <Route path="albums/:id" element={<AlbumDetail />} />
                  <Route path="artists" element={<Artists />} />
                  <Route path="users" element={<Users />} />
                  <Route path="audio" element={<AudioManager />} />
                  <Route path="images" element={<Images />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Admin Panel Route (same as home but with different URL) */}
                <Route 
                  path="/admin-panel" 
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                </Route>
                
                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
