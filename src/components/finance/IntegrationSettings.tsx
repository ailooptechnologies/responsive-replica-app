
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Workflow, Database, Globe, Mail, Settings, Plus, Link } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastSync: string;
  endpoint?: string;
  apiKey?: string;
  settings: Record<string, any>;
}

interface EmailConfig {
  id: string;
  name: string;
  smtpServer: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  isDefault: boolean;
  status: 'Active' | 'Inactive';
}

const IntegrationSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('integrations');

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Payroll System Integration',
      type: 'API',
      description: 'Sync employee salary data with payroll system',
      status: 'Active',
      lastSync: '2025-01-20 09:00:00',
      endpoint: 'https://api.payroll.company.com/v1',
      settings: { syncFrequency: 'daily', autoPosting: true }
    },
    {
      id: '2',
      name: 'Bank Feed - Chase Business',
      type: 'Bank',
      description: 'Automated bank statement import',
      status: 'Active',
      lastSync: '2025-01-20 06:00:00',
      settings: { accountNumber: '****1234', autoReconcile: false }
    },
    {
      id: '3',
      name: 'CRM Integration - Salesforce',
      type: 'CRM',
      description: 'Customer data synchronization',
      status: 'Pending',
      lastSync: 'Never',
      endpoint: 'https://company.salesforce.com/api',
      settings: { syncCustomers: true, syncInvoices: true }
    }
  ]);

  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([
    {
      id: '1',
      name: 'Finance Department SMTP',
      smtpServer: 'smtp.company.com',
      port: 587,
      username: 'finance@company.com',
      password: '••••••••',
      encryption: 'STARTTLS',
      isDefault: true,
      status: 'Active'
    }
  ]);

  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [editingEmail, setEditingEmail] = useState<EmailConfig | null>(null);

  const [integrationForm, setIntegrationForm] = useState({
    name: '',
    type: 'API',
    description: '',
    endpoint: '',
    apiKey: '',
    status: 'Active' as 'Active' | 'Inactive',
    settings: {} as Record<string, any>
  });

  const [emailForm, setEmailForm] = useState({
    name: '',
    smtpServer: '',
    port: 587,
    username: '',
    password: '',
    encryption: 'STARTTLS',
    isDefault: false,
    status: 'Active' as 'Active' | 'Inactive'
  });

  const integrationTypes = [
    { value: 'API', label: 'REST API' },
    { value: 'Bank', label: 'Bank Feed' },
    { value: 'CRM', label: 'CRM System' },
    { value: 'ERP', label: 'ERP System' },
    { value: 'FTP', label: 'FTP/SFTP' },
    { value: 'Webhook', label: 'Webhook' },
    { value: 'RPA', label: 'RPA Bot' },
    { value: 'Zapier', label: 'Zapier' },
    { value: 'PowerAutomate', label: 'Power Automate' }
  ];

  const openIntegrationDialog = (integration?: Integration) => {
    setEditingIntegration(integration || null);
    if (integration) {
      setIntegrationForm({
        name: integration.name,
        type: integration.type,
        description: integration.description,
        endpoint: integration.endpoint || '',
        apiKey: integration.apiKey || '',
        status: integration.status === 'Pending' ? 'Active' : integration.status,
        settings: integration.settings
      });
    } else {
      setIntegrationForm({
        name: '',
        type: 'API',
        description: '',
        endpoint: '',
        apiKey: '',
        status: 'Active',
        settings: {}
      });
    }
    setIsIntegrationDialogOpen(true);
  };

  const openEmailDialog = (email?: EmailConfig) => {
    setEditingEmail(email || null);
    if (email) {
      setEmailForm({
        name: email.name,
        smtpServer: email.smtpServer,
        port: email.port,
        username: email.username,
        password: email.password,
        encryption: email.encryption,
        isDefault: email.isDefault,
        status: email.status
      });
    } else {
      setEmailForm({
        name: '',
        smtpServer: '',
        port: 587,
        username: '',
        password: '',
        encryption: 'STARTTLS',
        isDefault: false,
        status: 'Active'
      });
    }
    setIsEmailDialogOpen(true);
  };

  const saveIntegration = () => {
    const newIntegration: Integration = {
      id: editingIntegration?.id || `INT-${Date.now()}`,
      ...integrationForm,
      lastSync: editingIntegration?.lastSync || 'Never'
    };

    if (editingIntegration) {
      setIntegrations(prev => prev.map(i => i.id === editingIntegration.id ? newIntegration : i));
      toast({ title: "Integration Updated", description: `${newIntegration.name} has been updated successfully.` });
    } else {
      setIntegrations(prev => [...prev, newIntegration]);
      toast({ title: "Integration Created", description: `${newIntegration.name} has been created successfully.` });
    }

    setIsIntegrationDialogOpen(false);
    setEditingIntegration(null);
  };

  const saveEmailConfig = () => {
    const newEmail: EmailConfig = {
      id: editingEmail?.id || `EMAIL-${Date.now()}`,
      ...emailForm
    };

    if (editingEmail) {
      setEmailConfigs(prev => prev.map(e => e.id === editingEmail.id ? newEmail : e));
      toast({ title: "Email Config Updated", description: `${newEmail.name} has been updated successfully.` });
    } else {
      setEmailConfigs(prev => [...prev, newEmail]);
      toast({ title: "Email Config Created", description: `${newEmail.name} has been created successfully.` });
    }

    setIsEmailDialogOpen(false);
    setEditingEmail(null);
  };

  const testIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      // Simulate testing
      setTimeout(() => {
        setIntegrations(prev => 
          prev.map(i => 
            i.id === integrationId 
              ? { ...i, status: 'Active' as const, lastSync: new Date().toISOString().replace('T', ' ').slice(0, 19) }
              : i
          )
        );
        toast({ title: "Test Successful", description: `${integration.name} connection test passed.` });
      }, 2000);
      
      toast({ title: "Testing Connection", description: `Testing ${integration.name}...` });
    }
  };

  const syncIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      setIntegrations(prev => 
        prev.map(i => 
          i.id === integrationId 
            ? { ...i, lastSync: new Date().toISOString().replace('T', ' ').slice(0, 19) }
            : i
        )
      );
      toast({ title: "Sync Complete", description: `${integration.name} data synchronized successfully.` });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Integration Settings</h2>
        <p className="text-gray-600">Configure system integrations and external connections</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Config
          </TabsTrigger>
          <TabsTrigger value="apis" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            API Endpoints
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>System Integrations</CardTitle>
                <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openIntegrationDialog()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Integration
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingIntegration ? 'Edit Integration' : 'Add New Integration'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="intName">Integration Name</Label>
                          <Input
                            id="intName"
                            value={integrationForm.name}
                            onChange={(e) => setIntegrationForm({...integrationForm, name: e.target.value})}
                            placeholder="Enter integration name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="intType">Integration Type</Label>
                          <Select value={integrationForm.type} onValueChange={(value) => setIntegrationForm({...integrationForm, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {integrationTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="intDescription">Description</Label>
                        <Textarea
                          id="intDescription"
                          value={integrationForm.description}
                          onChange={(e) => setIntegrationForm({...integrationForm, description: e.target.value})}
                          placeholder="Enter integration description"
                          rows={3}
                        />
                      </div>

                      {(integrationForm.type === 'API' || integrationForm.type === 'CRM' || integrationForm.type === 'ERP') && (
                        <>
                          <div>
                            <Label htmlFor="endpoint">API Endpoint</Label>
                            <Input
                              id="endpoint"
                              value={integrationForm.endpoint}
                              onChange={(e) => setIntegrationForm({...integrationForm, endpoint: e.target.value})}
                              placeholder="https://api.example.com/v1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="apiKey">API Key</Label>
                            <Input
                              id="apiKey"
                              type="password"
                              value={integrationForm.apiKey}
                              onChange={(e) => setIntegrationForm({...integrationForm, apiKey: e.target.value})}
                              placeholder="Enter API key"
                            />
                          </div>
                        </>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={saveIntegration}>
                          {editingIntegration ? 'Update Integration' : 'Create Integration'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                      <th className="text-left p-2">Last Sync</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrations.map(integration => (
                      <tr key={integration.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{integration.name}</td>
                        <td className="p-2">
                          <Badge variant="outline">{integration.type}</Badge>
                        </td>
                        <td className="p-2 text-sm text-gray-600">{integration.description}</td>
                        <td className="p-2 text-sm">{integration.lastSync}</td>
                        <td className="p-2">
                          <Badge variant={
                            integration.status === 'Active' ? 'default' : 
                            integration.status === 'Pending' ? 'secondary' : 'destructive'
                          }>
                            {integration.status}
                          </Badge>
                        </td>
                        <td className="p-2 space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openIntegrationDialog(integration)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => testIntegration(integration.id)}>
                            Test
                          </Button>
                          {integration.status === 'Active' && (
                            <Button variant="outline" size="sm" onClick={() => syncIntegration(integration.id)}>
                              Sync
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

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Email Configuration</CardTitle>
                <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openEmailDialog()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Email Config
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingEmail ? 'Edit Email Config' : 'Add Email Configuration'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="emailName">Configuration Name</Label>
                        <Input
                          id="emailName"
                          value={emailForm.name}
                          onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                          placeholder="Finance Department SMTP"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="smtpServer">SMTP Server</Label>
                          <Input
                            id="smtpServer"
                            value={emailForm.smtpServer}
                            onChange={(e) => setEmailForm({...emailForm, smtpServer: e.target.value})}
                            placeholder="smtp.company.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="port">Port</Label>
                          <Input
                            id="port"
                            type="number"
                            value={emailForm.port}
                            onChange={(e) => setEmailForm({...emailForm, port: parseInt(e.target.value) || 587})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={emailForm.username}
                          onChange={(e) => setEmailForm({...emailForm, username: e.target.value})}
                          placeholder="finance@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={emailForm.password}
                          onChange={(e) => setEmailForm({...emailForm, password: e.target.value})}
                          placeholder="Enter password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="encryption">Encryption</Label>
                        <Select value={emailForm.encryption} onValueChange={(value) => setEmailForm({...emailForm, encryption: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="STARTTLS">STARTTLS</SelectItem>
                            <SelectItem value="SSL">SSL</SelectItem>
                            <SelectItem value="TLS">TLS</SelectItem>
                            <SelectItem value="None">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={emailForm.isDefault}
                          onCheckedChange={(checked) => setEmailForm({...emailForm, isDefault: checked})}
                        />
                        <Label>Set as default configuration</Label>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={saveEmailConfig}>
                          {editingEmail ? 'Update Configuration' : 'Add Configuration'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">SMTP Server</th>
                      <th className="text-left p-2">Username</th>
                      <th className="text-left p-2">Encryption</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailConfigs.map(config => (
                      <tr key={config.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{config.name}</td>
                        <td className="p-2">{config.smtpServer}:{config.port}</td>
                        <td className="p-2">{config.username}</td>
                        <td className="p-2">{config.encryption}</td>
                        <td className="p-2">
                          {config.isDefault && <Badge variant="default">Default</Badge>}
                        </td>
                        <td className="p-2">
                          <Badge variant={config.status === 'Active' ? 'default' : 'secondary'}>
                            {config.status}
                          </Badge>
                        </td>
                        <td className="p-2 space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEmailDialog(config)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Test
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

        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Finance Module API Endpoints</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-mono">GET /api/v1/accounts</span>
                      <Badge variant="outline">Chart of Accounts</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono">POST /api/v1/journal-entries</span>
                      <Badge variant="outline">Journal Entries</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono">GET /api/v1/reports/balance-sheet</span>
                      <Badge variant="outline">Financial Reports</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono">POST /api/v1/invoices</span>
                      <Badge variant="outline">Accounts Receivable</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>API documentation and authentication details are available in the developer portal.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Available Webhook Events</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>journal_entry.created</span>
                      <Badge variant="secondary">Triggered when new journal entry is posted</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>invoice.paid</span>
                      <Badge variant="secondary">Triggered when invoice payment is received</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>period.closed</span>
                      <Badge variant="secondary">Triggered when fiscal period is closed</Badge>
                    </div>
                  </div>
                </div>
                <Button>Configure Webhooks</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationSettings;
