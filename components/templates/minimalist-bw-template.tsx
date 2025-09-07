import type { ResumeData } from "@/lib/types";

interface MinimalistBWTemplateProps {
  data: ResumeData;
}

export function MinimalistBWTemplate({ data }: MinimalistBWTemplateProps) {
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
      className="bg-white text-black mx-auto font-serif text-xs leading-relaxed"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "30px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light mb-4 tracking-wider">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm space-y-1 text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
        {personalInfo.summary && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-sm leading-relaxed text-gray-700 italic">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-10">
        {/* Work Experience */}
        {hasContent(workExperience) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-medium">{work.position}</h3>
                      <div className="text-xs text-gray-600 italic">
                        {work.company}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      {work.startDate} — {work.current ? "Present" : work.endDate}
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <div className="space-y-1 text-xs text-gray-700 leading-relaxed">
                      {work.description.map((desc, index) => (
                        <div key={index} className="flex items-start">
                          <span className="mr-3 mt-1 text-gray-400">◦</span>
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
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium">
                        {edu.degree}
                      </h3>
                      <div className="text-xs text-gray-600 italic">{edu.institution}</div>
                      {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              SKILLS
            </h2>
            <div className="text-xs text-gray-600 leading-relaxed">
              {skills.map((skill) => skill.name).join(" • ")}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">{project.name}</h3>
                    <div className="text-xs text-gray-500 font-light">
                      {project.startDate} — {project.endDate}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs text-gray-700 mb-2 leading-relaxed italic">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Technologies:</span>{" "}
                      {project.technologies.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {hasContent(certificates) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              CERTIFICATIONS
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium">{cert.name}</h3>
                      <div className="text-xs text-gray-600 italic">{cert.issuer}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-light">
                      {cert.issueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {hasContent(achievements) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="text-xs text-gray-700">
                  <span className="font-medium">{achievement.title}</span>
                  {achievement.description && (
                    <span className="italic"> — {achievement.description}</span>
                  )}
                  {achievement.date && (
                    <span className="text-gray-500"> ({achievement.date})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hasContent(hobbies) && (
          <div>
            <h2 className="text-lg font-light mb-6 tracking-widest border-b border-gray-300 pb-2">
              INTERESTS
            </h2>
            <div className="text-xs text-gray-600 italic">
              {hobbies.map((hobby) => hobby.name).join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
