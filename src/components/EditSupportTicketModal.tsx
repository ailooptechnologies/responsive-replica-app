
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

interface EditSupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: SupportTicket | null;
  onSave: (ticket: SupportTicket) => void;
}

export function EditSupportTicketModal({ isOpen, onClose, ticket, onSave }: EditSupportTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    category: "",
    status: "",
    assignedTo: "",
    description: ""
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        subject: ticket.subject,
        priority: ticket.priority,
        category: ticket.category,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
        description: ticket.description || ""
      });
    }
  }, [ticket]);

  const handleSave = () => {
    if (!ticket || !formData.subject || !formData.priority || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedTicket: SupportTicket = {
      ...ticket,
      subject: formData.subject,
      priority: formData.priority,
      category: formData.category,
      status: formData.status,
      assignedTo: formData.assignedTo,
      description: formData.description
    };

    onSave(updatedTicket);
    onClose();
    
    toast({
      title: "Ticket Updated",
      description: `Support ticket ${updatedTicket.id} has been updated successfully.`,
    });
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Ticket - {ticket.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Brief description of the issue"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority *</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              placeholder="Assigned team member"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the issue or request"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Update Ticket
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
