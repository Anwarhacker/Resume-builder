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
import { SimpleTemplate } from "@/components/templates/simple-template";
import { CleanTemplate } from "@/components/templates/clean-template";
import { BasicTemplate } from "@/components/templates/basic-template";
import { MonochromeProfessionalTemplate } from "@/components/templates/monochrome-professional-template";
import { MinimalistBWTemplate } from "@/components/templates/minimalist-bw-template";
import { ExecutiveBWTemplate } from "@/components/templates/executive-bw-template";
import { AnimatedTemplatePreview } from "@/components/animated-template-preview";
import { AnimatedFormSection } from "@/components/animated-form-section";
import { PrintResumeButton } from "@/components/print-resume-button";
import { ArrowLeft, Eye, Palette, Sparkles, FileText, RotateCcw } from "lucide-react";
import Link from "next/link";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/types";
import { exampleResumeData } from "@/lib/example-data";

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
  | "consultant"
  | "simple"
  | "clean"
  | "basic"
  | "monochromepro"
  | "minimalistbw"
  | "executivebw";

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
  simple: {
    name: "Simple",
    component: SimpleTemplate,
    description: "Clean and straightforward layout",
  },
  clean: {
    name: "Clean",
    component: CleanTemplate,
    description: "Light fonts with subtle borders",
  },
  basic: {
    name: "Basic",
    component: BasicTemplate,
    description: "Minimal formatting with inline text",
  },
  monochromepro: {
    name: "Monochrome Professional",
    component: MonochromeProfessionalTemplate,
    description: "Clean black and white professional layout",
  },
  minimalistbw: {
    name: "Minimalist B&W",
    component: MinimalistBWTemplate,
    description: "Typography-focused black and white design",
  },
  executivebw: {
    name: "Executive B&W",
    component: ExecutiveBWTemplate,
    description: "Sophisticated executive black and white layout",
  },
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadExampleData = useCallback(() => {
    setResumeData(exampleResumeData);
  }, []);

  const resetForm = useCallback(() => {
    setResumeData(defaultResumeData);
  }, []);

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
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            {/* Logo and Back button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" asChild className="px-1 sm:px-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden md:inline ml-1">Back</span>
                </Link>
              </Button>
              <div className="flex items-center gap-1 sm:gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h1 className="text-sm sm:text-base lg:text-lg font-serif font-bold">
                  Resume Builder
                </h1>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={loadExampleData}
                  className="px-2 text-xs sm:text-sm"
                  disabled={isLoading}
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline ml-1">Example</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetForm}
                  className="px-2 text-xs sm:text-sm"
                  disabled={isLoading}
                >
                  <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline ml-1">Reset</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`px-2 text-xs sm:text-sm ${
                    isPreviewMode ? "bg-primary text-primary-foreground" : ""
                  }`}
                  disabled={isLoading}
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline ml-1">
                    {isPreviewMode ? "Edit" : "Preview"}
                  </span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <PrintResumeButton
                  resumeData={resumeData}
                  templateName={templates[selectedTemplate].name}
                  size="sm"
                  disabled={isLoading}
                  className="px-2 text-xs sm:text-sm"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Template Selector */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Palette className="h-4 w-4 text-primary" />
            <h3 className="text-sm sm:text-base font-semibold">Templates</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-1 sm:gap-2">
            {Object.entries(templates).map(([key, template]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsLoading(true);
                  setSelectedTemplate(key as TemplateType);
                  setTimeout(() => setIsLoading(false), 100);
                }}
                className={`p-1.5 sm:p-2 rounded border-2 transition-all text-left min-h-[50px] sm:min-h-[60px] ${
                  selectedTemplate === key
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
                disabled={isLoading}
              >
                <div className="text-xs font-medium mb-0.5 leading-tight truncate">
                  {template.name}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                  {template.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 lg:py-6">
        <AnimatePresence mode="wait">
          {isPreviewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-full mx-auto px-2 sm:px-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-2">
                  Resume Preview
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
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
              className="grid lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6"
            >
              {/* Form Section */}
              <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                <AnimatedFormSection>
                  <div className="text-center lg:text-left">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-2">
                      Build Your Resume
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                      Fill in your information and see live preview.
                    </p>
                  </div>
                </AnimatedFormSection>

                <AnimatedFormSection delay={0.1}>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 h-auto gap-0.5 sm:gap-1 p-0.5 sm:p-1">
                      <TabsTrigger value="personal" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Personal
                      </TabsTrigger>
                      <TabsTrigger value="experience" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Experience
                      </TabsTrigger>
                      <TabsTrigger value="education" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Education
                      </TabsTrigger>
                      <TabsTrigger value="projects" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Projects
                      </TabsTrigger>
                      <TabsTrigger value="skills" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Skills
                      </TabsTrigger>
                      <TabsTrigger value="certificates" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
                        Certificates
                      </TabsTrigger>
                      <TabsTrigger value="hobbies" className="text-xs px-1 py-1.5 sm:px-2 sm:py-2 whitespace-nowrap">
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
                <div className="lg:sticky lg:top-20 lg:h-fit">
                  <Card className="p-2 sm:p-4 lg:p-6">
                    <div className="text-center mb-2 sm:mb-4 lg:mb-6">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary" />
                        <h3 className="text-sm sm:text-base lg:text-lg font-serif font-semibold">
                          Live Preview
                        </h3>
                      </div>
                      <motion.p
                        key={selectedTemplate}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-muted-foreground"
                      >
                        Template: {templates[selectedTemplate].name}
                      </motion.p>
                    </div>

                    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                      <div className="transform scale-[0.25] sm:scale-[0.35] md:scale-[0.4] lg:scale-[0.45] xl:scale-50 origin-top-left w-[400%] sm:w-[285%] md:w-[250%] lg:w-[222%] xl:w-[200%] h-[400%] sm:h-[285%] md:h-[250%] lg:h-[222%] xl:h-[200%] overflow-hidden">
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
