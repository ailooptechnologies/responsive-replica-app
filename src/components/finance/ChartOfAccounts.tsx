
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Account {
  id: string;
  code: string;
  name: string;
  type: string;
  category: string;
  parentAccount?: string;
  balance: number;
  status: 'Active' | 'Inactive';
  currency: string;
}

const ChartOfAccounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', code: '1000', name: 'Cash', type: 'Asset', category: 'Current Assets', balance: 25650, status: 'Active', currency: 'USD' },
    { id: '2', code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets', balance: 15800, status: 'Active', currency: 'USD' },
    { id: '3', code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities', balance: 8900, status: 'Active', currency: 'USD' },
    { id: '4', code: '3000', name: 'Capital', type: 'Equity', category: 'Owner Equity', balance: 50000, status: 'Active', currency: 'USD' },
    { id: '5', code: '4000', name: 'Sales Revenue', type: 'Revenue', category: 'Operating Revenue', balance: 125000, status: 'Active', currency: 'USD' },
    { id: '6', code: '5000', name: 'Cost of Goods Sold', type: 'Expense', category: 'Cost of Sales', balance: 75000, status: 'Active', currency: 'USD' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'Asset',
    category: '',
    parentAccount: '',
    currency: 'USD',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const accountTypes = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  const handleSave = () => {
    const newAccount: Account = {
      id: editingAccount?.id || `ACC-${Date.now()}`,
      ...formData,
      balance: editingAccount?.balance || 0
    };

    if (editingAccount) {
      setAccounts(prev => prev.map(acc => acc.id === editingAccount.id ? newAccount : acc));
      toast({ title: "Account Updated", description: `${newAccount.name} has been updated successfully.` });
    } else {
      setAccounts(prev => [...prev, newAccount]);
      toast({ title: "Account Created", description: `${newAccount.name} has been created successfully.` });
    }

    setIsDialogOpen(false);
    setEditingAccount(null);
    setFormData({ code: '', name: '', type: 'Asset', category: '', parentAccount: '', currency: 'USD', status: 'Active' });
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      code: account.code,
      name: account.name,
      type: account.type,
      category: account.category,
      parentAccount: account.parentAccount || '',
      currency: account.currency,
      status: account.status
    });
    setIsDialogOpen(true);
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Chart of Accounts</h2>
          <p className="text-gray-600">Manage your chart of accounts structure</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingAccount(null);
              setFormData({ code: '', name: '', type: 'Asset', category: '', parentAccount: '', currency: 'USD', status: 'Active' });
            }}>
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingAccount ? 'Edit Account' : 'Create New Account'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Account Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(curr => (
                        <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Cash"
                />
              </div>
              <div>
                <Label htmlFor="type">Account Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g., Current Assets"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingAccount ? 'Update Account' : 'Create Account'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Accounts List</CardTitle>
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Account Name</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Balance</th>
                  <th className="text-left p-2">Currency</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map(account => (
                  <tr key={account.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">{account.code}</td>
                    <td className="p-2">{account.name}</td>
                    <td className="p-2">{account.type}</td>
                    <td className="p-2">{account.category}</td>
                    <td className="p-2 text-right font-mono">
                      {account.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: account.currency
                      })}
                    </td>
                    <td className="p-2">{account.currency}</td>
                    <td className="p-2">
                      <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                        {account.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(account)}>
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
    </div>
  );
};

export default ChartOfAccounts;
