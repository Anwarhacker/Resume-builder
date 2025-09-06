"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { WorkExperience } from "@/lib/types"

interface WorkExperienceFormProps {
  data: WorkExperience[]
  onChange: (data: WorkExperience[]) => void
}

export function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    }
    onChange([...data, newWork])
  }

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map((work) => (work.id === id ? { ...work, [field]: value } : work)))
  }

  const updateDescription = (id: string, index: number, value: string) => {
    const work = data.find((w) => w.id === id)
    if (work) {
      const newDescription = [...work.description]
      newDescription[index] = value
      updateWorkExperience(id, "description", newDescription)
    }
  }

  const addDescriptionPoint = (id: string) => {
    const work = data.find((w) => w.id === id)
    if (work) {
      updateWorkExperience(id, "description", [...work.description, ""])
    }
  }

  const removeDescriptionPoint = (id: string, index: number) => {
    const work = data.find((w) => w.id === id)
    if (work && work.description.length > 1) {
      const newDescription = work.description.filter((_, i) => i !== index)
      updateWorkExperience(id, "description", newDescription)
    }
  }

  const removeWorkExperience = (id: string) => {
    onChange(data.filter((work) => work.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button onClick={addWorkExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No work experience entries yet. Click "Add Experience" to get started.
          </p>
        ) : (
          data.map((work) => (
            <div key={work.id} className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Work Experience Entry</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(work.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={work.company}
                    onChange={(e) => updateWorkExperience(work.id, "company", e.target.value)}
                    placeholder="Google Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position *</Label>
                  <Input
                    value={work.position}
                    onChange={(e) => updateWorkExperience(work.id, "position", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    value={work.location}
                    onChange={(e) => updateWorkExperience(work.id, "location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={work.startDate}
                    onChange={(e) => updateWorkExperience(work.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={work.endDate}
                    onChange={(e) => updateWorkExperience(work.id, "endDate", e.target.value)}
                    disabled={work.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${work.id}`}
                  checked={work.current}
                  onCheckedChange={(checked) => {
                    updateWorkExperience(work.id, "current", checked)
                    if (checked) {
                      updateWorkExperience(work.id, "endDate", "")
                    }
                  }}
                />
                <Label htmlFor={`current-${work.id}`}>I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label>Job Description *</Label>
                {work.description.map((desc, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescription(work.id, index, e.target.value)}
                      placeholder="• Developed and maintained web applications using React and Node.js"
                      rows={2}
                      className="flex-1"
                    />
                    {work.description.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDescriptionPoint(work.id, index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addDescriptionPoint(work.id)} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Description Point
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
