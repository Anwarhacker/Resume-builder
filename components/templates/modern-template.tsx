import type { ResumeData } from "@/lib/types"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, achievements, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0
  const hasPersonalLinks = personalInfo.linkedin || personalInfo.github

  return (
    <div
      className="bg-white text-gray-900 mx-auto  font-sans text-xs leading-tight"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "10px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header Section */}
      <div
        className="bg-emerald-600 text-white p-3 sm:p-4 -m-2.5 mb-4"
        style={{
          background: "linear-gradient(to right, #059669, #10b981)",
          backgroundColor: "#059669", // Fallback solid color
          color: "#ffffff", // Explicit white text
        }}
      >
        <div className="flex flex-col gap-2 sm:gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold mb-1 text-white" style={{ color: "#ffffff" }}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.summary && (
              <p className="text-emerald-100 text-xs sm:text-sm" style={{ color: "#d1fae5" }}>
                {personalInfo.summary}
              </p>
            )}
          </div>
          <div className="text-xs space-y-0.5 text-white" style={{ color: "#ffffff" }}>
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Column */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-2 sm:p-3 space-y-3 sm:space-y-4 -mx-2.5">
          {/* Contact & Links */}
          {hasPersonalLinks && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2 border-b border-emerald-200 pb-1">Contact</h3>
              <div className="space-y-1 text-xs">
                {personalInfo.linkedin && (
                  <div>
                    <span className="font-medium">LinkedIn:</span>
                    <div className="text-gray-600 break-all">{personalInfo.linkedin}</div>
                  </div>
                )}
                {personalInfo.github && (
                  <div>
                    <span className="font-medium">GitHub:</span>
                    <div className="text-gray-600 break-all">{personalInfo.github}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {hasContent(skills) && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2 border-b border-emerald-200 pb-1">Skills</h3>
              <div className="space-y-2">
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
                  <div key={category}>
                    <h4 className="font-medium text-xs text-gray-700 mb-1">{category}</h4>
                    <div className="space-y-0.5">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center text-xs">
                          <span>{skill.name}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  level <= ["Beginner", "Intermediate", "Advanced", "Expert"].indexOf(skill.level) + 1
                                    ? "bg-emerald-500"
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
            </div>
          )}

          {/* Education */}
          {hasContent(education) && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2 border-b border-emerald-200 pb-1">
                Education
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-gray-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(certificates) && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2 border-b border-emerald-200 pb-1">
                Certificates
              </h3>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}</div>
                    <div className="text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(hobbies) && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 mb-2 border-b border-emerald-200 pb-1">Hobbies</h3>
              <div className="flex flex-wrap gap-1">
                {hobbies.map((hobby) => (
                  <span key={hobby.id} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">
                    {hobby.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 space-y-3 sm:space-y-4">
          {/* Work Experience */}
          {hasContent(workExperience) && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 border-b-2 border-emerald-500 pb-1">
                Professional Experience
              </h3>
              <div className="space-y-3">
                {workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{work.position}</h4>
                        <div className="text-emerald-600 font-medium text-xs">{work.company}</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <div>{work.location}</div>
                        <div>
                          {work.startDate} - {work.current ? "Present" : work.endDate}
                        </div>
                      </div>
                    </div>
                    {work.description && work.description.length > 0 && (
                      <div className="space-y-0.5 text-xs text-gray-700">
                        {work.description.map((desc, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-emerald-500 mr-1 mt-1">•</span>
                            <span>{desc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {hasContent(projects) && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 border-b-2 border-emerald-500 pb-1">
                Projects
              </h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold text-gray-800">{project.name}</h4>
                      <div className="text-xs text-gray-600">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    {project.description && <p className="text-xs text-gray-700 mb-1">{project.description}</p>}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(achievements) && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 border-b-2 border-emerald-500 pb-1">
                Achievements
              </h3>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start">
                    <span className="text-emerald-500 mr-1 mt-1">•</span>
                    <div className="text-xs text-gray-700">
                      <span className="font-medium">{achievement.title}</span>
                      {achievement.description && <span> - {achievement.description}</span>}
                      {achievement.date && <span className="text-gray-500"> ({achievement.date})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
