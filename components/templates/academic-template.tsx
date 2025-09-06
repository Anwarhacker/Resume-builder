import type { ResumeData } from "@/lib/types";

interface AcademicTemplateProps {
  data: ResumeData;
}

export function AcademicTemplate({ data }: AcademicTemplateProps) {
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
      className="bg-white text-black mx-auto font-serif text-xs leading-normal w-full max-w-[794px]"
      style={{
        minHeight: "1123px",
        padding: "50px 40px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-normal tracking-wide mb-3">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-xs space-y-1">
          <div>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && personalInfo.email && (
              <span className="mx-2">|</span>
            )}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div>
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo.linkedin ||
            personalInfo.github ||
            personalInfo.website) && (
            <div>
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.github && personalInfo.linkedin && (
                <span className="mx-2">|</span>
              )}
              {personalInfo.github && <span>{personalInfo.github}</span>}
              {personalInfo.website &&
                (personalInfo.linkedin || personalInfo.github) && (
                  <span className="mx-2">|</span>
                )}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          )}
        </div>
        <div className="w-24 h-px bg-black mx-auto mt-4"></div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-center text-xs leading-relaxed italic">
            {personalInfo.summary}
          </p>
          <div className="w-16 h-px bg-black mx-auto mt-4"></div>
        </div>
      )}

      {/* Education */}
      {hasContent(education) && (
        <div className="mb-6">
          <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <div className="text-sm font-semibold">
                {edu.degree} in {edu.field}
              </div>
              <div className="text-xs italic">{edu.institution}</div>
              <div className="text-xs">
                {edu.startDate} - {edu.endDate}
              </div>
              {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
              {edu.description && (
                <div className="text-xs mt-1 italic">{edu.description}</div>
              )}
            </div>
          ))}
          <div className="w-16 h-px bg-black mx-auto mt-4"></div>
        </div>
      )}

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-6">
          <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
            Experience
          </h2>
          {workExperience.map((work) => (
            <div key={work.id} className="mb-5">
              <div className="text-center mb-2">
                <div className="text-sm font-semibold">{work.position}</div>
                <div className="text-xs italic">
                  {work.company}, {work.location}
                </div>
                <div className="text-xs">
                  {work.startDate} - {work.current ? "Present" : work.endDate}
                </div>
              </div>
              {work.description && work.description.length > 0 && (
                <div className="text-xs text-justify space-y-1">
                  {work.description.map((desc, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-center"
                    >
                      <div className="max-w-lg">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="w-16 h-px bg-black mx-auto mt-4"></div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-6">
          <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
            Research & Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="text-center mb-2">
                <div className="text-sm font-semibold">{project.name}</div>
                <div className="text-xs">
                  {project.startDate} - {project.endDate}
                </div>
              </div>
              {project.description && (
                <div className="text-xs text-center max-w-2xl mx-auto mb-2">
                  {project.description}
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-xs text-center italic">
                  {project.technologies.join(" • ")}
                </div>
              )}
            </div>
          ))}
          <div className="w-16 h-px bg-black mx-auto mt-4"></div>
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-6">
          <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
            Technical Skills
          </h2>
          <div className="max-w-lg mx-auto">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category} className="mb-3 text-center">
                <div className="text-xs font-semibold mb-1">{category}:</div>
                <div className="text-xs">
                  {categorySkills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < categorySkills.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-16 h-px bg-black mx-auto mt-4"></div>
        </div>
      )}

      {/* Certificates and Hobbies */}
      <div className="grid grid-cols-2 gap-8">
        {hasContent(certificates) && (
          <div>
            <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
              Certifications
            </h2>
            {certificates.map((cert) => (
              <div key={cert.id} className="mb-3 text-center text-xs">
                <div className="font-semibold">{cert.name}</div>
                <div className="italic">{cert.issuer}</div>
                <div>{cert.issueDate}</div>
              </div>
            ))}
          </div>
        )}

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-center text-sm font-normal uppercase tracking-widest mb-4">
              Interests
            </h2>
            <div className="text-xs text-center">
              {hobbies.map((hobby, index) => (
                <span key={hobby.id}>
                  {hobby.name}
                  {index < hobbies.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
