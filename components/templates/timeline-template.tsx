import type { ResumeData } from "@/lib/types";

interface TimelineTemplateProps {
  data: ResumeData;
}

export function TimelineTemplate({ data }: TimelineTemplateProps) {
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
      className="bg-white text-black mx-auto font-sans text-xs leading-tight"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "30px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs mb-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
        {personalInfo.summary && (
          <p className="text-xs leading-relaxed border-l-2 border-black pl-4">
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Left Column - Timeline */}
        <div className="w-2/3">
          {/* Experience Timeline */}
          {hasContent(workExperience) && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2">
                Professional Experience
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-black"></div>

                {workExperience.map((work, index) => (
                  <div key={work.id} className="relative mb-6 pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 w-3 h-3 bg-black border-2 border-white rounded-full"></div>

                    <div className="bg-gray-50 p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-bold">{work.position}</h3>
                          <div className="text-xs font-semibold">
                            {work.company}
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <div className="font-semibold">
                            {work.startDate} -{" "}
                            {work.current ? "Present" : work.endDate}
                          </div>
                          <div>{work.location}</div>
                        </div>
                      </div>
                      {work.description && work.description.length > 0 && (
                        <ul className="space-y-1 text-xs">
                          {work.description.map((desc, descIndex) => (
                            <li key={descIndex} className="flex items-start">
                              <span className="mr-2 mt-1">▸</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Timeline */}
          {hasContent(education) && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2">
                Education
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-black"></div>

                {education.map((edu) => (
                  <div key={edu.id} className="relative mb-6 pl-12">
                    <div className="absolute left-2.5 w-3 h-3 bg-white border-2 border-black rounded-full"></div>

                    <div className="bg-gray-50 p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-sm font-bold">{edu.degree}</h3>
                          <div className="text-xs">{edu.field}</div>
                          <div className="text-xs font-semibold">
                            {edu.institution}
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <div className="font-semibold">
                            {edu.startDate} - {edu.endDate}
                          </div>
                          {edu.gpa && <div>GPA: {edu.gpa}</div>}
                        </div>
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
              <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2">
                Key Projects
              </h2>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="mb-4 p-4 border border-gray-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold">{project.name}</h3>
                    <div className="text-xs">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs mb-2">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 border border-black text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 space-y-6">
          {/* Skills */}
          {hasContent(skills) && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4 border-b border-black pb-2">
                Skills
              </h3>
              {Object.entries(
                skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>)
              ).map(([category, categorySkills]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-xs font-bold mb-2 uppercase">
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{skill.name}</span>
                          <span className="text-gray-600">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1">
                          <div
                            className="bg-black h-1"
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
          )}

          {/* Certificates */}
          {hasContent(certificates) && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4 border-b border-black pb-2">
                Certifications
              </h3>
              {certificates.map((cert) => (
                <div key={cert.id} className="mb-3 p-3 border border-gray-300">
                  <div className="text-xs font-bold">{cert.name}</div>
                  <div className="text-xs">{cert.issuer}</div>
                  <div className="text-xs text-gray-600">{cert.issueDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Hobbies */}
          {hasContent(hobbies) && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4 border-b border-black pb-2">
                Interests
              </h3>
              <div className="space-y-1">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.id}
                    className="text-xs p-2 border border-gray-300"
                  >
                    {hobby.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
