import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { ProfileModal } from "./ProfileModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleSupport = () => {
    toast({
      title: "Support",
      description: "Opening support center...",
    });
  };

  const handleTerms = () => {
    toast({
      title: "Terms & Conditions",
      description: "Opening terms and conditions...",
    });
  };

  const handlePrivacy = () => {
    toast({
      title: "Privacy Policy",
      description: "Opening privacy policy...",
    });
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLanguageChange = (language: string) => {
    toast({
      title: "Language Changed",
      description: `Language changed to ${language}`,
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 1 new notification",
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                <span className="text-black">ERP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-primary text-white border-primary hover:bg-primary/90">
                  EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange("English")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("Spanish")}>Spanish</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("French")}>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 cursor-pointer" onClick={handleNotifications}>
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-700 hidden sm:block">Hi, company!</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
