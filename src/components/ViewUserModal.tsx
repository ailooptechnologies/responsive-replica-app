
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Calendar } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{user.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Last login: {user.lastLogin}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Status:</span>
              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
