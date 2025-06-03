
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { ViewProjectModal } from "@/components/ViewProjectModal";

const Project = () => {
  const [projects, setProjects] = useState([
    {
      id: "PRJ-001",
      name: "Website Redesign",
      description: "Complete redesign of company website",
      status: "In Progress",
      startDate: "2025-01-01",
      endDate: "2025-03-31",
      budget: "$50,000"
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      description: "Native mobile app for iOS and Android",
      status: "Planning",
      startDate: "2025-02-01",
      endDate: "2025-06-30",
      budget: "$80,000"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectSave = (project) => {
    if (selectedProject) {
      setProjects(projects.map(proj => proj.id === project.id ? project : proj));
    } else {
      setProjects([...projects, project]);
    }
    setSelectedProject(null);
  };

  const handleDelete = (projectId) => {
    setProjects(projects.filter(proj => proj.id !== projectId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Project ID</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Start Date</th>
                  <th className="text-left py-3 px-4">Budget</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{project.id}</td>
                    <td className="py-3 px-4">{project.name}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{project.description}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        project.status === "Completed" ? "bg-green-100 text-green-800" :
                        project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        project.status === "On Hold" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{project.startDate}</td>
                    <td className="py-3 px-4 font-semibold text-primary">{project.budget}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedProject(project);
                          setIsViewModalOpen(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedProject(project);
                          setIsModalOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSave={handleProjectSave}
      />

      <ViewProjectModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />
    </div>
  );
};

export default Project;
