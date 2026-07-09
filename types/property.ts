export type PropertyStatus = "sale" | "rent" | "sold" | "rented";
export type PropertyType =
  | "residential"
  | "commercial"
  | "agricultural"
  | "villa"
  | "shop"
  | "plot"
  | "building";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  location: string;
  address: string;
  area: number;
  areaUnit: "sqft" | "sqyd" | "acre";
  propertyType: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  status: PropertyStatus;
  amenities: string[];
  images: string[];
  videoUrl?: string;
  mapEmbedUrl?: string;
  contactNumber: string;
  featured: boolean;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyRequirement?: string;
  budget?: string;
  message?: string;
  propertyId?: string;
  propertyTitle?: string;
  read: boolean;
  createdAt: string;
}

export interface ContactInfo {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  experienceYears: number;
  mapEmbedUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  agricultural: "Agricultural Land",
  villa: "Villa",
  shop: "Shop",
  plot: "Plot",
  building: "Building",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  sale: "For Sale",
  rent: "For Rent",
  sold: "Sold",
  rented: "Rented",
};
