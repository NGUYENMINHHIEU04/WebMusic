
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Music, User, Home, Settings, Album } from "lucide-react";
import { motion } from "framer-motion";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: "/songs", label: "Songs", icon: <Music className="w-5 h-5" /> },
    { to: "/albums", label: "Albums", icon: <Album className="w-5 h-5" /> },
    { to: "/users", label: "Users", icon: <User className="w-5 h-5" /> },
    { to: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md border-r border-border hidden md:flex md:flex-col">
        <div className="flex items-center h-16 px-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="w-6 h-6" />
            <span className="text-lg font-semibold"> LMH Music</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-lg transition-all hover-scale",
                location.pathname === item.to
                  ? "bg-secondary text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-10 flex items-center h-16 px-4 bg-white border-b md:hidden">
        <Link to="/" className="flex items-center space-x-2">
          <Music className="w-6 h-6" />
          <span className="text-lg font-semibold">Music Management</span>
        </Link>
      </div>

      {/* Mobile navigation */}
      <div className="fixed inset-x-0 bottom-0 z-10 flex items-center h-16 bg-white border-t md:hidden">
        <nav className="flex items-center justify-around w-full">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                location.pathname === item.to
                  ? "text-primary"
                  : "text-muted-foreground"
              )}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-16 md:pb-0 md:pl-64">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="container max-w-7xl py-6 md:py-8 px-4 md:px-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
