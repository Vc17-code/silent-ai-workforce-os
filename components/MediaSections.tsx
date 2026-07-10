import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, View } from "lucide-react";
import type { GalleryItem, MediaAssets } from "@/types/clinic";

export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  const preview = items.filter((i) => i.featured).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">Smile gallery</p>
            <h2 className="heading-lg">See the clinic and the smiles</h2>
          </div>
          <Link href="/gallery" className="btn-secondary">
            View gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((item) => {
            const src =
              item.category === "before-after"
                ? item.afterImage || item.beforeImage
                : item.image;
            if (!src) return null;
            return (
              <div
                key={item.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem]"
              >
                <Image
                  src={src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-80" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function VirtualTourPreview({ media }: { media: MediaAssets }) {
  const tour = media.virtualTour;
  const hasTour = Boolean(tour.embedUrl);

  return (
    <section className="section-padding bg-white/40">
      <div className="container-custom grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="section-label">360° virtual tour</p>
          <h2 className="heading-lg">Walk through the clinic from home</h2>
          <p className="mt-4 text-lg text-muted">
            Explore reception, treatment rooms, and our sterilization zone before your visit.
            Full immersive tour assets can be added anytime from the owner dashboard.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {tour.hotspots.slice(0, 4).map((h) => (
              <li key={h.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {h.label}
              </li>
            ))}
          </ul>
          <Link href="/tour" className="btn-primary mt-8">
            <View className="h-4 w-4" />
            Open virtual tour
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-[2rem]">
          <Image
            src={tour.thumbnail}
            alt={tour.title}
            width={900}
            height={600}
            className="h-[360px] w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/35">
            <div className="animate-float rounded-full bg-white/90 p-5 text-primary shadow-lg">
              <View className="h-7 w-7" />
            </div>
          </div>
          {!hasTour && (
            <span className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary">
              Tour placeholder · ready for Matterport / Pannellum
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export function IntroVideoSection({ media }: { media: MediaAssets }) {
  const video = media.introVideo;
  const hasVideo = Boolean(video.url);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Introductory video</p>
          <h2 className="heading-lg">Meet Smilecare in under two minutes</h2>
          <p className="mt-4 text-muted">
            A premium clinic film will live here — HD playback, captions, and custom thumbnail managed from the admin panel.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem]">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={1200}
            height={675}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
            {hasVideo ? (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105"
                aria-label="Play introductory video"
              >
                <Play className="ml-1 h-7 w-7" />
              </a>
            ) : (
              <div className="rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-primary">
                Video placeholder · upload via admin
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
