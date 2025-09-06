import type { ResumeData } from "@/lib/types";

interface CorporateTemplateProps {
  data: ResumeData;
}

export function CorporateTemplate({ data }: CorporateTemplateProps) {
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
      className="bg-white text-black mx-auto font-sans text-xs leading-tight w-full max-w-[794px]"
      style={{
        minHeight: "1123px",
        padding: "30px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header with left sidebar layout */}
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-1/3 border-r-2 border-black pr-6">
          {/* Contact Info */}
          <div className="mb-6">
            <h1 className="text-lg font-bold mb-4 border-b border-black pb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="space-y-1 text-xs">
              {personalInfo.email && (
                <div>
                  <span className="font-bold">EMAIL</span>
                  <br />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div>
                  <span className="font-bold">PHONE</span>
                  <br />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div>
                  <span className="font-bold">LOCATION</span>
                  <br />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.linkedin && (
                <div>
                  <span className="font-bold">LINKEDIN</span>
                  <br />
                  {personalInfo.linkedin}
                </div>
              )}
              {personalInfo.github && (
                <div>
                  <span className="font-bold">GITHUB</span>
                  <br />
                  {personalInfo.github}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {hasContent(skills) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 border-b border-black pb-1">
                SKILLS
              </h3>
              {Object.entries(
                skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>)
              ).map(([category, categorySkills]) => (
                <div key={category} className="mb-3">
                  <h4 className="text-xs font-bold mb-1 uppercase">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex justify-between text-xs"
                      >
                        <span>{skill.name}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 border border-black ${
                                level <=
                                [
                                  "Beginner",
                                  "Intermediate",
                                  "Advanced",
                                  "Expert",
                                ].indexOf(skill.level) +
                                  1
                                  ? "bg-black"
                                  : "bg-white"
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
          )}

          {/* Education */}
          {hasContent(education) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 border-b border-black pb-1">
                EDUCATION
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 text-xs">
                  <div className="font-bold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certificates */}
          {hasContent(certificates) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 border-b border-black pb-1">
                CERTIFICATIONS
              </h3>
              {certificates.map((cert) => (
                <div key={cert.id} className="mb-2 text-xs">
                  <div className="font-bold">{cert.name}</div>
                  <div>{cert.issuer}</div>
                  <div className="text-gray-600">{cert.issueDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 border-b border-black pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-justify leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {hasContent(workExperience) && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 border-b border-black pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              {workExperience.map((work) => (
                <div key={work.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-bold uppercase">
                        {work.position}
                      </h3>
                      <div className="text-xs font-semibold">
                        {work.company}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div>
                        {work.startDate} -{" "}
                        {work.current ? "PRESENT" : work.endDate}
                      </div>
                      <div>{work.location}</div>
                    </div>
                  </div>
                  {work.description && work.description.length > 0 && (
                    <ul className="space-y-1 text-xs mt-2">
                      {work.description.map((desc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 font-bold">▪</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {hasContent(projects) && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 border-b border-black pb-1">
                KEY PROJECTS
              </h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold uppercase">
                      {project.name}
                    </h3>
                    <div className="text-xs">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs mb-2">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-xs">
                      <span className="font-bold">Technologies: </span>
                      {project.technologies.join(" | ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          {hasContent(hobbies) && (
            <div>
              <h2 className="text-sm font-bold mb-3 border-b border-black pb-1">
                INTERESTS
              </h2>
              <div className="text-xs">
                {hobbies.map((hobby, index) => (
                  <span key={hobby.id}>
                    {hobby.name}
                    {index < hobbies.length - 1 ? " | " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
