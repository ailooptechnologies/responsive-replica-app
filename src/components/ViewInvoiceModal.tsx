
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: string;
  date: string;
  description?: string;
}

interface ViewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export function ViewInvoiceModal({ isOpen, onClose, invoice }: ViewInvoiceModalProps) {
  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Invoice ID</label>
              <p className="font-medium">{invoice.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge className={
                  invoice.status === "Paid" ? "bg-green-100 text-green-800" :
                  invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  invoice.status === "Overdue" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }>
                  {invoice.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Client</label>
            <p className="font-medium">{invoice.client}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <p className="text-lg font-bold text-primary">{invoice.amount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Date</label>
            <p className="font-medium">{invoice.date}</p>
          </div>
          {invoice.description && (
            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <p className="text-sm text-gray-700">{invoice.description}</p>
            </div>
          )}
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
