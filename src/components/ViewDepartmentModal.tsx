
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, DollarSign, User } from "lucide-react";

interface Department {
  id: number;
  name: string;
  count: number;
  budget: string;
  head?: string;
  description?: string;
  status: string;
}

interface ViewDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department | null;
}

export function ViewDepartmentModal({ isOpen, onClose, department }: ViewDepartmentModalProps) {
  if (!department) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Restructuring": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Department Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{department.name}</h3>
              <Badge className={getStatusColor(department.status)}>{department.status}</Badge>
            </div>
            {department.head && (
              <p className="text-sm text-gray-600">Head: {department.head}</p>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Employees: {department.count}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Budget: {department.budget}</span>
            </div>
            {department.description && (
              <div className="pt-2">
                <h4 className="font-medium text-sm mb-1">Description:</h4>
                <p className="text-sm text-gray-600">{department.description}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
