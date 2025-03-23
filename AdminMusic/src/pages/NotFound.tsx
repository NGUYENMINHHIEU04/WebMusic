
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        <h2 className="text-2xl font-medium mt-6 mb-2">Trang không tồn tại</h2>
        
        <p className="text-muted-foreground mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        
        <Link to="/">
          <Button className="gap-2">
            <Home className="w-4 h-4" />
            Trở về trang chủ
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
