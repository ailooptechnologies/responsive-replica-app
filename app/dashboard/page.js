'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { FolderOpen, CheckCircle, DollarSign, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      subtitle: '75% completed',
      icon: FolderOpen,
      color: 'bg-primary',
    },
    {
      title: 'Total Tasks',
      value: '48',
      subtitle: '85% completed',
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: '$125,430',
      subtitle: '12% increase',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: '24',
      subtitle: '8 online now',
      icon: Clock,
      color: 'bg-purple-500',
    },
  ]

  const projectStatus = [
    { label: 'In Progress', value: 45, color: 'bg-blue-500' },
    { label: 'On Hold', value: 15, color: 'bg-yellow-500' },
    { label: 'Complete', value: 35, color: 'bg-primary' },
    { label: 'Canceled', value: 5, color: 'bg-red-500' },
  ]

  const chartData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 22 },
    { name: 'Sat', value: 18 },
    { name: 'Sun', value: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>></span>
        <span>Overview</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {projectStatus.map((status, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{status.value}%</div>
                  <div className="text-sm text-gray-600">{status.label}</div>
                  <Progress value={status.value} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tasks Overview</CardTitle>
            <span className="text-sm text-gray-500">Total Completed task in last 7 days</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#00ff88" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center font-medium text-gray-600 text-sm">
                <span>NAME</span>
                <span>STATUS</span>
                <span>PROGRESS</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Website Redesign</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                  <span className="text-sm">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mobile App</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                  <span className="text-sm">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ERP System</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planning</span>
                  <span className="text-sm">25%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New project created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Invoice generated</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}