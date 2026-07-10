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
  image = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Premium Dental Clinic in Navi Mumbai`;

  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    keywords: siteConfig.keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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

export function dentistJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    name: contactInfo.businessName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressLocality: contactInfo.city,
      postalCode: contactInfo.pincode,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.0771,
      longitude: 72.9987,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: contactInfo.googleRating,
      reviewCount: contactInfo.googleReviewCount,
      bestRating: 5,
    },
    priceRange: "₹₹",
    areaServed: ["Navi Mumbai", "Vashi", "Sanpada", "Nerul", "Belapur"],
    medicalSpecialty: "Dentistry",
  };
}

export function physicianJsonLd(doctor: {
  name: string;
  credentials: string;
  photo: string;
  specializations: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specializations,
    image: doctor.photo,
    description: doctor.credentials,
    worksFor: {
      "@type": "Dentist",
      name: contactInfo.businessName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressLocality: contactInfo.city,
      addressCountry: "IN",
    },
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

export function serviceJsonLd(service: {
  title: string;
  overview: string;
  slug: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.overview,
    url: `${siteConfig.url}/treatments/${service.slug}`,
    image: service.image,
    procedureType: "https://schema.org/NoninvasiveProcedure",
    howPerformed: service.overview,
  };
}
