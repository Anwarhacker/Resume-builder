import type { ResumeData } from "@/lib/types"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, education, workExperience, skills, projects, achievements } = data

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto">
      {/* Header */}
      <div className="bg-gray-800 text-white p-8 px-3 py-3">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {personalInfo.email && <div>📧 {personalInfo.email}</div>}
            {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
          </div>
          <div className="space-y-1">
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{work.position}</h3>
                      <div className="text-gray-600 font-semibold">{work.company}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold">{work.location}</div>
                      <div className="text-gray-600">
                        {work.startDate} - {work.current ? "Present" : work.endDate}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 space-y-1 text-sm text-gray-700">
                    {work.description.map((desc, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-gray-400 mr-3 mt-1">▪</span>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-1">EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <div className="text-gray-600">{edu.field}</div>
                    <div className="text-gray-600 font-semibold">{edu.institution}</div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-1">
                CORE COMPETENCIES
              </h2>
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
                    <h4 className="font-semibold text-gray-700 mb-1">{category}</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between">
                          <span>{skill.name}</span>
                          <span className="text-gray-500">({skill.level})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-1">KEY PROJECTS</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    <div className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-700">Technologies: </span>
                    <span className="text-gray-600">{project.technologies.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Links */}
        {(personalInfo.linkedin || personalInfo.github) && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-1">PROFESSIONAL LINKS</h2>
            <div className="space-y-1 text-sm">
              {personalInfo.linkedin && (
                <div>
                  <span className="font-semibold">LinkedIn: </span>
                  <span className="text-gray-600">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div>
                  <span className="font-semibold">GitHub: </span>
                  <span className="text-gray-600">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
