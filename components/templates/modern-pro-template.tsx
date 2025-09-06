import type { ResumeData } from "@/lib/types";

interface ModernProTemplateProps {
  data: ResumeData;
}

export function ModernProTemplate({ data }: ModernProTemplateProps) {
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
      className="bg-white text-gray-900 mx-auto font-sans text-xs leading-tight"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "0",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-3xl font-light mb-3 tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {personalInfo.summary && (
              <p className="text-sm leading-relaxed text-blue-100 max-w-2xl">
                {personalInfo.summary}
              </p>
            )}
          </div>
          <div className="ml-8 space-y-1 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <span className="w-4 text-blue-200">✉</span>{" "}
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <span className="w-4 text-blue-200">☎</span>{" "}
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <span className="w-4 text-blue-200">📍</span>{" "}
                {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="w-4 text-blue-200">💼</span>{" "}
                {personalInfo.linkedin}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Experience */}
        {hasContent(workExperience) && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-sm font-bold">💼</span>
              </div>
              <h2 className="text-xl font-light text-gray-800">
                Professional Experience
              </h2>
              <div className="flex-1 ml-4 border-t border-blue-200"></div>
            </div>

            {workExperience.map((work, index) => (
              <div key={work.id} className="relative mb-8 pl-12">
                {/* Timeline */}
                <div className="absolute left-4 top-0 w-px h-full bg-blue-200"></div>
                <div className="absolute left-2.5 top-2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"></div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {work.position}
                      </h3>
                      <div className="text-blue-600 font-medium">
                        {work.company}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="bg-blue-100 px-3 py-1 rounded-full">
                        {work.startDate} -{" "}
                        {work.current ? "Present" : work.endDate}
                      </div>
                      <div className="mt-1">{work.location}</div>
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {work.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="text-blue-500 mr-3 mt-1">▶</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Skills */}
          {hasContent(skills) && (
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <h2 className="text-xl font-light text-gray-800">
                  Skills & Expertise
                </h2>
                <div className="flex-1 ml-4 border-t border-green-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{skill.name}</span>
                            <span className="text-gray-500 text-xs">
                              {skill.level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${
                                  ([
                                    "Beginner",
                                    "Intermediate",
                                    "Advanced",
                                    "Expert",
                                  ].indexOf(skill.level) +
                                    1) *
                                  25
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Certificates */}
          <div className="space-y-8">
            {hasContent(education) && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">🎓</span>
                  </div>
                  <h3 className="text-lg font-light text-gray-800">
                    Education
                  </h3>
                </div>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-purple-50 p-4 rounded-lg mb-3 border-l-4 border-purple-600"
                  >
                    <h4 className="text-sm font-semibold text-gray-800">
                      {edu.degree}
                    </h4>
                    <div className="text-sm text-purple-700">{edu.field}</div>
                    <div className="text-sm text-gray-600">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && (
                      <div className="text-xs text-gray-500">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {hasContent(certificates) && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">🏆</span>
                  </div>
                  <h3 className="text-lg font-light text-gray-800">
                    Certifications
                  </h3>
                </div>
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-orange-50 p-3 rounded-lg mb-3 border-l-4 border-orange-600"
                  >
                    <div className="text-sm font-semibold text-gray-800">
                      {cert.name}
                    </div>
                    <div className="text-sm text-orange-700">{cert.issuer}</div>
                    <div className="text-xs text-gray-500">
                      {cert.issueDate}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        {hasContent(projects) && (
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-sm font-bold">🚀</span>
              </div>
              <h2 className="text-xl font-light text-gray-800">
                Featured Projects
              </h2>
              <div className="flex-1 ml-4 border-t border-red-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-700 mb-4">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                        >
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

        {/* Hobbies */}
        {hasContent(hobbies) && (
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">🎯</span>
              </div>
              <h3 className="text-lg font-light text-gray-800">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {hobbies.map((hobby) => (
                <span
                  key={hobby.id}
                  className="px-4 py-2 bg-indigo-100 text-indigo-800 text-sm rounded-full border border-indigo-200"
                >
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
