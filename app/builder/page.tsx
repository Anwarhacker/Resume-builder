"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { EducationForm } from "@/components/forms/education-form";
import { WorkExperienceForm } from "@/components/forms/work-experience-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { CertificatesForm } from "@/components/forms/certificates-form";
import { HobbiesForm } from "@/components/forms/hobbies-form";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalistTemplate } from "@/components/templates/minimalist-template";
import { ProfessionalTemplate } from "@/components/templates/professional-template";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { ExecutiveTemplate } from "@/components/templates/executive-template";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { MonochromeTemplate } from "@/components/templates/monochrome-template";
import { ElegantTemplate } from "@/components/templates/elegant-template";
import { CorporateTemplate } from "@/components/templates/corporate-template";
import { AcademicTemplate } from "@/components/templates/academic-template";
import { TimelineTemplate } from "@/components/templates/timeline-template";
import { ExecutiveProTemplate } from "@/components/templates/executive-pro-template";
import { ModernProTemplate } from "@/components/templates/modern-pro-template";
import { ConsultantTemplate } from "@/components/templates/consultant-template";
import { AnimatedTemplatePreview } from "@/components/animated-template-preview";
import { AnimatedFormSection } from "@/components/animated-form-section";
import { PrintResumeButton } from "@/components/print-resume-button";
import { ArrowLeft, Eye, Palette, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/types";

type TemplateType =
  | "modern"
  | "minimalist"
  | "professional"
  | "creative"
  | "executive"
  | "classic"
  | "monochrome"
  | "elegant"
  | "corporate"
  | "academic"
  | "timeline"
  | "executivepro"
  | "modernpro"
  | "consultant";

const templates = {
  modern: {
    name: "Modern",
    component: ModernTemplate,
    description: "Clean design with gradient header",
  },
  minimalist: {
    name: "Minimalist",
    component: MinimalistTemplate,
    description: "Simple and elegant layout",
  },
  professional: {
    name: "Professional",
    component: ProfessionalTemplate,
    description: "Corporate-style formatting",
  },
  creative: {
    name: "Creative",
    component: CreativeTemplate,
    description: "Colorful with unique elements",
  },
  executive: {
    name: "Executive",
    component: ExecutiveTemplate,
    description: "Bold black & white executive style",
  },
  classic: {
    name: "Classic",
    component: ClassicTemplate,
    description: "Traditional centered layout",
  },
  monochrome: {
    name: "Monochrome",
    component: MonochromeTemplate,
    description: "Tech-focused monospace design",
  },
  elegant: {
    name: "Elegant",
    component: ElegantTemplate,
    description: "Serif fonts with clean lines",
  },
  corporate: {
    name: "Corporate",
    component: CorporateTemplate,
    description: "Structured sidebar layout",
  },
  academic: {
    name: "Academic",
    component: AcademicTemplate,
    description: "Formal centered design",
  },
  timeline: {
    name: "Timeline",
    component: TimelineTemplate,
    description: "Visual timeline with progress bars",
  },
  executivepro: {
    name: "Executive Pro",
    component: ExecutiveProTemplate,
    description: "Premium executive design with dark header",
  },
  modernpro: {
    name: "Modern Pro",
    component: ModernProTemplate,
    description: "Colorful sections with timeline elements",
  },
  consultant: {
    name: "Consultant",
    component: ConsultantTemplate,
    description: "Sophisticated layout with gradient accents",
  },
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatePersonalInfo = useCallback(
    (personalInfo: ResumeData["personalInfo"]) => {
      setResumeData((prev) => ({ ...prev, personalInfo }));
    },
    []
  );

  const updateEducation = useCallback((education: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education }));
  }, []);

  const updateWorkExperience = useCallback(
    (workExperience: ResumeData["workExperience"]) => {
      setResumeData((prev) => ({ ...prev, workExperience }));
    },
    []
  );

  const updateProjects = useCallback((projects: ResumeData["projects"]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  }, []);

  const updateSkills = useCallback((skills: ResumeData["skills"]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  }, []);

  const updateCertificates = useCallback(
    (certificates: ResumeData["certificates"]) => {
      setResumeData((prev) => ({ ...prev, certificates }));
    },
    []
  );

  const updateHobbies = useCallback((hobbies: ResumeData["hobbies"]) => {
    setResumeData((prev) => ({ ...prev, hobbies }));
  }, []);

  const SelectedTemplateComponent = useMemo(
    () => templates[selectedTemplate].component,
    [selectedTemplate]
  );

  const renderTemplate = useCallback(() => {
    try {
      return <SelectedTemplateComponent data={resumeData} />;
    } catch (error) {
      console.error("[v0] Template rendering error:", error);
      return (
        <div className="p-8 text-center text-red-500">
          <p>Error rendering template. Please try a different template.</p>
        </div>
      );
    }
  }, [SelectedTemplateComponent, resumeData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h1 className="text-lg sm:text-xl font-serif font-bold">
                  Resume Builder
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Select
                  value={selectedTemplate}
                  onValueChange={(value: TemplateType) => {
                    setIsLoading(true);
                    setSelectedTemplate(value);
                    setTimeout(() => setIsLoading(false), 100);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-40 px-0">
                    <Palette className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templates).map(([key, template]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {template.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={
                    isPreviewMode ? "bg-primary text-primary-foreground" : ""
                  }
                  disabled={isLoading}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {isPreviewMode ? "Edit Mode" : "Preview"}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PrintResumeButton
                  resumeData={resumeData}
                  templateName={templates[selectedTemplate].name}
                  size="sm"
                  disabled={isLoading}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {isPreviewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                  Resume Preview
                </h2>
                <p className="text-muted-foreground">
                  Template: {templates[selectedTemplate].name}
                </p>
              </div>
              <div className="bg-white border border-border rounded-lg overflow-hidden shadow-lg">
                <div data-resume-template>
                  <AnimatedTemplatePreview templateKey={selectedTemplate}>
                    {renderTemplate()}
                  </AnimatedTemplatePreview>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="builder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-4 sm:gap-8"
            >
              {/* Form Section */}
              <div className="space-y-4 sm:space-y-6">
                <AnimatedFormSection>
                  <div className="text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                      Build Your Resume
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Fill in your information below and see your resume update
                      in real-time.
                    </p>
                  </div>
                </AnimatedFormSection>

                <AnimatedFormSection delay={0.1}>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 h-auto gap-1 p-1">
                      <TabsTrigger
                        value="personal"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Personal
                      </TabsTrigger>
                      <TabsTrigger
                        value="experience"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Experience
                      </TabsTrigger>
                      <TabsTrigger
                        value="education"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Education
                      </TabsTrigger>
                      <TabsTrigger
                        value="projects"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Projects
                      </TabsTrigger>
                      <TabsTrigger
                        value="skills"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Skills
                      </TabsTrigger>
                      <TabsTrigger
                        value="certificates"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Certificates
                      </TabsTrigger>
                      <TabsTrigger
                        value="hobbies"
                        className="text-xs sm:text-sm px-1 sm:px-2 py-2 whitespace-nowrap"
                      >
                        Hobbies
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 mt-4">
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        onChange={updatePersonalInfo}
                      />
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-4 mt-4">
                      <WorkExperienceForm
                        data={resumeData.workExperience}
                        onChange={updateWorkExperience}
                      />
                    </TabsContent>

                    <TabsContent value="education" className="space-y-4 mt-4">
                      <EducationForm
                        data={resumeData.education}
                        onChange={updateEducation}
                      />
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4 mt-4">
                      <ProjectsForm
                        projects={resumeData.projects}
                        onChange={updateProjects}
                      />
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4 mt-4">
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={updateSkills}
                      />
                    </TabsContent>

                    <TabsContent
                      value="certificates"
                      className="space-y-4 mt-4"
                    >
                      <CertificatesForm
                        data={resumeData.certificates}
                        onChange={updateCertificates}
                      />
                    </TabsContent>

                    <TabsContent value="hobbies" className="space-y-4 mt-4">
                      <HobbiesForm
                        hobbies={resumeData.hobbies}
                        onChange={updateHobbies}
                      />
                    </TabsContent>
                  </Tabs>
                </AnimatedFormSection>
              </div>

              {/* Preview Section */}
              <AnimatedFormSection delay={0.2}>
                <div className="lg:sticky lg:top-24 lg:h-fit">
                  <Card className="p-3 sm:p-6">
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <h3 className="text-base sm:text-lg font-serif font-semibold">
                          Live Preview
                        </h3>
                      </div>
                      <motion.p
                        key={selectedTemplate}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs sm:text-sm text-muted-foreground"
                      >
                        Template: {templates[selectedTemplate].name}
                      </motion.p>
                    </div>

                    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                      <div className="transform scale-[0.3] sm:scale-[0.4] lg:scale-50 origin-top-left w-[333%] sm:w-[250%] lg:w-[200%] h-[333%] sm:h-[250%] lg:h-[200%] overflow-hidden">
                        <div data-resume-template>
                          <AnimatedTemplatePreview
                            templateKey={selectedTemplate}
                          >
                            {renderTemplate()}
                          </AnimatedTemplatePreview>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedFormSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
