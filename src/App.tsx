
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import ProUpgrade from "./pages/ProUpgrade";
import Portfolio from "./pages/Portfolio";
import StockDetail from "./pages/StockDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing login on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('breakoutEdgeUser');
    const savedAdmin = localStorage.getItem('breakoutEdgeAdmin');
    if (savedUser) {
      setUser(savedUser);
    }
    if (savedAdmin) {
      setAdminUser(savedAdmin);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    localStorage.setItem('breakoutEdgeUser', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('breakoutEdgeUser');
  };

  const handleRegister = (username: string) => {
    setUser(username);
    localStorage.setItem('breakoutEdgeUser', username);
  };

  const handleAdminLogin = (username: string) => {
    setAdminUser(username);
    localStorage.setItem('breakoutEdgeAdmin', username);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('breakoutEdgeAdmin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index user={user} onLogout={handleLogout} />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/pro-upgrade" element={<ProUpgrade />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleRegister} />} 
            />
            
            {/* Protected User Routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/portfolio" 
              element={user ? <Portfolio user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/stock/:symbol" 
              element={user ? <StockDetail user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={adminUser ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLogin={handleAdminLogin} />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={adminUser ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin" replace />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
