import type { ResumeData } from "@/lib/types";

interface ExecutiveBWTemplateProps {
  data: ResumeData;
}

export function ExecutiveBWTemplate({ data }: ExecutiveBWTemplateProps) {
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
        padding: "25px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="border-b-4 border-black pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 tracking-wide">
              {personalInfo.fullName || "YOUR NAME"}
            </h1>
            <div className="text-sm space-y-1">
              {personalInfo.email && <div>E: {personalInfo.email}</div>}
              {personalInfo.phone && <div>T: {personalInfo.phone}</div>}
              {personalInfo.location && <div>L: {personalInfo.location}</div>}
            </div>
          </div>
          <div className="text-right text-sm space-y-1">
            {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
            {personalInfo.website && <div>Web: {personalInfo.website}</div>}
            {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
          </div>
        </div>
        {personalInfo.summary && (
          <div className="mt-4 pt-4 border-t-2 border-gray-300">
            <h2 className="text-sm font-bold mb-2 tracking-widest">EXECUTIVE SUMMARY</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="col-span-3 space-y-8">
          {/* Work Experience */}
          {hasContent(workExperience) && (
            <div>
              <h2 className="text-base font-bold mb-4 tracking-widest border-b-2 border-black pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-bold">{work.position}</h3>
                        <div className="text-xs text-gray-600 font-semibold">
                          {work.company} | {work.location}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {work.startDate} - {work.current ? "Present" : work.endDate}
                      </div>
                    </div>
                    {work.description && work.description.length > 0 && (
                      <div className="space-y-1 text-xs">
                        {work.description.map((desc, index) => (
                          <div key={index} className="flex items-start">
                            <span className="mr-2 mt-1 font-bold">■</span>
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
              <h2 className="text-base font-bold mb-4 tracking-widest border-b-2 border-black pb-1">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <div className="text-xs text-gray-600 font-semibold">{edu.institution}</div>
                        {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
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
              <h2 className="text-base font-bold mb-4 tracking-widest border-b-2 border-black pb-1">
                KEY PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold">{project.name}</h3>
                      <div className="text-xs text-gray-500 font-medium">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="text-xs">
                        <span className="font-bold">Technologies:</span>{" "}
                        {project.technologies.join(" | ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {hasContent(achievements) && (
            <div>
              <h2 className="text-base font-bold mb-4 tracking-widest border-b-2 border-black pb-1">
                ACHIEVEMENTS & RECOGNITION
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
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Skills */}
          {hasContent(skills) && (
            <div>
              <h2 className="text-sm font-bold mb-3 tracking-widest border-b border-black pb-1">
                CORE COMPETENCIES
              </h2>
              <div className="space-y-3">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h4 className="text-xs font-bold mb-1">{category.toUpperCase()}</h4>
                    <div className="space-y-1">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="text-xs">
                          <div className="font-medium">{skill.name}</div>
                          {skill.level && (
                            <div className="text-gray-500 text-xs">({skill.level})</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {hasContent(certificates) && (
            <div>
              <h2 className="text-sm font-bold mb-3 tracking-widest border-b border-black pb-1">
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

          {/* Hobbies */}
          {hasContent(hobbies) && (
            <div>
              <h2 className="text-sm font-bold mb-3 tracking-widest border-b border-black pb-1">
                PERSONAL INTERESTS
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
