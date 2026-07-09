import type { ContactInfo } from "@/types/property";

export const siteConfig = {
  name: "Disha Properties",
  tagline: "Your Trusted Property Partner in Ajmer Since 2009",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dishaproperties.in",
  description:
    "Looking to buy or sell residential and commercial properties in Ajmer? Disha Properties offers verified listings, expert consultation, and trusted real estate services backed by 16+ years of experience.",
  keywords: [
    "real estate Ajmer",
    "property dealer Ajmer",
    "Disha Properties",
    "residential property Ajmer",
    "commercial property Ajmer",
    "plots Ajmer",
    "Makarwali property",
  ],
};

export const contactInfo: ContactInfo = {
  businessName: "Disha Properties",
  tagline: "Your Trusted Property Partner in Ajmer Since 2009",
  phone: "+919414435920",
  whatsapp: "919414435920",
  email: "info@dishapropertiesajmer.in",
  address: "S8 G Block, Oppo First Step School, Makadwali Road, Makarwali",
  city: "Ajmer-305004, Rajasthan",
  businessHours: "Mon–Sat 10AM–7PM, Sun 10AM–5PM",
  experienceYears: 16,
  mapEmbedUrl:
    "https://maps.google.com/maps?q=S8+G+Block,+Makadwali+Road,+Makarwali,+Ajmer+305004,+Rajasthan&output=embed",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export const colors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  background: "#F8FAFC",
};
