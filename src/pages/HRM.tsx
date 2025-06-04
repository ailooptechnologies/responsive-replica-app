import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, UserPlus, Calendar, Clock, DollarSign, TrendingUp, Search, Plus, Building, Edit, Trash2, Eye } from "lucide-react";
import { AddEmployeeModal } from "@/components/AddEmployeeModal";
import { EditEmployeeModal } from "@/components/EditEmployeeModal";
import { ViewEmployeeModal } from "@/components/ViewEmployeeModal";
import { DepartmentModal } from "@/components/DepartmentModal";
import { ViewDepartmentModal } from "@/components/ViewDepartmentModal";
import { ViewLeaveRequestModal } from "@/components/ViewLeaveRequestModal";
import { EditLeaveRequestModal } from "@/components/EditLeaveRequestModal";
import { ViewPayrollModal } from "@/components/ViewPayrollModal";
import { useToast } from "@/hooks/use-toast";

const HRM = () => {
  const { toast } = useToast();
  
  // Employee Management State
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Present",
      phone: "+1-555-0123",
      salary: "$85,000",
      startDate: "2023-01-15",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "Present",
      phone: "+1-555-0124",
      salary: "$75,000",
      startDate: "2022-08-20",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      department: "Sales",
      position: "Sales Representative",
      status: "On Leave",
      phone: "+1-555-0125",
      salary: "$65,000",
      startDate: "2023-03-10",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@company.com",
      department: "HR",
      position: "HR Specialist",
      status: "Present",
      phone: "+1-555-0126",
      salary: "$70,000",
      startDate: "2022-11-05",
      avatar: "/api/placeholder/40/40"
    },
  ]);

  // Department Management State
  const [departments, setDepartments] = useState([
    { id: 1, name: "Engineering", count: 45, budget: "$180,000", head: "John Doe", status: "Active", description: "Software development and technical operations" },
    { id: 2, name: "Sales", count: 32, budget: "$120,000", head: "Jane Smith", status: "Active", description: "Customer acquisition and revenue generation" },
    { id: 3, name: "Marketing", count: 18, budget: "$85,000", head: "Bob Johnson", status: "Active", description: "Brand promotion and marketing campaigns" },
    { id: 4, name: "HR", count: 12, budget: "$65,000", head: "Alice Brown", status: "Active", description: "Human resources and employee management" },
    { id: 5, name: "Finance", count: 15, budget: "$75,000", head: "Charlie Wilson", status: "Active", description: "Financial planning and accounting" },
    { id: 6, name: "Operations", count: 20, budget: "$95,000", head: "Diana Davis", status: "Active", description: "Daily operations and logistics" },
  ]);

  // Leave Requests State
  const [leaveRequests, setLeaveRequests] = useState([
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
  ]);

  // Payroll State
  const [payrollData, setPayrollData] = useState([
    { id: 1, employee: "John Smith", department: "Engineering", salary: "$85,000", bonus: "$5,000", total: "$90,000", status: "Processed" },
    { id: 2, employee: "Sarah Johnson", department: "Marketing", salary: "$75,000", bonus: "$3,000", total: "$78,000", status: "Processed" },
    { id: 3, employee: "Mike Davis", department: "Sales", salary: "$65,000", bonus: "$4,000", total: "$69,000", status: "Pending" },
  ]);

  // Modal States
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [viewEmployeeModal, setViewEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [departmentModal, setDepartmentModal] = useState(false);
  const [viewDepartmentModal, setViewDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentMode, setDepartmentMode] = useState<'add' | 'edit'>('add');

  // Leave Request Modal States
  const [viewLeaveModal, setViewLeaveModal] = useState(false);
  const [editLeaveModal, setEditLeaveModal] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);

  // Payroll Modal States
  const [viewPayrollModal, setViewPayrollModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // Leave Request Form State
  const [leaveForm, setLeaveForm] = useState({
    employee: "",
    type: "",
    from: "",
    to: "",
    reason: ""
  });

  const hrmStats = [
    {
      title: "Total Employees",
      value: employees.length.toString(),
      change: "+8 this month",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Present Today",
      value: employees.filter(emp => emp.status === "Present").length.toString(),
      change: "90.1% attendance",
      icon: UserPlus,
      color: "bg-primary",
    },
    {
      title: "On Leave",
      value: employees.filter(emp => emp.status === "On Leave").length.toString(),
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

  // Employee Management Functions
  const handleAddEmployee = (employee: any) => {
    setEmployees([...employees, employee]);
    toast({
      title: "Success",
      description: "Employee added successfully",
    });
  };

  const handleUpdateEmployee = (updatedEmployee: any) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    toast({
      title: "Success",
      description: "Employee updated successfully",
    });
  };

  const handleEmployeeStatusChange = (employeeId: number, newStatus: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: newStatus } : emp
    ));
    toast({
      title: "Success",
      description: "Employee status updated",
    });
  };

  // Department Management Functions
  const handleAddDepartment = (department: any) => {
    setDepartments([...departments, department]);
    toast({
      title: "Success",
      description: "Department added successfully",
    });
  };

  const handleUpdateDepartment = (updatedDepartment: any) => {
    setDepartments(departments.map(dept => dept.id === updatedDepartment.id ? updatedDepartment : dept));
    toast({
      title: "Success",
      description: "Department updated successfully",
    });
  };

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartments(departments.filter(dept => dept.id !== departmentId));
    toast({
      title: "Success",
      description: "Department deleted successfully",
    });
  };

  const handleDepartmentStatusChange = (departmentId: number, newStatus: string) => {
    setDepartments(departments.map(dept => 
      dept.id === departmentId ? { ...dept, status: newStatus } : dept
    ));
    toast({
      title: "Success",
      description: "Department status updated",
    });
  };

  // Leave Management Functions
  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = Math.ceil((new Date(leaveForm.to).getTime() - new Date(leaveForm.from).getTime()) / (1000 * 3600 * 24)) + 1;
    const newRequest = {
      id: Date.now(),
      ...leaveForm,
      status: "Pending",
      days
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setLeaveForm({ employee: "", type: "", from: "", to: "", reason: "" });
    toast({
      title: "Success",
      description: "Leave request submitted successfully",
    });
  };

  const handleLeaveStatusChange = (requestId: number, newStatus: string) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
    toast({
      title: "Success",
      description: `Leave request ${newStatus.toLowerCase()}`,
    });
  };

  const handleUpdateLeaveRequest = (updatedRequest: any) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === updatedRequest.id ? updatedRequest : req
    ));
    toast({
      title: "Success",
      description: "Leave request updated successfully",
    });
  };

  // Payroll Functions
  const handlePayrollStatusChange = (payrollId: number, newStatus: string) => {
    setPayrollData(payrollData.map(payroll => 
      payroll.id === payrollId ? { ...payroll, status: newStatus } : payroll
    ));
    toast({
      title: "Success",
      description: "Payroll status updated",
    });
  };

  const handleProcessPayroll = (payrollId: number) => {
    setPayrollData(payrollData.map(payroll => 
      payroll.id === payrollId ? { ...payroll, status: "Processed" } : payroll
    ));
    toast({
      title: "Success",
      description: "Payroll processed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Human Resource Management</h1>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setAddEmployeeModal(true)}
        >
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
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setAddEmployeeModal(true)}
                  >
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
                          <Select
                            value={employee.status}
                            onValueChange={(value) => handleEmployeeStatusChange(employee.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Present">Present</SelectItem>
                              <SelectItem value="On Leave">On Leave</SelectItem>
                              <SelectItem value="Absent">Absent</SelectItem>
                              <SelectItem value="Terminated">Terminated</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setViewEmployeeModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setEditEmployeeModal(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                    <p className="text-2xl font-bold">{employees.filter(emp => emp.status === "Present").length}</p>
                    <p className="text-sm text-gray-600">Present Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{employees.filter(emp => emp.status === "On Leave").length}</p>
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
              
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Today's Attendance</h3>
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
                    {employees.filter(emp => emp.status === "Present").map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{employee.name}</td>
                        <td className="py-3 px-4">09:00 AM</td>
                        <td className="py-3 px-4">--:--</td>
                        <td className="py-3 px-4">3.5h</td>
                        <td className="py-3 px-4">
                          <Badge variant="default">Present</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>New Leave Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="employee">Employee</Label>
                    <Select 
                      value={leaveForm.employee} 
                      onValueChange={(value) => setLeaveForm({...leaveForm, employee: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Leave Type</Label>
                    <Select 
                      value={leaveForm.type} 
                      onValueChange={(value) => setLeaveForm({...leaveForm, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vacation">Vacation</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Maternity">Maternity</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="from">From Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.from}
                      onChange={(e) => setLeaveForm({...leaveForm, from: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="to">To Date</Label>
                    <Input
                      type="date"
                      value={leaveForm.to}
                      onChange={(e) => setLeaveForm({...leaveForm, to: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                      placeholder="Reason for leave..."
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
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
                            <Select
                              value={request.status}
                              onValueChange={(value) => handleLeaveStatusChange(request.id, value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedLeaveRequest(request);
                                  setViewLeaveModal(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedLeaveRequest(request);
                                  setEditLeaveModal(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">$245,800</p>
                    <p className="text-sm text-gray-600">Total Payroll</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{payrollData.filter(p => p.status === "Processed").length}</p>
                    <p className="text-sm text-gray-600">Processed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{payrollData.filter(p => p.status === "Pending").length}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Salary</th>
                      <th className="text-left py-3 px-4">Bonus</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((payroll) => (
                      <tr key={payroll.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{payroll.employee}</td>
                        <td className="py-3 px-4">{payroll.department}</td>
                        <td className="py-3 px-4">{payroll.salary}</td>
                        <td className="py-3 px-4">{payroll.bonus}</td>
                        <td className="py-3 px-4 font-medium">{payroll.total}</td>
                        <td className="py-3 px-4">
                          <Select
                            value={payroll.status}
                            onValueChange={(value) => handlePayrollStatusChange(payroll.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Processed">Processed</SelectItem>
                              <SelectItem value="Failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedPayroll(payroll);
                                setViewPayrollModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleProcessPayroll(payroll.id)}
                              disabled={payroll.status === "Processed"}
                            >
                              Process
                            </Button>
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

        <TabsContent value="departments" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Departments</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setDepartmentMode('add');
                    setSelectedDepartment(null);
                    setDepartmentModal(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                  <Card key={dept.id} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <Select
                          value={dept.status}
                          onValueChange={(value) => handleDepartmentStatusChange(dept.id, value)}
                        >
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Restructuring">Restructuring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Employees:</span>
                          <span className="font-medium">{dept.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium">{dept.budget}</span>
                        </div>
                        {dept.head && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Head:</span>
                            <span className="font-medium text-sm">{dept.head}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedDepartment(dept);
                            setViewDepartmentModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setDepartmentMode('edit');
                            setSelectedDepartment(dept);
                            setDepartmentModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteDepartment(dept.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={addEmployeeModal}
        onClose={() => setAddEmployeeModal(false)}
        onAdd={handleAddEmployee}
      />

      <EditEmployeeModal
        isOpen={editEmployeeModal}
        onClose={() => setEditEmployeeModal(false)}
        onUpdate={handleUpdateEmployee}
        employee={selectedEmployee}
      />

      <ViewEmployeeModal
        isOpen={viewEmployeeModal}
        onClose={() => setViewEmployeeModal(false)}
        employee={selectedEmployee}
      />

      <DepartmentModal
        isOpen={departmentModal}
        onClose={() => setDepartmentModal(false)}
        onSave={departmentMode === 'add' ? handleAddDepartment : handleUpdateDepartment}
        department={selectedDepartment}
        mode={departmentMode}
      />

      <ViewDepartmentModal
        isOpen={viewDepartmentModal}
        onClose={() => setViewDepartmentModal(false)}
        department={selectedDepartment}
      />

      <ViewLeaveRequestModal
        isOpen={viewLeaveModal}
        onClose={() => setViewLeaveModal(false)}
        leaveRequest={selectedLeaveRequest}
      />

      <EditLeaveRequestModal
        isOpen={editLeaveModal}
        onClose={() => setEditLeaveModal(false)}
        onUpdate={handleUpdateLeaveRequest}
        leaveRequest={selectedLeaveRequest}
      />

      <ViewPayrollModal
        isOpen={viewPayrollModal}
        onClose={() => setViewPayrollModal(false)}
        payroll={selectedPayroll}
      />
    </div>
  );
};

export default HRM;
