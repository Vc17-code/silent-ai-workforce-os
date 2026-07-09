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
  email: "info@dishaproperties.in",
  address: "Makarwali, Ajmer",
  city: "Ajmer, Rajasthan",
  businessHours: "Monday – Saturday, 10 AM – 7 PM",
  experienceYears: 16,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5!2d74.64!3d26.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI3JzAwLjAiTiA3NMKwMzgnMjQuMCJF!5e0!3m2!1sen!2sin!4v1",
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
