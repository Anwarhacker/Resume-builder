import type { ResumeData } from "@/lib/types"

interface ConsultantTemplateProps {
  data: ResumeData
}

export function ConsultantTemplate({ data }: ConsultantTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, certificates, hobbies } = data

  const hasContent = (section: any[]) => section && section.length > 0

  return (
    <div
      className="bg-white text-gray-900 mx-auto font-sans text-xs leading-tight"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "0",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="bg-slate-800 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-700 rounded-full -ml-12 -mb-12 opacity-30"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2 tracking-wide">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="w-16 h-1 bg-blue-400 mb-4"></div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              {personalInfo.summary && (
                <p className="text-sm leading-relaxed text-slate-200">{personalInfo.summary}</p>
              )}
            </div>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">@</span>
                  </div>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">☎</span>
                  </div>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">in</span>
                  </div>
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {hasContent(workExperience) && (
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800 mr-4">EXPERIENCE</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                
                {workExperience.map((work) => (
                  <div key={work.id} className="mb-8 relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-300"></div>
                    <div className="pl-6">
                      <div className="bg-slate-50 p-6 rounded-r-lg shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800">{work.position}</h3>
                            <div className="text-blue-600 font-semibold text-sm">{work.company}</div>
                          </div>
                          <div className="text-right">
                            <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                              {work.startDate} - {work.current ? "Present" : work.endDate}
                            </div>
                            <div className="text-slate-600 text-sm mt-1">{work.location}</div>
                          </div>
                        </div>
                        {work.description && work.description.length > 0 && (
                          <div className="space-y-2 text-sm text-slate-700">
                            {work.description.map((desc, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>{desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {hasContent(projects) && (
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800 mr-4">PROJECTS</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{project.name}</h3>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {project.startDate} - {project.endDate}
                        </span>
                      </div>
                      {project.description && (
                        <p className="text-sm text-slate-700 mb-4 leading-relaxed">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            {hasContent(skills) && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
                  SKILLS
                </h3>
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">{category}</h4>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-700 font-medium">{skill.name}</span>
                            <span className="text-slate-500 text-xs">{skill.level}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-slate-600 to-slate-800 h-1.5 rounded-full"
                              style={{
                                width: `${(["Beginner", "Intermediate", "Advanced", "Expert"].indexOf(skill.level) + 1) * 25}%`,
                              }}
                            ></div>
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
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
                  EDUCATION
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-slate-600">
                    <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                    <div className="text-sm text-slate-600">{edu.field}</div>
                    <div className="text-sm font-medium text-slate-700">{edu.institution}</div>
                    <div className="text-xs text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                    {edu.gpa && <div className="text-xs text-slate-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {hasContent(certificates) && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
                  CERTIFICATIONS
                </h3>
                {certificates.map((cert) => (
                  <div key={cert.id} className="mb-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div className="text-sm font-bold text-slate-800">{cert.name}</div>
                    <div className="text-sm text-slate-600">{cert.issuer}</div>
                    <div className="text-xs text-slate-500">{cert.issueDate}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
            {hasContent(hobbies) && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
                  INTERESTS
                </h3>
                <div className="space-y-2">
                  {hobbies.map((hobby) => (
                    <div key={hobby.id} className="flex items-center p-2 bg-slate-50 rounded">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">{hobby.name}</span>
                    </div>
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