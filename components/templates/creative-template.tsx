import type { ResumeData } from "@/lib/types"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, achievements } = data

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400 to-emerald-600 rounded-bl-full opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-tr-full opacity-10"></div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white mb-4">
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex justify-center items-center gap-3 text-sm opacity-90">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>•</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
            </div>
          </div>
          {personalInfo.summary && (
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed italic">"{personalInfo.summary}"</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-emerald-50 rounded-xl p-5">
              <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                {personalInfo.location && (
                  <div className="flex items-center">
                    <span className="w-4 text-emerald-600">📍</span>
                    <span className="ml-2">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center">
                    <span className="w-4 text-emerald-600">🌐</span>
                    <span className="ml-2">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <span className="w-4 text-emerald-600">💼</span>
                    <span className="ml-2">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <span className="w-4 text-emerald-600">💻</span>
                    <span className="ml-2">{personalInfo.github}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Skills
                </h3>
                <div className="space-y-3">
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
                      <h4 className="font-semibold text-sm text-emerald-600 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs font-medium text-gray-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="bg-emerald-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-sm">
                      <div className="font-semibold text-gray-800">{edu.degree}</div>
                      <div className="text-emerald-600 font-medium">{edu.institution}</div>
                      <div className="text-gray-500 text-xs">
                        {edu.startDate} - {edu.endDate}
                      </div>
                      {edu.gpa && <div className="text-gray-500 text-xs">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Experience
                </h3>
                <div className="space-y-6">
                  {workExperience.map((work, index) => (
                    <div key={work.id} className="relative">
                      {index < workExperience.length - 1 && (
                        <div className="absolute left-6 top-8 w-0.5 h-full bg-emerald-200"></div>
                      )}
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 relative z-10"></div>
                        <div className="flex-1">
                          <div className="bg-white border border-emerald-100 rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800">{work.position}</h4>
                                <div className="text-emerald-600 font-medium">{work.company}</div>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <div>{work.location}</div>
                                <div>
                                  {work.startDate} - {work.current ? "Present" : work.endDate}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1 text-sm text-gray-700">
                              {work.description.map((desc, descIndex) => (
                                <div key={descIndex} className="flex items-start">
                                  <span className="text-emerald-400 mr-2 mt-1">▸</span>
                                  <span>{desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Featured Projects
                </h3>
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-lg p-4 border border-emerald-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{project.name}</h4>
                        <div className="text-sm text-gray-500">
                          {project.startDate} - {project.endDate}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
