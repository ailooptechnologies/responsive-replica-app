
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Plus } from "lucide-react";

const ProjectSystem = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Project System</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New System
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Project System Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Project system configuration ready.</p>
            <p className="text-sm">Manage project workflows and integrations here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSystem;
