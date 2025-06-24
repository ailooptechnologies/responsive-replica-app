
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Key, Plus } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  userCount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  department: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

const UserRoleManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('roles');

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Finance Administrator',
      description: 'Full access to all finance modules',
      permissions: ['chart_accounts_full', 'journal_entries_full', 'reports_full', 'settings_full'],
      status: 'Active',
      userCount: 2
    },
    {
      id: '2',
      name: 'Accountant',
      description: 'Standard accounting operations',
      permissions: ['chart_accounts_view', 'journal_entries_create', 'reports_view', 'ap_full', 'ar_full'],
      status: 'Active',
      userCount: 5
    },
    {
      id: '3',
      name: 'Finance Viewer',
      description: 'Read-only access to financial data',
      permissions: ['chart_accounts_view', 'journal_entries_view', 'reports_view'],
      status: 'Active',
      userCount: 8
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      roles: ['1'],
      department: 'Finance',
      status: 'Active',
      lastLogin: '2025-01-20'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      roles: ['2'],
      department: 'Accounting',
      status: 'Active',
      lastLogin: '2025-01-19'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      roles: ['3'],
      department: 'Operations',
      status: 'Active',
      lastLogin: '2025-01-18'
    }
  ]);

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    roles: [] as string[],
    department: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const availablePermissions = [
    { id: 'chart_accounts_full', name: 'Chart of Accounts - Full Access', category: 'Chart of Accounts' },
    { id: 'chart_accounts_view', name: 'Chart of Accounts - View Only', category: 'Chart of Accounts' },
    { id: 'journal_entries_full', name: 'Journal Entries - Full Access', category: 'Journal Entries' },
    { id: 'journal_entries_create', name: 'Journal Entries - Create/Edit', category: 'Journal Entries' },
    { id: 'journal_entries_view', name: 'Journal Entries - View Only', category: 'Journal Entries' },
    { id: 'ap_full', name: 'Accounts Payable - Full Access', category: 'Accounts Payable' },
    { id: 'ap_view', name: 'Accounts Payable - View Only', category: 'Accounts Payable' },
    { id: 'ar_full', name: 'Accounts Receivable - Full Access', category: 'Accounts Receivable' },
    { id: 'ar_view', name: 'Accounts Receivable - View Only', category: 'Accounts Receivable' },
    { id: 'reports_full', name: 'Financial Reports - Full Access', category: 'Reports' },
    { id: 'reports_view', name: 'Financial Reports - View Only', category: 'Reports' },
    { id: 'settings_full', name: 'System Settings - Full Access', category: 'Administration' },
    { id: 'settings_view', name: 'System Settings - View Only', category: 'Administration' },
  ];

  const permissionCategories = [...new Set(availablePermissions.map(p => p.category))];

  const openRoleDialog = (role?: Role) => {
    setEditingRole(role || null);
    if (role) {
      setRoleForm({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
        status: role.status
      });
    } else {
      setRoleForm({
        name: '',
        description: '',
        permissions: [],
        status: 'Active'
      });
    }
    setIsRoleDialogOpen(true);
  };

  const openUserDialog = (user?: User) => {
    setEditingUser(user || null);
    if (user) {
      setUserForm({
        name: user.name,
        email: user.email,
        roles: user.roles,
        department: user.department,
        status: user.status
      });
    } else {
      setUserForm({
        name: '',
        email: '',
        roles: [],
        department: '',
        status: 'Active'
      });
    }
    setIsUserDialogOpen(true);
  };

  const saveRole = () => {
    const newRole: Role = {
      id: editingRole?.id || `ROLE-${Date.now()}`,
      ...roleForm,
      userCount: editingRole?.userCount || 0
    };

    if (editingRole) {
      setRoles(prev => prev.map(r => r.id === editingRole.id ? newRole : r));
      toast({ title: "Role Updated", description: `${newRole.name} has been updated successfully.` });
    } else {
      setRoles(prev => [...prev, newRole]);
      toast({ title: "Role Created", description: `${newRole.name} has been created successfully.` });
    }

    setIsRoleDialogOpen(false);
    setEditingRole(null);
  };

  const saveUser = () => {
    const newUser: User = {
      id: editingUser?.id || `USER-${Date.now()}`,
      ...userForm,
      lastLogin: editingUser?.lastLogin || new Date().toISOString().split('T')[0]
    };

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? newUser : u));
      toast({ title: "User Updated", description: `${newUser.name} has been updated successfully.` });
    } else {
      setUsers(prev => [...prev, newUser]);
      toast({ title: "User Created", description: `${newUser.name} has been created successfully.` });
    }

    setIsUserDialogOpen(false);
    setEditingUser(null);
  };

  const togglePermission = (permissionId: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const toggleUserRole = (roleId: string) => {
    setUserForm(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(r => r !== roleId)
        : [...prev.roles, roleId]
    }));
  };

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || 'Unknown Role';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">User & Role Management</h2>
        <p className="text-gray-600">Manage user access, roles, and permissions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Access Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Roles & Permissions</CardTitle>
                <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openRoleDialog()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="roleName">Role Name</Label>
                          <Input
                            id="roleName"
                            value={roleForm.name}
                            onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                            placeholder="Enter role name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="roleDescription">Description</Label>
                          <Input
                            id="roleDescription"
                            value={roleForm.description}
                            onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
                            placeholder="Enter role description"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Permissions</Label>
                        <div className="mt-2 space-y-4">
                          {permissionCategories.map(category => (
                            <div key={category} className="border rounded-lg p-4">
                              <h4 className="font-medium mb-3">{category}</h4>
                              <div className="space-y-2">
                                {availablePermissions
                                  .filter(p => p.category === category)
                                  .map(permission => (
                                    <div key={permission.id} className="flex items-center justify-between">
                                      <span className="text-sm">{permission.name}</span>
                                      <Switch
                                        checked={roleForm.permissions.includes(permission.id)}
                                        onCheckedChange={() => togglePermission(permission.id)}
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={saveRole}>
                          {editingRole ? 'Update Role' : 'Create Role'}
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
                      <th className="text-left p-2">Role Name</th>
                      <th className="text-left p-2">Description</th>
                      <th className="text-left p-2">Users</th>
                      <th className="text-left p-2">Permissions</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map(role => (
                      <tr key={role.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{role.name}</td>
                        <td className="p-2 text-sm text-gray-600">{role.description}</td>
                        <td className="p-2">
                          <Badge variant="secondary">{role.userCount} users</Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{role.permissions.length} permissions</Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant={role.status === 'Active' ? 'default' : 'secondary'}>
                            {role.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm" onClick={() => openRoleDialog(role)}>
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

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openUserDialog()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="userName">Full Name</Label>
                        <Input
                          id="userName"
                          value={userForm.name}
                          onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="userEmail">Email</Label>
                        <Input
                          id="userEmail"
                          type="email"
                          value={userForm.email}
                          onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="userDepartment">Department</Label>
                        <Input
                          id="userDepartment"
                          value={userForm.department}
                          onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                          placeholder="Enter department"
                        />
                      </div>
                      <div>
                        <Label>Assign Roles</Label>
                        <div className="mt-2 space-y-2">
                          {roles.filter(r => r.status === 'Active').map(role => (
                            <div key={role.id} className="flex items-center justify-between">
                              <div>
                                <span className="text-sm font-medium">{role.name}</span>
                                <p className="text-xs text-gray-500">{role.description}</p>
                              </div>
                              <Switch
                                checked={userForm.roles.includes(role.id)}
                                onCheckedChange={() => toggleUserRole(role.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={saveUser}>
                          {editingUser ? 'Update User' : 'Add User'}
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
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Department</th>
                      <th className="text-left p-2">Roles</th>
                      <th className="text-left p-2">Last Login</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{user.name}</td>
                        <td className="p-2 text-sm">{user.email}</td>
                        <td className="p-2">{user.department}</td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map(roleId => (
                              <Badge key={roleId} variant="secondary" className="text-xs">
                                {getRoleName(roleId)}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-2 text-sm">{user.lastLogin}</td>
                        <td className="p-2">
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm" onClick={() => openUserDialog(user)}>
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

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Permission</th>
                      {roles.map(role => (
                        <th key={role.id} className="text-center p-2 min-w-[120px]">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {availablePermissions.map(permission => (
                      <tr key={permission.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <span className="font-medium">{permission.name}</span>
                            <div className="text-xs text-gray-500">{permission.category}</div>
                          </div>
                        </td>
                        {roles.map(role => (
                          <td key={role.id} className="text-center p-2">
                            {role.permissions.includes(permission.id) ? (
                              <Badge variant="default" className="text-xs">✓</Badge>
                            ) : (
                              <span className="text-gray-300">✗</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserRoleManagement;
