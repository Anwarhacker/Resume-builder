"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectsFormProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const [newTechnology, setNewTechnology] = useState<{ [key: string]: string }>({})

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      startDate: "",
      endDate: "",
    }
    onChange([...projects, newProject])
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id))
  }

  const addTechnology = (projectId: string) => {
    const tech = newTechnology[projectId]?.trim()
    if (!tech) return

    const project = projects.find((p) => p.id === projectId)
    if (project && !project.technologies.includes(tech)) {
      updateProject(projectId, "technologies", [...project.technologies, tech])
      setNewTechnology({ ...newTechnology, [projectId]: "" })
    }
  }

  const removeTechnology = (projectId: string, tech: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      updateProject(
        projectId,
        "technologies",
        project.technologies.filter((t) => t !== tech),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No projects added yet. Click "Add Project" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">{project.name || "New Project"}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
                    <Input
                      id={`project-name-${project.id}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="My Awesome Project"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`project-start-${project.id}`}>Start Date</Label>
                      <Input
                        id={`project-start-${project.id}`}
                        type="month"
                        value={project.startDate}
                        onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-end-${project.id}`}>End Date</Label>
                      <Input
                        id={`project-end-${project.id}`}
                        type="month"
                        value={project.endDate}
                        onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`project-description-${project.id}`}>Description *</Label>
                  <Textarea
                    id={`project-description-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe your project, its goals, and your role..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`project-link-${project.id}`}>
                      <ExternalLink className="h-4 w-4 inline mr-1" />
                      Live Demo URL
                    </Label>
                    <Input
                      id={`project-link-${project.id}`}
                      value={project.link}
                      onChange={(e) => updateProject(project.id, "link", e.target.value)}
                      placeholder="https://myproject.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-github-${project.id}`}>
                      <Github className="h-4 w-4 inline mr-1" />
                      GitHub Repository
                    </Label>
                    <Input
                      id={`project-github-${project.id}`}
                      value={project.github}
                      onChange={(e) => updateProject(project.id, "github", e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div>
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTechnology(project.id, tech)}
                      >
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTechnology[project.id] || ""}
                      onChange={(e) =>
                        setNewTechnology({
                          ...newTechnology,
                          [project.id]: e.target.value,
                        })
                      }
                      placeholder="Add technology (e.g., React, Node.js)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTechnology(project.id)
                        }
                      }}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => addTechnology(project.id)}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
