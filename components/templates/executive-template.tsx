import type { ResumeData } from "@/lib/types"

interface ExecutiveTemplateProps {
  data: ResumeData
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, achievements, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0

  return (
    <div
      className="bg-white text-black mx-auto font-serif text-xs leading-tight"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "10px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header with black background */}
      <div className="bg-black text-white p-6 -m-2.5 mb-6">
        <h1 className="text-3xl font-bold mb-2 tracking-wide">{personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {personalInfo.email && <div>📧 {personalInfo.email}</div>}
            {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
          </div>
          <div className="space-y-1">
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.linkedin && <div>💼 {personalInfo.linkedin}</div>}
          </div>
        </div>
        {personalInfo.summary && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Work Experience */}
        {hasContent(workExperience) && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id} className="border-l-4 border-black pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-bold">{work.position}</h3>
                      <div className="text-sm font-semibold">
                        {work.company} | {work.location}
                      </div>
                    </div>
                    <div className="text-xs bg-black text-white px-2 py-1">
                      {work.startDate} — {work.current ? "Present" : work.endDate}
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <ul className="space-y-1 text-xs">
                      {work.description.map((desc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">▪</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasContent(education) && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">EDUCATION</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <div className="text-sm">{edu.institution}</div>
                    {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-xs bg-gray-200 px-2 py-1">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(
                skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  },
                  {} as Record<string, typeof skills>,
                ),
              ).map(([category, categorySkills]) => (
                <div key={category} className="bg-gray-100 p-3">
                  <div className="font-bold text-sm mb-2">{category}</div>
                  <div className="text-xs">{categorySkills.map((skill) => skill.name).join(" • ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">KEY PROJECTS</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{project.name}</h3>
                    <div className="text-xs">
                      {project.startDate} — {project.endDate}
                    </div>
                  </div>
                  {project.description && <p className="text-xs mb-2">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-xs">
                      <span className="font-semibold">Tech Stack:</span> {project.technologies.join(" | ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates & Achievements in two columns */}
        <div className="grid grid-cols-2 gap-6">
          {hasContent(certificates) && (
            <div>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-bold">{cert.name}</div>
                    <div>
                      {cert.issuer} • {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(achievements) && (
            <div>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">ACHIEVEMENTS</h2>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="text-xs">
                    <div className="font-bold">{achievement.title}</div>
                    {achievement.description && <div>{achievement.description}</div>}
                    {achievement.date && <div className="text-gray-600">({achievement.date})</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">INTERESTS</h2>
            <div className="text-xs">{hobbies.map((hobby) => hobby.name).join(" • ")}</div>
          </div>
        )}
      </div>
    </div>
  )
}
