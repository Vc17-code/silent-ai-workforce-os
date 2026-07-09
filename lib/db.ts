import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Inquiry, Property } from "@/types/property";

const DATA_DIR = path.join(process.cwd(), "data");
const PROPERTIES_FILE = path.join(DATA_DIR, "properties.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

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

export async function getProperties(includeHidden = false): Promise<Property[]> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  const filtered = includeHidden
    ? properties
    : properties.filter((p) => !p.hidden && p.status !== "sold" && p.status !== "rented");
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const properties = await getProperties();
  return properties.filter((p) => p.featured).slice(0, 6);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  return properties.find((p) => p.slug === slug) ?? null;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  return properties.find((p) => p.id === id) ?? null;
}

export async function createProperty(
  data: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt">
): Promise<Property> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  const now = new Date().toISOString();
  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let counter = 1;
  while (properties.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const property: Property = {
    ...data,
    id: uuidv4(),
    slug,
    createdAt: now,
    updatedAt: now,
  };

  properties.push(property);
  await writeJson(PROPERTIES_FILE, properties);
  return property;
}

export async function updateProperty(
  id: string,
  data: Partial<Omit<Property, "id" | "slug" | "createdAt">>
): Promise<Property | null> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Property = {
    ...properties[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (data.title && data.title !== properties[index].title) {
    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let counter = 1;
    while (properties.some((p) => p.slug === slug && p.id !== id)) {
      slug = `${baseSlug}-${counter++}`;
    }
    updated.slug = slug;
  }

  properties[index] = updated;
  await writeJson(PROPERTIES_FILE, properties);
  return updated;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  const filtered = properties.filter((p) => p.id !== id);
  if (filtered.length === properties.length) return false;
  await writeJson(PROPERTIES_FILE, filtered);
  return true;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, []);
  return inquiries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createInquiry(
  data: Omit<Inquiry, "id" | "read" | "createdAt">
): Promise<Inquiry> {
  const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, []);
  const inquiry: Inquiry = {
    ...data,
    id: uuidv4(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  inquiries.push(inquiry);
  await writeJson(INQUIRIES_FILE, inquiries);
  return inquiry;
}

export async function markInquiryRead(id: string): Promise<boolean> {
  const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, []);
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return false;
  inquiries[index].read = true;
  await writeJson(INQUIRIES_FILE, inquiries);
  return true;
}

export async function getDashboardStats() {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, []);
  const active = properties.filter(
    (p) => !p.hidden && p.status !== "sold" && p.status !== "rented"
  );
  return {
    totalProperties: properties.length,
    activeListings: active.length,
    featuredListings: properties.filter((p) => p.featured).length,
    soldProperties: properties.filter((p) => p.status === "sold").length,
    totalInquiries: inquiries.length,
    unreadInquiries: inquiries.filter((i) => !i.read).length,
  };
}

export async function seedPropertiesIfEmpty(): Promise<void> {
  const properties = await readJson<Property[]>(PROPERTIES_FILE, []);
  if (properties.length > 0) return;

  const now = new Date().toISOString();
  const seed: Property[] = [
    {
      id: uuidv4(),
      slug: "luxury-villa-ajmer",
      title: "Luxury Villa",
      description:
        "Spacious 3 BHK luxury villa with modern amenities, landscaped garden, and premium finishes. Ideal for families seeking comfort and elegance in Ajmer.",
      price: 9500000,
      location: "Ajmer",
      address: "Vaishali Nagar, Ajmer",
      area: 2200,
      areaUnit: "sqft",
      propertyType: "villa",
      bedrooms: 3,
      bathrooms: 3,
      status: "sale",
      amenities: ["Parking", "Garden", "Modular Kitchen", "Power Backup", "Security"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      ],
      contactNumber: "+919414435920",
      featured: true,
      hidden: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "commercial-office-vaishali-nagar",
      title: "Commercial Office Space",
      description:
        "Premium commercial office space in Vaishali Nagar with excellent connectivity, ample parking, and modern infrastructure. Perfect for businesses and startups.",
      price: 18000000,
      location: "Vaishali Nagar, Ajmer",
      address: "Vaishali Nagar Main Road, Ajmer",
      area: 4500,
      areaUnit: "sqft",
      propertyType: "commercial",
      status: "sale",
      amenities: ["Parking", "Lift", "Power Backup", "CCTV", "Fire Safety"],
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      ],
      contactNumber: "+919414435920",
      featured: true,
      hidden: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "residential-plot-makarwali",
      title: "Residential Plot",
      description:
        "Well-located residential plot in Makarwali with clear title and all approvals. Ideal for building your dream home in a growing neighborhood.",
      price: 3500000,
      location: "Makarwali, Ajmer",
      address: "Makarwali Road, Ajmer",
      area: 1800,
      areaUnit: "sqft",
      propertyType: "plot",
      status: "sale",
      amenities: ["Clear Title", "Road Access", "Water Connection"],
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      ],
      contactNumber: "+919414435920",
      featured: true,
      hidden: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "3bhk-apartment-ajmer",
      title: "3 BHK Modern Apartment",
      description:
        "Beautiful 3 BHK apartment with balcony views, community amenities, and close proximity to schools and markets.",
      price: 6500000,
      location: "Ajmer City",
      address: "Civil Lines, Ajmer",
      area: 1650,
      areaUnit: "sqft",
      propertyType: "residential",
      bedrooms: 3,
      bathrooms: 2,
      status: "sale",
      amenities: ["Lift", "Parking", "Gym", "Club House", "24/7 Security"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      ],
      contactNumber: "+919414435920",
      featured: false,
      hidden: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      slug: "shop-vaishali-nagar",
      title: "Prime Shop for Rent",
      description:
        "High-footfall shop on main road in Vaishali Nagar. Ideal for retail, showroom, or office use.",
      price: 25000,
      location: "Vaishali Nagar, Ajmer",
      address: "Main Market, Vaishali Nagar",
      area: 600,
      areaUnit: "sqft",
      propertyType: "shop",
      status: "rent",
      amenities: ["Main Road Facing", "Parking Nearby"],
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      ],
      contactNumber: "+919414435920",
      featured: false,
      hidden: false,
      createdAt: now,
      updatedAt: now,
    },
  ];

  await writeJson(PROPERTIES_FILE, seed);
}
