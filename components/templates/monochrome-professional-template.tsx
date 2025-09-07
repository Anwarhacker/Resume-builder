import type { ResumeData } from "@/lib/types";

interface MonochromeProfessionalTemplateProps {
  data: ResumeData;
}

export function MonochromeProfessionalTemplate({ data }: MonochromeProfessionalTemplateProps) {
  const {
    personalInfo,
    education,
    workExperience,
    skills,
    projects,
    achievements,
    certificates,
    hobbies,
  } = data;

  const hasContent = (section: any[]) => section && section.length > 0;

  return (
    <div
      className="bg-white text-black mx-auto font-sans text-xs leading-tight"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "20px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-3 tracking-wide">
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {personalInfo.email && <div>✉ {personalInfo.email}</div>}
            {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
          </div>
          <div className="space-y-1">
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.linkedin && <div>🔗 {personalInfo.linkedin}</div>}
          </div>
        </div>
        {personalInfo.summary && (
          <div className="mt-4 pt-4 border-t border-gray-400">
            <p className="text-sm leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Work Experience */}
          {hasContent(workExperience) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-5">
                {workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-sm font-bold">{work.position}</h3>
                        <div className="text-xs text-gray-600">
                          {work.company}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {work.startDate} - {work.current ? "Present" : work.endDate}
                      </div>
                    </div>
                    {work.description && work.description.length > 0 && (
                      <div className="space-y-1 text-xs">
                        {work.description.map((desc, index) => (
                          <div key={index} className="flex items-start">
                            <span className="mr-2 mt-1">•</span>
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

          {/* Education */}
          {hasContent(education) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">
                          {edu.degree}
                        </h3>
                        <div className="text-xs text-gray-600">{edu.institution}</div>
                        {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                      </div>
                      <div className="text-xs text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {hasContent(projects) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                KEY PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold">{project.name}</h3>
                      <div className="text-xs text-gray-500">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="text-xs">
                        <span className="font-semibold">Technologies:</span>{" "}
                        {project.technologies.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {hasContent(skills) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                SKILLS
              </h2>
              <div className="space-y-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-xs">
                    <div className="font-medium">{skill.name}</div>
                    {skill.level && (
                      <div className="text-gray-500">({skill.level})</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {hasContent(certificates) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}</div>
                    <div className="text-gray-500">{cert.issueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {hasContent(achievements) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                ACHIEVEMENTS
              </h2>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="text-xs">
                    <div className="font-bold">{achievement.title}</div>
                    {achievement.description && (
                      <div className="text-gray-600">{achievement.description}</div>
                    )}
                    {achievement.date && (
                      <div className="text-gray-500">({achievement.date})</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hasContent(hobbies) && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
                INTERESTS
              </h2>
              <div className="text-xs">
                {hobbies.map((hobby) => hobby.name).join(" • ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
