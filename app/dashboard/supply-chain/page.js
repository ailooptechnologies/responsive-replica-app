'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Truck, Plus, Search } from 'lucide-react'

export default function SupplyChain() {
  const [searchTerm, setSearchTerm] = useState('')

  const suppliers = [
    {
      id: 'SUP-001',
      name: 'ABC Electronics',
      email: 'contact@abcelectronics.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State',
      status: 'Active',
      category: 'Electronics'
    },
    {
      id: 'SUP-002',
      name: 'Office Supplies Co',
      email: 'sales@officesupplies.com',
      phone: '+1 (555) 987-6543',
      address: '456 Supply Ave, City, State',
      status: 'Active',
      category: 'Office Supplies'
    },
    {
      id: 'SUP-003',
      name: 'Raw Materials Inc',
      email: 'info@rawmaterials.com',
      phone: '+1 (555) 456-7890',
      address: '789 Industrial Blvd, City, State',
      status: 'Pending',
      category: 'Raw Materials'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Supply Chain Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suppliers</CardTitle>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Search suppliers..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Supplier ID</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{supplier.id}</td>
                    <td className="py-3 px-4">{supplier.name}</td>
                    <td className="py-3 px-4">{supplier.email}</td>
                    <td className="py-3 px-4">{supplier.phone}</td>
                    <td className="py-3 px-4">{supplier.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.status === 'Active' ? 'bg-green-100 text-green-800' :
                        supplier.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}