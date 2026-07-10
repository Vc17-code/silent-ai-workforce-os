import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import GalleryClient from "@/components/GalleryClient";
import AppointmentCTA from "@/components/AppointmentCTA";
import { generateSEO } from "@/lib/seo";
import { getGallery } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "Smile Gallery",
  description:
    "Browse before & after smiles, clinic spaces, and modern equipment at Smilecare Dentist, Navi Mumbai.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        brand
        title="Smile Gallery"
        subtitle="Real results, calm spaces, and the clinical environment patients experience at Smilecare."
      />
      <section className="section-padding">
        <div className="container-custom">
          <GalleryClient items={items} />
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}
