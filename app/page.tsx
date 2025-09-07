"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Palette, Zap, Users, Star } from "lucide-react"

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ResumeBuilder",
    "description": "Create stunning professional resumes with our free online resume builder. Choose from 18+ ATS-friendly templates, get live preview, and download as PDF instantly.",
    "url": "https://resumebuilder.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "ResumeBuilder Team"
    },
    "featureList": [
      "Multiple Professional Templates",
      "Live Preview",
      "PDF Download",
      "ATS-Friendly Design",
      "Mobile Responsive",
      "No Signup Required"
    ],
    "screenshot": "https://resumebuilder.com/og-image.jpg",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareRequirements": "Web browser",
    "memoryRequirements": "512 MB RAM",
    "storageRequirements": "10 MB available space"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
        role="banner"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-2xl font-serif font-bold text-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                ResumeBuilder
              </Link>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <Button asChild>
            <Link href="/builder" aria-label="Start building your resume">
              Start Building
            </Link>
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main>
        <section className="py-12 sm:py-16 lg:py-20 px-4" role="main" aria-labelledby="hero-heading">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="secondary" className="mb-4 sm:mb-6">
                ✨ Professional Resume Builder
              </Badge>
            </motion.div>
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance mb-4 sm:mb-6 leading-tight"
            >
              Create Your Perfect Resume in <span className="text-primary">Minutes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4"
            >
            Build stunning professional resumes with our intuitive builder. Choose from 18+ ATS-friendly templates, get live
            preview, and download as PDF instantly. No signup required - start building your resume right now!
            </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                <Link href="/builder" aria-label="Start building your professional resume">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  Start Building Resume
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent w-full sm:w-auto"
                aria-label="View available resume templates"
              >
                <Palette className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                View Templates
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 bg-card/30" aria-labelledby="features-heading">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 id="features-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4 px-4">
                Why Choose Our Resume Builder?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto px-4">
                Everything you need to create a professional resume that stands out from the crowd and passes ATS systems.
              </p>
            </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Palette,
                title: "Multiple Templates",
                description: "Choose from 18+ professionally designed templates ranging from modern to creative styles, including new black and white options.",
                delay: 0,
              },
              {
                icon: Zap,
                title: "Live Preview",
                description: "See your resume update in real-time as you type. Switch between templates instantly.",
                delay: 0.1,
              },
              {
                icon: Download,
                title: "PDF Download",
                description: "Export your resume as a high-quality PDF with perfect formatting for any application.",
                delay: 0.2,
              },
              {
                icon: FileText,
                title: "Easy Form Builder",
                description: "Intuitive forms for personal info, education, skills, projects, and work experience.",
                delay: 0.3,
              },
              {
                icon: Users,
                title: "Mobile Responsive",
                description: "Build your resume on any device. Fully responsive design that works everywhere.",
                delay: 0.4,
              },
              {
                icon: Star,
                title: "Professional Quality",
                description: "ATS-friendly templates designed by professionals to help you land your dream job.",
                delay: 0.5,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-border/50 hover:border-primary/20 transition-colors h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Templates Section */}
        <section id="templates" className="py-12 sm:py-16 lg:py-20 px-4 bg-card/30" aria-labelledby="templates-heading">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 id="templates-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4 px-4">
                Choose from 18+ Professional Templates
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto px-4">
                From modern to classic designs, find the perfect template that matches your style and industry.
              </p>
            </motion.div>

            <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-4 pb-4" style={{scrollbarWidth: 'thin'}}>
              {[
                { name: "Modern", description: "Clean design with gradient header", color: "bg-gradient-to-br from-blue-500 to-purple-600" },
                { name: "Minimalist", description: "Simple and elegant layout", color: "bg-gray-100" },
                { name: "Professional", description: "Corporate-style formatting", color: "bg-slate-800" },
                { name: "Creative", description: "Colorful with unique elements", color: "bg-gradient-to-br from-pink-500 to-orange-500" },
                { name: "Executive", description: "Bold black & white executive style", color: "bg-black" },
                { name: "Classic", description: "Traditional centered layout", color: "bg-blue-600" },
                { name: "Monochrome", description: "Tech-focused monospace design", color: "bg-gray-900" },
                { name: "Corporate", description: "Structured sidebar layout", color: "bg-indigo-600" },
                { name: "Elegant", description: "Serif fonts with clean lines", color: "bg-emerald-600" },
                { name: "Timeline", description: "Visual timeline with progress bars", color: "bg-teal-600" },
                { name: "Academic", description: "Formal centered design", color: "bg-purple-600" },
                { name: "Consultant", description: "Sophisticated layout with gradient accents", color: "bg-gradient-to-br from-violet-500 to-purple-600" },
                { name: "Modern Pro", description: "Colorful sections with timeline elements", color: "bg-gradient-to-br from-cyan-500 to-blue-600" },
                { name: "Basic", description: "Minimal formatting with inline text", color: "bg-gray-400" },
                { name: "Clean", description: "Light fonts with subtle borders", color: "bg-gray-200" },
                { name: "Executive Pro", description: "Premium executive design with dark header", color: "bg-gradient-to-br from-gray-800 to-black" },
                { name: "Simple", description: "Clean and straightforward layout", color: "bg-blue-400" },
                { name: "Minimalist BW", description: "Black and white minimalist design", color: "bg-gradient-to-br from-gray-600 to-gray-800" }
              ].map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64"
                >
                  <Card className="border-border/50 hover:border-primary/20 transition-all hover:shadow-lg h-full">
                    <CardHeader className="p-4">
                      <div className={`w-full h-24 sm:h-28 ${template.color} rounded-lg mb-3 flex items-center justify-center text-white text-xs font-medium shadow-sm`}>
                        {template.name}
                      </div>
                      <CardTitle className="text-sm font-semibold truncate">{template.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button size="lg" asChild className="text-base px-6 py-3">
                <Link href="/builder">
                  <Palette className="mr-2 h-4 w-4" />
                  Try All Templates
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4" aria-labelledby="cta-heading">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4 sm:mb-6 text-balance px-4">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 text-balance px-4">
              Join thousands of professionals who have created stunning resumes with our builder. Start building your career today!
            </p>
            <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
              <Link href="/builder" aria-label="Start building your professional resume now - it's completely free">
                <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                Start Building Now - It's Free
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4" role="contentinfo">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-lg font-serif font-semibold">ResumeBuilder</span>
          </div>
          <p className="text-muted-foreground">Built with Next.js, Tailwind CSS, and shadcn/ui</p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 ResumeBuilder. All rights reserved. | 
            <Link href="/privacy" className="hover:text-primary transition-colors ml-1">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-primary transition-colors ml-1">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
