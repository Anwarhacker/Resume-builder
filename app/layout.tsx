import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Source_Sans_3 } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
})

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-pro",
})

export const metadata: Metadata = {
  title: {
    default: "Resume Builder - Create Professional Resumes in Minutes | Free Online Tool",
    template: "%s | ResumeBuilder"
  },
  description: "Create stunning professional resumes with our free online resume builder. Choose from 18+ ATS-friendly templates, get live preview, and download as PDF instantly. No signup required!",
  keywords: [
    "resume builder",
    "free resume maker",
    "professional resume",
    "resume templates",
    "CV builder",
    "resume creator",
    "ATS friendly resume",
    "resume generator",
    "online resume builder",
    "resume maker free",
    "professional CV",
    "resume design",
    "resume format",
    "job application",
    "career tools"
  ],
  authors: [{ name: "ResumeBuilder Team" }],
  creator: "ResumeBuilder",
  publisher: "ResumeBuilder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://resumebuilder.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumebuilder.com", // Replace with your actual domain
    title: "Resume Builder - Create Professional Resumes in Minutes",
    description: "Build stunning professional resumes with our free online resume builder. Choose from 18+ ATS-friendly templates, get live preview, and download as PDF instantly.",
    siteName: "ResumeBuilder",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "ResumeBuilder - Professional Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder - Create Professional Resumes in Minutes",
    description: "Build stunning professional resumes with our free online resume builder. Choose from 18+ ATS-friendly templates, get live preview, and download as PDF instantly.",
    images: ["/twitter-image.jpg"], // You'll need to create this image
    creator: "@resumebuilder", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Add if you use Yandex
    yahoo: "your-yahoo-verification-code", // Add if you use Yahoo
  },
  category: "technology",
  classification: "Resume Builder, Career Tools, Professional Development",
  other: {
    "application-name": "ResumeBuilder",
    "apple-mobile-web-app-title": "ResumeBuilder",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${sourceSansPro.variable} ${playfairDisplay.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
