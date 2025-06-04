
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Save } from "lucide-react";

interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  from: string;
  to: string;
  status: string;
  days: number;
  reason?: string;
}

interface EditLeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leaveRequest: LeaveRequest) => void;
  leaveRequest: LeaveRequest | null;
}

export function EditLeaveRequestModal({ isOpen, onClose, onUpdate, leaveRequest }: EditLeaveRequestModalProps) {
  const [formData, setFormData] = useState({
    employee: "",
    type: "",
    from: "",
    to: "",
    status: "",
    reason: ""
  });

  useEffect(() => {
    if (leaveRequest) {
      setFormData({
        employee: leaveRequest.employee,
        type: leaveRequest.type,
        from: leaveRequest.from,
        to: leaveRequest.to,
        status: leaveRequest.status,
        reason: leaveRequest.reason || ""
      });
    }
  }, [leaveRequest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveRequest) return;

    const days = Math.ceil((new Date(formData.to).getTime() - new Date(formData.from).getTime()) / (1000 * 3600 * 24)) + 1;
    
    const updatedRequest = {
      ...leaveRequest,
      ...formData,
      days
    };

    onUpdate(updatedRequest);
    onClose();
  };

  if (!leaveRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Edit Leave Request
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="employee">Employee</Label>
            <Input
              id="employee"
              value={formData.employee}
              onChange={(e) => setFormData({...formData, employee: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type">Leave Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vacation">Vacation</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="from">From Date</Label>
            <Input
              id="from"
              type="date"
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="to">To Date</Label>
            <Input
              id="to"
              type="date"
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Reason for leave..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Update Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
