import type { PropertyStatus, PropertyType } from "@/types/property";

export function formatPrice(price: number, status: PropertyStatus): string {
  if (status === "rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1)} Crore`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} Lakh`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString("en-IN")} ${unit}`;
}

export function getWhatsAppLink(
  phone: string,
  message?: string
): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone.replace(/\D/g, "")}${text}`;
}

export function getPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const categoryIcons: Record<PropertyType, string> = {
  residential: "🏡",
  commercial: "🏢",
  agricultural: "🌾",
  villa: "🏘️",
  shop: "🏬",
  plot: "🏗️",
  building: "🏗️",
};

export const faqs = [
  {
    question: "How do I schedule a property visit?",
    answer:
      "Call us at +91 9414435920 or send a WhatsApp message with your preferred date and time. Our team will arrange a guided site visit at your convenience.",
  },
  {
    question: "Can you help with home loans?",
    answer:
      "Yes, we provide complete home loan assistance. We connect you with trusted banks and help with documentation, eligibility checks, and application processing.",
  },
  {
    question: "Do you verify property documents?",
    answer:
      "Absolutely. Every property we list goes through document verification including title deeds, approvals, and encumbrance checks for your peace of mind.",
  },
  {
    question: "Do you deal in commercial properties?",
    answer:
      "Yes, we specialize in both residential and commercial properties including offices, shops, warehouses, and investment-grade commercial spaces across Ajmer.",
  },
  {
    question: "Can I list my property with Disha Properties?",
    answer:
      "Yes! Contact us with your property details and we'll help you get maximum exposure. We handle marketing, buyer screening, negotiations, and documentation.",
  },
  {
    question: "What is your commission structure?",
    answer:
      "Our commission is transparent and competitive, discussed upfront before any agreement. There are no hidden charges — we believe in honest, clear dealings.",
  },
];

export const testimonials = [
  {
    name: "Rajesh & Priya Sharma",
    text: "They helped us purchase our dream home smoothly. Very professional and patient throughout the process.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    text: "Very professional and trustworthy. Disha Properties found us the perfect commercial space for our business.",
    rating: 5,
  },
  {
    name: "Sunita Meena",
    text: "Excellent property options and great investment advice. Highly recommend for anyone buying in Ajmer.",
    rating: 5,
  },
];

export const services = [
  {
    icon: "🏠",
    title: "Property Buying",
    description: "Find verified residential and commercial properties tailored to your needs and budget.",
  },
  {
    icon: "💰",
    title: "Property Selling",
    description: "Maximum exposure for your property with professional marketing and buyer screening.",
  },
  {
    icon: "📈",
    title: "Investment Advice",
    description: "Expert guidance on high-ROI properties and emerging areas in Ajmer.",
  },
  {
    icon: "🔑",
    title: "Rental Services",
    description: "Residential and commercial rental assistance with tenant verification.",
  },
  {
    icon: "📋",
    title: "Documentation",
    description: "Agreement, registration, verification, and complete legal support.",
  },
  {
    icon: "🏦",
    title: "Loan Assistance",
    description: "Home loan guidance with bank connections and documentation help.",
  },
  {
    icon: "📊",
    title: "Property Valuation",
    description: "Accurate market valuation for buying, selling, or investment decisions.",
  },
];

export const processSteps = [
  { step: 1, title: "Tell us your requirements", description: "Share your budget, location preference, and property type." },
  { step: 2, title: "Property Shortlisting", description: "We curate the best matching properties for you." },
  { step: 3, title: "Site Visit", description: "Guided property visits at your convenience." },
  { step: 4, title: "Negotiation", description: "We negotiate the best deal on your behalf." },
  { step: 5, title: "Documentation", description: "Complete legal documentation and verification." },
  { step: 6, title: "Registration", description: "Smooth registration and handover process." },
  { step: 7, title: "Congratulations!", description: "Welcome to your new property!" },
];

export const whyChooseUs = [
  "16+ Years Experience",
  "Verified Listings",
  "Local Market Experts",
  "Transparent Process",
  "Excellent Customer Support",
  "Personalized Consultation",
  "Investment Planning",
  "Trusted by Hundreds of Clients",
];

export const propertyCategories = [
  { type: "residential" as PropertyType, label: "Residential", icon: "🏡", description: "Apartments, flats & homes" },
  { type: "commercial" as PropertyType, label: "Commercial", icon: "🏢", description: "Offices & business spaces" },
  { type: "agricultural" as PropertyType, label: "Agricultural Land", icon: "🌾", description: "Farm & agricultural plots" },
  { type: "villa" as PropertyType, label: "Villas", icon: "🏘️", description: "Luxury villas & bungalows" },
  { type: "shop" as PropertyType, label: "Shops", icon: "🏬", description: "Retail & showroom spaces" },
  { type: "plot" as PropertyType, label: "Plots", icon: "🏗️", description: "Residential & commercial plots" },
];
