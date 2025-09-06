import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const baseUrl = 'https://resumebuilder.com' // Replace with your actual domain
const defaultImage = '/og-image.jpg'
const defaultDescription = 'Create stunning professional resumes with our free online resume builder. Choose from 18+ ATS-friendly templates, get live preview, and download as PDF instantly.'

export function generateMetadata({
  title,
  description = defaultDescription,
  keywords = [],
  image = defaultImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'ResumeBuilder Team',
  section,
  tags = []
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ResumeBuilder` : 'ResumeBuilder - Create Professional Resumes in Minutes | Free Online Tool'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

  const defaultKeywords = [
    'resume builder',
    'free resume maker',
    'professional resume',
    'resume templates',
    'CV builder',
    'resume creator',
    'ATS friendly resume',
    'resume generator',
    'online resume builder',
    'resume maker free',
    'professional CV',
    'resume design',
    'resume format',
    'job application',
    'career tools'
  ]

  const allKeywords = [...new Set([...defaultKeywords, ...keywords, ...tags])]

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: 'ResumeBuilder',
    publisher: 'ResumeBuilder',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url || '/',
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: 'ResumeBuilder',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@resumebuilder', // Replace with your actual Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your Google Search Console verification code
    },
    category: 'technology',
    classification: 'Resume Builder, Career Tools, Professional Development',
    other: {
      'application-name': 'ResumeBuilder',
      'apple-mobile-web-app-title': 'ResumeBuilder',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
    },
  }

  return metadata
}

export function generateStructuredData({
  type = 'WebApplication',
  name = 'ResumeBuilder',
  description = defaultDescription,
  url = baseUrl,
  image = defaultImage,
  author = 'ResumeBuilder Team',
  publishedTime,
  modifiedTime,
  price = '0',
  priceCurrency = 'USD',
  features = [
    'Multiple Professional Templates',
    'Live Preview',
    'PDF Download',
    'ATS-Friendly Design',
    'Mobile Responsive',
    'No Signup Required'
  ]
}: {
  type?: 'WebApplication' | 'Article' | 'Product' | 'Organization'
  name?: string
  description?: string
  url?: string
  image?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  price?: string
  priceCurrency?: string
  features?: string[]
} = {}) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    image,
    creator: {
      '@type': 'Organization',
      name: author
    },
    datePublished: publishedTime || '2024-01-01',
    dateModified: modifiedTime || new Date().toISOString().split('T')[0],
    inLanguage: 'en-US'
  }

  if (type === 'WebApplication') {
    return {
      ...baseStructuredData,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency
      },
      featureList: features,
      screenshot: image,
      softwareVersion: '1.0',
      isAccessibleForFree: true,
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      softwareRequirements: 'Web browser',
      memoryRequirements: '512 MB RAM',
      storageRequirements: '10 MB available space'
    }
  }

  if (type === 'Article') {
    return {
      ...baseStructuredData,
      headline: name,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'ResumeBuilder',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`
        }
      }
    }
  }

  if (type === 'Product') {
    return {
      ...baseStructuredData,
      brand: {
        '@type': 'Brand',
        name: 'ResumeBuilder'
      },
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock'
      }
    }
  }

  return baseStructuredData
}
