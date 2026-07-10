import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type {
  Appointment,
  BlogPost,
  FAQ,
  GalleryItem,
  MediaAssets,
  Offer,
  SiteContent,
  Testimonial,
  Treatment,
  DoctorProfile,
} from "@/types/clinic";
import {
  defaultMediaAssets,
  defaultSiteContent,
  doctorProfile as defaultDoctor,
} from "@/lib/config";

const DATA_DIR = path.join(process.cwd(), "data");

const FILES = {
  treatments: path.join(DATA_DIR, "treatments.json"),
  appointments: path.join(DATA_DIR, "appointments.json"),
  gallery: path.join(DATA_DIR, "gallery.json"),
  testimonials: path.join(DATA_DIR, "testimonials.json"),
  faqs: path.join(DATA_DIR, "faqs.json"),
  offers: path.join(DATA_DIR, "offers.json"),
  blogs: path.join(DATA_DIR, "blogs.json"),
  media: path.join(DATA_DIR, "media.json"),
  content: path.join(DATA_DIR, "content.json"),
  doctor: path.join(DATA_DIR, "doctor.json"),
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Treatments ── */
export async function getTreatments(includeUnpublished = false): Promise<Treatment[]> {
  const items = await readJson<Treatment[]>(FILES.treatments, []);
  const filtered = includeUnpublished ? items : items.filter((t) => t.published);
  return filtered.sort((a, b) => a.order - b.order);
}

export async function getFeaturedTreatments(): Promise<Treatment[]> {
  const items = await getTreatments();
  return items.filter((t) => t.featured).slice(0, 6);
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const items = await readJson<Treatment[]>(FILES.treatments, []);
  return items.find((t) => t.slug === slug && t.published) ?? null;
}

export async function upsertTreatment(
  data: Partial<Treatment> & { title: string }
): Promise<Treatment> {
  const items = await readJson<Treatment[]>(FILES.treatments, []);
  const now = new Date().toISOString();

  if (data.id) {
    const index = items.findIndex((t) => t.id === data.id);
    if (index !== -1) {
      const updated = { ...items[index], ...data, updatedAt: now } as Treatment;
      if (data.title && data.title !== items[index].title) {
        updated.slug = slugify(data.title);
      }
      items[index] = updated;
      await writeJson(FILES.treatments, items);
      return updated;
    }
  }

  const treatment: Treatment = {
    id: uuidv4(),
    slug: slugify(data.title),
    title: data.title,
    shortDescription: data.shortDescription || "",
    overview: data.overview || "",
    benefits: data.benefits || [],
    procedure: data.procedure || [],
    recovery: data.recovery || "",
    duration: data.duration || "",
    suitableFor: data.suitableFor || [],
    faqs: data.faqs || [],
    relatedSlugs: data.relatedSlugs || [],
    image: data.image || "",
    icon: data.icon || "Smile",
    featured: data.featured ?? false,
    order: data.order ?? items.length + 1,
    published: data.published ?? true,
    updatedAt: now,
  };
  items.push(treatment);
  await writeJson(FILES.treatments, items);
  return treatment;
}

export async function deleteTreatment(id: string): Promise<boolean> {
  const items = await readJson<Treatment[]>(FILES.treatments, []);
  const filtered = items.filter((t) => t.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(FILES.treatments, filtered);
  return true;
}

/* ── Appointments ── */
export async function getAppointments(): Promise<Appointment[]> {
  const items = await readJson<Appointment[]>(FILES.appointments, []);
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createAppointment(
  data: Omit<Appointment, "id" | "read" | "status" | "createdAt">
): Promise<Appointment> {
  const items = await readJson<Appointment[]>(FILES.appointments, []);
  const appointment: Appointment = {
    ...data,
    id: uuidv4(),
    status: "new",
    read: false,
    createdAt: new Date().toISOString(),
  };
  items.push(appointment);
  await writeJson(FILES.appointments, items);
  return appointment;
}

export async function updateAppointment(
  id: string,
  data: Partial<Appointment>
): Promise<Appointment | null> {
  const items = await readJson<Appointment[]>(FILES.appointments, []);
  const index = items.findIndex((a) => a.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await writeJson(FILES.appointments, items);
  return items[index];
}

/* ── Gallery ── */
export async function getGallery(): Promise<GalleryItem[]> {
  const items = await readJson<GalleryItem[]>(FILES.gallery, []);
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createGalleryItem(
  data: Omit<GalleryItem, "id" | "createdAt">
): Promise<GalleryItem> {
  const items = await readJson<GalleryItem[]>(FILES.gallery, []);
  const item: GalleryItem = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  await writeJson(FILES.gallery, items);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = await readJson<GalleryItem[]>(FILES.gallery, []);
  const filtered = items.filter((g) => g.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(FILES.gallery, filtered);
  return true;
}

/* ── Testimonials ── */
export async function getTestimonials(): Promise<Testimonial[]> {
  return readJson<Testimonial[]>(FILES.testimonials, []);
}

export async function createTestimonial(
  data: Omit<Testimonial, "id" | "createdAt">
): Promise<Testimonial> {
  const items = await readJson<Testimonial[]>(FILES.testimonials, []);
  const item: Testimonial = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  await writeJson(FILES.testimonials, items);
  return item;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const items = await readJson<Testimonial[]>(FILES.testimonials, []);
  const filtered = items.filter((t) => t.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(FILES.testimonials, filtered);
  return true;
}

/* ── FAQs ── */
export async function getFaqs(): Promise<FAQ[]> {
  const items = await readJson<FAQ[]>(FILES.faqs, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function saveFaqs(faqs: FAQ[]): Promise<void> {
  await writeJson(FILES.faqs, faqs);
}

/* ── Offers ── */
export async function getOffers(activeOnly = false): Promise<Offer[]> {
  const items = await readJson<Offer[]>(FILES.offers, []);
  return activeOnly ? items.filter((o) => o.active) : items;
}

export async function saveOffers(offers: Offer[]): Promise<void> {
  await writeJson(FILES.offers, offers);
}

/* ── Blogs ── */
export async function getBlogs(includeUnpublished = false): Promise<BlogPost[]> {
  const items = await readJson<BlogPost[]>(FILES.blogs, []);
  const filtered = includeUnpublished ? items : items.filter((b) => b.published);
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const items = await readJson<BlogPost[]>(FILES.blogs, []);
  return items.find((b) => b.slug === slug && b.published) ?? null;
}

export async function upsertBlog(
  data: Partial<BlogPost> & { title: string }
): Promise<BlogPost> {
  const items = await readJson<BlogPost[]>(FILES.blogs, []);
  const now = new Date().toISOString();

  if (data.id) {
    const index = items.findIndex((b) => b.id === data.id);
    if (index !== -1) {
      const updated = { ...items[index], ...data, updatedAt: now } as BlogPost;
      items[index] = updated;
      await writeJson(FILES.blogs, items);
      return updated;
    }
  }

  const post: BlogPost = {
    id: uuidv4(),
    slug: data.slug || slugify(data.title),
    title: data.title,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImage: data.coverImage || "",
    published: data.published ?? false,
    createdAt: now,
    updatedAt: now,
  };
  items.push(post);
  await writeJson(FILES.blogs, items);
  return post;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const items = await readJson<BlogPost[]>(FILES.blogs, []);
  const filtered = items.filter((b) => b.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(FILES.blogs, filtered);
  return true;
}

/* ── Media / Content / Doctor ── */
export async function getMediaAssets(): Promise<MediaAssets> {
  return readJson(FILES.media, defaultMediaAssets);
}

export async function saveMediaAssets(media: MediaAssets): Promise<void> {
  await writeJson(FILES.media, media);
}

export async function getSiteContent(): Promise<SiteContent> {
  return readJson(FILES.content, defaultSiteContent);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeJson(FILES.content, content);
}

export async function getDoctor(): Promise<DoctorProfile> {
  return readJson(FILES.doctor, defaultDoctor);
}

export async function saveDoctor(doctor: DoctorProfile): Promise<void> {
  await writeJson(FILES.doctor, doctor);
}

export async function getDashboardStats() {
  const [appointments, treatments, gallery, testimonials] = await Promise.all([
    getAppointments(),
    getTreatments(true),
    getGallery(),
    getTestimonials(),
  ]);
  return {
    totalAppointments: appointments.length,
    newAppointments: appointments.filter((a) => a.status === "new").length,
    unreadAppointments: appointments.filter((a) => !a.read).length,
    totalTreatments: treatments.length,
    galleryItems: gallery.length,
    testimonials: testimonials.length,
  };
}

export async function seedClinicDataIfEmpty(): Promise<void> {
  await ensureDataDir();
  const existing = await readJson<Treatment[]>(FILES.treatments, []);
  if (existing.length > 0) return;

  const now = new Date().toISOString();

  const treatments: Treatment[] = [
    {
      id: uuidv4(),
      slug: "dental-checkup-cleaning",
      title: "Dental Check-up & Cleaning",
      shortDescription: "Comprehensive oral exam with gentle professional cleaning.",
      overview:
        "A thorough clinical examination paired with professional scaling and polishing to keep gums healthy and catch concerns early.",
      benefits: [
        "Early detection of cavities and gum issues",
        "Fresher breath and smoother teeth",
        "Personalized home-care guidance",
      ],
      procedure: [
        "Medical & dental history review",
        "Full mouth examination and digital imaging if needed",
        "Scaling, polishing, and oral hygiene coaching",
      ],
      recovery: "Resume normal activities immediately. Mild sensitivity may last a day.",
      duration: "30–45 minutes",
      suitableFor: ["Adults and children", "Routine preventive care", "New patient visits"],
      faqs: [
        {
          question: "How often should I get a cleaning?",
          answer: "Most patients benefit from a professional cleaning every 6 months. We’ll tailor the interval to your gum health.",
        },
      ],
      relatedSlugs: ["teeth-whitening", "root-canal-treatment"],
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
      icon: "Sparkles",
      featured: true,
      order: 1,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "root-canal-treatment",
      title: "Root Canal Treatment",
      shortDescription: "Pain-focused endodontic care to save your natural tooth.",
      overview:
        "Precision root canal therapy using modern techniques to remove infection, relieve pain, and preserve your natural tooth.",
      benefits: [
        "Relieves toothache and infection",
        "Saves the natural tooth",
        "Comfort-led, step-by-step care",
      ],
      procedure: [
        "Diagnosis with digital imaging",
        "Local anesthesia and isolation",
        "Cleaning, shaping, and sealing of canals",
        "Crown planning when required",
      ],
      recovery: "Mild tenderness for 1–3 days. Soft foods recommended initially.",
      duration: "60–90 minutes (may require 1–2 visits)",
      suitableFor: ["Deep decay", "Irreversible pulpitis", "Dental trauma cases"],
      faqs: [
        {
          question: "Is a root canal painful?",
          answer: "With modern anesthesia and gentle technique, most patients report relief rather than pain during the procedure.",
        },
      ],
      relatedSlugs: ["dental-crowns", "dental-checkup-cleaning"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
      icon: "HeartPulse",
      featured: true,
      order: 2,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "teeth-whitening",
      title: "Teeth Whitening",
      shortDescription: "Clinically supervised whitening for a brighter, natural smile.",
      overview:
        "Professional whitening tailored to your enamel health — delivering noticeable brightness without aggressive over-the-counter guesswork.",
      benefits: [
        "Even, natural-looking results",
        "Supervised for enamel safety",
        "Quick in-clinic transformation",
      ],
      procedure: [
        "Shade assessment and gum protection",
        "Professional whitening application",
        "Aftercare guidance for lasting results",
      ],
      recovery: "Temporary sensitivity possible for 24–48 hours. Avoid staining foods briefly.",
      duration: "45–60 minutes",
      suitableFor: ["Adults with healthy enamel", "Stains from coffee, tea, or aging"],
      faqs: [
        {
          question: "How long do results last?",
          answer: "Results typically last several months to a year depending on diet and maintenance. Touch-ups keep your shade bright.",
        },
      ],
      relatedSlugs: ["smile-makeover", "dental-checkup-cleaning"],
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
      icon: "Sun",
      featured: true,
      order: 3,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "dental-implants",
      title: "Dental Implants",
      shortDescription: "Stable, natural-feeling tooth replacement for missing teeth.",
      overview:
        "Titanium implant solutions planned with digital diagnostics for strength, aesthetics, and long-term oral health.",
      benefits: [
        "Looks and feels like a natural tooth",
        "Preserves jawbone health",
        "Long-lasting restorative option",
      ],
      procedure: [
        "Consultation and 3D planning",
        "Implant placement under local anesthesia",
        "Healing period and crown restoration",
      ],
      recovery: "Soft diet for a few days. Full integration typically over several weeks.",
      duration: "Planning + surgical visit; crown after healing",
      suitableFor: ["Single missing teeth", "Multiple gaps", "Denture stabilization"],
      faqs: [
        {
          question: "Am I a candidate for implants?",
          answer: "Most healthy adults with adequate bone are candidates. We’ll assess gum health, bone volume, and medical history first.",
        },
      ],
      relatedSlugs: ["dental-crowns", "smile-makeover"],
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
      icon: "Gem",
      featured: true,
      order: 4,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "dental-crowns",
      title: "Dental Crowns",
      shortDescription: "Custom ceramic crowns that restore strength and beauty.",
      overview:
        "Tooth-colored crowns crafted to protect weakened teeth while blending seamlessly with your smile.",
      benefits: [
        "Restores chewing strength",
        "Natural aesthetics",
        "Protects cracked or root-treated teeth",
      ],
      procedure: [
        "Tooth preparation and digital impressions",
        "Temporary crown if needed",
        "Final ceramic crown bonding",
      ],
      recovery: "Slight adjustment period for bite comfort. Normal eating within a day for most patients.",
      duration: "2 visits typically",
      suitableFor: ["After root canal", "Fractured teeth", "Large restorations"],
      faqs: [
        {
          question: "How long do crowns last?",
          answer: "With good oral hygiene, quality ceramic crowns often last 10–15 years or longer.",
        },
      ],
      relatedSlugs: ["root-canal-treatment", "dental-implants"],
      image: "https://images.unsplash.com/photo-1609113316024-c83087524487?w=800&q=80",
      icon: "Shield",
      featured: true,
      order: 5,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "smile-makeover",
      title: "Smile Makeover",
      shortDescription: "Personalized aesthetic planning for a confident, natural smile.",
      overview:
        "A curated combination of whitening, bonding, aligners, or veneers — designed around your facial features and goals.",
      benefits: [
        "Holistic aesthetic planning",
        "Natural, age-appropriate results",
        "Clear timeline and staged options",
      ],
      procedure: [
        "Smile analysis and digital preview discussion",
        "Phased treatment plan",
        "Refinement and maintenance guidance",
      ],
      recovery: "Depends on selected treatments; most aesthetic steps have minimal downtime.",
      duration: "Custom — from a single visit to a staged plan",
      suitableFor: ["Cosmetic concerns", "Worn or uneven smiles", "Confidence-focused makeovers"],
      faqs: [
        {
          question: "Will my smile look artificial?",
          answer: "No. We design for harmony with your face — brightness, shape, and proportion that look naturally yours.",
        },
      ],
      relatedSlugs: ["teeth-whitening", "dental-implants"],
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
      icon: "Smile",
      featured: true,
      order: 6,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "braces-aligners",
      title: "Braces & Clear Aligners",
      shortDescription: "Straighten teeth discreetly with guided orthodontic care.",
      overview:
        "Metal braces and clear aligner options planned for comfort, predictability, and a confident finish.",
      benefits: [
        "Improved alignment and bite",
        "Discreet clear aligner options",
        "Monitored progress at every stage",
      ],
      procedure: [
        "Orthodontic assessment and records",
        "Customized appliance or aligner plan",
        "Periodic reviews and retention",
      ],
      recovery: "Mild pressure for a few days after adjustments or new trays.",
      duration: "Typically 6–18 months depending on case",
      suitableFor: ["Crowding", "Spacing", "Bite correction"],
      faqs: [
        {
          question: "Are clear aligners right for me?",
          answer: "Many mild-to-moderate cases are excellent aligner candidates. We’ll confirm after a clinical assessment.",
        },
      ],
      relatedSlugs: ["smile-makeover", "dental-checkup-cleaning"],
      image: "https://images.unsplash.com/photo-1598255557997-1ad293f595ab?w=800&q=80",
      icon: "AlignLeft",
      featured: false,
      order: 7,
      published: true,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "pediatric-dentistry",
      title: "Pediatric Dentistry",
      shortDescription: "Gentle dental care that helps children feel safe and confident.",
      overview:
        "Age-appropriate check-ups, preventive care, and kind chairside manner for growing smiles.",
      benefits: [
        "Builds positive dental habits early",
        "Cavity prevention and guidance",
        "Calm environment for kids",
      ],
      procedure: [
        "Friendly introduction to the clinic",
        "Gentle exam and cleaning",
        "Parent guidance on diet and brushing",
      ],
      recovery: "None — children return to normal activities immediately.",
      duration: "20–40 minutes",
      suitableFor: ["Children and teens", "First dental visits", "Preventive care"],
      faqs: [
        {
          question: "When should my child first visit?",
          answer: "Ideally by age one or within six months of the first tooth. Early visits make future care easier.",
        },
      ],
      relatedSlugs: ["dental-checkup-cleaning"],
      image: "https://images.unsplash.com/photo-1588776813658-f255ee567984?w=800&q=80",
      icon: "Baby",
      featured: false,
      order: 8,
      published: true,
      updatedAt: now,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: uuidv4(),
      name: "Riya Sharma",
      treatment: "Root Canal",
      text: "I was anxious about my root canal, but the team explained every step. Completely painless and genuinely caring.",
      rating: 5,
      featured: true,
      source: "google",
      createdAt: now,
    },
    {
      id: uuidv4(),
      name: "Arjun Patel",
      treatment: "Smile Makeover",
      text: "My smile makeover looks natural — not overdone. The clinic feels premium without being intimidating.",
      rating: 5,
      featured: true,
      source: "google",
      createdAt: now,
    },
    {
      id: uuidv4(),
      name: "Neha Kulkarni",
      treatment: "Cleaning",
      text: "Clean, modern, and punctual. Booking was easy and the follow-up reminders were thoughtful.",
      rating: 5,
      featured: true,
      source: "website",
      createdAt: now,
    },
    {
      id: uuidv4(),
      name: "Vikram Desai",
      treatment: "Implants",
      text: "Implant planning was thorough. I appreciated the transparent timeline and aftercare support.",
      rating: 5,
      featured: true,
      source: "google",
      createdAt: now,
    },
  ];

  const gallery: GalleryItem[] = [
    {
      id: uuidv4(),
      title: "Whitening transformation",
      category: "before-after",
      beforeImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
      description: "Professional whitening with natural brightness",
      featured: true,
      createdAt: now,
    },
    {
      id: uuidv4(),
      title: "Treatment suite",
      category: "clinic",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
      description: "Calm, modern treatment rooms",
      featured: true,
      createdAt: now,
    },
    {
      id: uuidv4(),
      title: "Reception lounge",
      category: "clinic",
      image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
      description: "Welcoming reception and waiting area",
      featured: true,
      createdAt: now,
    },
    {
      id: uuidv4(),
      title: "Digital diagnostics",
      category: "equipment",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      description: "Modern imaging for precise planning",
      featured: false,
      createdAt: now,
    },
    {
      id: uuidv4(),
      title: "Confident smile",
      category: "smile",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      description: "Patient smile after aesthetic care",
      featured: true,
      createdAt: now,
    },
  ];

  const faqs: FAQ[] = [
    {
      id: uuidv4(),
      question: "How do I book an appointment?",
      answer:
        "Use the Book Appointment form on our website, call us, or message on WhatsApp. We’ll confirm your preferred slot quickly.",
      category: "General",
      order: 1,
    },
    {
      id: uuidv4(),
      question: "Do you accept dental insurance?",
      answer:
        "We support major TPA and corporate dental plans. Share your policy details when booking and we’ll guide you on coverage.",
      category: "Billing",
      order: 2,
    },
    {
      id: uuidv4(),
      question: "Is emergency dental care available?",
      answer:
        "Yes. Call our emergency number for urgent pain, swelling, or trauma. We’ll prioritize same-day care whenever possible.",
      category: "Emergency",
      order: 3,
    },
    {
      id: uuidv4(),
      question: "What sterilization standards do you follow?",
      answer:
        "We use Class-B autoclaves, sealed instrument pouches, and medical-grade surface disinfection between every patient.",
      category: "Safety",
      order: 4,
    },
    {
      id: uuidv4(),
      question: "Do you treat children?",
      answer:
        "Absolutely. Our pediatric visits are designed to be gentle and positive, helping kids build healthy dental habits early.",
      category: "Family",
      order: 5,
    },
  ];

  const offers: Offer[] = [
    {
      id: uuidv4(),
      title: "New patient welcome",
      description: " complimentary consultation with your first complete check-up this month.",
      active: true,
      validUntil: "",
    },
  ];

  await Promise.all([
    writeJson(FILES.treatments, treatments),
    writeJson(FILES.testimonials, testimonials),
    writeJson(FILES.gallery, gallery),
    writeJson(FILES.faqs, faqs),
    writeJson(FILES.offers, offers),
    writeJson(FILES.appointments, []),
    writeJson(FILES.blogs, []),
    writeJson(FILES.media, defaultMediaAssets),
    writeJson(FILES.content, defaultSiteContent),
    writeJson(FILES.doctor, defaultDoctor),
  ]);
}
