import type { ResumeData } from "@/lib/types";

interface SimpleTemplateProps {
  data: ResumeData;
}

export function SimpleTemplate({ data }: SimpleTemplateProps) {
  const {
    personalInfo,
    education,
    workExperience,
    skills,
    projects,
    certificates,
    hobbies,
  } = data;

  const hasContent = (section: any[]) => section && section.length > 0;

  return (
    <div
      className="bg-white text-black mx-auto font-sans text-xs leading-relaxed"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "40px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm text-center">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">EXPERIENCE</h2>
          {workExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{work.position}</h3>
                <span className="text-sm">
                  {work.startDate} - {work.current ? "Present" : work.endDate}
                </span>
              </div>
              <div className="text-sm mb-2">
                {work.company} | {work.location}
              </div>
              {work.description && work.description.length > 0 && (
                <ul className="text-sm space-y-1">
                  {work.description.map((desc, index) => (
                    <li key={index}>• {desc}</li>
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
          <h2 className="text-lg font-bold mb-4">EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="text-sm">{edu.institution}</div>
              {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">SKILLS</h2>
          {Object.entries(
            skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill.name);
              return acc;
            }, {} as Record<string, string[]>)
          ).map(([category, skillNames]) => (
            <div key={category} className="mb-2">
              <span className="font-bold">{category}: </span>
              <span className="text-sm">{skillNames.join(", ")}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">PROJECTS</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{project.name}</h3>
                <span className="text-sm">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              {project.description && (
                <p className="text-sm mb-1">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-sm">
                  Technologies: {project.technologies.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certificates & Hobbies */}
      <div className="grid grid-cols-2 gap-6">
        {hasContent(certificates) && (
          <div>
            <h2 className="text-lg font-bold mb-4">CERTIFICATIONS</h2>
            {certificates.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="font-bold text-sm">{cert.name}</div>
                <div className="text-sm">
                  {cert.issuer} | {cert.issueDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-lg font-bold mb-4">INTERESTS</h2>
            <div className="text-sm">
              {hobbies.map((h) => h.name).join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
