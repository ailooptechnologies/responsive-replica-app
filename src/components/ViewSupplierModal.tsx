
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  category: string;
}

interface ViewSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

export function ViewSupplierModal({ isOpen, onClose, supplier }: ViewSupplierModalProps) {
  if (!supplier) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Supplier Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Supplier ID</label>
              <p className="font-medium">{supplier.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge className={
                  supplier.status === "Active" ? "bg-green-100 text-green-800" :
                  supplier.status === "Inactive" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  {supplier.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="font-medium">{supplier.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Category</label>
            <p className="font-medium">{supplier.category}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-sm">{supplier.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-sm">{supplier.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <p className="text-sm text-gray-700">{supplier.address}</p>
          </div>
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
