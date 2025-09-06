"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { generatePDF, generateResumeFilename } from "@/utils/pdf-generator"
import type { ResumeData } from "@/lib/types"

interface PDFDownloadButtonProps {
  resumeData: ResumeData
  templateName: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  disabled?: boolean
}

export function PDFDownloadButton({
  resumeData,
  templateName,
  className,
  size = "sm",
  variant = "default",
  disabled = false,
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    let resumeElement = document.querySelector("[data-resume-template]") as HTMLElement

    // Fallback: try to find the template by class or ID
    if (!resumeElement) {
      resumeElement = document.querySelector(".resume-template") as HTMLElement
    }

    // Final fallback: find the first template container
    if (!resumeElement) {
      resumeElement = document.querySelector('[style*="794px"]') as HTMLElement
    }

    if (!resumeElement) {
      console.error("[v0] Resume template element not found")
      // Show error toast
      const errorToast = document.createElement("div")
      errorToast.textContent = "Resume template not found. Please try again."
      errorToast.className = "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      document.body.appendChild(errorToast)
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast)
        }
      }, 3000)
      return
    }

    setIsGenerating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 100))

      const filename = generateResumeFilename(resumeData.personalInfo.fullName, templateName)

      await generatePDF(resumeElement, {
        filename,
        quality: 0.95,
        format: "a4",
        orientation: "portrait",
      })
    } catch (error) {
      console.error("[v0] PDF generation failed:", error)

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      const errorToast = document.createElement("div")
      errorToast.textContent = `PDF generation failed: ${errorMessage}`
      errorToast.className = "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      document.body.appendChild(errorToast)
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast)
        }
      }, 5000)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating || disabled}
      size={size}
      variant={variant}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  )
}
