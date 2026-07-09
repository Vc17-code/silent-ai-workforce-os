"use client";

import { useState } from "react";
import Image from "next/image";
import type { Property, PropertyType } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/types/property";

interface PropertyGalleryProps {
  properties: Property[];
}

const filters: Array<{ key: PropertyType | "all" | "rent"; label: string }> = [
  { key: "all", label: "All" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "plot", label: "Plots" },
  { key: "rent", label: "Rentals" },
];

export default function PropertyGallery({ properties }: PropertyGalleryProps) {
  const [filter, setFilter] = useState<PropertyType | "all" | "rent">("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = properties.filter((p) => {
    if (filter === "all") return true;
    if (filter === "rent") return p.status === "rent";
    return p.propertyType === filter;
  });

  const images = filtered.flatMap((p) =>
    p.images.map((img) => ({
      src: img,
      title: p.title,
      type: PROPERTY_TYPE_LABELS[p.propertyType],
    }))
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            className="group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid"
            onClick={() => setLightbox(item.src)}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={600}
              height={400}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-left text-white">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-white/80">{item.type}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <Image
            src={lightbox}
            alt="Property gallery"
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
