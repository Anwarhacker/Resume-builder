import type { ResumeData } from "@/lib/types"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, achievements, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0

  return (
    <div
      className="bg-white text-black mx-auto font-serif text-xs leading-relaxed"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "10px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center mb-8 pb-4 border-b border-black">
        <h1 className="text-4xl font-bold mb-3 tracking-wider">{personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm space-y-1">
          <div>
            {personalInfo.email} {personalInfo.phone && `• ${personalInfo.phone}`}
          </div>
          <div>{personalInfo.location}</div>
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center">PROFESSIONAL SUMMARY</h2>
          <p className="text-center text-sm leading-relaxed italic">{personalInfo.summary}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Work Experience */}
        {hasContent(workExperience) && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">EXPERIENCE</h2>
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="text-center mb-2">
                    <h3 className="text-sm font-bold">{work.position}</h3>
                    <div className="text-sm italic">
                      {work.company}, {work.location}
                    </div>
                    <div className="text-xs">
                      {work.startDate} — {work.current ? "Present" : work.endDate}
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <div className="text-xs space-y-1 text-justify">
                      {work.description.map((desc, index) => (
                        <div key={index}>• {desc}</div>
                      ))}
                    </div>
                  )}
                  <hr className="my-3 border-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasContent(education) && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">EDUCATION</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="font-bold text-sm">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="text-sm italic">{edu.institution}</div>
                  <div className="text-xs">
                    {edu.startDate} — {edu.endDate}
                  </div>
                  {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">SKILLS</h2>
            <div className="text-center space-y-2">
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
                <div key={category} className="text-xs">
                  <span className="font-bold">{category}:</span> {categorySkills.map((skill) => skill.name).join(", ")}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">PROJECTS</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="text-center">
                  <h3 className="font-bold text-sm">{project.name}</h3>
                  <div className="text-xs italic">
                    {project.startDate} — {project.endDate}
                  </div>
                  {project.description && <p className="text-xs mt-1">{project.description}</p>}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-xs mt-1">
                      <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom sections in columns */}
        <div className="grid grid-cols-2 gap-8">
          {hasContent(certificates) && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-center">CERTIFICATIONS</h2>
              <div className="space-y-2 text-center">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-bold">{cert.name}</div>
                    <div className="italic">{cert.issuer}</div>
                    <div>{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(achievements) && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-center">ACHIEVEMENTS</h2>
              <div className="space-y-2 text-center">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="text-xs">
                    <div className="font-bold">{achievement.title}</div>
                    {achievement.description && <div>{achievement.description}</div>}
                    {achievement.date && <div className="italic">({achievement.date})</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-center">INTERESTS</h2>
            <div className="text-xs text-center">{hobbies.map((hobby) => hobby.name).join(" • ")}</div>
          </div>
        )}
      </div>
    </div>
  )
}
