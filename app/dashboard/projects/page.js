'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FolderOpen, Plus, Search } from 'lucide-react'

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('')

  const projects = [
    {
      id: 'PRJ-001',
      name: 'Website Redesign',
      description: 'Complete redesign of company website',
      status: 'In Progress',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      budget: '$50,000',
      progress: 75
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android',
      status: 'Planning',
      startDate: '2025-02-01',
      endDate: '2025-06-30',
      budget: '$80,000',
      progress: 25
    },
    {
      id: 'PRJ-003',
      name: 'ERP Implementation',
      description: 'Implementation of new ERP system',
      status: 'Completed',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      budget: '$120,000',
      progress: 100
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Start:</span>
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End:</span>
                      <span>{project.endDate}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Budget:</span>
                      <span className="text-primary">{project.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}