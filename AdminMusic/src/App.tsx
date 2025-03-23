
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/context/DataContext";
import { AudioProvider } from "@/context/AudioContext";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Layout from "@/components/Layout";
import AudioPlayer from "@/components/AudioPlayer";

import Index from "./pages/Index";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <AudioProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/songs" element={<Songs />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <AudioPlayer />
          </BrowserRouter>
          <ShadcnToaster />
          <Sonner />
          <ToastContainer position="top-right" />
        </TooltipProvider>
      </AudioProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
