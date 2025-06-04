
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Department {
  id: number;
  name: string;
  count: number;
  budget: string;
  head?: string;
  description?: string;
  status: string;
}

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Department) => void;
  department?: Department | null;
  mode: 'add' | 'edit';
}

export function DepartmentModal({ isOpen, onClose, onSave, department, mode }: DepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    head: "",
    budget: "",
    description: "",
    status: "Active"
  });

  useEffect(() => {
    if (mode === 'edit' && department) {
      setFormData({
        name: department.name,
        head: department.head || "",
        budget: department.budget,
        description: department.description || "",
        status: department.status
      });
    } else {
      setFormData({
        name: "",
        head: "",
        budget: "",
        description: "",
        status: "Active"
      });
    }
  }, [mode, department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departmentData = {
      id: mode === 'edit' && department ? department.id : Date.now(),
      ...formData,
      count: mode === 'edit' && department ? department.count : 0
    };
    onSave(departmentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Department' : 'Edit Department'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="head">Department Head</Label>
            <Input
              id="head"
              value={formData.head}
              onChange={(e) => setFormData({ ...formData, head: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="$100,000"
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Restructuring">Restructuring</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Department description..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{mode === 'add' ? 'Add' : 'Update'} Department</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
