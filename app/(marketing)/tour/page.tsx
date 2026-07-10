import type { Metadata } from "next";
import Image from "next/image";
import { View, Maximize2, ZoomIn, Smartphone } from "lucide-react";
import { PageHero } from "@/components/Hero";
import AppointmentCTA from "@/components/AppointmentCTA";
import { generateSEO } from "@/lib/seo";
import { getMediaAssets } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "360° Virtual Clinic Tour",
  description:
    "Preview Smilecare Dentist’s clinic spaces in Vashi. Full Matterport / Pannellum tour ready to activate from the admin panel.",
  path: "/tour",
});

export default async function TourPage() {
  const media = await getMediaAssets();
  const tour = media.virtualTour;
  const hasTour = Boolean(tour.embedUrl);

  return (
    <>
      <PageHero
        brand
        title="360° Virtual Clinic Tour"
        subtitle="Explore reception, treatment rooms, and sterilization before you visit — immersive tour assets managed from the owner dashboard."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink">
            {hasTour ? (
              <iframe
                title={tour.title}
                src={tour.embedUrl}
                className="aspect-video w-full border-0"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="relative aspect-[16/9]">
                <Image
                  src={tour.thumbnail}
                  alt={tour.title}
                  fill
                  className="object-cover opacity-70"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="animate-float rounded-full bg-white/95 p-5 text-primary">
                    <View className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 font-display text-3xl">{tour.title}</h2>
                  <p className="mt-3 max-w-lg text-white/80">
                    Immersive tour placeholder. Compatible with Google Street View, Matterport, Pannellum, and Marzipano — upload the embed URL in admin when ready.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Maximize2, label: "Fullscreen ready" },
              { icon: Smartphone, label: "Mobile gyroscope support" },
              { icon: ZoomIn, label: "Zoom & hotspots" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-medium"
              >
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="section-label">Clinic spaces</p>
            <h2 className="heading-md">Information hotspots</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tour.hotspots.map((h) => (
                <div
                  key={h.id}
                  className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-5"
                >
                  <h3 className="font-display text-xl">{h.label}</h3>
                  <p className="mt-2 text-sm text-muted">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}
