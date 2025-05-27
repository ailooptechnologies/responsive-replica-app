
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Calendar, Clock, DollarSign, TrendingUp, Search, Plus } from "lucide-react";

const HRM = () => {
  const hrmStats = [
    {
      title: "Total Employees",
      value: "142",
      change: "+8 this month",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Present Today",
      value: "128",
      change: "90.1% attendance",
      icon: UserPlus,
      color: "bg-primary",
    },
    {
      title: "On Leave",
      value: "14",
      change: "9.9% on leave",
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      title: "Total Payroll",
      value: "$245,800",
      change: "+5.2% from last month",
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Present",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "Present",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      department: "Sales",
      position: "Sales Representative",
      status: "On Leave",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@company.com",
      department: "HR",
      position: "HR Specialist",
      status: "Present",
      avatar: "/api/placeholder/40/40"
    },
  ];

  const leaveRequests = [
    {
      id: 1,
      employee: "Alice Cooper",
      type: "Vacation",
      from: "2025-02-01",
      to: "2025-02-05",
      status: "Pending",
      days: 5
    },
    {
      id: 2,
      employee: "Bob Wilson",
      type: "Sick Leave",
      from: "2025-01-28",
      to: "2025-01-30",
      status: "Approved",
      days: 3
    },
    {
      id: 3,
      employee: "Carol Smith",
      type: "Personal",
      from: "2025-02-10",
      to: "2025-02-10",
      status: "Pending",
      days: 1
    },
  ];

  const departments = [
    { name: "Engineering", count: 45, budget: "$180,000" },
    { name: "Sales", count: 32, budget: "$120,000" },
    { name: "Marketing", count: 18, budget: "$85,000" },
    { name: "HR", count: 12, budget: "$65,000" },
    { name: "Finance", count: 15, budget: "$75,000" },
    { name: "Operations", count: 20, budget: "$95,000" },
  ];

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

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input placeholder="Search employees..." className="pl-10" />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Position</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-gray-500">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{employee.department}</td>
                        <td className="py-3 px-4">{employee.position}</td>
                        <td className="py-3 px-4">
                          <Badge variant={employee.status === "Present" ? "default" : "secondary"}>
                            {employee.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">128</p>
                    <p className="text-sm text-gray-600">Present Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">14</p>
                    <p className="text-sm text-gray-600">On Leave</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">90.1%</p>
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Attendance tracking system ready.</p>
                <p className="text-sm">Employee check-ins and check-outs will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">From</th>
                      <th className="text-left py-3 px-4">To</th>
                      <th className="text-left py-3 px-4">Days</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{request.employee}</td>
                        <td className="py-3 px-4">{request.type}</td>
                        <td className="py-3 px-4">{request.from}</td>
                        <td className="py-3 px-4">{request.to}</td>
                        <td className="py-3 px-4">{request.days}</td>
                        <td className="py-3 px-4">
                          <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {request.status === "Pending" && (
                              <>
                                <Button variant="outline" size="sm" className="text-green-600">Approve</Button>
                                <Button variant="outline" size="sm" className="text-red-600">Reject</Button>
                              </>
                            )}
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Payroll system ready.</p>
                <p className="text-sm">Salary calculations and payments will be managed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Departments</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Employees:</span>
                          <span className="font-medium">{dept.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium">{dept.budget}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRM;
