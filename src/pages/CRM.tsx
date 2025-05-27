
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Plus, Phone, Mail } from "lucide-react";

const CRM = () => {
  const customers = [
    {
      id: 1,
      name: "John Smith",
      company: "ACME Corp",
      email: "john@acme.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      value: "$25,000"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Tech Solutions",
      email: "sarah@techsol.com",
      phone: "+1 (555) 987-6543",
      status: "Lead",
      value: "$15,000"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">CRM System</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge>{customer.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{customer.company}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.phone}
                </div>
                <div className="text-lg font-semibold text-primary">
                  {customer.value}
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CRM;
