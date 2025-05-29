
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
  ChevronDown,
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [modulesOpen, setModulesOpen] = useState(true);
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  const renderSubMenuItems = (items: typeof moduleItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title} className="w-full">
        <SidebarMenuButton asChild className="w-full p-0 h-auto">
          <NavLink
            to={item.url}
            className={({ isActive: navIsActive }) =>
              `flex items-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 w-full text-left ml-4 ${
                isActive(item.url) || navIsActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 text-sm">{item.title}</span>
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
              <Collapsible open={dashboardOpen} onOpenChange={setDashboardOpen}>
                <CollapsibleTrigger className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100">
                  <Home className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">Dashboard</span>
                  {dashboardOpen ? (
                    <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {renderSubMenuItems(dashboardItems)}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Modules */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <Collapsible open={modulesOpen} onOpenChange={setModulesOpen}>
                <CollapsibleTrigger className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100">
                  <Package className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">Modules</span>
                  {modulesOpen ? (
                    <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {renderSubMenuItems(moduleItems)}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Global Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <Collapsible open={globalSettingsOpen} onOpenChange={setGlobalSettingsOpen}>
                <CollapsibleTrigger className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100">
                  <Shield className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">Global Settings</span>
                  {globalSettingsOpen ? (
                    <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {renderSubMenuItems(globalSettingsItems)}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <Collapsible open={supportOpen} onOpenChange={setSupportOpen}>
                <CollapsibleTrigger className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100">
                  <Headphones className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700">Support</span>
                  {supportOpen ? (
                    <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {renderSubMenuItems(supportItems)}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
