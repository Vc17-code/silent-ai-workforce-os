"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types/clinic";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "before-after", label: "Before & After" },
  { id: "smile", label: "Smiles" },
  { id: "clinic", label: "Clinic" },
  { id: "equipment", label: "Equipment" },
  { id: "team", label: "Team" },
] as const;

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((i) => i.category === filter),
    [items, filter]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter(cat.id)}
            className={cn(
              "rounded-2xl px-4 py-2 text-sm font-medium transition-colors",
              filter === cat.id
                ? "bg-primary text-white"
                : "bg-white/80 text-muted hover:bg-mist"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          if (item.category === "before-after" && item.beforeImage && item.afterImage) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                className="group overflow-hidden rounded-[1.5rem] bg-white text-left shadow-[0_8px_30px_rgba(15,92,92,0.05)]"
              >
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square">
                    <Image
                      src={item.beforeImage}
                      alt={`${item.title} before`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="25vw"
                    />
                    <span className="absolute left-2 top-2 rounded-lg bg-ink/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-square">
                    <Image
                      src={item.afterImage}
                      alt={`${item.title} after`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="25vw"
                    />
                    <span className="absolute left-2 top-2 rounded-lg bg-primary/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-ink">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  )}
                </div>
              </button>
            );
          }

          if (!item.image) return null;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] text-left"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="font-medium">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-white/75">{item.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          />
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[1.5rem] bg-white p-4">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 rounded-xl bg-white/90 p-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {active.category === "before-after" && active.beforeImage && active.afterImage ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={active.beforeImage} alt="Before" fill className="rounded-xl object-cover" />
                </div>
                <div className="relative aspect-square">
                  <Image src={active.afterImage} alt="After" fill className="rounded-xl object-cover" />
                </div>
              </div>
            ) : active.image ? (
              <div className="relative aspect-video">
                <Image src={active.image} alt={active.title} fill className="rounded-xl object-cover" />
              </div>
            ) : null}
            <p className="mt-4 font-display text-xl">{active.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
