import type { ResumeData } from "@/lib/types"

interface ExecutiveProTemplateProps {
  data: ResumeData
}

export function ExecutiveProTemplate({ data }: ExecutiveProTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0

  return (
    <div
      className="bg-white text-black mx-auto font-sans text-xs leading-tight"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "0",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header with dark background */}
      <div className="bg-gray-900 text-white p-8 mb-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-light tracking-wide mb-3">
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.summary && (
              <p className="text-sm leading-relaxed text-gray-300 max-w-lg">{personalInfo.summary}</p>
            )}
          </div>
          <div className="text-right text-sm space-y-1 min-w-fit">
            {personalInfo.email && <div className="text-gray-300">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="text-gray-300">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="text-gray-300">{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="text-gray-300">{personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="text-gray-300">{personalInfo.github}</div>}
          </div>
        </div>
      </div>

      <div className="p-8 pt-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="w-2/3">
            {/* Experience */}
            {hasContent(workExperience) && (
              <div className="mb-8">
                <h2 className="text-lg font-light text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                  PROFESSIONAL EXPERIENCE
                </h2>
                {workExperience.map((work) => (
                  <div key={work.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{work.position}</h3>
                        <div className="text-sm text-gray-700 font-medium">{work.company}</div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="font-medium">{work.startDate} - {work.current ? "Present" : work.endDate}</div>
                        <div>{work.location}</div>
                      </div>
                    </div>
                    {work.description && work.description.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-700 mt-3">
                        {work.description.map((desc, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {hasContent(projects) && (
              <div className="mb-8">
                <h2 className="text-lg font-light text-gray-900 mb-6 pb-2 border-b-2 border-gray-900">
                  KEY PROJECTS
                </h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                      <div className="text-sm text-gray-600">{project.startDate} - {project.endDate}</div>
                    </div>
                    {project.description && <p className="text-sm text-gray-700 mb-3">{project.description}</p>}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-1/3 bg-gray-50 p-6 -mr-8 -mb-8">
            {/* Skills */}
            {hasContent(skills) && (
              <div className="mb-8">
                <h3 className="text-base font-light text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  CORE SKILLS
                </h3>
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{skill.name}</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`w-2 h-2 rounded-full ${
                                  level <= ["Beginner", "Intermediate", "Advanced", "Expert"].indexOf(skill.level) + 1
                                    ? "bg-gray-800"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {hasContent(education) && (
              <div className="mb-8">
                <h3 className="text-base font-light text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  EDUCATION
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
                    <div className="text-sm text-gray-700">{edu.field}</div>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                    <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                    {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {hasContent(certificates) && (
              <div className="mb-8">
                <h3 className="text-base font-light text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  CERTIFICATIONS
                </h3>
                {certificates.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <div className="text-sm font-semibold text-gray-800">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    <div className="text-xs text-gray-500">{cert.issueDate}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
            {hasContent(hobbies) && (
              <div>
                <h3 className="text-base font-light text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  INTERESTS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <span key={hobby.id} className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                      {hobby.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}