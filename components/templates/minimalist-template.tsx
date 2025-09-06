import type { ResumeData } from "@/lib/types";

interface MinimalistTemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
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
  const hasContactLinks =
    personalInfo.website || personalInfo.linkedin || personalInfo.github;

  return (
    <div
      className="bg-white text-gray-900 mx-auto font-sans text-xs leading-tight space-y-4 w-full max-w-[794px]"
      style={{
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "10px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-light tracking-wide mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center items-center gap-2 text-xs text-gray-600 mb-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && personalInfo.email && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location &&
            (personalInfo.email || personalInfo.phone) && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {personalInfo.summary && (
          <p className="text-gray-700 mx-auto leading-relaxed text-xs">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Work Experience */}
      {hasContent(workExperience) && (
        <div>
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            EXPERIENCE
          </h2>
          <div className="space-y-3">
            {workExperience.map((work) => (
              <div key={work.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="text-sm font-medium">{work.position}</h3>
                    <div className="text-gray-600 text-xs">
                      {work.company}, {work.location}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    {work.startDate} — {work.current ? "Present" : work.endDate}
                  </div>
                </div>
                {work.description && work.description.length > 0 && (
                  <div className="space-y-0.5 text-xs text-gray-700 leading-relaxed">
                    {work.description.map((desc, index) => (
                      <div key={index}>• {desc}</div>
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
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-xs">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <div className="text-gray-600 text-xs">{edu.institution}</div>
                  {edu.gpa && (
                    <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 font-light">
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
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            SKILLS
          </h2>
          <div className="space-y-1">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category} className="flex items-start gap-2">
                <div className="font-medium text-gray-700 min-w-[80px] text-xs">
                  {category}:
                </div>
                <div className="text-gray-600 text-xs">
                  {categorySkills.map((skill) => skill.name).join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasContent(certificates) && (
        <div>
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            CERTIFICATES
          </h2>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex justify-between items-baseline"
              >
                <div>
                  <h3 className="font-medium text-xs">{cert.name}</h3>
                  <div className="text-gray-600 text-xs">{cert.issuer}</div>
                </div>
                <div className="text-xs text-gray-500 font-light">
                  {cert.issueDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div>
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            PROJECTS
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-xs">{project.name}</h3>
                  <div className="text-xs text-gray-500 font-light">
                    {project.startDate} — {project.endDate}
                  </div>
                </div>
                {project.description && (
                  <p className="text-xs text-gray-700 mb-1 leading-relaxed">
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

      {hasContent(achievements) && (
        <div>
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            ACHIEVEMENTS
          </h2>
          <div className="space-y-1">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-xs text-gray-700">
                <span className="font-medium">{achievement.title}</span>
                {achievement.description && (
                  <span> - {achievement.description}</span>
                )}
                {achievement.date && (
                  <span className="text-gray-500"> ({achievement.date})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {hasContent(hobbies) && (
        <div>
          <h2 className="text-sm font-light tracking-wide mb-3 text-gray-800">
            HOBBIES
          </h2>
          <div className="text-xs text-gray-600">
            {hobbies.map((hobby) => hobby.name).join(", ")}
          </div>
        </div>
      )}

      {/* Contact Links */}
      {hasContactLinks && (
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-center gap-4 text-xs text-gray-600">
            {personalInfo.website && (
              <span className="break-all">{personalInfo.website}</span>
            )}
            {personalInfo.linkedin && (
              <span className="break-all">{personalInfo.linkedin}</span>
            )}
            {personalInfo.github && (
              <span className="break-all">{personalInfo.github}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
