"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";

interface PrintResumeButtonProps {
  resumeData: ResumeData;
  templateName: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  disabled?: boolean;
}

export function PrintResumeButton({
  resumeData,
  templateName,
  className,
  size = "sm",
  variant = "outline",
  disabled = false,
}: PrintResumeButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    setIsPrinting(true);

    try {
      // Improved mobile detection
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
          navigator.userAgent
        ) ||
        window.innerWidth <= 768 ||
        "ontouchstart" in window ||
        (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

      let resumeElement = document.querySelector(
        "[data-resume-template]"
      ) as HTMLElement;

      // Fallback: try to find the template by class or ID
      if (!resumeElement) {
        resumeElement = document.querySelector(
          ".resume-template"
        ) as HTMLElement;
      }

      // Final fallback: find the first template container
      if (!resumeElement) {
        resumeElement = document.querySelector(
          '[style*="794px"]'
        ) as HTMLElement;
      }

      if (!resumeElement) {
        throw new Error("Resume template not found. Please try again.");
      }

      if (isMobile) {
        // For mobile devices, use a safer approach
        const printWindow = window.open("", "_blank", "width=800,height=600");

        if (!printWindow) {
          // Fallback: try to print directly with better mobile support
          try {
            // Create a temporary print-friendly version
            const printContainer = document.createElement("div");
            printContainer.id = "mobile-print-container";
            printContainer.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: white;
              z-index: 9999;
              overflow: auto;
              padding: 20px;
              box-sizing: border-box;
            `;

            // Clone the resume element
            const resumeClone = resumeElement.cloneNode(true) as HTMLElement;
            resumeClone.style.cssText = `
              max-width: 100%;
              margin: 0 auto;
              font-size: 12px;
              line-height: 1.4;
            `;

            // Add print-specific styles
            const printStyles = document.createElement("style");
            printStyles.textContent = `
              @media print {
                body * { visibility: hidden; }
                #mobile-print-container,
                #mobile-print-container * { visibility: visible; }
                #mobile-print-container {
                  position: static !important;
                  width: auto !important;
                  height: auto !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                #mobile-print-container .resume-template {
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
              }
              @page {
                size: A4;
                margin: 0.5in;
              }
            `;

            printContainer.appendChild(printStyles);
            printContainer.appendChild(resumeClone);
            document.body.appendChild(printContainer);

            // Trigger print
            window.print();

            // Clean up after printing
            setTimeout(() => {
              if (document.body.contains(printContainer)) {
                document.body.removeChild(printContainer);
              }
            }, 1000);
          } catch (mobileFallbackError) {
            console.error("Mobile print fallback failed:", mobileFallbackError);
            alert(
              "Please use your browser's print function or try on desktop for best results."
            );
          }
        } else {
          // Use popup window for mobile with better compatibility
          const printContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
                <title>Print Resume</title>
                <style>
                  @page {
                    size: A4;
                    margin: 0.5in;
                  }
                  * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: white;
                    -webkit-text-size-adjust: 100%;
                  }
                  .print-container {
                    max-width: 100%;
                    margin: 0 auto;
                  }
                  @media print {
                    body { margin: 0; }
                    .no-print { display: none !important; }
                  }
                </style>
              </head>
              <body>
                <div class="print-container">
                  ${resumeElement.outerHTML}
                </div>
                <script>
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      if (window.print) {
                        window.print();
                      }
                      setTimeout(function() {
                        window.close();
                      }, 1000);
                    }, 300);
                  });

                  // Handle print dialog events
                  window.addEventListener('afterprint', function() {
                    setTimeout(function() {
                      window.close();
                    }, 500);
                  });

                  // Fallback for browsers that don't support afterprint
                  let printCheckInterval = setInterval(function() {
                    if (document.hidden || document.webkitHidden) {
                      clearInterval(printCheckInterval);
                      setTimeout(function() {
                        window.close();
                      }, 1000);
                    }
                  }, 500);
                </script>
              </body>
            </html>
          `;

          printWindow.document.write(printContent);
          printWindow.document.close();

          // Fallback timeout for mobile browsers
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close();
            }
          }, 10000);
        }
      } else {
        // For desktop, use popup window with improved styling
        const printWindow = window.open(
          "",
          "_blank",
          "width=900,height=700,scrollbars=yes,resizable=yes"
        );

        if (!printWindow) {
          throw new Error(
            "Could not open print window. Please allow popups for this site."
          );
        }

        const printContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Print Resume - ${templateName}</title>
              <style>
                @page {
                  size: A4;
                  margin: 0.2in;
                }
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background: white;
                  font-size: 14px;
                  line-height: 1.5;
                }
                .print-header {
                  text-align: center;
                  margin-bottom: 20px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #333;
                }
                .no-print {
                  display: none !important;
                }
                @media print {
                  .no-print { display: none !important; }
                  body { font-size: 12px; }
                }
              </style>
            </head>
            <body>
              <div class="print-header no-print">
                <p>Resume - ${templateName}</p>
                <p style="font-size: 12px; color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
              </div>
              ${resumeElement.outerHTML}
              <script>
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    if (window.print) {
                      window.print();
                    }
                    // Don't auto-close on desktop to allow user to print multiple times
                  }, 500);
                });

                // Handle print dialog events
                window.addEventListener('afterprint', function() {
                  // Keep window open on desktop for user convenience
                });
              </script>
            </body>
          </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
      }
    } catch (error) {
      console.error("Print failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      // Show user-friendly error message
      if (typeof window !== "undefined") {
        alert(
          `Print failed: ${errorMessage}\n\nTry using your browser's print function (Ctrl+P / Cmd+P) or download as PDF instead.`
        );
      }
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Button
      onClick={handlePrint}
      disabled={isPrinting || disabled}
      size={size}
      variant={variant}
      className={className}
    >
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
  );
}
