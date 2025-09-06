import type { ResumeData } from "@/lib/types";

interface MonochromeTemplateProps {
  data: ResumeData;
}

export function MonochromeTemplate({ data }: MonochromeTemplateProps) {
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
      className="bg-white text-black mx-auto font-mono text-xs leading-tight"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px", // A4 height at 96 DPI
        padding: "10px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="border-4 border-black p-4 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 tracking-widest">
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          <div className="text-xs space-y-1">
            <div className="flex justify-center gap-4">
              {personalInfo.email && <span>EMAIL: {personalInfo.email}</span>}
              {personalInfo.phone && <span>PHONE: {personalInfo.phone}</span>}
            </div>
            {personalInfo.location && (
              <div>LOCATION: {personalInfo.location}</div>
            )}
            {personalInfo.linkedin && (
              <div>LINKEDIN: {personalInfo.linkedin}</div>
            )}
          </div>
        </div>
        {personalInfo.summary && (
          <div className="mt-4 pt-4 border-t-2 border-black">
            <div className="text-center font-bold mb-2">OBJECTIVE</div>
            <p className="text-xs text-center">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Work Experience */}
        {hasContent(workExperience) && (
          <div>
            <div className="bg-black text-white p-2 mb-4">
              <h2 className="text-sm font-bold tracking-widest">
                WORK EXPERIENCE
              </h2>
            </div>
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id} className="border-l-4 border-black pl-4">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <h3 className="text-sm font-bold">{work.position}</h3>
                      <div className="text-xs">
                        {work.company} | {work.location}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      {work.startDate} -{" "}
                      {work.current ? "PRESENT" : work.endDate}
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <div className="space-y-1 text-xs">
                      {work.description.map((desc, index) => (
                        <div key={index}>→ {desc}</div>
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
            <div className="bg-black text-white p-2 mb-4">
              <h2 className="text-sm font-bold tracking-widest">EDUCATION</h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-xs">
                      {edu.degree} {edu.field && `- ${edu.field}`}
                    </h3>
                    <div className="text-xs">{edu.institution}</div>
                    {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-right text-xs">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <div>
            <div className="bg-black text-white p-2 mb-4">
              <h2 className="text-sm font-bold tracking-widest">
                TECHNICAL SKILLS
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(
                skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>)
              ).map(([category, categorySkills]) => (
                <div key={category} className="flex text-xs">
                  <div className="w-24 font-bold">
                    {category.toUpperCase()}:
                  </div>
                  <div>
                    {categorySkills.map((skill) => skill.name).join(" | ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <div>
            <div className="bg-black text-white p-2 mb-4">
              <h2 className="text-sm font-bold tracking-widest">PROJECTS</h2>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="grid grid-cols-2 gap-4 mb-1">
                    <h3 className="font-bold text-xs">{project.name}</h3>
                    <div className="text-right text-xs">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs mb-1">→ {project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-xs">
                      <span className="font-bold">TECH:</span>{" "}
                      {project.technologies.join(" | ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom sections */}
        <div className="grid grid-cols-2 gap-6">
          {hasContent(certificates) && (
            <div>
              <div className="bg-black text-white p-2 mb-3">
                <h2 className="text-xs font-bold tracking-widest">
                  CERTIFICATIONS
                </h2>
              </div>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-bold">{cert.name}</div>
                    <div>
                      {cert.issuer} | {cert.issueDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasContent(achievements) && (
            <div>
              <div className="bg-black text-white p-2 mb-3">
                <h2 className="text-xs font-bold tracking-widest">
                  ACHIEVEMENTS
                </h2>
              </div>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="text-xs">
                    <div className="font-bold">{achievement.title}</div>
                    {achievement.description && (
                      <div>→ {achievement.description}</div>
                    )}
                    {achievement.date && <div>({achievement.date})</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasContent(hobbies) && (
          <div>
            <div className="bg-black text-white p-2 mb-3">
              <h2 className="text-xs font-bold tracking-widest">INTERESTS</h2>
            </div>
            <div className="text-xs">
              {hobbies.map((hobby) => hobby.name).join(" | ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
