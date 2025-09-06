import type { ResumeData } from "@/lib/types";

interface CleanTemplateProps {
  data: ResumeData;
}

export function CleanTemplate({ data }: CleanTemplateProps) {
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
      className="bg-white text-black mx-auto font-sans text-xs leading-normal"
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
        <h1 className="text-3xl font-light mb-3">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
        {personalInfo.summary && (
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-8">
          <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
            Experience
          </h2>
          {workExperience.map((work) => (
            <div key={work.id} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium">{work.position}</h3>
                <span className="text-sm text-gray-600">
                  {work.startDate} - {work.current ? "Present" : work.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {work.company}, {work.location}
              </div>
              {work.description && work.description.length > 0 && (
                <ul className="text-sm space-y-1 text-gray-800">
                  {work.description.map((desc, index) => (
                    <li key={index} className="ml-4">
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
        <div className="mb-8">
          <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium">{edu.degree}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                {edu.field} | {edu.institution}
              </div>
              {edu.gpa && (
                <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-8">
          <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {} as Record<string, string[]>)
            ).map(([category, skillNames]) => (
              <div key={category}>
                <h4 className="font-medium text-sm mb-1">{category}</h4>
                <div className="text-sm text-gray-700">
                  {skillNames.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-8">
          <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium">{project.name}</h3>
                <span className="text-sm text-gray-600">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              {project.description && (
                <p className="text-sm text-gray-800 mb-2">
                  {project.description}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Technologies:</span>{" "}
                  {project.technologies.join(" • ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {hasContent(certificates) && (
          <div>
            <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
              Certifications
            </h2>
            {certificates.map((cert) => (
              <div key={cert.id} className="mb-3">
                <div className="font-medium text-sm">{cert.name}</div>
                <div className="text-sm text-gray-700">{cert.issuer}</div>
                <div className="text-sm text-gray-600">{cert.issueDate}</div>
              </div>
            ))}
          </div>
        )}

        {hasContent(hobbies) && (
          <div>
            <h2 className="text-xl font-light mb-4 pb-1 border-b border-gray-300">
              Interests
            </h2>
            <div className="text-sm text-gray-700">
              {hobbies.map((h) => h.name).join(" • ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
