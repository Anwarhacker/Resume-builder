import type { ResumeData } from "./types"

export const exampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://sarahjohnson.dev",
    linkedin: "linkedin.com/in/sarahjohnson",
    github: "github.com/sarahjohnson",
    summary: "Experienced Full Stack Developer with 5+ years building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating user-friendly solutions and leading development teams."
  },
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "Aug 2016",
      endDate: "May 2020",
      gpa: "3.8",
      description: "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering"
    }
  ],
  workExperience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Reduced application load time by 40% through performance optimization",
       
      ]
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Frontend Developer",
      location: "Remote",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      current: false,
      description: [
        "Built responsive React applications with TypeScript",
        "Collaborated with UX team to implement pixel-perfect designs",
        
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce application with payment processing, inventory management, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
      link: "https://ecommerce-demo.com",
      github: "https://github.com/sarahjohnson/ecommerce-platform",
      startDate: "Mar 2023",
      endDate: "Jun 2023"
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Real-time collaborative task management tool with drag-and-drop functionality",
      technologies: ["Next.js", "Socket.io", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/sarahjohnson/task-manager",
      startDate: "Jan 2023",
      endDate: "Feb 2023"
    }
  ],
  skills: [
    { id: "1", name: "JavaScript", level: "Expert", category: "Programming Languages" },
    { id: "2", name: "TypeScript", level: "Advanced", category: "Programming Languages" },
    { id: "3", name: "Python", level: "Intermediate", category: "Programming Languages" },
    { id: "4", name: "React", level: "Expert", category: "Frontend Technologies" },
    { id: "5", name: "Next.js", level: "Advanced", category: "Frontend Technologies" },
    { id: "6", name: "Vue.js", level: "Intermediate", category: "Frontend Technologies" },
   
  ],
  achievements: [],
  certificates: [
    {
      id: "1",
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      issueDate: "Mar 2023",
      expiryDate: "Mar 2026",
      credentialId: "AWS-DEV-2023-001234",
      link: "https://aws.amazon.com/verification"
    },
    {
      id: "2",
      name: "React Professional Certificate",
      issuer: "Meta",
      issueDate: "Jan 2022",
      link: "https://coursera.org/verify/professional-cert"
    }
  ],
  hobbies: [
    { id: "1", name: "Photography", description: "Landscape and portrait photography" },
    { id: "2", name: "Rock Climbing", description: "Indoor and outdoor climbing" },
    { id: "3", name: "Open Source", description: "Contributing to React ecosystem projects" },
    { id: "4", name: "Cooking", description: "Experimenting with international cuisines" }
  ]
}