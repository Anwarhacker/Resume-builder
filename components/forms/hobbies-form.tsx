"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import type { Hobby } from "@/lib/types"

interface HobbiesFormProps {
  hobbies: Hobby[]
  onChange: (hobbies: Hobby[]) => void
}

export function HobbiesForm({ hobbies, onChange }: HobbiesFormProps) {
  const addHobby = () => {
    const newHobby: Hobby = {
      id: Date.now().toString(),
      name: "",
      description: "",
    }
    onChange([...hobbies, newHobby])
  }

  const updateHobby = (id: string, field: keyof Hobby, value: string) => {
    onChange(hobbies.map((hobby) => (hobby.id === id ? { ...hobby, [field]: value } : hobby)))
  }

  const removeHobby = (id: string) => {
    onChange(hobbies.filter((hobby) => hobby.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Hobbies & Interests</h3>
        <Button onClick={addHobby} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Hobby
        </Button>
      </div>

      {hobbies.map((hobby) => (
        <Card key={hobby.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Hobby/Interest</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => removeHobby(hobby.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`hobby-name-${hobby.id}`}>Name</Label>
              <Input
                id={`hobby-name-${hobby.id}`}
                value={hobby.name}
                onChange={(e) => updateHobby(hobby.id, "name", e.target.value)}
                placeholder="Photography, Hiking, Chess..."
              />
            </div>
            <div>
              <Label htmlFor={`hobby-desc-${hobby.id}`}>Description (Optional)</Label>
              <Textarea
                id={`hobby-desc-${hobby.id}`}
                value={hobby.description}
                onChange={(e) => updateHobby(hobby.id, "description", e.target.value)}
                placeholder="Brief description of your interest or achievements..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {hobbies.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hobbies added yet. Click "Add Hobby" to get started.</p>
        </div>
      )}
    </div>
  )
}
