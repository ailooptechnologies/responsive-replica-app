
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Settings, Globe, Calendar, Workflow, DollarSign, Clock } from 'lucide-react';

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  isBaseCurrency: boolean;
  status: 'Active' | 'Inactive';
}

interface FiscalPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Open' | 'Closed' | 'Current';
  type: 'Monthly' | 'Quarterly' | 'Yearly';
}

const ModuleSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('currencies');

  const [currencies, setCurrencies] = useState<Currency[]>([
    { id: '1', code: 'USD', name: 'US Dollar', symbol: '$', exchangeRate: 1.0, isBaseCurrency: true, status: 'Active' },
    { id: '2', code: 'EUR', name: 'Euro', symbol: '€', exchangeRate: 0.85, isBaseCurrency: false, status: 'Active' },
    { id: '3', code: 'GBP', name: 'British Pound', symbol: '£', exchangeRate: 0.73, isBaseCurrency: false, status: 'Active' },
    { id: '4', code: 'JPY', name: 'Japanese Yen', symbol: '¥', exchangeRate: 110.0, isBaseCurrency: false, status: 'Active' },
  ]);

  const [fiscalPeriods, setFiscalPeriods] = useState<FiscalPeriod[]>([
    { id: '1', name: 'January 2025', startDate: '2025-01-01', endDate: '2025-01-31', status: 'Current', type: 'Monthly' },
    { id: '2', name: 'February 2025', startDate: '2025-02-01', endDate: '2025-02-28', status: 'Open', type: 'Monthly' },
    { id: '3', name: 'Q1 2025', startDate: '2025-01-01', endDate: '2025-03-31', status: 'Open', type: 'Quarterly' },
    { id: '4', name: 'FY 2025', startDate: '2025-01-01', endDate: '2025-12-31', status: 'Open', type: 'Yearly' },
  ]);

  const [systemSettings, setSystemSettings] = useState({
    autoNumbering: true,
    multiCurrency: true,
    approvalWorkflow: false,
    auditTrail: true,
    emailNotifications: true,
    autoBackup: true,
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    decimalPlaces: 2,
    fiscalYearStart: 'January',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'currency' | 'period'>('currency');
  const [editingItem, setEditingItem] = useState<any>(null);

  const [currencyForm, setCurrencyForm] = useState({
    code: '',
    name: '',
    symbol: '',
    exchangeRate: 1.0,
    isBaseCurrency: false,
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [periodForm, setPeriodForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: 'Monthly' as 'Monthly' | 'Quarterly' | 'Yearly'
  });

  const openCurrencyDialog = (currency?: Currency) => {
    setDialogType('currency');
    setEditingItem(currency);
    if (currency) {
      setCurrencyForm({
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol,
        exchangeRate: currency.exchangeRate,
        isBaseCurrency: currency.isBaseCurrency,
        status: currency.status
      });
    } else {
      setCurrencyForm({
        code: '',
        name: '',
        symbol: '',
        exchangeRate: 1.0,
        isBaseCurrency: false,
        status: 'Active'
      });
    }
    setIsDialogOpen(true);
  };

  const openPeriodDialog = (period?: FiscalPeriod) => {
    setDialogType('period');
    setEditingItem(period);
    if (period) {
      setPeriodForm({
        name: period.name,
        startDate: period.startDate,
        endDate: period.endDate,
        type: period.type
      });
    } else {
      setPeriodForm({
        name: '',
        startDate: '',
        endDate: '',
        type: 'Monthly'
      });
    }
    setIsDialogOpen(true);
  };

  const saveCurrency = () => {
    const newCurrency: Currency = {
      id: editingItem?.id || `CUR-${Date.now()}`,
      ...currencyForm,
      status: currencyForm.status
    };

    if (editingItem) {
      setCurrencies(prev => prev.map(c => c.id === editingItem.id ? newCurrency : c));
      toast({ title: "Currency Updated", description: `${newCurrency.name} has been updated successfully.` });
    } else {
      setCurrencies(prev => [...prev, newCurrency]);
      toast({ title: "Currency Added", description: `${newCurrency.name} has been added successfully.` });
    }

    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const savePeriod = () => {
    const newPeriod: FiscalPeriod = {
      id: editingItem?.id || `PER-${Date.now()}`,
      ...periodForm,
      status: 'Open' as const
    };

    if (editingItem) {
      setFiscalPeriods(prev => prev.map(p => p.id === editingItem.id ? newPeriod : p));
      toast({ title: "Period Updated", description: `${newPeriod.name} has been updated successfully.` });
    } else {
      setFiscalPeriods(prev => [...prev, newPeriod]);
      toast({ title: "Period Created", description: `${newPeriod.name} has been created successfully.` });
    }

    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const closePeriod = (periodId: string) => {
    setFiscalPeriods(prev => 
      prev.map(p => 
        p.id === periodId ? { ...p, status: 'Closed' as const } : p
      )
    );
    toast({ title: "Period Closed", description: "Fiscal period has been closed successfully." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Finance Module Settings</h2>
        <p className="text-gray-600">Configure currencies, fiscal periods, and system preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="currencies" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Currencies
          </TabsTrigger>
          <TabsTrigger value="periods" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Fiscal Periods
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="currencies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Currency Management</CardTitle>
                <Button onClick={() => openCurrencyDialog()}>Add Currency</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Code</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Symbol</th>
                      <th className="text-right p-2">Exchange Rate</th>
                      <th className="text-left p-2">Base Currency</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencies.map(currency => (
                      <tr key={currency.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono font-bold">{currency.code}</td>
                        <td className="p-2">{currency.name}</td>
                        <td className="p-2 font-mono">{currency.symbol}</td>
                        <td className="p-2 text-right font-mono">{currency.exchangeRate.toFixed(4)}</td>
                        <td className="p-2">
                          {currency.isBaseCurrency && (
                            <Badge variant="default">Base</Badge>
                          )}
                        </td>
                        <td className="p-2">
                          <Badge variant={currency.status === 'Active' ? 'default' : 'secondary'}>
                            {currency.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm" onClick={() => openCurrencyDialog(currency)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="periods" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Fiscal Period Management</CardTitle>
                <Button onClick={() => openPeriodDialog()}>Create Period</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Period Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Start Date</th>
                      <th className="text-left p-2">End Date</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiscalPeriods.map(period => (
                      <tr key={period.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{period.name}</td>
                        <td className="p-2">{period.type}</td>
                        <td className="p-2">{period.startDate}</td>
                        <td className="p-2">{period.endDate}</td>
                        <td className="p-2">
                          <Badge variant={
                            period.status === 'Current' ? 'default' : 
                            period.status === 'Open' ? 'secondary' : 'destructive'
                          }>
                            {period.status}
                          </Badge>
                        </td>
                        <td className="p-2 space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openPeriodDialog(period)}>
                            Edit
                          </Button>
                          {period.status === 'Open' && (
                            <Button variant="outline" size="sm" onClick={() => closePeriod(period.id)}>
                              Close
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Approval Workflows</Label>
                  <p className="text-sm text-gray-600">Enable approval workflows for transactions</p>
                </div>
                <Switch 
                  checked={systemSettings.approvalWorkflow}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, approvalWorkflow: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email notifications for workflow events</p>
                </div>
                <Switch 
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, emailNotifications: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Audit Trail</Label>
                  <p className="text-sm text-gray-600">Maintain comprehensive audit logs</p>
                </div>
                <Switch 
                  checked={systemSettings.auditTrail}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, auditTrail: checked}))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="defaultCurrency">Default Currency</Label>
                  <Select value={systemSettings.defaultCurrency} onValueChange={(value) => setSystemSettings(prev => ({...prev, defaultCurrency: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.filter(c => c.status === 'Active').map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings(prev => ({...prev, dateFormat: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="decimalPlaces">Decimal Places</Label>
                  <Select value={systemSettings.decimalPlaces.toString()} onValueChange={(value) => setSystemSettings(prev => ({...prev, decimalPlaces: parseInt(value)}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                  <Select value={systemSettings.fiscalYearStart} onValueChange={(value) => setSystemSettings(prev => ({...prev, fiscalYearStart: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto Numbering</Label>
                    <p className="text-sm text-gray-600">Automatically generate document numbers</p>
                  </div>
                  <Switch 
                    checked={systemSettings.autoNumbering}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, autoNumbering: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Multi-Currency Support</Label>
                    <p className="text-sm text-gray-600">Enable multi-currency transactions</p>
                  </div>
                  <Switch 
                    checked={systemSettings.multiCurrency}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, multiCurrency: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto Backup</Label>
                    <p className="text-sm text-gray-600">Automatically backup system data</p>
                  </div>
                  <Switch 
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, autoBackup: checked}))}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={() => toast({ title: "Settings Saved", description: "System settings have been saved successfully." })}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'currency' 
                ? (editingItem ? 'Edit Currency' : 'Add Currency')
                : (editingItem ? 'Edit Period' : 'Create Fiscal Period')
              }
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === 'currency' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Currency Code</Label>
                  <Input
                    id="code"
                    value={currencyForm.code}
                    onChange={(e) => setCurrencyForm({...currencyForm, code: e.target.value.toUpperCase()})}
                    placeholder="USD"
                    maxLength={3}
                  />
                </div>
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={currencyForm.symbol}
                    onChange={(e) => setCurrencyForm({...currencyForm, symbol: e.target.value})}
                    placeholder="$"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="name">Currency Name</Label>
                <Input
                  id="name"
                  value={currencyForm.name}
                  onChange={(e) => setCurrencyForm({...currencyForm, name: e.target.value})}
                  placeholder="US Dollar"
                />
              </div>
              <div>
                <Label htmlFor="exchangeRate">Exchange Rate</Label>
                <Input
                  id="exchangeRate"
                  type="number"
                  step="0.0001"
                  value={currencyForm.exchangeRate}
                  onChange={(e) => setCurrencyForm({...currencyForm, exchangeRate: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={currencyForm.isBaseCurrency}
                  onCheckedChange={(checked) => setCurrencyForm({...currencyForm, isBaseCurrency: checked})}
                />
                <Label>Set as Base Currency</Label>
              </div>
              <Button onClick={saveCurrency} className="w-full">
                {editingItem ? 'Update Currency' : 'Add Currency'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="periodName">Period Name</Label>
                <Input
                  id="periodName"
                  value={periodForm.name}
                  onChange={(e) => setPeriodForm({...periodForm, name: e.target.value})}
                  placeholder="January 2025"
                />
              </div>
              <div>
                <Label htmlFor="periodType">Period Type</Label>
                <Select value={periodForm.type} onValueChange={(value: 'Monthly' | 'Quarterly' | 'Yearly') => setPeriodForm({...periodForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={periodForm.startDate}
                    onChange={(e) => setPeriodForm({...periodForm, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={periodForm.endDate}
                    onChange={(e) => setPeriodForm({...periodForm, endDate: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={savePeriod} className="w-full">
                {editingItem ? 'Update Period' : 'Create Period'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleSettings;
