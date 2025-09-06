import type { ResumeData } from "@/lib/types";

interface BasicTemplateProps {
  data: ResumeData;
}

export function BasicTemplate({ data }: BasicTemplateProps) {
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
      className="bg-white text-black mx-auto font-sans text-xs leading-normal w-full max-w-[794px]"
      style={{
        minHeight: "1123px",
        padding: "40px",
        boxSizing: "border-box",
      }}
      data-resume-template
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm mb-4">
          {personalInfo.email && <span>{personalInfo.email} | </span>}
          {personalInfo.phone && <span>{personalInfo.phone} | </span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.github) && (
          <div className="text-sm mb-4">
            {personalInfo.linkedin && <span>{personalInfo.linkedin} | </span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        )}
        {personalInfo.summary && (
          <div className="border-t border-b border-gray-400 py-3 my-4">
            <p className="text-sm">{personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 uppercase">
            Work Experience
          </h2>
          {workExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <h3 className="font-bold text-sm">{work.position}</h3>
              <div className="text-sm mb-1">
                {work.company} | {work.location} | {work.startDate} -{" "}
                {work.current ? "Present" : work.endDate}
              </div>
              {work.description && work.description.length > 0 && (
                <ul className="text-sm ml-4">
                  {work.description.map((desc, index) => (
                    <li key={index} className="mb-1">
                      • {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {hasContent(education) && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 uppercase">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="font-bold text-sm">
                {edu.degree} in {edu.field}
              </h3>
              <div className="text-sm">
                {edu.institution} | {edu.startDate} - {edu.endDate}
              </div>
              {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 uppercase">Skills</h2>
          <div className="text-sm">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {} as Record<string, string[]>)
            ).map(([category, skillNames], index) => (
              <span key={category}>
                <strong>{category}:</strong> {skillNames.join(", ")}
                {index <
                  Object.keys(
                    skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).length -
                    1 && " | "}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 uppercase">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-sm">
                {project.name} | {project.startDate} - {project.endDate}
              </h3>
              {project.description && (
                <p className="text-sm mb-1">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-sm">
                  <strong>Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certificates */}
      {hasContent(certificates) && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 uppercase">Certifications</h2>
          {certificates.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="text-sm">
                <strong>{cert.name}</strong> | {cert.issuer} | {cert.issueDate}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {hasContent(hobbies) && (
        <div>
          <h2 className="text-base font-bold mb-3 uppercase">Interests</h2>
          <div className="text-sm">{hobbies.map((h) => h.name).join(", ")}</div>
        </div>
      )}
    </div>
  );
}
