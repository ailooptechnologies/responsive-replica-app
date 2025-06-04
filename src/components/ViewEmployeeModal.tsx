
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Building, Calendar, DollarSign } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  phone?: string;
  salary?: string;
  startDate?: string;
  avatar?: string;
}

interface ViewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function ViewEmployeeModal({ isOpen, onClose, employee }: ViewEmployeeModalProps) {
  if (!employee) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Terminated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Employee Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{employee.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{employee.department}</span>
            </div>
            {employee.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Started: {employee.startDate}</span>
              </div>
            )}
            {employee.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Salary: {employee.salary}</span>
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
