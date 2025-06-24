
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Building, Globe, Plus } from 'lucide-react';

interface Company {
  id: string;
  code: string;
  name: string;
  legalName: string;
  taxId: string;
  currency: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  fiscalYearEnd: string;
  status: 'Active' | 'Inactive';
  isParent: boolean;
  parentCompany?: string;
}

const CompanyManagement = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      code: 'HQ',
      name: 'Headquarters',
      legalName: 'ABC Corporation Ltd.',
      taxId: '12-3456789',
      currency: 'USD',
      country: 'United States',
      address: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1-555-0123',
      email: 'contact@abccorp.com',
      website: 'www.abccorp.com',
      fiscalYearEnd: '12-31',
      status: 'Active',
      isParent: true
    },
    {
      id: '2',
      code: 'SUB1',
      name: 'Subsidiary One',
      legalName: 'ABC Europe GmbH',
      taxId: 'DE123456789',
      currency: 'EUR',
      country: 'Germany',
      address: '456 Europa Str',
      city: 'Berlin',
      state: 'Berlin',
      zipCode: '10115',
      phone: '+49-30-12345678',
      email: 'contact@abceurope.com',
      website: 'www.abceurope.com',
      fiscalYearEnd: '12-31',
      status: 'Active',
      isParent: false,
      parentCompany: '1'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    legalName: '',
    taxId: '',
    currency: 'USD',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    fiscalYearEnd: '12-31',
    status: 'Active' as 'Active' | 'Inactive',
    isParent: false,
    parentCompany: ''
  });

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const countries = ['United States', 'Germany', 'United Kingdom', 'Canada', 'Australia', 'Japan'];

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      code: company.code,
      name: company.name,
      legalName: company.legalName,
      taxId: company.taxId,
      currency: company.currency,
      country: company.country,
      address: company.address,
      city: company.city,
      state: company.state,
      zipCode: company.zipCode,
      phone: company.phone,
      email: company.email,
      website: company.website,
      fiscalYearEnd: company.fiscalYearEnd,
      status: company.status,
      isParent: company.isParent,
      parentCompany: company.parentCompany || ''
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const newCompany: Company = {
      id: editingCompany?.id || `COMP-${Date.now()}`,
      ...formData
    };

    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? newCompany : c));
      toast({ title: "Company Updated", description: `${newCompany.name} has been updated successfully.` });
    } else {
      setCompanies(prev => [...prev, newCompany]);
      toast({ title: "Company Created", description: `${newCompany.name} has been created successfully.` });
    }

    setIsDialogOpen(false);
    setEditingCompany(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      legalName: '',
      taxId: '',
      currency: 'USD',
      country: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      website: '',
      fiscalYearEnd: '12-31',
      status: 'Active',
      isParent: false,
      parentCompany: ''
    });
  };

  const openAddDialog = () => {
    setEditingCompany(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const parentCompanies = companies.filter(c => c.isParent && c.status === 'Active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Company Management</h2>
          <p className="text-gray-600">Manage multi-entity structure and consolidation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCompany ? 'Edit Company' : 'Add New Company'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Company Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      placeholder="HQ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Headquarters"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Label htmlFor="legalName">Legal Name</Label>
                    <Input
                      id="legalName"
                      value={formData.legalName}
                      onChange={(e) => setFormData({...formData, legalName: e.target.value})}
                      placeholder="ABC Corporation Ltd."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                        placeholder="12-3456789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fiscalYearEnd">Fiscal Year End (MM-DD)</Label>
                      <Input
                        id="fiscalYearEnd"
                        value={formData.fiscalYearEnd}
                        onChange={(e) => setFormData({...formData, fiscalYearEnd: e.target.value})}
                        placeholder="12-31"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Financial Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Base Currency</Label>
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
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="123 Business Ave"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="contact@company.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="www.company.com"
                  />
                </div>
              </div>

              {/* Corporate Structure */}
              <div>
                <h3 className="text-lg font-medium mb-4">Corporate Structure</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isParent"
                      checked={formData.isParent}
                      onChange={(e) => setFormData({...formData, isParent: e.target.checked, parentCompany: e.target.checked ? '' : formData.parentCompany})}
                      className="rounded"
                    />
                    <Label htmlFor="isParent">This is a parent company</Label>
                  </div>
                  {!formData.isParent && (
                    <div>
                      <Label htmlFor="parentCompany">Parent Company</Label>
                      <Select value={formData.parentCompany} onValueChange={(value) => setFormData({...formData, parentCompany: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent company" />
                        </SelectTrigger>
                        <SelectContent>
                          {parentCompanies.map(company => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name} ({company.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingCompany ? 'Update Company' : 'Create Company'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Companies Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Company Name</th>
                  <th className="text-left p-2">Legal Name</th>
                  <th className="text-left p-2">Currency</th>
                  <th className="text-left p-2">Country</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(company => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono font-bold">{company.code}</td>
                    <td className="p-2 font-medium">{company.name}</td>
                    <td className="p-2">{company.legalName}</td>
                    <td className="p-2">{company.currency}</td>
                    <td className="p-2">{company.country}</td>
                    <td className="p-2">
                      {company.isParent ? (
                        <Badge variant="default">Parent</Badge>
                      ) : (
                        <Badge variant="secondary">Subsidiary</Badge>
                      )}
                    </td>
                    <td className="p-2">
                      <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(company)}>
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

      {/* Corporate Structure Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Corporate Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {companies.filter(c => c.isParent).map(parent => (
              <div key={parent.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{parent.name} ({parent.code})</span>
                  <Badge variant="default">Parent</Badge>
                </div>
                <div className="ml-6 space-y-2">
                  {companies.filter(c => c.parentCompany === parent.id).map(subsidiary => (
                    <div key={subsidiary.id} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-px bg-gray-300"></div>
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{subsidiary.name} ({subsidiary.code})</span>
                      <Badge variant="secondary" className="text-xs">Subsidiary</Badge>
                      <span className="text-gray-500">- {subsidiary.country}</span>
                    </div>
                  ))}
                  {companies.filter(c => c.parentCompany === parent.id).length === 0 && (
                    <div className="text-sm text-gray-500 ml-4">No subsidiaries</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyManagement;
