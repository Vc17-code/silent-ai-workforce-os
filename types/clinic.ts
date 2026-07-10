export interface ContactInfo {
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  emergencyPhone: string;
  emergencyPhoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  businessHours: string;
  businessHoursDetail: { day: string; hours: string }[];
  experienceYears: number;
  mapEmbedUrl: string;
  mapLink: string;
  googleRating: number;
  googleReviewCount: number;
  googleReviewUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  insuranceAccepted: string[];
}

export interface DoctorProfile {
  name: string;
  title: string;
  credentials: string;
  photo: string;
  shortBio: string;
  biography: string;
  qualifications: string[];
  experience: string[];
  certifications: string[];
  memberships: string[];
  awards: string[];
  specializations: string[];
  philosophy: string;
  gallery: string[];
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  benefits: string[];
  procedure: string[];
  recovery: string;
  duration: string;
  suitableFor: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  image: string;
  icon: string;
  featured: boolean;
  order: number;
  published: boolean;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "before-after" | "clinic" | "equipment" | "team" | "smile";
  beforeImage?: string;
  afterImage?: string;
  image?: string;
  description?: string;
  featured: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment?: string;
  text: string;
  rating: number;
  videoUrl?: string;
  featured: boolean;
  source: "google" | "website" | "video";
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  treatment?: string;
  message?: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
  read: boolean;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  validUntil?: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAssets {
  introVideo: {
    url: string;
    thumbnail: string;
    title: string;
    captionsUrl?: string;
  };
  virtualTour: {
    provider: "placeholder" | "matterport" | "pannellum" | "marzipano" | "streetview";
    embedUrl: string;
    thumbnail: string;
    title: string;
    hotspots: { id: string; label: string; description: string }[];
  };
  heroBanner: {
    image: string;
    headline: string;
    subheadline: string;
  };
}

export interface SiteContent {
  about: {
    history: string;
    mission: string;
    vision: string;
    values: { title: string; description: string }[];
    achievements: string[];
    equipment: string[];
    sterilization: string;
    philosophy: string;
  };
  whyChooseUs: { title: string; description: string }[];
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
}
