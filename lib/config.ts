import type { ContactInfo, DoctorProfile, MediaAssets, SiteContent } from "@/types/clinic";

export const siteConfig = {
  name: "Smilecare Dentist",
  shortName: "Smilecare",
  tagline: "Premium Dental Care in Navi Mumbai",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smilecarenavimumbai.com",
  description:
    "Smilecare Dentist in Navi Mumbai offers gentle, modern dental care — from routine check-ups to smile makeovers — with a patient-first approach and clinic-grade sterilization.",
  keywords: [
    "dentist Navi Mumbai",
    "Smilecare Dentist",
    "dental clinic Vashi",
    "teeth whitening Navi Mumbai",
    "root canal Navi Mumbai",
    "dental implants Navi Mumbai",
    "best dentist Navi Mumbai",
    "kids dentist Navi Mumbai",
  ],
};

export const contactInfo: ContactInfo = {
  businessName: "Smilecare Dentist",
  tagline: "Premium Dental Care in Navi Mumbai",
  phone: "+912241234567",
  phoneDisplay: "+91 22 4123 4567",
  emergencyPhone: "+919876543210",
  emergencyPhoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@smilecarenavimumbai.com",
  address: "Shop 12, Ground Floor, Palm Beach Road, Sector 17, Vashi",
  city: "Navi Mumbai",
  pincode: "400703",
  businessHours: "Mon–Sat 10:00 AM – 8:00 PM · Sun 10:00 AM – 2:00 PM",
  businessHoursDetail: [
    { day: "Monday – Saturday", hours: "10:00 AM – 8:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 2:00 PM" },
    { day: "Emergency", hours: "Call emergency line anytime" },
  ],
  experienceYears: 12,
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Palm+Beach+Road+Sector+17+Vashi+Navi+Mumbai&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Palm+Beach+Road+Sector+17+Vashi+Navi+Mumbai+400703",
  googleRating: 4.9,
  googleReviewCount: 186,
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Smilecare+Dentist+Vashi+Navi+Mumbai",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  insuranceAccepted: [
    "Cashless dental plans",
    "Major TPA partners",
    "Corporate wellness tie-ups",
  ],
};

export const doctorProfile: DoctorProfile = {
  name: "Dr. Ananya Mehta",
  title: "Lead Dentist & Clinic Director",
  credentials: "BDS, MDS (Conservative Dentistry & Endodontics)",
  photo:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  shortBio:
    "Dr. Ananya Mehta brings over a decade of precision dentistry to Smilecare, combining gentle chairside care with evidence-based treatments.",
  biography:
    "Dr. Ananya Mehta founded Smilecare Dentist with a simple belief: every patient deserves calm, transparent, and clinically excellent dental care. After completing her MDS in Conservative Dentistry & Endodontics, she trained in aesthetic smile design and minimally invasive techniques. Today she leads a modern clinic in Vashi serving families across Navi Mumbai — from first check-ups to complex restorative work — with a focus on comfort, clarity, and lasting results.",
  qualifications: [
    "BDS — Maharashtra University of Health Sciences",
    "MDS — Conservative Dentistry & Endodontics",
    "Certification in Aesthetic Smile Design",
    "Advanced Endodontic Microscopy Training",
  ],
  experience: [
    "12+ years in clinical dentistry",
    "5,000+ successful procedures",
    "Special focus on pain-free root canal therapy",
    "Family and pediatric-friendly practice",
  ],
  certifications: [
    "Invisalign-aligned clear aligner training",
    "Digital radiography & CBCT interpretation",
    "Infection control & sterilization protocols (CDC-aligned)",
  ],
  memberships: [
    "Indian Dental Association (IDA)",
    "Indian Endodontic Society",
    "Indian Academy of Aesthetic Dentistry",
  ],
  awards: [
    "Navi Mumbai Healthcare Excellence — Dentistry (2024)",
    "Patient Choice Award — Gentle Care (2023)",
    "Clinical Excellence in Endodontics — Regional Forum (2022)",
  ],
  specializations: [
    "Root canal therapy",
    "Smile makeovers",
    "Dental implants",
    "Cosmetic dentistry",
    "Preventive family care",
  ],
  philosophy:
    "Listen first. Explain clearly. Treat gently. Dentistry should feel collaborative — never rushed, never opaque. We plan every smile around your comfort, your timeline, and your long-term oral health.",
  gallery: [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  ],
};

