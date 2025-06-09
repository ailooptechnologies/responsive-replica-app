'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const dashboardItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
]

const moduleItems = [
  { title: 'Accounting & Finance', url: '/dashboard/accounting', icon: Calculator },
  { title: 'Supply Chain', url: '/dashboard/supply-chain', icon: Truck },
  { title: 'CRM System', url: '/dashboard/crm', icon: UserCheck },
  { title: 'POS System', url: '/dashboard/pos', icon: ShoppingCart },
  { title: 'Project System', url: '/dashboard/projects', icon: FolderOpen },
  { title: 'HRM', url: '/dashboard/hrm', icon: Users },
]

const globalSettingsItems = [
  { title: 'User Management', url: '/dashboard/user-management', icon: Shield },
  { title: 'Settings', url: '/dashboard/settings', icon: SettingsIcon },
]

const supportItems = [
  { title: 'Support System', url: '/dashboard/support', icon: Headphones },
  { title: 'Zoom Meeting', url: '/dashboard/zoom', icon: Video },
  { title: 'Messenger', url: '/dashboard/messenger', icon: MessageCircle },
]

export function Sidebar({ onClose }) {
  const pathname = usePathname()
  
  const [dashboardOpen, setDashboardOpen] = useState(true)
  const [modulesOpen, setModulesOpen] = useState(true)
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)

  const isActive = (path) => pathname === path || (path === '/dashboard' && pathname === '/dashboard')

  const renderSubMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.title} className="w-full">
        <Link
          href={item.url}
          onClick={onClose}
          className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 w-full text-left ml-4 ${
            isActive(item.url)
              ? 'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-sm">{item.title}</span>
        </Link>
      </li>
    ))
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Close button for mobile */}
        <div className="flex justify-end lg:hidden mb-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Dashboard */}
        <div className="mb-4">
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium text-gray-700">Dashboard</span>
            {dashboardOpen ? (
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            )}
          </button>
          {dashboardOpen && (
            <ul className="space-y-1 mt-2">
              {renderSubMenuItems(dashboardItems)}
            </ul>
          )}
        </div>

        {/* Modules */}
        <div className="mb-4">
          <button
            onClick={() => setModulesOpen(!modulesOpen)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100"
          >
            <Package className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium text-gray-700">Modules</span>
            {modulesOpen ? (
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            )}
          </button>
          {modulesOpen && (
            <ul className="space-y-1 mt-2">
              {renderSubMenuItems(moduleItems)}
            </ul>
          )}
        </div>

        {/* Global Settings */}
        <div className="mb-4">
          <button
            onClick={() => setGlobalSettingsOpen(!globalSettingsOpen)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100"
          >
            <Shield className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium text-gray-700">Global Settings</span>
            {globalSettingsOpen ? (
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            )}
          </button>
          {globalSettingsOpen && (
            <ul className="space-y-1 mt-2">
              {renderSubMenuItems(globalSettingsItems)}
            </ul>
          )}
        </div>

        {/* Support */}
        <div className="mb-4">
          <button
            onClick={() => setSupportOpen(!supportOpen)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group w-full text-left hover:bg-gray-100"
          >
            <Headphones className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm font-medium text-gray-700">Support</span>
            {supportOpen ? (
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 flex-shrink-0" />
            )}
          </button>
          {supportOpen && (
            <ul className="space-y-1 mt-2">
              {renderSubMenuItems(supportItems)}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}