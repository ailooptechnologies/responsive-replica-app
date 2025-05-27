
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, FileText, Plus, Search } from "lucide-react";

const Accounting = () => {
  const financialStats = [
    {
      title: "Total Revenue",
      value: "$125,430",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-green-500",
      trend: "up"
    },
    {
      title: "Total Expenses",
      value: "$45,230",
      change: "-3.2%",
      icon: TrendingDown,
      color: "bg-red-500",
      trend: "down"
    },
    {
      title: "Net Profit",
      value: "$80,200",
      change: "+18.7%",
      icon: TrendingUp,
      color: "bg-primary",
      trend: "up"
    },
    {
      title: "Pending Invoices",
      value: "24",
      change: "+5",
      icon: FileText,
      color: "bg-yellow-500",
      trend: "up"
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12000, expenses: 8000 },
    { month: "Feb", revenue: 15000, expenses: 9000 },
    { month: "Mar", revenue: 18000, expenses: 10000 },
    { month: "Apr", revenue: 22000, expenses: 12000 },
    { month: "May", revenue: 25000, expenses: 11000 },
    { month: "Jun", revenue: 28000, expenses: 13000 },
  ];

  const expenseCategories = [
    { name: "Office Supplies", value: 30, color: "#00ff88" },
    { name: "Marketing", value: 25, color: "#00cc6a" },
    { name: "Utilities", value: 20, color: "#0099ff" },
    { name: "Travel", value: 15, color: "#ff6b6b" },
    { name: "Others", value: 10, color: "#ffd93d" },
  ];

  const invoices = [
    { id: "INV-001", client: "ACME Corp", amount: "$5,200", status: "Paid", date: "2025-01-15" },
    { id: "INV-002", client: "Tech Solutions", amount: "$3,400", status: "Pending", date: "2025-01-20" },
    { id: "INV-003", client: "Global Industries", amount: "$7,800", status: "Overdue", date: "2025-01-10" },
    { id: "INV-004", client: "StartupXYZ", amount: "$2,100", status: "Draft", date: "2025-01-25" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Accounting</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="revenue" fill="#00ff88" />
                    <Bar dataKey="expenses" fill="#ff6b6b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input placeholder="Search invoices..." className="pl-10" />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Invoice ID</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4 font-medium">{invoice.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "Paid" ? "bg-green-100 text-green-800" :
                            invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            invoice.status === "Overdue" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{invoice.date}</td>
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

        <TabsContent value="expenses" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expense Management</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No expenses recorded yet.</p>
                <p className="text-sm">Start tracking your business expenses.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Profit & Loss
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Balance Sheet
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Cash Flow
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Tax Report
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Invoice Report
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Expense Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounting;
