
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Calculator,
  Users,
  FolderOpen,
  UserCheck,
  Network,
  Shield,
  Package,
  ShoppingCart,
  Headphones,
  Video,
  MessageCircle,
  Settings as SettingsIcon,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Accounting", url: "/accounting", icon: Calculator },
  { title: "HRM", url: "/hrm", icon: Users },
  { title: "Project", url: "/project", icon: FolderOpen },
  { title: "CRM System", url: "/crm", icon: UserCheck },
  { title: "Project System", url: "/project-system", icon: Network },
  { title: "User Management", url: "/user-management", icon: Shield },
  { title: "Products System", url: "/products-system", icon: Package },
  { title: "POS System", url: "/pos", icon: ShoppingCart },
  { title: "Support System", url: "/support-system", icon: Headphones },
  { title: "Zoom Meeting", url: "/zoom-meeting", icon: Video },
  { title: "Messenger", url: "/messenger", icon: MessageCircle },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200" collapsible="none">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton asChild className="w-full p-0 h-auto">
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left ${
                          isActive(item.url) || navIsActive
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-sm font-medium">{item.title}</span>
                      <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
