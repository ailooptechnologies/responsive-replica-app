import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Accounting from "./pages/Accounting";
import HRM from "./pages/HRM";
import Project from "./pages/Project";
import CRM from "./pages/CRM";
import ProjectSystem from "./pages/ProjectSystem";
import UserManagement from "./pages/UserManagement";
import ProductsSystem from "./pages/ProductsSystem";
import POS from "./pages/POS";
import SupportSystem from "./pages/SupportSystem";
import ZoomMeeting from "./pages/ZoomMeeting";
import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={
            <SidebarProvider>
              <Layout>
                <Dashboard />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/dashboard" element={
            <SidebarProvider>
              <Layout>
                <Dashboard />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/accounting" element={
            <SidebarProvider>
              <Layout>
                <Accounting />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/hrm" element={
            <SidebarProvider>
              <Layout>
                <HRM />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/project" element={
            <SidebarProvider>
              <Layout>
                <Project />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/crm" element={
            <SidebarProvider>
              <Layout>
                <CRM />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/project-system" element={
            <SidebarProvider>
              <Layout>
                <ProjectSystem />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/user-management" element={
            <SidebarProvider>
              <Layout>
                <UserManagement />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/products-system" element={
            <SidebarProvider>
              <Layout>
                <ProductsSystem />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/pos" element={
            <SidebarProvider>
              <Layout>
                <POS />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/support-system" element={
            <SidebarProvider>
              <Layout>
                <SupportSystem />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/zoom-meeting" element={
            <SidebarProvider>
              <Layout>
                <ZoomMeeting />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/messenger" element={
            <SidebarProvider>
              <Layout>
                <Messenger />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="/settings" element={
            <SidebarProvider>
              <Layout>
                <Settings />
              </Layout>
            </SidebarProvider>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
