
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ticket: any) => void;
}

export function SupportTicketModal({ isOpen, onClose, onSave }: SupportTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    category: "",
    description: ""
  });

  const handleSave = () => {
    if (!formData.subject || !formData.priority || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newTicket = {
      id: `TICK-${Date.now()}`,
      subject: formData.subject,
      priority: formData.priority,
      category: formData.category,
      description: formData.description,
      status: "Open",
      createdAt: new Date().toLocaleDateString(),
      assignedTo: "Support Team"
    };

    onSave(newTicket);
    setFormData({ subject: "", priority: "", category: "", description: "" });
    onClose();
    
    toast({
      title: "Ticket Created",
      description: `Support ticket ${newTicket.id} has been created successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Support Ticket
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
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical Issue</SelectItem>
                <SelectItem value="Account">Account Issue</SelectItem>
                <SelectItem value="Billing">Billing Issue</SelectItem>
                <SelectItem value="Feature">Feature Request</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the issue or request"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
