
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import { SupplierModal } from "@/components/SupplierModal";
import { ViewSupplierModal } from "@/components/ViewSupplierModal";

const SupplyChain = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: "SUP-001",
      name: "ABC Electronics",
      email: "contact@abcelectronics.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, State",
      status: "Active",
      category: "Electronics"
    },
    {
      id: "SUP-002",
      name: "Office Supplies Co",
      email: "sales@officesupplies.com",
      phone: "+1 (555) 987-6543",
      address: "456 Supply Ave, City, State",
      status: "Active",
      category: "Office Supplies"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSupplierSave = (supplier) => {
    if (selectedSupplier) {
      setSuppliers(suppliers.map(sup => sup.id === supplier.id ? supplier : sup));
    } else {
      setSuppliers([...suppliers, supplier]);
    }
    setSelectedSupplier(null);
  };

  const handleDelete = (supplierId) => {
    setSuppliers(suppliers.filter(sup => sup.id !== supplierId));
  };

  const handleStatusChange = (supplierId, newStatus) => {
    setSuppliers(suppliers.map(sup => 
      sup.id === supplierId ? { ...sup, status: newStatus } : sup
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Supply Chain Management</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
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
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{supplier.id}</td>
                    <td className="py-3 px-4">{supplier.name}</td>
                    <td className="py-3 px-4">{supplier.email}</td>
                    <td className="py-3 px-4">{supplier.phone}</td>
                    <td className="py-3 px-4">{supplier.category}</td>
                    <td className="py-3 px-4">
                      <Select value={supplier.status} onValueChange={(value) => handleStatusChange(supplier.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="Inactive">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                              Inactive
                            </div>
                          </SelectItem>
                          <SelectItem value="Pending">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                              Pending
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedSupplier(supplier);
                          setIsViewModalOpen(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedSupplier(supplier);
                          setIsModalOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(supplier.id)}>
                          <Trash2 className="h-4 w-4" />
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

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier}
        onSave={handleSupplierSave}
      />

      <ViewSupplierModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default SupplyChain;
