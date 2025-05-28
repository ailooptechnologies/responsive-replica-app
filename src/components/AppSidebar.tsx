
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
  Truck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const dashboardItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
];

const moduleItems = [
  { title: "Accounting & Finance", url: "/accounting", icon: Calculator },
  { title: "Supply Chain", url: "/supply-chain", icon: Truck },
  { title: "CRM System", url: "/crm", icon: UserCheck },
  { title: "POS System", url: "/pos", icon: ShoppingCart },
  { title: "Project System", url: "/project", icon: FolderOpen },
  { title: "HRM", url: "/hrm", icon: Users },
];

const globalSettingsItems = [
  { title: "User Management", url: "/user-management", icon: Shield },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

const supportItems = [
  { title: "Support System", url: "/support-system", icon: Headphones },
  { title: "Zoom Meeting", url: "/zoom-meeting", icon: Video },
  { title: "Messenger", url: "/messenger", icon: MessageCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  const renderMenuItems = (items: typeof moduleItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title} className="w-full">
        <SidebarMenuButton asChild className="w-full p-0 h-auto">
          <NavLink
            to={item.url}
            className={({ isActive: navIsActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left ${
                isActive(item.url) || navIsActive
                  ? "bg-primary shadow-md"
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
    ));
  };

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200" collapsible="none">
      <SidebarContent className="p-4">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderMenuItems(dashboardItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderMenuItems(moduleItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Global Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Global Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderMenuItems(globalSettingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderMenuItems(supportItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
