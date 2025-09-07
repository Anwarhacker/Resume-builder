export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  organization?: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
}

export interface Hobby {
  id: string
  name: string
  description?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  workExperience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
  achievements: Achievement[]
  certificates: Certificate[]
  hobbies: Hobby[]
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: [],
  achievements: [],
  certificates: [],
  hobbies: [],
}

export const hasContent = {
  personalInfo: (data: PersonalInfo) => data.fullName || data.email || data.phone || data.summary,
  education: (data: Education[]) => data.length > 0,
  workExperience: (data: WorkExperience[]) => data.length > 0,
  projects: (data: Project[]) => data.length > 0,
  skills: (data: Skill[]) => data.length > 0,
  achievements: (data: Achievement[]) => data.length > 0,
  certificates: (data: Certificate[]) => data.length > 0,
  hobbies: (data: Hobby[]) => data.length > 0,
}