export const defaultMediaAssets: MediaAssets = {
  introVideo: {
    url: "",
    thumbnail:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80",
    title: "Welcome to Smilecare",
  },
  virtualTour: {
    provider: "placeholder",
    embedUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1600&q=80",
    title: "360° Virtual Clinic Tour",
    hotspots: [
      { id: "reception", label: "Reception", description: "Warm welcome desk and digital check-in" },
      { id: "waiting", label: "Waiting Area", description: "Calm seating with soft lighting" },
      { id: "consult", label: "Consultation Room", description: "Private treatment planning space" },
      { id: "treatment", label: "Treatment Room", description: "Modern chairs with digital imaging" },
      { id: "sterile", label: "Sterilization Zone", description: "Class-B autoclave protocols" },
      { id: "kids", label: "Kids Corner", description: "Friendly space for young patients" },
    ],
  },
  heroBanner: {
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80",
    headline: "Dentistry that feels calm, clear, and carefully done.",
    subheadline:
      "Modern dental care in Vashi for families who value comfort, transparency, and lasting smiles.",
  },
};

export const defaultSiteContent: SiteContent = {
  about: {
    history:
      "Smilecare Dentist opened in Vashi to bring hospital-grade clinical standards into a warm neighbourhood clinic. What began as a focused endodontic practice has grown into a full-spectrum dental home for Navi Mumbai families.",
    mission:
      "To deliver precise, gentle dental care that patients understand and trust — every visit, every smile.",
    vision:
      "To be Navi Mumbai’s most trusted dental clinic for comfort-led, technology-enabled oral healthcare.",
    values: [
      { title: "Patient first", description: "Your comfort and clarity guide every decision." },
      { title: "Clinical excellence", description: "Evidence-based care with modern equipment." },
      { title: "Transparency", description: "Clear plans, honest timelines, no surprises." },
      { title: "Sterile safety", description: "Rigorous sterilization you can see and trust." },
    ],
    achievements: [
      "4.9★ average Google rating from 180+ patients",
      "12+ years of clinical leadership",
      "Digital diagnostics across all treatment rooms",
      "Dedicated sterilization protocols reviewed quarterly",
    ],
    equipment: [
      "Digital RVG & OPG imaging",
      "Intraoral cameras",
      "LED curing & magnification loupes",
      "Class-B autoclave sterilization",
      "Comfort-focused dental chairs",
    ],
    sterilization:
      "Every instrument follows a tracked sterilization cycle with Class-B autoclaves, sealed pouches, and single-use disposables wherever clinically appropriate. Surfaces are disinfected between patients using medical-grade protocols.",
    philosophy:
      "We believe great dentistry is quiet confidence — skilled hands, clear communication, and a clinic designed to put you at ease.",
  },
  whyChooseUs: [
    {
      title: "Gentle, explained care",
      description: "We walk you through options before we begin — so you always know what happens next.",
    },
    {
      title: "Modern diagnostics",
      description: "Digital imaging and precise planning for predictable, minimally invasive treatment.",
    },
    {
      title: "Hospital-grade hygiene",
      description: "Visible sterilization standards and single-patient instrument protocols.",
    },
    {
      title: "Family-friendly clinic",
      description: "From first check-ups to smile makeovers — one trusted dental home for all ages.",
    },
  ],
  seo: {
    defaultTitle: "Smilecare Dentist | Premium Dental Clinic in Navi Mumbai",
    defaultDescription:
      "Book an appointment at Smilecare Dentist, Vashi — trusted dental care for root canals, implants, whitening, braces, and family dentistry in Navi Mumbai.",
    keywords: siteConfig.keywords,
  },
};

export const colors = {
  primary: "#0F5C5C",
  primarySoft: "#1A7A7A",
  accent: "#3D9B8F",
  mist: "#E8F3F1",
  sand: "#F7F4EF",
  ink: "#1A2B2B",
};
