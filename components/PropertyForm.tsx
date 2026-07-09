"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import { contactInfo } from "@/lib/config";

const propertySchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  location: z.string().min(2, "Location is required"),
  address: z.string().min(2, "Address is required"),
  area: z.coerce.number().min(1, "Area is required"),
  areaUnit: z.enum(["sqft", "sqyd", "acre"]),
  propertyType: z.enum([
    "residential",
    "commercial",
    "agricultural",
    "villa",
    "shop",
    "plot",
    "building",
  ]),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  status: z.enum(["sale", "rent", "sold", "rented"]),
  amenities: z.string(),
  images: z.string(),
  videoUrl: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
  contactNumber: z.string().min(10),
  featured: z.boolean(),
  hidden: z.boolean(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  property?: Property;
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: property
      ? {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          address: property.address,
          area: property.area,
          areaUnit: property.areaUnit,
          propertyType: property.propertyType,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          status: property.status,
          amenities: property.amenities.join(", "),
          images: property.images.join("\n"),
          videoUrl: property.videoUrl || "",
          mapEmbedUrl: property.mapEmbedUrl || "",
          contactNumber: property.contactNumber,
          featured: property.featured,
          hidden: property.hidden,
        }
      : {
          areaUnit: "sqft",
          propertyType: "residential",
          status: "sale",
          contactNumber: contactInfo.phone,
          featured: false,
          hidden: false,
          amenities: "",
          images: "",
        },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const { url } = await res.json();
          newUrls.push(url);
        }
      } catch {
        /* skip failed uploads */
      }
    }

    const updated = [...imageUrls, ...newUrls];
    setImageUrls(updated);
    setValue("images", updated.join("\n"));
    setUploading(false);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setError("");
    const payload = {
      ...data,
      amenities: data.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      images: data.images
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      videoUrl: data.videoUrl || undefined,
      mapEmbedUrl: data.mapEmbedUrl || undefined,
    };

    try {
      const res = await fetch("/api/properties", {
        method: property ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property ? { id: property.id, ...payload } : payload),
      });

      if (!res.ok) throw new Error("Failed to save");
      router.push("/owner/listings");
      router.refresh();
    } catch {
      setError("Failed to save property. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Property Title *</label>
          <input {...register("title")} className={inputClass} placeholder="Luxury Villa in Ajmer" />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Property Type *</label>
          <select {...register("propertyType")} className={inputClass}>
            {Object.entries(PROPERTY_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status *</label>
          <select {...register("status")} className={inputClass}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Price (INR) *</label>
          <input type="number" {...register("price")} className={inputClass} placeholder="9500000" />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Location *</label>
          <input {...register("location")} className={inputClass} placeholder="Vaishali Nagar, Ajmer" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Full Address *</label>
          <input {...register("address")} className={inputClass} placeholder="Street address" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Area *</label>
          <input type="number" {...register("area")} className={inputClass} placeholder="2200" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Area Unit</label>
          <select {...register("areaUnit")} className={inputClass}>
            <option value="sqft">Sq. Ft.</option>
            <option value="sqyd">Sq. Yd.</option>
            <option value="acre">Acre</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Bedrooms</label>
          <input type="number" {...register("bedrooms")} className={inputClass} placeholder="3" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Bathrooms</label>
          <input type="number" {...register("bathrooms")} className={inputClass} placeholder="2" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Description *</label>
          <textarea {...register("description")} rows={4} className={inputClass} placeholder="Property description..." />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Amenities (comma-separated)</label>
          <input {...register("amenities")} className={inputClass} placeholder="Parking, Garden, Lift" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className={inputClass} />
          {uploading && <p className="mt-1 text-sm text-slate-500">Uploading...</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Image URLs (one per line)</label>
          <textarea {...register("images")} rows={3} className={inputClass} placeholder="https://..." />
          {imageUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imageUrls.map((url) => (
                <Image key={url} src={url} alt="" width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Video URL</label>
          <input {...register("videoUrl")} className={inputClass} placeholder="https://..." />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Google Maps Embed URL</label>
          <input {...register("mapEmbedUrl")} className={inputClass} placeholder="https://www.google.com/maps/embed?..." />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Contact Number</label>
          <input {...register("contactNumber")} className={inputClass} />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("featured")} className="rounded" />
            Featured Property
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("hidden")} className="rounded" />
            Hide Listing
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {isSubmitting ? "Publishing..." : property ? "Update Property" : "Publish Property"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
