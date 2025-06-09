'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, UserPlus, Calendar, DollarSign, Search, Plus } from 'lucide-react'

export default function HRM() {
  const [searchTerm, setSearchTerm] = useState('')

  const hrmStats = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+8 this month',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Present Today',
      value: '142',
      change: '91% attendance',
      icon: UserPlus,
      color: 'bg-primary',
    },
    {
      title: 'On Leave',
      value: '14',
      change: '9% on leave',
      icon: Calendar,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Payroll',
      value: '$245,800',
      change: '+5.2% from last month',
      icon: DollarSign,
      color: 'bg-green-500',
    },
  ]

  const employees = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Present',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'Present',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'On Leave',
    },
  ]

  const leaveRequests = [
    {
      id: 1,
      employee: 'Alice Cooper',
      type: 'Vacation',
      from: '2025-02-01',
      to: '2025-02-05',
      status: 'Pending',
      days: 5
    },
    {
      id: 2,
      employee: 'Bob Wilson',
      type: 'Sick Leave',
      from: '2025-01-28',
      to: '2025-01-30',
      status: 'Approved',
      days: 3
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Human Resource Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* HRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrmStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Directory */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search employees..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{employee.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-500">{employee.position}</p>
                      <p className="text-xs text-gray-400">{employee.department}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    employee.status === 'Present' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{request.employee}</p>
                      <p className="text-sm text-gray-500">{request.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{request.from} to {request.to}</p>
                    <p>{request.days} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Check In</th>
                  <th className="text-left py-3 px-4">Check Out</th>
                  <th className="text-left py-3 px-4">Hours</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.filter(emp => emp.status === 'Present').map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{employee.name}</td>
                    <td className="py-3 px-4">09:00 AM</td>
                    <td className="py-3 px-4">--:--</td>
                    <td className="py-3 px-4">3.5h</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Present
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