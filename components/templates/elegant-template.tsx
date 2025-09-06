import type { ResumeData } from "@/lib/types"

interface ElegantTemplateProps {
  data: ResumeData
}

export function ElegantTemplate({ data }: ElegantTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0

  return (
    <div
      className="bg-white text-black mx-auto font-serif text-xs leading-relaxed"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "40px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold tracking-wide mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center items-center gap-4 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="flex justify-center items-center gap-4 text-xs mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>•</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
            {personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-justify leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
            Professional Experience
          </h2>
          {workExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold">{work.position}</h3>
                <span className="text-xs italic">
                  {work.startDate} - {work.current ? "Present" : work.endDate}
                </span>
              </div>
              <div className="text-xs italic mb-2">{work.company} | {work.location}</div>
              {work.description && work.description.length > 0 && (
                <ul className="space-y-1">
                  {work.description.map((desc, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">—</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {hasContent(education) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{edu.degree} in {edu.field}</h3>
                <span className="text-xs italic">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-xs italic">{edu.institution}</div>
              {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = []
                acc[skill.category].push(skill)
                return acc
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="text-xs font-bold mb-1">{category}:</h4>
                <div className="text-xs">
                  {categorySkills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < categorySkills.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
            Notable Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold">{project.name}</h3>
                <span className="text-xs italic">{project.startDate} - {project.endDate}</span>
              </div>
              {project.description && <p className="text-xs mb-1">{project.description}</p>}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-xs italic">
                  Technologies: {project.technologies.join(" • ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certificates & Hobbies in two columns */}
      <div className="grid grid-cols-2 gap-6">
        {hasContent(certificates) && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
              Certifications
            </h2>
            {certificates.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="text-xs font-bold">{cert.name}</div>
                <div className="text-xs italic">{cert.issuer} | {cert.issueDate}</div>
              </div>
            ))}
          </div>
        )}

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 mb-3">
              Interests
            </h2>
            <div className="text-xs">
              {hobbies.map((hobby, index) => (
                <span key={hobby.id}>
                  {hobby.name}
                  {index < hobbies.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}