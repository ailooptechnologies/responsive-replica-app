
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Expense {
  id: string;
  category: string;
  amount: string;
  date: string;
  description: string;
}

interface ViewExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export function ViewExpenseModal({ isOpen, onClose, expense }: ViewExpenseModalProps) {
  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Expense ID</label>
            <p className="font-medium">{expense.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Category</label>
            <p className="font-medium">{expense.category}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <p className="text-lg font-bold text-primary">{expense.amount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Date</label>
            <p className="font-medium">{expense.date}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <p className="text-sm text-gray-700">{expense.description}</p>
          </div>
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
