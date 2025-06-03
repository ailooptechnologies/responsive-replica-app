
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: string;
}

interface ViewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ViewProjectModal({ isOpen, onClose, project }: ViewProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Project ID</label>
              <p className="font-medium">{project.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge className={
                  project.status === "Completed" ? "bg-green-100 text-green-800" :
                  project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  project.status === "On Hold" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  {project.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Project Name</label>
            <p className="font-medium">{project.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Start Date</label>
              <p className="text-sm">{project.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">End Date</label>
              <p className="text-sm">{project.endDate || "Not set"}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Budget</label>
            <p className="text-lg font-bold text-primary">{project.budget}</p>
          </div>
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
