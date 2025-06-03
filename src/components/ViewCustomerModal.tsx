
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  value: string;
}

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export function ViewCustomerModal({ isOpen, onClose, customer }: ViewCustomerModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Customer ID</label>
              <p className="font-medium">#{customer.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge className={
                  customer.status === "Active" ? "bg-green-100 text-green-800" :
                  customer.status === "Lead" ? "bg-blue-100 text-blue-800" :
                  "bg-red-100 text-red-800"
                }>
                  {customer.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="font-medium">{customer.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Company</label>
            <p className="font-medium">{customer.company}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-sm">{customer.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-sm">{customer.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Value</label>
            <p className="text-lg font-bold text-primary">{customer.value}</p>
          </div>
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
