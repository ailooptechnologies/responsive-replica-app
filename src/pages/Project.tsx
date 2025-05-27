
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Calendar, Users } from "lucide-react";

const Project = () => {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "ACME Corp",
      progress: 75,
      status: "In Progress",
      dueDate: "2025-02-15",
      team: 5
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "Tech Solutions",
      progress: 45,
      status: "In Progress",
      dueDate: "2025-03-20",
      team: 8
    },
    {
      id: 3,
      name: "Database Migration",
      client: "Global Industries",
      progress: 100,
      status: "Completed",
      dueDate: "2025-01-30",
      team: 3
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{project.client}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.dueDate}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {project.team} members
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;
