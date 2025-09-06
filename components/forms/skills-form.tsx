"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { Skill } from "@/lib/types";

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
      category: "Technical",
    };
    onChange([...data, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button onClick={addSkill} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((skill, index) => (
              <div
                key={skill.id}
                className={`border border-border rounded-lg p-4 space-y-3 ${
                  index % 2 === 0 ? "bg-blue-50/30" : "bg-green-50/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm bg-violet-200 p-1 rounded-lg">
                    Skill {index + 1}: {skill.name || "New Skill"}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-destructive hover:text-destructive h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Skill Name *</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(skill.id, "name", e.target.value)
                    }
                    placeholder="React, Python, etc."
                    className="h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Category *</Label>
                  <Input
                    value={skill.category}
                    onChange={(e) =>
                      updateSkill(skill.id, "category", e.target.value)
                    }
                    placeholder="Technical, Soft Skills, etc."
                    className="h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Proficiency Level *</Label>
                  <Select
                    value={skill.level}
                    onValueChange={(value) =>
                      updateSkill(skill.id, "level", value as Skill["level"])
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
