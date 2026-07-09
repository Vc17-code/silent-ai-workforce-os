import type { Metadata } from "next";
import { siteConfig, contactInfo } from "./config";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description = siteConfig.description,
  path = "",
  image = "/images/og-image.jpg",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Trusted Real Estate Agent in Ajmer`;

  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    keywords: siteConfig.keywords,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    name: contactInfo.businessName,
    description: siteConfig.description,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressLocality: "Ajmer",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    url: siteConfig.url,
    priceRange: "₹₹",
    openingHours: "Mo-Sa 10:00-19:00",
    areaServed: "Ajmer",
  };
}

export function propertyJsonLd(property: {
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteConfig.url}/properties/${property.slug}`,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    image: property.images,
  };
}

export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
