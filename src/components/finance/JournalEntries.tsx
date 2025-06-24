
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entries: JournalLine[];
  status: 'Draft' | 'Posted' | 'Reversed';
  totalDebit: number;
  totalCredit: number;
}

interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
}

const JournalEntries = () => {
  const { toast } = useToast();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2025-01-01',
      reference: 'JE-001',
      description: 'Opening Balance',
      status: 'Posted',
      totalDebit: 25650,
      totalCredit: 25650,
      entries: [
        { id: '1', accountCode: '1000', accountName: 'Cash', debit: 25650, credit: 0, description: 'Opening cash balance' },
        { id: '2', accountCode: '3000', accountName: 'Capital', debit: 0, credit: 25650, description: 'Owner investment' }
      ]
    },
    {
      id: '2',
      date: '2025-01-03',
      reference: 'JE-002',
      description: 'Purchase Transaction',
      status: 'Posted',
      totalDebit: 15550,
      totalCredit: 15550,
      entries: [
        { id: '3', accountCode: '5000', accountName: 'Purchases', debit: 15550, credit: 0, description: 'Inventory purchase' },
        { id: '4', accountCode: '1000', accountName: 'Cash', debit: 0, credit: 15550, description: 'Cash payment' }
      ]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    reference: `JE-${String(Date.now()).slice(-3)}`,
    description: '',
    entries: [],
    status: 'Draft'
  });

  const [currentLine, setCurrentLine] = useState<Partial<JournalLine>>({
    accountCode: '',
    accountName: '',
    debit: 0,
    credit: 0,
    description: ''
  });

  const accounts = [
    { code: '1000', name: 'Cash' },
    { code: '1100', name: 'Accounts Receivable' },
    { code: '2000', name: 'Accounts Payable' },
    { code: '3000', name: 'Capital' },
    { code: '4000', name: 'Sales Revenue' },
    { code: '5000', name: 'Cost of Goods Sold' },
    { code: '6000', name: 'Advertising Expense' }
  ];

  const addJournalLine = () => {
    if (!currentLine.accountCode || (!currentLine.debit && !currentLine.credit)) {
      toast({ title: "Error", description: "Please select an account and enter debit or credit amount.", variant: "destructive" });
      return;
    }

    const selectedAccount = accounts.find(acc => acc.code === currentLine.accountCode);
    const newLine: JournalLine = {
      id: `line-${Date.now()}`,
      accountCode: currentLine.accountCode,
      accountName: selectedAccount?.name || '',
      debit: currentLine.debit || 0,
      credit: currentLine.credit || 0,
      description: currentLine.description || ''
    };

    setCurrentEntry(prev => ({
      ...prev,
      entries: [...(prev.entries || []), newLine]
    }));

    setCurrentLine({ accountCode: '', accountName: '', debit: 0, credit: 0, description: '' });
  };

  const removeJournalLine = (lineId: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      entries: prev.entries?.filter(line => line.id !== lineId) || []
    }));
  };

  const calculateTotals = () => {
    const entries = currentEntry.entries || [];
    const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
    const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);
    return { totalDebit, totalCredit };
  };

  const saveJournalEntry = () => {
    const { totalDebit, totalCredit } = calculateTotals();
    
    if (totalDebit !== totalCredit) {
      toast({ title: "Error", description: "Debits must equal credits.", variant: "destructive" });
      return;
    }

    if (!currentEntry.entries || currentEntry.entries.length < 2) {
      toast({ title: "Error", description: "Journal entry must have at least 2 lines.", variant: "destructive" });
      return;
    }

    const newEntry: JournalEntry = {
      id: `JE-${Date.now()}`,
      date: currentEntry.date || '',
      reference: currentEntry.reference || '',
      description: currentEntry.description || '',
      entries: currentEntry.entries || [],
      status: 'Draft',
      totalDebit,
      totalCredit
    };

    setJournalEntries(prev => [...prev, newEntry]);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      reference: `JE-${String(Date.now()).slice(-3)}`,
      description: '',
      entries: [],
      status: 'Draft'
    });
    setIsDialogOpen(false);
    toast({ title: "Success", description: "Journal entry created successfully." });
  };

  const postEntry = (entryId: string) => {
    setJournalEntries(prev => 
      prev.map(entry => 
        entry.id === entryId ? { ...entry, status: 'Posted' as const } : entry
      )
    );
    toast({ title: "Success", description: "Journal entry posted successfully." });
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Journal Entries</h2>
          <p className="text-gray-600">Record manual and automatic journal entries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Journal Entry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Journal Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={currentEntry.date}
                    onChange={(e) => setCurrentEntry(prev => ({...prev, date: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={currentEntry.reference}
                    onChange={(e) => setCurrentEntry(prev => ({...prev, reference: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={currentEntry.description}
                    onChange={(e) => setCurrentEntry(prev => ({...prev, description: e.target.value}))}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Add Journal Lines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <Label>Account</Label>
                      <Select value={currentLine.accountCode} onValueChange={(value) => {
                        const account = accounts.find(acc => acc.code === value);
                        setCurrentLine(prev => ({
                          ...prev,
                          accountCode: value,
                          accountName: account?.name || ''
                        }));
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.code} value={account.code}>
                              {account.code} - {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Debit</Label>
                      <Input
                        type="number"
                        value={currentLine.debit || ''}
                        onChange={(e) => setCurrentLine(prev => ({
                          ...prev,
                          debit: parseFloat(e.target.value) || 0,
                          credit: 0
                        }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Credit</Label>
                      <Input
                        type="number"
                        value={currentLine.credit || ''}
                        onChange={(e) => setCurrentLine(prev => ({
                          ...prev,
                          credit: parseFloat(e.target.value) || 0,
                          debit: 0
                        }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={currentLine.description}
                        onChange={(e) => setCurrentLine(prev => ({...prev, description: e.target.value}))}
                        placeholder="Line description"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addJournalLine} size="sm">Add Line</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {currentEntry.entries && currentEntry.entries.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Journal Lines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Account</th>
                            <th className="text-right p-2">Debit</th>
                            <th className="text-right p-2">Credit</th>
                            <th className="text-left p-2">Description</th>
                            <th className="text-left p-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEntry.entries.map(line => (
                            <tr key={line.id} className="border-b">
                              <td className="p-2">{line.accountCode} - {line.accountName}</td>
                              <td className="p-2 text-right">{line.debit > 0 ? line.debit.toFixed(2) : ''}</td>
                              <td className="p-2 text-right">{line.credit > 0 ? line.credit.toFixed(2) : ''}</td>
                              <td className="p-2">{line.description}</td>
                              <td className="p-2">
                                <Button variant="outline" size="sm" onClick={() => removeJournalLine(line.id)}>
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          <tr className="border-t-2 font-semibold">
                            <td className="p-2">Total</td>
                            <td className="p-2 text-right">{totalDebit.toFixed(2)}</td>
                            <td className="p-2 text-right">{totalCredit.toFixed(2)}</td>
                            <td className="p-2"></td>
                            <td className="p-2">
                              {isBalanced ? (
                                <Badge variant="default">Balanced</Badge>
                              ) : (
                                <Badge variant="destructive">Out of Balance</Badge>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveJournalEntry} disabled={!isBalanced}>
                  Save Journal Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entries List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Reference</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Total Debit</th>
                  <th className="text-right p-2">Total Credit</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map(entry => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{entry.date}</td>
                    <td className="p-2">{entry.reference}</td>
                    <td className="p-2">{entry.description}</td>
                    <td className="p-2 text-right">{entry.totalDebit.toFixed(2)}</td>
                    <td className="p-2 text-right">{entry.totalCredit.toFixed(2)}</td>
                    <td className="p-2">
                      <Badge variant={entry.status === 'Posted' ? 'default' : entry.status === 'Draft' ? 'secondary' : 'destructive'}>
                        {entry.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      {entry.status === 'Draft' && (
                        <Button variant="outline" size="sm" onClick={() => postEntry(entry.id)}>
                          Post
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
    </div>
  );
};

export default JournalEntries;
