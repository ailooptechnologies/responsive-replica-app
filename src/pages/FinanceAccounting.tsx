
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, BookOpen, Receipt, Users, Building, TrendingUp, Calculator, FileText, CreditCard, Banknote } from 'lucide-react';
import ChartOfAccounts from '@/components/finance/ChartOfAccounts';
import JournalEntries from '@/components/finance/JournalEntries';
import AccountsPayable from '@/components/finance/AccountsPayable';
import AccountsReceivable from '@/components/finance/AccountsReceivable';
import FixedAssets from '@/components/finance/FixedAssets';
import CashBankManagement from '@/components/finance/CashBankManagement';
import FinancialReporting from '@/components/finance/FinancialReporting';
import BudgetingForecasting from '@/components/finance/BudgetingForecasting';
import TaxManagement from '@/components/finance/TaxManagement';
import FinanceSettings from '@/components/finance/FinanceSettings';

const FinanceAccounting = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const modules = [
    { id: 'chart-accounts', label: 'Chart of Accounts', icon: BookOpen, component: ChartOfAccounts },
    { id: 'journal-entries', label: 'Journal Entries', icon: FileText, component: JournalEntries },
    { id: 'accounts-payable', label: 'Accounts Payable', icon: Receipt, component: AccountsPayable },
    { id: 'accounts-receivable', label: 'Accounts Receivable', icon: CreditCard, component: AccountsReceivable },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: Building, component: FixedAssets },
    { id: 'cash-bank', label: 'Cash & Bank', icon: Banknote, component: CashBankManagement },
    { id: 'reporting', label: 'Financial Reporting', icon: TrendingUp, component: FinancialReporting },
    { id: 'budgeting', label: 'Budgeting & Forecasting', icon: Calculator, component: BudgetingForecasting },
    { id: 'tax-management', label: 'Tax Management', icon: Users, component: TaxManagement },
    { id: 'settings', label: 'Finance Settings', icon: Settings, component: FinanceSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Finance & Accounting</h1>
        <p className="text-gray-600">Comprehensive financial management system</p>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            {modules.map(module => (
              <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-1">
                <module.icon className="h-3 w-3" />
                <span className="hidden lg:inline">{module.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(module => (
                <Card key={module.id} className="cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setActiveTab(module.id)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <module.icon className="h-5 w-5 text-primary" />
                      {module.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">Open Module</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {modules.map(module => (
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
