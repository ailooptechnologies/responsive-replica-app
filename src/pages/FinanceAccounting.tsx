
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, BookOpen, Receipt, Users, Building, TrendingUp, Calculator, FileText, CreditCard, Banknote, Globe, Shield, Workflow } from 'lucide-react';
import ChartOfAccounts from '@/components/finance/ChartOfAccounts';
import JournalEntries from '@/components/finance/JournalEntries';
import AccountsPayable from '@/components/finance/AccountsPayable';
import AccountsReceivable from '@/components/finance/AccountsReceivable';
import FixedAssets from '@/components/finance/FixedAssets';
import CashBankManagement from '@/components/finance/CashBankManagement';
import FinancialReporting from '@/components/finance/FinancialReporting';
import BudgetingForecasting from '@/components/finance/BudgetingForecasting';
import TaxManagement from '@/components/finance/TaxManagement';
import ModuleSettings from '@/components/finance/ModuleSettings';
import CompanyManagement from '@/components/finance/CompanyManagement';
import UserRoleManagement from '@/components/finance/UserRoleManagement';
import IntegrationSettings from '@/components/finance/IntegrationSettings';

const FinanceAccounting = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const coreModules = [
    { id: 'chart-accounts', label: 'Chart of Accounts', icon: BookOpen, component: ChartOfAccounts, description: 'Manage account structure and GL accounts' },
    { id: 'journal-entries', label: 'Journal Entries', icon: FileText, component: JournalEntries, description: 'Record manual and automatic journal entries' },
    { id: 'accounts-payable', label: 'Accounts Payable', icon: Receipt, component: AccountsPayable, description: 'Vendor management and payables processing' },
    { id: 'accounts-receivable', label: 'Accounts Receivable', icon: CreditCard, component: AccountsReceivable, description: 'Customer invoicing and receivables management' },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: Building, component: FixedAssets, description: 'Asset tracking, depreciation, and disposal' },
    { id: 'cash-bank', label: 'Cash & Bank', icon: Banknote, component: CashBankManagement, description: 'Cash flow and bank reconciliation' },
  ];

  const reportingModules = [
    { id: 'reporting', label: 'Financial Reporting', icon: TrendingUp, component: FinancialReporting, description: 'Generate P&L, Balance Sheet, and custom reports' },
    { id: 'budgeting', label: 'Budgeting & Forecasting', icon: Calculator, component: BudgetingForecasting, description: 'Budget planning and variance analysis' },
    { id: 'tax-management', label: 'Tax Management', icon: Users, component: TaxManagement, description: 'Tax calculations and compliance reporting' },
  ];

  const systemModules = [
    { id: 'module-settings', label: 'Module Settings', icon: Settings, component: ModuleSettings, description: 'Configure currencies, periods, and workflows' },
    { id: 'company-management', label: 'Company Management', icon: Globe, component: CompanyManagement, description: 'Multi-entity and consolidation setup' },
    { id: 'user-roles', label: 'User & Role Management', icon: Shield, component: UserRoleManagement, description: 'Access control and permissions' },
    { id: 'integrations', label: 'Integration Settings', icon: Workflow, component: IntegrationSettings, description: 'API and system integrations' },
  ];

  const allModules = [...coreModules, ...reportingModules, ...systemModules];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Finance & Accounting</h1>
        <p className="text-gray-600">Comprehensive financial management and reporting system</p>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 mb-6 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 h-16">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            {allModules.map(module => (
              <TabsTrigger key={module.id} value={module.id} className="flex flex-col items-center gap-1 h-16">
                <module.icon className="h-4 w-4" />
                <span className="text-xs text-center leading-tight">{module.label.split(' ').map(word => word.length > 6 ? word.slice(0, 6) + '...' : word).join(' ')}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-8">
              {/* Core Financial Modules */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Core Financial Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coreModules.map(module => (
                    <Card key={module.id} className="cursor-pointer hover:shadow-lg transition-shadow" 
                          onClick={() => setActiveTab(module.id)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <module.icon className="h-5 w-5 text-primary" />
                          {module.label}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">Open Module</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reporting & Analysis */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Reporting & Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reportingModules.map(module => (
                    <Card key={module.id} className="cursor-pointer hover:shadow-lg transition-shadow" 
                          onClick={() => setActiveTab(module.id)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <module.icon className="h-5 w-5 text-primary" />
                          {module.label}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">Open Module</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* System Administration */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">System Administration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {systemModules.map(module => (
                    <Card key={module.id} className="cursor-pointer hover:shadow-lg transition-shadow" 
                          onClick={() => setActiveTab(module.id)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <module.icon className="h-5 w-5 text-primary" />
                          {module.label}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">Open Module</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {allModules.map(module => (
            <TabsContent key={module.id} value={module.id}>
              <module.component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FinanceAccounting;
