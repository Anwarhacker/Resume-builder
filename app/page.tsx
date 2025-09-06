"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Palette, Zap, Users, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">ResumeBuilder</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
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
            <Link href="/builder">Start Building</Link>
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-4 sm:mb-6">
              ✨ Professional Resume Builder
            </Badge>
          </motion.div>
          <motion.h1
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
            Build stunning professional resumes with our intuitive builder. Choose from multiple templates, get live
            preview, and download as PDF instantly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                <Link href="/builder">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Building Resume
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent w-full sm:w-auto"
              >
                <Palette className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                View Templates
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4 px-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto px-4">
              Everything you need to create a professional resume that stands out from the crowd.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Palette,
                title: "Multiple Templates",
                description: "Choose from 4+ professionally designed templates ranging from modern to creative styles.",
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
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4 sm:mb-6 text-balance px-4">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 text-balance px-4">
            Join thousands of professionals who have created stunning resumes with our builder.
          </p>
          <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
            <Link href="/builder">
              <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Start Building Now - It's Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg font-serif font-semibold">ResumeBuilder</span>
          </div>
          <p className="text-muted-foreground">Built with Next.js, Tailwind CSS, and shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}
