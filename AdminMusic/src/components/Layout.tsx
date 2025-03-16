
import { Button } from "@/components/ui/button";
import { MusicIcon, Users, Album, LayoutDashboard, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
    toast({
      title: `Đã chuyển đến ${path}`,
      description: "Chuyển hướng thành công",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống",
    });
    // Trong tương lai sẽ thêm xử lý đăng xuất thực tế ở đây
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6" />
            <h1 className="text-xl font-semibold">LMH Music Admin</h1>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4 bg-sidebar text-sidebar-foreground flex flex-col justify-between">
          <nav className="space-y-2">
            <Button
              variant={currentPath === "/" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={currentPath === "/songs" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/songs")}
            >
              <MusicIcon className="mr-2 h-4 w-4" />
              Quản lý bài hát
            </Button>
            <Button
              variant={currentPath === "/albums" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/albums")}
            >
              <Album className="mr-2 h-4 w-4" />
              Quản lý album
            </Button>
            <Button
              variant={currentPath === "/users" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Quản lý người dùng
            </Button>
          </nav>
          
          {/* Admin Profile Section */}
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center p-2 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@music.app</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-2"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
