import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FolderOpen, CheckCircle, DollarSign, Clock } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Projects",
      value: "0",
      subtitle: "0% completed",
      icon: FolderOpen,
      color: "bg-primary",
    },
    {
      title: "Total Tasks",
      value: "0",
      subtitle: "0% completed",
      icon: CheckCircle,
      color: "bg-blue-500",
    },
    {
      title: "Total Expense",
      value: "0",
      subtitle: "0% expense",
      icon: DollarSign,
      color: "bg-pink-500",
    },
  ];

  const projectStatus = [
    { label: "In Progress", value: 0, color: "bg-blue-500" },
    { label: "On Hold", value: 0, color: "bg-yellow-500" },
    { label: "Complete", value: 0, color: "bg-primary" },
    { label: "Canceled", value: 0, color: "bg-red-500" },
  ];

  const chartData = [
    { name: "Tue", value: 0 },
    { name: "Wed", value: 0 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 0 },
    { name: "Sat", value: 0 },
    { name: "Sun", value: 0 },
    { name: "Mon", value: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>&gt;</span>
        <span>Project</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        {/* Top Due Projects */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Due Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center font-medium text-gray-600 text-sm">
                <span>NAME</span>
                <span>END DATE</span>
                <span>STATUS</span>
              </div>
              <div className="text-center py-8 text-gray-500">
                No Due Projects Found.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timesheet Logged Hours */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Timesheet Logged Hours</CardTitle>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{day.name}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-primary rounded" 
                        style={{ width: `${day.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-900">{day.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Due Tasks */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top Due Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No Due Tasks Found.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
