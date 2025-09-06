import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export interface PDFOptions {
  filename?: string
  quality?: number
  format?: "a4" | "letter"
  orientation?: "portrait" | "landscape"
}

export async function generatePDF(element: HTMLElement, options: PDFOptions = {}): Promise<void> {
  const { filename = "resume.pdf", quality = 1, format = "a4", orientation = "portrait" } = options

  try {
    console.log("[v0] Starting PDF generation with html2canvas...")

    console.log("[v0] Element dimensions:", {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      visible: element.offsetParent !== null,
      display: window.getComputedStyle(element).display,
      visibility: window.getComputedStyle(element).visibility,
    })

    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new Error("Element has zero dimensions - cannot generate PDF")
    }

    // Show loading state
    const loadingToast = document.createElement("div")
    loadingToast.textContent = "Generating PDF..."
    loadingToast.className = "fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    document.body.appendChild(loadingToast)

    await new Promise((resolve) => setTimeout(resolve, 500))

    // Convert DOM to high-resolution canvas using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Reduced from 3 to 2 for better compatibility
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: true, // Enable logging to debug canvas issues
      removeContainer: true,
      foreignObjectRendering: true,
      width: element.scrollWidth, // Use scroll dimensions for full content
      height: element.scrollHeight,
      ignoreElements: (element) => {
        return element.tagName === "SCRIPT" || element.tagName === "STYLE"
      },
    })

    console.log("[v0] Canvas generated, creating PDF...")

    console.log("[v0] Canvas dimensions:", {
      width: canvas.width,
      height: canvas.height,
      hasContent: canvas.width > 0 && canvas.height > 0,
    })

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Generated canvas is empty - no content to convert to PDF")
    }

    // Create A4 PDF document
    const pdf = new jsPDF({
      orientation: orientation,
      unit: "mm",
      format: format,
      compress: true,
    })

    // A4 dimensions in mm
    const pdfWidth = 210
    const pdfHeight = 297
    const imgWidth = pdfWidth - 20 // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Convert canvas to image data
    const imgData = canvas.toDataURL("image/png", quality)

    if (!imgData || imgData === "data:,") {
      throw new Error("Failed to convert canvas to image data")
    }

    let heightLeft = imgHeight
    let position = 0

    // Add first page with margins
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight, undefined, "FAST")
    heightLeft -= pdfHeight

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight, undefined, "FAST")
      heightLeft -= pdfHeight
    }

    // Save the PDF with dynamic filename
    pdf.save(filename)
    console.log("[v0] PDF saved successfully")

    // Remove loading toast
    if (document.body.contains(loadingToast)) {
      document.body.removeChild(loadingToast)
    }

    // Show success toast
    const successToast = document.createElement("div")
    successToast.textContent = "PDF downloaded successfully!"
    successToast.className = "fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    document.body.appendChild(successToast)
    setTimeout(() => {
      if (document.body.contains(successToast)) {
        document.body.removeChild(successToast)
      }
    }, 3000)
  } catch (error) {
    console.error("[v0] Error generating PDF:", error)

    // Show error toast with more specific error message
    const errorToast = document.createElement("div")
    errorToast.textContent = `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`
    errorToast.className = "fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    document.body.appendChild(errorToast)
    setTimeout(() => {
      if (document.body.contains(errorToast)) {
        document.body.removeChild(errorToast)
      }
    }, 5000)

    throw error // Re-throw for caller to handle
  }
}

export function generateResumeFilename(fullName: string, templateName: string): string {
  const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
  const cleanTemplate = templateName.toLowerCase()
  const timestamp = new Date().toISOString().split("T")[0] // YYYY-MM-DD format

  return `${cleanName || "resume"}_${cleanTemplate}_${timestamp}.pdf`
}
