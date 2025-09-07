"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, Loader2 } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface PrintResumeButtonProps {
  resumeData: ResumeData
  templateName: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  disabled?: boolean
}

export function PrintResumeButton({
  resumeData,
  templateName,
  className,
  size = "sm",
  variant = "outline",
  disabled = false,
}: PrintResumeButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = async () => {
    setIsPrinting(true)

    try {
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
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
        throw new Error("Resume template not found. Please try again.")
      }

      if (isMobile) {
        // For mobile devices, use native print with inline styles
        const originalContent = document.body.innerHTML
        const printContent = `
          <style>
            @page { size: A4; margin: 0.5in; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          </style>
          ${resumeElement.outerHTML}
        `
        
        document.body.innerHTML = printContent
        window.print()
        document.body.innerHTML = originalContent
      } else {
        // For desktop, use popup window
        const printWindow = window.open("", "_blank", "width=800,height=600")

        if (!printWindow) {
          throw new Error("Could not open print window. Please allow popups for this site.")
        }

        const printContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                @page { size: A4; margin: 0.2in; }
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background: white; }
                * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              </style>
            </head>
            <body>
              ${resumeElement.outerHTML}
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 500);
                };
              </script>
            </body>
          </html>
        `

        printWindow.document.write(printContent)
        printWindow.document.close()
      }
    } catch (error) {
      console.error("Print failed:", error)
      alert(`Print failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <Button onClick={handlePrint} disabled={isPrinting || disabled} size={size} variant={variant} className={className}>
      {isPrinting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Preparing Print...
        </>
      ) : (
        <>
          <Printer className="h-4 w-4 mr-2" />
          Print Resume
        </>
      )}
    </Button>
  )
}
