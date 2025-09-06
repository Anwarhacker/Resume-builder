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
      console.error("[v0] Resume template element not found for printing")
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

    setIsPrinting(true)

    try {
      const printWindow = window.open("", "_blank", "width=800,height=600")

      if (!printWindow) {
        throw new Error("Could not open print window. Please allow popups for this site.")
      }

      const stylesheets = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            if (sheet.href) {
              return `<link rel="stylesheet" href="${sheet.href}">`
            } else {
              // For inline styles, extract the CSS rules
              const rules = Array.from(sheet.cssRules || [])
                .map((rule) => rule.cssText)
                .join("\n")
              return `<style>${rules}</style>`
            }
          } catch (e) {
            // Handle CORS issues with external stylesheets
            if (sheet.href) {
              return `<link rel="stylesheet" href="${sheet.href}">`
            }
            return ""
          }
        })
        .join("\n")

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
           
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${stylesheets}
            <style>
              @page {
                size: A4;
                margin: 0.2in;
              }
              
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: white;
                color: black;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .print-container {
                width: 794px;
                min-height: 1123px;
                margin: 0 auto;
                background: white;
                box-shadow: none;
              }
              
              @media print {
                body {
                  background: white !important;
                }
                
                .print-container {
                  width: 100% !important;
                  margin: 0 !important;
                  box-shadow: none !important;
                  page-break-inside: avoid;
                }
                
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${resumeElement.outerHTML}
            </div>
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
    } catch (error) {
      console.error("[v0] Print failed:", error)

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      const errorToast = document.createElement("div")
      errorToast.textContent = `Print failed: ${errorMessage}`
      errorToast.className = "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      document.body.appendChild(errorToast)
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast)
        }
      }, 5000)
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
