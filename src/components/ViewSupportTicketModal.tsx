
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Ticket, Calendar, User, AlertCircle } from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  priority: string;
  category: string;
  status: string;
  createdAt: string;
  assignedTo: string;
  description?: string;
}

interface ViewSupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: SupportTicket | null;
}

export function ViewSupportTicketModal({ isOpen, onClose, ticket }: ViewSupportTicketModalProps) {
  if (!ticket) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Ticket Details - {ticket.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{ticket.subject}</h3>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
              <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Category: {ticket.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Assigned to: {ticket.assignedTo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Created: {ticket.createdAt}</span>
            </div>
          </div>

          {ticket.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {ticket.description}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
